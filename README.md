# census2: Go向けSBOM生成ツール評価の研究成果物

このブランチには，Goプロジェクト向けSBOM生成ツール4種を，3種類の正解データ（Ground Truth: GT）と比較した実験のスクリプト，データ，検証結果を収録しています。

## 研究の概要

対象ツールは次の4種です。

- Syft 1.46.0
- Trivy 0.72.0
- cdxgen 12.7.1
- CycloneDX GoMod 1.10.0

各ツールの出力を，次の3種類のGTと比較しました。

- **GT-all**: `go list -m -e all` によるbuild list全体
- **GT-imported**: Linux向け通常コードからたどれる外部モジュール
- **GT-imported+test**: GT-importedにテストコード専用の依存を加えたもの

awesome-goから収集した2,723リポジトリのうち，GT-importedが空でない1,528件を評価対象としました。ツールがSBOMを正常出力できたリポジトリ数はツールごとに異なります。

## まず結果を確認する

集計済みの結果は次のファイルで確認できます。

- `SUMMARY_census.md`: 実験条件，主要結果，ロバストネス検証，FP要因分析
- `SUMMARY2_concepts_ja.md`: GT，Go依存関係，評価方法を理解するための補足
- `per_repo_metrics.md`: リポジトリ・ツールごとの評価結果
- `repo_manifest.md`: 全対象リポジトリの状態と計測時コミット

## コミット済みデータから表を再計算する

この確認にはNode.jsのみを使用します。リポジトリのルートで次を実行してください。

```bash
node aggregate.js
node verify.js
```

- `aggregate.js`は`metrics.csv`と`manifest.csv`から`SUMMARY_census.md`を再生成します。
- `verify.js`は別の集計ロジックで主要な表を再計算し，結果を標準出力へ表示します。

現在コミットされているデータでは，`aggregate.js`による再生成結果がコミット済みの`SUMMARY_census.md`と一致することを確認しています。

## データの流れ

1. `repolist.csv`に記録されたリポジトリを取得する。
2. `proc.sh`が4ツールを実行してSBOMを生成する。
3. 同じリポジトリについて3種類のGTを生成する。
4. `scorer.js`がSBOMと各GTを集合として比較し，TP・FP・FNを求める。
5. リポジトリ・ツールごとの結果を`metrics.csv`へ保存する。
6. `aggregate.js`と`stats_wilcoxon.js`が集計と統計解析を行う。

比較時には，対象プロジェクト自身とGo標準ライブラリをGT側・ツール側の両方から除外します。モジュール名のみの比較と，モジュール名・バージョンを組み合わせた比較の両方を記録しています。

## 重要なファイル

### 入力・結果データ

| ファイル | 内容 |
|---|---|
| `repolist.csv` | awesome-goから収集した2,723件の入力リスト |
| `manifest.csv` | URL，計測時SHA，Goバージョン，GT件数，処理状態 |
| `metrics.csv` | 各リポジトリ・ツールのTP・FP・FNとFP分類 |
| `tool_versions.txt` | Go，ツールのバージョン，計測日時 |

### 実験パイプライン

| ファイル | 内容 |
|---|---|
| `proc.sh` | 1リポジトリについてツール実行，GT生成，採点を行う中核処理 |
| `scorer.js` | SBOMとGTを比較し，TP・FP・FNを算出 |
| `drive.sh` | 全リポジトリの実験を駆動 |
| `worker.sh` | 通常リポジトリの処理 |
| `heavy_worker.sh` | 処理に時間がかかるリポジトリの処理 |
| `aggregate.js` | CSVから最終サマリを再生成 |
| `stats_wilcoxon.js` | Wilcoxon符号付順位検定と効果量の計算 |
| `render_md.js` | CSVを人が読めるMarkdown表へ変換 |
| `verify.js` | 主要結果の独立再計算 |

### 追加検証

- `validate/`: GT-importedの妥当性と再現性の検証
- `rerun/`: 一部リポジトリの再実行と差分調査
- `rerun2/`: 全1,528リポジトリの再計測（1,526件を計測，恒久SKIP 2件）。各リポジトリの
  GT 3定義と4ツールの検出結果をモジュール一覧（TSV）で保存し，生SBOM（`raw/`）と
  stderr も残している。7月の `scorer.js` をそのまま実行して照合した結果は `match` 98.9%，
  再現できなかった差分は4行。詳細は `rerun2/README.md`

これらは論文中の実装上の注意点や限界を確認するための記録です。

## 実験全体を再実行する場合

完全な再実行にはLinux環境，Go 1.26.5，Node.js，Git，および上記4ツールの指定バージョンが必要です。多数のリポジトリを取得して各ツールを実行するため，十分な時間，ディスク容量，ネットワーク接続も必要です。

現行の実行スクリプトには，計測環境で使用した次の絶対パスが含まれています。

- `/home/user/SBOM`
- `/opt/go1265/go/bin`

そのため，別の環境で完全再実行する場合は，これらのパスを環境に合わせる必要があります。科学的な処理内容を変えないため，この公開用ブランチでは実験コード自体は変更していません。

## 収録範囲と制限

- 集計済みの`manifest.csv`と`metrics.csv`，集計・検証スクリプトは収録しています。
- 計測対象は`manifest.csv`のSHAで特定できます。
- 初回計測時の全リポジトリ分の生SBOM JSONと生GTファイルは保存していません。
- したがって，コミット済みCSVから集計表を再計算することはできますが，生出力から`metrics.csv`を完全に再構築するにはツールを再実行する必要があります。
- `-e`，`go.work`，Go toolchain，vendorなどの条件によって`go list`の挙動が変化する場合があります。実施した対処と確認結果は`SUMMARY_census.md`に記録しています。

## 主要結果

GTの定義によってツールの順位が変化しました。

- GT-allのmacro-F1ではSyftが73.0%，cdxgenが52.8%
- GT-importedのmacro-F1ではcdxgenが93.2%，Syftが67.0%
- 4ツールすべてが成功した共通集合1,467件でも順位は変わらず，各ツールの変化は1ポイント未満

この結果は，「SBOMの精度」は採用する正解データの定義に依存することを示しています。
