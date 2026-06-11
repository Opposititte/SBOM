#!/usr/bin/env node
// analyze_fp3.js — decisive check: are "out-of-graph" cdxgen FPs a normalization artifact?
// For every repo, count cdxgen FPs (excl main) judged out-of-graph under STRICT norm,
// then how many are actually IN `all` under LOOSE norm (strip '!esc', percent, trailing /vN).
// rescued% ~ 0  => 74% is real;  rescued% high => normalization bug.
const fs = require('fs'), path = require('path');
const RES = process.env.RESULTS || 'resultsAll';
const strict = p => { try { p = decodeURIComponent(p); } catch (e) {} return p.toLowerCase(); };
const loose = p => strict(p).replace(/!([a-z])/g, '$1').replace(/\/v\d+$/, '');
function readAllSets(f) { const s = new Set(), sl = new Set(); if (!fs.existsSync(f)) return { s, sl };
  fs.readFileSync(f, 'utf8').split('\n').map(x => x.trim()).filter(Boolean).forEach((line, i) => {
    const a = line.split(/\s+/); if (i === 0 && a.length === 1) return; if (a[0]) { s.add(strict(a[0])); sl.add(loose(a[0])); } }); return { s, sl }; }
function mainOf(d) { const f = path.join(d, 'gt_go_list.txt'); if (!fs.existsSync(f)) return null;
  const fr = fs.readFileSync(f, 'utf8').split('\n')[0].trim().split(/\s+/); return fr.length === 1 ? strict(fr[0]) : null; }
function readCdx(f, main) { const out = []; let d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return out; }
  for (const c of (d.components || [])) { const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0]; const at = r.lastIndexOf('@'); const p = strict(at === -1 ? r : r.slice(0, at));
    if (p !== 'stdlib' && p !== main) out.push(p); } return [...new Set(out)]; }

const repos = fs.readdirSync(RES, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name)
  .filter(n => { const a = path.join(RES, n, 'gt_go_list.txt'), i = path.join(RES, n, 'gt_imported.txt');
    return fs.existsSync(a) && fs.statSync(a).size > 0 && fs.existsSync(i) && fs.statSync(i).size > 0; });

let outStrict = 0, rescuedLoose = 0; const examples = [];
for (const repo of repos) {
  const d = path.join(RES, repo); const { s: all, sl: allLoose } = readAllSets(path.join(d, 'gt_go_list.txt')); const main = mainOf(d);
  const imp = readAllSets(path.join(d, 'gt_imported.txt')).s;
  for (const m of readCdx(path.join(d, 'cdxgen_output.json'), main)) {
    if (imp.has(m)) continue;          // not an FP
    if (all.has(m)) continue;          // in-graph FP (strict)
    outStrict++;                       // out-of-graph (strict)
    if (allLoose.has(loose(m))) { rescuedLoose++; if (examples.length < 10) examples.push(`${repo}: ${m}`); }
  }
}
const pc = (a, b) => b ? (100 * a / b).toFixed(2) + '%' : '-';
console.log(`全 ${repos.length} repos での cdxgen「グラフ外FP」検算\n`);
console.log(`strict 正規化で グラフ外 と判定された総数 = ${outStrict}`);
console.log(`そのうち loose 正規化(!esc/vN除去)で all に一致(=救済) = ${rescuedLoose} (${pc(rescuedLoose, outStrict)})`);
console.log(rescuedLoose / outStrict < 0.02
  ? '\n→ 救済はほぼ0%。「グラフ外」は正規化バグではなく本物。74%は信頼できる。'
  : '\n→ 救済が無視できない。正規化バグの疑いあり。要修正。');
if (examples.length) { console.log('\n救済された例(正規化で実は一致していた):'); examples.forEach(e => console.log('  ' + e)); }
