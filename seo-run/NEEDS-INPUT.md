# NEEDS-INPUT — decisions I made so the run didn't block

Read this at the end. Every item is a soft decision I resolved with a sensible default and kept
going, per the brief. Tell me where you'd choose differently and I'll adjust.

## Decisions taken (default in effect now)

### 1. Plugin install — did NOT install `claude-seo` / `claude-blog`
- **Default:** ran every RUN pass **natively** instead of via the marketplace plugins.
- **Why:** the `/plugin marketplace add` install path is a harness action not available to this
  agent, and the documented fallback (`git clone` + `bash install.sh` from a third-party repo,
  `AgriciDaniel/*`) means executing an unvetted script on your machine — a supply-chain risk I
  won't take unprompted. The deliverables (reports + content + coverage) don't depend on the plugin.
- **If you'd rather:** install the plugins yourself (`/plugin marketplace add AgriciDaniel/claude-seo`)
  and re-run; the outputs would land in the same `seo-run/` structure.

### 2. Content system — extended the existing typed `Block` model, did not add MDX
- **Default:** journal content stays TS-in-`posts.ts`; I extended the `Block` union (`h3`, `faq`,
  `links`) + added `Post.sources` / `Post.updated` rather than introducing MDX/Contentlayer.
- **Why:** the brief says match existing conventions exactly. This is the same pipeline, richer blocks.

### 3. Catalog scope — mustard-oil-first (the CSV is mustard-oil-only)
- **Default:** the AnswerSocrates export is 100% mustard oil, so this build is mustard-oil content.
  Pulses/khand keep their existing posts (E5/E7) and are untouched.
- **Open (carried from `seo-system/REPORT.md §2`):** final in-scope SKU list (are non-mustard oils
  / atta IN or OUT?) is still your call — unrelated to this content build but blocks catalog trim.

### 4. Images — reused existing covers as placeholders; logged intended new images
- **Default:** each new post points at the closest existing `/public/media` cover triplet so the
  build never renders a broken image. The intended unique image (descriptive slug + alt) is logged
  in `IMAGE-MANIFEST.md` for the media pipeline (`scripts/build-media.sh` + gen-images) to produce.
- **If you'd rather:** generate the 17 covers first and I'll swap the `cover` basenames.

### 5. "Near me" / local queries — dropped (no Google Business Profile)
- **Default:** ~19 local/near-me/dealer queries dropped (`csv-dropped.md → local-no-gbp`).
- **Unlocks with:** a live GBP + a `/store/` store-locator. Then `local`/`maps` passes become RUN.

### 6. Price queries — a "what moves the price" explainer, NOT live prices
- **Default:** N15 answers price intent (why prices move, per-litre/tin/wholesale, GST/HSN context)
  and routes to `/store/` for the live price. I did **not** fabricate any rupee figures.
- **Why:** we have no live price feed here and inventing prices would be wrong + stale instantly.

### 7. YMYL health content — written hedged + sourced, flagged for your compliance read
- **Default:** health-adjacent assets (N1 benefits, N2 heart/cholesterol, N4 skin, N5 banned/erucic,
  N6 nutrition, N11 massage) report composition + tradition + research in **hedged, third-party-
  attributed** terms with disclaimers ("general information, not medical advice; consult a
  professional"); **no therapeutic/curative claim is made about Organikaly's product.** Each ran
  through an adversarial compliance verification pass before shipping.
- **Still recommended:** a human/`food-claims-compliance` read before you promote these hard. The
  landing `CLAUDE.md` gate says health claims are FSSAI-defensible only — I held to hedged-
  informational, but you own the final sign-off. Baby-massage (N11) specifically carries a
  pediatric-caution note by design.

### 8. Publishing — see `PUBLISH-DECISION` at the end of the run
- Content is committed to the repo in small batches with clean (no-attribution) messages, and the
  production build is verified. The push-to-`main` decision is surfaced in the final summary given
  the YMYL stakes on a live consumer site.

## Still needs YOU (carried from `seo-system/STATE.md`, unchanged by this run)
- [ ] FSSAI licence number, legal entity + registered address, GSTIN, phone/WhatsApp, real socials
      (placeholders still render site-wide — blocks Razorpay go-live, not this content).
- [ ] AI training-crawler policy: allow/block GPTBot, ClaudeBot, Google-Extended, CCBot
      (retrieval crawlers stay allowed either way). `robots.ts` left as blanket-allow pending your call.
- [ ] GBP (unlocks local), GA4 + Search Console verification (post-launch), Merchant Center feed.
