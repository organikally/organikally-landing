'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { faqs } from '@/content/faqs';

export default function Faq() {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <section id="faq" className="relative z-10 py-16 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <SectionTitle eyebrow="Good to know">The honest details</SectionTitle>
        <dl className="mt-12 border-t border-forest/15">
          {faqs.map((item, i) => {
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
                    <span className="text-xl font-semibold text-forest transition-colors duration-300 group-hover/faq:text-forest-deep">
                      {item.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-brand ${isOpen ? 'rotate-45 bg-forest text-cream' : 'bg-yellow/25 text-yellow-ink group-hover/faq:bg-yellow/40'}`}
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
                    <p className="max-w-prose leading-relaxed">{item.a}</p>
                  </div>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
