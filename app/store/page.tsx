import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import Filters from '@/components/store/Filters';
import Pagination from '@/components/store/Pagination';
import ProductCard from '@/components/store/ProductCard';
import { getProducts, getCategories, getStoreConfig, type ProductQuery } from '@/lib/store/api';
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
      'Buy cold-pressed organic mustard oil, organic dals and unrefined khand direct from Organikally — made from organically grown seed, nothing refined out.',
    alternates: { canonical: '/store/' },
    openGraph: {
      type: 'website',
      title: 'Shop · Organikally',
      description:
        'Cold-pressed organic mustard oil, organic pulses and unrefined khand — direct from Organikally.',
      url: `${SITE_URL}/store/`,
      images: [{ url: '/hero/poster.jpg', width: 1280, height: 720, alt: 'Organikally store' }],
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

  const [products, categories, config] = await Promise.all([
    getProducts(query),
    getCategories(),
    getStoreConfig(),
  ]);

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
        <header className="border-b border-line py-10 md:py-14">
          <p className="eyebrow">The Organikally store</p>
          <h1 className="t-headline mt-5 max-w-2xl font-semibold text-ink">
            The pantry you&apos;d trust for your own family.
          </h1>
          <p className="t-lead mt-4 max-w-xl">
            Cold-pressed oil, organic dals and unrefined khand — made from organically grown seed,
            delivered to your door.
          </p>
        </header>

        {config && config.store_enabled === false && (
          <p className="mt-6 rounded-card border border-line bg-surface px-5 py-4 text-sm text-ink-muted">
            Our store is briefly unavailable for orders. You can keep browsing — please check back
            shortly.
          </p>
        )}

        <div className="sticky top-20 z-20 -mx-5 mt-8 bg-paper/95 px-5 py-4 backdrop-blur md:top-24 md:mx-0 md:rounded-card md:px-6">
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
    </>
  );
}
