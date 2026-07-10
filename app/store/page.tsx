import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import Filters from '@/components/store/Filters';
import Pagination from '@/components/store/Pagination';
import ProductCard from '@/components/store/ProductCard';
import StoreHero from '@/components/store/StoreHero';
import FeaturedRow from '@/components/store/FeaturedRow';
import {
  getProducts,
  getCategories,
  getStoreConfig,
  getFeatured,
  getHero,
  type ProductQuery,
} from '@/lib/store/api';
import { storeBreadcrumbSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

// ISR listing (STORE_CONTRACT §2.2). The product fetch is tagged `store-products`
// so a catalog publish revalidates the grid on-demand (§2.3). Filter/sort/pagination
// permutations are served dynamically but always canonicalize to /store/ (§10).
export const revalidate = 300;

const PAGE_SIZE = 12;

export function generateMetadata(): Metadata {
  // Self-canonical to /store/ ignoring ALL query params (§10) so filtered/paginated
  // permutations don't dilute the index.
  return {
    title: 'Shop',
    description:
      'Buy cold-pressed organic mustard oil, organic dals and unrefined khand direct from Organikaly — made from organically grown seed, nothing refined out.',
    alternates: { canonical: '/store/' },
    openGraph: {
      type: 'website',
      title: 'Shop · Organikaly',
      description:
        'Cold-pressed organic mustard oil, organic pulses and unrefined khand — direct from Organikaly.',
      url: `${SITE_URL}/store/`,
      images: [{ url: '/hero/poster.jpg', width: 1280, height: 720, alt: 'Organikaly store' }],
    },
  };
}

type SP = Record<string, string | string[] | undefined>;

function str(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}
function num(v: string | string[] | undefined): number | undefined {
  const s = str(v);
  if (s == null || s === '') return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}

export default async function StoreListingPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, num(sp.page) ?? 1);
  const sortRaw = str(sp.sort);
  const availabilityRaw = str(sp.availability);

  const query: ProductQuery = {
    category: str(sp.category),
    min_price: num(sp.min_price),
    max_price: num(sp.max_price),
    availability: availabilityRaw === 'in_stock' ? 'in_stock' : 'all',
    q: str(sp.q),
    sort:
      sortRaw === 'newest' || sortRaw === 'price_asc' || sortRaw === 'price_desc' || sortRaw === 'featured'
        ? sortRaw
        : undefined,
    page,
    page_size: PAGE_SIZE,
  };

  // The hero + featured showcase belongs to the clean landing view only. Once a shopper
  // narrows the range (category / search / price / stock / page 2+), swap it for a
  // compact results header so the grid leads instead of the brand pitch.
  const isBrowsing = Boolean(
    query.category ||
      query.q ||
      query.min_price != null ||
      query.max_price != null ||
      query.availability === 'in_stock' ||
      page > 1,
  );

  const [products, categories, config, hero, featured] = await Promise.all([
    getProducts(query),
    getCategories(),
    getStoreConfig(),
    isBrowsing ? Promise.resolve(null) : getHero(),
    isBrowsing ? Promise.resolve([]) : getFeatured(),
  ]);

  // Drop the spotlight product from the featured strip so it isn't shown twice.
  const heroId = hero?.id;
  const featuredStrip = featured.filter((p) => p.id !== heroId);

  const totalPages = Math.max(1, Math.ceil((products.total || 0) / (products.page_size || PAGE_SIZE)));

  return (
    <>
      <JsonLd
        data={storeBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Shop', path: '/store/' },
        ])}
      />
      <div className="mx-auto max-w-container px-5 pb-24 md:px-10">
        {isBrowsing ? (
          <header className="border-b border-line py-8 md:py-10">
            <p className="eyebrow">The Organikaly store</p>
            <h1 className="mt-4 font-display text-3xl font-semibold text-ink md:text-4xl">
              {query.category
                ? categories.find((c) => c.key === query.category)?.label ?? 'Shop'
                : query.q
                  ? `Results for “${query.q}”`
                  : 'Shop the pantry'}
            </h1>
          </header>
        ) : (
          <div className="pt-6 md:pt-10">
            <StoreHero product={hero} />
            <FeaturedRow products={featuredStrip} />
          </div>
        )}

        {config && config.store_enabled === false && (
          <p className="mt-6 rounded-card border border-line bg-surface px-5 py-4 text-sm text-ink-muted">
            Our store is briefly unavailable for orders. You can keep browsing — please check back
            shortly.
          </p>
        )}

        <div id="catalog" className="scroll-mt-24">
          {!isBrowsing && (
            <div className="mt-14 border-b border-line pb-5 md:mt-20">
              <p className="eyebrow">The full range</p>
              <h2 className="mt-3 font-display text-2xl text-ink md:text-3xl">Everything in the pantry</h2>
            </div>
          )}

          <div className="sticky top-20 z-20 -mx-5 mt-6 bg-paper/95 px-5 py-4 backdrop-blur md:top-24 md:mx-0 md:rounded-card md:px-6">
            <Filters categories={categories} />
          </div>

          {products.items.length === 0 ? (
            <div className="mt-16 rounded-card border border-line bg-surface px-6 py-16 text-center">
              <p className="font-display text-2xl text-ink">No products match your filters.</p>
              <p className="mt-2 text-ink-muted">
                Try widening the price range or clearing filters to see the full range.
              </p>
            </div>
          ) : (
            <>
              <p className="mt-8 text-sm text-ink-faint">
                {products.total} {products.total === 1 ? 'product' : 'products'}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {products.items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              <Pagination page={products.page || page} totalPages={totalPages} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
