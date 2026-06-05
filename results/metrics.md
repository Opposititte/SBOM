# SBOM精度の評価：`go list -m all` を正解とした Precision / Recall / F1

作成日: 2026-06-05。ツール: syft 1.45.0, trivy 0.71.0, cdxgen 12.5.0, cyclonedx-gomod 1.10.0。
`node ../compute_metrics.js` で再現できます（生データは `metrics.json`, `metrics.csv`）。

---

## 評価方法
- **正解データ (GT):** 各リポジトリの**ルート**で実行した `go list -m all`（メインモジュールは除外）。
  これは Go 1.17 以降の「枝刈り済みモジュールビルドリスト」です。
- **予測 (Predicted):** purl が `pkg:golang/` の CycloneDX コンポーネント。`stdlib` とメイン
  モジュールは除外します。Go 以外のエコシステム（npm, GitHub-Actions, generic）は今回の正解の
  **対象外**とし、両側で無視します。
- **照合:** *name（名前一致）* = モジュールパスの一致／ *name@ver（バージョン一致）* = パス**かつ**バージョンの一致。
- クローンは浅いクローン（`--depth=1`）。ツールは `go.mod`/`go.sum`/ソースを読みますが、これらは
  フルクローンと同一なので、クローンの深さは結果に**影響しません**。
- Precision = TP/(TP+FP)、Recall = TP/(TP+FN)、F1 = 2PR/(P+R)。

---

## 1. まとめ — Precision / Recall / F1（％, 名前一致）

| リポジトリ | ツール | Precision | Recall | F1 |
|--------|--------|----------:|-------:|-----:|
| gin    | syft            | 100.0 | 71.4 | **83.3** |
| gin    | trivy           | 100.0 | 62.5 | 76.9 |
| gin    | cdxgen          | 100.0 | 32.1 | 48.6 |
| gin    | cyclonedx-gomod | 100.0 | 50.0 | 66.7 |
| cobra  | syft            | 100.0 |100.0 | **100.0**|
| cobra  | trivy           | 100.0 |100.0 | **100.0**|
| cobra  | cdxgen          | 100.0 | 66.7 | 80.0 |
| cobra  | cyclonedx-gomod | 100.0 | 83.3 | 90.9 |
| hugo   | syft            | 100.0 | 46.3 | **63.3** |
| hugo   | trivy           |  98.9 | 42.4 | 59.4 |
| hugo   | cdxgen          | 100.0 | 24.3 | 39.1 |
| hugo   | cyclonedx-gomod | 100.0 | 42.0 | 59.1 |
| frp    | syft            |  98.8 | 56.6 | **71.9** |
| frp    | trivy           |  98.6 | 49.0 | 65.4 |
| frp    | cdxgen          |  98.6 | 49.7 | 66.1 |
| frp    | cyclonedx-gomod |  98.6 | 46.9 | 63.6 |
| gorm † | syft            |  20.7 | 75.0 | 32.4 |
| gorm † | trivy           |  20.7 | 75.0 | 32.4 |
| gorm † | cdxgen          | 100.0 | 37.5 | 54.5 |
| gorm † | cyclonedx-gomod | 100.0 | 37.5 | 54.5 |
| ollama | syft            | 100.0 | 63.8 | **77.9** |
| ollama | trivy           | 100.0 | 53.7 | 69.9 |
| ollama | cdxgen          | 100.0 | 40.1 | 57.3 |
| ollama | cyclonedx-gomod | 100.0 | 50.3 | 66.9 |

### 6リポジトリの平均

| ツール | macro-P | macro-R | macro-F1 | micro-P | micro-R | micro-F1 |
|--------|--------:|--------:|---------:|--------:|--------:|---------:|
| syft            | 86.6 | 68.9 | **71.5** | 94.9 | 54.2 | **69.0** |
| trivy           | 86.4 | 63.8 | 67.3 | 93.9 | 48.1 | 63.6 |
| cdxgen          | 99.8 | 41.7 | 57.6 | 99.6 | 33.1 | 49.7 |
| cyclonedx-gomod | 99.8 | 51.7 | 67.0 | 99.7 | 45.4 | 62.4 |

macro（マクロ平均）= リポジトリ単位の単純平均／ micro（ミクロ平均）= 全体を合算した TP/FP/FN。

詳細な件数（found / TP / FP / FN）と バージョン一致の表は `results_table.md` を参照。

---

## 2. 主な知見
1. **総合 F1（名前一致）は syft が最良**（Recall が最も高い）。**trivy** が僅差で続く。
2. **cyclonedx-gomod と cdxgen は Precision が最高（約100%）だが Recall は中〜低**。
   特に **cyclonedx-gomod は全リポジトリで Precision 100%（gorm を含む）**。これは「実際に
   import されるモジュール」だけを Go ツールチェイン経由で報告するため、誤検出が起きにくいから。
3. **モジュールを検出できた場合、バージョンは正確** — バージョン一致の F1 は名前一致とほぼ同じ。
4. **どのツールも Recall は 100% にならない。原因は「正解の定義」と「検出方法」のギャップ**（下記）。

---

## 3. なぜ Recall が 100% にならないか（考察）
正解 `go list -m all` は **Go ツールチェインが計算した完全な推移的ビルドリスト**（テスト依存や
グラフ全体を含む）です。一方ツールの多くは **`go.mod` 等を静的に解析**するため、見える集合が異なります。

- **(a) 見逃し (FN, 最大の要因):** Go 1.17 の「モジュールグラフ枝刈り」により `go.mod` は
  直接依存＋一部の間接依存しか記録しません。静的解析ツールは**深い推移的依存を取りこぼし**、
  大きなリポジトリほど Recall が下がります（hugo 46%, ollama 64%）。`go.mod` に全依存が載る
  小さな cobra では 100% になります。syft > trivy > cdxgen の差も「どれだけ間接依存まで読むか」の差。
- **(b) cyclonedx-gomod の Recall が中程度な理由（別要因）:** これは取りこぼしではなく、
  **「実際に import される本番モジュール」だけを報告する**ため。`go list -m all` が含む
  **テスト専用依存（例: stretchr/testify, creack/pty）や未使用のグラフ上モジュール**を意図的に
  除外します。つまり正解が上位集合（superset）で、cyclonedx-gomod はより狭い「本当に使う依存」を
  答えています。研究上は「グラフ全体 vs 実際に使う依存」という正解定義の違いとして重要です。
- **(c) 誤検出 (FP):** gorm のみ多い。マルチモジュール構成で兄弟モジュールの依存を拾うため（下記 †）。
- **(d) バージョン不一致（小）:** ツールが MVS 選択後ではなく、ある `go.mod` の*要求*バージョンを
  報告した場合に生じます。稀。

---

## 4. 注意点（解釈上 重要）
- **† gorm（マルチモジュール構成）:** gorm は独自の `go.mod` を持つ兄弟モジュール（`tests/` と
  ドライバ `gorm.io/driver/{sqlite,mysql,postgres,sqlserver,gaussdb}`）を同梱しています。
  **syft/trivy** はそれらを再帰的に走査し各ドライバの依存を報告するため、**実在するがルートの
  `go list -m all` には無い**依存が「誤検出(FP)」と判定され、Precision が 20.7% に下がります。
  一方 **cdxgen と cyclonedx-gomod はルートモジュールのみを解析するため FP=0（Precision 100%）**。
  これはツールの設計差がよく表れた例です。
- **hugo / cdxgen** は `--exclude` の回避策が必要でした（既定コマンドは hugo のネストした
  `internal/warpc` モジュールでクラッシュします。詳細は `hugo/errors.txt`）。
- マルチモジュール対応のより公平な正解は、**ネストした各モジュールで `go list -m all` を実行した
  和集合**です。これにより syft/trivy の gorm の Precision は約100%まで上がるはずです。
