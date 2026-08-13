#!/usr/bin/env node
// validate_gt.js — GT-imported（go list -deps -e の出力）の妥当性検証。
//
//   目的: go/parser で「ビルド制約を無視して」直接 import を抽出した集合 A に対し、
//         A ⊆ GT-imported が成り立つかを確認し、GTの取りこぼし候補を列挙する。
//
//   使い方: node census2/validate/validate_gt.js [件数] [seed]
//           例) node census2/validate/validate_gt.js 5 42
//
//   注意: census2 はクローンとGTを保存していない（採点後に削除）ため、
//         本スクリプトが proc.sh と同じコマンド・同じ環境設定でGTを再生成する。
//         → 論文で用いたGTそのものの検証になる。
//
//   出力: census2/validate/out/missing_<N>.csv  … 取りこぼし候補（1 import 出現ごとに1行）
//         census2/validate/out/summary_<N>.csv  … リポジトリごとの要約
const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const N = +(process.argv[2] || 5);
const SEED = +(process.argv[3] || 42);
const BASE = path.resolve(__dirname, '..');          // census2/
const OUT = path.join(__dirname, 'out');
const SCANNER = path.join(__dirname, 'bin', 'importscan');
const GOBIN = '/opt/go1265/go/bin';

fs.mkdirSync(OUT, { recursive: true });

// ---- 再現可能な無作為抽出（mulberry32 + Fisher-Yates, seed固定）----
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const man = fs.readFileSync(BASE + '/manifest.csv', 'utf8').trim().split('\n').slice(1);
const okRepos = man.map(l => l.split(',')).filter(c => c[6] === 'OK' && /^[0-9a-f]{40}$/.test(c[2]))
  .map(c => ({ name: c[0], url: c[1], sha: c[2] }))  // ★ 計測時のコミットSHAを固定して検証
  .sort((a, b) => a.name < b.name ? -1 : 1);        // 決定的な順序にしてから shuffle
const rnd = mulberry32(SEED);
const shuffled = okRepos.slice();
for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
// SKIP（SHA固定不可・go.mod無し等）が出ても有効Nを確保するため、seed順で繰り上げ補充する。
// 走査対象は shuffled 全体、有効が N 件に達したら打ち切り。SKIPは理由別に記録。

function sh(cmd, opts = {}) {
  try { return cp.execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 256 * 1024 * 1024, ...opts }); }
  catch (e) { return (e.stdout || ''); }
}
// stdout と stderr の両方を取る（go list のロードエラーを記録するため）
function sh2(cmd, opts = {}) {
  const r = cp.spawnSync('bash', ['-c', cmd], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, ...opts });
  return { out: r.stdout || '', err: r.stderr || '', status: r.status };
}
const isStdlib = p => { const first = p.split('/')[0]; return !first.includes('.'); };

const missRows = [], sumRows = [], skips = [], reasonCount = {}, errKind = {};
console.error(`# GT-imported 検証: 有効N=${N}, seed=${SEED} (母集団 OK且つSHA有=${okRepos.length})\n`);

for (let i = 0; i < shuffled.length && sumRows.length < N; i++) {
  const { name, url, sha } = shuffled[i];
  const work = `/tmp/vgt_${name}`;
  const src = `${work}/src`;
  fs.rmSync(work, { recursive: true, force: true });
  fs.mkdirSync(src, { recursive: true });
  // GOOS/GOARCH を明示固定（proc.sh は GOOS=linux、GOARCH は host 既定=amd64）
  const env = { ...process.env, PATH: `${GOBIN}:${process.env.PATH}`, GOTOOLCHAIN: 'local', GOFLAGS: '-mod=mod', GOOS: 'linux', GOARCH: 'amd64', GOMODCACHE: `${work}/mod`, GOCACHE: `${work}/build` };

  process.stderr.write(`[有効${sumRows.length + 1}/${N} 走査${i + 1}] ${name} ... `);
  // ★ 計測時点のコミットを取得（HEADではなく manifest.csv の SHA）
  sh(`cd ${src} && git init -q && git remote add origin ${url} && timeout 300 git fetch -q --depth 1 origin ${sha} && git checkout -q FETCH_HEAD`, { env });
  let pinned = (sh(`cd ${src} && git rev-parse HEAD`, { env }) || '').trim() === sha;
  if (!pinned) {   // SHA直接fetch不可なら full clone → checkout
    fs.rmSync(src, { recursive: true, force: true }); fs.mkdirSync(src, { recursive: true });
    sh(`timeout 600 git clone -q ${url} ${src} && cd ${src} && git checkout -q ${sha}`, { env });
    pinned = (sh(`cd ${src} && git rev-parse HEAD`, { env }) || '').trim() === sha;
  }
  if (!pinned) { console.error('SKIP(SHA固定不可)'); skips.push(`${name},SHA固定不可`); fs.rmSync(work, { recursive: true, force: true }); continue; }
  if (!fs.existsSync(`${src}/go.mod`)) { console.error('SKIP(go.mod無し)'); skips.push(`${name},go.mod無し`); fs.rmSync(work, { recursive: true, force: true }); continue; }

  // proc.sh と同じ: go.work があれば -mod=mod を外す
  if (fs.existsSync(`${src}/go.work`)) env.GOFLAGS = '';
  const O = { env, cwd: src };

  const gmain = (sh('timeout 120 go list -m', O).split('\n')[0] || '').trim().split(/\s+/)[0];

  // --- GT-imported を proc.sh と同一コマンド・同一フィルタで再生成 ---
  //   proc.sh: GOOS=linux go list -deps -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./...
  //            | grep -v '^$' | grep -v "^${gmain} \?$" | sort -u
  //   ここでは path 集合として比較するため、同じ出力から path 部分を取り出す。
  const gtRes = sh2(`timeout 600 go list -deps -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./...`, O);
  const gtRaw = gtRes.out;
  // ★ -e はエラーを許容するため、壊れたパッケージがあると依存が列挙されないことがある。
  //    その取りこぼしは unconstrained に落ちるので、突き合わせ用に stderr を記録する。
  //    ただし stderr の大半は "go: downloading ..." 等の**進捗**であり無視してよい。
  //    進捗を先に除去してから全件保存する（先に行数で切り詰めると本物のエラーが隠れる）。
  const PROGRESS = /^go: (downloading|finding|extracting|upgraded|added|to add module requirements)/;
  const errLines = gtRes.err.split('\n').map(l => l.trimEnd())
    .filter(l => l.trim() && !PROGRESS.test(l.trim()));
  const nProgress = gtRes.err.split('\n').filter(l => PROGRESS.test(l.trim())).length;
  const gtErrLines = errLines.length;          // ★ 本物のエラー行のみを数える
  if (gtErrLines) {
    fs.appendFileSync(`${OUT}/golist_stderr_${N}.log`,
      `\n===== ${name} (本物のエラー ${gtErrLines} 行 / 進捗 ${nProgress} 行, exit=${gtRes.status}) =====\n`
      + errLines.join('\n') + '\n');
    for (const l of errLines) {                // 種別を集計
      const k = /no required module provides package/.test(l) ? 'no_required_module'
        : /missing go\.sum entry/.test(l) ? 'missing_gosum'
        : /build constraints exclude all Go files/.test(l) ? 'build_constraints_exclude_all'
        : /cannot find module|unknown revision|does not contain package/.test(l) ? 'cannot_find_module'
        : /requires go >=|go\.mod requires|unsupported|compile: version/.test(l) ? 'go_version'
        : 'other';
      errKind[k] = (errKind[k] || 0) + 1;
    }
  }
  const GT = new Set(gtRaw.split('\n')
    .filter(s => s !== '')                                  // grep -v '^$'
    .filter(s => !new RegExp(`^${gmain} ?$`).test(s))       // grep -v "^gmain \?$"
    .map(s => s.trim().split(/\s+/)[0]).filter(Boolean));

  // --- go.mod の require / replace ---
  let req = [], rep = new Map();
  try {
    const j = JSON.parse(sh('go mod edit -json', O) || '{}');
    req = (j.Require || []).map(r => r.Path);
    (j.Replace || []).forEach(r => rep.set(r.Old.Path, (r.New && r.New.Path) || ''));
  } catch (e) { }
  const reqSorted = req.slice().sort((a, b) => b.length - a.length);   // 最長一致用

  // --- go/parser による import 抽出（ビルド制約を適用しない）---
  const scan = sh(`${SCANNER} ${src}`, { env });
  const imps = scan.split('\n').filter(Boolean).map(l => { try { return JSON.parse(l); } catch (e) { return null; } }).filter(Boolean);

  // --- import パス → モジュールパス（require への最長一致）---
  const A = new Map();   // module -> [{importPath,file,line,build,inReq,replaced}]
  let nSelf = 0, nStd = 0;
  for (const im of imps) {
    if (isStdlib(im.path)) { nStd++; continue; }
    if (gmain && (im.path === gmain || im.path.startsWith(gmain + '/'))) { nSelf++; continue; }
    let mod = reqSorted.find(m => im.path === m || im.path.startsWith(m + '/'));
    const inReq = !!mod;
    if (!mod) {                       // require に無い → import パス自体を暫定モジュール名に
      const seg = im.path.split('/');
      mod = seg.slice(0, Math.min(3, seg.length)).join('/');
    }
    if (!A.has(mod)) A.set(mod, []);
    A.get(mod).push({ ...im, inReq, replaced: rep.has(mod) });
  }

  // --- A ⊆ GT の検査 ---
  const missing = [...A.keys()].filter(m => !GT.has(m)).sort();

  // 「Aにあるが GTにない」の大半は go list の不具合ではなく、linux/amd64 という
  // ビルド文脈での**正しい**除外である。解釈を誤らないよう理由を分類する。
  //   platform     : OS/ARCH 制約で除外（例 //go:build windows, foo_darwin.go）
  //   ignore       : //go:build ignore（単体実行のジェネレータ等）
  //   tools        : tools.go パターン（ツール依存を go.mod に固定する慣用手法）
  //   other_tag    : 上記以外のカスタムタグで除外
  //   unconstrained: 除外されていないのに GT に無い ★本当に調べるべき候補
  // platform / cgo の判定は **go/build の MatchFile 再評価**（scanner の otherPlat/cgoOff）で行う。
  // 文字列マッチではないので "!linux" "darwin || freebsd" "unix" "arm64" 等も正しく拾え、
  // タグ名の綴りに起因する誤分類が原理的に起きない。
  // ignore / tools だけは「どの GOOS/GOARCH でも false」だった残りに対して制約テキストで見る。
  const classify = occ => {
    if (occ.some(o => o.linuxOK !== false)) return 'unconstrained';   // 除外されていない
    if (occ.some(o => o.otherPlat)) return 'platform';               // 他OS/ARCHでなら含まれる
    if (occ.some(o => o.cgoOff)) return 'cgo';                       // cgo無効なら含まれる
    const cons = occ.map(o => o.cons || '').join(' ');
    if (/(^|[^a-zA-Z0-9])ignore([^a-zA-Z0-9]|$)/.test(cons)) return 'ignore';
    if (/(^|[^a-zA-Z0-9])tools([^a-zA-Z0-9]|$)/.test(cons) ||
        occ.some(o => /(^|\/)tools\.go$/.test(o.file))) return 'tools';
    return 'other_tag';
  };
  const reasonOf = {};
  for (const m of missing) {
    reasonOf[m] = classify(A.get(m));
    for (const o of A.get(m))
      missRows.push([name, m, o.path, o.file, o.line, o.build ? 'yes' : 'no',
        JSON.stringify(o.cons || ''), o.linuxOK === false ? 'no' : 'yes',
        reasonOf[m], o.inReq ? 'yes' : 'no', o.replaced ? 'yes' : 'no'].join(','));
    reasonCount[reasonOf[m]] = (reasonCount[reasonOf[m]] || 0) + 1;
  }

  const nMissBuild = missing.filter(m => A.get(m).every(o => o.build)).length;

  // ★ 検証力の指標（修正版）: 「linux/amd64 で除外されるファイルからのみ import される外部モジュール」の数。
  //    ファイルが存在するだけでは不十分（そのファイルの import が標準ライブラリだけなら取りこぼしは起こり得ない）。
  //    この数が0なら、どれだけ制約付きファイルがあっても取りこぼしを検出する機会は0＝検証力0。
  const riskMods = [...A.keys()].filter(m => A.get(m).every(o => o.linuxOK === false));
  const cFiles = new Set(), nlFiles = new Set();
  for (const im of imps) { if (im.build) cFiles.add(im.file); if (im.linuxOK === false) nlFiles.add(im.file); }

  sumRows.push([name, sha.slice(0, 10), A.size, GT.size, missing.length, nMissBuild,
    cFiles.size, nlFiles.size, riskMods.length, gtErrLines, riskMods.join(' '), missing.join(' ')].join(','));
  console.error(`A=${A.size} GT=${GT.size} 取りこぼし=${missing.length}${gtErrLines?' [golist-err:'+gtErrLines+']':''} 非linuxファイル=${nlFiles.size} **危険モジュール=${riskMods.length}**${riskMods.length ? '(' + riskMods.slice(0, 2).join(',') + ')' : ''}${missing.length ? ' -> MISS:' + missing.slice(0,3).map(m=>m+'['+reasonOf[m]+']').join(', ') : ''}`);

  fs.rmSync(work, { recursive: true, force: true });
}

fs.writeFileSync(`${OUT}/missing_${N}.csv`,
  'repo,module_path,import_path,file,line,build_constrained,constraint,included_on_linux,reason,in_require,replaced\n' + missRows.join('\n') + '\n');
fs.writeFileSync(`${OUT}/summary_${N}.csv`,
  'repo,commit,n_setA,n_GT,n_missing,n_missing_all_build_constrained,n_constrained_files,n_nonlinux_files,n_risk_modules,n_golist_stderr_lines,risk_modules,missing_modules\n' + sumRows.join('\n') + '\n');
fs.writeFileSync(`${OUT}/skipped_${N}.csv`, 'repo,reason\n' + skips.join('\n') + (skips.length ? '\n' : ''));

// 実行環境と検証力の記録（結論の強さを左右するため必須）
const gov = sh(`${GOBIN}/go version`, { env: { ...process.env, GOTOOLCHAIN: 'local' } }).trim();
const col = i => sumRows.map(r => r.split(','));
const nRepoNL = col().filter(c => +c[7] > 0).length;
const nRepoRisk = col().filter(c => +c[8] > 0).length;
const totRisk = col().reduce((s, c) => s + (+c[8] || 0), 0);
const meta = [
  `有効N=${sumRows.length} (目標${N}) seed=${SEED} 母集団=OK且つSHA記録あり(${okRepos.length})`,
  `SKIP=${skips.length}件（seed順で繰り上げ補充済み。内訳は skipped_${N}.csv）`,
  `go=${gov} / GOTOOLCHAIN=local / GOOS=linux GOARCH=amd64`,
  `コミット固定=manifest.csv の計測時SHA（HEADではない）`,
  ``,
  `【結果】取りこぼし候補の総数 = ${missRows.length}`,
  ``,
  `【検証力】この指標が小さいほど「たまたま踏まなかっただけ」の疑いが残る`,
  `  linux/amd64で除外されるファイルを持つリポジトリ = ${nRepoNL}`,
  `  ★危険モジュール(除外ファイルからのみimportされる外部モジュール)を持つリポジトリ = ${nRepoRisk}`,
  `  ★危険モジュールの総数 = ${totRisk}   ← 0なら検証力0。層別サンプリングが必要`,
  ``,
  `【missing の理由内訳】※ platform/ignore/tools は go list の不具合ではなく`,
  `  linux/amd64 というビルド文脈での正しい除外。unconstrained/other_tag のみが要調査。`,
  ...Object.entries(reasonCount).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`  ${k} = ${v} モジュール`),
  `  （合計 ${Object.values(reasonCount).reduce((a,b)=>a+b,0)} モジュール / 出現 ${missRows.length} 行）`,
  ``,
  `【go list のロードエラー】unconstrained は go list の不具合ではなく入力側の破損の可能性がある`,
  `  ※ "go: downloading" 等の進捗行は除外し、本物のエラー行のみを数えている`,
  `  本物のエラーが出たリポジトリ = ${col().filter(c => +c[9] > 0).length} / ${sumRows.length}（詳細 golist_stderr_${N}.log）`,
  ...Object.entries(errKind).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`    ${k} = ${v} 行`),
  `  ※ build_constraints_exclude_all はパッケージごと go list から消えるため、`,
  `     配下の import は A に入るが GT に入らない = 本検証の検出対象そのもの`,
].join('\n');
fs.writeFileSync(`${OUT}/meta_${N}.txt`, meta + '\n');
console.error(`\n${meta}`);
console.error(`\n[written] ${OUT}/{missing,summary,skipped}_${N}.csv (取りこぼし${missRows.length}行), meta_${N}.txt`);
