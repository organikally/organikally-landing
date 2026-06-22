'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Full-page background hero film, scrubbed by scroll. A fixed, full-viewport
 * <video> is driven frame-accurately from scroll progress over the hero stage —
 * scroll forward and the film plays forward; stop and it holds. The source is the
 * full-quality native 1080p film, re-encoded all-intra so every frame is a
 * keyframe and seeking stays smooth (no frame-decode lag). While it buffers, a
 * warm shimmer-and-oil-drop loader holds the space and fades out the moment the
 * first frame is ready. On prefers-reduced-motion the film holds on its poster.
 */
export default function HeroFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  // Prepare the film for scrubbing: prime decoding (so setting currentTime renders
  // frames, incl. iOS Safari) and reveal once the first frame is available. The
  // rest streams in as the user scrolls. Reduced-motion keeps the static poster.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReady(true);
      return;
    }
    v.muted = true;

    const reveal = () => setReady(true);
    v.addEventListener('loadeddata', reveal);
    v.addEventListener('canplay', reveal);

    // A brief muted play()→pause() unlocks frame-accurate seeking on a paused
    // <video> (some browsers won't repaint on currentTime changes otherwise).
    const prime = () => {
      const p = v.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          v.pause();
          v.currentTime = 0;
        }).catch(() => {});
      } else {
        try {
          v.pause();
        } catch {
          /* noop */
        }
      }
    };
    v.addEventListener('loadedmetadata', prime);

    return () => {
      v.removeEventListener('loadeddata', reveal);
      v.removeEventListener('canplay', reveal);
      v.removeEventListener('loadedmetadata', prime);
    };
  }, []);

  // Scroll choreography: Lenis smooth scroll (also the engine SmoothScroll uses
  // for anchor nav), the film scrub (scroll progress → video.currentTime), the
  // scrubbed kinetic hero copy, and the hero column / CTA fades. Skipped on
  // reduced-motion (static poster, native scrolling).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let destroyed = false;
    let teardown: Array<() => void> = [];

    const start = async () => {
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
      // Exposed app-wide so SmoothScroll drives anchor navigation through the same
      // instance (otherwise a native fallback handles it).
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      const ticker = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      const heroStage = document.querySelector('#hero-stage');
      const heroContent = document.querySelector<HTMLElement>('#hero-content');
      const heroCta = document.querySelector<HTMLElement>('#hero-cta');
      const beatEls = Array.from(document.querySelectorAll<HTMLElement>('[data-hero-beat]'));

      const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
      const smooth = (v: number) => {
        const t = clamp01(v);
        return t * t * (3 - 2 * t);
      };

      // The hero copy is positioned directly from scroll progress (no masks).
      const { createHeroKinetic } = await import('./heroKinetic');
      if (destroyed) return;
      const kinetic = createHeroKinetic(beatEls);

      const st = ScrollTrigger.create({
        trigger: heroStage ?? document.documentElement,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          const p = self.progress;
          kinetic.setProgress(p);

          // Scrub the film: scroll progress → frame. Stop a hair short of the end
          // so we never land on a stalled past-last-frame seek.
          const v = videoRef.current;
          if (v && Number.isFinite(v.duration) && v.duration > 0) {
            const t = Math.min(v.duration - 0.05, p * v.duration);
            if (Math.abs(t - v.currentTime) > 0.02) {
              try {
                v.currentTime = t;
              } catch {
                /* seeking before metadata; ignored */
              }
            }
          }

          // Fade the hero column out late in the stage so the content sheet can rise.
          if (heroContent) {
            heroContent.style.opacity = String(1 - smooth((p - 0.6) / 0.14));
          }
          // The actions clear the moment you start scrolling; the header keeps an Order button.
          if (heroCta) {
            const e = smooth(p / 0.04);
            heroCta.style.opacity = String(1 - e);
            heroCta.style.transform = `translate3d(0, ${24 * e}px, 0)`;
            heroCta.style.pointerEvents = e > 0.5 ? 'none' : '';
          }
        },
      });

      teardown.push(() => {
        st.kill();
        kinetic.destroy();
        gsap.ticker.remove(ticker);
        lenis.destroy();
        delete (window as unknown as { __lenis?: unknown }).__lenis;
      });
    };

    if (document.readyState === 'complete') void start();
    else {
      const onLoad = () => void start();
      window.addEventListener('load', onLoad, { once: true });
      teardown.push(() => window.removeEventListener('load', onLoad));
    }

    return () => {
      destroyed = true;
      teardown.forEach((fn) => fn());
      teardown = [];
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 top-[4.5rem] z-0 overflow-hidden md:top-[5rem]"
      style={{ transform: 'translateZ(0)' }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-[72%_50%] md:object-center"
        poster="/hero/poster.jpg"
        muted
        playsInline
        preload="auto"
      >
        <source src="/hero/hero.mp4" type="video/mp4" />
      </video>

      {/* Loading state — a warm shimmer with an oil-drop ripple, held until the
          film's first frame is ready, then faded out. */}
      <div className={`hero-loader ${ready ? 'is-ready' : ''}`}>
        <div className="hero-loader-ripple">
          <span className="ring" />
          <span className="ring" />
          <span className="ring" />
          <span className="dot" />
        </div>
      </div>
    </div>
  );
}
