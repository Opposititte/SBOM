#!/bin/bash
# 3GT version-aware batch. github クローンが許可されたら実行する。
# all/imported は resultsAll のバージョン入りGTを再利用。imported+test のみ再クローンしてバージョン入り生成。
set -u
ROOT=/home/user/SBOM
OUT="$ROOT/results3gt_ver"; DONE="$OUT/done"; WORK=/tmp/t3v_work
export GOMODCACHE=/tmp/t3v_modcache
mkdir -p "$OUT" "$DONE" "$WORK" "$GOMODCACHE"
CSV="$OUT/metrics3gt_ver.csv"
# 列: repo,tool, [all name tp,fp,fn][all ver tp,fp,fn][imp name][imp ver][impT name][impT ver]
[ -f "$CSV" ] || echo "repo,tool,all_n_tp,all_n_fp,all_n_fn,all_v_tp,all_v_fp,all_v_fn,imp_n_tp,imp_n_fp,imp_n_fn,imp_v_tp,imp_v_fp,imp_v_fn,impT_n_tp,impT_n_fp,impT_n_fn,impT_v_tp,impT_v_fp,impT_v_fn" > "$CSV"
cd "$ROOT"
mapfile -t ROWS < "$ROOT/results3gt/repolist.csv"
TOTAL=${#ROWS[@]}
echo "対象 $TOTAL repos / 開始 $(date -u +%H:%M:%S)"
i=0
for line in "${ROWS[@]}"; do
  name="${line%%,*}"; url="${line#*,}"
  [ -z "$name" ] && continue
  [ -f "$DONE/$name" ] && continue
  i=$((i+1))
  freekb=$(df --output=avail / | tail -1); [ "$freekb" -lt 4194304 ] && { go clean -modcache >/dev/null 2>&1; rm -rf "$GOMODCACHE" /root/go/pkg/mod; mkdir -p "$GOMODCACHE"; }
  # --- Goモジュールプロキシ経由でソース取得（github cloneがegressポリシーで403のため）---
  # 元の git clone と同等: 主モジュールのソースを取得して go list -deps -test を回す。
  # 主モジュールパスは resultsAll の保存GT(gt_go_list.txt 先頭行)を使う。
  gl="$ROOT/resultsAll/$name/gt_go_list.txt"
  [ -f "$gl" ] || { echo "$name,NO_GT" >> "$CSV"; touch "$DONE/$name"; continue; }
  mod=$(head -1 "$gl" | awk '{print $1}')
  [ -z "$mod" ] && { echo "$name,NO_MOD" >> "$CSV"; touch "$DONE/$name"; continue; }
  # Goプロキシのパスエスケープ: 大文字X -> !x
  emod=$(printf '%s' "$mod" | sed -E 's/([A-Z])/!\L\1/g')
  ver=$(curl -fsS --max-time 60 "https://proxy.golang.org/${emod}/@latest" 2>/dev/null \
        | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{process.stdout.write(JSON.parse(d).Version||"")}catch(e){}})')
  [ -z "$ver" ] && { echo "$name,NO_VER" >> "$CSV"; touch "$DONE/$name"; continue; }
  d="$WORK/$name"; rm -rf "$d"; mkdir -p "$d"
  if ! curl -fsS --max-time 240 -o "$d/m.zip" "https://proxy.golang.org/${emod}/@v/${ver}.zip" 2>/dev/null; then
    echo "$name,ZIP_FAIL" >> "$CSV"; touch "$DONE/$name"; rm -rf "$d"; continue
  fi
  (cd "$d" && unzip -q m.zip) 2>/dev/null || { echo "$name,UNZIP_FAIL" >> "$CSV"; touch "$DONE/$name"; rm -rf "$d"; continue; }
  src="$d/${mod}@${ver}"   # zip内部は非エスケープの実パス
  [ -d "$src" ] || { echo "$name,NODIR" >> "$CSV"; touch "$DONE/$name"; rm -rf "$d"; continue; }
  fd="$WORK/fresh_$name"; rm -rf "$fd"; mkdir -p "$fd"
  # imported+test を「パス バージョン」で生成（ここがバージョン対応の肝）
  (cd "$src" && GOOS=linux GOFLAGS=-mod=mod timeout 300 go list -deps -test -e -f '{{with .Module}}{{.Path}} {{.Version}}{{end}}' ./... 2>/dev/null) \
    | grep -v '^$' | grep -v "^$mod \?$" | sort -u > "$fd/impT_ver.txt"
  node "$OUT/compute_3gt_ver.js" "$name" "$fd" 2>/dev/null
  touch "$DONE/$name"
  rm -rf "$d" "$fd"
  [ $((i % 10)) -eq 0 ] && { go clean -modcache >/dev/null 2>&1; rm -rf "$GOMODCACHE" /root/go/pkg/mod; mkdir -p "$GOMODCACHE"; }
  if [ $((i % 25)) -eq 0 ]; then
    git add -A "$OUT" >/dev/null 2>&1
    git -c user.name='Opposititte' -c user.email='201308377+Opposititte@users.noreply.github.com' commit -q -m "3GT-ver batch progress $i ($(ls $DONE | wc -l)/$TOTAL)

https://claude.ai/code/session_01TWWX9ddjZjKjWCREMxt8Nh" >/dev/null 2>&1
    for r in 1 2 3 4; do git push origin claude/three-gt >/dev/null 2>&1 && break || sleep $((2**r)); done
    echo "[$(date -u +%H:%M:%S)] done=$(ls $DONE | wc -l)/$TOTAL free=$(df -h /|tail -1|awk '{print $4}')"
  fi
done
git add -A "$OUT" >/dev/null 2>&1
git -c user.name='Opposititte' -c user.email='201308377+Opposititte@users.noreply.github.com' commit -q -m "3GT-ver batch complete

https://claude.ai/code/session_01TWWX9ddjZjKjWCREMxt8Nh" >/dev/null 2>&1
for r in 1 2 3 4; do git push origin claude/three-gt >/dev/null 2>&1 && break || sleep $((2**r)); done
echo "ALL_DONE $(date -u +%H:%M:%S)"
