import { Fragment } from 'react';
import { Droplets, Sprout, Leaf, CalendarCheck, type LucideIcon } from 'lucide-react';

// Mid-page assurance band — the marketing TrustStrip's verified marks, recut as a
// rounded card for the store flow. Same claim discipline: process, origin,
// freshness; nothing self-asserted or absolute. ("Pan-India Delivery" is
// deliberately absent here — the checkout can't honour it until serviceability
// is configured; re-add once delivery goes live.)
const marks: { label: string; Icon: LucideIcon }[] = [
  { label: 'Cold-Pressed Kachi Ghani', Icon: Droplets },
  { label: 'Organically Grown Seed', Icon: Sprout },
  { label: 'Nothing Refined Out', Icon: Leaf },
  { label: 'Press-Dated Freshness', Icon: CalendarCheck },
];

export default function StoreTrustBand() {
  return (
    <section
      aria-label="Our promises"
      className="mt-14 rounded-[22px] bg-forest-deep md:mt-20 md:rounded-[28px]"
    >
      <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-4 px-6 py-6 sm:gap-x-6 md:gap-x-8 md:py-8">
        {marks.map(({ label, Icon }, i) => (
          <Fragment key={label}>
            {i > 0 && <li aria-hidden="true" className="hidden h-5 w-px bg-paper/15 sm:block" />}
            <li className="flex items-center gap-2.5">
              <Icon aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-yellow" strokeWidth={1.75} />
              <span className="text-sm font-medium text-paper/90">{label}</span>
            </li>
          </Fragment>
        ))}
      </ul>
    </section>
  );
}
