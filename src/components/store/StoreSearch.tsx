'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ChevronDown } from 'lucide-react';
import type { StoreCategory } from '@/lib/store/types';

// Header search — a single pill holding the query field and an optional category
// scope, exactly mirroring the listing's URL params (`q`, `category`) so a search
// is just a navigation to the server-filtered listing. The placeholder idly cycles
// through real pantry staples (each verified to return results against the live
// catalog); it stops while typing or under reduced motion.
const SUGGESTIONS = ['mustard oil', 'ghee', 'toor dal', 'jaggery', 'achaar', 'haldi'];

export default function StoreSearch({
  categories,
  compact = false,
}: {
  categories: StoreCategory[];
  compact?: boolean;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');
  const [scope, setScope] = useState(params.get('category') ?? '');
  const [hint, setHint] = useState(0);
  const focusedRef = useRef(false);

  // Keep the field in sync when navigation changes the URL (e.g. clearing filters).
  useEffect(() => {
    setQ(params.get('q') ?? '');
    setScope(params.get('category') ?? '');
  }, [params]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      if (!focusedRef.current) setHint((h) => (h + 1) % SUGGESTIONS.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = new URLSearchParams();
    const term = q.trim();
    if (term) next.set('q', term);
    // Only apply the category scope where its control is actually visible —
    // the compact (phone) pill has no scope select, so scoping there would
    // silently narrow results with no visible cause.
    if (!compact && scope) next.set('category', scope);
    const qs = next.toString();
    router.push(qs ? `/store/?${qs}` : '/store/');
  };

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={`flex min-w-0 items-center rounded-full border border-line bg-paper transition-colors focus-within:border-yellow-deep focus-within:ring-2 focus-within:ring-yellow-deep/25 ${
        compact ? 'h-10' : 'h-11'
      }`}
    >
      <label htmlFor={compact ? 'store-search-m' : 'store-search'} className="sr-only">
        Search products
      </label>
      <Search className="ml-4 h-4 w-4 shrink-0 text-ink-faint" strokeWidth={2} />
      <input
        id={compact ? 'store-search-m' : 'store-search'}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => {
          focusedRef.current = true;
        }}
        onBlur={() => {
          focusedRef.current = false;
        }}
        placeholder={`Search ${SUGGESTIONS[hint]}…`}
        enterKeyHint="search"
        className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-ink-faint"
      />
      {!compact && (
        <div className="relative hidden h-6 items-center border-l border-line md:flex">
          <label htmlFor="store-search-scope" className="sr-only">
            Search within category
          </label>
          <select
            id="store-search-scope"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className="h-full appearance-none bg-transparent pl-3 pr-8 text-sm font-medium text-ink-muted outline-none"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-ink-faint" />
        </div>
      )}
      <button
        type="submit"
        aria-label="Search"
        className={`mr-1 flex items-center justify-center rounded-full bg-yellow text-ink transition duration-300 ease-brand hover:bg-yellow-deep ${
          compact ? 'h-8 w-8' : 'h-9 w-9'
        }`}
      >
        <Search className="h-4 w-4" strokeWidth={2.2} />
      </button>
    </form>
  );
}
