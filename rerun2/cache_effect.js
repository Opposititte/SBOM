#!/usr/bin/env node
// cache_effect.js — 「SBOMツールの出力が Go module cache の状態に左右されるか」を
//   冷/温の対照実験で測る。4ツール × 同一SHA × 同一マシンで、キャッシュ状態だけを変える。
//
//   背景: dwin__goSecretBoxPassword で syft だけが github.com/stretchr/objx を落とした。
//   objx は go.mod に無く go.sum にのみ在る。module cache から testify の go.mod を
//   読めるときだけ syft が objx を拾う、という挙動だった。
//   7月の proc.sh は GOMODCACHE=/tmp/rm_modcache を全1,528件で共有していたため、
//   処理が進むほどキャッシュが温まる＝結果が処理順に依存していた。
//
//   条件:
//     cold = 使い捨ての空 GOMODCACHE でツールを実行（rerun2 の現行条件）
//     warm = 同じ repo で go mod download all を済ませてからツールを実行
//   ※ warm は7月の共有キャッシュと等価ではない（7月は「他repoの依存だけが在る」状態で、
//     その repo 固有の依存は入っていない）。warm は7月より温かい上限側の条件である。
//     ここで測りたいのは「キャッシュ状態でどれだけ動くか」の効果量であって7月の再現ではない。
//
//   使い方: node census2/rerun2/cache_effect.js [件数=40]
//   出力  : census2/rerun2/cache_effect/summary.csv, per_module.csv, README.md
'use strict';
const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const V = require('./verify_lib.js');

const N = process.argv[2] ? +process.argv[2] : 40;
const BASE = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'out');
const DIR = path.join(__dirname, 'cache_effect');
const GO_BIN = process.env.GO_BIN || '/opt/go1265/go/bin';
const TOOL_BIN = process.env.TOOL_BIN || '/workspace/gopath/bin';
const TO = 300;
fs.mkdirSync(DIR, { recursive: true });

const july = V.loadJuly();
const norm = s => { try { s = decodeURIComponent(s); } catch (e) { } return s.trim().toLowerCase(); };

// rerun2.js と同一のシャッフル順（= 無作為標本の順序）
const order = (() => {
  const a = Object.keys(july.man).sort();
  let x = 20260729;
  const rnd = () => { x |= 0; x = (x + 0x6D2B79F5) | 0; let t = Math.imul(x ^ (x >>> 15), 1 | x); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; }
  return a;
})();
// 既に rerun2 で処理済み（= cold の結果が保存されている）先頭連続区間から等間隔に抽出する。
const doneOK = r => { try { return JSON.parse(fs.readFileSync(`${OUT}/${r}/meta.json`, 'utf8')).status === 'OK'; } catch (e) { return false; } };
let prefix = 0; while (prefix < order.length && fs.existsSync(`${OUT}/${order[prefix]}/meta.json`)) prefix++;
const pool = order.slice(0, prefix).filter(doneOK);
const step = Math.max(1, Math.floor(pool.length / N));
const sample = [];
for (let i = 0; i < pool.length && sample.length < N; i += step) sample.push(pool[i]);

const run = (cmd, opts = {}) => cp.spawnSync('bash', ['-c', cmd], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...opts });
function toolSet(file, main) {
  if (!fs.existsSync(file)) return null;
  let d; try { d = JSON.parse(fs.readFileSync(file)); } catch (e) { return null; }
  const s = new Set();
  for (const c of (d.components || [])) {
    const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0];
    const at = r.lastIndexOf('@');
    const p = norm(at < 0 ? r : r.slice(0, at));
    if (p === 'stdlib' || p === main) continue;
    s.add(p);
  }
  return s;
}
const TOOLS = t => ({
  syft: `timeout ${TO} syft ${t.src} -o cyclonedx-json=${t.o}/syft.json`,
  trivy: `timeout ${TO} trivy fs ${t.src} --format cyclonedx --output ${t.o}/trivy.json`,
  cdxgen: `timeout ${TO} cdxgen -t go ${t.src} -o ${t.o}/cdxgen.json`,
  'cyclonedx-gomod': `timeout ${TO} cyclonedx-gomod mod -json -output ${t.o}/cyclonedx-gomod.json ${t.src}`,
});

const SUM = `${DIR}/summary.csv`, PER = `${DIR}/per_module.csv`;
if (!fs.existsSync(SUM)) fs.writeFileSync(SUM, 'repo,tool,n_cold,n_warm,added_warm,removed_warm,changed,gt_all,cold_tp,warm_tp\n');
if (!fs.existsSync(PER)) fs.writeFileSync(PER, 'repo,tool,direction,module,in_gt_all\n');
const doneRepos = new Set(fs.readFileSync(SUM, 'utf8').trim().split('\n').slice(1).map(l => l.split(',')[0]));

console.log(`# cache_effect 開始 標本=${sample.length}（無作為標本の先頭${prefix}件から等間隔抽出）`);
for (const repo of sample) {
  if (doneRepos.has(repo)) continue;
  const { url, sha } = july.man[repo];
  const w = `/tmp/ce_${repo}`, src = `${w}/src`;
  fs.rmSync(w, { recursive: true, force: true });
  fs.mkdirSync(`${w}/cold`, { recursive: true }); fs.mkdirSync(`${w}/warm`, { recursive: true }); fs.mkdirSync(src, { recursive: true });
  const env = {
    ...process.env, PATH: `${GO_BIN}:${TOOL_BIN}:${process.env.PATH}`,
    GOTOOLCHAIN: 'local', GOFLAGS: '-mod=mod', GOOS: 'linux', GOARCH: 'amd64', CGO_ENABLED: '1',
    GOMODCACHE: `${w}/mod`, GOCACHE: `${w}/build`,
  };
  process.stderr.write(`${repo} ... `);
  run(`cd ${src} && git init -q && git remote add origin ${url} && timeout 300 git fetch -q --depth 1 origin ${sha} && git checkout -q FETCH_HEAD`, { env });
  if (run(`cd ${src} && git rev-parse HEAD`, { env }).stdout.trim() !== sha) { console.error('clone失敗→skip'); fs.rmSync(w, { recursive: true, force: true }); continue; }
  if (fs.existsSync(`${src}/go.work`)) env.GOFLAGS = '';
  const main = norm((run('timeout 120 go list -m', { env, cwd: src }).stdout.split('\n')[0] || '').trim().split(/\s+/)[0] || '');

  // 1) cold: 空の GOMODCACHE のままツールを走らせる
  for (const c of Object.values(TOOLS({ src, o: `${w}/cold` }))) run(c, { env });
  // 2) その repo の依存をすべて落としてキャッシュを温める
  run(`cd ${src} && timeout ${TO} go mod download all`, { env });
  // 3) warm: 同じツールを同じ引数で再実行
  for (const c of Object.values(TOOLS({ src, o: `${w}/warm` }))) run(c, { env });

  const gtAll = new Set(fs.existsSync(`${OUT}/${repo}/gt-all.tsv`)
    ? fs.readFileSync(`${OUT}/${repo}/gt-all.tsv`, 'utf8').split('\n').filter(Boolean).map(l => norm(l.split('\t')[0])) : []);
  let changedTools = 0;
  for (const t of ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod']) {
    const A = toolSet(`${w}/cold/${t}.json`, main), B = toolSet(`${w}/warm/${t}.json`, main);
    if (!A && !B) { fs.appendFileSync(SUM, `${repo},${t},NA,NA,0,0,no,${gtAll.size},NA,NA\n`); continue; }
    const a = A || new Set(), b = B || new Set();
    const added = [...b].filter(x => !a.has(x)), removed = [...a].filter(x => !b.has(x));
    const changed = (added.length || removed.length) ? 'YES' : 'no';
    if (changed === 'YES') changedTools++;
    for (const m of added) fs.appendFileSync(PER, `${repo},${t},added_when_warm,${m},${gtAll.has(m) ? 'yes' : 'no'}\n`);
    for (const m of removed) fs.appendFileSync(PER, `${repo},${t},removed_when_warm,${m},${gtAll.has(m) ? 'yes' : 'no'}\n`);
    const tp = s => [...s].filter(x => gtAll.has(x)).length;
    fs.appendFileSync(SUM, `${repo},${t},${A ? a.size : 'NA'},${B ? b.size : 'NA'},${added.length},${removed.length},${changed},${gtAll.size},${A ? tp(a) : 'NA'},${B ? tp(b) : 'NA'}\n`);
  }
  console.error(`変化したツール=${changedTools}/4`);
  fs.rmSync(w, { recursive: true, force: true });
}
console.log('[done] ' + SUM);
