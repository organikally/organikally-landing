'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, Check } from 'lucide-react';
import { useAuth } from '@/lib/store/auth-context';
import { ApiError } from '@/lib/store/client';

const FIELD =
  'w-full rounded-chip border border-line bg-paper px-4 py-2.5 text-ink outline-none transition focus:border-yellow-deep';

// Mirrors the server policy (§8): ≥8 chars and ≥3 of {lower, upper, digit, symbol}.
function passwordOk(pw: string): boolean {
  if (pw.length < 8) return false;
  let classes = 0;
  if (/[a-z]/.test(pw)) classes++;
  if (/[A-Z]/.test(pw)) classes++;
  if (/[0-9]/.test(pw)) classes++;
  if (/[^a-zA-Z0-9]/.test(pw)) classes++;
  return classes >= 3;
}

export default function SignupForm() {
  const { signup, isAuthed, ready } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/store/account/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [optIn, setOptIn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (ready && isAuthed) router.replace(next);
  }, [ready, isAuthed, router, next]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!passwordOk(password)) {
      setError('Password must be at least 8 characters and mix upper, lower, number or symbol.');
      return;
    }
    setBusy(true);
    try {
      const res = await signup({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
        marketing_opt_in: optIn,
      });
      if (res.loggedIn) {
        router.replace(next);
      } else {
        // §5.1.1: anti-enumeration 202 — could be "check your email" or "account exists".
        setInfo(res.detail || 'Please check your email to continue.');
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not create your account.');
    } finally {
      setBusy(false);
    }
  };

  if (info) {
    return (
      <div className="mx-auto max-w-md px-5 py-20 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow/15 text-yellow-ink">
          <Check className="h-6 w-6" />
        </div>
        <h1 className="t-title mt-5 font-semibold text-ink">Check your email</h1>
        <p className="mt-3 text-ink-muted">{info}</p>
        <Link
          href={`/store/login/?next=${encodeURIComponent(next)}`}
          className="mt-6 inline-block font-semibold text-yellow-ink hover:text-ink"
        >
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-5 py-16 md:py-24">
      <h1 className="t-title font-semibold text-ink">Create your account</h1>
      <p className="mt-2 text-ink-muted">It only takes a moment, then you can check out.</p>

      <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            Full name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={FIELD}
          />
        </div>
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
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
            Phone <span className="text-ink-faint">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={FIELD}
          />
          <p className="mt-1.5 text-xs text-ink-faint">
            At least 8 characters, mixing upper/lower case, a number or a symbol.
          </p>
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-ink-muted">
          <input
            type="checkbox"
            checked={optIn}
            onChange={(e) => setOptIn(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#1B5E20]"
          />
          Send me occasional notes &amp; offers from Organikaly.
        </label>

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
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-muted">
        Already have an account?{' '}
        <Link
          href={`/store/login/?next=${encodeURIComponent(next)}`}
          className="font-semibold text-yellow-ink hover:text-ink"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
