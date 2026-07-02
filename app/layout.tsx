import type { Metadata } from 'next';
import { Chelsea_Market, Bricolage_Grotesque, Poppins, Tiro_Devanagari_Hindi } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/ui/SmoothScroll';
import { SITE_URL } from '@/lib/site';

// Display face for headings: Chelsea Market — a warm, casual slab/display face with
// a handcrafted character. Single weight (400), no italic.
const display = Chelsea_Market({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: '400',
});

// Body / paragraph face: Bricolage Grotesque — a contemporary grotesque with a
// little character, readable at text sizes; counterpart to the Chelsea Market display.
const sans = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Heading face for the Ojasya-replication sections: Poppins — the heavy, geometric,
// uppercase-friendly grotesque behind the reference's section titles, product names and
// benefit headings. Used via `font-heading`; the film hero keeps Chelsea Market.
const heading = Poppins({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['600', '700', '800'],
});

const deva = Tiro_Devanagari_Hindi({
  subsets: ['latin', 'devanagari'],
  variable: '--font-deva',
  display: 'swap',
  weight: '400',
  // Only a few words use this, don't let it compete with the LCP critical path.
  preload: false,
});

// SITE_URL is the single source of truth (STORE_CONTRACT §2.4) — imported from
// @/lib/site so canonical/OG/sitemap URLs cannot diverge across the app.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Organikally, Cold-Pressed Organic Mustard Oil & Pantry',
    template: '%s · Organikally',
  },
  description:
    'Cold-pressed organic yellow mustard oil (शुद्ध सरसों तेल), pulses and khand, made from organically grown seed, nothing refined out. Pure · Natural · Trusted.',
  applicationName: 'Organikally',
  keywords: [
    'cold-pressed mustard oil',
    'organic mustard oil',
    'yellow mustard oil',
    'kachi ghani',
    'organic dals',
    'organic khand',
    'organic pantry India',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Organikally',
    title: 'Organikally, Cold-Pressed Organic Mustard Oil & Pantry',
    description:
      'Made from organically grown seed, cold-pressed the slow way. Mustard oil, pulses & khand.',
    images: [{ url: '/hero/poster.jpg', width: 1280, height: 720, alt: 'Organikally cold-pressed yellow mustard oil' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Organikally, Cold-Pressed Organic Mustard Oil & Pantry',
    description: 'Made from organically grown seed, cold-pressed the slow way.',
    images: ['/hero/poster.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${heading.variable} ${sans.variable} ${deva.variable}`}
    >
      <head>
        {/* Start fetching the hero film as early as possible so it's ready to play. */}
        <link rel="preload" as="video" href="/hero/hero.mp4" type="video/mp4" />
      </head>
      <body className="bg-paper font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only z-[100] rounded-lg bg-ink px-4 py-2 font-semibold text-paper focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
