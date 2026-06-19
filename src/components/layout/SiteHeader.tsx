'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { nav, whatsapp } from '@/lib/site';
import WhatsappIcon from '@/components/ui/WhatsappIcon';

export default function SiteHeader({ forceSolid = false }: { forceSolid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const solid = forceSolid || scrolled;

  useEffect(() => {
    if (forceSolid) return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [forceSolid]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.documentElement.style.overflow = open ? 'hidden' : '';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const linkColor = solid ? 'text-charcoal/80 hover:text-forest' : 'text-cream/90 hover:text-cream';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? 'border-b border-line bg-cream/90 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className={`font-serif text-2xl font-semibold tracking-tight ${solid ? 'text-forest' : 'text-cream drop-shadow'}`}
        >
          Organikally
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={`transition ${linkColor}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition sm:inline-flex ${
              solid ? 'bg-green text-cream hover:bg-green-700' : 'bg-cream/95 text-forest hover:bg-cream'
            }`}
          >
            <WhatsappIcon className="h-4 w-4" />
            Order
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className={`rounded-lg p-2 md:hidden ${solid ? 'text-forest' : 'text-cream'}`}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-forest text-cream md:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <span className="font-serif text-2xl font-semibold">Organikally</span>
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
                className="border-b border-cream/10 py-4 font-serif text-2xl"
              >
                {item.label}
              </a>
            ))}
            <a
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-cream px-6 py-3.5 font-semibold text-forest"
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
