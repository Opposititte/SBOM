#!/usr/bin/env node
// three_gt_6repos.js — 6 curated repos × 4 tools, per ground truth (all/imported/direct),
// BOTH name-level (path only) and version-level (path AND version) matching.
// Columns: repo, gt, tool, predicted, tp, fp, fn, precision, recall, f1.
const fs = require('fs'), path = require('path');
const RES = 'results';
const REPOS = ['gin', 'cobra', 'hugo', 'frp', 'gorm', 'ollama'];
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const GTS = [['all', 'gt_go_list.txt'], ['imported', 'gt_imported.txt'], ['direct', 'gt_direct.txt']];
const pct = x => (x * 100).toFixed(1);
const norm = p => { try { p = decodeURIComponent(p); } catch (e) {} return p.toLowerCase(); };

// returns Map(path -> version)
function readGT(f, kind) { const m = new Map(); if (!fs.existsSync(f)) return m;
  const L = fs.readFileSync(f, 'utf8').split('\n').map(s => s.trim()).filter(Boolean);
  L.forEach((line, i) => { const a = line.split(/\s+/); if (kind === 'all' && i === 0 && a.length === 1) return;
    if (!a[0]) return; let ver = a[1] || ''; const arrow = a.indexOf('=>');
    if (arrow !== -1 && a.length > arrow + 1 && a[a.length - 1].startsWith('v')) ver = a[a.length - 1];
    m.set(norm(a[0]), ver); }); return m; }
function readTool(f, main) { const m = new Map(); let d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return m; }
  for (const c of (d.components || [])) { const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0]; const at = r.lastIndexOf('@');
    const p = norm(at === -1 ? r : r.slice(0, at)); const ver = at === -1 ? '' : r.slice(at + 1);
    if (p !== 'stdlib' && p !== main && !m.has(p)) m.set(p, ver); } return m; }
function mainOf(repo) { const f = path.join(RES, repo, 'gt_go_list.txt'); if (!fs.existsSync(f)) return null;
  const first = fs.readFileSync(f, 'utf8').split('\n')[0].trim().split(/\s+/); return first.length === 1 ? norm(first[0]) : null; }

// metrics for one (tool, gt) at a given level ('name'|'ver')
function metrics(pred, gt, level) {
  let tp = 0; for (const [p, v] of pred) { if (gt.has(p) && (level === 'name' || gt.get(p) === v)) tp++; }
  const fp = pred.size - tp, fn = gt.size - tp;
  const P = tp + fp ? tp / (tp + fp) : 0, R = tp + fn ? tp / (tp + fn) : 0;
  return { predicted: pred.size, tp, fp, fn, P, R, F: P + R ? 2 * P * R / (P + R) : 0 };
}

function section(level, title, note) {
  const out = [`\n# ${title}\n`, note, ''];
  const avg = {}; for (const t of TOOLS) for (const [g] of GTS) avg[t + '|' + g] = { p: 0, r: 0, f1: 0, n: 0 };
  for (const [gname, gfile] of GTS) {
    out.push(`\n## 正解 = ${gname}\n`);
    out.push('| repo | gt | tool | predicted | tp | fp | fn | precision | recall | f1 |');
    out.push('|------|---:|------|----------:|---:|---:|---:|----------:|-------:|----:|');
    for (const repo of REPOS) {
      const gt = readGT(path.join(RES, repo, gfile), gname);
      for (const t of TOOLS) {
        const pred = readTool(path.join(RES, repo, `${t}_output.json`), mainOf(repo));
        const m = metrics(pred, gt, level);
        out.push(`| ${repo} | ${gt.size} | ${t} | ${m.predicted} | ${m.tp} | ${m.fp} | ${m.fn} | ${pct(m.P)} | ${pct(m.R)} | ${pct(m.F)} |`);
        const k = avg[t + '|' + gname]; k.p += m.P; k.r += m.R; k.f1 += m.F; k.n++;
      }
    }
  }
  out.push(`\n## まとめ（6リポジトリ平均, ％）— ${level === 'name' ? '名前一致' : 'バージョン一致(厳格)'}\n`);
  out.push('| ツール | precision (all/imp/dir) | recall (all/imp/dir) | **f1 (all/imp/dir)** |');
  out.push('|--------|------------------------:|---------------------:|---------------------:|');
  for (const t of TOOLS) {
    const c = g => { const k = avg[t + '|' + g]; return [pct(k.p / k.n), pct(k.r / k.n), pct(k.f1 / k.n)]; };
    const a = c('all'), i = c('imported'), d = c('direct');
    out.push(`| ${t} | ${a[0]} / ${i[0]} / ${d[0]} | ${a[1]} / ${i[1]} / ${d[1]} | **${a[2]} / ${i[2]} / ${d[2]}** |`);
  }
  return out.join('\n');
}

const doc = [];
doc.push('# 6リポジトリ × 4ツール — 正解(GT) 別の結果表（名前一致 と バージョン一致）\n');
doc.push('正解を all / imported / direct の3通りに変えて評価。各セル「all / imported / direct」の順。');
doc.push(section('name', '【A】名前一致（パスだけ一致で正解）',
  'precision/recall/f1 は％。tp = パスが正解に含まれる数。'));
doc.push(section('ver', '【B】バージョン一致（厳格：purl のパス＋バージョンが両方一致して初めて正解）',
  'tp = パス**かつ**バージョンが一致した数。注: direct のバージョンは go.mod の宣言値（最小版）で、\n' +
  'ビルドで選択される版(all/imported)と異なる場合があるため、direct のバージョン一致は低めに出やすい。'));
const md = doc.join('\n') + '\n';
fs.writeFileSync(path.join(RES, 'three_gt_6repos.md'), md);
console.log('wrote results/three_gt_6repos.md');
// print just the two summaries
const lines = md.split('\n');
let show = false;
for (const l of lines) { if (l.startsWith('## まとめ')) show = true; if (show) console.log(l); if (show && l.startsWith('| cyclonedx-gomod')) show = false; }
