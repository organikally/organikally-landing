import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: 'rgb(var(--cream) / <alpha-value>)',
          deep: 'rgb(var(--cream-deep) / <alpha-value>)',
        },
        forest: 'rgb(var(--forest) / <alpha-value>)',
        green: {
          DEFAULT: 'rgb(var(--green) / <alpha-value>)',
          700: 'rgb(var(--green-700) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'rgb(var(--gold) / <alpha-value>)',
          bright: 'rgb(var(--gold-bright) / <alpha-value>)',
          ink: 'rgb(var(--gold-ink) / <alpha-value>)',
        },
        mustard: 'rgb(var(--mustard) / <alpha-value>)',
        charcoal: {
          DEFAULT: 'rgb(var(--charcoal) / <alpha-value>)',
          60: 'rgb(var(--charcoal-60) / <alpha-value>)',
        },
        line: 'rgb(var(--line) / <alpha-value>)',
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
