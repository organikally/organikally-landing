import type { CSSProperties } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import Ornament from '@/components/ui/Ornament';
import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';

// "The Traditional Journey of Our Oil" — the Ojasya-style infographic. The illustrated
// farm scene is the section itself: it bleeds full-width across the left half and the
// section background is set to the illustration's own warm cream so there is no visible
// box or seam. The heavy forest title is set into the scene's open middle; the five-step
// timeline floats on the right. Copy is approved-claims only (organically grown,
// cold-pressed / kachi ghani, unrefined, press-dated) — no medical language, no invented data.
const BAND = 'rgb(251 241 214)'; // = the journey illustration's flat background colour

const steps = [
  { media: 'step-grown', title: 'Grown Organically', body: 'Yellow mustard grown without synthetic inputs.' },
  { media: 'seed-macro', title: 'Cleaned & Sorted', body: 'Seed hand-sorted and cleaned before pressing.' },
  { media: 'step-pressed', title: 'Cold-Pressed in Kachi Ghani', body: 'Crushed slow — no heat, no solvents.' },
  { media: 'step-bottled', title: 'Settled & Filtered', body: 'Rested and filtered, nothing refined out.' },
  { media: 'step-kitchen', title: 'Bottled & Press-Dated', body: 'Sealed fresh, the press date on every bottle.' },
];

function JourneyLede() {
  return (
    <>
      <SectionTitle align="left" eyebrow="Seed to bottle">
        The Traditional Journey of Our Oil
      </SectionTitle>
      <Ornament className="mt-4 h-4 w-24 text-forest/45" />
      <p className="mt-4 max-w-[17rem] text-[0.95rem] leading-relaxed text-ink-muted">
        Five slow steps between an organic mustard field and your kitchen — nothing refined
        out, nothing rushed.
      </p>
    </>
  );
}

export default function Sourcing() {
  return (
    <section
      id="sourcing"
      className="relative overflow-hidden py-16 md:py-24"
      style={{ backgroundColor: BAND }}
    >
      {/* Desktop: the illustration bleeds across the left half of the viewport, seamless
          with the band. Its inner edge melts back into the band so the timeline reads. */}
      <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-1/2 lg:block">
        <Media
          name="journey-art"
          alt=""
          width={1100}
          height={1376}
          className="h-full w-full"
          imgClassName="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(90deg, transparent 56%, ${BAND} 90%)` }}
        />
      </div>

      <div className="relative mx-auto max-w-container px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — title. On mobile it stacks above an in-flow illustration; on desktop it
              sits vertically centred, set into the open middle of the bleed illustration. */}
          <div className="relative flex flex-col justify-center">
            {/* Mobile / tablet */}
            <div className="lg:hidden">
              <Reveal>
                <JourneyLede />
              </Reveal>
              <Reveal delay={80} className="mt-7">
                <Media
                  name="journey-art"
                  alt="An illustrated mustard farm — songbirds in the tree, a farmhouse and a cow beside a blooming field"
                  width={1100}
                  height={1376}
                  className="aspect-[4/5] w-full"
                  sizes="100vw"
                />
              </Reveal>
            </div>

            {/* Desktop — set into the scene, with a soft same-colour halo for legibility */}
            <div className="hidden max-w-[20rem] lg:block">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-5 -inset-y-5 rounded-[2rem] bg-[#fbf1d6]/70 blur-lg"
                />
                <div className="relative">
                  <JourneyLede />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — vertical dashed timeline: numbered forest nodes linked to cards */}
          <ol className="relative">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 pb-8 last:pb-0 md:gap-5">
                <div className="flex flex-col items-center">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest font-heading text-lg font-bold text-cream shadow-sm ring-2 ring-forest ring-offset-2"
                    style={{ '--tw-ring-offset-color': BAND } as CSSProperties}
                  >
                    {i + 1}
                  </span>
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mt-2 w-0 flex-1 border-l-2 border-dashed border-forest/30"
                    />
                  )}
                </div>

                <Reveal direction="right" delay={i * 80} className="flex-1 pb-1">
                  <div className="flex items-center gap-4 rounded-2xl border border-forest/12 bg-paper p-4 shadow-sm transition-shadow duration-300 ease-brand hover:shadow-md md:p-5">
                    <Media
                      name={s.media}
                      alt={s.title}
                      width={200}
                      height={200}
                      className="h-16 w-16 shrink-0 rounded-full ring-1 ring-forest/15 md:h-20 md:w-20"
                      sizes="(min-width: 768px) 80px, 64px"
                    />
                    <div className="min-w-0">
                      <h3 className="font-heading text-base font-bold uppercase leading-snug tracking-[-0.01em] text-forest md:text-lg">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted md:text-[0.95rem]">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
