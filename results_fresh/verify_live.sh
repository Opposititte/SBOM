#!/bin/bash
# verify_live.sh <name> <url> <savedDataDir>
# リポジトリを一から再クローンし、生の go コマンドを叩いて GT を作り直し、
# 保存済み gt_*.txt と一致するかを確認する（＝保存GTがGo公式出力の再現であることの証明）。
set -u
name="$1"; url="$2"; saved="$3"
export GOMODCACHE=/tmp/verify_mod GOCACHE=/tmp/verify_cache
W=/tmp/verify_clone/$name; rm -rf "$W"; mkdir -p "$W"
echo "### $name を一から再クローンして生 go コマンドで検証 ###"
timeout 120 git clone --depth=1 "$url" "$W" >/dev/null 2>&1 || { echo "clone失敗"; exit 1; }
gmain=$(cd "$W" && go list -m 2>/dev/null | head -1 | awk '{print $1}')
(cd "$W" && go mod download 2>/dev/null)

# 生コマンド（process_one.sh と同じ定義）
imp_live=$( (cd "$W" && GOOS=linux go list -deps -e -f '{{with .Module}}{{.Path}}{{end}}' ./... 2>/dev/null) | grep -v '^$' | grep -v "^${gmain}\$" | sort -u )
all_live=$( (cd "$W" && go list -m all 2>/dev/null) | awk '{print $1}' | grep -v "^${gmain}\$" | sort -u )

n_imp_live=$(echo "$imp_live" | grep -c . )
n_all_live=$(echo "$all_live" | grep -c . )

# 保存済みGT（名前だけ、mainを除く）
n_imp_saved=$(awk '{print $1}' "$saved/gt_imported.txt" 2>/dev/null | grep -v "^${gmain}\$" | sort -u | grep -c . )
n_all_saved=$(awk '{print $1}'  "$saved/gt_all.txt"      2>/dev/null | grep -v "^${gmain}\$" | sort -u | grep -c . )

echo "main module: $gmain"
echo "GT-imported : 今クローンして生成=$n_imp_live  vs  保存済み=$n_imp_saved"
echo "GT-all      : 今クローンして生成=$n_all_live  vs  保存済み=$n_all_saved"
# 差分（あれば中身表示）
echo "$imp_live" > /tmp/verify_clone/imp_live.txt
awk '{print $1}' "$saved/gt_imported.txt" 2>/dev/null | grep -v "^${gmain}\$" | sort -u > /tmp/verify_clone/imp_saved.txt
d=$(comm -3 /tmp/verify_clone/imp_live.txt /tmp/verify_clone/imp_saved.txt | grep -c . )
echo "GT-imported の差分件数: $d $([ "$d" = 0 ] && echo '→ 完全一致 ✓' || echo '(下に差分)')"
[ "$d" != 0 ] && comm -3 /tmp/verify_clone/imp_live.txt /tmp/verify_clone/imp_saved.txt | head
rm -rf "$W"
