# census — 前回より新しく評価対象(OK)になった 40 リポジトリの内訳

「今回OK」かつ「前回(resultsAll)は imported GT が空/欠損」だった repo を、原因別に分類。
分類優先度: vendorディレクトリ有り → 新Go(1.25+)要求 → それ以外(新コミット等)。

## カテゴリ1: vendor/ 対応(-mod=mod)で復活 — 2 件
（※ vendor修正の主効果は「新規追加」より、blocky/align 等 前回もOKだった多数の vendored repo が今回落ちないようにする
  "取りこぼし防止(正しさの担保)"。新規に増えたのはこの2件のみ）

- kubenetworks__kubevpn (go1.26.3)
- kubernetes__kubernetes (go1.26.0)

## カテゴリ2: 新しいGo(1.25/1.26)要求を回収 — 14 件

- SimonWaldherr__golang-examples (go1.26.4)
- corazawaf__coraza (go1.25.0)
- etcd-io__etcd (go1.26)
- getsentry__sentry-go (go1.25.0)
- go-fuego__fuego (go1.26.4)
- go-testfixtures__testfixtures (go1.25.9)
- gofr-dev__gofr (go1.26.0)
- google__google-api-go-client (go1.25.0)
- happy-sdk__happy (go1.25)
- kjkrol__goke (go1.26.4)
- lf-edge__ekuiper (go1.25.4)
- pomerium__pomerium (go1.26.3)
- spiral__roadrunner (go1.26.4)
- vektra__mockery (go1.25.5)

## カテゴリ3: 新しいコミット等(go<=1.24) — 24 件
（前回計測よりHEADが進み依存を追加/変更、または前回の一時的失敗の回収）

- FrancoLiberali__cql (go1.22.0)
- NicoNex__echotron (go1.19)
- Raezil__GoEventBus (go1.23.0)
- bytedance__sonic (go1.18)
- go-kivik__kivik (go1.20)
- go-rod__rod (go1.21)
- knadh__koanf (go1.23.0)
- leodido__structcli (go1.24.0)
- maypok86__otter (go1.24.0)
- mongodb__mongo-go-driver (go1.19)
- oaswrap__spec (go1.22)
- rsteube__carapace-spec (go1.24)
- rsteube__carapace (go1.24)
- samber__do (go1.18)
- samber__oops (go1.21)
- samber__ro (go1.18)
- samber__slog-multi (go1.22)
- shurcooL__githubql (go1.19)
- tylertreat__Comcast (go1.15)
- ulikunitz__xz (go1.20)
- veandco__go-sdl2 (go1.15)
- yeqown__go-qrcode (go1.19)
- youthlin__t (go1.23.0)
- ysmood__got (go1.21)
