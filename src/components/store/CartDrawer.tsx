'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/store/cart-context';
import { useAuth } from '@/lib/store/auth-context';
import { formatPaise } from '@/lib/format';
import StoreImage from './StoreImage';
import QuantityStepper from './QuantityStepper';
import FreeShippingNudge from './FreeShippingNudge';

export default function CartDrawer() {
  const { isOpen, closeCart, items, subtotalPaise, itemCount, notices, updateQty, remove } =
    useCart();
  const { isAuthed } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart();
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [isOpen, closeCart]);

  const goCheckout = () => {
    closeCart();
    router.push(isAuthed ? '/store/checkout/' : '/store/login/?next=/store/checkout/');
  };

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-panel transition-transform duration-300 ease-brand ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-xl text-ink">
            Your cart{itemCount > 0 ? ` (${itemCount})` : ''}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-full p-2 text-ink transition hover:bg-surface"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {notices.length > 0 && (
          <div className="border-b border-line bg-yellow/10 px-5 py-2.5 text-sm text-yellow-ink">
            {notices.map((n, i) => (
              <p key={i}>{n.message}</p>
            ))}
          </div>
        )}

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-ink-faint" strokeWidth={1.4} />
            <p className="text-ink-muted">Your cart is empty.</p>
            <Link
              href="/store/"
              onClick={closeCart}
              className="rounded-full bg-yellow px-6 py-3 text-sm font-semibold text-ink transition hover:bg-yellow-deep"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {items.map((line) => (
                <li key={line.store_product_id} className="flex gap-3 py-4">
                  <Link
                    href={`/store/${line.slug}/`}
                    onClick={closeCart}
                    className="shrink-0"
                  >
                    <StoreImage
                      src={line.image}
                      alt={line.name}
                      width={120}
                      height={120}
                      className="h-20 w-20 rounded-media"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/store/${line.slug}/`}
                        onClick={closeCart}
                        className="line-clamp-2 text-sm font-semibold text-ink hover:text-yellow-ink"
                      >
                        {line.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(line.store_product_id)}
                        aria-label={`Remove ${line.name}`}
                        className="shrink-0 rounded-full p-1 text-ink-faint transition hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    {!line.in_stock && (
                      <span className="mt-1 text-xs font-semibold text-red-700">Out of stock</span>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QuantityStepper
                        value={line.qty}
                        onChange={(q) => updateQty(line.store_product_id, q)}
                        max={line.max_qty_per_order ?? line.sellable_qty}
                        size="sm"
                      />
                      <span className="tnum text-sm font-semibold text-ink">
                        {formatPaise(line.line_total_paise)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <FreeShippingNudge subtotalPaise={subtotalPaise} />

            <div className="border-t border-line px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-ink-muted">Subtotal</span>
                <span className="tnum text-lg font-semibold text-ink">
                  {formatPaise(subtotalPaise)}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-faint">
                Shipping &amp; any discount calculated at checkout.
              </p>
              <button
                type="button"
                onClick={goCheckout}
                className="mt-4 w-full rounded-full bg-yellow px-6 py-3.5 text-center font-semibold text-ink transition hover:bg-yellow-deep"
              >
                Checkout
              </button>
              <Link
                href="/store/cart/"
                onClick={closeCart}
                className="mt-2 block w-full rounded-full border border-ink/15 px-6 py-3 text-center text-sm font-semibold text-ink transition hover:bg-surface"
              >
                View full cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
