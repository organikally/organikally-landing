import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import Media from '@/components/ui/Media';
import JsonLd from '@/components/seo/JsonLd';
import { posts } from '@/content/blog/posts';
import { formatDate } from '@/lib/format';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Notes from the Organikaly kitchen, on cold-pressed vs refined oil, spotting genuinely organic staples, and how to cook with mustard oil.',
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
        <div className="mx-auto max-w-container px-5 pb-28 md:px-10">
          <p className="eyebrow">The journal</p>
          <h1 className="t-headline mt-6 max-w-2xl font-semibold text-ink">
            Knowing your oil is part of trusting it.
          </h1>

          {/* Editorial contents list, hairline-separated rows. */}
          <ul className="mt-16 border-t border-line">
            {all.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/journal/${p.slug}/`}
                  className="group grid gap-x-8 gap-y-4 border-b border-line py-8 md:grid-cols-[16rem_1fr] md:items-center md:py-10"
                >
                  <Media
                    name={p.cover}
                    alt=""
                    width={1300}
                    height={866}
                    className="aspect-[3/2] w-full rounded-media shadow-sm"
                    sizes="(min-width: 768px) 16rem, 100vw"
                  />
                  <div className="flex flex-col">
                    <div className="max-w-2xl">
                      <p className="tnum text-sm text-ink-faint">
                        {formatDate(p.date)} · {p.readingMinutes} min read
                      </p>
                      <h2 className="t-subtitle mt-2.5 font-semibold text-ink transition-colors duration-300 group-hover:text-yellow-ink">
                        {p.title}
                      </h2>
                      <p className="mt-2 leading-relaxed text-ink-muted">{p.excerpt}</p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-yellow-ink">
                      Read
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
