#!/usr/bin/env node
// make_full_md.js — full awesome-go result table in three_gt_6repos.md style, name-level,
// with a per-section summary after each GT, then the two summaries together at the end.
// Output: resultsAll/full_awesome_go.md
const fs = require('fs'), path = require('path');
const RES = process.env.RESULTS || 'resultsAll';
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const GTS = [['all', 'gt_go_list.txt', 'go list -m all'],
             ['imported', 'gt_imported.txt', "GOOS=linux go list -deps -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./... | sort -u"]];
const pct = x => (x * 100).toFixed(1);
const norm = p => { try { p = decodeURIComponent(p); } catch (e) {} return p.toLowerCase(); };
function readGT(f, kind) { const m = new Map(); if (!fs.existsSync(f)) return m;
  const L = fs.readFileSync(f, 'utf8').split('\n').map(s => s.trim()).filter(Boolean);
  L.forEach((line, i) => { const a = line.split(/\s+/); if (kind === 'all' && i === 0 && a.length === 1) return; if (a[0]) m.set(norm(a[0]), 1); }); return m; }
function mainOf(repo) { const f = path.join(RES, repo, 'gt_go_list.txt'); if (!fs.existsSync(f)) return null;
  const fr = fs.readFileSync(f, 'utf8').split('\n')[0].trim().split(/\s+/); return fr.length === 1 ? norm(fr[0]) : null; }
function readTool(f, main) { const s = new Set(); let d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return s; }
  for (const c of (d.components || [])) { const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0]; const at = r.lastIndexOf('@'); const p = norm(at === -1 ? r : r.slice(0, at));
    if (p !== 'stdlib' && p !== main) s.add(p); } return s; }

const repos = fs.readdirSync(RES, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name)
  .filter(n => { const a = path.join(RES, n, 'gt_go_list.txt'), i = path.join(RES, n, 'gt_imported.txt');
    return fs.existsSync(a) && fs.statSync(a).size > 0 && fs.existsSync(i) && fs.statSync(i).size > 0; }).sort();

const summary = {};  // summary[gt][tool] = {p,r,f1,n}
for (const [g] of GTS) { summary[g] = {}; for (const t of TOOLS) summary[g][t] = { p: 0, r: 0, f1: 0, n: 0 }; }

const out = [];
out.push('# 全 awesome-go × 4ツール — 正解(GT) 別の結果表（名前一致）\n');
out.push(`正解を all / imported の2通りに変えて評価。対象 = 両GTが非空の **${repos.length} リポジトリ**。`);
out.push('precision/recall/f1 は％。tp = パスが正解に含まれる数。\n');

for (const [gname, gfile, cmd] of GTS) {
  out.push(`\n## 正解 = ${gname}\n`);
  out.push('正解(GT)定義コマンド（このコマンドの出力を正解とする）:');
  out.push('```bash'); out.push(cmd); out.push('```\n');
  out.push('| repo | gt | tool | predicted | tp | fp | fn | precision | recall | f1 |');
  out.push('|------|---:|------|----------:|---:|---:|---:|----------:|-------:|----:|');
  for (const repo of repos) {
    const gt = readGT(path.join(RES, repo, gfile), gname); const main = mainOf(repo);
    for (const t of TOOLS) {
      const pred = readTool(path.join(RES, repo, `${t}_output.json`), main);
      let tp = 0; for (const x of pred) if (gt.has(x)) tp++;
      const fp = pred.size - tp, fn = gt.size - tp;
      const P = tp + fp ? tp / (tp + fp) : 0, R = tp + fn ? tp / (tp + fn) : 0, F = P + R ? 2 * P * R / (P + R) : 0;
      out.push(`| ${repo} | ${gt.size} | ${t} | ${pred.size} | ${tp} | ${fp} | ${fn} | ${pct(P)} | ${pct(R)} | ${pct(F)} |`);
      const k = summary[gname][t]; k.p += P; k.r += R; k.f1 += F; k.n++;
    }
  }
  // per-section summary
  out.push(`\n### まとめ（正解 = ${gname}, ${repos.length}リポジトリ平均, ％）\n`);
  out.push('| ツール | precision | recall | f1 |');
  out.push('|--------|----------:|-------:|----:|');
  for (const t of TOOLS) { const k = summary[gname][t]; out.push(`| ${t} | ${pct(k.p / k.n)} | ${pct(k.r / k.n)} | **${pct(k.f1 / k.n)}** |`); }
}

// final: the two summaries together
out.push('\n\n---\n');
out.push('# 最終まとめ — all と imported（並べて比較）\n');
for (const [gname] of GTS) {
  out.push(`\n## まとめ（正解 = ${gname}, ${repos.length}リポジトリ平均, ％）\n`);
  out.push('| ツール | precision | recall | f1 |');
  out.push('|--------|----------:|-------:|----:|');
  for (const t of TOOLS) { const k = summary[gname][t]; out.push(`| ${t} | ${pct(k.p / k.n)} | ${pct(k.r / k.n)} | **${pct(k.f1 / k.n)}** |`); }
}

fs.writeFileSync(path.join(RES, 'full_awesome_go.md'), out.join('\n') + '\n');
console.log(`wrote ${RES}/full_awesome_go.md  (repos=${repos.length}, lines=${out.length})`);
// print just the final summaries
console.log('\n=== 最終まとめ ===');
for (const [gname] of GTS) { console.log(`\n[正解=${gname}]`); for (const t of TOOLS) { const k = summary[gname][t]; console.log(`  ${t.padEnd(16)} P=${pct(k.p/k.n)} R=${pct(k.r/k.n)} F1=${pct(k.f1/k.n)}`); } }
