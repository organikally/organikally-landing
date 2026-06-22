import type { CSSProperties } from 'react';
import Cta from '@/components/ui/Cta';
import { whatsapp } from '@/lib/site';

// The hero's left column is scrubbed, not a slideshow: two beats are positioned
// DIRECTLY from scroll progress by heroKinetic (no masks, so nothing is clipped),
// each a distinct layout — an editorial stack, then a numbered kinetic list —
// entering from below and exiting upward as you scroll, after which the column
// fades and the film's oil-burst plays as the finale. Beat 0 is the real <h1>
// (LCP + reduced-motion / no-JS fallback); beat 1 is decorative and SSR-hidden
// (inline opacity:0) until JS reveals it. The CTA belongs to beat 0 and clears on
// first scroll (see HeroScrub); the header keeps an Order button.

const PROCESS_MARKS = ['No heat', 'No solvents', 'No deodorising'];

export default function Hero() {
  return (
    <div className="flex h-full items-center">
      <div className="mx-auto w-full max-w-container px-5 md:px-10">
        {/* Floats over the video; the bottle sits right, this column stays open.
            A soft paper text-shadow (below) lifts the dark copy off any frame
            without a clinical white box. */}
        <div
          id="hero-content"
          className="hero-enter max-w-[20rem] [text-shadow:0_1px_2px_rgb(250_249_245/0.6),0_2px_18px_rgb(250_249_245/0.5)] sm:max-w-xl"
        >
          {/* Stacked beats; height reserved (to beat 0) so the actions never jump.
              Taller beats overflow into the space the CTA vacates on scroll. */}
          <div
            className="relative min-h-[16rem] md:min-h-[17rem]"
            style={{ '--i': 0 } as CSSProperties}
          >
            {/* ── Beat 0 · the clean bottle — editorial establishing shot ── */}
            <div data-hero-beat={0} className="absolute inset-x-0 top-0" style={{ opacity: 1 }}>
              <p data-hero-line className="eyebrow">
                Traditional Kachi Ghani
              </p>
              <h1
                data-hero-line
                className="mt-3.5 text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.02] text-ink"
              >
                The oil that smells like <span className="italic">home.</span>
              </h1>
              <p
                data-hero-line
                className="mt-5 max-w-md text-[1.0625rem] font-medium leading-relaxed text-ink"
              >
                Cold-pressed from organically grown yellow mustard seed — golden, gentle,
                unmistakably ours.
              </p>
            </div>

            {/* ── Beat 1 · the glass shatters — numbered kinetic marks ── */}
            <div
              data-hero-beat={1}
              aria-hidden="true"
              className="absolute inset-x-0 top-0"
              style={{ opacity: 0 }}
            >
              <p
                data-hero-line
                className="font-display text-[clamp(2.4rem,5.6vw,4.2rem)] leading-[1.0] tracking-[-0.02em] text-ink"
                style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 22, 'wght' 500" }}
              >
                Nothing <span className="italic">refined</span> out.
              </p>
              {/* Numbered, stacked, revealed one-by-one as the glass pulls apart. */}
              <div className="mt-7 space-y-2.5">
                {PROCESS_MARKS.map((m, j) => (
                  <p
                    data-hero-mark
                    key={m}
                    className="flex items-baseline gap-3 text-[clamp(0.92rem,1.5vw,1.05rem)] font-semibold uppercase tracking-[0.16em] text-ink"
                  >
                    <span className="text-[0.8em] tabular-nums text-yellow-ink">
                      {String(j + 1).padStart(2, '0')}
                    </span>
                    <span className="text-ink-faint" aria-hidden="true">
                      {'//'}
                    </span>
                    <span>{m}</span>
                  </p>
                ))}
              </div>
              <p
                data-hero-line
                className="mt-7 max-w-md text-[1.0625rem] font-medium leading-relaxed text-ink"
              >
                Kachi ghani, the honest way.
              </p>
            </div>
          </div>

          {/* Beat 0's actions. The OUTER wrapper takes the hero-enter entrance
              (its animation-fill: forwards would clobber any inline opacity, so it
              can't be the scroll target); the inner #hero-cta is what HeroScrub
              fades + slides away the moment you scroll. The header keeps a
              persistent Order button, so buyability isn't lost. */}
          <div className="mt-2" style={{ '--i': 1 } as CSSProperties}>
            <div
              id="hero-cta"
              className="flex flex-wrap items-center gap-3 [text-shadow:none]"
              style={{ willChange: 'opacity, transform' }}
            >
              <Cta href={whatsapp()} variant="primary" whatsapp external>
                Buy mustard oil
              </Cta>
              <Cta href="#range" variant="secondary" arrow>
                See the range
              </Cta>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
