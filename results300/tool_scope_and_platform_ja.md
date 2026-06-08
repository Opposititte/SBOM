# ツールの「含める範囲」の違い と プラットフォーム依存（妥当性メモ）

cobra 1リポジトリで、4ツールの「どこまでを依存に含めるか」の思想差が全部見える。
2つの軸（OS依存 / テスト依存）でツールが3段階に分類できる。

## 1. 実証した事実（cobra）
- `imported` の GT は **GOOS=linux**（このコンテナの既定）で生成した。
- そのため cobra の **mousetrap（Windows 専用）は imported から外れた**。
- `GOOS=windows` でクロスして `go list -deps` すると mousetrap が**入る**:
  - GOOS=linux の imported = 4 個（mousetrap 無し）
  - GOOS=windows の imported = 5 個（**差は mousetrap のみ**）
- → **`imported` は GOOS 依存**。本研究は **linux に統一**している。

## 2. cobra で見える「3段階構造」（2軸で分類）
- 軸1：**mousetrap = OS依存**（Windows 専用コードが使う）
- 軸2：**check.v1 = テスト依存**（テストでのみ使う）

| ツール | mousetrap（OS依存） | check.v1（テスト依存） | 含める範囲 |
|---|:---:|:---:|---|
| **Syft / Trivy** | 含む | 含む | **最も網羅的** |
| **cyclonedx-gomod** | 含む | 含まない | 中間 |
| **cdxgen** | 含まない | 含まない | **最も厳密** |

## 3. なぜこうなるか（設計思想の差）
- **Syft / Trivy**：go.mod を起点に**依存グラフ全体を列挙**する（go.mod の直接 require より多くを含む）。
  OS依存もテスト依存も入る＝最も網羅的。
  - 実証メモ：cobra の go.mod の require は4個だが Syft は check.v1/blackfriday も報告。さらに **go.sum を
    削除しても出力は不変**。→ go.sum 単体ではなく、go.mod 起点でグラフを解決している（モジュール
    キャッシュ等を利用）。正確な解析対象はツール内部実装に依存するため、本研究では「**どこまで含めるか
    （スコープ）**」で比較する。
- **cyclonedx-gomod**：モジュールグラフベース。**非テストのコードが import するモジュールを全プラット
  フォーム分**含める → mousetrap（Windows 用コードが import）は入る。**テスト専用の枝は刈る** →
  check.v1 は入らない。
- **cdxgen**：特定OS（linux）のビルドグラフ。OS別（mousetrap）もテスト（check.v1）も除外 → 最も厳密。

## 4. 研究上の意義
- **この3段階こそ「4ツールを比較する意味」**。ツールごとに「どこまでを依存とみなすか」の思想が違い、
  それを **cobra 1個で全部示せる** → 論文の図解として強い。
- 「最も正確なツール」は、評価に使う正解(GT)が all / imported / direct のどれかで入れ替わる、という
  本研究の主張の**ミクロな根拠**になる。

## 5. 妥当性の方針（教授相談用）
- **(A) プラットフォームは linux に固定し、限界として明記する**（採用）。
  - 理由：(B) 全OS和集合は定義が重く、「実際に使う依存」という imported の意味がぼやける。
    卒論スコープでは (A) が妥当で、「環境依存を確認し限界として明記した」姿勢が評価される。
- 各ツールが仮定する OS・テスト範囲が違うので、評価は必ず**同一の正解定義(GT)に対して**行う。

## 6. 主モジュール（リポジトリ自身）の扱い ― 一律除外で統一（修正記録）
- `gt_imported.txt` は生成コマンドで自分自身を除外（`grep -v "^${main}$"`）。一方 `go list -m all` の生出力は
  先頭行に自分自身が入る。
- 当初、一部の集計スクリプト（`compute_multi_gt.js` / `full_table.js` / `root_cause.js`）は **GT 側で主モジュールを
  除外するのに、ツール出力側では除外していなかった**。そのため syft/trivy が自分自身を報告すると **+1 FP** となり、
  precision/F1 が不当に低く出ていた。
- **修正方針: 正解(GT)・ツール出力の両方から、ルートモジュール自身を一律除外**（`compute_metrics.js` /
  `three_gt_6repos.js` は元から実施済み）。全スクリプトをこれに統一。
- 影響（results300, name一致, macro F1 vs all）:
  - syft 71.4 → **76.2**、trivy 70.7 → **75.5**（cdxgen/cyclonedx-gomod は自分自身を報告しないため不変）。
  - 修正後の値は `compute_metrics.js`（元から除外済み）と一致し、全成果物が整合。
- Recall は不変（主モジュールは GT に無く tp/fn に影響しないため）。Precision/F1 のみ上方修正。
