#!/bin/bash
# supervise2.sh [並列数] [件数] — rerun2.js を複数ワーカーで回し、落ちたら自動再投入する。
# 実行環境のコンテナが不定期に回収されるため、単発 node では完走できない。
# rerun2.js は .claim で排他するので同時実行しても同じ repo を二重処理しない。
#
# 必ず setsid で起動すること（前回、親プロセスの終了に巻き込まれてジョブが繰り返し停止した）:
#   setsid nohup ./census2/rerun2/supervise2.sh 3 > /dev/null 2>&1 < /dev/null &
set -u
cd "$(dirname "$0")/../.."          # リポジトリルート
P=${1:-3}
LIMIT=${2:-}
export PATH=/opt/go1265/go/bin:${TOOL_BIN:-/workspace/gopath/bin}:$PATH
export GOPATH=${GOPATH:-/workspace/gopath}
OUT=census2/rerun2/out
mkdir -p "$OUT"
TOTAL=$(awk -F, 'NR>1 && $7=="OK"' census2/manifest.csv | wc -l)
for i in $(seq 1 500); do
  n=$(ls -d "$OUT"/*/ 2>/dev/null | wc -l)
  if [ "$n" -ge "$TOTAL" ]; then echo "[supervise2] 全 $TOTAL 件完了 $(date -u +%FT%TZ)" >> "$OUT/run_full.log"; break; fi
  echo "[supervise2] round $i: 済み $n / $TOTAL  $(date -u +%FT%TZ)" >> "$OUT/run_full.log"
  for w in $(seq 1 "$P"); do node census2/rerun2/rerun2.js $LIMIT >> "$OUT/run_full.log" 2>&1 & done
  wait
  sleep 2
done
