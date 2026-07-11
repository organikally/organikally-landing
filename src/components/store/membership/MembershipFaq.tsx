'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

// The Ojasya FAQ accordion, mirroring src/components/sections/Faq.tsx, but fed its
// items as a prop so the membership page can weave admin-driven numbers (price,
// duration, member savings, welcome coins) into the answers.
export type MembershipFaqItem = { q: string; a: string };

export default function MembershipFaq({ items }: { items: MembershipFaqItem[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <dl className="mt-12 border-t border-forest/15">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} className="border-b border-forest/15">
            <dt>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`club-faq-panel-${i}`}
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
              id={`club-faq-panel-${i}`}
              className={`grid overflow-hidden text-ink-muted transition-all duration-300 ease-brand ${
                isOpen ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="min-h-0">
                <p className="max-w-prose leading-relaxed">{item.a}</p>
              </div>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
