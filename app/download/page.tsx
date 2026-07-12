import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Repeat,
  Truck,
  Coins,
  BadgeCheck,
  BellRing,
  Apple,
  Play,
  Mail,
  ArrowRight,
  House,
  Boxes,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import MarketingShell, { Section, PageHero } from '@/components/marketing/MarketingShell';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Download the app',
  description:
    'Browse the Organikaly pantry, track orders, earn Organikaly Coins and join Organikaly Club from your phone. Launching soon on iOS and Android.',
  alternates: { canonical: '/download/' },
};

// Download page. The app is not published yet, so the store buttons are honestly
// provisional (aria-disabled, inert, "launching soon") and the real call to action
// is a notify-me email. The phone is a CSS mock of on-brand blocks, never a fake
// screenshot. Kept a server component; motion comes from the shared Reveal client.

type Feature = { icon: LucideIcon; title: string; body: string };

const features: Feature[] = [
  {
    icon: Repeat,
    title: 'Faster reorder',
    body: 'Your regulars are one tap away. Refill the pantry without hunting the shelf again.',
  },
  {
    icon: Truck,
    title: 'Live order tracking',
    body: 'See where your order is, from packed to at your door, without an email chase.',
  },
  {
    icon: Coins,
    title: 'Organikaly Coins wallet',
    body: 'Earn Coins on orders and spend them at checkout. All of it in one place.',
  },
  {
    icon: BadgeCheck,
    title: 'Members-only Organikaly Club',
    body: 'Club pricing and early access to fresh batches, carried into the app.',
  },
  {
    icon: BellRing,
    title: 'Instant order & offer updates',
    body: 'A ping when your order moves and when something worth knowing goes live.',
  },
];

const notifyMailto = `mailto:${site.email}?subject=${encodeURIComponent(
  'Notify me when the Organikaly app launches',
)}`;

// A tasteful CSS device: on-brand blocks standing in for the app, no fabricated
// screenshots or numbers. Purely decorative, so hidden from assistive tech.
function PhoneMock() {
  return (
    <div aria-hidden="true" className="mx-auto w-[248px] select-none sm:w-[264px]">
      <div className="rounded-[2.4rem] border border-ink/15 bg-ink p-2.5 shadow-lg">
        <div className="overflow-hidden rounded-[1.9rem] bg-paper">
          {/* App top bar */}
          <div className="flex items-center justify-between bg-forest-deep px-4 py-3">
            <span className="font-display text-sm text-cream">Organikaly</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow px-2 py-0.5 text-[10px] font-semibold text-ink">
              <Coins className="h-3 w-3" strokeWidth={1.8} />
              Coins
            </span>
          </div>
          {/* Feature banner */}
          <div className="px-3 pt-3">
            <div className="rounded-card bg-yellow/20 p-4">
              <div className="h-2 w-20 rounded-full bg-yellow" />
              <div className="mt-2 h-1.5 w-28 rounded-full bg-forest/30" />
            </div>
          </div>
          {/* Product tiles */}
          <div className="grid grid-cols-2 gap-2.5 p-3">
            {[0, 1, 2, 3].map((n) => (
              <div key={n} className="rounded-chip border border-line bg-surface p-2.5">
                <div className="aspect-square rounded-chip bg-forest/10" />
                <div className="mt-2 h-1.5 w-full rounded-full bg-line" />
                <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-line" />
              </div>
            ))}
          </div>
          {/* Bottom nav */}
          <div className="flex items-center justify-around border-t border-line bg-surface px-4 py-3 text-ink-faint">
            <House className="h-4 w-4" strokeWidth={1.8} />
            <Boxes className="h-4 w-4" strokeWidth={1.8} />
            <Coins className="h-4 w-4" strokeWidth={1.8} />
            <UserRound className="h-4 w-4" strokeWidth={1.8} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Provisional store badge. The app is unpublished, so this is inert on purpose:
// aria-disabled, out of the tab order, and pointer-events off so "#" never fires.
function StoreBadge({ icon: Icon, store }: { icon: LucideIcon; store: string }) {
  return (
    <a
      href="#"
      aria-disabled="true"
      tabIndex={-1}
      className="pointer-events-none inline-flex items-center gap-3 rounded-card border border-line bg-surface px-5 py-3 opacity-70"
    >
      <Icon className="h-6 w-6 text-ink" strokeWidth={1.7} />
      <span className="text-left">
        <span className="block text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          Coming soon
        </span>
        <span className="block font-display text-base text-ink">{store}</span>
      </span>
    </a>
  );
}

export default function DownloadPage() {
  return (
    <MarketingShell>
      <Section className="pb-16 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <PageHero
            eyebrow="Shop on the go"
            title="Get the Organikaly app"
            lead="Browse the pantry, track orders, earn Organikaly Coins, and join Organikaly Club, all from your phone."
          >
            <div className="mt-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-ink-muted">
                <BellRing className="h-4 w-4 text-forest" strokeWidth={1.7} />
                Launching soon on iOS and Android
              </span>
            </div>
          </PageHero>
          <Reveal direction="up">
            <PhoneMock />
          </Reveal>
        </div>
      </Section>

      <Section className="pb-16 md:pb-24">
        <SectionTitle align="left" eyebrow="In your pocket">
          The whole pantry, one tap away
        </SectionTitle>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 60} className="h-full">
              <div className="h-full rounded-card border border-line bg-surface p-6">
                <f.icon className="h-6 w-6 text-forest" strokeWidth={1.7} />
                <h3 className="mt-4 font-display text-lg text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="surface" className="py-16 md:py-24">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow eyebrow-bare justify-center text-rust">Get notified</p>
            <h2 className="mt-4 font-heading text-[clamp(1.6rem,3.2vw,2.5rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.01em] text-forest">
              The app is on its way
            </h2>
            <p className="mt-4 text-ink-muted">
              It is not on the stores yet. Leave your email and we will tell you the day it goes
              live, no spam in between.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <StoreBadge icon={Apple} store="App Store" />
              <StoreBadge icon={Play} store="Google Play" />
            </div>
            <p className="mt-3 text-xs text-ink-faint">Store listings go live at launch.</p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={notifyMailto}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition hover:bg-forest-deep"
              >
                <Mail className="h-5 w-5" strokeWidth={1.7} />
                Notify me at launch
              </a>
              <Link
                href="/store/membership/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 bg-paper px-6 py-3 text-sm font-semibold text-ink transition hover:bg-surface"
              >
                Join Organikaly Club
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </MarketingShell>
  );
}
