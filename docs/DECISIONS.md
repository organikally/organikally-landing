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

<!-- New entries above this line -->
