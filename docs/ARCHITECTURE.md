# Architecture

Owner: `stack-architect`. Status: **scaffolded in Phase 3.**

## Stack

- **Next.js 15** (App Router) with `output: 'export'` → fully static `out/` for Cloudflare Pages.
- **React 19**, **TypeScript strict** (`noUncheckedIndexedAccess` on).
- **Tailwind CSS 3.4**, tokenised theme mapped to CSS variables (no raw hex in components).
- **Motion**: GSAP + ScrollTrigger and Lenis, **dynamically imported** in the hero effect so
  they stay off the initial bundle.
- **Fonts**: self-hosted via `next/font/google` (Fraunces, Hanken Grotesk, Tiro Devanagari
  Hindi), subset, `display: swap`, exposed as `--font-serif|sans|deva`.
- `images.unoptimized: true` (required for static export); media is pre-optimised by the
  hero pipeline. `trailingSlash: true` for clean static routing on Cloudflare.

## Layout

```
app/                 App Router — layout.tsx (fonts, metadata), page.tsx, globals.css
src/components/      UI components (hero/ … sections land in Phase 4)
src/lib/             utilities (added as needed)
public/hero/         generated hero assets (frames, poster, mp4, manifest.json)
public/brand/        web copies of logo/bottle
scripts/build-hero.sh   reproducible ffmpeg → AVIF pipeline
assets/source/       original brand assets (not shipped)
assets/hero-work/    raw ffmpeg intermediates (git-ignored)
```

## Token pipeline

`docs/BRAND.md` / `docs/DESIGN_SYSTEM.md` → CSS variables in `app/globals.css` (`:root`) →
Tailwind theme (`tailwind.config.ts`) → components use semantic classes (`bg-cream`,
`text-forest`, `text-gold-ink`, `font-serif`…). One source of truth; dark values never hardcoded.

## Build & scripts

- `npm run dev` — local dev (also wired in `.claude/launch.json`).
- `npm run build` — static export to `out/` (verified green: First Load JS ~107 kB).
- `npm run typecheck` / `npm run lint`.
- `npm run hero` — rebuild hero assets from source (requires ffmpeg + cwebp; run locally,
  commit the output — Cloudflare's build has no ffmpeg).

## Guardrails

Lean dependency budget; motion libs deferred; no unused libs; strict TS; semantic tokens only.
