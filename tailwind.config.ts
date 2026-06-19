import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: 'var(--cream)', deep: 'var(--cream-deep)' },
        forest: 'var(--forest)',
        green: { DEFAULT: 'var(--green)', 700: 'var(--green-700)' },
        gold: { DEFAULT: 'var(--gold)', bright: 'var(--gold-bright)', ink: 'var(--gold-ink)' },
        mustard: 'var(--mustard)',
        charcoal: { DEFAULT: 'var(--charcoal)', 60: 'var(--charcoal-60)' },
        line: 'var(--line)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        deva: ['var(--font-deva)', 'serif'],
      },
      maxWidth: { container: '1200px' },
      letterSpacing: { eyebrow: '0.16em' },
      boxShadow: {
        sm: '0 1px 2px rgba(31,27,18,.06)',
        md: '0 8px 24px -10px rgba(31,27,18,.14)',
        lg: '0 24px 60px -24px rgba(14,59,20,.22)',
      },
      transitionTimingFunction: { brand: 'cubic-bezier(.16,1,.3,1)' },
    },
  },
  plugins: [],
};

export default config;
