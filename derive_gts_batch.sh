#!/usr/bin/env bash
# derive_gts_batch.sh — add 'imported' and 'direct' ground truths to each Go repo in
# results300/, by re-cloning and running `go list -deps` / `go mod edit -json`.
# Lightweight (Go toolchain only, no SBOM tools), resumable, pushes incrementally.
set -uo pipefail
BASE=/home/user/SBOM
RESULTS="${RESULTS:-$BASE/results300}"
WORK="$BASE/work_gt"
BRANCH=claude/pensive-allen-UOXXp
BATCH="${BATCH:-40}"; CLEAN_EVERY="${CLEAN_EVERY:-15}"
AUTHOR_EMAIL="201308377+Opposititte@users.noreply.github.com"; AUTHOR_NAME=Opposititte
export GOFLAGS=-mod=mod GOMODCACHE="$BASE/.gocache/mod" GOCACHE="$BASE/.gocache/build" GIT_TERMINAL_PROMPT=0
mkdir -p "$WORK" "$GOMODCACHE" "$GOCACHE"
log(){ echo "[$(date '+%T')] $*"; }
push(){ git -C "$BASE" add "$RESULTS" 2>/dev/null
  git -C "$BASE" diff --cached --quiet && return 0
  git -C "$BASE" -c user.email="$AUTHOR_EMAIL" -c user.name="$AUTHOR_NAME" commit -q -m "results300: add imported/direct ground truths ($1 processed)" || return 0
  local a; for a in 1 2 3 4; do git -C "$BASE" push -u origin "$BRANCH" 2>/dev/null && return 0; sleep $((2**a)); done
  log "WARN push failed (committed locally)"; }

n=0; inb=0
for d in "$RESULTS"/*/; do
  name=$(basename "$d")
  [ -s "${d}gt_go_list.txt" ] || continue        # only Go modules
  [ -f "${d}gt_imported.txt" ] && continue        # resume: already derived
  [ -f "${d}repo_url.txt" ] || continue
  url=$(cat "${d}repo_url.txt")
  f="$WORK/$name"; rm -rf "$f"
  n=$((n+1)); log "[$n] $name"
  if ! timeout 180 git clone --depth=1 "$url" "$f" 2>/dev/null; then log "clone fail: $name"; rm -rf "$f"; continue; fi
  ( cd "$f"
    main=$(go list -m 2>/dev/null | head -1)
    GOOS=linux go list -deps -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./... 2>/dev/null \
      | grep -v '^$' | grep -v "^${main} \?$" | sort -u > "${d}gt_imported.txt"
    go mod edit -json 2>/dev/null \
      | node -e 'const d=JSON.parse(require("fs").readFileSync(0));(d.Require||[]).filter(r=>!r.Indirect).forEach(r=>console.log(r.Path+" "+r.Version))' 2>/dev/null \
      > "${d}gt_direct.txt"
  )
  rm -rf "$f"
  inb=$((inb+1))
  [ $((inb % BATCH)) -eq 0 ] && { log "push (n=$n)..."; push "$n"; }
  [ $((n % CLEAN_EVERY)) -eq 0 ] && { go clean -modcache 2>/dev/null || rm -rf "$GOMODCACHE"; rm -rf "$GOCACHE"; mkdir -p "$GOMODCACHE" "$GOCACHE"; }
done
rm -rf "$WORK"
push "$n"
log "DONE: derived imported/direct GTs for $n repos"
