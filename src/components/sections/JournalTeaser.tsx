import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import { posts } from '@/content/blog/posts';
import { formatDate } from '@/lib/format';

export default function JournalTeaser() {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return (
    <section id="journal" className="grain relative z-10 bg-cream-deep py-28 md:py-36">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <SectionHeader
            eyebrow="The journal"
            title="Knowing your oil is part of trusting it."
          />
          <Link
            href="/journal/"
            className="hidden shrink-0 items-center gap-1 font-semibold text-gold-ink hover:text-forest md:inline-flex"
          >
            All posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {latest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <Link
                href={`/journal/${p.slug}/`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-cream p-7 shadow-sm transition duration-200 ease-brand hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm text-charcoal-60">
                  {formatDate(p.date)} · {p.readingMinutes} min read
                </p>
                <h3 className="mt-3 flex-1 font-serif text-2xl font-semibold text-forest">
                  {p.title}
                </h3>
                <span className="mt-5 inline-flex items-center gap-1 font-semibold text-gold-ink">
                  Read <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
