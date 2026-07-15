import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import StoreProviders from '@/components/store/StoreProviders';
import FloatingCart from '@/components/store/FloatingCart';
import BannerCarousel, { type BannerSlide } from '@/components/store/BannerCarousel';
import ProductCard from '@/components/store/ProductCard';
import StoreTrustBand from '@/components/store/StoreTrustBand';
import MembershipBanner from '@/components/store/MembershipBanner';
import Story from '@/components/sections/Story';
import Sourcing from '@/components/sections/Sourcing';
import Benefits from '@/components/sections/Benefits';
import Compare from '@/components/sections/Compare';
import Proof from '@/components/sections/Proof';
import Recipes from '@/components/sections/Recipes';
import SocialProof from '@/components/sections/SocialProof';
import Quiz from '@/components/sections/Quiz';
import JournalTeaser from '@/components/sections/JournalTeaser';
import Faq from '@/components/sections/Faq';
import Conversion from '@/components/sections/Conversion';
import JsonLd from '@/components/seo/JsonLd';
import { organizationSchema, websiteSchema, productSchema, faqSchema } from '@/lib/schema';
import { getProducts, getStoreConfig, getFeatured, getHero } from '@/lib/store/api';

// The homepage is a brand-first landing, deliberately distinct from /store: a
// full-screen hero, then a two-row bestseller/featured showcase, then the oil's
// traditional journey, then the Club — before the rest of the shop and the brand
// narrative. Where /store leads with merchandising, home leads with the story.
// ISR (§2.3): tagged fetches revalidate on catalog publish.
export const revalidate = 300;

/** Integer-rupee display for banner copy — ₹999, never ₹999.00. */
function inr(paise: number): string {
  return `₹${Math.round(paise / 100).toLocaleString('en-IN')}`;
}

export default async function Home() {
  const [featured, hero, config, everything] = await Promise.all([
    getFeatured(),
    getHero(),
    getStoreConfig(),
    getProducts({ page_size: 100 }),
  ]);

  // Two-row showcase: the featured/bestseller picks first, topped up from the
  // catalogue to a clean eight (two rows of four on desktop). Products live ONLY
  // here on the homepage — category/concern browsing and the deeper rails belong
  // to /store, so the two pages stay distinct.
  const featuredIds = new Set(featured.map((p) => p.id));
  const showcase = [
    ...featured,
    ...(everything?.items ?? []).filter((p) => !featuredIds.has(p.id)),
  ].slice(0, 8);

  const freeShip = inr(config?.free_shipping_threshold_paise ?? 99900);
  const flatFee = inr(config?.flat_fee_paise ?? 4900);

  // Full-screen hero stage. Copy stays within the approved claim set; the first
  // slide's image is the LCP element — a static, pre-optimized triplet, never video.
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
      cta2: { label: 'See the range', href: '#range' },
    },
    {
      key: 'pantry',
      imageBase: '/media/pantry',
      imageAlt: 'Glass jars of grains and a masala dabba on a sunlit pantry shelf',
      eyebrow: 'The whole pantry',
      title: 'One pantry. Zero shortcuts.',
      body: 'Organic dals, hand-churned ghee, sun-cured achaar — made the way home remembers.',
      cta: { label: 'Shop the pantry', href: '/store/' },
      cta2: { label: 'Our story', href: '#story' },
    },
    {
      key: 'delivery',
      imageBase: '/media/oil-swirl',
      imageAlt: 'Golden mustard oil rippling in a ceramic bowl',
      eyebrow: 'Simple, honest delivery',
      title: `Free delivery over ${freeShip}.`,
      body: `Flat ${flatFee} below that — no surprises at checkout.`,
      cta: { label: 'Start your basket', href: '/store/' },
    },
  ];

  return (
    <StoreProviders>
      <JsonLd data={[organizationSchema(), websiteSchema(), productSchema(), faqSchema()]} />
      <SiteHeader />

      {/* No top padding — the full-screen hero sits under the floating header. */}
      <main id="main">
        {/* 1 — Full-screen cinematic hero. */}
        <BannerCarousel slides={slides} firstIsH1 fullBleed />

        {/* 2 — Two rows of bestsellers / featured picks. The ONLY product grid on
            the homepage (deeper browsing lives on /store). Holds the #range anchor. */}
        {showcase.length > 0 && (
          <section
            id="range"
            className="mx-auto max-w-container scroll-mt-36 px-5 pt-16 md:px-10 md:pt-24"
            aria-label="Bestsellers and featured picks"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Handpicked</p>
                <h2 className="mt-3 font-display text-2xl text-ink md:text-3xl">
                  Bestsellers &amp; featured picks
                </h2>
              </div>
              <Link
                href="/store/#catalog"
                className="group hidden shrink-0 items-center gap-1.5 pb-1 text-sm font-semibold text-forest transition-colors hover:text-forest-deep sm:inline-flex"
              >
                Shop all
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
              {showcase.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* 3 — The Traditional Journey of Our Oil (seed → bottle). */}
        <Sourcing />

        {/* 4 — Organikaly Club membership. */}
        <div className="mx-auto mt-16 max-w-container px-5 md:mt-24 md:px-10">
          <MembershipBanner />
        </div>

        {/* 5 — Then the rest: brand story, the wider shop, and everything else. */}
        <Story />
        <Benefits />
        <Compare />
        <Proof />

        <div className="mx-auto mt-16 max-w-container px-5 md:mt-24 md:px-10">
          <StoreTrustBand />

          {config && config.store_enabled === false && (
            <p className="mt-6 rounded-card border border-line bg-surface px-5 py-4 text-sm text-ink-muted">
              Our store is briefly unavailable for orders. You can keep browsing — please check back
              shortly.
            </p>
          )}

          <div id="catalog" className="mt-14 scroll-mt-36 md:mt-20">
            <div className="overflow-hidden rounded-card bg-forest px-6 py-10 text-center md:px-12 md:py-14">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-yellow">
                The full pantry
              </p>
              <h2 className="mt-3 font-display text-2xl text-paper md:text-3xl">
                Everything, in one honest shop
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-paper/80">
                Cold-pressed oils, unpolished dals, stone-ground atta and sun-cured achaar — the
                whole range, with live stock and simple delivery.
              </p>
              <Link
                href="/store/"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-3 text-[0.95rem] font-semibold text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition duration-300 ease-brand hover:-translate-y-[2px] hover:bg-yellow-deep"
              >
                Shop the full range
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <Recipes />
        <SocialProof />
        <Quiz />
        <JournalTeaser />
        <Faq />
        <Conversion />
      </main>

      <FloatingCart />
      <SiteFooter />
    </StoreProviders>
  );
}
