#!/usr/bin/env node
// 正しいマクロ集計: 各GTについて
//   precision は tp+fp>0 のrepoのみ（ツールが何か報告した）
//   recall/F1 は tp+fn>0 のrepoのみ（正解GTに少なくとも1件ある＝find-rateが測れる）
// これにより「imported依存ゼロのrepoでツールが誤報告→recall=0」の押し下げを除外。
const fs = require('fs');
const rows = fs.readFileSync(__dirname + '/metrics_fresh.csv', 'utf8').trim().split('\n').slice(1).map(l => l.split(','));
const tools = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const combos = [['name', 'all', 2], ['name', 'imported', 5], ['name', 'impT', 8], ['ver', 'all', 11], ['ver', 'imported', 14], ['ver', 'impT', 17]];
const M = {};
for (const t of tools) { M[t] = {}; for (const [m, g] of combos.map(c => [c[0], c[1]])) M[t][m + '_' + g] = { p: [], r: [], f: [] }; }
for (const c of rows) {
  const t = c[1]; if (!tools.includes(t) || c[2] === 'NA' || c.length < 25) continue;
  for (const [m, g, i] of combos) {
    const tp = +c[i], fp = +c[i + 1], fn = +c[i + 2]; if (isNaN(tp)) continue;
    const A = M[t][m + '_' + g];
    if (tp + fp > 0) A.p.push(tp / (tp + fp));            // precision定義可
    if (tp + fn > 0) {                                     // GTに正解あり→recall/F1定義可
      const p = tp + fp > 0 ? tp / (tp + fp) : 0, r = tp / (tp + fn);
      A.r.push(r); A.f.push(p + r > 0 ? 2 * p * r / (p + r) : 0);
    }
  }
}
const avg = a => a.length ? (100 * a.reduce((s, x) => s + x, 0) / a.length).toFixed(1) : '-';
console.log('# 正しいマクロ集計（空GT除外）\n');
for (const m of ['name', 'ver']) {
  console.log(`## ${m === 'name' ? 'name一致' : 'version一致'} — macro P / R / F1 (%)\n`);
  console.log('| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |');
  console.log('|---|---|---|---|');
  for (const t of tools) {
    const g = k => M[t][m + '_' + k];
    console.log(`| ${t} | ${avg(g('all').p)} / ${avg(g('imported').p)} / ${avg(g('impT').p)} | ${avg(g('all').r)} / ${avg(g('imported').r)} / ${avg(g('impT').r)} | ${avg(g('all').f)} / ${avg(g('imported').f)} / ${avg(g('impT').f)} |`);
  }
  console.log('');
}
