# 方法 — SBOM 精度の結果をどう作ったか

このドキュメントは `results/metrics.md` の数値を、最初から最後までどう作ったかを説明します。
各リポジトリは4つのステップを通り、最後の5ステップ目で全体を比較します。

---

## ステップ1 — リポジトリのクローン
```bash
git clone --depth=1 https://github.com/<owner>/<repo>.git
```
`--depth=1` は**浅いクローン**で、git の履歴ではなく最新スナップショット（現在のファイル）
のみを取得します。SBOM ツールが読む `go.mod`/`go.sum`/ソースはフルクローンと同一なので、
**クローンの深さは結果に影響しません**。

## ステップ2 — 正解データ(GT)の作成
```bash
go list -m all > gt_go_list.txt
```
`go list -m all` は Go ツールチェイン自身に**ビルドリストの全モジュール**を尋ねます。
これを「正解」とみなします。出力は1行1モジュール（`<パス> <バージョン>`）です。先頭行は
プロジェクト自身なので、後で除外します。

## ステップ3 — 3つのSBOMツールで走査
```bash
syft   <folder> -o cyclonedx-json=syft_output.json
trivy  fs <folder> --format cyclonedx --output trivy_output.json
cdxgen <folder> -o cdxgen_output.json
```
各ツールは CycloneDX 形式の JSON を出力します。Go の依存は
`pkg:golang/github.com/davecgh/go-spew@v1.1.1` のような purl を持つコンポーネントとして現れます。

## ステップ4 — クローンを削除
GT と走査結果を保存すればソースコードは不要なので、ディスクを空けるためクローンを削除します。
残すのは小さなテキスト/JSON の出力だけです。

## ステップ5 — 正解(GT)と走査結果の比較
これは保存済みの全結果に対して一度だけ実行します（`compute_metrics.js`）。
各（リポジトリ, ツール）の組について:

1. GT をモジュールパスの集合にする。
2. ツールの JSON から `pkg:golang/` のコンポーネントだけを取り出し、別の集合にする。
3. 重なりを数える:
   - **TP**（真陽性）  = 報告した、かつ正解にある
   - **FP**（偽陽性） = 報告したが正解に無い
   - **FN**（偽陰性） = 正解にあるが報告しなかった
4. 計算する:
   - **適合率 (Precision)** = TP / (TP + FP) — 報告したもののうち正しかった割合
   - **再現率 (Recall)**    = TP / (TP + FN) — 実際の依存のうち見つけた割合
   - **F1**                 = 2·P·R / (P + R) — 適合率と再現率のバランス

### 名前一致 と バージョン一致
- **名前一致 (name-level):** モジュールの*パス*だけ一致すればよい。
- **バージョン一致 (F1 ver):** パス**かつ**正確なバージョンの一致が必要。
- 両者はほぼ同じ ⇒ ツールはモジュールを見つけたとき、大抵バージョンも正しい。

---

## 範囲と公平性についての注意
両側とも Go モジュール（`pkg:golang/`）のみを比較します。Go 以外のコンポーネント（npm,
GitHub-Actions, generic）と `stdlib` は無視します。正解（`go list -m all`）が Go モジュールのみを
含むためです。マルチモジュール構成（例: gorm）ではルートの `go list` が兄弟モジュールを
取りこぼし、それが偽陽性として現れることがあります（`metrics.md` の注意点を参照）。

## 関連ファイル
- `../run_benchmark.sh` — 固定6リポジトリのステップ1〜4
- `../run_batch.sh`     — awesome-go 規模のステップ1〜4（再開可能）
- `../compute_metrics.js` — ステップ5（比較）
- `metrics.md` / `metrics.csv` / `metrics.json` — 結果
