#!/usr/bin/env node
// compute_gomod_gap.js — how close is cyclonedx-gomod (mod) output to GT-imported, per repo?
// Confirms whether the high precision is genuine (mod ≈ imported for libraries).
const fs = require('fs'), path = require('path');
const RES = process.env.RESULTS || 'resultsAll';
const norm = p => { try { p = decodeURIComponent(p); } catch (e) {} return p.toLowerCase(); };
function readSet(f) { const s = new Set(); if (!fs.existsSync(f)) return s;
  for (const line of fs.readFileSync(f, 'utf8').split('\n')) { const a = line.trim().split(/\s+/); if (a[0]) s.add(norm(a[0])); } return s; }
function mainOf(d) { const f = path.join(d, 'gt_go_list.txt'); if (!fs.existsSync(f)) return null;
  const fr = fs.readFileSync(f, 'utf8').split('\n')[0].trim().split(/\s+/); return fr.length === 1 ? norm(fr[0]) : null; }
function readTool(f, main) { const s = new Set(); let d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return s; }
  for (const c of (d.components || [])) { const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0]; const at = r.lastIndexOf('@'); const p = norm(at === -1 ? r : r.slice(0, at));
    if (p !== 'stdlib' && p !== main) s.add(p); } return s; }

const repos = fs.readdirSync(RES, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name)
  .filter(n => { const a = path.join(RES, n, 'gt_go_list.txt'), i = path.join(RES, n, 'gt_imported.txt');
    return fs.existsSync(a) && fs.statSync(a).size > 0 && fs.existsSync(i) && fs.statSync(i).size > 0; });

let sumImp = 0, sumMod = 0, sumFP = 0, sumFN = 0, exact = 0, within10 = 0, within25 = 0, big = 0;
const ratios = [];
for (const repo of repos) {
  const d = path.join(RES, repo); const imp = readSet(path.join(d, 'gt_imported.txt')); const main = mainOf(d);
  const mod = readTool(path.join(d, 'cyclonedx-gomod_output.json'), main);
  let tp = 0; for (const x of mod) if (imp.has(x)) tp++;
  const fp = mod.size - tp, fn = imp.size - tp;
  sumImp += imp.size; sumMod += mod.size; sumFP += fp; sumFN += fn;
  const ratio = imp.size ? mod.size / imp.size : 1; ratios.push(ratio);
  if (fp === 0 && fn === 0) exact++;
  const rel = imp.size ? Math.abs(mod.size - imp.size) / imp.size : 0;
  if (rel <= 0.10) within10++; if (rel <= 0.25) within25++; if (rel > 0.5) big++;
}
ratios.sort((a, b) => a - b);
const n = repos.length, pc = x => (100 * x / n).toFixed(1) + '%';
console.log(`cyclonedx-gomod(mod) と GT-imported のサイズ差（${n} repos）\n`);
console.log(`  平均 imported モジュール数 = ${(sumImp / n).toFixed(1)}`);
console.log(`  平均 mod 出力モジュール数  = ${(sumMod / n).toFixed(1)}`);
console.log(`  平均 余計(FP)/repo = ${(sumFP / n).toFixed(2)}   平均 見逃し(FN)/repo = ${(sumFN / n).toFixed(2)}`);
console.log(`  mod/imported サイズ比 中央値 = ${ratios[Math.floor(n / 2)].toFixed(3)}（1.0=完全一致）`);
console.log('');
console.log(`  mod が imported と完全一致(FP=0かつFN=0)         = ${exact} repos (${pc(exact)})`);
console.log(`  mod のサイズが imported の ±10% 以内             = ${within10} repos (${pc(within10)})`);
console.log(`  mod のサイズが imported の ±25% 以内             = ${within25} repos (${pc(within25)})`);
console.log(`  mod が imported より 50%超 多い(差が大きい)       = ${big} repos (${pc(big)})`);
