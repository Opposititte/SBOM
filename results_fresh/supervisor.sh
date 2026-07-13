#!/bin/bash
# supervisor.sh — par.sh が死んでいたら再起動し続ける。partsは温存されるので必ず前進する。
# 停止するには: touch /tmp/sib_stop  （または本プロセスをkill）
OUT=/home/user/SBOM/results_fresh
P="${1:-8}"
while true; do
  [ -f /tmp/sib_stop ] && { echo "[sup] stop flag → 終了"; break; }
  if ! pgrep -f 'results_fresh/par.sh' >/dev/null 2>&1; then
    echo "[sup $(date -u +%H:%M:%S)] par.sh 不在 → 起動 (P=$P)"
    setsid bash "$OUT/par.sh" "$P" >> /tmp/prun.log 2>&1 < /dev/null &
    sleep 15   # 起動安定待ち
  fi
  sleep 20
done
