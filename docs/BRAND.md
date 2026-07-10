# Brand Bible

Owner: `brand-strategist`. The canonical reference for voice, palette, motif and trust.
Any agent should be able to tell on-brand from off-brand using this doc alone.
Status: **draft for Phase 1 lock.**

## Positioning

**For** discerning Indian households and the diaspora who are wary of adulterated, over-refined
oils and empty "organic" labels, **Organikaly is** an organic pantry brand led by cold-pressed
yellow mustard oil **that** makes purity visible — farm-to-bottle, kachi-ghani honest —
**unlike** loud discount-FMCG oils, because we treat trust as something earned through process,
not claimed on a label.

**One-line "what we are":** Cold-pressed, organic, honestly made — the pantry you'd trust for
your own family.

## Brand promise

Pure · Natural · Trusted. Nothing stripped out, nothing snuck in.

## Voice & tone

Warm, earthy-premium, calm, quietly confident. Speaks like a knowledgeable elder who respects
you — not a salesperson. Heritage without being dusty; modern without being clinical.

**Do**
- Short, grounded sentences. Concrete nouns (seed, press, soil, kitchen).
- Let process and provenance do the persuading.
- Use sensory, culinary truth (aroma, pungency, the colour of cold-pressed oil).
- A light, respectful touch of Hindi/Devanagari where it adds authenticity (e.g. शुद्ध सरसों तेल),
  spelled correctly.

**Don't**
- Hype, exclamation marks, discount-FMCG urgency ("BUY NOW!! 50% OFF").
- Unprovable superlatives or medical claims (see `COMPLIANCE.md`).
- Generic wellness filler ("unlock your best self"). Reproduce label typos. Use AI-ish cadence.

**Voice examples (before → after)**
- ✗ "The BEST mustard oil in India!" → ✓ "Cold-pressed the slow way, the way it's always been done."
- ✗ "Boost your immunity instantly!" → ✓ "Naturally rich in antioxidants — the goodness the seed already holds."
- ✗ "100% pure guaranteed!!!" → ✓ "Pressed from organic seed. Nothing added. Nothing refined out."

## Trust architecture (ranked — design must surface in this order)

1. **Cold-press process** (kachi ghani) — shown, not stated; the single strongest signal.
2. **Organic sourcing & provenance** — where the seed comes from; farm-to-bottle.
3. **Certification & FSSAI** — the institutional proof (licence no. via MANUAL_STEPS).
4. **Sensory / product truth** — aroma, colour, pungency; correct nutrition claims.
5. **Range as credibility** — oil + dals + khand = a real brand, not a one-off.
6. **Social proof** — real voices (placeholder-flagged until supplied).

## Palette (tokens — refine via taste skill, keep AA contrast)

| Token            | Hex                   | Role                                   |
|------------------|-----------------------|----------------------------------------|
| `--forest`       | `#0E3B14`             | deepest brand green, text on cream     |
| `--green`        | `#1B5E20`             | primary brand green                    |
| `--gold`         | `#C9A227`             | accent base (oil/leaf)                 |
| `--gold-bright`  | `#E2B84B`             | accent highlight, gradients            |
| `--mustard`      | `#E5B23C`             | product/oil moments                    |
| `--cream`        | `#FAFAF7`             | base surface                           |
| `--charcoal`     | `#1A1A17`             | high-contrast body text on cream       |

Green ↔ gold = the leaf/oil duality of the logo. Cream = honesty, space, calm. Use gold as a
*precious accent*, never a flood. Over the video, rely on scrims + cream/charcoal text.

## Motif language

Leaf, single oil-drop, mustard seed, the kachi-ghani press, soil/field horizon, and a restrained
Devanagari accent. Texture: warm paper/linen grain over flat colour — never glossy plastic FMCG.
Imagery: natural light, earthen props, the deep gold of real cold-pressed oil.

## Typography intent (finalise via taste skill)

Warm humanist/old-style **serif** for headings (heritage, trust) + a clean, quiet **sans** for
body (modern legibility). Self-hosted, subset, `font-display: swap`. The logo wordmark sets the
serif character to echo.

## The correct claim set (never reproduce label typos)

Cold-pressed · Organic · High in MUFA & Omega-3 · Rich in Antioxidants · Cholesterol-Free.
All phrasing passes `food-claims-compliance` before shipping.
