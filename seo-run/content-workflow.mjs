export const meta = {
  name: 'organikaly-mustard-content',
  description: 'Draft + adversarially compliance-verify 17 mustard-oil journal assets for Organikaly',
  phases: [
    { title: 'Draft', detail: 'one writer per content asset, answer-first + GEO + sources' },
    { title: 'Verify', detail: 'adversarial YMYL/compliance/accuracy pass; returns a hardened post' },
  ],
};

// briefs come in via args (seo-run/briefs.json). Each writer + verifier also writes
// its final JSON to seo-run/drafts/<id>.json so assembly is robust to result-retrieval.
const BRIEFS = args.briefs;
const DRAFTS_DIR = args.draftsDir;

const BRAND = `
BRAND & VOICE — Organikaly (organikaly.com), an India-based D2C organic food brand.
Hero product: cold-pressed yellow (kachi ghani) mustard oil, plus organic pulses (dals) and
unrefined khand. Voice: warm, plain-spoken, earthy-premium, trustworthy — an Indian kitchen
talking to a reader who cooks. NEVER loud discount-FMCG. Author byline is "The Organikaly Kitchen".
Write for India (English + light Hinglish is fine, e.g. tadka, achaar, sarson, kadhai).
ZERO AI-slop, zero templated feel. Do not mention AI, Claude, or that this was generated.`;

const YMYL = `
YMYL / COMPLIANCE (mustard-oil health content is Your-Money-Your-Life — this is non-negotiable):
- NEVER claim Organikaly's oil (or mustard oil) cures, treats, prevents, or reverses any disease.
- Report composition and TRADITION as fact; report health/research ONLY in hedged, third-party-
  attributed terms: "studies suggest", "is traditionally used for", "some evidence indicates",
  "many cooks believe". Distinguish tradition/anecdote from evidence.
- Every health, nutrition, or regulatory claim needs a source (see SOURCES). Add at least 2-5
  sources for any asset that touches health, nutrition, "banned", or erucic acid.
- Include a clear disclaimer in the body for health topics: this is general information, not medical
  advice; consult a qualified doctor/dietitian. For anything about babies/infants, explicitly advise
  consulting a pediatrician and note that some guidance cautions against mustard oil on newborn skin.
- Do NOT invent: FSSAI licence numbers, GST numbers, certification numbers, prices, statistics,
  study results, reviews, or "X% of people". If you don't have a real figure, describe qualitatively.
- Pregnancy/fertility: keep to "consult your doctor"; make no fertility or safety claims.`;

const FACTS = `
AUTHORITATIVE FACTS (use these; hedge appropriately; do not exceed them):
- Mustard oil is naturally HIGH in MUFA (monounsaturated fat), contains omega-3 ALA and omega-6
  linoleic acid, is low in saturated fat, and — like all plant oils — contains no cholesterol.
- It has a HIGH smoke point (~250 C / ~480 F), which is why Indian kitchens use it for high-heat
  cooking, tempering and frying.
- Erucic acid: traditional mustard oil is naturally high in erucic acid (roughly 20-40%+ of its fat).
  Because of erucic acid, the US FDA does NOT authorise mustard oil as a cooking oil for domestic
  sale; imported mustard oil in the US must be labelled "For external use only" and is not GRAS as a
  food oil. The EU and Codex set limits on erucic acid in edible oils. Low-erucic-acid ("canola-type"
  / "double-zero") mustard varieties exist.
- In INDIA, mustard oil is a permitted, everyday edible oil (regulated by FSSAI) and a culinary
  staple — the "ban" is a US/some-Western regulatory position, not an Indian one. Say this clearly;
  it is the crux of the "is mustard oil banned" questions.
- Kachi ghani = traditional cold-pressing: the seed is crushed slowly at low temperature, no added
  heat, no solvents, no bleaching/deodorising — so colour, aroma and the seed's natural compounds
  are retained. Refined oils are heat/solvent-extracted then degummed/bleached/deodorised.
- Approx nutrition per 100 g of any oil: ~884 kcal, ~100 g fat. Give ranges, cite USDA, don't over-precise.`;

const SOURCES_ALLOW = `
SOURCES — cite REAL institutions by name at their CANONICAL domain. NEVER fabricate a precise
article URL, DOI, or study link you cannot be sure exists. Prefer these stable, section-level URLs:
- FSSAI (India food regulator): https://www.fssai.gov.in/
- U.S. FDA (import/labelling of mustard oil): https://www.fda.gov/
- USDA FoodData Central (nutrition): https://fdc.nal.usda.gov/
- ICMR-National Institute of Nutrition (India): https://www.nin.res.in/
- World Health Organization: https://www.who.int/
- Harvard T.H. Chan — The Nutrition Source: https://nutritionsource.hsph.harvard.edu/
- PubMed (for research in general): https://pubmed.ncbi.nlm.nih.gov/
Attribute claims to the institution ("Per the U.S. FDA…", "USDA FoodData Central lists…"). It is
better to cite an institution's canonical page than to invent a specific URL.`;

const STRUCTURE = `
STRUCTURE (this is a GEO/AEO build — the page must be citable by AI answers AND rank):
- Open the body with ONE answer-first paragraph (130-170 words) that directly answers the primary
  question in a self-contained way (no "in this article"). This is the block AI Overviews lift.
- Then 4-8 sections, each an { "type":"h2" } question-or-topic heading followed immediately by an
  answer-first paragraph, then optional detail (p / ul / h3 / quote). Weave the real user phrasings
  from sample_queries into headings and text NATURALLY — never keyword-stuff.
- Cover the sub-intents implied by sample_queries. If the asset spans many combos (e.g. "with
  coconut/castor/curd for hair"), group them into a section or a ul rather than one H2 each.
- Near the end, include ONE { "type":"faq" } block with 4-7 concise People-Also-Ask Q&As drawn from
  the sample_queries (answer-first, 2-3 sentences each). These feed a per-post FAQPage.
- Include ONE { "type":"links" } block titled e.g. "Keep reading" with the provided internal links
  (use them verbatim: label+href). For BOFU assets, make sure a link to the store is present and the
  copy gently routes buyers there (never pushy).
- Length: pillar 1100-1600 words; cluster/comparison 800-1200; glossary/short 600-900.

BLOCK VOCABULARY (return body as an array of these ONLY):
  {"type":"p","text": "..."}                      paragraph
  {"type":"h2","text": "..."}                      section heading
  {"type":"h3","text": "..."}                      sub-heading
  {"type":"ul","items": ["...","..."]}             bullet list
  {"type":"quote","text": "..."}                   pull-quote (use sparingly, max 1-2)
  {"type":"faq","items":[{"q":"...","a":"..."}]}   People-Also-Ask block (exactly one, near end)
  {"type":"links","heading":"Keep reading","items":[{"label":"...","href":"/..."}]}  (exactly one)

RETURN a JSON object: { id, title, excerpt, tags, readingMinutes, body, sources }
- id: echo the brief id exactly.
- title: <=60 chars ideally, compelling, includes the core keyword, no "| Organikaly".
- excerpt: 120-158 chars, becomes the meta description; answer-first, no clickbait.
- tags: 3-5 lowercase tags.
- readingMinutes: your integer estimate.
- sources: array of {label,url}; REQUIRED (>=2) for any health/nutrition/regulatory asset, else [].`;

function draftPrompt(b) {
  return `You are a senior food & wellness writer for Organikaly. Write ONE journal article.

${BRAND}
${YMYL}
${FACTS}
${SOURCES_ALLOW}
${STRUCTURE}

ASSET BRIEF
- id: ${b.id}
- working title: ${b.title}
- content type / funnel: ${b.type} / ${b.funnel}
- primary keyword: ${b.primary}
- this asset must satisfy ${b.query_count} real search queries; a representative sample:
${b.sample_queries.map((q) => '  - ' + q).join('\n')}
- internal links to include in the links block (use verbatim):
${b.links.map((l) => `  - {"label":"${l.label}","href":"${l.href}"}`).join('\n')}

Write the best, most accurate, most genuinely useful version of this article for an Indian home
cook / buyer. Ground every health or regulatory statement in the FACTS + SOURCES above and hedge it.
Then ALSO write your JSON to the file "${DRAFTS_DIR}/${b.id}.draft.json" using the Write tool.
Finally, return the SAME JSON object as your structured output.`;
}

function verifyPrompt(b, draftJson) {
  return `You are an adversarial YMYL compliance + accuracy editor for Organikaly. You are reviewing a
draft journal article and must return a HARDENED, corrected version.

${BRAND}
${YMYL}
${FACTS}
${SOURCES_ALLOW}
${STRUCTURE}

Adversarially check the draft below and FIX every issue:
1. COMPLIANCE: any therapeutic/curative/disease claim about mustard oil or Organikaly's product →
   rewrite to hedged, tradition/research-attributed framing. Ensure a health disclaimer is present
   for health topics. Ensure baby/infant content carries the pediatric caution.
2. ACCURACY: verify erucic-acid / US-FDA / smoke-point / composition statements against the FACTS.
   Fix anything that overstates, contradicts, or invents. Ensure the India-vs-US "ban" nuance is
   correct where relevant.
3. NON-FABRICATION: remove any invented FSSAI/GST/certificate numbers, prices, statistics, study
   results, or fabricated source URLs. Ensure every source is a real institution at a canonical
   domain from the allowlist; drop or replace any suspicious URL.
4. STRUCTURE/GEO: ensure answer-first opening, H2 answer-first sections, exactly one faq block and
   one links block with the required internal links, excerpt 120-158 chars, tags present.
5. VOICE: remove AI-slop, hedging tics, repetition, and any template feel; keep it warm and human.

DRAFT (JSON):
${draftJson}

Return the corrected JSON object with the SAME shape { id, title, excerpt, tags, readingMinutes,
body, sources } PLUS two extra arrays: "changed" (short bullets of what you fixed) and "flags" (any
residual concern a human should check, or [] if none). ALSO write the corrected JSON (without
changed/flags is fine, but keeping them is OK) to "${DRAFTS_DIR}/${b.id}.json" using the Write tool.
Then return the JSON as your structured output.`;
}

const BLOCK = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: ['p', 'h2', 'h3', 'ul', 'quote', 'faq', 'links'] },
    text: { type: 'string' },
    heading: { type: 'string' },
    items: { type: 'array' },
  },
  required: ['type'],
};
const POST_SCHEMA = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    excerpt: { type: 'string' },
    tags: { type: 'array', items: { type: 'string' } },
    readingMinutes: { type: 'integer' },
    body: { type: 'array', items: BLOCK, minItems: 6 },
    sources: { type: 'array', items: {
      type: 'object', properties: { label: { type: 'string' }, url: { type: 'string' } },
      required: ['label', 'url'] } },
    changed: { type: 'array', items: { type: 'string' } },
    flags: { type: 'array', items: { type: 'string' } },
  },
  required: ['id', 'title', 'excerpt', 'tags', 'readingMinutes', 'body'],
};

log(`Producing ${BRIEFS.length} assets (draft → verify), funnel-ordered.`);

const results = await pipeline(
  BRIEFS,
  (b) => agent(draftPrompt(b), {
    label: `draft:${b.id}`, phase: 'Draft', schema: POST_SCHEMA, agentType: 'general-purpose',
  }),
  (draft, b) => {
    if (!draft) return null;
    return agent(verifyPrompt(b, JSON.stringify(draft)), {
      label: `verify:${b.id}`, phase: 'Verify', schema: POST_SCHEMA, agentType: 'general-purpose',
    });
  },
);

const posts = results.filter(Boolean);
const flagged = posts.filter((p) => p.flags && p.flags.length);
log(`Done: ${posts.length}/${BRIEFS.length} verified. ${flagged.length} carry residual flags.`);
return { count: posts.length, ids: posts.map((p) => p.id), posts, flagged: flagged.map((p) => ({ id: p.id, flags: p.flags })) };
