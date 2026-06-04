# Large-scale SBOM accuracy pipeline (all of awesome-go)

Built to scan every Go repo listed in awesome-go and measure how accurately
syft / trivy / cdxgen reproduce each repo's `go list -m all` dependency set.
**Nothing runs automatically — you invoke each step.**

## Files
- `gen_repo_list.js` — fetch the awesome-go README, extract unique repo URLs → `repos.txt`.
- `run_batch.sh` — resumable harness: clone → go list / syft / trivy / cdxgen → cleanup,
  per repo, with batched commits/pushes. Resumes via `results/<name>/.done` markers.
- `compute_metrics.js` — auto-discovers all `results/<name>/` and computes
  precision/recall/F1 → `results/metrics.json` + `results/metrics.csv`.
- `run_benchmark.sh` — the original fixed 6-repo script (kept for reference).

## How to run (when you're ready)

```bash
# 1. Build the repo list from awesome-go
node gen_repo_list.js repos.txt        # prints how many repos were found

# 2. Smoke-test on a few repos, no pushing, short timeouts
PUSH=0 LIMIT=5 ./run_batch.sh

# 3. Full run (commits + pushes results/ every 25 repos)
./run_batch.sh                         # re-run anytime to resume where it stopped

# 4. Compute metrics over everything scanned so far
node compute_metrics.js
```

## Why it scales safely
- **Resumable:** finished repos carry a `.done` marker and are skipped, so container
  reclamation / stopping mid-run just means "re-run to continue". Clone failures are
  *not* marked done, so they're retried on the next run (handles transient network).
- **Bounded disk:** each clone is `--depth=1` and deleted right after scanning; the Go
  module cache + auto-downloaded toolchains are isolated under `.gocache/` and cleared
  every `MODCACHE_CLEAN_EVERY` repos. Peak disk ≈ one repo at a time.
- **Durable progress:** results pushed to GitHub in batches (`BATCH_SIZE`), so work
  already done survives even if the session ends.
- **Robust:** every tool call has a `timeout`; failures are logged to
  `results/<name>/errors.txt` and recorded in `results/_manifest.csv`; the batch never
  stops for one bad repo.

## Knobs (env vars for `run_batch.sh`)
`LIMIT`, `START`, `BATCH_SIZE`, `PUSH`, `TOOL_TIMEOUT`, `CLONE_TIMEOUT`,
`MODCACHE_CLEAN_EVERY`, `REPO_LIST`, `BRANCH`. See the header of `run_batch.sh`.

## Scale expectations (rough)
awesome-go lists on the order of ~2,000–2,500 repos. At ~0.7 MB of results per repo
that's ~1.5–2 GB of result JSON (fine for disk and GitHub). Wall-clock is the real
cost: budget tens of seconds per repo ⇒ many hours total, so run it in sessions and
let the resume logic carry it across them.
