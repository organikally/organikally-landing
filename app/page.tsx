import HeroScrub from '@/components/hero/HeroScrub';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Hero from '@/components/sections/Hero';
import TrustStrip from '@/components/sections/TrustStrip';
import Story from '@/components/sections/Story';
import Product from '@/components/sections/Product';
import Range from '@/components/sections/Range';
import Sourcing from '@/components/sections/Sourcing';
import SocialProof from '@/components/sections/SocialProof';
import Recipes from '@/components/sections/Recipes';
import JournalTeaser from '@/components/sections/JournalTeaser';
import Faq from '@/components/sections/Faq';
import Conversion from '@/components/sections/Conversion';
import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import JsonLd from '@/components/seo/JsonLd';
import { organizationSchema, websiteSchema, productSchema, faqSchema } from '@/lib/schema';

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema(), productSchema(), faqSchema()]} />
      <HeroScrub />
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
        <div className="relative rounded-t-[2.5rem] bg-paper shadow-[0_-44px_80px_-30px_rgba(28,25,18,0.5)]">
          <TrustStrip />
          <Story />
          <Product />
          <Range />
          {/* A breath of the field — the literal source — leading into "field to bottle". */}
          <section aria-hidden="true" className="px-5 py-6 md:px-10 md:py-10">
            <div className="mx-auto max-w-container">
              <Reveal>
                <Media
                  name="field-band"
                  alt=""
                  width={1920}
                  height={640}
                  className="h-[34vh] max-h-[420px] min-h-[220px] rounded-[2rem] shadow-[0_44px_90px_-52px_rgba(28,25,18,0.6)]"
                  imgClassName="object-[50%_55%]"
                />
              </Reveal>
            </div>
          </section>
          <Sourcing />
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
