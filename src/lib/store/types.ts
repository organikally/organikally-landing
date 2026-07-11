// Storefront types — mirror the backend STORE_CONTRACT (§3 enums, §5 response shapes).
// Money is integer paise everywhere (§0.1); the `*_paise` field is canonical, the
// bare INR number is display-only.

export type StoreOrderStatus =
  | 'created'
  | 'pending_payment'
  | 'paid'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'payment_failed'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus =
  | 'created'
  | 'authorized'
  | 'captured'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

export type ShipmentStatus = 'pending' | 'packed' | 'shipped' | 'delivered' | 'returned';

export type CouponType = 'percent' | 'fixed' | 'free_shipping';

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  page_size: number;
};

// §5.2 StorefrontProduct (list item, includes live stock)
export type StorefrontProduct = {
  id: string;
  slug: string;
  name: string;
  subtitle?: string | null;
  category: string;
  price_paise: number;
  price: number;
  compare_at_price_paise?: number | null;
  compare_at_price?: number | null;
  currency: string;
  primary_image: string;
  images: string[];
  badges: string[];
  featured: boolean;
  is_hero: boolean;
  sku_code?: string | null;
  pack_size?: string | null;
  unit?: string | null;
  in_stock: boolean;
  low_stock: boolean;
  sellable_qty: number;
  max_qty_per_order?: number | null;
  rating_avg?: number | null;
  rating_count?: number;
};

// Reviews (REVIEWS CONTRACT §3)
export type ReviewItem = {
  id: string;
  customer_name: string;
  rating: number;
  title?: string | null;
  body: string;
  verified_purchase: boolean;
  created_at: string;
};

export type ReviewSummary = {
  average: number | null;
  count: number;
  histogram: Record<string, number>;
};

export type ReviewsPage = Paginated<ReviewItem> & { summary: ReviewSummary };

// §5.2 StorefrontProductDetail = StorefrontProduct + SEO/long-copy fields
export type StorefrontProductDetail = StorefrontProduct & {
  description: string;
  og_image?: string | null;
  gtin?: string | null;
  brand: string;
  canonical_path: string;
  seo_title?: string | null;
  seo_description?: string | null;
  related?: StorefrontProduct[];
};

export type StoreCategory = { key: string; label: string; count: number };

// Recipes (RECIPES CONTRACT §2) — card on the listing, detail on /recipes/[slug].
export type RecipeCard = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  recipe_type: string;
  hero_image: string;
  prep_min: number;
  cook_min: number;
  total_min: number;
  servings: number;
  difficulty: string;
  tags: string[];
  featured: boolean;
};

export type RecipeIngredientGroup = { heading?: string | null; items: string[] };

export type RecipeDetail = RecipeCard & {
  description: string;
  ingredients: RecipeIngredientGroup[];
  steps: string[];
  tips: string[];
  author: string;
  seo_title?: string | null;
  seo_description?: string | null;
  og_image?: string | null;
  canonical_path: string;
  created_at?: string;
  updated_at?: string;
  related_products: StorefrontProduct[];
};

export type RecipeType = { key: string; label: string; count: number };

// §5.2 GET /store/config (public)
export type StoreConfig = {
  store_enabled: boolean;
  currency: string;
  flat_fee_paise: number;
  flat_fee: number;
  free_shipping_threshold_paise: number;
  free_shipping_threshold: number;
  razorpay_key_id?: string | null;
  support_email: string;
  support_phone?: string | null;
  low_stock_threshold: number;
};

export type SitemapEntry = { slug: string; updated_at: string };

// §4.1 Address (embedded)
export type Address = {
  id?: string;
  label?: string | null;
  name: string;
  phone: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  pincode: string;
  is_default?: boolean;
};

// §5.1 customer response
export type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  email_verified: boolean;
  status: 'active' | 'blocked';
  addresses: Address[];
  default_address_id?: string | null;
  marketing_opt_in: boolean;
  created_at: string;
};

// §5.3 CartView
export type CartNotice = {
  code: string;
  message: string;
  store_product_id?: string | null;
};

export type CartViewItem = {
  store_product_id: string;
  slug: string;
  name: string;
  image: string;
  qty: number;
  unit_price_paise: number;
  unit_price: number;
  line_total_paise: number;
  line_total: number;
  in_stock: boolean;
  low_stock: boolean;
  sellable_qty: number;
  max_qty_per_order?: number | null;
};

export type CartView = {
  items: CartViewItem[];
  subtotal_paise: number;
  subtotal: number;
  coupon_code?: string | null;
  coupon_discount_paise: number;
  coupon_discount: number;
  item_count: number;
  currency: string;
  notices?: CartNotice[];
};

// §5.4 coupon validate
export type CouponValidation = {
  valid: boolean;
  code: string;
  type?: CouponType;
  discount_paise: number;
  discount: number;
  free_shipping?: boolean;
  message: string;
};

// §5.4 shipping quote
export type ShippingQuote = {
  serviceable: boolean;
  pincode: string;
  flat_fee_paise?: number;
  free_shipping_threshold_paise?: number;
  coupon_discount_paise?: number;
  post_coupon_subtotal_paise?: number;
  shipping_fee_paise?: number;
  shipping_fee?: number;
  free_shipping_applied?: boolean;
};

export type Serviceability = { pincode: string; serviceable: boolean };

// §5.5 checkout response
export type CheckoutResponse = {
  store_order: {
    id: string;
    code: string;
    status: StoreOrderStatus;
    total_paise: number;
    total: number;
    currency: string;
    items: StoreOrderLineItem[];
  };
  razorpay: {
    key_id: string;
    order_id: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    prefill: { name: string; email: string; contact: string };
  };
};

export type StoreOrderLineItem = {
  store_product_id: string;
  sku_id?: string;
  name: string;
  slug: string;
  image: string;
  category?: string;
  qty: number;
  unit_price_paise: number;
  line_total_paise: number;
};

// §5.6 StoreOrderView
export type StoreShipmentView = {
  status: ShipmentStatus;
  courier?: string | null;
  awb?: string | null;
  tracking_url?: string | null;
  shipped_at?: string | null;
  delivered_at?: string | null;
  returned_at?: string | null;
};

export type StoreOrderView = {
  id: string;
  code: string;
  status: StoreOrderStatus;
  payment_status: PaymentStatus;
  items: StoreOrderLineItem[];
  subtotal_paise: number;
  subtotal: number;
  coupon_code?: string | null;
  coupon_discount_paise: number;
  shipping_fee_paise: number;
  total_paise: number;
  total: number;
  currency: string;
  shipping_address: Address;
  shipment: StoreShipmentView;
  refund_total_paise: number;
  created_at: string;
  paid_at?: string | null;
};

// ── Organikaly Club membership & Organikaly Coins wallet ────────────────────
// (MEMBERSHIP_CONTRACT §7). Money is integer paise (§0.1); the bare INR `price`
// and the `*_pct` fields are display-only derivations of the paise/bps fields.

export type MembershipStatus = 'pending' | 'active' | 'expired' | 'cancelled';

export type CoinReason =
  | 'earn'
  | 'redeem'
  | 'redeem_release'
  | 'welcome_bonus'
  | 'admin_adjust'
  | 'refund_reversal'
  | 'renewal_bonus';

// The single admin-editable "club product". Every number here is admin-driven —
// the storefront reads them, never hardcodes them.
export type MembershipPlan = {
  id: string;
  name: string;
  slug: string;
  price_paise: number;
  price: number;
  duration_days: number;
  free_delivery_for_members: boolean;
  member_discount_bps: number;
  member_discount_pct: number;
  coin_earn_paise_per_coin: number;
  member_earn_multiplier_pct: number;
  coin_redeem_value_paise: number;
  non_member_redeem_pct: number;
  max_redeem_pct_of_order: number;
  welcome_coins: number;
  benefits: string[];
  active: boolean;
};

// The caller's own membership — present in MembershipView only for an authed customer.
export type CustomerMembership = {
  id: string;
  status: MembershipStatus;
  started_at?: string | null;
  expires_at?: string | null;
  auto_renew: boolean;
  days_remaining?: number | null;
  is_renewal: boolean;
};

// GET /store/membership — plan for everyone; membership/wallet only for a customer.
export type MembershipView = {
  plan: MembershipPlan;
  membership: CustomerMembership | null;
  is_member: boolean;
  wallet: { balance_coins: number } | null;
};

export type WalletLedgerEntry = {
  delta_coins: number;
  reason: CoinReason;
  balance_after: number;
  at: string;
  note?: string | null;
};

// GET /store/wallet
export type WalletView = {
  balance_coins: number;
  member: boolean;
  coin_redeem_value_paise: number;
  effective_redeem_value_paise: number;
  max_redeem_pct_of_order: number;
  ledger: WalletLedgerEntry[];
};

// POST /store/wallet/preview — the exact coin discount checkout will apply (§3).
export type WalletPreview = {
  coin_discount_paise: number;
  coin_discount: number;
  effective_coins: number;
  max_redeemable_coins: number;
  per_coin_paise: number;
};

// The Razorpay block returned by both order and membership checkout (§7, §9).
export type RazorpayBlock = {
  key_id: string;
  order_id: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill: { name: string; email: string; contact: string };
};

// POST /store/membership/checkout
export type MembershipCheckoutResponse = {
  membership: CustomerMembership;
  razorpay: RazorpayBlock;
};

// POST /store/membership/verify (fast-path UX only; the webhook activates).
export type MembershipVerifyResponse = {
  status: 'active' | 'processing';
  membership_id: string;
};

// Guest cart line kept in localStorage (`organikaly.cart`). The merge payload
// uses only { store_product_id, qty } (§5.3.2 / §8); the extra display fields are
// a UX snapshot so the guest drawer/page can render without a server round-trip.
export type GuestCartLine = {
  store_product_id: string;
  qty: number;
  slug: string;
  name: string;
  image: string;
  unit_price_paise: number;
  compare_at_price_paise?: number | null;
  sellable_qty: number;
  max_qty_per_order?: number | null;
};
