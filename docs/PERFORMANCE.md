# Performance

Owner: `performance-optimizer`. Status: **hero pipeline built & proven (Phase 3); full
Lighthouse hardening in Phase 5.**

## Budget (enforced in Phase 5, mobile profile)

| Metric | Target | Notes |
|---|---|---|
| LCP | < 2.0 s | LCP element = static poster `<img>`, painted instantly — never the video/frames |
| CLS | < 0.1 | hero box reserves full viewport; poster has fixed object-cover |
| TBT | < 200 ms | motion libs dynamically imported; lean main thread |
| Lighthouse Perf | ≥ 95 | |
| Hero frame transfer (desktop) | ≤ 3–4 MB | progressive, immutably cached |

## Hero asset pipeline (`scripts/build-hero.sh`)

Source: `Product_animation_Organikally.mp4` (1920×1080, 24 fps, 240 frames, ~9.5 MB, audio).
Encoder choice (benchmarked on a worst-case frame): **AVIF via libsvtav1** beat WebP (cwebp)
and AVIF via libaom on size-at-quality and speed.

| Output | Spec | Size |
|---|---|---|
| Desktop frames | 240 × AVIF, 1280px, crf 48 | **3.9 MB** |
| Mobile frames | 80 × AVIF (every 3rd), 900px, crf 50 | **756 KB** |
| Poster | AVIF / WebP / JPG (LCP + fallbacks) | 11 / 26 / 60 KB |
| Fallback scrub mp4 | H.264, no audio, dense keyframes, faststart, 1280px | 2.8 MB |

Raw PNG intermediates live in `assets/hero-work/` (git-ignored); the optimised AVIF set is
committed because Cloudflare's build environment has no ffmpeg.

## LCP & loading strategy

- Poster `<img fetchpriority="high">` (`<picture>` avif→webp→jpg) is the LCP element.
- Canvas paints the poster as its baseline, then **progressively** loads frames: a 24-frame
  prime batch first (smooth early scroll), then the rest in the background.
- Device-appropriate set chosen at init: `<768px` → mobile (80f / 756 KB), else desktop.
- `prefers-reduced-motion: reduce` → static poster only, no scrub, no frame preload.
- GSAP/Lenis dynamically imported → initial First Load JS ~107 kB.

## Verified in Phase 3

Build green; no console errors; canvas frame demonstrably tracks scroll (light poster frame →
deep-gold oil frame); mobile correctly requests only the 80-frame set.

## Open / Phase 5

- Run Lighthouse (mobile) and tune to all-green.
- Cloudflare `_headers`: immutable long-cache for `/hero/*`, `/_next/static/*`; short for HTML.
- **Scrim strengthening for AA** over the lightest video frames (with `accessibility-specialist`).
- Consider re-tuning desktop crf if budget pressure appears after real-network testing.
