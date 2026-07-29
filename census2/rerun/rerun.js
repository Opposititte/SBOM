#!/usr/bin/env node
// rerun.js — census2 を再実行し、GT と 4ツールの出力を**成果物として保存**する。
//   7月の計測は件数と tp/fp/fn しか残しておらず、「Syft の誤検出モジュールの上位は？」
//   のような問いに答えられない。ここでは実体（モジュール一覧）を TSV で保存する。
//
//   使い方: node census2/rerun/rerun.js [件数]      (省略時=全件)
//           node census2/rerun/rerun.js 10          (まず10件で試す)
//
//   既存の census2 の結果には一切書き込まない（出力は census2/rerun/out/ のみ）。
//
// 【照合基準】tp/fp/fn は**モジュールパス単位**（scorer.js と同一の norm()）。
//   バージョンは TSV に保存するだけで、照合には使わない。ここを変えると7月と比較できない。
// 【再開】out/<repo>/meta.json があればスキップ。逐次書き込みなので中断しても失われない。
'use strict';
const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const zlib = require('zlib');

const LIMIT = process.argv[2] ? +process.argv[2] : Infinity;
const BASE = path.resolve(__dirname, '..');            // census2/
const OUT = path.join(__dirname, (process.env.MODE === 'empty') ? 'out_empty' : 'out');
const GOBIN = '/opt/go1265/go/bin';
const TO = 300;                                        // 7月と同じ per-command timeout

fs.mkdirSync(OUT, { recursive: true });

// ---------- 7月の記録を読む（検証ゲート用） ----------
// MODE=empty で、7月に EMPTY_GT として除外された「Goモジュールだが imported が空」の
// リポジトリを対象にする（母集団の条件付けによる非対称を検証するため。出力先も別）。
const MODE = process.env.MODE || 'ok';
const julyMan = {};   // repo -> {imp, impT, all}
for (const l of fs.readFileSync(BASE + '/manifest.csv', 'utf8').trim().split('\n').slice(1)) {
  const c = l.split(',');
  const isOK = c[6] === 'OK';
  const isEmptyGo = c[6] === 'EMPTY_GT' && (+c[9]) > 1;   // go.modに外部依存はあるがimportedが空
  if (MODE === 'empty' ? isEmptyGo : isOK) julyMan[c[0]] = { sha: c[2], imp: +c[7], impT: +c[8], all: +c[9], url: c[1] };
}
const julyMet = {};   // repo -> tool -> {tp,fp,fn} (imported, name一致)
{
  const L = fs.readFileSync(BASE + '/metrics.csv', 'utf8').trim().split('\n');
  const H = L[0].split(','); const ix = Object.fromEntries(H.map((h, i) => [h, i]));
  for (const l of L.slice(1)) {
    const c = l.split(',');
    if (c[2] === 'NA' || c.length < 20) { (julyMet[c[0]] = julyMet[c[0]] || {})[c[1]] = 'NA'; continue; }
    (julyMet[c[0]] = julyMet[c[0]] || {})[c[1]] = {
      tp: +c[ix.n_imp_tp], fp: +c[ix.n_imp_fp], fn: +c[ix.n_imp_fn],
      allTp: +c[ix.n_all_tp], allFp: +c[ix.n_all_fp], allFn: +c[ix.n_all_fn],
      tTp: +c[ix.n_impT_tp], tFp: +c[ix.n_impT_fp], tFn: +c[ix.n_impT_fn],
    };
  }
}

// ---------- scorer.js と同一の正規化・照合 ----------
const norm = s => { try { s = decodeURIComponent(s); } catch (e) { } return s.trim().toLowerCase(); };
// GT行 "path version" -> {p, v}（原文のまま保持。照合時のみ norm する）
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
// tp/fp/fn（モジュールパス単位）
function tfn(sSet, gSet) { let tp = 0; for (const m of sSet) if (gSet.has(m)) tp++; return [tp, sSet.size - tp, gSet.size - tp]; }
// 重複排除して TSV 化（原文の大文字小文字を保持）
function toTsv(rows) {
  const seen = new Set(), out = [];
  for (const r of rows) { const k = norm(r.p) + '\t' + norm(r.v); if (seen.has(k)) continue; seen.add(k); out.push(`${r.p}\t${r.v}`); }
  return out.sort().join('\n') + (out.length ? '\n' : '');
}

// ---------- stderr 分類 ----------
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
  return { nProgress: prog.length, nReal: real.length, kinds, realText: real.join('\n') };
}

function run(cmd, opts = {}) {
  const r = cp.spawnSync('bash', ['-c', cmd], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...opts });
  return { out: r.stdout || '', err: r.stderr || '', code: r.status === null ? -1 : r.status };
}
// 巨大モノレポ（例: gcloud-golang）では go list の出力が非常に大きく、
// spawnSync でバッファするとメモリを食い潰してプロセスごと落ちる。
// 7月の proc.sh と同じくシェルのリダイレクトでファイルに書き、後から読む。
const MAXREAD = 256 * 1024 * 1024;
function runToFile(cmd, outF, errF, opts = {}) {
  const r = cp.spawnSync('bash', ['-c', `${cmd} > ${outF} 2> ${errF}`], { encoding: 'utf8', maxBuffer: 1024 * 1024, ...opts });
  const rd = f => { try { return fs.statSync(f).size > MAXREAD ? '' : fs.readFileSync(f, 'utf8'); } catch (e) { return ''; } };
  return { out: rd(outF), err: rd(errF), code: r.status === null ? -1 : r.status };
}
// ディスクの空き(KB)
const freeKB = () => { try { return +cp.execSync("df --output=avail / | tail -1", { encoding: 'utf8' }).trim(); } catch (e) { return 1e9; } };

// ---------- 出力ファイル（逐次追記） ----------
const SUM = `${OUT}/summary.csv`, VER = `${OUT}/verify.csv`, LOG = `${OUT}/progress.log`;
if (!fs.existsSync(SUM)) fs.writeFileSync(SUM, 'repo,sha,status,n_gt_imported,n_gt_impT,n_gt_all,' +
  'n_syft,n_trivy,n_cdxgen,n_cyclonedx-gomod,golist_real_errors,golist_progress_lines,error_kinds\n');
if (!fs.existsSync(VER)) fs.writeFileSync(VER, 'repo,tool,' +
  'gt_imp_july,gt_imp_now,gt_impT_july,gt_impT_now,gt_all_july_adj,gt_all_now,' +
  'imp_tp_july,imp_tp_now,imp_fp_july,imp_fp_now,imp_fn_july,imp_fn_now,' +
  'impT_tp_july,impT_tp_now,impT_fp_july,impT_fp_now,impT_fn_july,impT_fn_now,' +
  'all_tp_july,all_tp_now,all_fp_july,all_fp_now,all_fn_july,all_fn_now,match\n');
const logln = s => { fs.appendFileSync(LOG, s + '\n'); process.stderr.write(s + '\n'); };

// ---------- 対象 ----------
// SHA未記録のrepoも対象に含める（7月に git rev-parse が値を返さなかった1件）。
// その場合は HEAD をcloneし、meta.json に sha_pinned:false と実際のHEADを記録する。
// 順序は seed 固定のランダム。実行環境のコンテナが不定期に回収されるため
// 全件完走が保証できない。アルファベット順だと途中結果が偏った標本になるので、
// どの時点で止まっても**偏りのない無作為標本**になるようにシャッフルする。
const targets = (() => {
  const a = Object.keys(julyMan).sort();
  let x = 20260729;                       // 固定seed（再現可能）
  const rnd = () => { x |= 0; x = (x + 0x6D2B79F5) | 0; let t = Math.imul(x ^ (x >>> 15), 1 | x); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; }
  return a;
})();
const noSha = targets.filter(r => !/^[0-9a-f]{40}$/.test(julyMan[r].sha));
logln(`# rerun 開始 ${new Date().toISOString()} 対象=${targets.length} (SHA未記録=${noSha.length}→HEADで取得) 上限=${LIMIT}`);

try { cp.execSync('rm -rf /tmp/rr_* 2>/dev/null'); } catch (e) { }   // 前回の残骸を掃除
let done = 0, skipped = 0, mismatch = 0, processed = 0;
for (const repo of targets) {
  if (processed >= LIMIT) break;
  const od = `${OUT}/${repo}`;
  if (fs.existsSync(`${od}/meta.json`)) { done++; continue; }   // 再開: 処理済みはスキップ
  processed++;
  const { url, sha } = julyMan[repo];
  const work = `/tmp/rr_${repo}`, src = `${work}/src`;
  fs.rmSync(work, { recursive: true, force: true });
  fs.mkdirSync(src, { recursive: true });
  fs.mkdirSync(`${od}/raw`, { recursive: true });
  fs.mkdirSync(`${od}/stderr`, { recursive: true });

  // 7月と同じ環境
  const env = {
    ...process.env, PATH: `${GOBIN}:${process.env.PATH}`,
    GOTOOLCHAIN: 'local', GOFLAGS: '-mod=mod', GOOS: 'linux', GOARCH: 'amd64', CGO_ENABLED: '1',
    GOMODCACHE: `${work}/mod`, GOCACHE: `${work}/build`,
  };
  const t0 = Date.now();
  process.stderr.write(`[${processed}] ${repo} ... `);
  if (freeKB() < 3 * 1024 * 1024) {   // 空き3GB未満なら処理せず記録して次へ
    fs.writeFileSync(`${od}/meta.json`, JSON.stringify({ repo, sha, status: 'SKIP', reason: 'disk_low', at: new Date().toISOString() }, null, 2));
    fs.appendFileSync(SUM, `${repo},${sha},SKIP_disk_low,,,,,,,,,,\n`);
    logln('SKIP(disk_low)'); fs.rmSync(work, { recursive: true, force: true }); skipped++; continue;
  }

  // 1) clone（SHAが記録されていればそれに固定、無ければ HEAD）
  const hasSha = /^[0-9a-f]{40}$/.test(sha);
  let pinned = false, headSha = '';
  if (hasSha) {
    run(`cd ${src} && git init -q && git remote add origin ${url} && timeout 300 git fetch -q --depth 1 origin ${sha} && git checkout -q FETCH_HEAD`, { env });
    pinned = run(`cd ${src} && git rev-parse HEAD`, { env }).out.trim() === sha;
    if (!pinned) {
      fs.rmSync(src, { recursive: true, force: true }); fs.mkdirSync(src, { recursive: true });
      run(`timeout 600 git clone -q ${url} ${src} && cd ${src} && git checkout -q ${sha}`, { env });
      pinned = run(`cd ${src} && git rev-parse HEAD`, { env }).out.trim() === sha;
    }
    headSha = sha;
  } else {
    run(`timeout 300 git clone -q --depth=1 ${url} ${src}`, { env });
    headSha = run(`cd ${src} && git rev-parse HEAD`, { env }).out.trim();
    pinned = !!headSha;   // SHA固定ではないが取得はできた
  }
  if (!pinned || !fs.existsSync(`${src}/go.mod`)) {
    const reason = !pinned ? (hasSha ? 'SHA固定不可' : 'clone失敗') : 'go.mod無し';
    // clone/fetch の失敗は一時的（レート制限等）のことが多い。meta.json を書くと
    // 再開時に恒久スキップになってしまうため、go.mod無し以外は記録だけして次回再試行させる。
    if (reason === 'go.mod無し') {
      fs.writeFileSync(`${od}/meta.json`, JSON.stringify({ repo, sha, status: 'SKIP', reason, at: new Date().toISOString() }, null, 2));
    } else {
      fs.rmSync(od, { recursive: true, force: true });   // 次回再試行できるよう残さない
    }
    fs.appendFileSync(SUM, `${repo},${sha},SKIP_${reason},,,,,,,,,,\n`);
    logln(`SKIP(${reason})`); fs.rmSync(work, { recursive: true, force: true }); skipped++; continue;
  }
  if (fs.existsSync(`${src}/go.work`)) env.GOFLAGS = '';     // 7月と同じ workspace 対応
  const O = { env, cwd: src };
  const codes = {};

  // 2) 4ツール（7月と同一コマンド。stderr は捨てない）
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

  // 3) GT 3定義（+ FP分類用の補助）
  const gmainRes = run('timeout 120 go list -m', O);
  const gmain = norm((gmainRes.out.split('\n')[0] || '').trim().split(/\s+/)[0] || '');
  run(`timeout ${TO} go mod download >/dev/null 2>&1`, O);   // 出力は使わないので捨てる
  const T = `${work}/tmp`; fs.mkdirSync(T, { recursive: true });
  const gAll = runToFile(`timeout ${TO} go list -m -e all`, `${T}/all.out`, `${T}/all.err`, O); codes.gt_all = gAll.code;
  const gImp = runToFile(`timeout ${TO} go list -deps -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./...`, `${T}/imp.out`, `${T}/imp.err`, O); codes.gt_imported = gImp.code;
  const gImpT = runToFile(`timeout ${TO} go list -deps -test -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./...`, `${T}/impT.out`, `${T}/impT.err`, O); codes.gt_impT = gImpT.code;

  // stderr は全件保存（切り詰めない）＋進捗/本物を分けて集計
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
    'gt-all': parseGt(gAll.out, gmain),
  };
  for (const [f, rows] of Object.entries(gt)) fs.writeFileSync(`${od}/${f}.tsv`, toTsv(rows));

  // 4) ツール出力を TSV 化
  const toolRows = {};
  for (const t of Object.keys(tools)) {
    const rows = parseTool(`${od}/raw/${t}.json`, gmain);
    toolRows[t] = rows;
    fs.writeFileSync(`${od}/${t}.tsv`, rows ? toTsv(rows) : '');
  }

  // 5) tp/fp/fn（モジュールパス単位＝7月と同一基準）と検証ゲート
  const gSet = {
    imported: nameSet(gt['gt-imported']), impT: nameSet(gt['gt-imported-test']), all: nameSet(gt['gt-all']),
  };
  const nowN = { imp: gSet.imported.size, impT: gSet.impT.size, all: gSet.all.size };
  const J = julyMan[repo];
  // 【既知の差】7月の manifest の n_all は `go list -m all` の生出力を数えており
  //   main module 行を1件含む（proc.sh:65 は grep -v main をしていない）。
  //   一方 scorer.js は p===main を除外して採点していたので、採点値は main 抜きで正しい。
  //   よって件数比較では 7月の n_all から 1 を引いて突き合わせる（10件で -1 を実証済み）。
  const julyAllAdj = J.all - 1;
  for (const t of Object.keys(tools)) {
    const rows = toolRows[t];
    const jm = (julyMet[repo] || {})[t];
    if (!rows) {
      fs.appendFileSync(VER, `${repo},${t},${J.imp},${nowN.imp},${J.impT},${nowN.impT},${julyAllAdj},${nowN.all},` +
        `${jm === 'NA' ? 'NA' : ''},NA,,,,,,,,,,,,,,,,${jm === 'NA' ? 'yes' : 'NO'}\n`);
      if (jm !== 'NA') mismatch++;
      continue;
    }
    const S = nameSet(rows);
    const m = {
      imp: tfn(S, gSet.imported), impT: tfn(S, gSet.impT), all: tfn(S, gSet.all),
    };
    const cnts = J.imp === nowN.imp && J.impT === nowN.impT && julyAllAdj === nowN.all;
    const scores = jm && jm !== 'NA' &&
      jm.tp === m.imp[0] && jm.fp === m.imp[1] && jm.fn === m.imp[2] &&
      jm.tTp === m.impT[0] && jm.tFp === m.impT[1] && jm.tFn === m.impT[2] &&
      jm.allTp === m.all[0] && jm.allFp === m.all[1] && jm.allFn === m.all[2];
    const ok = cnts && scores;
    if (!ok) mismatch++;
    const jv = k => jm === 'NA' ? 'NA' : jm[k];
    fs.appendFileSync(VER, [repo, t, J.imp, nowN.imp, J.impT, nowN.impT, julyAllAdj, nowN.all,
      jv('tp'), m.imp[0], jv('fp'), m.imp[1], jv('fn'), m.imp[2],
      jv('tTp'), m.impT[0], jv('tFp'), m.impT[1], jv('tFn'), m.impT[2],
      jv('allTp'), m.all[0], jv('allFp'), m.all[1], jv('allFn'), m.all[2],
      ok ? 'yes' : 'NO'].join(',') + '\n');
  }

  // 6) meta.json / raw gzip / summary
  fs.writeFileSync(`${od}/meta.json`, JSON.stringify({
    repo, sha: headSha, sha_recorded_in_july: sha || null, sha_pinned: hasSha,
    url, gmain, status: 'OK', at: new Date().toISOString(),
    elapsed_sec: Math.round((Date.now() - t0) / 1000),
    exit_codes: codes,
    counts: { gt_imported: nowN.imp, gt_impT: nowN.impT, gt_all: nowN.all,
      ...Object.fromEntries(Object.keys(tools).map(t => [t, toolRows[t] ? nameSet(toolRows[t]).size : null])) },
    golist_stderr: { real_errors: errAgg.nReal, progress_lines: errAgg.nProgress, kinds: errAgg.kinds },
    env: { go: 'go1.26.5', GOOS: 'linux', GOARCH: 'amd64', CGO_ENABLED: '1', GOTOOLCHAIN: 'local' },
    note: 'TSVは原文の大文字小文字を保持。照合は小文字化したモジュールパス単位（scorer.js と同一）。',
  }, null, 2));
  for (const t of Object.keys(tools)) {
    const f = `${od}/raw/${t}.json`;
    if (fs.existsSync(f)) { fs.writeFileSync(f + '.gz', zlib.gzipSync(fs.readFileSync(f))); fs.unlinkSync(f); }
  }
  fs.appendFileSync(SUM, [repo, headSha, hasSha ? 'OK' : 'OK_HEAD', nowN.imp, nowN.impT, nowN.all,
    ...Object.keys(tools).map(t => toolRows[t] ? nameSet(toolRows[t]).size : 'NA'),
    errAgg.nReal, errAgg.nProgress, JSON.stringify(Object.entries(errAgg.kinds).map(([k, v]) => `${k}:${v}`).join(' '))].join(',') + '\n');

  logln(`OK gt(imp/impT/all)=${nowN.imp}/${nowN.impT}/${nowN.all} err=${errAgg.nReal} ${Math.round((Date.now() - t0) / 1000)}s`);
  fs.rmSync(work, { recursive: true, force: true });
  done++;
}
logln(`\n# 完了 処理=${processed} 成功=${done} SKIP=${skipped} 検証不一致=${mismatch}`);
