'use client';

import { useState, type ReactNode } from 'react';
import { Plus } from 'lucide-react';

export type FaqItem = { q: string; a: ReactNode };
export type FaqGroup = { title: string; items: FaqItem[] };

// On-brand accordion, modelled on the homepage FAQ (src/components/sections/Faq.tsx):
// one open at a time is not enforced, aria-expanded / aria-controls wired, motion
// gated by the global reduced-motion rule. Content is grouped, with a stable global
// index per item so keys and panel ids stay unique across groups.
export default function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  let index = -1;

  return (
    <div className="space-y-14">
      {groups.map((group) => (
        <div key={group.title}>
          <h2 className="font-heading text-xl font-extrabold uppercase tracking-[-0.01em] text-forest">
            {group.title}
          </h2>
          <dl className="mt-6 border-t border-forest/15">
            {group.items.map((item) => {
              index += 1;
              const i = index;
              const isOpen = open.has(i);
              return (
                <div key={i} className="border-b border-forest/15">
                  <dt>
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="group/faq flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span className="text-lg font-semibold text-forest transition-colors duration-300 group-hover/faq:text-forest-deep md:text-xl">
                        {item.q}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-brand ${
                          isOpen
                            ? 'rotate-45 bg-forest text-cream'
                            : 'bg-yellow/25 text-yellow-ink group-hover/faq:bg-yellow/40'
                        }`}
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </button>
                  </dt>
                  <dd
                    id={`faq-panel-${i}`}
                    className={`grid overflow-hidden text-ink-muted transition-all duration-300 ease-brand ${
                      isOpen ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="min-h-0">
                      <p className="max-w-measure leading-relaxed">{item.a}</p>
                    </div>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      ))}
    </div>
  );
}
