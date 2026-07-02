import { Flame, Container, CookingPot, type LucideIcon } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
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
    <section id="recipes" className="relative z-10 py-16 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_0.82fr] md:gap-16">
          <div>
            <SectionTitle align="left" eyebrow="In your kitchen">
              Made for the way India cooks
            </SectionTitle>
            <Reveal>
              <p className="t-lead mt-5 max-w-md">
                From the first crackle of a tadka to a jar of achaar maturing in the sun, this is
                where the oil earns its place.
              </p>
            </Reveal>
            <ul className="mt-10 border-t border-forest/15">
              {uses.map((u, i) => {
                const Icon = icons[u.icon] ?? Flame;
                return (
                  <Reveal key={u.title} delay={i * 80} direction="up">
                    <li className="border-b border-forest/15 py-5">
                      <h3 className="flex items-center gap-3 font-heading text-xl font-semibold text-ink">
                        <span
                          aria-hidden="true"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest"
                        >
                          <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                        </span>
                        {u.title}
                      </h3>
                      <p className="mt-1.5 leading-relaxed text-ink-muted">{u.body}</p>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>
          <Reveal direction="right">
            <Media
              name="achaar"
              alt="Mango achaar in a traditional ceramic martaban, set with fresh mango and leaves"
              width={1300}
              height={866}
              className="aspect-[4/5] rounded-media border border-forest/15 shadow-media"
              imgClassName="object-[50%_42%]"
              sizes="(min-width: 768px) 34vw, 100vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
