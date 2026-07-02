'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, Check } from 'lucide-react';
import { storeApi } from '@/lib/store/client';

const FIELD =
  'w-full rounded-chip border border-line bg-paper px-4 py-2.5 text-ink outline-none transition focus:border-yellow-deep';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      // §5.1: always 200 (no account enumeration), regardless of whether the email exists.
      await storeApi.forgotPassword(email.trim());
    } catch {
      /* swallow — anti-enumeration */
    } finally {
      setBusy(false);
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-md px-5 py-20 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow/15 text-yellow-ink">
          <Check className="h-6 w-6" />
        </div>
        <h1 className="t-title mt-5 font-semibold text-ink">Check your email</h1>
        <p className="mt-3 text-ink-muted">
          If an account exists for that email, we&apos;ve sent a link to reset your password.
        </p>
        <Link href="/store/login/" className="mt-6 inline-block font-semibold text-yellow-ink hover:text-ink">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-5 py-16 md:py-24">
      <h1 className="t-title font-semibold text-ink">Reset your password</h1>
      <p className="mt-2 text-ink-muted">
        Enter your email and we&apos;ll send you a link to set a new password.
      </p>
      <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={FIELD}
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-yellow px-6 py-3.5 font-semibold text-ink transition hover:bg-yellow-deep disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Send reset link
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-ink-muted">
        <Link href="/store/login/" className="font-semibold text-yellow-ink hover:text-ink">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
