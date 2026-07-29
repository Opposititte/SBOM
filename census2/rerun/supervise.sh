#!/bin/bash
# supervise.sh — rerun.js を監視付きで回す。
# 本実行環境ではコンテナが不定期に再起動され、その度に background の node が落ちる
# （成果物は逐次書き込み＋コミット済みなので失われない）。rerun.js は再開可能なので、
# 落ちたら自動で再投入し、全件終わるまで繰り返す。
cd /home/user/SBOM
TOTAL=$(awk -F, 'NR>1 && $7=="OK"' census2/manifest.csv | wc -l)
for i in $(seq 1 200); do
  n=$(ls -d census2/rerun/out/*/ 2>/dev/null | wc -l)
  if [ "$n" -ge "$TOTAL" ]; then echo "[supervise] 全 $TOTAL 件完了" >> census2/rerun/out/run_full.log; break; fi
  echo "[supervise] 起動 #$i (完了 $n/$TOTAL) $(date -u +%H:%M:%S)" >> census2/rerun/out/run_full.log
  node census2/rerun/rerun.js >> census2/rerun/out/run_full.log 2>&1
  sleep 3
done
