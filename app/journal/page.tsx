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
    'Notes from the Organikally kitchen, on cold-pressed vs refined oil, spotting genuinely organic staples, and how to cook with mustard oil.',
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
      <main id="main" className="min-h-dvh bg-paper pt-32 md:pt-40">
        <div className="mx-auto max-w-container px-5 pb-24 md:px-10">
          <p className="eyebrow">The journal</p>
          <h1 className="mt-3 max-w-2xl font-serif text-[clamp(2.6rem,6vw,4.4rem)] font-semibold leading-[1.04]">
            Knowing your oil is part of trusting it.
          </h1>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {all.map((p) => (
              <Link
                key={p.slug}
                href={`/journal/${p.slug}/`}
                className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition duration-300 ease-brand hover:-translate-y-1 hover:border-yellow"
              >
                <p className="text-sm text-ink-muted">
                  {formatDate(p.date)} · {p.readingMinutes} min read
                </p>
                <h2 className="mt-3 font-serif text-2xl font-semibold text-ink">{p.title}</h2>
                <p className="mt-3 flex-1 text-ink-muted">{p.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1 font-semibold text-yellow-ink">
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
