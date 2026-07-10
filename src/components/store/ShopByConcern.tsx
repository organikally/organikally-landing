'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowDownRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { ConcernIcon } from './ConcernIcons';
import type { StorefrontProduct } from '@/lib/store/types';

// Shop-by-Concern — a two-tone tabbed band: concern tabs on the deep-forest
// deck, the matching curated products on the warm gold shelf below. Tab
// switching is instant (every concern's products arrive server-fetched).
export type Concern = {
  key: string;
  label: string;
  products: StorefrontProduct[];
};

export default function ShopByConcern({ concerns }: { concerns: Concern[] }) {
  const withProducts = concerns.filter((c) => c.products.length > 0);
  const [active, setActive] = useState(withProducts[0]?.key ?? '');
  const railRef = useRef<HTMLDivElement>(null);

  const current = withProducts.find((c) => c.key === active) ?? withProducts[0];
  if (!current) return null;

  const scrollRail = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section
      aria-label="Shop by concern"
      className="mt-14 overflow-hidden rounded-[22px] md:mt-20 md:rounded-[30px]"
    >
      {/* Concern deck */}
      <div className="bg-forest px-5 pb-5 pt-7 sm:px-8 md:px-10 md:pt-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
          <div className="shrink-0 lg:max-w-[11rem]">
            <h2 className="font-display text-2xl leading-tight text-paper md:text-3xl">
              Shop by concern
            </h2>
            <span aria-hidden="true" className="mt-3 block h-[3px] w-12 rounded-full bg-yellow" />
          </div>
          <div
            role="tablist"
            aria-label="Concerns"
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:gap-3 lg:mx-0 lg:px-0"
          >
            {withProducts.map((c) => {
              const selected = c.key === current.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="concern-panel"
                  onClick={() => setActive(c.key)}
                  className="group flex w-[92px] shrink-0 flex-col items-center gap-2.5 outline-none"
                >
                  <span
                    className={`flex h-[72px] w-[72px] items-center justify-center rounded-full bg-paper text-forest transition duration-300 ease-brand group-hover:-translate-y-0.5 group-focus-visible:ring-2 group-focus-visible:ring-yellow sm:h-20 sm:w-20 ${
                      selected ? 'ring-[3px] ring-yellow shadow-md' : 'ring-1 ring-paper/20'
                    }`}
                  >
                    <ConcernIcon concernKey={c.key} className="h-10 w-10 sm:h-11 sm:w-11" />
                  </span>
                  <span
                    className={`text-center text-[0.78rem] font-medium leading-snug transition-colors ${
                      selected ? 'text-paper' : 'text-paper/65 group-hover:text-paper/90'
                    }`}
                  >
                    {c.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`block h-[2.5px] w-8 rounded-full transition-all duration-300 ease-brand ${
                      selected ? 'bg-yellow' : 'bg-transparent'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product shelf */}
      <div className="relative bg-yellow/20 px-5 py-6 sm:px-8 md:px-10 md:py-8">
        <div className="flex items-stretch gap-4">
          <div
            id="concern-panel"
            role="tabpanel"
            ref={railRef}
            className="no-scrollbar flex flex-1 snap-x gap-4 overflow-x-auto pb-1 md:gap-5"
          >
            {current.products.map((p) => (
              <div key={p.id} className="w-[70%] shrink-0 snap-start sm:w-[44%] md:w-[31%] lg:w-[26%]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          {/* View-all card, pinned like the reference. */}
          <a
            href="#catalog"
            className="group hidden w-36 shrink-0 flex-col items-center justify-center gap-2 rounded-card bg-yellow/30 px-3 text-center transition duration-300 ease-brand hover:bg-yellow/45 md:flex"
          >
            <span className="font-display text-lg leading-snug text-forest-deep">
              View all
              <br />
              products
            </span>
            <ArrowDownRight className="h-5 w-5 text-yellow-ink transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </a>
        </div>

        {current.products.length > 3 && (
          <>
            <button
              type="button"
              aria-label="Scroll products back"
              onClick={() => scrollRail(-1)}
              className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-md transition hover:shadow-lg md:flex"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Scroll products forward"
              onClick={() => scrollRail(1)}
              className="absolute right-36 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-md transition hover:shadow-lg md:flex"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </>
        )}

        <p className="mt-4 text-center text-xs text-ink-faint">
          Grouped the way home kitchens think about food — not medical advice.
        </p>
      </div>
    </section>
  );
}
