import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Media from '@/components/ui/Media';
import { posts } from '@/content/blog/posts';
import { formatDate } from '@/lib/format';

export default function JournalTeaser() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;
  if (!featured) return null;
  // The landing only previews the latest few; the full archive lives on /journal.
  const preview = rest.slice(0, 3);

  return (
    <section id="journal" className="relative z-10 py-16 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <h2 className="t-title font-semibold text-ink">
            Worth a <span className="italic">read.</span>
          </h2>
          <Link
            href="/journal/"
            className="group hidden shrink-0 items-center gap-1.5 font-semibold text-yellow-ink transition hover:text-ink md:inline-flex"
          >
            All posts
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-12 border-t border-line">
          <Reveal>
            <li>
              <Link
                href={`/journal/${featured.slug}/`}
                className="group grid gap-5 border-b border-line py-8 md:grid-cols-[1.35fr_1fr] md:items-center md:gap-10 md:py-10"
              >
                <Media
                  name={featured.cover}
                  alt=""
                  width={1300}
                  height={866}
                  className="order-1 aspect-[16/9] w-full rounded-media shadow-sm md:order-2 md:aspect-[3/2]"
                  sizes="(min-width: 768px) 26rem, 100vw"
                />
                <div className="order-2 max-w-3xl md:order-1">
                  <p className="tnum text-sm font-medium text-yellow-ink">
                    {formatDate(featured.date)} · {featured.readingMinutes} min read
                  </p>
                  <h3 className="t-subtitle mt-3 font-semibold leading-[1.1] text-ink transition-colors duration-300 group-hover:text-yellow-ink md:text-[2.3rem]">
                    {featured.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-yellow-ink">
                    Read article
                    <ArrowUpRight
                      className="h-4 w-4 transition-all duration-300 ease-brand group-hover:-translate-y-1 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </li>
          </Reveal>

          {preview.map((p, i) => (
            <Reveal key={p.slug} delay={(i + 1) * 70}>
              <li>
                <Link
                  href={`/journal/${p.slug}/`}
                  className="group flex items-center justify-between gap-6 border-b border-line py-6"
                >
                  <div>
                    <p className="tnum text-sm text-ink-faint">
                      {formatDate(p.date)} · {p.readingMinutes} min read
                    </p>
                    <h3 className="mt-2 text-xl font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-yellow-ink md:text-2xl">
                      {p.title}
                    </h3>
                  </div>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-ink-faint opacity-0 transition-all duration-300 ease-brand group-hover:translate-x-1 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>

        {/* The desktop "All posts" link lives by the heading; on mobile it would be
            off-screen, so repeat it under the list where the thumb lands. */}
        <Link
          href="/journal/"
          className="group mt-8 inline-flex items-center gap-1.5 font-semibold text-yellow-ink transition hover:text-ink md:hidden"
        >
          All posts
          <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
