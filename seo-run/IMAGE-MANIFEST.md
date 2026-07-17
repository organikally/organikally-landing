# IMAGE-MANIFEST — covers to generate for the 17 new posts

Each new post ships now with a **placeholder** cover (an existing `/public/media` triplet) so the
build never renders a broken image. Generate the **intended** unique cover below via the media
pipeline (`scripts/build-media.sh` + gen-images), then update `cover` in `posts.generated.ts` and
rebuild. Alt text is already authored per post (below = the generation brief).

| id | intended cover slug | placeholder now | generation prompt / alt |
|---|---|---|---|
| N15 | `blog-mustard-oil-price` | `pour` | A tin and a bottle of mustard oil on a market shelf |
| N16 | `blog-best-mustard-oil` | `products` | Several bottles of mustard oil on a shelf, one being chosen |
| N8 | `blog-oil-comparison` | `compare-coldpressed` | Several cooking oils in glass bottles lined up for comparison, mustard oil in front |
| N13 | `blog-mustard-oil-purity` | `proof-date` | Hands holding a plain bottle of mustard oil up to the light to check its colour |
| N5 | `blog-mustard-oil-erucic` | `seed-macro` | Macro close-up of yellow mustard seeds, showing their texture and colour |
| N6 | `blog-mustard-oil-nutrition` | `seeds` | Yellow mustard seeds spilling from a wooden scoop beside a jar of oil |
| N7 | `blog-kachi-ghani` | `step-pressed` | A traditional wooden ghani pressing golden mustard oil from the seed |
| N9 | `blog-cooking-mustard-oil` | `blog-cooking` | Golden mustard oil heating in a steel kadhai with mustard seeds crackling |
| N3 | `blog-mustard-oil-hair` | `benefit-3` | A person massaging golden mustard oil into their scalp and hair |
| N1 | `blog-mustard-oil-benefits` | `oil-swirl` | A glass of deep golden cold-pressed mustard oil beside fresh yellow mustard seeds |
| N2 | `blog-mustard-oil-heart` | `benefit-2` | A bottle of golden mustard oil next to a bowl of salad, on a bright kitchen counter |
| N4 | `blog-mustard-oil-skin` | `benefit-4` | A drop of golden mustard oil on skin, warm natural light |
| N11 | `blog-mustard-oil-massage` | `benefit-1` | Warm golden mustard oil being poured into a palm for a massage |
| N12 | `blog-mustard-oil-pooja` | `heritage-hands` | A brass diya with a mustard-oil flame during an Indian prayer ritual |
| N14 | `blog-mustard-oil-storage` | `bottle-hero` | A capped bottle of mustard oil stored in a cool, dark kitchen shelf |
| N17 | `blog-mustard-oil-uses` | `tadka` | A kitchen shelf with mustard oil among everyday Indian pantry staples |
| N18 | `blog-mustard-oil-names` | `shop-oil` | A bottle of yellow mustard oil labelled sarson ka tel |

**Format:** produce the AVIF·WebP·JPG triplet at 1300×866 (3:2), warm natural light, earthy-
premium, no text overlay — matching the existing `blog-*` covers. Filenames: `<slug>.{avif,webp,jpg}`.
