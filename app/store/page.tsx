import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import Filters from '@/components/store/Filters';
import Pagination from '@/components/store/Pagination';
import ProductCard from '@/components/store/ProductCard';
import BannerCarousel, { type BannerSlide } from '@/components/store/BannerCarousel';
import CategoryRail from '@/components/store/CategoryRail';
import ProductRail from '@/components/store/ProductRail';
import StoreTrustBand from '@/components/store/StoreTrustBand';
import StoreJournalRail from '@/components/store/StoreJournalRail';
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

// Listing (STORE_CONTRACT §2.2). Reading searchParams makes the route render
// per-request in Next 15, so the caching that actually holds is at the fetch
// layer: every catalog call is tagged `store-products` with revalidate 300, and
// a catalog publish revalidates on-demand (§2.3). Filter/sort/pagination
// permutations always canonicalize to /store/ (§10).
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

/** Integer-rupee display for banner copy — ₹999, never ₹999.00. */
function inr(paise: number): string {
  return `₹${Math.round(paise / 100).toLocaleString('en-IN')}`;
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

  // The banner/categories/rails showcase belongs to the clean landing view only.
  // Once a shopper narrows the range (category / search / price / stock / page 2+),
  // collapse to a results view so the grid leads instead of the pitch.
  const isBrowsing = Boolean(
    query.category ||
      query.q ||
      query.min_price != null ||
      query.max_price != null ||
      query.availability === 'in_stock' ||
      page > 1,
  );

  const [products, categories, config, hero, featured, oils, pulses] = await Promise.all([
    getProducts(query),
    getCategories(),
    getStoreConfig(),
    isBrowsing ? Promise.resolve(null) : getHero(),
    isBrowsing ? Promise.resolve([]) : getFeatured(),
    isBrowsing
      ? Promise.resolve(null)
      : getProducts({ category: 'Oils', sort: 'featured', page_size: 8 }),
    isBrowsing
      ? Promise.resolve(null)
      : getProducts({ category: 'Pulses', sort: 'featured', page_size: 8 }),
  ]);

  // Fallbacks mirror StoreConfig's model defaults — only reached if the config
  // fetch itself degrades, in which case they match what checkout would charge.
  const freeShip = inr(config?.free_shipping_threshold_paise ?? 99900);
  const flatFee = inr(config?.flat_fee_paise ?? 4900);

  // Promotional banners — copy stays within the approved claim set (cold-pressed /
  // organic / unrefined are process & sourcing descriptors, FSSAI-safe).
  const slides: BannerSlide[] = [
    {
      key: 'ghani',
      imageBase: '/media/field',
      imageAlt: 'Yellow mustard field at golden hour, rows leading to the horizon',
      eyebrow: 'Kachi-ghani mustard',
      hindi: 'सरसों का तेल',
      title: 'Cold-pressed. Never refined.',
      body: 'Yellow mustard oil pressed slow from organically grown seed — nothing added, nothing stripped away.',
      cta: hero
        ? { label: 'Shop mustard oil', href: `/store/${hero.slug}/` }
        : { label: 'Shop oils', href: '/store/?category=Oils' },
      cta2: { label: 'All oils', href: '/store/?category=Oils' },
    },
    {
      key: 'pantry',
      imageBase: '/media/pantry',
      imageAlt: 'Glass jars of grains and a masala dabba on a sunlit pantry shelf',
      eyebrow: 'The whole pantry',
      title: 'One pantry. Zero shortcuts.',
      body: 'Organic dals, hand-churned ghee, sun-cured achaar — made the way home remembers.',
      cta: { label: 'Browse categories', href: '/store/#categories' },
      cta2: { label: 'See featured picks', href: '/store/#featured' },
    },
    {
      key: 'delivery',
      imageBase: '/media/oil-swirl',
      imageAlt: 'Golden mustard oil rippling in a ceramic bowl',
      eyebrow: 'Simple, honest delivery',
      title: `Free delivery over ${freeShip}.`,
      body: `Flat ${flatFee} below that — no surprises at checkout.`,
      cta: { label: 'Start your basket', href: '/store/#catalog' },
    },
  ];

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
          <>
            <BannerCarousel slides={slides} firstIsH1 />
            <CategoryRail categories={categories} />
            {/* Curated picks, not sales data — the numerals are curation order. */}
            <ProductRail
              id="featured"
              eyebrow="Handpicked"
              title="Featured picks"
              products={featured}
              viewAll={{ label: 'View all', href: '/store/#catalog' }}
              ranked
            />
            <StoreTrustBand />
            <ProductRail
              eyebrow="The ghani section"
              title="Cold-pressed oils"
              products={oils?.items ?? []}
              viewAll={{ label: 'All oils', href: '/store/?category=Oils' }}
            />
            <ProductRail
              eyebrow="Everyday staples"
              title="Dals & pulses"
              products={pulses?.items ?? []}
              viewAll={{ label: 'All pulses', href: '/store/?category=Pulses' }}
            />
          </>
        )}

        {config && config.store_enabled === false && (
          <p className="mt-6 rounded-card border border-line bg-surface px-5 py-4 text-sm text-ink-muted">
            Our store is briefly unavailable for orders. You can keep browsing — please check back
            shortly.
          </p>
        )}

        <div id="catalog" className="scroll-mt-36">
          {!isBrowsing && (
            <div className="mt-14 border-b border-line pb-5 md:mt-20">
              <p className="eyebrow">The full range</p>
              <h2 className="mt-3 font-display text-2xl text-ink md:text-3xl">Everything in the pantry</h2>
            </div>
          )}

          <div className="sticky top-32 z-20 -mx-5 mt-6 bg-paper/95 px-5 py-4 backdrop-blur md:top-36 md:mx-0 md:rounded-card md:px-6">
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

        {!isBrowsing && <StoreJournalRail />}
      </div>
    </>
  );
}
