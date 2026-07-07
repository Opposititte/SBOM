# 同一時点フル再収集 — 確定版サマリ

全 awesome-go 1489 repo（有効 1486）を対象に、**1回のクローン上で** all/imported/imported+test の
3つのGT（版付き）と syft/trivy/cdxgen/cyclonedx-gomod の4ツールを**同時に生成**。
これによりGTとツール出力の生成時点が完全一致し、旧データにあった impT のバージョン時点アーティファクトを解消した。

## 1. name一致 / version一致 × all/imported/impT（macro平均 F1, %）

| ツール | name (all/imp/impT) | version (all/imp/impT) |
|---|---|---|
| syft | 68.4 / 67.5 / 78.7 | 67.6 / 66.8 / 77.9 |
| trivy | 68.7 / 67.7 / 78.8 | 67.9 / 67.1 / 78.2 |
| cdxgen | 50.3 / 91.8 / 81.1 | 49.8 / 91.4 / 80.7 |
| cyclonedx-gomod | 54.3 / 95.1 / 82.9 | 54.2 / 95.0 / 82.8 |

- **impT の name→version 落差が -0.1〜-0.8pt**（旧データは約-9pt）。同一時点収集で版一致が3GT全部で有効に。
- **優劣の逆転構造は健在**：all では syft/trivy 優位、imported では cdxgen/cyclonedx-gomod 優位。name/version で不変。

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
