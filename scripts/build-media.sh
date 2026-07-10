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
  # Homely lifestyle (kitchen warmth) — powers the refactored benefit / compare / quiz blocks
  "gen-kitchen|kitchen|3|2|1300"                 # oil at work in a warm home kitchen
  "gen-pour|pour|4|5|1000"                        # golden oil pouring — the sensory hero
  "gen-thali|thali|3|2|1300"                     # a home-cooked thali
  "gen-bottle-hero|bottle-hero|4|5|1000"          # clean bottle on warm paper
  "gen-seed-macro|seed-macro|1|1|1000"            # yellow mustard seed macro (square)
  # Comparison visuals (the one true image gap — generate via gen-images.py first)
  "gen-compare-coldpressed|compare-coldpressed|4|5|900"  # golden cold-pressed in glass — our side
  "gen-compare-refined|compare-refined|4|5|900"          # pale ordinary refined — the contrast
  # Ojasya-replication imagery (see docs/OJASYA_REPLICATION.md §7)
  "gen-journey-art|journey-art|4|5|1100"          # illustrated field/farm panel for the journey
  "gen-benefit-1|benefit-1|1|1|700"               # benefit blob — seeds & oil
  "gen-benefit-2|benefit-2|1|1|700"               # benefit blob — oil & greens
  "gen-benefit-3|benefit-3|1|1|700"               # benefit blob — kachi ghani press
  "gen-benefit-4|benefit-4|1|1|700"               # benefit blob — flowers & seed
  "gen-quiz-portrait|quiz-portrait|4|5|1100"      # festive home cook + bottles (quiz)
  "gen-stamp-oil|stamp-oil|3|4|900"               # postage-stamp product card — oil
  "gen-stamp-dals|stamp-dals|3|4|900"             # postage-stamp product card — dals
  "gen-stamp-khand|stamp-khand|3|4|900"           # postage-stamp product card — khand
  "gen-stamp-pantry|stamp-pantry|3|4|900"         # postage-stamp product card — pantry
  "gen-shop-oil|shop-oil|1|1|900"                 # shop grid product shot — oil
  "gen-shop-dals|shop-dals|1|1|900"               # shop grid product shot — dals
  "gen-shop-khand|shop-khand|1|1|900"             # shop grid product shot — khand
  "gen-shop-pantry|shop-pantry|1|1|900"           # shop grid product shot — pantry
  "gen-ghar-line|ghar-line|4|3|1400"              # faint line-art watermark
  "gen-proof-date|proof-date|4|3|1100"            # freshness / press-date proof close-up
  "gen-story|story|4|5|1000"                      # heritage hands + bottle for the brand-story section
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
  # Recipe heroes (3:2) — /recipes pages
  "gen-recipe-tadka-dal|recipe-tadka-dal|3|2|1300"
  "gen-recipe-aloo-sabzi|recipe-aloo-sabzi|3|2|1300"
  "gen-recipe-atta-halwa|recipe-atta-halwa|3|2|1300"
  "gen-recipe-cheela|recipe-cheela|3|2|1300"
  "gen-recipe-kachumber|recipe-kachumber|3|2|1300"
  "gen-recipe-haldi-doodh|recipe-haldi-doodh|3|2|1300"
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
