# Organikally — Landing Page

Official landing page for **Organikally** — *Pure · Natural · Trusted*.
An Indian organic food brand led by cold-pressed Yellow Mustard Oil (शुद्ध सरसों तेल),
with a growing range of pulses, khand (unrefined jaggery sugar) and organic pantry staples.

## What this is

A content-static, CDN-hosted marketing site whose centrepiece is a full-page,
scroll-driven hero video that scrubs frame-by-frame as the visitor scrolls. The
single job of the page: make a first-time visitor understand within ~5 seconds
that this is a trustworthy, authentic, organic Indian food brand — and feel that
authenticity in the craft of the page itself — then make buying / enquiring effortless.

## Stack

- **Next.js** (App Router, `output: 'export'` — fully static)
- **Tailwind CSS** with a tokenised brand theme
- **GSAP + ScrollTrigger** (scroll-scrub hero & reveals) · **Lenis** (smooth scroll)
- **TypeScript** (strict)
- Pre-optimised AVIF/WebP assets
- Deployed to **Cloudflare Pages** (global CDN, immutable media caching)

## Repo layout

```
assets/source/      Original brand assets (video, stills, logo)
docs/               PRD, brand, SEO, CRO, architecture, decisions, compliance…
public/hero/        Optimised hero frames / poster / scrub video (generated)
src/                Application code (added in build phase)
MANUAL_STEPS.md     Founder-only tasks (CTAs, FSSAI no., Cloudflare, real reviews)
CLAUDE.md           Operating context & house rules for contributors
```

## Performance budget

Lighthouse (mobile): **Perf ≥ 95 · LCP < 2.0s · CLS < 0.1 · A11y ≥ 95 · SEO = 100**.
The LCP element is a static poster frame painted instantly — never the video.

## Status

🚧 In active development. See [`docs/DECISIONS.md`](docs/DECISIONS.md) for the running log
and [`docs/PRD.md`](docs/PRD.md) for scope.
