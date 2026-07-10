'use client';

import { useEffect, useState } from 'react';
import { MapPin, CheckCircle2, XCircle } from 'lucide-react';
import { storeApi } from '@/lib/store/client';

const PINCODE_KEY = 'organikaly.pincode';

// PDP pincode check — answers "will it reach me?" before checkout does.
// Remembers the last pincode so every PDP shows the answer instantly.
export default function DeliveryCheck() {
  const [pincode, setPincode] = useState('');
  const [checked, setChecked] = useState<null | { pincode: string; ok: boolean }>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(PINCODE_KEY);
    if (saved && /^\d{6}$/.test(saved)) {
      setPincode(saved);
      void check(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const check = async (pin: string) => {
    if (!/^\d{6}$/.test(pin)) return;
    setBusy(true);
    try {
      const res = await storeApi.serviceability(pin);
      setChecked({ pincode: pin, ok: res.serviceable });
      window.localStorage.setItem(PINCODE_KEY, pin);
    } catch {
      setChecked(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-6 rounded-card border border-line bg-surface p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void check(pincode);
        }}
        className="flex items-center gap-2"
      >
        <MapPin className="h-4 w-4 shrink-0 text-forest" strokeWidth={1.8} />
        <label htmlFor="pdp-pincode" className="sr-only">
          Delivery pincode
        </label>
        <input
          id="pdp-pincode"
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter delivery pincode"
          className="tnum min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
        />
        <button
          type="submit"
          disabled={busy || pincode.length !== 6}
          className="shrink-0 rounded-full border border-ink/15 bg-paper px-4 py-1.5 text-sm font-semibold text-ink transition hover:border-ink/35 disabled:opacity-50"
        >
          {busy ? 'Checking…' : 'Check'}
        </button>
      </form>
      {checked && (
        <p
          className={`mt-2.5 flex items-center gap-1.5 text-sm ${
            checked.ok ? 'text-forest' : 'text-ink-muted'
          }`}
        >
          {checked.ok ? (
            <>
              <CheckCircle2 className="h-4 w-4" strokeWidth={1.8} />
              Delivers to {checked.pincode} — typically 2–7 business days.
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4" strokeWidth={1.8} />
              We can’t deliver to {checked.pincode} yet — we’re expanding steadily.
            </>
          )}
        </p>
      )}
    </div>
  );
}
