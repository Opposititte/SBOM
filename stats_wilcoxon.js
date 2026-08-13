#!/usr/bin/env node
// stats_wilcoxon.js — 「GT定義でツール優劣が逆転する」が偶然でないことを
// Wilcoxon 符号付き順位検定（対応あり・ノンパラメトリック）で確認する。
//   入力: census2/metrics.csv （repo×tool の tp/fp/fn）
//   比較: 4ツール全部成功の共通repo(n=1467)で、GT固定・per-repo F1(name一致)を対にする。
//   出力: 各対の z値・p値・勝敗数・中央値差・効果量(rank-biserial)。
// 大標本ではどんな微差も p は極小になるため、必ず効果量/勝敗も併記して読む。
const fs = require('fs');
const L = fs.readFileSync(__dirname + '/metrics.csv', 'utf8').trim().split('\n');
const H = L[0].split(','); const idx = Object.fromEntries(H.map((h, i) => [h, i]));
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const byRepo = {};
for (let i = 1; i < L.length; i++) { const c = L[i].split(','); (byRepo[c[0]] = byRepo[c[0]] || {})[c[1]] = c; }
const isValid = c => c && c[2] !== 'NA' && c.length >= 20;
const common = Object.keys(byRepo).filter(r => TOOLS.every(t => isValid(byRepo[r][t])));

// 1リポジトリのF1（def = "imp" | "all"）。GTが空(recall不定)なら null。
function f1(c, def) {
  const tp = +c[idx['n_' + def + '_tp']], fp = +c[idx['n_' + def + '_fp']], fn = +c[idx['n_' + def + '_fn']];
  if (tp + fn === 0) return null;
  const p = (tp + fp) ? tp / (tp + fp) : 0, r = tp / (tp + fn);
  return (p + r) ? 2 * p * r / (p + r) : 0;
}
function erf(x){const t=1/(1+0.3275911*Math.abs(x));const y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-0.284496736)*t+0.254829592)*t*Math.exp(-x*x);return x>=0?y:-y;}
const Phi = z => 0.5 * (1 + erf(z / Math.SQRT2));

// Wilcoxon 符号付き順位検定（正規近似・タイ補正・連続補正）
function wilcoxon(A, B) {
  const d = []; for (let i = 0; i < A.length; i++) { if (A[i] != null && B[i] != null) { const x = A[i] - B[i]; if (x !== 0) d.push(x); } }
  const n = d.length;
  const abs = d.map((v, i) => [Math.abs(v), i]).sort((a, b) => a[0] - b[0]);
  const rank = new Array(n); let i = 0, tie = 0;
  while (i < n) { let j = i; while (j < n && abs[j][0] === abs[i][0]) j++; const avg = (i + 1 + j) / 2, g = j - i; if (g > 1) tie += g * g * g - g; for (let k = i; k < j; k++) rank[abs[k][1]] = avg; i = j; }
  let Wp = 0, Wm = 0; for (let k = 0; k < n; k++) { if (d[k] > 0) Wp += rank[k]; else Wm += rank[k]; }
  const mean = n * (n + 1) / 4, varr = n * (n + 1) * (2 * n + 1) / 24 - tie / 48;
  const z = (Wp - mean - Math.sign(Wp - mean) * 0.5) / Math.sqrt(varr);
  const p = 2 * (1 - Phi(Math.abs(z)));
  const wins = d.filter(v => v > 0).length, losses = d.filter(v => v < 0).length;
  const rbc = (Wp - Wm) / (Wp + Wm);
  const s = d.slice().sort((a, b) => a - b); const med = s[Math.floor(s.length / 2)];
  return { n, z: z.toFixed(1), p, wins, losses, rbc: rbc.toFixed(2), medDiff: (100 * med).toFixed(1) };
}
const c = def => t => common.map(r => f1(byRepo[r][t], def));
const imp = c('imp'), all = c('all');
function row(label, A, B) { const w = wilcoxon(A, B); const ps = w.p < 1e-15 ? '<1e-15' : w.p.toExponential(1);
  console.log(`${label} | 勝敗 ${w.wins}/${w.losses} | 中央値差 ${w.medDiff}pt | 効果量 ${w.rbc} | z=${w.z} | p ${ps}`); }

console.log(`# Wilcoxon 符号付き順位検定 (共通集合 n=${common.length}, per-repo F1, name一致)\n`);
console.log('【逆転＝論文の主張】');
row('cdxgen>syft  (imported)', imp('cdxgen'), imp('syft'));
row('syft>cdxgen  (all)     ', all('syft'), all('cdxgen'));
console.log('\n【細かい序列（効果量で読む）】');
row('cyclonedx vs cdxgen(imp)', imp('cyclonedx-gomod'), imp('cdxgen'));
row('trivy>syft   (imported)', imp('trivy'), imp('syft'));
row('syft>trivy   (all)     ', all('syft'), all('trivy'));
console.log('\n【同一ツールでGTを変える】');
row('cdxgen imp vs all      ', imp('cdxgen'), all('cdxgen'));
