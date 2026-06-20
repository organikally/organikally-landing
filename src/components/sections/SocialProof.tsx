import { Quote } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { testimonials, testimonialsArePlaceholder } from '@/content/testimonials';

export default function SocialProof() {
  const featured = testimonials[0];
  if (!featured) return null;
  return (
    <section id="reviews" className="relative z-10 py-24 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <Reveal className="glass-strong rounded-[2rem] p-9 md:p-16">
          <figure className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto h-9 w-9 text-yellow" strokeWidth={1.6} aria-hidden="true" />
            <blockquote className="mt-6 font-serif text-[clamp(1.65rem,3.4vw,2.7rem)] font-medium leading-[1.16] tracking-[-0.015em] text-ink">
              {featured.quote}
            </blockquote>
            <figcaption className="mt-7 text-sm text-ink-muted">
              {testimonialsArePlaceholder
                ? 'Sample review, replaced with a real customer story before launch'
                : `${featured.name}, ${featured.location}`}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
