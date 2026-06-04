# Large-scale SBOM accuracy pipeline (all of awesome-go)
# 大規模 SBOM 精度パイプライン（awesome-go 全体）

Scan every Go repo in awesome-go and measure how accurately syft / trivy / cdxgen
reproduce each repo's `go list -m all` dependency set. **Nothing runs automatically.**

awesome-go の全 Go リポジトリを走査し、syft / trivy / cdxgen が各リポジトリの
`go list -m all` の依存集合をどれだけ正確に再現できるかを測定します。**自動実行はされません。**

## Files / ファイル
- `gen_repo_list.js` — fetch the awesome-go README, extract unique repo URLs → `repos.txt`.
  awesome-go の README を取得し、重複のないリポジトリ URL を抽出 → `repos.txt`。
- `run_batch.sh` — resumable harness: clone → go list / syft / trivy / cdxgen → cleanup.
  再開可能なハーネス: クローン → 各ツール実行 → クリーンアップ。
- `compute_metrics.js` — auto-discovers all `results/<name>/`, computes P/R/F1
  → `metrics.json` + `metrics.csv`.
  すべての `results/<name>/` を自動検出し P/R/F1 を計算 → `metrics.json` + `metrics.csv`。
- `run_benchmark.sh` — the original fixed 6-repo script (reference).
  最初の固定6リポジトリ用スクリプト（参考）。

## How to run / 実行方法 (when ready / 準備ができたら)

```bash
# 1. Build the repo list from awesome-go / awesome-go からリスト作成
node gen_repo_list.js repos.txt

# 2. Smoke-test on 5 repos, no pushing / 5件で試験実行（push なし）
PUSH=0 LIMIT=5 ./run_batch.sh

# 3. Full run, pushes every 25 repos / 本実行（25件ごとに push）
./run_batch.sh            # re-run anytime to resume / 再実行で続きから再開

# 4. Compute metrics / 指標を計算
node compute_metrics.js
```

## Why it scales safely / なぜ安全にスケールするか
- **Resumable / 再開可能:** finished repos have a `.done` marker and are skipped.
  Stopping or container reclamation just means "re-run to continue".
  完了したリポジトリは `.done` で記録され、スキップされる。停止やコンテナ破棄後も再実行で継続。
- **Bounded disk / ディスク使用量を抑制:** each clone is `--depth=1` and deleted right
  after scanning; the Go module cache + downloaded toolchains live under `.gocache/` and
  are cleared periodically. Peak disk ≈ one repo at a time.
  各クローンは `--depth=1` で走査後すぐ削除。Go のキャッシュは `.gocache/` に隔離し定期削除。
  ピーク時でも概ね1リポジトリ分のみ。
- **Durable progress / 進捗の永続化:** results pushed to GitHub in batches.
  結果は一定件数ごとに GitHub へ push。
- **Robust / 堅牢:** every tool call has a `timeout`; failures are logged to
  `results/<name>/errors.txt` and `results/_manifest.csv`; one bad repo never stops the run.
  各ツールに `timeout`。失敗は `errors.txt` と `_manifest.csv` に記録。1件の失敗で全体は止まらない。

## Knobs / 設定 (env vars for `run_batch.sh`)
`LIMIT`, `START`, `BATCH_SIZE`, `PUSH`, `TOOL_TIMEOUT`, `CLONE_TIMEOUT`,
`MODCACHE_CLEAN_EVERY`, `REPO_LIST`, `BRANCH` — see the header of `run_batch.sh`.
詳細は `run_batch.sh` 冒頭のコメントを参照。

## Scale expectations / 規模の目安
awesome-go lists ~2,000–2,500 repos. At ~0.7 MB of results per repo that's ~1.5–2 GB of
JSON (fine for disk and GitHub). The real cost is **time** (tens of seconds per repo ⇒
many hours), so run across several sessions and let the resume logic carry it.

awesome-go には約2,000〜2,500件。1件あたり約0.7MB なので結果は約1.5〜2GB（ディスク/GitHub とも問題なし）。
主なコストは**時間**（1件あたり数十秒 ⇒ 合計で数時間）。複数セッションに分け、再開機能で継続するのが良い。
