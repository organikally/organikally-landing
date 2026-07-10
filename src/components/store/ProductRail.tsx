import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import type { StorefrontProduct } from '@/lib/store/types';

// Horizontal product rail — CSS scroll-snap carousel, no JS. Cards show ~1.3 on
// phones (the peek signals "swipe"), settling into a 4-up row on desktop.
// Server-rendered; used for Bestsellers and per-category showcases.
export default function ProductRail({
  id,
  eyebrow,
  title,
  products,
  viewAll,
  ranked = false,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  products: StorefrontProduct[];
  viewAll?: { label: string; href: string };
  /** Bestseller treatment — a giant outlined rank numeral behind each card. */
  ranked?: boolean;
}) {
  if (products.length === 0) return null;
  return (
    <section id={id} className="mt-14 scroll-mt-36 md:mt-20" aria-label={title}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 font-display text-2xl text-ink md:text-3xl">{title}</h2>
        </div>
        {viewAll && (
          <Link
            href={viewAll.href}
            className="group hidden shrink-0 items-center gap-1.5 pb-1 text-sm font-semibold text-forest transition-colors hover:text-forest-deep sm:inline-flex"
          >
            {viewAll.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
      <div
        className={`no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory overflow-x-auto px-5 pb-4 md:mx-0 md:px-0 ${
          ranked ? 'gap-8 pt-2 md:gap-9' : 'gap-5'
        }`}
      >
        {products.map((p, i) => (
          <div
            key={p.id}
            className={`relative shrink-0 snap-start ${
              ranked
                ? 'w-[80%] pl-11 sm:w-[50%] sm:pl-12 md:w-[32%] lg:w-[25.5%]'
                : 'w-[74%] sm:w-[46%] md:w-[30%] lg:w-[23.5%]'
            }`}
          >
            {ranked && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-display text-[7.5rem] leading-none text-transparent [-webkit-text-stroke:2.5px_rgb(30_71_43_/_0.35)] md:text-[8.5rem]"
              >
                {i + 1}
              </span>
            )}
            <div className="relative">
              <ProductCard product={p} />
            </div>
          </div>
        ))}
      </div>
      {viewAll && (
        <Link
          href={viewAll.href}
          className="group mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors hover:text-forest-deep sm:hidden"
        >
          {viewAll.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </section>
  );
}
