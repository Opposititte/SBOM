# remeasurement-full — census2 の全件再計測と検証

7月に実施した census2 の計測を、**同じ 1,528 リポジトリ・同じ commit SHA・同じツールバージョン**で
やり直したもの。7月の結果（`census2/metrics.csv` 等）には一切書き込まず、出力は `out/` にのみ書く。

7月は tp/fp/fn の**件数しか残していなかった**ため、「Syft が誤検出したモジュールは何か」
「なぜ trivy の件数が1件違うのか」といった問いに答えられなかった。rerun2 は
**モジュール一覧そのもの（TSV）と生SBOM（`raw/`）を保存**して、その穴を埋めることを目的とする。

---

## 結果

**1,528 件中 1,526 件を計測（恒久 SKIP 2 件）**。7月の `scorer.js` をそのまま実行して照合した結果:

| 判定 | 行数 | 割合 | 意味 |
|---|---:|---:|---|
| `match` | 6033 | 98.9% | 7月と完全一致 |
| `july_main_bug` | 24 | 0.4% | 7月が自モジュールを除外できていなかった分（一致しないのが正しい） |
| `july_main_bug_late` | 0 | 0.0% | 走行中に事後追加で救済した分 → **ゼロ** |
| `july_unavailable` | 36 | 0.6% | 7月側の記録が使えず比較不能 |
| `july_tool_na` | 4 | 0.1% | 7月はそのツールが NA、今回は取得できた |
| `cache_sensitive` | 3 | — | module cache を温めると7月を再現する差分 |
| `differ` | 4 | 0.1% | **本物の再現失敗** |

対象 1,526 リポジトリ / 6,104 行（= 4 ツール × repo）。
処理順はシード固定シャッフルで、先頭から 1,528 件すべてが連続処理済みなので、
**この集合はそのまま無作為標本**として使える（`sample.js` で確認できる）。

`july_main_bug_late = 0` は重要。7月の記録だけから事前に立てた予測式が最後まで的中し続け、
**走行中にオラクルを書き換えて救済した件は一度もない**（下記「検証ゲート」参照）。

### 恒久 SKIP 2 件

| repo | 理由 |
|---|---|
| `homedepot__flop` | 7月に commit SHA が記録されていない。HEAD で代用すると7月と別物になり比較の意味がないため SKIP |
| `kcmvp__gob` | リポジトリが非公開化または削除され取得不能（git が認証を要求する状態） |

並列実行時のレート制限で一時的に取得失敗した 12 件は `IGNORE_RETRY_HISTORY=1` で再試行し、
11 件が回復して**すべて7月と一致**した。母集団の穴は上記 2 件のみ。

### 再現できなかった差分 4 件（`out/unexplained_differ.csv`）

すべて調査済み。詳細は `acknowledged_differ.txt` と `cache_effect/README.md`。

- **trivy の −1 パターン 3 件** — `abice__go-enum` / `shenwei356__taxonkit` / `hedhyw__otelinji`
  trivy だけが GT-all の TP をちょうど1件少なく報告する。GT 件数は7月と一致、他3ツールも一致、
  欠けている側は必ず go.sum 由来の推移的依存。go.sum の全モジュールを module cache に入れても
  変化せず、5回実行しても出力集合は同一（md5 一致）。キャッシュ起因でも非決定性でもない。
  **どのモジュールが欠けたかは特定できない**（7月が生SBOMを保存していないため）。
- **syft の +24 1 件** — `cybergarage__go-job`
  追跡の結果、**syft の出力が Go ツールチェーンの有無に依存する**ことが判明した。
  `go` が PATH に無いと 50 件（= go.mod の require 数ちょうど、7月と完全一致）、
  あると 75 件。`cache_effect/README.md` 参照。

---

## 実行環境

`versions.txt` に実測値を記録している。7月（`tool_versions.txt`）と同一バージョン。

```
go1.26.5 linux/amd64   GOTOOLCHAIN=local  GOFLAGS=-mod=mod
GOOS=linux GOARCH=amd64 CGO_ENABLED=1
syft v1.46.0 / trivy v0.72.0 / cdxgen 12.7.1 / cyclonedx-gomod v1.10.0
```

**注意点が3つある。**

1. 4 ツールは GitHub Releases がプロキシで 403 になるため、7月と同じく `go install` で
   ソースからビルドした。そのため syft/trivy はビルドメタが埋まらず `-version` が
   `dev` を返す（7月の記録と同じ状態）。バージョンはバイナリの埋め込みモジュール情報で確認した。
2. **trivy v0.72.0 のビルドには `GOEXPERIMENT=jsonv2` が必要**。go1.26 の
   `encoding/json/v2` を使うため。7月の記録にこの条件は明記されていない。
3. 新しい Go を要求する repo（`go.work` が go >= 1.27rc2 を要求する等）だけ
   `GOTOOLCHAIN=auto` に落として toolchain を取得する。7月の
   `tool_versions.txt` にある「新しいGoを要求するrepoのみ auto でtoolchain取得」に対応する。
   該当 repo は `meta.json` の `toolchain_fallback` で判別できる。

---

## 使い方

```bash
export PATH=/opt/go1265/go/bin:/path/to/tool/bin:$PATH   # GO_BIN / TOOL_BIN でも指定可
node remeasurement-full/rerun2.js 10        # まず10件で試す
./remeasurement-full/supervise2.sh 3        # 3ワーカーで全件（setsid 推奨）
./remeasurement-full/stop2.sh --now         # 全ワーカーをまとめて停止
node remeasurement-full/verify2.js          # 保存物から verify.csv を作り直す（こちらが正本）
node remeasurement-full/sample.js           # 無作為標本だけに限定した集計
```

`supervise2.sh` は **必ず `setsid` で起動する**こと。親プロセスの終了に巻き込まれて
ジョブが繰り返し停止する事故があったため。

```bash
setsid nohup ./remeasurement-full/supervise2.sh 3 > /dev/null 2>&1 < /dev/null &
```

デバッグ用の環境変数:

| 変数 | 用途 |
|---|---|
| `ONLY=repo1,repo2` | 対象を絞る |
| `IGNORE_RETRY_HISTORY=1` | 過去の失敗回数を無視して再挑戦（恒久SKIPの救済） |
| `GO_BIN` / `TOOL_BIN` | Go とツールのバイナリ位置 |

---

## ファイル構成

### スクリプト

| ファイル | 役割 |
|---|---|
| `rerun2.js` | 本体。SHA固定clone → GT 3定義 → 4ツール → TSV保存 → clone削除 |
| `verify_lib.js` | 検証ゲート。**採点は再実装せず 7月の `scorer.js` を実行する** |
| `verify2.js` | 保存物から `verify.csv` / `unexplained_differ.csv` を作り直す（**正本**） |
| `sample.js` | 無作為標本（シャッフル順の先頭連続区間）だけに限定して集計 |
| `cache_effect.js` | module cache 状態の対照実験（cold vs warm） |
| `na_probe.js` | 7月に一部ツールのみ NA だった 53 件がキャッシュ由来かを調べる |
| `supervise2.sh` / `stop2.sh` | 複数ワーカーの起動・再投入と、まとめて停止 |

### 出力（`out/<repo>/`）

| ファイル | 内容 |
|---|---|
| `gt-imported.tsv` | `GOOS=linux go list -deps -e` — 実際に import されるモジュール |
| `gt-imported-test.tsv` | 上記 + `-test` — test 依存を含む |
| `gt-all.tsv` | `go list -m -e all` — モジュールグラフ全体 |
| `syft.tsv` `trivy.tsv` `cdxgen.tsv` `cyclonedx-gomod.tsv` | 各ツールの検出結果 |
| `meta.json` | SHA・実行時刻・各コマンドの終了コード・件数・stderr集計・環境 |
| `raw/*.json.gz` | **各ツールの生SBOM**（CycloneDX JSON、gzip） |
| `raw_warm/*.json.gz` | differ 検出時に module cache を温めて取り直した生SBOM（7 repo 分） |
| `stderr/*.log` | go list / 各ツールの stderr（**切り詰めなし**） |

TSV はすべて **モジュールパス `<TAB>` バージョン の2列**。原文の大文字小文字を保持している。

### 集計ファイル（`out/`）

`summary.csv`（1行1repo）、`verify.csv`（1行1 repo×tool）、`unexplained_differ.csv`、
`skips.csv`（retryable / permanent を区別）、`progress.log`、`run_full.log`。

---

## 設計上の判断

### 照合はモジュールパス単位

tp/fp/fn は**モジュールパス単位**で数える。バージョンは TSV に保存するだけで照合に使わない
（7月と同じ基準。ここを変えると比較できなくなる）。

正規化は `scorer.js` の `norm()` と同じ小文字化を必ず適用する。
**Trivy はモジュールパスを小文字で出力する**ため、これを外すと大量に不一致になる。

### 検証ゲートは pass/fail ではなく「差分の記述」

当初は「7月と一致すること」を合格条件にしていたが、本計測の途中で
**7月の条件は原理的に再現不能**であることが分かった（`GOMODCACHE` を全1,528件で共有していたため
結果が処理順に依存する）。そのためゲートは合否判定ではなく、差分を原因で分類する道具として使う。

`differ` を検出したらその場で `go mod download all` して4ツールを取り直し、
温めた条件で7月が再現するなら `cache_sensitive` と分類してジョブは止めない。
**温め直しても再現しないものだけ**が本物の再現失敗として `unexplained_differ.csv` に残り、
そこで全ワーカーが停止する。

### 既知の7月側の誤りは「予測してから」照合する

不一致の**形**を見て後付けで「既知バグ」と判定すると、同種の repo が他にあった場合に
すべてそこへ吸い込まれて `differ` に上がらなくなる。そこで
**7月の記録だけから対象 repo を先に確定**してから照合する。

判定式: 7月の `gt_all.txt` は `go list -m -e all` の生出力（= `manifest.csv` の `n_all` 行）で
main module 行を必ず含む。一方 scorer が見た GT-all の集合サイズは `all_tp + all_fn`。
その差が 0 なら main が集合に残っていた ＝ `main.txt` が空だった、と判定できる。

この式で **7 件**を事前特定した（`Lifailon__lazyjournal` `antonmedv__fx` `box-cli-maker__box-cli-maker`
`dghubble__sling` `dtgorski__typex` `homedepot__flop` `naughtygopher__errors`）。
4 ツール間で判定が食い違った repo は 0 件。予測が外れる方向は必ず `differ` 側に倒れる。

`n_all = 0` の repo（`kubernetes__kubernetes`）は式が退化するため集合に入れず、
`july_unavailable` として扱う。

事後追加が必要になった場合は `emptymain_extra.txt` に
`<repo> <日時> <差分シグネチャ>` の3列（理由必須）で記録し、判定ラベルも
`july_main_bug_late` と分ける。**本計測では事後追加は 0 件**。

### 再開と SKIP

`out/<repo>/meta.json` があれば処理済みとしてスキップする。`meta.json` は
**成功時と恒久SKIP時のみ**書く。clone/fetch の一時失敗で書いてしまうと再開時に恒久SKIPとなり、
数十件が欠落したまま完走する（実際に踏んだ不具合）。retryable な失敗は
`out/<repo>/` ごと削除して次回再試行させ、3回失敗したら `permanent` に降格する。

### stderr

`2>/dev/null` せず全件保存する。`go: downloading` 等の進捗行と本物のエラーを分けて数え、
`summary.csv` の `golist_real_errors` / `golist_progress_lines` / `error_kinds` に出す。
**本計測では 1,526 件で本物のエラーは計 2 行のみ**（種別 `other`）、進捗行 43 行。

---

## 再現できる範囲・できない範囲

**できる**

- 保存済みの TSV から tp/fp/fn を再計算する（`verify2.js`）
- 生SBOM（`raw/`）から任意の指標を計算し直す
- 記録された SHA で対象リポジトリを取得し、同条件で再計測する

**できない**

- **7月の数値と bit-identical な再現**。7月は `GOMODCACHE` を全1,528件で共有しており、
  結果が処理順に依存する。さらに syft の出力は Go ツールチェーンの有無でも変わる。
  これは本artifactの欠陥ではなく、**測定対象の性質として報告すべき知見**である。
- 7月に欠けたモジュールの特定（7月が生SBOMを保存していないため）。
  rerun2 以降は `raw/` があるので特定可能になる。

`raw/`（93MB）と `stderr/`（19MB）は当初 `.gitignore` にしていたが、
**一時コンテナ上にしか存在せず失われる**ことが分かったため追跡対象に変更した。
公開を想定して認証情報・実行者のホームディレクトリ・ユーザー名を機械検査済み（いずれも検出ゼロ）。

---

## 副産物: 環境依存に関する対照実験

計測の副産物として、SBOM ツールの出力が環境に左右されることを示す対照実験が2本得られた。
詳細と**原稿での書き方の注意**（統計的な過剰主張を避ける方法を含む）は
[`cache_effect/README.md`](cache_effect/README.md) を参照。

1. **module cache 状態** — 変化するのは repo×tool 行の 1.11%（95%CI [0.5, 2.6]）と稀だが、
   温めて増えた 11 モジュールは**すべて GT に含まれる真の依存**で、減ったものは 0 件。
   recall を上げる方向にのみ働く系統的バイアスである。
2. **Go ツールチェーンの有無** — syft の報告モジュール数が 50% 変わる、より大きい環境依存。
