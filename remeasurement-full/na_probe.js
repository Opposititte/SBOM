#!/usr/bin/env node
// na_probe.js — 「7月に一部ツールだけ NA だった 53 件は、キャッシュ由来の失敗ではないか」
//   という派生仮説を確かめる。cache_effect.js で fern4lvarez__piladb の cyclonedx-gomod が
//   cold=NA → warm=成功 になったのがきっかけ。
//
//   7月に NA だったツールだけを、その repo で cold と warm の両方で実行して成否を記録する。
//   ツールの失敗率という指標がキャッシュ状態に依存するなら、それ自体が報告に値する。
//
//   使い方: node remeasurement-full/na_probe.js [件数=20]
//   出力  : remeasurement-full/cache_effect/na_probe.csv
'use strict';
const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const V = require('./verify_lib.js');

const N = process.argv[2] ? +process.argv[2] : 20;
const OUT = path.join(__dirname, 'out');
const DIR = path.join(__dirname, 'cache_effect');
const GO_BIN = process.env.GO_BIN || '/opt/go1265/go/bin';
const TOOL_BIN = process.env.TOOL_BIN || '/workspace/gopath/bin';
const TO = 300;
fs.mkdirSync(DIR, { recursive: true });
const july = V.loadJuly();

// 7月に「一部ツールだけ NA」だった repo（全ツール NA の july_unavailable は除く）
const targets = [];
for (const [repo, m] of Object.entries(july.man)) {
  const t = july.met[repo]; if (!t) continue;
  const vals = Object.values(t);
  const na = Object.entries(t).filter(([, v]) => v === 'NA').map(([k]) => k);
  if (na.length && na.length < vals.length) targets.push({ repo, na });
}
targets.sort((a, b) => a.repo.localeCompare(b.repo));

const OUTF = `${DIR}/na_probe.csv`;
if (!fs.existsSync(OUTF)) fs.writeFileSync(OUTF, 'repo,tool,july,cold,warm,cold_n,warm_n,cache_explains_july_na\n');
const done = new Set(fs.readFileSync(OUTF, 'utf8').trim().split('\n').slice(1).map(l => l.split(',')[0]));

const run = (cmd, o = {}) => cp.spawnSync('bash', ['-c', cmd], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...o });
const norm = s => { try { s = decodeURIComponent(s); } catch (e) { } return s.trim().toLowerCase(); };
function count(file, main) {
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
  return s.size;
}
const CMD = (t, src, o) => ({
  syft: `timeout ${TO} syft ${src} -o cyclonedx-json=${o}/syft.json`,
  trivy: `timeout ${TO} trivy fs ${src} --format cyclonedx --output ${o}/trivy.json`,
  cdxgen: `timeout ${TO} cdxgen -t go ${src} -o ${o}/cdxgen.json`,
  'cyclonedx-gomod': `timeout ${TO} cyclonedx-gomod mod -json -output ${o}/cyclonedx-gomod.json ${src}`,
}[t]);

let n = 0;
for (const { repo, na } of targets) {
  if (n >= N) break;
  if (done.has(repo)) continue;
  const { url, sha } = july.man[repo];
  const w = `/tmp/np_${repo}`, src = `${w}/src`;
  fs.rmSync(w, { recursive: true, force: true });
  fs.mkdirSync(`${w}/cold`, { recursive: true }); fs.mkdirSync(`${w}/warm`, { recursive: true }); fs.mkdirSync(src, { recursive: true });
  const env = {
    ...process.env, PATH: `${GO_BIN}:${TOOL_BIN}:${process.env.PATH}`,
    GOTOOLCHAIN: 'local', GOFLAGS: '-mod=mod', GOOS: 'linux', GOARCH: 'amd64', CGO_ENABLED: '1',
    GOMODCACHE: `${w}/mod`, GOCACHE: `${w}/build`,
  };
  run(`cd ${src} && git init -q && git remote add origin ${url} && timeout 300 git fetch -q --depth 1 origin ${sha} && git checkout -q FETCH_HEAD`, { env });
  if (run(`cd ${src} && git rev-parse HEAD`, { env }).stdout.trim() !== sha) { fs.rmSync(w, { recursive: true, force: true }); continue; }
  if (fs.existsSync(`${src}/go.work`)) env.GOFLAGS = '';
  const main = norm((run('timeout 120 go list -m', { env, cwd: src }).stdout.split('\n')[0] || '').trim().split(/\s+/)[0] || '');
  n++; process.stderr.write(`${repo} [${na.join(' ')}] ... `);
  for (const t of na) run(CMD(t, src, `${w}/cold`), { env });
  run(`cd ${src} && timeout ${TO} go mod download all`, { env });
  for (const t of na) run(CMD(t, src, `${w}/warm`), { env });
  const out = [];
  for (const t of na) {
    const c = count(`${w}/cold/${t}.json`, main), h = count(`${w}/warm/${t}.json`, main);
    const explains = (c === null && h !== null) ? 'YES' : 'no';
    out.push(`${t}:${c === null ? 'NA' : c}→${h === null ? 'NA' : h}`);
    fs.appendFileSync(OUTF, `${repo},${t},NA,${c === null ? 'NA' : 'ok'},${h === null ? 'NA' : 'ok'},${c === null ? 'NA' : c},${h === null ? 'NA' : h},${explains}\n`);
  }
  console.error(out.join(' '));
  fs.rmSync(w, { recursive: true, force: true });
}
console.log(`[done] ${OUTF}`);
