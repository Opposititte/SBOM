#!/usr/bin/env node
// analyze.js — ANALYSIS_PLAN.md（計測前に凍結）の規則どおりに集計する。
//   規則は結果を見てから変更していない。
'use strict';
const fs = require('fs'), path = require('path');
const DIR = __dirname, OUT = path.join(DIR, 'out'), ROOT = path.resolve(DIR, '..');
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const norm = s => { try { s = decodeURIComponent(s); } catch (e) { } return s.trim().toLowerCase(); };
const readSet = f => { try { return new Set(fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map(l => norm(l.split('\t')[0]))); } catch (e) { return new Set(); } };
const q = (a, p) => { if (!a.length) return NaN; const s = [...a].sort((x, y) => x - y), i = (s.length - 1) * p, lo = Math.floor(i), hi = Math.ceil(i); return lo === hi ? s[lo] : s[lo] + (s[hi] - s[lo]) * (i - lo); };

const repos = fs.readdirSync(OUT).filter(d => { try { return JSON.parse(fs.readFileSync(`${OUT}/${d}/meta.json`, 'utf8')).status === 'OK'; } catch (e) { return false; } }).sort();
const D = repos.map(r => {
  const m = JSON.parse(fs.readFileSync(`${OUT}/${r}/meta.json`, 'utf8'));
  const gt = { all: readSet(`${OUT}/${r}/gt-all.tsv`), imp: readSet(`${OUT}/${r}/gt-imported.tsv`), impT: readSet(`${OUT}/${r}/gt-imported-test.tsv`) };
  const tool = {}; for (const t of TOOLS) tool[t] = m.tool_state[t] === 'na' ? null : readSet(`${OUT}/${r}/${t}.tsv`);
  return { repo: r, stratum: m.stratum, state: m.tool_state, gt, tool };
});
const tfn = (S, G) => { if (!S) return null; let tp = 0; for (const x of S) if (G.has(x)) tp++; return { tp, fp: S.size - tp, fn: G.size - tp }; };
const L = [];
const W = s => { L.push(s); console.log(s); };

W(`# GT-imported が空である層の分析結果（n=${D.length}）\n`);
W(`規則は \`ANALYSIS_PLAN.md\`（計測前に凍結、コミット 0aed3f96）に従う。結果を見てからの変更はない。\n`);
W(`| 層 | 件数 |`); W(`|---|---:|`);
for (const s of ['impT_nonempty', 'impT_empty']) W(`| \`${s}\` | ${D.filter(d => d.stratum === s).length} |`);
W(`| 合計 | ${D.length} |\n`);
W(`計測できなかった repo: ${123 - D.length} 件\n`);

// ---- 3.1 空GT層（123件全件、GT-imported は定義上つねに空）----
W(`## 1. GT-imported（空GT層・123件全件）\n`);
W(`GT が空のため \`TP=0\`・\`FN=0\` がつねに成立し、非空出力はすべて FP。recall は \`0/0\` で定義不能。`);
W(`計画3.1に従い P/R/F1 は平均しない。\n`);
W(`| ツール | ok_nonempty | ok_empty | na | FP中央値 | FP第1四分位 | FP第3四分位 | FP合計 | 出力モジュール数 最大 |`);
W(`|---|---:|---:|---:|---:|---:|---:|---:|---:|`);
const fpStats = {};
for (const t of TOOLS) {
  const st = { ok_nonempty: 0, ok_empty: 0, na: 0 };
  const fps = [];
  for (const d of D) { st[d.state[t]]++; if (d.tool[t]) fps.push(d.tool[t].size); }
  fpStats[t] = fps;
  W(`| ${t} | ${st.ok_nonempty} | ${st.ok_empty} | ${st.na} | ${q(fps, .5).toFixed(1)} | ${q(fps, .25).toFixed(1)} | ${q(fps, .75).toFixed(1)} | ${fps.reduce((a, b) => a + b, 0)} | ${Math.max(...fps)} |`);
}
W('');

// ---- 補助仮説 H3（合否基準ではない。記述統計のみ）----
W(`## 2. 補助仮説 H3（合否基準ではない）\n`);
W(`H3: 空GT層で Syft/Trivy の FP 数が cdxgen/cyclonedx-gomod より大きい傾向を示すと予想した。`);
W(`計画9節に従い記述統計のみを報告し、検定は行わない。\n`);
W(`| 比較 | A勝ち | 同値 | B勝ち | ペア差の中央値 |`);
W(`|---|---:|---:|---:|---:|`);
for (const [a, b] of [['syft', 'cdxgen'], ['syft', 'cyclonedx-gomod'], ['trivy', 'cdxgen'], ['trivy', 'cyclonedx-gomod']]) {
  let w = 0, e = 0, l = 0; const diffs = [];
  for (const d of D) { if (!d.tool[a] || !d.tool[b]) continue; const x = d.tool[a].size, y = d.tool[b].size; diffs.push(x - y); if (x > y) w++; else if (x === y) e++; else l++; }
  W(`| ${a} > ${b} | ${w} | ${e} | ${l} | ${q(diffs, .5).toFixed(1)} |`);
}
W('');

// ---- 3.2 GT-all（123件全件・通常のP/R/F1）----
function macro(sel, key) {
  const r = {};
  for (const t of TOOLS) {
    const P = [], R = [], F = []; let n = 0;
    for (const d of D) {
      if (!sel(d)) continue; const S = d.tool[t]; if (!S) continue;
      const G = d.gt[key]; const m = tfn(S, G); n++;
      const p = (m.tp + m.fp) ? m.tp / (m.tp + m.fp) : 0;
      const rc = (m.tp + m.fn) ? m.tp / (m.tp + m.fn) : 0;
      P.push(p); R.push(rc); F.push((p + rc) ? 2 * p * rc / (p + rc) : 0);
    }
    const avg = a => a.reduce((x, y) => x + y, 0) / a.length * 100;
    r[t] = { n, p: avg(P), r: avg(R), f: avg(F) };
  }
  return r;
}
W(`## 3. GT-all（123件全件・通常の P/R/F1）\n`);
const A = macro(() => true, 'all');
W(`| ツール | 有効件数 | precision | recall | F1 |`); W(`|---|---:|---:|---:|---:|`);
for (const t of TOOLS) W(`| ${t} | ${A[t].n} | ${A[t].p.toFixed(1)} | ${A[t].r.toFixed(1)} | ${A[t].f.toFixed(1)} |`);
W('');

// ---- 3.3 GT-imported+test（impT_nonempty の112件のみ通常計算）----
W(`## 4. GT-imported+test（\`impT_nonempty\` のみ通常計算）\n`);
const B = macro(d => d.stratum === 'impT_nonempty', 'impT');
W(`| ツール | 有効件数 | precision | recall | F1 |`); W(`|---|---:|---:|---:|---:|`);
for (const t of TOOLS) W(`| ${t} | ${B[t].n} | ${B[t].p.toFixed(1)} | ${B[t].r.toFixed(1)} | ${B[t].f.toFixed(1)} |`);
W(`\n\`impT_empty\` の ${D.filter(d => d.stratum === 'impT_empty').length} 件は空GT層として1節と同じ扱い。\n`);

// ---- 3.4 Dice 形式による感度分析（上限・下限）----
W(`## 5. 感度分析: 123件を本編1,528件に加えた場合（Dice形式・上限と下限）\n`);
W(`\`TP=FP=FN=0\` のとき F1=0 とした場合（下限）と F1=1 とした場合（上限）の両方を報告する。`);
W(`どちらか一方を正解として選ばない。\n`);
const july = {};
{
  const Lm = fs.readFileSync(ROOT + '/metrics.csv', 'utf8').trim().split('\n');
  const H = Lm[0].split(','), ix = Object.fromEntries(H.map((h, i) => [h, i]));
  for (const l of Lm.slice(1)) {
    const c = l.split(','); if (c[2] === 'NA' || c.length < 20) continue;
    (july[c[1]] = july[c[1]] || []).push({
      all: [+c[ix.n_all_tp], +c[ix.n_all_fp], +c[ix.n_all_fn]],
      imp: [+c[ix.n_imp_tp], +c[ix.n_imp_fp], +c[ix.n_imp_fn]],
    });
  }
}
const dice = (tp, fp, fn, tie) => (2 * tp + fp + fn) === 0 ? tie : 2 * tp / (2 * tp + fp + fn);
for (const gtKey of ['imp', 'all']) {
  W(`### GT-${gtKey === 'imp' ? 'imported' : 'all'}\n`);
  W(`| ツール | 本編のみ | +123件 (F1=0) | +123件 (F1=1) |`); W(`|---|---:|---:|---:|`);
  for (const t of TOOLS) {
    const base = july[t].map(x => dice(...x[gtKey], 0));
    const add = [];
    for (const d of D) { const S = d.tool[t]; if (!S) continue; const m = tfn(S, d.gt[gtKey === 'imp' ? 'imp' : 'all']); add.push(m); }
    const mk = tie => { const v = base.concat(add.map(m => dice(m.tp, m.fp, m.fn, tie))); return v.reduce((a, b) => a + b, 0) / v.length * 100; };
    W(`| ${t} | ${(base.reduce((a, b) => a + b, 0) / base.length * 100).toFixed(1)} | ${mk(0).toFixed(1)} | ${mk(1).toFixed(1)} |`);
  }
  W('');
}
fs.writeFileSync(path.join(DIR, 'RESULTS.md'), L.join('\n') + '\n');
console.error('\n[written] empty-gt-stratum/RESULTS.md');
