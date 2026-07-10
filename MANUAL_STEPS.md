# Manual Steps — Founder Only

These tasks need information or access only the founder (Dissu) can provide. Agents
proceed with clearly-marked placeholders where blocked and **never invent** regulatory,
contact, or commercial details.

Legend: 🔴 blocks a real build deliverable · 🟡 needed before launch · 🟢 nice-to-have.

## Brand assets

- [x] ✅ **Official logo supplied** — `assets/source/organikally-logo.jpeg` (green + gold
  emblem, wordmark, PURE · NATURAL · TRUSTED). It's on a white background; the pipeline will
  derive a transparent PNG / SVG. If a higher-res or vector original exists, dropping it
  improves header/favicon crispness.
  - Also staged: source hero video, clean bottle-on-white (`product-bottle.png`),
    a lifestyle poster, and 4 alternate hero composites.
- [ ] 🟢 If available, supply a transparent-background bottle cut-out for product sections.

## Conversion / CTAs

- [ ] 🔴 **Business WhatsApp number** for the primary CTA. Decision: **WhatsApp-first** order/
  enquiry flow (`https://wa.me/<number>` + prefilled message). Until supplied, CTAs use a
  clearly-marked placeholder number. Provide a store/Amazon URL later if you want to switch.
- [ ] 🟡 Newsletter / enquiry form destination (email inbox, form service, or WhatsApp).

## Compliance & legal

- [ ] 🔴 **FSSAI licence number** + any mandatory regulatory text for the footer. Renders as
  a placeholder in the footer today; the trust strip no longer self-asserts "FSSAI compliant"
  (non-standard phrasing) — the licence number is the correct signal and lives in the footer.
- [ ] 🔴 **Organic certification — scope decides the wording.** Is NPOP/PGS certification held for
  the **finished oil**, or only the **seed/farm**? This gates every "organic" string on the page:
  - finished-oil cert → may say **"Certified Organic"** + display the Jaivik Bharat logo + cert no.
  - seed/farm only → keep the current safer **"organically grown seed"** phrasing (used in the
    hero, the Product badge, the trust strip); do **not** use bare/absolute "Organic" or "100%".
  Supply cert body, cert number, and Jaivik Bharat logo rights. (Absolute "100% Organic" and the
  `शुद्ध`/"pure" flourish were removed as un-substantiable absolute claims.)
- [ ] 🟡 **Nutrition lab report (per-100g)** — MUFA, ALA (omega-3), saturated fat, cholesterol,
  vitamin E (tocopherol). Needed to substantiate the Product benefits list, which still shows
  **"High in MUFA and Omega-3"** and **"Rich in antioxidants"** pending data. Compliant rewrites
  on file once data exists: "Naturally high in MUFA, a source of omega-3 (ALA)" and "A source of
  vitamin E, a natural antioxidant". The "cholesterol-free like all vegetable oils" qualifier is
  already applied (no data needed). Also review the Story line "Purity you can smell…" ("purity").
- [ ] 🟡 **Process attestation** — written confirmation the oil is genuinely cold-pressed / kachi
  ghani with **no external heat, no solvent, no deodorising step**, so the hero's negative process
  claims ("Nothing refined out", "No heat forced in, no solvents, no deodorising") and the "Proof"
  section's process comparison stay true.
- [ ] 🔴 **Press date — wire per-batch, don't hard-code.** The "Proof. Not promises." section shows
  a "Pressed on …" stamp from `site.pressDate` (`src/lib/site.ts`), currently the illustrative
  placeholder **24 May 2026**. Wire it to a real per-batch/per-SKU value, or set it to `''` to show a
  neutral "Small-batch fresh" stamp. A stale literal date is misleading.
- [ ] 🔴 **Press-date-on-bottle attestation.** Confirm the press/batch date is physically printed on
  **every** bottle/SKU — the line "We print the press date on every bottle" / "Freshness you can
  verify" is misleading otherwise. Qualify the copy if only some SKUs carry it.
  - Note: the supplied comparison copy "Zero Adulterants", "100% pure", "No other Indian brand prints
    this", and "Argemone risk" were **removed** as absolute / unsubstantiated-comparative /
    disparaging-safety claims. A future "tested free of argemone" line needs per-batch lab reports.
- [ ] 🟡 Business legal name, registered address, customer-care email/phone.

## Social proof

- [ ] 🟡 Real testimonials / reviews (name, location, quote, optional photo). Placeholders
  are flagged in the UI until supplied.
- [ ] 🟢 Real product / farm / process photography to replace AI renders where desired.
- [ ] 🟢 **Replace licensed stock photography with Organikaly's own farm/kitchen shots.**
  The editorial section images are currently licensed via Pexels (free for commercial use, no
  attribution required) and optimised by `scripts/build-media.sh` into `public/media/`. Swapping
  in real Organikaly field, seed, press and achaar photography is the highest-authenticity
  upgrade. Current sources (Pexels photo IDs / photographers):
  - `field` — Punjab mustard field still, Zaryab Haider (#36381366)
  - `field-band` — **video** of farmers threshing the rice harvest, Pexels video #19578432
    (2:1 crop framing the figures, warm-graded; raw `farmer-threshing.mp4` in `assets/media-work/`).
    Note: stock harvest footage — swap for Organikaly's own farm/mustard footage before launch.
  - `seeds` — mustard seed macro, Petr Ganaj (#18346906) — also the Range "Yellow Mustard Oil" thumbnail
  - `achaar` — mango achaar in a martaban, Ambika (#7812134)
  - `dals` — raw brown lentils, Pexels #30204272 (Range — Pulses & Dals)
  - `khand` — unrefined sugar in a wooden bowl, Pexels #19123122 (Range — Khand)
  - `pantry` — masala dabba spice box, Pexels #37911515 (Range — Pantry Staples)

## Channels

- [ ] 🟢 Social handles (Instagram, Facebook, YouTube, etc.) for the footer.

## Deployment (Vercel — store requires the Next.js server)

- [ ] 🔴 **Create the Vercel project** for `organikally-landing` (already has `vercel.json`).
  `output:'export'` has been removed so the storefront can run SSR/ISR; marketing routes stay
  static. Cloudflare via `@opennextjs/cloudflare` is a best-effort fallback only (not
  feature-equivalent: tag revalidation/ISR cache differ).
- [ ] 🟡 Custom domain + DNS (e.g. `organikaly.com` / `.in`) once acquired.

## Store (D2C `/store`) — env, Razorpay, legal

- [ ] 🔴 **Landing env vars** (set in Vercel; template in `.env.example`):
  - `API_BASE` — server-only backend base, e.g. `https://api.organikaly.com/api/v1`.
  - `NEXT_PUBLIC_API_BASE` — same base, exposed to the browser for cart/checkout/auth.
  - `NEXT_PUBLIC_RAZORPAY_KEY_ID` — optional; if unset the client uses the key the backend
    returns from checkout / `GET /store/config`.
  - `REVALIDATE_SECRET` — generate once, set on **both** Vercel and the backend (it calls
    `POST https://organikaly.com/api/revalidate` on catalog changes). `SITE_URL` is NOT an env
    var — it's the constant in `src/lib/site.ts`.
- [ ] 🔴 **Razorpay** (backend owns the secrets; the storefront only opens checkout.js): create the
  account, generate `RAZORPAY_KEY_ID`/`RAZORPAY_KEY_SECRET`, add the webhook
  → `https://api.organikaly.com/api/v1/store/webhooks/razorpay` (events: payment.authorized,
  payment.captured, payment.failed, order.paid, refund.created, refund.processed), set
  `RAZORPAY_WEBHOOK_SECRET`, and **enable auto-capture**.
- [ ] 🟡 **Product content**: real photography, copy, prices and `compare_at_price` (the seed uses
  placeholders). Do **not** add fabricated ratings — `aggregateRating` ships only with a verified
  first-party review system.
- [ ] 🟡 **Pincode serviceability**: replace the seed's sample serviceable list with the real set
  (admin → Store settings).
- [ ] 🔴 **Legal/policy (DPDP 2023 + Razorpay activation)**: publish Privacy Policy, Refund/Returns
  Policy, Shipping Policy and Terms, and link them from checkout + the footer.

## Security

- [ ] 🔴 **Rotate the leaked `GEMINI_API_KEY`** committed in `.env` (it should never have been
  committed — `.env` is git-ignored going forward). Rotate the key at source and purge it from any
  history/backups.
