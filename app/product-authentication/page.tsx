import type { Metadata } from 'next';
import Link from 'next/link';
import { CalendarClock, BadgeCheck, Leaf, Hash, Droplet, Wind, Flame, ArrowRight } from 'lucide-react';
import MarketingShell, { Section, PageHero } from '@/components/marketing/MarketingShell';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import AuthenticityCheck from './AuthenticityCheck';

export const metadata: Metadata = {
  title: 'Product authentication',
  description:
    'Every Organikaly pack carries its own proof: the press date, FSSAI licence number, organic certification and batch code, plus the sensory cues of a real cold-pressed oil.',
  alternates: { canonical: '/product-authentication/' },
};

// "Product authentication": how a buyer confirms a real pack for themselves.
// Four on-pack trust markers, an honest guidance helper (AuthenticityCheck, which
// does not fake a database lookup), and the sensory signals of a genuine
// cold-pressed oil. Approved claims only; no medical or health-outcome language.

const markers = [
  {
    icon: CalendarClock,
    title: 'Press date',
    body: 'The day this oil was pressed, printed on the pack. Freshness you can see rather than take on trust, the closer to it, the brighter the aroma.',
    where: 'On the bottle label, near the batch code.',
  },
  {
    icon: BadgeCheck,
    title: 'FSSAI licence number',
    body: 'The food-safety licence under which this oil is made and sold. It ties the pack to a real, registered kitchen.',
    where: 'Printed on the pack and in the footer of this site.',
  },
  {
    icon: Leaf,
    title: 'Organic certification',
    body: 'The mark that the seed was organically grown and the oil unrefined, not just described that way. Purity you can check.',
    where: 'On the pack, alongside the certification details.',
  },
  {
    icon: Hash,
    title: 'Batch code',
    body: 'The code for this one press run. It keeps your bottle traceable to a single pressing rather than a blend of unknowns.',
    where: 'On the bottle label, next to the press date.',
  },
];

const cues = [
  {
    icon: Droplet,
    title: 'Deep golden colour',
    body: 'A real cold-pressed mustard oil carries a natural golden colour straight from the seed. Refined oils strip it away, we leave it in.',
  },
  {
    icon: Wind,
    title: 'Sharp, pungent aroma',
    body: 'That nose-tickling pungency is the sign the oil is unrefined. It is the seed you are smelling, not a flat, deodorised commodity oil.',
  },
  {
    icon: Flame,
    title: 'Mellows on heat',
    body: 'The pungency softens the moment the oil meets a hot kadhai, and its high smoke point is why Indian kitchens have cooked with it for generations.',
  },
];

export default function ProductAuthenticationPage() {
  return (
    <MarketingShell>
      <Section className="pb-16 md:pb-24">
        <PageHero
          eyebrow="Purity you can check"
          title="Product authentication"
          lead="Every pack carries its own proof. Here is what to look for, what each mark means, and how to confirm it with us."
        />
      </Section>

      {/* What to check on your pack: four trust markers. */}
      <Section tone="paper" className="bg-cream py-16 md:py-24">
        <SectionTitle eyebrow="On every pack">What to check on your pack</SectionTitle>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {markers.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.title} delay={i * 70}>
                <div className="flex h-full gap-4 rounded-card border border-forest/12 bg-paper p-6 shadow-sm transition-shadow duration-300 ease-brand hover:shadow-md md:p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest text-cream">
                    <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-heading text-lg font-bold uppercase leading-snug tracking-[-0.01em] text-forest">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{m.body}</p>
                    <p className="mt-3 text-sm text-ink-faint">
                      <span className="font-semibold text-ink-muted">Where:</span> {m.where}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Guidance helper: honest, not a fake database lookup. */}
      <Section className="pb-16 md:pb-24">
        <SectionTitle align="left" eyebrow="Read your code">
          What does your code mean?
        </SectionTitle>
        <p className="mt-5 max-w-measure leading-relaxed text-ink-muted">
          Have a bottle in hand? Enter the batch code or press date and we will explain what that
          marker should tell you. To confirm a specific pack against our records, it points you
          straight to us.
        </p>
        <div className="mt-8 max-w-2xl">
          <Reveal>
            <AuthenticityCheck />
          </Reveal>
        </div>
      </Section>

      {/* Spotting the real thing: sensory cues, approved claims only. */}
      <Section tone="paper" className="bg-cream py-16 md:py-24">
        <SectionTitle eyebrow="Trust your senses">Spotting the real thing</SectionTitle>
        <Reveal>
          <p className="mx-auto mt-5 max-w-measure text-center leading-relaxed text-ink-muted">
            Before any code, your eyes and nose tell you a lot. A genuine cold-pressed yellow
            mustard oil gives itself away.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {cues.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={i * 80}>
                <div className="h-full rounded-card border border-forest/12 bg-paper p-6 text-center shadow-sm md:p-7">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow/20 text-yellow-ink">
                    <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-bold uppercase leading-snug tracking-[-0.01em] text-forest">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{c.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Closing CTA: report a concern. */}
      <Section tone="forest" className="py-16 md:py-20">
        <Reveal className="text-center">
          <h2 className="font-heading text-2xl font-extrabold uppercase leading-tight tracking-[-0.01em] md:text-3xl">
            Something not adding up?
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-cream/80">
            If a pack looks or smells off, or a marker does not match, tell us. We would rather
            hear about it and make it right.
          </p>
          <div className="mt-7 flex justify-center">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-3 font-semibold text-ink transition hover:bg-yellow-deep"
            >
              Report a concern
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </Section>
    </MarketingShell>
  );
}
