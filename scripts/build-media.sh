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

# Optional filter: pass one or more output basenames to rebuild just those, e.g.
# `build-media.sh blog-achaar blog-dals`. No args → rebuild the whole set.
FILTER=("$@")
want() {
  [ ${#FILTER[@]} -eq 0 ] && return 0
  for f in "${FILTER[@]}"; do [ "$f" = "$1" ] && return 0; done
  return 1
}

# Sources are the AI-generated set in assets/media-work (gen-*.png), art-directed
# to one cohesive look. Range + Recipes slots reuse the existing <Media> names so
# they swap in automatically; the rest are new placements.
configs=(
  # Range thumbnails (4:3)
  "gen-seeds|seeds|4|3|900"                      # Yellow Mustard Oil — seed macro
  "gen-dals|dals|4|3|900"                        # Pulses & Dals
  "gen-khand|khand|4|3|900"                      # Khand — jaggery
  "gen-pantry|pantry|4|3|900"                    # Pantry staples
  # From field to bottle — process steps (4:3)
  "gen-step-grown|step-grown|4|3|800"            # 01 Grown clean
  "gen-step-pressed|step-pressed|4|3|800"        # 02 Cold-pressed (ghani)
  "gen-step-bottled|step-bottled|4|3|800"        # 03 Bottled fresh
  "gen-step-kitchen|step-kitchen|4|3|800"        # 04 To your kitchen
  # Recipes (3:2)
  "gen-achaar|achaar|3|2|1300"                   # mango achaar in a martaban
  "gen-tadka|tadka|3|2|1300"                     # tadka in a kadhai
  # Heritage / field
  "gen-field|field|16|9|1600"                    # mustard field at golden hour
  "gen-farmer|farmer|3|2|1300"                   # farmer in the field
  "gen-heritage-hands|heritage-hands|3|2|1300"   # hands presenting the bottle
  # Backgrounds / textures (wide)
  "gen-texture-flowers|texture-flowers|16|9|1600"
  "gen-oil-swirl|oil-swirl|16|9|1600"
  # Journal / blog covers (3:2) — one per seed post
  "gen-blog-cold-pressed|blog-cold-pressed|3|2|1300"
  "gen-blog-organic-pantry|blog-organic-pantry|3|2|1300"
  "gen-blog-yellow-black|blog-yellow-black|3|2|1300"
  "gen-blog-cooking|blog-cooking|3|2|1300"
  "gen-blog-khand|blog-khand|3|2|1300"
  "gen-blog-achaar|blog-achaar|3|2|1300"
  "gen-blog-dals|blog-dals|3|2|1300"
)

for row in "${configs[@]}"; do
  IFS='|' read -r src out aw ah w <<< "$row"
  want "$out" || continue
  in="$SRC/$src.jpg"; [ -f "$in" ] || in="$SRC/$src.png"
  [ -f "$in" ] || { echo "✗ missing $SRC/$src.{jpg,png}"; exit 1; }

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
