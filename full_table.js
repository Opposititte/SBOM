#!/usr/bin/env node
// full_table.js — ALL evaluable repos × 4 tools × 3 ground truths, in one big table.
// Output: results300/full_table.csv (Excel) and results300/full_table.md (viewable).
// One row per (repo, tool). Reuses existing tool outputs + derived GTs.
const fs = require('fs'), path = require('path');
const RESULTS = process.env.RESULTS || 'results300';
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const GTS = ['all', 'imported', 'direct'];
const FILE = { all: 'gt_go_list.txt', imported: 'gt_imported.txt', direct: 'gt_direct.txt' };
const pct = x => (x * 100).toFixed(1);
const norm = p => { try { p = decodeURIComponent(p); } catch (e) {} return p.toLowerCase(); };
function readGT(f, kind) { if (!fs.existsSync(f) || fs.statSync(f).size === 0) return null;
  const L = fs.readFileSync(f, 'utf8').split('\n').map(s => s.trim()).filter(Boolean); const s = new Set();
  L.forEach((line, i) => { const a = line.split(/\s+/); if (kind === 'all' && i === 0 && a.length === 1) return; if (a[0]) s.add(norm(a[0])); }); return s; }
function readTool(f, main) { const s = new Set(); let d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return s; }
  for (const c of (d.components || [])) { const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0]; const at = r.lastIndexOf('@'); const p = norm(at === -1 ? r : r.slice(0, at)); if (p !== 'stdlib' && p !== main) s.add(p); } return s; }
function mainOf(repo) { const f = path.join(RESULTS, repo, 'gt_go_list.txt'); if (!fs.existsSync(f)) return null;
  const first = fs.readFileSync(f, 'utf8').split('\n')[0].trim().split(/\s+/); return first.length === 1 ? norm(first[0]) : null; }
function prf(pred, gt) { if (!gt) return null; let tp = 0; for (const x of pred) if (gt.has(x)) tp++;
  const fp = pred.size - tp, fn = gt.size - tp; const p = tp + fp ? tp / (tp + fp) : 0, r = tp + fn ? tp / (tp + fn) : 0;
  return { p, r, f1: p + r ? 2 * p * r / (p + r) : 0 }; }

const repos = fs.readdirSync(RESULTS, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name)
  .filter(n => readGT(path.join(RESULTS, n, FILE.all), 'all')).sort();

const head = ['repo', 'all', 'imported', 'direct', 'tool', 'found',
  'P_all', 'R_all', 'F1_all', 'P_imp', 'R_imp', 'F1_imp', 'P_dir', 'R_dir', 'F1_dir'];
const csv = [head.join(',')];
const md = [`# 全リポジトリ × 4ツール × 3正解(all/imported/direct) の結果表`, '',
  `results300 の評価対象 ${repos.length} リポジトリ。P/R/F1 は％、name 一致。空欄はその正解が作れなかった repo。`, '',
  '| ' + head.join(' | ') + ' |', '|' + head.map(() => '---').join('|') + '|'];

for (const repo of repos) {
  const gts = {}; for (const g of GTS) gts[g] = readGT(path.join(RESULTS, repo, FILE[g]), g);
  for (const t of TOOLS) {
    const pred = readTool(path.join(RESULTS, repo, `${t}_output.json`), mainOf(repo));
    const m = {}; for (const g of GTS) m[g] = prf(pred, gts[g]);
    const cells = g => m[g] ? [pct(m[g].p), pct(m[g].r), pct(m[g].f1)] : ['', '', ''];
    const row = [repo, gts.all ? gts.all.size : '', gts.imported ? gts.imported.size : '', gts.direct ? gts.direct.size : '',
      t, pred.size, ...cells('all'), ...cells('imported'), ...cells('direct')];
    csv.push(row.join(','));
    md.push('| ' + row.join(' | ') + ' |');
  }
}
fs.writeFileSync(path.join(RESULTS, 'full_table.csv'), csv.join('\n') + '\n');
fs.writeFileSync(path.join(RESULTS, 'full_table.md'), md.join('\n') + '\n');
console.log(`repos: ${repos.length}, rows: ${csv.length - 1}`);
console.log(`wrote ${path.join(RESULTS, 'full_table.csv')} and full_table.md`);
