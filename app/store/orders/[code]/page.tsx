import type { Metadata } from 'next';
import RequireCustomer from '@/components/store/RequireCustomer';
import OrderDetailView from '@/components/store/account/OrderDetailView';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Order detail',
  robots: { index: false, follow: false },
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return (
    <RequireCustomer>
      <OrderDetailView code={code} />
    </RequireCustomer>
  );
}
