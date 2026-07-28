#!/usr/bin/env node
// analyze.js — validate_gt.js の出力を事後分析して、論文に載せる数字を確定させる。
//   使い方: node census2/validate/analyze.js [N]   (既定 100)
//
// 出す数字は3つ:
//   (1) GT再現性  : 計測時の n_imp（manifest.csv）と、同一SHAで再生成した GT 件数の一致
//                   → 全件一致なら「計測時のGT生成は再現する」と**推定ではなく直接**言える。
//                     計測時は go list の stderr を捨てていた(2>/dev/null)ため、
//                     エラー状況は遡れないが、この一致はそれより強い証拠になる。
//   (2) 検出結果  : A ⊆ GT の破れと、その理由分類
//   (3) go listのエラー: 依存解決の失敗（GTを実際に痩せさせる）と、
//                        build constraints exclude all（良性・頻出）を**別枠**で数える
const fs = require('fs');
const path = require('path');
const N = +(process.argv[2] || 100);
const D = path.join(__dirname, 'out');
const BASE = path.resolve(__dirname, '..');

const manImp = {};
for (const l of fs.readFileSync(BASE + '/manifest.csv', 'utf8').trim().split('\n').slice(1)) {
  const c = l.split(','); if (c[6] === 'OK') manImp[c[0]] = +c[7];
}

const sumPath = `${D}/summary_${N}.csv`;
if (!fs.existsSync(sumPath)) { console.error(`まだ ${sumPath} がありません（実行中？）`); process.exit(1); }
const rows = fs.readFileSync(sumPath, 'utf8').trim().split('\n');
const H = rows[0].split(','); const ix = Object.fromEntries(H.map((h, i) => [h, i]));
const recs = rows.slice(1).map(l => l.split(','));

// ---- (1) GT再現性 ----
let same = 0; const diffs = [];
for (const c of recs) {
  const repo = c[ix.repo], gt = +c[ix.n_GT], imp = manImp[repo];
  if (imp === undefined) continue;
  if (imp === gt) same++; else diffs.push(`${repo}: 計測時=${imp} 再生成=${gt} (差 ${gt - imp})`);
}
console.log('=== (1) GT再現性: 計測時 n_imp vs 同一SHAでの再生成 ===');
console.log(`  一致 ${same} / ${same + diffs.length}`);
if (diffs.length) { console.log('  ★不一致（計測時に取りこぼしがあった直接証拠）:'); diffs.forEach(d => console.log('    ' + d)); }
else console.log('  → 全件一致。計測時のGT生成は再現しており、stderr を捨てていたことに実害はなかったと言える。');

// ---- (2) 検出結果 ----
console.log('\n=== (2) A ⊆ GT の検査結果 ===');
const missPath = `${D}/missing_${N}.csv`;
const reason = {};
if (fs.existsSync(missPath)) {
  const ml = fs.readFileSync(missPath, 'utf8').trim().split('\n');
  const mh = ml[0].split(','); const mi = Object.fromEntries(mh.map((h, i) => [h, i]));
  const seen = new Set();
  for (const l of ml.slice(1)) {
    const c = l.split(','); if (!c[mi.module_path]) continue;
    const key = c[mi.repo] + '|' + c[mi.module_path];
    if (seen.has(key)) continue; seen.add(key);
    reason[c[mi.reason]] = (reason[c[mi.reason]] || 0) + 1;
  }
}
const tot = Object.values(reason).reduce((a, b) => a + b, 0);
console.log(`  A に有り GT に無いモジュール = ${tot}（リポジトリ×モジュールで重複排除）`);
const BENIGN = ['platform', 'cgo', 'ignore', 'tools'];
for (const k of [...BENIGN, 'other_tag', 'unconstrained'])
  if (reason[k]) console.log(`    ${k.padEnd(14)} = ${reason[k]}`);
const investigate = (reason.other_tag || 0) + (reason.unconstrained || 0);
console.log(`  ├ 正しい除外（linux/amd64 の文脈として妥当）= ${BENIGN.reduce((s, k) => s + (reason[k] || 0), 0)}`);
console.log(`  └ ★要調査（other_tag + unconstrained）      = ${investigate}`);

// ---- (3) go list のエラー（優先度つき） ----
console.log('\n=== (3) go list の本物のエラー（進捗行は除外済み） ===');
const logPath = `${D}/golist_stderr_${N}.log`;
if (!fs.existsSync(logPath)) console.log('  ログ無し = 本物のエラーは1件も出ていない');
else {
  const txt = fs.readFileSync(logPath, 'utf8');
  const repos = (txt.match(/^===== /gm) || []).length;
  const kinds = {
    'missing go.sum entry': /missing go\.sum entry/g,
    'no required module provides package': /no required module provides package/g,
    'cannot find module / unknown revision': /cannot find module|unknown revision|does not contain package/g,
    'Goバージョン要求の不一致': /requires go >=|go\.mod requires/g,
    'build constraints exclude all Go files': /build constraints exclude all Go files/g,
  };
  const cnt = {}; for (const [k, re] of Object.entries(kinds)) cnt[k] = (txt.match(re) || []).length;
  console.log(`  本物のエラーが出たリポジトリ = ${repos} / ${recs.length}`);
  console.log('  ■ GTを実際に痩せさせるもの（依存解決の失敗）:');
  let bad = 0;
  for (const k of Object.keys(kinds).slice(0, 4)) { console.log(`      ${k} = ${cnt[k]}`); bad += cnt[k]; }
  console.log(`      小計 = ${bad}`);
  console.log('  □ 良性・頻出（platform分類に対応。ディレクトリ内が _windows.go だけ等で普通に出る）:');
  console.log(`      build constraints exclude all Go files = ${cnt['build constraints exclude all Go files']}`);
}
console.log('\n注: 計測時(proc.sh)は go list の stderr を 2>/dev/null で破棄していたため、当時のエラー状況は');
console.log('    直接には遡れない。ただし (1) の GT件数一致が全件で成立するなら、推定に頼らず');
console.log('    「計測時のGTは再現する」と言える。成立しない場合のみ、今日の再取得による推定となる。');
