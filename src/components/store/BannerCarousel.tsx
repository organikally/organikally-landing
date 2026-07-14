'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Promotional banner carousel — the store's above-the-fold stage. Native
// scroll-snap does the sliding (swipe works with zero JS); the island only adds
// autoplay, arrows and dots. Autoplay pauses on hover/focus/hidden-tab and never
// runs under prefers-reduced-motion. Slides arrive as serializable data from the
// server page; the first slide's image is the LCP element (eager + high priority,
// local pre-optimized AVIF/WebP/JPG triplet — the image optimizer is off).

export type BannerSlide = {
  key: string;
  /** public/ path without extension, e.g. "/media/field" — .avif/.webp/.jpg triplet */
  imageBase: string;
  imageAlt: string;
  eyebrow?: string;
  /** Optional Devanagari flourish rendered after the eyebrow in --font-deva */
  hindi?: string;
  title: string;
  body?: string;
  cta?: { label: string; href: string };
  cta2?: { label: string; href: string };
};

const AUTOPLAY_MS = 6500;

export default function BannerCarousel({
  slides,
  firstIsH1 = false,
  fullBleed = false,
}: {
  slides: BannerSlide[];
  firstIsH1?: boolean;
  /** Full-viewport hero: edge-to-edge, 100svh tall, no rounded corners. Used by
   *  the homepage to lead with a cinematic stage; the store keeps the compact card. */
  fullBleed?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Any direct interaction (tap, drag, arrow, dot) stops autoplay for good —
  // hover-pause alone is unreachable on touch (WCAG 2.2.2).
  const [stopped, setStopped] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedRef.current = mq.matches;
    const onChange = () => {
      reducedRef.current = mq.matches;
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const n = track.children.length;
    const next = ((i % n) + n) % n;
    track.scrollTo({
      left: next * track.clientWidth,
      behavior: reducedRef.current ? 'auto' : 'smooth',
    });
  }, []);

  // Track which slide is in view (also covers native swipes).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setIndex(Math.round(track.scrollLeft / Math.max(1, track.clientWidth)));
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Autoplay — advances from the *current* index so manual nav folds in naturally.
  useEffect(() => {
    if (paused || stopped || slides.length < 2) return;
    const id = window.setInterval(() => {
      if (document.hidden || reducedRef.current) return;
      const track = trackRef.current;
      if (!track) return;
      const current = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
      goTo(current + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, stopped, slides.length, goTo]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Store highlights"
      className={`group/carousel relative overflow-hidden ${
        fullBleed ? 'rounded-none' : 'rounded-[22px] md:rounded-[30px]'
      }`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onPointerDown={() => setStopped(true)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
      >
        {slides.map((s, i) => {
          const Title = firstIsH1 && i === 0 ? 'h1' : 'h2';
          return (
            <div
              key={s.key}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              className="relative w-full shrink-0 snap-center"
            >
              <picture>
                <source srcSet={`${s.imageBase}.avif`} type="image/avif" />
                <source srcSet={`${s.imageBase}.webp`} type="image/webp" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${s.imageBase}.jpg`}
                  alt={s.imageAlt}
                  width={1600}
                  height={900}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                  decoding="async"
                  sizes={fullBleed ? '100vw' : '(min-width: 1280px) 1160px, 100vw'}
                  className={
                    fullBleed
                      ? 'h-[100svh] min-h-[540px] w-full object-cover'
                      : 'h-[440px] w-full object-cover sm:h-[400px] md:h-[430px] lg:aspect-[21/8] lg:h-auto'
                  }
                />
              </picture>

              {/* Legibility scrim, heavier on the copy side. Full-bleed keeps a richer
                  green tint edge-to-edge (so a bright horizon never washes to white) and
                  adds a bottom fade so the copy + dots hold over a tall image. */}
              <div
                aria-hidden="true"
                className={
                  fullBleed
                    ? 'absolute inset-0 bg-gradient-to-r from-forest-deep/90 via-forest-deep/60 to-forest-deep/40'
                    : 'absolute inset-0 bg-gradient-to-r from-forest-deep/85 via-forest-deep/45 to-forest-deep/10 sm:via-forest-deep/35 sm:to-transparent'
                }
              />
              {fullBleed && (
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-deep/70 to-transparent"
                />
              )}

              <div className="absolute inset-0 flex items-center">
                <div
                  className={
                    fullBleed
                      ? 'mx-auto w-full max-w-container px-6 sm:px-10 md:px-10'
                      : 'w-full px-6 pb-14 pt-6 sm:px-10 sm:pb-10 md:px-14'
                  }
                >
                  <div className={fullBleed ? 'max-w-2xl' : 'max-w-xl'}>
                    {s.eyebrow && (
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-yellow sm:text-[0.8rem]">
                        {s.eyebrow}
                        {s.hindi && (
                          <span className="font-deva ml-2.5 normal-case tracking-normal text-paper/80">
                            {s.hindi}
                          </span>
                        )}
                      </p>
                    )}
                    <Title
                      className={`mt-3 font-display leading-[1.06] text-paper ${
                        fullBleed
                          ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
                          : 'text-3xl sm:text-4xl md:text-5xl'
                      }`}
                    >
                      {s.title}
                    </Title>
                    {s.body && (
                      <p
                        className={`mt-3 leading-relaxed text-paper/85 ${
                          fullBleed ? 'max-w-lg text-base md:text-lg' : 'max-w-md text-[0.95rem] md:text-base'
                        }`}
                      >
                        {s.body}
                      </p>
                    )}
                    {(s.cta || s.cta2) && (
                      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                        {s.cta && (
                          <Link
                            href={s.cta.href}
                            className="inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-3 text-[0.95rem] font-semibold text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition duration-300 ease-brand hover:-translate-y-[2px] hover:bg-yellow-deep"
                          >
                            {s.cta.label}
                          </Link>
                        )}
                        {s.cta2 && (
                          <Link
                            href={s.cta2.href}
                            className="group/cta2 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-paper/90 transition-colors hover:text-yellow"
                          >
                            {s.cta2.label}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/cta2:translate-x-0.5" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {slides.length > 1 && (
        <>
          {/* Arrows — desktop affordance; small screens swipe. */}
          <button
            type="button"
            aria-label="Previous banner"
            onClick={() => goTo(index - 1)}
            className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 text-ink shadow-md backdrop-blur transition duration-300 ease-brand hover:bg-paper md:flex"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Next banner"
            onClick={() => goTo(index + 1)}
            className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 text-ink shadow-md backdrop-blur transition duration-300 ease-brand hover:bg-paper md:flex"
          >
            <ArrowRight className="h-5 w-5" strokeWidth={2} />
          </button>

          {/* Dots — the active one stretches gold. Each button carries a padded
              hit area well beyond the visual dot (touch-target minimums). */}
          <div className={`absolute inset-x-0 flex justify-center ${fullBleed ? 'bottom-7' : 'bottom-2'}`}>
            <div className="flex items-center rounded-full bg-ink/35 px-2 py-0.5 backdrop-blur-sm">
              {slides.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  aria-label={`Go to banner ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => goTo(i)}
                  className="flex h-8 min-w-7 items-center justify-center px-1"
                >
                  <span
                    className={`h-2 rounded-full transition-all duration-300 ease-brand ${
                      i === index ? 'w-6 bg-yellow' : 'w-2 bg-paper/70'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
