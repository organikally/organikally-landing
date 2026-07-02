'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '@/lib/store/cart-context';
import { useAuth } from '@/lib/store/auth-context';
import { storeApi, ApiError, newIdempotencyKey } from '@/lib/store/client';
import { loadRazorpay, openRazorpay } from '@/lib/store/razorpay';
import { formatPaise } from '@/lib/format';
import type { Address, ShippingQuote } from '@/lib/store/types';

const FIELD =
  'w-full rounded-chip border border-line bg-paper px-3.5 py-2.5 text-ink outline-none transition focus:border-yellow-deep';

type AddressTextField = 'name' | 'phone' | 'line1' | 'line2' | 'city' | 'state' | 'pincode';

const EMPTY_ADDRESS: Address = {
  name: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  pincode: '',
};

// Brand yellow for the Razorpay modal theme (matches --yellow token).
const THEME_COLOR = '#F0B61A';

export default function CheckoutView() {
  const { items, itemCount, subtotalPaise, couponCode, couponDiscountPaise, refresh, clearLocal } =
    useCart();
  const { customer, setCustomer } = useAuth();
  const router = useRouter();

  const addresses = useMemo(() => customer?.addresses ?? [], [customer]);
  const [selectedId, setSelectedId] = useState<string>(
    () => customer?.default_address_id || addresses[0]?.id || '',
  );
  const [form, setForm] = useState<Address>(EMPTY_ADDRESS);
  const [saveAddress, setSaveAddress] = useState(true);
  const usingNew = selectedId === '' || addresses.length === 0;

  const [quote, setQuote] = useState<ShippingQuote | null>(null);
  const [quoting, setQuoting] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pincode = useMemo(() => {
    if (usingNew) return form.pincode.trim();
    return addresses.find((a) => a.id === selectedId)?.pincode ?? '';
  }, [usingNew, form.pincode, addresses, selectedId]);

  // Live serviceability + shipping quote whenever the pincode (or coupon/subtotal) changes.
  useEffect(() => {
    if (pincode.length < 6 || subtotalPaise <= 0) {
      setQuote(null);
      return;
    }
    let cancelled = false;
    setQuoting(true);
    storeApi
      .shippingQuote({
        pincode,
        subtotal_paise: subtotalPaise,
        coupon_code: couponCode ?? undefined,
      })
      .then((q) => {
        if (!cancelled) setQuote(q);
      })
      .catch(() => {
        if (!cancelled) setQuote(null);
      })
      .finally(() => {
        if (!cancelled) setQuoting(false);
      });
    return () => {
      cancelled = true;
    };
  }, [pincode, subtotalPaise, couponCode]);

  const shippingFeePaise = quote?.shipping_fee_paise ?? null;
  const displayTotalPaise =
    subtotalPaise - couponDiscountPaise + (shippingFeePaise ?? 0);
  const serviceable = quote ? quote.serviceable : null;
  const hasOOS = items.some((l) => !l.in_stock);

  const setField = (k: AddressTextField, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validNewAddress =
    form.name && form.phone && form.line1 && form.city && form.state && form.pincode.length === 6;

  const canPay =
    items.length > 0 &&
    !hasOOS &&
    serviceable === true &&
    (usingNew ? validNewAddress : !!selectedId);

  const placeOrder = async () => {
    setError(null);
    if (!canPay) return;
    setPlacing(true);
    try {
      // Optionally persist a new address to the account first.
      let addressId = usingNew ? undefined : selectedId;
      let shippingAddress: Address | undefined = usingNew ? form : undefined;
      if (usingNew && saveAddress) {
        try {
          const updated = await storeApi.addAddress(form);
          setCustomer(updated);
          const saved = updated.addresses[updated.addresses.length - 1];
          if (saved?.id) {
            addressId = saved.id;
            shippingAddress = undefined;
          }
        } catch {
          // Non-fatal — fall back to an inline shipping address.
        }
      }

      const ok = await loadRazorpay();
      if (!ok) {
        setError('Could not load the payment gateway. Please retry.');
        setPlacing(false);
        return;
      }

      // Idempotency-Key required (§5.5); a fresh key per attempt.
      const res = await storeApi.checkout(
        {
          address_id: addressId,
          shipping_address: shippingAddress,
          coupon_code: couponCode ?? undefined,
        },
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
          // Fast-path verify (UX only); the webhook is the source of truth (§5.5).
          storeApi
            .verifyPayment({
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_order_id: resp.razorpay_order_id,
              razorpay_signature: resp.razorpay_signature,
            })
            .catch(() => {
              /* ignore — confirmation page polls the authoritative status */
            })
            .finally(() => {
              clearLocal();
              void refresh();
              router.push(`/store/order/${res.store_order.code}/`);
            });
        },
        modal: {
          ondismiss: () => setPlacing(false),
        },
      });

      if (!opened) {
        setError('Could not open checkout. Please retry.');
        setPlacing(false);
      }
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Checkout failed. No payment was taken — please try again.',
      );
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-container px-5 py-24 text-center md:px-10">
        <h1 className="t-title font-semibold text-ink">Your cart is empty</h1>
        <p className="mt-2 text-ink-muted">Add something before checking out.</p>
        <Link
          href="/store/"
          className="mt-8 inline-flex rounded-full bg-yellow px-7 py-3.5 font-semibold text-ink transition hover:bg-yellow-deep"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-container px-5 pb-24 pt-8 md:px-10">
      <Link href="/store/cart/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-yellow-ink hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Back to cart
      </Link>
      <h1 className="t-headline mt-5 font-semibold text-ink">Checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        {/* Address + shipping */}
        <div>
          <h2 className="t-subtitle font-semibold text-ink">Delivery address</h2>

          {addresses.length > 0 && (
            <div className="mt-4 space-y-3">
              {addresses.map((a) => (
                <label
                  key={a.id}
                  className={`flex cursor-pointer gap-3 rounded-card border p-4 transition ${
                    selectedId === a.id ? 'border-ink bg-surface' : 'border-line hover:border-ink/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    checked={selectedId === a.id}
                    onChange={() => setSelectedId(a.id ?? '')}
                    className="mt-1 h-4 w-4 accent-[#1B5E20]"
                  />
                  <span className="text-sm">
                    <span className="font-semibold text-ink">{a.name}</span>
                    {a.label && <span className="ml-2 text-ink-faint">({a.label})</span>}
                    <span className="mt-0.5 block text-ink-muted">
                      {a.line1}
                      {a.line2 ? `, ${a.line2}` : ''}, {a.city}, {a.state} — {a.pincode}
                    </span>
                    <span className="block text-ink-faint">{a.phone}</span>
                  </span>
                </label>
              ))}
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-card border p-4 transition ${
                  usingNew ? 'border-ink bg-surface' : 'border-line hover:border-ink/30'
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  checked={usingNew}
                  onChange={() => setSelectedId('')}
                  className="h-4 w-4 accent-[#1B5E20]"
                />
                <span className="text-sm font-semibold text-ink">Use a new address</span>
              </label>
            </div>
          )}

          {usingNew && (
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                placeholder="Full name"
                aria-label="Full name"
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                className={FIELD}
              />
              <input
                placeholder="Phone"
                aria-label="Phone"
                value={form.phone}
                onChange={(e) => setField('phone', e.target.value)}
                className={FIELD}
              />
              <input
                placeholder="Address line 1"
                aria-label="Address line 1"
                value={form.line1}
                onChange={(e) => setField('line1', e.target.value)}
                className={`${FIELD} sm:col-span-2`}
              />
              <input
                placeholder="Address line 2 (optional)"
                aria-label="Address line 2"
                value={form.line2 ?? ''}
                onChange={(e) => setField('line2', e.target.value)}
                className={`${FIELD} sm:col-span-2`}
              />
              <input
                placeholder="City"
                aria-label="City"
                value={form.city}
                onChange={(e) => setField('city', e.target.value)}
                className={FIELD}
              />
              <input
                placeholder="State"
                aria-label="State"
                value={form.state}
                onChange={(e) => setField('state', e.target.value)}
                className={FIELD}
              />
              <input
                placeholder="Pincode"
                aria-label="Pincode"
                inputMode="numeric"
                maxLength={6}
                value={form.pincode}
                onChange={(e) => setField('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                className={FIELD}
              />
              <label className="flex items-center gap-2 text-sm text-ink-muted sm:col-span-2">
                <input
                  type="checkbox"
                  checked={saveAddress}
                  onChange={(e) => setSaveAddress(e.target.checked)}
                  className="h-4 w-4 accent-[#1B5E20]"
                />
                Save this address to my account
              </label>
            </div>
          )}

          {/* Serviceability feedback */}
          {pincode.length === 6 && (
            <div className="mt-4 text-sm">
              {quoting ? (
                <span className="inline-flex items-center gap-2 text-ink-faint">
                  <Loader2 className="h-4 w-4 animate-spin" /> Checking serviceability…
                </span>
              ) : serviceable === true ? (
                <span className="inline-flex items-center gap-2 text-[#1B5E20]">
                  <CheckCircle2 className="h-4 w-4" /> We deliver to {pincode}.
                </span>
              ) : serviceable === false ? (
                <span className="inline-flex items-center gap-2 text-red-700">
                  <AlertCircle className="h-4 w-4" /> Sorry, we don&apos;t deliver to {pincode} yet.
                </span>
              ) : null}
            </div>
          )}
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-card border border-line bg-surface p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-xl text-ink">Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((l) => (
              <li key={l.store_product_id} className="flex justify-between gap-3">
                <span className="text-ink-muted">
                  {l.name} <span className="text-ink-faint">× {l.qty}</span>
                </span>
                <span className="tnum text-ink">{formatPaise(l.line_total_paise)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-muted">Subtotal ({itemCount})</span>
              <span className="tnum text-ink">{formatPaise(subtotalPaise)}</span>
            </div>
            {couponDiscountPaise > 0 && (
              <div className="flex justify-between text-yellow-ink">
                <span>Discount {couponCode ? `(${couponCode})` : ''}</span>
                <span className="tnum">−{formatPaise(couponDiscountPaise)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-ink-muted">Shipping</span>
              <span className="tnum text-ink">
                {shippingFeePaise == null
                  ? '—'
                  : shippingFeePaise === 0
                    ? 'Free'
                    : formatPaise(shippingFeePaise)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <span className="font-semibold text-ink">Total</span>
            <span className="tnum text-xl font-semibold text-ink">
              {shippingFeePaise == null ? '—' : formatPaise(displayTotalPaise)}
            </span>
          </div>
          <p className="mt-1 text-xs text-ink-faint">
            Final amount is confirmed by the server before payment.
          </p>

          {error && (
            <p className="mt-4 rounded-chip bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={placeOrder}
            disabled={!canPay || placing}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-yellow px-6 py-3.5 font-semibold text-ink transition hover:bg-yellow-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            {placing && <Loader2 className="h-4 w-4 animate-spin" />}
            Pay securely
          </button>
          <p className="mt-3 text-center text-xs text-ink-faint">
            Payments are processed securely by Razorpay.
          </p>
        </aside>
      </div>
    </div>
  );
}
