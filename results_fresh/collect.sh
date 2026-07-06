#!/bin/bash
# 同一時点フル再収集: 1回のクローン上で all/imported/imported+test の3GT(版付き)と
# syft/trivy/cdxgen/cyclonedx-gomod の4ツール出力を同時に生成する。
# これにより GT とツール出力の生成時点が完全一致し、version一致が3GT全てで有効になる。
# 使い方: collect.sh [repolist.csv] [N件だけ]
set -u
ROOT=/home/user/SBOM
OUT="$ROOT/results_fresh/data"; DONE="$OUT/.done"; WORK=/tmp/fresh_work
export GOMODCACHE=/tmp/fresh_modcache
# 注: GOEXPERIMENT=jsonv2 は trivy の「ビルド」専用。ここ(実行時)で設定すると
# 古い go 指定のrepoで `go list` が "unknown GOEXPERIMENT" で失敗するため設定しない。
export GOFLAGS=-mod=mod
mkdir -p "$OUT" "$DONE" "$WORK" "$GOMODCACHE"
LIST="${1:-$ROOT/results3gt/repolist.csv}"
LIMIT="${2:-100000}"
TO=300
i=0; ok=0
while IFS=, read -r name url rest; do
  name="${name%%,*}"; [ -z "$name" ] && continue
  [ -f "$DONE/$name" ] && continue
  i=$((i+1)); [ "$i" -gt "$LIMIT" ] && break
  # disk guard
  freekb=$(df --output=avail / | tail -1); [ "$freekb" -lt 4194304 ] && { go clean -modcache >/dev/null 2>&1; rm -rf "$GOMODCACHE" /root/go/pkg/mod; mkdir -p "$GOMODCACHE"; }
  outdir="$OUT/$name"; mkdir -p "$outdir"
  d="$WORK/$name"; rm -rf "$d"
  if ! timeout 180 git clone --depth=1 "$url" "$d" >/dev/null 2>&1; then
    echo "CLONE_FAIL" > "$outdir/status"; touch "$DONE/$name"; continue
  fi
  gmain=$(cd "$d" && timeout 120 go list -m 2>/dev/null | head -1 | awk '{print $1}')
  echo "$gmain" > "$outdir/main.txt"
  # 3つのGT（版付き）を同一クローンから
  (cd "$d" && timeout $TO go list -m all 2>/dev/null) > "$outdir/gt_all.txt"
  (cd "$d" && GOOS=linux timeout $TO go list -deps -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./... 2>/dev/null) \
    | grep -v '^$' | grep -v "^${gmain} \?$" | sort -u > "$outdir/gt_imported.txt"
  (cd "$d" && GOOS=linux timeout $TO go list -deps -test -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./... 2>/dev/null) \
    | grep -v '^$' | grep -v "^${gmain} \?$" | sort -u > "$outdir/gt_impT.txt"
  # 4ツール（同一クローン）— 元 run_batch.sh と同じコマンド
  timeout $TO syft "$d" -o cyclonedx-json="$outdir/syft_output.json" 2>/dev/null
  timeout $TO trivy fs "$d" --format cyclonedx --output "$outdir/trivy_output.json" 2>/dev/null
  timeout $TO cdxgen -t go "$d" -o "$outdir/cdxgen_output.json" >/dev/null 2>&1
  timeout $TO cyclonedx-gomod mod -json -output "$outdir/cyclonedx-gomod_output.json" "$d" 2>/dev/null
  rm -rf /tmp/cdxgen-* /tmp/pip-* 2>/dev/null
  echo "OK" > "$outdir/status"; ok=$((ok+1))
  touch "$DONE/$name"
  rm -rf "$d"
  [ $((i % 10)) -eq 0 ] && { go clean -modcache >/dev/null 2>&1; rm -rf "$GOMODCACHE" /root/go/pkg/mod; mkdir -p "$GOMODCACHE"; }
  echo "[$(date -u +%H:%M:%S)] $i 件処理 (OK=$ok) 直近=$name"
done < "$LIST"
echo "DONE i=$i ok=$ok"
