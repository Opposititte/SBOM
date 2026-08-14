#!/usr/bin/env node
// verify_with_scorer.js — 保存済みの成果物に対して **7月の scorer.js をそのまま実行**し、
//   7月の metrics.csv と突き合わせる。
//
//   目的: rerun.js 内蔵のゲートは「ツール出力の再現性」と「パーサ再実装の正しさ」を
//         同時に測ってしまい、不一致時に切り分けられない。ここでは採点コードを
//         再実装せず本物を呼ぶので、**純粋にツール出力の再現性だけ**を見る。
//
//   使い方: node remeasurement-partial/verify_with_scorer.js
//   出力  : remeasurement-partial/out/verify_scorer.csv
//
//   既知の7月側バグ: 一部リポジトリで `go list -m` が空を返し main.txt が空になったため、
//   scorer.js が自モジュールを除外できていない。syft/trivy は自モジュールを components に
//   含めるので imported の fp が +1、GT-all も main 行を含むので fn が +1 になる。
//   本スクリプトは「main あり」「main 空」の両方で採点し、どちらに一致するかを判定する。
'use strict';
const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const zlib = require('zlib');

const BASE = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'out');
const SCORER = path.join(BASE, 'scorer.js');
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];

// 7月の metrics
const july = {};
{
  const L = fs.readFileSync(BASE + '/metrics.csv', 'utf8').trim().split('\n');
  const H = L[0].split(','); const ix = Object.fromEntries(H.map((h, i) => [h, i]));
  for (const l of L.slice(1)) {
    const c = l.split(',');
    if (c[2] === 'NA' || c.length < 20) { (july[c[0]] = july[c[0]] || {})[c[1]] = 'NA'; continue; }
    (july[c[0]] = july[c[0]] || {})[c[1]] = ['n_all_tp', 'n_all_fp', 'n_all_fn', 'n_imp_tp', 'n_imp_fp', 'n_imp_fn',
      'n_impT_tp', 'n_impT_fp', 'n_impT_fn'].map(k => +c[ix[k]]).join('/');
  }
}

// 保存物から scorer.js の入力ディレクトリを復元して実行
function score(repo, emptyMain) {
  const R = `${OUT}/${repo}`, D = `/tmp/vs_${repo}`;
  fs.rmSync(D, { recursive: true, force: true }); fs.mkdirSync(D, { recursive: true });
  const meta = JSON.parse(fs.readFileSync(`${R}/meta.json`, 'utf8'));
  const tsv2txt = f => fs.existsSync(f) ? fs.readFileSync(f, 'utf8').replace(/\t/g, ' ') : '';
  fs.writeFileSync(`${D}/main.txt`, emptyMain ? '' : (meta.gmain || '') + '\n');
  fs.writeFileSync(`${D}/gt_imported.txt`, tsv2txt(`${R}/gt-imported.tsv`));
  fs.writeFileSync(`${D}/gt_impT.txt`, tsv2txt(`${R}/gt-imported-test.tsv`));
  // GT-all: 7月の gt_all.txt は `go list -m all` の生出力で main 行を含む。
  // main空で採点する場合は main 行を復元しないと再現しない。
  fs.writeFileSync(`${D}/gt_all.txt`, (emptyMain && meta.gmain ? meta.gmain + '\n' : '') + tsv2txt(`${R}/gt-all.tsv`));
  for (const f of ['win.txt', 'mod_direct.txt', 'mod_indirect.txt', 'gosum.txt']) fs.writeFileSync(`${D}/${f}`, '');
  for (const t of TOOLS) {
    const g = `${R}/raw/${t}.json.gz`;
    if (fs.existsSync(g)) fs.writeFileSync(`${D}/${t}_output.json`, zlib.gunzipSync(fs.readFileSync(g)));
  }
  let out = '';
  try { out = cp.execSync(`node ${SCORER} ${D}`, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }); } catch (e) { out = e.stdout || ''; }
  fs.rmSync(D, { recursive: true, force: true });
  const res = {};
  for (const line of out.trim().split('\n')) {
    const c = line.split(',');
    if (!c[1]) continue;
    res[c[1]] = c[2] === 'NA' ? 'NA' : c.slice(2, 11).join('/');   // all(3)+imp(3)+impT(3)
  }
  return res;
}

const repos = fs.readdirSync(OUT).filter(d => {
  try { return JSON.parse(fs.readFileSync(`${OUT}/${d}/meta.json`, 'utf8')).status === 'OK'; } catch (e) { return false; }
}).sort();

const rows = ['repo,tool,july,scorer_main,scorer_main_empty,verdict'];
const tally = { match: 0, july_main_bug: 0, differ: 0, na: 0 };
for (const repo of repos) {
  if (!july[repo]) continue;
  const A = score(repo, false);          // 正しく main を除外
  let B = null;                          // 7月バグ（main空）の再現は必要時のみ
  for (const t of TOOLS) {
    const j = july[repo][t];
    if (j === undefined) continue;
    if (j === 'NA' || A[t] === 'NA') { tally.na++; rows.push([repo, t, j, A[t], '', 'NA'].join(',')); continue; }
    let verdict;
    if (A[t] === j) { verdict = 'match'; tally.match++; }
    else {
      if (!B) B = score(repo, true);
      if (B[t] === j) { verdict = 'july_main_bug'; tally.july_main_bug++; }
      else { verdict = 'differ'; tally.differ++; }
    }
    rows.push([repo, t, j, A[t], B ? B[t] : '', verdict].join(','));
  }
}
fs.writeFileSync(`${OUT}/verify_scorer.csv`, rows.join('\n') + '\n');
console.log(`対象 ${repos.length} リポジトリ / ${rows.length - 1} 行（7月の scorer.js を実行して照合）`);
console.log(`  match         = ${tally.match}   ツール出力・採点とも7月と一致`);
console.log(`  july_main_bug = ${tally.july_main_bug}   ツール出力は一致。7月が自モジュールを除外できていなかった分だけ差が出る`);
console.log(`  differ        = ${tally.differ}   ★ツール出力が実際に変わっている（要調査）`);
console.log(`  NA            = ${tally.na}`);
console.log(`[written] ${OUT}/verify_scorer.csv`);
