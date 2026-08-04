#!/usr/bin/env node
// verify_lib.js — 検証ゲート。**採点コードは再実装せず 7月の census2/scorer.js を実行する**
//   （census2/rerun/verify_with_scorer.js と同じ方式）。
//
//   比較対象:
//     - GT 3定義の件数（gt-imported / gt-imported-test / gt-all）
//     - 各ツールの tp/fp/fn（all / imported / imported+test の9値。モジュールパス単位）
//   判定: match / july_main_bug / differ の3分類。
//
// 【7月側の既知の誤り＝「一致しないのが正しい」もの。differ に入れない】
//  (a) manifest.csv の n_all は `go list -m -e all` の生出力の行数で main module 行を
//      含み +1 されている（proc.sh:65 が grep -v main をしていない）。
//      → GT-all の件数比較は 7月値から 1 を引いてから行う。
//  (b) 一部リポジトリ（例: Lifailon__lazyjournal）は7月に `go list -m` が空を返し
//      main.txt が空になったため、scorer.js が自モジュールを除外できていない。
//      → syft/trivy は自モジュールを components に含めるので imported の fp が +1、
//        cdxgen/cyclonedx-gomod は含めないので all の fn が +1。
//      → さらに gt_imported/gt_impT も main 行を除去できていないので件数も +1。
//      判定方法: 「main あり」で採点して合わなければ「main 空」でも採点し、
//      後者が7月と一致すれば july_main_bug（ツール出力自体は同一）。
'use strict';
const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const zlib = require('zlib');

const BASE = path.resolve(__dirname, '..');          // census2/
const SCORER = path.join(BASE, 'scorer.js');
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];

const VERIFY_HEADER = 'repo,tool,' +
  'gt_imp_july_adj,gt_imp_now,gt_impT_july_adj,gt_impT_now,gt_all_july_adj,gt_all_now,gt_counts_ok,' +
  'july_all_tp/fp/fn|imp_tp/fp/fn|impT_tp/fp/fn,now_main,now_main_empty,verdict\n';

// ---------- 7月の記録 ----------
function loadJuly() {
  const man = {};
  for (const l of fs.readFileSync(BASE + '/manifest.csv', 'utf8').trim().split('\n').slice(1)) {
    const c = l.split(',');
    if (c[6] !== 'OK') continue;
    man[c[0]] = { url: c[1], sha: c[2], imp: +c[7], impT: +c[8], all: +c[9] };
  }
  const met = {};
  const L = fs.readFileSync(BASE + '/metrics.csv', 'utf8').trim().split('\n');
  const H = L[0].split(','); const ix = Object.fromEntries(H.map((h, i) => [h, i]));
  for (const l of L.slice(1)) {
    const c = l.split(',');
    if (c[2] === 'NA' || c.length < 20) { (met[c[0]] = met[c[0]] || {})[c[1]] = 'NA'; continue; }
    // scorer.js の出力順（all 3 → imported 3 → impT 3）に揃える
    (met[c[0]] = met[c[0]] || {})[c[1]] = ['n_all_tp', 'n_all_fp', 'n_all_fn',
      'n_imp_tp', 'n_imp_fp', 'n_imp_fn', 'n_impT_tp', 'n_impT_fp', 'n_impT_fn']
      .map(k => +c[ix[k]]).join('/');
  }
  return { man, met };
}

// ---------- 保存物から scorer.js の入力を復元して実行 ----------
// emptyMain=true で「7月の main 空バグ」を再現する。
function score(outDir, repo, emptyMain) {
  const R = `${outDir}/${repo}`, D = `/tmp/vs2_${repo}_${process.pid}`;
  fs.rmSync(D, { recursive: true, force: true }); fs.mkdirSync(D, { recursive: true });
  const meta = JSON.parse(fs.readFileSync(`${R}/meta.json`, 'utf8'));
  const tsv2txt = f => fs.existsSync(f) ? fs.readFileSync(f, 'utf8').replace(/\t/g, ' ') : '';
  fs.writeFileSync(`${D}/main.txt`, emptyMain ? '' : (meta.gmain || '') + '\n');
  fs.writeFileSync(`${D}/gt_imported.txt`, tsv2txt(`${R}/gt-imported.tsv`));
  fs.writeFileSync(`${D}/gt_impT.txt`, tsv2txt(`${R}/gt-imported-test.tsv`));
  // 7月の gt_all.txt は `go list -m -e all` の生出力で main 行を含む（bug (a)）。
  // main 空で採点する場合は main 行を復元しないと再現しない。
  // 一方 gt_imported / gt_impT は7月も main を含んでいなかった（実測で確認済み。
  // Lifailon__lazyjournal では main は GT になく、ツール側の自モジュール検出が FP になっている）
  // ので、ここでは復元しない。verify_with_scorer.js と同じ扱い。
  const mainLine = (emptyMain && meta.gmain) ? meta.gmain + '\n' : '';
  fs.writeFileSync(`${D}/gt_all.txt`, mainLine + tsv2txt(`${R}/gt-all.tsv`));
  // FP原因分類にしか使わない補助集合。tp/fp/fn には影響しないので空で良い。
  for (const f of ['win.txt', 'mod_direct.txt', 'mod_indirect.txt', 'gosum.txt']) fs.writeFileSync(`${D}/${f}`, '');
  for (const t of TOOLS) {
    const g = `${R}/raw/${t}.json.gz`, p = `${R}/raw/${t}.json`;
    if (fs.existsSync(g)) fs.writeFileSync(`${D}/${t}_output.json`, zlib.gunzipSync(fs.readFileSync(g)));
    else if (fs.existsSync(p)) fs.copyFileSync(p, `${D}/${t}_output.json`);
  }
  let out = '';
  try { out = cp.execSync(`node ${SCORER} ${D}`, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }); }
  catch (e) { out = (e.stdout || ''); }
  fs.rmSync(D, { recursive: true, force: true });
  const res = {};
  for (const line of out.trim().split('\n')) {
    const c = line.split(',');
    if (!c[1]) continue;
    res[c[1]] = c[2] === 'NA' ? 'NA' : c.slice(2, 11).join('/');   // all(3)+imported(3)+impT(3)
  }
  return res;
}

const nLines = f => { try { const s = fs.readFileSync(f, 'utf8'); return s ? s.trim().split('\n').filter(Boolean).length : 0; } catch (e) { return 0; } };

// 1リポジトリ分を検証して verify.csv の行と判定を返す。
function verifyRepo(outDir, repo, july) {
  const J = july.man[repo];
  if (!J) return { rows: [], tally: {} };
  const R = `${outDir}/${repo}`;
  const now = {
    imp: nLines(`${R}/gt-imported.tsv`),
    impT: nLines(`${R}/gt-imported-test.tsv`),
    all: nLines(`${R}/gt-all.tsv`),
  };
  const A = score(outDir, repo, false);      // 正しく main を除外
  let B = null;                              // 7月の main 空バグ再現（必要時のみ）
  const needB = () => { if (!B) B = score(outDir, repo, true); return B; };

  const rows = [], tally = { match: 0, july_main_bug: 0, differ: 0, na: 0 };
  for (const t of TOOLS) {
    const j = (july.met[repo] || {})[t];
    if (j === undefined) continue;

    let verdict, countsOk;
    if (j === 'NA' || A[t] === 'NA' || A[t] === undefined) {
      // 7月に NA（ツール出力なし）なら今回も NA であることを確認する
      verdict = (j === 'NA' && (A[t] === 'NA' || A[t] === undefined)) ? 'match' : 'differ';
      countsOk = J.imp === now.imp && J.impT === now.impT && (J.all - 1) === now.all;
      if (!countsOk) verdict = 'differ';
      tally[verdict === 'match' ? 'match' : 'differ']++;
      rows.push([repo, t, J.imp, now.imp, J.impT, now.impT, J.all - 1, now.all, countsOk ? 'yes' : 'NO',
        j === undefined ? '' : j, A[t] === undefined ? '' : A[t], '', verdict].join(','));
      continue;
    }

    // 件数比較。(a) n_all だけが main module 行の分だけ常に +1 されているので 1 を引く。
    // gt_imported / gt_impT は7月も main を含まないため補正不要。
    countsOk = J.imp === now.imp && J.impT === now.impT && (J.all - 1) === now.all;

    if (A[t] === j && countsOk) {
      verdict = 'match'; tally.match++;
    } else if (needB()[t] === j && countsOk) {
      // ツール出力自体は7月と同一。7月が自モジュールを除外できていなかった分だけ差が出る (b)。
      verdict = 'july_main_bug'; tally.july_main_bug++;
    } else {
      verdict = 'differ'; tally.differ++;
    }
    rows.push([repo, t, J.imp, now.imp, J.impT, now.impT, J.all - 1, now.all, countsOk ? 'yes' : 'NO',
      j, A[t], B ? B[t] : '', verdict].join(','));
  }
  return { rows, tally };
}

module.exports = { loadJuly, score, verifyRepo, VERIFY_HEADER, TOOLS };
