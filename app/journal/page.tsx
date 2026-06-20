import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { posts } from '@/content/blog/posts';
import { formatDate } from '@/lib/format';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Notes from the Organikally kitchen — cold-pressed vs refined oil, spotting genuinely organic staples, and how to cook with mustard oil.',
  alternates: { canonical: '/journal/' },
};

export default function JournalIndex() {
  const all = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Journal', path: '/journal/' },
        ])}
      />
      <SiteHeader forceSolid />
      <main id="main" className="grain min-h-dvh bg-cream pt-28 md:pt-36">
        <div className="mx-auto max-w-container px-6 pb-24 md:px-10">
          <p className="eyebrow">The journal</p>
          <h1 className="mt-3 max-w-2xl font-serif text-5xl font-semibold text-forest">
            Knowing your oil is part of trusting it.
          </h1>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {all.map((p) => (
              <Link
                key={p.slug}
                href={`/journal/${p.slug}/`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-cream-deep/50 p-7 shadow-sm transition duration-200 ease-brand hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm text-charcoal-60">
                  {formatDate(p.date)} · {p.readingMinutes} min read
                </p>
                <h2 className="mt-3 font-serif text-2xl font-semibold text-forest">{p.title}</h2>
                <p className="mt-3 flex-1 text-charcoal-60">{p.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1 font-semibold text-gold-ink">
                  Read <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
