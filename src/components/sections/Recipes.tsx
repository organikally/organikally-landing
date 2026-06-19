import { Flame, Container, CookingPot, type LucideIcon } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import { uses } from '@/content/recipes';

const icons: Record<string, LucideIcon> = {
  flame: Flame,
  jar: Container,
  'cooking-pot': CookingPot,
};

export default function Recipes() {
  return (
    <section id="recipes" className="grain relative z-10 bg-cream py-28 md:py-36">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <SectionHeader
          eyebrow="In the kitchen"
          title="Made for the way India actually cooks."
          intro="From the first crackle of a tadka to a jar of achaar maturing in the sun — here is where the oil earns its place."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {uses.map((u, i) => {
            const Icon = icons[u.icon] ?? Flame;
            return (
              <Reveal key={u.title} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-cream-deep/60 p-7">
                  <Icon className="h-7 w-7 text-gold-ink" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className="mt-4 font-serif text-2xl font-semibold text-forest">{u.title}</h3>
                  <p className="mt-2 text-charcoal-60">{u.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
