#!/usr/bin/env node
// unresolved_bounds.js — 補正の証拠が得られなかった homedepot__flop について、
//   ツールが自モジュールを出力していた場合／いなかった場合の両端を計算し、
//   B の macro F1 が掲載精度（小数第1位）で一意に定まるかを検証する。
//
// 【補正が各セルに与える影響（機構から導出）】
//   自モジュール除外漏れの実体:
//     - GT-all は生出力のため main 行を含む   → 補正で GT-all のサイズが 1 減る
//     - GT-imported / GT-impT は main を含まない（実測で確認済み）
//     - ツール出力に main が含まれるかはツール依存
//   したがって補正後は:
//     ツールが main を出力していた場合:  all TP-1 / imported FP-1 / impT FP-1
//     ツールが main を出力していない場合: all FN-1 / imported・impT 変化なし
//   この2通りが取りうる値の両端になる。
'use strict';
const fs = require('fs'), path = require('path'), cp = require('child_process');
const DIR = __dirname, ROOT = path.resolve(DIR, '..');
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const UNRESOLVED = 'homedepot__flop';

const L = fs.readFileSync(DIR + '/metrics_B.csv', 'utf8').trim().split('\n');
const HEAD = L[0].split(','), ix = Object.fromEntries(HEAD.map((h, i) => [h, i]));
const rows = L.slice(1).map(l => l.split(','));

const GTS = [['all', 'n_all', 'v_all'], ['imp', 'n_imp', 'v_imp'], ['impT', 'n_impT', 'v_impT']];
// 1リポジトリ分の macro 平均への寄与を計算するため、tool ごとに全 repo の F1 を集める
function macroF1(tool, gtPrefix, override) {
  const vals = [];
  for (const c of rows) {
    if (c[1] !== tool) continue;
    if (c[2] === 'NA' || c.length < 20) continue;
    let tp = +c[ix[gtPrefix + '_tp']], fp = +c[ix[gtPrefix + '_fp']], fn = +c[ix[gtPrefix + '_fn']];
    if (c[0] === UNRESOLVED && override) { tp += override.tp; fp += override.fp; fn += override.fn; }
    const p = (tp + fp) ? tp / (tp + fp) : 0, r = (tp + fn) ? tp / (tp + fn) : 0;
    vals.push((p + r) ? 2 * p * r / (p + r) : 0);
  }
  return vals.reduce((a, b) => a + b, 0) / vals.length * 100;
}

// 2つのシナリオ
const SCEN = {
  emitted_main: { all: { tp: -1, fp: 0, fn: 0 }, imp: { tp: 0, fp: -1, fn: 0 }, impT: { tp: 0, fp: -1, fn: 0 } },
  no_main: { all: { tp: 0, fp: 0, fn: -1 }, imp: { tp: 0, fp: 0, fn: 0 }, impT: { tp: 0, fp: 0, fn: 0 } },
};

const out = ['tool,gt,match_type,B_as_is,scenario_emitted_main,scenario_no_main,min,max,rounded_unique'];
const July = {};
{
  const JL = fs.readFileSync(ROOT + '/metrics.csv', 'utf8').trim().split('\n').slice(1);
  for (const l of JL) { const c = l.split(','); if (c[0] === UNRESOLVED) July[c[1]] = c; }
}
let allUnique = true;
for (const tool of TOOLS) {
  for (const [g, np, vp] of GTS) {
    for (const [mt, pre] of [['name', np], ['version', vp]]) {
      const base = macroF1(tool, pre, null);
      const a = macroF1(tool, pre, SCEN.emitted_main[g]);
      const b = macroF1(tool, pre, SCEN.no_main[g]);
      const lo = Math.min(a, b), hi = Math.max(a, b);
      const uniq = lo.toFixed(1) === hi.toFixed(1);
      if (!uniq) allUnique = false;
      out.push([tool, g, mt, base.toFixed(3), a.toFixed(3), b.toFixed(3), lo.toFixed(1), hi.toFixed(1), uniq ? 'yes' : 'NO'].join(','));
    }
  }
}
fs.writeFileSync(DIR + '/unresolved_bounds.csv', out.join('\n') + '\n');
console.log(`未解決1件（${UNRESOLVED}）の両端を計算した。`);
console.log(`小数第1位で一意に定まるか: ${allUnique ? 'すべて一意' : '★一意でない組み合わせあり'}`);
console.log('\n--- name一致・F1（論文の主表に対応）---');
for (const l of out.slice(1)) {
  const c = l.split(',');
  if (c[2] !== 'name') continue;
  console.log(`  ${c[0].padEnd(16)} ${c[1].padEnd(5)} B=${c[3]}  main出力あり=${c[4]}  main出力なし=${c[5]}  → ${c[6]}〜${c[7]}  一意=${c[8]}`);
}
