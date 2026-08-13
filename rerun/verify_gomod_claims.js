#!/usr/bin/env node
// verify_gomod_claims.js — 原稿の 2.3節「go.modとgo.sum」の記述を実測で検証する。
//
// 検証する主張:
//   (A) go.mod には「テストファイルだけが使う依存」が記録される
//   (B) go.mod には「他OS向けのファイルだけが使う依存」が記録される
//   (C) go.mod には「コードから到達せずビルドにも使われない依存」も記録される
//   (D) (C)の理由は「各依存も自分のgo.modを持ち、Goが要求を突き合わせてバージョンを決めるため」
//
// 方法: SHA固定でcloneし、require集合と各GT集合の差を取る。
//   linux_imp  = GOOS=linux go list -deps        （非test）
//   linux_impT = GOOS=linux go list -deps -test  （+test）
//   win_imp    = GOOS=windows go list -deps
//   testOnly   = impT − imp            → (A)
//   winOnly    = win − impT            → (B)
//   unreached  = require − (impT ∪ win) → (C)
//   (D)は unreached の一部を `go mod why -m` にかけて理由を見る。
'use strict';
const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const N = +(process.argv[2] || 25);
const SEED = +(process.argv[3] || 777);
const BASE = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'out');
const GOBIN = '/opt/go1265/go/bin';

const man = fs.readFileSync(BASE + '/manifest.csv', 'utf8').trim().split('\n').slice(1).map(l => l.split(','));
const pool = man.filter(c => c[6] === 'OK' && /^[0-9a-f]{40}$/.test(c[2])).map(c => ({ name: c[0], url: c[1], sha: c[2] }));
pool.sort((a, b) => a.name < b.name ? -1 : 1);
let x = SEED;
const rnd = () => { x |= 0; x = (x + 0x6D2B79F5) | 0; let t = Math.imul(x ^ (x >>> 15), 1 | x); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1));[pool[i], pool[j]] = [pool[j], pool[i]]; }

const sh = (c, o = {}) => { try { return cp.execSync(c, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 128 * 1024 * 1024, ...o }); } catch (e) { return e.stdout || ''; } };
const setOf = s => new Set(s.split('\n').map(l => l.trim().split(/\s+/)[0]).filter(Boolean));

const rows = ['repo,n_require,n_linux_imp,n_test_only,n_win_only,n_unreached'];
const acc = [];
const whySamples = [];

for (const { name, url, sha } of pool) {
  if (acc.length >= N) break;
  const w = `/tmp/vc_${name}`, src = `${w}/src`;
  fs.rmSync(w, { recursive: true, force: true }); fs.mkdirSync(src, { recursive: true });
  const env = { ...process.env, PATH: `${GOBIN}:${process.env.PATH}`, GOTOOLCHAIN: 'local', GOFLAGS: '-mod=mod', GOMODCACHE: `${w}/mod`, GOCACHE: `${w}/build` };
  sh(`cd ${src} && git init -q && git remote add origin ${url} && timeout 200 git fetch -q --depth 1 origin ${sha} && git checkout -q FETCH_HEAD`, { env });
  if (!fs.existsSync(`${src}/go.mod`)) { fs.rmSync(w, { recursive: true, force: true }); continue; }
  if (fs.existsSync(`${src}/go.work`)) env.GOFLAGS = '';
  const O = { env, cwd: src };

  let req = [];
  try { req = (JSON.parse(sh('go mod edit -json', O) || '{}').Require || []).map(r => r.Path); } catch (e) { }
  if (!req.length) { fs.rmSync(w, { recursive: true, force: true }); continue; }
  sh('timeout 300 go mod download >/dev/null 2>&1', O);
  const F = `-f '{{with .Module}}{{.Path}}{{end}}'`;
  const imp = setOf(sh(`timeout 300 env GOOS=linux go list -deps -e ${F} ./... 2>/dev/null`, O));
  const impT = setOf(sh(`timeout 300 env GOOS=linux go list -deps -test -e ${F} ./... 2>/dev/null`, O));
  const win = setOf(sh(`timeout 300 env GOOS=windows go list -deps -e ${F} ./... 2>/dev/null`, O));
  if (!imp.size && !impT.size) { fs.rmSync(w, { recursive: true, force: true }); continue; }

  const testOnly = [...impT].filter(m => !imp.has(m));
  const winOnly = [...win].filter(m => !impT.has(m));
  const unreached = req.filter(m => !impT.has(m) && !win.has(m));
  acc.push({ name, req: req.length, imp: imp.size, testOnly: testOnly.length, winOnly: winOnly.length, unreached: unreached.length });
  rows.push([name, req.length, imp.size, testOnly.length, winOnly.length, unreached.length].join(','));
  process.stderr.write(`[${acc.length}/${N}] ${name}: require=${req.length} test専用=${testOnly.length} 他OS専用=${winOnly.length} 未到達=${unreached.length}\n`);

  // (D) 未到達依存がなぜ go.mod にあるのかを go mod why で見る
  if (unreached.length && whySamples.length < 12) {
    for (const m of unreached.slice(0, 2)) {
      const why = sh(`timeout 90 go mod why -m ${m} 2>/dev/null`, O).trim().split('\n').filter(Boolean);
      whySamples.push({ repo: name, mod: m, why });
      if (whySamples.length >= 12) break;
    }
  }
  fs.rmSync(w, { recursive: true, force: true });
}

fs.writeFileSync(`${OUT}/gomod_claims.csv`, rows.join('\n') + '\n');
const pct = f => `${acc.filter(f).length}/${acc.length} (${(100 * acc.filter(f).length / acc.length).toFixed(0)}%)`;
const med = a => { const s = a.slice().sort((p, q) => p - q); return s[Math.floor(s.length / 2)]; };
console.log(`\n# 2.3節の記述の実測検証  標本 ${acc.length} リポジトリ  seed=${SEED}\n`);
console.log(`(A) テストファイルだけが使う依存が存在する : ${pct(r => r.testOnly > 0)}  中央値 ${med(acc.map(r => r.testOnly))}件`);
console.log(`(B) 他OS向けだけが使う依存が存在する       : ${pct(r => r.winOnly > 0)}  中央値 ${med(acc.map(r => r.winOnly))}件`);
console.log(`(C) require にあるがどのビルドでも未到達    : ${pct(r => r.unreached > 0)}  中央値 ${med(acc.map(r => r.unreached))}件`);
console.log(`\n(D) 未到達依存が go.mod にある理由（go mod why -m の出力）:`);
for (const s of whySamples.slice(0, 8)) {
  console.log(`  ${s.repo} / ${s.mod}`);
  s.why.slice(0, 4).forEach(l => console.log(`      ${l}`));
}
console.log(`\n[written] ${OUT}/gomod_claims.csv`);
