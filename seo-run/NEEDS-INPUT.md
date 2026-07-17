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

### 8. Publishing — committed locally, NOT pushed (your call)
- All work is committed to `main` **locally** with clean, no-attribution messages and the production
  `next build` passes (24 journal routes prerender, sitemap builds). I did **not** `git push`.
- **Why hold the push:** `main` auto-deploys to the live consumer site, and this drops 17 new public
  **health/YMYL** articles at once. The landing `CLAUDE.md` names a human `food-claims-compliance`
  gate for health claims before they ship; my adversarial-agent pass is a strong stand-in, not that
  named gate. This is the one genuinely irreversible, outward-facing step — worth your yes.
- **To publish:** say the word and I'll `git push origin main` (Vercel deploys). Everything else in
  this run was done autonomously; only the production deploy waits.

## Residual flags from the compliance pass (worth a human eye before you promote hard)
Full per-post flags are in `assembly-report.json`. The ones that need a decision:
- **Store transactability (N15, N18, N13, N14, others):** several BOFU posts route to `/store/` and
  reference "check the live price there." Memory notes the store may not be transactable yet (no
  serviceable pincodes / Razorpay pending). If the store can't show a price, soften those lines or
  hold the store CTA until checkout is live.
- **N13 pack-code claim:** the purity post says you can "verify a specific bottle using its pack code"
  via `/product-authentication/`. Confirm that feature actually exists, or I'll soften the wording.
- **N13 folk purity tests + Agmark:** fridge/freeze/rub tests are traditional (not lab-grade) — kept
  but heavily hedged. Agmark grade references should only imply Agmark if the product truly carries it.
- **N18 regional scripts:** Assamese/Odia/Tamil/etc. transliterations should be spot-checked by native
  speakers before promoting.
- **N11 camphor + infant-skin caution:** strong safety content — a medical reviewer's eye is ideal.
- **Sources are institution-level canonical URLs** (FSSAI/FDA/USDA/ICMR-NIN/Harvard/Agmarknet/Consumer
  Affairs), not exact article URLs — deliberate, to avoid fabricating links. Swap in precise pages if wanted.
- **Time-sensitive facts (N15):** 5% GST slab + the Oct-2020 mustard-blending ban are correct to the
  Jan-2026 knowledge cutoff; reverify if republishing much later.

## Still needs YOU (carried from `seo-system/STATE.md`, unchanged by this run)
- [ ] FSSAI licence number, legal entity + registered address, GSTIN, phone/WhatsApp, real socials
      (placeholders still render site-wide — blocks Razorpay go-live, not this content).
- [ ] AI training-crawler policy: allow/block GPTBot, ClaudeBot, Google-Extended, CCBot
      (retrieval crawlers stay allowed either way). `robots.ts` left as blanket-allow pending your call.
- [ ] GBP (unlocks local), GA4 + Search Console verification (post-launch), Merchant Center feed.
