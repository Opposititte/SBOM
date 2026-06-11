#!/usr/bin/env node
// analyze_fp2.js — classify each false positive (tool \ GT-imported) to quantify causes.
//  - in_all  : the FP module IS in `go list -m all` (the module graph) → graph/build-constraint dep
//  - not_all : NOT in the graph → genuine over-report (sibling module / artifact)
//  - platform / test : curated heuristic lists (transparent; substring match)
const fs = require('fs'), path = require('path');
const RES = process.env.RESULTS || 'resultsAll';
const TOOLS = ['cdxgen', 'cyclonedx-gomod'];
const norm = p => { try { p = decodeURIComponent(p); } catch (e) {} return p.toLowerCase(); };
function readSet(f, kind) { const s = new Set(); if (!fs.existsSync(f)) return s;
  const L = fs.readFileSync(f, 'utf8').split('\n').map(x => x.trim()).filter(Boolean);
  L.forEach((line, i) => { const a = line.split(/\s+/); if (kind === 'all' && i === 0 && a.length === 1) return; if (a[0]) s.add(norm(a[0])); }); return s; }
function mainOf(d) { const f = path.join(d, 'gt_go_list.txt'); if (!fs.existsSync(f)) return null;
  const fr = fs.readFileSync(f, 'utf8').split('\n')[0].trim().split(/\s+/); return fr.length === 1 ? norm(fr[0]) : null; }
function readTool(f, main) { const s = new Set(); let d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return s; }
  for (const c of (d.components || [])) { const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0]; const at = r.lastIndexOf('@'); const p = norm(at === -1 ? r : r.slice(0, at));
    if (p !== 'stdlib' && p !== main) s.add(p); } return s; }

// curated heuristic substrings (transparent)
const PLATFORM = ['inconshreveable/mousetrap', 'microsoft/go-winio', '/go-winio', 'yusufpapurcu/wmi', 'stackexchange/wmi',
  'power-devops/perfstat', 'lufia/plan9stats', 'go-ole/go-ole', 'golang.org/x/sys', 'tklauser/go-sysconf', 'tklauser/numcpus',
  'shirou/gopsutil', 'godbus/dbus', 'coreos/go-systemd', 'mattn/go-isatty', 'mattn/go-colorable', 'cilium/ebpf'];
const TEST = ['stretchr/testify', 'davecgh/go-spew', 'pmezard/go-difflib', 'gopkg.in/check.v1', 'stretchr/objx',
  'onsi/ginkgo', 'onsi/gomega', 'smartystreets/goconvey', 'smarty/assertions', 'smartystreets/assertions',
  'bradleyjkemp/cupaloy', 'google/go-cmp', 'frankban/quicktest', 'maxatome/go-testdeep', 'stretchr/testify/assert'];
const hit = (m, list) => list.some(x => m.includes(x));

const repos = fs.readdirSync(RES, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name)
  .filter(n => { const a = path.join(RES, n, 'gt_go_list.txt'), i = path.join(RES, n, 'gt_imported.txt');
    return fs.existsSync(a) && fs.statSync(a).size > 0 && fs.existsSync(i) && fs.statSync(i).size > 0; });

const stat = {}; for (const t of TOOLS) stat[t] = { fp: 0, inAll: 0, notAll: 0, platform: 0, test: 0, platOfInAll: 0 };
for (const repo of repos) {
  const d = path.join(RES, repo); const imp = readSet(path.join(d, 'gt_imported.txt')); const all = readSet(path.join(d, 'gt_go_list.txt'), 'all'); const main = mainOf(d);
  for (const t of TOOLS) {
    const tool = readTool(path.join(d, `${t}_output.json`), main);
    for (const m of tool) { if (imp.has(m)) continue; // not FP
      const s = stat[t]; s.fp++;
      const inAll = all.has(m); if (inAll) s.inAll++; else s.notAll++;
      const isPlat = hit(m, PLATFORM), isTest = hit(m, TEST);
      if (isPlat) s.platform++; if (isTest) s.test++; if (inAll && isPlat) s.platOfInAll++;
    }
  }
}
const pc = (a, b) => b ? (100 * a / b).toFixed(1) + '%' : '-';
console.log(`対象 ${repos.length} repos。各FP(=ツール出力で GT-imported に無いもの)を分類。\n`);
for (const t of TOOLS) { const s = stat[t];
  console.log(`### ${t}`);
  console.log(`  総FP = ${s.fp}`);
  console.log(`  グラフ内(go list -m all にある) = ${s.inAll} (${pc(s.inAll, s.fp)})  ← ビルド制約/グラフ由来`);
  console.log(`  グラフ外(graphに無い)           = ${s.notAll} (${pc(s.notAll, s.fp)})  ← 真の過剰計上(兄弟module等)`);
  console.log(`  うち 他OS/プラットフォーム依存(curated) = ${s.platform} (${pc(s.platform, s.fp)})`);
  console.log(`  うち テスト依存(curated)               = ${s.test} (${pc(s.test, s.fp)})`);
  console.log('');
}
