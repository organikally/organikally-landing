import HeroFilm from '@/components/hero/HeroFilm';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Hero from '@/components/sections/Hero';
import TrustStrip from '@/components/sections/TrustStrip';
import Proof from '@/components/sections/Proof';
import Story from '@/components/sections/Story';
import Benefits from '@/components/sections/Benefits';
import Range from '@/components/sections/Range';
import Sourcing from '@/components/sections/Sourcing';
import Compare from '@/components/sections/Compare';
import Quiz from '@/components/sections/Quiz';
import ShopTeaser from '@/components/sections/ShopTeaser';
import SocialProof from '@/components/sections/SocialProof';
import Recipes from '@/components/sections/Recipes';
import JournalTeaser from '@/components/sections/JournalTeaser';
import Faq from '@/components/sections/Faq';
import Conversion from '@/components/sections/Conversion';
import JsonLd from '@/components/seo/JsonLd';
import { organizationSchema, websiteSchema, productSchema, faqSchema } from '@/lib/schema';

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema(), productSchema(), faqSchema()]} />
      <HeroFilm />
      <SiteHeader />

      <main id="main" className="relative z-10">
        {/* Act 1 — the film plays out. A tall stage gives the scrub its scroll distance;
            the sparse hero stays pinned over the uncovered video, then fades. */}
        <section id="hero-stage" className="relative h-[280vh]">
          <div className="sticky top-0 h-[100dvh] overflow-hidden">
            <Hero />
          </div>
        </section>

        {/* Act 2 — content rises over the final frame and takes the stage. */}
        <div className="relative rounded-t-[2.5rem] bg-cream shadow-[0_-44px_80px_-30px_rgba(28,25,18,0.5)]">
          <TrustStrip />
          <Proof />
          {/* Brand story + Pure/Natural/Trusted promise (replaces the single-product spread). */}
          <Story />
          {/* Approved-claim benefits, warmed into homely blob wells. */}
          <Benefits />
          {/* The field-to-bottle process, immediately below the product it explains. */}
          <Sourcing />
          {/* Why ours differs from ordinary refined oil, told plainly. */}
          <Compare />
          <Range />
          {/* A friendly matcher that routes intent straight to an order path. */}
          <Quiz />
          {/* Honest shop grid — real order paths, no invented pricing. */}
          <ShopTeaser />
          <SocialProof />
          <Recipes />
          <JournalTeaser />
          <Faq />
          <Conversion />
          <SiteFooter />
        </div>
      </main>
    </>
  );
}
