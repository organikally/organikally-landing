import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';

// Branded 404 — a dead link should land somewhere warm, with routes back into
// the store instead of a bare error screen.
export default function NotFound() {
  return (
    <>
      <SiteHeader forceSolid />
      <main id="main" className="flex min-h-dvh flex-col items-center justify-center bg-paper px-5 py-40 text-center">
        <p className="eyebrow justify-center">Nothing on this shelf</p>
        <h1 className="t-headline mt-6 max-w-xl font-semibold text-ink">
          This page seems to have wandered off to the fields.
        </h1>
        <p className="t-lead mx-auto mt-4 max-w-md">
          The link may be old, or the page has moved. The pantry, though, is right where you left
          it.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link
            href="/store/"
            className="inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-3 text-[0.95rem] font-semibold text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition duration-300 ease-brand hover:-translate-y-[2px] hover:bg-yellow-deep"
          >
            Browse the store
          </Link>
          <Link
            href="/recipes/"
            className="group inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-forest transition-colors hover:text-forest-deep"
          >
            Or read a recipe
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
