# SBOM Accuracy Benchmark — Go Projects

Generated: 2026-06-04

## Method
For each repository: shallow clone (`--depth=1`), then run the ground-truth
module list and three SBOM tools, saving outputs per repo. Clones deleted afterward.

- Ground truth: `go list -m all` → `gt_go_list.txt`
- syft 1.45.0: `syft <folder> -o cyclonedx-json` → `syft_output.json`
- trivy 0.71.0: `trivy fs <folder> --format cyclonedx` → `trivy_output.json`
- cdxgen 12.5.0: `cdxgen <folder> -o cdxgen_output.json`

Environment: go 1.24.7 (toolchain auto-upgraded to 1.25.0 per repos' go.mod), node 22.22.2.
Per-repo stderr/diagnostics captured in `errors.txt` (mostly informational noise:
syft "no explicit name" warning, trivy "format disables security scanning" notice,
cdxgen "SECURE MODE" root-user audit and self-version 403 check — none are failures).

## Component counts (CycloneDX `components[]`)

| repo   | go list (modules) | syft | trivy | cdxgen |
|--------|------------------:|-----:|------:|-------:|
| gin    | 57                |  60  |  37   |  28    |
| cobra  | 7                 |  16  |   8   |  10    |
| hugo   | 437               | 232  | 191   | 120 *  |
| frp    | 146               | 171  | 137   | 597    |
| gorm   | 9                 |  59  |  37   |  11    |
| ollama | 178               | 495  | 437   | 966    |

(`go list -m all` counts the full transitive module build list, one per line
including the main module; the tools count CycloneDX components, which may
include non-Go artifacts — e.g. vendored C/C++ for ollama, npm deps for hugo —
so counts are not directly comparable without normalization.)

## Notable
* **hugo / cdxgen**: the plain `cdxgen <folder>` command CRASHED
  (`TypeError: Cannot convert undefined or null to object` in `createGoBom`)
  because `go list -deps` failed on hugo's nested module `internal/warpc/genwebp`.
  The committed `hugo/cdxgen_output.json` was produced with a workaround
  (`--exclude` of the nested `genwebp`/`genavif`/`docs` modules). See
  `hugo/errors.txt` for details. This is a genuine cdxgen limitation on
  multi-module Go repos and is itself a relevant data point for the study.
* All other tool runs completed without errors.

`../run_benchmark.sh` reproduces the full run.
