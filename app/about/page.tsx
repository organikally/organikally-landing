import type { Metadata } from 'next';
import Link from 'next/link';
import { Droplet, Bean, Candy, ShieldCheck, Sprout, Eye, MapPin } from 'lucide-react';
import MarketingShell, { Section, PageHero } from '@/components/marketing/MarketingShell';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'About us',
  description:
    'Organikaly makes cold-pressed yellow mustard oil, organic pulses and khand from organically grown seed, farm to bottle, with nothing refined out.',
  alternates: { canonical: '/about/' },
};

// The three things we sell, one approved sentence each. Icons carry the category;
// copy stays sensory / process / source, never a health-outcome claim.
const range = [
  {
    icon: Droplet,
    title: 'Cold-pressed yellow mustard oil',
    body: 'Kachi ghani cold-pressed from organically grown yellow mustard seed, golden in colour, pungent in aroma and high in MUFA and Omega-3.',
  },
  {
    icon: Bean,
    title: 'Organic pulses and dals',
    body: 'Organically grown pulses and dals from a single trusted source, cleaned and sorted, with nothing added and nothing stripped out.',
  },
  {
    icon: Candy,
    title: 'Khand, unrefined cane sugar',
    body: 'Khand pressed from organically grown cane and left unrefined, so it keeps the colour and character that white sugar loses.',
  },
];

// The four things we will not bend on. Each maps to an approved claim.
const values = [
  {
    icon: ShieldCheck,
    title: 'Unrefined and honest',
    body: 'Nothing bleached, deodorised or refined out of what reaches your kitchen.',
  },
  {
    icon: Sprout,
    title: 'Organically grown',
    body: 'Grown without synthetic chemicals, with organic certification on the pack.',
  },
  {
    icon: Eye,
    title: 'Freshness you can see',
    body: 'The press date is printed on every pack, so freshness is something you read, not take on trust.',
  },
  {
    icon: MapPin,
    title: 'Traceable to source',
    body: 'Single-source, so a batch can be traced back to where it was grown and pressed.',
  },
];

export default function AboutPage() {
  return (
    <MarketingShell>
      <Section className="pb-16 md:pb-24">
        <PageHero
          eyebrow="Our story"
          title="A cleaner bottle of everyday India"
          lead="Cold-pressed yellow mustard oil, organic pulses and khand, each made from organically grown seed and carried from farm to bottle with nothing refined out."
        />
      </Section>

      {/* What we make */}
      <Section className="pb-16 md:pb-24">
        <SectionTitle align="left" eyebrow="The range">
          What we make
        </SectionTitle>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {range.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 70}>
                <article className="h-full rounded-card border border-line bg-surface p-6 md:p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-chip bg-forest/10">
                    <Icon className="h-6 w-6 text-forest" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl text-ink">{item.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-ink-muted">{item.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Why we started */}
      <Section tone="surface" className="py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <SectionTitle align="left" eyebrow="Why we started">
            The real thing, made plainly
          </SectionTitle>
          <Reveal className="max-w-measure">
            <div className="space-y-5 text-ink-muted">
              <p>
                Most oil on the shelf is refined for yield and shelf life, then often blended.
                Somewhere in that process the colour is stripped, the aroma is neutralised, and you
                stop being able to tell what you are actually cooking with.
              </p>
              <p>
                We started Organikaly to put the real thing back in the bottle. Yellow mustard seed,
                organically grown and cold-pressed the slow kachi ghani way, left unrefined so the
                colour and the pungency stay where they belong.
              </p>
              <p>
                And we print the press date on every pack, because purity should be something you
                can check, not a word you take on faith.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* What we stand for */}
      <Section className="pb-16 md:pb-24 pt-16 md:pt-24">
        <SectionTitle align="left" eyebrow="What we stand for">
          Four things we will not bend on
        </SectionTitle>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 60}>
                <article className="h-full rounded-card border border-line bg-paper p-6">
                  <Icon className="h-6 w-6 text-forest" strokeWidth={1.7} aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg text-ink">{v.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{v.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Forest CTA band */}
      <Section className="pb-16 md:pb-24">
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
              <p className="eyebrow text-yellow">Taste the difference</p>
              <h2 className="mt-4 font-heading text-[clamp(1.7rem,3.6vw,2.6rem)] font-extrabold uppercase leading-[1.06] tracking-[-0.01em] text-cream">
                Everyday staples, made the honest way
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-cream/80">
                Start with the oil, or read how we think about food, sourcing and freshness.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/store/"
                  className="inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-3 font-medium text-ink transition-colors duration-300 hover:bg-yellow-deep"
                >
                  Shop the range
                </Link>
                <Link
                  href="/journal/"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 font-medium text-cream transition-colors duration-300 hover:bg-cream/10"
                >
                  Read the journal
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Honest legal placeholder, kept visibly provisional until the founder supplies details. */}
      <Section width="measure" className="pb-20 md:pb-28">
        <p className="text-sm leading-relaxed text-ink-faint">
          [Registered business name and address to be added.] Our FSSAI licence and organic
          certification appear on every pack and in the footer of this site.
        </p>
      </Section>
    </MarketingShell>
  );
}
