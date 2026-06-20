import { Droplets, Wheat, Candy, ShoppingBasket, type LucideIcon } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import Cta from '@/components/ui/Cta';
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
    <section id="range" className="relative z-10 py-24 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            kicker="The range"
            title="More than oil."
            intro="A growing line of organic kitchen essentials, built to expand without losing the trust the oil earns."
          />
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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => {
            const Icon = icons[p.icon] ?? ShoppingBasket;
            return (
              <Reveal key={p.slug} delay={i * 70}>
                <article className="glass flex h-full flex-col rounded-3xl p-6 transition duration-300 ease-brand hover:-translate-y-1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow/20 text-yellow-deep">
                    <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-sm font-medium text-yellow-ink">{p.categoryLabel}</p>
                  <h3 className="mt-1 font-serif text-2xl font-semibold text-ink">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{p.blurb}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
