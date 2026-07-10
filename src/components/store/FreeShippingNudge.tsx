'use client';

import { useEffect, useState } from 'react';
import { Truck } from 'lucide-react';
import { storeApi } from '@/lib/store/client';
import { formatPaise } from '@/lib/format';

// The cheapest AOV lever there is: show how close the cart is to free delivery.
// Threshold comes from live store config (cached for the session).
let cachedThreshold: number | null | undefined;

export default function FreeShippingNudge({ subtotalPaise }: { subtotalPaise: number }) {
  const [threshold, setThreshold] = useState<number | null | undefined>(cachedThreshold);

  useEffect(() => {
    if (cachedThreshold !== undefined) return;
    let alive = true;
    storeApi
      .config()
      .then((cfg) => {
        cachedThreshold = cfg.free_shipping_threshold_paise ?? null;
        if (alive) setThreshold(cachedThreshold);
      })
      .catch(() => {
        cachedThreshold = null;
        if (alive) setThreshold(null);
      });
    return () => {
      alive = false;
    };
  }, []);

  if (!threshold || subtotalPaise <= 0) return null;
  const remaining = threshold - subtotalPaise;
  const pct = Math.min(100, Math.round((subtotalPaise / threshold) * 100));

  return (
    <div className="border-t border-line bg-surface/60 px-5 py-3">
      <p className="flex items-center gap-2 text-sm">
        <Truck className="h-4 w-4 shrink-0 text-forest" strokeWidth={1.8} />
        {remaining > 0 ? (
          <span className="text-ink-muted">
            Add <strong className="tnum text-ink">{formatPaise(remaining)}</strong> more for{' '}
            <strong className="text-forest">free delivery</strong>
          </span>
        ) : (
          <span className="font-medium text-forest">Free delivery unlocked on this order</span>
        )}
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-brand ${
            remaining > 0 ? 'bg-yellow' : 'bg-forest'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
