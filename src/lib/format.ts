export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Money is integer paise everywhere (STORE_CONTRACT §0.1). Display values are
// derived as paise/100. NEVER send a client-computed amount to the backend — the
// server total is authoritative; these helpers are display-only.
const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Integer paise → "₹320.00" (Indian grouping, 2 decimals). */
export function formatPaise(paise: number): string {
  return inr.format((paise ?? 0) / 100);
}

/** Integer paise → rupees number (display only). */
export function paiseToRupees(paise: number): number {
  return (paise ?? 0) / 100;
}

/** Bare INR rupee number → "₹320.00" (for the API's display fields). */
export function formatRupees(rupees: number): string {
  return inr.format(rupees ?? 0);
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
