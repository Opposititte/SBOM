#!/usr/bin/env node
// Compute precision / recall / F1 for syft, trivy, cdxgen against the
// `go list -m all` ground truth, restricted to Go modules (pkg:golang).
//
// Two matching granularities are reported:
//   name      -> module path only (does the tool find the dependency at all)
//   name@ver  -> module path AND exact version must match
//
// Ground truth: `go list -m all` = pruned module build list (Go 1.17+).
//   - line 1 is the MAIN module (no version) -> excluded from the dep set.
// Predicted: components whose purl is pkg:golang/... ; `stdlib` and the main
//   module are excluded. Non-Go ecosystems (npm, github actions, generic) are
//   out of scope for this ground truth and are ignored on both sides.
const fs = require('fs');

const REPOS = ['gin', 'cobra', 'hugo', 'frp', 'gorm', 'ollama'];
const TOOLS = ['syft', 'trivy', 'cdxgen'];

function norm(p) {
  try { p = decodeURIComponent(p); } catch (e) {}
  return p.toLowerCase();
}

// Parse `go list -m all` -> {main, deps: Map(path -> version)}
function parseGT(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n').map(l => l.trim()).filter(Boolean);
  let main = null;
  const deps = new Map();
  lines.forEach((line, i) => {
    const f = line.split(/\s+/);
    const path = norm(f[0]);
    if (i === 0 && f.length === 1) { main = path; return; } // main module
    // replace directive: orig vX => repl [vY]  -> effective version is last token after =>
    let version = f[1] || '';
    const arrow = f.indexOf('=>');
    if (arrow !== -1 && f.length > arrow + 1) {
      version = f[f.length - 1].startsWith('v') ? f[f.length - 1] : version;
    }
    deps.set(path, version);
  });
  return { main, deps };
}

// Parse golang components from a CycloneDX file -> Map(path -> version)
function parseGolang(file, mainPath) {
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  const out = new Map();
  for (const c of (d.components || [])) {
    let purl = c.purl || '';
    if (!purl.startsWith('pkg:golang/')) continue;
    let rest = purl.slice('pkg:golang/'.length);
    rest = rest.split('?')[0].split('#')[0];      // drop qualifiers/subpath
    const at = rest.lastIndexOf('@');
    let path = at === -1 ? rest : rest.slice(0, at);
    let version = at === -1 ? '' : rest.slice(at + 1);
    path = norm(path);
    if (path === 'stdlib' || path === mainPath) continue;
    if (!out.has(path)) out.set(path, version); // keep first
  }
  return out;
}

function prf(tp, fp, fn) {
  const p = tp + fp ? tp / (tp + fp) : 0;
  const r = tp + fn ? tp / (tp + fn) : 0;
  const f1 = p + r ? 2 * p * r / (p + r) : 0;
  return { p, r, f1 };
}

const results = {};
for (const repo of REPOS) {
  const gt = parseGT(`results/${repo}/gt_go_list.txt`);
  const gtSet = gt.deps;
  results[repo] = { gt_count: gtSet.size, main: gt.main, tools: {} };
  for (const tool of TOOLS) {
    const pred = parseGolang(`results/${repo}/${tool}_output.json`, gt.main);
    // name-level
    let tp = 0, fp = 0;
    for (const path of pred.keys()) (gtSet.has(path) ? tp++ : fp++);
    const fn = gtSet.size - tp;
    const nameM = prf(tp, fp, fn);
    // version-level: among predicted, count exact name+version matches
    let tpv = 0;
    for (const [path, ver] of pred) {
      if (gtSet.has(path) && gtSet.get(path) === ver) tpv++;
    }
    const fpv = pred.size - tpv;
    const fnv = gtSet.size - tpv;
    const verM = prf(tpv, fpv, fnv);
    results[repo].tools[tool] = {
      predicted: pred.size, tp, fp, fn,
      name: nameM,
      version: { tp: tpv, fp: fpv, fn: fnv, ...verM },
    };
  }
}

// ---- console table ----
const pct = x => (x * 100).toFixed(1);
console.log('\n=== Go-module SBOM accuracy vs `go list -m all` ===\n');
for (const repo of REPOS) {
  const R = results[repo];
  console.log(`# ${repo}  (ground-truth deps: ${R.gt_count})`);
  console.log('  tool    pred   TP   FP   FN | NAME  P / R / F1   | VER  P / R / F1');
  for (const tool of TOOLS) {
    const t = R.tools[tool];
    const n = t.name, v = t.version;
    console.log(
      `  ${tool.padEnd(7)} ${String(t.predicted).padStart(4)} ${String(t.tp).padStart(4)} ${String(t.fp).padStart(4)} ${String(t.fn).padStart(4)} | ` +
      `${pct(n.p).padStart(5)}/${pct(n.r).padStart(5)}/${pct(n.f1).padStart(5)} | ` +
      `${pct(v.p).padStart(5)}/${pct(v.r).padStart(5)}/${pct(v.f1).padStart(5)}`
    );
  }
  console.log('');
}

// ---- macro + micro averages per tool ----
console.log('=== Averages across the 6 repos (name-level) ===');
console.log('  tool     macro-P  macro-R  macro-F1 | micro-P  micro-R  micro-F1');
const agg = {};
for (const tool of TOOLS) {
  let mp = 0, mr = 0, mf = 0, TP = 0, FP = 0, FN = 0;
  for (const repo of REPOS) {
    const n = results[repo].tools[tool].name;
    mp += n.p; mr += n.r; mf += n.f1;
    const t = results[repo].tools[tool];
    TP += t.tp; FP += t.fp; FN += t.fn;
  }
  const k = REPOS.length;
  const micro = prf(TP, FP, FN);
  agg[tool] = { macro: { p: mp / k, r: mr / k, f1: mf / k }, micro };
  console.log(
    `  ${tool.padEnd(7)} ${pct(mp / k).padStart(7)} ${pct(mr / k).padStart(8)} ${pct(mf / k).padStart(9)} | ` +
    `${pct(micro.p).padStart(7)} ${pct(micro.r).padStart(8)} ${pct(micro.f1).padStart(9)}`
  );
}

fs.writeFileSync('results/metrics.json', JSON.stringify({ per_repo: results, averages: agg }, null, 2));
console.log('\nWrote results/metrics.json');
