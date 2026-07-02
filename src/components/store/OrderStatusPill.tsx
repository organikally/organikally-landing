import type { StoreOrderStatus } from '@/lib/store/types';

const MAP: Record<StoreOrderStatus, { label: string; cls: string }> = {
  created: { label: 'Awaiting payment', cls: 'bg-yellow/15 text-yellow-ink' },
  pending_payment: { label: 'Awaiting payment', cls: 'bg-yellow/15 text-yellow-ink' },
  paid: { label: 'Confirmed', cls: 'bg-[#1B5E20]/10 text-[#1B5E20]' },
  confirmed: { label: 'Confirmed', cls: 'bg-[#1B5E20]/10 text-[#1B5E20]' },
  packed: { label: 'Packed', cls: 'bg-[#1B5E20]/10 text-[#1B5E20]' },
  shipped: { label: 'Shipped', cls: 'bg-[#0E3B14]/10 text-[#0E3B14]' },
  delivered: { label: 'Delivered', cls: 'bg-[#1B5E20]/15 text-[#1B5E20]' },
  payment_failed: { label: 'Payment failed', cls: 'bg-red-50 text-red-700' },
  cancelled: { label: 'Cancelled', cls: 'bg-ink/8 text-ink-muted' },
  refunded: { label: 'Refunded', cls: 'bg-ink/8 text-ink-muted' },
};

export default function OrderStatusPill({ status }: { status: StoreOrderStatus }) {
  const m = MAP[status] ?? { label: status, cls: 'bg-ink/8 text-ink-muted' };
  return (
    <span className={`inline-flex items-center rounded-chip px-2.5 py-1 text-xs font-semibold ${m.cls}`}>
      {m.label}
    </span>
  );
}
