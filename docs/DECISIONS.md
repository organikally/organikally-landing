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

<!-- New entries above this line -->
