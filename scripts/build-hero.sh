#!/usr/bin/env bash
# Build the hero scroll-scrub assets from the source animation.
# Output: AVIF frame sets (desktop + mobile), poster (avif+jpg), fallback mp4, manifest.
# Reproducible — safe to re-run. Requires ffmpeg (libsvtav1) + cwebp.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/assets/source/Product_animation_Organikally.mp4"
WORK="$ROOT/assets/hero-work"
OUT="$ROOT/public/hero"
FR_D="$OUT/frames/desktop"
FR_M="$OUT/frames/mobile"

DESKTOP_W=1600      # the video is the centrepiece now — render it crisp
MOBILE_W=1080
CRF_D=30            # high quality (lower = better); the hero must look great
CRF_M=36            # mobile frames
MOBILE_STRIDE=2     # keep every 2nd frame on mobile (120 frames, smoother)

echo "→ clean"
rm -rf "$WORK" "$FR_D" "$FR_M"
mkdir -p "$WORK/d" "$WORK/m" "$FR_D" "$FR_M" "$OUT"

echo "→ extract desktop PNGs @${DESKTOP_W}px"
ffmpeg -y -hide_banner -loglevel error -i "$SRC" \
  -vf "scale=${DESKTOP_W}:-2:flags=lanczos" -start_number 1 "$WORK/d/%04d.png"

echo "→ extract mobile PNGs @${MOBILE_W}px (every ${MOBILE_STRIDE})"
ffmpeg -y -hide_banner -loglevel error -i "$SRC" \
  -vf "scale=${MOBILE_W}:-2:flags=lanczos,select=not(mod(n\,${MOBILE_STRIDE}))" \
  -vsync 0 -start_number 1 "$WORK/m/%04d.png"

enc() { # $1 png dir, $2 out dir, $3 crf
  local n=0
  for png in "$1"/*.png; do
    n=$((n+1))
    printf -v idx "%04d" "$n"
    ffmpeg -y -hide_banner -loglevel error -i "$png" \
      -c:v libsvtav1 -crf "$3" -frames:v 1 "$2/f${idx}.avif" 2>/dev/null
  done
  echo "$n"
}

echo "→ encode desktop AVIF (crf ${CRF_D})"
D_COUNT=$(enc "$WORK/d" "$FR_D" "$CRF_D")
echo "→ encode mobile AVIF (crf ${CRF_M})"
M_COUNT=$(enc "$WORK/m" "$FR_M" "$CRF_M")

echo "→ poster (LCP) from frame 1"
cp "$WORK/d/0001.png" "$WORK/poster.png"
ffmpeg -y -hide_banner -loglevel error -i "$WORK/poster.png" -c:v libsvtav1 -crf 30 -frames:v 1 "$OUT/poster.avif" 2>/dev/null
cwebp -quiet -q 88 "$WORK/poster.png" -o "$OUT/poster.webp"
ffmpeg -y -hide_banner -loglevel error -i "$WORK/poster.png" -q:v 3 "$OUT/poster.jpg"

echo "→ fallback scrub mp4 (no audio, dense keyframes, faststart)"
ffmpeg -y -hide_banner -loglevel error -i "$SRC" \
  -an -movflags +faststart -g 12 -keyint_min 12 -sc_threshold 0 \
  -c:v libx264 -crf 24 -pix_fmt yuv420p -vf "scale=1280:-2:flags=lanczos" \
  "$OUT/hero-scrub.mp4"

# dimensions
read -r DW DH < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=' ' "$FR_D/f0001.avif" 2>/dev/null || echo "$DESKTOP_W 0")

echo "→ manifest"
cat > "$OUT/manifest.json" <<JSON
{
  "desktop": { "count": ${D_COUNT}, "width": ${DESKTOP_W}, "path": "/hero/frames/desktop", "ext": "avif" },
  "mobile":  { "count": ${M_COUNT}, "width": ${MOBILE_W}, "stride": ${MOBILE_STRIDE}, "path": "/hero/frames/mobile", "ext": "avif" },
  "poster":  { "avif": "/hero/poster.avif", "webp": "/hero/poster.webp", "jpg": "/hero/poster.jpg" },
  "fallbackVideo": "/hero/hero-scrub.mp4"
}
JSON

echo "→ sizes"
du -sh "$FR_D" "$FR_M" "$OUT/poster.jpg" "$OUT/hero-scrub.mp4" 2>/dev/null
echo "desktop frames: ${D_COUNT}  mobile frames: ${M_COUNT}"
echo "✓ hero assets built"
