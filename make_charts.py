#!/usr/bin/env python3
# make_charts.py — thesis charts from the 300-repo results.
# Outputs PNGs into results300/charts/.
import json, os
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt

R = os.environ.get("RESULTS", "results300")
OUT = os.path.join(R, "charts"); os.makedirs(OUT, exist_ok=True)
TOOLS = ["syft", "trivy", "cdxgen", "cyclonedx-gomod"]
COL = {"syft": "#1f77b4", "trivy": "#ff7f0e", "cdxgen": "#2ca02c", "cyclonedx-gomod": "#d62728"}

# ---- Chart 1: F1 heatmap (tools x ground truths), macro-avg % (verified values) ----
GTS = ["all", "imported", "direct"]
F1 = {  # macro-F1 % from compute_multi_gt.js on results300 (root module excluded)
    "syft":            [76.2, 68.5, 48.7],
    "trivy":           [75.5, 69.9, 49.1],
    "cdxgen":          [55.6, 91.0, 57.4],
    "cyclonedx-gomod": [53.1, 94.0, 54.6],
}
fig, ax = plt.subplots(figsize=(6.2, 4.2))
mat = [F1[t] for t in TOOLS]
im = ax.imshow(mat, cmap="YlGnBu", vmin=40, vmax=100, aspect="auto")
ax.set_xticks(range(len(GTS))); ax.set_xticklabels([f"vs {g}" for g in GTS])
ax.set_yticks(range(len(TOOLS))); ax.set_yticklabels(TOOLS)
for i, t in enumerate(TOOLS):
    for j in range(len(GTS)):
        ax.text(j, i, f"{mat[i][j]:.1f}", ha="center", va="center",
                color="black" if mat[i][j] < 80 else "white", fontsize=11, fontweight="bold")
ax.set_title("F1 (%) by tool × ground-truth definition\n(best tool flips: all→syft, imported→cyclonedx-gomod)")
fig.colorbar(im, label="F1 (%)"); fig.tight_layout()
fig.savefig(os.path.join(OUT, "f1_heatmap.png"), dpi=140); plt.close(fig)

# ---- Chart 2: recall (vs all) vs repo size ----
m = json.load(open(os.path.join(R, "metrics.json")))["per_repo"]
fig, ax = plt.subplots(figsize=(7.2, 4.6))
for t in TOOLS:
    xs, ys = [], []
    for repo, d in m.items():
        if t in d["tools"]:
            xs.append(d["gt_count"]); ys.append(d["tools"][t]["name"]["r"] * 100)
    ax.scatter(xs, ys, s=14, alpha=0.45, color=COL[t], label=t, edgecolors="none")
ax.set_xscale("log")
ax.set_xlabel("repository size = number of `go list -m all` dependencies (log scale)")
ax.set_ylabel("Recall vs `all` (%)")
ax.set_title("Recall vs repository size — recall declines as the build list grows")
ax.legend(markerscale=2, fontsize=8); ax.grid(True, alpha=0.3); fig.tight_layout()
fig.savefig(os.path.join(OUT, "recall_vs_size.png"), dpi=140); plt.close(fig)

# ---- Chart 3: root-cause of missed `all` deps (stacked: not-compiled vs genuine) ----
rc = json.load(open(os.path.join(R, "root_cause.json")))["agg"]
fig, ax = plt.subplots(figsize=(7.2, 4.4))
nc = [rc[t]["notCompiled"] for t in TOOLS]
gn = [rc[t]["genuine"] for t in TOOLS]
x = range(len(TOOLS))
ax.bar(x, nc, color="#9ecae1", label="not-compiled (test-only / unused-transitive)")
ax.bar(x, gn, bottom=nc, color="#d62728", label="genuine miss (actually-imported but not reported)")
for i, t in enumerate(TOOLS):
    tot = nc[i] + gn[i]
    ax.text(i, tot + 200, f"genuine: {gn[i]}\n({100*gn[i]/tot:.1f}%)", ha="center", fontsize=8)
ax.set_xticks(list(x)); ax.set_xticklabels(TOOLS, rotation=10)
ax.set_ylabel("missed `all` dependencies (count, summed over 189 repos)")
ax.set_title("Why tools miss `all` deps: almost all misses are non-compiled (test/unused),\nnot genuine failures")
ax.legend(fontsize=8); fig.tight_layout()
fig.savefig(os.path.join(OUT, "rootcause_stacked.png"), dpi=140); plt.close(fig)

print("wrote:", os.listdir(OUT))
