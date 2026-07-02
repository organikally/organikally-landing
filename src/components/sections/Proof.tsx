import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import Media from '@/components/ui/Media';
import { site } from '@/lib/site';

// A small "proof, not promises" moment: the press date printed on every bottle,
// shown beside a warm just-pressed close-up in a hairline forest-framed cream well.
// Ojasya system: centered ornamented title, rust eyebrow, gold date highlight.
export default function Proof() {
  const pressDate = site.pressDate?.trim();

  return (
    <section id="proof" className="relative z-10 bg-cream pt-16 pb-14 md:pt-28 md:pb-20">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <SectionTitle eyebrow="Why Organikally">Proof. Not promises.</SectionTitle>
        <Reveal>
          <p className="t-lead mx-auto mt-5 max-w-measure text-center">
            Anyone can say “pure.” We’d rather show you — starting with the day it was pressed.
          </p>
        </Reveal>

        {/* Image + dateline in one hairline forest-framed cream well. The photo fills
            its half so the card carries real height instead of leaving a void below. */}
        <Reveal>
          <div className="mt-12 grid overflow-hidden rounded-card border border-forest/12 bg-surface shadow-sm md:mt-16 md:grid-cols-2">
            <Media
              name="proof-date"
              alt="A freshly pressed Organikally mustard oil bottle with a small hand-stamped batch tag"
              width={1100}
              height={826}
              className="aspect-[4/3] w-full md:aspect-auto md:h-full"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-11">
              <div>
                <span className="eyebrow eyebrow-bare text-rust">Pressed on</span>
                <span className="tnum mt-2 block font-heading text-[clamp(1.8rem,3.8vw,2.6rem)] font-extrabold uppercase leading-none tracking-[-0.01em] text-yellow-ink">
                  {pressDate || 'Small-batch fresh'}
                </span>
              </div>
              <div className="border-t border-forest/12 pt-6">
                <h3 className="font-heading text-xl font-bold uppercase tracking-[-0.01em] text-forest md:text-2xl">
                  A date on every bottle.
                </h3>
                <p className="mt-2 leading-relaxed text-ink-muted">
                  We print the press date on every bottle — so you can see for yourself how fresh
                  your oil is. Freshness you can verify, not a word on a label.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
