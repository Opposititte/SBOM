# 教授面談フォローアップ（4点）— データ＋一次資料

## Q2【深掘り指定】all と imported+test の差は「OS依存以外」に何を含むか

6リポジトリ(cobra/gin/frp/hugo他)で `go list -m all` と `imported+test(linux)` の差分を、
さらに各モジュールを GOOS=windows/darwin の imported+test に入るかで分類した。

**結果（4repo、ギャップ総数442モジュール）:**
| 区分 | 数 | 割合 |
|---|---:|---:|
| 他OS専用（win/macではimportされる） | 5 | **1%** |
| 依存ライブラリのテスト用依存 | 15 | 3% |
| **深い推移／ビルドタグ無効／ツール用** | **422** | **95%** |

→ **OS依存はわずか1%**。差の95%は「**`go list -m all` のMVSビルドリストには載るが、実際にはコンパイルされないモジュール**」。具体的には:
- **ビルドタグで無効な代替実装**: 例 gin の `bytedance/sonic`, `cloudwego/base64x`（`-tags=sonic` でしか使われない高速JSON）。
- **依存先のgo.modがMVSのために要求する深い推移モジュール**（バージョン解決には要るが、自分のビルドはそのパッケージをimportしない）。
- **ツール用**: `golang.org/x/tools`, `golang.org/x/mod`（コード生成等。バイナリに入らない）。
- 依存ライブラリ自身のテスト用依存(3%)。

⇒ 教授への回答: 「**all と imported+test の差は、OS依存(1%)ではなく、95%が『宣言/グラフ上は存在するが実際にはコンパイルされない依存』（ビルドタグ無効・深い推移・ツール）**」。

## Q1 Python だと imported は難しいか → **Goより構造的に難しい**

| | Go | Python |
|---|---|---|
| import の性質 | **静的・明示**（コンパイラが解決） | **動的**（条件付き・関数内・`__import__`/`importlib`・try/except ImportError） |
| 実import抽出 | **`go list -deps ./...` で正確・確実** | 静的解析は不確実（pipreqs等はヒューリスティックで漏れる） |
| 名前対応 | import パス＝モジュールほぼ一致 | **PyPI名≠import名**（PyYAML→yaml, beautifulsoup4→bs4）で照合困難 |

→ Python は動的importと名前不一致のため「実際に使う依存(imported)」を確実に取るのが難しい。だから先輩は `freeze`（インストール済み集合＝all相当）を使ったと推測できる。**Goは `go list -deps` があるからこそ imported GT が作れる**＝あなたがGoでやる必然性（先輩がPythonで持てなかったGTをGoで作れる）。
（裏付け: Snyk も実import解析に `go list -json -deps ./...` を使う。docs.snyk.io）

## Q3 test を含める理由（根拠）

- **テスト/開発コードは CI・開発環境で実際に実行される** → test 依存はその環境の**攻撃面**。CI環境はトークン・デプロイ権限を持つため、悪性/脆弱な test 依存が走ると被害が大きい（dependency-chain abuse in CI/CD; Palo Alto）。
- 推移・間接依存経由の侵入は実例多数（Log4Shell は間接依存経由、Mavenの約1/3が深い推移でのみ脆弱; safedep）。
- ⇒ **「本番バイナリだけ守る」なら test 除外(imported)、「CI・開発まで守る」なら test 込み(imported+test)**。どちらが正しいかは技術でなく「何を守るか」で決まる＝**芯Aそのもの**。imported+test は「CI・開発環境まで含む攻撃面」というGTを与える。

## Q4 Go で同じことをやった人はいるか → **見つからない（暫定）**

- **基礎論文 Yu et al. 2024 DSN**（添付PDF）: 9言語7876プロジェクト（Go 2367含む）。ただし **「正解(GT)が無いため差分分析（ツール同士をJaccard比較）」と明記**。**GTなし・実import解析なし・all/imported/test の区別なし**。
- 近年の関連研究（2025–2026）: ツール間整合性やlockfileをGTにするものはあるが、**Go固有の import ベースGT（imported vs declared、all/imported/imported+test）**を扱う論文は、検索では見つからず。Web検索結果も「Go modules の imported vs declared の GT 比較は emerging area。該当論文を特定できず」と回答。
- **正直な限界**: これは簡易Web検索であり網羅的文献調査ではない。Google Scholar / dblp で「SBOM accuracy Go ground truth」「go list deps SBOM evaluation」を自分で確認すべき。ただし**基礎論文がGTを持たないこと自体が最大の差別化点**で、ここは強い。

### 参考URL
- Yu et al. 2024 DSN (添付): https://escholarship.org/uc/item/8606f22r
- Snyk Go (go list -deps): https://docs.snyk.io/supported-languages/supported-languages-list/go
- Adherence gap (2026): https://arxiv.org/pdf/2601.05622
- Reality Check (2025): https://arxiv.org/pdf/2511.20313
- Dependency-chain abuse CI/CD: https://www.paloaltonetworks.com/cyberpedia/dependency-chain-abuse-cicd-sec3
- Transitive deps / Log4Shell: https://safedep.io/sbom-direct-transitive-deps/
