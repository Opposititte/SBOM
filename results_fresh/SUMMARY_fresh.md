# 同一時点フル再収集 — 確定版サマリ

全 awesome-go 1489 repo（有効 1486）を対象に、**1回のクローン上で** all/imported/imported+test の
3つのGT（版付き）と syft/trivy/cdxgen/cyclonedx-gomod の4ツールを**同時に生成**。
これによりGTとツール出力の生成時点が完全一致し、旧データにあった impT のバージョン時点アーティファクトを解消した。

## 1. name一致 / version一致 × all/imported/impT（macro平均 precision / recall / F1, %）

### name一致

| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |
|---|---|---|---|
| syft | 88.4 / 56.7 / 70.0 | 62.5 / 97.3 / 97.3 | 68.4 / 67.5 / 78.7 |
| trivy | 87.8 / 58.7 / 72.3 | 63.6 / 97.3 / 97.2 | 68.7 / 67.7 / 78.8 |
| cdxgen | 90.7 / 90.3 / 91.2 | 40.2 / 97.2 / 80.5 | 50.3 / 91.8 / 81.1 |
| cyclonedx-gomod | 96.1 / 93.2 / 93.3 | 41.8 / 98.8 / 80.7 | 54.3 / 95.1 / 82.9 |

### version一致

| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |
|---|---|---|---|
| syft | 87.1 / 56.0 / 69.2 | 62.0 / 97.2 / 97.2 | 67.6 / 66.8 / 77.9 |
| trivy | 86.7 / 58.1 / 71.7 | 62.9 / 97.2 / 97.2 | 67.9 / 67.1 / 78.2 |
| cdxgen | 89.8 / 89.7 / 90.6 | 39.8 / 97.2 / 80.4 | 49.8 / 91.4 / 80.7 |
| cyclonedx-gomod | 96.0 / 93.1 / 93.3 | 41.8 / 98.7 / 80.7 | 54.2 / 95.0 / 82.8 |

- **impT の name→version F1落差が -0.1〜-0.8pt**（旧データは約-9pt）。同一時点収集で版一致が3GT全部で有効に。
- **優劣の逆転構造は健在**：all では syft/trivy 優位、imported では cdxgen/cyclonedx-gomod 優位。name/version で不変。
- precision/recall 視点：**all** は precision高・recall低（未報告indirectがFN）。**imported** は recallほぼ100%で precision差が優劣を決める（syft/trivy 57〜59% vs cdxgen/gomod 90〜93%）。**impT** は両者中間。

## 1b. ミクロ集計（プール合計から算出 P / R / F1, %）

上記(§1)は repo 単位のマクロ平均。以下は全repoの TP/FP/FN を合算してから算出したミクロ値。
大規模repoの重みが大きくなるため、マクロとは数%〜十数%ずれる（どちらも妥当）。

### name一致（micro）

| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |
|---|---|---|---|
| syft | 81.9 / 54.8 / 59.5 | 49.3 / 99.7 / 99.8 | 61.5 / 70.7 / 74.6 |
| trivy | 81.1 / 56.3 / 61.4 | 47.3 / 99.8 / 99.8 | 59.7 / 72.0 / 76.0 |
| cdxgen | 83.6 / 83.4 / 84.3 | 33.0 / 99.8 / 92.8 | 47.3 / 90.9 / 88.4 |
| cyclonedx-gomod | 95.5 / 87.4 / 87.5 | 36.0 / 98.9 / 91.2 | 52.3 / 92.8 / 89.3 |

### version一致（micro）

| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |
|---|---|---|---|
| syft | 77.6 / 52.3 / 56.9 | 48.8 / 99.6 / 99.6 | 59.9 / 68.6 / 72.4 |
| trivy | 76.8 / 54.0 / 58.8 | 46.6 / 99.6 / 99.6 | 58.0 / 70.0 / 73.9 |
| cdxgen | 80.7 / 81.3 / 82.2 | 32.7 / 99.8 / 92.8 | 46.5 / 89.6 / 87.1 |
| cyclonedx-gomod | 95.4 / 87.3 / 87.4 | 36.0 / 98.7 / 91.0 | 52.2 / 92.7 / 89.2 |

## 1c. TP / FP / FN プール合計

### name一致

| ツール | all (TP/FP/FN) | imported (TP/FP/FN) | impT (TP/FP/FN) |
|---|---|---|---|
| syft | 68,666 / 15,159 / 70,753 | 45,933 / 37,892 / 120 | 49,908 / 33,917 / 123 |
| trivy | 63,681 / 14,810 / 71,048 | 44,226 / 34,265 / 110 | 48,156 / 30,335 / 113 |
| cdxgen | 42,865 / 8,399 / 87,095 | 42,750 / 8,514 / 67 | 43,233 / 8,031 / 3,357 |
| cyclonedx-gomod | 49,514 / 2,322 / 87,924 | 45,322 / 6,514 / 508 | 45,375 / 6,461 / 4,386 |

### version一致

| ツール | all (TP/FP/FN) | imported (TP/FP/FN) | impT (TP/FP/FN) |
|---|---|---|---|
| syft | 67,996 / 19,671 / 71,423 | 45,866 / 41,801 / 187 | 49,841 / 37,826 / 190 |
| trivy | 62,851 / 18,972 / 71,878 | 44,157 / 37,666 / 179 | 48,086 / 33,737 / 183 |
| cdxgen | 42,460 / 10,145 / 87,500 | 42,750 / 9,855 / 67 | 43,221 / 9,384 / 3,369 |
| cyclonedx-gomod | 49,445 / 2,393 / 87,993 | 45,252 / 6,586 / 578 | 45,305 / 6,533 / 4,456 |

## 2. なぜ imported でも F1=100 にならないか（原因分析）

- **どのツールも recall はほぼ 100%（取りこぼしは僅少）**。F1<100 の主因は **FP（余分報告）＝precision低下**。
  - recall: syft 99.7% / trivy 99.8% / cdxgen 99.8% / cyclonedx-gomod 98.9%
- **FPの正体はツールごとに異なる**（全1486プール＋retain95repoでの残余分離）：

| ツール | imp_FP | 主因 |
|---|---|---|
| cdxgen | 8,514 | **ネスト兄弟モジュール ~75%**（examples/cmd/testdata/scripts の別go.modを再帰集約）＋未使用indirect 10% |
| cyclonedx-gomod | 6,514 | **未使用の go.mod indirect ~77%**（`mod`はモジュールグラフを忠実に載せ剪定しない）＋別OS 14% |
| syft | 37,892 | go.sum残骸 ~33% ＋ ネスト兄弟mod ~35% ＋ 未使用indirect 18% ＋ test 10% |
| trivy | 34,265 | 同上（go.sum残骸/ネスト/indirect/test の混在） |

### 機序（実証済み）
- **cdxgen**：リポジトリツリー内の**全 go.mod/go.sum を再帰的に集約**。ルートモジュールだけを見る `go list -deps`（正解）に対し、
  兄弟サブモジュール（例・CLI・testdata・scripts）の依存を余分に載せる。
  実証：testifylint FP 11/11 が `analyzer/testdata/src/go.mod`、gossamer 11/11 が `scripts/`+`devnet/`、残余の92%がルートgo.sum外。
- **cyclonedx-gomod**：`mod` は go.mod の依存グラフ（indirect含む）をそのままSBOM化。Go1.17+ がグラフ完全性のため記録する
  indirect のうち、このモジュールが実importしないものが全部FP。`go mod why` による剪定はしない。実証：blocky FP 60/60 が go.mod indirect。
- **syft/trivy**：go.mod＋go.sum を読み、かつツリー内の別go.modも拾うため、**go.sum残骸とネスト兄弟モジュールの両方**が混入。

### 統一的理解
両系統とも「**宣言（go.modファイル群 / go.sum）**」を報告し、正解の「**実import（go list -deps）**」とズレる。
ズレ方が「スコープが横に広い（cdxgen＝ツリー全体）」か「粒度が縦に粗い（gomod＝未使用indirect）」かで異なる。バグではなく設計選択。

## 3. データ
- `metrics_fresh.csv`：repo×tool ごとの name/version × all/imp/impT の TP/FP/FN ＋ FP原因バケツ。
- 残余バケツの go.sum残骸 vs ネスト兄弟mod の分離は retain 95repo の go.sum 実照合による（生データ保持分）。
