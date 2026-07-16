#!/bin/bash
# run.sh [P] — 全repoを並列収集。parts→metrics.csv、manifest_parts→manifest.csv にマージ＆push。
set -u
ROOT=/home/user/SBOM; BASE="$ROOT/remeasure"
CSV="$BASE/metrics.csv"; MANIFEST="$BASE/manifest.csv"
PARTS="$BASE/parts"; MPARTS="$BASE/manifest_parts"; LIST="$ROOT/results3gt/repolist.csv"
BRANCH=claude/awesome-go-remeasure
P="${1:-8}"
export GOMODCACHE=/tmp/rm_modcache GOCACHE=/tmp/rm_gocache
mkdir -p "$PARTS" "$MPARTS" /tmp/rm_work "$GOMODCACHE" "$GOCACHE"

HDR="repo,tool,n_all_tp,n_all_fp,n_all_fn,n_imp_tp,n_imp_fp,n_imp_fn,n_impT_tp,n_impT_fp,n_impT_fn,v_all_tp,v_all_fp,v_all_fn,v_imp_tp,v_imp_fp,v_imp_fn,v_impT_tp,v_impT_fp,v_impT_fn,fp_test,fp_otherOS,fp_direct_unused,fp_indirect_unused,fp_gosum_only,fp_sibling"
MHDR="repo,url,commit_sha,commit_date,main_module,go_version,status,n_imported,n_impT,n_all"
[ -f "$CSV" ] || echo "$HDR" > "$CSV"
[ -f "$MANIFEST" ] || echo "$MHDR" > "$MANIFEST"

# ディスク番人: 空き<5Gで両キャッシュ掃除
( while true; do sleep 40
    freekb=$(df --output=avail / | tail -1)
    [ "$freekb" -lt 5242880 ] && { rm -rf "$GOCACHE" "$GOMODCACHE" /root/.cache/go-build /root/go/pkg/mod 2>/dev/null; mkdir -p "$GOCACHE" "$GOMODCACHE"; }
  done ) & JAN=$!
trap 'kill $JAN 2>/dev/null' EXIT

merge(){
  for f in "$PARTS"/*.csv; do [ -e "$f" ] || continue
    n=$(basename "$f" .csv); grep -q "^$n," "$CSV" 2>/dev/null || cat "$f" >> "$CSV"; done
  for f in "$MPARTS"/*.csv; do [ -e "$f" ] || continue
    n=$(basename "$f" .csv); grep -q "^$n," "$MANIFEST" 2>/dev/null || cat "$f" >> "$MANIFEST"; done
}
push(){
  git -C "$ROOT" add "$CSV" "$MANIFEST" >/dev/null 2>&1
  git -C "$ROOT" -c user.name='Opposititte' -c user.email='201308377+Opposititte@users.noreply.github.com' \
    commit -q -m "remeasure: $(ls "$MPARTS" 2>/dev/null | wc -l) repos processed" >/dev/null 2>&1
  for r in 1 2 3 4; do git -C "$ROOT" push -u origin "$BRANCH" >/dev/null 2>&1 && break || sleep $((2**r)); done
}

# todo = manifest未登録 かつ manifest_part未生成（manifestを進捗の真実とする）
declare -A DONE
while IFS=, read -r r _; do [ -n "$r" ] && DONE["$r"]=1; done < <(tail -n +2 "$MANIFEST" | cut -d, -f1)
todo=$(mktemp)
while IFS=, read -r name url rest; do name="${name%%,*}"; [ -z "$name" ] && continue
  [ "${DONE[$name]:-}" = "1" ] && continue
  [ -f "$MPARTS/$name.csv" ] && continue
  echo "$name $url" >> "$todo"
done < "$LIST"
shuf --random-source=<(yes 42) "$todo" -o "$todo"
echo "todo: $(wc -l < "$todo") repos, P=$P"

( while true; do sleep 150; merge; push
    echo "[$(date -u +%H:%M:%S)] repos=$(ls "$MPARTS" 2>/dev/null|wc -l) ok=$(grep -c ',OK,' "$MANIFEST") free=$(df -h /|tail -1|awk '{print $4}')"
  done ) & MRG=$!

xargs -P "$P" -L 1 bash "$BASE/worker.sh" < "$todo"

kill $MRG 2>/dev/null
merge; push
echo "DONE repos=$(ls "$MPARTS" 2>/dev/null|wc -l)"
