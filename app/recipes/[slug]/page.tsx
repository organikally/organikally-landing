import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Flame, Users, ChefHat, Leaf } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';
import StoreImage from '@/components/store/StoreImage';
import ProductRail from '@/components/store/ProductRail';
import { getRecipe } from '@/lib/store/api';
import { recipeSchema, storeBreadcrumbSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

// Recipe detail — the Recipe rich-result page (RECIPES CONTRACT §4). ISR via the
// tagged fetch; an admin edit/publish revalidates the `recipes` tag on demand.
export const revalidate = 300;

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipe(slug);
  if (!recipe) return { title: 'Recipe not found' };
  const title = recipe.seo_title || recipe.title;
  const description =
    recipe.seo_description || recipe.subtitle || recipe.description.slice(0, 158);
  const path = recipe.canonical_path || `/recipes/${recipe.slug}/`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title: `${title} · Organikaly`,
      description,
      url: `${SITE_URL}${path}`,
      images: [
        { url: recipe.og_image || recipe.hero_image, width: 1300, height: 866, alt: recipe.title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · Organikaly`,
      description,
      images: [recipe.og_image || recipe.hero_image],
    },
  };
}

export default async function RecipePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const recipe = await getRecipe(slug);
  if (!recipe) notFound();

  const meta = [
    { Icon: Clock, label: 'Prep', value: `${recipe.prep_min} min` },
    { Icon: Flame, label: 'Cook', value: `${recipe.cook_min} min` },
    { Icon: Users, label: 'Serves', value: String(recipe.servings) },
    { Icon: ChefHat, label: 'Level', value: recipe.difficulty },
  ];

  return (
    <>
      <JsonLd
        data={[
          recipeSchema(recipe),
          storeBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Recipes', path: '/recipes/' },
            { name: recipe.title, path: recipe.canonical_path || `/recipes/${recipe.slug}/` },
          ]),
        ]}
      />
      <article className="mx-auto max-w-container px-5 pb-24 md:px-10">
        <Link
          href="/recipes/"
          className="group inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-forest transition-colors hover:text-forest-deep"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          All recipes
        </Link>

        {/* Title + hero */}
        <header className="mt-6 grid items-center gap-8 md:grid-cols-[1fr_1.05fr] md:gap-12">
          <div>
            <p className="eyebrow">{recipe.recipe_type}</p>
            <h1 className="t-headline mt-5 font-semibold text-ink">{recipe.title}</h1>
            {recipe.subtitle && <p className="t-lead mt-4">{recipe.subtitle}</p>}
            <dl className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
              {meta.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Icon className="h-[18px] w-[18px] shrink-0 text-yellow-ink" strokeWidth={1.8} />
                  <div>
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                      {label}
                    </dt>
                    <dd className="tnum text-sm font-semibold text-ink">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
          <StoreImage
            src={recipe.hero_image}
            alt={recipe.title}
            width={1300}
            height={866}
            priority
            className="aspect-[3/2] w-full rounded-media shadow-media"
            sizes="(min-width: 768px) 44rem, 100vw"
          />
        </header>

        <p className="t-lead mt-10 max-w-measure border-t border-line pt-8 text-ink-muted md:mt-14">
          {recipe.description}
        </p>

        {/* Ingredients + method */}
        <div className="mt-12 grid gap-10 md:grid-cols-[0.85fr_1.3fr] md:gap-14">
          <aside>
            <div className="rounded-card border border-line bg-surface p-6 md:sticky md:top-28">
              <h2 className="font-display text-2xl text-ink">Ingredients</h2>
              <p className="mt-1 text-sm text-ink-faint">Serves {recipe.servings}</p>
              {recipe.ingredients.map((group, gi) => (
                <div key={gi} className={gi > 0 ? 'mt-6' : 'mt-5'}>
                  {group.heading && (
                    <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-yellow-ink">
                      {group.heading}
                    </h3>
                  )}
                  <ul className={group.heading ? 'mt-3 space-y-2.5' : 'space-y-2.5'}>
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink">
                        <Leaf
                          aria-hidden="true"
                          className="mt-1.5 h-3.5 w-3.5 shrink-0 text-forest"
                          strokeWidth={1.8}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          <div>
            <h2 className="font-display text-2xl text-ink">Method</h2>
            <ol className="mt-6 space-y-7">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="tnum flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest font-display text-lg text-paper">
                    {i + 1}
                  </span>
                  <p className="pt-1.5 leading-relaxed text-ink">{step}</p>
                </li>
              ))}
            </ol>

            {recipe.tips.length > 0 && (
              <div className="mt-10 rounded-card border-l-4 border-yellow bg-surface p-6">
                <h2 className="font-display text-xl text-ink">From our kitchen</h2>
                <ul className="mt-3 space-y-2.5">
                  {recipe.tips.map((tip) => (
                    <li key={tip} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink-muted">
                      <span aria-hidden="true" className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-deep" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Internal linking + commerce: the products this recipe is built on. */}
        <ProductRail
          eyebrow="From the pantry"
          title="Cook it with"
          products={recipe.related_products}
          viewAll={{ label: 'Shop all', href: '/store/' }}
        />
      </article>
    </>
  );
}
