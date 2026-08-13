#!/usr/bin/env node
// verify_lib.js — 検証ゲート。**採点コードは再実装せず 7月の census2/scorer.js を実行する**
//   （census2/rerun/verify_with_scorer.js と同じ方式）。
//
//   比較対象:
//     - GT 3定義の件数（scorer が見た集合サイズ = tp+fn。7月・今回とも同じ求め方）
//     - 各ツールの tp/fp/fn（all / imported / imported+test の9値。モジュールパス単位）
//   判定: match / july_main_bug / july_main_bug_late / july_unavailable / july_tool_na /
//         cache_sensitive / differ。
//
// 【ゲートの位置づけ】pass/fail ではなく「差分の特性を記述する」道具として使う。
//   7月の条件は原理的に再現不能であることが分かったため（GOMODCACHE を全repoで共有して
//   いたので結果が処理順に依存する。cache_effect.js の対照実験を参照）、
//   「7月と一致すること」を合格条件に据えない。差分が出ても止めず、原因で分類して記録する。
//   cache_sensitive = module cache を温めると7月の値を再現する差分。
//     ツールの能力ではなくキャッシュ状態に起因するので再現失敗ではない。
//   july_unavailable は「7月側の記録が使えず比較できない」repo。
//   「7月と比較できない」ことと「再現できていない」ことは別物なので differ に混ぜない。
//   ゲートは通す（ジョブを止めない）が verify.csv には必ず行を残す。
//   july_tool_na は「7月にそのツールが NA（出力なし）で、今回は成功した」ケース。
//   7月の NA の多くはツール側の一時的失敗なので、今回成功するのは再現失敗ではない。
//   ゲートは通す。逆（7月=成功・今回=NA）は本物の退行なので differ にして止める。
//
// 【july_main_bug は「予測してから照合」する】
//   不一致の形を見て後付けで既知バグ扱いにすると、gmain が空だった repo が他にもあった場合に
//   すべて july_main_bug へ吸い込まれ、differ が上がってこない＝ゲートが意味を失う。
//   そこで **7月の記録だけから「main を除外できていなかった repo 一覧」を先に確定**し
//   （emptyMainRepos()）、その集合に入っている repo に限り july_main_bug を許す。
//   集合外の repo は、たとえ main 空で再現できても differ として報告する。
//
// 【7月側の既知の誤り】
//  (a) manifest.csv の n_all は `go list -m -e all` の生出力の行数で main module 行を
//      含み +1 されている（proc.sh:65 が grep -v main をしていない）。
//      → 本ゲートは件数比較に manifest の n_all を使わず、7月・今回とも
//        「scorer が見た集合サイズ = tp+fn」で突き合わせるので補正自体が不要。
//        （n_all の -1 補正は n_all=0 の repo や、norm() で大小文字が衝突して縮む repo で
//         壊れる。実際 go-furnace__go-furnace と jeffail__leaps は n_all-GT が 2 ある。）
//        manifest 由来の生の件数は参考列としてのみ出力する。
//  (b) 一部リポジトリは7月に自モジュールを除外できておらず、syft/trivy の imported fp が +1、
//      cdxgen/cyclonedx-gomod の all fn が +1 になる。→ 上記の予測集合で扱う。
'use strict';
const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const zlib = require('zlib');

const BASE = path.resolve(__dirname, '..');          // census2/
const SCORER = path.join(BASE, 'scorer.js');
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];

const VERIFY_HEADER = 'repo,tool,' +
  'gt_imp_july,gt_imp_now,gt_impT_july,gt_impT_now,gt_all_july,gt_all_now,gt_counts_ok,' +
  'july_n_all_raw,now_gt_all_tsv_lines,' +
  'july_scores,now_main,now_main_empty,now_warm_cache,emptymain_source,verdict\n';

// ---------- 7月の記録 ----------
function loadJuly() {
  const man = {};
  for (const l of fs.readFileSync(BASE + '/manifest.csv', 'utf8').trim().split('\n').slice(1)) {
    const c = l.split(',');
    if (c[6] !== 'OK') continue;
    man[c[0]] = { url: c[1], sha: c[2], gmain: c[4], imp: +c[7], impT: +c[8], all: +c[9] };
  }
  const met = {};      // repo -> tool -> "9値" | 'NA'
  const gt = {};       // repo -> {all, imp, impT}  scorer が見た GT 集合サイズ
  const L = fs.readFileSync(BASE + '/metrics.csv', 'utf8').trim().split('\n');
  const H = L[0].split(','); const ix = Object.fromEntries(H.map((h, i) => [h, i]));
  for (const l of L.slice(1)) {
    const c = l.split(',');
    if (c[2] === 'NA' || c.length < 20) { (met[c[0]] = met[c[0]] || {})[c[1]] = 'NA'; continue; }
    const g = k => +c[ix[k]];
    // scorer.js の出力順（all 3 → imported 3 → impT 3）に揃える
    (met[c[0]] = met[c[0]] || {})[c[1]] = ['n_all_tp', 'n_all_fp', 'n_all_fn',
      'n_imp_tp', 'n_imp_fp', 'n_imp_fn', 'n_impT_tp', 'n_impT_fp', 'n_impT_fn']
      .map(k => +c[ix[k]]).join('/');
    // GT 集合サイズ = tp + fn（どのツールの行から求めても同じはず）
    const size = { all: g('n_all_tp') + g('n_all_fn'), imp: g('n_imp_tp') + g('n_imp_fn'), impT: g('n_impT_tp') + g('n_impT_fn') };
    if (!gt[c[0]]) gt[c[0]] = size;
    else for (const k of ['all', 'imp', 'impT']) if (gt[c[0]][k] !== size[k]) gt[c[0]].inconsistent = true;
  }
  return { man, met, gt, emptyMain: emptyMainRepos(man, gt), unavailable: unavailableRepos(man, gt) };
}

// 7月に scorer が main module を除外できていなかった repo を、**7月の記録だけから**確定する。
//   7月の gt_all.txt は `go list -m -e all` の生出力そのもの（＝manifest の n_all 行）で
//   main module 行を必ず1行含む（proc.sh:65 は grep -v していない）。
//   一方 scorer が見た GT-all の集合サイズは all_tp + all_fn。
//     n_all - (all_tp + all_fn) == 0  → main が集合に残っている ＝ main.txt が空だった
//                                 >= 1 → main を除外できていた
//   n_all == 0（`go list -m all` 自体が失敗）の repo は判定不能なので集合に入れない
//   （例: kubernetes__kubernetes。入れてしまうと差分が既知バグ扱いで吸収され differ に出ない）。
//   なお norm() の大小文字衝突で集合が余分に縮む repo では差が 2 以上になるが、
//   その場合も「main は除外できていた」側に落ちるので安全側（differ になる）。
function emptyMainRepos(man, gt) {
  const s = new Set();
  for (const [repo, m] of Object.entries(man)) {
    const g = gt[repo];
    if (!g || g.inconsistent) continue;
    if (!(m.all > 0)) continue;                 // n_all=0 は判定不能
    if (m.all - g.all === 0) s.add(repo);
  }
  return s;
}

// 7月側の記録が使えず比較できない repo を、7月の記録だけから確定する。
//   - n_all == 0            : 7月の `go list -m all` 自体が失敗（例: kubernetes__kubernetes）。
//                             予測式 n_all-(tp+fn) が退化するので main 除外の有無も判定できない。
//   - GT サイズが取れない    : 4ツール全部 NA（＝7月のスコアが1つも無い）／metrics.csv に行が無い。
//   - GT サイズがツール間で不整合: 7月の記録自体が壊れている。
function unavailableRepos(man, gt) {
  const s = new Set();
  for (const [repo, m] of Object.entries(man)) {
    const g = gt[repo];
    if (!g || g.inconsistent || !(m.all > 0)) s.add(repo);
  }
  return s;
}

// 予測集合への**事後**追加（main空 かつ norm() の大小文字衝突が同時に起きる repo は
// n_all-(tp+fn) が 1 になり予測集合から漏れる＝differ として上がる）。
// その差分が「imported fp +1 / all fn +1」の既知シグネチャなら、コードを直さず
// census2/rerun2/emptymain_extra.txt に足して再判定できる。
//
// ただしこれは **走行中にオラクルを書き換える行為** なので、事前予測（emptyMainRepos）とは
// 必ず区別する。判定ラベルは july_main_bug ではなく july_main_bug_late とし、
// 「いつ・どの差分シグネチャを見て足したか」をファイルに残すことを必須とする。
// 書式（TAB か複数スペース区切り。# 以降はコメントだが理由欄は必須）:
//   <repo>  <追加日時ISO8601>  <観測した差分シグネチャ>
// 例:
//   foo__bar  2026-08-04T15:00:00Z  imported fp+1 / all fn+1 (norm衝突で予測式が1になり漏れた)
// 論文には「予測式で N 件を事前特定、事後追加 M 件」と分けて書けるようにするため。
function extraEmptyMain() {
  const f = path.join(__dirname, 'emptymain_extra.txt');
  const m = new Map();
  let txt; try { txt = fs.readFileSync(f, 'utf8'); } catch (e) { return m; }
  for (const line of txt.split('\n')) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const a = line.split(/\t|\s{2,}/).map(s => s.trim()).filter(Boolean);
    const repo = a[0]; if (!repo) continue;
    if (a.length < 3) {
      throw new Error(`emptymain_extra.txt: "${repo}" に追加日時と差分シグネチャがありません。` +
        `書式: <repo>  <ISO8601>  <シグネチャ>  — 事後追加は監査可能でなければ受け付けません。`);
    }
    m.set(repo, { added_at: a[1], signature: a.slice(2).join(' ') });
  }
  return m;
}

// ---------- 保存物から scorer.js の入力を復元して実行 ----------
// emptyMain=true で「7月の main 空」状態を再現する。
// ※ この関数は census2/rerun/verify_with_scorer.js の score() と論理的に同一。
//    （main.txt を空にする / gt_all.txt にだけ main 行を復元する / gt_imported・gt_impT は
//      7月も main を含まないので復元しない / 補助集合は空 / raw を展開して scorer を実行）
function score(outDir, repo, emptyMain, rawSub) {
  rawSub = rawSub || 'raw';
  const R = `${outDir}/${repo}`, D = `/tmp/vs2_${repo}_${process.pid}`;
  fs.rmSync(D, { recursive: true, force: true }); fs.mkdirSync(D, { recursive: true });
  const meta = JSON.parse(fs.readFileSync(`${R}/meta.json`, 'utf8'));
  const tsv2txt = f => fs.existsSync(f) ? fs.readFileSync(f, 'utf8').replace(/\t/g, ' ') : '';
  fs.writeFileSync(`${D}/main.txt`, emptyMain ? '' : (meta.gmain || '') + '\n');
  fs.writeFileSync(`${D}/gt_imported.txt`, tsv2txt(`${R}/gt-imported.tsv`));
  fs.writeFileSync(`${D}/gt_impT.txt`, tsv2txt(`${R}/gt-imported-test.tsv`));
  // 7月の gt_all.txt は生出力で main 行を含む。main 空で採点する場合は復元しないと再現しない。
  fs.writeFileSync(`${D}/gt_all.txt`, ((emptyMain && meta.gmain) ? meta.gmain + '\n' : '') + tsv2txt(`${R}/gt-all.tsv`));
  // FP原因分類にしか使わない補助集合。tp/fp/fn には影響しないので空で良い。
  for (const f of ['win.txt', 'mod_direct.txt', 'mod_indirect.txt', 'gosum.txt']) fs.writeFileSync(`${D}/${f}`, '');
  for (const t of TOOLS) {
    const g = `${R}/${rawSub}/${t}.json.gz`, p = `${R}/${rawSub}/${t}.json`;
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

// scorer の9値から GT 集合サイズ（tp+fn）を取り出す
function gtSizeOf(nine) {
  if (!nine || nine === 'NA') return null;
  const v = nine.split('/').map(Number);
  return { all: v[0] + v[2], imp: v[3] + v[5], impT: v[6] + v[8] };
}
const nLines = f => { try { const s = fs.readFileSync(f, 'utf8'); return s ? s.trim().split('\n').filter(Boolean).length : 0; } catch (e) { return 0; } };

// 1リポジトリ分を検証して verify.csv の行と判定を返す。
function verifyRepo(outDir, repo, july) {
  const J = july.man[repo];
  if (!J) return { rows: [], tally: {} };
  const R = `${outDir}/${repo}`;
  const jGT = july.gt[repo] || null;
  const extra = extraEmptyMain();
  const predictedAhead = july.emptyMain.has(repo);          // 7月の記録から事前に予測した集合
  const predictedLate = !predictedAhead && extra.has(repo); // 走行中に事後追加した分
  const predicted = predictedAhead || predictedLate;
  const unavailable = july.unavailable.has(repo);
  const nowAllLines = nLines(`${R}/gt-all.tsv`);

  const A = score(outDir, repo, false);      // 正しく main を除外
  let B = null;
  const needB = () => { if (!B) B = score(outDir, repo, true); return B; };
  // GT 集合サイズは repo 単位（全ツール共通）。NA のツール行からは求まらないので、
  // 非 NA のツール行から1つ求めて全行で使う（NA行だけ偽の件数不一致になるのを防ぐ）。
  const repoGT = S => { for (const t of TOOLS) { const g = gtSizeOf(S[t]); if (g) return g; } return null; };

  // module cache を温めて取り直した出力があれば読む（differ の原因切り分け用）
  const hasWarm = fs.existsSync(`${R}/raw_warm`);
  let W = null;
  const needW = () => { if (!W) W = score(outDir, repo, false, 'raw_warm'); return W; };
  const rows = [], tally = { match: 0, july_main_bug: 0, july_main_bug_late: 0, july_unavailable: 0, july_tool_na: 0, cache_sensitive: 0, differ: 0 };
  for (const t of TOOLS) {
    const j = (july.met[repo] || {})[t];
    if (j === undefined) continue;
    const a = A[t];

    let verdict, useB = false;
    if (unavailable) {
      // 7月側が使えないので照合しない。今回の値は記録として残す。
      verdict = 'july_unavailable';
    } else if (j === 'NA' && (a === 'NA' || a === undefined)) {
      verdict = 'match';                 // 双方 NA。7月と同じ
    } else if (j === 'NA') {
      verdict = 'july_tool_na';          // 7月 NA → 今回は取れた。再現失敗ではないので止めない
    } else if (a === 'NA' || a === undefined) {
      verdict = 'differ';                // 7月は取れていたのに今回 NA。本物の退行なので止める
    } else if (a === j) {
      verdict = 'match';
    } else if (predicted && needB()[t] === j) {
      // 予測集合に入っている repo のみ。ツール出力自体は7月と同一。
      verdict = predictedLate ? 'july_main_bug_late' : 'july_main_bug'; useB = true;
    } else if (hasWarm && needW()[t] === j) {
      // 温めた module cache では7月の値を再現する＝キャッシュ状態に起因する差分。
      verdict = 'cache_sensitive';
    } else {
      verdict = 'differ';
      if (predicted) needB();      // 参考のため main 空の値も出す
    }
    tally[verdict]++;

    // GT 件数は 7月・今回とも「scorer が見た集合サイズ = tp+fn」で比較する（補正不要）
    const nGT = repoGT(useB ? B : A);
    const countsOk = (jGT && nGT) ? (jGT.all === nGT.all && jGT.imp === nGT.imp && jGT.impT === nGT.impT)
      : (!jGT && !nGT) ? true : null;   // 双方から求まらない場合は判定不能
    rows.push([repo, t,
      jGT ? jGT.imp : '', nGT ? nGT.imp : '', jGT ? jGT.impT : '', nGT ? nGT.impT : '',
      jGT ? jGT.all : '', nGT ? nGT.all : '', countsOk === null ? 'NA' : countsOk ? 'yes' : 'NO',
      J.all, nowAllLines,
      j, a === undefined ? '' : a, B ? B[t] : '', W ? W[t] : '',
      predictedAhead ? 'predicted' : predictedLate ? `late:${(extra.get(repo) || {}).added_at || ''}` : 'no',
      verdict].join(','));
  }
  return { rows, tally };
}

module.exports = { loadJuly, score, verifyRepo, emptyMainRepos, extraEmptyMain, VERIFY_HEADER, TOOLS };
