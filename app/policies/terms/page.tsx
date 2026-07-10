import type { Metadata } from 'next';
import PolicyPage from '@/components/policies/PolicyPage';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that govern purchases and use of organikaly.com.',
  alternates: { canonical: '/policies/terms/' },
};

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms of service"
      updated="2026-07-11"
      intro="Short version: we sell honest food, describe it truthfully, charge what checkout shows, and stand behind what we ship."
      sections={[
        {
          heading: 'Who we are',
          body: (
            <p>
              organikaly.com is operated by Organikaly [legal entity name and registered address
              to be confirmed — see our{' '}
              <a href="/contact/" className="font-medium text-forest hover:text-forest-deep">
                contact page
              </a>
              ]. FSSAI licence details are displayed in the site footer.
            </p>
          ),
        },
        {
          heading: 'Orders and acceptance',
          body: (
            <>
              <p>
                An order is confirmed when payment succeeds and you receive an order number. We may
                cancel and fully refund an order if a product is unavailable, a price or listing
                error occurred, or delivery to your address isn’t possible.
              </p>
              <p>
                Prices include GST where applicable and are shown in INR. The amount charged is
                always the amount shown at checkout.
              </p>
            </>
          ),
        },
        {
          heading: 'Product information',
          body: (
            <p>
              We describe products by their process and sourcing (for example cold-pressed,
              organically grown) and keep our claims within what we can stand behind. Natural
              products vary — colour, aroma and texture can differ batch to batch; that variation
              isn’t a defect.
            </p>
          ),
        },
        {
          heading: 'Payments',
          body: (
            <p>
              Payments are processed by Razorpay. We never store your card or banking details on
              our servers. Failed or duplicate charges are handled under our{' '}
              <a href="/policies/refunds/" className="font-medium text-forest hover:text-forest-deep">
                refund policy
              </a>
              .
            </p>
          ),
        },
        {
          heading: 'Accounts',
          body: (
            <p>
              You’re responsible for keeping your account credentials safe. We may suspend accounts
              used fraudulently or abusively.
            </p>
          ),
        },
        {
          heading: 'Reviews and content you submit',
          body: (
            <p>
              Reviews must reflect your genuine experience. By submitting a review you allow us to
              display it on our product pages. We moderate reviews for abuse and spam and never
              edit their substance.
            </p>
          ),
        },
        {
          heading: 'Liability',
          body: (
            <p>
              Our liability for any order is limited to the amount you paid for it. Nothing in
              these terms limits rights you have under the Consumer Protection Act, 2019 and
              applicable e-commerce rules.
            </p>
          ),
        },
        {
          heading: 'Grievances',
          body: (
            <p>
              Grievance officer: [name and contact to be appointed — until then, write to
              support@organikaly.com and your complaint will be acknowledged within 48 hours].
            </p>
          ),
        },
        {
          heading: 'Governing law',
          body: (
            <p>
              These terms are governed by the laws of India. Courts at [registered city — to be
              confirmed] have jurisdiction.
            </p>
          ),
        },
      ]}
    />
  );
}
