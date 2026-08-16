# cold 再計測の主要指標と、7月との比較

## 何を確認したか

7月の計測を全1,528件やり直した結果（`remeasurement-full/`）から、**論文の主要推定値を
直接再集計し、7月の値と突き合わせた**記録である。

`remeasurement-full/out/verify.csv` の行一致率（98.9%）は行単位の指標であり、
少数の巨大リポジトリが集計値を動かす可能性を完全には否定できない。特に micro 集計は
1行の重みが均等でない。そこで**F1・ツール順位・GT間の変化量・Wilcoxon の効果量**そのものを
比較した。

## 結論

**同一の1,466件では、cold 化による主要推定値への実質的な影響は観測されなかった。**

（「環境差はゼロ」と断定できるだけの検出力はない。観測されなかった、が正確である。）

### macro F1（name一致・全件）

| ツール | GT-all | GT-imported | GT-imported+test |
|---|---|---|---|
| Syft | 73.0 → 72.9 | 67.0 → 67.1 | 78.3 → 78.3 |
| Trivy | 72.5 → 72.5 | 68.4 → 68.4 | 79.7 → 79.7 |
| cdxgen | 52.8 → 52.7 | 93.2 → 93.3 | 82.3 → 82.4 |
| cyclonedx-gomod | 56.5 → 56.5 | 94.5 → 94.5 | 82.5 → 82.5 |

12値すべてで差は **0.1ポイント以下**。ツール順位は3つの GT 定義すべてで不変。

### 同一リポジトリ集合（n=1,466）での比較

7月と cold の**両方で4ツールとも有効**だった1,466件に揃えると、標本構成の差が消え、
環境条件の差だけが残る。

| | 7月 | cold |
|---|---|---|
| macro F1（12値） | — | **10値が完全一致、2値が0.1pt差** |
| cdxgen > Syft (imported) | 1279/6、+23.1pt、効果量 0.99、z=30.8 | 1278/6、+23.1pt、**0.99**、z=30.8 |
| Syft > cdxgen (all) | 1229/57、+18.8pt、効果量 0.95、z=29.6 | 1228/57、+18.7pt、**0.95**、z=29.6 |

勝敗が1件動くのみ。**効果量は小数第2位まで一致**し、統計的結論は変わらない。

したがって、全件比較で見えた小さな差（最大0.1pt）は環境条件ではなく、
**標本構成の差**（下記）でほぼ説明できる。

## 母集団の差について

7月は1,528件、cold は1,526件を集計対象としている。差の2件は**測れなかった**ものであり、
分析上の除外ではない。

| repo | 理由 |
|---|---|
| `homedepot__flop` | 7月の `manifest.csv` に commit SHA が記録されていない。HEAD で代用すると7月と別のコードを測ることになるため計測しない |
| `kcmvp__gob` | リポジトリが非公開化または削除され取得不能（git が認証を要求する状態） |

またツールごとの有効件数は cold の方がやや多い（例: syft 1,519 → 1,525）。これは
7月に NA だったツールが今回は出力を出した **`july_tool_na` 4件**があるためで、
`remeasurement-full/out/verify.csv` に記録している。

ツールごとの有効件数と、4ツール共通集合の両方を `valid_counts.csv` と
`common_repos.csv` に保存している。

## 注意（この再集計で再現できていないもの）

**FP要因分類の6列（`fp_test` / `fp_otherOS` / `fp_direct_unused` / `fp_indirect_unused` /
`fp_gosum_only` / `fp_sibling`）は再現できていない。**

`scorer.js` がこの分類に使う補助集合（`win.txt` / `mod_direct.txt` / `mod_indirect.txt` /
`gosum.txt`）を `remeasurement-full` が保存していないため、空を与えて計算している。
`metrics_cold.csv` の該当6列は**無効値**であり、使用してはならない。

P/R/F1 と TP/FP/FN には影響しない。ただし論文の **RQ2（各ツールが依存を読み取る情報源の違い）**
に関わる FP 要因分析は、この cold 再集計では独立に検証できていない。
**主要 P/R/F1 の再現と、RQ2 の独立再検証を混同しないこと。**

また、micro（プール合計）は母数の影響を受けるため数%動いている
（例: syft の GT-all TP が 76,929 → 77,310、+0.5%）。macro はリポジトリごとの重みが
等しいため影響を受けない。詳細は `pooled_tp_fp_fn.csv`。

## この検証の位置づけ

**独立再実装ではない。** GT 生成コマンドと4ツールの実行コマンドは7月の `proc.sh` から
移植しており、採点は7月の `scorer.js` を無改変で呼んでいる。したがってこれは
**既存の測定・採点手順を用いた計算再現および内部監査**であり、7月の設計上の判断が
誤っていた場合には同じ誤りを再現する。

## ファイル

| ファイル | 内容 |
|---|---|
| `macro_f1.csv` | 4データセット × 3集計表 × 4ツール × 3GT の P/R/F1（144行） |
| `wilcoxon.csv` | 4データセットの勝敗・中央値差・効果量・z・p（20行） |
| `pooled_tp_fp_fn.csv` | プール合計 TP/FP/FN（48行） |
| `valid_counts.csv` | ツールごとの有効件数と NA 件数（16行） |
| `common_repos.csv` | 7月・cold の両方で4ツール有効だった1,466件 |
| `metrics_cold.csv` | cold 条件のリポジトリ単位採点結果（7月の `metrics.csv` と同一形式、6,104行） |
| `tool_versions.txt` | cold 計測時の実測バージョン |
| `raw-output/` | `verify.js` / `stats_wilcoxon.js` の生出力8本（証跡） |
| `scripts/` | 再現用スクリプト2本 |
| `checksums.txt` | 上記すべての SHA-256 |

データセット名の対応:

- `july_full` … 7月の `metrics.csv`（1,528件）
- `cold_full` … cold の `metrics_cold.csv`（1,526件）
- `july_n1466` / `cold_n1466` … 共通1,466件に限定

## 再現手順

```bash
# 1. cold 計測結果から metrics_cold.csv を作る（7月の scorer.js を実行）
node remeasurement-full/cold-summary/scripts/build_cold_metrics.js

# 2. 4データセットに対して verify.js / stats_wilcoxon.js を実行し raw-output/ に保存
#    （データセットごとに metrics.csv を置いたディレクトリで実行する）

# 3. 生出力を構造化 CSV に変換
node remeasurement-full/cold-summary/scripts/make_summary.js
```

`make_summary.js` は生出力をパースするだけで、数値の再計算は行わない
（集計ロジックの二重実装を避けるため）。

## 実行環境・日時

- 生成日時: `checksums.txt` 冒頭に記録
- ツールバージョン: `tool_versions.txt`
- 7月のデータ（`metrics.csv` / `manifest.csv`）は**上書きしていない**。
  cold の結果は本ディレクトリに分離して保存している。
