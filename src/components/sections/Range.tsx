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
    <section id="range" className="relative z-10 bg-forest py-28 text-cream md:py-36">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <SectionHeader
          eyebrow="The full range"
          title="Mustard oil, pulses, khand & pantry staples."
          intro="A growing range of organic kitchen essentials — built to expand without ever losing the trust the oil earns."
          dark
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => {
            const Icon = icons[p.icon] ?? ShoppingBasket;
            return (
              <Reveal key={p.slug} delay={i * 70}>
                <article className="flex h-full flex-col rounded-2xl border border-cream/15 bg-cream/[0.04] p-6 transition duration-200 ease-brand hover:border-gold/40 hover:bg-cream/[0.07]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold-bright">
                    <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <p className="eyebrow mt-5 text-gold-bright">{p.categoryLabel}</p>
                  <h3 className="mt-1 font-serif text-2xl font-semibold text-cream">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/70">{p.blurb}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-10">
          <Cta href={whatsapp('Hi Organikally, I would like to know more about your range.')} variant="onDark" whatsapp external>
            Ask about the range
          </Cta>
        </Reveal>
      </div>
    </section>
  );
}
