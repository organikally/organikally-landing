import type { ReactNode } from 'react';
import StoreProviders from '@/components/store/StoreProviders';
import StoreHeader from '@/components/store/StoreHeader';
import FloatingCart from '@/components/store/FloatingCart';
import SiteFooter from '@/components/layout/SiteFooter';
import { getCategories } from '@/lib/store/api';

// Store section chrome: customer-auth + cart providers, a search-first command
// bar (fed the live categories for its scope dropdown), an always-in-reach cart
// roundel, and the shared marketing footer. The header is a fixed two-row card —
// <main>'s top padding must clear it (see StoreHeader).
export default async function StoreLayout({ children }: { children: ReactNode }) {
  const categories = await getCategories();
  return (
    <StoreProviders>
      <StoreHeader categories={categories} />
      <main id="main" className="min-h-dvh bg-paper pt-[8.5rem] md:pt-[9.25rem]">
        {children}
      </main>
      <FloatingCart />
      <SiteFooter />
    </StoreProviders>
  );
}
