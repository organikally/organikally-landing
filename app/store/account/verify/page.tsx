import type { Metadata } from 'next';
import { Suspense } from 'react';
import VerifyEmailView from '@/components/store/auth/VerifyEmailView';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Verify email',
  robots: { index: false, follow: false },
};

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailView />
    </Suspense>
  );
}
