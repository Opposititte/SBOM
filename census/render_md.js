#!/usr/bin/env node
// render_md.js — CSV を人が読める Markdown に変換。
//   1) per_repo_metrics.md : 各repo×ツールの tp/fp/fn/precision/recall/F1（name & version, all/imp/impT）
//   2) repo_manifest.md    : 計測した全リポジトリの記録（名前/URL/SHA/日付/go版/GTサイズ/status）
// full_awesome_go.md と同じ「1行=repo×tool」スタイル。読み取り専用。
const fs = require('fs');
const BASE = __dirname;
const MET = process.env.MET || BASE + '/metrics.csv';
const MAN = process.env.MAN || BASE + '/manifest.csv';
const f1 = (tp, fp, fn) => { const p = (tp + fp) ? tp / (tp + fp) : 0, r = (tp + fn) ? tp / (tp + fn) : 0; return (p + r) ? (200 * p * r / (p + r)).toFixed(1) : '0.0'; };
const pr = (tp, fp) => ((tp + fp) ? (100 * tp / (tp + fp)).toFixed(1) : '—');
const rc = (tp, fn) => ((tp + fn) ? (100 * tp / (tp + fn)).toFixed(1) : '—');

// ---------- 1) per-repo metrics ----------
const lines = fs.readFileSync(MET, 'utf8').trim().split('\n');
const H = lines[0].split(','); const ix = {}; H.forEach((h, i) => ix[h] = i);
const g = (c, k) => parseInt(c[ix[k]] || '0', 10) || 0;

let md = [];
md.push('# census — per-repo メトリクス（全リポジトリ × 4ツール）\n');
md.push('各行 = 1リポジトリ × 1ツール。GT定義は **all**=`go list -m all` / **imp**=`go list -deps`（root・linux・非test）/ **impT**=imp＋test。');
md.push('数値は **name一致**の tp/fp/fn と F1(%)。version一致F1も併記。NA=そのツールが出力を出せず失敗。\n');
md.push('| repo | tool | all tp/fp/fn | all F1 | imp tp/fp/fn | imp F1 | impT tp/fp/fn | impT F1 | verF1(all/imp/impT) |');
md.push('|------|------|---|--:|---|--:|---|--:|--:|');

let cur = null;
for (let i = 1; i < lines.length; i++) {
  const c = lines[i].split(',');
  const repo = c[0], tool = c[1];
  if (c[2] === 'NA' || c.length < 20) { md.push(`| ${repo} | ${tool} | NA | | NA | | NA | | |`); continue; }
  const na = ['n_all_tp', 'n_all_fp', 'n_all_fn'].map(k => g(c, k));
  const ni = ['n_imp_tp', 'n_imp_fp', 'n_imp_fn'].map(k => g(c, k));
  const nt = ['n_impT_tp', 'n_impT_fp', 'n_impT_fn'].map(k => g(c, k));
  const va = ['v_all_tp', 'v_all_fp', 'v_all_fn'].map(k => g(c, k));
  const vi = ['v_imp_tp', 'v_imp_fp', 'v_imp_fn'].map(k => g(c, k));
  const vt = ['v_impT_tp', 'v_impT_fp', 'v_impT_fn'].map(k => g(c, k));
  md.push(`| ${repo} | ${tool} | ${na.join('/')} | ${f1(...na)} | ${ni.join('/')} | ${f1(...ni)} | ${nt.join('/')} | ${f1(...nt)} | ${f1(...va)}/${f1(...vi)}/${f1(...vt)} |`);
}
fs.writeFileSync(BASE + '/per_repo_metrics.md', md.join('\n') + '\n');

// ---------- 2) repo manifest ----------
const man = fs.readFileSync(MAN, 'utf8').trim().split('\n');
const mh = man[0].split(',');
let mm = [];
mm.push('# census — 計測した全リポジトリの記録（バージョン台帳）\n');
mm.push('今回の計測で解析した各リポジトリの **名前・URL・コミットSHA・コミット日・モジュール名・go版・GTサイズ・status**。');
mm.push('status: OK=評価済 / EMPTY_GT=Goだがimported依存ゼロ / CLONE_FAIL=取得不可 / DISK_SKIP=容量退避。\n');
mm.push('| # | repo | URL | commit(short) | date | go | GT all/imp/impT | status |');
mm.push('|--:|------|-----|---|---|--:|---|---|');
let n = 0;
for (let i = 1; i < man.length; i++) {
  const c = man[i].split(',');
  const [repo, url, sha, date, , gover, status, nimp, nimpT, nall] = c;
  n++;
  const sh = (sha || '').slice(0, 10);
  const d = (date || '').slice(0, 10);
  mm.push(`| ${n} | ${repo} | ${url} | ${sh} | ${d} | ${gover || ''} | ${nall || 0}/${nimp || 0}/${nimpT || 0} | ${status || ''} |`);
}
fs.writeFileSync(BASE + '/repo_manifest.md', mm.join('\n') + '\n');

console.error(`[written] per_repo_metrics.md (${lines.length - 1} rows), repo_manifest.md (${man.length - 1} repos)`);
