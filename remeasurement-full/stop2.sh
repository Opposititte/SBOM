#!/bin/bash
# stop2.sh [reason] — 走っている rerun2 を**3ワーカーまとめて**止める。
#
# 1ワーカーだけ止まって残りが走り続けると、報告を受けた時点の状態が読めなくなるため、
#   (1) out/STOP を立てる  … 各ワーカーは repo の切れ目で自発的に抜ける（安全な停止）
#   (2) プロセスグループごと kill … 即時停止（clone/ツール実行の途中でも落とす）
# の2段構えにする。supervise2.sh は setsid で起動され自分の PGID を out/supervisor.pgid に
# 書くので、そのグループを丸ごと落とせば supervisor・全ワーカー・その子(git/syft/go…)まで届く。
#
#   使い方: ./remeasurement-full/stop2.sh                 # 安全に停止（進行中の1件は書き切る）
#           ./remeasurement-full/stop2.sh --now           # 即時停止（プロセスグループを kill）
set -u
cd "$(dirname "$0")/../.."
OUT=remeasurement-full/out
PGF="$OUT/supervisor.pgid"
NOW=0; REASON="manual stop"
for a in "$@"; do case "$a" in --now) NOW=1;; *) REASON="$a";; esac; done

mkdir -p "$OUT"
echo "$REASON ($(date -u +%FT%TZ))" > "$OUT/STOP"
echo "[stop2] out/STOP を作成: $REASON"

if [ "$NOW" = "1" ]; then
  if [ -f "$PGF" ]; then
    PGID=$(cat "$PGF")
    if kill -0 -"$PGID" 2>/dev/null; then
      kill -TERM -"$PGID" 2>/dev/null
      sleep 3
      kill -0 -"$PGID" 2>/dev/null && kill -KILL -"$PGID" 2>/dev/null
      echo "[stop2] プロセスグループ $PGID を停止した"
    else
      echo "[stop2] プロセスグループ $PGID は既に終了している"
    fi
  else
    echo "[stop2] $PGF が無い。pkill でフォールバックする"
    pkill -f 'remeasurement-full/rerun2.js'; pkill -f 'remeasurement-full/supervise2.sh'
  fi
fi

echo "[stop2] 残プロセス: $(pgrep -fc 'remeasurement-full/(rerun2.js|supervise2.sh)' 2>/dev/null || echo 0)"
echo "[stop2] 再開するには out/STOP を消してから supervise2.sh を起動する"
