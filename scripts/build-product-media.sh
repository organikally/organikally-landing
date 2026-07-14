#!/usr/bin/env bash
# Optimise the per-product shoot (assets/media-work/products/<slug>/*.png + ad.mp4)
# into the committed storefront assets under public/media/products/<slug>/:
#
#   pack.{avif,webp,jpg}         label-placeholder pack shot (also the primary/card image)
#   ingredient.{avif,webp,jpg}   raw-material hero
#   lifestyle.{avif,webp,jpg}    in-use / cooked context
#   ad.mp4 + ad-poster.jpg       short product commercial (Veo) — optional
#
# Reproducible: safe to re-run. Stills are 1024² squares from the generator, so we
# just scale + apply the house warm grade (matches build-media.sh) — no hard crop.
# Any product missing a still is skipped with a warning, not a hard failure, so a
# partial media run still produces everything it can.
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/assets/media-work/products"
OUT="$ROOT/public/media/products"
GRADE="eq=saturation=1.05:contrast=1.03:gamma=1.01"
STILL_W=1000
STILLS=(pack ingredient lifestyle)

mkdir -p "$OUT"

# Optional filter: pass one or more slugs to rebuild just those.
FILTER=("$@")
want() {
  [ ${#FILTER[@]} -eq 0 ] && return 0
  for f in "${FILTER[@]}"; do [ "$f" = "$1" ] && return 0; done
  return 1
}

imgs=0; vids=0; missing=0
for dir in "$SRC"/*/; do
  slug="$(basename "$dir")"
  [ "$slug" = "_"* ] && continue
  want "$slug" || continue
  dest="$OUT/$slug"
  mkdir -p "$dest"

  for name in "${STILLS[@]}"; do
    in="$dir$name.png"
    if [ ! -f "$in" ]; then
      echo "  ! $slug/$name.png missing — skipped"; missing=$((missing+1)); continue
    fi
    vf="crop='min(iw,ih)':'min(iw,ih)',scale=${STILL_W}:-2:flags=lanczos,${GRADE}"
    tmp="$dest/$name.tmp.png"
    ffmpeg -y -hide_banner -loglevel error -i "$in" -vf "$vf" -frames:v 1 "$tmp"
    ffmpeg -y -hide_banner -loglevel error -i "$tmp" -c:v libsvtav1 -crf 32 -frames:v 1 "$dest/$name.avif" 2>/dev/null
    cwebp -quiet -q 82 "$tmp" -o "$dest/$name.webp" >/dev/null 2>&1
    ffmpeg -y -hide_banner -loglevel error -i "$tmp" -q:v 4 "$dest/$name.jpg"
    rm -f "$tmp"
    imgs=$((imgs+1))
  done

  # Short product commercial (optional). Re-encode lean + web-friendly + faststart.
  if [ -f "$dir/ad.mp4" ]; then
    ffmpeg -y -hide_banner -loglevel error -i "$dir/ad.mp4" \
      -vf "scale='min(720,iw)':-2:flags=lanczos" \
      -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 26 -preset veryfast \
      -movflags +faststart -an "$dest/ad.mp4"
    # Poster = first frame of the clip (falls back to pack.jpg on the storefront).
    ffmpeg -y -hide_banner -loglevel error -i "$dir/ad.mp4" -frames:v 1 -q:v 3 "$dest/ad-poster.jpg"
    vids=$((vids+1))
    echo "→ $slug  (3 stills + ad.mp4 $(du -h "$dest/ad.mp4" | cut -f1))"
  else
    echo "→ $slug  (stills only — no ad.mp4 yet)"
  fi
done

echo "✓ product media built → public/media/products/  (stills:$imgs videos:$vids missing:$missing)"
