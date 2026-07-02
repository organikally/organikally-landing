import { formatPaise, formatDateTime } from '@/lib/format';
import StoreImage from '@/components/store/StoreImage';
import OrderStatusPill from '@/components/store/OrderStatusPill';
import type { StoreOrderView } from '@/lib/store/types';

// Shared order body: line items, totals, shipping address + shipment. Reused by the
// confirmation page and the account order-detail page.
export default function OrderBody({ order }: { order: StoreOrderView }) {
  const s = order.shipment;
  return (
    <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
      <div>
        <ul className="divide-y divide-line border-y border-line">
          {order.items.map((it) => (
            <li key={it.store_product_id} className="flex gap-4 py-4">
              <StoreImage
                src={it.image}
                alt={it.name}
                width={120}
                height={120}
                className="h-20 w-20 rounded-media"
              />
              <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">{it.name}</p>
                  <p className="tnum mt-1 text-sm text-ink-muted">
                    {formatPaise(it.unit_price_paise)} × {it.qty}
                  </p>
                </div>
                <span className="tnum font-semibold text-ink">{formatPaise(it.line_total_paise)}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Shipment */}
        {(s.courier || s.awb || s.tracking_url) && (
          <div className="mt-6 rounded-card border border-line bg-surface p-5">
            <h3 className="font-semibold text-ink">Shipment</h3>
            <dl className="mt-2 grid grid-cols-[8rem_1fr] gap-y-1.5 text-sm">
              {s.courier && (
                <>
                  <dt className="text-ink-faint">Courier</dt>
                  <dd className="text-ink">{s.courier}</dd>
                </>
              )}
              {s.awb && (
                <>
                  <dt className="text-ink-faint">AWB</dt>
                  <dd className="tnum text-ink">{s.awb}</dd>
                </>
              )}
              {s.tracking_url && (
                <>
                  <dt className="text-ink-faint">Track</dt>
                  <dd>
                    <a
                      href={s.tracking_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-yellow-ink hover:text-ink"
                    >
                      Open tracking
                    </a>
                  </dd>
                </>
              )}
            </dl>
          </div>
        )}
      </div>

      {/* Totals + address */}
      <aside className="h-fit space-y-6">
        <div className="rounded-card border border-line bg-surface p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg text-ink">Order {order.code}</h3>
            <OrderStatusPill status={order.status} />
          </div>
          <p className="mt-1 text-sm text-ink-faint">Placed {formatDateTime(order.created_at)}</p>

          <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-muted">Subtotal</span>
              <span className="tnum text-ink">{formatPaise(order.subtotal_paise)}</span>
            </div>
            {order.coupon_discount_paise > 0 && (
              <div className="flex justify-between text-yellow-ink">
                <span>Discount {order.coupon_code ? `(${order.coupon_code})` : ''}</span>
                <span className="tnum">−{formatPaise(order.coupon_discount_paise)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-ink-muted">Shipping</span>
              <span className="tnum text-ink">
                {order.shipping_fee_paise === 0 ? 'Free' : formatPaise(order.shipping_fee_paise)}
              </span>
            </div>
            {order.refund_total_paise > 0 && (
              <div className="flex justify-between text-ink-muted">
                <span>Refunded</span>
                <span className="tnum">−{formatPaise(order.refund_total_paise)}</span>
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <span className="font-semibold text-ink">Total</span>
            <span className="tnum text-lg font-semibold text-ink">{formatPaise(order.total_paise)}</span>
          </div>
        </div>

        <div className="rounded-card border border-line p-6">
          <h3 className="font-semibold text-ink">Delivery address</h3>
          <address className="mt-2 not-italic text-sm leading-relaxed text-ink-muted">
            {order.shipping_address.name}
            <br />
            {order.shipping_address.line1}
            {order.shipping_address.line2 ? `, ${order.shipping_address.line2}` : ''}
            <br />
            {order.shipping_address.city}, {order.shipping_address.state} — {order.shipping_address.pincode}
            <br />
            {order.shipping_address.phone}
          </address>
        </div>
      </aside>
    </div>
  );
}
