'use client';

import { useEffect } from 'react';

type LenisLike = {
  scrollTo: (target: HTMLElement | number, opts?: { offset?: number; duration?: number }) => void;
};

// Distance to keep a section's top clear of the floating header pill. Measured from
// the live header so it tracks the responsive pill height instead of a magic number.
function headerOffset(): number {
  const header = document.querySelector('header');
  if (!header) return 88;
  return header.getBoundingClientRect().bottom + 12;
}

function scrollToEl(el: HTMLElement) {
  const offset = headerOffset();
  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (lenis && !reduce) {
    lenis.scrollTo(el, { offset: -offset });
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
}

/**
 * Makes in-page anchor links glide instead of jumping. A single delegated click
 * handler intercepts same-page hash links (e.g. `/#range`, `#faq`), scrolls with
 * the page's Lenis instance when present (the homepage) and a native smooth
 * fallback otherwise, and keeps the URL hash in sync without a jump. Cross-page
 * links (a different pathname) are left alone so normal navigation still works.
 * Honours prefers-reduced-motion. Mounted once, app-wide, from the root layout.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const link = (e.target as HTMLElement | null)?.closest('a');
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      // Only same-document links with a hash, e.g. "/#range" on the homepage.
      if (url.pathname !== window.location.pathname || url.origin !== window.location.origin) return;
      if (!url.hash || url.hash === '#') return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      scrollToEl(el);
      history.pushState(null, '', url.hash);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Deep-link: if we land with a hash, glide to it once the layout has settled
  // (and the Lenis instance has had a chance to come up on the homepage).
  useEffect(() => {
    if (!window.location.hash) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) scrollToEl(el);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, []);

  return null;
}
