'use client';

import { useRef, useState } from 'react';

// PDP gallery (STORE_CONTRACT PDP requirements): responsive images, lazy-loaded
// thumbnails, hover zoom on the main image. The first image loads eager + high
// priority for LCP (§2.5). Uses the house <img> pattern, not next/image.
export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const safe = images.filter(Boolean);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const frameRef = useRef<HTMLDivElement>(null);

  if (safe.length === 0) {
    return <div className="aspect-square w-full rounded-card bg-gradient-to-br from-surface to-line" />;
  }

  const current = safe[active] ?? safe[0];

  const onMove = (e: React.MouseEvent) => {
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
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        className="relative aspect-square w-full overflow-hidden rounded-card border border-line bg-surface"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current}
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
      </div>

      {safe.length > 1 && (
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
          {safe.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-media border transition ${
                i === active ? 'border-ink' : 'border-line hover:border-ink/40'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt=""
                width={160}
                height={160}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
