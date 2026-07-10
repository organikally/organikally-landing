'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ChevronDown } from 'lucide-react';
import { PUBLIC_API_BASE } from '@/lib/store/client';
import { formatPaise } from '@/lib/format';
import type { StoreCategory, StorefrontProduct } from '@/lib/store/types';

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
  // Typeahead — top matches fetched as you type; Escape or blur dismisses.
  const [suggestions, setSuggestions] = useState<StorefrontProduct[]>([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const ctrl = new AbortController();
    const id = window.setTimeout(async () => {
      try {
        const res = await fetch(
          `${PUBLIC_API_BASE}/store/products?q=${encodeURIComponent(term)}&page_size=5`,
          { signal: ctrl.signal },
        );
        if (!res.ok) return;
        const data = (await res.json()) as { items: StorefrontProduct[] };
        setSuggestions(data.items ?? []);
        setOpen((data.items ?? []).length > 0 && focusedRef.current);
      } catch {
        /* aborted or offline — keep quiet */
      }
    }, 220);
    return () => {
      window.clearTimeout(id);
      ctrl.abort();
    };
  }, [q]);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

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

  const go = () => {
    const next = new URLSearchParams();
    const term = q.trim();
    if (term) next.set('q', term);
    // Only apply the category scope where its control is actually visible —
    // the compact (phone) pill has no scope select, so scoping there would
    // silently narrow results with no visible cause.
    if (!compact && scope) next.set('category', scope);
    const qs = next.toString();
    setOpen(false);
    router.push(qs ? `/store/?${qs}` : '/store/');
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    go();
  };

  return (
    <div ref={boxRef} className="relative min-w-0">
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

    {open && suggestions.length > 0 && (
      <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-card border border-line bg-paper shadow-lg">
        <ul>
          {suggestions.map((p) => (
            <li key={p.id}>
              <Link
                href={`/store/${p.slug}/`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 transition hover:bg-surface"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.primary_image}
                  alt=""
                  width={36}
                  height={36}
                  loading="lazy"
                  className="h-9 w-9 shrink-0 rounded-lg object-cover"
                />
                <span className="min-w-0 flex-1 truncate text-sm text-ink">{p.name}</span>
                <span className="tnum shrink-0 text-sm font-semibold text-ink">
                  {formatPaise(p.price_paise)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={go}
          className="block w-full border-t border-line px-4 py-2.5 text-left text-sm font-semibold text-forest transition hover:bg-surface"
        >
          See all results for “{q.trim()}”
        </button>
      </div>
    )}
    </div>
  );
}
