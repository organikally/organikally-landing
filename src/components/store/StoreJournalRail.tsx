import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Media from '@/components/ui/Media';
import { posts } from '@/content/blog/posts';
import { formatDate } from '@/lib/format';

// Closing editorial rail — the three latest journal posts, mirroring the
// marketing site's content so the store ends on the brand's voice, not a hard
// sell. Server-rendered from the same posts source as /journal.
export default function StoreJournalRail() {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  if (latest.length === 0) return null;
  return (
    <section className="mt-16 md:mt-24" aria-label="From the journal">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Worth a read</p>
          <h2 className="mt-3 font-display text-2xl text-ink md:text-3xl">From the journal</h2>
        </div>
        <Link
          href="/journal/"
          className="group hidden shrink-0 items-center gap-1.5 pb-1 text-sm font-semibold text-forest transition-colors hover:text-forest-deep sm:inline-flex"
        >
          All posts
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {latest.map((post) => (
          <article key={post.slug} className="w-[80%] shrink-0 snap-start md:w-auto">
            <Link
              href={`/journal/${post.slug}/`}
              className="group block overflow-hidden rounded-card border border-line bg-paper shadow-sm transition duration-300 ease-brand hover:-translate-y-1 hover:shadow-md"
            >
              <Media
                name={post.cover}
                alt={post.coverAlt}
                width={1300}
                height={866}
                className="aspect-[3/2] w-full"
                imgClassName="transition-transform duration-500 ease-brand group-hover:scale-[1.03]"
                sizes="(min-width: 768px) 24rem, 80vw"
              />
              <div className="p-5">
                <p className="text-xs font-medium text-ink-faint">
                  {formatDate(post.date)} · {post.readingMinutes} min read
                </p>
                <h3 className="mt-2 font-display text-lg leading-snug text-ink transition-colors group-hover:text-yellow-ink">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
