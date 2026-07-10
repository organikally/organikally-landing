import type { Metadata } from 'next';
import PolicyPage from '@/components/policies/PolicyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What data organikaly.com collects, why, and the choices you have.',
  alternates: { canonical: '/policies/privacy/' },
};

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy policy"
      updated="2026-07-11"
      intro="We collect the minimum needed to run a store: your account, your orders, and how the site is used. We don’t sell personal data."
      sections={[
        {
          heading: 'What we collect',
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-ink">Account details</strong> — name, email, phone (if
                given), delivery addresses and your password stored as a salted hash.
              </li>
              <li>
                <strong className="text-ink">Order details</strong> — what you bought, amounts,
                delivery address, order status and courier tracking.
              </li>
              <li>
                <strong className="text-ink">Payment</strong> — processed entirely by Razorpay; we
                receive a payment reference and status, never your card or banking credentials.
              </li>
              <li>
                <strong className="text-ink">On-device data</strong> — your guest cart and sign-in
                token live in your browser’s local storage so the store works; they aren’t
                tracking identifiers.
              </li>
              <li>
                <strong className="text-ink">Reviews and messages</strong> — reviews you submit and
                emails you send to support.
              </li>
            </ul>
          ),
        },
        {
          heading: 'What we use it for',
          body: (
            <p>
              Fulfilling and supporting your orders, account access, fraud prevention, legally
              required records (tax, consumer protection), and — only if you opted in — occasional
              product emails. We don’t sell or rent personal data to anyone.
            </p>
          ),
        },
        {
          heading: 'Who we share it with',
          body: (
            <p>
              Only the services needed to run the store: our payment gateway (Razorpay), courier
              partners (name and address on the shipping label), and our hosting/infrastructure
              providers. Each receives only what it needs.
            </p>
          ),
        },
        {
          heading: 'How long we keep it',
          body: (
            <p>
              Order and invoice records are kept as long as tax and consumer-protection law
              requires. Account data is kept while your account is active; write to us to delete
              your account and we’ll remove personal data not legally required to be retained.
            </p>
          ),
        },
        {
          heading: 'Your choices',
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Access, correct or delete your data: email support@organikaly.com.</li>
              <li>Marketing emails are strictly opt-in and every one carries an unsubscribe.</li>
              <li>You can browse and fill a cart without an account; sign-in is needed only to pay.</li>
            </ul>
          ),
        },
        {
          heading: 'Security',
          body: (
            <p>
              All traffic is encrypted in transit (HTTPS). Passwords are hashed, access to
              production systems is restricted, and staff actions on orders are audit-logged.
            </p>
          ),
        },
        {
          heading: 'Contact',
          body: (
            <p>
              Data questions and requests: support@organikaly.com. Data fiduciary details: [legal
              entity name and registered address to be confirmed].
            </p>
          ),
        },
      ]}
    />
  );
}
