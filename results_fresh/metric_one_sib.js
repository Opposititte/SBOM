#!/usr/bin/env node
// metric_one.js <repoDir>  -> 1リポジトリ分のCSV行を stdout に出す。
// name一致・version一致 × all/imported/impT の tp/fp/fn(18列) + FP原因分類(5列)。
const fs = require('fs');
const dir = process.argv[2];
const norm = s => { try { s = decodeURIComponent(s); } catch (e) {} return s.trim().toLowerCase(); };
const rd = f => fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '';
const name = dir.replace(/\/$/, '').split('/').pop();
const main = norm(rd(dir + '/main.txt'));

function gtSets(f) {
  const nm = new Set(), vr = new Set();
  for (const l of rd(f).split('\n')) { const a = l.trim().split(/\s+/); if (!a[0]) continue;
    const p = norm(a[0]); if (p === main || p === 'stdlib') continue; nm.add(p); vr.add(p + '|' + (a[1] ? norm(a[1]) : '')); }
  return { nm, vr };
}
function nameSetFile(f) { const s = new Set(); for (const l of rd(f).split('\n')) { const p = norm((l.trim().split(/\s+/)[0]) || ''); if (p && p !== main) s.add(p); } return s; }
function toolSets(f) {
  if (!fs.existsSync(f)) return null; let d; try { d = JSON.parse(fs.readFileSync(f)); } catch (e) { return null; }
  const nm = new Set(), vr = new Set();
  for (const c of (d.components || [])) { const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0]; const at = r.lastIndexOf('@');
    const p = norm(at < 0 ? r : r.slice(0, at)); const v = at < 0 ? '' : norm(r.slice(at + 1));
    if (p === 'stdlib' || p === main) continue; nm.add(p); vr.add(p + '|' + v); }
  return { nm, vr };
}
function tfn(set, gt) { let tp = 0; for (const m of set) if (gt.has(m)) tp++; return [tp, set.size - tp, gt.size - tp]; }

const GT = { all: gtSets(dir + '/gt_all.txt'), imported: gtSets(dir + '/gt_imported.txt'), impT: gtSets(dir + '/gt_impT.txt') };
// FP分類用の補助集合
const impTnm = GT.impT.nm;
const win = nameSetFile(dir + '/win.txt');
const direct = nameSetFile(dir + '/mod_direct.txt');
const indirect = nameSetFile(dir + '/mod_indirect.txt');
const gosum = nameSetFile(dir + '/gosum.txt');

const tools = { syft: 'syft_output.json', trivy: 'trivy_output.json', cdxgen: 'cdxgen_output.json', 'cyclonedx-gomod': 'cyclonedx-gomod_output.json' };
const out = [];
for (const [t, file] of Object.entries(tools)) {
  const S = toolSets(dir + '/' + file);
  if (!S) { out.push([name, t, 'NA'].join(',')); continue; }
  const cells = [];
  for (const g of ['all', 'imported', 'impT']) cells.push(...tfn(S.nm, GT[g].nm)); // name 9
  for (const g of ['all', 'imported', 'impT']) cells.push(...tfn(S.vr, GT[g].vr)); // ver 9
  // FP原因分類（imported基準・name）: test→他OS→direct未使用→indirect未使用→gosum由来
  let fT = 0, fO = 0, fD = 0, fI = 0, fGsum = 0, fGsib = 0;
  for (const m of S.nm) { if (GT.imported.nm.has(m)) continue;
    if (impTnm.has(m)) fT++; else if (win.has(m)) fO++; else if (direct.has(m)) fD++; else if (indirect.has(m)) fI++; else if (gosum.has(m)) fGsum++; else fGsib++; }
  cells.push(fT, fO, fD, fI, fGsum, fGsib);
  out.push([name, t, ...cells].join(','));
}
process.stdout.write(out.join('\n') + '\n');
