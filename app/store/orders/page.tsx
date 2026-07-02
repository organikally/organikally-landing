import type { Metadata } from 'next';
import RequireCustomer from '@/components/store/RequireCustomer';
import OrdersView from '@/components/store/account/OrdersView';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Your orders',
  robots: { index: false, follow: false },
};

export default function OrdersPage() {
  return (
    <RequireCustomer>
      <OrdersView />
    </RequireCustomer>
  );
}
