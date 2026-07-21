# thesis.tex レビュー / 修正記録

いただいた LaTeX 草稿を、実データ（`census2/`）と突き合わせて検証した結果と、
`thesis.tex` に反映した修正の記録。

## 総評
- **定性的結論は正しい**：「GT定義（all / imported / imported+test）でツール優劣が逆転する」は
  census2 でも完全に成立。RQ1/RQ2、テスト依存の影響、FP要因の傾向、ロバストネスも全て保持。
- **ただし草稿の全数値は旧 v1（`census/`）由来**で、本セッションで偽EMPTY_GTを2件修正した
  公正版 `census2/` とは微差でズレる。→ `thesis.tex` では全数値を census2 に差し替えた。
- 検証は SUMMARY を鵜呑みにせず、`census2/metrics.csv` から macro-F1 を独立再計算して一致を確認済み
  （cdxgen imp 93.2 / cyclonedx imp 94.5 / syft all 73.0）。

## 修正した数値（草稿v1 → census2）
| 箇所 | v1(草稿) | census2(修正後) |
|---|--:|--:|
| 評価対象 OK | 1,530 | **1,528** |
| EMPTY_GT | 1,180 | **1,182** |
| CLONE_FAIL | 13 | 13（不変） |
| tab:result（macro name F1, all/imp/impT）| 下記 | 下記 |
| — Syft | 72.2/68.6/79.9 | **73.0/67.0/78.3** |
| — Trivy | 72.7/68.8/80.0 | **72.5/68.4/79.7** |
| — cdxgen | 52.8/93.6/82.9 | **52.8/93.2/82.3** |
| — cyclonedx-gomod | 56.7/94.5/82.6 | **56.5/94.5/82.5** |
| tab:robust 共通集合 n | 1,434 | **1,467** |
| tab:valid（有効/NA）Syft | 1,525/3 | **1,519/9** |
| — Trivy | 1,516/12 | **1,509/19** |
| — cdxgen | 1,474/54 | **1,493/35** |
| — cyclonedx-gomod | 1,493/35 | **1,501/27** |

macro-ver（tab:macro-ver）・micro name（tab:micro-name）・TP/FP/FN プール（tab:raw）・
FP要因（tab:fp）も全て census2 値に差し替え。P/R も同様。

## 内部整合性の是正
- 草稿は OK=1,530 と書きつつ、tab:valid の「有効+NA」が Syft で 1,525+3=**1,528** にしかならず
  2件不一致だった（v1のバグの痕跡）。census2 では 1,519+9=**1,528** で評価対象数と一致。

## 再現性・公平性のために加筆した点
1. **付録D（GT生成の実装上の注意）に2項目を追加**（草稿は `-e` と `-mod=mod` のみ開示）：
   - **`go.work`（workspace mode）**：`-mod=mod` が違法となり `go list` が全滅→偽EMPTY_GT。
     検出時は `-mod=mod` を自動解除（etcd/kubernetes系/pomerium 等が該当）。
     ※これを開示しないと、読者が再現した際にこれらの大規模repoを取りこぼす。
   - **新しいGoを要求するrepo**（例 happy-sdk=go1.27rc2）：`GOTOOLCHAIN=local` だとbuild不可→
     偽EMPTY_GT。該当のみ `GOTOOLCHAIN=auto` でtoolchain取得。
   - 標準ライブラリのみのrepoは正しく空（自モジュールは依存に数えない）ことも明記。
2. **公平性の枠組みを限界節と新設「評価の枠組みとしての含意」節に明記**：
   GT-imported は実質 `go list -deps`＝cdxgen の内部機構、GT-all ≒ go.sum＝Syft/Trivy の源。
   よって「各ツールが自分の源に一致するGTで勝つ」のは半ば構成上の必然であり、本評価は
   **ツールの絶対的優劣ではなくGT選択への感度**を示すもの、と枠組みを明示（Abstract/Eabstractにも反映）。

## 未対応・著者判断が必要な点
- **図（fig:gomod, fig:venn）** は未作成（草稿同様プレースホルダのまま）。
- **参考文献の年・書誌**（zhou2026=CODASPY 2026 等）は草稿のまま。要最終確認。
- **著者名・所属** はプレースホルダ（○○大学 / 安岡 瑞希）のまま。
- kubernetes は workspace で `go list -m all` が空を返し n_all=0（v1も同値・両run一致）。
  macro平均への影響は無視できるが、厳密には既知の限界として脚注化も可。
