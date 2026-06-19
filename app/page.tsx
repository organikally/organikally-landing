import HeroScrub from '@/components/hero/HeroScrub';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Hero from '@/components/sections/Hero';
import TrustStrip from '@/components/sections/TrustStrip';
import Story from '@/components/sections/Story';
import Interstitial from '@/components/sections/Interstitial';
import Product from '@/components/sections/Product';
import Range from '@/components/sections/Range';
import Sourcing from '@/components/sections/Sourcing';
import SocialProof from '@/components/sections/SocialProof';
import Recipes from '@/components/sections/Recipes';
import JournalTeaser from '@/components/sections/JournalTeaser';
import Faq from '@/components/sections/Faq';
import Conversion from '@/components/sections/Conversion';
import JsonLd from '@/components/seo/JsonLd';
import {
  organizationSchema,
  websiteSchema,
  productSchema,
  faqSchema,
} from '@/lib/schema';

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema(), productSchema(), faqSchema()]} />
      <HeroScrub />
      <SiteHeader />

      <main className="relative z-10">
        <Hero />
        <TrustStrip />
        <Story />
        <Interstitial>
          From the seed, slowly. The oil the way your grandmother would recognise it.
        </Interstitial>
        <Product />
        <Range />
        <Sourcing />
        <SocialProof />
        <Recipes />
        <JournalTeaser />
        <Faq />
        <Conversion />
        <SiteFooter />
      </main>
    </>
  );
}
