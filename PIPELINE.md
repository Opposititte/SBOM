# 大規模 SBOM 精度パイプライン（awesome-go 全体）

awesome-go の全 Go リポジトリを走査し、syft / trivy / cdxgen が各リポジトリの
`go list -m all` の依存集合をどれだけ正確に再現できるかを測定します。**自動では実行されません。**

## ファイル
- `gen_repo_list.js` — awesome-go の README を取得し、重複のないリポジトリ URL を抽出 → `repos.txt`。
- `run_batch.sh` — 再開可能なハーネス: クローン → go list / syft / trivy / cdxgen → クリーンアップ。
- `compute_metrics.js` — すべての `results/<name>/` を自動検出し P/R/F1 を計算 → `metrics.json` + `metrics.csv`。
- `run_benchmark.sh` — 最初の固定6リポジトリ用スクリプト（参考）。

## 実行方法（準備ができたら）

```bash
# 1. awesome-go からリストを作成（リポジトリ数を表示）
node gen_repo_list.js repos.txt

# 2. 5件で試験実行（push なし）
PUSH=0 LIMIT=5 ./run_batch.sh

# 3. 本実行（25件ごとに push）
./run_batch.sh            # 再実行すれば続きから再開する

# 4. 指標を計算
node compute_metrics.js
```

## なぜ安全にスケールするか
- **再開可能:** 完了したリポジトリは `.done` で記録され、スキップされます。停止や
  コンテナの破棄が起きても、再実行すれば続きから継続できます。
- **ディスク使用量を抑制:** 各クローンは `--depth=1` で、走査後すぐに削除します。Go の
  モジュールキャッシュとダウンロードしたツールチェインは `.gocache/` に隔離し、定期的に削除します。
  ピーク時でも概ね1リポジトリ分のディスクしか使いません。
- **進捗の永続化:** 結果は一定件数ごとに GitHub へ push されます。
- **堅牢:** 各ツール実行に `timeout` を設定。失敗は `results/<name>/errors.txt` と
  `results/_manifest.csv` に記録され、1件の失敗で全体が止まることはありません。

## 設定（`run_batch.sh` の環境変数）
`LIMIT`, `START`, `BATCH_SIZE`, `PUSH`, `TOOL_TIMEOUT`, `CLONE_TIMEOUT`,
`MODCACHE_CLEAN_EVERY`, `REPO_LIST`, `BRANCH` — 詳細は `run_batch.sh` 冒頭のコメントを参照。

## 規模の目安
awesome-go には約2,000〜2,500件のリポジトリがあります。1件あたり約0.7MB の結果なので、
JSON 全体で約1.5〜2GB（ディスクにも GitHub にも問題ありません）。主なコストは**時間**で、
1件あたり数十秒 ⇒ 合計で数時間になります。複数のセッションに分けて実行し、再開機能で
継続するのがよいでしょう。

## 追加候補の SBOM ツール（awesome-go = Go 専用スキャン向け）
現在は syft / trivy / cdxgen（いずれも多言語対応の汎用スキャナ）。Go 精度の研究として
**1〜2個**足すなら、以下が有力です。

1. **cyclonedx-gomod**（CycloneDX 公式の Go 専用ツール）— **最優先で推奨**。
   Go ツールチェイン（`go list`/`go mod`）を直接使うため、`go list -m all` にほぼ一致する高精度が
   期待できる。汎用スキャナ（syft/trivy/cdxgen）の「上限の基準（best case）」として比較でき、
   「Go ネイティブ vs 汎用」という論文の主張を強くできる。
   例: `cyclonedx-gomod mod -json -output cdxgomod_output.json <folder>`
2. **Microsoft sbom-tool**（SPDX 形式）または **kubernetes-sigs/bom**（SPDX）— 任意の第2候補。
   出力形式（SPDX）と実装の多様性を加えられる。purl ではなく SPDX の外部参照で Go モジュールを表すため、
   比較スクリプト側に SPDX パーサを足す必要がある点に注意。

注意: cyclonedx-gomod は**ビルド可能な Go モジュール**（`go.mod` 必須）を前提とする。
非 Go / 非モジュールのリポジトリでは失敗するので、`run_batch.sh` と同様に「失敗は記録して継続」する。
