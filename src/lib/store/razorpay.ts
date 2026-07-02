'use client';

// Razorpay Standard Checkout client integration (STORE_CONTRACT §9). The server
// creates the order (amount = total_paise verbatim) and returns key_id + order_id;
// the client only opens checkout.js and forwards the handler result to verify.

const CHECKOUT_JS = 'https://checkout.razorpay.com/v1/checkout.js';

export type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export type RazorpayOptions = {
  key: string;
  amount: number; // integer paise, verbatim from the server order
  currency: string;
  order_id: string; // SERVER-created order id
  name: string;
  description?: string;
  image?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  handler?: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
};

type RazorpayInstance = {
  open: () => void;
  on: (event: string, handler: (response: unknown) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

let loading: Promise<boolean> | null = null;

export function loadRazorpay(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  if (loading) return loading;

  loading = new Promise<boolean>((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CHECKOUT_JS}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => resolve(false));
      if (window.Razorpay) resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = CHECKOUT_JS;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
  return loading;
}

export function openRazorpay(options: RazorpayOptions): boolean {
  if (typeof window === 'undefined' || !window.Razorpay) return false;
  const rzp = new window.Razorpay(options);
  rzp.open();
  return true;
}
