#!/usr/bin/env bash
# SBOM accuracy benchmark over 6 Go repositories.
# Tools: go list -m all (ground truth), syft, trivy, cdxgen.
set -u

BASE="/home/user/SBOM"
RESULTS="$BASE/results"
WORK="$BASE/work"
mkdir -p "$RESULTS" "$WORK"

# repo  ->  short name
REPOS=(
  "gin-gonic/gin:gin"
  "spf13/cobra:cobra"
  "gohugoio/hugo:hugo"
  "fatedier/frp:frp"
  "go-gorm/gorm:gorm"
  "ollama/ollama:ollama"
)

log() { echo "[$(date '+%H:%M:%S')] $*"; }

for entry in "${REPOS[@]}"; do
  repo="${entry%%:*}"
  name="${entry##*:}"
  outdir="$RESULTS/$name"
  errlog="$outdir/errors.txt"
  folder="$WORK/$name"
  mkdir -p "$outdir"
  : > "$errlog"

  log "========== $repo ($name) =========="

  # 1. Clone
  rm -rf "$folder"
  log "[$name] cloning..."
  if ! git clone --depth=1 "https://github.com/$repo.git" "$folder" 2>>"$errlog"; then
    echo "ERROR: git clone failed for $repo" >> "$errlog"
    log "[$name] CLONE FAILED — skipping"
    continue
  fi

  # 2. go list -m all  -> ground truth
  log "[$name] go list -m all..."
  if ! ( cd "$folder" && GOFLAGS=-mod=mod go list -m all ) > "$outdir/gt_go_list.txt" 2>>"$errlog"; then
    echo "ERROR: 'go list -m all' failed for $name" >> "$errlog"
    log "[$name] go list failed (continuing)"
  fi

  # 3. syft -> cyclonedx-json
  log "[$name] syft..."
  if ! syft "$folder" -o cyclonedx-json="$outdir/syft_output.json" 2>>"$errlog"; then
    echo "ERROR: syft failed for $name" >> "$errlog"
    log "[$name] syft failed (continuing)"
  fi

  # 4. trivy fs -> cyclonedx
  log "[$name] trivy..."
  if ! trivy fs "$folder" --format cyclonedx --output "$outdir/trivy_output.json" 2>>"$errlog"; then
    echo "ERROR: trivy failed for $name" >> "$errlog"
    log "[$name] trivy failed (continuing)"
  fi

  # 5. cdxgen
  log "[$name] cdxgen..."
  if ! cdxgen "$folder" -o "$outdir/cdxgen_output.json" 2>>"$errlog" 1>>"$errlog"; then
    echo "ERROR: cdxgen failed for $name" >> "$errlog"
    log "[$name] cdxgen failed (continuing)"
  fi

  # 6. delete clone
  log "[$name] cleaning up clone..."
  rm -rf "$folder"

  log "[$name] DONE"
done

rm -rf "$WORK"
log "ALL DONE"
