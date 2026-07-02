'use client';

import { Minus, Plus } from 'lucide-react';

// Accessible quantity stepper, clamped to [min, max]. The max is advisory (live
// stock / max_qty_per_order); the backend re-clamps at cart + checkout (§5.3/§5.5).
export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max,
  disabled = false,
  size = 'md',
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number | null;
  disabled?: boolean;
  size?: 'sm' | 'md';
}) {
  const cap = max ?? Infinity;
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(cap, value + 1));
  const btn =
    size === 'sm'
      ? 'h-8 w-8'
      : 'h-10 w-10';
  const iconCls = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';

  return (
    <div
      className="inline-flex items-center rounded-full border border-line bg-paper"
      role="group"
      aria-label="Quantity"
    >
      <button
        type="button"
        onClick={dec}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
        className={`flex ${btn} items-center justify-center rounded-full text-ink transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <Minus className={iconCls} />
      </button>
      <span className="tnum min-w-8 text-center text-sm font-semibold text-ink" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={disabled || value >= cap}
        aria-label="Increase quantity"
        className={`flex ${btn} items-center justify-center rounded-full text-ink transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <Plus className={iconCls} />
      </button>
    </div>
  );
}
