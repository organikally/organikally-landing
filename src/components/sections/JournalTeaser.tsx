import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { posts } from '@/content/blog/posts';
import { formatDate } from '@/lib/format';

export default function JournalTeaser() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;
  if (!featured) return null;

  return (
    <section id="journal" className="relative z-10 py-24 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.05]">
            Worth a read.
          </h2>
          <Link
            href="/journal/"
            className="hidden shrink-0 items-center gap-1 font-semibold text-yellow-ink hover:text-ink md:inline-flex"
          >
            All posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Reveal>
            <Link
              href={`/journal/${featured.slug}/`}
              className="group flex h-full flex-col justify-between gap-8 rounded-[1.75rem] bg-yellow p-8 transition duration-300 ease-brand hover:-translate-y-1 md:p-10"
            >
              <p className="text-sm font-medium text-ink/70">
                {formatDate(featured.date)} · {featured.readingMinutes} min read
              </p>
              <div>
                <h3 className="font-serif text-3xl font-semibold leading-tight text-ink md:text-4xl">
                  {featured.title}
                </h3>
                <span className="mt-5 inline-flex items-center gap-1 font-semibold text-ink">
                  Read the piece
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="grid gap-4">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i + 1) * 80}>
                <Link
                  href={`/journal/${p.slug}/`}
                  className="group glass flex h-full flex-col justify-between gap-4 rounded-[1.75rem] p-7 transition duration-300 ease-brand hover:-translate-y-1"
                >
                  <p className="text-sm text-ink-muted">
                    {formatDate(p.date)} · {p.readingMinutes} min read
                  </p>
                  <h3 className="font-serif text-2xl font-semibold leading-snug text-ink">
                    {p.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
