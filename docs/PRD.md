# PRD — Organikally Landing Page

Owner: `product-manager`. Single source of truth for scope and "done".
Status: **Phase 1 lock candidate.** Synthesises AUDIENCE · BRAND · CRO · SEO · COMPLIANCE.

## Goal

A first-time visitor understands within ~5 seconds that Organikally is a **trustworthy,
authentic, organic Indian food brand led by cold-pressed yellow mustard oil** — feels that
authenticity in the craft of the page — and can buy / enquire effortlessly.

## Non-goals (v1)

- No e-commerce checkout/cart (CTA points to store/marketplace/WhatsApp).
- No CMS/admin; blog is static files. No login/account. No multi-language UI (Hindi accents only).
- No paid-ad landing variants. Range pages beyond the landing surface are future work — but
  the architecture must let the range grow without a redesign.

## Success metrics (Definition of Done — §11)

- **5-second test** passes with strangers (UAT).
- **Hero** scrub buttery on desktop; graceful on mobile / reduced-motion; all overlaid text AA.
- **Lighthouse (mobile):** Perf ≥ 95 · **LCP < 2.0s** (static poster is LCP) · CLS < 0.1 ·
  TBT < 200ms · A11y ≥ 95 · **SEO = 100**.
- Valid JSON-LD (`Organization`, `Product`, `FAQPage`, blog `Article`); full meta/OG/Twitter;
  sitemap + robots present.
- All health/organic claims pass `food-claims-compliance`.
- Zero console errors; Chrome/Firefox/Safari + iOS Safari; responsive 320/768/1024/1440/1920.
- Deployed to Cloudflare Pages, immutable media caching; live URL passes UAT.
- Every commit a clean conventional chunk, **no AI attribution anywhere**; reads as crafted, slop-free.

## Page section spec (the 12)

Each section: **Purpose · Content · Acceptance.** Build only what earns its place.

1. **Hero** — *Purpose:* instant clarity + emotion; primary action. *Content:* logo, headline
   ("what it is"), one-line subhead, primary CTA (Buy/Enquire) + secondary (Explore range),
   over the scrubbing video. *Accept:* 5-sec test passes; AA text over video; poster = LCP.
2. **Trust strip** — *Purpose:* immediate credibility. *Content:* FSSAI · Organic ·
   Cold-Pressed · Cholesterol-Free (compliance-checked badges). *Accept:* claims compliant;
   legible; no hype.
3. **The Organikally story / why authentic** — *Purpose:* win trust. *Content:* cold-press
   (kachi ghani) process, organic sourcing, farm-to-bottle narrative. *Accept:* answers
   "really organic / not adulterated?"; in-voice; reveal motion intentional.
4. **Hero product — Yellow Mustard Oil** — *Purpose:* sell the flagship. *Content:* bottle,
   correct benefits (High in MUFA & Omega-3, antioxidants, cold-pressed, cholesterol-free),
   usage; primary CTA. *Accept:* claims compliant; CTA at peak intent.
5. **The full range** — *Purpose:* signal a real, growing brand. *Content:* Mustard Oil ·
   Pulses/Dals · Khand · pantry staples — a grid that scales. *Accept:* adding a product needs
   no redesign; tiles consistent.
6. **Sourcing & process** — *Purpose:* deepen trust for the skeptic. *Content:* how it's made,
   provenance, what "organic" means here. *Accept:* concrete, defensible, not vague.
7. **Social proof** — *Purpose:* "others trust it." *Content:* testimonials/reviews
   (founder-supplied; tasteful **placeholders flagged** until provided). *Accept:* clearly
   marked as placeholder if not real; never fabricated as real.
8. **Recipes / usage** — *Purpose:* warm, practical utility; ties to blog. *Content:* simple
   uses, tempering/cooking. *Accept:* on-brand, practical, links to journal.
9. **Journal / blog teaser** — *Purpose:* E-E-A-T + SEO. *Content:* 3 seed posts surfaced.
   *Accept:* links work; `Article` schema valid.
10. **FAQ** — *Purpose:* AEO + objection mop-up. *Content:* real buyer questions
    (organic meaning, price, shelf life, smoke point, yellow vs black). *Accept:* `FAQPage`
    schema; answers concise & extractable & compliant.
11. **Conversion block** — *Purpose:* remove last friction. *Content:* primary action +
    WhatsApp + newsletter/enquiry. *Accept:* obvious next step; mobile thumb-reachable.
12. **Footer** — *Purpose:* trust + legal + contact. *Content:* contact, **FSSAI licence no.**,
    socials, trust signals, legal. *Accept:* compliance disclosures present (or slotted as
    founder-supplied placeholders).

## Content inventory (who provides what)

- Copy: `copywriter` (all words) ← BRAND voice, AUDIENCE, COMPLIANCE.
- Visuals: staged assets (logo, bottle, lifestyle, hero composites) + generated hero frames/poster.
- Founder-supplied (MANUAL_STEPS): logo vector (nice-to-have), CTA destination, FSSAI no.,
  real reviews, socials, contact, certification details.

## Sequencing (phase gates — from the brief)

0 Setup ✅ → **1 Strategy (this doc set)** → 2 Design system → 3 Hero engineering →
4 Build (sections, copy, blog, compliance) → 5 Hardening (perf, a11y, QA, UAT) → 6 Deploy.
Stop and report at each gate.

## Risks & mitigations

- **Heavy video blocks paint** → poster-as-LCP, progressive frames, immutable cache (perf agent).
- **Contrast over moving video** → mandatory scrims, AA-verified at all scroll positions (a11y).
- **iOS Safari scrub unreliable** → canvas frames primary; mobile degrade path.
- **Claim risk** → compliance gate on all claims; founder confirms certs/FSSAI.
- **Placeholder data reading as real** → all placeholders explicitly flagged in UI + MANUAL_STEPS.

## Open dependencies

CTA destination, FSSAI licence no., real testimonials, organic certification details, socials —
tracked in `MANUAL_STEPS.md`. None block Phase 2 (design) or Phase 3 (hero engineering).
