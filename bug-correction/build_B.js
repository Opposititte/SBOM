#!/usr/bin/env node
// build_B.js — 「B: 7月と完全に同じ repo 集合・同じ有効件数のまま、
//   自モジュール除外漏れだけを補正した metrics」を作る。
//
// 【7月の raw SBOM が無いのに補正値を出せる根拠】
//   7月の不具合は「main.txt が空だったため scorer.js が自モジュールを除外できなかった」
//   ことである。ツールの出力自体は壊れていない。
//   そこで再計測(remeasurement-full)の raw SBOM に対し、
//     (1) main を空にして scorer.js を実行 → 7月の記録と一致するか検証
//     (2) 一致した行についてのみ、main を正しく与えて scorer.js を実行した値に差し替える
//   (1) が一致するということは「ツール出力が7月と同一」であることの直接証拠であり、
//   したがって (2) は「7月のツール出力を、正しい main で採点し直した値」と同値になる。
//   一致しない行は補正しない（根拠が無いため）。
//
// 【7月の値をどこまで保つか】
//   - repo 集合・行数・NA 状態は7月のまま一切変更しない（分母を動かさない）
//   - 置換するのは tp/fp/fn の 18 列（name 9 + version 9）のみ
//   - FP 要因分類の 6 列は7月の値を保持する。再計測は補助集合
//     (win.txt / mod_direct.txt / gosum.txt 等) を保存しておらず正しく再計算できないため。
'use strict';
const fs = require('fs'), cp = require('child_process'), path = require('path'), zlib = require('zlib');
const ROOT = path.resolve(__dirname, '..');
const OUT = ROOT + '/remeasurement-full/out';
const SCORER = ROOT + '/scorer.js';
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const TMP = process.env.TMPDIR || require('os').tmpdir();

// 7月の記録だけから確定した「main を除外できていなかった repo」（事前予測集合）
const BUG = ['Lifailon__lazyjournal', 'antonmedv__fx', 'box-cli-maker__box-cli-maker',
  'dghubble__sling', 'dtgorski__typex', 'homedepot__flop', 'naughtygopher__errors'];

function score(repo, emptyMain) {
  const R = `${OUT}/${repo}`, D = `${TMP}/bc_${process.pid}`;
  fs.rmSync(D, { recursive: true, force: true }); fs.mkdirSync(D, { recursive: true });
  const meta = JSON.parse(fs.readFileSync(`${R}/meta.json`, 'utf8'));
  const t2 = f => fs.existsSync(f) ? fs.readFileSync(f, 'utf8').replace(/\t/g, ' ') : '';
  fs.writeFileSync(`${D}/main.txt`, emptyMain ? '' : (meta.gmain || '') + '\n');
  fs.writeFileSync(`${D}/gt_imported.txt`, t2(`${R}/gt-imported.tsv`));
  fs.writeFileSync(`${D}/gt_impT.txt`, t2(`${R}/gt-imported-test.tsv`));
  fs.writeFileSync(`${D}/gt_all.txt`, ((emptyMain && meta.gmain) ? meta.gmain + '\n' : '') + t2(`${R}/gt-all.tsv`));
  for (const f of ['win.txt', 'mod_direct.txt', 'mod_indirect.txt', 'gosum.txt']) fs.writeFileSync(`${D}/${f}`, '');
  for (const t of TOOLS) {
    const g = `${R}/raw/${t}.json.gz`;
    if (fs.existsSync(g)) fs.writeFileSync(`${D}/${t}_output.json`, zlib.gunzipSync(fs.readFileSync(g)));
  }
  let out = '';
  try { out = cp.execSync(`node ${SCORER} ${D}`, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }); }
  catch (e) { out = e.stdout || ''; }
  fs.rmSync(D, { recursive: true, force: true });
  const res = {};
  for (const line of out.trim().split('\n')) { const c = line.split(','); if (c[1]) res[c[1]] = c; }
  return res;
}

const L = fs.readFileSync(ROOT + '/metrics.csv', 'utf8').trim().split('\n');
const HEAD = L[0].split(',');
const VAL = HEAD.slice(2, 20);                 // 置換対象18列（name9 + version9）
const july = {}; for (const l of L.slice(1)) { const c = l.split(','); july[c[0] + '|' + c[1]] = c; }

const ev = ['repo,tool,column,july,cold_emptymain,reproduces_july,corrected_value'];
const decision = ['repo,tool,july_row,cold_emptymain_matches_july,action,reason'];
const patch = {};
let nRepoOK = 0, nRowPatched = 0;

for (const repo of BUG) {
  let st = null; try { st = JSON.parse(fs.readFileSync(`${OUT}/${repo}/meta.json`, 'utf8')).status; } catch (e) { }
  if (st !== 'OK') {
    for (const t of TOOLS) decision.push([repo, t, 'ok', 'NA', 'not_corrected',
      `再計測が status=${st || 'なし'}（SHA未記録等で計測できず）。補正根拠が得られない`].join(','));
    continue;
  }
  const A = score(repo, false);      // 正しく main を除外 → 補正値
  const B = score(repo, true);       // main 空 → 7月の再現
  let repoOK = true;
  for (const t of TOOLS) {
    const j = july[repo + '|' + t];
    if (!j) { decision.push([repo, t, 'missing', 'NA', 'not_corrected', '7月に行が無い'].join(',')); repoOK = false; continue; }
    const jNA = (j[2] === 'NA' || j.length < 20);
    if (jNA || !B[t] || !A[t]) {
      decision.push([repo, t, jNA ? 'NA' : 'ok', 'NA', 'not_corrected', 'NA行のため補正対象外（分母を動かさない）'].join(','));
      continue;
    }
    // 7月の18値と、main空で採点した18値が完全一致するか
    let same = true;
    for (let i = 0; i < 18; i++) if (String(j[2 + i]) !== String(B[t][2 + i])) same = false;
    decision.push([repo, t, 'ok', same ? 'yes' : 'NO', same ? 'corrected' : 'not_corrected',
      same ? 'main空採点が7月と完全一致＝ツール出力が同一と確認' : '★一致しないため補正根拠なし'].join(','));
    if (!same) { repoOK = false; continue; }
    for (let i = 0; i < 18; i++) {
      if (String(j[2 + i]) !== String(A[t][2 + i]))
        ev.push([repo, t, VAL[i], j[2 + i], B[t][2 + i], 'yes', A[t][2 + i]].join(','));
    }
    const row = j.slice();
    for (let i = 0; i < 18; i++) row[2 + i] = A[t][2 + i];   // 18列のみ置換。fp_*6列は7月のまま
    patch[repo + '|' + t] = row.join(',');
    nRowPatched++;
  }
  if (repoOK) nRepoOK++;
}

const outRows = [L[0]];
for (const l of L.slice(1)) { const c = l.split(','); outRows.push(patch[c[0] + '|' + c[1]] || l); }
fs.writeFileSync(__dirname + '/metrics_B.csv', outRows.join('\n') + '\n');
fs.writeFileSync(__dirname + '/evidence_cell_changes.csv', ev.join('\n') + '\n');
fs.writeFileSync(__dirname + '/evidence_decisions.csv', decision.join('\n') + '\n');
console.log(`補正した行: ${nRowPatched} / 変化したセル: ${ev.length - 1}`);
console.log(`行数: 7月 ${L.length - 1} → B ${outRows.length - 1}（同一）`);
