import type { Block } from '@/content/blog/types';

export default function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return (
              <h2 key={i} className="pt-4 font-serif text-3xl font-semibold text-ink">
                {b.text}
              </h2>
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
                className="border-l-2 border-yellow py-1 pl-5 font-serif text-2xl leading-snug text-ink"
              >
                {b.text}
              </blockquote>
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
