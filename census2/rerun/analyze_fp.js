#!/usr/bin/env node
// analyze_fp.js — 保存した TSV を使って「7月の計測では答えられなかった問い」に答える。
//   例: 「Syft の誤検出（FP）モジュールの上位は何か」
//
//   使い方: node census2/rerun/analyze_fp.js [GT定義]    既定 imported
//   出力  : census2/rerun/out/fp_ranking_<GT>.csv と標準出力のサマリ
//
//   標本: census2/rerun/out/ に成果物がある repo（seed固定ランダム順で処理されるため
//         途中で止まっても偏りのない無作為標本になる）。
//   照合: scorer.js と同じく小文字化したモジュールパス単位。
'use strict';
const fs = require('fs');
const path = require('path');

const GT = process.argv[2] || 'imported';
const GTFILE = { imported: 'gt-imported.tsv', impT: 'gt-imported-test.tsv', all: 'gt-all.tsv' }[GT];
if (!GTFILE) { console.error('GT は imported / impT / all のいずれか'); process.exit(2); }
const OUT = path.join(__dirname, 'out');
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const norm = s => { try { s = decodeURIComponent(s); } catch (e) { } return s.trim().toLowerCase(); };
const readTsv = f => fs.existsSync(f)
  ? fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map(l => norm(l.split('\t')[0])).filter(Boolean)
  : null;

const repos = fs.readdirSync(OUT).filter(d => {
  try { return JSON.parse(fs.readFileSync(`${OUT}/${d}/meta.json`, 'utf8')).status === 'OK'; } catch (e) { return false; }
}).sort();

// module -> tool -> FPが出たrepo数
const fpCount = {}, toolTotals = {};
let nRepo = 0;
for (const r of repos) {
  const gt = readTsv(`${OUT}/${r}/${GTFILE}`);
  if (!gt || !gt.length) continue;           // GTが空なら評価対象外（7月と同じゲート）
  const G = new Set(gt);
  let counted = false;
  for (const t of TOOLS) {
    const s = readTsv(`${OUT}/${r}/${t}.tsv`);
    if (!s) continue;                        // NA
    counted = true;
    toolTotals[t] = toolTotals[t] || { repos: 0, fp: 0, tp: 0 };
    toolTotals[t].repos++;
    for (const m of new Set(s)) {
      if (G.has(m)) { toolTotals[t].tp++; continue; }
      toolTotals[t].fp++;
      (fpCount[m] = fpCount[m] || {})[t] = ((fpCount[m] || {})[t] || 0) + 1;
    }
  }
  if (counted) nRepo++;
}

console.log(`# FP分析（GT-${GT}、モジュールパス単位）  標本 ${nRepo} リポジトリ\n`);
console.log('## ツール別のFP総数（のべ repo×module）');
for (const t of TOOLS) {
  const x = toolTotals[t]; if (!x) continue;
  console.log(`  ${t.padEnd(17)} FP=${String(x.fp).padStart(6)}  TP=${String(x.tp).padStart(6)}  評価repo=${x.repos}`);
}

const rows = ['module,' + TOOLS.join(',') + ',total'];
const rank = Object.entries(fpCount)
  .map(([m, byTool]) => ({ m, byTool, total: TOOLS.reduce((s, t) => s + (byTool[t] || 0), 0) }))
  .sort((a, b) => b.total - a.total);
for (const e of rank) rows.push([e.m, ...TOOLS.map(t => e.byTool[t] || 0), e.total].join(','));
fs.writeFileSync(`${OUT}/fp_ranking_${GT}.csv`, rows.join('\n') + '\n');

const show = (t, n) => {
  console.log(`\n## ${t} が最も多く誤検出したモジュール（上位${n}）`);
  Object.entries(fpCount).map(([m, b]) => [m, b[t] || 0]).filter(x => x[1] > 0)
    .sort((a, b) => b[1] - a[1]).slice(0, n)
    .forEach(([m, c], i) => console.log(`  ${String(i + 1).padStart(2)}. ${m}  (${c} repo, ${(100 * c / nRepo).toFixed(1)}%)`));
};
for (const t of TOOLS) show(t, 10);
console.log(`\n[written] ${OUT}/fp_ranking_${GT}.csv （全 ${rank.length} モジュール）`);
