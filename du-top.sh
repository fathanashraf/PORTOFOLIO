#!/usr/bin/env bash
set -euo pipefail
NM="${1:-node_modules}"
for d in "$NM"/*/; do
  [ -d "$d" ] || continue
  name=$(basename "$d")
  # du on the directory itself without recursing: -s reports total (which recurses),
  # so instead approximate size with a fast recursive du but limited depth to keep it cheap.
  # Here we allow full recursive du only for the biggest offenders; for others, depth-limited.
  # We'll print a reasonably-fast depth-limited estimate (depth 2) to avoid super slow scans.
  n=0
  for f in "$d"*; do
    [ -e "$f" ] || continue
    n=$(( n + 1 ))
  done
  echo "$(du -sh -d 2 "$d" 2>/dev/null | tail -n 1 | awk '{print $1}')  $name  (top-level entries: $n)"
done | sort -rh | sed -n '1,200p'
