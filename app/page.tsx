import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import StoreProviders from '@/components/store/StoreProviders';
import FloatingCart from '@/components/store/FloatingCart';
import BannerCarousel, { type BannerSlide } from '@/components/store/BannerCarousel';
import CategoryRail from '@/components/store/CategoryRail';
import ProductRail from '@/components/store/ProductRail';
import ShopByConcern, { type Concern } from '@/components/store/ShopByConcern';
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
import {
  getProducts,
  getCategories,
  getStoreConfig,
  getFeatured,
  getHero,
} from '@/lib/store/api';

// The homepage is now a store-forward landing: the film hero is gone and the
// storefront's own merchandising (banner, categories, live product rails,
// shop-by-concern, membership, trust) leads, with the brand narrative
// (story → process → benefits → compare → proof → recipes → reviews → journal →
// faq → conversion) below it. A visitor scrolls once and gets the whole gist —
// what we sell AND why us. ISR (§2.3): tagged fetches revalidate on catalog publish.
export const revalidate = 300;

/** Integer-rupee display for banner copy — ₹999, never ₹999.00. */
function inr(paise: number): string {
  return `₹${Math.round(paise / 100).toLocaleString('en-IN')}`;
}

export default async function Home() {
  const [categories, featured, hero, config, oils, pulses, everything] = await Promise.all([
    getCategories(),
    getFeatured(),
    getHero(),
    getStoreConfig(),
    getProducts({ category: 'Oils', sort: 'featured', page_size: 8 }),
    getProducts({ category: 'Pulses', sort: 'featured', page_size: 8 }),
    getProducts({ page_size: 100 }),
  ]);

  // Shop-by-Concern curation — merchandising groups over the live catalog.
  // Slugs that aren't published simply drop out of their shelf.
  const bySlug = new Map((everything?.items ?? []).map((p) => [p.slug, p]));
  const pick = (slugs: string[]) =>
    slugs.map((s) => bySlug.get(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const concerns: Concern[] = [
    {
      key: 'heart-health',
      label: 'Heart-Health',
      products: pick([
        'cold-pressed-yellow-mustard-oil-1l',
        'cold-pressed-groundnut-mungfali-oil-1l',
        'cold-pressed-sesame-til-oil-1l',
        'cold-pressed-yellow-mustard-oil-5l',
      ]),
    },
    {
      key: 'weight-management',
      label: 'Weight Management',
      products: pick([
        'organic-moong-dal-split-1kg',
        'organic-toor-arhar-dal-1kg',
        'stone-ground-whole-wheat-atta-5kg',
        'cold-pressed-virgin-coconut-oil-500ml',
      ]),
    },
    {
      key: 'diabetes-friendly',
      label: 'Diabetes Friendly',
      products: pick([
        'organic-chana-dal-1kg',
        'organic-rajma-kidney-beans-1kg',
        'stone-ground-whole-wheat-atta-5kg',
        'cold-pressed-sesame-til-oil-1l',
      ]),
    },
    {
      key: 'bone-muscle',
      label: 'Bone & Muscle Health',
      products: pick([
        'organic-urad-dal-whole-black-1kg',
        'a2-desi-cow-ghee-bilona-500ml',
        'organic-rajma-kidney-beans-1kg',
        'organic-moong-dal-split-1kg',
      ]),
    },
    {
      key: 'low-energy',
      label: 'Low Energy',
      products: pick([
        'organic-jaggery-gur-1kg',
        'raw-forest-honey-500g',
        'desi-khand-raw-cane-sugar-1kg',
        'a2-desi-cow-ghee-bilona-500ml',
      ]),
    },
    {
      key: 'digestion',
      label: 'Digestion Issues',
      products: pick([
        'organic-turmeric-haldi-powder-200g',
        'organic-coriander-dhania-powder-200g',
        'mango-pickle-aam-ka-achaar-500g',
        'organic-moong-dal-split-1kg',
      ]),
    },
  ];

  // Fallbacks mirror StoreConfig's model defaults — only reached if the config
  // fetch itself degrades, in which case they match what checkout would charge.
  const freeShip = inr(config?.free_shipping_threshold_paise ?? 99900);
  const flatFee = inr(config?.flat_fee_paise ?? 4900);

  // Above-the-fold stage. Copy stays within the approved claim set (cold-pressed /
  // organic / unrefined are process & sourcing descriptors, FSSAI-safe). The first
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
      cta2: { label: 'See the full range', href: '#catalog' },
    },
    {
      key: 'pantry',
      imageBase: '/media/pantry',
      imageAlt: 'Glass jars of grains and a masala dabba on a sunlit pantry shelf',
      eyebrow: 'The whole pantry',
      title: 'One pantry. Zero shortcuts.',
      body: 'Organic dals, hand-churned ghee, sun-cured achaar — made the way home remembers.',
      cta: { label: 'Browse categories', href: '#range' },
      cta2: { label: 'Shop featured picks', href: '#featured' },
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

      {/* Top padding clears the fixed glass header pill (the old sticky film stage
          used to provide this clearance). */}
      <main id="main" className="pt-24 md:pt-28">
        {/* ── The shop, up front ─────────────────────────────────────────── */}
        <div className="mx-auto max-w-container px-5 pb-2 md:px-10">
          <BannerCarousel slides={slides} firstIsH1 />

          <div id="range" className="scroll-mt-36">
            <CategoryRail categories={categories} />
          </div>

          {/* Curated picks, not sales data — the numerals are curation order. */}
          <ProductRail
            id="featured"
            eyebrow="Handpicked"
            title="Featured picks"
            products={featured}
            viewAll={{ label: 'View all', href: '/store/#catalog' }}
            ranked
          />

          <ShopByConcern concerns={concerns} />

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

          <MembershipBanner />
          <StoreTrustBand />

          {config && config.store_enabled === false && (
            <p className="mt-6 rounded-card border border-line bg-surface px-5 py-4 text-sm text-ink-muted">
              Our store is briefly unavailable for orders. You can keep browsing — please check back
              shortly.
            </p>
          )}

          {/* Full-range CTA — the landing shows the highlights; the whole grid lives
              at /store. Also the in-page #catalog target for the category / concern
              "view all" links. */}
          <div id="catalog" className="scroll-mt-36 mt-14 md:mt-20">
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

        {/* ── Why us — the brand gist, told in one scroll ─────────────────── */}
        <Story />
        <Sourcing />
        <Benefits />
        <Compare />
        <Proof />
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
