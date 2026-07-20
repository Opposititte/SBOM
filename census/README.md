# census/ — awesome-go 全リポジトリ SBOM精度 再計測 一式

`SUMMARY_fresh.md` の全計測を **最初から回し直し**、かつ今回は
**計測した各リポジトリを台帳として記録**するための、使用コード一式（1フォルダ集約）。

## 何を測るか
全 awesome-go リポジトリ（`repolist.csv`）を1回のクローン上で、
3つの正解定義（GT）と4つのSBOMツールを**同時生成**して照合する。

- **GT（正解）3定義**
  - `all`  = `go list -m all`（モジュールbuild list 全体）
  - `imp`  = `GOOS=linux go list -deps`（root・linux・非test の実コンパイルグラフ）
  - `impT` = imp ＋ test 依存
- **ツール4種**: `syft` / `trivy` / `cdxgen` / `cyclonedx-gomod`
- **照合軸**: name一致 / version一致 × 上記3GT の TP/FP/FN、＋ FP原因6分類

## ファイル一覧

### 実行コード（パイプライン）
| ファイル | 役割 |
|---|---|
| `drive.sh` | **オーケストレータ**。todo算出→25件バッチで `xargs -P6 worker.sh`→merge→commit→push を逐次実行。各バッチ前に全Goキャッシュを無条件パージ（容量一定化）。背景常駐サブシェルを使わない安定設計。中断/コンテナ破棄に強い（進捗の真実は committed `manifest.csv`、再実行で続きから）。使い方: `bash census/drive.sh [P=6] [BATCH=25]` |
| `worker.sh` | 1リポジトリを900sタイムアウトで処理する並列単位。`parts/<name>.csv` があればスキップ（再開用）。 |
| `proc.sh` | **1リポジトリの本体処理**。shallow clone→SHA/日付/go版を記録→4ツール実行→3GT算出→`scorer.js`で採点。ディスク番人（空き<1.5Gでgo mod download中断）内蔵。 |
| `scorer.js` | 1リポジトリ分の採点。purl/GT を正規化し name/version × all/imp/impT の tp/fp/fn（18列）＋FP原因6分類（test/他OS/direct未使用/indirect未使用/gosum由来/兄弟）を1行で出力。 |

### 集計・レンダリング
| ファイル | 役割 |
|---|---|
| `aggregate.js` | `metrics.csv`→ **`SUMMARY_census.md`**。macro/micro の P/R/F1（name/version × 3GT）、TP/FP/FN合計、有効/NA数、FP原因バケツ。＝`SUMMARY_fresh.md`相当を再生成。 |
| `render_md.js` | CSV→MD。**`per_repo_metrics.md`**（各repo×tool の tp/fp/fn/F1）と **`repo_manifest.md`**（リポジトリ版台帳）を生成。 |
| `categorize.js` | `manifest.csv` に **category列**（末尾）を追加/更新（冪等）: OK / non_go(go.mod無し) / go_empty(Goだがimported空) / clone_fail。manifest再生成後に実行する。 |
| `verify.js` | `metrics.csv` から全集計表を **独立ロジックで再計算**（aggregate.js の検算用）。 |

### 入力・記録
| ファイル | 内容 |
|---|---|
| `repolist.csv` | 対象リポジトリ `name,url`（awesome-go README由来、`repos.txt`から生成）。 |
| `tool_versions.txt` | 今回使用したツール版（再現性のため固定記録）。 |

### 出力（生成物）
| ファイル | 内容 |
|---|---|
| `manifest.csv` / `repo_manifest.md` | **計測した全リポジトリの台帳**（名前/URL/SHA/日付/モジュール/go版/GTサイズ/status）。 |
| `metrics.csv` / `per_repo_metrics.md` | 各repo×tool の TP/FP/FN ＋ FP原因分類。 |
| `SUMMARY_census.md` | 集計サマリ（P/R/F1 各表）。 |

| `SUMMARY2_concepts_ja.md` | 用語・依存グラフ・GT-imported/impT・刈り込み・go.sum の解説（混乱しやすい所メモ）。 |

## 最終集計の回し方（データ収集完了後）
```bash
node census/aggregate.js    # -> SUMMARY_census.md
node census/render_md.js    # -> per_repo_metrics.md, repo_manifest.md
```

## 注意
- ツール版は前回計測時と異なる（`tool_versions.txt` に明記）。syft/trivy はこの環境の
  egressプロキシがGitHubリリース配布を弾くため `go install` でソースビルドした。
- `parts/` `manifest_parts/` `data/` `.cache` 等の中間物は `.gitignore` 済み
  （進捗の真実は committed の `manifest.csv`）。
