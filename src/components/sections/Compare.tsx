import { Check, X } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import GoldStrip from '@/components/ui/GoldStrip';
import Reveal from '@/components/ui/Reveal';
import Media from '@/components/ui/Media';
import { compareLabels, compareRows } from '@/content/compare';

// A warm two-column comparison — ordinary refined oil (left) vs Organikaly
// cold-pressed (right, highlighted in a forest-ringed well with a gold cap). Rows
// contrast process / sensory / source only. No medical claims, no scare copy, no
// brand names — the aspect label repeats on both sides so each row reads as a pair.
export default function Compare() {
  return (
    <section id="compare" className="relative z-10 bg-cream py-16 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <SectionTitle eyebrow="The difference">Not all mustard oil is the same.</SectionTitle>
        <Reveal>
          <p className="t-lead mx-auto mt-5 max-w-measure text-center">
            Most oil on the shelf is refined for yield and long shelf life. Ours is made the slow,
            old way — so you can taste and see the difference the moment you open the bottle.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {/* Ordinary refined oil */}
          <Reveal direction="left">
            <div className="h-full rounded-card border border-forest/12 bg-paper p-6 md:p-8">
              <Media
                name="compare-refined"
                alt="Pale, refined commodity mustard oil"
                width={900}
                height={600}
                className="mb-6 aspect-[3/2] w-full rounded-media"
                sizes="(min-width: 768px) 34rem, 100vw"
              />
              <p className="eyebrow eyebrow-bare text-ink-faint">{compareLabels.left}</p>
              <ul className="mt-5 space-y-4">
                {compareRows.map((row) => (
                  <li key={row.aspect} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink/5">
                      <X className="h-4 w-4 text-ink-faint" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
                        {row.aspect}
                      </span>
                      <span className="text-ink-muted">{row.left}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Organikaly cold-pressed — highlighted with a forest ring and a gold cap */}
          <Reveal direction="right">
            <div className="relative h-full overflow-hidden rounded-card bg-paper p-6 shadow-lg ring-1 ring-forest/25 md:p-8">
              <GoldStrip className="absolute inset-x-0 top-0" />
              <Media
                name="compare-coldpressed"
                alt="Golden, cold-pressed Organikaly yellow mustard oil"
                width={900}
                height={600}
                className="mb-6 aspect-[3/2] w-full rounded-media shadow-sm"
                sizes="(min-width: 768px) 34rem, 100vw"
              />
              <p className="eyebrow text-rust">{compareLabels.right}</p>
              <ul className="mt-5 space-y-4">
                {compareRows.map((row) => (
                  <li key={row.aspect} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow/20">
                      <Check
                        className="h-4 w-4 text-yellow-deep"
                        strokeWidth={2.4}
                        aria-hidden="true"
                      />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-forest">
                        {row.aspect}
                      </span>
                      <span className="text-ink">{row.right}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
