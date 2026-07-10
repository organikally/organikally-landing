# Organikaly Landing — Operating Context

Read this before touching the repo. These rules override convenience.

## Mission

A landing page that, within ~5 seconds, tells a stranger this is a **trustworthy,
authentic, organic Indian food brand** led by **cold-pressed Yellow Mustard Oil** —
and makes buying / enquiring effortless. Emotional target: authentic, earthy-premium,
trustworthy, calm. Farm-to-bottle heritage × clean modern design. Never a loud
discount-FMCG site; never a generic startup template.

Quality bar is non-negotiable: **zero AI slop, zero templated feel.** Speed is never
an excuse for a generic result.

## House rules

- **Conventional Commits**, always. Small, logical chunks — one coherent unit of work
  per commit (`feat(hero): canvas scroll-scrub frame renderer`). Push after each chunk.
  Never bundle unrelated changes. `main` stays shippable.
- **No AI attribution anywhere** — not in commits, branch names, PR titles, repo
  description, code comments, README, or any artifact. No "Co-authored-by", no
  "Generated with…". Absolute rule. Write everything as if authored directly.
- **Route design through the taste layer.** No screen, section, or component ships
  without going through `ui-ux-pro-max` + `taste-skill`. Read each `SKILL.md` first.
- **Compliance gate.** Every health/nutrition/organic claim passes
  `food-claims-compliance` (FSSAI-defensible) before it ships. Never invent regulatory
  or contact details — placeholders go in `MANUAL_STEPS.md`.
- **Never reproduce the label typos** ("Extracted Ed", "AntiFA", "शुरुद"). Correct
  claims only: Cold-pressed · Organic · High in MUFA & Omega-3 · Rich in Antioxidants ·
  Cholesterol-Free.

## Stack (locked)

Next.js (App Router, Vercel server — marketing static, `/store/**` SSR/ISR) · Tailwind
(tokenised) · GSAP + ScrollTrigger · Lenis · TypeScript strict · AVIF/WebP assets ·
Cloudflare via `@opennextjs/cloudflare` as best-effort fallback. Self-hosted subset
fonts, `font-display: swap`. Per-file < 25 MiB, < 20,000 files per deploy.

> Reversal logged 2026-06-29 (see `docs/DECISIONS.md`): the prior `output:'export'` +
> Cloudflare Pages stack was dropped for the SSR storefront + on-demand revalidation
> required by `STORE_CONTRACT` §2. This supersedes the locked stack for those two points
> only; everything else here (Conventional Commits, no AI attribution, taste/compliance
> gates, perf budget) still governs.

## Brand palette (starting point — refine via taste skill)

| Token            | Hex                 | Use                          |
|------------------|---------------------|------------------------------|
| green / forest   | `#1B5E20` / `#0E3B14` | primary brand, deep accents |
| gold / amber     | `#C9A227` → `#E2B84B` | oil/leaf accent, highlights |
| cream / off-white| `#FAFAF7`           | base surface                 |
| mustard-oil warm | `#E5B23C`           | product moments              |
| charcoal         | `#1A1A17`           | high-contrast text on cream  |

## Performance budget (enforced)

LCP < 2.0s (static poster is the LCP element, painted instantly — never the video) ·
CLS < 0.1 · TBT < 200ms · Lighthouse Perf ≥ 95 · A11y ≥ 95 · SEO = 100. Hero frame
transfer (desktop) ≤ 3–4 MB, progressive, immutably cached. Mobile materially lighter.

## Hero technique

Canvas frame-sequence scrub (primary): ffmpeg → AVIF/WebP frames → `position: sticky`
full-viewport `<canvas>`, scroll progress → frame index → `drawImage`. Static poster =
LCP. `<video>`-scrub is fallback only. On mobile / `prefers-reduced-motion: reduce`,
degrade to a reduced frame set or static poster — the page must never jank.

## Source assets

`assets/source/` — original video + stills. **`organikally-logo.png` is founder-supplied
and currently missing** (see `MANUAL_STEPS.md`). Optimised hero output lands in
`public/hero/` and is treated as generated.

## Decisions

Every cross-agent decision is logged in [`docs/DECISIONS.md`](docs/DECISIONS.md).
When in doubt, the `product-manager` arbitrates against the Definition of Done.
