# 100件検証の実行記録（2026-07-28）

## 実行状況
seed=42・SHA固定で実行。**有効99件で処理中にジョブが停止**（コンテナ再起動と推定、
15:57時点）。CSVを最後に一括書き込みする設計だったため summary_100.csv /
missing_100.csv は未生成。ヘッドライン数値は run100.log から復元し
`summary_from_log_99.csv` に保存した（ファイル名・行番号の詳細は失われている）。
→ 逐次書き込みに直して再実行すれば詳細も得られる。

## 結果（有効99件 / SKIP 11件）
- **GT再現性: 98/99 一致**。不一致は nikolaydubina__fpmoney のみ
  （計測時 n_imp=0 → 同一SHAでの再生成 1）。計測時に取りこぼしがあった直接証拠。
- **取りこぼし（のべ）18件**。理由内訳（ログ表示は先頭3件までのため下限値）:
  - platform 6 / tools 4 = 正しい除外（linux/amd64 の文脈として妥当）
  - **other_tag 6 = 要調査**
- **検証力: 危険モジュール 23個 / 11リポジトリ**。0ではないので
  「危険条件を踏まずに取りこぼし0」という弱い結論にはならず、層別サンプリングは不要。
- **go list の本物のエラー: 1/99**（進捗行 go: downloading 等は除外して計数）。
  依存解決の失敗はほぼ無い。

## 要調査（other_tag 6件）
- jeffail__leaps: github.com/azure/azure-sdk-for-go（**小文字**。正しくは Azure）,
  github.com/cenkalti/backoff
- hybridgroup__gobot: gocv.io/x/gocv, github.com/hybridgroup/mjpeg, github.com/nsf/termbox-go
- woodpecker-ci__woodpecker: github.com/urfave/cli-docs/v3

## 計測時 stderr について
proc.sh は `2>/dev/null` で stderr を破棄していたため当時のエラー状況は直接遡れないが、
上記の **GT件数 98/99 一致** の方が強い証拠であり、推定に頼る必要はない
（唯一の不一致 fpmoney を除き、計測時のGT生成は再現する）。
