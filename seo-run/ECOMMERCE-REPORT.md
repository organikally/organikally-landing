# Ecommerce SEO report

Focus: turning mustard-oil search intent into `/store/` traffic and orders. The storefront tech is
sound (SSR/ISR, canonical discipline, Product schema). The gaps are **coverage** and **BOFU routing**.

## Findings
1. **No category landing pages.** `/store/?category=…` canonicalizes back to `/store/` (`store/page.tsx`),
   so there is no indexable "Cold-Pressed Mustard Oil" / "Organic Dals" page to rank for category intent
   — the biggest keyword-coverage gap after thin PDPs (REPORT §4.4).
2. **Generic money-page titles.** Store title is `"Shop"`, process is `"Process"` — ranking only for the
   brand, not for "buy cold-pressed mustard oil online". *(Safe fix — Phase 3b.)*
3. **Thin PDPs.** One `description` field; no nutrition/usage/ingredients/per-product FAQ (REPORT §5).
   Needs backend fields — out of scope for this content build; flagged.
4. **BOFU intent is huge and under-served.** From the CSV: 122 price queries (N15), 94 comparison
   queries (N8), 53 best/buying queries (N16), plus purity (N13). These are commercial and currently
   have **no landing surface** except the brand-only `/store/`.

## What this build does about it (within the file-based content system)
- **BOFU content assets that route to `/store/`:** N15 (price explainer), N16 (buying guide),
  N8 (comparison hub), N13 (purity/authenticity). Each ends with a `links` module to `/store/` and to
  `/product-authentication/`, capturing BOFU intent as journal pages that funnel to the shop.
- **These are the pragmatic substitute for true category pages** until the backend supports indexable
  category routes. A category-page epic is logged in ACTION-PLAN (needs backend + confirmed catalog scope).
- **Store title fix** (`Shop` → `Buy Cold-Pressed Organic Mustard Oil Online · Organikaly`) — Phase 3b.

## Merchant / off-page (out-of-repo, owner)
- Google Merchant Center feed = fastest retail visibility; Product schema is already feed-ready once the
  compliance data (FSSAI/GST/entity) is filled. Logged in ACTION-PLAN §off-page.

## Falsifiability
- **Claim:** BOFU journal assets route to store. **Failure:** GA4 shows ~0 `/journal/*` → `/store/`
  click-through after indexing. **Leading indicator:** internal-link clicks from the new assets.
- **Claim:** title fix helps. **Failure:** `/store/` still ranks only for "organikaly" after 8 weeks;
  no impressions for "buy mustard oil online" in GSC.
