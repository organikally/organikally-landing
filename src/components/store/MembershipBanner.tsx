import Link from 'next/link';
import { Truck, BadgePercent, Coins, ArrowRight } from 'lucide-react';

// Organikaly Club entry point on the store landing (MEMBERSHIP_CONTRACT §7). A calm
// forest-green banner in the Ojasya language that links to /store/membership. Static
// (server) — the live plan numbers live on the membership page itself.
const perks = [
  { icon: Truck, label: 'Free delivery, every order' },
  { icon: BadgePercent, label: 'Everyday member savings' },
  { icon: Coins, label: 'Coins that earn faster' },
];

export default function MembershipBanner() {
  return (
    <section className="mt-14 md:mt-20">
      <Link
        href="/store/membership/"
        className="group block overflow-hidden rounded-card bg-forest text-cream shadow-lg ring-1 ring-forest-deep transition hover:shadow-panel"
      >
        <div className="h-2 w-full bg-yellow" aria-hidden="true" />
        <div className="flex flex-col gap-6 p-7 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow">Membership</p>
            <h2 className="mt-3 font-heading text-2xl font-extrabold uppercase leading-tight tracking-[-0.01em] md:text-3xl">
              Join Organikaly Club
            </h2>
            <p className="mt-3 text-cream/85">
              One membership for the way you already shop. Free delivery, everyday member
              savings, and Organikaly Coins that go further.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
              {perks.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.label} className="flex items-center gap-2 text-sm text-cream/90">
                    <Icon className="h-4 w-4 text-yellow" strokeWidth={1.9} aria-hidden="true" />
                    {p.label}
                  </li>
                );
              })}
            </ul>
          </div>
          <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-yellow px-7 py-3.5 font-semibold text-ink transition group-hover:bg-yellow-deep">
            See the benefits
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </section>
  );
}
