#!/bin/bash
# worker.sh <name> <url> — 1 repoを timeout付きで処理し parts/<name>.csv を書く（並列単位）
set -u
name="$1"; url="$2"
BASE="/home/user/SBOM/census2"
PARTS="$BASE/parts"; WORK=/tmp/rm_work
export GOMODCACHE=/tmp/rm_modcache GOCACHE=/tmp/rm_gocache
mkdir -p "$PARTS" "$WORK"
[ -f "$PARTS/$name.csv" ] && exit 0
outdir="$BASE/data/$name"
line=$(timeout 900 bash "$BASE/proc.sh" "$name" "$url" "$outdir" "$WORK/$name" 2>/dev/null)
rc=$?
tmp="$PARTS/$name.csv.tmp.$$"
if [ $rc -eq 124 ] || [ -z "$line" ]; then echo "$name,TIMEOUT_OR_EMPTY" > "$tmp"; else echo "$line" > "$tmp"; fi
mv "$tmp" "$PARTS/$name.csv"
rm -rf "$WORK/$name" "$outdir" 2>/dev/null
