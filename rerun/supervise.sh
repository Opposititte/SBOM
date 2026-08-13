#!/bin/bash
# supervise.sh [並列数] — rerun.js を複数ワーカーで回し、落ちたら自動再投入する。
# 実行環境のコンテナが不定期に回収されるため、単発 node では完走できない。
# rerun.js は .claim で排他するので同時実行しても同じrepoを二重処理しない。
cd /home/user/SBOM
P=${1:-3}
TOTAL=$(awk -F, 'NR>1 && $7=="OK"' census2/manifest.csv | wc -l)
for i in $(seq 1 500); do
  n=$(ls -d census2/rerun/out/*/ 2>/dev/null | wc -l)
  if [ "$n" -ge "$TOTAL" ]; then echo "[supervise] 全 $TOTAL 件完了" >> census2/rerun/out/run_full.log; break; fi
  for w in $(seq 1 $P); do node census2/rerun/rerun.js >> census2/rerun/out/run_full.log 2>&1 & done
  wait
  sleep 2
done
