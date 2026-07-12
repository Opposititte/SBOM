#!/bin/bash
# 耐ハング版: 各repoを process_one.sh に分離し timeout 900 で必ず打ち切る。
# CSVに載ったrepoはスキップ（再開可能）。25件ごとに commit/push。
set -u
ROOT=/home/user/SBOM
OUT="$ROOT/results_fresh"; DATA="$OUT/data_sib"; WORK=/tmp/sib_work
CSV="$OUT/metrics_sibling.csv"
export GOMODCACHE=/tmp/sib_modcache
mkdir -p "$DATA" "$WORK" "$GOMODCACHE"
LIST="${1:-$ROOT/results3gt/repolist.csv}"
KEEP_RAW=30
HDR="repo,tool,n_all_tp,n_all_fp,n_all_fn,n_imp_tp,n_imp_fp,n_imp_fn,n_impT_tp,n_impT_fp,n_impT_fn,v_all_tp,v_all_fp,v_all_fn,v_imp_tp,v_imp_fp,v_imp_fn,v_impT_tp,v_impT_fp,v_impT_fn,fp_test,fp_otherOS,fp_direct_unused,fp_indirect_unused,fp_resid_gosum,fp_resid_sibling"
[ -f "$CSV" ] || echo "$HDR" > "$CSV"
declare -A DONE_MAP
while IFS=, read -r r _; do [ -n "$r" ] && DONE_MAP["$r"]=1; done < <(tail -n +2 "$CSV" | cut -d, -f1)

commit_push() {
  git -C "$ROOT" add "$CSV" >/dev/null 2>&1
  git -C "$ROOT" -c user.name='Opposititte' -c user.email='201308377+Opposititte@users.noreply.github.com' \
    commit -q -m "sibling re-collection: $1 repos" >/dev/null 2>&1
  for r in 1 2 3 4; do git -C "$ROOT" push origin claude/adoring-gates-2mlb1d >/dev/null 2>&1 && break || sleep $((2**r)); done
}

i=0; ok=0; started=$(date -u +%s)
while IFS=, read -r name url rest; do
  name="${name%%,*}"; [ -z "$name" ] && continue
  [ "${DONE_MAP[$name]:-}" = "1" ] && continue
  i=$((i+1))
  freekb=$(df --output=avail / | tail -1); [ "$freekb" -lt 4194304 ] && { go clean -modcache >/dev/null 2>&1; rm -rf "$GOMODCACHE" /root/go/pkg/mod; mkdir -p "$GOMODCACHE"; }
  outdir="$DATA/$name"
  line=$(timeout 900 bash "$OUT/process_one.sh" "$name" "$url" "$outdir" "$WORK/$name" 2>/dev/null)
  rc=$?
  if [ $rc -eq 124 ] || [ -z "$line" ]; then
    echo "$name,TIMEOUT_OR_EMPTY" >> "$CSV"; rm -rf "$WORK/$name" "$outdir" 2>/dev/null
  else
    echo "$line" >> "$CSV"; ok=$((ok+1))
  fi
  DONE_MAP[$name]=1
  [ "$ok" -gt "$KEEP_RAW" ] && rm -rf "$outdir" 2>/dev/null
  [ $((i % 10)) -eq 0 ] && { go clean -modcache >/dev/null 2>&1; rm -rf "$GOMODCACHE" /root/go/pkg/mod; mkdir -p "$GOMODCACHE"; }
  tot=$(( $(wc -l < "$CSV") - 1 ))
  if [ $((tot % 100)) -lt 4 ] && [ "$tot" -gt 0 ]; then
    commit_push "$tot"
    el=$(( $(date -u +%s) - started )); echo "[$(date -u +%H:%M:%S)] i=$i ok=$ok tot=$tot 経過${el}s free=$(df -h /|tail -1|awk '{print $4}')"
  fi
done < "$LIST"
tot=$(( $(wc -l < "$CSV") - 1 )); commit_push "$tot"
echo "DONE tot=$tot"
