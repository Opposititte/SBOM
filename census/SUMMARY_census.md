# census — 確定サマリ（再生成）

全 awesome-go リポジトリを1回のクローン上で all/imported/imported+test の3GT（版付き）と
syft/trivy/cdxgen/cyclonedx-gomod の4ツールを同時生成し照合。

## 0. 計測メタ情報（日時・使用ツール）
```
# census 計測メタ情報
captured:        2026-07-16T10:28:12Z
measured_period: 2026-07-16 10:30 UTC 〜 2026-07-18 10:33 UTC (UTC, コンテナ再起動を挟み断続実行)

## GT(go list)計算に使った Go
go(base):        go1.26.5   （GOTOOLCHAIN=local, GOFLAGS=-mod=mod）
  ※ 当初 go1.24.7 だったが、go1.25/1.26 要求repoのtoolchain-DLタイムアウト回避のため go1.26.5 をbaseに変更

## 4つのSBOMツール（今回計測に使用）
syft:            v1.46.0   (go install ソースビルド; `syft --version`は"not provided"表示だが実体v1.46.0)
trivy:           v0.72.0   (go install ソースビルド; `trivy --version`は"dev"表示だが実体v0.72.0)
cdxgen:          12.7.1    (npm @cyclonedx/cdxgen, Node.js v22.22.2)
cyclonedx-gomod: v1.10.0   (go install)
```

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

## 母数（manifest.csv, status別）
| status | 件数 |
|---|---:|
| CLONE_FAIL | 13 |
| EMPTY_GT | 1180 |
| OK | 1530 |
| **合計(記録repo)** | **2723** |

## 1. macro平均 precision/recall/F1 (%)（空GT除外＝recall定義可能なrepoのみ）
### name一致
| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |
|---|---|---|---|
| syft | 92.8 / 57.7 / 71.0 | 66.1 / 99.9 / 99.9 | 72.2 / 68.7 / 79.9 |
| trivy | 92.2 / 59.6 / 73.2 | 67.3 / 99.9 / 99.9 | 72.6 / 68.8 / 80.1 |
| cdxgen | 95.2 / 91.9 / 92.9 | 42.2 / 99.8 / 82.7 | 52.8 / 93.6 / 82.9 |
| cyclonedx-gomod | 99.9 / 92.4 / 92.6 | 43.8 / 99.2 / 81.2 | 56.7 / 94.5 / 82.6 |

### version一致
| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |
|---|---|---|---|
| syft | 91.3 / 56.9 / 70.0 | 65.5 / 99.8 / 99.8 | 71.3 / 67.9 / 79.1 |
| trivy | 90.9 / 58.9 / 72.5 | 66.6 / 99.9 / 99.8 | 71.7 / 68.2 / 79.4 |
| cdxgen | 94.1 / 91.2 / 92.1 | 41.7 / 99.7 / 82.6 | 52.2 / 93.1 / 82.4 |
| cyclonedx-gomod | 99.9 / 92.4 / 92.6 | 43.8 / 99.1 / 81.2 | 56.6 / 94.5 / 82.6 |

## 1b. micro集計（プール合計から算出 P/R/F1, %）
### name一致（micro）
| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |
|---|---|---|---|
| syft | 82.2 / 54.1 / 58.7 | 49.5 / 99.7 / 99.8 | 61.8 / 70.1 / 73.9 |
| trivy | 81.7 / 55.5 / 60.3 | 47.8 / 99.8 / 99.8 | 60.3 / 71.3 / 75.2 |
| cdxgen | 84.0 / 83.1 / 84.0 | 32.9 / 99.8 / 92.8 | 47.3 / 90.7 / 88.2 |
| cyclonedx-gomod | 95.9 / 85.1 / 85.2 | 36.1 / 98.9 / 91.1 | 52.5 / 91.5 / 88.1 |

### version一致（micro）
| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |
|---|---|---|---|
| syft | 77.8 / 51.6 / 56.1 | 49.0 / 99.6 / 99.6 | 60.2 / 68.0 / 71.8 |
| trivy | 77.4 / 53.1 / 57.8 | 47.2 / 99.6 / 99.6 | 58.6 / 69.3 / 73.2 |
| cdxgen | 81.1 / 80.9 / 81.8 | 32.6 / 99.7 / 92.7 | 46.5 / 89.4 / 86.9 |
| cyclonedx-gomod | 95.8 / 84.9 / 85.1 | 36.1 / 98.7 / 91.0 | 52.4 / 91.3 / 87.9 |

## 1c. TP/FP/FN プール合計
### name一致
| ツール | all (TP/FP/FN) | imported (TP/FP/FN) | impT (TP/FP/FN) |
|---|---|---|---|
| syft | 73,045 / 15,818 / 74,517 | 48,047 / 40,816 / 121 | 52,197 / 36,666 / 124 |
| trivy | 68,662 / 15,392 / 74,960 | 46,608 / 37,446 / 111 | 50,725 / 33,329 / 114 |
| cdxgen | 45,304 / 8,637 / 92,215 | 44,800 / 9,141 / 77 | 45,307 / 8,634 / 3,495 |
| cyclonedx-gomod | 52,761 / 2,265 / 93,223 | 46,801 / 8,225 / 526 | 46,876 / 8,150 / 4,552 |

### version一致
| ツール | all (TP/FP/FN) | imported (TP/FP/FN) | impT (TP/FP/FN) |
|---|---|---|---|
| syft | 72,338 / 20,598 / 75,224 | 47,976 / 44,960 / 192 | 52,125 / 40,811 / 196 |
| trivy | 67,788 / 19,800 / 75,834 | 46,537 / 41,051 / 182 | 50,652 / 36,936 / 187 |
| cdxgen | 44,870 / 10,425 / 92,649 | 44,754 / 10,541 / 123 | 45,250 / 10,045 / 3,552 |
| cyclonedx-gomod | 52,690 / 2,338 / 93,294 | 46,730 / 8,298 / 597 | 46,805 / 8,223 / 4,623 |

## 2b. 有効評価repo数 / NA数
| ツール | 有効 | NA(失敗) |
|---|---:|---:|
| syft | 1527 | 3 |
| trivy | 1518 | 12 |
| cdxgen | 1476 | 54 |
| cyclonedx-gomod | 1495 | 35 |

## 2d. FP原因バケツ（imported基準・name, 全repoプール）
| ツール | imp_FP | test | 他OS | direct未使用 | indirect未使用 | 残余(go.sum残骸+兄弟) |
|---|---:|---:|---:|---:|---:|---:|
| syft | 40,816 | 10.2% | 2.2% | 0.8% | 17.3% | 69.5% |
| trivy | 37,446 | 11.0% | 2.4% | 0.9% | 18.3% | 67.5% |
| cdxgen | 9,141 | 5.5% | 1.7% | 1.0% | 10.4% | 81.4% |
| cyclonedx-gomod | 8,225 | 0.9% | 11.1% | 3.1% | 64.2% | 20.7% |

### 2d-2. 残余バケツの go.sum内(残骸) vs go.sum外(兄弟) 分離
| ツール | 残余 | go.sum内(残骸) | go.sum外(兄弟) |
|---|---:|---:|---:|
| syft | 28,378 | 45.4% | 54.6% |
| trivy | 25,262 | 38.7% | 61.3% |
| cdxgen | 7,439 | 5.8% | 94.2% |
| cyclonedx-gomod | 1,703 | 19.6% | 80.4% |

## 2e. 母数差のロバストネス検証（共通集合）
ツールごとに有効件数(母数)が違う（NAのため）。「cdxgenは母数が小さいから有利に見えるだけでは？」を検証するため、
**4ツール全部が成功した共通repoだけ**でも imported name-match macro-F1 を計算して比較。
共通集合 n = **1436**。

| ツール | 各自の有効集合 F1 (n) | 4ツール共通集合 F1 (n=1436) |
|---|---|---|
| syft | 68.7 (1527) | 69.2 |
| trivy | 68.8 (1518) | 69.7 |
| cdxgen | 93.6 (1476) | 93.8 |
| cyclonedx-gomod | 94.5 (1495) | 94.7 |
- **結論**: 差は各ツール1pt未満、順位も不変（cyclonedx-gomod > cdxgen ≫ trivy ≈ syft）。
  → 母数のばらつきは優劣結論を歪めていない。「評価対象=1530、ツール別に数十件のNA」という報告で妥当。

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
| syft | 1527 | 1486 | +41 |
| trivy | 1518 | 1477 | +41 |
| cdxgen | 1476 | 1442 | +34 |
| cyclonedx-gomod | 1495 | 1436 | +59 |

今回**評価対象(OK)が 1489→1530** に増えた。新しくOKになった **40 repo** の原因内訳（詳細リストは `census/newly_measurable.md`）:

| カテゴリ | 件数 | 内容 |
|---|---:|---|
| 2. 新しいGo(1.25/1.26)要求を回収 | 14 | base go を 1.26.5 にし toolchain-DLタイムアウトを解消（etcd, coraza, pomerium 等） |
| 3. 新しいコミット等(go≤1.24) | 24 | 前回計測よりHEADが進み依存追加、または前回の一時失敗の回収（mongo-go-driver, go-rod, samber/* 等） |
| 1. vendor対応で**新規**復活 | 2 | kubernetes, kubevpn |

**重要な補足（vendor修正の役割）**: 「増加」の主因は 2(新Go)＋3(新コミット) で、vendor修正で"新規"に増えたのは2件のみ。
vendor修正(`-mod=mod`)の本当の効果は増加ではなく **正しさ/取りこぼし防止**。`vendor/` を持つ repo（blocky=128依存, kubernetes 等）は
既定 `-mod=vendor` だと `go list -m all` が "can't compute all using the vendor directory" で失敗し**空GTに誤判定**される。
前回の集計コードも同じく `-mod=mod` を付けていなかったため、**前回も vendored repo を取りこぼしていた可能性が高い**（＝今回の方がより正確）。

