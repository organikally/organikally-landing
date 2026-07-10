'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Loader2, CheckCircle2, Clock } from 'lucide-react';
import { storeApi, ApiError } from '@/lib/store/client';
import OrderBody from './OrderBody';
import type { StoreOrderView } from '@/lib/store/types';

const PAID = new Set(['paid', 'confirmed', 'packed', 'shipped', 'delivered']);

export default function OrderConfirmationView({ code }: { code: string }) {
  const [order, setOrder] = useState<StoreOrderView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const polls = useRef(0);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = async () => {
      try {
        const o = await storeApi.order(code);
        if (cancelled) return;
        setOrder(o);
        setLoading(false);
        // The webhook is the source of truth and may lag the redirect — poll briefly.
        if (!PAID.has(o.status) && polls.current < 5) {
          polls.current += 1;
          timer = setTimeout(tick, 2500);
        }
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof ApiError ? e.message : 'Could not load your order.');
        setLoading(false);
      }
    };

    void tick();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [code]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-ink-faint" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <h1 className="t-title font-semibold text-ink">Order {code}</h1>
        <p className="mt-3 text-ink-muted">{error ?? 'Order not found.'}</p>
        <Link href="/store/orders/" className="mt-6 inline-block font-semibold text-yellow-ink hover:text-ink">
          View your orders
        </Link>
      </div>
    );
  }

  const paid = PAID.has(order.status);

  return (
    <div className="mx-auto max-w-container px-5 pb-24 pt-8 md:px-10">
      <div className="rounded-card border border-line bg-surface p-6 text-center md:p-10">
        <div
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
            paid ? 'bg-[#1B5E20]/12 text-[#1B5E20]' : 'bg-yellow/15 text-yellow-ink'
          }`}
        >
          {paid ? <CheckCircle2 className="h-7 w-7" /> : <Clock className="h-7 w-7" />}
        </div>
        <h1 className="t-title mt-5 font-semibold text-ink">
          {paid ? 'Thank you for your order!' : 'We\u2019re confirming your payment'}
        </h1>
        <p className="mt-2 text-ink-muted">
          {paid
            ? `Order ${order.code} is confirmed. A confirmation email is on its way.`
            : `Order ${order.code} is being processed. We'll email you the moment it's confirmed.`}
        </p>
      </div>

      <div className="mt-10">
        <OrderBody order={order} />
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/store/orders/"
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-ink/90"
        >
          View all orders
        </Link>
        <Link
          href="/store/"
          className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-surface"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
