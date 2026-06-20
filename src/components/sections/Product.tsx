import { Check } from 'lucide-react';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import { whatsapp } from '@/lib/site';
import { heroProduct } from '@/content/products';

const benefits = [
  'High in MUFA and Omega-3',
  'Rich in antioxidants',
  'Cold-pressed and cholesterol-free',
  'Made from organically grown seed',
];

export default function Product() {
  return (
    <section id="product" className="relative z-10 py-24 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <Reveal className="glass-strong grid items-center gap-10 rounded-[2rem] p-8 md:grid-cols-2 md:gap-14 md:p-14">
          <div>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold leading-[1.05]">
              {heroProduct.name}
            </h2>
            <p className="mt-2 font-deva text-xl text-yellow-ink">{heroProduct.hindi}</p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
              A clean golden oil with the pungency a real kitchen knows. Pressed cold, so the seed
              reaches you intact.
            </p>
            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-lg text-ink">
                  <Check className="h-5 w-5 shrink-0 text-yellow-deep" strokeWidth={2.4} aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
            <Cta href={whatsapp()} variant="primary" whatsapp external className="mt-9">
              Order on WhatsApp
            </Cta>
          </div>

          <div className="flex justify-center">
            <div className="relative rounded-[1.75rem] border border-line bg-white p-6 shadow-[0_30px_60px_-30px_rgba(28,25,18,0.4)]">
              <span className="absolute right-5 top-5 rounded-full bg-yellow/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-yellow-ink">
                100% Organic
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroProduct.image}
                alt={`Organikally ${heroProduct.name} bottle, cold-pressed organic`}
                width={520}
                height={680}
                className="mx-auto max-h-[540px] w-auto"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
