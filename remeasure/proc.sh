#!/bin/bash
# proc.sh <name> <url> <outdir> <workdir>
# 1 repoを処理: (a) メトリクスCSV行を stdout に出力、(b) マニフェスト行(名前+バージョン等)を manifest_parts に書く。
# GT定義は process_one.sh(検証済)と同一。判定は metric_one_sib.js を再利用。
set -u
name="$1"; url="$2"; outdir="$3"; d="$4"
BASE="/home/user/SBOM/remeasure"
SCORE="/home/user/SBOM/results_fresh/metric_one_sib.js"   # 独立検証済みの判定コードを再利用
MAN="$BASE/manifest_parts/$name.csv"
export GOMODCACHE=/tmp/rm_modcache GOCACHE=/tmp/rm_gocache
TO=300
mkdir -p "$outdir"; rm -rf "$d"

wman(){ printf '%s\n' "$1" > "$MAN.tmp.$$"; mv "$MAN.tmp.$$" "$MAN"; }

if ! timeout 180 git clone --depth=1 "$url" "$d" >/dev/null 2>&1; then
  wman "$name,$url,,,,,CLONE_FAIL,,,"
  echo "$name,CLONE_FAIL"; rm -rf "$outdir" "$d"; exit 0
fi
# --- バージョン(名前+コミット)を記録 ---
sha=$(cd "$d" && git rev-parse HEAD 2>/dev/null)
cdate=$(cd "$d" && git log -1 --format=%cI 2>/dev/null)
gover=$(grep -m1 '^go ' "$d/go.mod" 2>/dev/null | awk '{print $2}')
gmain=$(cd "$d" && timeout 120 go list -m 2>/dev/null | head -1 | awk '{print $1}')
echo "$gmain" > "$outdir/main.txt"

# --- FP分類用の補助集合（無改変のgo.mod/go.sumを先に読む）---
awk '{print $1}' "$d/go.sum" 2>/dev/null | sort -u > "$outdir/gosum.txt"
(cd "$d" && timeout 60 go mod edit -json 2>/dev/null) > "$outdir/modedit.json"
node -e 'let s=require("fs").readFileSync(process.argv[1],"utf8");try{const j=JSON.parse(s);(j.Require||[]).forEach(r=>{if(!r.Indirect)console.log(r.Path)})}catch(e){}' "$outdir/modedit.json" | sort -u > "$outdir/mod_direct.txt"
node -e 'let s=require("fs").readFileSync(process.argv[1],"utf8");try{const j=JSON.parse(s);(j.Require||[]).forEach(r=>{if(r.Indirect)console.log(r.Path)})}catch(e){}' "$outdir/modedit.json" | sort -u > "$outdir/mod_indirect.txt"

# --- 4ツール（無改変ソースを読ませる）---
timeout $TO syft "$d" -o cyclonedx-json="$outdir/syft_output.json" 2>/dev/null
timeout $TO trivy fs "$d" --format cyclonedx --output "$outdir/trivy_output.json" 2>/dev/null
timeout $TO cdxgen -t go "$d" -o "$outdir/cdxgen_output.json" >/dev/null 2>&1
timeout $TO cyclonedx-gomod mod -json -output "$outdir/cyclonedx-gomod_output.json" "$d" 2>/dev/null
rm -rf /tmp/cdxgen-* /tmp/pip-* 2>/dev/null

# --- go mod download をディスク監視付きで（空き<1.5Gで中断→スキップ）---
( cd "$d" && timeout $TO go mod download 2>/dev/null ) &
DL=$!
while kill -0 $DL 2>/dev/null; do
  f=$(df --output=avail / | tail -1)
  if [ "$f" -lt 1572864 ]; then kill -9 $DL 2>/dev/null; pkill -9 -P $DL 2>/dev/null; touch "$outdir/.diskskip"; break; fi
  sleep 4
done
if [ -f "$outdir/.diskskip" ]; then
  wman "$name,$url,$sha,$cdate,$gmain,$gover,DISK_SKIP,,,"
  echo "$name,DISK_SKIP"; rm -rf "$d" "$outdir"; exit 0
fi

# --- 3定義のGT（all / imported / imported+test）＋ windows（他OS分類用）---
(cd "$d" && timeout $TO go list -m all 2>/dev/null) > "$outdir/gt_all.txt"
(cd "$d" && GOOS=linux timeout $TO go list -deps -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./... 2>/dev/null) | grep -v '^$' | grep -v "^${gmain} \?$" | sort -u > "$outdir/gt_imported.txt"
(cd "$d" && GOOS=linux timeout $TO go list -deps -test -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./... 2>/dev/null) | grep -v '^$' | grep -v "^${gmain} \?$" | sort -u > "$outdir/gt_impT.txt"
(cd "$d" && GOOS=windows timeout $TO go list -deps -e -f '{{with .Module}}{{.Path}}{{end}}' ./... 2>/dev/null) | grep -v '^$' | grep -v "^${gmain}\$" | sort -u > "$outdir/win.txt"

# GT-imported が空なら評価不能 → マニフェストには残すがメトリクスは出さない
n_imp=$(grep -c . "$outdir/gt_imported.txt" 2>/dev/null)
n_impT=$(grep -c . "$outdir/gt_impT.txt" 2>/dev/null)
n_all=$(grep -c . "$outdir/gt_all.txt" 2>/dev/null)
if [ ! -s "$outdir/gt_imported.txt" ]; then
  wman "$name,$url,$sha,$cdate,$gmain,$gover,EMPTY_GT,$n_imp,$n_impT,$n_all"
  rm -rf "$d" "$outdir"; exit 0
fi
wman "$name,$url,$sha,$cdate,$gmain,$gover,OK,$n_imp,$n_impT,$n_all"
node "$SCORE" "$outdir"
rm -rf "$d"
