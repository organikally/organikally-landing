// "Not all mustard oil is the same" — a warm, honest comparison of ordinary refined
// oil vs Organikaly cold-pressed. Rows stay to process / sensory / source contrasts
// (HOMELY_REFACTOR §3b + §5): no medical claims, no "toxic"/scare copy, no brand names.
// `left` describes ordinary commodity oil, `right` describes Organikaly.

export type CompareRow = {
  /** the axis being compared (process / sensory / source) */
  aspect: string;
  left: string;
  right: string;
};

export const compareLabels = {
  left: 'Ordinary refined oil',
  right: 'Organikaly cold-pressed',
} as const;

export const compareRows: CompareRow[] = [
  {
    aspect: 'How it’s made',
    left: 'Refined with heat and solvents to push out more oil, faster.',
    right: 'Cold-pressed slow in a kachi ghani — no added heat, no solvents.',
  },
  {
    aspect: 'Aroma & colour',
    left: 'Natural aroma and golden colour stripped away in refining.',
    right: 'Natural pungency and golden colour kept, just as the seed gives them.',
  },
  {
    aspect: 'Where it’s from',
    left: 'Often blended from many sources, with no press date on the pack.',
    right: 'Single-source and press-dated, so you know exactly when it was made.',
  },
  {
    aspect: 'What stays in',
    left: 'Refined, so much of what the seed carries is taken out.',
    right: 'Unrefined — nothing refined out, from organically grown seed.',
  },
];
