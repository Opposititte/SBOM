#!/usr/bin/env node
// compute_all.js — full awesome-go summary: 4 tools vs {all, imported}, name + version.
// Evaluated over repos that have BOTH non-empty `all` and `imported` GTs (comparable set).
// Writes resultsAll/summary_all_vs_imported.md + resultsAll/full_table.csv. Read-only on data.
const fs = require('fs'), path = require('path');
const RES = process.env.RESULTS || 'resultsAll';
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const pct = x => (x * 100).toFixed(1);
const norm = p => { try { p = decodeURIComponent(p); } catch (e) {} return p.toLowerCase(); };
function readGT(f, kind) { const m = new Map(); if (!fs.existsSync(f)) return m;
  const L = fs.readFileSync(f, 'utf8').split('\n').map(s => s.trim()).filter(Boolean);
  L.forEach((line, i) => { const a = line.split(/\s+/); if (kind === 'all' && i === 0 && a.length === 1) return;
    if (!a[0]) return; let ver = a[1] || ''; const ar = a.indexOf('=>');
    if (ar !== -1 && a.length > ar + 1 && a[a.length - 1].startsWith('v')) ver = a[a.length - 1];
    m.set(norm(a[0]), ver); }); return m; }
function mainOf(repo) { const f = path.join(RES, repo, 'gt_go_list.txt'); if (!fs.existsSync(f)) return null;
  const fr = fs.readFileSync(f, 'utf8').split('\n')[0].trim().split(/\s+/); return fr.length === 1 ? norm(fr[0]) : null; }
function readTool(f, main) { const m = new Map(); let d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return m; }
  for (const c of (d.components || [])) { const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0]; const at = r.lastIndexOf('@');
    const p = norm(at === -1 ? r : r.slice(0, at)); const ver = at === -1 ? '' : r.slice(at + 1);
    if (p !== 'stdlib' && p !== main && !m.has(p)) m.set(p, ver); } return m; }
function count(pred, gt, level) { let tp = 0; for (const [p, v] of pred) if (gt.has(p) && (level === 'name' || gt.get(p) === v)) tp++;
  return { tp, fp: pred.size - tp, fn: gt.size - tp }; }
function f1(tp, fp, fn) { const P = tp + fp ? tp / (tp + fp) : 0, R = tp + fn ? tp / (tp + fn) : 0; return { P, R, F: P + R ? 2 * P * R / (P + R) : 0 }; }

const repos = fs.readdirSync(RES, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name)
  .filter(n => { const a = path.join(RES, n, 'gt_go_list.txt'), i = path.join(RES, n, 'gt_imported.txt');
    return fs.existsSync(a) && fs.statSync(a).size > 0 && fs.existsSync(i) && fs.statSync(i).size > 0; }).sort();

// accumulators: agg[tool][gt][level] = {mp,mr,mf,n, TP,FP,FN}
const agg = {}; for (const t of TOOLS) { agg[t] = {}; for (const g of ['all', 'imported']) { agg[t][g] = {}; for (const l of ['name', 'ver']) agg[t][g][l] = { mp: 0, mr: 0, mf: 0, n: 0, TP: 0, FP: 0, FN: 0 }; } }
const csv = ['repo,all,imported,tool,predicted,tp_all,fp_all,fn_all,f1_all_name,f1_all_ver,tp_imp,fp_imp,fn_imp,f1_imp_name,f1_imp_ver'];

for (const repo of repos) {
  const GTs = { all: readGT(path.join(RES, repo, 'gt_go_list.txt'), 'all'), imported: readGT(path.join(RES, repo, 'gt_imported.txt'), 'imported') };
  const main = mainOf(repo);
  for (const t of TOOLS) {
    const pred = readTool(path.join(RES, repo, `${t}_output.json`), main);
    const row = [repo, GTs.all.size, GTs.imported.size, t, pred.size];
    const cell = {};
    for (const g of ['all', 'imported']) for (const l of ['name', 'ver']) {
      const c = count(pred, GTs[g], l); const m = f1(c.tp, c.fp, c.fn); const A = agg[t][g][l];
      A.mp += m.P; A.mr += m.R; A.mf += m.F; A.n++; A.TP += c.tp; A.FP += c.fp; A.FN += c.fn;
      cell[g + l] = { c, m };
    }
    row.push(cell.allname.c.tp, cell.allname.c.fp, cell.allname.c.fn, pct(cell.allname.m.F), pct(cell.allver.m.F),
      cell.importedname.c.tp, cell.importedname.c.fp, cell.importedname.c.fn, pct(cell.importedname.m.F), pct(cell.importedver.m.F));
    csv.push(row.join(','));
  }
}
fs.writeFileSync(path.join(RES, 'full_table.csv'), csv.join('\n') + '\n');

// ---- summary markdown ----
const out = [];
out.push(`# 全 awesome-go — 4ツール × 正解(all / imported) の集計\n`);
out.push(`対象: all と imported の両方が非空の **${repos.length} リポジトリ**（直接比較できるよう両GTがある repo に限定）。`);
out.push(`正解 all = \`go list -m all\` / 正解 imported = \`GOOS=linux go list -deps ... | sort -u\`。\n`);
function table(level, label) {
  const o = [`\n## ${label}（${repos.length}リポジトリ平均）\n`];
  o.push('| ツール | P(all) | R(all) | **F1(all)** | P(imp) | R(imp) | **F1(imp)** |');
  o.push('|--------|------:|------:|----------:|------:|------:|----------:|');
  for (const t of TOOLS) {
    const a = agg[t].all[level], i = agg[t].imported[level];
    o.push(`| ${t} | ${pct(a.mp / a.n)} | ${pct(a.mr / a.n)} | **${pct(a.mf / a.n)}** | ${pct(i.mp / i.n)} | ${pct(i.mr / i.n)} | **${pct(i.mf / i.n)}** |`);
  }
  return o.join('\n');
}
out.push(table('name', '【A】名前一致 macro平均'));
out.push(table('ver', '【B】バージョン一致(厳格) macro平均'));
// micro (name-level)
out.push('\n## micro平均（name一致, 全TP/FP/FN を合算）\n');
out.push('| ツール | F1(all) | F1(imp) |');
out.push('|--------|------:|------:|');
for (const t of TOOLS) { const a = agg[t].all.name, i = agg[t].imported.name;
  out.push(`| ${t} | ${pct(f1(a.TP, a.FP, a.FN).F)} | ${pct(f1(i.TP, i.FP, i.FN).F)} |`); }
out.push('\n- per-repo の全数値は `full_table.csv`（' + (csv.length - 1) + ' 行）。');
fs.writeFileSync(path.join(RES, 'summary_all_vs_imported.md'), out.join('\n') + '\n');
console.log(out.join('\n'));
console.log(`\nwrote ${RES}/summary_all_vs_imported.md and full_table.csv (repos=${repos.length})`);
