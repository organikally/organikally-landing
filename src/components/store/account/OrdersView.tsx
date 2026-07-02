'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, Package, ChevronRight } from 'lucide-react';
import { storeApi, ApiError } from '@/lib/store/client';
import { formatPaise, formatDateTime } from '@/lib/format';
import OrderStatusPill from '@/components/store/OrderStatusPill';
import type { StoreOrderView } from '@/lib/store/types';

export default function OrdersView() {
  const [orders, setOrders] = useState<StoreOrderView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    storeApi
      .orders({ page_size: 50 })
      .then((res) => {
        if (!cancelled) setOrders(res.items);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof ApiError ? e.message : 'Could not load orders.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-ink-faint" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-container px-5 pb-24 pt-8 md:px-10">
      <Link href="/store/account/" className="text-sm font-semibold text-yellow-ink hover:text-ink">
        ← Account
      </Link>
      <h1 className="t-headline mt-4 font-semibold text-ink">Your orders</h1>

      {error && (
        <p className="mt-6 rounded-card bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {orders.length === 0 && !error ? (
        <div className="mt-12 rounded-card border border-line bg-surface px-6 py-16 text-center">
          <Package className="mx-auto h-10 w-10 text-ink-faint" strokeWidth={1.3} />
          <p className="mt-4 font-display text-xl text-ink">No orders yet</p>
          <p className="mt-2 text-ink-muted">When you place an order, it&apos;ll show up here.</p>
          <Link
            href="/store/"
            className="mt-6 inline-block rounded-full bg-yellow px-6 py-3 text-sm font-semibold text-ink transition hover:bg-yellow-deep"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {orders.map((o) => (
            <li key={o.id}>
              <Link
                href={`/store/orders/${o.code}/`}
                className="flex items-center justify-between gap-4 rounded-card border border-line bg-paper p-5 transition hover:border-ink/25 hover:shadow-sm"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-semibold text-ink">{o.code}</span>
                    <OrderStatusPill status={o.status} />
                  </div>
                  <p className="mt-1 text-sm text-ink-faint">
                    {formatDateTime(o.created_at)} · {o.items.length}{' '}
                    {o.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="tnum font-semibold text-ink">{formatPaise(o.total_paise)}</span>
                  <ChevronRight className="h-5 w-5 text-ink-faint" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
