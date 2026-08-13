#!/bin/bash
# heavy_worker.sh <name> <url> — 1 repoを長timeout・per-repo隔離キャッシュで処理。
# 重いrepo(kubernetes/etcd等, go.work含む)を drive.sh とは別に確実に再計測するための単発ワーカー。
set -u
name="$1"; url="$2"
BASE="/home/user/SBOM/census2"
# per-repo隔離キャッシュ（大disk上）。proc.shは ${GOMODCACHE:-...} で尊重する。処理後に必ず削除。
export GOMODCACHE="/tmp/rmh_${name}/mod" GOCACHE="/tmp/rmh_${name}/build"
export TO=650 PATH=/opt/go1265/go/bin:$PATH GOTOOLCHAIN=local GOFLAGS=-mod=mod
mkdir -p "$GOMODCACHE" "$GOCACHE"
outdir="$BASE/data/$name"
line=$(timeout 1900 bash "$BASE/proc.sh" "$name" "$url" "$outdir" "/tmp/rmh_${name}/work" 2>/dev/null)
# proc.sh は OK/EMPTY_GT/CLONE_FAIL いずれでも manifest_part を書く。
# metrics(parts/) は OK時のみ scorer が stdout に出す→ここで parts/ に保存。
if [ -n "$line" ]; then printf '%s\n' "$line" > "$BASE/parts/$name.csv.tmp.$$"; mv "$BASE/parts/$name.csv.tmp.$$" "$BASE/parts/$name.csv"; fi
st=$(head -1 "$BASE/manifest_parts/$name.csv" 2>/dev/null | cut -d, -f7)
printf '%s -> %s\n' "$name" "${st:-NOPART}" >> "$BASE/heavy.log"
rm -rf "/tmp/rmh_${name}" "$outdir" 2>/dev/null
