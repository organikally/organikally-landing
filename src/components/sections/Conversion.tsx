import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import { whatsapp } from '@/lib/site';

export default function Conversion() {
  return (
    <section id="order" className="relative z-10 py-24 md:py-32">
      <div className="mx-auto max-w-container px-5 md:px-10">
        <Reveal className="glass-strong overflow-hidden rounded-[2.25rem] px-8 py-14 text-center md:px-10 md:py-20">
          <p className="eyebrow">Bring it home</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-[clamp(2.3rem,5vw,3.8rem)] font-semibold leading-[1.03] text-ink">
            Order the oil your kitchen <span className="italic">deserves.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
            Message us on WhatsApp and we will help you buy directly, for your home or for your
            shop, kitchen or gifting.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Cta href={whatsapp()} variant="primary" whatsapp external>
              Order on WhatsApp
            </Cta>
            <Cta
              href={whatsapp('Hi Organikally, I have a bulk or trade enquiry.')}
              variant="secondary"
              external
              arrow
            >
              Bulk and trade enquiries
            </Cta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
