import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import PostBody from '@/components/blog/PostBody';
import JsonLd from '@/components/seo/JsonLd';
import Cta from '@/components/ui/Cta';
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
      <main id="main" className="grain min-h-dvh bg-cream pt-28 md:pt-36">
        <article className="mx-auto max-w-2xl px-6 pb-24 md:px-10">
          <Link
            href="/journal/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-ink hover:text-forest"
          >
            <ArrowLeft className="h-4 w-4" /> Journal
          </Link>
          <p className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="eyebrow">
                {t}
              </span>
            ))}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-forest md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-charcoal-60">
            {post.author} · {formatDate(post.date)} · {post.readingMinutes} min read
          </p>
          <hr className="my-10 border-line" />
          <PostBody blocks={post.body} />

          <div className="mt-14 rounded-2xl border border-line bg-cream-deep/60 p-8 text-center">
            <p className="font-serif text-2xl font-semibold text-forest">
              Taste the difference for yourself.
            </p>
            <Cta href={whatsapp()} variant="primary" whatsapp external className="mt-5">
              Order on WhatsApp
            </Cta>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
