#!/bin/bash
# par.sh [P] — 4並列(既定)で残りrepoを収集。ワーカーはparts/へ、本スクリプトがCSVへマージ&push。
set -u
ROOT=/home/user/SBOM; OUT="$ROOT/results_fresh"
CSV="$OUT/metrics_sibling.csv"; PARTS="$OUT/parts"; LIST="$ROOT/results3gt/repolist.csv"
P="${1:-3}"
export GOMODCACHE=/tmp/sib_modcache GOCACHE=/tmp/sib_gocache
mkdir -p "$PARTS" /tmp/sib_work "$GOMODCACHE" "$GOCACHE"

# ディスク番人: 空き<5Gで両キャッシュを掃除（40秒毎）。並列時のビルドキャッシュ爆発を防ぐ。
( while true; do sleep 40
    freekb=$(df --output=avail / | tail -1)
    if [ "$freekb" -lt 5242880 ]; then
      rm -rf "$GOCACHE" "$GOMODCACHE" /root/.cache/go-build /root/go/pkg/mod 2>/dev/null
      mkdir -p "$GOCACHE" "$GOMODCACHE"
    fi
  done ) &
JANITOR=$!
trap 'kill $JANITOR 2>/dev/null' EXIT

merge_csv() {
  for f in "$PARTS"/*.csv; do [ -e "$f" ] || continue
    n=$(basename "$f" .csv)
    grep -q "^$n," "$CSV" 2>/dev/null || cat "$f" >> "$CSV"
  done
}
push() {
  git -C "$ROOT" add "$CSV" >/dev/null 2>&1
  git -C "$ROOT" -c user.name='Opposititte' -c user.email='201308377+Opposititte@users.noreply.github.com' \
    commit -q -m "parallel sibling collection: $(grep -cE ',syft,' "$CSV") repos" >/dev/null 2>&1
  for r in 1 2 3 4; do git -C "$ROOT" push origin claude/adoring-gates-2mlb1d >/dev/null 2>&1 && break || sleep $((2**r)); done
}

# todo = CSV未登録 かつ parts未生成
declare -A DONE
while IFS=, read -r r _; do [ -n "$r" ] && DONE["$r"]=1; done < <(tail -n +2 "$CSV" | cut -d, -f1)
todo=$(mktemp)
while IFS=, read -r name url rest; do name="${name%%,*}"; [ -z "$name" ] && continue
  [ "${DONE[$name]:-}" = "1" ] && continue
  [ -f "$PARTS/$name.csv" ] && continue
  echo "$name $url" >> "$todo"
done < "$LIST"
echo "todo: $(wc -l < "$todo") repos, P=$P"

# 定期マージ&push＆ディスク掃除
( while true; do sleep 150
    merge_csv; push
    freekb=$(df --output=avail / | tail -1); [ "$freekb" -lt 4194304 ] && { go clean -modcache >/dev/null 2>&1; rm -rf "$GOMODCACHE" /root/go/pkg/mod; mkdir -p "$GOMODCACHE"; }
    echo "[$(date -u +%H:%M:%S)] merged=$(grep -cE ',syft,' "$CSV") free=$(df -h /|tail -1|awk '{print $4}')"
  done ) &
MERGER=$!

xargs -P "$P" -L 1 bash "$OUT/pw.sh" < "$todo"

kill $MERGER 2>/dev/null
merge_csv; push
echo "DONE total=$(grep -cE ',syft,' "$CSV") repos"
