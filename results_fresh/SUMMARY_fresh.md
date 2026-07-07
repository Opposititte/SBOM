# 同一時点フル再収集 — 確定版サマリ

全 awesome-go 1489 repo（有効 1486）を対象に、**1回のクローン上で** all/imported/imported+test の
3つのGT（版付き）と syft/trivy/cdxgen/cyclonedx-gomod の4ツールを**同時に生成**。
これによりGTとツール出力の生成時点が完全一致し、旧データにあった impT のバージョン時点アーティファクトを解消した。

## 1. name一致 / version一致 × all/imported/impT（macro平均 precision / recall / F1, %）

母数（有効評価repo数）: syft 1486 / trivy 1477 / cdxgen 1442 / cyclonedx-gomod 1436（対象リストは1489、CLONE_FAIL 2）。
recall/F1 は「正解GTに少なくとも1件ある」repoのみで算出（imported依存ゼロのrepoは find-rate が定義できないため除外）。

### name一致

| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |
|---|---|---|---|
| syft | 88.4 / 56.7 / 70.0 | 65.6 / 99.9 / 99.9 | 71.7 / 69.3 / 80.8 |
| trivy | 87.8 / 58.7 / 72.3 | 66.7 / 99.9 / 99.9 | 72.1 / 69.5 / 81.0 |
| cdxgen | 90.7 / 90.3 / 91.2 | 42.1 / 99.8 / 82.6 | 52.7 / 94.2 / 83.3 |
| cyclonedx-gomod | 96.1 / 93.2 / 93.3 | 43.5 / 99.2 / 81.1 | 56.4 / 95.5 / 83.2 |

### version一致

| ツール | precision (all/imp/impT) | recall (all/imp/impT) | F1 (all/imp/impT) |
|---|---|---|---|
| syft | 87.1 / 56.0 / 69.2 | 65.0 / 99.8 / 99.8 | 70.9 / 68.6 / 80.1 |
| trivy | 86.7 / 58.1 / 71.7 | 66.0 / 99.8 / 99.8 | 71.2 / 69.0 / 80.3 |
| cdxgen | 89.8 / 89.7 / 90.6 | 41.7 / 99.8 / 82.5 | 52.2 / 93.8 / 82.8 |
| cyclonedx-gomod | 96.0 / 93.1 / 93.3 | 43.5 / 99.1 / 81.0 | 56.4 / 95.4 / 83.2 |

- **impT の name→version F1落差が -0.1〜-0.8pt**（旧データは約-9pt）。同一時点収集で版一致が3GT全部で有効に。
- **優劣の逆転構造は健在**：all では syft/trivy 優位、imported では cdxgen/cyclonedx-gomod 優位。name/version で不変。
- precision/recall 視点：**all** は precision高・recall低（未報告indirectがFN）。**imported** は **recall ほぼ100%（99.2〜99.9%）**で、**precision差が優劣を決める**（syft/trivy 57〜59% vs cdxgen/gomod 90〜93%）。**impT** は両者中間。
- （マクロ算出は `macro_clean.js`。空GT除外前の素の集計は `final_tables.js` にあるが、recallを過小評価するため §1 は clean 版を採用）

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

- **どのツールも imported の recall はほぼ 100%（マクロ）＝取りこぼしは僅少**。F1<100 の主因は **FP（余分報告）＝precision低下**。
  - imported マクロ recall: syft 99.9% / trivy 99.9% / cdxgen 99.8% / cyclonedx-gomod 99.2%
  - imported マクロ precision: syft 56.7% / trivy 58.7% / cdxgen 90.3% / cyclonedx-gomod 93.2% ← ここの差が F1 と優劣を決める
- **統一的理解：precision 差＝各ツールが読む「源」の広さの差**。正解 imported＝`go list -deps`（ルート・GOOS=linux・非test の**コンパイルグラフ**）。各ツールの源がそれより広い分だけ過剰報告＝FPになる。
  - cyclonedx-gomod・cdxgen は**コンパイルグラフに近い源**（go mod why 到達性／go list -deps）→ precision 90〜93%。
  - syft・trivy は**go.sum（最広：build-list＋残骸）**→ precision 57〜59%。
- **FPの正体はツールごとに異なる**（各ツールの有効repoでプール。母数: cdxgen 1442, cyclonedx-gomod 1436, syft 1486, trivy 1477。残余の内訳は retain93repoで実照合分離）：

| ツール | imp_FP | 主因（source確認済みの機序と整合） |
|---|---|---|
| cdxgen（1442repo） | 8,514 | **ネスト兄弟モジュール ~75%**（残余81%×93repo照合の~92%。全go.mod走査）＋未使用indirect ~10%（go list -deps失敗時のgo mod graph fallback）＋test 6% |
| cyclonedx-gomod（1436repo） | 6,514 | **未使用の go.mod indirect ~77%**＋**別OS ~14%**（`go mod why -m -vendor` 到達性が GOOS=linux・非test の go list -deps より広いため） |
| syft（1486repo） | 37,892 | go.sum残骸 ~34% ＋ ネスト兄弟mod ~34% ＋ 未使用indirect ~18% ＋ test ~10%（go.mod＋go.sum＋ツリー内go.modをファイル走査） |
| trivy（1477repo） | 34,265 | 同上（go.sum残骸/ネスト/indirect/test の混在） |

- **なぜどのツールも 100 に届かないか**：どれも「ルート・linux・非test の実import」を厳密には計算しないため。
  cdxgen は go list -deps を使うので最も近い（81%のrepoで完全一致）が、ネスト走査と fallback で外れる。
  cyclonedx-gomod は go mod why 到達性が linux非test より広い。syft/trivy は go.sum で設計上さらに広い。加えて `replace` による僅かな recall 損（FN）。

### 機序（実証済み）
- **cdxgen**（一次証拠：**cdxgen v12.7.0**、`lib/cli/index.js`, `lib/helpers/utils.js`）：
  - `cli/index.js:5466` → **`go list -deps -f '...' ./...`**＝「correct list of dependencies」（コンパイルグラフ＝実import）。これがコンポーネント一覧。
  - `cli/index.js:5521` → **`go mod graph`**＝「construct the dependency tree」（親子の辺）。
  - `utils.js:10879-10888` → **go mod graph は go list -deps の一覧で濾す**（両端がexistingPkgMapに無ければ辺ごと捨てる）→ **辺のみ追加、成分は足さない**。
  - ゆえに **コンポーネント集合 ≈ go list -deps ≈ imported**。実証：retain 89repo 中 **72repo(81%) で cdxgen==imported 完全一致**（blocky 128=128）。
  - FP源①：**go list -deps 失敗時の fallback**（`cli/index.js:5479-5491`）で **go mod graph 単独**＝module requirements graph で過剰報告（utils.js:10967）。
  - FP源②：**ネスト兄弟モジュール**（`for (const f of sortedGomodFiles)` :5451 でツリー全 go.mod 走査）。testifylint 超過12=`analyzer/testdata/src/go.mod`、gossamer=`scripts/`+`devnet/`。
  ＝「go list -deps だけ」ではなく **go list -deps（正）＋go mod graph（辺のみ・濾し済み）**。膨らむのは fallback とネスト時のみ。
  - **完全一致⟺単一go.mod の相関（retain再クローン実測）**：単一go.mod→97%(69/71)完全一致、複数go.mod→83%(15/18)不一致。
    例外：単一なのに不一致2件(go-etl,plik＝fallback等の別要因FP)、複数なのに一致3件(rk-grpc等＝ネストが vendor/build/test-fixtures でcdxgen除外[cli/index.js:5453-5459] か 部分集合)。
    → 「複数go.modの時に主に起きる」は断言可、「単一なら必ず一致」は~97%（"ほぼ"付き）。
- **cyclonedx-gomod**（`mod` モード。**一次証拠：cyclonedx-gomod v1.10.0 / commit ba940a6**）：
  - `pkg/generate/mod/generator.go:78` → `gomod.LoadModules(...)`
  - `internal/gomod/module.go:133` → `gocmd.ListModules`（=`go list -mod readonly -json -m all`, gocmd.go:83-84）
  - `internal/gomod/module.go:143` → `FilterModules`（`internal/gomod/filter.go:66` で `gocmd.ModWhy` 呼び出し）
  - `internal/gocmd/gocmd.go:119-123` → `ModWhy` = **`go mod why -m -vendor`**
  - filter.go:70-93 → go mod why が "not needed"(空) と test専用 を除外
  1. `go list -mod readonly -json -m all` で **build list**（blocky=335）を取得
  2. **`go mod why -m -vendor`** で各モジュールを検査し、**「到達可能なもの」だけ残す**（"not needed" と test専用を除外）→ blocky 188
  3. replace 解決
  ＝「go.mod require そのまま」でも「build list そのまま」でもなく、**`go mod why` による到達可能性フィルタ**。結果が go.mod require(194) に近い(188)のは副産物。
  - imported(128) に対する超過FP=60 は、`go mod why` の到達性が **imported（GOOS=linux・非test の go list -deps）より広い**（別OS/ビルドタグ跨ぎ等）ため。FP内訳の otherOS 14% と整合。
  ※ 対 syft との差：**gomod は go mod why 到達可能集合どまり（≈require, blocky188）、syft は go.sum まで踏み込む（blocky231 ⊂ go.sum334）**。
  実測件数の一般性（retain 93repo）：ほぼ全例で **gomod ≤ require < syft**（gomod⊆require 94%、syft>require 80%）。この「読む広さ」の差が imported precision 差（gomod≫syft）の源。
  【訂正履歴】初期の「require/indirect をそのまま」「go mod why は使わない」は誤り。ソース確認で **go mod why を使う**が正。
- **syft/trivy**：go.mod＋go.sum を読み、かつツリー内の別go.modも拾うため、**go.sum残骸とネスト兄弟モジュールの両方**が混入。

### 統一的理解
両系統とも「**宣言（go.modファイル群 / go.sum）**」を報告し、正解の「**実import（go list -deps）**」とズレる。
ズレ方が「スコープが横に広い（cdxgen＝ツリー全体）」か「粒度が縦に粗い（gomod＝未使用indirect）」かで異なる。バグではなく設計選択。

## 2b. 有効評価repo数がツールで違う理由

各ツールが一部repoで出力を出せず NA になるため。母数は「全ツール共通で成功した集合」ではなく各ツールの成功repo。

| ツール | 有効 | 失敗(NA) | 失敗の主因（実測） |
|---|---|---|---|
| syft | 1486 | 0 | go.mod/go.sum をファイルとして読む（ビルド不要）ので堅牢。失敗なし |
| trivy | 1477 | 9 | 主に巨大repo（anchore/syft, seaweedfs 等）でのタイムアウト |
| cdxgen | 1442 | 44 | **ネストモジュールを再帰処理**するため、壊れた例モジュール（例 `storybook/_example`）の `go list -deps` 失敗で全体が中断 |
| cyclonedx-gomod | 1436 | 50 | 内部で厳格な `go list -mod readonly -m all` を使い、go.sum不完全/解決不能なrepoで失敗 |

## 2c. 既知の注意点（バグではないが解釈に影響）

- **`replace` ディレクティブ**：GT(`go list -deps`)は元のimportパスを、cyclonedx-gomod等は差替先モジュールパスを報告する。
  例 gossamer: GT `centrifuge/go-substrate-rpc-client` ⇔ gomod `timwu20/go-substrate-rpc-client`。
  → 同一依存が **FN(元パス)＋FP(差替先)** の両方に計上される（対称ノイズ、全ツール共通の性質）。
- **CSV列名 `fp_gosum_only` は残余バケツの誤称**。実体は「imported/impT/別OS/go.mod直接・間接 のどれでもない残余」で、
  §2の通り go.sum残骸とネスト兄弟モジュールが混在（tool別に §2 参照）。
- **マクロは空GT除外必須**：imported依存ゼロのrepoでツールが誤報告すると recall=0 と誤計上され過小評価になる。
  §1 は除外済み（`macro_clean.js` / 修正後 `final_tables.js`）。`final_tables.js` のミクロ・TP/FP/FN は空GTの影響を受けない。

## 3. データ
- `metrics_fresh.csv`：repo×tool ごとの name/version × all/imp/impT の TP/FP/FN ＋ FP原因バケツ。
- 残余バケツの go.sum残骸 vs ネスト兄弟mod の分離は retain 95repo の go.sum 実照合による（生データ保持分）。
