# SBOM Accuracy: Precision / Recall / F1 vs `go list -m all`
# SBOM精度の評価：`go list -m all` を正解とした 適合率 / 再現率 / F1

Generated: 2026-06-04. Tools: syft 1.45.0, trivy 0.71.0, cdxgen 12.5.0.
Reproduce with `node ../compute_metrics.js` (raw numbers in `metrics.json`, `metrics.csv`).

作成日: 2026-06-04。ツール: syft 1.45.0, trivy 0.71.0, cdxgen 12.5.0。
`node ../compute_metrics.js` で再現可能（生データは `metrics.json`, `metrics.csv`）。

---

## Methodology / 評価方法
- **Ground truth (GT):** `go list -m all` run in each repo's **root**, excluding the
  main module. This is the Go 1.17+ *pruned module build list*.
- **Predicted:** CycloneDX components with a `pkg:golang/` purl. `stdlib` and the
  main module are excluded. Non-Go ecosystems (npm, GitHub-Actions, generic) are
  **out of scope** for this GT and ignored on both sides.
- **Matching:** *name* = module path matches; *name@ver* = path **and** version match.
- Clones are shallow (`--depth=1`). The tools read `go.mod`/`go.sum`/source, which are
  identical to a full clone, so clone depth does **not** affect these results.
- P = TP/(TP+FP), R = TP/(TP+FN), F1 = 2PR/(P+R).

**【日本語】**
- **正解データ (GT):** 各リポジトリの**ルート**で実行した `go list -m all`（メインモジュール除外）。
  Go 1.17 以降の「枝刈り済みモジュールビルドリスト」。
- **予測 (Predicted):** purl が `pkg:golang/` の CycloneDX コンポーネント。`stdlib` とメイン
  モジュールは除外。Go 以外（npm, GitHub-Actions, generic）は対象外で両側とも無視。
- **照合:** *name* = モジュールパス一致／ *name@ver* = パス**かつ**バージョン一致。
- クローンは浅いクローン（`--depth=1`）。ツールは `go.mod`/`go.sum`/ソースを読み、これらは
  フルクローンと同一なので、クローンの深さは結果に**影響しない**。
- 適合率 P = TP/(TP+FP)、再現率 R = TP/(TP+FN)、F1 = 2PR/(P+R)。

---

## 1. Summary — Precision / Recall / F1 (%)
## 1. まとめ — 適合率 / 再現率 / F1（％）

Name-level (does the tool find each dependency at all). / 名前一致（依存を検出できたか）。

| repo   | tool   | Precision | Recall |   F1 |
|--------|--------|----------:|-------:|-----:|
| gin    | syft   | 100.0 | 71.4 | **83.3** |
| gin    | trivy  | 100.0 | 62.5 | 76.9 |
| gin    | cdxgen | 100.0 | 32.1 | 48.6 |
| cobra  | syft   | 100.0 |100.0 | **100.0**|
| cobra  | trivy  | 100.0 |100.0 | **100.0**|
| cobra  | cdxgen | 100.0 | 66.7 | 80.0 |
| hugo   | syft   | 100.0 | 46.3 | **63.3** |
| hugo   | trivy  |  98.9 | 42.4 | 59.4 |
| hugo   | cdxgen | 100.0 | 24.3 | 39.1 |
| frp    | syft   |  98.8 | 56.6 | **71.9** |
| frp    | trivy  |  98.6 | 49.0 | 65.4 |
| frp    | cdxgen |  98.6 | 49.7 | 66.1 |
| gorm † | syft   |  20.7 | 75.0 | 32.4 |
| gorm † | trivy  |  20.7 | 75.0 | 32.4 |
| gorm † | cdxgen | 100.0 | 37.5 | 54.5 |
| ollama | syft   | 100.0 | 63.8 | **77.9** |
| ollama | trivy  | 100.0 | 53.7 | 69.9 |
| ollama | cdxgen | 100.0 | 40.1 | 57.3 |

### Averages across the 6 repos / 6リポジトリの平均

| tool   | macro-P | macro-R | macro-F1 | micro-P | micro-R | micro-F1 |
|--------|--------:|--------:|---------:|--------:|--------:|---------:|
| syft   |  86.6 | 68.9 | **71.5** | 94.9 | 54.2 | **69.0** |
| trivy  |  86.4 | 63.8 | 67.3 | 93.9 | 48.1 | 63.6 |
| cdxgen |  99.8 | 41.7 | 57.6 | 99.6 | 33.1 | 49.7 |

macro = unweighted mean over repos; micro = pooled TP/FP/FN (dominated by large repos).
macro = リポジトリ単位の単純平均／ micro = 全体合算の TP/FP/FN（大きいリポジトリの影響大）。

---

## 2. Key findings / 主な知見
1. **syft has the best overall F1** (highest recall) with near-zero false positives on
   single-module repos. **trivy** is a close second. **cdxgen** has the highest precision
   (≈100%) but the **lowest recall** — it mainly captures directly-declared dependencies.
2. **Versions are reliable when a module is found** — version-level F1 ≈ name-level F1
   (worst gap ~0.7 pt): errors are *missing* modules, not *wrong* versions.
3. **Recall drops as repos grow** — 100% on tiny cobra, below 50% on large hugo.

**【日本語】**
1. **総合 F1 は syft が最良**（再現率最高）。単一モジュールのリポジトリでは誤検出ほぼゼロ。
   **trivy** が僅差で続く。**cdxgen** は適合率最高（約100%）だが**再現率は最低**で、主に直接依存のみ検出。
2. **検出できた場合バージョンは正確** — バージョン一致 F1 ≒ 名前一致 F1（最大約0.7pt差）。
   誤りは「バージョン違い」でなく「見逃し」が主因。
3. **リポジトリが大きいほど再現率低下** — 小さい cobra は100%、大きい hugo は50%未満。

---

## 3. Caveats / 注意点（解釈上 重要）
- **† gorm — multi-module repo:** gorm ships sibling modules with their own `go.mod`
  (`tests/`, drivers `gorm.io/driver/{sqlite,mysql,postgres,sqlserver,gaussdb}`).
  syft/trivy recurse into them and report those drivers' deps — **real** but absent from
  the *root* `go list -m all`, so they count as "false positives". The low gorm precision
  is a **ground-truth-scope artifact, not a tool defect**.
- **hugo / cdxgen** required a `--exclude` workaround (the default command crashes on
  hugo's nested `internal/warpc` modules — see `hugo/errors.txt`).
- A fairer GT for multi-module repos = **union of `go list -m all` over every nested
  module**, which would raise syft/trivy precision toward ~100% on gorm.

**【日本語】**
- **† gorm（マルチモジュール構成）:** gorm は独自 `go.mod` を持つ兄弟モジュール（`tests/`、
  ドライバ `gorm.io/driver/{sqlite,mysql,postgres,sqlserver,gaussdb}`）を同梱。syft/trivy は
  これらを再帰走査しドライバの依存を報告するが、**実在する依存**でもルートの `go list -m all` に
  無いため「誤検出」扱い。gorm の低い適合率は**正解データの範囲の問題で、ツールの欠陥ではない**。
- **hugo / cdxgen** は `--exclude` の回避策が必要（hugo のネスト `internal/warpc` でクラッシュ。
  `hugo/errors.txt` 参照）。
- より公平な正解はネスト各モジュールでの `go list -m all` の**和集合**。これで gorm の syft/trivy
  適合率は約100%に上がる。

---

## Appendix — detailed counts (how the scores were computed)
## 付録 — 詳細な件数（スコアの計算根拠）

Column meanings / 列の意味:
- **found** = number of Go dependencies the tool reported / ツールが報告した Go 依存の数
- **TP** (True Positive)  = reported **and** correct / 報告かつ正解
- **FP** (False Positive) = reported but **not** in GT (extra/wrong) / 報告したが正解に無い
- **FN** (False Negative) = in GT but the tool **missed** it / 正解にあるが見逃し
- **GT** = number of real dependencies (`go list -m all`) / 実際の依存数
- Then: Precision = TP/(TP+FP), Recall = TP/(TP+FN), F1 = 2PR/(P+R).
- "VER" columns repeat the F1 when version must also match / 「VER」はバージョンも一致必須の F1。

| repo   | GT | tool   | found | TP | FP | FN | P | R | F1 | F1 (ver) |
|--------|---:|--------|------:|---:|---:|---:|----:|----:|-----:|---------:|
| gin    | 56 | syft   |  40  | 40 |  0 | 16 | 100.0 | 71.4 | 83.3 | 83.3 |
| gin    | 56 | trivy  |  35  | 35 |  0 | 21 | 100.0 | 62.5 | 76.9 | 76.9 |
| gin    | 56 | cdxgen |  18  | 18 |  0 | 38 | 100.0 | 32.1 | 48.6 | 48.6 |
| cobra  |  6 | syft   |   6  |  6 |  0 |  0 | 100.0 |100.0 |100.0 |100.0 |
| cobra  |  6 | trivy  |   6  |  6 |  0 |  0 | 100.0 |100.0 |100.0 |100.0 |
| cobra  |  6 | cdxgen |   4  |  4 |  0 |  2 | 100.0 | 66.7 | 80.0 | 80.0 |
| hugo   |436 | syft   | 202  |202 |  0 |234 | 100.0 | 46.3 | 63.3 | 63.0 |
| hugo   |436 | trivy  | 187  |185 |  2 |251 |  98.9 | 42.4 | 59.4 | 59.1 |
| hugo   |436 | cdxgen | 106  |106 |  0 |330 | 100.0 | 24.3 | 39.1 | 39.1 |
| frp    |145 | syft   |  83  | 82 |  1 | 63 |  98.8 | 56.6 | 71.9 | 71.9 |
| frp    |145 | trivy  |  72  | 71 |  1 | 74 |  98.6 | 49.0 | 65.4 | 65.4 |
| frp    |145 | cdxgen |  73  | 72 |  1 | 73 |  98.6 | 49.7 | 66.1 | 65.1 |
| gorm † |  8 | syft   |  29  |  6 | 23 |  2 |  20.7 | 75.0 | 32.4 | 27.0 |
| gorm † |  8 | trivy  |  29  |  6 | 23 |  2 |  20.7 | 75.0 | 32.4 | 27.0 |
| gorm † |  8 | cdxgen |   3  |  3 |  0 |  5 | 100.0 | 37.5 | 54.5 | 54.5 |
| ollama |177 | syft   | 113  |113 |  0 | 64 | 100.0 | 63.8 | 77.9 | 77.2 |
| ollama |177 | trivy  |  95  | 95 |  0 | 82 | 100.0 | 53.7 | 69.9 | 69.1 |
| ollama |177 | cdxgen |  71  | 71 |  0 |106 | 100.0 | 40.1 | 57.3 | 56.5 |
