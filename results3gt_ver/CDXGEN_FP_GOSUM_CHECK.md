# cdxgen FPの「go.sum由来」主張の検証（membership照合）

スライドp15「cdxgen FPの84%がgo.sum由来」を、実際の go.sum membership で裏づけられるか検証した。
結論：**現状の「84% go.sum由来」は membership で裏づかない。残差バケットは複数機構の寄せ集めだった。**

## 経緯と手法上の落とし穴

1. `resultsAll` に go.sum 情報は**保存されていない**（元バッチの一時生成で消失）。Goプロキシの zip に go.mod/go.sum が含まれるため再取得して照合した。
2. **第1の罠＝バージョン取り違え**：`@latest` の go.sum と突合すると、cdxげン出力(収集時スナップショット)と版がズレて偽の不一致が出る（サンプルで go.sum membership 5.3% という無効値）。
   → cdxgen が**自身の出力で報告しているメインモジュール版**の go.sum と突合するよう修正。

## 修正後の結果（サンプル34 repo, cdxgen FP=1120）

| 区分 | 件数 | 割合 |
|---|---:|---:|
| **root go.sum に実在** | 143 | **12.8%** |
| go.mod require 由来 | 113 | 10.1% |
| root の go.mod/go.sum どちらにも無し | 974 | **87.0%** |

→ root go.sum membership は **12.8%**。スライドの 84% とは大きく食い違う。

## 残差FPの正体＝少なくとも3機構の混在（実例で確認）

### (1) go.sum 残骸（"go.sum由来"が本当に正しいケース）
`Code-Hex/Neo-cowsay`：cdxgen FP 13件が**全て** v2.0.1 の go.sum に実在。
当時のクローンの go.sum に、廃止された対話機能時代の依存（gdamore/tcell, go-fuzzyfinder, pkg/errors, x/crypto…）が残骸として残っており、cdxgen がそれを全部コンポーネント化。
`go list`(GT)はソースの実import 3件だけを返すため、差分が「go.sum残骸FP」になる。→ スライドの主張通り。

### (2) ネストしたサブモジュールの集約（"go.sum由来"ではない）
`99designs/gqlgen`：FP 20件のうち、`github.com/99designs/gqlgen/_examples/large-project-structure/*`
そのもの＋それらの依存（redis/pgx/sqlx/go-chi/zerolog…）。
cdxgen はリポジトリ配下の**全 go.mod（ネストした `_examples/*` 等の別モジュール含む）を集約**しており、
これらは root の go.sum には無い（各サブモジュールの go.sum に在る）。
モノレポで顕著：`aws/aws-sdk-go-v2`(FP22中20)、`GoogleCloudPlatform/gcloud-golang`、`uptrace/bun` など。
- 自リポジトリのサブモジュール**パスそのもの**のFP＝全1489で111件(1.4%)だが、
  その**先の依存**がぶら下がるため実フットプリントはより大きい。

### (3) どちらでも説明できない残り
上記を引いてもなお root go.sum/go.mod に無いFPが残る（モジュールキャッシュ漏れ等の疑い、未確定）。

## 結論・発表への含意

- **「FPの84%がgo.sum由来」は membership 非検証の残差ラベルであり、過剰主張**。実測の root go.sum membership は約13%（サンプル）。
- 残差は **(1)go.sum残骸 / (2)ネストモジュール集約（モノレポ） / (3)不明** の混在。単一機構で語れない。
- 安全な発表設計：
  - **(A) 文言を実態へ**：「go.sum由来」→「root の go.mod(直接/間接)・test・OSで説明できない残差FP」。
  - もしくは **(2)を主機構として前面に**：cdxgen はリポジトリ配下の全モジュール（ネスト含む）を集約するため、モノレポで過剰報告する、という機構説明（gqlgen/aws-sdk-go-v2 が実例）。これは membership 不要で示せる強い知見。
  - 「go.sum残骸」型(Neo-cowsay)は**代表例として併記**できるが、全体の主因と断定はしない。

## 注意（このサンプル分析の限界）
- 版は cdxgen 自身の報告版で近似（収集時の正確な go.sum とは厳密一致しない場合がある）。
- (2)を完全に定量化するにはサブモジュールの go.sum も取得する必要があり、別バッチが要る。
- サンプル34 repo。全1489での厳密値は要バッチ。
