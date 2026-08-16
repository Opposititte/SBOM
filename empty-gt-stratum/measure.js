#!/usr/bin/env node
// measure.js — ANALYSIS_PLAN.md で事前固定した条件に従い、GT-imported が空である
//   123 件（targets.csv）を計測する。出力は empty-gt-stratum/out/ にのみ書き、
//   7月のデータ（metrics.csv / manifest.csv）と cold-summary には一切書き込まない。
//
//   使い方: node empty-gt-stratum/measure.js [件数]
//   再開  : out/<repo>/meta.json があればスキップ。1件ごとに原子的に保存する。
//
// 計画との対応:
//   4節  計測条件（cold cache / GOTOOLCHAIN / timeout 300秒 / SHA固定）
//   5節  失敗時の扱い（retryable 3回で permanent 降格）
//   6節  保存するもの（TSV / raw gzip / stderr / meta.json）
//   10節 ok_empty / ok_nonempty / na の3状態を機械的に区別する
'use strict';
const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const zlib = require('zlib');

const LIMIT = process.argv[2] ? +process.argv[2] : Infinity;
const DIR = __dirname;
const OUT = path.join(DIR, 'out');
const GO_BIN = process.env.GO_BIN || '/opt/go1265/go/bin';
const TOOL_BIN = process.env.TOOL_BIN || '/workspace/gopath/bin';
const TO = 300;                                   // 計画4節: 各コマンド300秒
const MAX_RETRIES = 3;                            // 計画5節
fs.mkdirSync(OUT, { recursive: true });

// ---------- 対象（計画2節。targets.csv を凍結済み） ----------
const targets = fs.readFileSync(path.join(DIR, 'targets.csv'), 'utf8').trim().split('\n').slice(1)
  .map(l => { const c = l.split(','); return { repo: c[0], url: c[1], sha: c[2], stratum: c[7] }; });

const SUM = `${OUT}/summary.csv`, SKIPS = `${OUT}/skips.csv`, LOG = `${OUT}/progress.log`;
if (!fs.existsSync(SUM)) fs.writeFileSync(SUM, 'repo,sha,stratum,status,n_gt_imported,n_gt_impT,n_gt_all,' +
  'syft_state,trivy_state,cdxgen_state,cyclonedx-gomod_state,' +
  'n_syft,n_trivy,n_cdxgen,n_cyclonedx-gomod,golist_real_errors,golist_progress_lines,error_kinds\n');
if (!fs.existsSync(SKIPS)) fs.writeFileSync(SKIPS, 'repo,sha,kind,reason,at\n');
const logln = s => { fs.appendFileSync(LOG, s + '\n'); process.stderr.write(s + '\n'); };

// ---------- scorer.js と同一の正規化（計画10節） ----------
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
// CycloneDX JSON -> [{p,v}]。パース不能・ファイル無しは null（= na）を返す。
function parseTool(file, main) {
  if (!fs.existsSync(file)) return null;
  let d; try { d = JSON.parse(fs.readFileSync(file)); } catch (e) { return null; }
  const rows = [];
  for (const c of (d.components || [])) {
    const u = c.purl || ''; if (!u.startsWith('pkg:golang/')) continue;
    let r = u.slice(11).split('?')[0].split('#')[0];
    const at = r.lastIndexOf('@');
    const praw = at < 0 ? r : r.slice(0, at);
    const p = norm(praw); if (p === 'stdlib' || p === main) continue;
    rows.push({ p: praw, v: at < 0 ? '' : r.slice(at + 1) });
  }
  return rows;
}
const nameSet = rows => new Set(rows.map(r => norm(r.p)));
function toTsv(rows) {
  const seen = new Set(), out = [];
  for (const r of rows) { const k = norm(r.p) + '\t' + norm(r.v); if (seen.has(k)) continue; seen.add(k); out.push(`${r.p}\t${r.v}`); }
  return out.sort().join('\n') + (out.length ? '\n' : '');
}

// ---------- stderr 分類（切り詰めず全件保存） ----------
const PROGRESS = /^go: (downloading|finding|extracting|upgraded|added|to add module requirements)/;
function splitErr(err) {
  const lines = (err || '').split('\n').map(s => s.trimEnd()).filter(s => s.trim());
  const kinds = {}; let nReal = 0, nProg = 0;
  for (const l of lines) {
    if (PROGRESS.test(l)) { nProg++; continue; }
    nReal++;
    const k = /no required module provides package/.test(l) ? 'no_required_module'
      : /missing go\.sum entry/.test(l) ? 'missing_gosum'
        : /build constraints exclude all Go files/.test(l) ? 'build_constraints_exclude_all'
          : /cannot find module|unknown revision|does not contain package/.test(l) ? 'cannot_find_module'
            : /requires go >=|go\.mod requires|go\.work requires/.test(l) ? 'go_version' : 'other';
    kinds[k] = (kinds[k] || 0) + 1;
  }
  return { nReal, nProg, kinds };
}

function run(cmd, opts = {}) {
  const r = cp.spawnSync('bash', ['-c', cmd], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...opts });
  return { out: r.stdout || '', err: r.stderr || '', code: r.status === null ? -1 : r.status };
}
const MAXREAD = 256 * 1024 * 1024;
function runToFile(cmd, outF, errF, opts = {}) {
  const r = cp.spawnSync('bash', ['-c', `${cmd} > ${outF} 2> ${errF}`], { encoding: 'utf8', maxBuffer: 1024 * 1024, ...opts });
  const rd = f => { try { return fs.statSync(f).size > MAXREAD ? '' : fs.readFileSync(f, 'utf8'); } catch (e) { return ''; } };
  return { out: rd(outF), err: rd(errF), code: r.status === null ? -1 : r.status };
}
const freeKB = () => { try { return +cp.execSync("df --output=avail / | tail -1", { encoding: 'utf8' }).trim(); } catch (e) { return 1e9; } };

// 計画5節: retryable は3回で permanent に降格。permanent のみ meta.json を書く。
function retryableCount(repo) {
  try {
    let n = 0;
    for (const l of fs.readFileSync(SKIPS, 'utf8').split('\n')) {
      const c = l.split(','); if (c[0] === repo && c[2] === 'retryable') n++;
    }
    return n;
  } catch (e) { return 0; }
}
function recordSkip(od, repo, sha, stratum, kind, reason) {
  if (kind === 'retryable' && retryableCount(repo) + 1 >= MAX_RETRIES) {
    kind = 'permanent'; reason = `retry_exhausted_after_${MAX_RETRIES}_attempts(${reason})`;
  }
  const at = new Date().toISOString();
  if (kind === 'permanent') {
    fs.mkdirSync(od, { recursive: true });
    fs.writeFileSync(`${od}/meta.json`, JSON.stringify({ repo, sha, stratum, status: 'SKIP', skip_kind: kind, reason, at }, null, 2));
  } else {
    fs.rmSync(od, { recursive: true, force: true });   // 次回再試行できるよう残さない
  }
  fs.appendFileSync(SKIPS, `${repo},${sha},${kind},${reason},${at}\n`);
  fs.appendFileSync(SUM, `${repo},${sha},${stratum},SKIP_${kind}_${reason},,,,,,,,,,,,,,\n`);
  return kind;
}

logln(`# empty-gt-stratum 計測開始 ${new Date().toISOString()} 対象=${targets.length}`);
let done = 0, skipped = 0, processed = 0;

for (const { repo, url, sha, stratum } of targets) {
  if (processed >= LIMIT) break;
  const od = `${OUT}/${repo}`;
  if (fs.existsSync(`${od}/meta.json`)) { done++; continue; }    // 再開
  processed++;
  const work = `/tmp/eg_${repo}`, src = `${work}/src`;
  fs.rmSync(work, { recursive: true, force: true });
  fs.mkdirSync(src, { recursive: true });
  fs.mkdirSync(`${od}/raw`, { recursive: true });
  fs.mkdirSync(`${od}/stderr`, { recursive: true });

  // 計画4節: cold cache（repoごとに使い捨ての空 GOMODCACHE）
  const env = {
    ...process.env, PATH: `${GO_BIN}:${TOOL_BIN}:${process.env.PATH}`,
    GOTOOLCHAIN: 'local', GOFLAGS: '-mod=mod', GOOS: 'linux', GOARCH: 'amd64', CGO_ENABLED: '1',
    GOMODCACHE: `${work}/mod`, GOCACHE: `${work}/build`,
  };
  const t0 = Date.now();
  process.stderr.write(`[${processed}] ${repo} (${stratum}) ... `);
  if (freeKB() < 3 * 1024 * 1024) {
    recordSkip(od, repo, sha, stratum, 'retryable', 'disk_low');
    logln('SKIP(retryable/disk_low)'); fs.rmSync(work, { recursive: true, force: true }); skipped++; continue;
  }

  // SHA固定clone
  run(`cd ${src} && git init -q && git remote add origin ${url} && timeout 300 git fetch -q --depth 1 origin ${sha} && git checkout -q FETCH_HEAD`, { env });
  if (run(`cd ${src} && git rev-parse HEAD`, { env }).out.trim() !== sha) {
    const k = recordSkip(od, repo, sha, stratum, 'retryable', 'sha_fetch_failed');
    logln(`SKIP(${k}/sha_fetch_failed)`); fs.rmSync(work, { recursive: true, force: true }); skipped++; continue;
  }
  if (!fs.existsSync(`${src}/go.mod`)) {
    recordSkip(od, repo, sha, stratum, 'permanent', 'no_go_mod');
    logln('SKIP(permanent/no_go_mod)'); fs.rmSync(work, { recursive: true, force: true }); skipped++; continue;
  }
  if (fs.existsSync(`${src}/go.work`)) env.GOFLAGS = '';        // 計画4節
  const O0 = { env, cwd: src };
  const codes = {};

  // 計画10節: 新しい Go を要求する repo のみ GOTOOLCHAIN=auto
  let toolchainFallback = false;
  {
    const probe = run('timeout 120 go list -m', O0);
    if (/requires go >=|go\.mod requires|go\.work requires/.test(probe.err || '')) {
      env.GOTOOLCHAIN = 'auto'; toolchainFallback = true;
      logln(`  GOTOOLCHAIN=auto に切替 (${(probe.err || '').split('\n')[0].trim()})`);
    }
  }
  const O = { env, cwd: src };

  // 4ツール（本編と同一コマンド）
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

  // GT 3定義
  const gmainRes = run('timeout 120 go list -m', O);
  const gmain = norm((gmainRes.out.split('\n')[0] || '').trim().split(/\s+/)[0] || '');
  run(`timeout ${TO} go mod download >/dev/null 2>&1`, O);
  const T = `${work}/tmp`; fs.mkdirSync(T, { recursive: true });
  const gAll = runToFile(`timeout ${TO} go list -m -e all`, `${T}/a.out`, `${T}/a.err`, O); codes.gt_all = gAll.code;
  const gImp = runToFile(`timeout ${TO} go list -deps -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./...`, `${T}/i.out`, `${T}/i.err`, O); codes.gt_imported = gImp.code;
  const gImpT = runToFile(`timeout ${TO} go list -deps -test -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./...`, `${T}/t.out`, `${T}/t.err`, O); codes.gt_impT = gImpT.code;

  const errAgg = { nReal: 0, nProg: 0, kinds: {} };
  for (const [k, res] of [['gt_all', gAll], ['gt_imported', gImp], ['gt_impT', gImpT], ['go_list_m', gmainRes]]) {
    if (res.err) fs.writeFileSync(`${od}/stderr/${k}.log`, res.err);
    const s = splitErr(res.err);
    errAgg.nReal += s.nReal; errAgg.nProg += s.nProg;
    for (const [a, b] of Object.entries(s.kinds)) errAgg.kinds[a] = (errAgg.kinds[a] || 0) + b;
  }

  const gt = {
    'gt-imported': parseGt(gImp.out, gmain),
    'gt-imported-test': parseGt(gImpT.out, gmain),
    'gt-all': parseGt(gAll.out, gmain),
  };
  for (const [f, rows] of Object.entries(gt)) fs.writeFileSync(`${od}/${f}.tsv`, toTsv(rows));

  // 計画10節: ok_empty / ok_nonempty / na を機械的に区別する
  const toolRows = {}, state = {};
  for (const t of Object.keys(tools)) {
    const rows = parseTool(`${od}/raw/${t}.json`, gmain);
    toolRows[t] = rows;
    fs.writeFileSync(`${od}/${t}.tsv`, rows ? toTsv(rows) : '');
    state[t] = rows === null ? 'na' : (nameSet(rows).size === 0 ? 'ok_empty' : 'ok_nonempty');
  }

  const n = {
    imp: nameSet(gt['gt-imported']).size,
    impT: nameSet(gt['gt-imported-test']).size,
    all: nameSet(gt['gt-all']).size,
  };

  // meta.json は成功時のみ（＝ここまで到達したときのみ）書く
  fs.writeFileSync(`${od}/meta.json`, JSON.stringify({
    repo, sha, stratum, url, gmain, status: 'OK', at: new Date().toISOString(),
    elapsed_sec: Math.round((Date.now() - t0) / 1000),
    exit_codes: codes, tool_state: state,
    counts: { gt_imported: n.imp, gt_impT: n.impT, gt_all: n.all,
      ...Object.fromEntries(Object.keys(tools).map(t => [t, toolRows[t] ? nameSet(toolRows[t]).size : null])) },
    golist_stderr: { real_errors: errAgg.nReal, progress_lines: errAgg.nProg, kinds: errAgg.kinds },
    env: { go: 'go1.26.5', GOOS: 'linux', GOARCH: 'amd64', CGO_ENABLED: '1', GOTOOLCHAIN: env.GOTOOLCHAIN, GOFLAGS: env.GOFLAGS },
    toolchain_fallback: toolchainFallback,
    tool_versions: { syft: 'v1.46.0', trivy: 'v0.72.0', cdxgen: '12.7.1', 'cyclonedx-gomod': 'v1.10.0' },
    note: '計測条件は empty-gt-stratum/ANALYSIS_PLAN.md（計測前に凍結）に従う。',
  }, null, 2));

  fs.appendFileSync(SUM, [repo, sha, stratum, 'OK', n.imp, n.impT, n.all,
    ...Object.keys(tools).map(t => state[t]),
    ...Object.keys(tools).map(t => toolRows[t] ? nameSet(toolRows[t]).size : 'NA'),
    errAgg.nReal, errAgg.nProg,
    JSON.stringify(Object.entries(errAgg.kinds).map(([k, v]) => `${k}:${v}`).join(' '))].join(',') + '\n');

  for (const t of Object.keys(tools)) {
    const f = `${od}/raw/${t}.json`;
    if (fs.existsSync(f)) { fs.writeFileSync(f + '.gz', zlib.gzipSync(fs.readFileSync(f))); fs.unlinkSync(f); }
  }
  logln(`OK gt(imp/impT/all)=${n.imp}/${n.impT}/${n.all} state=${Object.values(state).join('/')} ${Math.round((Date.now() - t0) / 1000)}s`);
  fs.rmSync(work, { recursive: true, force: true });
  done++;
}
logln(`\n# 完了 処理=${processed} 成功=${done} SKIP=${skipped}`);
