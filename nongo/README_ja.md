# cdxgen を Go 以外の言語で動かすとどうなるか（Python / PHP / JavaScript）

## 背景・目的
本体の研究（`../run_batch.sh` ほか）では、**Go** リポジトリに対して cdxgen が
`go list -m all` の依存集合をどれだけ再現できるかを測定した。結果、cdxgen の Go は
**Precision がほぼ 100%（誤検出ゼロが特徴）／Recall 中程度／F1 ≈ 56–58%** だった
（216 件で P=92% R=45% F1=56%、厳選 6 件で P=100% R=42% F1=58%）。

残課題は「**Go 以外の言語だと cdxgen はどうなるのか**」。本ディレクトリでは
**Python / PHP / JavaScript を各 2 件**、フォルダを**完全に分離**し、すべて **Linux** 上で実験した。

## 方法論（Go 研究と同じ思想）

### この実験の「正解」は Go の `-m all` 相当（imported ではない）
正解は **ネイティブのパッケージマネージャが解決・インストールする完全な推移依存集合**
（prod + dev + test + ツール依存、ピン留め）。Go の **`go list -m all`（ビルドグラフ全体）に対応**する。
`go list -deps` 相当の「実際に import / コンパイルされる本番ランタイムのみ」（= **imported**）は**作っていない**。

| 言語 | 正解の中身 | Go 対応 |
|---|---|---|
| JS | `package-lock.json` の全ツリー（prod+dev+推移、ピン留め） | `-m all` |
| PHP | `composer.lock`（require+require-dev）+ `vendor-bin/*` ツール | `-m all` |
| Python | `pip install --dry-run --report`（deps/extras/dependency-groups + requirements*.txt を全解決） | `-m all` |

→ cdxgen が出す dev/test 依存は **正解側にも入っている**ため、`all` 正解では正しくマッチし
precision を不当に下げない。逆に **imported（本番のみ）** を正解にすると、cdxgen は dev も出すので
precision は下がる（将来の拡張候補）。

### 詳細
- **正解（Ground Truth）= その言語のネイティブな完全推移依存解決**（上記 `-m all` 相当）。
  - **JavaScript** → `package-lock.json`（npm の全ツリー。未コミットなら
    `npm install --package-lock-only` でコードを落とさず解決）。
  - **PHP** → `composer.lock`（require + require-dev）。さらに `vendor-bin/*/composer.json`
    （bamarni composer-bin-plugin の phpstan / php-cs-fixer 等）も解決して統合。
    `config.lock=false` のライブラリは lock を書かないため `vendor/composer/installed.json` を使用。
  - **Python** → `pip install --dry-run --report`（インストールせず完全推移・ピン留め集合を取得）。
    `collect_reqs.py` で pyproject の `dependencies` / `optional-dependencies` /
    `dependency-groups` と `requirements*.txt` を**全部**集約し、cdxgen の走査範囲に合わせた。
- **予測 = cdxgen を素（out-of-the-box）で実行**：`cdxgen -t <lang> <repo> -o out.json`。
  **pristine なクローンに対し GT 生成より先に実行**し、GT 生成（lock 生成やインストール）が
  cdxgen の入力を汚染しないようにした。
- **指標**：本体研究と同じ name レベル / version レベル（パス＋バージョン厳密一致）の P / R / F1。
  cdxgen 側はプロジェクト自身（self 参照）と `-` 等のノイズを除外（Go 研究の mainPath 除外に対応）。
- **完全分離**：`nongo/js`・`nongo/php`・`nongo/python` がそれぞれ独立した `work/`・`results/` を持つ。
  ある言語の venv / node_modules / vendor が別言語を汚染しない（cdxgen の実際の事故要因）。すべて Linux。

実行環境: cdxgen 12.6.0 / Node 22 / Python 3.11(pip 24.0) / PHP 8.4(Composer 2.8) / Linux。

## 対象プロジェクト
| 言語 | プロジェクト | lock コミット | 備考 |
|---|---|---|---|
| JS | expressjs/express | なし | 実行時依存は少なく dev が大半 |
| JS | axios/axios | あり (package-lock) | サブプロジェクト(docs/sandbox)に別 package.json |
| PHP | guzzle/guzzle | なし（lockは生成） | vendor-bin で phpstan/php-cs-fixer を管理 |
| PHP | Seldaek/monolog | なし（`config.lock=false`） | lock を一切書かない設計 |
| Python | psf/requests | なし | 依存指定が緩く requirements-dev.txt |
| Python | pallets/flask | なし | requirements/*.txt をピン留めで同梱 |

## 結果

すべて **Precision / Recall / F1** を明記する。`name` = パッケージ名一致、`version` = 名前＋バージョン厳密一致。

### プロジェクト別（name レベル）
| 言語 | プロジェクト | GT数 | cdxgen数 | Precision | Recall | F1 |
|---|---|---:|---:|---:|---:|---:|
| JS | expressjs/express | 330 | 327 | 100.0 | 99.1 | **99.5** |
| JS | axios/axios | 644 | 825 | 78.1 | 100.0 | **87.7** |
| PHP | guzzle/guzzle | 89 | 89 | 100.0 | 100.0 | **100.0** |
| PHP | Seldaek/monolog | 77 | **0** | 0.0 | 0.0 | **0.0** |
| Python | pallets/flask | 75 | 81 | 92.6 | 100.0 | **96.2** |
| Python | psf/requests | 47 | 10 | 100.0 | 21.3 | **35.1** |

### プロジェクト別（version レベル：名前＋バージョン一致）
| 言語 | プロジェクト | Precision | Recall | F1 |
|---|---|---:|---:|---:|
| JS | expressjs/express | 93.0 | 92.1 | **92.5** |
| JS | axios/axios | 66.2 | 84.8 | **74.3** |
| PHP | guzzle/guzzle | 98.9 | 98.9 | **98.9** |
| PHP | Seldaek/monolog | 0.0 | 0.0 | **0.0** |
| Python | pallets/flask | 69.1 | 74.7 | **71.8** |
| Python | psf/requests | 50.0 | 10.6 | **17.5** |

### 言語ごとの micro 平均
| 言語 | name P | name R | name F1 | ver P | ver R | ver F1 |
|---|---:|---:|---:|---:|---:|---:|
| JavaScript | 84.3 | 99.7 | **91.3** | 73.8 | 87.3 | 80.0 |
| PHP | 100.0 | 53.6 | **69.8** | 98.9 | 53.0 | 69.0 |
| Python | 93.4 | 69.7 | **79.8** | 67.0 | 50.0 | 57.3 |
| （参考）Go ※ | ~92–100 | ~42–45 | **~56–58** | – | – | ~57 |

※ Go は cdxgen vs `go list -m all`（216 件 / 厳選 6 件）。Precision はほぼ 100%（誤検出ゼロ）が特徴。

## 考察 — 「Go 以外だとどうなるか」

1. **ロックファイルがあると cdxgen は非常に強い。**
   express（P100/R99/F1 99.5）と guzzle（F1 100.0）のように、`package-lock.json` /
   `composer.lock`（または vendor-bin 込みの解決）を読める場合、cdxgen は推移依存も
   バージョンもほぼ完全に再現する。**この点はむしろ Go（Recall 約42%）より高い** ——
   npm/composer の lock は `go list -m all` 相当の完全ツリーを cdxgen に直接与えるため。

2. **ロックファイルが無い／パッケージマネージャ実行が必要だと、Go の長所「誤検出ゼロ」が崩れる。**
   - **monolog（PHP）は出力 0**。`config.lock=false` で lock が存在せず、cdxgen は composer を
     起動して解決しようとするが（root 実行・依存解決の問題で）失敗し、**SBOM を 1 件も生成しなかった**。
     Go では起こらなかった「**ツールが丸ごと失敗する**」という新しい失敗モード。
   - **axios（JS）は Precision 78%**。cdxgen がリポジトリ内の**サブプロジェクトの `package.json`**
     （mocha / vitepress / @docsearch 等、docs・sandbox 配下）まで走査し、ルート lock に無い 181 件を
     上乗せする。「誤り」ではなく**走査範囲が広い**ため、ルートを正解にすると精度が落ちる。
     Go の cdxgen（FP≈0）とは対照的。

3. **Python は最も不安定で、結果がプロジェクト依存。**
   - **flask は name F1 96%**。flask は `requirements/*.txt` をピン留めで同梱しており、cdxgen が
     それを読めるため推移依存まで拾える。
   - **requests は F1 35%（Recall 21%）**。依存指定が緩く lock が無いため、cdxgen は
     **直接依存の名前 10 件しか出さず、推移依存 37 件を取りこぼす**（cdxgen は Python では
     インストールせずに推移解決しない）。Python には普遍的な lock 標準が無いことが直撃する。

4. **バージョン精度は名前精度より一段落ちる（特に Python）。**
   名前が一致してもバージョンがずれる。flask では cdxgen のバージョンが pip 解決より
   軒並み古い（click 8.4.0 vs 8.4.1、certifi 2026.4.22 vs 2026.5.20 など、19 件）。
   緩い指定子からの推定とインストール時点解決の差で、ver-F1 は JS 80 / PHP 69 / **Python 57** まで低下。

### まとめ
- cdxgen の Go の強み（**Precision ≈ 100%／誤検出ゼロ**）は **Go 以外では保証されない**。
- 精度を決める最大要因は言語そのものより **「ロックファイル等の完全な依存記述が repo にあるか」**。
  - lock あり（express / guzzle / flask の requirements）→ F1 96–100%。
  - lock なし／PM 実行依存（requests / monolog）→ Recall 急落 or **出力ゼロ**。
- 新たな失敗モード：**サブプロジェクト manifest の混入（Precision 低下）**、
  **PM 実行失敗による SBOM 未生成（monolog）**、**バージョンずれ（特に Python）**。

## 再現方法
```bash
npm install -g @cyclonedx/cdxgen     # 12.x

# 言語ごとに完全分離して実行（クローン → cdxgen(素) → ネイティブ解決で正解生成）
bash nongo/run_lang.sh js
bash nongo/run_lang.sh php
bash nongo/run_lang.sh python

# 指標を計算（results/<name>/ を自動検出、metrics.json も出力）
node nongo/compute.js js
node nongo/compute.js php
node nongo/compute.js python
```
対象を変えるには各 `nongo/<lang>/projects.txt` に GitHub URL を 1 行ずつ追加するだけ。

## 限界・注意
- 各言語 2 件のみの探索的実験。傾向の提示が目的で、統計的代表性は主張しない
  （Go 本体研究のように `repos.txt` を増やせば同じハーネスで拡張可能）。
- 正解スコープは「dev/ツール依存も含む完全推移集合」（Go の `-m all` に対応）。
  本番（実行時）のみに絞れば数値は変わる。axios の Precision 低下はサブプロジェクト manifest 由来で、
  「リポジトリ全体の依存」とみなせば cdxgen の方がむしろ網羅的という解釈も成り立つ。
- monolog は cdxgen の出力が無いため P/R/F1 を 0 とした（生成失敗をスコアに反映）。
- 実行日: 2026-06-15、すべて Linux・root コンテナ（cdxgen の root 警告は出るが実験には影響なし）。
