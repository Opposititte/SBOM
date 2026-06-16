#!/usr/bin/env node
// compute.js — precision / recall / F1 for cdxgen on a NON-Go ecosystem,
// against the native full-transitive ground truth produced by run_lang.sh.
//
//   node compute.js <js|php|python>
//
// Ground truth files (per results/<name>/):
//   js     gt_npm_lock.json       (package-lock.json; all packages, root excluded)
//   php    gt_composer_lock.json  (composer.lock; packages + packages-dev)
//   python gt_pip_report.json     (pip --report; install[], local file:// root excluded)
// Prediction: cdxgen_output.json  -> components with the ecosystem's purl prefix.
//
// Name-level and version-level (strict path+version) P/R/F1, mirroring the Go study.

const fs = require('fs');
const path = require('path');

const ECO = process.argv[2];
if (!['js', 'php', 'python'].includes(ECO)) {
  console.error('usage: node compute.js <js|php|python>'); process.exit(2);
}
const CFG = {
  js:     { dir: 'js',     purl: 'pkg:npm/',      gtFiles: ['gt_npm_lock.json'] },
  php:    { dir: 'php',    purl: 'pkg:composer/', gtFiles: ['gt_composer_all.json', 'gt_composer_lock.json', 'gt_composer_installed.json'] },
  python: { dir: 'python', purl: 'pkg:pypi/',     gtFiles: ['gt_pip_report.json'] },
}[ECO];
const findGt = (repoDir) => CFG.gtFiles.map(f => path.join(repoDir, f)).find(fs.existsSync);

const RESULTS = path.join(__dirname, CFG.dir, 'results');

// ---- name normalization per ecosystem ----
function normName(n) {
  n = decodeURIComponentSafe(n);
  if (ECO === 'python') return n.toLowerCase().replace(/[-_.]+/g, '-'); // PEP 503
  return n.toLowerCase();                                              // npm / composer
}
function decodeURIComponentSafe(s) { try { return decodeURIComponent(s); } catch (e) { return s; } }

// ---- ground-truth parsers ----
function gtJs(file) {
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  const deps = new Map();
  if (d.packages) {                       // lockfile v2/v3
    for (const [k, v] of Object.entries(d.packages)) {
      if (k === '') continue;             // root project
      if (!k.includes('node_modules/')) continue;
      // name = path after the LAST node_modules/ (nested deps live under deeper paths)
      const name = k.slice(k.lastIndexOf('node_modules/') + 'node_modules/'.length);
      if (!name) continue;
      deps.set(normName(name), v.version || '');
    }
  } else if (d.dependencies) {            // lockfile v1 (recursive)
    const walk = (obj) => {
      for (const [name, v] of Object.entries(obj)) {
        deps.set(normName(name), v.version || '');
        if (v.dependencies) walk(v.dependencies);
      }
    };
    walk(d.dependencies);
  }
  return deps;
}
function gtPhp(file) {
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  const deps = new Map();
  // composer.lock has {packages, packages-dev}; installed.json has {packages:[...]} or a bare array.
  const arrays = Array.isArray(d) ? [d]
    : [d.packages || [], d['packages-dev'] || []];
  for (const arr of arrays) {
    for (const pkg of arr) {
      if (!pkg || !pkg.name) continue;
      deps.set(normName(pkg.name), (pkg.version || '').replace(/^v/, ''));
    }
  }
  return deps;
}
function gtPython(file) {
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  const deps = new Map();
  for (const it of (d.install || [])) {
    const url = (it.download_info && it.download_info.url) || '';
    if (url.startsWith('file:')) continue;          // the local project itself
    const md = it.metadata || {};
    if (!md.name) continue;
    deps.set(normName(md.name), md.version || '');
  }
  return deps;
}
const GT = { js: gtJs, php: gtPhp, python: gtPython }[ECO];

// ---- cdxgen prediction parser ----
function purlName(purl) {
  if (!purl || !purl.startsWith(CFG.purl)) return null;
  const rest = purl.slice(CFG.purl.length).split('?')[0].split('#')[0];
  const at = rest.lastIndexOf('@');
  return { name: at === -1 ? rest : rest.slice(0, at),
           version: at === -1 ? '' : rest.slice(at + 1) };
}
function pred(file) {
  const out = new Map();
  let d;
  try { d = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return out; }
  // the project itself (self-reference) — exclude, mirroring the Go study's mainPath skip
  const selfP = purlName(d.metadata && d.metadata.component && d.metadata.component.purl);
  const self = selfP ? normName(selfP.name) : null;
  for (const c of (d.components || [])) {
    const pn = purlName(c.purl || '');
    if (!pn) continue;
    let name = normName(pn.name);
    if (!name || name === '-' || name === self) continue;   // drop self + junk
    let version = decodeURIComponentSafe(pn.version);
    if (ECO === 'php') version = version.replace(/^v/, '');
    out.set(name, version);
  }
  return out;
}

function prf(tp, fp, fn) {
  const p = tp + fp ? tp / (tp + fp) : 0;
  const r = tp + fn ? tp / (tp + fn) : 0;
  const f1 = p + r ? 2 * p * r / (p + r) : 0;
  return { p, r, f1 };
}
const pct = x => (x * 100).toFixed(1);

const repos = fs.readdirSync(RESULTS, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .map(e => e.name)
  .filter(n => findGt(path.join(RESULTS, n)))
  .sort();

const per = {};
console.log(`\n=== ${ECO}: cdxgen vs native ground truth ===\n`);
for (const repo of repos) {
  const gtPath = findGt(path.join(RESULTS, repo));
  let gt;
  try { gt = GT(gtPath); }
  catch (e) { console.log(`# ${repo}: GT parse error: ${e.message}`); continue; }
  const pr = pred(path.join(RESULTS, repo, 'cdxgen_output.json'));

  let tp = 0, fp = 0, tpv = 0;
  for (const [n, v] of pr) {
    if (gt.has(n)) { tp++; if (gt.get(n) === v) tpv++; } else fp++;
  }
  const fn = gt.size - tp;
  const name = prf(tp, fp, fn);
  const ver = prf(tpv, pr.size - tpv, gt.size - tpv);
  per[repo] = { gt: gt.size, predicted: pr.size, tp, fp, fn, tpv, name, ver };

  console.log(`# ${repo}`);
  console.log(`  ground truth file : ${path.basename(gtPath)}`);
  console.log(`  ground truth deps : ${gt.size}`);
  console.log(`  cdxgen predicted  : ${pr.size}`);
  console.log(`  name  P=${pct(name.p).padStart(5)}  R=${pct(name.r).padStart(5)}  F1=${pct(name.f1).padStart(5)}   (tp=${tp} fp=${fp} fn=${fn})`);
  console.log(`  ver   P=${pct(ver.p).padStart(5)}  R=${pct(ver.r).padStart(5)}  F1=${pct(ver.f1).padStart(5)}   (tpv=${tpv})`);
  console.log('');
}

// aggregate (micro over all repos)
let TP = 0, FP = 0, FN = 0, TPV = 0, PRED = 0, GTSUM = 0;
for (const r of Object.values(per)) {
  TP += r.tp; FP += r.fp; FN += r.fn; TPV += r.tpv; PRED += r.predicted; GTSUM += r.gt;
}
const micro = prf(TP, FP, FN);
const vmicro = prf(TPV, PRED - TPV, GTSUM - TPV);
console.log(`=== ${ECO} micro-average over ${repos.length} project(s) ===`);
console.log(`  name  P=${pct(micro.p)}  R=${pct(micro.r)}  F1=${pct(micro.f1)}   (TP=${TP} FP=${FP} FN=${FN})`);
console.log(`  ver   P=${pct(vmicro.p)}  R=${pct(vmicro.r)}  F1=${pct(vmicro.f1)}   (TPV=${TPV})`);

fs.writeFileSync(path.join(RESULTS, 'metrics.json'),
  JSON.stringify({ eco: ECO, per_repo: per,
    micro: { name: micro, version: vmicro, totals: { TP, FP, FN, TPV, PRED, GTSUM } } }, null, 2));
console.log(`\nwrote ${path.join(RESULTS, 'metrics.json')}`);
