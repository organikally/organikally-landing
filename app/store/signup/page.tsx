import type { Metadata } from 'next';
import { Suspense } from 'react';
import SignupForm from '@/components/store/auth/SignupForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Create account',
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}
