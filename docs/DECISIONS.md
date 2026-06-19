# Decisions Log

Append-only record of cross-agent decisions. Newest first. Format:
`YYYY-MM-DD · area · decision · rationale`.

## 2026-06-20 · Phase 0 — Setup

- **Repo** created at `organikally/organikally-landing` (private). Owner org `organikally`
  exists; primary GitHub account `dimssu`.
- **Hero source video verified** (`ffprobe`): 1920×1080, H.264 High, `yuv420p`, **24 fps,
  240 frames, 10.0s**, video bitrate ~7.84 Mbps, container ~9.99 MB, **one AAC audio track
  to strip**. Confirms the brief's spec (≈9.5 MB @ ~8 Mbps). Frame-sequence scrub is viable
  (240 frames → manageable AVIF/WebP set at ≤1600px render width).
- **Design taste layer**: `ui-ux-pro-max` and `taste-skill` already available in the
  environment — both confirmed installed (see `docs/SKILLS.md`). All UI routes through them.
- **Assets staged**: official logo (`organikally-logo.jpeg`, white bg — transparent/SVG
  derivative is a pipeline task), bottle-on-white, lifestyle poster, 4 hero composites.
  Logo blocker resolved.
- **Stack** locked per brief: Next.js static export, Tailwind, GSAP/ScrollTrigger, Lenis,
  TypeScript strict, Cloudflare Pages.

## 2026-06-20 · Phase 1 — Strategy

- **18-agent team** defined in `.claude/agents/*.md` (Role · Mandate · Responsibilities ·
  Inputs · Outputs · Done-when each).
- **Strategy locked**: `AUDIENCE.md`, `BRAND.md`, `CRO.md`, `SEO.md`, `COMPLIANCE.md` (starter),
  `PRD.md` (section spec + Definition of Done).
- **Positioning**: "Cold-pressed, organic, honestly made — the pantry you'd trust for your own
  family." Trust architecture ranks **cold-press process first**, then sourcing/provenance, then
  certification/FSSAI — purity is *shown*, not asserted (answers the adulteration anxiety).
- **Personas**: (1) health-led home cook, (2) diaspora nostalgist/gifter, (3) conscious trade
  buyer. Page leads with mustard oil, signals the range for credibility.
- **CRO**: primary action = Buy/Order; **WhatsApp-first** as the low-friction default until the
  founder supplies the store/marketplace destination. Privacy-friendly, cookieless analytics.
- **Compliance stance**: "100% Organic" is **conditional** on valid certification; immunity
  claims dropped; cold-pressed/cholesterol-free safe; MUFA/Omega-3 & antioxidants kept as
  composition (no disease claims). FSSAI no. slotted in footer (founder-supplied).
- **Palette/type intent** set: forest/green + gold + cream + mustard; warm serif headings +
  clean sans body, to be finalised through `ui-ux-pro-max` + `taste-skill` in Phase 2.

## 2026-06-20 · Phase 2 — Design system

- **Direction**: Storytelling-driven, heritage-organic editorial — validated through
  `ui-ux-pro-max` (style: Storytelling-Driven; landing: Trust & Authority + Scroll Storytelling)
  and pressure-tested for anti-slop via `taste-skill`. Full spec in `docs/DESIGN_SYSTEM.md`.
- **Type**: `Fraunces` (display serif) + `Hanken Grotesk` (body) + `Tiro Devanagari Hindi`
  (Hindi accent) — deliberately one notch off the templated Playfair+Inter / Cormorant+Montserrat
  defaults the skill surfaced, for warmth + craft without the slop. All OFL, self-hostable.
- **Colour**: warm cream `#FAF7EF` base, forest/green, gold as *precious accent only*. Critical
  AA decision: bright gold fails small-text contrast → introduced **`--gold-ink #7A5E15`** as the
  text-safe accent; bright gold/mustard are decoration-only. AA pairs locked in the doc.
- **Overlay system**: video is connective tissue (hero + transitions); dense content rides on
  opaque cream/forest panels scrolling *over* it; sparse copy floats on a forest scrim
  (`--scrim-strong`); frosted panel for the in-between. Worst-case scrub frame governs scrim strength.
- **Shape/feel**: restrained radii (no pill-everything), soft warm-tinted shadows, paper-grain
  texture, Lucide 1.5px icons, generous section rhythm (128–160px desktop).
- **Artifact**: `docs/design/style-tile.html` — brand-accurate, self-contained, browser-viewable.

## 2026-06-20 · Phase 3 — Hero engineering

- **App scaffolded** (hand-rolled, not create-next-app, to avoid template slop): Next.js 15
  static export, React 19, TS strict, Tailwind 3.4 with the token pipeline, self-hosted fonts
  via `next/font`. `npm run build` green — First Load JS ~107 kB. See `docs/ARCHITECTURE.md`.
- **Encoder benchmarked**: AVIF via **libsvtav1** chosen over WebP/libaom (best size-at-quality
  + speed). Desktop 240 frames @1280/crf48 = **3.9 MB** (in budget); mobile 80 frames
  @900/crf50 = 756 KB. Poster (avif/webp/jpg) is the LCP element. See `docs/PERFORMANCE.md`.
- **Decision — commit the optimised AVIF frames** (not regenerate in CI): Cloudflare's build
  has no ffmpeg, so the deploy must be self-contained. Raw PNGs stay git-ignored.
- **Hero proven** via live preview: canvas frame tracks scroll (poster→deep-gold oil pixel
  confirmed), overlay content reads premium over the video, mobile loads only the 80-frame set,
  zero console errors. GSAP/Lenis dynamically imported to keep first-load JS lean.
- **Tracked follow-up**: the scrim over the *lightest* video frames needs strengthening for AA
  text contrast — owned by `accessibility-specialist` (Phase 5), tightened during Phase 4 build.

## 2026-06-20 · Phase 4 — Build

- **All 12 sections built** with final compliant copy: hero, trust strip, story, video
  interstitial, product, range (scalable grid), sourcing (3-step process), social proof
  (flagged placeholders), recipes/usage, journal teaser, FAQ (accordion), conversion, footer.
  Component system under `src/components/{ui,sections,layout,blog,seo}`.
- **Static blog** under `/journal` with 3 E-E-A-T seed posts (cold-pressed vs refined, spotting
  organic staples, yellow vs black), typed block content, `BlogPosting` schema per post.
- **SEO/schema** wired: `Organization`, `WebSite`, `Product`, `FAQPage` on home; `BlogPosting`
  + `BreadcrumbList` on posts; `sitemap.xml` + `robots.txt` static-generated; per-page metadata,
  OG/Twitter. Verified present in exported HTML.
- **Critical fix — colour tokens**: the theme used hex CSS vars, so Tailwind `/opacity`
  utilities silently rendered **transparent** (scrims, frosted panels, muted text all broken,
  caught in live QA). Refactored to RGB-channel triplets + `rgb(var(--x) / <alpha-value>)`.
  Now every scrim/overlay/tone resolves correctly — the over-video AA legibility works.
- **Scrim + text-shadow** strengthened on hero/interstitials so cream copy is legible over the
  lightest frames (the tracked Phase-3 follow-up — final AA measurement in Phase 5).
- **Bottle on white** framed in a deliberate white product card (a transparent cutout stays a
  nice-to-have founder asset).
- **Motion**: lightweight `Reveal` (IntersectionObserver, reduced-motion safe) for section
  reveals; hero canvas scrub unchanged.
- **Lucide** added for iconography (tree-shaken). `lucide-react` is the only new dep.
- Compliance: copy uses the approved claim set; "100% Organic" remains **conditional on the
  founder's certification** (footer FSSAI slot + cert are MANUAL_STEPS items).

<!-- New entries above this line -->
