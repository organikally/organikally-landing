'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/lib/store/cart-context';
import { useAuth } from '@/lib/store/auth-context';

// Store header — reuses the marketing glass-pill styling (SiteHeader idiom) and adds
// a live cart indicator. Links back to the marketing site so the store feels native.
const storeNav = [
  { label: 'Shop', href: '/store/' },
  { label: 'Journal', href: '/journal/' },
  { label: 'Our story', href: '/#proof' },
];

export default function StoreHeader() {
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
        className={`glass-pill mx-auto flex max-w-container items-center justify-between rounded-full px-5 py-2.5 transition-shadow duration-300 md:px-6 ${
          scrolled ? 'shadow-[0_18px_40px_-24px_rgba(28,25,18,0.5)]' : 'shadow-none'
        }`}
      >
        <Link href="/" aria-label="Organikaly, home" className="flex shrink-0 items-center">
          <picture>
            <source srcSet="/brand/organikally-wordmark.webp" type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/organikally-wordmark.png"
              alt="Organikaly"
              width={805}
              height={200}
              className="h-[1.7rem] w-auto md:h-[2rem]"
            />
          </picture>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {storeNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink/70 transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
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

      {open && (
        <div className="fixed inset-0 z-50 bg-paper text-ink md:hidden">
          <div className="flex items-center justify-between px-6 py-5">
            <picture>
              <source srcSet="/brand/organikally-wordmark.webp" type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/organikally-wordmark.png"
                alt="Organikaly"
                width={448}
                height={85}
                className="h-8 w-auto"
              />
            </picture>
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="p-2">
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
