import type { Metadata } from 'next';
import {
  Store,
  ChefHat,
  Gift,
  Truck,
  Tag,
  ShieldCheck,
  PackageCheck,
  Headset,
  MessageCircle,
  Mail,
  type LucideIcon,
} from 'lucide-react';
import MarketingShell, { Section, PageHero } from '@/components/marketing/MarketingShell';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { site, whatsapp } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Wholesale Club',
  description:
    'Bulk and trade supply of Organikaly cold-pressed mustard oil and organic staples for kirana stores, cloud kitchens, restaurants and corporate gifting.',
  alternates: { canonical: '/wholesale/' },
};

// Wholesale / trade page. Honest by design: no invented tiers, no printed prices.
// Pricing and certifications are genuinely quoted per account, so the page says so
// and routes every enquiry to the trade desk (WhatsApp when configured, else email).

type Item = { icon: LucideIcon; title: string; body: string };

const audiences: Item[] = [
  {
    icon: Store,
    title: 'Retail & kirana',
    body: 'Stock the shelf with oil, dals and khand your regulars come back for.',
  },
  {
    icon: ChefHat,
    title: 'Cloud kitchens & restaurants',
    body: 'One cooking oil and pantry you can rely on across every service.',
  },
  {
    icon: Gift,
    title: 'Corporate & festive gifting',
    body: 'Clean, honest hampers for Diwali, onboarding and client gifting.',
  },
  {
    icon: Truck,
    title: 'Distributors & resellers',
    body: 'Carry a brand you can stand behind, with supply you can plan around.',
  },
];

const benefits: Item[] = [
  {
    icon: Tag,
    title: 'Bulk pricing',
    body: 'Rates that work at case and pallet volumes, shared once we know what you need.',
  },
  {
    icon: ShieldCheck,
    title: 'Certifications & documentation',
    body: 'Organic and FSSAI paperwork on request, so your own compliance is covered.',
  },
  {
    icon: PackageCheck,
    title: 'Consistent supply',
    body: 'Steady, planned stock, so you are not guessing between deliveries.',
  },
  {
    icon: Headset,
    title: 'A dedicated point of contact',
    body: 'One person who knows your account, not a new inbox every time.',
  },
];

function Card({ icon: Icon, title, body }: Item) {
  return (
    <div className="h-full rounded-card border border-line bg-surface p-6">
      <Icon className="h-6 w-6 text-forest" strokeWidth={1.7} />
      <h3 className="mt-4 font-display text-lg text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}

const tradeMailto = `mailto:${site.email}?subject=${encodeURIComponent('Wholesale enquiry')}`;

export default function WholesalePage() {
  return (
    <MarketingShell>
      <Section className="pb-16 md:pb-24">
        <PageHero
          eyebrow="Bulk & trade"
          title="Organikaly Wholesale Club"
          lead="Cold-pressed mustard oil and organic staples in bulk, for kirana stores, cloud kitchens, restaurants and corporate gifting. Real documentation, steady stock, one person to call."
        />
      </Section>

      <Section className="pb-16 md:pb-24">
        <SectionTitle align="left" eyebrow="Who it is for">
          Built for people who buy by the case
        </SectionTitle>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 70} className="h-full">
              <Card {...a} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pb-16 md:pb-24">
        <SectionTitle align="left" eyebrow="What you get">
          Straight terms, nothing fine-print
        </SectionTitle>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 70} className="h-full">
              <Card {...b} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="forest" className="py-16 md:py-24">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-bare text-yellow">Enquire</p>
            <h2 className="mt-4 font-heading text-[clamp(1.7rem,3.6vw,2.9rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.01em] text-cream">
              Let us talk volumes
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/85">
              Tell us what you sell or cook and roughly how much you move. We come back with
              pricing and the certifications you need. Both are shared on request, per account,
              never a fixed rate card.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {site.whatsappConfigured ? (
                <>
                  <a
                    href={whatsapp("Hi Organikaly, I'd like to enquire about wholesale / bulk pricing.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow px-6 py-3 text-sm font-semibold text-ink transition hover:bg-yellow-deep"
                  >
                    <MessageCircle className="h-5 w-5" strokeWidth={1.7} />
                    Message the trade desk
                  </a>
                  <a
                    href={tradeMailto}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition hover:bg-cream/10"
                  >
                    <Mail className="h-5 w-5" strokeWidth={1.7} />
                    Email the trade desk
                  </a>
                </>
              ) : (
                <a
                  href={tradeMailto}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow px-6 py-3 text-sm font-semibold text-ink transition hover:bg-yellow-deep"
                >
                  <Mail className="h-5 w-5" strokeWidth={1.7} />
                  Email the trade desk
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </Section>
    </MarketingShell>
  );
}
