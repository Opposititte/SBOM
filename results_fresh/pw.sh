#!/bin/bash
# pw.sh <name> <url>  — 1 repoを処理し parts/<name>.csv に結果を書く（並列ワーカー）
set -u
name="$1"; url="$2"
OUT=/home/user/SBOM/results_fresh
PARTS="$OUT/parts"; WORK=/tmp/sib_work
mkdir -p "$PARTS"
[ -f "$PARTS/$name.csv" ] && exit 0
outdir="$OUT/data_sib/$name"
line=$(timeout 900 bash "$OUT/process_one.sh" "$name" "$url" "$outdir" "$WORK/$name" 2>/dev/null)
rc=$?
tmp="$PARTS/$name.csv.tmp.$$"
if [ $rc -eq 124 ] || [ -z "$line" ]; then echo "$name,TIMEOUT_OR_EMPTY" > "$tmp"; else echo "$line" > "$tmp"; fi
mv "$tmp" "$PARTS/$name.csv"
rm -rf "$WORK/$name" "$outdir" 2>/dev/null
