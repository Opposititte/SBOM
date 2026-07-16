#!/usr/bin/env node
// aggregate.js — census/metrics.csv から SUMMARY の全表を再生成。
//   §1  macro P/R/F1 (name/version × all/imp/impT)   ※空GT除外(recall定義可能なrepoのみ)
//   §1b micro P/R/F1 (プール合計から)
//   §1c TP/FP/FN プール合計
//   §2b 有効評価repo数 / NA数
//   §2d FP原因バケツ(imported基準・name)
// 使い方: node census/aggregate.js  (metrics.csv / manifest.csv を読む)
const fs = require('fs');
const BASE = __dirname;
const MET = process.env.MET || BASE + '/metrics.csv';
const MAN = process.env.MAN || BASE + '/manifest.csv';
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const p1 = x => (x).toFixed(1);

const lines = fs.readFileSync(MET, 'utf8').trim().split('\n');
const hdr = lines[0].split(',');
const idx = {}; hdr.forEach((h, i) => idx[h] = i);
// 列群
const NAME = { all: ['n_all_tp', 'n_all_fp', 'n_all_fn'], imp: ['n_imp_tp', 'n_imp_fp', 'n_imp_fn'], impT: ['n_impT_tp', 'n_impT_fp', 'n_impT_fn'] };
const VER = { all: ['v_all_tp', 'v_all_fp', 'v_all_fn'], imp: ['v_imp_tp', 'v_imp_fp', 'v_imp_fn'], impT: ['v_impT_tp', 'v_impT_fp', 'v_impT_fn'] };
const FPB = ['fp_test', 'fp_otherOS', 'fp_direct_unused', 'fp_indirect_unused', 'fp_gosum_only', 'fp_sibling'];

// per tool accumulators
const A = {};
for (const t of TOOLS) A[t] = {
  valid: 0, na: 0,
  macro: {}, micro: {}, fpb: {},
};
for (const t of TOOLS) for (const sys of ['name', 'ver']) for (const g of ['all', 'imp', 'impT']) {
  A[t].macro[sys + g] = { p: 0, r: 0, f1: 0, n: 0 };
  A[t].micro[sys + g] = { tp: 0, fp: 0, fn: 0 };
}
for (const t of TOOLS) for (const b of FPB) A[t].fpb[b] = 0;
for (const t of TOOLS) A[t].fpb.imp_fp_total = 0;

function prf(tp, fp, fn) {
  const p = (tp + fp) ? tp / (tp + fp) : 0;
  const r = (tp + fn) ? tp / (tp + fn) : 0;
  const f1 = (p + r) ? 2 * p * r / (p + r) : 0;
  return { p, r, f1 };
}

for (let i = 1; i < lines.length; i++) {
  const c = lines[i].split(',');
  const tool = c[1];
  if (!A[tool]) continue;
  if (c[2] === 'NA' || c.length < 20) { A[tool].na++; continue; }
  A[tool].valid++;
  const num = j => parseInt(c[idx[j]] || '0', 10) || 0;
  for (const [sys, MAP] of [['name', NAME], ['ver', VER]]) {
    for (const g of ['all', 'imp', 'impT']) {
      const [tp, fp, fn] = MAP[g].map(num);
      // micro: 全repo合算
      const mi = A[tool].micro[sys + g]; mi.tp += tp; mi.fp += fp; mi.fn += fn;
      // macro: GT非空(tp+fn>0)のrepoのみ
      if (tp + fn > 0) {
        const m = prf(tp, fp, fn); const ma = A[tool].macro[sys + g];
        ma.p += m.p; ma.r += m.r; ma.f1 += m.f1; ma.n++;
      }
    }
  }
  // FPバケツ (imported基準・name)
  for (const b of FPB) A[tool].fpb[b] += num(b);
  A[tool].fpb.imp_fp_total += num('n_imp_fp');
}

const out = [];
const W = s => out.push(s);
W('# census — 確定サマリ（再生成）\n');
W('全 awesome-go リポジトリを1回のクローン上で all/imported/imported+test の3GT（版付き）と');
W('syft/trivy/cdxgen/cyclonedx-gomod の4ツールを同時生成し照合。ツール版は `census/tool_versions.txt`。\n');

// 母数
const man = fs.existsSync(MAN) ? fs.readFileSync(MAN, 'utf8').trim().split('\n').slice(1) : [];
const statusCount = {};
for (const l of man) { const s = (l.split(',')[6] || '').trim(); statusCount[s] = (statusCount[s] || 0) + 1; }
W('## 母数（manifest.csv, status別）');
W('| status | 件数 |'); W('|---|---:|');
for (const s of Object.keys(statusCount).sort()) W(`| ${s} | ${statusCount[s]} |`);
W(`| **合計(記録repo)** | **${man.length}** |\n`);

function macroTable(sys, label) {
  W(`### ${label}`);
  W('| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |');
  W('|---|---|---|---|');
  for (const t of TOOLS) {
    const g = x => A[t].macro[sys + x];
    const P = ['all', 'imp', 'impT'].map(x => p1(g(x).n ? 100 * g(x).p / g(x).n : 0));
    const R = ['all', 'imp', 'impT'].map(x => p1(g(x).n ? 100 * g(x).r / g(x).n : 0));
    const F = ['all', 'imp', 'impT'].map(x => p1(g(x).n ? 100 * g(x).f1 / g(x).n : 0));
    W(`| ${t} | ${P.join(' / ')} | ${R.join(' / ')} | ${F.join(' / ')} |`);
  }
  W('');
}
W('## 1. macro平均 precision/recall/F1 (%)（空GT除外＝recall定義可能なrepoのみ）');
macroTable('name', 'name一致');
macroTable('ver', 'version一致');

function microTable(sys, label) {
  W(`### ${label}（micro）`);
  W('| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |');
  W('|---|---|---|---|');
  for (const t of TOOLS) {
    const g = x => A[t].micro[sys + x];
    const P = ['all', 'imp', 'impT'].map(x => { const m = g(x); return p1(100 * (m.tp + m.fp ? m.tp / (m.tp + m.fp) : 0)); });
    const R = ['all', 'imp', 'impT'].map(x => { const m = g(x); return p1(100 * (m.tp + m.fn ? m.tp / (m.tp + m.fn) : 0)); });
    const F = ['all', 'imp', 'impT'].map(x => { const m = g(x); const p = m.tp + m.fp ? m.tp / (m.tp + m.fp) : 0, r = m.tp + m.fn ? m.tp / (m.tp + m.fn) : 0; return p1(100 * (p + r ? 2 * p * r / (p + r) : 0)); });
    W(`| ${t} | ${P.join(' / ')} | ${R.join(' / ')} | ${F.join(' / ')} |`);
  }
  W('');
}
W('## 1b. micro集計（プール合計から算出 P/R/F1, %）');
microTable('name', 'name一致');
microTable('ver', 'version一致');

function poolTable(sys, label) {
  W(`### ${label}`);
  W('| ツール | all (TP/FP/FN) | imported (TP/FP/FN) | impT (TP/FP/FN) |');
  W('|---|---|---|---|');
  for (const t of TOOLS) {
    const cell = x => { const m = A[t].micro[sys + x]; return `${m.tp.toLocaleString()} / ${m.fp.toLocaleString()} / ${m.fn.toLocaleString()}`; };
    W(`| ${t} | ${cell('all')} | ${cell('imp')} | ${cell('impT')} |`);
  }
  W('');
}
W('## 1c. TP/FP/FN プール合計');
poolTable('name', 'name一致');
poolTable('ver', 'version一致');

W('## 2b. 有効評価repo数 / NA数');
W('| ツール | 有効 | NA(失敗) |'); W('|---|---:|---:|');
for (const t of TOOLS) W(`| ${t} | ${A[t].valid} | ${A[t].na} |`);
W('');

W('## 2d. FP原因バケツ（imported基準・name, 全repoプール）');
W('| ツール | imp_FP | test | 他OS | direct未使用 | indirect未使用 | 残余(go.sum残骸+兄弟) |');
W('|---|---:|---:|---:|---:|---:|---:|');
for (const t of TOOLS) {
  const f = A[t].fpb; const tot = f.imp_fp_total || 1;
  const pc = v => p1(100 * v / tot) + '%';
  // 残余 = gosum_only + sibling（scorerの分類に準拠）
  const resid = f.fp_gosum_only + f.fp_sibling;
  W(`| ${t} | ${f.imp_fp_total.toLocaleString()} | ${pc(f.fp_test)} | ${pc(f.fp_otherOS)} | ${pc(f.fp_direct_unused)} | ${pc(f.fp_indirect_unused)} | ${pc(resid)} |`);
}
W('');
W('### 2d-2. 残余バケツの go.sum内(残骸) vs go.sum外(兄弟) 分離');
W('| ツール | 残余 | go.sum内(残骸) | go.sum外(兄弟) |'); W('|---|---:|---:|---:|');
for (const t of TOOLS) {
  const f = A[t].fpb; const resid = f.fp_gosum_only + f.fp_sibling || 1;
  W(`| ${t} | ${(f.fp_gosum_only + f.fp_sibling).toLocaleString()} | ${p1(100 * f.fp_gosum_only / resid)}% | ${p1(100 * f.fp_sibling / resid)}% |`);
}
W('');

fs.writeFileSync(BASE + '/SUMMARY_census.md', out.join('\n') + '\n');
console.log(out.join('\n'));
console.error('\n[written] census/SUMMARY_census.md');
