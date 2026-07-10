'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { nav, whatsapp } from '@/lib/site';
import WhatsappIcon from '@/components/ui/WhatsappIcon';

export default function SiteHeader({ forceSolid = false }: { forceSolid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const elevated = forceSolid || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.documentElement.style.overflow = open ? 'hidden' : '';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-5 md:pt-4">
      <div
        className={`glass-pill mx-auto flex max-w-container items-center justify-between rounded-full px-5 py-2.5 transition-shadow duration-300 md:px-6 ${
          elevated ? 'shadow-[0_18px_40px_-24px_rgba(28,25,18,0.5)]' : 'shadow-none'
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
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-ink/70 transition hover:text-forest"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-yellow px-4 py-2 text-sm font-semibold text-ink transition hover:bg-yellow-deep sm:inline-flex"
          >
            <WhatsappIcon className="h-4 w-4" />
            Order
          </a>
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
        <div className="fixed inset-0 z-50 bg-cream text-ink md:hidden">
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
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-2xl transition hover:text-forest"
              >
                {item.label}
              </a>
            ))}
            <a
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-yellow px-6 py-3.5 font-semibold text-ink"
            >
              <WhatsappIcon className="h-5 w-5" />
              Order on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
