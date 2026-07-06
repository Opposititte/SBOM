#!/usr/bin/env node
// 同一時点再収集データ(results_fresh/data)から、name一致・version一致 × all/imported/impT × 4ツール
// を評価。マクロ平均(repo単位のP/R/F1平均)と、TP/FP/FNのプール合計の両方を出す。
const fs = require('fs'), path = require('path');
const DATA = path.join(__dirname, 'data');
const norm = s => { try { s = decodeURIComponent(s); } catch (e) {} return s.trim().toLowerCase(); };

// GTファイル("path version" 形式, all先頭はmainで版なし) -> {nm:Set, vr:Set}
function gtSets(f, main) {
  const nm = new Set(), vr = new Set();
  if (!fs.existsSync(f)) return null;
  for (const l of fs.readFileSync(f, 'utf8').split('\n')) {
    const a = l.trim().split(/\s+/); if (!a[0]) continue;
    const p = norm(a[0]); if (p === main || p === 'stdlib') continue;
    nm.add(p); vr.add(p + '|' + (a[1] ? norm(a[1]) : ''));
  }
  return { nm, vr };
}
// ツールCycloneDX -> {nm,vr}
function toolSets(f, main) {
  if (!fs.existsSync(f)) return null;
  let d; try { d = JSON.parse(fs.readFileSync(f)); } catch (e) { return null; }
  const nm = new Set(), vr = new Set();
  for (const c of (d.components || [])) {
    const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0];
    const at = r.lastIndexOf('@');
    const p = norm(at < 0 ? r : r.slice(0, at));
    const v = at < 0 ? '' : norm(r.slice(at + 1));
    if (p === 'stdlib' || p === main) continue;
    nm.add(p); vr.add(p + '|' + v);
  }
  return { nm, vr };
}
function tfn(toolSet, gtSet) { let tp = 0; for (const m of toolSet) if (gtSet.has(m)) tp++; return [tp, toolSet.size - tp, gtSet.size - tp]; }
function prf(tp, fp, fn) { if (tp + fp + fn === 0) return null; const p = tp / (tp + fp || 1), r = tp / (tp + fn || 1); return { p, r, f: 2 * p * r / ((p + r) || 1) }; }

const tools = { syft: 'syft_output.json', trivy: 'trivy_output.json', cdxgen: 'cdxgen_output.json', 'cyclonedx-gomod': 'cyclonedx-gomod_output.json' };
const gts = ['all', 'imported', 'impT'];
const matches = ['nm', 'vr'];
// 集計器: macro配列 と micro合計
const M = {}; const C = {};
for (const t in tools) { M[t] = {}; C[t] = {}; for (const g of gts) for (const mt of matches) { M[t][g + '_' + mt] = { p: [], r: [], f: [] }; C[t][g + '_' + mt] = { tp: 0, fp: 0, fn: 0 }; } }

const repos = fs.existsSync(DATA) ? fs.readdirSync(DATA).filter(n => !n.startsWith('.')) : [];
let nEval = 0, nOK = {};
for (const t in tools) nOK[t] = 0;
for (const name of repos) {
  const dir = path.join(DATA, name);
  const st = fs.existsSync(dir + '/status') ? fs.readFileSync(dir + '/status', 'utf8').trim() : '';
  if (st !== 'OK') continue;
  const main = fs.existsSync(dir + '/main.txt') ? norm(fs.readFileSync(dir + '/main.txt', 'utf8')) : null;
  const GT = { all: gtSets(dir + '/gt_all.txt', main), imported: gtSets(dir + '/gt_imported.txt', main), impT: gtSets(dir + '/gt_impT.txt', main) };
  if (!GT.all || !GT.imported || !GT.impT) continue;
  nEval++;
  for (const t in tools) {
    const S = toolSets(dir + '/' + tools[t], main);
    if (!S) continue;
    nOK[t]++;
    for (const g of gts) for (const mt of matches) {
      const [tp, fp, fn] = tfn(S[mt], GT[g][mt]);
      const x = prf(tp, fp, fn);
      if (x) { M[t][g + '_' + mt].p.push(x.p); M[t][g + '_' + mt].r.push(x.r); M[t][g + '_' + mt].f.push(x.f); }
      const c = C[t][g + '_' + mt]; c.tp += tp; c.fp += fp; c.fn += fn;
    }
  }
}
const A = a => a.length ? (100 * a.reduce((s, x) => s + x, 0) / a.length).toFixed(1) : '-';
const n = x => x.toLocaleString();

console.log('# 同一時点フル再収集 — 評価結果');
console.log(`\n評価repo数(3GT揃い): ${nEval} / 有効ツール行: ` + Object.entries(nOK).map(([k, v]) => `${k}=${v}`).join(', ') + '\n');

for (const mt of matches) {
  console.log(`\n## ${mt === 'nm' ? 'name一致' : 'version一致'}（macro平均 P / R / F1）\n`);
  console.log('| ツール | precision (all/imp/impT) | recall (all/imp/impT) | f1 (all/imp/impT) |');
  console.log('|---|---|---|---|');
  for (const t in tools) {
    const g = k => M[t][k + '_' + mt];
    console.log(`| ${t} | ${A(g('all').p)} / ${A(g('imported').p)} / ${A(g('impT').p)} | ${A(g('all').r)} / ${A(g('imported').r)} / ${A(g('impT').r)} | **${A(g('all').f)} / ${A(g('imported').f)} / ${A(g('impT').f)}** |`);
  }
}
for (const mt of matches) {
  console.log(`\n## ${mt === 'nm' ? 'name一致' : 'version一致'}（TP / FP / FN プール合計）\n`);
  for (const g of gts) {
    console.log(`### ${g}`);
    console.log('| ツール | TP | FP | FN |');
    console.log('|---|---|---|---|');
    for (const t in tools) { const c = C[t][g + '_' + mt]; console.log(`| ${t} | ${n(c.tp)} | ${n(c.fp)} | ${n(c.fn)} |`); }
    console.log('');
  }
}
