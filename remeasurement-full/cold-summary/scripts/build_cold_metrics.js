#!/usr/bin/env node
// remeasurement-full の cold 計測から、7月と同一形式の metrics.csv を作る。
// 採点は7月の scorer.js をそのまま実行する（verify_lib.js と同じ復元手順）。
'use strict';
const fs = require('fs'), cp = require('child_process'), path = require('path'), zlib = require('zlib');
// リポジトリのルート（このスクリプトから見て2つ上）。環境依存の絶対パスを持たない。
const BASE = path.resolve(__dirname, '..', '..', '..');
const OUT = BASE + '/remeasurement-full/out';
const SCORER = BASE + '/scorer.js';
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const HEADER = fs.readFileSync(BASE + '/metrics.csv', 'utf8').split('\n')[0];
const TMP = process.env.TMPDIR || require('os').tmpdir();
const DEST = process.env.DEST || path.join(__dirname, '..', 'metrics_cold.csv');

const repos = fs.readdirSync(OUT).filter(d => {
  try { return JSON.parse(fs.readFileSync(`${OUT}/${d}/meta.json`, 'utf8')).status === 'OK'; } catch (e) { return false; }
}).sort();

const rows = [];
let n = 0;
for (const repo of repos) {
  const R = `${OUT}/${repo}`, D = `${TMP}/cm_${process.pid}`;
  fs.rmSync(D, { recursive: true, force: true }); fs.mkdirSync(D, { recursive: true });
  const meta = JSON.parse(fs.readFileSync(`${R}/meta.json`, 'utf8'));
  const tsv2txt = f => fs.existsSync(f) ? fs.readFileSync(f, 'utf8').replace(/\t/g, ' ') : '';
  fs.writeFileSync(`${D}/main.txt`, (meta.gmain || '') + '\n');
  fs.writeFileSync(`${D}/gt_imported.txt`, tsv2txt(`${R}/gt-imported.tsv`));
  fs.writeFileSync(`${D}/gt_impT.txt`, tsv2txt(`${R}/gt-imported-test.tsv`));
  fs.writeFileSync(`${D}/gt_all.txt`, tsv2txt(`${R}/gt-all.tsv`));
  // FP原因分類用の補助集合は rerun2 が保存していないため空。
  // → 出力の fp_* 6列は無効。P/R/F1 と TP/FP/FN には影響しない。
  for (const f of ['win.txt', 'mod_direct.txt', 'mod_indirect.txt', 'gosum.txt']) fs.writeFileSync(`${D}/${f}`, '');
  for (const t of TOOLS) {
    const g = `${R}/raw/${t}.json.gz`;
    if (fs.existsSync(g)) fs.writeFileSync(`${D}/${t}_output.json`, zlib.gunzipSync(fs.readFileSync(g)));
  }
  let out = '';
  try { out = cp.execSync(`node ${SCORER} ${D}`, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }); }
  catch (e) { out = e.stdout || ''; }
  fs.rmSync(D, { recursive: true, force: true });
  for (const line of out.trim().split('\n')) {
    const c = line.split(',');
    if (!c[1]) continue;
    c[0] = repo;                       // scorer は入力ディレクトリ名を出すので repo 名に直す
    rows.push(c.join(','));
  }
  if (++n % 200 === 0) process.stderr.write(`  ${n}/${repos.length}\n`);
}
fs.writeFileSync(DEST, HEADER + '\n' + rows.join('\n') + '\n');
console.log(`cold metrics: ${repos.length} リポジトリ / ${rows.length} 行`);
