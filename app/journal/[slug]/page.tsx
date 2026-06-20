import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import PostBody from '@/components/blog/PostBody';
import JsonLd from '@/components/seo/JsonLd';
import { posts, getPost } from '@/content/blog/posts';
import { formatDate } from '@/lib/format';
import { articleSchema, breadcrumbSchema } from '@/lib/schema';
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
    },
  };
}

export default async function JournalPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

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
          <h1 className="mt-3 font-serif text-[clamp(2.2rem,5vw,3.4rem)] font-semibold leading-tight text-ink">
            {post.title}
          </h1>
          <p className="mt-4 text-ink-muted">
            {post.author} · {formatDate(post.date)} · {post.readingMinutes} min read
          </p>
          <hr className="my-10 border-line" />
          <PostBody blocks={post.body} />

          <div className="mt-14 rounded-3xl bg-yellow p-8 text-center md:p-10">
            <p className="font-serif text-2xl font-semibold text-ink">
              Taste the difference for yourself.
            </p>
            <div className="mt-5 flex justify-center">
              <a
                href={whatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-semibold text-paper transition hover:opacity-90"
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
