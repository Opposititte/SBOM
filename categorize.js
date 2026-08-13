#!/usr/bin/env node
// categorize.js — manifest.csv に category 列（末尾）を追加/更新（冪等）。
// 区分: OK / non_go(go.mod無し) / go_empty(Goだがimported空) / clone_fail / disk_skip
// 既存の main_module・status・n_imported から導出（再計測不要）。
const fs = require('fs');
const P = __dirname + '/manifest.csv';
const lines = fs.readFileSync(P, 'utf8').trim().split('\n');
const base = 'repo,url,commit_sha,commit_date,main_module,go_version,status,n_imported,n_impT,n_all';
function cat(c) {
  const status = (c[6] || '').trim();
  if (status === 'CLONE_FAIL') return 'clone_fail';
  if (status === 'DISK_SKIP') return 'disk_skip';
  if (status === 'OK') return 'OK';
  // EMPTY_GT: go.mod の有無で 非Go / Go-empty を分ける
  const main = (c[4] || '').trim();
  const hasGoMod = main && main !== 'command-line-arguments';
  return hasGoMod ? 'go_empty' : 'non_go';
}
const out = [base + ',category'];
for (let i = 1; i < lines.length; i++) {
  const c = lines[i].split(',').slice(0, 10); // 既存10列に正規化（再実行時に旧categoryを捨てる）
  out.push(c.join(',') + ',' + cat(c));
}
fs.writeFileSync(P, out.join('\n') + '\n');
// 集計表示
const cnt = {};
for (let i = 1; i < out.length; i++) { const k = out[i].split(',').pop(); cnt[k] = (cnt[k] || 0) + 1; }
console.error('[categorize] ' + JSON.stringify(cnt));
