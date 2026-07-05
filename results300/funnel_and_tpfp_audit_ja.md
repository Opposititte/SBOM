# 絞り込み（funnel）の「非Go」内訳 と TP/FP 監査

質問2（「非Go 528件」とは何か）と質問3（TP/FP の中身を全部見せて評価が正しいか確かめたい）への回答。
すべて `resultsAll/_manifest.csv` と各 repo フォルダの `errors.txt` / `gt_*.txt` / `*_output.json` の実データから再集計。

---

## 質問2：「非Go（go list が空）」の正体

`_manifest.csv`（2733 行）の実測:

| 区分 | 件数 |
|---|---:|
| クローン総数 | 2733 |
| clone 失敗（リポジトリ消滅・ネットワーク） | 20 |
| `go list -m all` 成功（go_list=ok） | 2195 |
| **`go list -m all` 失敗（go_list=fail）** | **538** |

この 538 を `errors.txt` の実際のエラー文で分類すると、**「非Go」は正確なラベルではない**:

| 失敗理由 | 件数 | 割合 | 実際に Go か |
|---|---:|---:|---|
| `go.mod file not found`（モジュールでない） | 458 | 85% | **非Go / 非モジュール**（正しく除外） |
| `-mod may only be set to readonly/vendor when in workspace mode`（`go.work` あり） | 49 | 9% | **Go なのに除外**（ハーネスの制約） |
| replace ディレクトリ欠落・upstream 消滅・`git ls-remote 128`・gopkg.in 403 等 | 11 | 2% | **Go**（多くは環境/ネットワーク由来） |
| clone 失敗 | 20 | 4% | 不明（取得不可） |

### つまり
- **本当に「非Go」なのは 458件（85%）だけ。** awesome-go の README は Go ライブラリ以外に
  **他言語の awesome リスト**（`sindresorhus/awesome`, `vinta/awesome-python`）、
  **チュートリアル/仕様/記事**、**JS/Python ツール**（`python-prompt-toolkit`, `blessed-contrib`）も
  リンクしているため、`go.mod` を持たない ＝ Go モジュールでないエントリが相当数含まれる。これが主因。
- **約60件（49+11）は実際には Go プロジェクトで、ツール側の都合で落ちている**:
  - **49件は `go.work`（Go ワークスペース）を使う実在の Go 製品**（例: `knadh/koanf`,
    `bytedance/sonic`, `diamondburned/arikawa`）。バッチが `-mod=mod` を強制したため
    workspace モードと衝突して `go list` が失敗した ＝ **本来なら評価できたのに誤って除外**。
  - **11件は `replace ./subdir` の相対 replace 先が `--depth=1` クローンに含まれない**、
    または upstream が消えている等。これらも Go。

### 結論（正直な限界として明記すべき）
「非Go 528(=538)件」という一括ラベルは**誤解を招く**。正しくは
「**大半（85%）は真に非Goだが、約11%（60件）は go.work / relative-replace / ネットワークで
`go list` が失敗した実在の Go リポジトリ**」。後者は**ハーネスを直せば回収可能**
（`GOWORK=off` を付ける、または `go.work` 検出時に各モジュールで個別に `go list` する）。
現状の 1489 件の指標自体は正しいが、母集団に約60件の Go を取りこぼしている＝**軽微な選択バイアス**。

---

## 質問3：TP / FP の中身と全体件数（評価の妥当性監査）

### (A) 全体の micro 合計（1489 repos の TP/FP/FN を全部足した実数）

**正解 = imported**

| tool | TP | FP | FN | Precision | Recall | F1 |
|---|---:|---:|---:|---:|---:|---:|
| syft | 46,698 | 39,154 | 141 | 54.4% | 99.7% | 70.4% |
| trivy | 45,756 | 35,802 | 1,083 | 56.1% | 97.7% | 71.3% |
| cdxgen | 44,047 | 7,733 | 2,792 | 85.1% | 94.0% | 89.3% |
| cyclonedx-gomod | 46,155 | 6,482 | 684 | 87.7% | 98.5% | 92.8% |

**正解 = all**

| tool | TP | FP | FN | Precision | Recall | F1 |
|---|---:|---:|---:|---:|---:|---:|
| syft | 73,319 | 12,533 | 73,940 | 85.4% | 49.8% | 62.9% |
| trivy | 69,481 | 12,077 | 77,778 | 85.2% | 47.2% | 60.7% |
| cdxgen | 45,999 | 5,781 | 101,260 | 88.8% | 31.2% | 46.2% |
| cyclonedx-gomod | 52,457 | 180 | 94,802 | 99.7% | 35.6% | 52.5% |

> 注: これは **micro（全依存をプールした集計）**。論文本文の F1 は **macro（repo ごとの F1 を平均）**
> なので数値が少し違う（小さい repo が macro では等重みになるため）。両方を併記するのが誠実。
> **FP と FN の総数がツールごとに桁で違う**ことがこの表から一目でわかる（例: 正解=imported で
> syft の FP=39,154 vs gomod の FP=6,482）。precision の差はこの生件数の差そのもの。

### (B) 依存名レベルのドリルダウン（どれが TP でどれが FP かを1件ずつ）

`dump_tpfp.js` を追加。任意の repo × tool × 正解について、**実際の依存名を TP/FP/FN に分類して全部出力**する:

```bash
node dump_tpfp.js <repo> <tool> [all|imported] [name|ver]
```

**検証例1: `99designs__gqlgen` × cyclonedx-gomod × imported**
→ GT=19, 予測=20, **TP=19 / FP=1 / FN=0**（P=95% R=100%）。
唯一の FP は `github.com/matryer/moq`（**コード生成ツール依存**で実行時には import されない）＝
「FP の正体はツール/テスト依存」という主張が個票で裏取りできる。

**検証例2: 同じ repo × syft × imported**
→ GT=19, 予測=72, **TP=19 / FP=53 / FN=0**（P=26% R=100%）。
FP 53件の中身は `davecgh/go-spew`・`bsm/ginkgo`（テスト）、`99designs/gqlgen/_examples/*`
（example サブプロジェクト）、深い推移依存など＝**syft は go.mod グラフ全体を出すので imported に対し過剰**。
この53件は**正解を all にすると大半が TP に変わる**＝「正解定義でランキングが逆転する」機構を
依存名レベルで直接確認できる。

### 監査結論
- 全体件数（micro TP/FP/FN）と個票（依存名）が**整合**しており、集計スクリプトの分類は正しい。
- precision の差は「多く出しすぎ（syft/trivy の FP 3〜4万）」対「絞って出す（gomod の FP 6千）」という
  **実データの差**であって、集計バグではない。`dump_tpfp.js` で任意 repo を開いて再確認できる。
