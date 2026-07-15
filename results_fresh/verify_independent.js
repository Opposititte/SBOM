#!/usr/bin/env node
// verify_independent.js <repoDataDir> <csvPath>
// metric_one_sib.js を一切使わず、独立に TP/FP/FN を数え直し、CSV記録値と一致するか検証する。
// GTファイル(gt_*.txt)・ツール出力(*_output.json)は保存済み生データを読むだけ。
const fs = require("fs");
const dir = process.argv[2];
const csv = process.argv[3] || "results_fresh/metrics_fresh.csv";
const repo = dir.replace(/\/$/, "").split("/").pop();

// --- 生データから素朴に集合を作る（意図的に metric_one_sib.js と別実装）---
const lc = s => { try { s = decodeURIComponent(s); } catch (e) {} return s.trim().toLowerCase(); };
const main = lc((fs.readFileSync(dir + "/main.txt", "utf8") || "").split("\n")[0] || "");

function gtNames(file) {
  const out = new Set();
  const txt = fs.existsSync(dir + "/" + file) ? fs.readFileSync(dir + "/" + file, "utf8") : "";
  for (const line of txt.split("\n")) {
    const first = line.trim().split(/\s+/)[0];
    if (!first) continue;
    const p = lc(first);
    if (p === main || p === "stdlib") continue;
    out.add(p);
  }
  return out;
}
function toolNames(file) {
  const path = dir + "/" + file;
  if (!fs.existsSync(path)) return null;
  let j; try { j = JSON.parse(fs.readFileSync(path, "utf8")); } catch (e) { return null; }
  const out = new Set();
  for (const c of (j.components || [])) {
    const purl = c.purl || "";
    if (!purl.startsWith("pkg:golang/")) continue;
    let body = purl.slice("pkg:golang/".length).split("?")[0].split("#")[0];
    const at = body.lastIndexOf("@");
    const name = lc(at < 0 ? body : body.slice(0, at));
    if (name === "stdlib" || name === main) continue;
    out.add(name);
  }
  return out;
}

const GT = { imported: gtNames("gt_imported.txt"), impT: gtNames("gt_impT.txt"), all: gtNames("gt_all.txt") };
const TOOLS = { syft: "syft_output.json", trivy: "trivy_output.json", cdxgen: "cdxgen_output.json", "cyclonedx-gomod": "cyclonedx-gomod_output.json" };

function tpfpfn(tool, gt) {
  let tp = 0, fp = 0;
  for (const m of tool) (gt.has(m) ? tp++ : fp++);
  let fn = 0;
  for (const m of gt) if (!tool.has(m)) fn++;
  return { tp, fp, fn };
}

// --- CSV から該当行を読む（列: 2 all_tp,3 all_fp,4 all_fn, 5 imp_tp,6 imp_fp,7 imp_fn, 8 impT_tp,9 impT_fp,10 impT_fn）---
const rows = {};
for (const line of fs.readFileSync(csv, "utf8").split("\n")) {
  const p = line.split(",");
  if (p[0] === repo) rows[p[1]] = p;
}

console.log(`\n================  検証対象: ${repo}  (main=${main})  ================`);
console.log(`GTモジュール数(独立カウント): imported=${GT.imported.size}  imported+test=${GT.impT.size}  all=${GT.all.size}`);
console.log("");
console.log("tool".padEnd(16) + "| GT | 独立再計算 tp/fp/fn | CSV記録 tp/fp/fn | 一致?");
let allMatch = true;
for (const [t, file] of Object.entries(TOOLS)) {
  const T = toolNames(file);
  const row = rows[t];
  if (!T) { console.log(t.padEnd(16) + "| ツール出力なし(NA)"); continue; }
  for (const [gname, gset, ci] of [["imported", GT.imported, 5], ["all", GT.all, 2], ["impT", GT.impT, 8]]) {
    const r = tpfpfn(T, gset);
    const csvTp = row ? row[ci] : "?", csvFp = row ? row[ci + 1] : "?", csvFn = row ? row[ci + 2] : "?";
    const ok = row && (+csvTp === r.tp && +csvFp === r.fp && +csvFn === r.fn);
    if (!ok && row) allMatch = false;
    console.log(`${t.padEnd(16)}| ${gname.padEnd(4)}| ${String(r.tp).padStart(4)}/${String(r.fp).padStart(4)}/${String(r.fn).padStart(4)}      | ${String(csvTp).padStart(4)}/${String(csvFp).padStart(4)}/${String(csvFn).padStart(4)}      | ${ok ? "✓" : (row ? "✗不一致" : "行なし")}`);
  }
}
console.log("");
console.log(allMatch ? ">>> 全項目一致：CSV記録は独立再計算と完全一致（判定コードは忠実）" : ">>> 不一致あり（要調査）");

// --- 人が目視できるサンプル: cdxgen の imported-FP を数件、名前で表示 ---
const cdx = toolNames("cdxgen_output.json");
if (cdx) {
  const fps = [...cdx].filter(m => !GT.imported.has(m)).slice(0, 8);
  console.log(`\n[目視用] cdxgen が出したが GT-imported に無いモジュール(FP)の例:`);
  fps.forEach(m => console.log("   " + m));
}
