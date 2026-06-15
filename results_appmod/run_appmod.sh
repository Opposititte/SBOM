#!/bin/bash
WORK=/tmp/appmod_work2; OUT=/home/user/SBOM-gomod-exp/results_appmod
mkdir -p "$WORK" "$OUT"
CSV="$OUT/appmod2.csv"
echo "repo,kind,imp,all,app_n,mod_n,main_used,app_tp_imp,app_fp_imp,app_fn_imp,mod_tp_imp,mod_fp_imp,mod_fn_imp,app_tp_all,app_fp_all,app_fn_all,mod_tp_all,mod_fp_all,mod_fn_all" > "$CSV"
cm() { node -e '
const fs=require("fs");
const gt=new Set(fs.readFileSync(process.argv[2],"utf8").split("\n").map(x=>x.trim().split(/\s+/)[0]).filter(Boolean).map(x=>x.toLowerCase()));
let d;try{d=JSON.parse(fs.readFileSync(process.argv[1]))}catch(e){console.log("0 0 0 0");process.exit()}
const main=(process.argv[3]||"").toLowerCase();const s=new Set();
for(const c of (d.components||[])){const u=c.purl||"";if(u.startsWith("pkg:golang/")){let r=u.slice(11).split("?")[0].split("#")[0];const at=r.lastIndexOf("@");let p=(at<0?r:r.slice(0,at)).toLowerCase();if(p!=="stdlib"&&p!==main)s.add(p);}}
let tp=0;for(const x of s)if(gt.has(x))tp++;console.log(tp+" "+(s.size-tp)+" "+(gt.size-tp)+" "+s.size);' "$1" "$2" "$3"; }

while read -r name url; do
  [ -z "$name" ] && continue
  d="$WORK/$name"; rm -rf "$d"
  git clone --depth=1 "$url" "$d" >/dev/null 2>&1 || { echo "$name,CLONE_FAIL" >> "$CSV"; continue; }
  main=$(cd "$d" && go list -m 2>/dev/null|head -1|awk '{print $1}')
  (cd "$d" && GOOS=linux go list -deps -e -f '{{with .Module}}{{.Path}}{{end}}' ./... 2>/dev/null)|grep -v "^$main\$"|sort -u > "$d/gt_imp.txt"
  (cd "$d" && go list -m all 2>/dev/null)|awk '{print $1}'|grep -v "^$main\$"|sort -u > "$d/gt_all.txt"
  imp=$(grep -c . "$d/gt_imp.txt"); all=$(grep -c . "$d/gt_all.txt")
  cyclonedx-gomod mod -json -output "$d/mod.json" "$d" >/dev/null 2>&1
  # --- 真のmain選択: root優先 → cmd/* → それ以外は除外(example/test/scripts等) ---
  realmain=""; kind="lib_no_realmain"
  if (cd "$d" && go list -f '{{.Name}}' . 2>/dev/null|grep -qx main); then realmain="."; kind="app_root";
  else
    cand=$( (cd "$d" && grep -rl --include=*.go -E '^package main' . 2>/dev/null) | sed 's#^\./##' | xargs -rn1 dirname \
      | grep -viE '(^|/)(example|examples|_example|sample|samples|demo|test|tests|testdata|script|scripts|tools?|hack|internal/example)(/|$)' \
      | sort -u )
    cmd=$(echo "$cand"|grep -E '(^|/)cmd/'|head -1)
    if [ -n "$cmd" ]; then realmain="$cmd"; kind="app_cmd";
    elif [ -n "$cand" ]; then realmain=$(echo "$cand"|head -1); kind="app_other"; fi
  fi
  if [ -z "$realmain" ]; then appn="NA"; mu="NONE"; ai="NA NA NA 0"; aa="NA NA NA 0";
  else
    mu="$realmain"
    if [ "$realmain" = "." ]; then cyclonedx-gomod app -json -output "$d/app.json" "$d" >/dev/null 2>&1;
    else cyclonedx-gomod app -json -output "$d/app.json" -main "$realmain" "$d" >/dev/null 2>&1; fi
    if [ ! -s "$d/app.json" ]; then appn="NA"; kind="app_run_fail"; ai="NA NA NA 0"; aa="NA NA NA 0";
    else ai=$(cm "$d/app.json" "$d/gt_imp.txt" "$main"); aa=$(cm "$d/app.json" "$d/gt_all.txt" "$main"); appn=$(echo $ai|awk '{print $4}'); fi
  fi
  mi=$(cm "$d/mod.json" "$d/gt_imp.txt" "$main"); ma=$(cm "$d/mod.json" "$d/gt_all.txt" "$main"); modn=$(echo $mi|awk '{print $4}')
  read ait aif aifn _ <<<"$ai"; read aat aaf aafn _ <<<"$aa"; read mit mif mifn _ <<<"$mi"; read mat maf mafn _ <<<"$ma"
  echo "$name,$kind,$imp,$all,$appn,$modn,$mu,$ait,$aif,$aifn,$mit,$mif,$mifn,$aat,$aaf,$aafn,$mat,$maf,$mafn" >> "$CSV"
  printf "%-40s %-14s imp=%-3s app=%-4s mod=%-4s main=%s\n" "$name" "$kind" "$imp" "$appn" "$modn" "$mu"
  rm -rf "$d"
done < /tmp/sample40.txt
echo "DONE2"
