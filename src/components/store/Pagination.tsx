'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// URL-driven pagination for the listing. Preserves active filters; resets nothing.
export default function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  if (totalPages <= 1) return null;

  const go = (p: number) => {
    const next = new URLSearchParams(params.toString());
    if (p <= 1) next.delete('page');
    else next.set('page', String(p));
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: true });
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );

  return (
    <nav className="mt-12 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p, idx) => {
        const prev = pages[idx - 1];
        const gap = prev != null && p - prev > 1;
        return (
          <span key={p} className="flex items-center">
            {gap && <span className="px-1 text-ink-faint">…</span>}
            <button
              type="button"
              onClick={() => go(p)}
              aria-current={p === page ? 'page' : undefined}
              className={`tnum flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold transition ${
                p === page
                  ? 'bg-ink text-paper'
                  : 'border border-line text-ink-muted hover:bg-surface'
              }`}
            >
              {p}
            </button>
          </span>
        );
      })}
      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
