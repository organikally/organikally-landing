'use client';

import type { ReactNode } from 'react';
import { AuthProvider } from '@/lib/store/auth-context';
import { CartProvider } from '@/lib/store/cart-context';
import CartDrawer from './CartDrawer';

// Single client boundary for the whole /store section: customer auth + cart state,
// plus the global slide-out cart drawer.
export default function StoreProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </AuthProvider>
  );
}
