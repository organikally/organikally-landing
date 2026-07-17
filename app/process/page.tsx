import type { Metadata } from 'next';
import Link from 'next/link';
import { Sprout, Filter, Snowflake, Droplet, CalendarDays, ShieldCheck, Check, X } from 'lucide-react';
import MarketingShell, { Section, PageHero } from '@/components/marketing/MarketingShell';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'How Our Cold-Pressed Mustard Oil Is Made',
  description:
    'How Organikaly mustard oil is made: organically grown yellow mustard seed, kachi ghani cold-pressing at low temperature with no added heat or solvents, left unrefined and bottled fresh with the press date.',
  alternates: { canonical: '/process/' },
};

// Farm to bottle, in order. Every line is process or source, never a health claim.
const steps = [
  {
    icon: Sprout,
    title: 'Organically grown yellow mustard seed',
    body: 'It starts with yellow mustard seed grown without synthetic chemicals, sourced from growers we buy from directly.',
  },
  {
    icon: Filter,
    title: 'Cleaned and sorted',
    body: 'The seed is cleaned and sorted so only sound, whole mustard goes to the press.',
  },
  {
    icon: Snowflake,
    title: 'Kachi ghani cold-press',
    body: 'Pressed slowly at low temperature, with no added heat and no solvents, the traditional kachi ghani way.',
  },
  {
    icon: Droplet,
    title: 'Settled and filtered, left unrefined',
    body: 'The oil is left to settle and gently filtered, never bleached or deodorised, so it stays golden and pungent.',
  },
  {
    icon: CalendarDays,
    title: 'Bottled fresh with the press date',
    body: 'We bottle in small batches and print the press date on the pack, so freshness sits right on the label.',
  },
  {
    icon: ShieldCheck,
    title: 'FSSAI-checked',
    body: 'Each batch carries its FSSAI licence and organic certification on the pack before it reaches you.',
  },
];

// Refined commodity oil vs Organikaly kachi ghani. Sensory / process / source only.
const compare = [
  { aspect: 'Colour', refined: 'Stripped pale in refining.', ours: 'Naturally golden.' },
  { aspect: 'Aroma', refined: 'Neutralised, little left.', ours: 'Pungent and true to the seed.' },
  {
    aspect: 'Antioxidants',
    refined: 'Reduced by heat and refining.',
    ours: 'Retained, rich in antioxidants.',
  },
  { aspect: 'Refining', refined: 'Refined and often blended.', ours: 'Unrefined, nothing taken out.' },
];

export default function ProcessPage() {
  return (
    <MarketingShell>
      <Section className="pb-14 md:pb-20">
        <PageHero
          eyebrow="Farm to bottle"
          title="How the oil is made"
          lead="Kachi ghani, slow cold-pressing, small batches, and every bottle stamped with the date it was pressed."
        />
      </Section>

      {/* Step timeline */}
      <Section className="pb-16 md:pb-24">
        <SectionTitle align="left" eyebrow="Step by step">
          From seed to sealed bottle
        </SectionTitle>
        <ol className="mt-10 space-y-4 md:space-y-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={(i % 2) * 60}>
                <li className="flex gap-5 rounded-card border border-line bg-surface p-6 md:gap-7 md:p-7">
                  <div className="flex shrink-0 flex-col items-center gap-3">
                    <span className="index-num text-2xl font-semibold md:text-3xl">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-chip bg-forest/10">
                      <Icon className="h-6 w-6 text-forest" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-display text-xl text-ink">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-muted">{s.body}</p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </Section>

      {/* Why cold-pressed matters */}
      <Section tone="surface" className="py-16 md:py-24">
        <SectionTitle eyebrow="The difference">Why cold-pressed matters</SectionTitle>
        <Reveal>
          <p className="t-lead mx-auto mt-5 max-w-measure text-center">
            Refining is built for yield and long shelf life. Cold-pressing keeps what the seed
            already carries.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {/* Refined commodity oil */}
          <Reveal direction="left">
            <div className="h-full rounded-card border border-line bg-paper p-6 md:p-8">
              <p className="eyebrow eyebrow-bare text-ink-faint">Refined commodity oil</p>
              <ul className="mt-5 space-y-4">
                {compare.map((row) => (
                  <li key={row.aspect} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink/5">
                      <X className="h-4 w-4 text-ink-faint" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
                        {row.aspect}
                      </span>
                      <span className="text-ink-muted">{row.refined}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Organikaly kachi ghani, highlighted with a forest ring and gold ticks */}
          <Reveal direction="right">
            <div className="h-full rounded-card bg-paper p-6 shadow-md ring-1 ring-forest/25 md:p-8">
              <p className="eyebrow text-rust">Organikaly kachi ghani</p>
              <ul className="mt-5 space-y-4">
                {compare.map((row) => (
                  <li key={row.aspect} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow/20">
                      <Check className="h-4 w-4 text-yellow-deep" strokeWidth={2.4} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-forest">
                        {row.aspect}
                      </span>
                      <span className="text-ink">{row.ours}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-16 md:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-card bg-forest-deep px-6 py-12 shadow-panel md:px-14 md:py-16">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
              style={{
                background:
                  'radial-gradient(closest-side, rgb(var(--yellow) / 0.20), rgb(var(--yellow) / 0) 70%)',
              }}
            />
            <div className="relative max-w-2xl">
              <p className="eyebrow text-yellow">Bottled fresh</p>
              <h2 className="mt-4 font-heading text-[clamp(1.7rem,3.6vw,2.6rem)] font-extrabold uppercase leading-[1.06] tracking-[-0.01em] text-cream">
                Taste what unrefined actually means
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-cream/80">
                Order a bottle, or check that the one already in your kitchen is the real thing.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/store/"
                  className="inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-3 font-medium text-ink transition-colors duration-300 hover:bg-yellow-deep"
                >
                  Shop the oil
                </Link>
                <Link
                  href="/product-authentication/"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 font-medium text-cream transition-colors duration-300 hover:bg-cream/10"
                >
                  Product authentication
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </MarketingShell>
  );
}
