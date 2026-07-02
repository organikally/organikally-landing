# Ojasya-Replication Spec — the after-hero landing, rebuilt 1:1

This SUPERSEDES `HOMELY_REFACTOR.md`. The founder wants the **actual Ojasya Naturals
section designs replicated** for Organikally — not our old editorial theme warmed up.
Reference: https://ojasyanaturals.com. We keep our **film hero**; **everything after it**
is rebuilt in Ojasya's visual language, adapted to Organikally's products (cold-pressed
**Yellow Mustard Oil** + organic pantry — NOT ghee) and kept FSSAI-compliant.

Read `organikally-landing/CLAUDE.md` too (mission, compliance gate, perf budget, no AI
attribution). This file is the visual/IA law for the rebuild.

---

## 0. The look, in one breath

Warm **cream/ivory** page · **deep forest-green** as the primary (headings, frames,
trust bar) · **gold/mustard** accents (thin bottom strips, underlines, badges) · **rust**
eyebrows · **heavy UPPERCASE geometric headings** (Poppins ExtraBold) · **Indian
ornamental dividers** flanking every section title · illustrated pastel farm scenes ·
soft rounded cards with hairline forest borders · a faint line-art "ghar/press" watermark
behind some sections. Homely, traditional, trustworthy, a little festive. Forest-green is
literally Organikally's documented primary brand colour (CLAUDE.md palette table), so this
is on-brand, not a reskin away from it.

## 1. Tokens (added to globals.css + tailwind.config — DO NOT invent others)

CSS vars (channels for `rgb(var(--x)/<alpha>)`):
```
--forest: 30 71 43;        /* #1E472B — headings, frames, timeline nodes */
--forest-deep: 18 51 30;   /* #12331E — trust bar, dark bands, footer */
--cream: 243 241 231;      /* #F3F1E7 — the Ojasya page ground (warmer than --paper) */
--rust: 166 74 40;         /* #A64A28 — eyebrows ("100% COLD-PRESSED"), question labels */
```
Keep existing: `paper surface yellow yellow-deep yellow-ink(gold-ink) ink ink-muted
ink-faint line`. Tailwind colors to add: `forest{DEFAULT,deep}`, `cream`, `rust`. The
after-hero page background is **`bg-cream`** (change the Act-2 wrapper in page.tsx from
`bg-paper` to `bg-cream`). Gold = existing `yellow`. **Primary accent is now forest-green;
gold is the secondary/festive accent.**

## 2. Type

Add **Poppins** via `next/font/google` as `--font-heading` (weights 600 700 800), Tailwind
`fontFamily.heading`. Ojasya section titles / product names / benefit headings =
`font-heading font-extrabold uppercase tracking-[-0.01em] text-forest`. Body stays
**Bricolage** (`font-sans`). Keep Chelsea Market (`--font-display`) ONLY for the film hero.
Hindi = `font-deva`. Numeric = `.tnum`.

## 3. Shared chrome (build these NEW primitives; every section reuses them)

- **`Ornament.tsx`** — an inline SVG of a symmetric Indian flourish (a slim horizontal
  motif: center diamond + dotted/curl tails). Props: `className`, `flip` (mirror). Forest
  or rust stroke via `currentColor`. ~120×16, `aria-hidden`.
- **`SectionTitle.tsx`** — centered section header: `<Ornament/>` TITLE `<Ornament flip/>`,
  TITLE = `font-heading font-extrabold uppercase text-forest` at a big clamp size, letters
  tracked slightly tight. Props: `children`, optional `align='center'|'left'`, optional
  `eyebrow` (rust, uppercase). Wrap in `Reveal`. This replaces bare `h2` across sections.
- **`GoldStrip.tsx`** — a full-bleed `bg-yellow` bar, ~8px, the Ojasya section-foot accent.
  Use sparingly at major section boundaries.
- A faint **watermark**: `bg-[url(/media/ghar-watermark.svg-or-img)]`-style optional layer
  at ~4–6% opacity behind Benefits/Quiz (use the generated `ghar-line` image if present;
  else omit — never block on it).

Reuse existing `Cta`, `Media`, `Reveal`. Lucide icons only, no emoji.

## 4. Sections — rebuild each to match the reference (order after the film hero)

Anchors in [] must be kept (used by nav). Each `<section className="relative py-16 md:py-24">`
on `bg-cream`, container `mx-auto max-w-container px-5 md:px-10`, opens with `<SectionTitle>`.

### 4.1 TrustBar  [replaces TrustStrip]
A full-bleed **deep forest-green bar** (`bg-forest-deep text-cream`) sitting right under the
hero. 4–5 items, each `Lucide icon + short label`, split by faint vertical dividers, wraps on
mobile. Labels (verifiable only): **Cold-Pressed Kachi Ghani · Organically Grown Seed ·
Nothing Refined Out · Press-Dated Freshness · Pan-India Delivery**. NO invented discount.

### 4.2 Journey  [id="sourcing"]  [replaces Sourcing] — the hero infographic
Ojasya "THE TRADITIONAL JOURNEY OF OUR GHEE" → **"THE TRADITIONAL JOURNEY OF OUR OIL"**.
Two-column on desktop: **left** = a tall illustrated art panel (`Media name="journey-art"`,
a flat pastel illustration: mustard field + farmhouse + a farmer with bullock at bottom, a
tree with small birds top, cream ground) with a big `font-heading` uppercase forest title
overlaid/beside it; **right** = a **vertical dashed timeline** with **5 numbered circular
nodes** (forest-green disc, cream number) each linked to a rounded-rect white card:
`small circular photo + font-heading title + one line`. Steps (5, adapted, compliant):
1. **Grown Organically** (`step-grown`) — Yellow mustard grown without synthetic inputs.
2. **Cleaned & Sorted** (`seed-macro`) — Seed hand-sorted and cleaned before pressing.
3. **Cold-Pressed in Kachi Ghani** (`step-pressed`) — Crushed slow, no heat, no solvents.
4. **Settled & Filtered** (`step-bottled`) — Rested and filtered, nothing refined out.
5. **Bottled & Press-Dated** (`step-kitchen`) — Sealed fresh, the press date on every bottle.
Mobile: the timeline stacks (node + card), art panel on top. Keep it lightweight (photos via
`Media`, illustration via `Media`).

### 4.3 ColdPressedWay  [id="benefits"]  [replaces Benefits] — benefit constellation
Ojasya "THE AYURVEDIC WAY OF LIFE" → **"THE COLD-PRESSED WAY"**. **Center** = the product
(`Media name="pour"` or the `/brand/product-bottle.webp` with a soft golden glow); **four
benefit blobs** arranged 2-left / 2-right (desktop), each = an **organic-blob-masked circular
photo** (`Media name="benefit-1..4"`, inline `borderRadius` blob + forest ring) + a
`font-heading` uppercase forest heading + one compliant sentence, **connected to the center
by dashed curved SVG lines** (draw with an absolutely-positioned SVG on desktop; hide on
mobile where blobs stack in a 2-col grid). Copy = **approved claims ONLY** (no medical):
- **HIGH IN MUFA & OMEGA-3** — naturally high in MUFA, carries Omega-3 into everyday cooking.
- **RICH IN ANTIOXIDANTS** — unrefined, so the antioxidants the seed holds stay in the bottle.
- **COLD-PRESSED & UNREFINED** — kachi ghani, no added heat, no solvents; golden and whole.
- **ORGANICALLY GROWN** — pressed from mustard grown organically, single trusted source.

### 4.4 Quiz  [id="match"]  [replaces Quiz] — "WHICH OIL IS BEST FOR YOU?"  ('use client')
Ojasya split card. **Left** = a warm festive photo panel (`Media name="quiz-portrait"` — a
home cook with Organikally oil bottles, diyas/marigold, brass; rounded-card). **Right** = a
cream/`surface` card: rust `QUESTION 01 / 02` label, a bold `font-heading`-ish question, and
**large stacked answer buttons** (white, rounded, hairline forest border, hover lifts, a
trailing `ArrowRight`). Keep OUR 2-step logic + result card (real WhatsApp order path, trade
line, range nudge) from the current Quiz — only restyle to this split layout and add the
ornamental top+bottom title bands. Keyboard-operable, `aria-live` result.

### 4.5 Range  [id="range"]  [replaces Range] — "PRODUCT RANGE" postage stamps
Ojasya postage-stamp cards. Title `<SectionTitle>PRODUCT RANGE</SectionTitle>`. A 4-up grid
(2-up tablet, 1-up mobile) of **postage-stamp framed cards**: a **scalloped/perforated
forest-green stamp border** (achieve with a `bg-forest` panel + a CSS mask/`radial-gradient`
dashed edge, or an SVG stamp frame — do it cleanly, no raster), an **illustrated product
image** inside (`Media name="stamp-oil|stamp-dals|stamp-khand|stamp-pantry"`), then below the
frame: a **rust uppercase eyebrow** (`100% COLD-PRESSED` / `ORGANICALLY GROWN`), a
`font-heading` uppercase forest product name, and a short **gold underline**. Data from
`src/content/products.ts` (Yellow Mustard Oil, Pulses & Dals, Khand, Pantry Staples). Cards
link to `/store/` (or the product). Keep it tasteful; the stamp edge must render crisply.

### 4.6 Shop  [id="shop"]  [NEW ShopTeaser] — "SHOP PURE PRODUCTS"
Ojasya shop grid, on-brand & HONEST. Title `<SectionTitle>SHOP PURE PRODUCTS</SectionTitle>`
+ a filter tab row (All Products · Mustard Oil · Dals · Khand · Pantry — client-side filter,
or plain anchors). 4 product cards: `Media` product shot (`shop-oil|shop-dals|shop-khand|
shop-pantry`), a `font-heading` name, a short honest trust line (NO fake "1700+ bought", NO
fabricated star counts — use e.g. "Loved in home kitchens" or a real certification line), and
an action row → **"Shop on WhatsApp"** (`Cta whatsapp`) and/or **"View in store"** (`/store/`).
**Pricing:** we do NOT have real landing-side prices; do NOT invent them. Either omit price and
send to `/store/` for live pricing, or show "Order direct" — never a made-up ₹/MRP/%OFF.
Rounded-card, hairline forest border, hover lift, outlined pill CTA in the Ojasya style.

### 4.7 Restyle the sections we keep (into the same forest/cream/gold + ornament system)
`Proof`, `Product`, `Compare`, `SocialProof`, `Recipes`, `JournalTeaser`, `Faq`, `Conversion`,
`SiteHeader`, `SiteFooter` — swap headings to `<SectionTitle>`/`font-heading`, backgrounds to
`bg-cream`/`bg-surface`, accents to forest-green (borders, icons, rings) with gold for
highlights, and add ornamental dividers where a section title appears. `Conversion` and
`SiteFooter` become **deep forest-green** bands (`bg-forest-deep text-cream`) with gold CTAs.
FAQ accordion: forest headings, gold `+` control. Keep all ids/props/data/`'use client'`.

## 5. Compliance & honesty (HARD — CLAUDE.md food-claims gate)
- **Approved claims ONLY:** Cold-Pressed · Kachi Ghani · Organically Grown / from organically
  grown seed · High in MUFA & Omega-3 · Rich in Antioxidants · Cholesterol-free (like all
  vegetable oils) · Unrefined / nothing refined out · High smoke point (culinary) · Press-dated
  freshness · sensory (golden colour, natural pungency/aroma).
- **NEVER:** medical/therapeutic outcomes (Ojasya's "boosts immunity / improves digestion /
  enhances energy / gut wellness / vitamins A D E K" — DO NOT COPY), "100% organic" absolute,
  self-asserted "FSSAI compliant", competitor disparagement, "toxic"/scare copy.
- **NEVER fabricate data:** no invented review counts ("45+ Reviews", "1700+ bought"), no
  invented prices / MRP / "% OFF" / discount urgency ("35-40% OFF"). If we don't have a real
  number, we don't show one. This keeps us honest AND on-brand ("never a loud discount-FMCG site").
- Never reproduce label typos. One warm, plain, first-person register. Em-dashes are fine.

## 6. Perf & a11y (enforced)
LCP < 2.0s, CLS < 0.1. Images via `Media` with width/height + `sizes`, lazy below the fold.
No new heavy deps. Client JS stays tiny (Quiz + existing). WCAG AA contrast (forest-green on
cream and cream on forest both pass), visible focus, keyboard-operable, responsive 320→1440.
`tsc --noEmit`, `next lint`, `next build` MUST stay green. No AI attribution anywhere.

## 7. Imagery (generated via scripts/gen-images.py on Vertex; slots in image-manifest.json)
`journey-art` (illustrated field/farm panel) · `benefit-1..4` (blob still-lifes) ·
`quiz-portrait` (festive home cook + bottles) · `stamp-oil|dals|khand|pantry` (illustrated
product-in-scene) · `shop-oil|dals|khand|pantry` (styled product shots) · optional
`ghar-line` (faint line-art watermark). Build into `public/media` via `build-media.sh`.
Sections must still render if a shot is mid-generation (use nearest existing media as fallback,
never reference a missing name).
