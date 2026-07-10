import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';
import Gallery from '@/components/store/Gallery';
import Price from '@/components/store/Price';
import StockBadge from '@/components/store/StockBadge';
import PdpBuyBox from '@/components/store/PdpBuyBox';
import SocialShare from '@/components/store/SocialShare';
import RelatedProducts from '@/components/store/RelatedProducts';
import ReviewsSection from '@/components/store/ReviewsSection';
import DeliveryCheck from '@/components/store/DeliveryCheck';
import { RecordRecentlyViewed } from '@/components/store/RecentlyViewed';
import RatingStars from '@/components/store/RatingStars';
import { getProduct, getRelated, getProductReviews } from '@/lib/store/api';
import { storeProductSchema, storeBreadcrumbSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

// PDP is REQUEST-TIME SSR (STORE_CONTRACT §2.2): force-dynamic + a `no-store` product
// fetch, no generateStaticParams. Crawlers/social scrapers always get full HTML with
// fresh price + availability + JSON-LD — no stale-while-revalidate window.
export const dynamic = 'force-dynamic';

function truncate(s: string, n: number): string {
  const clean = s.replace(/\s+/g, ' ').trim();
  return clean.length > n ? `${clean.slice(0, n - 1).trimEnd()}…` : clean;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: 'Product not found', robots: { index: false } };

  const title = product.seo_title || product.name;
  const description = product.seo_description || truncate(product.description, 160);
  const canonical = product.canonical_path || `/store/${product.slug}/`;
  const ogImage = product.og_image || product.images?.[0] || product.primary_image;
  const priceAmount = (product.price_paise / 100).toFixed(2);

  return {
    title,
    description,
    alternates: { canonical },
    // §10: emit the product OG via raw `other` tags (Next's openGraph.type union has no
    // 'product'). Clear the inherited website OG/twitter so og:type isn't duplicated.
    openGraph: null,
    twitter: null,
    other: {
      'og:type': 'product',
      'og:title': title,
      'og:description': description,
      'og:image': ogImage,
      'og:url': `${SITE_URL}${canonical}`,
      'og:site_name': 'Organikaly',
      'product:price:amount': priceAmount,
      'product:price:currency': 'INR',
      'product:availability': product.in_stock ? 'in stock' : 'out of stock',
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImage,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [related, reviews] = await Promise.all([getRelated(slug), getProductReviews(slug)]);
  const canonical = product.canonical_path || `/store/${product.slug}/`;
  const shareUrl = `${SITE_URL}${canonical}`;
  const images = product.images?.length ? product.images : [product.primary_image];
  const paragraphs = product.description.split(/\n{2,}/).filter((p) => p.trim());

  return (
    <>
      <JsonLd
        data={[
          storeProductSchema(product, reviews),
          storeBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/store/' },
            { name: product.category, path: `/store/?category=${encodeURIComponent(product.category)}` },
            { name: product.name, path: canonical },
          ]),
        ]}
      />

      <div className="mx-auto max-w-container px-5 pb-24 pt-6 md:px-10">
        <RecordRecentlyViewed
          slug={product.slug}
          name={product.name}
          image={product.primary_image}
          pricePaise={product.price_paise}
        />
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-ink-faint">
          <Link href="/store/" className="hover:text-ink">
            Shop
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/store/?category=${encodeURIComponent(product.category)}`} className="hover:text-ink">
            {product.category}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ink-muted">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Gallery images={images} alt={product.name} />

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <p className="eyebrow eyebrow-bare text-ink-faint">{product.category}</p>
              {product.badges?.map((b) => (
                <span
                  key={b}
                  className="rounded-chip bg-surface px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-ink-muted"
                >
                  {b}
                </span>
              ))}
            </div>

            <h1 className="t-title mt-3 font-semibold text-ink">{product.name}</h1>
            {reviews.summary.count > 0 && reviews.summary.average != null && (
              <a href="#reviews" className="mt-2.5 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink">
                <RatingStars value={reviews.summary.average} size={15} />
                <span className="tnum font-semibold text-ink">{reviews.summary.average.toFixed(1)}</span>
                <span>
                  {reviews.summary.count} {reviews.summary.count === 1 ? 'review' : 'reviews'}
                </span>
              </a>
            )}
            {product.subtitle && <p className="t-lead mt-3">{product.subtitle}</p>}

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Price
                pricePaise={product.price_paise}
                compareAtPaise={product.compare_at_price_paise}
                size="lg"
              />
              <StockBadge
                inStock={product.in_stock}
                lowStock={product.low_stock}
                sellableQty={product.sellable_qty}
              />
            </div>

            <PdpBuyBox product={product} />

            <DeliveryCheck />

            <div className="mt-8 border-t border-line pt-6">
              <SocialShare url={shareUrl} title={product.name} />
            </div>

            {(product.pack_size || product.sku_code) && (
              <dl className="mt-6 grid grid-cols-2 gap-y-2 text-sm">
                {product.pack_size && (
                  <>
                    <dt className="text-ink-faint">Pack size</dt>
                    <dd className="text-ink">{product.pack_size}</dd>
                  </>
                )}
                {product.sku_code && (
                  <>
                    <dt className="text-ink-faint">SKU</dt>
                    <dd className="tnum text-ink">{product.sku_code}</dd>
                  </>
                )}
              </dl>
            )}
          </div>
        </div>

        {/* Description */}
        <section className="mt-16 max-w-measure border-t border-line pt-10">
          <h2 className="t-subtitle font-semibold text-ink">About this product</h2>
          <div className="mt-4 space-y-4 leading-relaxed text-ink-muted">
            {paragraphs.length ? (
              paragraphs.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p>{product.description}</p>
            )}
          </div>
        </section>

        <ReviewsSection slug={product.slug} initial={reviews} />

        <RelatedProducts items={related} />
      </div>
    </>
  );
}
