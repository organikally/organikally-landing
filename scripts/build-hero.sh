#!/usr/bin/env bash
# Build the hero film assets from the source animation.
# Output: a full-quality, progressively-streamable MP4 + a poster (first frame).
# Reproducible — safe to re-run. Requires ffmpeg.
#
# The hero is a scroll-scrubbed <video> (see HeroFilm.tsx): scroll progress drives
# video.currentTime. For that to seek smoothly the file is encoded ALL-INTRA (every
# frame a keyframe, -g 1), at high quality (CRF 18) from the native 1080p source,
# with faststart so it streams progressively while the user scrolls.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/assets/source/Organikaly_hero_ribbons.mp4"
OUT="$ROOT/public/hero"

mkdir -p "$OUT"

echo "→ hero.mp4 (all-intra, CRF 18, audio stripped, faststart)"
ffmpeg -y -hide_banner -loglevel error -i "$SRC" \
  -c:v libx264 -preset slow -crf 18 -g 1 -keyint_min 1 -sc_threshold 0 \
  -pix_fmt yuv420p -an -movflags +faststart "$OUT/hero.mp4"

echo "→ poster.jpg (first frame — video poster + OG/share image)"
ffmpeg -y -hide_banner -loglevel error -i "$SRC" \
  -frames:v 1 -q:v 3 "$OUT/poster.jpg"

echo "→ sizes"
du -h "$OUT/hero.mp4" "$OUT/poster.jpg"
echo "✓ hero assets built → public/hero/"
