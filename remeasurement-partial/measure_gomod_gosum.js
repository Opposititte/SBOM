#!/usr/bin/env node
// measure_gomod_gosum.js — 「go.sum は go.mod より多くのモジュールを記録するのか」を実測する。
//   記憶や2〜3例の印象ではなく、無作為標本で分布を取るためのスクリプト。
//
//   使い方: node remeasurement-partial/measure_gomod_gosum.js [件数] [seed]
//   出力  : remeasurement-partial/out/gomod_vs_gosum.csv と標準出力の要約
//
//   数えるもの（すべて**モジュール単位**。行数ではない）:
//     req_total     : go.mod の require 総数
//     req_direct    : うち直接依存（// indirect が付かないもの）
//     req_indirect  : うち間接依存
//     sum_paths     : go.sum に現れる distinct なモジュールパス数
//     sum_pairs     : go.sum に現れる distinct な (モジュール, バージョン) 数
//     sum_only      : go.sum にしか無いモジュールパス数（require に無い）
'use strict';
const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const N = +(process.argv[2] || 60);
const SEED = +(process.argv[3] || 424242);
const BASE = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'out');
const GOBIN = '/opt/go1265/go/bin';

const man = fs.readFileSync(BASE + '/manifest.csv', 'utf8').trim().split('\n').slice(1).map(l => l.split(','));
const pool = man.filter(c => c[6] === 'OK' && /^[0-9a-f]{40}$/.test(c[2])).map(c => ({ name: c[0], url: c[1], sha: c[2] }));
pool.sort((a, b) => a.name < b.name ? -1 : 1);
let x = SEED;
const rnd = () => { x |= 0; x = (x + 0x6D2B79F5) | 0; let t = Math.imul(x ^ (x >>> 15), 1 | x); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1));[pool[i], pool[j]] = [pool[j], pool[i]]; }

const sh = (c, o = {}) => { try { return cp.execSync(c, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024, ...o }); } catch (e) { return e.stdout || ''; } };
const rows = ['repo,req_total,req_direct,req_indirect,sum_paths,sum_pairs,sum_only,sum_minus_req'];
const acc = [];

for (const { name, url, sha } of pool) {
  if (acc.length >= N) break;
  const w = `/tmp/gm_${name}`, src = `${w}/src`;
  fs.rmSync(w, { recursive: true, force: true }); fs.mkdirSync(src, { recursive: true });
  const env = { ...process.env, PATH: `${GOBIN}:${process.env.PATH}`, GOTOOLCHAIN: 'local', GOMODCACHE: `${w}/mod`, GOCACHE: `${w}/build` };
  sh(`cd ${src} && git init -q && git remote add origin ${url} && timeout 200 git fetch -q --depth 1 origin ${sha} && git checkout -q FETCH_HEAD`, { env });
  if (!fs.existsSync(`${src}/go.mod`) || !fs.existsSync(`${src}/go.sum`)) { fs.rmSync(w, { recursive: true, force: true }); continue; }

  // go.mod の require（go mod edit -json で確実に取る。ネットワーク不要）
  let req = [];
  try { req = (JSON.parse(sh('go mod edit -json', { env, cwd: src }) || '{}').Require || []); } catch (e) { }
  if (!req.length) { fs.rmSync(w, { recursive: true, force: true }); continue; }
  const reqPaths = new Set(req.map(r => r.Path));
  const direct = req.filter(r => !r.Indirect).length;

  // go.sum: 1行 = "module version[/go.mod] hash"
  const lines = fs.readFileSync(`${src}/go.sum`, 'utf8').split('\n').filter(l => l.trim());
  const paths = new Set(), pairs = new Set();
  for (const l of lines) {
    const a = l.trim().split(/\s+/); if (a.length < 2) continue;
    paths.add(a[0]); pairs.add(a[0] + '@' + a[1].replace(/\/go\.mod$/, ''));
  }
  const sumOnly = [...paths].filter(p => !reqPaths.has(p)).length;
  const rec = { name, req: req.length, direct, indirect: req.length - direct, paths: paths.size, pairs: pairs.size, sumOnly };
  acc.push(rec);
  rows.push([name, rec.req, rec.direct, rec.indirect, rec.paths, rec.pairs, rec.sumOnly, rec.paths - rec.req].join(','));
  process.stderr.write(`[${acc.length}/${N}] ${name}: go.mod=${rec.req} go.sum(paths)=${rec.paths} 差=${rec.paths - rec.req}\n`);
  fs.rmSync(w, { recursive: true, force: true });
}

fs.writeFileSync(`${OUT}/gomod_vs_gosum.csv`, rows.join('\n') + '\n');
const more = acc.filter(r => r.paths > r.req).length;
const same = acc.filter(r => r.paths === r.req).length;
const less = acc.filter(r => r.paths < r.req).length;
const med = a => { const s = a.slice().sort((p, q) => p - q); return s[Math.floor(s.length / 2)]; };
console.log(`\n# go.mod vs go.sum（モジュール単位）  標本 ${acc.length} リポジトリ  seed=${SEED}\n`);
console.log(`  go.sum のモジュール数 > go.mod の require 数 : ${more} 件 (${(100 * more / acc.length).toFixed(1)}%)`);
console.log(`  等しい                                      : ${same} 件`);
console.log(`  go.sum の方が少ない                          : ${less} 件`);
console.log(`\n  go.mod require 中央値      : ${med(acc.map(r => r.req))}`);
console.log(`  go.sum distinct パス中央値 : ${med(acc.map(r => r.paths))}`);
console.log(`  go.sum distinct (パス,版)  : ${med(acc.map(r => r.pairs))}  ← 版違いを別々に数えるとさらに増える`);
console.log(`  go.sum にしか無いモジュール中央値 : ${med(acc.map(r => r.sumOnly))}`);
console.log(`\n[written] ${OUT}/gomod_vs_gosum.csv`);
