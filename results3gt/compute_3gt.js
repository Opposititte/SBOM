#!/usr/bin/env node
// compute_3gt.js <repoName> <freshDir>
// 既存 resultsAll のツール出力 + 既存 all/imported GT を再利用し、
// 新規生成した imported_test / win / go.mod / go.sum でFP分類とimpT評価を行う。
const fs = require('fs'), path = require('path');
const name = process.argv[2], fresh = process.argv[3];
const RES = 'resultsAll/' + name;
const norm = s => { try { s = decodeURIComponent(s); } catch (e) {} return s.trim().toLowerCase(); };
const rdLines = f => fs.existsSync(f) ? fs.readFileSync(f, 'utf8').split('\n').map(x => x.trim()).filter(Boolean) : [];
const rdSetPath = f => new Set(rdLines(f).map(l => norm(l.split(/\s+/)[0]))); // first token (path)

// main module = first line of stored all if single token
let main = null;
{ const fr = rdLines(RES + '/gt_go_list.txt')[0]; if (fr) { const t = fr.split(/\s+/); if (t.length === 1) main = norm(t[0]); } }

const gtAll = rdSetPath(RES + '/gt_go_list.txt'); gtAll.delete(main);
const gtImp = rdSetPath(RES + '/gt_imported.txt'); gtImp.delete(main);
const gtImpT = rdSetPath(fresh + '/impT.txt'); gtImpT.delete(main);
const impFresh = rdSetPath(fresh + '/imp.txt'); impFresh.delete(main);
const win = rdSetPath(fresh + '/win.txt'); win.delete(main);
const direct = rdSetPath(fresh + '/mod_direct.txt');
const indirect = rdSetPath(fresh + '/mod_indirect.txt');
const gosum = rdSetPath(fresh + '/gosum.txt');

// drift: fresh imported vs stored imported
let drift = 0; for (const x of impFresh) if (!gtImp.has(x)) drift++; for (const x of gtImp) if (!impFresh.has(x)) drift++;

function toolSet(f) { const s = new Set(); let d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return null; }
  for (const c of (d.components || [])) { const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0]; const at = r.lastIndexOf('@'); const p = norm(at < 0 ? r : r.slice(0, at));
    if (p !== 'stdlib' && p !== main) s.add(p); } return s; }

const tools = { syft: 'syft_output.json', trivy: 'trivy_output.json', cdxgen: 'cdxgen_output.json', 'cyclonedx-gomod': 'cyclonedx-gomod_output.json' };
const rows = [];
function metrics(set, gt) { let tp = 0; for (const x of set) if (gt.has(x)) tp++; return [tp, set.size - tp, gt.size - tp]; }
for (const [tool, file] of Object.entries(tools)) {
  const set = toolSet(RES + '/' + file);
  if (set === null) { rows.push([name, tool, 'NA', drift, ...Array(15).fill('NA')].join(',')); continue; }
  const [atp, afp, afn] = metrics(set, gtAll);
  const [itp, ifp, ifn] = metrics(set, gtImp);
  const [ttp, tfp, tfn] = metrics(set, gtImpT);
  // FP classification vs stored imported (優先: test→他OS→direct→indirect→gosum)
  let fT = 0, fO = 0, fD = 0, fI = 0, fG = 0;
  for (const m of set) { if (gtImp.has(m)) continue; // FPのみ
    if (gtImpT.has(m)) fT++; else if (win.has(m)) fO++; else if (direct.has(m)) fD++; else if (indirect.has(m)) fI++; else fG++; }
  rows.push([name, tool, set.size, drift, atp, afp, afn, itp, ifp, ifn, ttp, tfp, tfn, fT, fO, fD, fI, fG].join(','));
}
fs.appendFileSync('results3gt/metrics3gt.csv', rows.join('\n') + '\n');
