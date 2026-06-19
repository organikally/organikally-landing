# Skills Log

Skills routed into this project, each with a one-line justification. Avoid redundancy —
only what genuinely raises quality. Maintained by `skill-scout`.

## Core taste layer (required by brief)

| Skill            | Status      | Why |
|------------------|-------------|-----|
| `ui-ux-pro-max`  | ✅ available | Primary design intelligence — palettes, type pairings, component & section systems, UX guidelines. Every screen routes through it. |
| `taste-skill`    | ✅ available | Anti-slop frontend taste — kills templated/generic output; audit-first on redesigns; pre-flight checks. |

## Additional candidates available in this environment (scouted)

| Skill                    | Use here | Why |
|--------------------------|----------|-----|
| `impeccable`             | likely   | Deep frontend craft: visual hierarchy, motion, micro-interactions, typography, color — strong fit for the premium bar. |
| `emil-design-eng`        | likely   | Component polish & animation-decision philosophy — the "invisible details" layer for buttons, reveals, states. |
| `soft-skill`             | maybe    | "Make it feel expensive" — fonts/spacing/shadows/cards defaults; cross-check against our own tokens. |
| `imagegen-frontend-web`  | maybe    | Section-by-section design references to lock layout direction before coding. |
| `redesign-skill`         | no (new build) | Audit/upgrade of existing sites — not a greenfield build. Keep in reserve. |
| Magic MCP (21st.dev)     | maybe    | Component inspiration/builder + logo search — use sparingly, always re-skinned to brand to avoid templated feel. |
| `Claude_Preview` MCP     | yes      | Headless browser preview for QA/UAT passes (screenshots, console, network). |

## Notes

- The brief's install commands (`/plugin marketplace add …`, `npx skills add …`) target a
  plugin/skill registry. In this environment the two required skills are already resolvable,
  so no install was needed. If running elsewhere, install per the brief before building UI.
- Decision: do **not** pad the roster. Each skill must earn its lane; redundant
  style-skills (multiple "make it pretty" skills) are skipped in favour of `ui-ux-pro-max`
  + `taste-skill` + `impeccable` as the spine.
