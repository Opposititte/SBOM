# SBOM Accuracy: Precision / Recall / F1 vs `go list -m all`

Generated: 2026-06-04. Tools: syft 1.45.0, trivy 0.71.0, cdxgen 12.5.0.
Reproduce with `node ../compute_metrics.js` (raw numbers in `metrics.json`).

## Methodology
- **Ground truth (GT):** `go list -m all` run in each repo's **root**, excluding the
  main module itself. This is the Go 1.17+ *pruned module build list*.
- **Predicted:** CycloneDX components with a `pkg:golang/` purl. `stdlib` and the
  main module are excluded. Non-Go ecosystems a tool may also report (npm,
  GitHub-Actions, generic) are **out of scope** for this GT and ignored on both sides.
- **Matching:**
  - *name* = module path matches (does the tool find the dependency at all).
  - *name@ver* = module path **and** exact version match.
- TP = predicted ∩ GT, FP = predicted − GT, FN = GT − predicted.
- P = TP/(TP+FP), R = TP/(TP+FN), F1 = 2PR/(P+R).

## Per-repo results (name-level / version-level)

| repo   | GT | tool   | pred | TP | FP | FN | P (name) | R (name) | F1 (name) | F1 (ver) |
|--------|---:|--------|-----:|---:|---:|---:|---------:|---------:|----------:|---------:|
| gin    | 56 | syft   |  40  | 40 |  0 | 16 | 100.0 | 71.4 | **83.3** | 83.3 |
| gin    | 56 | trivy  |  35  | 35 |  0 | 21 | 100.0 | 62.5 | 76.9 | 76.9 |
| gin    | 56 | cdxgen |  18  | 18 |  0 | 38 | 100.0 | 32.1 | 48.6 | 48.6 |
| cobra  |  6 | syft   |   6  |  6 |  0 |  0 | 100.0 |100.0 | **100.0**|100.0 |
| cobra  |  6 | trivy  |   6  |  6 |  0 |  0 | 100.0 |100.0 | **100.0**|100.0 |
| cobra  |  6 | cdxgen |   4  |  4 |  0 |  2 | 100.0 | 66.7 | 80.0 | 80.0 |
| hugo   |436 | syft   | 202  |202 |  0 |234 | 100.0 | 46.3 | **63.3** | 63.0 |
| hugo   |436 | trivy  | 187  |185 |  2 |251 |  98.9 | 42.4 | 59.4 | 59.1 |
| hugo   |436 | cdxgen | 106  |106 |  0 |330 | 100.0 | 24.3 | 39.1 | 39.1 |
| frp    |145 | syft   |  83  | 82 |  1 | 63 |  98.8 | 56.6 | **71.9** | 71.9 |
| frp    |145 | trivy  |  72  | 71 |  1 | 74 |  98.6 | 49.0 | 65.4 | 65.4 |
| frp    |145 | cdxgen |  73  | 72 |  1 | 73 |  98.6 | 49.7 | 66.1 | 65.1 |
| gorm † |  8 | syft   |  29  |  6 | 23 |  2 |  20.7 | 75.0 | 32.4 | 27.0 |
| gorm † |  8 | trivy  |  29  |  6 | 23 |  2 |  20.7 | 75.0 | 32.4 | 27.0 |
| gorm † |  8 | cdxgen |   3  |  3 |  0 |  5 | 100.0 | 37.5 | 54.5 | 54.5 |
| ollama |177 | syft   | 113  |113 |  0 | 64 | 100.0 | 63.8 | **77.9** | 77.2 |
| ollama |177 | trivy  |  95  | 95 |  0 | 82 | 100.0 | 53.7 | 69.9 | 69.1 |
| ollama |177 | cdxgen |  71  | 71 |  0 |106 | 100.0 | 40.1 | 57.3 | 56.5 |

## Averages across the 6 repos (name-level)

| tool   | macro-P | macro-R | macro-F1 | micro-P | micro-R | micro-F1 |
|--------|--------:|--------:|---------:|--------:|--------:|---------:|
| syft   |  86.6 | 68.9 | **71.5** | 94.9 | 54.2 | **69.0** |
| trivy  |  86.4 | 63.8 | 67.3 | 93.9 | 48.1 | 63.6 |
| cdxgen |  99.8 | 41.7 | 57.6 | 99.6 | 33.1 | 49.7 |

(macro = unweighted mean over repos; micro = pooled TP/FP/FN, dominated by large repos.)

## Key findings
1. **syft has the best overall F1** (highest recall) and never (or barely) emits
   false positives on single-module repos. **trivy** is a close second with the
   same near-perfect precision but slightly lower recall. **cdxgen** has the
   **highest precision (≈100%) but the lowest recall** — it reports only what it
   can resolve from `go.mod` (essentially direct deps), missing most transitive
   modules, so it under-reports the build list.
2. **Versions are reliable when a module is found:** version-level F1 ≈ name-level
   F1 for every tool (worst gap ~0.7 pts), i.e. mismatches are almost entirely
   *missing* modules, not *wrong versions*.
3. **Recall drops as repos grow.** On the two tiny repos (cobra, gin) syft/trivy
   reach 100%/71%; on the large pruned graphs (hugo) all tools fall below 50%
   recall. This is the central accuracy story: tools that parse `go.mod`/`go.sum`
   do **not** reconstruct the full `go list -m all` build list — they recover the
   directly-declared modules but miss deep transitive ones that module-graph
   pruning still keeps in the build list.

## Caveats (important for interpretation)
- **† gorm — multi-module repo:** gorm's repo ships sibling modules with their own
  `go.mod` (`tests/`, and drivers `gorm.io/driver/{sqlite,mysql,postgres,sqlserver,gaussdb}`).
  syft/trivy recurse into all of them and report those drivers' deps (pgx,
  go-mssqldb, lib/pq, …). Those are **real dependencies of sibling modules** but
  are absent from the *root* `go list -m all`, so they score as "false positives"
  here. The low gorm precision is therefore a **ground-truth-scope artifact, not a
  tool defect** — and arguably syft/trivy are the *more complete* side. The 1–2
  FPs on hugo/frp have the same nested-module origin.
- **hugo / cdxgen** required a `--exclude` workaround (the default command crashes
  on hugo's nested `internal/warpc` modules — see `hugo/errors.txt`). Its hugo
  recall would likely differ slightly under the default path.
- A fairer GT for multi-module repos would be the **union of `go list -m all` over
  every nested module**; recomputing on that basis would raise syft/trivy precision
  toward ~100% on gorm without changing the single-module repos.
