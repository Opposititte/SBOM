#!/usr/bin/env node
// analyze_fp.js — which modules do tools report that are NOT in GT-imported? (false positives)
const fs = require('fs'), path = require('path');
const RES = process.env.RESULTS || 'resultsAll';
const TOOLS = ['cdxgen', 'cyclonedx-gomod'];
const norm = p => { try { p = decodeURIComponent(p); } catch (e) {} return p.toLowerCase(); };
function readSet(f) { const s = new Set(); if (!fs.existsSync(f)) return s;
  for (const line of fs.readFileSync(f, 'utf8').split('\n')) { const a = line.trim().split(/\s+/); if (a[0]) s.add(norm(a[0])); } return s; }
function mainOf(d) { const f = path.join(d, 'gt_go_list.txt'); if (!fs.existsSync(f)) return null;
  const fr = fs.readFileSync(f, 'utf8').split('\n')[0].trim().split(/\s+/); return fr.length === 1 ? norm(fr[0]) : null; }
function readTool(f, main) { const s = new Set(); let d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return s; }
  for (const c of (d.components || [])) { const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0]; const at = r.lastIndexOf('@'); const p = norm(at === -1 ? r : r.slice(0, at));
    if (p !== 'stdlib' && p !== main) s.add(p); } return s; }

const repos = fs.readdirSync(RES, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name)
  .filter(n => { const a = path.join(RES, n, 'gt_go_list.txt'), i = path.join(RES, n, 'gt_imported.txt');
    return fs.existsSync(a) && fs.statSync(a).size > 0 && fs.existsSync(i) && fs.statSync(i).size > 0; });

const fpCount = { cdxgen: new Map(), 'cyclonedx-gomod': new Map() };
const totalFP = { cdxgen: 0, 'cyclonedx-gomod': 0 };
let exRepo = null, exFP = null;
for (const repo of repos) {
  const d = path.join(RES, repo); const imp = readSet(path.join(d, 'gt_imported.txt')); const main = mainOf(d);
  for (const t of TOOLS) {
    const tool = readTool(path.join(d, `${t}_output.json`), main);
    const fp = [...tool].filter(x => !imp.has(x));
    totalFP[t] += fp.length;
    for (const m of fp) fpCount[t].set(m, (fpCount[t].get(m) || 0) + 1);
    if (t === 'cdxgen' && !exRepo && fp.length >= 2 && fp.length <= 5 && imp.size >= 3) { exRepo = repo; exFP = fp; }
  }
}
function top(map, n) { return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n); }
console.log(`対象 ${repos.length} repos（GT-imported に無いのに出した依存＝FP）\n`);
console.log(`総FP数: cdxgen=${totalFP.cdxgen}  /  cyclonedx-gomod=${totalFP['cyclonedx-gomod']}`);
console.log(`ユニークなFPモジュール種類: cdxgen=${fpCount.cdxgen.size}  /  cyclonedx-gomod=${fpCount['cyclonedx-gomod'].size}\n`);
console.log('=== cdxgen が「imported に無いのに出した」頻出モジュール TOP20（出現repo数）===');
for (const [m, c] of top(fpCount.cdxgen, 20)) console.log(`  ${String(c).padStart(4)} repos : ${m}`);
console.log('\n=== cyclonedx-gomod の同（TOP10）===');
for (const [m, c] of top(fpCount['cyclonedx-gomod'], 10)) console.log(`  ${String(c).padStart(4)} repos : ${m}`);
if (exRepo) { console.log(`\n=== 具体例: ${exRepo} で cdxgen が出したが GT-imported に無いモジュール ===`); exFP.forEach(m => console.log('  - ' + m)); }
