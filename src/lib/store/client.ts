'use client';

// Client-side storefront API (STORE_CONTRACT §2.4). Reads the PUBLIC base and sends
// the customer JWT (typ:"customer", aud:"store", §8) as `Authorization: Bearer`.
// NEVER computes money as a source of truth — the backend total is authoritative;
// the client only displays the server's `*_paise`/INR values.

import type {
  CartView,
  CheckoutResponse,
  Customer,
  CouponValidation,
  Address,
  Paginated,
  StoreOrderView,
  Serviceability,
  ShippingQuote,
  StoreConfig,
  StorefrontProductDetail,
} from './types';

export const PUBLIC_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8000/api/v1';

export const TOKEN_KEY = 'organikally.token';
export const CUSTOMER_KEY = 'organikally.customer';
export const GUEST_CART_KEY = 'organikally.cart';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

function newIdempotencyKey(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

type ReqOpts = {
  method?: string;
  body?: unknown;
  auth?: boolean;
  idempotencyKey?: string;
  signal?: AbortSignal;
};

async function request<T>(path: string, opts: ReqOpts = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json';
  if (opts.auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  if (opts.idempotencyKey) headers['Idempotency-Key'] = opts.idempotencyKey;

  let res: Response;
  try {
    res = await fetch(`${PUBLIC_API_BASE}${path}`, {
      method: opts.method ?? 'GET',
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      signal: opts.signal,
    });
  } catch {
    throw new ApiError(0, 'Network error — please check your connection and try again.');
  }

  if (res.status === 204) return undefined as T;

  let data: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    throw new ApiError(res.status, extractDetail(data, res.status));
  }
  return data as T;
}

function extractDetail(data: unknown, status: number): string {
  if (data && typeof data === 'object' && 'detail' in data) {
    const d = (data as { detail: unknown }).detail;
    if (typeof d === 'string') return d;
    if (Array.isArray(d) && d.length && typeof d[0] === 'object' && d[0] && 'msg' in d[0]) {
      return String((d[0] as { msg: unknown }).msg);
    }
  }
  if (status === 401) return 'Please sign in to continue.';
  if (status === 503) return 'Store temporarily unavailable.';
  return 'Something went wrong. Please try again.';
}

// ── Config / catalog (public) ──────────────────────────────────────────────
export const storeApi = {
  config: () => request<StoreConfig>('/store/config'),
  product: (slug: string) =>
    request<StorefrontProductDetail>(`/store/products/${encodeURIComponent(slug)}`),

  // ── Auth (§5.1) ──────────────────────────────────────────────────────────
  register: (body: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    marketing_opt_in?: boolean;
  }) => request<{ detail: string }>('/store/auth/register', { method: 'POST', body }),

  login: (body: { email: string; password: string }) =>
    request<{ customer: Customer; access_token: string }>('/store/auth/login', {
      method: 'POST',
      body,
    }),

  me: () => request<Customer>('/store/auth/me', { auth: true }),

  logout: () => request<{ detail: string }>('/store/auth/logout', { method: 'POST', auth: true }),

  forgotPassword: (email: string) =>
    request<{ detail: string }>('/store/auth/forgot-password', { method: 'POST', body: { email } }),

  resetPassword: (token: string, new_password: string) =>
    request<{ detail: string }>('/store/auth/reset-password', {
      method: 'POST',
      body: { token, new_password },
    }),

  verifyEmail: (token: string) =>
    request<{ detail: string }>('/store/auth/verify', { method: 'POST', body: { token } }),

  // ── Addresses (§5.1) ─────────────────────────────────────────────────────
  addresses: () => request<{ items: Address[] }>('/store/auth/addresses', { auth: true }),
  addAddress: (body: Address) =>
    request<Customer>('/store/auth/addresses', { method: 'POST', body, auth: true }),
  updateAddress: (id: string, body: Partial<Address>) =>
    request<Customer>(`/store/auth/addresses/${id}`, { method: 'PATCH', body, auth: true }),
  deleteAddress: (id: string) =>
    request<Customer>(`/store/auth/addresses/${id}`, { method: 'DELETE', auth: true }),

  // ── Cart (§5.3, customer) ────────────────────────────────────────────────
  getCart: () => request<CartView>('/store/cart', { auth: true }),
  addCartItem: (store_product_id: string, qty: number) =>
    request<CartView>('/store/cart/items', {
      method: 'POST',
      body: { store_product_id, qty },
      auth: true,
    }),
  updateCartItem: (store_product_id: string, qty: number) =>
    request<CartView>(`/store/cart/items/${store_product_id}`, {
      method: 'PATCH',
      body: { qty },
      auth: true,
    }),
  removeCartItem: (store_product_id: string) =>
    request<CartView>(`/store/cart/items/${store_product_id}`, { method: 'DELETE', auth: true }),
  mergeCart: (items: { store_product_id: string; qty: number }[]) =>
    request<CartView>('/store/cart/merge', {
      method: 'POST',
      body: { items },
      auth: true,
      idempotencyKey: newIdempotencyKey(),
    }),
  applyCoupon: (code: string) =>
    request<CartView>('/store/cart/coupon', { method: 'POST', body: { code }, auth: true }),
  removeCoupon: () => request<CartView>('/store/cart/coupon', { method: 'DELETE', auth: true }),

  // ── Coupon / shipping (§5.4) ─────────────────────────────────────────────
  validateCoupon: (body: {
    code: string;
    items?: { store_product_id: string; qty: number }[];
    subtotal_paise?: number;
  }) => request<CouponValidation>('/store/coupons/validate', { method: 'POST', body, auth: true }),

  serviceability: (pincode: string) =>
    request<Serviceability>(`/store/shipping/serviceability?pincode=${encodeURIComponent(pincode)}`),

  shippingQuote: (body: {
    pincode: string;
    subtotal_paise: number;
    coupon_code?: string;
    items?: { store_product_id: string; qty: number }[];
  }) => request<ShippingQuote>('/store/shipping/quote', { method: 'POST', body }),

  // ── Checkout (§5.5) ──────────────────────────────────────────────────────
  checkout: (
    body: {
      address_id?: string;
      shipping_address?: Address;
      coupon_code?: string;
      items?: { store_product_id: string; qty: number }[];
    },
    idempotencyKey: string,
  ) =>
    request<CheckoutResponse>('/store/checkout', {
      method: 'POST',
      body,
      auth: true,
      idempotencyKey,
    }),

  verifyPayment: (body: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) =>
    request<{ status: string; order_code: string }>('/store/checkout/verify', {
      method: 'POST',
      body,
      auth: true,
    }),

  // ── Orders (§5.6) ────────────────────────────────────────────────────────
  orders: (params: { status?: string; page?: number; page_size?: number } = {}) => {
    const sp = new URLSearchParams();
    if (params.status) sp.set('status', params.status);
    if (params.page) sp.set('page', String(params.page));
    if (params.page_size) sp.set('page_size', String(params.page_size));
    const q = sp.toString();
    return request<Paginated<StoreOrderView>>(`/store/orders${q ? `?${q}` : ''}`, { auth: true });
  },
  order: (code: string) =>
    request<StoreOrderView>(`/store/orders/${encodeURIComponent(code)}`, { auth: true }),
  trackOrder: (token: string) =>
    request<StoreOrderView>(`/store/orders/track?token=${encodeURIComponent(token)}`),

  // ── Stock alerts (§5.7) ──────────────────────────────────────────────────
  subscribeStockAlert: (store_product_id: string, email: string) =>
    request<{ status: string }>('/store/stock-alerts', {
      method: 'POST',
      body: { store_product_id, email },
    }),
};

export { newIdempotencyKey };
