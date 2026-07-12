import type { ReactNode } from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';

// Shared chrome for the standalone marketing pages (About, Process, Wholesale,
// Careers, and the rest). One place owns the header/main/footer frame so every
// page clears the fixed header identically and reads as one site. Page content
// goes inside a `<Section>` (padded, max-width container).
export default function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader forceSolid />
      <main id="main" className="min-h-dvh bg-paper pt-28 md:pt-36">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

// A padded, centred content band. `tone="surface"` swaps to the one raised well.
export function Section({
  children,
  className = '',
  tone = 'paper',
  width = 'container',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'paper' | 'surface' | 'forest';
  width?: 'container' | 'measure';
}) {
  const bg =
    tone === 'surface' ? 'bg-surface' : tone === 'forest' ? 'bg-forest-deep text-cream' : '';
  const max = width === 'measure' ? 'max-w-measure' : 'max-w-container';
  return (
    <section className={`${bg} ${className}`}>
      <div className={`mx-auto ${max} px-5 md:px-10`}>{children}</div>
    </section>
  );
}

// The standard page opener: eyebrow, headline, one lead sentence. Left-aligned
// by default (editorial), optionally centred.
export function PageHero({
  eyebrow,
  title,
  lead,
  align = 'left',
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  children?: ReactNode;
}) {
  const center = align === 'center';
  return (
    <header className={`pt-6 md:pt-10 ${center ? 'text-center' : ''}`}>
      <p className={`eyebrow ${center ? 'justify-center' : ''}`}>{eyebrow}</p>
      <h1
        className={`t-headline mt-5 font-semibold text-ink ${
          center ? 'mx-auto max-w-3xl' : 'max-w-3xl'
        }`}
      >
        {title}
      </h1>
      {lead && (
        <p className={`t-lead mt-5 ${center ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>{lead}</p>
      )}
      {children}
    </header>
  );
}
