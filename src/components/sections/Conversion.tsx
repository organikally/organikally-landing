import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import { whatsapp } from '@/lib/site';

export default function Conversion() {
  return (
    <section id="order" className="relative z-10 bg-forest py-28 text-cream md:py-32">
      <div className="mx-auto max-w-container px-6 text-center md:px-10">
        <Reveal>
          <p className="eyebrow text-gold-bright">Bring it home</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-4xl font-semibold text-cream md:text-5xl">
            Order the oil your kitchen deserves.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-cream/80">
            Message us on WhatsApp and we&apos;ll help you buy directly — for your home, or for
            your store, kitchen or gifting.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Cta href={whatsapp()} variant="primary" whatsapp external>
              Order on WhatsApp
            </Cta>
            <Cta
              href={whatsapp('Hi Organikally, I have a bulk / trade enquiry.')}
              variant="onDark"
              external
            >
              Bulk & trade enquiries
            </Cta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
