# syft はどの機構で SBOM を作るか — 6リポジトリでの実証

「syft/trivy は広く依存を集めるはずなのに、なぜ正解=all に対して recall が低く F1 が 90 に届かないのか」を、
6リポジトリ（cobra/gin/gorm/frp/hugo/ollama）を再クローンし `syft <dir> -o json`（ネイティブ）の
`descriptor`・各パッケージの `foundBy`・`locations` を直接見て突き止めた記録。

## 1. syft の動作機構 → (a) go.mod ファイルのパース（6/6で確定）

候補: (a) go.mod パース / (b) ビルド済みバイナリ解析 / (c) ソースのビルドグラフ解決。

| repo | descriptor | foundBy | locations |
|---|---|---|---|
| cobra/gin/gorm/frp/hugo/ollama（全6） | syft 1.45.0 | **`go-module-file-cataloger`（100%）** | **`go.mod`（100%）** |

→ syft は全パッケージを **go.mod の静的パース**で得ていた。**(b)バイナリでも (c)ビルドグラフ解決でもない**。
ソースツリーに対して syft はバイナリを作らず、import グラフも辿らない。

## 2. 取りこぼしの所在（なぜ recall(all) が低いか）

| repo | syft（go.mod由来） | go.mod require | **go list -m all** | **取りこぼし(allにあるがsyftに無い)** | syft recall(all) 目安 |
|---|---:|---:|---:|---:|---:|
| cobra | 7 | 4 | 6 | 0 | ~100% |
| gin | 41 | 35 | 56 | 16 | ~71% |
| gorm | 30 | 5 | 8 | 2 | ~75% |
| frp | 84 | 72 | 145 | 63 | ~57% |
| hugo | 203 | 185 | 436 | **234** | ~47% |
| ollama | 114 | 95 | 177 | 64 | ~64% |

取りこぼした中身の例: `cloud.google.com/go/...`（多数のサブモジュール）, `golang/protobuf`,
`golang.org/x/mod`, `golang.org/x/tools`, `burntsushi/toml` 等。

### 原因（核心）
- syft が読む **go.mod** ＝ **主モジュールの自前パッケージ＋テストをビルドするのに必要なモジュールだけ**
  （go 1.17+ のモジュールグラフ枝刈り後の require 集合：直接依存＋記録された間接依存）。
- **`go list -m all`** ＝ **MVS で展開した依存グラフ全体**（「依存の依存の…」まで）の完全ビルドリスト。
  go.mod に書かれない**深い推移的モジュール**まで列挙する。
- → syft は go.mod の集合しか出せず、**`go list -m all` だけが持つ深い推移モジュールを構造的に取りこぼす**。
  依存木が深いほど差が拡大（hugo: go.mod 185 → all 436、syft は最大 203 で **234 取りこぼし**＝recall ≈47%）。
- **これが「all 相手だと F1 が約72止まりで90に届かない」真因**。「広く集める」のは go.mod の範囲内の話で、
  `go list -m all` の全グラフには届かない。

### trivy も同系統
trivy は go.mod＋go.sum を静的にパースし `go list -m all` を実行しない。よって同じく深い推移グラフを
取りこぼす（6リポジトリ表で trivy の recall(all)=63.8 と syft 68.9 は同水準）。

## 3. 補足：precision 側（gorm の逆転）
gorm は syft=30 > go_list_all=8。syft の `go-module-file-cataloger` は**サブディレクトリの go.mod
（テスト/ドライバ用の入れ子モジュール）まで再帰的に拾う**ため。これらは主モジュールの `go list -m all`
に無いので all 相手では false positive になる。

## 4. 結論（一文）
> syft/trivy は Go ソースに対して go.mod（trivy は go.sum も）を**静的にパース**して SBOM を作る
> （`foundBy=go-module-file-cataloger`, `locations=go.mod` で実証）。go.mod は枝刈り後の必要モジュール集合であり、
> `go list -m all` が展開する完全な依存グラフの深い推移モジュールを含まないため、正解=all に対する recall が
> 構造的に頭打ちになり、F1 が 90 に届かない。
