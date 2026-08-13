#!/usr/bin/env node
// verify.js — 論文の全表を metrics.csv から独立再計算（aggregate.js を使わず別ロジックで）。
const fs = require('fs');
const L = fs.readFileSync(__dirname + '/metrics.csv', 'utf8').trim().split('\n');
const H = L[0].split(','), ix = {}; H.forEach((h, i) => ix[h] = i);
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const rows = {};
for (let i = 1; i < L.length; i++) { const c = L[i].split(','); (rows[c[0]] = rows[c[0]] || {})[c[1]] = c; }
const repos = Object.keys(rows);
const valid = c => c && c[2] !== 'NA' && c.length >= 20;
const g = (c, k) => parseInt(c[ix[k]] || '0', 10) || 0;
const F1 = (tp, fp, fn) => { const p = (tp + fp) ? tp / (tp + fp) : 0, r = (tp + fn) ? tp / (tp + fn) : 0; return (p + r) ? 2 * p * r / (p + r) : 0; };
const P = (tp, fp) => (tp + fp) ? tp / (tp + fp) : 0;
const R = (tp, fn) => (tp + fn) ? tp / (tp + fn) : 0;
const pct = x => (100 * x).toFixed(1);

const DEF = { all: ['n_all_tp', 'n_all_fp', 'n_all_fn'], imp: ['n_imp_tp', 'n_imp_fp', 'n_imp_fn'], impT: ['n_impT_tp', 'n_impT_fp', 'n_impT_fn'] };
const VDEF = { all: ['v_all_tp', 'v_all_fp', 'v_all_fn'], imp: ['v_imp_tp', 'v_imp_fp', 'v_imp_fn'], impT: ['v_impT_tp', 'v_impT_fp', 'v_impT_fn'] };

function macro(MAP) {
  const o = {};
  for (const t of TOOLS) {
    o[t] = {};
    for (const d of ['all', 'imp', 'impT']) {
      let sp = 0, sr = 0, sf = 0, n = 0;
      for (const r of repos) { const c = rows[r][t]; if (!valid(c)) continue;
        const [tp, fp, fn] = MAP[d].map(k => g(c, k));
        if (tp + fn > 0) { sp += P(tp, fp); sr += R(tp, fn); sf += F1(tp, fp, fn); n++; } }
      o[t][d] = { p: pct(sp / n), r: pct(sr / n), f: pct(sf / n), n };
    }
  }
  return o;
}
function micro(MAP) {
  const o = {};
  for (const t of TOOLS) {
    o[t] = {};
    for (const d of ['all', 'imp', 'impT']) {
      let TP = 0, FP = 0, FN = 0;
      for (const r of repos) { const c = rows[r][t]; if (!valid(c)) continue;
        const [tp, fp, fn] = MAP[d].map(k => g(c, k)); TP += tp; FP += fp; FN += fn; }
      o[t][d] = { p: pct(P(TP, FP)), r: pct(R(TP, FN)), f: pct(F1(TP, FP, FN)), TP, FP, FN };
    }
  }
  return o;
}

function printPRF(title, o) {
  console.log('\n### ' + title);
  for (const t of TOOLS) {
    const row = d => `${o[t][d].p}/${o[t][d].r}/${o[t][d].f}`;
    console.log(`${t.padEnd(16)} P/R/F1  all[${row('all')}] imp[${row('imp')}] impT[${row('impT')}]`);
  }
}

const mn = macro(DEF), mv = macro(VDEF), min_ = micro(DEF);
printPRF('tab:result  macro name (all/imp/impT のP/R/F1)', mn);
printPRF('tab:macro-ver  macro version', mv);
printPRF('tab:micro-name  micro name', min_);

console.log('\n### tab:raw  TP/FP/FN pool (name)');
for (const t of TOOLS) console.log(`${t.padEnd(16)} all[${min_[t].all.TP}/${min_[t].all.FP}/${min_[t].all.FN}] imp[${min_[t].imp.TP}/${min_[t].imp.FP}/${min_[t].imp.FN}] impT[${min_[t].impT.TP}/${min_[t].impT.FP}/${min_[t].impT.FN}]`);

console.log('\n### tab:valid 有効/NA');
for (const t of TOOLS) { let v = 0, na = 0; for (const r of repos) { const c = rows[r][t]; if (!c) continue; valid(c) ? v++ : na++; } console.log(`${t.padEnd(16)} valid=${v} NA=${na}`); }

// FPバケツ (imported基準・name)
console.log('\n### tab:fp  FP要因 (imported基準・name, %)');
for (const t of TOOLS) {
  let tot = 0, test = 0, os = 0, direct = 0, indirect = 0, gosum = 0, sib = 0;
  for (const r of repos) { const c = rows[r][t]; if (!valid(c)) continue;
    tot += g(c, 'n_imp_fp'); test += g(c, 'fp_test'); os += g(c, 'fp_otherOS');
    direct += g(c, 'fp_direct_unused'); indirect += g(c, 'fp_indirect_unused');
    gosum += g(c, 'fp_gosum_only'); sib += g(c, 'fp_sibling'); }
  const resid = direct + gosum + sib; // 論文の「残余」= direct+gosum+sibling
  const p = v => (100 * v / tot).toFixed(1);
  console.log(`${t.padEnd(16)} FP=${tot} test=${p(test)} os=${p(os)} indirect=${p(indirect)} 残余=${p(resid)} (直=${p(direct)} gosum=${p(gosum)} 兄弟=${p(sib)})`);
}

// robustness common set
const common = repos.filter(r => TOOLS.every(t => valid(rows[r][t])));
console.log('\n### tab:robust  imported name macro-F1  共通集合 n=' + common.length);
for (const t of TOOLS) {
  let s = 0, n = 0; for (const r of common) { const c = rows[r][t]; const [tp, fp, fn] = DEF.imp.map(k => g(c, k)); if (tp + fn > 0) { s += F1(tp, fp, fn); n++; } }
  console.log(`${t.padEnd(16)} 共通F1=${pct(s / n)} (n=${n})`);
}
