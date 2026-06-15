# cyclonedx-gomod: app と mod のどちらを使うべきか（隔離実験）

awesome-go から 40 件サンプル（gomod=ok かつ依存>3 を等間隔抽出、実評価できたのは 39 件）を
**新規クローンから自己完結で計測**。同一クローンから GT-imported(linux)・GT-all・`cyclonedx-gomod app`・`cyclonedx-gomod mod` を生成。
既存 `resultsAll` には一切触れず、別ブランチ `claude/gomod-app-vs-mod` ＋別ワークツリーで実行。
環境は本番と同一（syft 1.45 / trivy 0.71.0 / cdxgen 12.5.0 / cyclonedx-gomod v1.10.0 / go1.24.7 / GOOS=linux）。

## 1. app はそもそも動かない repo が多い（カバレッジ）

| 種別 | 件数 | app 出力 |
|---|---:|---|
| ライブラリ（main無し） | 17 | **不可（NA）** |
| app 実行失敗（mainはあるがエラー） | 4 | **不可（NA）** |
| アプリ（root / cmd/* に本物のmain） | 18 | 可 |
| **合計** | **39** | |

- **app が出力を出せたのは 18/39（46%）だけ**。`mod` は **39/39（100%）** 出力。
- app は **main パッケージ（実行アプリ）が必須**なので、ライブラリ（awesome-go の多数派）では構造的に動かない。

## 2. app が動いた repo での精度（vs GT-imported(linux)）

| 対象集合 | ツール | Precision | Recall | F1 |
|---|---|---:|---:|---:|
| 単一バイナリ的 repo (11件, app≈imp) | **app** | **1.00** | **1.00** | **1.00** |
| 〃 | mod | 0.94 | 1.00 | 0.97 |
| app出力ありの全 repo (18件) | app | 0.94 | 0.77 | 0.81 |
| 〃 | **mod** | 0.94 | **1.00** | **0.97** |

- **単一バイナリのアプリでは app が満点(F1=1.00)**。ビルド制約を評価して「そのバイナリが linux で実際にリンクする依存」だけを出すため、imported(linux) と完全一致し、mod の小さな過剰報告を削れる。
  - 例: mbtileserver(imp21/app21/mod22)、cdule(34/34/34)、nicobistolfi(20/20/20)、flowbaker(176/**175**/193)。
- ただし **複数バイナリの repo では app の Recall が落ちる(0.77)**。これは app の欠陥ではなく**スコープの違い**：
  - `app` = **1つの main の依存閉包（1バイナリ）**
  - `GT-imported` = `go list ./...` = **リポジトリ全体の import 和集合**
  - 例: go-task(複数cmd)、woodpecker(cmd/agent+server)、minikube(多数のcmd) では app が1バイナリ分しか測らず imp を下回る。

## 3. vs GT-all（同じ repo 集合, 参考）

| ツール | P | R | F1 |
|---|---:|---:|---:|
| app | 0.78 | 0.28 | 0.39 |
| mod | 0.83 | 0.38 | 0.50 |

all は「全部入り」なので両者とも recall が低い。mod の方がやや多く拾う。

## 結論：使い分け

1. **リポジトリ単位のベンチマーク（本研究, awesome-go, GT=モジュール全体 `go list ./...`, 多数がライブラリ）→ `mod` が正しい。**
   - app はライブラリで動かず、カバレッジ 46% しかない。mod は 100%。
   - GT がモジュール全体スコープなので、全パッケージを集約する mod が構造的に一致（F1=0.97 vs imported）。
   - → 本番 1489 件で `mod` を使ったのは妥当。
2. **「1つの実行バイナリの SBOM」が単位なら → `app` が最良。**
   - ビルド制約を評価し、linux で実際にリンクする依存だけを出す → imported(linux) と完全一致(F1=1.00)。
   - mod の唯一の弱点（他OS依存の過剰報告）を解消できる。
3. **スコープを GT に合わせるのが大前提。** app(1バイナリ) と mod/imported(モジュール全体) は測る単位が違う。複数バイナリ repo を全体評価するなら mod、単一アプリを出荷単位で評価するなら app。
