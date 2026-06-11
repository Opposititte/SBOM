#!/usr/bin/env node
// analyze_cdxgen.js — diagnose cdxgen GT-all F1 across datasets / conditions.
const fs = require('fs'), path = require('path');
const RES = process.env.RESULTS || 'resultsAll';
const ONLY = (process.env.REPOS || '').split(',').filter(Boolean); // optional explicit repo list
const norm = p => { try { p = decodeURIComponent(p); } catch (e) {} return p.toLowerCase(); };
function readGT(f) { const s = new Set(); if (!fs.existsSync(f)) return s;
  const L = fs.readFileSync(f, 'utf8').split('\n').map(x => x.trim()).filter(Boolean);
  L.forEach((line, i) => { const a = line.split(/\s+/); if (i === 0 && a.length === 1) return; if (a[0]) s.add(norm(a[0])); }); return s; }
function mainOf(d) { const f = path.join(d, 'gt_go_list.txt'); if (!fs.existsSync(f)) return null;
  const fr = fs.readFileSync(f, 'utf8').split('\n')[0].trim().split(/\s+/); return fr.length === 1 ? norm(fr[0]) : null; }
function readTool(f, main) { const s = new Set(); let d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return s; }
  for (const c of (d.components || [])) { const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0]; const at = r.lastIndexOf('@'); const p = norm(at === -1 ? r : r.slice(0, at));
    if (p !== 'stdlib' && p !== main) s.add(p); } return s; }

let repos = ONLY.length ? ONLY : fs.readdirSync(RES, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name)
  .filter(n => { const a = path.join(RES, n, 'gt_go_list.txt'), i = path.join(RES, n, 'gt_imported.txt');
    return fs.existsSync(a) && fs.statSync(a).size > 0 && fs.existsSync(i) && fs.statSync(i).size > 0; });

let nAll = 0, sumF = 0, nNonEmpty = 0, sumFne = 0, emptyCdx = 0, smallN = 0, smallF = 0, bigN = 0, bigF = 0;
for (const repo of repos) {
  const d = path.join(RES, repo);
  const gt = readGT(path.join(d, 'gt_go_list.txt')); if (gt.size === 0) continue;
  const pred = readTool(path.join(d, 'cdxgen_output.json'), mainOf(d));
  let tp = 0; for (const x of pred) if (gt.has(x)) tp++;
  const fp = pred.size - tp, fn = gt.size - tp;
  const P = tp + fp ? tp / (tp + fp) : 0, R = tp + fn ? tp / (tp + fn) : 0, F = P + R ? 2 * P * R / (P + R) : 0;
  nAll++; sumF += F;
  if (pred.size === 0) emptyCdx++; else { nNonEmpty++; sumFne += F; }
  if (gt.size <= 10) { smallN++; smallF += F; } else { bigN++; bigF += F; }
}
const pc = x => (x * 100).toFixed(1);
console.log(`RESULTS=${RES}  対象 ${nAll} repos（cdxgen vs all, name一致, macro）`);
console.log(`  macro F1（全 ${nAll}）            = ${pc(sumF / nAll)}`);
console.log(`  cdxgen 出力が空(=失敗/依存0)     = ${emptyCdx} repos（これらは F1=0 で平均を下げる）`);
console.log(`  macro F1（cdxgen 非空 ${nNonEmpty} のみ）= ${pc(sumFne / (nNonEmpty || 1))}`);
console.log(`  小repo(all<=10) ${smallN}件 の macro F1 = ${pc(smallF / (smallN || 1))}`);
console.log(`  大repo(all>10)  ${bigN}件 の macro F1 = ${pc(bigF / (bigN || 1))}`);
