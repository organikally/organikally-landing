'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Loader2, Check } from 'lucide-react';
import { storeApi, ApiError } from '@/lib/store/client';

const FIELD =
  'w-full rounded-chip border border-line bg-paper px-4 py-2.5 text-ink outline-none transition focus:border-yellow-deep';

function passwordOk(pw: string): boolean {
  if (pw.length < 8) return false;
  let c = 0;
  if (/[a-z]/.test(pw)) c++;
  if (/[A-Z]/.test(pw)) c++;
  if (/[0-9]/.test(pw)) c++;
  if (/[^a-zA-Z0-9]/.test(pw)) c++;
  return c >= 3;
}

export default function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get('token') ?? '';
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!passwordOk(pw)) {
      setError('Password must be at least 8 characters and mix upper, lower, number or symbol.');
      return;
    }
    setBusy(true);
    try {
      await storeApi.resetPassword(token, pw);
      setDone(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'This reset link is invalid or expired.');
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-md px-5 py-20 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1B5E20]/12 text-[#1B5E20]">
          <Check className="h-6 w-6" />
        </div>
        <h1 className="t-title mt-5 font-semibold text-ink">Password updated</h1>
        <p className="mt-3 text-ink-muted">You can now sign in with your new password.</p>
        <Link href="/store/login/" className="mt-6 inline-block font-semibold text-yellow-ink hover:text-ink">
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-5 py-16 md:py-24">
      <h1 className="t-title font-semibold text-ink">Set a new password</h1>
      {!token && (
        <p className="mt-3 rounded-chip bg-red-50 px-3 py-2 text-sm text-red-700">
          This link is missing its reset token. Please use the link from your email.
        </p>
      )}
      <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
        <div>
          <label htmlFor="pw" className="mb-1.5 block text-sm font-medium text-ink">
            New password
          </label>
          <input
            id="pw"
            type="password"
            autoComplete="new-password"
            required
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className={FIELD}
          />
          <p className="mt-1.5 text-xs text-ink-faint">
            At least 8 characters, mixing upper/lower case, a number or a symbol.
          </p>
        </div>
        {error && (
          <p className="rounded-chip bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy || !token}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-yellow px-6 py-3.5 font-semibold text-ink transition hover:bg-yellow-deep disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Update password
        </button>
      </form>
    </div>
  );
}
