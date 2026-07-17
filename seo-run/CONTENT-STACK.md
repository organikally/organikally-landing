# Content stack — how content is authored in this repo

Detected by inspection of `organikally-landing` (Next.js 15 App Router, TypeScript strict).
**There is no MDX/Contentlayer/CMS for the journal.** Content is typed TS data + a small
renderer. Match this exactly — do not introduce a new content pipeline.

## Journal (blog) — the target surface for this build

| Thing | Where |
|---|---|
| Post data | `src/content/blog/posts.ts` — `export const posts: Post[]` |
| Post type | `src/content/blog/types.ts` — `Post`, `Block` union |
| Renderer | `src/components/blog/PostBody.tsx` (switch over `Block.type`) |
| Index route | `app/journal/page.tsx` (lists `posts`, sorted by date desc) |
| Detail route | `app/journal/[slug]/page.tsx` (`generateStaticParams` from `posts`) |
| Canonical | `/journal/<slug>/` (trailing slash — `trailingSlash: true`) |
| Metadata | per-post `generateMetadata` → title=`post.title`, description=`post.excerpt` |
| JSON-LD | `articleSchema(post)` + `breadcrumbSchema(...)` via `<JsonLd>` |
| Sitemap | `app/sitemap.ts` already maps every `posts[]` entry → **new posts auto-index** |
| Cover image | `post.cover` = basename of a `/public/media/<name>.{avif,webp,jpg}` triplet, served by `src/components/ui/Media.tsx` |

### `Post` shape (as authored)
```ts
{ slug, title, excerpt, date /* YYYY-MM-DD */, readingMinutes, author, tags[], cover, coverAlt, body: Block[] }
```
`Block` (original): `{type:'p',text}` | `{type:'h2',text}` | `{type:'ul',items[]}` | `{type:'quote',text}`.

### Block vocabulary — EXTENDED for this build (Phase 3b)
The original 4 blocks can't express GEO answer blocks under H3, per-post FAQ, citations, or
internal-link modules. Extended (backward-compatible, same pipeline) in `types.ts` + `PostBody.tsx`:
- `{type:'h3',text}` — sub-headings for GEO answer blocks
- `{type:'faq',items:{q,a}[]}` — People-Also-Ask block; also feeds a per-post `FAQPage` JSON-LD
- `{type:'links',heading?,items:{label,href}[]}` — internal-link module (cluster→pillar→product)
- `Post.sources?: {label,url}[]` — E-E-A-T citations, rendered as a References list
- `Post.updated?: 'YYYY-MM-DD'` — last-updated → drives `dateModified` in `articleSchema`

## FAQ (global) — `src/content/faqs.ts`
`export const faqs: Faq[]` where `Faq = {q,a}`. Rendered at `/faqs/` (`app/faqs/`), and the whole
array becomes one `FAQPage` via `faqSchema()`. Curated, brand-voiced, answer-first. We ADD a modest
set of high-value buyer Q&As here (not the long tail — that goes into per-post `faq` blocks).

## NOT file-based (do not attempt to author here)
- **Recipes** (`/recipes/**`) — backend-driven (`getRecipes` in `src/lib/store/api.ts`). Link to them; don't write them here.
- **Store products / PDPs** (`/store/**`) — backend catalog. BOFU assets link to `/store/`; product copy is a backend job (out of scope for this content build).

## House rules that bind content (from `CLAUDE.md`)
- Conventional Commits, small chunks, `main` stays shippable. **No AI attribution anywhere.**
- Compliance gate: every health/nutrition/organic claim must be FSSAI-defensible, hedged, sourced. Never invent FSSAI/GST numbers, certifications, reviews, or stats.
- TypeScript strict — new posts must typecheck. Never reference a `cover` triplet that doesn't exist in `/public/media` (Media hard-breaks); use an existing thematic cover as a placeholder and log the intended image in `IMAGE-MANIFEST.md`.
