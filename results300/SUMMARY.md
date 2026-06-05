# 300リポジトリ規模の SBOM 精度評価（awesome-go 先頭300件）

作成日: 2026-06-05。対象: awesome-go の先頭 **300** リポジトリ。
ツール: syft 1.45.0, trivy 0.71.0, cdxgen 12.5.0（`-t go`）, cyclonedx-gomod 1.10.0。
正解(GT)= `go list -m all`。比較対象は `pkg:golang/` のみ。

## 概要 / データの内訳
- クローン成功: **307** /（クローン失敗: 2、再試行で解消）
- `go list -m all` 成功（= Go モジュール）: **272**
- 依存を持つ（gt>1）リポジトリ: **220**
- **指標を計算できたリポジトリ: 216**（残り84件は Go でない / 依存ゼロのため metrics から除外）

awesome-go の先頭300件にはライブラリ一覧・記事・単一ファイルのユーティリティ等が含まれるため、
約3割は Go モジュールでない、または依存ゼロでした（想定どおり）。

## ツール実行の成功数（クローン成功307件中）
| ツール | 成功 | 備考 |
|--------|----:|------|
| syft            | 307 | ほぼ全件で実行可能 |
| trivy           | 306 | |
| cdxgen          | 290 | 17件失敗（大規模・ネストモジュール等） |
| cyclonedx-gomod | 276 | go.mod 必須のため非Go等で失敗 |

## 精度の平均（216リポジトリ, 名前一致, ％）

| ツール | macro-P | macro-R | macro-F1 | micro-P | micro-R | micro-F1 |
|--------|--------:|--------:|---------:|--------:|--------:|---------:|
| **syft**            | 92.5 | 71.0 | **76.2** | 88.5 | 52.3 | 65.7 |
| **trivy**           | 91.7 | 71.2 | 75.5 | 87.9 | 47.0 | 61.3 |
| cdxgen          | 91.6 | 45.0 | 55.6 | 94.8 | 27.9 | 43.1 |
| cyclonedx-gomod | 88.8 | 41.7 | 53.1 | 99.8 | 36.6 | 53.5 |

macro = リポジトリ単位の単純平均／ micro = 全体合算（大きいリポジトリの影響大）。
per-repo の生データは `metrics.csv`、全数値は `metrics.json`。

## 主な知見
1. **syft が総合 F1 最良（76.2）、trivy がほぼ同等（75.5）**。両者は Recall 約71% と高い。
   6リポジトリ時と同じ傾向が、規模を拡大しても安定して再現された。
2. **cdxgen と cyclonedx-gomod は Recall が低め（約42〜45%）**。cyclonedx-gomod は
   「実際に import される本番モジュール」のみを報告するため、テスト依存を含む `go list -m all`
   に対しては Recall が下がる（精度が悪いのではなく対象範囲が狭い）。
3. **cyclonedx-gomod は micro-P 99.8% と最も誤検出が少ない**。Go ツールチェイン経由で
   ルートモジュールのみを解析するため。用途が「実際に使う依存の高精度な把握」なら有力。
4. **規模拡大で syft/trivy の macro-P が向上（86→92%台）**。gorm のような
   マルチモジュール由来の誤検出は全体では少数派のため、平均が押し上げられた。

## 方法上の注意
- cdxgen は **`-t go`** で実行（Go に限定）。これは cdxgen が多言語の深い解析で /tmp に
  数GBの Python venv を作成しディスクを圧迫したため。`pkg:golang/` のみを比較する本評価では
  Go の出力は変わらない。
- 大規模リポジトリ（cosmos-sdk 等）は依存が GB 単位になるため、Go モジュールキャッシュを
  10リポジトリごとに削除してディスクを抑制した。
- 各リポジトリの詳細・失敗ログは `results300/<owner__repo>/errors.txt` と `_manifest.csv`。

## 再現方法
```bash
node gen_repo_list.js repos.txt          # awesome-go 全2723件のURL
head -300 repos.txt > repos300.txt        # 先頭300件
REPO_LIST=repos300.txt RESULTS=results300 LIMIT=0 \
  TOOL_TIMEOUT=240 MODCACHE_CLEAN_EVERY=10 ./run_batch.sh
RESULTS=results300 node compute_metrics.js
```
