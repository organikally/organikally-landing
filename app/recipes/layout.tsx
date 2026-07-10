import type { ReactNode } from 'react';
import StoreProviders from '@/components/store/StoreProviders';
import StoreHeader from '@/components/store/StoreHeader';
import FloatingCart from '@/components/store/FloatingCart';
import SiteFooter from '@/components/layout/SiteFooter';
import { getCategories } from '@/lib/store/api';

// Recipes live inside the store chrome — same command bar, cart drawer and
// floating cart as /store, so "Cook it with" product cards can add to cart
// without leaving the page.
export default async function RecipesLayout({ children }: { children: ReactNode }) {
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
