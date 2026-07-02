import type { Metadata } from 'next';
import RequireCustomer from '@/components/store/RequireCustomer';
import CheckoutView from '@/components/store/checkout/CheckoutView';

// Auth-gated, customer-only, not indexed (STORE_CONTRACT §2.2 / §8).
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Checkout',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <RequireCustomer>
      <CheckoutView />
    </RequireCustomer>
  );
}
