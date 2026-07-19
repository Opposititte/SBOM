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
| syft | 92.8 / 57.7 / 71.0 | 66.1 / 99.9 / 99.9 | 72.2 / 68.6 / 79.9 |
| trivy | 92.2 / 59.5 / 73.2 | 67.3 / 99.9 / 99.9 | 72.7 / 68.8 / 80.0 |
| cdxgen | 95.2 / 91.9 / 92.9 | 42.2 / 99.8 / 82.7 | 52.8 / 93.6 / 82.9 |
| cyclonedx-gomod | 99.9 / 92.4 / 92.6 | 43.8 / 99.2 / 81.2 | 56.7 / 94.5 / 82.6 |

### version一致
| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |
|---|---|---|---|
| syft | 91.2 / 56.8 / 70.0 | 65.5 / 99.8 / 99.8 | 71.3 / 67.8 / 79.1 |
| trivy | 90.9 / 58.9 / 72.5 | 66.6 / 99.9 / 99.8 | 71.7 / 68.2 / 79.3 |
| cdxgen | 94.1 / 91.2 / 92.1 | 41.7 / 99.7 / 82.5 | 52.2 / 93.1 / 82.3 |
| cyclonedx-gomod | 99.9 / 92.4 / 92.6 | 43.8 / 99.1 / 81.1 | 56.6 / 94.5 / 82.5 |

## 1b. micro集計（プール合計から算出 P/R/F1, %）
### name一致（micro）
| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |
|---|---|---|---|
| syft | 82.1 / 53.9 / 58.6 | 49.5 / 99.7 / 99.8 | 61.7 / 70.0 / 73.9 |
| trivy | 81.6 / 55.3 / 60.2 | 47.8 / 99.8 / 99.8 | 60.3 / 71.1 / 75.1 |
| cdxgen | 83.9 / 82.9 / 83.9 | 32.9 / 99.8 / 92.8 | 47.2 / 90.6 / 88.1 |
| cyclonedx-gomod | 95.9 / 85.0 / 85.1 | 36.1 / 98.9 / 91.1 | 52.4 / 91.4 / 88.0 |

### version一致（micro）
| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |
|---|---|---|---|
| syft | 77.8 / 51.5 / 56.0 | 49.0 / 99.6 / 99.6 | 60.1 / 67.9 / 71.7 |
| trivy | 77.3 / 53.0 / 57.7 | 47.2 / 99.6 / 99.6 | 58.6 / 69.1 / 73.1 |
| cdxgen | 81.1 / 80.9 / 81.8 | 32.6 / 99.7 / 92.7 | 46.5 / 89.3 / 86.9 |
| cyclonedx-gomod | 95.7 / 84.8 / 85.0 | 36.0 / 98.7 / 91.0 | 52.4 / 91.3 / 87.9 |

## 1c. TP/FP/FN プール合計
### name一致
| ツール | all (TP/FP/FN) | imported (TP/FP/FN) | impT (TP/FP/FN) |
|---|---|---|---|
| syft | 72,552 / 15,815 / 74,107 | 47,659 / 40,708 / 120 | 51,809 / 36,558 / 123 |
| trivy | 68,255 / 15,390 / 74,464 | 46,220 / 37,425 / 110 | 50,337 / 33,308 / 113 |
| cdxgen | 44,915 / 8,637 / 91,701 | 44,411 / 9,141 / 77 | 44,918 / 8,634 / 3,495 |
| cyclonedx-gomod | 52,359 / 2,264 / 92,722 | 46,416 / 8,207 / 522 | 46,491 / 8,132 / 4,548 |

### version一致
| ツール | all (TP/FP/FN) | imported (TP/FP/FN) | impT (TP/FP/FN) |
|---|---|---|---|
| syft | 71,845 / 20,552 / 74,814 | 47,588 / 44,809 / 191 | 51,737 / 40,660 / 195 |
| trivy | 67,382 / 19,765 / 75,337 | 46,149 / 40,998 / 181 | 50,264 / 36,883 / 186 |
| cdxgen | 44,481 / 10,392 / 92,135 | 44,365 / 10,508 / 123 | 44,861 / 10,012 / 3,552 |
| cyclonedx-gomod | 52,288 / 2,337 / 92,793 | 46,345 / 8,280 / 593 | 46,420 / 8,205 / 4,619 |

## 2b. 有効評価repo数 / NA数
| ツール | 有効 | NA(失敗) |
|---|---:|---:|
| syft | 1525 | 3 |
| trivy | 1516 | 12 |
| cdxgen | 1474 | 54 |
| cyclonedx-gomod | 1493 | 35 |

## 2d. FP原因バケツ（imported基準・name, 全repoプール）
| ツール | imp_FP | test | 他OS | direct未使用 | indirect未使用 | 残余(go.sum残骸+兄弟) |
|---|---:|---:|---:|---:|---:|---:|
| syft | 40,708 | 10.2% | 2.2% | 0.8% | 17.3% | 69.5% |
| trivy | 37,425 | 11.0% | 2.4% | 0.9% | 18.2% | 67.5% |
| cdxgen | 9,141 | 5.5% | 1.7% | 1.0% | 10.4% | 81.4% |
| cyclonedx-gomod | 8,207 | 0.9% | 11.1% | 3.1% | 64.2% | 20.7% |

### 2d-2. 残余バケツの go.sum内(残骸) vs go.sum外(兄弟) 分離
| ツール | 残余 | go.sum内(残骸) | go.sum外(兄弟) |
|---|---:|---:|---:|
| syft | 28,288 | 45.2% | 54.8% |
| trivy | 25,259 | 38.7% | 61.3% |
| cdxgen | 7,439 | 5.8% | 94.2% |
| cyclonedx-gomod | 1,702 | 19.6% | 80.4% |

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
| syft | 1525 | 1486 | +39 |
| trivy | 1516 | 1477 | +39 |
| cdxgen | 1474 | 1442 | +32 |
| cyclonedx-gomod | 1493 | 1436 | +57 |

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

