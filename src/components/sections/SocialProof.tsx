import { Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import { testimonials, testimonialsArePlaceholder } from '@/content/testimonials';

export default function SocialProof() {
  return (
    <section id="reviews" className="grain relative z-10 bg-cream-deep py-28 md:py-36">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <SectionHeader eyebrow="What people say" title="Trusted at the family table." />
        {testimonialsArePlaceholder && (
          <Reveal>
            <p className="mt-4 inline-block rounded-full border border-line bg-cream px-4 py-1.5 text-sm text-charcoal-60">
              Sample reviews — real customer stories land here soon.
            </p>
          </Reveal>
        )}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-cream p-7 shadow-sm">
                <Quote className="h-7 w-7 text-gold" strokeWidth={1.6} aria-hidden="true" />
                <blockquote className="mt-4 flex-1 font-serif text-lg leading-relaxed text-charcoal">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-forest">{t.name}</span>
                  <span className="block text-charcoal-60">{t.location}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
