#!/usr/bin/env bash
# Build the hero film assets from the source animation.
# Output: a full-quality, progressively-streamable MP4 + a poster (first frame).
# Reproducible — safe to re-run. Requires ffmpeg.
#
# The hero is a real autoplaying <video> (see HeroFilm.tsx), not a frame scrub, so
# this just hands the native 1080p source to the web with faststart (moov atom
# moved to the front) so it begins playing while it downloads. No re-encode — the
# source is already the best quality we have, so the stream is copied losslessly.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/assets/source/Organikally_hero_ribbons.mp4"
OUT="$ROOT/public/hero"

mkdir -p "$OUT"

echo "→ hero.mp4 (lossless remux, audio stripped, faststart)"
ffmpeg -y -hide_banner -loglevel error -i "$SRC" \
  -c:v copy -an -movflags +faststart "$OUT/hero.mp4"

echo "→ poster.jpg (first frame — video poster + OG/share image)"
ffmpeg -y -hide_banner -loglevel error -i "$SRC" \
  -frames:v 1 -q:v 3 "$OUT/poster.jpg"

echo "→ sizes"
du -h "$OUT/hero.mp4" "$OUT/poster.jpg"
echo "✓ hero assets built → public/hero/"
