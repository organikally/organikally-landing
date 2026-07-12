'use client';

import { useState, type FormEvent } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { site } from '@/lib/site';

// A friendly, honest helper. It does NOT query a live database. It reads what the
// buyer typed, works out whether it looks like a press date or a batch code, and
// explains what that marker should tell them, then points them to us to confirm a
// specific pack. No fake lookups, no invented "verified" result.

type Guidance = { kind: 'date' | 'code' | 'unknown'; heading: string; body: string };

// Loose shape checks only, to tailor the explanation. Never a pass/fail verdict.
const looksLikeDate = (v: string) =>
  /\b(\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{2,4})\b/.test(v) ||
  /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(v);
const looksLikeCode = (v: string) => /[a-z]/i.test(v) && /\d/.test(v);

function readMarker(raw: string): Guidance {
  const v = raw.trim();
  if (looksLikeDate(v)) {
    return {
      kind: 'date',
      heading: 'That reads like a press date',
      body: 'The press date is the day this oil was actually pressed. The closer today is to it, the fresher the aroma. It should match the date printed on your pack, and sit within the last few months.',
    };
  }
  if (looksLikeCode(v)) {
    return {
      kind: 'code',
      heading: 'That reads like a batch code',
      body: 'A batch code ties your bottle to a single press run. It is how we trace one pack back to its pressing. Keep it handy if you ever write to us about this bottle.',
    };
  }
  return {
    kind: 'unknown',
    heading: 'Marker noted',
    body: 'Every pack carries a press date and a batch code. If what you entered is one of those, we can check it against our records for you.',
  };
}

const verifyMailto = (entered: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent('Verify a pack')}&body=${encodeURIComponent(
    `Hi Organikaly, I'd like to confirm a pack. The marker on my pack reads: ${entered}`,
  )}`;

export default function AuthenticityCheck() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<Guidance | null>(null);
  const [error, setError] = useState('');
  const [entered, setEntered] = useState('');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = value.trim();
    if (!v) {
      setError('Enter the batch code or press date printed on your pack.');
      setResult(null);
      return;
    }
    setError('');
    setEntered(v);
    setResult(readMarker(v));
  }

  return (
    <div className="rounded-card border border-forest/12 bg-paper p-6 shadow-sm md:p-8">
      <form onSubmit={onSubmit} noValidate>
        <label htmlFor="auth-marker" className="block font-heading text-base font-bold uppercase tracking-[-0.01em] text-forest">
          Check what your marker means
        </label>
        <p id="auth-help" className="mt-2 text-sm leading-relaxed text-ink-muted">
          Type the batch code or press date from your pack. This tells you what that marker should
          mean. It does not look up a live database, so to confirm a specific pack, write to us.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            id="auth-marker"
            type="text"
            inputMode="text"
            autoComplete="off"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-describedby="auth-help"
            aria-invalid={error ? true : undefined}
            placeholder="e.g. batch B2409 or 12 Sep 2026"
            className="min-h-11 flex-1 rounded-chip border border-line bg-paper px-4 text-ink placeholder:text-ink-faint focus:border-yellow-ink focus:outline-none focus:ring-2 focus:ring-yellow-ink/20"
          />
          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 font-semibold text-cream transition hover:bg-forest-deep active:scale-[.98]"
          >
            <Search className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            Explain my marker
          </button>
        </div>
      </form>

      <div aria-live="polite" className="mt-5">
        {error && <p className="text-sm font-medium text-rust">{error}</p>}
        {result && (
          <div className="rounded-chip border-l-4 border-yellow bg-surface p-5">
            <p className="font-heading text-sm font-bold uppercase tracking-[-0.01em] text-forest">
              {result.heading}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{result.body}</p>
            <a
              href={verifyMailto(entered)}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-forest-deep"
            >
              Confirm this pack with us
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
