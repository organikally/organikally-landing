import type { ReactNode } from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';

// Policy pages — marketing chrome, quiet reading layout. Content lives per-page;
// legal facts that need founder confirmation are marked and tracked in
// MANUAL_STEPS.md (never invented).
export default function PoliciesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader forceSolid />
      <main id="main" className="min-h-dvh bg-paper pt-32 md:pt-40">
        <div className="mx-auto max-w-measure px-5 pb-28 md:px-0">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
