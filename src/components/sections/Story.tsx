import { Sprout, Droplets, ShieldCheck, type LucideIcon } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import Media from '@/components/ui/Media';
import { whatsapp } from '@/lib/site';

// The brand-story / promise moment — the emotional "why us" the page was missing, in
// place of a single-product spread (we already show the full range elsewhere). Copy is
// approved-claims only: process, origin and freshness, never medical or invented facts.
const pillars: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Sprout, title: 'Pure', body: 'Organically grown seed, cold-pressed and unrefined.' },
  { icon: Droplets, title: 'Natural', body: 'No added heat, no solvents, nothing artificial.' },
  { icon: ShieldCheck, title: 'Trusted', body: 'A press date on every bottle, batch after batch.' },
];

export default function Story() {
  return (
    <section id="story" className="relative z-10 bg-cream py-16 md:py-28">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Heritage image */}
          <Reveal direction="left" className="md:order-1">
            <div className="relative">
              <Media
                name="story"
                alt="Weathered hands and a younger hand together cradling a bottle of Organikaly cold-pressed mustard oil over a sunlit field"
                width={1000}
                height={1250}
                className="aspect-[4/5] w-full rounded-[1.5rem] shadow-media"
                sizes="(min-width: 768px) 44vw, 100vw"
              />
              <span className="absolute -bottom-4 -right-3 hidden rounded-full bg-yellow px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wide text-forest-deep shadow-lg sm:block">
                From field to your kitchen
              </span>
            </div>
          </Reveal>

          {/* Story + pillars */}
          <div className="md:order-2">
            <SectionTitle align="left" eyebrow="Our promise">
              Real food, made the honest way
            </SectionTitle>
            <Reveal>
              <p className="mt-5 max-w-md leading-relaxed text-ink-muted">
                Organikaly is built on one idea: bring back food made the way it always was. We
                grow our mustard organically, press it cold in a traditional kachi ghani, and bottle
                it fresh — nothing added, nothing refined out.
              </p>
              <p className="mt-4 max-w-md leading-relaxed text-ink-muted">
                No shortcuts, no chemistry, no fine print. Just honest oil and pantry staples you can
                trust in your kitchen, with a press date on every bottle to prove it.
              </p>
            </Reveal>

            <Reveal>
              <dl className="mt-9 grid max-w-md grid-cols-1 gap-4 sm:grid-cols-3">
                {pillars.map(({ icon: Icon, title, body }) => (
                  <div key={title} className="rounded-2xl border border-forest/12 bg-surface p-4">
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-forest/10 text-forest"
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <dt className="mt-3 font-heading text-sm font-bold uppercase tracking-[-0.01em] text-forest">
                      {title}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ink-muted">{body}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Cta href="#range" variant="primary" arrow>
                  Explore the range
                </Cta>
                <Cta href={whatsapp()} variant="secondary" whatsapp external>
                  Order on WhatsApp
                </Cta>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
