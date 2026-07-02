'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, Trash2, Package, LogOut, BadgeCheck } from 'lucide-react';
import { useAuth } from '@/lib/store/auth-context';
import { storeApi, ApiError } from '@/lib/store/client';
import type { Address } from '@/lib/store/types';

const FIELD =
  'w-full rounded-chip border border-line bg-paper px-3.5 py-2.5 text-ink outline-none transition focus:border-yellow-deep';

type AddressTextField = 'name' | 'phone' | 'line1' | 'line2' | 'city' | 'state' | 'pincode';

const EMPTY: Address = { name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '' };

export default function AccountView() {
  const { customer, setCustomer, refresh, logout } = useAuth();
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Address>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!customer) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-ink-faint" />
      </div>
    );
  }

  const addresses = customer.addresses ?? [];
  const setField = (k: AddressTextField, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const addAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const updated = await storeApi.addAddress(form);
      setCustomer(updated);
      setForm(EMPTY);
      setAdding(false);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save address.');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id?: string) => {
    if (!id) return;
    try {
      setCustomer(await storeApi.deleteAddress(id));
    } catch {
      /* ignore */
    }
  };

  const makeDefault = async (id?: string) => {
    if (!id) return;
    try {
      setCustomer(await storeApi.updateAddress(id, { is_default: true }));
    } catch {
      /* ignore */
    }
  };

  const doLogout = async () => {
    await logout();
    router.replace('/store/');
  };

  return (
    <div className="mx-auto max-w-container px-5 pb-24 pt-8 md:px-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="t-headline font-semibold text-ink">Hi, {customer.name.split(' ')[0]}</h1>
          <p className="mt-1 flex items-center gap-2 text-ink-muted">
            {customer.email}
            {customer.email_verified && (
              <span className="inline-flex items-center gap-1 text-sm text-[#1B5E20]">
                <BadgeCheck className="h-4 w-4" /> verified
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={doLogout}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-surface"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      <Link
        href="/store/orders/"
        className="mt-8 flex items-center justify-between rounded-card border border-line bg-surface p-5 transition hover:border-ink/25"
      >
        <span className="flex items-center gap-3 font-semibold text-ink">
          <Package className="h-5 w-5 text-yellow-deep" /> Your orders
        </span>
        <span className="text-sm text-ink-faint">View order history →</span>
      </Link>

      {/* Saved addresses */}
      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="t-subtitle font-semibold text-ink">Saved addresses</h2>
          {!adding && (
            <button
              type="button"
              onClick={() => setAdding(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-surface"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          )}
        </div>

        {addresses.length === 0 && !adding && (
          <p className="mt-4 text-ink-muted">No saved addresses yet.</p>
        )}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {addresses.map((a) => (
            <div key={a.id} className="rounded-card border border-line p-5">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-ink">
                  {a.name}
                  {a.is_default && (
                    <span className="ml-2 rounded-chip bg-yellow/15 px-2 py-0.5 text-xs font-semibold text-yellow-ink">
                      Default
                    </span>
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => remove(a.id)}
                  aria-label="Delete address"
                  className="rounded-full p-1 text-ink-faint transition hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                {a.line1}
                {a.line2 ? `, ${a.line2}` : ''}, {a.city}, {a.state} — {a.pincode}
              </p>
              <p className="text-sm text-ink-faint">{a.phone}</p>
              {!a.is_default && (
                <button
                  type="button"
                  onClick={() => makeDefault(a.id)}
                  className="mt-3 text-sm font-semibold text-yellow-ink hover:text-ink"
                >
                  Make default
                </button>
              )}
            </div>
          ))}
        </div>

        {adding && (
          <form onSubmit={addAddress} className="mt-5 grid grid-cols-1 gap-3 rounded-card border border-line bg-surface p-5 sm:grid-cols-2">
            <input placeholder="Full name" value={form.name} onChange={(e) => setField('name', e.target.value)} className={FIELD} required />
            <input placeholder="Phone" value={form.phone} onChange={(e) => setField('phone', e.target.value)} className={FIELD} required />
            <input placeholder="Address line 1" value={form.line1} onChange={(e) => setField('line1', e.target.value)} className={`${FIELD} sm:col-span-2`} required />
            <input placeholder="Address line 2 (optional)" value={form.line2 ?? ''} onChange={(e) => setField('line2', e.target.value)} className={`${FIELD} sm:col-span-2`} />
            <input placeholder="City" value={form.city} onChange={(e) => setField('city', e.target.value)} className={FIELD} required />
            <input placeholder="State" value={form.state} onChange={(e) => setField('state', e.target.value)} className={FIELD} required />
            <input
              placeholder="Pincode"
              inputMode="numeric"
              maxLength={6}
              value={form.pincode}
              onChange={(e) => setField('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
              className={FIELD}
              required
            />
            {error && <p className="text-sm text-red-700 sm:col-span-2">{error}</p>}
            <div className="flex gap-3 sm:col-span-2">
              <button
                type="submit"
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-full bg-yellow px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-yellow-deep disabled:opacity-60"
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                Save address
              </button>
              <button
                type="button"
                onClick={() => {
                  setAdding(false);
                  setForm(EMPTY);
                  setError(null);
                }}
                className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-paper"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
