# 00 — SEO command plan (router output)

**Site:** organikaly.com · **Profile:** small India D2C, content-led, mustard-oil-first ·
**Prior audit:** `seo-system/REPORT.md` (read-only, 2026-07-14) already covers technical/schema/AEO.

> **Execution note.** The `claude-seo` / `claude-blog` marketplace plugins named in the run brief
> are **not installed in this session** and could not be installed here (the `/plugin` install path
> is a harness action not available to this agent, and running an unvetted third-party `install.sh`
> is a supply-chain risk I declined to take on the user's machine). Per the brief's own "route
> around blocked items, log the decision, keep going" rule, each RUN pass below was executed
> **natively** — the deliverable is the report, not the tool. See `NEEDS-INPUT.md` → *Plugin install*.

## Verdicts

| # | Command / pass | Verdict | Rationale | Order | Depends on |
|---|---|---|---|---|---|
| 1 | `audit` | RUN (reuse) | Full audit already done in `seo-system/REPORT.md`; consolidated, not re-run from scratch. | 1 | — |
| 2 | `technical` | RUN (reuse) | Canonicals/sitemap/robots/noindex reviewed in REPORT §1,§4. Safe fixes actioned in Phase 3b. | 2 | 1 |
| 3 | `schema` | RUN | JSON-LD mature but has gaps (no SearchAction, per-post FAQPage, sameAs guard). → `SCHEMA-REPORT.md`. | 3 | 1 |
| 4 | `content` | RUN | The core play. 1,592-row keyword export → clusters → 17 new assets. → `content-map.md`. | 6 | 5 |
| 5 | `geo` | RUN | AI-answer citation is a stated goal. No `llms.txt`, no GEO answer blocks. → `GEO-ANALYSIS.md`. | 4 | 1 |
| 6 | `ecommerce` | RUN | Category-page gap + thin PDP + BOFU routing. → `ECOMMERCE-REPORT.md`. | 4 | 1 |
| 7 | `cluster` | RUN | Deterministic clustering of the export → `clusters.json` / `content-map.md`. | 5 | — |
| 8 | `content-brief` | RUN | Per-asset briefs (primary/supporting kw, link graph, covered rows) baked into `content-map.md`. | 5 | 7 |
| 9 | `plan ecommerce` | RUN | Funnel-ordered plan (BOFU→LongTail→TOFU) drives Phase 4 order. → `ACTION-PLAN.md`. | 5 | 6,7 |
| 10 | `sitemap` | RUN | REPORT §4.1: ~15 static routes missing. Fixed in Phase 3b; journal auto-included. | 7 | 2 |
| 11 | `images` | RUN (partial) | Alt text authored per asset; image *generation* deferred → `IMAGE-MANIFEST.md`. | 8 | 4 |
| 12 | `sxo` | RUN | Search-experience: answer-first blocks, internal links, CTA to `/store/`. Folded into content. | 8 | 4 |
| 13 | `local` | DEFER | No Google Business Profile. Unlocks "near me" + local-pack. **Credential/asset: a live GBP.** | — | GBP |
| 14 | `maps` | DEFER | Same as `local`. **Asset: GBP + verified locations.** | — | GBP |
| 15 | `hreflang` | SKIP | Single locale `en-IN`; no multi-locale routing in `app/`. Revisit if Hinglish/regional routes added. | — | — |
| 16 | `dataforseo` | DEFER | Needs a **DataForSEO API key**. Volume/difficulty data would refine kw priority; not blocking. | — | key |
| 17 | `backlinks` | DEFER | Beyond free sources needs an **Ahrefs/SEMrush key**. Off-page is highest-ROI but out-of-repo (REPORT §8). | — | key |
| 18 | `firecrawl` | DEFER | Needs a **Firecrawl key**. SERP/competitor crawl not required for this content build. | — | key |
| 19 | `google` (tiers 1–3) | DEFER | Needs **Search Console / paid tier** auth. Verify GSC post-launch, submit sitemap (REPORT §8.1). | — | GSC |

## Net
**RUN now:** schema, geo, ecommerce, cluster, content-brief, plan, content, sitemap, images(partial), sxo
(audit/technical consolidated from the existing REPORT). **DEFER (owner/credential):** local, maps,
dataforseo, backlinks, firecrawl, google. **SKIP:** hreflang. The RUN set is exactly the leverage a
small content-led store has without paid tooling or a GBP.
