'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatPaise } from '@/lib/format';

// Recently-viewed — a lightweight, on-device memory of the last products a
// shopper opened. No server involved: snapshots live in localStorage and the
// rail renders only after mount (nothing at SSR, so no hydration mismatch).
const KEY = 'organikaly.recent';
const MAX = 8;

type RecentItem = {
  slug: string;
  name: string;
  image: string;
  price_paise: number;
  at: number;
};

function read(): RecentItem[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as RecentItem[]) : [];
    return Array.isArray(parsed) ? parsed.filter((r) => r && r.slug && r.name) : [];
  } catch {
    return [];
  }
}

/** Drop-in for the PDP — records the visit, renders nothing. */
export function RecordRecentlyViewed({
  slug,
  name,
  image,
  pricePaise,
}: {
  slug: string;
  name: string;
  image: string;
  pricePaise: number;
}) {
  useEffect(() => {
    const rest = read().filter((r) => r.slug !== slug);
    const next = [{ slug, name, image, price_paise: pricePaise, at: Date.now() }, ...rest].slice(0, MAX);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage full/blocked — not worth surfacing */
    }
  }, [slug, name, image, pricePaise]);
  return null;
}

/** The rail — shown on the store landing once there's something to show. */
export default function RecentlyViewed({ excludeSlug }: { excludeSlug?: string }) {
  const [items, setItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    setItems(read().filter((r) => r.slug !== excludeSlug));
  }, [excludeSlug]);

  if (items.length === 0) return null;
  return (
    <section className="mt-14 md:mt-20" aria-label="Recently viewed">
      <p className="eyebrow">Pick up where you left off</p>
      <h2 className="mt-3 font-display text-2xl text-ink md:text-3xl">Recently viewed</h2>
      <div className="no-scrollbar -mx-5 mt-6 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
        {items.map((r) => (
          <Link
            key={r.slug}
            href={`/store/${r.slug}/`}
            className="group w-40 shrink-0 snap-start sm:w-44"
          >
            <span className="block overflow-hidden rounded-card border border-line bg-paper shadow-sm transition duration-300 ease-brand group-hover:-translate-y-1 group-hover:shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={r.image}
                alt={r.name}
                width={300}
                height={300}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </span>
            <span className="mt-2.5 line-clamp-2 block text-sm font-medium leading-snug text-ink">
              {r.name}
            </span>
            <span className="tnum mt-0.5 block text-sm font-semibold text-ink-muted">
              {formatPaise(r.price_paise)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
