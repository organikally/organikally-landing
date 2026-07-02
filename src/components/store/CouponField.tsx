'use client';

import { useState } from 'react';
import { Tag, X } from 'lucide-react';
import { useCart } from '@/lib/store/cart-context';
import { useAuth } from '@/lib/store/auth-context';
import { formatPaise } from '@/lib/format';

// Coupon entry (STORE_CONTRACT §5.3). Validation is server-side — the client only
// displays the server's `coupon_discount_paise`; it never computes the discount.
export default function CouponField() {
  const { couponCode, couponDiscountPaise, applyCoupon, removeCoupon, busy } = useCart();
  const { isAuthed } = useAuth();
  const [code, setCode] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  if (!isAuthed) {
    return (
      <p className="text-sm text-ink-faint">
        Sign in at checkout to apply a coupon code.
      </p>
    );
  }

  if (couponCode) {
    return (
      <div className="flex items-center justify-between rounded-chip border border-dashed border-yellow-deep/50 bg-yellow/10 px-3 py-2">
        <span className="flex items-center gap-2 text-sm font-semibold text-yellow-ink">
          <Tag className="h-4 w-4" />
          {couponCode}
          {couponDiscountPaise > 0 && <span>(−{formatPaise(couponDiscountPaise)})</span>}
        </span>
        <button
          type="button"
          onClick={() => removeCoupon()}
          aria-label="Remove coupon"
          className="rounded-full p-1 text-ink-muted transition hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLocalError(null);
    await applyCoupon(code);
    setCode('');
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Coupon code"
        aria-label="Coupon code"
        className="min-w-0 flex-1 rounded-chip border border-line bg-paper px-3 py-2 text-sm uppercase text-ink outline-none transition focus:border-yellow-deep"
      />
      <button
        type="submit"
        disabled={busy || !code.trim()}
        className="shrink-0 rounded-chip border border-ink/15 bg-paper px-4 py-2 text-sm font-semibold text-ink transition hover:bg-surface disabled:opacity-50"
      >
        Apply
      </button>
      {localError && <span className="sr-only">{localError}</span>}
    </form>
  );
}
