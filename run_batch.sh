#!/usr/bin/env bash
# run_batch.sh — resumable SBOM benchmark over a large repo list (e.g. all of awesome-go).
#
# For each repo URL in REPO_LIST it:
#   1. shallow-clones it          (with timeout + retry/backoff)
#   2. go list -m all             -> results/<name>/gt_go_list.txt   (ground truth)
#   3. syft   -o cyclonedx-json   -> results/<name>/syft_output.json
#   4. trivy fs --format cyclonedx-> results/<name>/trivy_output.json
#   5. cdxgen -o                  -> results/<name>/cdxgen_output.json
#   6. deletes the clone, writes results/<name>/.done, appends a manifest row
# Every BATCH_SIZE finished repos it git-commits + pushes results/ so progress is durable.
#
# RESUMABLE: a repo whose results/<name>/.done exists is skipped, so you can stop/restart
# (or let the cloud container get reclaimed) and re-run this to continue where it left off.
#
# Per-repo stderr/diagnostics go to results/<name>/errors.txt. Tool failures are logged
# and the run CONTINUES (one bad repo never stops the batch).
#
# NOTHING here runs until you invoke it. Suggested first try (safe, no push, 5 repos):
#   PUSH=0 LIMIT=5 ./run_batch.sh
# Full run with batched pushes:
#   ./run_batch.sh
#
# Key knobs (override via env):
#   REPO_LIST   file with one repo URL per line                 (default: $BASE/repos.txt)
#   LIMIT       process at most N new repos, 0 = all            (default: 0)
#   START       skip to this 1-based line in REPO_LIST          (default: 1)
#   BATCH_SIZE  commit+push every N finished repos              (default: 25)
#   PUSH        1 = git commit+push in batches, 0 = local only  (default: 1)
#   TOOL_TIMEOUT / CLONE_TIMEOUT   per-step timeouts in seconds (default: 600 / 300)
#   MODCACHE_CLEAN_EVERY   `go clean -modcache` every N repos   (default: 50)

set -uo pipefail

# ---------------- config ----------------
BASE="${BASE:-/home/user/SBOM}"
REPO_LIST="${REPO_LIST:-$BASE/repos.txt}"
RESULTS="${RESULTS:-$BASE/results}"
WORK="${WORK:-$BASE/work}"
MANIFEST="$RESULTS/_manifest.csv"

TOOL_TIMEOUT="${TOOL_TIMEOUT:-600}"
CLONE_TIMEOUT="${CLONE_TIMEOUT:-300}"
BATCH_SIZE="${BATCH_SIZE:-25}"
PUSH="${PUSH:-1}"
BRANCH="${BRANCH:-claude/pensive-allen-UOXXp}"
MODCACHE_CLEAN_EVERY="${MODCACHE_CLEAN_EVERY:-50}"
START="${START:-1}"
LIMIT="${LIMIT:-0}"
AUTHOR_NAME="${AUTHOR_NAME:-Opposititte}"
AUTHOR_EMAIL="${AUTHOR_EMAIL:-201308377+Opposititte@users.noreply.github.com}"

# Isolate Go caches under $BASE so cleanup is trivial and disk stays bounded.
# Auto-downloaded toolchains land inside GOMODCACHE, so cleaning it reclaims them too.
export GOMODCACHE="${GOMODCACHE:-$BASE/.gocache/mod}"
export GOCACHE="${GOCACHE:-$BASE/.gocache/build}"
export GOFLAGS="-mod=mod"
export GIT_TERMINAL_PROMPT=0   # never block on a credential prompt for a bad URL

mkdir -p "$RESULTS" "$WORK" "$GOMODCACHE" "$GOCACHE"
[ -f "$MANIFEST" ] || echo "name,url,clone,go_list,syft,trivy,cdxgen,gt_lines" > "$MANIFEST"

log() { echo "[$(date '+%F %T')] $*"; }

# git commit + push results/, with network retry/backoff. No-op if nothing changed.
push_results() {
  [ "$PUSH" = "1" ] || return 0
  git -C "$BASE" add results 2>/dev/null
  if git -C "$BASE" diff --cached --quiet; then return 0; fi
  git -C "$BASE" -c user.email="$AUTHOR_EMAIL" -c user.name="$AUTHOR_NAME" \
      commit -q -m "batch: SBOM results ($processed processed)" || return 0
  local a
  for a in 1 2 3 4; do
    if git -C "$BASE" push -u origin "$BRANCH" 2>/dev/null; then return 0; fi
    sleep $((2 ** a))
  done
  log "WARN: push failed after retries (results are committed locally)"
}

# ---------------- main loop ----------------
idx=0           # line number in REPO_LIST
processed=0     # repos actually attempted this run
in_batch=0      # repos finished since last push

while IFS= read -r url || [ -n "$url" ]; do
  url="${url%%#*}"; url="$(printf '%s' "$url" | tr -d '[:space:]')"   # strip comments/space
  [ -z "$url" ] && continue
  idx=$((idx + 1))
  [ "$idx" -lt "$START" ] && continue

  # derive owner/repo and a collision-proof folder name
  p="${url#http://}"; p="${p#https://}"; p="${p#github.com/}"; p="${p%/}"; p="${p%.git}"
  owner="${p%%/*}"; rest="${p#*/}"; repo="${rest%%/*}"
  [ -z "$owner" ] || [ -z "$repo" ] && continue
  name="$(printf '%s' "${owner}__${repo}" | tr -c 'A-Za-z0-9._-' '_')"
  clone_url="https://github.com/${owner}/${repo}.git"

  outdir="$RESULTS/$name"
  if [ -f "$outdir/.done" ]; then continue; fi   # resume: already finished

  processed=$((processed + 1))
  log "[$idx] $owner/$repo  (#$processed this run)"
  mkdir -p "$outdir"
  : > "$outdir/errors.txt"
  errlog="$outdir/errors.txt"
  echo "$clone_url" > "$outdir/repo_url.txt"

  # 1. clone (retry/backoff). On permanent failure we do NOT write .done, so a
  #    later re-run retries it (handles transient network / temporary outages).
  folder="$WORK/$name"; rm -rf "$folder"
  clone_status=fail
  for a in 1 2 3 4; do
    if timeout "$CLONE_TIMEOUT" git clone --depth=1 "$clone_url" "$folder" 2>>"$errlog"; then
      clone_status=ok; break
    fi
    rm -rf "$folder"; sleep $((2 ** a))
  done
  if [ "$clone_status" != ok ]; then
    echo "ERROR: clone failed for $clone_url" >> "$errlog"
    printf '%s,%s,%s,,,,,0\n' "$name" "$url" "$clone_status" >> "$MANIFEST"
    log "[$idx] clone FAILED (will retry on next run)"
    continue
  fi

  # 2. go list -m all  (ground truth)
  gl_status=ok
  if ! ( cd "$folder" && timeout "$TOOL_TIMEOUT" go list -m all ) > "$outdir/gt_go_list.txt" 2>>"$errlog"; then
    gl_status=fail; echo "ERROR: 'go list -m all' failed" >> "$errlog"
  fi

  # 3. syft
  sy_status=ok
  if ! timeout "$TOOL_TIMEOUT" syft "$folder" -o cyclonedx-json="$outdir/syft_output.json" 2>>"$errlog"; then
    sy_status=fail; echo "ERROR: syft failed" >> "$errlog"
  fi

  # 4. trivy
  tr_status=ok
  if ! timeout "$TOOL_TIMEOUT" trivy fs "$folder" --format cyclonedx --output "$outdir/trivy_output.json" 2>>"$errlog"; then
    tr_status=fail; echo "ERROR: trivy failed" >> "$errlog"
  fi

  # 5. cdxgen
  cx_status=ok
  if ! timeout "$TOOL_TIMEOUT" cdxgen "$folder" -o "$outdir/cdxgen_output.json" >>"$errlog" 2>&1; then
    cx_status=fail; echo "ERROR: cdxgen failed" >> "$errlog"
  fi

  # 6. cleanup + bookkeeping
  rm -rf "$folder"
  gt_lines=0
  [ -s "$outdir/gt_go_list.txt" ] && gt_lines="$(wc -l < "$outdir/gt_go_list.txt" | tr -d ' ')"
  printf '%s,%s,%s,%s,%s,%s,%s,%s\n' \
    "$name" "$url" "$clone_status" "$gl_status" "$sy_status" "$tr_status" "$cx_status" "$gt_lines" >> "$MANIFEST"
  date '+%F %T' > "$outdir/.done"
  in_batch=$((in_batch + 1))

  # batched push
  if [ "$in_batch" -ge "$BATCH_SIZE" ]; then
    log "pushing batch (processed=$processed)..."
    push_results
    in_batch=0
  fi

  # bound disk: clear Go module cache (and downloaded toolchains) periodically
  if [ $((processed % MODCACHE_CLEAN_EVERY)) -eq 0 ]; then
    log "cleaning Go caches..."
    go clean -modcache 2>/dev/null || rm -rf "$GOMODCACHE"
    rm -rf "$GOCACHE"; mkdir -p "$GOMODCACHE" "$GOCACHE"
  fi

  [ "$LIMIT" -gt 0 ] && [ "$processed" -ge "$LIMIT" ] && { log "LIMIT $LIMIT reached"; break; }
done < "$REPO_LIST"

rm -rf "$WORK"
log "final push..."
push_results
log "DONE — processed $processed repo(s) this run."
