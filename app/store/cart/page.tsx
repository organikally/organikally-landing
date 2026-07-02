import type { Metadata } from 'next';
import CartPageView from '@/components/store/CartPageView';

// Customer-only surface — not indexed (STORE_CONTRACT §2.2 / §10).
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Cart',
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartPageView />;
}
