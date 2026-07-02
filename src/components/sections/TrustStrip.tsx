import { Fragment } from 'react';
import { Droplets, Sprout, Leaf, CalendarCheck, Truck, type LucideIcon } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

// The deep forest-green assurance band that rises right under the film hero — the
// first thing to take the stage. Each mark is a promise we can actually verify:
// process, origin, freshness, reach. No self-asserted "FSSAI compliant", no absolute
// "100% Organic", no invented discount — the licence number lives in the footer.
const marks: { label: string; Icon: LucideIcon }[] = [
  { label: 'Cold-Pressed Kachi Ghani', Icon: Droplets },
  { label: 'Organically Grown Seed', Icon: Sprout },
  { label: 'Nothing Refined Out', Icon: Leaf },
  { label: 'Press-Dated Freshness', Icon: CalendarCheck },
  { label: 'Pan-India Delivery', Icon: Truck },
];

export default function TrustStrip() {
  return (
    <section
      aria-label="Our promises"
      // Rounded top matches the Act-2 reveal so the forest band lifts over the final
      // film frame; full-bleed because the Act-2 wrapper already spans edge to edge.
      className="relative z-10 rounded-t-[2.5rem] bg-forest-deep text-cream"
    >
      <div className="mx-auto max-w-container px-5 py-6 sm:py-8 md:px-10">
        <Reveal>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-4 sm:gap-x-6 md:gap-x-8">
            {marks.map(({ label, Icon }, i) => (
              <Fragment key={label}>
                {i > 0 && (
                  <li
                    aria-hidden="true"
                    className="hidden h-5 w-px bg-cream/15 sm:block"
                  />
                )}
                <li className="flex items-center gap-2.5">
                  <Icon
                    aria-hidden="true"
                    className="h-[18px] w-[18px] shrink-0 text-yellow"
                    strokeWidth={1.75}
                  />
                  <span className="whitespace-nowrap text-[0.72rem] font-semibold uppercase tracking-[0.13em] text-cream/90 sm:text-[0.78rem]">
                    {label}
                  </span>
                </li>
              </Fragment>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
