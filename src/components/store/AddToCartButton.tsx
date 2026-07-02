'use client';

import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/lib/store/cart-context';
import type { StorefrontProduct } from '@/lib/store/types';

// Disables add-to-cart when out of stock (STORE_CONTRACT requirement). Stock is
// advisory here; the authoritative gate is the atomic reservation at checkout.
export default function AddToCartButton({
  product,
  qty = 1,
  variant = 'primary',
  className = '',
  label = 'Add to cart',
}: {
  product: StorefrontProduct;
  qty?: number;
  variant?: 'primary' | 'compact';
  className?: string;
  label?: string;
}) {
  const { add, busy } = useCart();
  const [added, setAdded] = useState(false);

  if (!product.in_stock) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className={`inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink-faint ${className}`}
      >
        Out of stock
      </button>
    );
  }

  const onAdd = async () => {
    await add(
      {
        store_product_id: product.id,
        slug: product.slug,
        name: product.name,
        image: product.primary_image,
        unit_price_paise: product.price_paise,
        compare_at_price_paise: product.compare_at_price_paise ?? null,
        sellable_qty: product.sellable_qty,
        max_qty_per_order: product.max_qty_per_order ?? null,
      },
      qty,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const base =
    'group/cta inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300 ease-brand active:scale-[0.98] disabled:opacity-60';
  const styles =
    variant === 'compact'
      ? 'border border-ink/15 bg-paper px-4 py-2 text-sm text-ink hover:border-ink/35 hover:bg-surface'
      : 'bg-yellow px-6 py-3 text-[0.95rem] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_10px_24px_-14px_rgba(206,150,10,0.7)] hover:-translate-y-[2px] hover:bg-yellow-deep';

  return (
    <button
      type="button"
      onClick={onAdd}
      disabled={busy}
      className={`${base} ${styles} ${className}`}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" /> Added
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" /> {label}
        </>
      )}
    </button>
  );
}
