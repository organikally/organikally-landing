import type { Metadata } from 'next';
import { Check, X, Truck, BadgePercent, Coins, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import MembershipView from '@/components/store/membership/MembershipView';
import MembershipFaq, { type MembershipFaqItem } from '@/components/store/membership/MembershipFaq';
import { getMembershipPlan } from '@/lib/store/api';
import { storeBreadcrumbSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

// Organikaly Club membership (MEMBERSHIP_CONTRACT §7), rendered in the Ojasya
// forest-green/cream language. Every number (price, member savings, coin multiplier,
// welcome coins, validity) is read from the admin-driven plan via getMembershipPlan(),
// which falls back to the seeded default only if the backend is unreachable. Copy is
// membership-only — no health or nutrition claims (FSSAI-safe). This page ships behind
// the landing-only lockdown (middleware.ts), same as the rest of /store.
export const revalidate = 300;

export function generateMetadata(): Metadata {
  return {
    title: 'Organikaly Club',
    description:
      'Join Organikaly Club for free delivery on every order, everyday member savings, and Organikaly Coins that earn faster and redeem at full value.',
    alternates: { canonical: '/store/membership/' },
    openGraph: {
      type: 'website',
      title: 'Organikaly Club · Membership',
      description:
        'Free delivery, member savings and Organikaly Coins that go further. One annual membership.',
      url: `${SITE_URL}/store/membership/`,
      images: [{ url: '/hero/poster.jpg', width: 1280, height: 720, alt: 'Organikaly Club' }],
    },
  };
}

/** "2x" from 200, "1.5x" from 150 — reads the multiplier as a clean label. */
function multLabel(pct: number): string {
  const x = pct / 100;
  return `${x % 1 === 0 ? x.toString() : x.toFixed(1)}x`;
}

type BenefitCard = { icon: LucideIcon; title: string; body: string };
type CompareRow = { label: string; free: string | boolean; member: string | boolean };

export default async function MembershipPage() {
  const plan = await getMembershipPlan();

  const pct = plan.member_discount_pct;
  const earn = multLabel(plan.member_earn_multiplier_pct);
  const welcome = plan.welcome_coins;
  const nonMemberRedeem = plan.non_member_redeem_pct;
  const months = Math.max(1, Math.round(plan.duration_days / 30));
  const priceLabel = `₹${Math.round(plan.price_paise / 100).toLocaleString('en-IN')}`;

  const benefits: BenefitCard[] = [
    {
      icon: Truck,
      title: 'Free delivery',
      body: 'Every order ships free, with no minimum basket. The delivery fee simply falls away.',
    },
    {
      icon: BadgePercent,
      title: `Up to ${pct}% member savings`,
      body: 'Member pricing is applied for you across eligible products, every single day.',
    },
    {
      icon: Coins,
      title: 'Coins that go further',
      body: `Earn Organikaly Coins ${earn} faster as a member and redeem them at full value on future orders.`,
    },
    {
      icon: Sparkles,
      title: 'More, and first',
      body: 'Early access to launches and sales, member-only pack sizes, plus seasonal gifts and a birthday treat.',
    },
  ];

  const compareRows: CompareRow[] = [
    { label: 'Delivery fee', free: 'Flat fee under threshold', member: 'Free, every order' },
    { label: 'Everyday member savings', free: false, member: `Up to ${pct}% off` },
    { label: 'Organikaly Coins earn rate', free: '1x coins', member: `${earn} coins` },
    { label: 'Coin redeem value', free: `${nonMemberRedeem}% of value`, member: 'Full value' },
    { label: 'Welcome coins on joining', free: false, member: `${welcome} coins` },
    { label: 'Early access to new launches', free: false, member: true },
    { label: 'Early access to sales', free: false, member: true },
    { label: 'Member-only pack sizes', free: false, member: true },
    { label: 'Seasonal gifts', free: false, member: true },
    { label: 'Birthday treat', free: false, member: true },
    { label: 'Members-only offers', free: false, member: true },
    { label: 'Support', free: 'Standard support', member: 'Priority support' },
    { label: 'Price', free: 'Free to browse', member: `${priceLabel} / ${months} months` },
  ];

  const steps = [
    {
      n: '01',
      title: 'Join and activate',
      body: 'Become a member in about a minute. Pay securely with Razorpay and your benefits switch on right away.',
    },
    {
      n: '02',
      title: 'Shop and earn',
      body: `Every order ships free and earns Organikaly Coins ${earn} faster, with member savings already applied.`,
    },
    {
      n: '03',
      title: 'Unlock more',
      body: 'Redeem coins at full value, get early access to launches and sales, and enjoy seasonal member gifts.',
    },
  ];

  const faqs: MembershipFaqItem[] = [
    {
      q: 'What is Organikaly Club?',
      a: `Organikaly Club is our annual membership. For ${priceLabel} a year you get free delivery on every order, everyday member savings, and Organikaly Coins that earn faster and redeem at full value.`,
    },
    {
      q: 'Why should I join Organikaly Club?',
      a: `If you shop with us regularly, the membership pays for itself. Free delivery on every order, up to ${pct}% member savings, ${earn} coins and member-only perks add up quickly across a year of pantry refills.`,
    },
    {
      q: 'How do I get my member benefits?',
      a: 'Once you join, your benefits switch on straight away. Free delivery and member pricing are applied automatically at checkout, and your coins are credited to your wallet as you shop.',
    },
    {
      q: 'What are the benefits of Organikaly Club?',
      a: `Free delivery on every order, up to ${pct}% everyday savings, Organikaly Coins earned ${earn} faster and redeemable at full value, ${welcome} welcome coins on joining, early access to launches and sales, member-only pack sizes, plus seasonal gifts and a birthday treat.`,
    },
    {
      q: 'Can I upgrade my membership?',
      a: 'There is a single Organikaly Club plan at launch, so there is nothing to upgrade today. As we add new tiers we will let members know, and you will be able to move up from your account.',
    },
    {
      q: 'How long is the membership valid?',
      a: `Your membership is valid for ${plan.duration_days} days (about ${months} months) from the day it activates. The renewal date is shown in your membership card once you join.`,
    },
    {
      q: 'Does the membership auto-renew?',
      a: 'No. We do not store your card or set up auto-renew at launch, so you will never be charged again without choosing to renew yourself.',
    },
    {
      q: 'What payment methods can I use?',
      a: 'Payment is handled securely by Razorpay, so you can pay by UPI, cards, net banking and the usual wallets. We never see or store your card details.',
    },
    {
      q: 'Which products are eligible for member benefits?',
      a: 'Free delivery and coin earning apply to your whole order. Member savings apply across eligible products in the catalogue, and the member price is shown to you at checkout.',
    },
    {
      q: 'What if I have an issue with my membership?',
      a: 'Reach out to our support team from your account and we will sort it out. Members get priority support, so we aim to get back to you quickly.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes. You can turn off renewal at any time, and your membership stays active with all its benefits until the end of the period you have already paid for.',
    },
  ];

  return (
    <>
      <JsonLd
        data={storeBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Shop', path: '/store/' },
          { name: 'Organikaly Club', path: '/store/membership/' },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-cream">
        <div className="mx-auto grid max-w-container items-center gap-10 px-5 py-14 md:px-10 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-rust">
                Membership
              </p>
              <h1 className="mt-3 font-heading text-[clamp(2rem,5vw,3.6rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] text-forest">
                Organikaly Club
              </h1>
              <p className="mt-5 max-w-measure text-lg text-ink-muted">
                One membership for the way you already shop. Free delivery on every order,
                everyday member savings, and Organikaly Coins that earn faster and redeem
                at full value.
              </p>
            </Reveal>
            <Reveal delay={90}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#join"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow px-7 py-3.5 font-semibold text-ink transition hover:bg-yellow-deep"
                >
                  Join Organikaly Club
                </a>
                <a
                  href="#how"
                  className="inline-flex items-center justify-center rounded-full border border-forest/25 px-7 py-3.5 font-semibold text-forest transition hover:bg-forest/5"
                >
                  How it works
                </a>
              </div>
              <p className="mt-4 text-sm text-ink-faint">
                {priceLabel} for {months} months. Cancel renewal anytime.
              </p>
            </Reveal>
          </div>

          {/* The one stateful card: pricing + join, or the active-member panel. */}
          <div id="join" className="scroll-mt-36">
            <Reveal direction="right">
              <MembershipView plan={plan} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Benefit cards */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-container px-5 md:px-10">
          <SectionTitle eyebrow="Member benefits">Everything that comes with it</SectionTitle>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.title} delay={i * 70}>
                  <div className="flex h-full flex-col rounded-card border border-forest/12 bg-cream p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow/20">
                      <Icon className="h-5 w-5 text-forest" strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-heading text-base font-extrabold uppercase leading-tight tracking-[-0.01em] text-forest">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{b.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <SectionTitle eyebrow="The difference">Without membership vs Organikaly Club</SectionTitle>
          <Reveal>
            <div className="mt-12 overflow-hidden rounded-card border border-forest/15 bg-paper shadow-sm">
              <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-forest/15 bg-forest text-cream">
                <div className="px-4 py-4 text-xs font-bold uppercase tracking-[0.12em] md:px-6">
                  Benefit
                </div>
                <div className="px-2 py-4 text-center text-xs font-bold uppercase tracking-[0.12em] text-cream/75 md:px-4">
                  Without
                </div>
                <div className="px-2 py-4 text-center text-xs font-bold uppercase tracking-[0.12em] text-yellow md:px-4">
                  The Club
                </div>
              </div>
              <div className="divide-y divide-forest/10">
                {compareRows.map((row) => (
                  <div key={row.label} className="grid grid-cols-[1.4fr_1fr_1fr] items-center">
                    <div className="px-4 py-4 text-sm font-medium text-ink md:px-6">{row.label}</div>
                    <div className="px-2 py-4 text-center text-sm text-ink-muted md:px-4">
                      <CompareCell value={row.free} tone="muted" />
                    </div>
                    <div className="bg-yellow/[0.06] px-2 py-4 text-center text-sm font-semibold text-forest md:px-4">
                      <CompareCell value={row.member} tone="member" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-28 bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-container px-5 md:px-10">
          <SectionTitle eyebrow="How it works">Three steps to more</SectionTitle>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="flex h-full flex-col rounded-card border border-forest/12 bg-cream p-7">
                  <span className="font-display text-4xl font-semibold text-yellow-deep">{s.n}</span>
                  <h3 className="mt-4 font-heading text-lg font-extrabold uppercase leading-tight tracking-[-0.01em] text-forest">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <SectionTitle eyebrow="Good to know">Organikaly Club questions</SectionTitle>
          <MembershipFaq items={faqs} />
        </div>
      </section>
    </>
  );
}

function CompareCell({ value, tone }: { value: string | boolean; tone: 'muted' | 'member' }) {
  if (value === true) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow/25">
        <Check className="h-4 w-4 text-yellow-deep" strokeWidth={2.6} aria-hidden="true" />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink/5">
        <X className="h-4 w-4 text-ink-faint" strokeWidth={2} aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return <span className={tone === 'member' ? 'text-forest' : 'text-ink-muted'}>{value}</span>;
}
