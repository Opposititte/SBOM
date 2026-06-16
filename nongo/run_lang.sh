#!/usr/bin/env bash
# run_lang.sh — run cdxgen on NON-Go projects (Python / PHP / JavaScript) and
# compare against the language's native full-transitive dependency resolution.
#
# Mirrors the Go study (../run_batch.sh): ground truth = the native package
# manager's complete resolved set; prediction = cdxgen's components. Measures how
# accurately cdxgen reproduces the real dependency set for a NON-Go ecosystem.
#
# Per-language work + results live in COMPLETELY SEPARATE folders:
#   nongo/js/{work,results}   nongo/php/{work,results}   nongo/python/{work,results}
# so a Python venv / node_modules / vendor tree from one ecosystem can never
# contaminate another (a real cdxgen failure mode). All on Linux.
#
# IMPORTANT ordering: cdxgen runs FIRST, on the PRISTINE clone (exactly what the
# project commits to GitHub = the honest "out of the box" result). Only AFTER that
# do we resolve/install to build the ground truth, so the GT step (which may write
# a lockfile or install packages) never leaks extra inputs into cdxgen's view.
#
# Usage:  nongo/run_lang.sh <js|php|python>
#
# Ground truth per ecosystem (full transitive set):
#   js     -> package-lock.json   (committed, else `npm install --package-lock-only`)
#   php    -> composer.lock        (committed/`composer update --no-install`), else
#             vendor/composer/installed.json (real install; for config.lock=false libs)
#   python -> pip resolver report  (`pip install --dry-run --report`, no install)

set -uo pipefail

ECO="${1:?usage: run_lang.sh <js|php|python>}"
BASE="${BASE:-/home/user/SBOM/nongo}"
LANGDIR="$BASE/$ECO"
RESULTS="$LANGDIR/results"
WORK="$LANGDIR/work"
PROJECTS="$LANGDIR/projects.txt"
TOOL_TIMEOUT="${TOOL_TIMEOUT:-600}"
CLONE_TIMEOUT="${CLONE_TIMEOUT:-300}"

export GIT_TERMINAL_PROMPT=0
export FETCH_LICENSE=false
export COMPOSER_ALLOW_SUPERUSER=1     # let cdxgen/composer run in this root container

case "$ECO" in
  js)     CDX_TYPE=javascript ;;
  php)    CDX_TYPE=php ;;
  python) CDX_TYPE=python ;;
  *) echo "unknown eco: $ECO" >&2; exit 2 ;;
esac

mkdir -p "$RESULTS" "$WORK"
log() { echo "[$(date '+%F %T')] [$ECO] $*"; }

record_committed_locks() {  # $1=folder $2=outdir
  ( cd "$1" && ls -1 package-lock.json yarn.lock pnpm-lock.yaml composer.lock \
       poetry.lock Pipfile.lock requirements.txt 2>/dev/null ) > "$2/committed_manifests.txt" || true
}

while IFS= read -r url || [ -n "$url" ]; do
  url="${url%%#*}"; url="$(printf '%s' "$url" | tr -d '[:space:]')"
  [ -z "$url" ] && continue

  p="${url#https://}"; p="${p#github.com/}"; p="${p%/}"; p="${p%.git}"
  owner="${p%%/*}"; repo="${p#*/}"; repo="${repo%%/*}"
  name="$(printf '%s' "${owner}__${repo}" | tr -c 'A-Za-z0-9._-' '_')"
  outdir="$RESULTS/$name"
  if [ -f "$outdir/.done" ]; then log "skip $name (done)"; continue; fi

  mkdir -p "$outdir"; : > "$outdir/errors.txt"; err="$outdir/errors.txt"
  echo "$url" > "$outdir/repo_url.txt"
  folder="$WORK/$name"; rm -rf "$folder"

  log "clone $owner/$repo"
  if ! timeout "$CLONE_TIMEOUT" git clone --depth=1 "https://github.com/$owner/$repo.git" "$folder" 2>>"$err"; then
    echo "ERROR: clone failed" >>"$err"; log "clone FAILED $name"; continue
  fi
  record_committed_locks "$folder" "$outdir"

  # ---------- 1) prediction: cdxgen out-of-the-box on the PRISTINE clone ----------
  cx_status=ok
  if ! timeout "$TOOL_TIMEOUT" cdxgen -t "$CDX_TYPE" "$folder" -o "$outdir/cdxgen_output.json" >>"$err" 2>&1; then
    cx_status=fail; echo "ERROR: cdxgen failed" >>"$err"
  fi
  [ -f "$outdir/cdxgen_output.json" ] || { cx_status=fail; echo "ERROR: cdxgen wrote no output" >>"$err"; }
  rm -rf /tmp/cdxgen-* /tmp/pip-* 2>/dev/null

  # ---------- 2) ground truth: native full transitive resolution ----------
  gt_status=ok
  case "$ECO" in
    js)
      if [ ! -f "$folder/package-lock.json" ]; then
        ( cd "$folder" && timeout "$TOOL_TIMEOUT" npm install --package-lock-only \
            --ignore-scripts --no-audit --no-fund 2>>"$err" ) || true
      fi
      if [ -f "$folder/package-lock.json" ]; then
        cp "$folder/package-lock.json" "$outdir/gt_npm_lock.json"
      else
        gt_status=fail; echo "ERROR: no package-lock.json" >>"$err"
      fi
      ;;
    php)
      # Resolve the ROOT manifest (require + require-dev), then ALSO each
      # vendor-bin/*/composer.json (bamarni composer-bin-plugin tooling: phpstan,
      # php-cs-fixer, ...) which cdxgen scans too. Union everything into
      # gt_composer_all.json = [{name,version}] so the GT covers cdxgen's breadth.
      collect_php_lock() {   # $1=dir -> emit composer.lock packages (+dev) as JSON lines name\tversion
        local dir="$1"
        if [ ! -f "$dir/composer.lock" ]; then
          ( cd "$dir" && timeout "$TOOL_TIMEOUT" composer update \
              --no-install --no-audit --no-scripts --no-interaction --ignore-platform-reqs 2>>"$err" ) || true
        fi
        if [ -f "$dir/composer.lock" ]; then
          jq -r '((.packages//[])+(.["packages-dev"]//[]))[] | [.name, .version] | @tsv' "$dir/composer.lock"
        elif [ -f "$dir/vendor/composer/installed.json" ]; then
          jq -r '(.packages // .)[] | [.name, .version] | @tsv' "$dir/vendor/composer/installed.json"
        fi
      }
      tmp_tsv="$outdir/.php_gt.tsv"; : > "$tmp_tsv"
      collect_php_lock "$folder" >> "$tmp_tsv"
      # config.lock=false libs (monolog) write no lock -> real install for installed.json
      if [ ! -s "$tmp_tsv" ]; then
        echo "INFO: no root lock; installing for installed.json" >>"$err"
        ( cd "$folder" && timeout "$TOOL_TIMEOUT" composer update \
            --no-audit --no-scripts --no-interaction --ignore-platform-reqs --no-progress 2>>"$err" ) || true
        collect_php_lock "$folder" >> "$tmp_tsv"
      fi
      for vb in "$folder"/vendor-bin/*/; do
        [ -f "$vb/composer.json" ] || continue
        collect_php_lock "$vb" >> "$tmp_tsv"
      done
      if [ -s "$tmp_tsv" ]; then
        jq -R -s 'split("\n")|map(select(length>0)|split("\t")|{name:.[0],version:.[1]})|unique_by(.name)' \
          "$tmp_tsv" > "$outdir/gt_composer_all.json"
        rm -f "$tmp_tsv"
      else
        rm -f "$tmp_tsv"; gt_status=fail; echo "ERROR: no composer GT collected" >>"$err"
      fi
      ;;
    python)
      # Full DECLARED breadth (runtime + extras + dependency-groups + requirements*.txt),
      # matching what cdxgen scans, then let pip resolve the full transitive PINNED set.
      reqlist="$outdir/all_requirements.txt"
      python3 "$LANGDIR/collect_reqs.py" "$folder" > "$reqlist" 2>>"$err"
      rpt="$outdir/gt_pip_report.json"; ok=fail
      if [ -s "$reqlist" ]; then
        timeout "$TOOL_TIMEOUT" pip install --dry-run --ignore-installed --quiet \
          --report "$rpt" -r "$reqlist" 2>>"$err" && ok=ok
      fi
      # fallback: resolve the project's runtime deps only
      if [ "$ok" != ok ] && { [ -f "$folder/pyproject.toml" ] || [ -f "$folder/setup.py" ]; }; then
        timeout "$TOOL_TIMEOUT" pip install --dry-run --ignore-installed --quiet \
          --report "$rpt" "$folder" 2>>"$err" && ok=ok
      fi
      [ "$ok" = ok ] || { gt_status=fail; echo "ERROR: pip dry-run resolve failed" >>"$err"; }
      ;;
  esac

  echo "gt=$gt_status cdxgen=$cx_status" > "$outdir/status.txt"
  rm -rf "$folder"
  date '+%F %T' > "$outdir/.done"
  log "done $name (gt=$gt_status cdxgen=$cx_status)"
done < "$PROJECTS"

rm -rf "$WORK"
log "ALL DONE for $ECO"
