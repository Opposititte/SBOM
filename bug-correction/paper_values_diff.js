#!/usr/bin/env node
// paper_values_diff.js — 論文に掲載しているすべての数値について A と B_full の差分を出す。
//   人手で「ここだけ直せばよい」と判断せず、掲載物を同じスクリプトで生成して機械的に比較する。
//
// 比較対象:
//   表6   macro・name一致の P/R/F1        （verify.js: tab:result）
//   表7   共通分母での P/R/F1              （aggregate.js: SUMMARY_census.md の共通集合表）
//   表A.1 version一致                      （verify.js: tab:macro-ver）
//   表A.2 micro集計                        （verify.js: tab:micro-name）
//   表A.3 TP/FP/FN プール合計              （verify.js: tab:raw）
//   有効件数                               （verify.js: tab:valid）
//   表A.4 FP要因分類                       （verify.js: tab:fp）
//   6.4節 勝敗数・中央値差・効果量・z・p    （stats_wilcoxon.js）
'use strict';
const fs = require('fs'), path = require('path');
const DIR = __dirname;
const rows = ['location,table,tool,gt,metric,A,B_full,changed'];
let nChanged = 0;

const add = (loc, tbl, tool, gt, metric, a, b) => {
  const ch = String(a) !== String(b);
  if (ch) nChanged++;
  rows.push([loc, tbl, tool, gt, metric, a, b, ch ? 'YES' : ''].join(','));
};

// ---- verify.js 出力（表6 / A.1 / A.2 / A.3 / 有効件数）----
const TBL = { 'tab:result': ['表6', 'macro_name'], 'tab:macro-ver': ['表A.1', 'macro_version'], 'tab:micro-name': ['表A.2', 'micro_name'] };
function parseVerify(f) {
  const o = { pr: {}, raw: {}, valid: {}, fp: {} };
  let cur = null;
  for (const line of fs.readFileSync(f, 'utf8').split('\n')) {
    const h = line.match(/^### (tab:[\w-]+)/); if (h) { cur = h[1]; continue; }
    let m = line.match(/^(\S+)\s+P\/R\/F1\s+all\[([\d.]+)\/([\d.]+)\/([\d.]+)\]\s+imp\[([\d.]+)\/([\d.]+)\/([\d.]+)\]\s+impT\[([\d.]+)\/([\d.]+)\/([\d.]+)\]/);
    if (m && TBL[cur]) {
      [['all', 2], ['imported', 5], ['imported+test', 8]].forEach(([gt, i]) => {
        ['precision', 'recall', 'F1'].forEach((k, j) => { o.pr[`${cur}|${m[1]}|${gt}|${k}`] = m[i + j]; });
      });
      continue;
    }
    m = line.match(/^(\S+)\s+all\[(\d+)\/(\d+)\/(\d+)\]\s+imp\[(\d+)\/(\d+)\/(\d+)\]\s+impT\[(\d+)\/(\d+)\/(\d+)\]/);
    if (m) {
      [['all', 2], ['imported', 5], ['imported+test', 8]].forEach(([gt, i]) => {
        ['TP', 'FP', 'FN'].forEach((k, j) => { o.raw[`${m[1]}|${gt}|${k}`] = m[i + j]; });
      });
      continue;
    }
    m = line.match(/^(\S+)\s+valid=(\d+)\s+NA=(\d+)/);
    if (m) { o.valid[`${m[1]}|valid`] = m[2]; o.valid[`${m[1]}|NA`] = m[3]; continue; }
    // tab:fp（FP要因分類）。fp_* の6列は7月値を保持しているが、分母(FP合計)は補正で動くため
    // 百分率は変化しうる。掲載値である以上、比較から外さない。
    m = line.match(/^(\S+)\s+FP=(\d+) test=([\d.]+) os=([\d.]+) indirect=([\d.]+) 残余=([\d.]+) \(直=([\d.]+) gosum=([\d.]+) 兄弟=([\d.]+)\)/);
    if (m) {
      ['FP合計', 'test', 'os', 'indirect', '残余', '直接', 'gosum', '兄弟'].forEach((k, j) => { o.fp[`${m[1]}|${k}`] = m[2 + j]; });
    }
  }
  return o;
}
const VA = parseVerify(`${DIR}/A/out_verify.txt`), VB = parseVerify(`${DIR}/Bfull/out_verify.txt`);
for (const k of Object.keys(VA.pr)) {
  const [tb, tool, gt, metric] = k.split('|');
  add(TBL[tb][0], TBL[tb][1], tool, gt, metric, VA.pr[k], VB.pr[k]);
}
for (const k of Object.keys(VA.raw)) { const [tool, gt, metric] = k.split('|'); add('表A.3', 'pooled', tool, gt, metric, VA.raw[k], VB.raw[k]); }
for (const k of Object.keys(VA.valid)) { const [tool, metric] = k.split('|'); add('本文5.4', 'valid_counts', tool, '-', metric, VA.valid[k], VB.valid[k]); }
for (const k of Object.keys(VA.fp)) { const [tool, metric] = k.split('|'); add('表A.4', 'fp_cause', tool, 'imported', metric, VA.fp[k], VB.fp[k]); }

// ---- 表7: 共通集合（SUMMARY_census.md の該当表）----
function parseRobust(f) {
  const o = {}; let on = false;
  for (const line of fs.readFileSync(f, 'utf8').split('\n')) {
    if (/共通集合 n =/.test(line)) on = true;
    if (!on) continue;
    const m = line.match(/^\|\s*(syft|trivy|cdxgen|cyclonedx-gomod)\s*\|\s*([\d.]+)\s*\/\s*([\d.]+)\s*\/\s*([\d.]+)\s*\((\d+)\)\s*\|\s*([\d.]+)\s*\/\s*([\d.]+)\s*\/\s*([\d.]+)\s*\|/);
    if (m) {
      ['precision', 'recall', 'F1'].forEach((k, j) => {
        o[`${m[1]}|own|${k}`] = m[2 + j]; o[`${m[1]}|common|${k}`] = m[6 + j];
      });
      o[`${m[1]}|own|n`] = m[5];
    }
    if (on && /^## /.test(line) && !/共通/.test(line) && Object.keys(o).length) break;
  }
  return o;
}
const RA = parseRobust(`${DIR}/A/SUMMARY_census.md`), RB = parseRobust(`${DIR}/Bfull/SUMMARY_census.md`);
for (const k of Object.keys(RA)) { const [tool, set, metric] = k.split('|'); add('表7', `robust_${set}`, tool, 'imported', metric, RA[k], RB[k]); }

// ---- 6.4節: Wilcoxon ----
function parseW(f) {
  const o = {};
  for (const line of fs.readFileSync(f, 'utf8').split('\n')) {
    // 「(imported)」のような GT 表記が付く行と、付かない行（例: 「cdxgen imp vs all」）の
    // 両方を拾う。GT 表記を必須にすると後者を取りこぼし、掲載値の比較漏れになる。
    const m = line.match(/^(.+?)(?:\s*\((\w+)\))?\s*\|\s*勝敗 (\d+)\/(\d+) \| 中央値差 (-?[\d.]+)pt \| 効果量 (-?[\d.]+) \| z=(-?[\d.]+) \| p (\S+)/);
    if (!m) continue;
    const c = m[1].trim();
    m[2] = m[2] || '-';
    o[`${c}|${m[2]}|wins`] = m[3]; o[`${c}|${m[2]}|losses`] = m[4];
    o[`${c}|${m[2]}|median_pt`] = m[5]; o[`${c}|${m[2]}|effect`] = m[6];
    o[`${c}|${m[2]}|z`] = m[7]; o[`${c}|${m[2]}|p`] = m[8];
  }
  const n = (fs.readFileSync(f, 'utf8').match(/共通集合 n=(\d+)/) || [])[1];
  o['common_set|-|n'] = n;
  return o;
}
const WA = parseW(`${DIR}/A/out_wilcoxon.txt`), WB = parseW(`${DIR}/Bfull/out_wilcoxon.txt`);
for (const k of Object.keys(WA)) { const [cmp, gt, metric] = k.split('|'); add('6.4節', 'wilcoxon', `"${cmp}"`, gt, metric, WA[k], WB[k]); }

fs.writeFileSync(`${DIR}/paper_values_diff.csv`, rows.join('\n') + '\n');
console.log(`比較した掲載値: ${rows.length - 1} 個 / 変化: ${nChanged} 個\n`);
if (nChanged) {
  console.log('--- 変化した掲載値（これだけを本文で直す）---');
  for (const r of rows.slice(1)) { const c = r.split(','); if (c[7] === 'YES') console.log(`  ${c[0]} ${c[1]} ${c[2]} ${c[3]} ${c[4]}: ${c[5]} → ${c[6]}`); }
}
