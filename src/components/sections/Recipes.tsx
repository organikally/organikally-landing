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
    <section id="recipes" className="relative z-10 py-16 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_0.82fr] md:gap-16">
          <div>
            <Reveal>
              <h2 className="t-title font-semibold text-ink">Made for the way India cooks.</h2>
              <p className="t-lead mt-5 max-w-md">
                From the first crackle of a tadka to a jar of achaar maturing in the sun, this is
                where the oil earns its place.
              </p>
            </Reveal>
            <ul className="mt-10 border-t border-line">
              {uses.map((u, i) => {
                const Icon = icons[u.icon] ?? Flame;
                return (
                  <Reveal key={u.title} delay={i * 80} direction="up">
                    <li className="border-b border-line py-5">
                      <h3 className="flex items-center gap-2.5 text-xl font-semibold text-ink">
                        <Icon className="h-[18px] w-[18px] shrink-0 text-yellow-deep" strokeWidth={1.8} aria-hidden="true" />
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
              className="aspect-[4/5] rounded-media shadow-media"
              imgClassName="object-[50%_42%]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
