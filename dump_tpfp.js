#!/usr/bin/env node
// dump_tpfp.js — show the ACTUAL dependency names classified as TP / FP / FN
// for one repo, one tool, one GT (all|imported). Same extraction logic as compute_all.js.
// Usage: node dump_tpfp.js <repo> <tool> [all|imported] [name|ver]
//   node dump_tpfp.js 99designs__gqlgen cyclonedx-gomod imported
const fs = require('fs'), path = require('path');
const RES = process.env.RESULTS || 'resultsAll';
const [, , repo, tool, gtKind = 'imported', level = 'name'] = process.argv;
if (!repo || !tool) { console.error('usage: node dump_tpfp.js <repo> <tool> [all|imported] [name|ver]'); process.exit(1); }
const norm = p => { try { p = decodeURIComponent(p); } catch (e) {} return p.toLowerCase(); };
function readGT(f, kind) { const m = new Map(); if (!fs.existsSync(f)) return m;
  const L = fs.readFileSync(f, 'utf8').split('\n').map(s => s.trim()).filter(Boolean);
  L.forEach((line, i) => { const a = line.split(/\s+/); if (kind === 'all' && i === 0 && a.length === 1) return;
    if (!a[0]) return; let ver = a[1] || ''; const ar = a.indexOf('=>');
    if (ar !== -1 && a.length > ar + 1 && a[a.length - 1].startsWith('v')) ver = a[a.length - 1];
    m.set(norm(a[0]), ver); }); return m; }
function mainOf(repo) { const f = path.join(RES, repo, 'gt_go_list.txt'); if (!fs.existsSync(f)) return null;
  const fr = fs.readFileSync(f, 'utf8').split('\n')[0].trim().split(/\s+/); return fr.length === 1 ? norm(fr[0]) : null; }
function readTool(f, main) { const m = new Map(); let d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return m; }
  for (const c of (d.components || [])) { const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0]; const at = r.lastIndexOf('@');
    const p = norm(at === -1 ? r : r.slice(0, at)); const ver = at === -1 ? '' : r.slice(at + 1);
    if (p !== 'stdlib' && p !== main && !m.has(p)) m.set(p, ver); } return m; }

const gtFile = gtKind === 'all' ? 'gt_go_list.txt' : 'gt_imported.txt';
const gt = readGT(path.join(RES, repo, gtFile), gtKind);
const main = mainOf(repo);
const pred = readTool(path.join(RES, repo, `${tool}_output.json`), main);
const match = (p, v) => gt.has(p) && (level === 'name' || gt.get(p) === v);

const TP = [], FP = [];
for (const [p, v] of pred) (match(p, v) ? TP : FP).push(level === 'ver' ? `${p} ${v}` : p);
const FN = [];
for (const [p, v] of gt) { if (!pred.has(p) || (level === 'ver' && pred.get(p) !== v)) FN.push(level === 'ver' ? `${p} ${v}` : p); }

const P = TP.length + FP.length ? TP.length / (TP.length + FP.length) : 0;
const R = TP.length + FN.length ? TP.length / (TP.length + FN.length) : 0;
console.log(`repo=${repo} tool=${tool} GT=${gtKind} level=${level}`);
console.log(`GT size=${gt.size}  predicted=${pred.size}  mainModule=${main}`);
console.log(`TP=${TP.length}  FP=${FP.length}  FN=${FN.length}  P=${(P*100).toFixed(1)}%  R=${(R*100).toFixed(1)}%\n`);
const dump = (label, arr) => { console.log(`--- ${label} (${arr.length}) ---`); arr.sort().forEach(x => console.log('  ' + x)); console.log(); };
dump('TP  (in tool AND in GT = correct)', TP);
dump('FP  (in tool, NOT in GT = false positive)', FP);
dump('FN  (in GT, NOT in tool = missed)', FN);
