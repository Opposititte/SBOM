# cyclonedx-gomod の app/mod モードと本研究の選択（公式README＋実機で確定）

## 1. 事実（cyclonedx-gomod 公式 README, line 48–56）
- **`app`**: アプリが実際に依存するモジュールだけ。テストが必要とするモジュールや、import されていない
  パッケージは含めない。**ビルド制約(build constraints)を評価する**（GOOS 等で対象外の依存を落とす）。
  ※ main パッケージ＋git リポジトリ（バージョン検出）が必要。
- **`mod`**: モジュール内の全パッケージが必要とするものの集合。テスト依存は **`-test` で任意**（既定=除外）。
  **ビルド制約は評価しない**（全OS分を含む「whole picture」）。ライブラリにも使える。

## 2. 本研究が実際に使ったコマンド
`run_batch.sh`:
```
cyclonedx-gomod mod -json -output <out> <folder>
```
→ **`mod` モード、`-test` なし** ＝ テスト依存は除外、ただし**ビルド制約は未評価＝全OS分の依存を含む**。

## 3. 実機証明（cobra を import する小アプリ）
| コマンド | 報告モジュール | mousetrap(Windows専用) |
|---|---|---|
| `cyclonedx-gomod mod`（本研究） | cobra, pflag, **mousetrap** | **含む** |
| `GOOS=linux cyclonedx-gomod app` | cobra, pflag | **除外** |
→ README の「app はビルド制約を評価／mod は評価しない」を実機で確認。

## 4. これが FP（GT-imported に無いのに出した依存）の正体を説明する
- GT-imported = `go list -deps` **GOOS=linux**（ビルド制約を評価＝linux限定、テスト除外）。
- gomod = **`mod`**（ビルド制約**未評価**＝全OS、テスト除外）。
- → **モード不一致**。gomod の FP はほぼ**他OS専用依存**:
  `inconshreveable/mousetrap`(Win, 261 repos), `microsoft/go-winio`(Win), `yusufpapurcu/wmi`(Win),
  `power-devops/perfstat`(AIX), `lufia/plan9stats`(Plan9)。
- **テスト依存ではない**（mod は -test 無しでテスト除外）。
  ＝ cdxgen の FP（testify/go-spew/go-difflib＝テスト依存）とは**原因が異なる**。

## 5. 含意（precision の解釈の訂正）
- 「gomod の precision が高いのはテスト依存を拾わないから」は**半分のみ正しい**。
  - 正: mod はテスト依存を出さない。
  - 追加: mod は**ビルド制約を評価しないため他OS依存を出す** → これが precision を 100 未満にしている真因。
- すなわち gomod の precision(93.0) が完璧でないのは「ツールの不正確さ」ではなく
  「**mod は全OS分を出す仕様**」×「**GT-imported を linux 固定にした**」の相互作用。

## 6. 選択肢（教授相談用）
1. **`mod` のまま**＋限界として明記（awesome-go はライブラリ主体で `app` 不可なので mod が妥当）。← 推奨
2. **アプリ（main あり）に限り `GOOS=linux app`** で測れば、ビルド制約が GT-imported と揃い
   gomod の precision は ~100 に近づく（ただしライブラリには app 不可）。
3. **GT-imported を全OS和集合**にして mod と条件を揃える（imported の意味はやや薄まる）。

## 7. 論文向け一文
> cyclonedx-gomod には `app`（ビルド制約評価・アプリ向け）と `mod`（全OS・ライブラリ可）があり、
> awesome-go はライブラリ主体のため `mod` を採用した。結果として gomod は全OS分の依存を報告し、
> GOOS=linux 固定の imported 正解に対しては他OS専用依存（mousetrap 等）が見かけの false positive となる。
> これは cdxgen に見られるテスト依存の過剰計上とは原因が異なる。
