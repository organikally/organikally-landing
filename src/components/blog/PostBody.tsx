import Link from 'next/link';
import type { Block } from '@/content/blog/types';

/** Internal (site-relative) hrefs use next/link; external open in a new tab. */
function BodyLink({ href, label }: { href: string; label: string }) {
  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-yellow-ink underline-offset-2 hover:underline">
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className="font-semibold text-yellow-ink underline-offset-2 hover:underline">
      {label}
    </Link>
  );
}

export default function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return (
              <h2 key={i} className="pt-4 text-3xl font-semibold text-ink">
                {b.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="pt-2 text-2xl font-semibold text-ink">
                {b.text}
              </h3>
            );
          case 'ul':
            return (
              <ul key={i} className="space-y-2.5 pl-1">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-lg leading-relaxed text-ink">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-deep" />
                    {it}
                  </li>
                ))}
              </ul>
            );
          case 'quote':
            return (
              <blockquote
                key={i}
                className="my-4 text-[1.6rem] italic leading-snug tracking-[-0.01em] text-ink"
              >
                {b.text}
              </blockquote>
            );
          case 'faq':
            return (
              <div key={i} className="my-4 space-y-5 rounded-card border border-line bg-surface p-6 md:p-8">
                {b.items.map((it, j) => (
                  <div key={j} className="border-b border-line pb-5 last:border-0 last:pb-0">
                    <p className="text-lg font-semibold text-ink">{it.q}</p>
                    <p className="mt-2 leading-relaxed text-ink-muted">{it.a}</p>
                  </div>
                ))}
              </div>
            );
          case 'links':
            return (
              <div key={i} className="my-4 rounded-card border border-line bg-surface p-6 md:p-7">
                {b.heading && (
                  <p className="text-sm font-semibold uppercase tracking-wide text-yellow-ink">
                    {b.heading}
                  </p>
                )}
                <ul className="mt-3 space-y-2">
                  {b.items.map((it, j) => (
                    <li key={j} className="flex gap-3 leading-relaxed text-ink">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-deep" />
                      <BodyLink href={it.href} label={it.label} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          default:
            return (
              <p key={i} className="text-lg leading-relaxed text-ink">
                {b.text}
              </p>
            );
        }
      })}
    </div>
  );
}
