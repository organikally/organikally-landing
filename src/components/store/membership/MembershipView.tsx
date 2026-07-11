'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, Coins, CalendarClock, ShieldCheck, Loader2 } from 'lucide-react';
import { storeApi } from '@/lib/store/client';
import type { MembershipPlan, MembershipView as MembershipViewData } from '@/lib/store/types';
import JoinClubButton from './JoinClubButton';

// The one stateful surface on /store/membership. The `plan` is server-fetched (so the
// price and benefits always render, even backend-down); on mount we refine with
// GET /store/membership to learn whether the caller is already a member. Members see
// their status, expiry, days remaining and Organikaly Coins balance; everyone else sees
// the pricing card + join button. All numbers are read from the admin-driven plan.

/** Integer-rupee display for the pricing card (₹1,200, never ₹1,200.00). */
function rupees(paise: number): string {
  return `₹${Math.round(paise / 100).toLocaleString('en-IN')}`;
}

function formatDay(iso?: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function ActiveMemberCard({ view }: { view: MembershipViewData }) {
  const m = view.membership;
  const coins = view.wallet?.balance_coins ?? 0;
  return (
    <div className="overflow-hidden rounded-card bg-forest text-cream shadow-lg ring-1 ring-forest-deep">
      <div className="h-2 w-full bg-yellow" aria-hidden="true" />
      <div className="p-7 md:p-8">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-yellow" strokeWidth={1.9} aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-yellow">
            Active membership
          </span>
        </div>
        <h2 className="mt-4 font-heading text-2xl font-extrabold uppercase leading-tight md:text-3xl">
          You are an Organikaly Club member
        </h2>
        <p className="mt-2 text-sm text-cream/80">
          Your benefits are switched on. Free delivery and member savings apply
          automatically at checkout.
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-media bg-cream/10 p-4">
            <dt className="flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-cream/70">
              <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" /> Renews
            </dt>
            <dd className="mt-1.5 text-sm font-semibold">{formatDay(m?.expires_at)}</dd>
          </div>
          <div className="rounded-media bg-cream/10 p-4">
            <dt className="text-xs uppercase tracking-[0.12em] text-cream/70">Days left</dt>
            <dd className="tnum mt-1.5 text-sm font-semibold">
              {m?.days_remaining != null ? m.days_remaining : '—'}
            </dd>
          </div>
          <div className="col-span-2 rounded-media bg-cream/10 p-4 sm:col-span-1">
            <dt className="flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-cream/70">
              <Coins className="h-3.5 w-3.5" aria-hidden="true" /> Coin balance
            </dt>
            <dd className="tnum mt-1.5 text-sm font-semibold">
              {coins.toLocaleString('en-IN')} coins
            </dd>
          </div>
        </dl>

        <Link
          href="/store/"
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-yellow px-7 py-3.5 font-semibold text-ink transition hover:bg-yellow-deep"
        >
          Shop with your benefits
        </Link>
      </div>
    </div>
  );
}

function PricingCard({ plan, onJoined }: { plan: MembershipPlan; onJoined: () => void }) {
  const months = Math.max(1, Math.round(plan.duration_days / 30));
  const monthly = Math.round(plan.price_paise / 100 / months);
  const perks = plan.benefits.length
    ? plan.benefits
    : ['Free delivery on every order', 'Member savings, every day', 'Earn and redeem Organikaly Coins'];

  return (
    <div className="overflow-hidden rounded-card border border-forest/15 bg-paper shadow-lg ring-1 ring-forest/10">
      <div className="h-2 w-full bg-yellow" aria-hidden="true" />
      <div className="p-7 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-rust">
          Annual membership
        </p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-5xl font-semibold text-forest">
            {rupees(plan.price_paise)}
          </span>
          <span className="text-ink-muted">/ {months} months</span>
        </div>
        <p className="mt-2 text-sm text-ink-muted">
          About {rupees(monthly * 100)} a month for free delivery, member savings and coins
          that earn faster.
        </p>

        <ul className="mt-6 space-y-3">
          {perks.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-ink">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow/20">
                <Check className="h-3.5 w-3.5 text-yellow-deep" strokeWidth={2.6} aria-hidden="true" />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7">
          <JoinClubButton planId={plan.id || undefined} onJoined={onJoined} />
        </div>
        <p className="mt-3 text-center text-xs text-ink-faint">
          Secure payment by Razorpay. No auto-renew is set up at launch, so it never
          charges you again without your say-so.
        </p>
      </div>
    </div>
  );
}

export default function MembershipView({ plan }: { plan: MembershipPlan }) {
  const [view, setView] = useState<MembershipViewData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    storeApi
      .getMembership()
      .then((v) => setView(v))
      .catch(() => setView(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // While the client refines membership state, keep the price visible immediately so
  // the section never flashes empty (the server-fetched plan is already in hand).
  if (loading && !view) {
    return (
      <div className="rounded-card border border-forest/15 bg-paper p-8 shadow-lg ring-1 ring-forest/10">
        <div className="h-2 w-full rounded-full bg-yellow/40" aria-hidden="true" />
        <div className="mt-6 flex items-center gap-2 text-sm text-ink-faint">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading your
          membership…
        </div>
      </div>
    );
  }

  if (view?.is_member) return <ActiveMemberCard view={view} />;
  return <PricingCard plan={plan} onJoined={load} />;
}
