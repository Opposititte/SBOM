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
W('- 包含関係: **imported ⊆ impT ⊆(概ね) all**。\n');

// 母数
const man = fs.existsSync(MAN) ? fs.readFileSync(MAN, 'utf8').trim().split('\n').slice(1) : [];
const statusCount = {};
for (const l of man) { const s = (l.split(',')[6] || '').trim(); statusCount[s] = (statusCount[s] || 0) + 1; }
W('## 母数（manifest.csv, status別）');
W('| status | 件数 |'); W('|---|---:|');
for (const s of Object.keys(statusCount).sort()) W(`| ${s} | ${statusCount[s]} |`);
W(`| **合計(記録repo)** | **${man.length}** |\n`);

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

// ---- 各ツールの動作（機序） ----
W('## 3. 各ツールの動作（何を読んで依存一覧を作るか）');
W('4ツールは「どのファイル/コマンドを源にするか」が違い、それが精度差を生む。正解の imported =');
W('`go list -deps`（root・GOOS=linux・非test の**実コンパイルグラフ**）。源がそれより広いほど過剰報告(FP)になる。\n');
W('| ツール | 源 | 動作の要点 | 傾向 |');
W('|---|---|---|---|');
W('| **syft** | go.mod ＋ **go.sum** ＋ ツリー内の別go.mod | ファイルを静的に読むだけ（ビルド不要）。go.sum は最も広い集合なので過剰報告が多い。堅牢で失敗しにくい | precision低・recall高 |');
W('| **trivy** | go.mod ＋ **go.sum** ＋ ツリー内の別go.mod | syftとほぼ同じ静的読み。巨大repoでタイムアウトNAが少数 | precision低・recall高 |');
W('| **cdxgen** | **`go list -deps`** ＋ `go mod graph`(辺のみ) ＋ ツリー全go.mod走査 | 実コンパイルグラフに最も近い。ただしネストした子モジュール(兄弟go.mod)も拾い、go list失敗時は go mod graph にfallbackして膨らむ | imported精度が非常に高い |');
W('| **cyclonedx-gomod** | `go list -m all`(build list) を **`go mod why -m -vendor`** で到達可能性フィルタ | Goツールチェーンを直接使う公式ツール。到達可能なモジュールだけ残す。別OS/ビルドタグ分だけ imported より広い | 最高精度(FP最少) |');
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

fs.writeFileSync(BASE + '/SUMMARY_census.md', out.join('\n') + '\n');
console.log(out.join('\n'));
console.error('\n[written] census/SUMMARY_census.md');
