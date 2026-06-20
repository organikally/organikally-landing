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

## Phase 5 — Lighthouse results (mobile, brotli = Cloudflare-equivalent)

Home page: **Performance 100 · Accessibility 100 · Best Practices 100 · SEO 100** ·
**LCP 1.4s · FCP 0.8s · CLS 0 · TBT 20ms · SI 1.2s**. Journal posts: Perf ~94 (text-LCP bound),
all other categories 100.

### Critical finding — compression is decisive

Served **uncompressed**, the home page scored Perf **80 / LCP 5.4s** — the #1 opportunity was
"Enable text compression" (the 119KB HTML downloads slowly on throttled 4G). Served with brotli
(home HTML → **12.9KB**), it scored **100 / LCP 1.4s**. **Cloudflare Pages auto-compresses text
assets (brotli/gzip)**, so production matches the compressed result. Never benchmark against an
uncompressed static server.

### Fixes applied this phase

- Optimised the product bottle **908KB PNG → 27KB WebP** (it was being auto-preloaded, hogging
  the network); removed the unused PNG.
- Added a high-priority **poster preload**; set Tiro Devanagari `preload: false` (frees the LCP path).
- **Deferred frame streaming + GSAP/Lenis until after `load`** so they never compete with the LCP.
- Added a **favicon** (emblem crop) — removed the 404 console error.
- Fixed footer text contrast → Accessibility 100.

## Open (Phase 6)

- Cloudflare `_headers`: immutable long-cache for `/hero/*`, `/_next/static/*`; short for HTML.
- Re-run Lighthouse on the live URL; cross-browser + real-device (iOS scrub, reduced-motion) pass.
