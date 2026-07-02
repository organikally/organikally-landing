'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, ArrowLeft } from 'lucide-react';
import { storeApi, ApiError } from '@/lib/store/client';
import OrderBody from '@/components/store/order/OrderBody';
import type { StoreOrderView } from '@/lib/store/types';

export default function OrderDetailView({ code }: { code: string }) {
  const [order, setOrder] = useState<StoreOrderView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    storeApi
      .order(code)
      .then((o) => {
        if (!cancelled) setOrder(o);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof ApiError ? e.message : 'Could not load this order.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
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
          Back to orders
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-container px-5 pb-24 pt-8 md:px-10">
      <Link href="/store/orders/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-yellow-ink hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> All orders
      </Link>
      <h1 className="t-headline mt-4 font-semibold text-ink">Order {order.code}</h1>
      <div className="mt-8">
        <OrderBody order={order} />
      </div>
    </div>
  );
}
