# Organikaly — SEO / AEO / GEO Audit & Strategy

**Site:** organikaly.com (repo: `organikally-landing`, Next.js App Router)
**Audit date:** 2026-07-14
**Type:** Read-only audit (no code changed). Findings cited to `file:line`.
**Catalog decision (owner):** The real offering is **mustard oil + pulses (dals) + khand**. Everything else in the seeded catalog is treated as out-of-scope / to-trim (see §2).

---

## 0. TL;DR — the honest verdict

The site is **not broken**. Whoever built it already did the technical SEO work most stores skip: per-page canonicals, a backend-driven sitemap for dynamic pages, correct `noindex` on cart/checkout, CLS-safe images with alt text, clean single-`h1` hierarchy, and a **mature JSON-LD layer** (Product+Offer+AggregateRating, Recipe, FAQ, Breadcrumb — all correctly gated so ratings are never faked).

So the work ahead is **sharpening and filling holes**, not rebuilding. The real gaps, in priority order:

1. **P0 — Compliance placeholders** printing live on every page (FSSAI #, legal entity, GST, phone, real socials). Must be filled before Razorpay goes live.
2. **P1 — High-impact SEO fixes** (sitemap gaps, home canonical, generic titles, no category pages). Safe code changes.
3. **P2 — Thin product pages** (one description field, no nutrition/usage/ingredients/FAQ). Needs new backend fields + content.
4. **P3 — AEO/GEO polish** (no `llms.txt`, no SearchAction, entity-description drift, AI-crawler policy unmade).
5. **Cross-cutting — catalog ⇄ narrative mismatch** (§2).

**Expectations reset:** competitive commercial keywords take **3–6 months** of consistent work for a newer domain. Fast wins exist (long-tail content, Google Merchant Center, branded/local terms). "Rank on top ASAP" for generic terms is not realistic — but a focused mustard-oil brand is very winnable on its niche terms.

---

## 1. What's already strong (do NOT redo this)

| Area | Status | Evidence |
|---|---|---|
| Per-page canonicals | ✅ Thorough | `alternates.canonical` on nearly every route incl. dynamic `store/[slug]:48`, `recipes/[slug]:29`, `journal/[slug]:30` |
| Dynamic sitemap entries | ✅ Backend-driven, resilient | `sitemap.ts:32-35` `getSitemapEntries()`, unreachable backend → no URLs (not a build error) |
| Transactional pages noindexed | ✅ 12 pages | `store/checkout/page.tsx:10` etc. |
| Images | ✅ CLS-safe | All route through `Media.tsx`/`StoreImage.tsx`, AVIF→WebP→JPG, width/height set, lazy/async |
| Heading hierarchy | ✅ Single h1/page | `MarketingShell.tsx:62`, PDP h1=name + h2 sections |
| Internal linking | ✅ Solid | footer → every route; PDP breadcrumb + `RelatedProducts:202` |
| Product schema | ✅ Complete | `schema.ts:107-156` — offers, price, INR, availability, sku, gated aggregateRating/review |
| Recipe schema | ✅ Core complete | `schema.ts:177-207` — ingredients, HowToStep instructions, times, yield |
| FAQ quality | ✅ Snippet-ready | 15 Q&As, answers lead with a direct 2-3 sentence answer; JSON-LD mirrors visible text |
| Server rendering | ✅ No cloaking | FAQ answers server-rendered even when visually collapsed; only interactive widgets are client-only |
| 404 | ✅ Branded | `app/not-found.tsx` |

---

## 2. Catalog ⇄ narrative mismatch (DECISION NEEDED)

Your **marketing narrative and copy are built around yellow mustard oil** ("mustard oil, pulses and khand"). But the **seeded backend catalog has 20 SKUs**, many outside that story. Per your decision (narrow narrative), here is how each seeded SKU maps — and what to trim/unpublish:

### ✅ In-scope (keep, promote, optimize)
- **Mustard oil:** Cold-Pressed Yellow Mustard Oil 1L (`OIL-MUST-1L`), 5L (`OIL-MUST-5L`)
- **Pulses / dals:** Toor/Arhar (`DAL-TOOR-1K`), Moong (`DAL-MOONG-1K`), Chana (`DAL-CHANA-1K`), Urad (`DAL-URAD-1K`), Rajma (`DAL-RAJMA-1K`)
- **Khand:** Desi Khand / Raw Cane Sugar (`SWT-KHAND-1K`)

### ⚠️ Borderline (confirm)
- **Jaggery / Gur** (`SWT-GUR-1K`) — a khand-adjacent unrefined sweetener. Fits the "khand" story loosely. Keep or drop — your call.

### ❌ Out-of-scope per your decision (candidates to unpublish / hide)
- **Non-mustard oils:** Groundnut (`OIL-GNUT-1L`), Sesame/Til (`OIL-SESA-1L`), Virgin Coconut (`OIL-COCO-500`)
- **Ghee:** A2 Desi Cow Ghee Bilona (`GHEE-A2-500`)
- **Honey:** Raw Forest Honey (`HNY-RAW-500`)
- **Pickles:** Mango (`PKL-MANGO-500`), Lemon (`PKL-LEMON-400`)
- **Spices:** Turmeric (`SPC-HALDI-200`), Red Chilli (`SPC-CHILLI-200`), Coriander (`SPC-CORIANDER-200`)
- **Grain:** Stone-Ground Whole Wheat Atta 5kg

> **This trims ~11 of 20 SKUs — a big business call.** The scope choice explicitly named ghee/honey/spices/pickles as out. It did **not** explicitly rule on the **non-mustard cold-pressed oils** (groundnut/sesame/coconut) or **atta** — those are adjacent enough that you may want them in. **Confirm the final in-scope list before anyone trims the catalog or rewrites copy.** SEO consequence either way: you can only rank for what the whole site consistently sells and describes.

Note: the FAQ already says the brand does not sell ghee (`faqs.ts`), so the narrative and the ghee SKU are directly contradicting each other today.

---

## 3. P0 — Compliance blockers (fill before Razorpay goes live)

These are **literal placeholders rendering on every page right now**. Shipping payments with these visible is a trust and legal problem. **Only the owner can supply these values.**

| Gap | Where (file:line) | Current value |
|---|---|---|
| FSSAI licence number | `site.ts:20` → `SiteFooter.tsx:83` (every page) | `[FSSAI Lic. No., to be supplied]` |
| Legal entity name + registered address | `about:183`, `contact:37`, `terms:26` | `[Business name and registered address to be added.]` |
| GST number (GSTIN) | `terms:40` | absent (only "prices include GST where applicable") |
| Phone / WhatsApp number | `site.ts:7` `WHATSAPP_NUMBER=''` | WhatsApp CTA links to empty `wa.me/` |
| Real social profiles | `site.ts:27-30` | `instagram.com/`, `facebook.com/`, `youtube.com/` (bare homepages) |
| Contact email consistency | `site.ts:25` `hello@` vs `contact:15` `support@` vs footer `hello@` | pick one |
| Press/batch date | `site.ts:22` `pressDate:''` | "Proof" freshness stamp shows fallback, not a real date |

⚠️ **The placeholder socials are actively harmful:** `organizationSchema()` (`schema.ts:23`) publishes `instagram.com/` as your *official* profile, telling Google that Instagram's homepage **is** Organikaly's profile. That is worse than leaving `sameAs` empty. Guard or remove until real handles exist.

---

## 4. P1 — High-impact SEO fixes (safe code, ready to ship)

1. **Sitemap omits ~15 indexable pages** — `sitemap.ts:14-20` lists only `/`, `/journal/`, `/store/`, `/recipes/` + dynamics. Missing: `/about`, `/vision`, `/farmers`, `/process`, `/faqs`, `/wholesale`, `/careers`, `/contact`, `/product-authentication`, `/download`, `/news`, `/policies/{privacy,refunds,shipping,terms}`. All are self-canonical and footer-linked but invisible to the sitemap. **Biggest single technical fix.**
2. **Homepage has no self-canonical** — `app/page.tsx` exports no metadata; root layout sets none (`layout.tsx:46`). Add `alternates:{canonical:'/'}`. Every other page has one; home (most important) doesn't.
3. **Generic titles on money pages** — store title is `"Shop"` (`store/page.tsx:38`), process is `"Process"` (`process/page.tsx:9`). Change to `Buy Cold-Pressed Organic Mustard Oil Online · Organikaly` and `How Our Cold-Pressed Mustard Oil Is Made · Organikaly`. Today these rank only for the brand.
4. **No category landing pages** — `/store/?category=dals` canonicalizes back to `/store/` (`store/page.tsx generateMetadata`), so there's **no indexable "Organic Dals" or "Cold-Pressed Mustard Oil" page** to rank for category queries. Biggest keyword-coverage gap after thin PDPs. (In-scope categories now: mustard oil, dals, khand.)
5. **Meta description lengths** — >160 chars (truncate): vision (`vision:9`, 171), process (`process:9`, 205), product-authentication (`product-authentication:10`, 178). <140 chars (too thin): contact (`contact:8`, 57).
6. **Product PDP titles fall back to bare SKU name** — `store/[slug]:39` uses `seo_title || name`. Ensure every in-scope catalog row has a real `seo_title` (~50-60 chars) and `seo_description` (~150) so PDPs don't render one-word titles.

---

## 5. P2 — Product-page depth (needs backend fields + content)

**Data shape** (`src/lib/store/types.ts:84-93`): the only long-form indexable field is a single `description` string. **No structured field for nutrition, ingredients, how-to-use, sourcing story, storage/shelf-life, or per-product FAQ.**

- Thin PDPs = name + price + image + one blob → rank only for exact SKU, not "cold pressed mustard oil online".
- **Reviews infra is live but unseeded** (`ReviewsSection.tsx`) → every product shows zero stars. (Do NOT fake reviews — collect real ones post-launch.)
- **Certifications claimed in prose only** (`process:44`, `product-authentication:36`, `about:184`) — no certificate number, no India Organic / Jaivik Bharat badge, no scan-to-verify artifact on-page.

**To fix:** add product fields (nutrition, ingredients, usage, storage, per-product FAQ) in the backend → render PDP sections → fill content per in-scope SKU. Also unlocks Product-schema `nutrition`/`additionalProperty` and (later) real `aggregateRating`.

---

## 6. P3 — AEO / GEO (mostly safe; one owner decision)

1. **`llms.txt` missing** — no `public/llms.txt`. Pure GEO win. Add a markdown index at `organikaly.com/llms.txt` pointing AI crawlers at `/about`, `/process`, `/faqs`, `/store`, `/farmers`, `/product-authentication` + the one-line brand definition. FAQ content (`src/content/faqs.ts`) is ready-made source for an `llms-full.txt`.
2. **Add `SearchAction` to WebSite schema** — search works (`StoreSearch.tsx:62` → `/store/?q=`) but `websiteSchema()` (`schema.ts:27-35`) omits `potentialAction`. Add a Sitelinks-Searchbox action targeting `/store/?q={search_term_string}`.
3. **Guard placeholder `sameAs`** (same as §3 socials).
4. **Entity-description drift** — the canonical line (`site.ts:16-17`) is echoed inconsistently: `layout.tsx:52`, `about:10`, `store:44`, `vision:11`, `farmers:12` all vary ("pulses" vs "dals", some drop khand, farmers mentions only oil). Standardize: derive page metadata from one shared constant. LLMs reward a stable self-description.
5. **No quotable one-line definition at top of home** — H1 is `"The oil that smells like home."` (`Hero.tsx:42`, poetic, not definitional). The real definition is buried in `Story.tsx:46-48`. Surface a plain "Organikaly is an organic Indian food brand making cold-pressed yellow mustard oil, pulses and khand…" near the top of home/store for snippet + LLM lift.
6. **AI training-crawler policy is unmade (OWNER DECISION)** — `robots.ts:8` is a blanket `{userAgent:'*', allow:'/'}`. Retrieval crawlers (Googlebot, OAI-SearchBot, PerplexityBot) **should stay allowed** (blocking = no citations in AI answers). Training crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot, Applebot-Extended) are a real tradeoff — **reach vs. giving content away**. This is your call to make; not decided here.
7. **FAQPage schema missing on membership page** — `store/membership` renders 11 Q&As (`MembershipFaq`) but emits no FAQPage schema. Low-effort add.

---

## 7. Keyword strategy (grounded in the in-scope catalog)

A **narrow, coherent brand ranks better than a scattered one** — mustard-oil-first is an SEO advantage, not a limitation. Three tiers:

### Tier 1 — Product / exact-intent (fast once PDPs have depth)
- **Mustard oil:** `cold pressed mustard oil`, `kachi ghani mustard oil`, `wood pressed mustard oil`, `organic mustard oil online`, `shudh sarson tel`, `yellow mustard oil 1 litre`, `mustard oil 5 litre can`
- **Dals:** `unpolished toor dal`, `organic arhar dal online`, `organic moong dal`, `chana dal online`, `whole urad dal`, `organic rajma`, `chemical free dal`
- **Khand:** `desi khand online`, `unrefined khand`, `raw cane sugar` (+ `sulphur free jaggery` if gur stays)

### Tier 2 — Category pages (build these; medium, 2–4 months)
- `cold pressed mustard oil` (hero category), `organic dals online india`, `unrefined khand / natural sweeteners`

### Tier 3 — Content / recipes / journal (fastest wins + AI citations)
- `benefits of cold pressed mustard oil`, `kachi ghani vs refined oil`, `how to use mustard oil for cooking`, `is mustard oil good for health`, `unpolished vs polished dal`, `sulphur-free vs regular jaggery`, `mustard oil for [regional dish]`
- You already have a `/recipes` engine — this is your compounding asset. Point recipes at in-scope ingredients.

**How to pick more (free):** mine Google autocomplete + "People Also Ask" + "Related searches" on each seed term; sanity-check volume/competition in Google Keyword Planner or Ubersuggest free tier. Chase real-volume, low-competition terms first; do not chase "organic food india" yet.

---

## 8. Off-page (cannot be done in-repo — highest ROI, slowest)

1. **Google Search Console** — add property, verify (DNS/HTML tag), submit sitemap once P1 sitemap fix ships.
2. **Bing Webmaster Tools** — same; also feeds Copilot AI answers.
3. **Google Analytics 4** — create property, drop measurement ID into the code placeholder (to be added in Monitoring work).
4. **Google Merchant Center** — free Shopping listings = fastest retail visibility. Needs correct Product schema (already good) + the compliance data.
5. **Google Business Profile** — for "organic mustard oil near me / [city]" local queries.
6. **Rich Results Test** — validate Product / Recipe / FAQ / Breadcrumb on each key URL once live.
7. **Directory + marketplace presence** — where organic-staples buyers look; also third-party corroboration for GEO.
8. **Digital PR / backlinks** — the single biggest mover of both SEO and GEO; use recipes/sourcing story as source material for food & wellness blogs/newsletters. Do this **after** checkout works.

---

## 9. Prioritized action plan

| # | Action | Owner | Type | Blocker? |
|---|---|---|---|---|
| 1 | Supply FSSAI #, legal entity+address, GST, phone, real socials | **You** | data | Yes — before payments |
| 2 | Confirm final in-scope catalog (oils? atta?) | **You** | decision | Yes — before copy/trim |
| 3 | Decide AI training-crawler allow/block | **You** | decision | No |
| 4 | Add ~15 missing routes to sitemap | Me | code | No |
| 5 | Add homepage self-canonical | Me | code | No |
| 6 | Fix generic titles (Shop, Process) + meta lengths | Me | code | No |
| 7 | Add `public/llms.txt` (+ optional full) | Me | code | No |
| 8 | Add SearchAction; guard placeholder sameAs; FAQPage on membership | Me | code | No |
| 9 | Standardize entity description from one constant | Me | code | No |
| 10 | Build category landing pages (in-scope categories) | Me | code | soft-depends on #2 |
| 11 | Add product depth fields (nutrition/usage/ingredients/FAQ) + render | Me | backend+code | needs #2 |
| 12 | GA4 + Search Console verification placeholders | Me | code | No |
| 13 | Trim/unpublish out-of-scope SKUs | You/Me | data | needs #2 |

---

## 10. Re-check list for future sessions (this is a system, not a one-off)

Run these next time this is re-opened:
- [ ] New products added? → each needs `seo_title`/`seo_description`, is in-scope, and appears in sitemap + a category page.
- [ ] New recipes/journal posts? → verify Recipe/Article schema renders and they're in the sitemap.
- [ ] Any remaining `[...to be added]` placeholders in `site.ts` / about / contact / terms?
- [ ] Broken internal links / 404s from removed SKUs.
- [ ] Are real reviews now seeded? → aggregateRating should be live (never faked).
- [ ] Sitemap `lastmod` still hardcoded (`sitemap.ts:12`)? → move to real dates.
- [ ] Did the catalog scope drift back to including out-of-scope SKUs? → re-check §2.
- [ ] Compliance data filled and consistent across all pages?
- [ ] Off-page (§8) progressed — GSC/Bing/Merchant/GBP/backlinks?

---

*Read-only audit. No code was changed in this pass. See STATE.md for live progress across sessions.*
