#!/bin/bash
# supervisor.sh [P] — run.sh が死んでいたら再起動し続ける。停止: touch /tmp/rm_stop
BASE=/home/user/SBOM/remeasure
P="${1:-8}"
while true; do
  [ -f /tmp/rm_stop ] && { echo "[sup] stop"; break; }
  if ! pgrep -f 'remeasure/run.sh' >/dev/null 2>&1; then
    echo "[sup $(date -u +%H:%M:%S)] run.sh 起動 (P=$P)"
    setsid bash "$BASE/run.sh" "$P" >> /tmp/rm_run.log 2>&1 < /dev/null &
    sleep 15
  fi
  sleep 20
done
