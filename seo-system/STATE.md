# Organikaly SEO System — STATE

Living tracker. Every session: **read this first, update it before finishing.** Full findings live in `REPORT.md`.

**Target site:** organikaly.com (`organikally-landing`, Next.js App Router)
**Catalog scope (owner decision, 2026-07-14):** mustard oil + pulses (dals) + khand ONLY. Out-of-scope SKUs (non-mustard oils, ghee, honey, spices, pickles, atta) = trim candidates — final list NOT yet confirmed (see REPORT §2).

---

## Phase status

| Phase | Status | Notes |
|---|---|---|
| 0. Audit (read-only) | ✅ DONE 2026-07-14 | 4 specialists: technical, schema, on-page/content-gaps, AEO/GEO. Findings in REPORT.md |
| 1. Technical SEO fixes | 🟡 PARTIAL 2026-07-18 | ✅ sitemap +15 routes, home canonical, Shop/Process titles. ⬜ robots AI-crawler policy (owner) |
| 2. Schema + AEO | 🟢 DONE 2026-07-18 | ✅ SearchAction, per-post FAQPage, faqPageSchema(), dateModified. ⬜ guard placeholder sameAs (owner data) |
| 3. GEO | 🟢 DONE 2026-07-18 | ✅ public/llms.txt + GEO answer-blocks across 17 posts. ⬜ AI training-crawler decision (OWNER) |
| 4. On-page content | 🟢 DONE 2026-07-18 | ✅ 17 new journal pillars/clusters from the AnswerSocrates export + 9 FAQ. ⬜ indexable category pages (backend) |
| 5. Product depth | ⬜ BLOCKED | needs backend fields + catalog scope confirmation |
| 6. Monitoring | 🟢 GSC LIVE 2026-07-20 | GSC Domain property `sc-domain:organikaly.com` verified (DNS TXT via Vercel). Sitemaps submitted (main + learn). 9 priority URLs pushed to crawl queue. GA4 still not wired. |

**Decision this session:** owner chose "report only, no code changes." Nothing shipped yet.

---

## Blocked on owner (cannot proceed without)

- [ ] FSSAI licence number
- [ ] Legal entity name + registered address
- [ ] GST number (GSTIN)
- [ ] Phone / WhatsApp number
- [ ] Real social profile URLs (Instagram/Facebook/YouTube handles)
- [ ] Contact email — pick one (`hello@` vs `support@`)
- [ ] Confirm final in-scope catalog: are non-mustard oils (groundnut/sesame/coconut) and atta IN or OUT?
- [ ] AI training-crawler policy: allow or block GPTBot/ClaudeBot/Google-Extended/CCBot?

## Do NOT re-check mid-run
Live rankings, indexing status, traffic — these move on a weeks/months timescale. Ship fixes, then hand off. Don't poll.

## Ground rules (carry forward)
- No AI attribution anywhere (commits, comments, copy).
- TypeScript strict; match existing conventions; enhance existing metadata, don't template over it.
- Never invent stats, reviews, certificates, FSSAI/GST numbers, or client claims — flag missing data instead.
- Small reviewable commits with real messages.
- Match the existing design system; ask before anything that visually clashes.

---

## Changelog
- **2026-07-20** — **Google Search Console set up live** (browser, aryansingh@organikaly.com). Added a **Domain** property `sc-domain:organikaly.com` (covers root + www + learn. + field. + all protocols), verified via DNS TXT `google-site-verification=XSVYnga1fqo_9le8f7Bj3CiOJGjbhnWwoKXU2f4yyUY` added through **Vercel DNS** (`vercel dns add organikaly.com @ TXT …`, rec_1de1d801e41f00bf37cdf42a) — SPF/DKIM/email records untouched. **Do not remove that TXT record** or verification drops. Submitted two sitemaps: `organikaly.com/sitemap.xml` (69 URLs incl. all 20 product PDPs + 24 journal posts; fetch pending — transient) and `learn.organikaly.com/sitemap.xml` (Success, 15 pages). **Requested priority indexing** for 9 top URLs: /store/, mustard-oil 1L + 5L PDPs, /journal/, /faqs/, and blogs mustard-oil-benefits / cold-pressed-vs-refined / is-mustard-oil-banned-in-the-us / best-mustard-oil-how-to-choose. Homepage already indexed. **Found + fixed a real defect:** GSC flagged the homepage's `Product` JSON-LD as an invalid rich-result item (no offers/review/aggregateRating) — removed the homepage Product snippet (brand landing page ≠ PDP; valid Product+offers markup lives on the /store/ PDPs). Fix committed to `main` (458d331), build verified. ⚠️ **NOT DEPLOYED**: git-push did not trigger a Vercel build (broken git-trigger) and the manual `vercel --prod` was blocked pending owner approval — the fix goes live only after a production deploy.
- **2026-07-18** — Full SEO implementation + content build (see `../seo-run/`). Shipped the safe P1 technical fixes (sitemap, home canonical, titles), schema/AEO (SearchAction, per-post FAQPage, dateModified), GEO (`public/llms.txt` + answer blocks), and **17 new journal assets** (mustard-oil pillars/clusters/comparison/buying guides) built from a 1,592-row AnswerSocrates export — 100% of the 874 relevant queries covered — plus 9 new global FAQ entries. Content drafted + adversarially YMYL-compliance-verified; hedged, sourced, no therapeutic/product claims. Build passes. Owner data blockers (FSSAI/GST/socials/entity), AI-crawler policy, and a human compliance read of the health posts remain open (`../seo-run/NEEDS-INPUT.md`).
- **2026-07-14** — Phase 0 audit completed (read-only). REPORT.md + STATE.md created. Owner elected report-only; catalog scope set to mustard oil + pulses + khand (out-of-scope SKU list pending confirmation). No code changed.
