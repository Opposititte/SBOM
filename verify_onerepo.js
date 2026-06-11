#!/usr/bin/env node
// verify_onerepo.js — sanity-check the "out-of-graph FP" classification on ONE repo.
// For a repo, list cdxgen modules judged "not in go list -m all" and re-check each with a
// LOOSE normalization (strip '!escape', percent, trailing /vN) to catch normalization misses.
const fs = require('fs'), path = require('path');
const RES = process.env.RESULTS || 'resultsAll';
const strict = p => { try { p = decodeURIComponent(p); } catch (e) {} return p.toLowerCase(); };
const loose = p => strict(p).replace(/!([a-z])/g, '$1').replace(/\/v\d+$/, '');  // also drop /vN
function readAll(f) { const m = new Map(); if (!fs.existsSync(f)) return m;   // strict->raw, and loose index
  fs.readFileSync(f, 'utf8').split('\n').map(s => s.trim()).filter(Boolean).forEach((line, i) => {
    const a = line.split(/\s+/); if (i === 0 && a.length === 1) return; if (a[0]) m.set(strict(a[0]), a[0]); }); return m; }
function rawCdx(f) { const out = []; let d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return out; }
  for (const c of (d.components || [])) { const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0]; const at = r.lastIndexOf('@'); out.push({ raw: at === -1 ? r : r.slice(0, at), purl: u }); } return out; }

// pick repo: arg, or first with many out-of-graph cdxgen FPs
let repo = process.argv[2];
if (!repo) {
  const cand = fs.readdirSync(RES, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name)
    .filter(n => fs.existsSync(path.join(RES, n, 'gt_go_list.txt')) && fs.statSync(path.join(RES, n, 'gt_go_list.txt')).size > 200
      && fs.existsSync(path.join(RES, n, 'cdxgen_output.json')));
  for (const n of cand) { const all = readAll(path.join(RES, n, 'gt_go_list.txt'));
    const out = rawCdx(path.join(RES, n, 'cdxgen_output.json')).filter(c => !all.has(strict(c.raw)));
    if (out.length >= 10) { repo = n; break; } }
}
const d = path.join(RES, repo);
const all = readAll(path.join(d, 'gt_go_list.txt'));
const cdx = rawCdx(path.join(d, 'cdxgen_output.json'));
const allLoose = new Set([...all.keys()].map(loose));
console.log(`repo = ${repo}`);
console.log(`go list -m all のモジュール数 = ${all.size}`);
console.log(`cdxgen の golang モジュール数 = ${cdx.length}\n`);
console.log('=== cdxgen purl の生形式サンプル（! や % が混ざってないか）===');
cdx.slice(0, 6).forEach(c => console.log('  ' + c.purl));
const outFP = cdx.filter(c => !all.has(strict(c.raw)));
console.log(`\n=== "グラフ外" と判定された cdxgen モジュール ${outFP.length} 個（最大15）===`);
let rescued = 0;
outFP.slice(0, 15).forEach(c => {
  const looseHit = allLoose.has(loose(c.raw));
  if (looseHit) rescued++;
  console.log(`  ${looseHit ? '⚠ 緩い正規化で all に一致(=正規化ミス)' : '本当にグラフ外          '} : ${c.raw}`);
});
console.log(`\n判定: グラフ外15個中、緩い正規化で実は一致 = ${rescued} 個`);
console.log(rescued === 0 ? '→ 正規化ミスではない。「グラフ外」は本物。' : '→ 正規化ミスの疑い。74%は過大評価かもしれない。');
