// Line-art icons for the category rail — Indian-kitchen vernacular objects drawn
// in one grammar: 2px rounded currentColor strokes, one warm-gold accent each.
// Motifs: corked oil bottle with a falling drop · thali heaped with dal · stacked
// jaggery blocks · bellied ghee pot with a dipped spoon · barni achaar jar ·
// masala dabba · flour sack with a wheat ear · a browse-all grid.
// Keys match the live catalog's category keys exactly (they are the labels).

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function Fallback() {
  return (
    <>
      <circle cx="24" cy="24" r="16" {...STROKE} />
      <circle cx="24" cy="24" r="3" fill="#F0B61A" />
    </>
  );
}

const ICONS: Record<string, () => React.ReactNode> = {
  // Corked bottle, a single gold drop of oil falling inside.
  Oils: () => (
    <>
      <path d="M19 6H29" {...STROKE} />
      <path
        d="M21 6V13.5C21 15.5 14 18.5 14 24.5V37A4 4 0 0 0 18 41H30A4 4 0 0 0 34 37V24.5C34 18.5 27 15.5 27 13.5V6"
        {...STROKE}
      />
      <path
        d="M24 24.5C21.8 27.2 21.2 28.4 21.2 29.9A2.8 2.8 0 0 0 26.8 29.9C26.8 28.4 26.2 27.2 24 24.5Z"
        fill="#F0B61A"
        fillOpacity="0.9"
      />
    </>
  ),
  // Thali with a heaped dal mound and whole grains on top.
  Pulses: () => (
    <>
      <path d="M8 24H40A16 11 0 0 1 8 24" {...STROKE} />
      <path d="M19 39H29" {...STROKE} />
      <path d="M13 24A12 12 0 0 1 35 24" {...STROKE} fill="#F0B61A" fillOpacity="0.3" />
      <circle cx="19.5" cy="20.5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="24" cy="18" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="28.5" cy="20.5" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  // Stacked jaggery blocks, the top one warm gold.
  Sweeteners: () => (
    <>
      <rect x="9" y="26" width="13" height="12" rx="2" {...STROKE} />
      <rect x="26" y="26" width="13" height="12" rx="2" {...STROKE} />
      <rect x="17.5" y="11" width="13" height="12" rx="2" {...STROKE} fill="#F0B61A" fillOpacity="0.3" />
    </>
  ),
  // Bellied ghee pot, spoon dipped in, a gold drop of ghee at the lip.
  'Ghee & Honey': () => (
    <>
      <path d="M16 18C12 20 10 24 10 29A14 11 0 0 0 38 29C38 24 36 20 32 18" {...STROKE} />
      <path d="M15 18H33" {...STROKE} />
      <path d="M26 24L33 10" {...STROKE} />
      <circle cx="33.8" cy="8" r="2" {...STROKE} />
      <path
        d="M20 24.5C18.2 26.6 17.8 27.7 17.8 28.9A2.2 2.2 0 0 0 22.2 28.9C22.2 27.7 21.8 26.6 20 24.5Z"
        fill="#F0B61A"
        fillOpacity="0.9"
      />
    </>
  ),
  // Barni — the wide-shouldered achaar jar with brine and a mango piece.
  'Pickles & Preserves': () => (
    <>
      <rect x="16" y="6" width="16" height="5" rx="2.5" {...STROKE} />
      <path d="M17 11C11.5 13 9 16.5 9 21V34A5 5 0 0 0 14 39H34A5 5 0 0 0 39 34V21C39 16.5 36.5 13 31 11" {...STROKE} />
      <path d="M9 21H39" {...STROKE} />
      <circle cx="23" cy="30" r="3" fill="#F0B61A" fillOpacity="0.9" />
      <path d="M16.5 27.5H16.51M30.5 28H30.51M28 33H28.01" {...STROKE} />
    </>
  ),
  // Masala dabba — round tin, katoris inside, a pinch taken from the middle.
  'Spices & Masala': () => (
    <>
      <circle cx="24" cy="24" r="17.5" {...STROKE} />
      <circle cx="24" cy="15" r="4.6" {...STROKE} fill="#F0B61A" fillOpacity="0.45" />
      <circle cx="15.4" cy="29.4" r="4.6" {...STROKE} />
      <circle cx="32.6" cy="29.4" r="4.6" {...STROKE} />
      <circle cx="24" cy="24.5" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  // Cinched flour sack with a wheat ear, one gold grain at its tip.
  'Grains & Flours': () => (
    <>
      <path d="M17 13C12 16.5 10 22 10 28V34A5 5 0 0 0 15 39H33A5 5 0 0 0 38 34V28C38 22 36 16.5 31 13" {...STROKE} />
      <path d="M16 13H32" {...STROKE} />
      <path d="M17 13C15.2 11 14.2 8.8 14.5 6.5" {...STROKE} />
      <path d="M31 13C32.8 11 33.8 8.8 33.5 6.5" {...STROKE} />
      <path d="M24 24V35" {...STROKE} />
      <path d="M24 28.5L20.5 25.9M24 28.5L27.5 25.9M24 33L20.5 30.4M24 33L27.5 30.4" {...STROKE} />
      <path
        d="M24 17C25.2 18.2 25.8 19.3 25.8 20.5C25.8 21.7 25.2 22.8 24 24C22.8 22.8 22.2 21.7 22.2 20.5C22.2 19.3 22.8 18.2 24 17Z"
        fill="#F0B61A"
        fillOpacity="0.9"
      />
    </>
  ),
  // Browse everything — a 2×2 of aisles, one filled warm.
  All: () => (
    <>
      <rect x="9" y="9" width="13" height="13" rx="4" {...STROKE} />
      <rect x="26" y="9" width="13" height="13" rx="4" {...STROKE} />
      <rect x="9" y="26" width="13" height="13" rx="4" {...STROKE} />
      <circle cx="32.5" cy="32.5" r="6.5" {...STROKE} fill="#F0B61A" fillOpacity="0.35" />
    </>
  ),
};

export function CategoryIcon({
  categoryKey,
  className,
}: {
  categoryKey: string;
  className?: string;
}) {
  const Icon = ICONS[categoryKey] ?? Fallback;
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <Icon />
    </svg>
  );
}
