'use client';

// Cart (STORE_CONTRACT §5.3, §5.3.2, §8). Two modes:
//  • Guest  → cart in localStorage (`organikally.cart`), display totals computed
//             locally for UX only (never sent to the server as money).
//  • Authed → server cart is authoritative; all mutations hit /store/cart/**.
// On login the guest cart MERGES (set-to-max, idempotent) into the server cart, then
// the localStorage cart is cleared.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { storeApi, ApiError, GUEST_CART_KEY } from './client';
import { useAuth } from './auth-context';
import type { CartNotice, CartView, GuestCartLine } from './types';

export type CartLineDisplay = {
  store_product_id: string;
  slug: string;
  name: string;
  image: string;
  qty: number;
  unit_price_paise: number;
  line_total_paise: number;
  compare_at_price_paise?: number | null;
  in_stock: boolean;
  low_stock: boolean;
  sellable_qty: number;
  max_qty_per_order?: number | null;
};

export type AddInput = {
  store_product_id: string;
  slug: string;
  name: string;
  image: string;
  unit_price_paise: number;
  compare_at_price_paise?: number | null;
  sellable_qty: number;
  max_qty_per_order?: number | null;
};

type CartContextValue = {
  items: CartLineDisplay[];
  itemCount: number;
  subtotalPaise: number;
  couponCode: string | null;
  couponDiscountPaise: number;
  notices: CartNotice[];
  ready: boolean;
  busy: boolean;
  error: string | null;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (input: AddInput, qty?: number) => Promise<void>;
  updateQty: (storeProductId: string, qty: number) => Promise<void>;
  remove: (storeProductId: string) => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: () => Promise<void>;
  refresh: () => Promise<void>;
  clearLocal: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readGuestCart(): GuestCartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(GUEST_CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((l) => l && l.store_product_id && l.qty > 0) as GuestCartLine[];
  } catch {
    return [];
  }
}

function writeGuestCart(lines: GuestCartLine[]) {
  try {
    window.localStorage.setItem(GUEST_CART_KEY, JSON.stringify(lines));
  } catch {
    /* ignore quota / private mode */
  }
}

function clampQty(qty: number, line: { sellable_qty: number; max_qty_per_order?: number | null }) {
  const cap = line.max_qty_per_order ?? Infinity;
  const max = Math.min(line.sellable_qty > 0 ? line.sellable_qty : 0, cap);
  return Math.max(0, Math.min(qty, max));
}

function guestToDisplay(lines: GuestCartLine[]): CartLineDisplay[] {
  return lines.map((l) => ({
    store_product_id: l.store_product_id,
    slug: l.slug,
    name: l.name,
    image: l.image,
    qty: l.qty,
    unit_price_paise: l.unit_price_paise,
    line_total_paise: l.unit_price_paise * l.qty,
    compare_at_price_paise: l.compare_at_price_paise ?? null,
    in_stock: l.sellable_qty > 0,
    low_stock: false,
    sellable_qty: l.sellable_qty,
    max_qty_per_order: l.max_qty_per_order ?? null,
  }));
}

function serverToDisplay(cart: CartView): CartLineDisplay[] {
  return cart.items.map((i) => ({
    store_product_id: i.store_product_id,
    slug: i.slug,
    name: i.name,
    image: i.image,
    qty: i.qty,
    unit_price_paise: i.unit_price_paise,
    line_total_paise: i.line_total_paise,
    compare_at_price_paise: null,
    in_stock: i.in_stock,
    low_stock: i.low_stock,
    sellable_qty: i.sellable_qty,
    max_qty_per_order: i.max_qty_per_order ?? null,
  }));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { token, ready: authReady } = useAuth();
  const [guest, setGuest] = useState<GuestCartLine[]>([]);
  const [server, setServer] = useState<CartView | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setOpen] = useState(false);
  const mergedFor = useRef<string | null>(null);

  // Hydrate guest cart on mount.
  useEffect(() => {
    setGuest(readGuestCart());
    setReady(true);
  }, []);

  // Drive server cart load + guest→server merge from the auth token.
  useEffect(() => {
    if (!authReady) return;
    let cancelled = false;

    async function syncAuthed(t: string) {
      try {
        const guestLines = readGuestCart();
        // Merge is set-to-max + idempotent (§5.3.2); safe to run once per session.
        if (guestLines.length && mergedFor.current !== t) {
          mergedFor.current = t;
          await storeApi.mergeCart(
            guestLines.map((l) => ({ store_product_id: l.store_product_id, qty: l.qty })),
          );
          writeGuestCart([]);
          if (!cancelled) setGuest([]);
        }
        const cart = await storeApi.getCart();
        if (!cancelled) setServer(cart);
      } catch {
        // Leave the guest cart intact on failure so nothing is lost.
        if (!cancelled) setServer(null);
      }
    }

    if (token) {
      void syncAuthed(token);
    } else {
      mergedFor.current = null;
      setServer(null);
      setGuest(readGuestCart());
    }

    return () => {
      cancelled = true;
    };
  }, [token, authReady]);

  const openCart = useCallback(() => setOpen(true), []);
  const closeCart = useCallback(() => setOpen(false), []);

  const refresh = useCallback(async () => {
    if (token) {
      try {
        setServer(await storeApi.getCart());
      } catch {
        /* keep last view */
      }
    } else {
      setGuest(readGuestCart());
    }
  }, [token]);

  const add = useCallback(
    async (input: AddInput, qty = 1) => {
      setError(null);
      if (token) {
        setBusy(true);
        try {
          setServer(await storeApi.addCartItem(input.store_product_id, qty));
          setOpen(true);
        } catch (e) {
          setError(e instanceof ApiError ? e.message : 'Could not add to cart.');
        } finally {
          setBusy(false);
        }
        return;
      }
      // Guest: increment + clamp locally.
      setGuest((prev) => {
        const existing = prev.find((l) => l.store_product_id === input.store_product_id);
        const nextQty = clampQty((existing?.qty ?? 0) + qty, input);
        let lines: GuestCartLine[];
        if (existing) {
          lines = prev.map((l) =>
            l.store_product_id === input.store_product_id ? { ...l, ...input, qty: nextQty } : l,
          );
        } else {
          lines = [...prev, { ...input, qty: nextQty }];
        }
        lines = lines.filter((l) => l.qty > 0);
        writeGuestCart(lines);
        return lines;
      });
      setOpen(true);
    },
    [token],
  );

  const updateQty = useCallback(
    async (storeProductId: string, qty: number) => {
      setError(null);
      if (token) {
        setBusy(true);
        try {
          setServer(await storeApi.updateCartItem(storeProductId, qty));
        } catch (e) {
          setError(e instanceof ApiError ? e.message : 'Could not update cart.');
        } finally {
          setBusy(false);
        }
        return;
      }
      setGuest((prev) => {
        let lines = prev.map((l) =>
          l.store_product_id === storeProductId ? { ...l, qty: clampQty(qty, l) } : l,
        );
        lines = lines.filter((l) => l.qty > 0);
        writeGuestCart(lines);
        return lines;
      });
    },
    [token],
  );

  const remove = useCallback(
    async (storeProductId: string) => {
      setError(null);
      if (token) {
        setBusy(true);
        try {
          setServer(await storeApi.removeCartItem(storeProductId));
        } catch (e) {
          setError(e instanceof ApiError ? e.message : 'Could not remove item.');
        } finally {
          setBusy(false);
        }
        return;
      }
      setGuest((prev) => {
        const lines = prev.filter((l) => l.store_product_id !== storeProductId);
        writeGuestCart(lines);
        return lines;
      });
    },
    [token],
  );

  const applyCoupon = useCallback(
    async (code: string) => {
      setError(null);
      if (!token) {
        setError('Please sign in to apply a coupon.');
        return;
      }
      setBusy(true);
      try {
        setServer(await storeApi.applyCoupon(code.trim().toUpperCase()));
      } catch (e) {
        setError(e instanceof ApiError ? e.message : 'Coupon could not be applied.');
      } finally {
        setBusy(false);
      }
    },
    [token],
  );

  const removeCoupon = useCallback(async () => {
    if (!token) return;
    setBusy(true);
    try {
      setServer(await storeApi.removeCoupon());
    } catch {
      /* ignore */
    } finally {
      setBusy(false);
    }
  }, [token]);

  const clearLocal = useCallback(() => {
    writeGuestCart([]);
    setGuest([]);
    setServer(null);
  }, []);

  const items = useMemo<CartLineDisplay[]>(
    () => (token && server ? serverToDisplay(server) : guestToDisplay(guest)),
    [token, server, guest],
  );

  const itemCount = useMemo(() => items.reduce((n, l) => n + l.qty, 0), [items]);

  const subtotalPaise = useMemo(
    () =>
      token && server
        ? server.subtotal_paise
        : items.reduce((n, l) => n + l.line_total_paise, 0),
    [token, server, items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotalPaise,
      couponCode: token && server ? (server.coupon_code ?? null) : null,
      couponDiscountPaise: token && server ? server.coupon_discount_paise : 0,
      notices: token && server ? (server.notices ?? []) : [],
      ready: ready && authReady,
      busy,
      error,
      isOpen,
      openCart,
      closeCart,
      add,
      updateQty,
      remove,
      applyCoupon,
      removeCoupon,
      refresh,
      clearLocal,
    }),
    [
      items,
      itemCount,
      subtotalPaise,
      token,
      server,
      ready,
      authReady,
      busy,
      error,
      isOpen,
      openCart,
      closeCart,
      add,
      updateQty,
      remove,
      applyCoupon,
      removeCoupon,
      refresh,
      clearLocal,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
