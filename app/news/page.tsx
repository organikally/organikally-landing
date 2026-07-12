import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Newspaper, Mail, Palette, FileText, ArrowRight } from 'lucide-react';
import MarketingShell, { Section, PageHero } from '@/components/marketing/MarketingShell';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'News & media',
  description:
    'Organikaly brand updates, press enquiries and media assets. Follow the journal for the running feed and write to us for the full media kit.',
  alternates: { canonical: '/news/' },
};

// Newsroom. There is no press coverage yet, so nothing is invented: the "in the
// press" block is an honest empty state, and the media kit lists only assets we
// genuinely have. The journal is the live feed everything points to.

const mediaMailto = `mailto:${site.email}?subject=${encodeURIComponent('Media enquiry')}`;
const kitMailto = `mailto:${site.email}?subject=${encodeURIComponent('Media kit request')}`;

// The real brand swatches, shown as-is in the palette card.
const swatches: { name: string; className: string }[] = [
  { name: 'Forest', className: 'bg-forest' },
  { name: 'Oil gold', className: 'bg-yellow' },
  { name: 'Cream', className: 'bg-cream border border-line' },
  { name: 'Rust', className: 'bg-rust' },
  { name: 'Ink', className: 'bg-ink' },
];

export default function NewsPage() {
  return (
    <MarketingShell>
      <Section className="pb-16 md:pb-24">
        <PageHero
          eyebrow="Newsroom"
          title="News & media"
          lead="Brand updates, press enquiries and media assets, all in one place. It is early days, so this page stays honest about what exists today."
        />
      </Section>

      <Section className="pb-16 md:pb-24">
        <SectionTitle align="left" eyebrow="Latest updates">
          Follow along on the journal
        </SectionTitle>
        <Reveal className="mt-10">
          <Link
            href="/journal/"
            className="group flex flex-col gap-5 rounded-card border border-line bg-surface p-7 transition hover:border-forest/30 sm:flex-row sm:items-center sm:gap-7"
          >
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-card bg-forest/10 text-forest">
              <BookOpen className="h-7 w-7" strokeWidth={1.6} />
            </span>
            <span className="flex-1">
              <span className="block font-display text-xl text-ink">The Organikaly Journal</span>
              <span className="mt-1.5 block text-sm leading-relaxed text-ink-muted">
                Our running feed of brand notes, sourcing stories and what we are pressing next.
                New posts land here first.
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition group-hover:text-forest-deep">
              Read the journal
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" strokeWidth={1.8} />
            </span>
          </Link>
        </Reveal>
      </Section>

      <Section className="pb-16 md:pb-24">
        <SectionTitle align="left" eyebrow="In the press">
          Coverage, as it lands
        </SectionTitle>
        <Reveal className="mt-10">
          <div className="rounded-card border border-dashed border-line bg-paper px-6 py-14 text-center">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-surface text-ink-faint">
              <Newspaper className="h-7 w-7" strokeWidth={1.5} />
            </span>
            <p className="mt-5 font-display text-xl text-ink">Nothing to show here yet</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
              Coverage will appear here as it lands. For media enquiries, or to feature the brand,
              write to us and we will get back quickly.
            </p>
            <a
              href={mediaMailto}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition hover:bg-forest-deep"
            >
              <Mail className="h-5 w-5" strokeWidth={1.7} />
              Email the newsroom
            </a>
          </div>
        </Reveal>
      </Section>

      <Section tone="surface" className="py-16 md:py-24">
        <SectionTitle align="left" eyebrow="Media kit">
          Brand assets, ready to use
        </SectionTitle>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Reveal className="h-full">
            <div className="h-full rounded-card border border-line bg-paper p-6">
              <span className="font-display text-2xl text-forest">Organikaly</span>
              <h3 className="mt-5 font-display text-lg text-ink">Logo & wordmark</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                The Organikaly wordmark in full-colour and single-colour, for light and dark
                backgrounds.
              </p>
            </div>
          </Reveal>

          <Reveal delay={70} className="h-full">
            <div className="h-full rounded-card border border-line bg-paper p-6">
              <div className="flex items-center gap-1.5">
                {swatches.map((s) => (
                  <span
                    key={s.name}
                    className={`h-8 w-8 rounded-chip ${s.className}`}
                    title={s.name}
                  />
                ))}
              </div>
              <h3 className="mt-5 flex items-center gap-2 font-display text-lg text-ink">
                <Palette className="h-5 w-5 text-forest" strokeWidth={1.6} />
                Palette
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Forest green leads, with oil gold, warm cream, rust and ink. The colours you see
                across the site.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140} className="h-full">
            <div className="h-full rounded-card border border-line bg-paper p-6">
              <FileText className="h-6 w-6 text-forest" strokeWidth={1.6} />
              <h3 className="mt-4 font-display text-lg text-ink">Product one-liner</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{site.description}</p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <p className="text-sm text-ink-muted">
            Need high-resolution logos, product photography or a fact sheet? The full kit is
            available on request.{' '}
            <a href={kitMailto} className="font-semibold text-forest hover:text-forest-deep">
              Ask for the media kit
            </a>
            .
          </p>
        </Reveal>
      </Section>
    </MarketingShell>
  );
}
