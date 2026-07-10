import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import RecipeCardItem from '@/components/recipes/RecipeCardItem';
import Pagination from '@/components/store/Pagination';
import { getRecipes, getRecipeTypes } from '@/lib/store/api';
import { storeBreadcrumbSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

// Recipes index. Reading searchParams renders per-request; the recipe fetches are
// tagged `recipes` with revalidate 300, and an admin publish revalidates the tag
// on demand. All type/page permutations canonicalize to /recipes/.
export const revalidate = 300;

const PAGE_SIZE = 12;

export function generateMetadata(): Metadata {
  return {
    title: 'Recipes',
    description:
      'Kitchen-tested Indian recipes from the Organikaly pantry — everyday dals, mains, sweets and sides built around cold-pressed oil, ghee, jaggery and organic staples.',
    alternates: { canonical: '/recipes/' },
    openGraph: {
      type: 'website',
      title: 'Recipes · Organikaly',
      description:
        'Everyday dals, mains, sweets and sides built around the Organikaly pantry.',
      url: `${SITE_URL}/recipes/`,
      images: [{ url: '/media/recipe-tadka-dal.jpg', width: 1300, height: 866, alt: 'Organikaly recipes' }],
    },
  };
}

type SP = Record<string, string | string[] | undefined>;

function str(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function RecipesPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const type = str(sp.type);
  const pageRaw = Number(str(sp.page));
  const page = Number.isFinite(pageRaw) && pageRaw > 1 ? Math.floor(pageRaw) : 1;

  const [recipes, types] = await Promise.all([
    getRecipes({ type, page, page_size: PAGE_SIZE }),
    getRecipeTypes(),
  ]);
  const totalPages = Math.max(1, Math.ceil((recipes.total || 0) / (recipes.page_size || PAGE_SIZE)));

  return (
    <>
      <JsonLd
        data={storeBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Recipes', path: '/recipes/' },
        ])}
      />
      <div className="mx-auto max-w-container px-5 pb-24 md:px-10">
        <header className="pt-6 text-center md:pt-10">
          <p className="eyebrow justify-center">From our kitchen</p>
          <h1 className="t-headline mx-auto mt-5 max-w-2xl font-semibold text-ink">Recipes</h1>
          <p className="t-lead mx-auto mt-4 max-w-xl">
            Kitchen-tested ways to cook the pantry — from a weekday tadka to a festive halwa,
            every recipe built around things we actually sell.
          </p>
        </header>

        {/* Type chips — URL-driven, server-rendered links. */}
        {types.length > 0 && (
          <nav
            aria-label="Recipe types"
            className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 sm:justify-center md:mx-0 md:flex-wrap md:px-0"
          >
            <Link
              href="/recipes/"
              aria-current={!type}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                !type
                  ? 'border-ink bg-ink text-paper'
                  : 'border-line bg-paper text-ink-muted hover:border-ink/40'
              }`}
            >
              All
            </Link>
            {types.map((t) => (
              <Link
                key={t.key}
                href={`/recipes/?type=${encodeURIComponent(t.key)}`}
                aria-current={type === t.key}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                  type === t.key
                    ? 'border-ink bg-ink text-paper'
                    : 'border-line bg-paper text-ink-muted hover:border-ink/40'
                }`}
              >
                {t.label}
                <span className={`ml-1.5 ${type === t.key ? 'text-paper/60' : 'text-ink-faint'}`}>
                  {t.count}
                </span>
              </Link>
            ))}
          </nav>
        )}

        {recipes.items.length === 0 ? (
          <div className="mt-16 rounded-card border border-line bg-surface px-6 py-16 text-center">
            <p className="font-display text-2xl text-ink">No recipes here yet.</p>
            <p className="mt-2 text-ink-muted">
              {type ? (
                <>
                  Nothing under this type so far —{' '}
                  <Link href="/recipes/" className="font-semibold text-forest hover:text-forest-deep">
                    see all recipes
                  </Link>
                  .
                </>
              ) : (
                'The kitchen is warming up — recipes are on their way.'
              )}
            </p>
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.items.map((r, i) => (
                <RecipeCardItem key={r.id} recipe={r} priority={i === 0} />
              ))}
            </div>
            <Pagination page={recipes.page || page} totalPages={totalPages} />
          </>
        )}
      </div>
    </>
  );
}
