'use client';

import { useRef, useState } from 'react';
import { Play } from 'lucide-react';

// PDP gallery (STORE_CONTRACT PDP requirements): responsive images, lazy-loaded
// thumbnails, hover zoom on the main image. The first image loads eager + high
// priority for LCP (§2.5). Uses the house <img> pattern, not next/image.
// An optional short product/ad clip is appended as an extra slide — the still
// images stay the LCP element; the video only mounts when the shopper opens it.
type Slide =
  | { kind: 'image'; src: string }
  | { kind: 'video'; src: string; poster: string };

export default function Gallery({
  images,
  alt,
  video,
}: {
  images: string[];
  alt: string;
  video?: string | null;
}) {
  const safe = images.filter(Boolean);
  const slides: Slide[] = safe.map((src) => ({ kind: 'image' as const, src }));
  if (video) slides.push({ kind: 'video', src: video, poster: safe[0] ?? '' });

  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const frameRef = useRef<HTMLDivElement>(null);

  if (slides.length === 0) {
    return <div className="aspect-square w-full rounded-card bg-gradient-to-br from-surface to-line" />;
  }

  const current: Slide = slides[active] ?? slides[0]!;

  const onMove = (e: React.MouseEvent) => {
    if (current.kind !== 'image') return;
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={frameRef}
        onMouseEnter={() => current.kind === 'image' && setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        className="relative aspect-square w-full overflow-hidden rounded-card border border-line bg-surface"
      >
        {current.kind === 'video' ? (
          <video
            key={current.src}
            src={current.src}
            poster={current.poster || undefined}
            autoPlay
            muted
            loop
            playsInline
            controls
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={alt}
              width={900}
              height={900}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="h-full w-full object-cover transition-transform duration-200 ease-out"
              style={{ transform: zoom ? 'scale(1.8)' : 'scale(1)', transformOrigin: origin }}
            />
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
          {slides.map((s, i) => (
            <button
              key={s.src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={s.kind === 'video' ? 'Play product video' : `View image ${i + 1}`}
              aria-current={i === active}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-media border transition ${
                i === active ? 'border-ink' : 'border-line hover:border-ink/40'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.kind === 'video' ? s.poster : s.src}
                alt=""
                width={160}
                height={160}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              {s.kind === 'video' && (
                <span className="absolute inset-0 grid place-items-center bg-ink/30">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-cream/90 text-ink shadow-sm">
                    <Play className="h-3.5 w-3.5 translate-x-[1px] fill-current" />
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
