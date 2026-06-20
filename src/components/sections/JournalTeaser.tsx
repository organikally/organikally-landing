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
          <h2 className="font-serif text-[clamp(2.1rem,4.6vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
            Worth a <span className="italic">read.</span>
          </h2>
          <Link
            href="/journal/"
            className="group hidden shrink-0 items-center gap-1.5 font-semibold text-yellow-ink transition hover:text-ink md:inline-flex"
          >
            All posts
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Reveal>
            <Link
              href={`/journal/${featured.slug}/`}
              className="group glass-strong flex h-full flex-col justify-between gap-10 rounded-[1.9rem] p-8 transition duration-300 ease-brand hover:-translate-y-1 md:p-10"
            >
              <p className="tnum text-sm font-medium text-yellow-ink">
                {formatDate(featured.date)} · {featured.readingMinutes} min read
              </p>
              <div className="flex items-end justify-between gap-6">
                <h3 className="font-serif text-3xl font-semibold leading-[1.08] text-ink md:text-[2.6rem]">
                  {featured.title}
                </h3>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="grid gap-4">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i + 1) * 80}>
                <Link
                  href={`/journal/${p.slug}/`}
                  className="group glass flex h-full flex-col justify-between gap-4 rounded-[1.9rem] p-7 transition duration-300 ease-brand hover:-translate-y-1"
                >
                  <p className="tnum text-sm text-ink-muted">
                    {formatDate(p.date)} · {p.readingMinutes} min read
                  </p>
                  <h3 className="flex items-center justify-between gap-3 font-serif text-2xl font-semibold leading-snug text-ink">
                    {p.title}
                    <ArrowUpRight
                      className="h-5 w-5 shrink-0 text-yellow-ink opacity-0 transition duration-300 group-hover:opacity-100"
                      aria-hidden="true"
                    />
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
