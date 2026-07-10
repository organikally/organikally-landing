import type { Metadata } from 'next';
import PolicyPage from '@/components/policies/PolicyPage';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy',
  description:
    'How cancellations, returns and refunds work at Organikaly — food-safety rules, timelines and the refund method.',
  alternates: { canonical: '/policies/refunds/' },
};

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      title="Cancellation & refund policy"
      updated="2026-07-11"
      intro="We sell food, so our return rules follow food-safety practice: fair to you, safe for every other kitchen we ship to."
      sections={[
        {
          heading: 'Cancelling an order',
          body: (
            <>
              <p>
                You can cancel an order any time before it ships by writing to
                support@organikaly.com with your order number. Once cancelled, your refund is
                initiated the same working day.
              </p>
              <p>Orders that have already been dispatched can’t be cancelled mid-way.</p>
            </>
          ),
        },
        {
          heading: 'What can be returned',
          body: (
            <>
              <p>
                Because our products are food items, we accept returns or offer replacements only
                when something is genuinely wrong:
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>The parcel or product arrived damaged or leaking</li>
                <li>You received the wrong item</li>
                <li>The product is past its printed best-before date on arrival</li>
                <li>A verifiable quality defect (e.g. spoilage on opening)</li>
              </ul>
              <p>
                Opened products can’t be returned for reasons of taste or preference — though if
                something isn’t right, tell us anyway; we’d rather know.
              </p>
            </>
          ),
        },
        {
          heading: 'How to raise an issue',
          body: (
            <p>
              Email support@organikaly.com within 48 hours of delivery with your order number and
              clear photos of the product and packaging. We respond within 2 business days and,
              where a courier claim is needed, keep you updated until it’s resolved.
            </p>
          ),
        },
        {
          heading: 'Refund method and timeline',
          body: (
            <>
              <p>
                Approved refunds go back to your original payment method through our payment
                partner (Razorpay). Once initiated, banks typically credit the amount in 5–7
                business days.
              </p>
              <p>
                Where you’d prefer a replacement over a refund, we’ll ship one at no extra cost,
                subject to stock.
              </p>
            </>
          ),
        },
        {
          heading: 'Failed or duplicate payments',
          body: (
            <p>
              If money was debited but no order was created, the payment gateway auto-reverses it,
              usually within 5–7 business days. If it doesn’t, write to us with the payment
              reference and we’ll chase it with Razorpay.
            </p>
          ),
        },
      ]}
    />
  );
}
