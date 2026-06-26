#!/bin/bash
# 3GT batch: 既存ツール出力を再利用し、各repoを再クローンして3つ目GT(imported_test)等を生成。
set -u
ROOT=/home/user/SBOM
OUT="$ROOT/results3gt"; DONE="$OUT/done"; WORK=/tmp/t3_work
export GOMODCACHE=/tmp/t3_modcache
mkdir -p "$OUT" "$DONE" "$WORK" "$GOMODCACHE"
CSV="$OUT/metrics3gt.csv"
[ -f "$CSV" ] || echo "repo,tool,predicted,drift,all_tp,all_fp,all_fn,imp_tp,imp_fp,imp_fn,impT_tp,impT_fp,impT_fn,fp_test,fp_otherOS,fp_direct_unused,fp_indirect_unused,fp_gosum_only" > "$CSV"
cd "$ROOT"
mapfile -t ROWS < "$OUT/repolist.csv"
TOTAL=${#ROWS[@]}
echo "対象 $TOTAL repos / 開始 $(date -u +%H:%M:%S)"
i=0
for line in "${ROWS[@]}"; do
  name="${line%%,*}"; url="${line#*,}"
  [ -z "$name" ] && continue
  [ -f "$DONE/$name" ] && continue
  i=$((i+1))
  # disk guard
  freekb=$(df --output=avail / | tail -1); [ "$freekb" -lt 4194304 ] && { go clean -modcache >/dev/null 2>&1; rm -rf "$GOMODCACHE" /root/go/pkg/mod; mkdir -p "$GOMODCACHE"; }
  d="$WORK/$name"; rm -rf "$d"
  if ! timeout 180 git clone --depth=1 "$url" "$d" >/dev/null 2>&1; then
    echo "$name,CLONE_FAIL" >> "$CSV"; touch "$DONE/$name"; continue
  fi
  main=$(cd "$d" && timeout 120 go list -m 2>/dev/null | head -1 | awk '{print $1}')
  fd="$WORK/fresh_$name"; rm -rf "$fd"; mkdir -p "$fd"
  (cd "$d" && GOOS=linux  timeout 180 go list -deps -e -f '{{with .Module}}{{.Path}}{{end}}' ./... 2>/dev/null) | grep -v "^$main\$" | sort -u > "$fd/imp.txt"
  (cd "$d" && GOOS=linux  timeout 180 go list -deps -test -e -f '{{with .Module}}{{.Path}}{{end}}' ./... 2>/dev/null) | grep -v "^$main\$" | sort -u > "$fd/impT.txt"
  (cd "$d" && GOOS=windows timeout 180 go list -deps -e -f '{{with .Module}}{{.Path}}{{end}}' ./... 2>/dev/null) | grep -v "^$main\$" | sort -u > "$fd/win.txt"
  (cd "$d" && go mod edit -json 2>/dev/null) | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);(j.Require||[]).filter(r=>!r.Indirect).forEach(r=>console.log(r.Path))}catch(e){}})' | sort -u > "$fd/mod_direct.txt"
  (cd "$d" && go mod edit -json 2>/dev/null) | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);(j.Require||[]).filter(r=>r.Indirect).forEach(r=>console.log(r.Path))}catch(e){}})' | sort -u > "$fd/mod_indirect.txt"
  awk '{print $1}' "$d/go.sum" 2>/dev/null | sort -u > "$fd/gosum.txt"
  node "$OUT/compute_3gt.js" "$name" "$fd" 2>/dev/null
  touch "$DONE/$name"
  rm -rf "$d" "$fd"
  [ $((i % 10)) -eq 0 ] && { go clean -modcache >/dev/null 2>&1; rm -rf "$GOMODCACHE" /root/go/pkg/mod; mkdir -p "$GOMODCACHE"; }
  if [ $((i % 25)) -eq 0 ]; then
    git add -A "$OUT" >/dev/null 2>&1
    git -c user.name='Opposititte' -c user.email='201308377+Opposititte@users.noreply.github.com' commit -q -m "3GT batch progress $i ($(ls $DONE | wc -l)/$TOTAL)

https://claude.ai/code/session_01TWWX9ddjZjKjWCREMxt8Nh" >/dev/null 2>&1
    for r in 1 2 3 4; do git push origin claude/three-gt >/dev/null 2>&1 && break || sleep $((2**r)); done
    echo "[$(date -u +%H:%M:%S)] done=$(ls $DONE | wc -l)/$TOTAL free=$(df -h /|tail -1|awk '{print $4}')"
  fi
done
git add -A "$OUT" >/dev/null 2>&1
git -c user.name='Opposititte' -c user.email='201308377+Opposititte@users.noreply.github.com' commit -q -m "3GT batch complete

https://claude.ai/code/session_01TWWX9ddjZjKjWCREMxt8Nh" >/dev/null 2>&1
for r in 1 2 3 4; do git push origin claude/three-gt >/dev/null 2>&1 && break || sleep $((2**r)); done
echo "ALL_DONE $(date -u +%H:%M:%S)"
