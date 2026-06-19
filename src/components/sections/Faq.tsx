'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
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
    <section id="faq" className="grain relative z-10 bg-cream py-28 md:py-36">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <SectionHeader eyebrow="Questions, answered" title="The honest details." />
        <dl className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((item, i) => {
            const isOpen = open.has(i);
            return (
              <div key={i}>
                <dt>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-serif text-xl font-medium text-forest">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-gold-ink transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </dt>
                <dd
                  id={`faq-panel-${i}`}
                  className={`grid overflow-hidden text-charcoal-60 transition-all duration-300 ease-brand ${
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
