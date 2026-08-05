#!/usr/bin/env node
// rerun2.js — census2 の計測を**全件やり直す**。成果物は census2/rerun2/out/ にのみ書く。
//   既存の census2/ の結果（metrics.csv, manifest.csv, rerun/out/ 等）には一切書き込まない。
//
//   使い方: node census2/rerun2/rerun2.js [件数]     (省略時=全件)
//           node census2/rerun2/rerun2.js 10         (まず10件で試す)
//
// 【対象】manifest.csv の status=OK の 1,528 件。7月に記録した commit SHA に固定して clone。
// 【GT】3定義: go list -m -e all / go list -deps -e / go list -deps -test -e
// 【照合】モジュールパス単位（scorer.js の norm() と同じ小文字化を必ず適用）。
//   Trivy はモジュールパスを小文字で出力するため、小文字化を外すと大量に不一致になる。
//   バージョンは TSV に保存するだけで照合には使わない。
// 【検証】採点は再実装せず 7月の scorer.js を呼ぶ（verify_lib.js）。
// 【再開】out/<repo>/meta.json があればスキップ。meta.json は **成功時と恒久SKIP時のみ**書く。
//   clone/fetch の一時失敗で meta.json を書くと再開時に恒久SKIPになり数十件が欠落する
//   （前回踏んだ不具合）。retryable な失敗は out/<repo>/ ごと消して次回再試行させる。
'use strict';
const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const zlib = require('zlib');
const V = require('./verify_lib.js');

const LIMIT = process.argv[2] ? +process.argv[2] : Infinity;
const BASE = path.resolve(__dirname, '..');            // census2/
const OUT = path.join(__dirname, 'out');
const GO_BIN = process.env.GO_BIN || '/opt/go1265/go/bin';        // go1.26.5
const TOOL_BIN = process.env.TOOL_BIN || '/workspace/gopath/bin'; // syft/trivy/cyclonedx-gomod
const TO = 300;                                        // 7月と同じ per-command timeout

fs.mkdirSync(OUT, { recursive: true });

const july = V.loadJuly();
const julyMan = july.man;

// ---------- 出力ファイル（1件ごとに逐次追記） ----------
const SUM = `${OUT}/summary.csv`, VER = `${OUT}/verify.csv`;
const SKIPS = `${OUT}/skips.csv`, LOG = `${OUT}/progress.log`, STOP = `${OUT}/STOP`;
const UNEXP = `${OUT}/unexplained_differ.csv`;   // 温め直しても7月を再現しなかった差分
// 調査済みの未説明 differ。ここに載っている repo では止まらない（新規のものでは止まる）。
// 書式: <repo>  <ISO8601>  <調査結果>   3列必須。# 行はコメント。
function acknowledgedDiffer() {
  const f = path.join(__dirname, 'acknowledged_differ.txt');
  const m = new Set();
  let txt; try { txt = fs.readFileSync(f, 'utf8'); } catch (e) { return m; }
  for (const line of txt.split('\n')) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const a = line.split(/\t|\s{2,}/).map(x => x.trim()).filter(Boolean);
    if (a.length < 3) throw new Error(`acknowledged_differ.txt: "${a[0]}" に日時と調査結果がありません（3列必須）`);
    m.add(a[0]);
  }
  return m;
}
if (!fs.existsSync(SUM)) fs.writeFileSync(SUM, 'repo,sha,status,n_gt_imported,n_gt_impT,n_gt_all,' +
  'n_syft,n_trivy,n_cdxgen,n_cyclonedx-gomod,golist_real_errors,golist_progress_lines,error_kinds\n');
if (!fs.existsSync(VER)) fs.writeFileSync(VER, V.VERIFY_HEADER);
if (!fs.existsSync(SKIPS)) fs.writeFileSync(SKIPS, 'repo,sha,kind,reason,at\n');
const logln = s => { fs.appendFileSync(LOG, s + '\n'); process.stderr.write(s + '\n'); };

// ---------- scorer.js と同一の正規化 ----------
const norm = s => { try { s = decodeURIComponent(s); } catch (e) { } return s.trim().toLowerCase(); };
function parseGt(txt, main) {
  const rows = [];
  for (const l of txt.split('\n')) {
    const a = l.trim().split(/\s+/); if (!a[0]) continue;
    const p = norm(a[0]); if (p === main || p === 'stdlib') continue;
    rows.push({ p: a[0], v: a[1] || '' });
  }
  return rows;
}
// CycloneDX JSON -> [{p, v}]（purl の最後の @ で分割。scorer.js と同一）
function parseTool(file, main) {
  if (!fs.existsSync(file)) return null;
  let d; try { d = JSON.parse(fs.readFileSync(file)); } catch (e) { return null; }
  const rows = [];
  for (const c of (d.components || [])) {
    const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0];
    const at = r.lastIndexOf('@');
    const praw = at < 0 ? r : r.slice(0, at);
    const vraw = at < 0 ? '' : r.slice(at + 1);
    const p = norm(praw); if (p === 'stdlib' || p === main) continue;
    rows.push({ p: praw, v: vraw });
  }
  return rows;
}
const nameSet = rows => new Set(rows.map(r => norm(r.p)));
// 重複排除して TSV 化（モジュールパス<TAB>バージョンの2列。原文の大文字小文字を保持）
function toTsv(rows) {
  const seen = new Set(), out = [];
  for (const r of rows) { const k = norm(r.p) + '\t' + norm(r.v); if (seen.has(k)) continue; seen.add(k); out.push(`${r.p}\t${r.v}`); }
  return out.sort().join('\n') + (out.length ? '\n' : '');
}

// ---------- stderr 分類（2>/dev/null しない。切り詰めず全件保存） ----------
const PROGRESS = /^go: (downloading|finding|extracting|upgraded|added|to add module requirements)/;
function splitErr(err) {
  const lines = (err || '').split('\n').map(s => s.trimEnd()).filter(s => s.trim());
  const prog = lines.filter(l => PROGRESS.test(l));
  const real = lines.filter(l => !PROGRESS.test(l));
  const kinds = {};
  for (const l of real) {
    const k = /no required module provides package/.test(l) ? 'no_required_module'
      : /missing go\.sum entry/.test(l) ? 'missing_gosum'
        : /build constraints exclude all Go files/.test(l) ? 'build_constraints_exclude_all'
          : /cannot find module|unknown revision|does not contain package/.test(l) ? 'cannot_find_module'
            : /requires go >=|go\.mod requires/.test(l) ? 'go_version' : 'other';
    kinds[k] = (kinds[k] || 0) + 1;
  }
  return { nProgress: prog.length, nReal: real.length, kinds };
}

function run(cmd, opts = {}) {
  const r = cp.spawnSync('bash', ['-c', cmd], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...opts });
  return { out: r.stdout || '', err: r.stderr || '', code: r.status === null ? -1 : r.status };
}
// 巨大モノレポでは go list の出力が非常に大きく spawnSync のバッファでメモリを食い潰す。
// 7月の proc.sh と同じくシェルのリダイレクトでファイルに書き、後から読む。
const MAXREAD = 256 * 1024 * 1024;
function runToFile(cmd, outF, errF, opts = {}) {
  const r = cp.spawnSync('bash', ['-c', `${cmd} > ${outF} 2> ${errF}`], { encoding: 'utf8', maxBuffer: 1024 * 1024, ...opts });
  const rd = f => { try { return fs.statSync(f).size > MAXREAD ? '' : fs.readFileSync(f, 'utf8'); } catch (e) { return ''; } };
  return { out: rd(outF), err: rd(errF), code: r.status === null ? -1 : r.status };
}
const freeKB = () => { try { return +cp.execSync("df --output=avail / | tail -1", { encoding: 'utf8' }).trim(); } catch (e) { return 1e9; } };

// これまでに skips.csv に記録された、この repo の retryable 失敗回数を数える。
// 改名・削除された repo（例: buger/gor → buger/goreplay）は毎ラウンド失敗し続けるため、
// 上限を超えたら permanent に降格させないと数時間ぶん回し続け、完走判定もできない。
const MAX_RETRIES = 3;
function retryableCount(repo) {
  try {
    let n = 0;
    for (const l of fs.readFileSync(SKIPS, 'utf8').split('\n')) {
      const c = l.split(',');
      if (c[0] === repo && c[2] === 'retryable') n++;
    }
    return n;
  } catch (e) { return 0; }
}

// SKIP 記録。permanent のみ meta.json を書き（=次回以降スキップ）、
// retryable は out/<repo>/ を消して次回再試行させる。
// ただし retryable が MAX_RETRIES 回に達したら permanent に降格する。
function recordSkip(od, repo, sha, kind, reason) {
  if (kind === 'retryable') {
    const prior = retryableCount(repo);
    if (prior + 1 >= MAX_RETRIES) {
      kind = 'permanent';
      reason = `retry_exhausted_after_${prior + 1}_attempts(${reason})`;
    }
  }
  return recordSkip_(od, repo, sha, kind, reason);
}
function recordSkip_(od, repo, sha, kind, reason) {
  const at = new Date().toISOString();
  if (kind === 'permanent') {
    fs.mkdirSync(od, { recursive: true });
    fs.writeFileSync(`${od}/meta.json`, JSON.stringify({ repo, sha, status: 'SKIP', skip_kind: kind, reason, at }, null, 2));
    try { fs.unlinkSync(`${od}/.claim`); } catch (e) { }
  } else {
    fs.rmSync(od, { recursive: true, force: true });
  }
  fs.appendFileSync(SKIPS, `${repo},${sha},${kind},${reason},${at}\n`);
  fs.appendFileSync(SUM, `${repo},${sha},SKIP_${kind}_${reason},,,,,,,,,,\n`);
}

// ---------- 対象 ----------
// 順序は seed 固定のランダム。コンテナが不定期に回収され全件完走が保証できないため、
// どの時点で止まっても偏りのない無作為標本になるようにシャッフルする（再現可能）。
const targets = (() => {
  const a = Object.keys(julyMan).sort();
  let x = 20260729;
  const rnd = () => { x |= 0; x = (x + 0x6D2B79F5) | 0; let t = Math.imul(x ^ (x >>> 15), 1 | x); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; }
  return a;
})();
// ONLY=repo1,repo2 で対象を絞れる（デバッグ・個別再試行用）
if (process.env.ONLY) {
  const want = new Set(process.env.ONLY.split(',').map(s => s.trim()).filter(Boolean));
  targets.length = 0; for (const r of Object.keys(julyMan)) if (want.has(r)) targets.push(r);
}
const noSha = targets.filter(r => !/^[0-9a-f]{40}$/.test(julyMan[r].sha));
logln(`# rerun2 開始 ${new Date().toISOString()} 対象=${targets.length} (SHA未記録=${noSha.length}→SKIP) 上限=${LIMIT}`);
logln(`# 7月に main を除外できていなかった repo（予測集合。この集合の repo のみ july_main_bug を許す）= ${july.emptyMain.size} 件: ${[...july.emptyMain].sort().join(' ')}`);
logln(`# 7月側の記録が使えず比較できない repo（july_unavailable。ゲートは通すが verify.csv に残す）= ${july.unavailable.size} 件: ${[...july.unavailable].sort().join(' ')}`);

try { cp.execSync('rm -rf /tmp/rr2_* 2>/dev/null'); } catch (e) { }
let done = 0, skipped = 0, processed = 0;
const tally = { match: 0, july_main_bug: 0, july_main_bug_late: 0, july_unavailable: 0, july_tool_na: 0, cache_sensitive: 0, differ: 0 };

for (const repo of targets) {
  if (processed >= LIMIT) break;
  // 他ワーカーが differ を検出した／stop2.sh が叩かれた場合、全ワーカーがここで止まる。
  if (fs.existsSync(STOP)) { logln(`# STOP を検出したので停止する: ${fs.readFileSync(STOP, 'utf8').trim()}`); break; }
  const od = `${OUT}/${repo}`;
  if (fs.existsSync(`${od}/meta.json`)) { done++; continue; }   // 再開: 処理済みはスキップ
  // 複数ワーカーで並列に回せるよう .claim で排他。30分より古い claim は奪い取る。
  const claim = `${od}/.claim`;
  try {
    if (fs.existsSync(claim)) {
      const age = Date.now() - fs.statSync(claim).mtimeMs;
      if (age < 30 * 60 * 1000) continue;
    }
    fs.mkdirSync(od, { recursive: true });
    fs.writeFileSync(claim, `${process.pid} ${new Date().toISOString()}\n`);
  } catch (e) { continue; }
  processed++;
  const { url, sha } = julyMan[repo];
  const work = `/tmp/rr2_${repo}`, src = `${work}/src`;
  fs.rmSync(work, { recursive: true, force: true });
  fs.mkdirSync(src, { recursive: true });
  fs.mkdirSync(`${od}/raw`, { recursive: true });
  fs.mkdirSync(`${od}/stderr`, { recursive: true });

  // 7月と同じ環境
  const env = {
    ...process.env, PATH: `${GO_BIN}:${TOOL_BIN}:${process.env.PATH}`,
    GOTOOLCHAIN: 'local', GOFLAGS: '-mod=mod', GOOS: 'linux', GOARCH: 'amd64', CGO_ENABLED: '1',
    GOMODCACHE: `${work}/mod`, GOCACHE: `${work}/build`,
  };
  const t0 = Date.now();
  process.stderr.write(`[${processed}] ${repo} ... `);
  if (freeKB() < 3 * 1024 * 1024) {   // 空き3GB未満 → 一時的な事象なので retryable
    recordSkip(od, repo, sha, 'retryable', 'disk_low');
    logln('SKIP(retryable/disk_low)'); fs.rmSync(work, { recursive: true, force: true }); skipped++; continue;
  }

  // 1) clone（GT妥当性検証(validate_gt.js)と同じ SHA固定ロジック）
  // SHA が取れない repo は SKIP する。HEAD は7月時点と別物なので、7月の数値と
  // 照合しても意味がなく、verify.csv に説明のつかない differ を混入させるだけ。
  const hasSha = /^[0-9a-f]{40}$/.test(sha);
  if (!hasSha) {
    recordSkip(od, repo, sha, 'permanent', 'no_sha_recorded');
    logln('SKIP(permanent/no_sha_recorded)'); fs.rmSync(work, { recursive: true, force: true }); skipped++; continue;
  }
  let pinned = false, headSha = sha;
  run(`cd ${src} && git init -q && git remote add origin ${url} && timeout 300 git fetch -q --depth 1 origin ${sha} && git checkout -q FETCH_HEAD`, { env });
  pinned = run(`cd ${src} && git rev-parse HEAD`, { env }).out.trim() === sha;
  if (!pinned) {   // SHA直接fetch不可なら full clone → checkout
    fs.rmSync(src, { recursive: true, force: true }); fs.mkdirSync(src, { recursive: true });
    run(`timeout 600 git clone -q ${url} ${src} && cd ${src} && git checkout -q ${sha}`, { env });
    pinned = run(`cd ${src} && git rev-parse HEAD`, { env }).out.trim() === sha;
  }
  if (!pinned) {
    // clone/fetch の失敗はレート制限・ネットワーク等の一時的事象が多い → retryable
    recordSkip(od, repo, sha, 'retryable', 'sha_fetch_failed');
    logln('SKIP(retryable/sha_fetch_failed)');
    fs.rmSync(work, { recursive: true, force: true }); skipped++; continue;
  }
  if (!fs.existsSync(`${src}/go.mod`)) {
    // 固定SHAに go.mod が無いのは何度やっても同じ → permanent
    recordSkip(od, repo, sha, 'permanent', 'no_go_mod');
    logln('SKIP(permanent/no_go_mod)'); fs.rmSync(work, { recursive: true, force: true }); skipped++; continue;
  }
  if (fs.existsSync(`${src}/go.work`)) env.GOFLAGS = '';     // 7月と同じ workspace 対応
  const O0 = { env, cwd: src };
  const codes = {};

  // 7月の tool_versions.txt に「GOTOOLCHAIN=local（新しいGoを要求するrepoのみ auto で
  // toolchain取得）」とある。base の go1.26.5 より新しい Go を要求する repo は
  // GOTOOLCHAIN=local だと go list が丸ごと失敗して GT が空になり、
  // 4ツールの結果も全部 FP として採点されてしまう（happy-sdk__happy は go.work が
  // go >= 1.27rc2 を要求していて実際にこれを踏んだ）。
  // 先に安いプローブを打って、必要な repo だけ auto に落とす。
  let toolchainFallback = false;
  {
    const probe = run('timeout 120 go list -m', O0);
    if (/requires go >=|go\.mod requires|go\.work requires/.test(probe.err || '')) {
      env.GOTOOLCHAIN = 'auto';       // 必要な toolchain を取得させる
      toolchainFallback = true;
      logln(`  GOTOOLCHAIN=local では不足 → auto に切替 (${(probe.err || '').split('\n')[0].trim()})`);
    }
  }
  const O = { env, cwd: src };

  // 2) 4ツール（7月と同一コマンド。stderr は捨てず全件保存）
  const tools = {
    syft: `timeout ${TO} syft ${src} -o cyclonedx-json=${od}/raw/syft.json`,
    trivy: `timeout ${TO} trivy fs ${src} --format cyclonedx --output ${od}/raw/trivy.json`,
    cdxgen: `timeout ${TO} cdxgen -t go ${src} -o ${od}/raw/cdxgen.json`,
    'cyclonedx-gomod': `timeout ${TO} cyclonedx-gomod mod -json -output ${od}/raw/cyclonedx-gomod.json ${src}`,
  };
  for (const [t, cmd] of Object.entries(tools)) {
    const rr = run(cmd, { env });
    codes[t] = rr.code;
    if (rr.err) fs.writeFileSync(`${od}/stderr/${t}.log`, rr.err);
  }
  run(`rm -rf /tmp/cdxgen-* /tmp/pip-* 2>/dev/null`, { env });

  // 3) GT 3定義
  const gmainRes = run('timeout 120 go list -m', O);
  const gmain = norm((gmainRes.out.split('\n')[0] || '').trim().split(/\s+/)[0] || '');
  run(`timeout ${TO} go mod download >/dev/null 2>&1`, O);
  const T = `${work}/tmp`; fs.mkdirSync(T, { recursive: true });
  const gAll = runToFile(`timeout ${TO} go list -m -e all`, `${T}/all.out`, `${T}/all.err`, O); codes.gt_all = gAll.code;
  const gImp = runToFile(`timeout ${TO} go list -deps -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./...`, `${T}/imp.out`, `${T}/imp.err`, O); codes.gt_imported = gImp.code;
  const gImpT = runToFile(`timeout ${TO} go list -deps -test -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./...`, `${T}/impT.out`, `${T}/impT.err`, O); codes.gt_impT = gImpT.code;

  // stderr は全件保存（切り詰めない）＋進捗行と本物のエラーを分けて集計
  const errAgg = { nProgress: 0, nReal: 0, kinds: {} };
  for (const [k, res] of [['gt_all', gAll], ['gt_imported', gImp], ['gt_impT', gImpT], ['go_list_m', gmainRes]]) {
    if (res.err) fs.writeFileSync(`${od}/stderr/${k}.log`, res.err);
    const s = splitErr(res.err);
    errAgg.nProgress += s.nProgress; errAgg.nReal += s.nReal;
    for (const [kk, vv] of Object.entries(s.kinds)) errAgg.kinds[kk] = (errAgg.kinds[kk] || 0) + vv;
  }

  const gt = {
    'gt-imported': parseGt(gImp.out, gmain),
    'gt-imported-test': parseGt(gImpT.out, gmain),
    'gt-all': parseGt(gAll.out, gmain),   // main module 行はここで除外する（7月は除外漏れ）
  };
  for (const [f, rows] of Object.entries(gt)) fs.writeFileSync(`${od}/${f}.tsv`, toTsv(rows));

  // 4) ツール出力を同じ2列 TSV に正規化
  const toolRows = {};
  for (const t of Object.keys(tools)) {
    const rows = parseTool(`${od}/raw/${t}.json`, gmain);
    toolRows[t] = rows;
    fs.writeFileSync(`${od}/${t}.tsv`, rows ? toTsv(rows) : '');
  }

  const nowN = {
    imp: nameSet(gt['gt-imported']).size,
    impT: nameSet(gt['gt-imported-test']).size,
    all: nameSet(gt['gt-all']).size,
  };

  // 5) meta.json（成功時のみ）/ raw gzip / summary
  fs.writeFileSync(`${od}/meta.json`, JSON.stringify({
    repo, sha: headSha, sha_recorded_in_july: sha, sha_pinned: true,
    url, gmain, status: 'OK', at: new Date().toISOString(),
    elapsed_sec: Math.round((Date.now() - t0) / 1000),
    exit_codes: codes,
    counts: {
      gt_imported: nowN.imp, gt_impT: nowN.impT, gt_all: nowN.all,
      ...Object.fromEntries(Object.keys(tools).map(t => [t, toolRows[t] ? nameSet(toolRows[t]).size : null])),
    },
    golist_stderr: { real_errors: errAgg.nReal, progress_lines: errAgg.nProgress, kinds: errAgg.kinds },
    env: { go: 'go1.26.5', GOOS: 'linux', GOARCH: 'amd64', CGO_ENABLED: '1', GOTOOLCHAIN: env.GOTOOLCHAIN, GOFLAGS: env.GOFLAGS },
    toolchain_fallback: toolchainFallback,
    tool_versions: { syft: 'v1.46.0', trivy: 'v0.72.0', cdxgen: '12.7.1', 'cyclonedx-gomod': 'v1.10.0' },
    note: 'TSVは原文の大文字小文字を保持。照合は小文字化したモジュールパス単位（scorer.js と同一）。',
  }, null, 2));

  fs.appendFileSync(SUM, [repo, headSha, 'OK', nowN.imp, nowN.impT, nowN.all,
    ...Object.keys(tools).map(t => toolRows[t] ? nameSet(toolRows[t]).size : 'NA'),
    errAgg.nReal, errAgg.nProgress,
    JSON.stringify(Object.entries(errAgg.kinds).map(([k, v]) => `${k}:${v}`).join(' '))].join(',') + '\n');

  // 6) 検証ゲート（7月の scorer.js を実行）— raw は gzip 前に検証してそのまま使える
  let vres = { rows: [], tally: {} };
  try { vres = V.verifyRepo(OUT, repo, july); } catch (e) { logln(`  verify error: ${e.message}`); }

  // differ が出たら、その場で module cache を温めて4ツールを取り直し、再判定する。
  // 7月は GOMODCACHE を全repoで共有していたため結果が処理順に依存しており、
  // 「7月と一致しない」ことがそのままツールの退行を意味しない（cache_effect.js 参照）。
  // 温めれば7月を再現する差分は cache_sensitive として記録し、ジョブは止めない。
  if ((vres.tally.differ || 0) > 0) {
    logln(`  differ=${vres.tally.differ} → module cache を温めて取り直す`);
    fs.mkdirSync(`${od}/raw_warm`, { recursive: true });
    const warm = run(`cd ${src} && timeout ${TO} go mod download all`, { env });
    if (warm.err) fs.writeFileSync(`${od}/stderr/go_mod_download_all.log`, warm.err);
    for (const [t, cmd] of Object.entries(tools)) {
      const rr = run(cmd.replace(`${od}/raw/`, `${od}/raw_warm/`), { env });
      codes[`${t}_warm`] = rr.code;
      if (rr.err) fs.writeFileSync(`${od}/stderr/${t}.warm.log`, rr.err);
    }
    try { vres = V.verifyRepo(OUT, repo, july); } catch (e) { logln(`  warm verify error: ${e.message}`); }
    logln(`  再判定: cache_sensitive=${vres.tally.cache_sensitive || 0} differ=${vres.tally.differ || 0}`);
    for (const t of Object.keys(tools)) {
      const f = `${od}/raw_warm/${t}.json`;
      if (fs.existsSync(f)) { fs.writeFileSync(f + '.gz', zlib.gzipSync(fs.readFileSync(f))); fs.unlinkSync(f); }
    }
    // meta.json に温め条件の情報を足す
    try {
      const m = JSON.parse(fs.readFileSync(`${od}/meta.json`, 'utf8'));
      m.warm_cache_rerun = { at: new Date().toISOString(), reason: 'differ detected with cold module cache', exit_codes: codes };
      fs.writeFileSync(`${od}/meta.json`, JSON.stringify(m, null, 2));
    } catch (e) { }
  }
  if (vres.rows.length) fs.appendFileSync(VER, vres.rows.join('\n') + '\n');
  for (const k of Object.keys(tally)) tally[k] += (vres.tally[k] || 0);

  // raw は gzip して保存（.gitignore 対象）
  for (const t of Object.keys(tools)) {
    const f = `${od}/raw/${t}.json`;
    if (fs.existsSync(f)) { fs.writeFileSync(f + '.gz', zlib.gzipSync(fs.readFileSync(f))); fs.unlinkSync(f); }
  }

  try { fs.unlinkSync(`${od}/.claim`); } catch (e) { }
  const d = (vres.tally || {}).differ || 0;
  // キャッシュ状態で説明できる差分（cache_sensitive）では止めない。
  // ただし **温め直しても7月を再現しなかった differ は本物の再現失敗**なので、
  // ログに埋もれさせず専用ファイルに記録したうえで、そこで止める。
  if (d > 0) {
    const rows = (vres.rows || []).filter(r => r.split(',').pop() === 'differ');
    if (!fs.existsSync(UNEXP)) fs.writeFileSync(UNEXP, V.VERIFY_HEADER);
    if (rows.length) fs.appendFileSync(UNEXP, rows.join('\n') + '\n');
    const tools_ = rows.map(r => r.split(',')[1]).join(' ');
    logln(`# ★ 未説明の differ=${d} at ${repo} [${tools_}] — 温め直しても7月を再現しなかった`);
    if (acknowledgedDiffer().has(repo)) {
      logln('# → acknowledged_differ.txt に調査済みとして登録済みのため停止しない');
    } else if (!fs.existsSync(STOP)) {
      fs.writeFileSync(STOP, `unexplained differ=${d} at ${repo} [${tools_}] (${new Date().toISOString()}) pid=${process.pid}\n`);
      logln('# → STOP を作成し全ワーカーを停止する（未調査の再現失敗のため）');
    }
  }
  logln(`OK gt(imp/impT/all)=${nowN.imp}/${nowN.impT}/${nowN.all} err=${errAgg.nReal} ` +
    `verify(match/bug/late/unavail/toolna/cache/differ)=${vres.tally.match || 0}/${vres.tally.july_main_bug || 0}/${vres.tally.july_main_bug_late || 0}/${vres.tally.july_unavailable || 0}/${vres.tally.july_tool_na || 0}/${vres.tally.cache_sensitive || 0}/${d} ${Math.round((Date.now() - t0) / 1000)}s`);
  fs.rmSync(work, { recursive: true, force: true });
  done++;
}
logln(`\n# 完了 処理=${processed} 成功=${done} SKIP=${skipped}`);
logln(`# 検証 match=${tally.match} july_main_bug=${tally.july_main_bug} july_main_bug_late=${tally.july_main_bug_late} july_unavailable=${tally.july_unavailable} july_tool_na=${tally.july_tool_na} cache_sensitive=${tally.cache_sensitive} differ=${tally.differ}`);
if (tally.differ > 0) logln(`# ★ differ=${tally.differ} — 報告のトリガー`);
