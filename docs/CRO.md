# Conversion & CRO

Owner: `conversion-analyst`. Status: **draft for Phase 1 lock.**
Feeds `frontend-engineer` (events + CTA wiring) and `ui-ux-designer` (placement).

## Primary action

**Buy / Order** is the primary conversion. Destination is founder-supplied (own store,
marketplace listing, or WhatsApp) — see `MANUAL_STEPS.md`. Until then, CTAs point to a
clearly-marked placeholder and a working **WhatsApp enquiry** is treated as the safe default
(low friction, fits Indian D2C + B2B behaviour, no checkout to build).

- **Primary CTA:** `Buy Yellow Mustard Oil` (or `Order on WhatsApp` if WhatsApp-first).
- **Secondary CTA:** `Explore the range` (scrolls to range / signals breadth).
- **Tertiary / B2B:** `Bulk & trade enquiries` → WhatsApp/enquiry.

## CTA hierarchy & placement

1. **Hero** — one primary + one secondary. Calm, not crowded.
2. **Sticky/min header CTA** — appears after the hero scrolls past (primary action always
   one tap away). Hidden during hero to keep it clean.
3. **After the product section** — primary CTA at the moment of peak intent (just after
   benefits + proof).
4. **Conversion block (near footer)** — primary action + WhatsApp + newsletter/enquiry.
5. **Footer** — quiet repeat + trust signals.

## Objection-handling order (mapped to AUDIENCE.md)

Place proof exactly where doubt arises, in scroll order:

1. Hero → *what it is* (5-second clarity) + trust strip immediately below
   (FSSAI · Organic · Cold-Pressed · Cholesterol-Free).
2. Story / why authentic → answers "is it really organic / not adulterated?"
   (cold-press process, sourcing).
3. Product → answers "worth the price?" (MUFA/Omega-3, antioxidants, usage) + CTA.
4. Sourcing & process → deepens "how it's made" for the skeptic.
5. Social proof → "do others trust it?" (real voices; placeholder-flagged).
6. FAQ → mops up residual objections (price, shelf life, smoke point, organic meaning).
7. Conversion block → remove the last friction; make the next step obvious.

## Friction removal

- Never a dead end: every section's logical next step is reachable.
- Mobile: thumb-reachable primary CTA; WhatsApp opens the app directly.
- No forced signup before value; newsletter is optional and low-pressure.
- Clear, instant feedback on any interaction; no surprise modals.

## Analytics events (privacy-friendly, no PII, no heavy third-party tags)

Lightweight, self-hostable (e.g. a Cloudflare-friendly, cookieless approach). Event list for
`frontend-engineer` to wire:

| Event                | Fires when                                   | Properties            |
|----------------------|----------------------------------------------|-----------------------|
| `page_view`          | initial load                                 | path, referrer (coarse)|
| `scroll_depth`       | 25 / 50 / 75 / 100% reached                  | bucket                |
| `section_view`       | a section enters viewport (once)             | section id            |
| `hero_scrub_engaged` | user scrubs the hero meaningfully            | max progress bucket   |
| `cta_click`          | any CTA pressed                              | label, location       |
| `whatsapp_click`     | WhatsApp action                              | location              |
| `range_item_click`   | a product tile opened                        | product               |
| `faq_open`           | an FAQ item expanded                         | question id           |
| `newsletter_submit`  | enquiry/newsletter submitted                 | (no PII)              |

## Success signals

Primary: `cta_click` / `whatsapp_click` rate. Secondary: scroll-depth to product + proof,
range engagement, FAQ opens (objection intensity).
