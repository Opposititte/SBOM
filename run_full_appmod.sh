#!/bin/bash
# Full app-vs-mod batch over awesome-go (gomod=ok). Resumable, incremental push.
set -u
ROOT=/home/user/SBOM-gomod-exp
OUT="$ROOT/results_appmod_full"
WORK=/tmp/amf_work
export GOMODCACHE=/tmp/amf_gomodcache
mkdir -p "$OUT" "$WORK" "$GOMODCACHE"
CSV="$OUT/appmod_full.csv"
[ -f "$CSV" ] || echo "repo,kind,nmains,imp,all,app_n,mod_n,main_used,app_tp_imp,app_fp_imp,app_fn_imp,mod_tp_imp,mod_fp_imp,mod_fn_imp,app_tp_all,app_fp_all,app_fn_all,mod_tp_all,mod_fp_all,mod_fn_all" > "$CSV"
cd "$ROOT"

cm() { node -e '
const fs=require("fs");
const gt=new Set(fs.readFileSync(process.argv[2],"utf8").split("\n").map(x=>x.trim().split(/\s+/)[0]).filter(Boolean).map(x=>x.toLowerCase()));
let d;try{d=JSON.parse(fs.readFileSync(process.argv[1]))}catch(e){console.log("0 0 0 0");process.exit()}
const main=(process.argv[3]||"").toLowerCase();const s=new Set();
for(const c of (d.components||[])){const u=c.purl||"";if(u.startsWith("pkg:golang/")){let r=u.slice(11).split("?")[0].split("#")[0];const at=r.lastIndexOf("@");let p=(at<0?r:r.slice(0,at)).toLowerCase();if(p!=="stdlib"&&p!==main)s.add(p);}}
let tp=0;for(const x of s)if(gt.has(x))tp++;console.log(tp+" "+(s.size-tp)+" "+(gt.size-tp)+" "+s.size);' "$1" "$2" "$3"; }

i=0; pushed=0
mapfile -t ROWS < <(tail -n +2 resultsAll/_manifest.csv | awk -F, '$8=="ok"{print $1","$2}')
TOTAL=${#ROWS[@]}
echo "対象 $TOTAL repos / 開始 $(date -u +%H:%M:%S)"
for line in "${ROWS[@]}"; do
  name="${line%%,*}"; url="${line#*,}"
  [ -f "$OUT/$name.done" ] && continue
  i=$((i+1))
  d="$WORK/$name"; rm -rf "$d"
  if ! timeout 180 git clone --depth=1 "$url" "$d" >/dev/null 2>&1; then
    echo "$name,CLONE_FAIL,0,,,,,,,,,,,,,,,," >> "$CSV"; touch "$OUT/$name.done"; continue
  fi
  main=$(cd "$d" && timeout 120 go list -m 2>/dev/null|head -1|awk '{print $1}')
  (cd "$d" && GOOS=linux timeout 180 go list -deps -e -f '{{with .Module}}{{.Path}}{{end}}' ./... 2>/dev/null)|grep -v "^$main\$"|sort -u > "$d/gt_imp.txt"
  (cd "$d" && timeout 120 go list -m all 2>/dev/null)|awk '{print $1}'|grep -v "^$main\$"|sort -u > "$d/gt_all.txt"
  imp=$(grep -c . "$d/gt_imp.txt"); all=$(grep -c . "$d/gt_all.txt")
  timeout 180 cyclonedx-gomod mod -json -output "$d/mod.json" "$d" >/dev/null 2>&1
  # --- main detection ---
  cands=$( (cd "$d" && grep -rl --include=*.go -E '^package main' . 2>/dev/null) | sed 's#^\./##' | xargs -rn1 dirname \
    | grep -viE '(^|/)(example|examples|_example|sample|samples|demo|test|tests|testdata|script|scripts|tools?|hack)(/|$)' | sort -u )
  rootmain=no; (cd "$d" && go list -f '{{.Name}}' . 2>/dev/null|grep -qx main) && rootmain=yes
  nmains=$(echo "$cands"|grep -c .); [ "$rootmain" = yes ] && nmains=$((nmains+0))
  realmain=""; kind="lib_no_realmain"
  if [ "$rootmain" = yes ]; then realmain="."; kind="app_root"; nmains=$([ "$nmains" -eq 0 ] && echo 1 || echo "$nmains")
  else
    cmd=$(echo "$cands"|grep -E '(^|/)cmd/'|head -1)
    if [ -n "$cmd" ]; then realmain="$cmd"; kind="app_cmd";
    elif [ -n "$cands" ]; then realmain=$(echo "$cands"|head -1); kind="app_other"; fi
  fi
  if [ -z "$realmain" ]; then appn="NA"; mu="NONE"; ai="NA NA NA 0"; aa="NA NA NA 0";
  else
    mu="$realmain"
    if [ "$realmain" = "." ]; then timeout 180 cyclonedx-gomod app -json -output "$d/app.json" "$d" >/dev/null 2>&1;
    else timeout 180 cyclonedx-gomod app -json -output "$d/app.json" -main "$realmain" "$d" >/dev/null 2>&1; fi
    if [ ! -s "$d/app.json" ]; then appn="NA"; kind="app_run_fail"; ai="NA NA NA 0"; aa="NA NA NA 0";
    else ai=$(cm "$d/app.json" "$d/gt_imp.txt" "$main"); aa=$(cm "$d/app.json" "$d/gt_all.txt" "$main"); appn=$(echo $ai|awk '{print $4}'); fi
  fi
  mi=$(cm "$d/mod.json" "$d/gt_imp.txt" "$main"); ma=$(cm "$d/mod.json" "$d/gt_all.txt" "$main"); modn=$(echo $mi|awk '{print $4}')
  read ait aif aifn _ <<<"$ai"; read aat aaf aafn _ <<<"$aa"; read mit mif mifn _ <<<"$mi"; read mat maf mafn _ <<<"$ma"
  echo "$name,$kind,$nmains,$imp,$all,$appn,$modn,$mu,$ait,$aif,$aifn,$mit,$mif,$mifn,$aat,$aaf,$aafn,$mat,$maf,$mafn" >> "$CSV"
  touch "$OUT/$name.done"
  rm -rf "$d"
  # disk bound
  if [ $((i % 40)) -eq 0 ]; then go clean -modcache >/dev/null 2>&1; rm -rf "$GOMODCACHE"; mkdir -p "$GOMODCACHE"; fi
  # incremental push every 25
  if [ $((i % 25)) -eq 0 ]; then
    git add -A "$OUT" >/dev/null 2>&1
    git -c user.name='Opposititte' -c user.email='201308377+Opposititte@users.noreply.github.com' \
      commit -q -m "app-vs-mod full batch: progress $i/$TOTAL

https://claude.ai/code/session_01TWWX9ddjZjKjWCREMxt8Nh" >/dev/null 2>&1
    for r in 1 2 3 4; do git push origin claude/gomod-app-vs-mod >/dev/null 2>&1 && { pushed=$i; break; } || sleep $((2**r)); done
    echo "[$(date -u +%H:%M:%S)] done=$i/$TOTAL pushed@$pushed free=$(df -h /|tail -1|awk '{print $4}')"
  fi
done
git add -A "$OUT" >/dev/null 2>&1
git -c user.name='Opposititte' -c user.email='201308377+Opposititte@users.noreply.github.com' \
  commit -q -m "app-vs-mod full batch: complete

https://claude.ai/code/session_01TWWX9ddjZjKjWCREMxt8Nh" >/dev/null 2>&1
for r in 1 2 3 4; do git push origin claude/gomod-app-vs-mod >/dev/null 2>&1 && break || sleep $((2**r)); done
echo "ALL_DONE $(date -u +%H:%M:%S)"
