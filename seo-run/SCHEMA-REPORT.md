# Schema / JSON-LD report

Source of truth: `src/lib/schema.ts` + `src/components/seo/JsonLd.tsx`. The layer is mature and
correctly gated (ratings never faked). Findings + what this build changes.

## Present & correct (do not touch)
| Schema | Fn | Notes |
|---|---|---|
| Organization | `organizationSchema()` | name/url/logo/description/slogan/sameAs |
| WebSite | `websiteSchema()` | name/url/inLanguage — **missing `potentialAction`** (fixed) |
| Product (marketing) | `productSchema()` | defensible fields only, no faked nutrition |
| Product (storefront) | `storeProductSchema()` | Offer/price/availability/sku/gtin; `aggregateRating` gated on real reviews ✅ |
| Recipe | `recipeSchema()` | ingredients, HowToStep, ISO durations, yield |
| BlogPosting | `articleSchema(post)` | headline/description/image/dates/author/publisher |
| Breadcrumb | `breadcrumbSchema()` / `storeBreadcrumbSchema()` | position lists |
| FAQPage (global) | `faqSchema()` | mirrors visible `/faqs/` text ✅ |

## Gaps fixed in this build (Phase 3b)
1. **`SearchAction` on WebSite** — add `potentialAction` (Sitelinks Searchbox) targeting
   `/store/?q={search_term_string}`. Search already works (`StoreSearch` → `/store/?q=`).
2. **Per-post `FAQPage`** — new `faq` blocks in journal posts emit a scoped `FAQPage` via a new
   `faqPageSchema(items)` helper, in addition to the global one. Entity signal for AI answers.
3. **`dateModified` accuracy** — `articleSchema` now reads `post.updated ?? post.date`, so refreshed
   posts report a real modified date (freshness signal) instead of always echoing `datePublished`.

## Gaps NOT fixed in code (owner data / decision)
- **`sameAs` placeholders** (`instagram.com/` etc.) — publishing bare homepages as the official
  profile is worse than empty. Needs real handles (data). Guard or fill before launch. *(REPORT §3)*
- **`aggregateRating`** — intentionally absent until real reviews exist. Correct; leave it.

## Validation gate (Phase 5)
Every new/changed JSON-LD is checked structurally (valid `@context`/`@type`, required fields present,
URLs absolute, no empty `sameAs`, FAQ text mirrors visible text). Post-launch: run each key URL through
Google Rich Results Test + Schema.org validator (out-of-repo, owner, listed in ACTION-PLAN).

## Falsifiability
- **Claim:** SearchAction is valid. **Failure:** Rich Results Test flags `potentialAction` malformed.
- **Claim:** per-post FAQPage mirrors visible text. **Failure:** validator reports FAQ text not found on page (would happen if `faq` block were client-only — it is server-rendered, so it won't).
