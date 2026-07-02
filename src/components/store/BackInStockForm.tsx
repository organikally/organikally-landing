'use client';

import { useState } from 'react';
import { BellRing, Check } from 'lucide-react';
import { storeApi, ApiError } from '@/lib/store/client';

// Back-in-stock email capture for out-of-stock products (STORE_CONTRACT §5.7).
export default function BackInStockForm({
  productId,
  compact = false,
}: {
  productId: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState('sending');
    try {
      await storeApi.subscribeStockAlert(productId, email.trim());
      setState('done');
    } catch (err) {
      setState('error');
      setMessage(err instanceof ApiError ? err.message : 'Could not subscribe. Try again.');
    }
  };

  if (state === 'done') {
    return (
      <p className="flex items-center gap-2 rounded-chip bg-surface px-3 py-2 text-sm text-ink-muted">
        <Check className="h-4 w-4 text-yellow-deep" /> We&apos;ll email you when it&apos;s back.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className={compact ? 'flex flex-col gap-2' : 'flex flex-col gap-3'}>
      <label htmlFor={`bis-${productId}`} className="sr-only">
        Email for back-in-stock alert
      </label>
      <div className="flex gap-2">
        <input
          id={`bis-${productId}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email me when back"
          className="min-w-0 flex-1 rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink outline-none transition focus:border-yellow-deep"
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition hover:bg-ink/90 disabled:opacity-60"
        >
          <BellRing className="h-4 w-4" />
          {compact ? 'Notify' : 'Notify me'}
        </button>
      </div>
      {state === 'error' && <p className="text-xs text-red-700">{message}</p>}
    </form>
  );
}
