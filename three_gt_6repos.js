#!/usr/bin/env node
// three_gt_6repos.js — the 6 curated repos, in the original readable format
// (repo, gt, tool, predicted, tp, fp, fn, precision, recall, f1), one table per
// ground truth (all / imported / direct), plus a difference-summary table.
const fs = require('fs'), path = require('path');
const RES = 'results';
const REPOS = ['gin', 'cobra', 'hugo', 'frp', 'gorm', 'ollama'];
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const GTS = [['all', 'gt_go_list.txt'], ['imported', 'gt_imported.txt'], ['direct', 'gt_direct.txt']];
const pct = x => (x * 100).toFixed(1);
const norm = p => { try { p = decodeURIComponent(p); } catch (e) {} return p.toLowerCase(); };
function readGT(f, kind) { if (!fs.existsSync(f)) return new Set();
  const L = fs.readFileSync(f, 'utf8').split('\n').map(s => s.trim()).filter(Boolean); const s = new Set();
  L.forEach((line, i) => { const a = line.split(/\s+/); if (kind === 'all' && i === 0 && a.length === 1) return; if (a[0]) s.add(norm(a[0])); }); return s; }
function readTool(f, main) { const s = new Set(); let d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return s; }
  for (const c of (d.components || [])) { const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0]; const at = r.lastIndexOf('@'); const p = norm(at === -1 ? r : r.slice(0, at)); if (p !== 'stdlib' && p !== main) s.add(p); } return s; }
function mainOf(repo) { const f = path.join(RES, repo, 'gt_go_list.txt'); if (!fs.existsSync(f)) return null;
  const first = fs.readFileSync(f, 'utf8').split('\n')[0].trim().split(/\s+/); return first.length === 1 ? norm(first[0]) : null; }

const out = [];
out.push('# 6リポジトリ × 4ツール — 正解(GT) 別の結果表\n');
out.push('正解を all / imported / direct の3通りに変えて、各ツールの predicted・tp・fp・fn・precision・recall・f1 を表示。');
out.push('precision/recall/f1 は％（name 一致）。\n');

const avg = {}; for (const t of TOOLS) for (const [g] of GTS) avg[t + '|' + g] = { p: 0, r: 0, f1: 0, n: 0 };

for (const [gname, gfile] of GTS) {
  out.push(`\n## 正解 = ${gname}\n`);
  out.push('| repo | gt | tool | predicted | tp | fp | fn | precision | recall | f1 |');
  out.push('|------|---:|------|----------:|---:|---:|---:|----------:|-------:|----:|');
  for (const repo of REPOS) {
    const gt = readGT(path.join(RES, repo, gfile), gname);
    for (const t of TOOLS) {
      const pred = readTool(path.join(RES, repo, `${t}_output.json`), mainOf(repo));
      let tp = 0; for (const x of pred) if (gt.has(x)) tp++;
      const fp = pred.size - tp, fn = gt.size - tp;
      const P = tp + fp ? tp / (tp + fp) : 0, R = tp + fn ? tp / (tp + fn) : 0, F = P + R ? 2 * P * R / (P + R) : 0;
      out.push(`| ${repo} | ${gt.size} | ${t} | ${pred.size} | ${tp} | ${fp} | ${fn} | ${pct(P)} | ${pct(R)} | ${pct(F)} |`);
      const k = avg[t + '|' + gname]; k.p += P; k.r += R; k.f1 += F; k.n++;
    }
  }
}

out.push('\n## まとめ：正解の違いでスコアがどれだけ変わるか（6リポジトリの平均, ％）\n');
out.push('| ツール | precision (all/imp/dir) | recall (all/imp/dir) | **f1 (all/imp/dir)** |');
out.push('|--------|------------------------:|---------------------:|---------------------:|');
for (const t of TOOLS) {
  const c = g => { const k = avg[t + '|' + g]; return [pct(k.p / k.n), pct(k.r / k.n), pct(k.f1 / k.n)]; };
  const a = c('all'), i = c('imported'), d = c('direct');
  out.push(`| ${t} | ${a[0]} / ${i[0]} / ${d[0]} | ${a[1]} / ${i[1]} / ${d[1]} | **${a[2]} / ${i[2]} / ${d[2]}** |`);
}
out.push('\n- 読み方: 各セルは「all / imported / direct」の順。**f1 列**を見ると、正解を変えると最良ツールが');
out.push('  入れ替わるのが分かる（all では syft、imported では cyclonedx-gomod / cdxgen）。');

const md = out.join('\n') + '\n';
fs.writeFileSync(path.join(RES, 'three_gt_6repos.md'), md);
console.log(md);
