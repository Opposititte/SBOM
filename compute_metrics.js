#!/usr/bin/env node
// compute_metrics.js — precision / recall / F1 for syft, trivy, cdxgen vs `go list -m all`.
//
// Auto-discovers every results/<name>/ folder that has a gt_go_list.txt, so it scales
// from 6 repos to all of awesome-go without editing this file.
//
// Restricted to Go modules (pkg:golang purls) on both sides — see results/metrics.md
// for the methodology and caveats (multi-module repos, etc.).
//
// Outputs:
//   results/metrics.json   full per-repo + averaged numbers
//   results/metrics.csv    one row per repo (easy to load in pandas/Excel for the paper)
//   stdout                 averages, plus a per-repo table when there are <= 25 repos
//                          (or always when VERBOSE=1).
//
// Read-only: this does not clone or modify any repo.

const fs = require('fs');
const path = require('path');

const RESULTS = process.env.RESULTS || 'results';
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const VERBOSE = process.env.VERBOSE === '1';

function norm(p) { try { p = decodeURIComponent(p); } catch (e) {} return p.toLowerCase(); }

function parseGT(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n').map(l => l.trim()).filter(Boolean);
  let main = null;
  const deps = new Map();
  lines.forEach((line, i) => {
    const f = line.split(/\s+/);
    const p = norm(f[0]);
    if (i === 0 && f.length === 1) { main = p; return; }   // main module (no version)
    let version = f[1] || '';
    const arrow = f.indexOf('=>');                          // replace directive
    if (arrow !== -1 && f.length > arrow + 1) {
      const last = f[f.length - 1];
      if (last.startsWith('v')) version = last;
    }
    deps.set(p, version);
  });
  return { main, deps };
}

function parseGolang(file, mainPath) {
  const out = new Map();
  let d;
  try { d = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return out; }
  for (const c of (d.components || [])) {
    const purl = c.purl || '';
    if (!purl.startsWith('pkg:golang/')) continue;
    let rest = purl.slice('pkg:golang/'.length).split('?')[0].split('#')[0];
    const at = rest.lastIndexOf('@');
    const p = norm(at === -1 ? rest : rest.slice(0, at));
    const version = at === -1 ? '' : rest.slice(at + 1);
    if (p === 'stdlib' || p === mainPath) continue;
    if (!out.has(p)) out.set(p, version);
  }
  return out;
}

function prf(tp, fp, fn) {
  const p = tp + fp ? tp / (tp + fp) : 0;
  const r = tp + fn ? tp / (tp + fn) : 0;
  const f1 = p + r ? 2 * p * r / (p + r) : 0;
  return { p, r, f1 };
}

// discover repos
const repos = fs.readdirSync(RESULTS, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .map(e => e.name)
  .filter(n => fs.existsSync(path.join(RESULTS, n, 'gt_go_list.txt')))
  .sort();

const results = {};
const skipped = [];
for (const repo of repos) {
  const gtFile = path.join(RESULTS, repo, 'gt_go_list.txt');
  const gt = parseGT(gtFile);
  if (gt.deps.size === 0) { skipped.push(repo); continue; }   // no usable ground truth
  results[repo] = { gt_count: gt.deps.size, tools: {} };
  for (const tool of TOOLS) {
    const pred = parseGolang(path.join(RESULTS, repo, `${tool}_output.json`), gt.main);
    let tp = 0, fp = 0;
    for (const p of pred.keys()) (gt.deps.has(p) ? tp++ : fp++);
    const fn = gt.deps.size - tp;
    const name = prf(tp, fp, fn);
    let tpv = 0;
    for (const [p, v] of pred) if (gt.deps.has(p) && gt.deps.get(p) === v) tpv++;
    const ver = prf(tpv, pred.size - tpv, gt.deps.size - tpv);
    results[repo].tools[tool] = { predicted: pred.size, tp, fp, fn, name, version: { tp: tpv, ...ver } };
  }
}

const evalRepos = Object.keys(results);
const pct = x => (x * 100).toFixed(1);

// per-repo CSV (always written)
const csv = ['repo,gt,tool,predicted,tp,fp,fn,precision,recall,f1,precision_ver,recall_ver,f1_ver'];
for (const repo of evalRepos) for (const tool of TOOLS) {
  const t = results[repo].tools[tool], n = t.name, v = t.version;
  csv.push([repo, results[repo].gt_count, tool, t.predicted, t.tp, t.fp, t.fn,
    n.p.toFixed(4), n.r.toFixed(4), n.f1.toFixed(4),
    v.p.toFixed(4), v.r.toFixed(4), v.f1.toFixed(4)].join(','));
}
fs.writeFileSync(path.join(RESULTS, 'metrics.csv'), csv.join('\n') + '\n');

// per-repo table (only when small, to avoid flooding stdout at scale)
if (VERBOSE || evalRepos.length <= 25) {
  console.log('\n=== per-repo (name-level P / R / F1) ===');
  for (const repo of evalRepos) {
    console.log(`# ${repo}  (gt: ${results[repo].gt_count})`);
    for (const tool of TOOLS) {
      const n = results[repo].tools[tool].name;
      console.log(`  ${tool.padEnd(7)} P=${pct(n.p).padStart(5)} R=${pct(n.r).padStart(5)} F1=${pct(n.f1).padStart(5)}`);
    }
  }
}

// macro + micro averages
const averages = {};
console.log(`\n=== averages over ${evalRepos.length} repos (name-level) ===`);
console.log('  tool     macro-P macro-R macro-F1 | micro-P micro-R micro-F1');
for (const tool of TOOLS) {
  let mp = 0, mr = 0, mf = 0, TP = 0, FP = 0, FN = 0;
  for (const repo of evalRepos) {
    const t = results[repo].tools[tool];
    mp += t.name.p; mr += t.name.r; mf += t.name.f1;
    TP += t.tp; FP += t.fp; FN += t.fn;
  }
  const k = evalRepos.length || 1;
  const micro = prf(TP, FP, FN);
  averages[tool] = { macro: { p: mp / k, r: mr / k, f1: mf / k }, micro, totals: { TP, FP, FN } };
  console.log(`  ${tool.padEnd(7)} ${pct(mp / k).padStart(7)} ${pct(mr / k).padStart(7)} ${pct(mf / k).padStart(8)} | ` +
    `${pct(micro.p).padStart(7)} ${pct(micro.r).padStart(7)} ${pct(micro.f1).padStart(8)}`);
}

fs.writeFileSync(path.join(RESULTS, 'metrics.json'),
  JSON.stringify({ repos_evaluated: evalRepos.length, repos_skipped: skipped, per_repo: results, averages }, null, 2));
console.log(`\nrepos evaluated: ${evalRepos.length}  |  skipped (empty/failed go list): ${skipped.length}`);
console.log(`wrote ${path.join(RESULTS, 'metrics.json')} and ${path.join(RESULTS, 'metrics.csv')}`);
