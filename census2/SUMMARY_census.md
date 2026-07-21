# census — 確定サマリ（再生成）

全 awesome-go リポジトリを1回のクローン上で all/imported/imported+test の3GT（版付き）と
syft/trivy/cdxgen/cyclonedx-gomod の4ツールを同時生成し照合。

## 0. 計測メタ情報（日時・使用ツール）
```
captured : 2026-07-20T11:13:12Z 〜 2026-07-21T05:11Z (UTC)
go(base) : go1.26.5
  GOTOOLCHAIN = local  （新しいGoを要求するrepoのみ auto でtoolchain取得）
  GOFLAGS     = -mod=mod  （go.work を持つrepoでは自動で解除）
tools    :
  syft            v1.46.0
  trivy           v0.72.0
  cdxgen          12.7.1
  cyclonedx-gomod v1.10.0
GT定義   :
  all      = go list -m -e all
  imported = GOOS=linux go list -deps -e   （非test）
  impT     = imported + -test              （test依存を追加）
```

## 0a. 計測環境で直した2つの落とし穴（偽EMPTY_GTの原因→症状→対処）
前回(v1)は下記2点でGTが空判定になり一部repoを取りこぼしていた。今回はここを直したので **v1より正確**。

### (1) `go.work`（ワークスペース）を持つrepo
- **原因**: `go.work` があると go は複数モジュールをまとめて扱う **workspace mode** に入る。
  `-mod` は「main module の go.mod を書き換えてよいか」を決めるフラグだが、workspace mode では
  main module が1つに定まらず、go は **複数の go.mod を自動編集することを許さない**。
  そのため workspace mode で許されるのは `-mod=readonly` か `-mod=vendor` だけで、
  vendor対策で付けていた **`-mod=mod` は "違法" としてエラーになる**
  （`go: -mod may only be set to readonly or vendor when in workspace mode`）。
- **症状**: `go list` が最初のコマンドで即エラー→出力ゼロ→GTが空→**偽の EMPTY_GT**。
- **対処**: repo直下に `go.work` があれば **`-mod=mod` を自動で外す**（workspace既定の readonly で解析）。
- **復活したrepo例**: etcd / kubernetes系 / pomerium / ekuiper / gofr / mockery など。
  例: etcd は imported=83, all=757 で v1と一致することを確認。

### (2) 手元より新しいGoを要求するrepo
- **原因**: base は go1.26.5 ＋ `GOTOOLCHAIN=local`（=per-repo toolchainを落とさない設定）。
  そこへ go.mod が **より新しいGoを要求**（例: happy-sdk = `go 1.27rc2`）すると、
  手元のgoではビルド不可で `go list` が失敗する。
- **症状**: (1)同様に出力ゼロ→**偽の EMPTY_GT**。
- **対処**: 該当repoだけ **`GOTOOLCHAIN=auto`** にして必要なtoolchainを取得して計測。
  例: happy-sdk は imported=21 で復活。

### 参考: これは "偽" ではなく正しいEMPTY_GTだった例
- `ulikunitz/xz`・`tylertreat/Comcast` は **外部依存ゼロ（stdlibのみ）** なので EMPTY_GT が正解。
  v1が imported=1 と出していたのは **自分自身を依存として数えていた誤り**（今回は自モジュールを除外）。
- **既知の限界**: `kubernetes` は workspace で `go list -m all` が空を返し n_all=0。
  これは **v1も同値**（両run一致）で、macro平均への影響は無視できる。

## 0b. status の意味（manifest.csv の7列目）
| status | 意味 |
|---|---|
| **OK** | Goモジュールで imported依存が1件以上あり **評価対象になった** repo（4ツールを採点） |
| **EMPTY_GT** | clone成功したが **正解GTが空** = 外部依存を持たない（stdlibのみ）／go.modが無い旧GOPATH式／全パッケージがビルド対象外。評価不能なので採点から除外 |
| **CLONE_FAIL** | `git clone` 自体が失敗 = リポジトリが**消滅・非公開化・移転**して取得できない |
| DISK_SKIP | ディスク退避で処理中断（今回は0件） |

## 0c. 3つの正解(GT)定義と実行コマンド（実物のまま）
前回の実ハーネス（`run_batch.sh` / `remeasure/proc.sh`）と同一。`gmain` は `go list -m` で得た自モジュール名。

**all**（build list 全体：直接＋間接・未使用含む）
```bash
go list -m all
```
**imported**（root・GOOS=linux・**非test** の実コンパイル依存）
```bash
GOOS=linux go list -deps -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./... \
  | grep -v '^$' | grep -v "^${gmain} \?$" | sort -u
```
**impT**（imported ＋ **test依存**：`-test` を追加）
```bash
GOOS=linux go list -deps -test -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./... \
  | grep -v '^$' | grep -v "^${gmain} \?$" | sort -u
```
各フラグ/パイプの意味:
- `-deps`=推移的依存も全部 / `-test`=test専用依存も含める / `-e`=**壊れたパッケージがあっても止まらず**列挙を続ける（前回スクリプトにも有り）
- `-f '{{with .Module}}{{.Path}} {{.Version}}{{end}}'`=各パッケージの「モジュール名 バージョン」を出力（stdlibは.Moduleが無く空行になる）
- `./...`=Goの記法で「このモジュール配下の全パッケージを再帰」
- `grep -v '^$'`=空行(stdlib)除去 / `grep -v "^${gmain}…"`=自モジュール除去 / `sort -u`=重複排除
- 共通env（前回との差分）: `GOTOOLCHAIN=local`（go1.26.5 base）, **`GOFLAGS=-mod=mod`**（vendor対応）。これらは"式"は変えず、同じ式が**より多くのrepoで成功する**ようにする環境設定。
- 補助: 他OS分類用 `GOOS=windows go list -deps ...`、FP分類用 `go.sum` / `go mod edit -json`(direct/indirect)。
- 包含関係: **imported ⊆ impT ⊆(概ね) all**。一番狭いのが imported、一番広いのが all。

### 0c-2. `-e` は結果をほぼ変えない（実証）
`-e` = 「壊れたパッケージがあってもエラーで止めず、解決できる依存は列挙し続ける」フラグ。
正常なgoodと壊れたbroken(存在しないpkgをimport)を含むモジュールで比較すると:

| | go listの終了コード | stdout（=GTになる依存一覧） |
|---|---|---|
| `-e` なし | 1 (失敗) | uuid 等（**同じ**） |
| `-e` あり | 0 (成功) | uuid 等（**同じ**） |
- **依存の"水増し"はしない**: 出力(stdout)は -e あり/なしで同じ。違うのは終了コードとエラー表示だけ。
- 本パイプラインは stdout のみ採用し終了コードは見ないため、**大半のrepoで -e あり/なしは同結果**。
- `-e` が効くのは「壊れ方がひどく、-eなしだと列挙が全部落ちて空になる」稀ケースのみで、そこでは"一部でも取れる"を選ぶ（＝**取りこぼし低減**方向、偽依存追加ではない）。

## 母数・ファネル
| 段階 | 件数 |
|---|---:|
| 記録した全リポジトリ | 2723 |
| ├ CLONE_FAIL（取得不能・消滅） | 13 |
| └ clone成功 | 2710 |
| 　├ 非Go（go.mod無し／GOPATH式） | 505 |
| 　└ Goモジュール | 2205 |
| 　　├ imported-GTが空（stdlibのみ/cgo等で外部import無し） | 677 |
| 　　└ **imported-GTが非空 ＝ OK（評価対象）** | **1528** |

- **EMPTY_GT = 非Go(505) ＋ Goだがimported空(677) = 1182** を一括りにした status。上表のように分けると前回funnelと整合。
- 「Goだがimported空」= stdlibのみ/cgoで外部Goモジュールをimportしないライブラリ（GT-allは持つがGT-importedが空）。imported非空でゲートするため評価対象外。

## 1. macro平均 precision/recall/F1 (%)（空GT除外＝recall定義可能なrepoのみ）
### name一致
| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |
|---|---|---|---|
| syft | 92.6 / 55.6 / 68.6 | 67.1 / 99.9 / 99.9 | 73.0 / 67.0 / 78.3 |
| trivy | 92.3 / 59.1 / 72.9 | 67.0 / 99.9 / 99.9 | 72.5 / 68.4 / 79.7 |
| cdxgen | 94.5 / 91.4 / 92.2 | 42.4 / 99.8 / 82.4 | 52.8 / 93.2 / 82.3 |
| cyclonedx-gomod | 99.9 / 92.4 / 92.6 | 43.5 / 99.1 / 81.0 | 56.5 / 94.5 / 82.5 |

### version一致
| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |
|---|---|---|---|
| syft | 91.1 / 54.8 / 67.8 | 66.6 / 99.9 / 99.9 | 72.1 / 66.3 / 77.5 |
| trivy | 90.9 / 58.5 / 72.1 | 66.4 / 99.9 / 99.8 | 71.6 / 67.8 / 79.1 |
| cdxgen | 93.5 / 90.8 / 91.6 | 41.9 / 99.7 / 82.3 | 52.2 / 92.7 / 81.8 |
| cyclonedx-gomod | 99.9 / 92.3 / 92.6 | 43.5 / 99.1 / 81.0 | 56.5 / 94.5 / 82.4 |

## 1b. micro集計（プール合計から算出 P/R/F1, %）
### name一致（micro）
| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |
|---|---|---|---|
| syft | 84.9 / 53.0 / 57.5 | 50.0 / 99.8 / 99.8 | 62.9 / 69.2 / 73.0 |
| trivy | 84.4 / 54.4 / 59.2 | 48.1 / 99.8 / 99.8 | 61.3 / 70.4 / 74.3 |
| cdxgen | 88.2 / 82.7 / 83.6 | 33.1 / 99.8 / 92.5 | 48.2 / 90.5 / 87.8 |
| cyclonedx-gomod | 99.8 / 85.6 / 85.7 | 36.0 / 98.9 / 91.1 | 52.9 / 91.8 / 88.3 |

### version一致（micro）
| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |
|---|---|---|---|
| syft | 80.3 / 50.5 / 54.8 | 49.5 / 99.6 / 99.6 | 61.2 / 67.0 / 70.7 |
| trivy | 80.1 / 52.2 / 56.9 | 47.5 / 99.6 / 99.6 | 59.6 / 68.5 / 72.4 |
| cdxgen | 85.2 / 80.6 / 81.3 | 32.8 / 99.7 / 92.3 | 47.4 / 89.1 / 86.5 |
| cyclonedx-gomod | 99.6 / 85.5 / 85.6 | 36.0 / 98.7 / 90.9 | 52.9 / 91.6 / 88.2 |

## 1c. TP/FP/FN プール合計
### name一致
| ツール | all (TP/FP/FN) | imported (TP/FP/FN) | impT (TP/FP/FN) |
|---|---|---|---|
| syft | 76,929 / 13,673 / 77,030 | 47,981 / 42,621 / 120 | 52,136 / 38,466 / 123 |
| trivy | 71,376 / 13,198 / 77,001 | 45,970 / 38,604 / 109 | 50,075 / 34,499 / 112 |
| cdxgen | 47,975 / 6,413 / 96,881 | 45,006 / 9,382 / 77 | 45,442 / 8,946 / 3,705 |
| cyclonedx-gomod | 54,433 / 130 / 96,653 | 46,700 / 7,863 / 526 | 46,776 / 7,787 / 4,578 |

### version一致
| ツール | all (TP/FP/FN) | imported (TP/FP/FN) | impT (TP/FP/FN) |
|---|---|---|---|
| syft | 76,195 / 18,731 / 77,764 | 47,909 / 47,017 / 192 | 52,063 / 42,863 / 196 |
| trivy | 70,470 / 17,460 / 77,907 | 45,897 / 42,033 / 182 | 50,000 / 37,930 / 187 |
| cdxgen | 47,532 / 8,276 / 97,324 | 44,961 / 10,847 / 122 | 45,383 / 10,425 / 3,764 |
| cyclonedx-gomod | 54,359 / 206 / 96,727 | 46,628 / 7,937 / 598 | 46,704 / 7,861 / 4,650 |

## 2b. 有効評価repo数 / NA数
| ツール | 有効 | NA(失敗) |
|---|---:|---:|
| syft | 1519 | 9 |
| trivy | 1509 | 19 |
| cdxgen | 1493 | 35 |
| cyclonedx-gomod | 1501 | 27 |

## 2d. FP原因バケツ（imported基準・name, 全repoプール）
| ツール | imp_FP | test | 他OS | direct未使用 | indirect未使用 | 残余(go.sum残骸+兄弟) |
|---|---:|---:|---:|---:|---:|---:|
| syft | 42,621 | 9.7% | 2.1% | 0.8% | 16.4% | 71.0% |
| trivy | 38,604 | 10.6% | 2.3% | 0.8% | 17.0% | 69.2% |
| cdxgen | 9,382 | 4.6% | 1.6% | 0.9% | 9.6% | 83.3% |
| cyclonedx-gomod | 7,863 | 1.0% | 11.5% | 3.1% | 62.6% | 21.8% |

### 2d-2. 残余バケツの go.sum内(残骸) vs go.sum外(兄弟) 分離
| ツール | 残余 | go.sum内(残骸) | go.sum外(兄弟) |
|---|---:|---:|---:|
| syft | 30,243 | 46.3% | 53.7% |
| trivy | 26,723 | 37.5% | 62.5% |
| cdxgen | 7,815 | 5.5% | 94.5% |
| cyclonedx-gomod | 1,712 | 19.7% | 80.3% |

## 2e. 母数差のロバストネス検証（共通集合）
ツールごとに有効件数(母数)が違う（NAのため）。「cdxgenは母数が小さいから有利に見えるだけでは？」を検証するため、
**4ツール全部が成功した共通repoだけ**でも imported name-match macro-F1 を計算して比較。
共通集合 n = **1467**。

| ツール | 各自の有効集合 F1 (n) | 4ツール共通集合 F1 (n=1467) |
|---|---|---|
| syft | 67.0 (1519) | 67.4 |
| trivy | 68.4 (1509) | 68.8 |
| cdxgen | 93.2 (1493) | 93.3 |
| cyclonedx-gomod | 94.5 (1501) | 94.7 |
- **結論**: 差は各ツール1pt未満、順位も不変（cyclonedx-gomod > cdxgen ≫ trivy ≈ syft）。
  → 母数のばらつきは優劣結論を歪めていない。「評価対象=1528、ツール別に数十件のNA」という報告で妥当。

## 3. 各ツールの動作（何を読んで依存一覧を作るか）
4ツールは「どのファイル/コマンドを源にするか」が違い、それが精度差を生む。正解の imported =
`go list -deps`（root・GOOS=linux・非test の**実コンパイルグラフ**）。源がそれより広いほど過剰報告(FP)になる。

| ツール | 源 | 動作の要点 | 傾向 |
|---|---|---|---|
| **syft** | go.mod ＋ **go.sum** ＋ ツリー内の別go.mod | ファイルを静的に読むだけ（ビルド不要）。go.sum は最も広い集合なので過剰報告が多い。堅牢で失敗しにくい | precision低・recall高 |
| **trivy** | go.mod ＋ **go.sum** ＋ ツリー内の別go.mod | syftとほぼ同じ静的読み。巨大repoでタイムアウトNAが少数 | precision低・recall高 |
| **cdxgen** | **`go list -deps`** ＋ `go mod graph`(辺のみ) ＋ ツリー全go.mod走査 | 実コンパイルグラフに最も近い。ただしネストした子モジュール(兄弟go.mod)も拾い、go list失敗時は go mod graph にfallbackして膨らむ | imported精度が非常に高い |
| **cyclonedx-gomod** | `go list -m all`(build list) を **`go mod why -m -vendor`** で到達可能性フィルタ | Goツールチェーンを直接使う公式ツール。到達可能なモジュールだけ残す。別OS/ビルドタグ分だけ imported より広い | 最高精度(FP最少) |
- **統一的理解**: syft/trivy は「宣言(go.sum)」を、cdxgen/cyclonedx-gomod は「コンパイルグラフ/到達可能性」を報告する。バグではなく設計選択。
- **all** で syft/trivy が優位なのは go.sum が build list(=`go list -m all`)に近いため。**imported** で cdxgen/cyclonedx-gomod が優位なのは実importに近いため。

## 4. 前回との有効件数の比較（なぜ増えたか）
| ツール | 今回 有効 | 前回 有効 | 差 |
|---|---:|---:|---:|
| syft | 1519 | 1486 | +33 |
| trivy | 1509 | 1477 | +32 |
| cdxgen | 1493 | 1442 | +51 |
| cyclonedx-gomod | 1501 | 1436 | +65 |

今回**評価対象(OK)が 1489→1528** に増えた。新しくOKになった **40 repo** の原因内訳（詳細リストは `census/newly_measurable.md`）:

| カテゴリ | 件数 | 内容 |
|---|---:|---|
| 2. 新しいGo(1.25/1.26)要求を回収 | 14 | base go を 1.26.5 にし toolchain-DLタイムアウトを解消（etcd, coraza, pomerium 等） |
| 3. 新しいコミット等(go≤1.24) | 24 | 前回計測よりHEADが進み依存追加、または前回の一時失敗の回収（mongo-go-driver, go-rod, samber/* 等） |
| 1. vendor対応で**新規**復活 | 2 | kubernetes, kubevpn |

**重要な補足（vendor修正の役割）**: 「増加」の主因は 2(新Go)＋3(新コミット) で、vendor修正で"新規"に増えたのは2件のみ。
vendor修正(`-mod=mod`)の本当の効果は増加ではなく **正しさ/取りこぼし防止**。`vendor/` を持つ repo（blocky=128依存, kubernetes 等）は
既定 `-mod=vendor` だと `go list -m all` が "can't compute all using the vendor directory" で失敗し**空GTに誤判定**される。
前回の集計コードも同じく `-mod=mod` を付けていなかったため、**前回も vendored repo を取りこぼしていた可能性が高い**（＝今回の方がより正確）。

## 9. census2/ ファイル構成（各ファイルの役割）
この計測一式（`census2/`）に含まれるファイルの説明。**成果物**＝人が読む最終出力、
**データ**＝CSV台帳、**パイプライン**＝生成スクリプト、**中間**＝再生成で作り直せる作業物。

### 成果物（Markdown）
| ファイル | 役割 |
|---|---|
| `SUMMARY_census.md` | **本ファイル**。計測メタ・偽EMPTY_GTの原因と対処(§0a)・funnel・macro/micro の P/R/F1・TP/FP/FN・FP要因分類・ロバストネス検証を集約した数値サマリ |
| `SUMMARY2_concepts_ja.md` | 概念・背景の補遺。用語／依存グラフ／test依存の扱い／`go list -m all` の刈り込み／go.sum など「数字を理解するための解説」 |
| `repo_manifest.md` | 全2723リポジトリの台帳（名前・URL・SHA・コミット日・go版・GTサイズ・status・区分）を人が読める表にしたもの |
| `per_repo_metrics.md` | リポジトリ×ツールごとの TP/FP/FN/precision/recall/F1（name & version, all/imp/impT）の一覧 |

### データ（CSV・機械可読の原本）
| ファイル | 役割 |
|---|---|
| `manifest.csv` | 全リポジトリ1行の台帳。列: 名前,URL,SHA,日付,自モジュール,go版,status,imp,impT,all,区分。集計・台帳MDの原本 |
| `metrics.csv` | OKリポジトリ×ツール1行の採点原本。name/version × all/imp/impT の tp/fp/fn(18列)＋FP原因分類(5列)。全集計はここから算出 |
| `repolist.csv` | 入力リスト。awesome-go から抽出した「名前,URL」2723件（計測対象の母集合） |
| `tool_versions.txt` | 計測メタ（日時・go版・各ツール版・GT定義コマンド）。§0 に丸ごと埋め込まれる |

### パイプライン（生成スクリプト）
| ファイル | 役割 |
|---|---|
| `proc.sh` | **中核**。1リポジトリを clone→4ツール実行→3定義でGT生成→照合し、metrics行(stdout)と manifest行を書く。`-e`/`-mod=mod`/`go.work`/toolchain の処理もここ |
| `scorer.js` | proc.sh から呼ばれ、ツール出力とGTを突き合わせて1リポジトリ分の採点CSV行(tp/fp/fn＋FP分類)を算出 |
| `worker.sh` | 通常リポジトリ用の並列単位ラッパー（timeout付きで proc.sh を呼ぶ） |
| `heavy_worker.sh` | 重い/workspaceリポジトリ(kubernetes,etcd等)用の単発ワーカー。長timeout＋repo毎に隔離したキャッシュで確実に計測 |
| `drive.sh` | 全2723件をバッチで回す駆動役（常駐サブシェルを使わず安定運用） |
| `aggregate.js` | `metrics.csv`＋`manifest.csv` から本 `SUMMARY_census.md` の全表を再生成 |
| `render_md.js` | CSV を `per_repo_metrics.md` と `repo_manifest.md`（人が読む表）に変換 |
| `categorize.js` | `manifest.csv` に区分列（OK/non_go/go_empty/clone_fail）を冪等に付与 |
| `verify.js` | 検証用。aggregate.js とは別ロジックで全表を独立再計算し、数値の裏取りをする |

### 中間・作業物（再生成で作り直せる／集計には不要）
| ファイル/ディレクトリ | 役割 |
|---|---|
| `manifest_parts/` | リポジトリ1件ごとの manifest 断片（2723件）。`manifest.csv` はこれを結合して作る |
| `parts/` | リポジトリ1件ごとの metrics 断片。`metrics.csv` はこれを結合して作る |
| `data/` | 計測時の一時出力（処理後に空になる作業ディレクトリ） |
| `drive.log` | 駆動ログ（実行時の進捗記録） |

