import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Ban, Eye, HandHeart, BadgeCheck, MapPin } from 'lucide-react';
import MarketingShell, { Section, PageHero } from '@/components/marketing/MarketingShell';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Our Vision & Mission',
  description:
    'Our vision and mission at Organikaly: unrefined, traceable, trusted everyday staples, and cold-pressed organically grown food from a single source, with proof on every pack.',
  alternates: { canonical: '/vision/' },
};

// The principles we hold to. Each is a plain rule, not a slogan, and stays inside
// approved claim territory (process, source, freshness, honesty).
const principles = [
  {
    icon: Sparkles,
    title: 'Honesty over hype',
    body: 'We describe the food as it is, and skip the claims we cannot prove.',
  },
  {
    icon: Ban,
    title: 'Nothing refined out',
    body: 'Cold-pressed and unrefined, so colour, aroma and character stay in.',
  },
  {
    icon: Eye,
    title: 'Freshness you can see',
    body: 'The press date is printed on the pack, not hidden behind a promise.',
  },
  {
    icon: HandHeart,
    title: 'Fair to the farm',
    body: 'We buy from growers we know, and want them to keep growing this way.',
  },
  {
    icon: BadgeCheck,
    title: 'Only claims we can stand behind',
    body: 'Every line on the label is one we can defend, on paper and in the bottle.',
  },
  {
    icon: MapPin,
    title: 'Traceable to source',
    body: 'Single-source, so a batch leads back to the field it was grown in.',
  },
];

export default function VisionPage() {
  return (
    <MarketingShell>
      <Section className="pb-14 md:pb-20">
        <PageHero
          eyebrow="Where we’re headed"
          title="Our vision & mission"
          lead="Two plain statements about the food we want on India’s shelves, and the way we intend to get it there."
        />
      </Section>

      {/* Vision & Mission statement blocks */}
      <Section className="pb-16 md:pb-24">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <Reveal direction="left">
            <article className="flex h-full flex-col rounded-card border border-line bg-surface p-8 md:p-10">
              <p className="eyebrow">Our vision</p>
              <p className="mt-5 font-display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.18] text-ink">
                An India where everyday staples are unrefined, traceable and trusted, where the oil,
                the dal and the sugar in a kitchen are the real thing.
              </p>
            </article>
          </Reveal>
          <Reveal direction="right">
            <article className="flex h-full flex-col rounded-card border border-line bg-surface p-8 md:p-10">
              <p className="eyebrow">Our mission</p>
              <p className="mt-5 font-display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.18] text-ink">
                To bring cold-pressed, organically grown food from a single trusted source to every
                kitchen, with proof on every pack.
              </p>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Principles */}
      <Section tone="surface" className="py-16 md:py-24">
        <SectionTitle eyebrow="How we work">The principles that guide us</SectionTitle>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={(i % 3) * 60}>
                <article className="h-full rounded-card border border-line bg-paper p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-chip bg-forest/10">
                    <Icon className="h-6 w-6 text-forest" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg text-ink">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{p.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Pull-quote band */}
      <Section className="py-16 md:py-24">
        <Reveal>
          <figure className="relative overflow-hidden rounded-card bg-forest-deep px-6 py-14 text-center shadow-panel md:px-16 md:py-20">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full"
              style={{
                background:
                  'radial-gradient(closest-side, rgb(var(--yellow) / 0.18), rgb(var(--yellow) / 0) 70%)',
              }}
            />
            <blockquote className="relative mx-auto max-w-3xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.2] text-cream">
              We would rather print the press date than make a promise we cannot keep.
            </blockquote>
            <figcaption className="relative mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-yellow">
              The Organikaly promise
            </figcaption>
          </figure>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section width="measure" className="pb-20 md:pb-28">
        <Reveal className="text-center">
          <h2 className="font-display text-2xl text-ink">See where it comes from</h2>
          <p className="mt-3 text-ink-muted">
            Meet the growers behind the seed, or read the fuller story of why we started.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/farmers/"
              className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 font-medium text-cream transition-colors duration-300 hover:bg-forest-deep"
            >
              Meet the farmers
            </Link>
            <Link
              href="/about/"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-paper px-6 py-3 font-medium text-ink transition-colors duration-300 hover:bg-surface"
            >
              About us
            </Link>
          </div>
        </Reveal>
      </Section>
    </MarketingShell>
  );
}
