#!/usr/bin/env node
// sample.js — 中間集計を**偏りのない標本**に限定して出す。
//
//   rerun2.js は seed 固定シャッフル順に処理するので、その順序の
//   「先頭から連続して処理済みの区間（prefix）」だけが無作為標本になる。
//   一方、検証のために ONLY= で手動指定して先に回した repo（予測集合の検証など）は
//   prefix の外に飛び地として存在し、これを混ぜると july_main_bug が過剰に見える。
//   原稿に中間値を載せる場合は必ずこちらの prefix 集計を使うこと。
//
//   使い方: node remeasurement-full/sample.js
'use strict';
const fs = require('fs');
const path = require('path');
const V = require('./verify_lib.js');

const OUT = path.join(__dirname, 'out');
const july = V.loadJuly();

// rerun2.js と同一のシャッフル（seed 固定）
const order = (() => {
  const a = Object.keys(july.man).sort();
  let x = 20260729;
  const rnd = () => { x |= 0; x = (x + 0x6D2B79F5) | 0; let t = Math.imul(x ^ (x >>> 15), 1 | x); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; }
  return a;
})();

const doneOf = r => fs.existsSync(`${OUT}/${r}/meta.json`);
let prefix = 0;
while (prefix < order.length && doneOf(order[prefix])) prefix++;
const prefixSet = new Set(order.slice(0, prefix));

const processed = order.filter(doneOf);
const outside = processed.filter(r => !prefixSet.has(r));

// verify.csv を repo 単位で集計
const rows = fs.readFileSync(`${OUT}/verify.csv`, 'utf8').trim().split('\n').slice(1);
const tallyOf = filter => {
  const t = { match: 0, july_main_bug: 0, july_main_bug_late: 0, july_unavailable: 0, july_tool_na: 0, differ: 0 };
  const repos = new Set();
  for (const l of rows) {
    const c = l.split(',');
    if (!filter(c[0])) continue;
    repos.add(c[0]);
    const v = c[c.length - 1];
    if (v in t) t[v]++;
  }
  return { t, n: repos.size };
};

const A = tallyOf(r => prefixSet.has(r));
const B = tallyOf(() => true);

const fmt = (label, { t, n }) => {
  const tot = Object.values(t).reduce((a, b) => a + b, 0);
  console.log(`\n${label}  (${n} リポジトリ / ${tot} 行)`);
  for (const [k, v] of Object.entries(t)) {
    const pct = tot ? (v / tot * 100).toFixed(1) : '0.0';
    console.log(`  ${k.padEnd(19)}= ${String(v).padStart(5)}  ${pct}%`);
  }
};

console.log(`シャッフル順の先頭から連続で処理済み: ${prefix} 件（= 偏りのない無作為標本）`);
console.log(`prefix の外にある処理済み repo      : ${outside.length} 件（ONLY= で手動指定して先に回した分）`);
if (outside.length) console.log('  ' + outside.slice(0, 20).join(' ') + (outside.length > 20 ? ` … 他 ${outside.length - 20} 件` : ''));
fmt('★ 無作為標本のみ（原稿にはこちらを使う）', A);
fmt('  参考: 処理済み全件（手動指定分を含む＝偏りあり）', B);
