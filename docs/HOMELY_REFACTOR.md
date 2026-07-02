# Homely Refactor — Design Law (single source of truth)

Goal: make the Organikally landing feel **homely, warm, trust-first and story-led** —
the emotional register of a beloved D2C kitchen brand (reference: Ojasya Naturals) —
**without** losing our own brand, our cinematic film hero, or our quality bar.

This is the contract every builder reads first. It overrides personal taste. It sits
under `organikally-landing/CLAUDE.md` (mission, house rules, compliance, perf) — that
file still governs; this one is the visual/IA spec for the "homely" pass.

---

## 0. North star — what "homely" means here

Ojasya reads homely because it is: a warm cream/gold palette · a **traditional
process journey** told in numbered photographed steps · **benefit "blobs"** (soft
organic-shaped icon wells) · a plain **"ours vs the ordinary" comparison** · a light
**"find your match" quiz** · and a long, reassuring, **educational FAQ**. It talks like
a person, leans on heritage, and makes trust feel like warmth, not compliance.

We already share the palette and heritage fonts. What we add is **warmth, roundness,
story and reassurance** in the sections **below the film hero**. We keep our film hero
and our editorial restraint — we are dialling *up* homeliness, not turning into a loud
discount-FMCG page (see CLAUDE.md: "never a loud discount-FMCG site").

**Homeliness dial (apply everywhere below the fold):**
- Warmer surfaces: use `bg-surface` cream wells and soft `rounded-card`/blob shapes far
  more than the current hairline-only editorial look. Cozy, not clinical.
- Rounder, softer: prefer `rounded-card` / `rounded-media` and organic **blob** shapes
  for icon wells and image frames. Warm `shadow-md`/`shadow-lg` over hard borders.
- Generous, calm spacing; big friendly type moments (Chelsea Market) with warm gold accents.
- Human, first-person copy that already exists ("smells like home", "my mother's
  kitchen") — lean into it. Reassure, don't assert.
- Homely imagery (kitchen, thali, pour, hands, field, seed) in every new block.

---

## 1. Tokens & primitives — use ONLY these (do not invent)

Colors (Tailwind, already wired): `paper` (base), `surface` (cream well), `yellow`
`yellow-deep` `yellow-ink` (gold text, AA), `ink` `ink-muted` `ink-faint`, `line`.
**One accent = oil-gold/yellow.** No new hues. No purple/neon/SaaS gradients.

Radii: `rounded-chip` (0.625rem, small controls) · `rounded-media` (1.25rem, photos) ·
`rounded-card` (1.5rem, cards/panels) · `rounded-full` (pills). Blobs use inline
`borderRadius` (see §3). Shadows: `shadow-sm/md/lg/media/panel` (warm-tinted, in config).
Max widths: `max-w-container` (1200) · `max-w-measure` (65ch). Motion: `ease-brand`.

Type: `h1..h3` = Chelsea Market (display) automatically. Scale helpers: `t-display
t-headline t-title t-subtitle t-lead`. Eyebrow: `className="eyebrow"` (gold, uppercase,
with tick) or `eyebrow eyebrow-bare`. Numeric = `.tnum`. Hindi = `font-deva`.

Primitives (reuse, do not fork):
- `Cta` (`@/components/ui/Cta`) — variants `primary | secondary | secondaryDark | ghost`,
  props `whatsapp arrow external`. Use for every button/link-action.
- `Media` (`@/components/ui/Media`) — serves the AVIF/WebP/JPG triplet from `/public/media`
  by `name`. Give it `width`/`height` (reserve space, CLS 0) + a frame class (aspect + radius).
- `Reveal` (`@/components/ui/Reveal`) — scroll-in wrapper, props `direction` (`up|left|right`)
  + `delay` (ms). Wrap each new block's content so it settles in like the rest of the page.
- Icons: **Lucide only**, 1.5–1.8 stroke. **No emoji as UI.**

Fonts, motion, reduced-motion, focus rings, `::selection` are already set in `globals.css`
— inherit them. Honor `prefers-reduced-motion` (Reveal already does).

---

## 2. Media available in `/public/media` (use by `name`)

Product/heritage: `seeds` `seed-macro` `bottle-hero` `pour` · Process: `step-grown`
`step-pressed` `step-bottled` `step-kitchen` · Homely lifestyle: `kitchen` `thali`
`tadka` `achaar` `field` `farmer` `heritage-hands` `oil-swirl` · Range: `dals` `khand`
`pantry` · Journal covers: `blog-*`. Hero product bottle (transparent) =
`/brand/product-bottle.webp` (plain `<img>`, `mix-blend-multiply`). If a `name` you want
isn't listed, use the closest one — **do not** reference a missing file.

---

## 3. New homely components (build as NEW self-contained files)

All new sections follow the page rhythm: `<section id className="relative z-10 py-16
md:py-32">` → `<div className="mx-auto max-w-container px-5 md:px-10">` → an `eyebrow` +
Chelsea-Market `h2` + `t-lead` intro (wrapped in `Reveal`), then the block.

### 3a. `Benefits.tsx` — benefit "blobs" (id `benefits`)
Four soft **blob** wells, Ojasya-style, in a `bg-surface` band or on paper. Each: an
organic blob (inline `style={{borderRadius:'42% 58% 63% 37% / 41% 44% 56% 59%'}}` on a
`bg-yellow/12` well) holding a Lucide icon (`Droplets`, `Leaf`/`Sprout`, `HeartPulse`→NO
(medical) use `ShieldCheck`, `Wheat`), a Chelsea-Market title, one warm sentence.
**Copy = approved claims ONLY** (see §5): High in MUFA & Omega-3 · Rich in antioxidants ·
Cold-pressed & unrefined · Made from organically grown seed. No medical/health-outcome
language. Content lives in `src/content/benefits.ts`.

### 3b. `Compare.tsx` — "Not all mustard oil is the same" (id `compare`)
A warm two-column comparison, our answer to Ojasya's A1-vs-A2 table. Left = "Ordinary
refined/commodity oil", right = "Organikally cold-pressed" (highlighted in a `bg-surface`
`rounded-card` well with a soft gold ring). Rows = **process/sensory/source** contrasts,
each with a Lucide `X` (ink-faint) vs `Check` (yellow-deep). **NEVER medical claims.**
Approved contrast rows, e.g.: refined with heat & solvents → cold-pressed in a kachi
ghani, no heat/solvents · aroma & colour stripped → natural pungency & golden colour kept ·
blended/undated → single-source, press-dated · nutrients refined out → nutrients the seed
holds kept (state as "unrefined", not a health outcome). Content in `src/content/compare.ts`.
Optionally flank with `pour` (golden) vs a neutral image — but keep it tasteful, no
fear-mongering. No brand names, no "toxic", no scare copy (that's off-brand).

### 3c. `Quiz.tsx` — "Find your Organikally" (id `match`) · `'use client'`
A light, homely 2-step matcher (Ojasya's "Your Match", adapted — we route intent, we do
NOT invent SKUs we don't sell). Q1 "What are you cooking most?" (Everyday tadka & sabzi /
Pickling & achaar / Deep-frying & festive / Baking & the wider pantry). Q2 "Cooking for?"
(Just me / My family / A shop or kitchen). Result = a warm recommendation card: for all
cooking answers → **Yellow Mustard Oil** (with a tailored one-liner + `bottle-hero`/`pour`
image + WhatsApp `Cta`); if "A shop or kitchen" → also surface the bulk/trade WhatsApp
line; "Baking & pantry" → nudge toward the range. Small, keyboard-accessible (buttons),
no external libs, state via `useState`. Content/logic in `src/content/quiz.ts`.
Keep it genuinely useful (ends in a real order path), never a gimmick.

Keep all three lightweight and lazy — they must not threaten the perf budget.

---

## 4. Existing sections — warm them (keep files, props, ids, data wiring)

Do not change routes, ids used as anchors (`#proof #product #sourcing #range #reviews
#faq #order`), component props, or the film hero. Only markup/classNames/copy tone.

- **TrustStrip → homely assurance row.** Replace the bare small-caps marks with a warm
  icon+label row (Lucide + label): Cold-pressed · Kachi Ghani · Organically grown ·
  Press-dated freshness. Keep it a single calm strip (hairline-bounded or a soft `surface`
  pill row). Still verifiable claims only.
- **Proof.** Keep the press-date dateline; warm the container (a `surface` well or soft
  card is welcome). Copy stays.
- **Product.** Keep the bottle spread; add a soft warm halo/blob behind the bottle
  (radial `yellow/10`), rounder framing. Benefits checklist stays (approved claims).
- **Sourcing (process journey).** Keep the 4 photographed steps; make it read as a
  **traditional journey**: add a soft connecting line/ribbon between steps (desktop),
  warmer numbered markers, a touch more storytelling in the intro. This is our
  centre-of-gravity homely module — invest here.
- **Range.** Keep the numbered editorial index; warm the thumbnails (rounded-media, soft
  shadow) and the connective intro.
- **SocialProof.** Keep the carousel; warm the cards (already `surface`). Fine as-is,
  light touch only.
- **Recipes.** Homely already — light warmth only.
- **Faq → expand + warm.** Grow `src/content/faqs.ts` to a fuller, reassuring educational
  set (kachi ghani, yellow vs black, smoke point & frying, storage & shelf life, achaar/
  pickling, cooking uses, ordering & wholesale, freshness/press date). Keep the accordion.
  **Every answer claim-checked to §5.** No medical claims. This mirrors Ojasya's long,
  trust-building FAQ.
- **Conversion / Footer.** Keep; light warmth only.

---

## 5. Compliance & copy (hard gate — CLAUDE.md food-claims)

- **Approved claims ONLY:** Cold-pressed · Kachi Ghani · Organically grown / from
  organically grown seed · High in MUFA & Omega-3 · Rich in antioxidants · Cholesterol-free
  (like all vegetable oils) · Unrefined / nothing refined out · High smoke point (culinary
  fact) · Press-dated freshness. Sensory: golden colour, natural pungency/aroma.
- **NEVER:** medical/therapeutic outcomes (digestion, immunity, weight, heart-disease,
  Ayurvedic cures), "100% organic" absolute, self-asserted "FSSAI compliant", competitor
  disparagement, "toxic"/scare copy, invented certifications, invented numbers, discount/
  urgency spam. Do not reproduce label typos.
- Tone: warm, plain, first-person, heritage, reassuring. Indian kitchen vocabulary
  (tadka, achaar, sarson, kachi ghani) welcome and correct. One register.
- Em-dashes/en-dashes are fine on the landing (the site already uses them) — this is a
  marketing site, not the OPS apps. Do not strip them.

---

## 6. Perf & a11y (enforced — CLAUDE.md budget)

LCP < 2.0s, CLS < 0.1. New images via `Media` with width/height + `sizes`, lazy by
default. No new heavy deps. Client components (`Quiz`, existing carousels/FAQ) stay small.
WCAG AA contrast, visible focus (inherited), `cursor-pointer` on clickables, keyboard
operable, responsive 320→1440, `min-h-dvh` not `h-screen`. `tsc --noEmit`, `next lint`,
and `next build` MUST stay green.

## 7. Done = 
Homely warmth is felt below the film; benefit blobs + comparison + journey + quiz + fuller
FAQ are in and on-brand; every claim passes §5; palette/type/motion unchanged from tokens;
build/typecheck/lint green; no AI attribution anywhere.
