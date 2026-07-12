import type { Metadata } from 'next';
import Link from 'next/link';
import { Sprout, MapPin, ScanLine, Handshake, Sparkles, Mail, ArrowRight } from 'lucide-react';
import MarketingShell, { Section, PageHero } from '@/components/marketing/MarketingShell';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Meet the farmers',
  description:
    'How Organikaly works with the growers behind the press: one trusted source, organically grown yellow mustard seed, and batches you can trace.',
  alternates: { canonical: '/farmers/' },
};

// "Meet the farmers": honesty-first. We do not yet have real, named farmer
// profiles or photographs, so this page presents the sourcing MODEL instead of
// inventing people: the promise, the four principles we work by, and an open
// invitation for growers to write in. No fabricated names, faces, quotes or
// villages. Approved claims only (organically grown, single-source, cold-pressed).

const principles = [
  {
    icon: Sprout,
    title: 'Organically grown',
    body: 'The seed is yellow mustard grown without synthetic pesticides or fertilisers, the slow way a good crop has always been raised.',
  },
  {
    icon: MapPin,
    title: 'Single trusted source',
    body: 'We buy from one source we know, not a spot market. Fewer hands touch the seed between the field and our press.',
  },
  {
    icon: ScanLine,
    title: 'Traceable to batch',
    body: 'Each press run stays its own batch, carried through to the code and press date on the bottle you open.',
  },
  {
    icon: Handshake,
    title: 'Fair partnership',
    body: 'We would rather pay a grower properly and keep the relationship than chase the cheapest seed of the season.',
  },
];

const growerMailto = `mailto:${site.email}?subject=${encodeURIComponent(
  'Growing mustard for Organikaly',
)}&body=${encodeURIComponent(
  'Hi Organikaly, I grow (or work with growers of) organic yellow mustard and would like to talk about supplying you.',
)}`;

export default function FarmersPage() {
  return (
    <MarketingShell>
      <Section className="pb-16 md:pb-24">
        <PageHero
          eyebrow="The people behind the press"
          title="Meet the farmers"
          lead="Every bottle begins on one farm, with seed grown organically the way it has always been grown. We are still small, so here is exactly how we work with the people who grow it."
        />
      </Section>

      {/* Our sourcing promise: narrative, honest about scale. */}
      <Section className="pb-16 md:pb-24">
        <SectionTitle align="left" eyebrow="Where it begins">
          Our sourcing promise
        </SectionTitle>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal className="max-w-measure space-y-5 text-ink-muted">
            <p className="leading-relaxed">
              Good mustard oil is decided long before the press. It starts with the seed and the
              hands that grow it. That is why we tie ourselves to a single trusted source of
              organically grown yellow mustard rather than buying whatever the market offers on a
              given day.
            </p>
            <p className="leading-relaxed">
              Working with one source keeps the chain short and honest. We know where the seed
              came from, how it was grown, and when it was pressed. Each press run stays its own
              batch, so the oil in your kitchen can be traced back to a specific pressing, not a
              blend of unknowns.
            </p>
            <p className="leading-relaxed">
              We treat the growing side as a partnership, not a purchase order. Paying fairly and
              coming back season after season is how you keep good seed coming, and it is the only
              way the rest of our promise, from the field to the press date on the pack, holds
              together.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-card border border-forest/12 bg-surface p-6 md:p-7">
              <h3 className="font-heading text-base font-bold uppercase tracking-[-0.01em] text-forest">
                Why you will not see faces here yet
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
                We would rather show you no farmer than a stranger from a stock photo. Real names,
                real faces and real stories go up here only once the growers we work with are
                ready to share them, and have said yes.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* How we work with growers: four principles. */}
      <Section tone="paper" className="bg-cream py-16 md:py-24">
        <SectionTitle eyebrow="The way we work">How we work with growers</SectionTitle>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 80}>
                <div className="h-full rounded-card border border-forest/12 bg-paper p-6 shadow-sm transition-shadow duration-300 ease-brand hover:shadow-md">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream">
                    <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-bold uppercase leading-snug tracking-[-0.01em] text-forest">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Farmer stories, coming soon: clearly provisional, an open invitation. */}
      <Section className="pb-16 md:pb-24">
        <Reveal>
          <div className="rounded-card border-l-4 border-yellow bg-surface p-7 md:p-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow/20 text-yellow-ink">
              <Sparkles className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-heading text-2xl font-extrabold uppercase leading-tight tracking-[-0.01em] text-forest md:text-3xl">
              Farmer stories, coming soon
            </h2>
            <p className="mt-3 max-w-measure leading-relaxed text-ink-muted">
              We are building proper profiles of the growers behind the oil, in their words and
              with their blessing. Until they are ready, this space stays honestly empty.
            </p>
            <p className="mt-3 max-w-measure leading-relaxed text-ink-muted">
              Grow organic yellow mustard, or work with farmers who do? We would like to talk.
            </p>
            <a
              href={growerMailto}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 font-semibold text-cream transition hover:bg-forest-deep"
            >
              <Mail className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              Write to us about growing
            </a>
          </div>
        </Reveal>
      </Section>

      {/* Closing CTA: send readers on to the process and the proof. */}
      <Section tone="forest" className="py-16 md:py-20">
        <Reveal className="text-center">
          <h2 className="font-heading text-2xl font-extrabold uppercase leading-tight tracking-[-0.01em] md:text-3xl">
            From the field to your kitchen
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-cream/80">
            See how the seed becomes oil, and how every pack lets you check that promise for
            yourself.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/process/"
              className="inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-3 font-semibold text-ink transition hover:bg-yellow-deep"
            >
              Our process
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            </Link>
            <Link
              href="/product-authentication/"
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-transparent px-6 py-3 font-semibold text-cream transition hover:bg-cream/10"
            >
              Product authentication
            </Link>
          </div>
        </Reveal>
      </Section>
    </MarketingShell>
  );
}
