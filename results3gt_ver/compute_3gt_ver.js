#!/usr/bin/env node
// compute_3gt_ver.js <repoName> <freshDir>
// name一致 と version一致 の両方を all/imported/imported+test で算出。
// all/imported は resultsAll のバージョン入り保存GTを再利用。imported+test は fresh(バージョン入り)。
const fs = require('fs'), path = require('path');
const name = process.argv[2], fresh = process.argv[3];
const RES = 'resultsAll/' + name;
const norm = s => { try { s = decodeURIComponent(s); } catch (e) {} return s.trim().toLowerCase(); };
function mainOf() { const f = RES + '/gt_go_list.txt'; if (!fs.existsSync(f)) return null;
  const fr = fs.readFileSync(f, 'utf8').split('\n')[0].trim().split(/\s+/); return fr.length === 1 ? norm(fr[0]) : null; }
const main = mainOf();
// GTファイル("path version" 形式) -> {nm,vr}
function gtSets(f) { const nm = new Set(), vr = new Set(); if (!fs.existsSync(f)) return { nm, vr };
  for (const l of fs.readFileSync(f, 'utf8').split('\n')) { const a = l.trim().split(/\s+/); if (!a[0]) continue;
    const p = norm(a[0]); if (p === main) continue; nm.add(p); vr.add(p + '|' + (a[1] ? norm(a[1]) : '')); } return { nm, vr }; }
function toolSets(f) { const nm = new Set(), vr = new Set(); let d; try { d = JSON.parse(fs.readFileSync(f)); } catch (e) { return null; }
  for (const c of (d.components || [])) { const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0]; const at = r.lastIndexOf('@');
    const p = norm(at < 0 ? r : r.slice(0, at)); const v = at < 0 ? '' : norm(r.slice(at + 1));
    if (p === 'stdlib' || p === main) continue; nm.add(p); vr.add(p + '|' + v); } return { nm, vr }; }
function tfn(tool, gt) { let tp = 0; for (const m of tool) if (gt.has(m)) tp++; return [tp, tool.size - tp, gt.size - tp]; }

const A = gtSets(RES + '/gt_go_list.txt');     // all (ver入り保存)
const I = gtSets(RES + '/gt_imported.txt');    // imported (ver入り保存)
const T = gtSets(fresh + '/impT_ver.txt');     // imported+test (fresh, ver入り)
const tools = { syft: 'syft_output.json', trivy: 'trivy_output.json', cdxgen: 'cdxgen_output.json', 'cyclonedx-gomod': 'cyclonedx-gomod_output.json' };
const rows = [];
for (const [tool, file] of Object.entries(tools)) {
  const S = toolSets(RES + '/' + file);
  if (!S) { rows.push([name, tool, 'NA'].join(',')); continue; }
  const cells = [];
  for (const [gt, lvlNm, lvlVr] of [[A, A.nm, A.vr], [I, I.nm, I.vr], [T, T.nm, T.vr]]) {
    cells.push(...tfn(S.nm, lvlNm)); // name tp,fp,fn
    cells.push(...tfn(S.vr, lvlVr)); // ver  tp,fp,fn
  }
  rows.push([name, tool, ...cells].join(','));
}
fs.appendFileSync('results3gt_ver/metrics3gt_ver.csv', rows.join('\n') + '\n');
