# QA Checklist

Owner: `qa-engineer` + `uat-tester`. Status: **Phase 5 — passing in local/preview; cross-browser
device pass scheduled with the live URL in Phase 6.**

## Functional

- [x] Home renders all 12 sections in order, no overlap/overflow.
- [x] Scroll-scrub hero tracks scroll (light poster → deep-gold oil frame), buttery.
- [x] Header: transparent over hero → solid cream on scroll; logo/nav/CTA correct in both states.
- [x] Mobile menu opens/closes (hamburger + X + Esc); links + WhatsApp CTA work.
- [x] FAQ accordion expands/collapses; multiple can open.
- [x] All CTAs point to the WhatsApp flow (placeholder number until supplied).
- [x] Journal index lists 3 posts; each post renders with formatted body + back link.
- [x] Footer links, socials, FSSAI/legal placeholders present.
- [x] **Zero console errors/warnings** (home + journal).

## Responsive (verified in preview)

- [x] 375 (mobile): hero legible over scrim, CTAs stack, menu = sheet, sections single-column.
- [x] 768 (tablet): desktop nav shows, range = 2-col, product/sourcing reflow.
- [x] ~1024–1280 (desktop): full layouts, range = 4-col, product 2-col.
- [ ] 1440 / 1920: spot-check on the live URL.

## Media degradation

- [x] Desktop loads 240-frame set; **mobile loads only the 80-frame set** (verified via resource timing).
- [x] Poster is the canvas baseline; frames stream after first load.
- [ ] iOS Safari: confirm canvas scrub (frame-sequence, not `video.currentTime`) on a real device.
- [ ] Reduced-motion on device: static poster, no scrub.

## Performance (Lighthouse mobile, brotli — Cloudflare-equivalent)

- [x] Home: **Perf 100 · A11y 100 · Best 100 · SEO 100 · LCP 1.4s · CLS 0 · TBT 20ms**.
- [x] Post: Perf ~94 · A11y/Best/SEO 100 (text-LCP bound; run variance).
- Note: scores collapse to ~80 when served **uncompressed** (test artifact) — Cloudflare auto-compresses.

## Cross-browser (Phase 6, live URL)

- [ ] Chrome · [ ] Firefox · [ ] Safari (macOS) · [ ] iOS Safari.

## Links / assets

- [x] No broken internal links; `next/link` for routes, `<a>` for hash/external.
- [x] `sitemap.xml` + `robots.txt` present and valid; favicon resolves (no 404).
