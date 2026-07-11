'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/store/auth-context';
import { storeApi, ApiError, newIdempotencyKey } from '@/lib/store/client';
import { loadRazorpay, openRazorpay } from '@/lib/store/razorpay';

// Join flow (MEMBERSHIP_CONTRACT §7). Guests are routed to sign in with a return to
// this page; members-to-be create a membership checkout, pay through Razorpay, then
// fast-path verify. The webhook is the source of truth for activation, so `onJoined`
// simply asks the parent to re-read GET /store/membership for the fresh state.

// Brand yellow for the Razorpay modal theme (matches --yellow), same as store checkout.
const THEME_COLOR = '#F0B61A';

export default function JoinClubButton({
  planId,
  label = 'Join Organikaly Club',
  className,
  onJoined,
}: {
  planId?: string;
  label?: string;
  className?: string;
  onJoined?: () => void;
}) {
  const { isAuthed, ready } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const join = async () => {
    setError(null);
    if (!ready) return;
    if (!isAuthed) {
      router.push('/store/login/?next=/store/membership/');
      return;
    }
    setBusy(true);
    try {
      const ok = await loadRazorpay();
      if (!ok) {
        setError('Could not load the payment gateway. Please retry.');
        setBusy(false);
        return;
      }

      // Idempotency-Key required (§7); a fresh key per attempt.
      const res = await storeApi.membershipCheckout(
        { plan_id: planId, auto_renew: false },
        newIdempotencyKey(),
      );

      const opened = openRazorpay({
        key: res.razorpay.key_id,
        amount: res.razorpay.amount,
        currency: res.razorpay.currency,
        order_id: res.razorpay.order_id,
        name: res.razorpay.name,
        description: res.razorpay.description,
        prefill: res.razorpay.prefill,
        theme: { color: THEME_COLOR },
        handler: (resp) => {
          // Fast-path verify (UX only); the webhook finalises activation (§7).
          storeApi
            .verifyMembership({
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_order_id: resp.razorpay_order_id,
              razorpay_signature: resp.razorpay_signature,
            })
            .catch(() => {
              /* ignore — the parent re-reads the authoritative membership state */
            })
            .finally(() => {
              setBusy(false);
              onJoined?.();
            });
        },
        modal: {
          ondismiss: () => setBusy(false),
        },
      });

      if (!opened) {
        setError('Could not open checkout. Please retry.');
        setBusy(false);
      }
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Could not start your membership. No payment was taken.',
      );
      setBusy(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={join}
        disabled={busy}
        className={
          className ??
          'inline-flex w-full items-center justify-center gap-2 rounded-full bg-yellow px-7 py-3.5 font-semibold text-ink transition hover:bg-yellow-deep disabled:cursor-not-allowed disabled:opacity-60'
        }
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {busy ? 'Opening secure checkout' : label}
      </button>
      {error && (
        <p className="mt-3 text-sm text-rust" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
