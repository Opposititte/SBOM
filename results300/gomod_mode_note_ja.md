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

## 8. 定量実証（awesome-go 全 2225 件, 別ブランチ `claude/gomod-app-vs-mod` の隔離実験）
section 6 の選択 1 が妥当であることを **全 2225 repos（gomod=ok 全集合）** で確認した。
各 repo を新規クローンし、同一クローンから GT-imported(linux)・GT-all・`app`・`mod` を生成（既存 resultsAll は不使用）。
再開可能バッチ（25件ごと増分push）。途中コンテナリセットが1回発生したが push 済みデータから復元し完走。
詳細データ: `claude/gomod-app-vs-mod` ブランチの `results_appmod_full/`（`appmod_full.csv`, `RESULT_full_2225_ja.md`）。

### 8-1. カバレッジ（app が動くか）
| 種別 | 件数 | app 出力 |
|---|---:|---|
| ライブラリ（本物のmain無し） | **1165 (52%)** | 不可 |
| app 実行失敗（mainありエラー） | 161 | 不可 |
| アプリ root/cmd/*/その他（main有） | 899 | 可 |
| **計** | **2225** | **app 899/2225 (40%)** / **mod 2225/2225 (100%)** |
→ ライブラリが過半数（52%）。app は main 必須で動かず**カバレッジ 40%**、mod は **100%**。

### 8-2. 精度（vs GT-imported(linux), マクロ平均）
| 対象 | ツール | P | R | F1 |
|---|---|---:|---:|---:|
| **全評価対象(依存あり, n=1490)** | **mod** | 0.914 | 0.983 | **0.935** |
| **単一バイナリのアプリ(n=562)** | **app** | **0.999** | **0.988** | **0.993** |
| 〃 | mod | 0.921 | 0.994 | 0.948 |
| app出力ありの全(n≈789) | app | 0.925 | 0.807 | 0.833 |
| 〃 | **mod** | 0.904 | 0.985 | **0.932** |

- **単一バイナリのアプリでは app がほぼ満点(F1=0.993)** ＝ ビルド制約評価で他OS過剰報告を削り imported(linux) とほぼ完全一致。mod(0.948)を上回る。
- **複数バイナリ repo(222件)では app の recall が落ちる(0.807)**。app＝1バイナリの依存、GT-imported＝`go list ./...`＝**リポジトリ全体**の import → **スコープ差**であり app の欠陥ではない（go-task, woodpecker, minikube 等）。

### 8-3. 確定した使い分け（全2225件で裏付け）
1. **リポジトリ単位・GT=モジュール全体・ライブラリ主体の本研究 → `mod`**（カバレッジ100%・GT全体スコープと構造一致・**F1=0.935 vs imported**）。**本番1489件の選択は妥当。**
2. **「1つの出荷バイナリの SBOM」が単位なら → `app`**（imported(linux) とほぼ完全一致 **F1=0.993**）。
3. スコープ（1バイナリ vs モジュール全体）を GT に合わせるのが大前提。
