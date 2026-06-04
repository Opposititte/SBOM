# SBOM Accuracy Benchmark — Go Projects
# SBOM精度ベンチマーク — Goプロジェクト

Generated: 2026-06-04 / 作成日: 2026-06-04

## Method / 方法
For each repository: shallow clone (`--depth=1`), run the ground-truth module list and
three SBOM tools, save outputs per repo, then delete the clone.

各リポジトリについて: 浅いクローン（`--depth=1`）を作成し、正解となるモジュール一覧と
3つの SBOM ツールを実行し、リポジトリごとに出力を保存し、その後クローンを削除します。

- Ground truth / 正解: `go list -m all` → `gt_go_list.txt`
- syft 1.45.0: `syft <folder> -o cyclonedx-json` → `syft_output.json`
- trivy 0.71.0: `trivy fs <folder> --format cyclonedx` → `trivy_output.json`
- cdxgen 12.5.0: `cdxgen <folder> -o cdxgen_output.json`

Environment / 環境: go 1.24.7（各リポジトリの go.mod に従い 1.25.0 へ自動更新）, node 22.22.2。
Per-repo diagnostics are in `errors.txt` (mostly informational noise, not failures).
各リポジトリの診断出力は `errors.txt`（多くは情報メッセージで、失敗ではありません）。

## Component counts / 検出コンポーネント数 (CycloneDX `components[]`)

| repo   | go list (modules) | syft | trivy | cdxgen |
|--------|------------------:|-----:|------:|-------:|
| gin    | 57                |  60  |  37   |  28    |
| cobra  | 7                 |  16  |   8   |  10    |
| hugo   | 437               | 232  | 191   | 120 *  |
| frp    | 146               | 171  | 137   | 597    |
| gorm   | 9                 |  59  |  37   |  11    |
| ollama | 178               | 495  | 437   | 966    |

`go list -m all` counts the full transitive module build list (incl. the main module);
the tools count CycloneDX components, which may include non-Go artifacts (e.g. vendored
C/C++ for ollama, npm for hugo), so raw counts are not directly comparable.

`go list -m all` は推移的なモジュールのビルドリスト全体（メインモジュール含む）を数えます。
一方ツールは CycloneDX コンポーネント数で、Go 以外の成果物（ollama の C/C++、hugo の npm 等）を
含みうるため、生の数値は直接は比較できません。

→ Precision / Recall / F1 analysis: see `metrics.md` and `metrics.csv`.
→ 適合率・再現率・F1 の分析は `metrics.md` と `metrics.csv` を参照。

## Notable / 特記事項
* **hugo / cdxgen**: the plain command CRASHED (`TypeError ... createGoBom`) because
  `go list -deps` failed on hugo's nested module `internal/warpc/genwebp`. The committed
  output used a `--exclude` workaround — see `hugo/errors.txt`. This is a real cdxgen
  limitation on multi-module Go repos and is itself a relevant data point.
* All other tool runs completed without errors.

* **hugo / cdxgen**: 素のコマンドはクラッシュした（`TypeError ... createGoBom`）。原因は
  hugo のネストモジュール `internal/warpc/genwebp` で `go list -deps` が失敗したため。
  保存した出力は `--exclude` の回避策で生成（`hugo/errors.txt` 参照）。これはマルチモジュール構成の
  Go リポジトリにおける cdxgen の実際の限界であり、研究上の重要なデータ点でもある。
* それ以外のツール実行はすべてエラーなく完了。

`../run_benchmark.sh` reproduces this 6-repo run. For the large-scale (all of awesome-go)
pipeline, see `../PIPELINE.md`.
`../run_benchmark.sh` でこの6リポジトリの実行を再現できます。大規模（awesome-go 全体）の
パイプラインは `../PIPELINE.md` を参照。
