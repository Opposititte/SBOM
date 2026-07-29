# 再実行で得られた知見（census2/rerun）

## 1. PURL 仕様の小文字化要求と、ツール間の非準拠（相互運用性の問題）

### 事実
SBOM のモジュール識別子は PURL で表現される。**PURL 仕様の `golang` 型は
namespace と name の小文字化を必須と定めている**。

> "The namespace must be lowercased." / "The name must be lowercased."
> — package-url/purl-spec, `types/golang-definition.json`（spec version 1.0）

同じ定義には次の但し書きもある:

> "The current definition predates Go modules and has several practical problems,
>  and in particular it is impossible to determine what is a module and what is a
>  package short of having full access to the source code or making an API call to
>  the Go module proxy."

### 実測（10リポジトリの試行）
| ソース | `Masterminds/semver/v3` の出力 | 仕様準拠 |
|---|---|---|
| GT (`go list`) | `github.com/Masterminds/semver/v3` | （PURLではない） |
| **trivy** | `github.com/masterminds/semver/v3` | **○ 準拠** |
| syft | `github.com/Masterminds/semver/v3` | × 非準拠 |
| cdxgen | `github.com/Masterminds/semver/v3` | × 非準拠 |
| cyclonedx-gomod | `github.com/Masterminds/semver/v3` | × 非準拠 |

10リポジトリだけで **9モジュール**が該当。**小文字化して照合しなければ、これらは
すべて trivy のみの偽の FP+FN** となり、trivy を不当に低く評価することになる。

### 重要な注意（表現を誤らないこと）
「**Trivy だけが変わっている**」という書き方は**誤り**。正しくは
「**PURL 仕様に準拠しているのが Trivy のみで、他の3ツールが仕様から逸脱している**」。
Go のモジュールパスは本来大文字小文字を区別するのに PURL が小文字へ正規化するため
照合が壊れる、という既知の問題であり、SBOM ツール間の**相互運用性の問題**として
論文の価値を上げる材料になる。

### 論文での記述案
> SBOM のモジュール識別子は PURL で表現されるが、PURL 仕様の golang 型は
> namespace と name の小文字化を求めている。実際に小文字化していたのは Trivy のみで、
> 他の3ツールは原文の大文字を保持していた。本研究では照合の公平性のため、
> モジュールパスを小文字化して比較した。

---

## 2. 母集団の条件付けに関する非対称（限界として明記すべき）

### 事実
評価対象 1,528 件は「**GT-imported が空でない**」ことを条件に絞っている
（`proc.sh:74` の `if [ ! -s gt_imported.txt ]` による）。
このため **`EMPTY_GT` で除外された 123 件**は「go.mod には外部依存があるが、
コードがどれも import していない」リポジトリである。

### なぜ問題になりうるか
GT-imported が空なら、go.mod / go.sum を読む Syft・Trivy が出力した依存は
**すべて FP** となり precision は 0 になる。つまり除外によって、
**Syft と Trivy にとって最も不利なケースが母集団から消えている**。

3つの GT 定義を比較する研究でありながら、そのうち1つ（GT-imported）が
空でないことを母集団の条件にしている、という非対称がある。

### 対応
- 数値自体は誤りではないので予稿の修正は不要。
- ただし CSS 原稿では「非Goプロジェクトや外部依存を持たないものなど」ではなく、
  **「GT-imported が空である 123 件を除外した」と正確に書き、この条件付けを限界として明記する**。
- 余裕があれば、この 123 件を含めた場合の数値を出すと頑健性の裏付けになる
  （8/21 の投稿までの優先度は高くない）。

---

## 3. 母数 1,528 に n_all の +1 は影響していない（確認済み）
7月の `manifest.csv` の `n_all` 列は `go list -m -e all` の生出力を数えており
main module 行を1件含む（+1）。ただし**フィルタは `gt_imported.txt` の非空判定**で
`n_all` を使っていないため、母数への混入はない。採点（`scorer.js`）も `p===main` を
除外しているので tp/fp/fn は正しい。
