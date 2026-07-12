#!/bin/bash
# 耐障害フル再収集バッチ: 同一クローンから 3GT(版付き)+4ツール+FP分類用成果物 を生成し、
# per-repo メトリクスを CSV に追記、25件ごとに commit/push。CSVに載ったrepoは再開時スキップ。
# 生データは disk 節約のため per-repo で削除（先頭 KEEP_RAW 件のみ保持）。
set -u
ROOT=/home/user/SBOM
OUT="$ROOT/results_fresh"; DATA="$OUT/data_sib"; WORK=/tmp/sib_work
CSV="$OUT/metrics_sibling.csv"
export GOMODCACHE=/tmp/sib_modcache
# GOFLAGS/-mod=mod は付けない（go.mod/go.sum を書き換えてツール入力を汚染しないため。
# 元 run_batch.sh と同じ readonly。GT生成はツール実行の後に回す）。
# 実行時に GOEXPERIMENT も付けない（古いgo指定repoで go list が失敗するため）。
mkdir -p "$DATA" "$WORK" "$GOMODCACHE"
LIST="${1:-$ROOT/results3gt/repolist.csv}"
LIMIT="${2:-100000}"
KEEP_RAW=30
TO=300
HDR="repo,tool,n_all_tp,n_all_fp,n_all_fn,n_imp_tp,n_imp_fp,n_imp_fn,n_impT_tp,n_impT_fp,n_impT_fn,v_all_tp,v_all_fp,v_all_fn,v_imp_tp,v_imp_fp,v_imp_fn,v_impT_tp,v_impT_fp,v_impT_fn,fp_test,fp_otherOS,fp_direct_unused,fp_indirect_unused,fp_resid_gosum,fp_resid_sibling"
[ -f "$CSV" ] || echo "$HDR" > "$CSV"
# 既に CSV に載っている repo は完了扱い（再開耐性）
declare -A DONE_MAP
while IFS=, read -r r _; do [ -n "$r" ] && DONE_MAP["$r"]=1; done < <(tail -n +2 "$CSV" | cut -d, -f1)

commit_push() {
  git -C "$ROOT" add "$CSV" >/dev/null 2>&1
  git -C "$ROOT" -c user.name='Opposititte' -c user.email='201308377+Opposititte@users.noreply.github.com' \
    commit -q -m "sibling re-collection progress: $1 repos" >/dev/null 2>&1
  for r in 1 2 3 4; do git -C "$ROOT" push origin claude/adoring-gates-2mlb1d >/dev/null 2>&1 && break || sleep $((2**r)); done
}

i=0; ok=0; started=$(date -u +%s)
while IFS=, read -r name url rest; do
  name="${name%%,*}"; [ -z "$name" ] && continue
  [ "${DONE_MAP[$name]:-}" = "1" ] && continue
  i=$((i+1)); [ "$i" -gt "$LIMIT" ] && break
  freekb=$(df --output=avail / | tail -1); [ "$freekb" -lt 4194304 ] && { go clean -modcache >/dev/null 2>&1; rm -rf "$GOMODCACHE" /root/go/pkg/mod; mkdir -p "$GOMODCACHE"; }
  outdir="$DATA/$name"; mkdir -p "$outdir"
  d="$WORK/$name"; rm -rf "$d"
  if ! timeout 180 git clone --depth=1 "$url" "$d" >/dev/null 2>&1; then
    echo "$name,CLONE_FAIL" >> "$CSV"; DONE_MAP[$name]=1; rm -rf "$outdir"; continue
  fi
  # --- ① ツールを先に（無改変の go.mod/go.sum を読ませる）元 run_batch.sh と同コマンド ---
  # FP分類の go.sum も go改変前のコミット状態を取る
  awk '{print $1}' "$d/go.sum" 2>/dev/null | sort -u > "$outdir/gosum.txt"
  (cd "$d" && go mod edit -json 2>/dev/null) | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);(j.Require||[]).filter(r=>!r.Indirect).forEach(r=>console.log(r.Path))}catch(e){}})' | sort -u > "$outdir/mod_direct.txt"
  (cd "$d" && go mod edit -json 2>/dev/null) | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);(j.Require||[]).filter(r=>r.Indirect).forEach(r=>console.log(r.Path))}catch(e){}})' | sort -u > "$outdir/mod_indirect.txt"
  timeout $TO syft "$d" -o cyclonedx-json="$outdir/syft_output.json" 2>/dev/null
  timeout $TO trivy fs "$d" --format cyclonedx --output "$outdir/trivy_output.json" 2>/dev/null
  timeout $TO cdxgen -t go "$d" -o "$outdir/cdxgen_output.json" >/dev/null 2>&1
  timeout $TO cyclonedx-gomod mod -json -output "$outdir/cyclonedx-gomod_output.json" "$d" 2>/dev/null
  rm -rf /tmp/cdxgen-* /tmp/pip-* 2>/dev/null
  # --- ② ツール実行後にGT生成（ここでの go.sum 補完はツール入力に影響しない）---
  gmain=$(cd "$d" && timeout 120 go list -m 2>/dev/null | head -1 | awk '{print $1}')
  echo "$gmain" > "$outdir/main.txt"
  (cd "$d" && timeout $TO go mod download 2>/dev/null); :  # readonlyでのgo listを通すためgo.sum補完(requireは不変)
  (cd "$d" && timeout $TO go list -m all 2>/dev/null) > "$outdir/gt_all.txt"
  (cd "$d" && GOOS=linux timeout $TO go list -deps -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./... 2>/dev/null) | grep -v '^$' | grep -v "^${gmain} \?$" | sort -u > "$outdir/gt_imported.txt"
  (cd "$d" && GOOS=linux timeout $TO go list -deps -test -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./... 2>/dev/null) | grep -v '^$' | grep -v "^${gmain} \?$" | sort -u > "$outdir/gt_impT.txt"
  (cd "$d" && GOOS=windows timeout $TO go list -deps -e -f '{{with .Module}}{{.Path}}{{end}}' ./... 2>/dev/null) | grep -v '^$' | grep -v "^${gmain}\$" | sort -u > "$outdir/win.txt"
  # メトリクス計算 → CSV
  node "$OUT/metric_one_sib.js" "$outdir" >> "$CSV" 2>/dev/null && { ok=$((ok+1)); DONE_MAP[$name]=1; }
  rm -rf "$d"
  [ "$ok" -gt "$KEEP_RAW" ] && rm -rf "$outdir"   # 先頭KEEP_RAW件だけ生データ保持
  [ $((i % 10)) -eq 0 ] && { go clean -modcache >/dev/null 2>&1; rm -rf "$GOMODCACHE" /root/go/pkg/mod; mkdir -p "$GOMODCACHE"; }
  if [ $((ok % 25)) -eq 0 ] && [ "$ok" -gt 0 ]; then
    tot=$(( $(wc -l < "$CSV") - 1 )); commit_push "$tot"
    el=$(( $(date -u +%s) - started )); echo "[$(date -u +%H:%M:%S)] i=$i ok=$ok 経過${el}s free=$(df -h /|tail -1|awk '{print $4}')"
  fi
done < "$LIST"
tot=$(( $(wc -l < "$CSV") - 1 )); commit_push "$tot"
echo "BATCH_DONE i=$i ok=$ok total_in_csv=$tot $(date -u +%H:%M:%S)"
