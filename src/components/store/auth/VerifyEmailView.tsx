'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import { storeApi, ApiError } from '@/lib/store/client';

export default function VerifyEmailView() {
  const params = useSearchParams();
  const token = params.get('token') ?? '';
  const [state, setState] = useState<'verifying' | 'done' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let cancelled = false;
    if (!token) {
      setState('error');
      setMessage('This link is missing its verification token.');
      return;
    }
    storeApi
      .verifyEmail(token)
      .then(() => {
        if (!cancelled) setState('done');
      })
      .catch((e) => {
        if (cancelled) return;
        setState('error');
        setMessage(e instanceof ApiError ? e.message : 'This link is invalid or expired.');
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="mx-auto max-w-md px-5 py-24 text-center">
      {state === 'verifying' && (
        <>
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-ink-faint" />
          <p className="mt-4 text-ink-muted">Verifying your email…</p>
        </>
      )}
      {state === 'done' && (
        <>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1B5E20]/12 text-[#1B5E20]">
            <Check className="h-6 w-6" />
          </div>
          <h1 className="t-title mt-5 font-semibold text-ink">Email verified</h1>
          <p className="mt-3 text-ink-muted">Thanks — your email address is confirmed.</p>
          <Link href="/store/account/" className="mt-6 inline-block font-semibold text-yellow-ink hover:text-ink">
            Go to your account
          </Link>
        </>
      )}
      {state === 'error' && (
        <>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-700">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h1 className="t-title mt-5 font-semibold text-ink">Couldn&apos;t verify</h1>
          <p className="mt-3 text-ink-muted">{message}</p>
          <Link href="/store/" className="mt-6 inline-block font-semibold text-yellow-ink hover:text-ink">
            Back to the shop
          </Link>
        </>
      )}
    </div>
  );
}
