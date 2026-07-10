import Link from 'next/link';
import { CategoryIcon } from './CategoryIcons';
import type { StoreCategory } from '@/lib/store/types';

// Circular category tiles — the "shop by aisle" rail. Server-rendered links to
// the filtered listing (same `category` param Filters.tsx writes), so a tile tap
// behaves exactly like tapping the matching filter chip. Horizontal snap-scroll
// on phones, a single centered row on desktop.

// Merchandising order — flagship aisle first, then daily staples; anything new
// from the catalog falls in after these.
const AISLE_ORDER = [
  'Oils',
  'Pulses',
  'Ghee & Honey',
  'Sweeteners',
  'Spices & Masala',
  'Pickles & Preserves',
  'Grains & Flours',
];

export default function CategoryRail({ categories }: { categories: StoreCategory[] }) {
  if (categories.length === 0) return null;
  const ordered = [...categories].sort((a, b) => {
    const ia = AISLE_ORDER.indexOf(a.key);
    const ib = AISLE_ORDER.indexOf(b.key);
    return (ia === -1 ? AISLE_ORDER.length : ia) - (ib === -1 ? AISLE_ORDER.length : ib);
  });
  return (
    <section id="categories" className="mt-14 scroll-mt-36 md:mt-20" aria-label="Shop by category">
      <div className="text-center">
        <h2 className="font-display text-2xl text-ink md:text-3xl">Shop by category</h2>
        <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-12 rounded-full bg-yellow" />
      </div>

      {/* Stays a scroller until xl — 8 tiles need ~970px of row, which only a
          ≥1280px container fits without clipping. */}
      <div className="no-scrollbar -mx-5 mt-8 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:gap-5 xl:mx-0 xl:justify-center xl:overflow-visible xl:px-0">
        {ordered.map((c) => (
          <Link
            key={c.key}
            href={`/store/?category=${encodeURIComponent(c.key)}`}
            className="group flex w-[92px] shrink-0 snap-start flex-col items-center gap-3 sm:w-[104px]"
          >
            <span className="flex h-[84px] w-[84px] items-center justify-center rounded-full border border-line bg-surface text-forest transition duration-300 ease-brand group-hover:-translate-y-1 group-hover:border-yellow-deep/50 group-hover:shadow-md sm:h-[96px] sm:w-[96px]">
              <CategoryIcon categoryKey={c.key} className="h-11 w-11 sm:h-12 sm:w-12" />
            </span>
            <span className="text-center text-[0.82rem] font-medium leading-snug text-ink sm:text-sm">
              {c.label}
            </span>
          </Link>
        ))}

        {/* Everything — mirrors the filter's "All" chip, lands on the full grid. */}
        <a
          href="#catalog"
          className="group flex w-[92px] shrink-0 snap-start flex-col items-center gap-3 sm:w-[104px]"
        >
          <span className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-forest text-paper transition duration-300 ease-brand group-hover:-translate-y-1 group-hover:bg-forest-deep group-hover:shadow-md sm:h-[96px] sm:w-[96px]">
            <CategoryIcon categoryKey="All" className="h-11 w-11 sm:h-12 sm:w-12" />
          </span>
          <span className="text-center text-[0.82rem] font-medium leading-snug text-ink sm:text-sm">
            All products
          </span>
        </a>
      </div>
    </section>
  );
}
