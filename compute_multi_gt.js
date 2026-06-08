#!/usr/bin/env node
// compute_multi_gt.js — compare each tool against THREE ground-truth definitions:
//   all      = `go list -m all`            (full module build list; gt_go_list.txt)
//   imported = `go list -deps` module set  (modules actually compiled in; gt_imported.txt)
//   direct   = go.mod require (non-indirect)(top-level declared; gt_direct.txt)
// Shows name-level Precision/Recall/F1 of every tool vs every GT — the core thesis insight
// that "accuracy" depends on which definition of 'dependency' you measure against.
//
// Read-only. Reuses existing tool outputs in results/<repo>/.
const fs = require('fs'), path = require('path');
const RESULTS = process.env.RESULTS || 'results';
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const GTS = ['all', 'imported', 'direct'];
const pct = x => (x * 100).toFixed(1);
const norm = p => { try { p = decodeURIComponent(p); } catch (e) {} return p.toLowerCase(); };

function readGT(file, kind) {
  if (!fs.existsSync(file)) return null;
  const lines = fs.readFileSync(file, 'utf8').split('\n').map(l => l.trim()).filter(Boolean);
  const s = new Set();
  lines.forEach((line, i) => {
    const f = line.split(/\s+/);
    if (kind === 'all' && i === 0 && f.length === 1) return; // main module
    if (f[0]) s.add(norm(f[0]));
  });
  return s;
}
function readTool(file, main) {
  const s = new Set();
  let d; try { d = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return s; }
  for (const c of (d.components || [])) {
    const purl = c.purl || ''; if (!purl.startsWith('pkg:golang/')) continue;
    let rest = purl.slice(11).split('?')[0].split('#')[0];
    const at = rest.lastIndexOf('@'); const p = norm(at === -1 ? rest : rest.slice(0, at));
    if (p !== 'stdlib' && p !== main) s.add(p);
  }
  return s;
}
function mainOf(repo) { const f = path.join(RESULTS, repo, 'gt_go_list.txt'); if (!fs.existsSync(f)) return null;
  const first = fs.readFileSync(f, 'utf8').split('\n')[0].trim().split(/\s+/); return first.length === 1 ? norm(first[0]) : null; }
function prf(pred, gt) {
  let tp = 0; for (const x of pred) if (gt.has(x)) tp++;
  const fp = pred.size - tp, fn = gt.size - tp;
  const p = tp + fp ? tp / (tp + fp) : 0, r = tp + fn ? tp / (tp + fn) : 0;
  return { tp, fp, fn, p, r, f1: p + r ? 2 * p * r / (p + r) : 0 };
}

const repos = fs.readdirSync(RESULTS, { withFileTypes: true }).filter(e => e.isDirectory())
  .map(e => e.name).filter(n => fs.existsSync(path.join(RESULTS, n, 'gt_go_list.txt'))).sort();

// accumulate macro averages per (tool, gt)
const acc = {}; for (const t of TOOLS) for (const g of GTS) acc[t + '|' + g] = { r: 0, p: 0, f1: 0, n: 0 };

for (const repo of repos) {
  const gts = {
    all: readGT(path.join(RESULTS, repo, 'gt_go_list.txt'), 'all'),
    imported: readGT(path.join(RESULTS, repo, 'gt_imported.txt'), 'imported'),
    direct: readGT(path.join(RESULTS, repo, 'gt_direct.txt'), 'direct'),
  };
  const tools = {}; for (const t of TOOLS) tools[t] = readTool(path.join(RESULTS, repo, `${t}_output.json`), mainOf(repo));
  for (const t of TOOLS) for (const g of GTS) {
    if (!gts[g] || gts[g].size === 0) continue;            // skip missing/empty GT (e.g. frp imported failed)
    const m = prf(tools[t], gts[g]); const k = acc[t + '|' + g];
    k.r += m.r; k.p += m.p; k.f1 += m.f1; k.n++;
  }
}

console.log(`\nRecall (%) of each tool vs each ground truth — macro avg over repos`);
console.log('tool             |  all   | imported | direct');
for (const t of TOOLS) {
  const row = GTS.map(g => { const k = acc[t + '|' + g]; return k.n ? pct(k.r / k.n) : ' n/a'; });
  console.log(`${t.padEnd(16)} | ${row[0].padStart(5)}  |  ${row[1].padStart(5)}   | ${row[2].padStart(5)}`);
}
console.log(`\nF1 (%) of each tool vs each ground truth — macro avg`);
console.log('tool             |  all   | imported | direct');
for (const t of TOOLS) {
  const row = GTS.map(g => { const k = acc[t + '|' + g]; return k.n ? pct(k.f1 / k.n) : ' n/a'; });
  console.log(`${t.padEnd(16)} | ${row[0].padStart(5)}  |  ${row[1].padStart(5)}   | ${row[2].padStart(5)}`);
}
console.log(`\nPrecision (%) of each tool vs each ground truth — macro avg`);
console.log('tool             |  all   | imported | direct');
for (const t of TOOLS) {
  const row = GTS.map(g => { const k = acc[t + '|' + g]; return k.n ? pct(k.p / k.n) : ' n/a'; });
  console.log(`${t.padEnd(16)} | ${row[0].padStart(5)}  |  ${row[1].padStart(5)}   | ${row[2].padStart(5)}`);
}
