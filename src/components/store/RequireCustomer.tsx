'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/store/auth-context';

// Auth gate (STORE_CONTRACT §8): browse + cart are free, but account/orders/checkout
// require a logged-in customer. Redirects guests to /store/login with a `next` return.
export default function RequireCustomer({ children }: { children: ReactNode }) {
  const { isAuthed, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ready && !isAuthed) {
      router.replace(`/store/login/?next=${encodeURIComponent(pathname)}`);
    }
  }, [ready, isAuthed, router, pathname]);

  if (!ready || !isAuthed) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-ink-faint" />
      </div>
    );
  }
  return <>{children}</>;
}
