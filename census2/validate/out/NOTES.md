# 100件検証の実行記録（2026-07-28）

## 実行状況
seed=42・SHA固定で実行。**有効99件で処理中にジョブが停止**（コンテナ再起動と推定、
15:57時点）。CSVを最後に一括書き込みする設計だったため summary_100.csv /
missing_100.csv は未生成。ヘッドライン数値は run100.log から復元し
`summary_from_log_99.csv` に保存した（ファイル名・行番号の詳細は失われている）。
→ 逐次書き込みに直して再実行すれば詳細も得られる。

## 結果（有効99件 / SKIP 11件）
- **GT再現性: 98/99 一致**。不一致は nikolaydubina__fpmoney のみ
  （計測時 n_imp=0 → 同一SHAでの再生成 1）。計測時に取りこぼしがあった直接証拠。
- **取りこぼし（のべ）18件**。理由内訳（ログ表示は先頭3件までのため下限値）:
  - platform 6 / tools 4 = 正しい除外（linux/amd64 の文脈として妥当）
  - **other_tag 6 = 要調査**
- **検証力: 危険モジュール 23個 / 11リポジトリ**。0ではないので
  「危険条件を踏まずに取りこぼし0」という弱い結論にはならず、層別サンプリングは不要。
- **go list の本物のエラー: 1/99**（進捗行 go: downloading 等は除外して計数）。
  依存解決の失敗はほぼ無い。

## 要調査（other_tag 6件）
- jeffail__leaps: github.com/azure/azure-sdk-for-go（**小文字**。正しくは Azure）,
  github.com/cenkalti/backoff
- hybridgroup__gobot: gocv.io/x/gocv, github.com/hybridgroup/mjpeg, github.com/nsf/termbox-go
- woodpecker-ci__woodpecker: github.com/urfave/cli-docs/v3

## 計測時 stderr について
proc.sh は `2>/dev/null` で stderr を破棄していたため当時のエラー状況は直接遡れないが、
上記の **GT件数 98/99 一致** の方が強い証拠であり、推定に頼る必要はない
（唯一の不一致 fpmoney を除き、計測時のGT生成は再現する）。


---

# 追加調査の結果（3点すべて解決）

## ① 不明だった2件の特定 — 内訳は 18件で閉じた
ログの `-> MISS:` は先頭3件までしか表示しないため、fyne と tinygo の4件目が
集計から漏れていた（前報告の「18件」と内訳16件の差はこれ）。個別に再実行して確定:
- fyne-io__fyne 4件目 = `github.com/hack-pad/go-indexeddb` → **platform**（`//go:build wasm`）
- tinygo-org__tinygo 4件目 = `go.bytecodealliance.org/cm` → **tools**（`//go:build tools`, tools.go）

### 確定した内訳（合計18件、リポジトリ×モジュール）
| 分類 | 件数 | 内訳 |
|---|--:|---|
| platform | 7 | fyne 4（wasm/windows）, hertz 1, goxjs__gl 1（gopherjs）, upterm 1（conpty） |
| tools | 5 | tinygo 4（tools.go）, woodpecker 1（kin-openapi） |
| other_tag | 6 | leaps 2, gobot 3, woodpecker 1 |
| **unconstrained** | **0** | **← go list の不具合の signature。1件も出ていない** |

`unconstrained` = 「そのファイルは linux ビルドに含まれているのに go list が依存を
報告しなかった」を意味し、探していたバグそのもの。**0件**。

## ② other_tag 6件はすべて良性（タグ名まで確認）
実際のソースを取得してビルドタグを確認した結果、6件とも「通常ビルドから意図的に
外すためのタグ」であり、`tools` と同種だった:
- jeffail__leaps 2件（azure-sdk-for-go, cenkalti/backoff）: `// +build AZURE`
  （オプションのストレージバックエンド。lib/store/azure_blob_store.go）
- hybridgroup__gobot 3件: `//go:build example` 2件（examples/）, `//go:build utils` 1件
- woodpecker-ci__woodpecker 1件（urfave/cli-docs/v3）: `//go:build man` / `//go:build generate`
  （man ページ生成用。ライセンスヘッダの後ろにタグがある）

### azure が小文字だった件 — 自分たちの側の不具合ではない
比較処理で大文字小文字を潰している可能性を先に疑い、実ソースを grep して確認した結果、
ソース自体が `"github.com/azure/azure-sdk-for-go/storage"` と**小文字で書いている**
（`Azure` ではない）。比較処理に case-folding は入っていない。

## ③ n_imp=0 のリポジトリは全1,528件中 1件のみ
`status=OK かつ n_imp=0` は **nikolaydubina__fpmoney の1件だけ**。
しかも集計は `tp+fn>0` でゲートしているため、この1件は macro 平均から自動的に
除外されており、**P/R/F1 への影響はゼロ**。系統的な影響はない。

---

# 結論
100件（有効99件）の無作為抽出・SHA固定での検証において:
- **GT-imported の取りこぼしのうち、`go list` の不具合に起因するものは検出されなかった**
  （`unconstrained` = 0件）。18件はすべて platform / tools / 意図的なカスタムタグによる、
  linux/amd64 というビルド文脈での正しい除外だった。
- 検証力は確保されている（危険モジュール 23個 / 11リポジトリ）。
- GT件数は 98/99 で計測時と一致。唯一の不一致 fpmoney も影響ゼロ（上記③）。
- go list の本物のエラーは 1/99 のみ。

## 論文に書ける知見
GT-imported はビルド文脈に依存する定義であり、linux/amd64 で生成したGTからは
プラットフォーム固有の依存・開発ツール依存が**構造的に**除かれる。go.mod/go.sum を
広く読む Syft・Trivy はこれらを報告するため、GT-imported に対して FP として数えられる。
※ FP要因分類（ツール出力を分母とする割合）と本検証（ソースの import を基準とした
GT側の欠落）は基準が異なるため、同じ量として並べず「独立に測った2つが同一の機序を
指している」と記述すること。
