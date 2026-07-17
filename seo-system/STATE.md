# Organikaly SEO System — STATE

Living tracker. Every session: **read this first, update it before finishing.** Full findings live in `REPORT.md`.

**Target site:** organikaly.com (`organikally-landing`, Next.js App Router)
**Catalog scope (owner decision, 2026-07-14):** mustard oil + pulses (dals) + khand ONLY. Out-of-scope SKUs (non-mustard oils, ghee, honey, spices, pickles, atta) = trim candidates — final list NOT yet confirmed (see REPORT §2).

---

## Phase status

| Phase | Status | Notes |
|---|---|---|
| 0. Audit (read-only) | ✅ DONE 2026-07-14 | 4 specialists: technical, schema, on-page/content-gaps, AEO/GEO. Findings in REPORT.md |
| 1. Technical SEO fixes | ⬜ NOT STARTED | sitemap gaps, home canonical, robots hygiene |
| 2. Schema + AEO | ⬜ NOT STARTED | SearchAction, guard sameAs, FAQPage on membership, entity consistency |
| 3. GEO | ⬜ NOT STARTED | llms.txt; AI training-crawler decision (OWNER) |
| 4. On-page content | ⬜ NOT STARTED | titles (Shop/Process), meta lengths, category pages |
| 5. Product depth | ⬜ BLOCKED | needs backend fields + catalog scope confirmation |
| 6. Monitoring | ⬜ NOT STARTED | GA4 + GSC verification placeholders |

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
- **2026-07-14** — Phase 0 audit completed (read-only). REPORT.md + STATE.md created. Owner elected report-only; catalog scope set to mustard oil + pulses + khand (out-of-scope SKU list pending confirmation). No code changed.
