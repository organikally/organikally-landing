#!/usr/bin/env bash
# Quota-free product-clip fallback: for any product still missing a Veo ad.mp4,
# build a gentle ~6s vertical (9:16) crossfade montage from its three stills
# (pack → ingredient → lifestyle) so every product ends up with a video. Writes
# assets/media-work/products/<slug>/ad.mp4 (same place Veo would), so the normal
# optimiser + manifest pick it up unchanged.
#
#   bash scripts/montage-fallback.sh              # cover every product missing ad.mp4
#   bash scripts/montage-fallback.sh <slug> ...   # only these slugs
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/assets/media-work/products"
FILTER=("$@")

want() {
  [ ${#FILTER[@]} -eq 0 ] && return 0
  for f in "${FILTER[@]}"; do [ "$f" = "$1" ] && return 0; done
  return 1
}

# One cropped, faded, still→motion stream. 720x1280, subtle slow zoom via zoompan
# on a single looped frame (d = total frames), then fps-normalised for xfade.
built=0
for dir in "$SRC"/*/; do
  slug="$(basename "$dir")"
  want "$slug" || continue
  [ -f "$dir/ad.mp4" ] && continue
  pack="$dir/pack.png"; ing="$dir/ingredient.png"; life="$dir/lifestyle.png"
  [ -f "$pack" ] && [ -f "$ing" ] && [ -f "$life" ] || { echo "  ! $slug missing stills — skip"; continue; }

  # Per-clip: cover-crop each 1024² still to 9:16 at 25fps. No zoompan (its
  # looped-image semantics are a footgun); a clean crossfade slideshow of the
  # three shots reads as a tidy product reel and always encodes correctly.
  # format is applied once after the final xfade (mid-chain format broke the graph).
  CC="scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,fps=25,setsar=1"

  ffmpeg -y -hide_banner -loglevel error \
    -loop 1 -t 2.4 -i "$pack" \
    -loop 1 -t 2.4 -i "$ing" \
    -loop 1 -t 2.6 -i "$life" \
    -filter_complex "[0:v]${CC}[v0];[1:v]${CC}[v1];[2:v]${CC}[v2];[v0][v1]xfade=transition=fade:duration=0.6:offset=1.8[x01];[x01][v2]xfade=transition=fade:duration=0.6:offset=3.6,format=yuv420p[vout]" \
    -map "[vout]" -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 24 -preset veryfast \
    -movflags +faststart -an "$dir/ad.mp4" \
    && { echo "  + $slug/ad.mp4 (montage)"; built=$((built+1)); } \
    || echo "  x $slug montage failed"
done
echo "✓ montage fallback: built $built clip(s)"
