import type { Metadata } from 'next';
import { Fraunces, Hanken_Grotesk, Tiro_Devanagari_Hindi } from 'next/font/google';
import './globals.css';

const serif = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const sans = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const deva = Tiro_Devanagari_Hindi({
  subsets: ['latin', 'devanagari'],
  variable: '--font-deva',
  display: 'swap',
  weight: '400',
});

// NOTE: replace with the live domain once acquired (see MANUAL_STEPS.md).
const SITE_URL = 'https://organikally.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Organikally — Cold-Pressed Organic Mustard Oil & Pantry',
    template: '%s · Organikally',
  },
  description:
    'Cold-pressed organic yellow mustard oil (शुद्ध सरसों तेल), pulses and khand — made from organically grown seed, nothing refined out. Pure · Natural · Trusted.',
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
    title: 'Organikally — Cold-Pressed Organic Mustard Oil & Pantry',
    description:
      'Made from organically grown seed, cold-pressed the slow way. Mustard oil, pulses & khand.',
    images: [{ url: '/hero/poster.jpg', width: 1280, height: 720, alt: 'Organikally cold-pressed yellow mustard oil' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Organikally — Cold-Pressed Organic Mustard Oil & Pantry',
    description: 'Made from organically grown seed, cold-pressed the slow way.',
    images: ['/hero/poster.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${serif.variable} ${sans.variable} ${deva.variable}`}>
      <body className="bg-cream font-sans text-charcoal antialiased">{children}</body>
    </html>
  );
}
