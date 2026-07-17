# ACTION-PLAN — consolidated, de-duplicated, priority-ordered

Merges `seo-system/REPORT.md` + this run's GEO/SCHEMA/ECOMMERCE analysis + the content build.
Each item has an owner, a falsifiability check ("how we'd know it failed"), and a leading indicator.

## P0 — Owner-blocked (cannot be done in code; blocks payments, not this content build)
| # | Action | Falsifiability / leading indicator |
|---|---|---|
| 1 | Supply FSSAI #, legal entity+address, GSTIN, phone/WhatsApp, real social handles (`src/lib/site.ts`) | Fails if placeholders still render at launch; leading: grep `to be supplied` returns hits |
| 2 | Decide AI training-crawler allow/block (`app/robots.ts`) | Fails if crawler policy contradicts intent; leading: server logs of GPTBot/ClaudeBot hits |
| 3 | Guard/replace placeholder `sameAs` before launch | Fails if Google attributes `instagram.com/` as the brand profile; leading: GSC "Organization" entity check |

## P1 — Safe technical/schema fixes (DONE this run — Phase 3b)
| # | Action | Status | Falsifiability |
|---|---|---|---|
| 4 | Add ~15 missing static routes to `sitemap.ts` | ✅ | Fails if `/about` etc. absent from `/sitemap.xml`; leading: sitemap URL count |
| 5 | Homepage self-canonical (`app/page.tsx`) | ✅ | Fails if `<link rel=canonical>` missing on `/`; leading: view-source |
| 6 | Fix generic titles (`Shop`, `Process`) + long/short meta | ✅ | Fails if `<title>Shop</title>` persists; leading: SERP title |
| 7 | `public/llms.txt` | ✅ | Fails if `/llms.txt` 404s; leading: file served 200 |
| 8 | `SearchAction` on WebSite schema; per-post `FAQPage`; `dateModified` from `updated` | ✅ | Fails if Rich Results Test errors; leading: validator pass |
| 9 | Standardize entity description (reuse `site.description`) | ✅ (new posts) | Fails if the one-liner still drifts; leading: diff of page descriptions |

## P2 — Content build (DONE this run — Phase 4) — the core play
| # | Action | Status | Falsifiability |
|---|---|---|---|
| 10 | 17 new journal assets from the CSV clusters, GEO-block + schema + internal-linked | ✅ | Fails if any kept CSV cluster has no asset; leading: `COVERAGE-REPORT.md` = 100% |
| 11 | Expand global FAQ with high-value buyer Q&As | ✅ | Fails if PAA/long-tail buyer questions unanswered; leading: FAQ count + coverage |
| 12 | BOFU assets (N8/N13/N15/N16) route to `/store/` | ✅ | Fails if no `/journal→/store` links; leading: `INTERNAL-LINKING.md` graph |

## P3 — Needs backend / bigger lift (LOGGED, not done here)
| # | Action | Owner | Falsifiability |
|---|---|---|---|
| 13 | Indexable category landing pages (mustard oil / dals / khand) | eng + owner (catalog scope) | Fails if category queries still land on brand-only `/store/` |
| 14 | Product-depth fields (nutrition/usage/ingredients/per-product FAQ) + render | backend + eng | Fails if PDPs stay one-blob thin; leading: PDP word count |
| 15 | Generate the 17 post cover images (`IMAGE-MANIFEST.md`) | media pipeline | Fails if posts share duplicate placeholder covers; leading: unique cover count |

## Off-page (out-of-repo, owner, highest ROI/slowest — REPORT §8)
GSC + Bing Webmaster verify & submit sitemap · GA4 measurement ID · Google Merchant Center feed ·
Google Business Profile (also unlocks `local`/`maps` + "near me") · Rich Results Test on key URLs ·
Digital PR / backlinks using the new pillars + recipes as source material.

## Execution order used this run
BOFU (N15,N16,N8,N13) → high-intent Long Tail (N5,N6,N7,N9,N3) → TOFU (N1,N2,N4,N11,N12,N14,N17,N18)
→ FAQ expansion → interlink → schema/sitemap validate → coverage report.
