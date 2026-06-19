# Design System

Owner: `ui-ux-designer`, built through `ui-ux-pro-max` + `taste-skill`. The visual spec the
frontend implements 1:1. Status: **Phase 2 lock candidate.**

## Direction (one intentional choice)

**Storytelling-driven, heritage-organic editorial.** Warm, earthy-premium, calm, trustworthy.
Farm-to-bottle heritage meets clean modern craft. The page reads like a considered print
piece that happens to move — *not* a loud FMCG promo, *not* a startup template. Validated
against `ui-ux-pro-max` (style: Storytelling-Driven; landing: Trust & Authority + Scroll
Storytelling) and pressure-tested for anti-slop via `taste-skill`.

**Anti-slop guardrails (do-not):** Playfair+Inter pairing, purple/indigo SaaS gradients,
glassmorphism everywhere, emoji icons, pill-everything, stocky drop-shadows, centered-hero-
with-two-buttons cliché, generic "Trusted by" logo wall. Gold is a *precious accent*, never a flood.

## Color tokens

Warm cream base, deep organic greens, gold as accent, mustard for product moments. Raw values
below become CSS variables → Tailwind theme (stack-architect owns the pipeline).

| Token | Hex | Role |
|---|---|---|
| `--cream` | `#FAF7EF` | primary surface (warm ivory) |
| `--cream-deep` | `#F2E9D6` | alternating section / card wells |
| `--forest` | `#0E3B14` | darkest green — dark sections, footer |
| `--green` | `#1B5E20` | primary brand green (buttons, headings accents) |
| `--green-700` | `#27692B` | hover/active green |
| `--gold` | `#C9A227` | decorative gold (large/deco only) |
| `--gold-bright` | `#E2B84B` | gradient highlight, oil shimmer (deco only) |
| `--gold-ink` | `#7A5E15` | **text-safe gold** — eyebrows, small accents on cream (AA) |
| `--mustard` | `#E5B23C` | product / oil moments (deco) |
| `--charcoal` | `#1F1B12` | body text on cream (warm near-black) |
| `--charcoal-60` | `#5A5343` | muted/secondary text on cream |
| `--line` | `#E4D9C2` | hairline borders on cream |

**Contrast — locked AA pairs (text):**
`--charcoal` on `--cream` ≈ 14:1 (AAA) · `--forest` on `--cream` ≈ 9:1 · `--cream` on
`--forest` ≈ 9:1 · `--gold-ink` on `--cream` ≈ 5.6:1 (AA) · `--charcoal-60` on `--cream`
≈ 5:1 (AA). **`--gold`/`--gold-bright` FAIL AA for small text — decoration / large display only.**
Over the video, text is always `--cream`/white on a scrim (see Overlay system).

## Typography

Self-hosted, subset, `font-display: swap`, preloaded (heading + body only). All OFL —
self-hostable (via `@fontsource` or Google Fonts download). No FOIT.

- **Display / headings — `Fraunces`** (old-style soft serif, optical sizing). Warmth and
  craft of heritage print without Playfair's overuse; echoes the logo wordmark's elegance.
  Weights 400/500/600/9pt–144pt optical. Use `opsz` high for hero, tighter tracking on large.
- **Body / UI — `Hanken Grotesk`** (warm, legible neo-grotesque). Clean and modern, friendlier
  than Inter/Montserrat. Weights 400/500/600/700.
- **Devanagari accent — `Tiro Devanagari Hindi`** for शुद्ध सरसों तेल and Hindi terms — graceful,
  pairs with the serif. Spelled correctly, never the label's typo'd form.

**Type scale** (fluid via `clamp`, desktop reference): 12 · 14 · 16(base) · 18 · 21 · 28 ·
38 · 52 · 72 · 96. Body 16–18px, line-height 1.6, measure 60–72ch. Headings line-height
1.05–1.15, tracking −0.01 to −0.02em on large display. Eyebrows: 12–13px, uppercase,
tracking 0.16em, `--gold-ink`.

## Spacing, grid & shape

- **Spacing scale (4px base):** 4 8 12 16 20 24 32 40 48 64 80 96 128 160.
- **Section rhythm (generous, premium):** mobile `py` 72–96px; desktop 128–160px. Big air
  between sections — confidence, not clutter.
- **Container:** max-width 1200px; gutters 24px (mobile) → 40–64px (desktop). 12-col grid.
- **Radii:** sm 8 · md 12 (buttons) · lg 16 · xl 20 (cards). Restrained, not pill-everything.
- **Shadows (soft, warm-tinted — never gray slab):**
  `--shadow-sm: 0 1px 2px rgba(31,27,18,.06)` ·
  `--shadow-md: 0 8px 24px -10px rgba(31,27,18,.14)` ·
  `--shadow-lg: 0 24px 60px -24px rgba(14,59,20,.22)`. Prefer hairlines + cream layering over heavy shadow.
- **Texture:** subtle paper/linen grain overlay (~3–5% opacity) on cream surfaces; never glossy plastic.
- **Icons:** Lucide, 1.5px stroke, consistent sizing (`icon-sm 18`, `icon-md 22`, `icon-lg 28`).
  Motifs: leaf, droplet, sprout, shield-check, sun. SVG only — no emoji.

## The overlay system (content over the scrubbing video)

The video is the **connective tissue**, full-bleed at the hero and at section transitions.
Dense content rides on **opaque cream/forest panels that scroll over the video** — legibility
is bulletproof and the reveal of the video between panels is the premium moment. Text *floats
directly on video* only where copy is sparse (hero headline, section interstitials), always
on a scrim.

- `--scrim-strong`: `linear-gradient(180deg, rgba(14,59,20,.72) 0%, rgba(14,59,20,.30) 45%, rgba(14,59,20,.68) 100%)` — text-dense over video.
- `--scrim-soft`: radial/vertical forest tint ~30–40% — sparse hero copy.
- **Frosted panel** (hero copy card, trust strip over video): `backdrop-filter: blur(14px)`,
  `background: rgba(250,247,239,.72)`, hairline `--line`, `--shadow-md`. Text = `--charcoal`/`--forest`.
- Floating-on-video text: `--cream`/white, weight ≥500, with a subtle text-shadow fallback +
  the scrim. `accessibility-specialist` verifies AA at **every scroll position** (the frame
  behind changes as it scrubs) — worst-case frame governs the scrim strength.

## Components

- **Buttons.** Primary: `--green` bg / `--cream` text, radius 12, `min-height 48px`, generous
  padding; hover → `--green-700` + 1px lift + `--shadow-md`; focus ring 2px `--gold-ink` offset.
  Secondary: 1.5px `--forest` outline on transparent, text `--forest`; hover fills `--cream-deep`.
  On video: primary becomes solid `--forest` or `--mustard` (AA-checked). Tertiary/link:
  `--gold-ink` with animated underline. `cursor-pointer`, `touch-action: manipulation`.
- **Trust chip/badge.** Pill, `--cream`/translucent bg, hairline, Lucide icon (`--gold-ink`)
  + label (`--charcoal`). FSSAI · Organic · Cold-Pressed · Cholesterol-Free.
- **Product tile.** Ivory image well (consistent aspect-ratio, reserve space → no CLS),
  serif name, one-line sans descriptor, price/CTA slot. Grid `auto-fill minmax(240px,1fr)` so
  **the range grows without redesign.** Hover: subtle scale 1.02 on image + lift.
- **Navbar.** Transparent over hero (logo left, links center/right, primary CTA). On scroll
  past hero → `--cream` solid, hairline bottom, `--shadow-sm`; logo swaps to the dark-on-cream
  lockup. Mobile: hamburger → full-height sheet. Sticky compact CTA appears after hero.
- **Section header.** Gold-ink eyebrow (uppercase, tracked) → serif `h2` → optional sans intro
  (≤2 lines). Consistent across all sections.
- **FAQ accordion.** Serif question + chevron (rotates), sans answer, smooth height; one-at-a-
  time optional; maps to `FAQPage` schema. Keyboard operable, `aria-expanded`.
- **Testimonial card.** Quote (serif, generous), name + location + optional avatar; **placeholder
  state clearly labelled** until real reviews land.
- **Footer.** `--forest` bg, `--cream` text, gold accents. Columns: brand+tagline, range,
  company, contact + **FSSAI licence no. slot**. Socials (Lucide), legal row, veg-mark slot.

## Motion intent (handoff to `motion-animation-expert`)

- Reveals: fade + 16–24px rise, 450–600ms, ease-out (`cubic-bezier(.16,1,.3,1)`), stagger 40ms.
- Hero: canvas frame-scrub (see Phase 3); section panels slide/parallax gently over the video.
- Micro: button press scale .98; underline grows; chevron rotate. Durations 150–300ms.
- `prefers-reduced-motion`: disable scrub + parallax + staggers; show poster + instant content.
- One restrained three.js/oil-drop accent permitted only if LCP-safe.

## Responsive

Breakpoints 375 / 768 / 1024 / 1440 / 1920. Mobile-first; `min-h-dvh` not `100vh`; no horizontal
scroll; tap targets ≥44px; type/measure clamps per breakpoint; gutters widen with viewport.

## Deliverable to frontend

This doc + the token table (drop-in CSS vars / Tailwind theme) + the component specs above +
the visual style tile rendered at the Phase 2 gate. Stack-architect wires tokens in Phase 3/4.
