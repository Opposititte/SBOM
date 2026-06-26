# version不一致の原因分類 — なぜ name一致を正解条件にするのが妥当か

全 awesome-go 1489 repo を対象に、name一致したコンポーネントのうち version不一致になったものを
原因別に分類した。データ源は `resultsAll/`（版入り保存GT＋各ツール出力 purl）。

## 1. 時点が揃っている all / imported での内訳

name一致したコンポーネント中、version不一致になった割合と内訳:

### all レベル
| ツール | name一致数 | version不一致 | tool版欠落 | v接頭辞のみ | +incompatible | pseudo差 | semver差(MVS/replace) |
|---|---|---|---|---|---|---|---|
| syft | 73,319 | 2,389 (3.3%) | 265 | 0 | 17 | 282 | 1,825 |
| trivy | 69,481 | 1,908 (2.7%) | 190 | 0 | 20 | 305 | 1,393 |
| cdxgen | 45,999 | 419 (0.9%) | 0 | 0 | 2 | 62 | 355 |
| cyclonedx-gomod | 52,457 | 77 (0.1%) | 0 | 0 | 4 | 30 | 43 |

### imported レベル
| ツール | name一致数 | version不一致 | tool版欠落 | +incompatible | pseudo差 | semver差 |
|---|---|---|---|---|---|---|
| syft | 46,698 | 1,376 (2.9%) | 129 | 10 | 122 | 1,115 |
| trivy | 45,756 | 934 (2.0%) | 71 | 12 | 117 | 734 |
| cdxgen | 44,047 | 6 (0.0%) | 0 | 0 | 0 | 6 |
| cyclonedx-gomod | 46,155 | 67 (0.1%) | 0 | 4 | 26 | 37 |

**読み取り:**
- Go-native ツール（cdxgen / cyclonedx-gomod）は、時点が揃ったGTに対して version をほぼ完璧に一致させる（不一致 0.0〜0.9%）。
- syft / trivy の version不一致(2〜3%)も、内訳の大半は **semver差（MVS解決差 / replace / go.sum内の複数版から別の版を採用）と tool版欠落**。pseudo-version表記差・`+incompatible`・v接頭辞ゆれも含まれる。
- いずれも「依存を検出できたか（name同定）」とは独立した**版の正規化・表記・解決レイヤーの問題**であり、ツールの検出能力評価に混ぜるとバイアスになる。

## 2. imported+test (impT) の version落差は時間差アーティファクト

impT だけ version f1 が大きく落ちる(約9pt)が、これは**ツールの版誤りではなく、GTの出自の違い**による。

| ツール | imported（保存GT=ツールと同時点）name→ver落差 | impT（今回@latest取得で生成したGT）name→ver落差 |
|---|---|---|
| syft | -0.7 | -8.6 |
| trivy | -0.6 | -8.6 |
| cdxgen | -0.5 | -9.7 |
| cyclonedx-gomod | -0.1 | -9.4 |

同一ツール・同一の版報告能力でも、GTを「元データ収集時の保存版(imported)」から「今回 `@latest`(2026) を取得して `go list -deps -test` で解決し直した版(impT)」に変えるだけで落差が -0.1〜-0.5pt から -8.6〜-9.7pt に跳ね上がる。
特に cdxgen は imported GT に対して version不一致が **わずか6件(0.0%)** なのに impT では -9.7pt 落ちる。
→ impT の version落差の主因は、**ツール出力(旧スナップショット) vs 新しく解決し直した依存版** の時間ズレ。
ツールの version精度の指標としては使えない（GTとツール出力の生成時点が一致していないため）。

## 3. 結論

- **メイン指標は name一致**（依存を見つけられたか＝検出能力）。FP発生メカニズム分析（go.sum由来／go.mod-type由来）と整合し、版の表記・解決ノイズが混入しない。
- **version一致は補助指標**として、all/imported（時点整合GT）でのみ提示する。ここでは Go-native ツールがほぼ完璧、syft/trivy で 2〜3% の版ノイズ（大半が MVS/replace 等の解決差）。
- **impT の version落差は提示しない／注記する**。GTの生成時点がツール出力と不一致のための見かけ上の落差であり、ツール精度を過小評価する。
