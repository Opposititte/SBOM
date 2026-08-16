#!/usr/bin/env node
// raw-output/ に保存した verify.js / stats_wilcoxon.js の生出力を構造化 CSV にする。
// 数値は生出力からパースするだけで、ここでは一切再計算しない（二重実装を避けるため）。
'use strict';
const fs = require('fs'), path = require('path');
const D = path.resolve(__dirname, '..');
const SETS = ['july_full', 'cold_full', 'july_n1466', 'cold_n1466'];

// ---- macro / micro の P/R/F1 ----
const TABLES = { 'tab:result': 'macro_name', 'tab:macro-ver': 'macro_version', 'tab:micro-name': 'micro_name' };
const f1rows = ['dataset,table,tool,gt,precision,recall,f1'];
const rawrows = ['dataset,tool,gt,tp,fp,fn'];
const validrows = ['dataset,tool,valid,na'];
for (const s of SETS) {
  const txt = fs.readFileSync(`${D}/raw-output/${s}_verify.txt`, 'utf8');
  let cur = null;
  for (const line of txt.split('\n')) {
    const h = line.match(/^### (tab:[\w-]+)/); if (h) { cur = TABLES[h[1]] || h[1]; continue; }
    let m = line.match(/^(\S+)\s+P\/R\/F1\s+all\[([\d.]+)\/([\d.]+)\/([\d.]+)\]\s+imp\[([\d.]+)\/([\d.]+)\/([\d.]+)\]\s+impT\[([\d.]+)\/([\d.]+)\/([\d.]+)\]/);
    if (m && cur && cur.startsWith('m')) {
      const t = m[1];
      [['all', 2], ['imported', 5], ['imported+test', 8]].forEach(([gt, i]) =>
        f1rows.push([s, cur, t, gt, m[i], m[i + 1], m[i + 2]].join(',')));
      continue;
    }
    m = line.match(/^(\S+)\s+all\[(\d+)\/(\d+)\/(\d+)\]\s+imp\[(\d+)\/(\d+)\/(\d+)\]\s+impT\[(\d+)\/(\d+)\/(\d+)\]/);
    if (m) {
      const t = m[1];
      [['all', 2], ['imported', 5], ['imported+test', 8]].forEach(([gt, i]) =>
        rawrows.push([s, t, gt, m[i], m[i + 1], m[i + 2]].join(',')));
      continue;
    }
    m = line.match(/^(\S+)\s+valid=(\d+)\s+NA=(\d+)/);
    if (m) validrows.push([s, m[1], m[2], m[3]].join(','));
  }
}
fs.writeFileSync(`${D}/macro_f1.csv`, f1rows.join('\n') + '\n');
fs.writeFileSync(`${D}/pooled_tp_fp_fn.csv`, rawrows.join('\n') + '\n');
fs.writeFileSync(`${D}/valid_counts.csv`, validrows.join('\n') + '\n');

// ---- Wilcoxon ----
const wrows = ['dataset,n,comparison,gt,wins,losses,median_diff_pt,effect_size,z,p'];
for (const s of SETS) {
  const txt = fs.readFileSync(`${D}/raw-output/${s}_wilcoxon.txt`, 'utf8');
  const n = (txt.match(/共通集合 n=(\d+)/) || [])[1] || '';
  for (const line of txt.split('\n')) {
    const m = line.match(/^(\S+?)(?:>(\S+?))?\s*(?:vs\s+(\S+?))?\s*\((\w+)\)\s*\|\s*勝敗 (\d+)\/(\d+) \| 中央値差 (-?[\d.]+)pt \| 効果量 (-?[\d.]+) \| z=(-?[\d.]+) \| p (\S+)/);
    if (!m) continue;
    const cmp = line.split('|')[0].trim().replace(/\s*\([\w]+\)$/, '');
    wrows.push([s, n, `"${cmp}"`, m[4], m[5], m[6], m[7], m[8], m[9], m[10]].join(','));
  }
}
fs.writeFileSync(`${D}/wilcoxon.csv`, wrows.join('\n') + '\n');
console.log(`macro_f1.csv ${f1rows.length - 1}行 / pooled ${rawrows.length - 1}行 / valid ${validrows.length - 1}行 / wilcoxon ${wrows.length - 1}行`);
