#!/usr/bin/env node
// ten_repos_detail.js — per-repo detail for a sample of repos:
// GT sizes (all/imported/direct) + each tool's found count and P/R/F1 vs each GT.
// Writes a Markdown report. Reuses existing tool outputs + derived GTs in results300/.
const fs = require('fs'), path = require('path');
const RESULTS = process.env.RESULTS || 'results300';
const N = parseInt(process.env.N || '10', 10);
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const GTS = ['all', 'imported', 'direct'];
const FILE = { all: 'gt_go_list.txt', imported: 'gt_imported.txt', direct: 'gt_direct.txt' };
const pct = x => (x * 100).toFixed(0);
const norm = p => { try { p = decodeURIComponent(p); } catch (e) {} return p.toLowerCase(); };
function readGT(f, kind) { if (!fs.existsSync(f)) return null;
  const L = fs.readFileSync(f, 'utf8').split('\n').map(s => s.trim()).filter(Boolean); const s = new Set();
  L.forEach((line, i) => { const a = line.split(/\s+/); if (kind === 'all' && i === 0 && a.length === 1) return; if (a[0]) s.add(norm(a[0])); }); return s; }
function readTool(f) { const s = new Set(); let d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return s; }
  for (const c of (d.components || [])) { const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0]; const at = r.lastIndexOf('@'); const p = norm(at === -1 ? r : r.slice(0, at)); if (p !== 'stdlib') s.add(p); } return s; }
function prf(pred, gt) { let tp = 0; for (const x of pred) if (gt.has(x)) tp++; const fp = pred.size - tp, fn = gt.size - tp;
  const p = tp + fp ? tp / (tp + fp) : 0, r = tp + fn ? tp / (tp + fn) : 0; return { p, r, f1: p + r ? 2 * p * r / (p + r) : 0 }; }

// eligible repos = have all 3 non-empty GTs
const all = fs.readdirSync(RESULTS, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name);
const eligible = all.filter(n => GTS.every(g => { const f = path.join(RESULTS, n, FILE[g]); return fs.existsSync(f) && fs.statSync(f).size > 0; })
  && readGT(path.join(RESULTS, n, FILE.all), 'all').size > 0);
eligible.sort((a, b) => readGT(path.join(RESULTS, a, FILE.all), 'all').size - readGT(path.join(RESULTS, b, FILE.all), 'all').size);
// pick N spread evenly across the size range
const pick = [];
for (let i = 0; i < N && i < eligible.length; i++) pick.push(eligible[Math.floor(i * (eligible.length - 1) / (N - 1))]);

let md = `# 10リポジトリの詳細：all / imported / direct と各ツールの結果\n\n`;
md += `正解(GT)3種のサイズと、各ツールの検出数(found)・P/R/F1(%) を正解別に表示。name 一致。\n`;
md += `（小さい順に範囲を広げて10件抽出。RESULTS=${RESULTS}）\n`;
for (const repo of pick) {
  const gts = {}; for (const g of GTS) gts[g] = readGT(path.join(RESULTS, repo, FILE[g]), g);
  md += `\n## ${repo}\n`;
  md += `- GT サイズ: **all=${gts.all.size}**, **imported=${gts.imported.size}**, **direct=${gts.direct.size}**\n\n`;
  md += `| ツール | found | all (P/R/F1) | imported (P/R/F1) | direct (P/R/F1) |\n`;
  md += `|--------|------:|:------------:|:-----------------:|:---------------:|\n`;
  for (const t of TOOLS) {
    const pred = readTool(path.join(RESULTS, repo, `${t}_output.json`));
    const cell = g => { const m = prf(pred, gts[g]); return `${pct(m.p)}/${pct(m.r)}/${pct(m.f1)}`; };
    md += `| ${t} | ${pred.size} | ${cell('all')} | ${cell('imported')} | ${cell('direct')} |\n`;
  }
}
fs.writeFileSync(path.join(RESULTS, 'ten_repos_detail.md'), md);
console.log(md);
console.log(`\n(eligible repos with all 3 GTs: ${eligible.length}; wrote ${path.join(RESULTS,'ten_repos_detail.md')})`);
