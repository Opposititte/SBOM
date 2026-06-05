#!/usr/bin/env node
// root_cause.js — WHY does each tool miss `all` dependencies? Decompose the misses.
// For each tool, over repos that have both `all` (gt_go_list) and non-empty `imported`:
//   missed(all) = all \ tool, partitioned into:
//     - "not-compiled" : missed deps that are in all but NOT in imported
//                        (test-only / unused-transitive — arguably should NOT be reported)
//     - "genuine-miss" : missed deps that ARE in imported (actually used but tool missed them)
//   false-pos(all) = tool \ all  (reported but not even in the full module graph;
//                                 multi-module sibling deps, mis-attribution)
const fs = require('fs'), path = require('path');
const RESULTS = process.env.RESULTS || 'results300';
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const norm = p => { try { p = decodeURIComponent(p); } catch (e) {} return p.toLowerCase(); };
function readGT(f, kind) { if (!fs.existsSync(f)) return null;
  const L = fs.readFileSync(f, 'utf8').split('\n').map(s => s.trim()).filter(Boolean); const s = new Set();
  L.forEach((line, i) => { const a = line.split(/\s+/); if (kind === 'all' && i === 0 && a.length === 1) return; if (a[0]) s.add(norm(a[0])); }); return s; }
function readTool(f) { const s = new Set(); let d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return s; }
  for (const c of (d.components || [])) { const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0]; const at = r.lastIndexOf('@'); const p = norm(at === -1 ? r : r.slice(0, at)); if (p !== 'stdlib') s.add(p); } return s; }

const repos = fs.readdirSync(RESULTS, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name)
  .filter(n => fs.existsSync(path.join(RESULTS, n, 'gt_go_list.txt'))).sort();

const agg = {}; for (const t of TOOLS) agg[t] = { all: 0, notCompiled: 0, genuine: 0, fp: 0, nrepos: 0 };
let usedRepos = 0;
for (const repo of repos) {
  const all = readGT(path.join(RESULTS, repo, 'gt_go_list.txt'), 'all');
  const imp = readGT(path.join(RESULTS, repo, 'gt_imported.txt'), 'imported');
  if (!all || all.size === 0 || !imp || imp.size === 0) continue;  // need both
  usedRepos++;
  for (const t of TOOLS) {
    const tool = readTool(path.join(RESULTS, repo, `${t}_output.json`));
    agg[t].nrepos++; agg[t].all += all.size;
    for (const d of all) if (!tool.has(d)) (imp.has(d) ? agg[t].genuine++ : agg[t].notCompiled++);
    for (const d of tool) if (!all.has(d)) agg[t].fp++;
  }
}

const pct = (a, b) => b ? (100 * a / b).toFixed(1) : '0.0';
console.log(`\nRoot-cause of missed \`all\` dependencies — aggregate over ${usedRepos} repos`);
console.log('(missed = all \\ tool;  FP = tool \\ all)\n');
console.log('tool             | all-deps | missed | not-compiled(test/unused) | genuine-miss(used) | FP(not in graph)');
for (const t of TOOLS) {
  const a = agg[t]; const missed = a.notCompiled + a.genuine;
  console.log(`${t.padEnd(16)} | ${String(a.all).padStart(8)} | ${String(missed).padStart(6)} | ` +
    `${String(a.notCompiled).padStart(7)} (${pct(a.notCompiled, missed)}%)        | ` +
    `${String(a.genuine).padStart(6)} (${pct(a.genuine, missed)}%)   | ${String(a.fp).padStart(6)}`);
}
console.log('\nInterpretation: a high "not-compiled %" means the tool\'s misses are mostly test-only/');
console.log('unused-transitive modules (not real defects); high "genuine-miss %" means it fails to');
console.log('report modules that are actually compiled into the build.');
fs.writeFileSync(path.join(RESULTS, 'root_cause.json'), JSON.stringify({ usedRepos, agg }, null, 2));
