import Reveal from '@/components/ui/Reveal';
import { site } from '@/lib/site';

// A small "proof, not promises" moment: the press date printed on every bottle,
// shown as an editorial dateline on a hairline band (not a coupon stamp).
export default function Proof() {
  const pressDate = site.pressDate?.trim();

  return (
    <section id="proof" className="relative z-10 py-16 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <Reveal>
          <p className="eyebrow">Why Organikally</p>
          <h2 className="t-headline mt-6 max-w-2xl font-semibold text-ink">Proof. Not promises.</h2>
          <p className="t-lead mt-5 max-w-measure">
            Anyone can say “pure.” We’d rather show you — starting with the day it was pressed.
          </p>
        </Reveal>

        {/* Press date — an editorial dateline on a hairline band. */}
        <Reveal>
          <div className="mt-14 grid gap-6 border-y border-line py-9 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-14 sm:py-10 md:mt-16">
            <div className="sm:border-r sm:border-line sm:pr-14">
              <span className="eyebrow eyebrow-bare text-ink-faint">Pressed on</span>
              <span className="mt-2 block font-display text-[clamp(2rem,4.4vw,3.1rem)] leading-none text-yellow-ink">
                {pressDate || 'Small-batch fresh'}
              </span>
            </div>
            <div className="max-w-md">
              <h3 className="text-xl font-semibold text-ink md:text-2xl">A date on every bottle.</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">
                We print the press date on every bottle — so you can see for yourself how fresh your
                oil is. Freshness you can verify, not a word on a label.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
