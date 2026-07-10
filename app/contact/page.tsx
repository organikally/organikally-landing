import type { Metadata } from 'next';
import { Mail, Clock, MapPin } from 'lucide-react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';

export const metadata: Metadata = {
  title: 'Contact us',
  description: 'Reach the Organikaly team about orders, products or anything else.',
  alternates: { canonical: '/contact/' },
};

// Support surface — one honest page: how to reach us, when we answer, and
// where order issues go. Placeholders stay visibly provisional until the
// founder supplies the legal details (tracked in MANUAL_STEPS.md).
export default function ContactPage() {
  return (
    <>
      <SiteHeader forceSolid />
      <main id="main" className="min-h-dvh bg-paper pt-32 md:pt-40">
        <div className="mx-auto max-w-container px-5 pb-28 md:px-10">
          <p className="eyebrow">We’re listening</p>
          <h1 className="t-headline mt-6 max-w-2xl font-semibold text-ink">Contact us</h1>
          <p className="t-lead mt-4 max-w-xl">
            Order questions, product doubts, wholesale enquiries or just a note about how the oil
            worked in your kitchen — write in.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-card border border-line bg-surface p-6">
              <Mail className="h-6 w-6 text-forest" strokeWidth={1.6} />
              <h2 className="mt-3 font-display text-xl text-ink">Email</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Orders &amp; support:{' '}
                <a href="mailto:support@organikaly.com" className="font-medium text-forest hover:text-forest-deep">
                  support@organikaly.com
                </a>
                <br />
                Everything else:{' '}
                <a href="mailto:hello@organikaly.com" className="font-medium text-forest hover:text-forest-deep">
                  hello@organikaly.com
                </a>
              </p>
            </div>
            <div className="rounded-card border border-line bg-surface p-6">
              <Clock className="h-6 w-6 text-forest" strokeWidth={1.6} />
              <h2 className="mt-3 font-display text-xl text-ink">Response times</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                We reply within 2 business days, Monday to Saturday. Include your order number for
                anything order-related — it makes everything faster.
              </p>
            </div>
            <div className="rounded-card border border-line bg-surface p-6">
              <MapPin className="h-6 w-6 text-forest" strokeWidth={1.6} />
              <h2 className="mt-3 font-display text-xl text-ink">Registered office</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                [Business name and registered address to be added.] FSSAI licence details appear in
                the footer of every page.
              </p>
            </div>
          </div>

          <div className="mt-10 max-w-measure rounded-card border-l-4 border-yellow bg-surface p-6">
            <h2 className="font-display text-xl text-ink">Something wrong with an order?</h2>
            <p className="mt-2 leading-relaxed text-ink-muted">
              Damaged parcel, missing item, payment trouble — our{' '}
              <a href="/policies/refunds/" className="font-medium text-forest hover:text-forest-deep">
                cancellation &amp; refund policy
              </a>{' '}
              explains exactly what we’ll do and how fast. Email us within 48 hours of delivery
              with photos and your order number.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
