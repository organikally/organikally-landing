'use client';

import { useEffect, useRef } from 'react';

type FrameSet = { count: number; width: number; path: string; ext: string };
type Manifest = {
  desktop: FrameSet;
  mobile: FrameSet & { stride: number };
  poster: { avif: string; webp: string; jpg: string };
  fallbackVideo: string;
};

/**
 * Full-page scroll-driven background. A fixed, full-viewport <canvas> paints a
 * frame from the hero animation chosen by global scroll progress, while page
 * content scrolls over it. The poster <img> is the LCP element (painted instantly);
 * the canvas takes over once frames stream in. On reduced-motion the scrub is
 * disabled and the static poster remains.
 */
export default function HeroScrub() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pad = (n: number) => String(n).padStart(4, '0');

    let destroyed = false;
    let images: Array<HTMLImageElement | undefined> = [];
    let count = 0;
    let drawn = -1;
    let target = 0;
    let teardown: Array<() => void> = [];

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const drawCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const nearestLoaded = (i: number) => {
      const ready = (im?: HTMLImageElement) => im?.complete && im.naturalWidth > 0;
      if (ready(images[i])) return images[i];
      for (let d = 1; d < count; d++) {
        if (ready(images[i - d])) return images[i - d];
        if (ready(images[i + d])) return images[i + d];
      }
      return undefined;
    };

    const render = (i: number) => {
      target = Math.max(0, Math.min(count - 1, i));
      if (target === drawn) return;
      const img = nearestLoaded(target);
      if (img) {
        drawCover(img);
        drawn = target;
      }
    };

    const init = async () => {
      fit();

      const manifest: Manifest = await fetch('/hero/manifest.json').then((r) => r.json());
      if (destroyed) return;
      const set = window.innerWidth < 768 ? manifest.mobile : manifest.desktop;
      count = set.count;
      images = new Array(count);

      // Paint the poster into the canvas immediately as the baseline.
      const poster = new Image();
      poster.onload = () => {
        if (drawn < 0) drawCover(poster);
      };
      poster.src = manifest.poster.avif;

      if (reduce) return; // static poster only, no scrub, no preload

      // Defer frame streaming + motion libs until after first load so they never
      // compete with the LCP; the poster stays visible until the scrub is ready.
      const startScrub = async () => {
        if (destroyed) return;
        const loadFrame = (i: number) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = 'async';
          const done = () => {
            if (i === target) render(target); // refresh if this is what we're waiting on
            resolve();
          };
          img.onload = done;
          img.onerror = () => resolve();
          img.src = `${set.path}/f${pad(i + 1)}.${set.ext}`;
          images[i] = img;
        });

      // Prime the first frames so early scroll is smooth, then stream the rest.
      const prime = Math.min(24, count);
      for (let i = 0; i < prime; i++) {
        if (destroyed) return;
        await loadFrame(i);
      }
      render(0);
      void (async () => {
        for (let i = prime; i < count; i++) {
          if (destroyed) return;
          await loadFrame(i);
        }
      })();

      // Smooth scroll + scroll-progress → frame index.
      const [lenisMod, gsapMod, stMod] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (destroyed) return;
      const Lenis = lenisMod.default;
      const gsap = gsapMod.gsap ?? gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      if (process.env.NODE_ENV !== 'production') {
        (window as unknown as { __lenis?: unknown }).__lenis = lenis;
      }
      lenis.on('scroll', ScrollTrigger.update);
      const ticker = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      const st = ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => render(Math.round(self.progress * (count - 1))),
      });

      const onResize = () => {
        fit();
        drawn = -1;
        render(target);
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', onResize);

      teardown.push(() => {
        window.removeEventListener('resize', onResize);
        st.kill();
        gsap.ticker.remove(ticker);
        lenis.destroy();
      });
      };

      if (document.readyState === 'complete') void startScrub();
      else {
        const onLoad = () => void startScrub();
        window.addEventListener('load', onLoad, { once: true });
        teardown.push(() => window.removeEventListener('load', onLoad));
      }
    };

    // Refit on resize even before GSAP loads (poster path / reduced-motion).
    const onResizeBase = () => {
      fit();
      drawn = -1;
      const img = nearestLoaded(target);
      if (img) drawCover(img);
    };
    window.addEventListener('resize', onResizeBase);
    teardown.push(() => window.removeEventListener('resize', onResizeBase));

    void init().catch((e) => console.error('[hero] init failed', e));

    return () => {
      destroyed = true;
      teardown.forEach((fn) => fn());
      teardown = [];
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
    >
      <picture>
        <source srcSet="/hero/poster.avif" type="image/avif" />
        <source srcSet="/hero/poster.webp" type="image/webp" />
        <img
          src="/hero/poster.jpg"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
