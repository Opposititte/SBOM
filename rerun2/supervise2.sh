#!/bin/bash
# supervise2.sh [並列数] [1ワーカーあたりの件数] — rerun2.js を複数ワーカーで回し、
# 落ちたら自動再投入する。実行環境のコンテナが不定期に回収されるため単発 node では完走できない。
# rerun2.js は .claim で排他するので同時実行しても同じ repo を二重処理しない。
#
# 必ず setsid で起動すること（前回、親プロセスの終了に巻き込まれてジョブが繰り返し停止した）:
#   setsid nohup ./census2/rerun2/supervise2.sh 3 > /dev/null 2>&1 < /dev/null &
#
# 停止は ./census2/rerun2/stop2.sh（3ワーカーまとめて止まる。--now で即時）。
# differ を検出したワーカーは自分で out/STOP を立てるので、全ワーカーが次の repo の
# 切れ目で抜け、この supervisor も再投入せずに終了する。
set -u
cd "$(dirname "$0")/../.."          # リポジトリルート
P=${1:-3}
LIMIT=${2:-}
export PATH=/opt/go1265/go/bin:${TOOL_BIN:-/workspace/gopath/bin}:$PATH
export GOPATH=${GOPATH:-/workspace/gopath}
OUT=census2/rerun2/out
mkdir -p "$OUT"

# 前回の supervisor が生きていないか確認する（二重起動すると .claim の掃除が危険）
if [ -f "$OUT/supervisor.pgid" ] && kill -0 -"$(cat "$OUT/supervisor.pgid")" 2>/dev/null; then
  echo "[supervise2] 既に supervisor が動いている (PGID=$(cat "$OUT/supervisor.pgid"))。起動しない。" >&2; exit 1
fi

# 前回の異常終了（コンテナ回収・stop2.sh --now）で残った中途半端な repo ディレクトリを掃除する。
# meta.json が無い＝完了していないので、.claim ごと消して次のラウンドで再試行させる。
# これをしないと 30分間 .claim に阻まれて対象から漏れる。
for d in "$OUT"/*/; do
  [ -d "$d" ] || continue
  [ -f "$d/meta.json" ] || { echo "[supervise2] 中断された $d を掃除して再試行対象に戻す" >> "$OUT/run_full.log"; rm -rf "$d"; }
done

# 自分の PGID を残す（stop2.sh --now がプロセスグループごと落とすために使う）
ps -o pgid= -p $$ | tr -d ' ' > "$OUT/supervisor.pgid"
trap 'rm -f "$OUT/supervisor.pgid"' EXIT

TOTAL=$(awk -F, 'NR>1 && $7=="OK"' census2/manifest.csv | wc -l)
echo "[supervise2] 開始 $(date -u +%FT%TZ) 並列=$P 対象=$TOTAL PGID=$(cat "$OUT/supervisor.pgid")" >> "$OUT/run_full.log"

for i in $(seq 1 500); do
  if [ -f "$OUT/STOP" ]; then
    echo "[supervise2] STOP を検出したので再投入しない: $(cat "$OUT/STOP")" >> "$OUT/run_full.log"; break
  fi
  n=$(ls -d "$OUT"/*/ 2>/dev/null | wc -l)
  if [ "$n" -ge "$TOTAL" ]; then echo "[supervise2] 全 $TOTAL 件完了 $(date -u +%FT%TZ)" >> "$OUT/run_full.log"; break; fi
  echo "[supervise2] round $i: 済み $n / $TOTAL  $(date -u +%FT%TZ)" >> "$OUT/run_full.log"
  for w in $(seq 1 "$P"); do node census2/rerun2/rerun2.js $LIMIT >> "$OUT/run_full.log" 2>&1 & done
  wait
  sleep 2
done
echo "[supervise2] 終了 $(date -u +%FT%TZ)" >> "$OUT/run_full.log"
