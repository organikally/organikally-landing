'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/store/cart-context';
import AddToCartButton from './AddToCartButton';
import QuantityStepper from './QuantityStepper';
import BackInStockForm from './BackInStockForm';
import type { StorefrontProductDetail } from '@/lib/store/types';

// PDP purchase panel: quantity + add-to-cart (disabled OOS → back-in-stock capture).
export default function PdpBuyBox({ product }: { product: StorefrontProductDetail }) {
  const { openCart, itemCount } = useCart();
  const [qty, setQty] = useState(1);
  const max = product.max_qty_per_order
    ? Math.min(product.max_qty_per_order, product.sellable_qty)
    : product.sellable_qty;

  if (!product.in_stock) {
    return (
      <div className="mt-6 rounded-card border border-line bg-surface p-5">
        <p className="font-semibold text-ink">Currently out of stock</p>
        <p className="mt-1 text-sm text-ink-muted">
          Leave your email and we&apos;ll let you know the moment it&apos;s back.
        </p>
        <div className="mt-3">
          <BackInStockForm productId={product.id} />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <QuantityStepper value={qty} onChange={setQty} max={max} min={1} />
        <AddToCartButton product={product} qty={qty} label="Add to cart" className="grow sm:grow-0" />
      </div>
      <div className="flex items-center gap-4 text-sm">
        <button
          type="button"
          onClick={openCart}
          className="font-semibold text-yellow-ink underline decoration-yellow decoration-2 underline-offset-4 hover:text-ink"
        >
          View cart{itemCount > 0 ? ` (${itemCount})` : ''}
        </button>
        <Link
          href="/store/checkout/"
          className="font-semibold text-ink-muted underline decoration-line decoration-2 underline-offset-4 hover:text-ink"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
