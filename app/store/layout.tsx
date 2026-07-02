import type { ReactNode } from 'react';
import StoreProviders from '@/components/store/StoreProviders';
import StoreHeader from '@/components/store/StoreHeader';
import SiteFooter from '@/components/layout/SiteFooter';

// Store section chrome: customer-auth + cart providers, a cart-aware header, and the
// shared marketing footer so the storefront feels native to the brand site.
export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <StoreProviders>
      <StoreHeader />
      <main id="main" className="min-h-dvh bg-paper pt-24 md:pt-28">
        {children}
      </main>
      <SiteFooter />
    </StoreProviders>
  );
}
