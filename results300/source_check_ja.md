# ソース確認・方法論の裏取り（一次資料＋実データ）

各項目を「実際のコマンド／go公式ヘルプ／実数」で確認した記録。

## A. 各SBOMツールを「どう動かしたか」（run_batch.sh の実コマンド）
すべて **Goプロジェクトのフォルダを対象**に、以下を実行（出典: `run_batch.sh`）:

| 対象 | 実コマンド | 実装言語 |
|---|---|---|
| 正解 all | `go list -m all` | （go公式CLI） |
| 正解 imported | `GOOS=linux go list -deps -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./...` ＋ `grep`(自分除外)＋`sort -u` | （go公式CLI） |
| syft | `syft <folder> -o cyclonedx-json=<out>` | **Go** |
| trivy | `trivy fs <folder> --format cyclonedx --output <out>` | **Go** |
| cdxgen | `cdxgen -t go <folder> -o <out>` | **JavaScript(Node.js)** |
| cyclonedx-gomod | `cyclonedx-gomod mod -json -output <out> <folder>` | **Go** |

- **解析対象の言語＝Go**（リポジトリは全てGoプロジェクト）。
- **GT作成＝go公式ツールチェイン**（`go list`）。プログラミングではなくCLIコマンド。
- **比較・集計スクリプト＝JavaScript(Node.js)**（`compute_metrics.js`, `compute_all.js`, `analyze_fp*.js` 等）。バッチ実行＝bash(`run_batch.sh`)。

## B. 比較方法（どうやって正誤を判定したか）
1. ツール出力(CycloneDX JSON)から **purl が `pkg:golang/` のコンポーネント**だけ抽出 → モジュールパス集合に。
2. 主モジュール自身・標準ライブラリは除外。
3. GT(all または imported)のモジュールパス集合と**集合比較**:
   - TP=両方にある / FP=ツールにあるがGTに無い / FN=GTにあるがツールに無い。
4. Precision=TP/(TP+FP), Recall=TP/(TP+FN), F1=2PR/(P+R)。
5. **name一致（パスのみ）** と **version一致（パス＋バージョン）** の2粒度。

## C. なぜ 2723 → 1489 になったか（実数の内訳）
| 区分 | 件数 |
|---|---:|
| クローン総数 | 2723 |
| (1) 非Go / `go list -m all` が空 | 528 |
| (2) Goだが**外部依存ゼロ**（all=自分のモジュールのみ） | 480 |
| (3) go.modに依存はあるが**本番コードが外部を import せず**（imported空） | 237 |
| **(4) all・imported 両方そろい＝評価対象** | **1478〜1489** |

(1)+(2)+(3)+(4) = 2723。「2195(all非空)→1489(両方)」で落ちた約700件は **(2)依存ゼロ＋(3)実import無し**。

### 証拠（具体例: 1set/gut）
```
go.mod: module github.com/1set/gut / go 1.15   ← require 無し＝依存ゼロ
go list -m all → github.com/1set/gut           ← 自分自身だけ
go list -deps の外部モジュール → []（空）        ← 標準ライブラリのみで動く
```
→ **awesome-go の Goライブラリには「外部依存を1つも使わない」ものが相当数ある**（標準ライブラリ文化）。これが件数減の主因で、欠陥や集計ミスではない。

## D. OS依存（Linux / Windows 等）
- Goは**ビルド制約**で「このファイルは windows のときだけコンパイル」等を指定できる（例: `xxx_windows.go`, `//go:build windows`）。
- **`GOOS`** 環境変数で対象OSを指定。本研究は **`GOOS=linux`** に固定。
- 例: cobra は Windows のコンソール判定に `inconshreveable/mousetrap` を使う → **Windowsでは imported に入り、Linuxでは入らない**（実証済み: `gomod_mode_note_ja.md`）。
- ⇒ imported はターゲットOS依存。本研究は linux 固定で統一（限界として明記）。

## E. imported コマンドの「根拠」と「公式コマンド」の出所（正直な記載）
`go help list`（go公式ヘルプ）で各フラグが文書化されている:
- 「The **-deps** flag causes list to iterate over not just the named packages but also all their dependencies.」（依存も全部辿る）
- 「The **-f** flag specifies an alternate format ... The default output is `{{.ImportPath}}`. The struct ... 」（出力書式。構造体に **.Module** フィールドあり）
- 「The **-m** flag causes list to list **modules** instead of packages.」「`go list -m all` might print: my/main/module / golang.org/x/text v0.3.0 ...」

**正直な整理:**
- `go list -m all` は **go公式に文書化された“ビルドリスト列挙”コマンド**そのもの（go help list に例示あり）。
- `go list -deps -f '{{with .Module}}...{{end}}' ./...` は **go公式フラグ(-deps, -f, .Module, ./...)を組み合わせて私が構成したコマンド**。単一の公式チュートリアルからの“コピー”ではない。
- よって表のラベルは「**公式コマンド**」より「**正解(GT)定義コマンド（go公式フラグで構成）**」が正確（既に修正済み）。

## F. pip freeze について（先輩に確認する件・参考）
- `pip freeze` = Python で**現在インストール済みのパッケージ名＋バージョンを一覧出力**するコマンド（環境のスナップショット）。
- 先行研究 Yu et al. は Python の GT を `pip install` のドライランで作った（≒インストールされる解決済み依存＝all相当）。
- Go には pip freeze の直接対応は無く、`go list -m all`（ビルドリスト）や go.mod/go.sum がその役割。
- ⇒ 先輩には「Pei さんの Python/uv では GT をどう作ったか（pip freeze か pip install か uv か）」を確認すると、Go側(本研究)との対応が整理できる。
