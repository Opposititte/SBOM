#!/usr/bin/env node
// verify2.js — census2/rerun2/out/ に保存済みの成果物すべてを検証し直し、verify.csv を作り直す。
//   採点は再実装せず 7月の census2/scorer.js を実行する（verify_lib.js）。
//   rerun2.js は1件ごとに verify.csv へ追記するので通常は不要。判定ロジックを直した後や、
//   途中で止まった run の verify.csv を作り直したいときに使う。
//
//   使い方: node census2/rerun2/verify2.js
'use strict';
const fs = require('fs');
const path = require('path');
const V = require('./verify_lib.js');

const OUT = path.join(__dirname, 'out');
const july = V.loadJuly();

const repos = fs.readdirSync(OUT).filter(d => {
  try { return JSON.parse(fs.readFileSync(`${OUT}/${d}/meta.json`, 'utf8')).status === 'OK'; } catch (e) { return false; }
}).sort();

const rows = [];
const tally = { match: 0, july_main_bug: 0, july_main_bug_late: 0, july_unavailable: 0, july_tool_na: 0, cache_sensitive: 0, differ: 0 };
for (const repo of repos) {
  const r = V.verifyRepo(OUT, repo, july);
  rows.push(...r.rows);
  for (const k of Object.keys(tally)) tally[k] += (r.tally[k] || 0);
}
fs.writeFileSync(`${OUT}/verify.csv`, V.VERIFY_HEADER + rows.join('\n') + (rows.length ? '\n' : ''));
// rerun2.js は verify.csv / unexplained_differ.csv に追記するため、repo を再実行すると
// 古い行が残って二重計上される。ここで両方とも作り直すのが正（こちらが正本）。
const unexp = rows.filter(r => r.split(',').pop() === 'differ');
fs.writeFileSync(`${OUT}/unexplained_differ.csv`, V.VERIFY_HEADER + unexp.join('\n') + (unexp.length ? '\n' : ''));

console.log(`対象 ${repos.length} リポジトリ / ${rows.length} 行（7月の scorer.js を実行して照合）`);
console.log(`  match         = ${tally.match}   7月と完全一致`);
console.log(`  july_main_bug = ${tally.july_main_bug}   ツール出力は同一。7月が自モジュールを除外できていなかった分の差（一致しないのが正しい）`);
console.log(`  july_main_bug_late = ${tally.july_main_bug_late}   走行中に emptymain_extra.txt へ事後追加した分（事前予測と区別）`);
console.log(`  july_unavailable = ${tally.july_unavailable}   7月側の記録が使えず比較できない（再現失敗ではない）`);
console.log(`  july_tool_na  = ${tally.july_tool_na}   7月はそのツールが NA、今回は取得できた（再現失敗ではない）`);
console.log(`  cache_sensitive = ${tally.cache_sensitive}   module cache を温めると7月を再現する差分（キャッシュ状態に起因）`);
console.log(`  differ        = ${tally.differ}   ★ツール出力が実際に変わっている（要調査）`);
console.log(`[written] ${OUT}/verify.csv, ${OUT}/unexplained_differ.csv`);
if (tally.differ > 0) {
  console.log('\n--- differ の内訳 ---');
  for (const r of rows) { const c = r.split(','); if (c[c.length - 1] === 'differ') console.log('  ' + r); }
}
