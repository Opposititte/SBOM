#!/usr/bin/env node
// 全データ metrics_fresh.csv から確定版の表を生成。
// cols: 0repo 1tool | name all(2,3,4) imp(5,6,7) impT(8,9,10) | ver all(11,12,13) imp(14,15,16) impT(17,18,19)
//       | fp_test(20) fp_otherOS(21) fp_direct_unused(22) fp_indirect_unused(23) fp_residual(24)
const fs = require('fs');
const rows = fs.readFileSync(__dirname + '/metrics_fresh.csv', 'utf8').trim().split('\n').slice(1).map(l => l.split(','));
const tools = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const combos = [['name', 'all', 2], ['name', 'imported', 5], ['name', 'impT', 8], ['ver', 'all', 11], ['ver', 'imported', 14], ['ver', 'impT', 17]];
const M = {}, C = {};
for (const t of tools) { M[t] = {}; C[t] = {}; for (const [m, g] of combos.map(c => [c[0], c[1]])) { M[t][m + '_' + g] = { p: [], r: [], f: [] }; C[t][m + '_' + g] = { tp: 0, fp: 0, fn: 0 }; } }
let nrepo = new Set();
for (const c of rows) {
  const t = c[1]; if (!tools.includes(t)) continue;
  if (c[2] === 'NA' || c.length < 25) continue;
  nrepo.add(c[0]);
  for (const [m, g, i] of combos) {
    const tp = +c[i], fp = +c[i + 1], fn = +c[i + 2];
    if (isNaN(tp)) continue;
    const C0 = C[t][m + '_' + g]; C0.tp += tp; C0.fp += fp; C0.fn += fn;
    if (tp + fp + fn === 0) continue;
    const p = tp / (tp + fp || 1), r = tp / (tp + fn || 1), f = 2 * p * r / ((p + r) || 1);
    const A = M[t][m + '_' + g]; A.p.push(p); A.r.push(r); A.f.push(f);
  }
}
const avg = a => a.length ? (100 * a.reduce((s, x) => s + x, 0) / a.length).toFixed(1) : '-';
const n = x => x.toLocaleString();
console.log('# 同一時点フル再収集 — 確定版 (全' + nrepo.size + ' repos)\n');
for (const m of ['name', 'ver']) {
  console.log(`\n## ${m === 'name' ? 'name一致' : 'version一致'} — macro平均 P / R / F1 (%)\n`);
  console.log('| ツール | precision (all/imp/impT) | recall (all/imp/impT) | f1 (all/imp/impT) |');
  console.log('|---|---|---|---|');
  for (const t of tools) {
    const g = k => M[t][m + '_' + k];
    console.log(`| ${t} | ${avg(g('all').p)} / ${avg(g('imported').p)} / ${avg(g('impT').p)} | ${avg(g('all').r)} / ${avg(g('imported').r)} / ${avg(g('impT').r)} | **${avg(g('all').f)} / ${avg(g('imported').f)} / ${avg(g('impT').f)}** |`);
  }
}
for (const m of ['name', 'ver']) {
  console.log(`\n## ${m === 'name' ? 'name一致' : 'version一致'} — TP / FP / FN プール合計\n`);
  for (const g of ['all', 'imported', 'impT']) {
    console.log(`### ${g}`);
    console.log('| ツール | TP | FP | FN |');
    console.log('|---|---|---|---|');
    for (const t of tools) { const c = C[t][m + '_' + g]; console.log(`| ${t} | ${n(c.tp)} | ${n(c.fp)} | ${n(c.fn)} |`); }
    console.log('');
  }
}
