#!/bin/bash
# process_one.sh <name> <url> <outdir> <workdir>
# 1 repo分を処理し、metric_one_sib.js のCSV行を stdout に出す。全体を呼び出し側が timeout で包む。
set -u
name="$1"; url="$2"; outdir="$3"; d="$4"
OUT="/home/user/SBOM/results_fresh"; TO=300
mkdir -p "$outdir"; rm -rf "$d"
if ! timeout 180 git clone --depth=1 "$url" "$d" >/dev/null 2>&1; then
  echo "$name,CLONE_FAIL"; rm -rf "$outdir" "$d"; exit 0
fi
awk '{print $1}' "$d/go.sum" 2>/dev/null | sort -u > "$outdir/gosum.txt"
(cd "$d" && timeout 60 go mod edit -json 2>/dev/null) | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);(j.Require||[]).filter(r=>!r.Indirect).forEach(r=>console.log(r.Path))}catch(e){}})' | sort -u > "$outdir/mod_direct.txt"
(cd "$d" && timeout 60 go mod edit -json 2>/dev/null) | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);(j.Require||[]).filter(r=>r.Indirect).forEach(r=>console.log(r.Path))}catch(e){}})' | sort -u > "$outdir/mod_indirect.txt"
timeout $TO syft "$d" -o cyclonedx-json="$outdir/syft_output.json" 2>/dev/null
timeout $TO trivy fs "$d" --format cyclonedx --output "$outdir/trivy_output.json" 2>/dev/null
timeout $TO cdxgen -t go "$d" -o "$outdir/cdxgen_output.json" >/dev/null 2>&1
timeout $TO cyclonedx-gomod mod -json -output "$outdir/cyclonedx-gomod_output.json" "$d" 2>/dev/null
rm -rf /tmp/cdxgen-* /tmp/pip-* 2>/dev/null
gmain=$(cd "$d" && timeout 120 go list -m 2>/dev/null | head -1 | awk '{print $1}')
echo "$gmain" > "$outdir/main.txt"
# go mod download をディスク監視付きで実行: 空き<1.5Gに落ちたら中断（巨大repoスキップ）
( cd "$d" && timeout $TO go mod download 2>/dev/null ) &
DL=$!
while kill -0 $DL 2>/dev/null; do
  f=$(df --output=avail / | tail -1)
  if [ "$f" -lt 1572864 ]; then kill -9 $DL 2>/dev/null; pkill -9 -P $DL 2>/dev/null; echo "" > "$outdir/.diskskip"; break; fi
  sleep 4
done
[ -f "$outdir/.diskskip" ] && { rm -rf "$d" "$outdir"; exit 0; }   # ディスク退避→このrepoは出力せずスキップ
(cd "$d" && timeout $TO go list -m all 2>/dev/null) > "$outdir/gt_all.txt"
(cd "$d" && GOOS=linux timeout $TO go list -deps -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./... 2>/dev/null) | grep -v '^$' | grep -v "^${gmain} \?$" | sort -u > "$outdir/gt_imported.txt"
(cd "$d" && GOOS=linux timeout $TO go list -deps -test -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./... 2>/dev/null) | grep -v '^$' | grep -v "^${gmain} \?$" | sort -u > "$outdir/gt_impT.txt"
(cd "$d" && GOOS=windows timeout $TO go list -deps -e -f '{{with .Module}}{{.Path}}{{end}}' ./... 2>/dev/null) | grep -v '^$' | grep -v "^${gmain}\$" | sort -u > "$outdir/win.txt"
# GT(imported)が空なら評価不能→スキップ（出力しない）
[ -s "$outdir/gt_imported.txt" ] || { rm -rf "$d" "$outdir"; exit 0; }
node "$OUT/metric_one_sib.js" "$outdir"
rm -rf "$d"
