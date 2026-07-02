'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '@/lib/store/cart-context';
import { useAuth } from '@/lib/store/auth-context';
import { formatPaise } from '@/lib/format';
import StoreImage from './StoreImage';
import QuantityStepper from './QuantityStepper';
import StockBadge from './StockBadge';
import CouponField from './CouponField';

export default function CartPageView() {
  const {
    items,
    itemCount,
    subtotalPaise,
    couponDiscountPaise,
    notices,
    updateQty,
    remove,
    error,
    ready,
  } = useCart();
  const { isAuthed } = useAuth();
  const router = useRouter();

  const estimatedTotal = Math.max(0, subtotalPaise - couponDiscountPaise);
  const hasOOS = items.some((l) => !l.in_stock);

  if (ready && items.length === 0) {
    return (
      <div className="mx-auto max-w-container px-5 py-24 text-center md:px-10">
        <ShoppingBag className="mx-auto h-12 w-12 text-ink-faint" strokeWidth={1.3} />
        <h1 className="t-title mt-6 font-semibold text-ink">Your cart is empty</h1>
        <p className="mt-2 text-ink-muted">Add something from the shop to get started.</p>
        <Link
          href="/store/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-yellow px-7 py-3.5 font-semibold text-ink transition hover:bg-yellow-deep"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-container px-5 pb-24 pt-8 md:px-10">
      <Link href="/store/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-yellow-ink hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Continue shopping
      </Link>
      <h1 className="t-headline mt-5 font-semibold text-ink">Your cart</h1>

      {notices.length > 0 && (
        <div className="mt-5 rounded-card border border-yellow-deep/30 bg-yellow/10 px-4 py-3 text-sm text-yellow-ink">
          {notices.map((n, i) => (
            <p key={i}>{n.message}</p>
          ))}
        </div>
      )}
      {error && (
        <p className="mt-5 rounded-card bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        {/* Items */}
        <ul className="divide-y divide-line border-y border-line">
          {items.map((line) => (
            <li key={line.store_product_id} className="flex gap-4 py-5">
              <Link href={`/store/${line.slug}/`} className="shrink-0">
                <StoreImage
                  src={line.image}
                  alt={line.name}
                  width={160}
                  height={160}
                  className="h-24 w-24 rounded-media md:h-28 md:w-28"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/store/${line.slug}/`}
                      className="font-semibold text-ink hover:text-yellow-ink"
                    >
                      {line.name}
                    </Link>
                    <p className="tnum mt-1 text-sm text-ink-muted">
                      {formatPaise(line.unit_price_paise)} each
                    </p>
                    {!line.in_stock && (
                      <span className="mt-2 inline-block">
                        <StockBadge inStock={false} lowStock={false} />
                      </span>
                    )}
                  </div>
                  <span className="tnum font-semibold text-ink">{formatPaise(line.line_total_paise)}</span>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <QuantityStepper
                    value={line.qty}
                    onChange={(q) => updateQty(line.store_product_id, q)}
                    max={line.max_qty_per_order ?? line.sellable_qty}
                    size="sm"
                  />
                  <button
                    type="button"
                    onClick={() => remove(line.store_product_id)}
                    className="inline-flex items-center gap-1.5 text-sm text-ink-faint transition hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="h-fit rounded-card border border-line bg-surface p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-xl text-ink">Order summary</h2>

          <div className="mt-5 space-y-2.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">
                Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </span>
              <span className="tnum font-semibold text-ink">{formatPaise(subtotalPaise)}</span>
            </div>
            {couponDiscountPaise > 0 && (
              <div className="flex items-center justify-between text-yellow-ink">
                <span>Coupon discount</span>
                <span className="tnum font-semibold">−{formatPaise(couponDiscountPaise)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-ink-muted">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>

          <div className="mt-4 border-t border-line pt-4">
            <CouponField />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <span className="font-semibold text-ink">Estimated total</span>
            <span className="tnum text-xl font-semibold text-ink">{formatPaise(estimatedTotal)}</span>
          </div>
          <p className="mt-1 text-xs text-ink-faint">Before shipping. Final total shown at checkout.</p>

          <button
            type="button"
            disabled={hasOOS}
            onClick={() =>
              router.push(isAuthed ? '/store/checkout/' : '/store/login/?next=/store/checkout/')
            }
            className="mt-5 w-full rounded-full bg-yellow px-6 py-3.5 font-semibold text-ink transition hover:bg-yellow-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAuthed ? 'Proceed to checkout' : 'Sign in to checkout'}
          </button>
          {hasOOS && (
            <p className="mt-2 text-center text-xs text-red-700">
              Remove out-of-stock items to continue.
            </p>
          )}
          {!isAuthed && (
            <p className="mt-3 text-center text-xs text-ink-faint">
              You can build your cart as a guest. An account is needed only to pay.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
