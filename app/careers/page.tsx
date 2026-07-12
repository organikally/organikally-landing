import type { Metadata } from 'next';
import { Handshake, Compass, Sprout, Leaf, Briefcase, Mail, type LucideIcon } from 'lucide-react';
import MarketingShell, { Section, PageHero } from '@/components/marketing/MarketingShell';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Help build a cleaner, more honest pantry for India. There are no open roles right now, but we are always glad to hear from good people.',
  alternates: { canonical: '/careers/' },
};

// Careers. No fabricated listings: the roles section is an honest empty state that
// opens a general application by email. Values and the hiring note are real and
// non-committal, since the process is not yet formalised.

type Value = { icon: LucideIcon; title: string; body: string };

const values: Value[] = [
  {
    icon: Handshake,
    title: 'Honest work on a real product',
    body: 'Oil, dals and khand people actually cook with. No vapourware, no growth theatre.',
  },
  {
    icon: Compass,
    title: 'Ownership and range',
    body: 'Small team, wide surface. You own real problems end to end, not a narrow slice.',
  },
  {
    icon: Sprout,
    title: 'Farm-to-shelf impact',
    body: 'From the grower to the kitchen, your work touches the whole chain, not just a screen.',
  },
  {
    icon: Leaf,
    title: 'A calm, no-hype culture',
    body: 'Clear thinking over loud opinions. We move steadily and we mean what we ship.',
  },
];

const steps: { n: string; title: string; body: string }[] = [
  {
    n: '01',
    title: 'Write in',
    body: 'A short note about you and what you would want to build. No long forms.',
  },
  {
    n: '02',
    title: 'A real conversation',
    body: 'We talk it through, honestly and both ways, to see if there is a genuine fit.',
  },
  {
    n: '03',
    title: 'A practical step',
    body: 'Something close to the actual work, so both sides know before anyone commits.',
  },
];

const applyMailto = `mailto:${site.email}?subject=${encodeURIComponent('Working with Organikaly')}`;

export default function CareersPage() {
  return (
    <MarketingShell>
      <Section className="pb-16 md:pb-24">
        <PageHero
          eyebrow="Work with us"
          title="Careers at Organikaly"
          lead="Help build a cleaner, more honest pantry for India, one that people trust because it earns it."
        />
      </Section>

      <Section className="pb-16 md:pb-24">
        <SectionTitle align="left" eyebrow="Why work here">
          Real work, no hype
        </SectionTitle>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 70} className="h-full">
              <div className="h-full rounded-card border border-line bg-surface p-6">
                <v.icon className="h-6 w-6 text-forest" strokeWidth={1.7} />
                <h3 className="mt-4 font-display text-lg text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pb-16 md:pb-24">
        <SectionTitle align="left" eyebrow="Open roles">
          Nothing open, always listening
        </SectionTitle>
        <Reveal className="mt-10">
          <div className="rounded-card border border-dashed border-line bg-paper px-6 py-14 text-center">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-surface text-ink-faint">
              <Briefcase className="h-7 w-7" strokeWidth={1.5} />
            </span>
            <p className="mt-5 font-display text-xl text-ink">No open roles right now</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
              We are always glad to hear from good people. Tell us what you would bring and what
              you would want to work on, and we will keep it on file.
            </p>
            <a
              href={applyMailto}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition hover:bg-forest-deep"
            >
              <Mail className="h-5 w-5" strokeWidth={1.7} />
              Introduce yourself
            </a>
          </div>
        </Reveal>
      </Section>

      <Section tone="surface" className="py-16 md:py-24">
        <SectionTitle align="left" eyebrow="How we hire">
          Three honest steps
        </SectionTitle>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 70} className="h-full">
              <div className="h-full rounded-card border border-line bg-paper p-6">
                <span className="index-num font-heading text-3xl font-extrabold text-forest/30">
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-lg text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </MarketingShell>
  );
}
