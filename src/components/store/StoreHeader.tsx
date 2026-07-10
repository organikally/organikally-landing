'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/lib/store/cart-context';
import { useAuth } from '@/lib/store/auth-context';
import StoreSearch from './StoreSearch';
import type { StoreCategory } from '@/lib/store/types';

// Prerender-safe placeholder while the search island (useSearchParams) streams in.
function SearchFallback({ compact = false }: { compact?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center rounded-full border border-line bg-paper ${compact ? 'h-10' : 'h-11'}`}
    >
      <Search className="ml-4 h-4 w-4 shrink-0 text-ink-faint" strokeWidth={2} />
      <span className="flex-1 px-3 text-sm text-ink-faint">Search the pantry…</span>
      <span
        className={`mr-1 flex items-center justify-center rounded-full bg-yellow ${compact ? 'h-8 w-8' : 'h-9 w-9'}`}
      >
        <Search className="h-4 w-4 text-ink" strokeWidth={2.2} />
      </span>
    </div>
  );
}

// Store command bar — a two-row glass card: wordmark + search (with category
// scope) + account/cart on top, quick-nav pills beneath. On phones the search
// gets its own row so it stays one tap away. Heights here are load-bearing:
// app/store/layout.tsx offsets <main> and the listing's sticky filter bar to match.
const storeNav = [
  { label: 'Shop all', href: '/store/' },
  { label: 'Categories', href: '/store/#categories' },
  { label: 'Featured', href: '/store/#featured' },
  { label: 'Recipes', href: '/recipes/' },
  { label: 'Journal', href: '/journal/' },
  { label: 'Our story', href: '/#proof' },
];

export default function StoreHeader({ categories = [] }: { categories?: StoreCategory[] }) {
  const { itemCount, ready, openCart } = useCart();
  const { isAuthed, ready: authReady } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const accountHref = authReady && isAuthed ? '/store/account/' : '/store/login/';
  const badge = ready && itemCount > 0;

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-5 md:pt-4">
      <div
        className={`glass-pill mx-auto max-w-container rounded-[24px] px-4 py-2.5 transition-shadow duration-300 md:rounded-[28px] md:px-6 md:py-3 ${
          scrolled ? 'shadow-[0_18px_40px_-24px_rgba(28,25,18,0.5)]' : 'shadow-none'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link href="/" aria-label="Organikaly, home" className="flex shrink-0 items-center">
            <picture>
              <source srcSet="/brand/organikally-wordmark.webp" type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/organikally-wordmark.png"
                alt="Organikaly"
                width={805}
                height={200}
                className="h-[1.7rem] w-auto md:h-[1.9rem]"
              />
            </picture>
          </Link>

          <div className="hidden min-w-0 max-w-xl flex-1 md:block">
            <Suspense fallback={<SearchFallback />}>
              <StoreSearch categories={categories} />
            </Suspense>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <Link
              href={accountHref}
              aria-label={isAuthed ? 'Your account' : 'Sign in'}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-paper/60"
            >
              <User className="h-5 w-5" strokeWidth={1.8} />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Cart${badge ? `, ${itemCount} items` : ''}`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-paper/60"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />
              {badge && (
                <span className="tnum absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow px-1 text-[0.7rem] font-bold text-ink">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="rounded-full p-1.5 text-ink md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Phones: search on its own row. Desktop: quick-nav pills. The pill row
            collapses once the page scrolls so the header shrinks to a single bar
            and stops eating the viewport (Cowberry-style compact state). */}
        <div className="mt-2.5 md:hidden">
          <Suspense fallback={<SearchFallback compact />}>
            <StoreSearch categories={categories} compact />
          </Suspense>
        </div>
        <div
          className={`hidden overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-brand md:block ${
            scrolled ? 'mt-0 max-h-0 opacity-0' : 'mt-2 max-h-12 opacity-100'
          }`}
        >
          <nav aria-label="Store sections" className="flex items-center justify-center gap-1">
            {storeNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={scrolled ? -1 : undefined}
                className="rounded-full px-4 py-1.5 text-sm font-medium text-ink/70 transition hover:bg-paper/70 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 overflow-y-auto bg-paper text-ink md:hidden"
        >
          <div className="flex items-center justify-between px-6 py-5">
            <picture>
              <source srcSet="/brand/organikally-wordmark.webp" type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/organikally-wordmark.png"
                alt="Organikaly"
                width={805}
                height={200}
                className="h-8 w-auto"
              />
            </picture>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              className="p-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-6 flex flex-col gap-1 px-6">
            {storeNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-2xl"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={accountHref}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 text-2xl"
            >
              {isAuthed ? 'Account' : 'Sign in'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
