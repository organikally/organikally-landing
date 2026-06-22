import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        yellow: {
          DEFAULT: 'rgb(var(--yellow) / <alpha-value>)',
          deep: 'rgb(var(--yellow-deep) / <alpha-value>)',
          ink: 'rgb(var(--gold-ink) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          muted: 'rgb(var(--ink-muted) / <alpha-value>)',
          faint: 'rgb(var(--ink-faint) / <alpha-value>)',
        },
        line: 'rgb(var(--line) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        deva: ['var(--font-deva)', 'serif'],
      },
      maxWidth: { container: '1200px', measure: '65ch' },
      letterSpacing: { eyebrow: '0.16em' },
      // One radius scale (shape-consistency lock): media + cards share `card`,
      // small chips use `chip`, interactive pills are fully round.
      borderRadius: { chip: '0.625rem', media: '1.25rem', card: '1.5rem' },
      // Elevation scale, warm-tinted, soft. No decorative glow.
      boxShadow: {
        sm: '0 1px 2px rgba(31,27,18,.06)',
        md: '0 8px 24px -10px rgba(31,27,18,.14)',
        lg: '0 24px 60px -24px rgba(31,27,18,.22)',
        media: '0 36px 70px -44px rgba(28,25,18,.55)',
        panel: '0 44px 90px -52px rgba(28,25,18,.55)',
      },
      transitionTimingFunction: { brand: 'cubic-bezier(.16,1,.3,1)' },
    },
  },
  plugins: [],
};

export default config;
