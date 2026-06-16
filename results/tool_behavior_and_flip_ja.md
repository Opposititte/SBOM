# cdxgen vs cyclonedx-gomod の逆転、各ツールの機構 — データ集

ユーザの疑問に「データで」答えるための証拠集。出典: resultsAll/full_table.csv（本番1489件）、
results/three_gt_6repos.md（6リポ）、3リポ機構プローブ（cobra/frp/hugo 再クローン）。

## Q1. cyclonedx-gomod はどう動くか（機構）
- `metadata.tools` = **cyclonedx-gomod v1.10.0**（Goネイティブツール）。各 component は `scope=required`。
- **ビルド可能なモジュール（source＋go.sum）が必須**。これらが欠けると失敗 → 単なるファイルパースではなく
  **Goツールチェイン（モジュールグラフ/`go list`）を実行**している（既出の delete-test で実証）。
- `mod` モードは全パッケージのモジュール依存を集約し、**ビルド制約を評価しない** → 出力 ≈ imported 集合＋他OS依存。
- プローブ実測（vs imported）: cobra 出力5(fp1 fn0) / frp 出力69(fp8 fn1) / hugo 出力183(fp77 **fn0**)。
  → **imported をほぼ取りこぼさず(recall≈100%)、少し過剰(fp)**。そして **常に出力する（クラッシュしない＝安定）**。

## Q2. cdxgen はどう動くか（機構）
- import グラフ解析を行い、**動く時は imported 集合をほぼピタリ当てる**:
  cobra 出力4（imported4と**完全一致** fp0 fn0）/ frp 出力73（**fn0**＝importedを全部発見＋11過剰）。
  → 高 precision かつ 高 recall（vs imported）。
- **ただし脆い**。外部Nodeツールで、特定リポジトリで**クラッシュ/空出力**になる。
  プローブでは **hugo で JS 例外クラッシュ → 出力0**（`createGoBom` 内 `Function.keys` 例外）。

## Q3. 6→1489 で cdxgen と gomod が逆転した理由（核心）
| | 6リポ平均(imported) | 1489平均(imported) |
|---|---:|---:|
| cdxgen | **98.6** | 92.9 |
| cyclonedx-gomod | 87.1 | **94.9** |

平均では逆転。しかし分布を見ると話が違う:

**1489での直接対決（両方出力ありの1489 repos, name-level F1）**
- cdxgen の勝ち(F1差>1): **465 repos**
- cyclonedx-gomod の勝ち: 237 repos
- ほぼ同点(±1): 787 repos
- **中央値はどちらも 100.0（互角）**

**imported F1 の分布（1489）**
| tool | =0(全外し) | <50 | 50-90 | ≥90 | 満点100 |
|---|---:|---:|---:|---:|---:|
| cdxgen | **23** | **90** | 116 | 1283 | 1200 |
| cyclonedx-gomod | 10 | 30 | 154 | 1305 | 846 |

→ **逆転は「平均 vs 分布」の効果**。cdxgen はむしろ**多くの repo で勝ち、中央値は互角**だが、
**大コケ（出力0が23件、<50が90件）の裾が重く**、それが**マクロ平均を引き下げる**。
gomod は過剰報告ぎみだが**失敗が少なく安定**（出力0が10件）なので平均が上回る。
6リポは（たまたま）cdxgen が失敗しない良性サンプルだったため cdxgen が98.6で支配的に見えた。
**＝小サンプルのバイアス＋マクロ平均の外れ値感度**。実力で gomod が上というより、cdxgen の失敗裾の問題。

## Q4. なぜ cdxgen・gomod は all で低く(50点台)・imported で高い(90点台)か
両ツールとも出力が **≈ imported 集合**。
- vs **imported**（実際に使う依存のみ）: ほぼ一致 → F1 92.9 / 94.9。
- vs **all**（`go list -m all` の全グラフ, ずっと大きい）: 取りこぼし(fn)が大量 → recall 低 → F1 52.1 / 56.1。
  実証: frp の gomod、vs imported は fn=1 だが **vs all は fn=77**。

## Q5. なぜ syft/trivy は all でも imported でも低いか
syft/trivy は go.mod(＋trivyは go.sum)を**静的パース** → 出力は **imported と all の中間**。
- vs imported: 多すぎる（FP）→ precision 低（56-58）。
- vs all: 深い推移グラフを取りこぼす（FN）→ recall 低（66-68）。
- どちらにも最適化されず両方そこそこ低い（F1 ≈ 68-73）。（機構の詳細は `syft_mechanism_ja.md`）

## Q2b. cdxgen が0出力する23件の共通点（100%同一バグ）
本番1489で cdxgen が出力0だった **23件すべて**、errors.txt に同じクラッシュ署名:
```
Error: Invalid purl: "name" is a required field.
  at getGoPkgComponent (utils.js:10571)
  at parseGoModData  (utils.js:10721)
  at parseGoModGraph (utils.js:10938)  ← go mod graph の解析中
```
- 内訳: **Invalid purl 系クラッシュ = 23/23**。timeout/OOM = 0、その他 = 0。
- 意味: cdxgen は `go mod graph` から component を作る際、**purl を生成できないモジュールが1つでもあると例外を投げ、SBOM全体を破棄して0出力**になる（all-or-nothing の脆さ）。
- 規模は無関係: 大(benthos imp498, milvus273)も小(raft10, vscode-go2, xgo1)も同じバグで落ちる。
- gomod は同じ23件すべてで正常出力 → **Goネイティブの gomod は頑健、外部Nodeの cdxgen は単一の不正モジュールで全滅**。
- これが Q3 の「cdxgen の失敗裾」の正体＝23件の F1=0 が cdxgen のマクロ平均を引き下げ、逆転を生んだ。

## 表は「名前一致(パスのみ)」— purl(バージョン)一致との差
Image 1 / full_awesome_go.md は **名前一致（モジュールパスのみ、バージョン無視）**。purl(パス＋バージョン)一致だと:
| tool | imp 名前一致 | imp purl一致 | all 名前一致 | all purl一致 |
|---|---:|---:|---:|---:|
| syft | 68.0 | 65.8 | 72.8 | 70.5 |
| trivy | 68.0 | 66.2 | 73.3 | 71.2 |
| cdxgen | 92.9 | 91.4 | 52.1 | 51.0 |
| cyclonedx-gomod | 94.9 | **94.8** | 56.1 | 56.0 |
- syft/trivy/cdxgen は purl一致で 1〜2点下がる（バージョンを取り違える/欠落することがある）。
- **gomod はほぼ不変(94.9→94.8)＝バージョンまで正確**。
- 教授提示時は「**この表は名前一致。バージョンを含めると上表の通り微減（gomod除く）**」と注記すれば十分。

## Q6. 正解(GT)の定義でランキングが変わる（確定）
| 正解 | 1位 | 2位 | 3位 | 4位 |
|---|---|---|---|---|
| **all** | trivy(72.7) | syft(72.3) | gomod(55.6) | cdxgen(51.7) |
| **imported** | gomod(94.9) | cdxgen(92.9) | syft(68.0) | trivy(68.0) |

→ **正解の定義で最良ツールが完全に入れ替わる**。これが本研究の核心。
