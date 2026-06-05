# SBOM精度ベンチマーク — Goプロジェクト

作成日: 2026-06-04

## 方法
各リポジトリについて: 浅いクローン（`--depth=1`）を作成し、正解となるモジュール一覧と
3つの SBOM ツールを実行し、リポジトリごとに出力を保存し、その後クローンを削除します。

- 正解(GT): `go list -m all` → `gt_go_list.txt`
- syft 1.45.0: `syft <folder> -o cyclonedx-json` → `syft_output.json`
- trivy 0.71.0: `trivy fs <folder> --format cyclonedx` → `trivy_output.json`
- cdxgen 12.5.0: `cdxgen <folder> -o cdxgen_output.json`
- cyclonedx-gomod 1.10.0: `cyclonedx-gomod mod -json -output cyclonedx-gomod_output.json <folder>`（Go 専用ツール）

環境: go 1.24.7（各リポジトリの go.mod に従い 1.25.0 へ自動更新）, node 22.22.2。
各リポジトリの診断出力は `errors.txt` に保存（多くは情報メッセージであり、失敗ではありません）。

## 検出した Go モジュール数（`pkg:golang/` のみ）

| リポジトリ | go list（正解の依存数） | syft | trivy | cdxgen | cyclonedx-gomod |
|--------|------------------:|-----:|------:|-------:|----------------:|
| gin    | 56                |  40  |  35   |  18    |  28  |
| cobra  |  6                |   6  |   6   |   4    |   5  |
| hugo   | 436               | 202  | 187   | 106 *  | 183  |
| frp    | 145               |  83  |  72   |  73    |  69  |
| gorm   |  8                |  29  |  29   |   3    |   3  |
| ollama | 177               | 113  |  95   |  71    |  89  |

上表は `pkg:golang/` コンポーネントのみ（メインモジュール除外）。syft/trivy/cdxgen は Go 以外
（npm, GitHub-Actions 等）も検出しますが、ここでは Go モジュールだけを数えています。
cyclonedx-gomod は「実際に import される本番モジュール」のみを報告するため、テスト依存を含む
`go list` より少なくなります。

→ Precision・Recall・F1 の分析は `metrics.md` と `metrics.csv` を参照。
→ 計算方法の詳しい説明は `METHOD.md` を参照。

## 特記事項
* **hugo / cdxgen**: 素のコマンドはクラッシュしました（`TypeError ... createGoBom`）。原因は
  hugo のネストモジュール `internal/warpc/genwebp` で `go list -deps` が失敗したためです。
  保存した出力は `--exclude` の回避策で生成しました（`hugo/errors.txt` 参照）。これはマルチモジュール
  構成の Go リポジトリにおける cdxgen の実際の限界であり、研究上の重要なデータ点でもあります。
* それ以外のツール実行はすべてエラーなく完了しました。

`../run_benchmark.sh` でこの6リポジトリの実行を再現できます。大規模（awesome-go 全体）の
パイプラインは `../PIPELINE.md` を参照してください。
