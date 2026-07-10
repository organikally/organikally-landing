// Line-art icons for the Shop-by-Concern rail — same grammar as CategoryIcons:
// 2px rounded currentColor strokes, one warm-gold accent each, 48px viewBox.

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const ICONS: Record<string, () => React.ReactNode> = {
  // Kitchen scale with a leaf on the dial.
  'weight-management': () => (
    <>
      <path d="M10 18h28l-3 20a4 4 0 0 1-4 3.5H17A4 4 0 0 1 13 38L10 18Z" {...STROKE} />
      <path d="M16 18a8 8 0 0 1 16 0" {...STROKE} />
      <path d="M24 28v4M24 28l4-3" {...STROKE} />
      <circle cx="24" cy="33" r="1.6" fill="#F0B61A" />
    </>
  ),
  // Heart holding a mustard leaf.
  'heart-health': () => (
    <>
      <path
        d="M24 40C15 33 8 27.5 8 19.5A8 8 0 0 1 24 15a8 8 0 0 1 16 4.5C40 27.5 33 33 24 40Z"
        {...STROKE}
      />
      <path d="M24 30c0-5 2.5-8 7-9-1 5-3 8-7 9Z" {...STROKE} fill="#F0B61A" fillOpacity="0.35" />
    </>
  ),
  // Sugar-drop with a check.
  'diabetes-friendly': () => (
    <>
      <path d="M24 7c7 8.5 11 14 11 20a11 11 0 0 1-22 0c0-6 4-11.5 11-20Z" {...STROKE} />
      <path d="M19 27.5l3.5 3.5 6.5-7" {...STROKE} />
      <circle cx="35" cy="12" r="2" fill="#F0B61A" />
    </>
  ),
  // Bone with a strength spark.
  'bone-muscle': () => (
    <>
      <path
        d="M17 31 31 17a4.5 4.5 0 1 1 6-6 4.5 4.5 0 1 1-6 6M17 31a4.5 4.5 0 1 0-6 6 4.5 4.5 0 1 0 6 6 4.5 4.5 0 1 0 6-6 4.5 4.5 0 1 0-6-6Z"
        {...STROKE}
      />
      <path d="M36 30l-3 5h5l-3 5" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  // Battery refilling.
  'low-energy': () => (
    <>
      <rect x="12" y="12" width="20" height="30" rx="4" {...STROKE} />
      <path d="M18 8h8" {...STROKE} />
      <path d="M23 20l-4 8h6l-4 8" {...STROKE} />
      <path d="M36 20v8M32 24h8" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ),
  // Gut coil, moving well.
  'digestion': () => (
    <>
      <path
        d="M14 10h12a8 8 0 0 1 0 16H20a7 7 0 0 0 0 14h14"
        {...STROKE}
      />
      <path d="M34 36l4 4-4 4" {...STROKE} />
      <circle cx="14" cy="10" r="2" fill="#F0B61A" />
    </>
  ),
  // Settled pot — steam rising gently.
  'acidity-bloating': () => (
    <>
      <path d="M12 24h24v6a10 10 0 0 1-10 10h-4a10 10 0 0 1-10-10v-6Z" {...STROKE} />
      <path d="M10 24h28" {...STROKE} />
      <path d="M20 17c0-2.5 1.5-3 1.5-5M27 17c0-2.5 1.5-3 1.5-5" {...STROKE} />
      <circle cx="24" cy="31" r="1.8" fill="#F0B61A" />
    </>
  ),
};

export function ConcernIcon({ concernKey, className }: { concernKey: string; className?: string }) {
  const Icon = ICONS[concernKey];
  if (!Icon) return null;
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <Icon />
    </svg>
  );
}
