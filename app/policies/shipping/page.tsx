import type { Metadata } from 'next';
import PolicyPage from '@/components/policies/PolicyPage';

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description:
    'How Organikaly ships: charges, timelines, serviceable areas and what to do if a delivery goes wrong.',
  alternates: { canonical: '/policies/shipping/' },
};

export default function ShippingPolicyPage() {
  return (
    <PolicyPage
      title="Shipping policy"
      updated="2026-07-11"
      intro="Everything we ship is packed to order from our fulfilment centre and sent by tracked courier."
      sections={[
        {
          heading: 'Shipping charges',
          body: (
            <>
              <p>
                Shipping is a flat ₹49 per order. Orders of ₹999 or more ship free. The exact
                charge for your order is always shown at checkout before you pay — there are no
                surprises after payment.
              </p>
            </>
          ),
        },
        {
          heading: 'Where we deliver',
          body: (
            <p>
              Serviceable pincodes are checked at checkout. If we can’t deliver to your pincode
              yet, checkout will tell you before any payment is taken.
            </p>
          ),
        },
        {
          heading: 'Dispatch and delivery timelines',
          body: (
            <>
              <p>
                Orders are typically packed and dispatched within 1–2 business days of payment
                confirmation. Courier delivery usually takes 2–7 business days depending on your
                location; remote pincodes can take longer.
              </p>
              <p>
                You’ll receive the courier name, AWB number and a tracking link on your order page
                once your parcel ships.
              </p>
            </>
          ),
        },
        {
          heading: 'Damaged, missing or delayed parcels',
          body: (
            <>
              <p>
                If your parcel arrives damaged, items are missing, or tracking has been stuck for
                more than 7 days, write to support@organikaly.com with your order number (and
                photos, for damage). We’ll investigate with the courier and make it right with a
                replacement or refund as per our{' '}
                <a href="/policies/refunds/" className="font-medium text-forest hover:text-forest-deep">
                  refund policy
                </a>
                .
              </p>
            </>
          ),
        },
        {
          heading: 'Order changes after dispatch',
          body: (
            <p>
              We can’t reroute a parcel once it’s with the courier. If you need to change a
              delivery address, contact us before your order ships.
            </p>
          ),
        },
      ]}
    />
  );
}
