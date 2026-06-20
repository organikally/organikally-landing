#!/usr/bin/env bash
# Optimise the editorial section photography (sourced via Pexels) into the
# AVIF + WebP + JPG triplet the <Media> component serves. Reproducible — safe to
# re-run. Raw downloads live in assets/media-work/ (gitignored); the optimised
# output in public/media/ is the committed deploy artifact.
#
# Each row: <src-basename>|<out-basename>|<aspect-w>|<aspect-h>|<out-width>
# Images are centre-cropped to the aspect, scaled with lanczos, and given a very
# light warm grade so the set reads like one shoot rather than a stock grab-bag.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/assets/media-work"
OUT="$ROOT/public/media"
GRADE="eq=saturation=1.05:contrast=1.03:gamma=1.01"

mkdir -p "$OUT"

configs=(
  "field-punjab-portrait|field|4|5|1200"   # Sourcing — Punjab mustard field, tall
  "seeds-macro|seeds|4|5|1100"             # Story — mustard seed macro, tall accent
  "achaar-jar|achaar|3|2|1300"            # Recipes — mango achaar in a martaban
  "field-punjab-wide|field-band|3|1|1920" # cinematic full-bleed divider band
)

for row in "${configs[@]}"; do
  IFS='|' read -r src out aw ah w <<< "$row"
  in="$SRC/$src.jpg"
  [ -f "$in" ] || { echo "✗ missing $in"; exit 1; }

  # Centre-crop to the target aspect, then scale to the output width (even dims).
  vf="crop='min(iw,ih*${aw}/${ah})':'min(ih,iw*${ah}/${aw})',scale=${w}:-2:flags=lanczos,${GRADE}"

  echo "→ $out (${aw}:${ah} @ ${w}px)"
  ffmpeg -y -hide_banner -loglevel error -i "$in" -vf "$vf" -frames:v 1 "$OUT/$out.png"
  ffmpeg -y -hide_banner -loglevel error -i "$OUT/$out.png" -c:v libsvtav1 -crf 32 -frames:v 1 "$OUT/$out.avif" 2>/dev/null
  cwebp -quiet -q 80 "$OUT/$out.png" -o "$OUT/$out.webp"
  ffmpeg -y -hide_banner -loglevel error -i "$OUT/$out.png" -q:v 4 "$OUT/$out.jpg"
  rm -f "$OUT/$out.png"
  IFS=, read -r W H < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$OUT/$out.avif")
  printf "   %s  %s×%s  avif:%s webp:%s jpg:%s\n" "$out" "$W" "$H" \
    "$(du -h "$OUT/$out.avif" | cut -f1)" "$(du -h "$OUT/$out.webp" | cut -f1)" "$(du -h "$OUT/$out.jpg" | cut -f1)"
done

echo "✓ media built → public/media/"
