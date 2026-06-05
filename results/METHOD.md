# Methodology — How the SBOM accuracy results were produced
# 方法 — SBOM 精度の結果をどう作ったか

This document describes, end to end, how the numbers in `results/metrics.md` were made.
Each repository goes through 4 steps; a 5th step compares everything at the end.

このドキュメントは `results/metrics.md` の数値の作り方を最初から最後まで説明します。
各リポジトリは4ステップを通り、最後の5ステップ目で全体を比較します。

---

## Step 1 — Clone the repository / リポジトリのクローン
```bash
git clone --depth=1 https://github.com/<owner>/<repo>.git
```
`--depth=1` is a **shallow clone**: it downloads only the latest snapshot (current files),
not the project's git history. The SBOM tools read `go.mod` / `go.sum` / source, which are
identical to a full clone, so **clone depth does not affect the results**.

`--depth=1` は**浅いクローン**で、git の履歴ではなく最新スナップショット（現在のファイル）
のみを取得します。ツールが読む `go.mod`/`go.sum`/ソースはフルクローンと同一なので、
**クローンの深さは結果に影響しません**。

## Step 2 — Build the Ground Truth (GT) / 正解データの作成
```bash
go list -m all > gt_go_list.txt
```
`go list -m all` asks the Go toolchain itself for **every module in the build list**. We
treat this as the truth. Output = one module per line (`<path> <version>`). The first line
is the project itself and is later excluded.

`go list -m all` は Go ツールチェイン自身に**ビルドリストの全モジュール**を尋ねます。
これを正解とみなします。出力は1行1モジュール（`<パス> <バージョン>`）。先頭行は
プロジェクト自身なので後で除外します。

## Step 3 — Scan with the three SBOM tools / 3つのSBOMツールで走査
```bash
syft   <folder> -o cyclonedx-json=syft_output.json
trivy  fs <folder> --format cyclonedx --output trivy_output.json
cdxgen <folder> -o cdxgen_output.json
```
Each tool outputs CycloneDX JSON. Go dependencies appear as components with a purl like
`pkg:golang/github.com/davecgh/go-spew@v1.1.1`.

各ツールは CycloneDX JSON を出力します。Go の依存は
`pkg:golang/github.com/davecgh/go-spew@v1.1.1` のような purl を持つコンポーネントとして現れます。

## Step 4 — Delete the clone / クローンを削除
The source code is no longer needed once GT + scans are saved, so the clone is deleted to
free disk. Only the small text/JSON outputs are kept.

GT と走査結果を保存したらソースコードは不要なので、ディスクを空けるためクローンを削除します。
小さなテキスト/JSON 出力のみ残します。

## Step 5 — Compare GT vs scans / 正解と走査結果を比較
This runs once over all saved results (`compute_metrics.js`). For each (repo, tool):

これは保存済みの全結果に対して一度だけ実行します（`compute_metrics.js`）。各（リポジトリ, ツール）で:

1. Read GT into a set of module paths. / GT をモジュールパスの集合にする。
2. Read the tool's JSON, keep only `pkg:golang/` components, into another set.
   ツールの JSON から `pkg:golang/` のコンポーネントだけを集合にする。
3. Count overlaps / 重なりを数える:
   - **TP** (True Positive)  = reported **and** in GT / 報告かつ正解にある
   - **FP** (False Positive) = reported but **not** in GT / 報告したが正解に無い
   - **FN** (False Negative) = in GT but **not** reported / 正解にあるが未報告
4. Compute / 計算:
   - **Precision** = TP / (TP + FP)  — of what was reported, how much was correct
     報告のうち正しかった割合
   - **Recall**    = TP / (TP + FN)  — of the real deps, how much was found
     実依存のうち見つけた割合
   - **F1**        = 2·P·R / (P + R) — balance of precision and recall
     適合率と再現率のバランス

### name-level vs version-level / 名前一致 と バージョン一致
- **name-level:** a match needs only the module *path*. / パスのみ一致でOK。
- **version-level (F1 ver):** a match needs path **and** exact version.
  パス**かつ**正確なバージョンの一致が必要。
- They are almost equal here ⇒ when a tool finds a module, it usually has the right version.
  両者はほぼ同じ ⇒ ツールはモジュールを見つけたとき大抵バージョンも正しい。

---

## Scope & fairness note / 範囲と公平性
Only Go modules (`pkg:golang/`) are compared on both sides. Non-Go components (npm,
GitHub-Actions, generic) and `stdlib` are ignored, because the GT (`go list -m all`)
contains only Go modules. For multi-module repos (e.g. gorm) the root `go list` misses
sibling modules, which can show up as false positives — see the caveats in `metrics.md`.

両側とも Go モジュール（`pkg:golang/`）のみ比較します。Go 以外（npm, GitHub-Actions,
generic）と `stdlib` は無視します。正解（`go list -m all`）が Go モジュールのみを含むためです。
マルチモジュール構成（例: gorm）ではルートの `go list` が兄弟モジュールを取りこぼし、それが
誤検出として現れることがあります（`metrics.md` の注意点を参照）。

## Files / 関連ファイル
- `../run_benchmark.sh` — Steps 1–4 for the fixed 6 repos / 固定6リポジトリの手順1〜4
- `../run_batch.sh`     — Steps 1–4 at awesome-go scale (resumable) / 大規模・再開可能版
- `../compute_metrics.js` — Step 5 (the comparison) / 手順5（比較）
- `metrics.md` / `metrics.csv` / `metrics.json` — the results / 結果
