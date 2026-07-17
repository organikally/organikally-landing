# GEO / AEO analysis — getting cited in AI answers

**Goal:** be the source AI Overviews / ChatGPT / Perplexity / Copilot quote for mustard-oil intent.
GEO rewards: a stable entity definition, self-contained answer blocks, structured data, and crawler
access. Below is the current state and what this build changes.

## Current state (from repo)
- ✅ FAQ answers are server-rendered even when visually collapsed (no cloaking) — good for extraction.
- ✅ Mature JSON-LD (Organization, WebSite, Product, Recipe, BlogPosting, Breadcrumb, FAQPage).
- ❌ **No `llms.txt`** — no curated entry point for AI crawlers. *(fixed: `public/llms.txt`)*
- ❌ **No GEO answer blocks** in journal posts — prose is narrative, not question-first extractable.
- ❌ **WebSite schema has no `SearchAction`** — no Sitelinks Searchbox signal. *(fixed)*
- ⚠️ **Entity-description drift** — the one-line "what Organikaly is" varies across pages; LLMs reward a
  stable self-description. *(mitigated: standardize on `site.description`; new posts reuse it.)*
- ⚠️ **Placeholder `sameAs`** publishes `instagram.com/` as the official profile — actively harmful; owner must supply real handles (unchanged — data, not code).

## What GEO actually needs from CONTENT (this build delivers it)
1. **Answer-first blocks.** Every new asset opens each section with a self-contained **130–170-word
   answer** under a question-shaped H2/H3 — the unit AI Overviews lift. Implemented via the new `h3`
   block + a lead answer paragraph pattern in every brief.
2. **People-Also-Ask blocks.** The new `faq` block renders visible Q&A **and** emits a per-post
   `FAQPage` JSON-LD (entity signal; note FAQ *rich results* are gone as of 2026 — we keep them for
   AI/entity value, not snippets).
3. **Definitional clarity.** N7 (`what is kachi ghani mustard oil`) and N18 (names across India) give
   crawlers a crisp, multilingual entity definition — high citation value for "what is mustard oil".
4. **Citable facts, sourced.** N5 (banned-in-US/erucic acid) and N6 (nutrition) are fact-dense,
   source-backed → exactly what AI answers cite. These are the flagship GEO assets.
5. **Freshness.** `Post.updated` → `dateModified` in schema; AI answers prefer recently-updated sources.

## `llms.txt` (added)
A markdown index at `organikaly.com/llms.txt` pointing crawlers at the brand definition + the pillars:
`/about`, `/process`, `/product-authentication`, `/store/`, `/journal/*` (the new pillars),
`/faqs/`, `/recipes/`. One-line entity definition at top, sourced from `site.description`.

## Falsifiability
- **Claim:** GEO answer blocks get cited. **How we'd know it failed:** after 8–12 weeks indexed, zero
  AI-Overview / Perplexity citations for target questions (spot-check monthly). **Leading indicator:**
  the exact answer text appearing verbatim in an AI answer, or GSC impressions on the question queries.
- **Claim:** `llms.txt` is read. **Failure:** server logs show no AI-crawler hits on `/llms.txt`.

## Owner decision (unchanged)
AI **training** crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot) — allow (reach) vs block (control).
Retrieval crawlers stay allowed regardless. `robots.ts` left blanket-allow pending your call.
