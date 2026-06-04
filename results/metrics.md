# SBOM Accuracy: Precision / Recall / F1 vs `go list -m all`
# SBOM精度の評価：`go list -m all` を正解とした 適合率 / 再現率 / F1

Generated: 2026-06-04. Tools: syft 1.45.0, trivy 0.71.0, cdxgen 12.5.0.
Reproduce with `node ../compute_metrics.js` (raw numbers in `metrics.json`).

作成日: 2026-06-04。ツール: syft 1.45.0, trivy 0.71.0, cdxgen 12.5.0。
`node ../compute_metrics.js` で再現できます（生データは `metrics.json`）。

---

## Methodology / 評価方法
- **Ground truth (GT):** `go list -m all` run in each repo's **root**, excluding the
  main module. This is the Go 1.17+ *pruned module build list*.
- **Predicted:** CycloneDX components with a `pkg:golang/` purl. `stdlib` and the
  main module are excluded. Non-Go ecosystems (npm, GitHub-Actions, generic) are
  **out of scope** for this GT and ignored on both sides.
- **Matching:** *name* = module path matches; *name@ver* = path **and** version match.
- P = TP/(TP+FP), R = TP/(TP+FN), F1 = 2PR/(P+R).

**【日本語】**
- **正解データ (GT):** 各リポジトリの**ルート**で実行した `go list -m all`（メインモジュールは除外）。
  これは Go 1.17 以降の「枝刈り済みモジュールビルドリスト」です。
- **予測 (Predicted):** purl が `pkg:golang/` の CycloneDX コンポーネント。`stdlib` とメイン
  モジュールは除外。Go 以外のエコシステム（npm、GitHub-Actions、generic）は今回の正解データの
  **対象外**とし、両側で無視します。
- **照合:** *name* = モジュールパスの一致／ *name@ver* = パス**かつ**バージョンの一致。
- 適合率 P = TP/(TP+FP)、再現率 R = TP/(TP+FN)、F1 = 2PR/(P+R)。
- 用語: TP=正しく検出, FP=誤検出, FN=見逃し。

## Per-repo results / リポジトリ別の結果 (name-level)

| repo   | GT | tool   | pred | TP | FP | FN | Precision | Recall | F1 |
|--------|---:|--------|-----:|---:|---:|---:|----------:|-------:|-----:|
| gin    | 56 | syft   |  40  | 40 |  0 | 16 | 100.0 | 71.4 | **83.3** |
| gin    | 56 | trivy  |  35  | 35 |  0 | 21 | 100.0 | 62.5 | 76.9 |
| gin    | 56 | cdxgen |  18  | 18 |  0 | 38 | 100.0 | 32.1 | 48.6 |
| cobra  |  6 | syft   |   6  |  6 |  0 |  0 | 100.0 |100.0 | **100.0**|
| cobra  |  6 | trivy  |   6  |  6 |  0 |  0 | 100.0 |100.0 | **100.0**|
| cobra  |  6 | cdxgen |   4  |  4 |  0 |  2 | 100.0 | 66.7 | 80.0 |
| hugo   |436 | syft   | 202  |202 |  0 |234 | 100.0 | 46.3 | **63.3** |
| hugo   |436 | trivy  | 187  |185 |  2 |251 |  98.9 | 42.4 | 59.4 |
| hugo   |436 | cdxgen | 106  |106 |  0 |330 | 100.0 | 24.3 | 39.1 |
| frp    |145 | syft   |  83  | 82 |  1 | 63 |  98.8 | 56.6 | **71.9** |
| frp    |145 | trivy  |  72  | 71 |  1 | 74 |  98.6 | 49.0 | 65.4 |
| frp    |145 | cdxgen |  73  | 72 |  1 | 73 |  98.6 | 49.7 | 66.1 |
| gorm † |  8 | syft   |  29  |  6 | 23 |  2 |  20.7 | 75.0 | 32.4 |
| gorm † |  8 | trivy  |  29  |  6 | 23 |  2 |  20.7 | 75.0 | 32.4 |
| gorm † |  8 | cdxgen |   3  |  3 |  0 |  5 | 100.0 | 37.5 | 54.5 |
| ollama |177 | syft   | 113  |113 |  0 | 64 | 100.0 | 63.8 | **77.9** |
| ollama |177 | trivy  |  95  | 95 |  0 | 82 | 100.0 | 53.7 | 69.9 |
| ollama |177 | cdxgen |  71  | 71 |  0 |106 | 100.0 | 40.1 | 57.3 |

## Averages across the 6 repos / 6リポジトリの平均 (name-level)

| tool   | macro-P | macro-R | macro-F1 | micro-P | micro-R | micro-F1 |
|--------|--------:|--------:|---------:|--------:|--------:|---------:|
| syft   |  86.6 | 68.9 | **71.5** | 94.9 | 54.2 | **69.0** |
| trivy  |  86.4 | 63.8 | 67.3 | 93.9 | 48.1 | 63.6 |
| cdxgen |  99.8 | 41.7 | 57.6 | 99.6 | 33.1 | 49.7 |

macro = unweighted mean over repos; micro = pooled TP/FP/FN (dominated by large repos).
macro = リポジトリ単位の単純平均／ micro = 全体を合算した TP/FP/FN（大きいリポジトリの影響が大）。

## Key findings / 主な知見
1. **syft has the best overall F1** (highest recall) with near-zero false positives on
   single-module repos. **trivy** is a close second. **cdxgen** has the highest precision
   (≈100%) but the **lowest recall** — it mainly captures directly-declared dependencies
   and misses most transitive ones.
2. **Versions are reliable when a module is found** — version-level F1 ≈ name-level F1
   (worst gap ~0.7 pt), i.e. errors are *missing* modules, not *wrong* versions.
3. **Recall drops as repos grow** — 100% on tiny cobra, but below 50% on large hugo.
   No tool fully reconstructs the `go list -m all` build list from `go.mod`/`go.sum`.

**【日本語】**
1. **総合 F1 は syft が最良**（再現率が最も高い）。単一モジュールのリポジトリでは誤検出ほぼゼロ。
   **trivy** はそれに僅差で続く。**cdxgen** は適合率が最も高い（約100%）が**再現率は最低**で、
   主に直接依存だけを検出し、推移的依存の多くを見逃す。
2. **モジュールを検出できた場合、バージョンは正確** — バージョン一致の F1 は名前一致とほぼ同じ
   （最大でも約0.7ポイント差）。つまり誤りは「バージョン違い」ではなく「見逃し」が主因。
3. **リポジトリが大きいほど再現率が低下** — 小さい cobra では100%だが、大きい hugo では50%未満。
   どのツールも `go.mod`/`go.sum` から `go list -m all` のビルドリストを完全には再現できない。

## Caveats / 注意点（解釈上 重要）
- **† gorm — multi-module repo:** gorm ships sibling modules with their own `go.mod`
  (`tests/`, and drivers `gorm.io/driver/{sqlite,mysql,postgres,sqlserver,gaussdb}`).
  syft/trivy recurse into them and report those drivers' deps, which are **real** but
  absent from the *root* `go list -m all`, so they score as "false positives". The low
  gorm precision is a **ground-truth-scope artifact, not a tool defect** — arguably
  syft/trivy are the more complete side. The 1–2 FPs on hugo/frp have the same origin.
- **hugo / cdxgen** required a `--exclude` workaround (the default command crashes on
  hugo's nested `internal/warpc` modules — see `hugo/errors.txt`).
- A fairer GT for multi-module repos would be the **union of `go list -m all` over every
  nested module**; that would raise syft/trivy precision toward ~100% on gorm.

**【日本語】**
- **† gorm（マルチモジュール構成）:** gorm は独自の `go.mod` を持つ兄弟モジュール（`tests/` と
  ドライバ `gorm.io/driver/{sqlite,mysql,postgres,sqlserver,gaussdb}`）を同梱している。
  syft/trivy はそれらを再帰的に走査し各ドライバの依存を報告するが、これらは**実在する依存**で
  ありながら*ルート*の `go list -m all` には現れないため「誤検出」と判定される。gorm の低い適合率は
  **正解データの範囲の問題であり、ツールの欠陥ではない** — むしろ syft/trivy の方が網羅的とも言える。
  hugo/frp の1〜2件の FP も同じ原因。
- **hugo / cdxgen** は `--exclude` の回避策が必要だった（既定コマンドは hugo のネストした
  `internal/warpc` モジュールでクラッシュする。詳細は `hugo/errors.txt`）。
- マルチモジュール対応のより公平な正解は、**ネストした各モジュールで `go list -m all` を実行した
  和集合**。これにより gorm の syft/trivy 適合率は約100%まで上がるはず。
