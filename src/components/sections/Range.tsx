import { Droplets, Wheat, Candy, ShoppingBasket, type LucideIcon } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Cta from '@/components/ui/Cta';
import Media from '@/components/ui/Media';
import { whatsapp } from '@/lib/site';
import { products } from '@/content/products';

const icons: Record<string, LucideIcon> = {
  droplet: Droplets,
  wheat: Wheat,
  candy: Candy,
  basket: ShoppingBasket,
};

export default function Range() {
  return (
    <section id="range" className="relative z-10 pb-24 pt-12 md:pb-32 md:pt-16">
      <div className="mx-auto max-w-container px-5 md:px-10">
        {/* Bridge from the oil: a fading thread + connective line so the range reads
            as the oil's trust extended, not a new topic. */}
        <Reveal>
          <div className="mx-auto mb-12 max-w-measure text-center md:mb-20">
            <span
              className="mx-auto block h-12 w-px bg-gradient-to-b from-transparent to-line"
              aria-hidden="true"
            />
            <p className="eyebrow eyebrow-bare mt-7 text-ink-faint">Beyond the bottle</p>
            <p className="mt-4 text-[1.35rem] italic leading-snug text-ink-muted md:text-[1.5rem]">
              The same press, the same patience — now across the rest of your kitchen.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="t-title max-w-xl font-semibold text-ink">More than oil.</h2>
            <p className="t-lead mt-4 max-w-md">
              A growing line of organic kitchen essentials, built to expand without losing the trust
              the oil earns.
            </p>
          </Reveal>
          <Reveal>
            <Cta
              href={whatsapp('Hi Organikally, I would like to know more about your range.')}
              variant="secondary"
              external
            >
              Ask about the range
            </Cta>
          </Reveal>
        </div>

        {/* Editorial index, not a card grid: numbered rows split by hairlines. */}
        <ul className="mt-14 border-t border-line">
          {products.map((p, i) => {
            const Icon = icons[p.icon] ?? ShoppingBasket;
            return (
              <Reveal key={p.slug} delay={i * 70}>
                <li className="grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-5 border-b border-line py-7 md:grid-cols-[3rem_1fr_13rem] md:items-center md:gap-x-8 md:py-8">
                  <span className="index-num pt-1 text-2xl md:text-[2rem]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                      <Icon className="h-4 w-4 text-yellow-deep" strokeWidth={1.8} aria-hidden="true" />
                      {p.categoryLabel}
                    </p>
                    <h3 className="t-subtitle mt-2.5 font-semibold text-ink">{p.name}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-ink-muted">{p.blurb}</p>
                  </div>
                  {p.media && (
                    <div className="col-span-2 md:col-span-1 md:col-start-3">
                      <Media
                        name={p.media}
                        alt={p.name}
                        width={900}
                        height={675}
                        className="aspect-[16/10] w-full rounded-media shadow-sm md:aspect-[4/3]"
                        sizes="(min-width: 768px) 13rem, 100vw"
                      />
                    </div>
                  )}
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
