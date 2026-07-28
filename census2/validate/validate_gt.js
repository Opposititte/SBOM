#!/usr/bin/env node
// validate_gt.js — GT-imported（go list -deps -e の出力）の妥当性検証。
//
//   目的: go/parser で「ビルド制約を無視して」直接 import を抽出した集合 A に対し、
//         A ⊆ GT-imported が成り立つかを確認し、GTの取りこぼし候補を列挙する。
//
//   使い方: node census2/validate/validate_gt.js [件数] [seed]
//           例) node census2/validate/validate_gt.js 5 42
//
//   注意: census2 はクローンとGTを保存していない（採点後に削除）ため、
//         本スクリプトが proc.sh と同じコマンド・同じ環境設定でGTを再生成する。
//         → 論文で用いたGTそのものの検証になる。
//
//   出力: census2/validate/out/missing_<N>.csv  … 取りこぼし候補（1 import 出現ごとに1行）
//         census2/validate/out/summary_<N>.csv  … リポジトリごとの要約
const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const N = +(process.argv[2] || 5);
const SEED = +(process.argv[3] || 42);
const BASE = path.resolve(__dirname, '..');          // census2/
const OUT = path.join(__dirname, 'out');
const SCANNER = path.join(__dirname, 'bin', 'importscan');
const GOBIN = '/opt/go1265/go/bin';

fs.mkdirSync(OUT, { recursive: true });

// ---- 再現可能な無作為抽出（mulberry32 + Fisher-Yates, seed固定）----
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const man = fs.readFileSync(BASE + '/manifest.csv', 'utf8').trim().split('\n').slice(1);
const okRepos = man.map(l => l.split(',')).filter(c => c[6] === 'OK')
  .map(c => ({ name: c[0], url: c[1] }))
  .sort((a, b) => a.name < b.name ? -1 : 1);        // 決定的な順序にしてから shuffle
const rnd = mulberry32(SEED);
const shuffled = okRepos.slice();
for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
const sample = shuffled.slice(0, N);

function sh(cmd, opts = {}) {
  try { return cp.execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 256 * 1024 * 1024, ...opts }); }
  catch (e) { return (e.stdout || ''); }
}
const isStdlib = p => { const first = p.split('/')[0]; return !first.includes('.'); };

const missRows = [], sumRows = [];
console.error(`# GT-imported 検証: N=${N}, seed=${SEED} (母集団 OK=${okRepos.length})\n`);

for (let i = 0; i < sample.length; i++) {
  const { name, url } = sample[i];
  const work = `/tmp/vgt_${name}`;
  const src = `${work}/src`;
  fs.rmSync(work, { recursive: true, force: true });
  fs.mkdirSync(src, { recursive: true });
  const env = { ...process.env, PATH: `${GOBIN}:${process.env.PATH}`, GOTOOLCHAIN: 'local', GOFLAGS: '-mod=mod', GOMODCACHE: `${work}/mod`, GOCACHE: `${work}/build` };

  process.stderr.write(`[${i + 1}/${sample.length}] ${name} ... `);
  sh(`timeout 300 git clone --depth=1 ${url} ${src}`, { env });
  if (!fs.existsSync(`${src}/go.mod`)) { console.error('SKIP(no go.mod)'); fs.rmSync(work, { recursive: true, force: true }); continue; }

  // proc.sh と同じ: go.work があれば -mod=mod を外す
  if (fs.existsSync(`${src}/go.work`)) env.GOFLAGS = '';
  const O = { env, cwd: src };

  const gmain = (sh('timeout 120 go list -m', O).split('\n')[0] || '').trim().split(/\s+/)[0];

  // --- GT-imported を proc.sh と同一コマンドで再生成 ---
  const gtRaw = sh(`timeout 600 env GOOS=linux go list -deps -e -f '{{with .Module}}{{.Path}}{{end}}' ./...`, O);
  const GT = new Set(gtRaw.split('\n').map(s => s.trim()).filter(s => s && s !== gmain));

  // --- go.mod の require / replace ---
  let req = [], rep = new Map();
  try {
    const j = JSON.parse(sh('go mod edit -json', O) || '{}');
    req = (j.Require || []).map(r => r.Path);
    (j.Replace || []).forEach(r => rep.set(r.Old.Path, (r.New && r.New.Path) || ''));
  } catch (e) { }
  const reqSorted = req.slice().sort((a, b) => b.length - a.length);   // 最長一致用

  // --- go/parser による import 抽出（ビルド制約を適用しない）---
  const scan = sh(`${SCANNER} ${src}`, { env });
  const imps = scan.split('\n').filter(Boolean).map(l => { try { return JSON.parse(l); } catch (e) { return null; } }).filter(Boolean);

  // --- import パス → モジュールパス（require への最長一致）---
  const A = new Map();   // module -> [{importPath,file,line,build,inReq,replaced}]
  let nSelf = 0, nStd = 0;
  for (const im of imps) {
    if (isStdlib(im.path)) { nStd++; continue; }
    if (gmain && (im.path === gmain || im.path.startsWith(gmain + '/'))) { nSelf++; continue; }
    let mod = reqSorted.find(m => im.path === m || im.path.startsWith(m + '/'));
    const inReq = !!mod;
    if (!mod) {                       // require に無い → import パス自体を暫定モジュール名に
      const seg = im.path.split('/');
      mod = seg.slice(0, Math.min(3, seg.length)).join('/');
    }
    if (!A.has(mod)) A.set(mod, []);
    A.get(mod).push({ ...im, inReq, replaced: rep.has(mod) });
  }

  // --- A ⊆ GT の検査 ---
  const missing = [...A.keys()].filter(m => !GT.has(m)).sort();
  for (const m of missing) for (const o of A.get(m))
    missRows.push([name, m, o.path, o.file, o.line, o.build ? 'yes' : 'no', o.inReq ? 'yes' : 'no', o.replaced ? 'yes' : 'no'].join(','));

  const nMissBuild = missing.filter(m => A.get(m).every(o => o.build)).length;
  sumRows.push([name, A.size, GT.size, missing.length, nMissBuild, missing.join(' ')].join(','));
  console.error(`A=${A.size} GT=${GT.size} 取りこぼし候補=${missing.length}${missing.length ? ' -> ' + missing.slice(0, 3).join(', ') : ''}`);

  fs.rmSync(work, { recursive: true, force: true });
}

fs.writeFileSync(`${OUT}/missing_${N}.csv`,
  'repo,module_path,import_path,file,line,build_constrained,in_require,replaced\n' + missRows.join('\n') + '\n');
fs.writeFileSync(`${OUT}/summary_${N}.csv`,
  'repo,n_setA,n_GT,n_missing,n_missing_all_build_constrained,missing_modules\n' + sumRows.join('\n') + '\n');
console.error(`\n[written] ${OUT}/missing_${N}.csv (${missRows.length} 行), ${OUT}/summary_${N}.csv`);
