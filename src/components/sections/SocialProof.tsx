'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { testimonials } from '@/content/testimonials';

export default function SocialProof() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = testimonials.length;

  // Active slide = the one nearest the track's centre (works with scroll-snap,
  // swipe, trackpad and the buttons alike). Read on scroll, rAF-throttled.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const slides = Array.from(track.querySelectorAll<HTMLElement>('[data-slide]'));
      const centre = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let dist = Infinity;
      slides.forEach((el, i) => {
        const c = el.offsetLeft + el.offsetWidth / 2;
        const d = Math.abs(c - centre);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(count - 1, i));
      const el = track.querySelectorAll<HTMLElement>('[data-slide]')[clamped];
      if (!el) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', inline: 'start', block: 'nearest' });
    },
    [count],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(active - 1);
    }
  };

  return (
    <section id="reviews" className="relative z-10 py-16 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow">Word of mouth</p>
            <h2 className="t-headline mt-6 max-w-xl font-semibold text-ink">
              Kitchens that know the difference.
            </h2>
            <p className="t-lead mt-5 max-w-measure">
              From the first whiff to the last spoon of a tadka — here’s what people noticed.
            </p>
          </Reveal>

          {/* Arrows — paired with the heading, desktop. */}
          <Reveal className="hidden gap-3 md:flex">
            <button
              type="button"
              onClick={() => go(active - 1)}
              disabled={active === 0}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition hover:border-yellow hover:bg-yellow/10 hover:text-yellow-ink disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              disabled={active === count - 1}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition hover:border-yellow hover:bg-yellow/10 hover:text-yellow-ink disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
            </button>
          </Reveal>
        </div>

        {/* The track — full-bleed within the container so the next card peeks in. */}
        <div
          ref={trackRef}
          role="group"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-5 px-5 pb-2 [scroll-behavior:smooth] focus:outline-none focus-visible:outline-none md:-mx-10 md:mt-14 md:scroll-pl-10 md:px-10"
        >
          {testimonials.map((t, i) => (
            <article
              key={`${t.name}-${i}`}
              data-slide={i}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              className="flex w-[86%] shrink-0 snap-start flex-col rounded-card bg-surface p-7 sm:w-[58%] md:p-8 lg:w-[40%]"
            >
              <span aria-hidden="true" className="block font-display text-4xl leading-none text-yellow-deep/45">
                &ldquo;
              </span>
              <blockquote className="mt-3 text-[1.0625rem] leading-relaxed text-ink md:text-lg">
                {t.quote}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-7">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-yellow/40 bg-yellow/10 text-sm font-semibold text-yellow-ink"
                >
                  {t.name.charAt(0)}
                </span>
                <span className="text-sm leading-tight">
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="block text-ink-faint">{t.location}</span>
                </span>
              </figcaption>
            </article>
          ))}
        </div>

        {/* Dots — position + jump. */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {testimonials.map((t, i) => (
            <button
              key={`${t.name}-dot-${i}`}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={active === i}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === i ? 'w-6 bg-yellow-deep' : 'w-2 bg-line hover:bg-ink-faint'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
