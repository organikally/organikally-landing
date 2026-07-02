import type { Metadata } from 'next';
import RequireCustomer from '@/components/store/RequireCustomer';
import AccountView from '@/components/store/account/AccountView';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Your account',
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <RequireCustomer>
      <AccountView />
    </RequireCustomer>
  );
}
