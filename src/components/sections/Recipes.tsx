import { Flame, Container, CookingPot, type LucideIcon } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Media from '@/components/ui/Media';
import { uses } from '@/content/recipes';

const icons: Record<string, LucideIcon> = {
  flame: Flame,
  jar: Container,
  'cooking-pot': CookingPot,
};

export default function Recipes() {
  return (
    <section id="recipes" className="relative z-10 py-24 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <Reveal className="glass-strong grid gap-10 rounded-[2rem] p-9 md:grid-cols-[0.9fr_1fr] md:gap-14 md:p-14">
          <div>
            <h2 className="font-serif text-[clamp(2.1rem,4.6vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
              Made for the way India cooks.
            </h2>
            <p className="mt-5 max-w-sm text-[1.0625rem] leading-relaxed text-ink-muted">
              From the first crackle of a tadka to a jar of achaar maturing in the sun, this is
              where the oil earns its place.
            </p>
            <Reveal direction="up">
              <Media
                name="achaar"
                alt="Mango achaar in a traditional ceramic martaban, set with fresh mango and leaves"
                width={1300}
                height={866}
                className="mt-8 aspect-[3/2] rounded-[1.5rem] shadow-[0_36px_70px_-44px_rgba(28,25,18,0.6)]"
              />
            </Reveal>
          </div>
          <div className="divide-y divide-line/80">
            {uses.map((u, i) => {
              const Icon = icons[u.icon] ?? Flame;
              return (
                <Reveal key={u.title} delay={i * 80} direction="right">
                  <div className="flex items-start gap-4 py-5 first:pt-0 last:pb-0">
                    <Icon className="mt-1 h-6 w-6 shrink-0 text-yellow-ink" strokeWidth={1.8} aria-hidden="true" />
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-ink">{u.title}</h3>
                      <p className="mt-1 text-ink-muted">{u.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
