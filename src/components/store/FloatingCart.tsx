'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/store/cart-context';

// Always-in-reach cart — a fixed forest roundel that opens the cart drawer.
// Sits below the header (z-40) and drawer (z-60) layers; the drawer's backdrop
// covers it while open.
export default function FloatingCart() {
  const { itemCount, ready, openCart } = useCart();
  const badge = ready && itemCount > 0;
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart${badge ? `, ${itemCount} items` : ''}`}
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-forest text-paper shadow-lg ring-2 ring-yellow-deep/50 ring-offset-2 ring-offset-paper transition duration-300 ease-brand hover:-translate-y-0.5 hover:bg-forest-deep md:bottom-7 md:right-7"
    >
      <ShoppingCart className="h-6 w-6" strokeWidth={1.9} />
      {badge && (
        <span className="tnum absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow px-1 text-[0.7rem] font-bold text-ink">
          {itemCount}
        </span>
      )}
    </button>
  );
}
