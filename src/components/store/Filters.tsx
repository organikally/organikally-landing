'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { StoreCategory } from '@/lib/store/types';

// Listing filters (category, price range, availability) + sort (STORE_CONTRACT §5.2).
// All filtering is URL-driven so the ISR listing re-renders server-side; the canonical
// stays /store/ (query params are excluded from the canonical + sitemap, §10).
const SORTS: { value: string; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
];

export default function Filters({ categories }: { categories: StoreCategory[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const update = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(patch)) {
        if (v == null || v === '') next.delete(k);
        else next.set(k, v);
      }
      // Any filter change resets pagination.
      if (!('page' in patch)) next.delete('page');
      const qs = next.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const activeCategory = params.get('category') ?? '';
  const availability = params.get('availability') ?? 'all';
  const sort = params.get('sort') ?? 'featured';

  const onPriceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    update({
      min_price: (form.get('min_price') as string) || null,
      max_price: (form.get('max_price') as string) || null,
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Category chips */}
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        <button
          type="button"
          onClick={() => update({ category: null })}
          aria-pressed={activeCategory === ''}
          className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
            activeCategory === ''
              ? 'border-ink bg-ink text-paper'
              : 'border-line bg-paper text-ink-muted hover:border-ink/40'
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => update({ category: c.key })}
            aria-pressed={activeCategory === c.key}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              activeCategory === c.key
                ? 'border-ink bg-ink text-paper'
                : 'border-line bg-paper text-ink-muted hover:border-ink/40'
            }`}
          >
            {c.label}
            <span className="ml-1.5 text-ink-faint">{c.count}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {/* Price range (INR) */}
        <form onSubmit={onPriceSubmit} className="flex items-end gap-2">
          <div className="flex flex-col">
            <label htmlFor="min_price" className="mb-1 text-xs font-medium text-ink-faint">
              Min ₹
            </label>
            <input
              id="min_price"
              name="min_price"
              type="number"
              min={0}
              defaultValue={params.get('min_price') ?? ''}
              className="w-24 rounded-chip border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-yellow-deep"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="max_price" className="mb-1 text-xs font-medium text-ink-faint">
              Max ₹
            </label>
            <input
              id="max_price"
              name="max_price"
              type="number"
              min={0}
              defaultValue={params.get('max_price') ?? ''}
              className="w-24 rounded-chip border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-yellow-deep"
            />
          </div>
          <button
            type="submit"
            className="rounded-chip border border-ink/15 bg-paper px-4 py-2 text-sm font-semibold text-ink transition hover:bg-surface"
          >
            Apply
          </button>
        </form>

        <div className="flex flex-wrap items-end gap-4">
          {/* Availability */}
          <label className="flex cursor-pointer select-none items-center gap-2 text-sm text-ink-muted">
            <input
              type="checkbox"
              checked={availability === 'in_stock'}
              onChange={(e) => update({ availability: e.target.checked ? 'in_stock' : null })}
              className="h-4 w-4 accent-[#1B5E20]"
            />
            In stock only
          </label>

          {/* Sort */}
          <div className="flex flex-col">
            <label htmlFor="sort" className="mb-1 text-xs font-medium text-ink-faint">
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => update({ sort: e.target.value })}
              className="rounded-chip border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-yellow-deep"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
