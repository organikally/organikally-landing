import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import PostBody from '@/components/blog/PostBody';
import Media from '@/components/ui/Media';
import JsonLd from '@/components/seo/JsonLd';
import { posts, getPost } from '@/content/blog/posts';
import { formatDate } from '@/lib/format';
import { articleSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import { whatsapp } from '@/lib/site';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}/` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: `/media/${post.cover}.jpg`, width: 1300, height: 866, alt: post.coverAlt }],
    },
  };
}

export default async function JournalPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Per-post FAQPage from any `faq` blocks (entity/AEO signal; mirrors visible text).
  const faqItems = post.body.flatMap((b) => (b.type === 'faq' ? b.items : []));

  return (
    <>
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Journal', path: '/journal/' },
            { name: post.title, path: `/journal/${post.slug}/` },
          ]),
          ...(faqItems.length ? [faqPageSchema(faqItems)] : []),
        ]}
      />
      <SiteHeader forceSolid />
      <main id="main" className="min-h-dvh bg-paper pt-32 md:pt-40">
        <article className="mx-auto max-w-2xl px-5 pb-24 md:px-10">
          <Link
            href="/journal/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-yellow-ink hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Journal
          </Link>
          <p className="mt-8 flex flex-wrap gap-x-3 gap-y-1 text-sm font-medium text-yellow-ink">
            {post.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </p>
          <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.4rem)] font-semibold leading-tight text-ink">
            {post.title}
          </h1>
          <p className="mt-4 text-ink-muted">
            {post.author} · {formatDate(post.date)} · {post.readingMinutes} min read
            {post.updated && post.updated !== post.date && (
              <span className="text-ink-faint"> · Updated {formatDate(post.updated)}</span>
            )}
          </p>
          <Media
            name={post.cover}
            alt={post.coverAlt}
            width={1300}
            height={866}
            eager
            className="mt-8 aspect-[3/2] w-full rounded-media shadow-media"
            sizes="(min-width: 768px) 42rem, 100vw"
          />
          <hr className="my-10 border-line" />
          <PostBody blocks={post.body} />

          {post.sources && post.sources.length > 0 && (
            <section className="mt-14 border-t border-line pt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-faint">
                Sources
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                {post.sources.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-ink-faint tnum">{i + 1}.</span>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-ink underline-offset-2 hover:underline"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-ink-faint">
                This article is general information about food and traditional use, not medical
                advice. For any health concern, consult a qualified doctor or dietitian.
              </p>
            </section>
          )}

          <div className="mt-16 overflow-hidden rounded-card bg-ink p-8 text-center shadow-panel md:p-10">
            <p className="text-2xl font-semibold text-paper">
              Taste the difference for yourself.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href={whatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-yellow px-7 py-3.5 font-semibold text-ink transition duration-300 ease-brand hover:bg-yellow-deep"
              >
                Order on WhatsApp
              </a>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
