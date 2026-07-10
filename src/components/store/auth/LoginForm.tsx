'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/store/auth-context';
import { ApiError } from '@/lib/store/client';

const FIELD =
  'w-full rounded-chip border border-line bg-paper px-4 py-2.5 text-ink outline-none transition focus:border-yellow-deep';

export default function LoginForm() {
  const { login, isAuthed, ready } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/store/account/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already signed in, skip the form.
  useEffect(() => {
    if (ready && isAuthed) router.replace(next);
  }, [ready, isAuthed, router, next]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(email.trim(), password);
      router.replace(next);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not sign in. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-5 py-16 md:py-24">
      <h1 className="t-title font-semibold text-ink">Welcome back</h1>
      <p className="mt-2 text-ink-muted">Sign in to check out and track your orders.</p>

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
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-ink">
              Password
            </label>
            <Link href="/store/forgot-password/" className="text-sm text-yellow-ink hover:text-ink">
              Forgot?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={FIELD}
          />
        </div>

        {error && (
          <p className="rounded-chip bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-yellow px-6 py-3.5 font-semibold text-ink transition hover:bg-yellow-deep disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-muted">
        New to Organikaly?{' '}
        <Link
          href={`/store/signup/?next=${encodeURIComponent(next)}`}
          className="font-semibold text-yellow-ink hover:text-ink"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
