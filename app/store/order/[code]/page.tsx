import type { Metadata } from 'next';
import RequireCustomer from '@/components/store/RequireCustomer';
import OrderConfirmationView from '@/components/store/order/OrderConfirmationView';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Order confirmation',
  robots: { index: false, follow: false },
};

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return (
    <RequireCustomer>
      <OrderConfirmationView code={code} />
    </RequireCustomer>
  );
}
