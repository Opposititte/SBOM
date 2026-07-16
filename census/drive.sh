#!/bin/bash
# drive.sh [P] [BATCH] — 全awesome-go repoを4ツール×3定義で計測。
# 安定運用: 背景の常駐サブシェルを一切使わず、バッチ単位で
#   xargs(前景) -> merge -> commit -> push を逐次実行。
# 中断/コンテナ破棄に強い: 進捗の真実は committed manifest.csv。再実行で続きから。
set -u
ROOT=/home/user/SBOM; BASE="$ROOT/census"
CSV="$BASE/metrics.csv"; MANIFEST="$BASE/manifest.csv"
PARTS="$BASE/parts"; MPARTS="$BASE/manifest_parts"; LIST="$BASE/repolist.csv"
BRANCH=claude/awesome-go-cleanup-5ix8nl
P="${1:-8}"; BATCH="${2:-100}"
export GOMODCACHE=/tmp/rm_modcache GOCACHE=/tmp/rm_gocache
export GIT_AUTHOR_NAME=Opposititte GIT_AUTHOR_EMAIL=201308377+Opposititte@users.noreply.github.com
export GIT_COMMITTER_NAME=Opposititte GIT_COMMITTER_EMAIL=201308377+Opposititte@users.noreply.github.com
mkdir -p "$PARTS" "$MPARTS" "$GOMODCACHE" "$GOCACHE"
LOG="$BASE/drive.log"

HDR="repo,tool,n_all_tp,n_all_fp,n_all_fn,n_imp_tp,n_imp_fp,n_imp_fn,n_impT_tp,n_impT_fp,n_impT_fn,v_all_tp,v_all_fp,v_all_fn,v_imp_tp,v_imp_fp,v_imp_fn,v_impT_tp,v_impT_fp,v_impT_fn,fp_test,fp_otherOS,fp_direct_unused,fp_indirect_unused,fp_gosum_only,fp_sibling"
MHDR="repo,url,commit_sha,commit_date,main_module,go_version,status,n_imported,n_impT,n_all"
[ -f "$CSV" ] || echo "$HDR" > "$CSV"
[ -f "$MANIFEST" ] || echo "$MHDR" > "$MANIFEST"

log(){ echo "[$(date -u +%H:%M:%S)] $*" >> "$LOG"; }

# 自分が死んだら配下のworker/procも道連れに（孤児化防止）
cleanup(){ pkill -9 -P $$ 2>/dev/null; pkill -9 -f 'census/(worker|proc)\.sh' 2>/dev/null; }
trap cleanup EXIT INT TERM

merge(){
  for f in "$PARTS"/*.csv; do [ -e "$f" ] || continue; n=$(basename "$f" .csv)
    grep -q "^$n," "$CSV" 2>/dev/null || cat "$f" >> "$CSV"; done
  for f in "$MPARTS"/*.csv; do [ -e "$f" ] || continue; n=$(basename "$f" .csv)
    grep -q "^$n," "$MANIFEST" 2>/dev/null || cat "$f" >> "$MANIFEST"; done
}
push(){
  git -C "$ROOT" add "$CSV" "$MANIFEST" census/tool_versions.txt census/*.sh census/*.js census/*.md census/repolist.csv .gitignore >/dev/null 2>&1
  git -C "$ROOT" commit -q -m "census: $(( $(wc -l < "$MANIFEST") - 1 )) repos processed" >/dev/null 2>&1
  for r in 1 2 3 4; do git -C "$ROOT" push -u origin "$BRANCH" >/dev/null 2>&1 && return 0; sleep $((2**r)); done
}
diskclean(){
  # 各バッチ境界で無条件パージ（モジュール本体＋DLされたtoolchain）。
  # go list -deps はモジュールソースDLが不可避で単調増加するため、境界で必ずリセットして枠を一定に保つ。
  rm -rf "$GOMODCACHE" "$GOCACHE" /root/go/pkg/mod /root/.cache/go-build /tmp/rm_work/* "$BASE"/data/* 2>/dev/null
  mkdir -p "$GOMODCACHE" "$GOCACHE"
  local freekb; freekb=$(df --output=avail "$ROOT" | tail -1)
  log "diskclean done free=$(df -h "$ROOT"|tail -1|awk '{print $4}')"
}

# DONE = committed manifest に既にある repo（進捗の真実）
declare -A DONE
while IFS=, read -r r _; do [ -n "$r" ] && DONE["$r"]=1; done < <(tail -n +2 "$MANIFEST" | cut -d, -f1)
todo=$(mktemp)
while IFS=, read -r name url; do [ -z "$name" ] && continue
  [ "${DONE[$name]:-}" = "1" ] && continue
  echo "$name $url" >> "$todo"; done < "$LIST"
# 決定論的シャッフル（重い repo を分散）
shuf --random-source=<(yes 42) "$todo" -o "$todo"
log "START todo=$(wc -l < "$todo") done=${#DONE[@]} P=$P BATCH=$BATCH"

rm -f "$BASE"/.batch.* 2>/dev/null
split -l "$BATCH" "$todo" "$BASE/.batch."
for b in "$BASE"/.batch.*; do [ -e "$b" ] || continue
  diskclean
  xargs -P "$P" -L1 bash "$BASE/worker.sh" < "$b"
  merge; push
  log "BATCH done manifest=$(( $(wc -l < "$MANIFEST") - 1 )) ok=$(grep -c ',OK,' "$MANIFEST") free=$(df -h "$ROOT"|tail -1|awk '{print $4}')"
  rm -f "$b"
done
merge; push
log "ALL DONE manifest=$(( $(wc -l < "$MANIFEST") - 1 ))"
