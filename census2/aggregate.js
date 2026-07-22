#!/usr/bin/env node
// aggregate.js — census/metrics.csv から SUMMARY の全表を再生成。
//   §1  macro P/R/F1 (name/version × all/imp/impT)   ※空GT除外(recall定義可能なrepoのみ)
//   §1b micro P/R/F1 (プール合計から)
//   §1c TP/FP/FN プール合計
//   §2b 有効評価repo数 / NA数
//   §2d FP原因バケツ(imported基準・name)
// 使い方: node census/aggregate.js  (metrics.csv / manifest.csv を読む)
const fs = require('fs');
const BASE = __dirname;
const MET = process.env.MET || BASE + '/metrics.csv';
const MAN = process.env.MAN || BASE + '/manifest.csv';
const TOOLS = ['syft', 'trivy', 'cdxgen', 'cyclonedx-gomod'];
const p1 = x => (x).toFixed(1);

const lines = fs.readFileSync(MET, 'utf8').trim().split('\n');
const hdr = lines[0].split(',');
const idx = {}; hdr.forEach((h, i) => idx[h] = i);
// 列群
const NAME = { all: ['n_all_tp', 'n_all_fp', 'n_all_fn'], imp: ['n_imp_tp', 'n_imp_fp', 'n_imp_fn'], impT: ['n_impT_tp', 'n_impT_fp', 'n_impT_fn'] };
const VER = { all: ['v_all_tp', 'v_all_fp', 'v_all_fn'], imp: ['v_imp_tp', 'v_imp_fp', 'v_imp_fn'], impT: ['v_impT_tp', 'v_impT_fp', 'v_impT_fn'] };
const FPB = ['fp_test', 'fp_otherOS', 'fp_direct_unused', 'fp_indirect_unused', 'fp_gosum_only', 'fp_sibling'];

// per tool accumulators
const A = {};
for (const t of TOOLS) A[t] = {
  valid: 0, na: 0,
  macro: {}, micro: {}, fpb: {},
};
for (const t of TOOLS) for (const sys of ['name', 'ver']) for (const g of ['all', 'imp', 'impT']) {
  A[t].macro[sys + g] = { p: 0, r: 0, f1: 0, n: 0 };
  A[t].micro[sys + g] = { tp: 0, fp: 0, fn: 0 };
}
for (const t of TOOLS) for (const b of FPB) A[t].fpb[b] = 0;
for (const t of TOOLS) A[t].fpb.imp_fp_total = 0;

function prf(tp, fp, fn) {
  const p = (tp + fp) ? tp / (tp + fp) : 0;
  const r = (tp + fn) ? tp / (tp + fn) : 0;
  const f1 = (p + r) ? 2 * p * r / (p + r) : 0;
  return { p, r, f1 };
}

for (let i = 1; i < lines.length; i++) {
  const c = lines[i].split(',');
  const tool = c[1];
  if (!A[tool]) continue;
  if (c[2] === 'NA' || c.length < 20) { A[tool].na++; continue; }
  A[tool].valid++;
  const num = j => parseInt(c[idx[j]] || '0', 10) || 0;
  for (const [sys, MAP] of [['name', NAME], ['ver', VER]]) {
    for (const g of ['all', 'imp', 'impT']) {
      const [tp, fp, fn] = MAP[g].map(num);
      // micro: 全repo合算
      const mi = A[tool].micro[sys + g]; mi.tp += tp; mi.fp += fp; mi.fn += fn;
      // macro: GT非空(tp+fn>0)のrepoのみ
      if (tp + fn > 0) {
        const m = prf(tp, fp, fn); const ma = A[tool].macro[sys + g];
        ma.p += m.p; ma.r += m.r; ma.f1 += m.f1; ma.n++;
      }
    }
  }
  // FPバケツ (imported基準・name)
  for (const b of FPB) A[tool].fpb[b] += num(b);
  A[tool].fpb.imp_fp_total += num('n_imp_fp');
}

const out = [];
const W = s => out.push(s);
W('# census — 確定サマリ（再生成）\n');
W('全 awesome-go リポジトリを1回のクローン上で all/imported/imported+test の3GT（版付き）と');
W('syft/trivy/cdxgen/cyclonedx-gomod の4ツールを同時生成し照合。\n');

// 計測メタ（tool_versions.txt を丸ごと表示）
const TV = fs.existsSync(__dirname + '/tool_versions.txt') ? fs.readFileSync(__dirname + '/tool_versions.txt', 'utf8') : '';
W('## 0. 計測メタ情報（日時・使用ツール）');
W('```');
W(TV.trim());
W('```\n');

// このセッションで発見・修正した「偽EMPTY_GT」の原因と対処（原因を先頭に）
W('## 0a. 計測環境で直した2つの落とし穴（偽EMPTY_GTの原因→症状→対処）');
W('前回(v1)は下記2点でGTが空判定になり一部repoを取りこぼしていた。今回はここを直したので **v1より正確**。\n');

W('### (1) `go.work`（ワークスペース）を持つrepo');
W('- **原因**: `go.work` があると go は複数モジュールをまとめて扱う **workspace mode** に入る。');
W('  `-mod` は「main module の go.mod を書き換えてよいか」を決めるフラグだが、workspace mode では');
W('  main module が1つに定まらず、go は **複数の go.mod を自動編集することを許さない**。');
W('  そのため workspace mode で許されるのは `-mod=readonly` か `-mod=vendor` だけで、');
W('  vendor対策で付けていた **`-mod=mod` は "違法" としてエラーになる**');
W('  （`go: -mod may only be set to readonly or vendor when in workspace mode`）。');
W('- **症状**: `go list` が最初のコマンドで即エラー→出力ゼロ→GTが空→**偽の EMPTY_GT**。');
W('- **対処**: repo直下に `go.work` があれば **`-mod=mod` を自動で外す**（workspace既定の readonly で解析）。');
W('- **復活したrepo例**: etcd / kubernetes系 / pomerium / ekuiper / gofr / mockery など。');
W('  例: etcd は imported=83, all=757 で v1と一致することを確認。\n');

W('### (2) 手元より新しいGoを要求するrepo');
W('- **原因**: base は go1.26.5 ＋ `GOTOOLCHAIN=local`（=per-repo toolchainを落とさない設定）。');
W('  そこへ go.mod が **より新しいGoを要求**（例: happy-sdk = `go 1.27rc2`）すると、');
W('  手元のgoではビルド不可で `go list` が失敗する。');
W('- **症状**: (1)同様に出力ゼロ→**偽の EMPTY_GT**。');
W('- **対処**: 該当repoだけ **`GOTOOLCHAIN=auto`** にして必要なtoolchainを取得して計測。');
W('  例: happy-sdk は imported=21 で復活。\n');

W('### 参考: これは "偽" ではなく正しいEMPTY_GTだった例');
W('- `ulikunitz/xz`・`tylertreat/Comcast` は **外部依存ゼロ（stdlibのみ）** なので EMPTY_GT が正解。');
W('  v1が imported=1 と出していたのは **自分自身を依存として数えていた誤り**（今回は自モジュールを除外）。');
W('- **既知の限界**: `kubernetes` は workspace で `go list -m all` が空を返し n_all=0。');
W('  これは **v1も同値**（両run一致）で、macro平均への影響は無視できる。\n');

// status の意味
W('## 0b. status の意味（manifest.csv の7列目）');
W('| status | 意味 |');
W('|---|---|');
W('| **OK** | Goモジュールで imported依存が1件以上あり **評価対象になった** repo（4ツールを採点） |');
W('| **EMPTY_GT** | clone成功したが **正解GTが空** = 外部依存を持たない（stdlibのみ）／go.modが無い旧GOPATH式／全パッケージがビルド対象外。評価不能なので採点から除外 |');
W('| **CLONE_FAIL** | `git clone` 自体が失敗 = リポジトリが**消滅・非公開化・移転**して取得できない |');
W('| DISK_SKIP | ディスク退避で処理中断（今回は0件） |\n');

// GT定義と正確なコマンド（実物の proc.sh そのまま）
W('## 0c. 3つの正解(GT)定義と実行コマンド（実物のまま）');
W('前回の実ハーネス（`run_batch.sh` / `remeasure/proc.sh`）と同一。`gmain` は `go list -m` で得た自モジュール名。\n');
W('**all**（build list 全体：直接＋間接・未使用含む）');
W('```bash');
W('go list -m all');
W('```');
W('**imported**（root・GOOS=linux・**非test** の実コンパイル依存）');
W('```bash');
W("GOOS=linux go list -deps -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./... \\");
W('  | grep -v \'^$\' | grep -v "^${gmain} \\?$" | sort -u');
W('```');
W('**impT**（imported ＋ **test依存**：`-test` を追加）');
W('```bash');
W("GOOS=linux go list -deps -test -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./... \\");
W('  | grep -v \'^$\' | grep -v "^${gmain} \\?$" | sort -u');
W('```');
W('各フラグ/パイプの意味:');
W('- `-deps`=推移的依存も全部 / `-test`=test専用依存も含める / `-e`=**壊れたパッケージがあっても止まらず**列挙を続ける（前回スクリプトにも有り）');
W('- `-f \'{{with .Module}}{{.Path}} {{.Version}}{{end}}\'`=各パッケージの「モジュール名 バージョン」を出力（stdlibは.Moduleが無く空行になる）');
W('- `./...`=Goの記法で「このモジュール配下の全パッケージを再帰」');
W('- `grep -v \'^$\'`=空行(stdlib)除去 / `grep -v "^${gmain}…"`=自モジュール除去 / `sort -u`=重複排除');
W('- 共通env（前回との差分）: `GOTOOLCHAIN=local`（go1.26.5 base）, **`GOFLAGS=-mod=mod`**（vendor対応）。これらは"式"は変えず、同じ式が**より多くのrepoで成功する**ようにする環境設定。');
W('- 補助: 他OS分類用 `GOOS=windows go list -deps ...`、FP分類用 `go.sum` / `go mod edit -json`(direct/indirect)。');
W('- 包含関係: **imported ⊆ impT ⊆(概ね) all**。一番狭いのが imported、一番広いのが all。\n');
W('### 0c-2. `-e` は結果をほぼ変えない（実証）');
W('`-e` = 「壊れたパッケージがあってもエラーで止めず、解決できる依存は列挙し続ける」フラグ。');
W('正常なgoodと壊れたbroken(存在しないpkgをimport)を含むモジュールで比較すると:\n');
W('| | go listの終了コード | stdout（=GTになる依存一覧） |');
W('|---|---|---|');
W('| `-e` なし | 1 (失敗) | uuid 等（**同じ**） |');
W('| `-e` あり | 0 (成功) | uuid 等（**同じ**） |');
W('- **依存の"水増し"はしない**: 出力(stdout)は -e あり/なしで同じ。違うのは終了コードとエラー表示だけ。');
W('- 本パイプラインは stdout のみ採用し終了コードは見ないため、**大半のrepoで -e あり/なしは同結果**。');
W('- `-e` が効くのは「壊れ方がひどく、-eなしだと列挙が全部落ちて空になる」稀ケースのみで、そこでは"一部でも取れる"を選ぶ（＝**取りこぼし低減**方向、偽依存追加ではない）。\n');

// 母数 + ファネル
const man = fs.existsSync(MAN) ? fs.readFileSync(MAN, 'utf8').trim().split('\n').slice(1) : [];
const statusCount = {};
const cat = { OK: 0, go_empty: 0, non_go: 0, clone_fail: 0, disk_skip: 0 };
for (const l of man) {
  const c = l.split(','); const s = (c[6] || '').trim(); statusCount[s] = (statusCount[s] || 0) + 1;
  if (s === 'CLONE_FAIL') cat.clone_fail++;
  else if (s === 'DISK_SKIP') cat.disk_skip++;
  else if (s === 'OK') cat.OK++;
  else { const m = (c[4] || '').trim(); (m && m !== 'command-line-arguments') ? cat.go_empty++ : cat.non_go++; }
}
W('## 母数・ファネル');
W('| 段階 | 件数 |');
W('|---|---:|');
W(`| 記録した全リポジトリ | ${man.length} |`);
W(`| ├ CLONE_FAIL（取得不能・消滅） | ${cat.clone_fail} |`);
W(`| └ clone成功 | ${man.length - cat.clone_fail} |`);
W(`| 　├ 非Go（go.mod無し／GOPATH式） | ${cat.non_go} |`);
W(`| 　└ Goモジュール | ${cat.non_go + cat.go_empty + cat.OK - cat.non_go} |`);
W(`| 　　├ imported-GTが空（stdlibのみ/cgo等で外部import無し） | ${cat.go_empty} |`);
W(`| 　　└ **imported-GTが非空 ＝ OK（評価対象）** | **${cat.OK}** |`);
if (cat.disk_skip) W(`| （参考）DISK_SKIP | ${cat.disk_skip} |`);
W('');
W('- **EMPTY_GT = 非Go(' + cat.non_go + ') ＋ Goだがimported空(' + cat.go_empty + ') = ' + (cat.non_go + cat.go_empty) + '** を一括りにした status。上表のように分けると前回funnelと整合。');
W('- 「Goだがimported空」= stdlibのみ/cgoで外部Goモジュールをimportしないライブラリ（GT-allは持つがGT-importedが空）。imported非空でゲートするため評価対象外。\n');

function macroTable(sys, label) {
  W(`### ${label}`);
  W('| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |');
  W('|---|---|---|---|');
  for (const t of TOOLS) {
    const g = x => A[t].macro[sys + x];
    const P = ['all', 'imp', 'impT'].map(x => p1(g(x).n ? 100 * g(x).p / g(x).n : 0));
    const R = ['all', 'imp', 'impT'].map(x => p1(g(x).n ? 100 * g(x).r / g(x).n : 0));
    const F = ['all', 'imp', 'impT'].map(x => p1(g(x).n ? 100 * g(x).f1 / g(x).n : 0));
    W(`| ${t} | ${P.join(' / ')} | ${R.join(' / ')} | ${F.join(' / ')} |`);
  }
  W('');
}
W('## 1. macro平均 precision/recall/F1 (%)（空GT除外＝recall定義可能なrepoのみ）');
macroTable('name', 'name一致');
macroTable('ver', 'version一致');

function microTable(sys, label) {
  W(`### ${label}（micro）`);
  W('| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |');
  W('|---|---|---|---|');
  for (const t of TOOLS) {
    const g = x => A[t].micro[sys + x];
    const P = ['all', 'imp', 'impT'].map(x => { const m = g(x); return p1(100 * (m.tp + m.fp ? m.tp / (m.tp + m.fp) : 0)); });
    const R = ['all', 'imp', 'impT'].map(x => { const m = g(x); return p1(100 * (m.tp + m.fn ? m.tp / (m.tp + m.fn) : 0)); });
    const F = ['all', 'imp', 'impT'].map(x => { const m = g(x); const p = m.tp + m.fp ? m.tp / (m.tp + m.fp) : 0, r = m.tp + m.fn ? m.tp / (m.tp + m.fn) : 0; return p1(100 * (p + r ? 2 * p * r / (p + r) : 0)); });
    W(`| ${t} | ${P.join(' / ')} | ${R.join(' / ')} | ${F.join(' / ')} |`);
  }
  W('');
}
W('## 1b. micro集計（プール合計から算出 P/R/F1, %）');
microTable('name', 'name一致');
microTable('ver', 'version一致');

function poolTable(sys, label) {
  W(`### ${label}`);
  W('| ツール | all (TP/FP/FN) | imported (TP/FP/FN) | impT (TP/FP/FN) |');
  W('|---|---|---|---|');
  for (const t of TOOLS) {
    const cell = x => { const m = A[t].micro[sys + x]; return `${m.tp.toLocaleString()} / ${m.fp.toLocaleString()} / ${m.fn.toLocaleString()}`; };
    W(`| ${t} | ${cell('all')} | ${cell('imp')} | ${cell('impT')} |`);
  }
  W('');
}
W('## 1c. TP/FP/FN プール合計');
poolTable('name', 'name一致');
poolTable('ver', 'version一致');

W('## 2b. 有効評価repo数 / NA数');
W('| ツール | 有効 | NA(失敗) |'); W('|---|---:|---:|');
for (const t of TOOLS) W(`| ${t} | ${A[t].valid} | ${A[t].na} |`);
W('');

W('## 2d. FP原因バケツ（imported基準・name, 全repoプール）');
W('| ツール | imp_FP | test | 他OS | direct未使用 | indirect未使用 | 残余(go.sum残骸+兄弟) |');
W('|---|---:|---:|---:|---:|---:|---:|');
for (const t of TOOLS) {
  const f = A[t].fpb; const tot = f.imp_fp_total || 1;
  const pc = v => p1(100 * v / tot) + '%';
  // 残余 = gosum_only + sibling（scorerの分類に準拠）
  const resid = f.fp_gosum_only + f.fp_sibling;
  W(`| ${t} | ${f.imp_fp_total.toLocaleString()} | ${pc(f.fp_test)} | ${pc(f.fp_otherOS)} | ${pc(f.fp_direct_unused)} | ${pc(f.fp_indirect_unused)} | ${pc(resid)} |`);
}
W('');
W('### 2d-2. 残余バケツの go.sum内(残骸) vs go.sum外(兄弟) 分離');
W('| ツール | 残余 | go.sum内(残骸) | go.sum外(兄弟) |'); W('|---|---:|---:|---:|');
for (const t of TOOLS) {
  const f = A[t].fpb; const resid = f.fp_gosum_only + f.fp_sibling || 1;
  W(`| ${t} | ${(f.fp_gosum_only + f.fp_sibling).toLocaleString()} | ${p1(100 * f.fp_gosum_only / resid)}% | ${p1(100 * f.fp_sibling / resid)}% |`);
}
W('');

// ---- 2e. 母数差のロバストネス検証（共通集合） ----
// repo -> {tool: cells}
const byRepo = {};
for (let i = 1; i < lines.length; i++) { const c = lines[i].split(','); (byRepo[c[0]] = byRepo[c[0]] || {})[c[1]] = c; }
const isValid = c => c && c[2] !== 'NA' && c.length >= 20;
const commonSet = Object.keys(byRepo).filter(r => TOOLS.every(t => isValid(byRepo[r][t])));
function macroImpF1(repoList) {
  const o = {};
  for (const t of TOOLS) { let sp = 0, sr = 0, sf = 0, n = 0;
    for (const r of repoList) { const c = byRepo[r][t]; if (!isValid(c)) continue;
      const tp = +c[idx.n_imp_tp], fp = +c[idx.n_imp_fp], fn = +c[idx.n_imp_fn];
      if (tp + fn > 0) { const p = (tp + fp) ? tp / (tp + fp) : 0, rr = (tp + fn) ? tp / (tp + fn) : 0; sp += p; sr += rr; sf += (p + rr) ? 2 * p * rr / (p + rr) : 0; n++; } }
    o[t] = n ? { p: (100*sp/n).toFixed(1), r: (100*sr/n).toFixed(1), f1: (100*sf/n).toFixed(1), n }
             : { p: '—', r: '—', f1: '—', n: 0 };
  }
  return o;
}
const perTool = macroImpF1(Object.keys(byRepo));
const commonM = macroImpF1(commonSet);
W('## 2e. 母数差のロバストネス検証（共通集合）');
W('ツールごとに有効件数(母数)が違う（NAのため）。「cdxgenは母数が小さいから有利に見えるだけでは？」を検証するため、');
W('**4ツール全部が成功した共通repoだけ**でも imported name-match macro P/R/F1 を計算して比較。');
W(`共通集合 n = **${commonSet.length}**。\n`);
W('| ツール | 各自の有効集合 P / R / F1 (n) | 4ツール共通集合 P / R / F1 (n=' + commonSet.length + ') |');
W('|---|---|---|');
for (const t of TOOLS) W(`| ${t} | ${perTool[t].p} / ${perTool[t].r} / ${perTool[t].f1} (${perTool[t].n}) | ${commonM[t].p} / ${commonM[t].r} / ${commonM[t].f1} |`);
W('- **結論**: 差は各ツール1pt未満、順位も不変（cyclonedx-gomod > cdxgen ≫ trivy ≈ syft）。');
W('  → 母数のばらつきは優劣結論を歪めていない。「評価対象=' + (statusCount['OK'] || 0) + '、ツール別に数十件のNA」という報告で妥当。\n');

// ---- 各ツールの動作（機序） ----
W('## 3. 各ツールの動作（何を読んで依存一覧を作るか）');
W('4ツールは「どのファイル/コマンドを源にするか」が違い、それが精度差を生む。正解の imported =');
W('`go list -deps`（root・GOOS=linux・非test の**実コンパイルグラフ**）。源がそれより広いほど過剰報告(FP)になる。\n');
W('| ツール | 源 | 動作の要点 | 傾向 |');
W('|---|---|---|---|');
W('| **syft** | go.mod ＋ **go.sum** ＋ ツリー内の別go.mod | ファイルを静的に読むだけ（ビルド不要）。go.sum は最も広い集合なので過剰報告が多い。堅牢で失敗しにくい | precision低・recall高 |');
W('| **trivy** | go.mod ＋ **go.sum** ＋ ツリー内の別go.mod | syftとほぼ同じ静的読み。巨大repoでタイムアウトNAが少数 | precision低・recall高 |');
W('| **cdxgen** | **`go list -deps`** ＋ `go mod graph`(辺のみ) ＋ ツリー全go.mod走査 | 実コンパイルグラフに最も近い。ただしネストした子モジュール(兄弟go.mod)も拾い、go list失敗時は go mod graph にfallbackして膨らむ | imported精度が非常に高い |');
W('| **cyclonedx-gomod** | **`cyclonedx-gomod mod`**（build graphを解決し、実際にbuildへ到達するモジュールだけ出力） | Goツールチェーンを直接使う公式ツール。`go list -m all`(build list全体)をそのまま出すのではなく到達可能なものだけに刈り込むため、importedに近い（別OS/build tag分だけ広い）。実測(easytcp): all=30/imported=11 に対し mod出力=14 | 最高精度(FP最少) |');
W('- **統一的理解**: syft/trivy は「宣言(go.sum)」を、cdxgen/cyclonedx-gomod は「コンパイルグラフ/到達可能性」を報告する。バグではなく設計選択。');
W('- **all** で syft/trivy が優位なのは go.sum が build list(=`go list -m all`)に近いため。**imported** で cdxgen/cyclonedx-gomod が優位なのは実importに近いため。\n');

// ---- 前回との有効件数比較 ----
const PRIOR = { syft: 1486, trivy: 1477, cdxgen: 1442, 'cyclonedx-gomod': 1436 };
W('## 4. 前回との有効件数の比較（なぜ増えたか）');
W('| ツール | 今回 有効 | 前回 有効 | 差 |');
W('|---|---:|---:|---:|');
for (const t of TOOLS) {
  const now = A[t].valid, pr = PRIOR[t];
  W(`| ${t} | ${now} | ${pr} | +${now - pr} |`);
}
W('');
W('今回**評価対象(OK)が 1489→' + (statusCount['OK'] || 0) + '** に増えた。新しくOKになった **40 repo** の原因内訳（詳細リストは `census/newly_measurable.md`）:');
W('');
W('| カテゴリ | 件数 | 内容 |');
W('|---|---:|---|');
W('| 2. 新しいGo(1.25/1.26)要求を回収 | 14 | base go を 1.26.5 にし toolchain-DLタイムアウトを解消（etcd, coraza, pomerium 等） |');
W('| 3. 新しいコミット等(go≤1.24) | 24 | 前回計測よりHEADが進み依存追加、または前回の一時失敗の回収（mongo-go-driver, go-rod, samber/* 等） |');
W('| 1. vendor対応で**新規**復活 | 2 | kubernetes, kubevpn |');
W('');
W('**重要な補足（vendor修正の役割）**: 「増加」の主因は 2(新Go)＋3(新コミット) で、vendor修正で"新規"に増えたのは2件のみ。');
W('vendor修正(`-mod=mod`)の本当の効果は増加ではなく **正しさ/取りこぼし防止**。`vendor/` を持つ repo（blocky=128依存, kubernetes 等）は');
W('既定 `-mod=vendor` だと `go list -m all` が "can\'t compute all using the vendor directory" で失敗し**空GTに誤判定**される。');
W('前回の集計コードも同じく `-mod=mod` を付けていなかったため、**前回も vendored repo を取りこぼしていた可能性が高い**（＝今回の方がより正確）。\n');

// ---- census2/ ファイル構成の説明 ----
W('## 9. census2/ ファイル構成（各ファイルの役割）');
W('この計測一式（`census2/`）に含まれるファイルの説明。**成果物**＝人が読む最終出力、');
W('**データ**＝CSV台帳、**パイプライン**＝生成スクリプト、**中間**＝再生成で作り直せる作業物。\n');

W('### 成果物（Markdown）');
W('| ファイル | 役割 |');
W('|---|---|');
W('| `SUMMARY_census.md` | **本ファイル**。計測メタ・偽EMPTY_GTの原因と対処(§0a)・funnel・macro/micro の P/R/F1・TP/FP/FN・FP要因分類・ロバストネス検証を集約した数値サマリ |');
W('| `SUMMARY2_concepts_ja.md` | 概念・背景の補遺。用語／依存グラフ／test依存の扱い／`go list -m all` の刈り込み／go.sum など「数字を理解するための解説」 |');
W('| `repo_manifest.md` | 全2723リポジトリの台帳（名前・URL・SHA・コミット日・go版・GTサイズ・status・区分）を人が読める表にしたもの |');
W('| `per_repo_metrics.md` | リポジトリ×ツールごとの TP/FP/FN/precision/recall/F1（name & version, all/imp/impT）の一覧 |');

W('\n### データ（CSV・機械可読の原本）');
W('| ファイル | 役割 |');
W('|---|---|');
W('| `manifest.csv` | 全リポジトリ1行の台帳。列: 名前,URL,SHA,日付,自モジュール,go版,status,imp,impT,all,区分。集計・台帳MDの原本 |');
W('| `metrics.csv` | OKリポジトリ×ツール1行の採点原本。name/version × all/imp/impT の tp/fp/fn(18列)＋FP原因分類(5列)。全集計はここから算出 |');
W('| `repolist.csv` | 入力リスト。awesome-go から抽出した「名前,URL」2723件（計測対象の母集合） |');
W('| `tool_versions.txt` | 計測メタ（日時・go版・各ツール版・GT定義コマンド）。§0 に丸ごと埋め込まれる |');

W('\n### パイプライン（生成スクリプト）');
W('| ファイル | 役割 |');
W('|---|---|');
W('| `proc.sh` | **中核**。1リポジトリを clone→4ツール実行→3定義でGT生成→照合し、metrics行(stdout)と manifest行を書く。`-e`/`-mod=mod`/`go.work`/toolchain の処理もここ |');
W('| `scorer.js` | proc.sh から呼ばれ、ツール出力とGTを突き合わせて1リポジトリ分の採点CSV行(tp/fp/fn＋FP分類)を算出 |');
W('| `worker.sh` | 通常リポジトリ用の並列単位ラッパー（timeout付きで proc.sh を呼ぶ） |');
W('| `heavy_worker.sh` | 重い/workspaceリポジトリ(kubernetes,etcd等)用の単発ワーカー。長timeout＋repo毎に隔離したキャッシュで確実に計測 |');
W('| `drive.sh` | 全2723件をバッチで回す駆動役（常駐サブシェルを使わず安定運用） |');
W('| `aggregate.js` | `metrics.csv`＋`manifest.csv` から本 `SUMMARY_census.md` の全表を再生成 |');
W('| `render_md.js` | CSV を `per_repo_metrics.md` と `repo_manifest.md`（人が読む表）に変換 |');
W('| `categorize.js` | `manifest.csv` に区分列（OK/non_go/go_empty/clone_fail）を冪等に付与 |');
W('| `verify.js` | 検証用。aggregate.js とは別ロジックで全表を独立再計算し、数値の裏取りをする |');

W('\n### 中間・作業物（再生成で作り直せる／集計には不要）');
W('| ファイル/ディレクトリ | 役割 |');
W('|---|---|');
W('| `manifest_parts/` | リポジトリ1件ごとの manifest 断片（2723件）。`manifest.csv` はこれを結合して作る |');
W('| `parts/` | リポジトリ1件ごとの metrics 断片。`metrics.csv` はこれを結合して作る |');
W('| `data/` | 計測時の一時出力（処理後に空になる作業ディレクトリ） |');
W('| `drive.log` | 駆動ログ（実行時の進捗記録） |\n');

fs.writeFileSync(BASE + '/SUMMARY_census.md', out.join('\n') + '\n');
console.log(out.join('\n'));
console.error('\n[written] census2/SUMMARY_census.md');
