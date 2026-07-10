import { Instagram, Facebook, Youtube } from 'lucide-react';
import { site, nav } from '@/lib/site';
import GoldStrip from '@/components/ui/GoldStrip';

const year = 2026;

export default function SiteFooter() {
  return (
    <footer className="relative z-10 bg-forest-deep text-cream">
      {/* Gold section-foot accent, the reference's signature strip, full-bleed at the top. */}
      <GoldStrip />
      <div className="mx-auto max-w-container px-5 pt-16 md:px-10 md:pt-20">
        <div className="grid gap-10 border-b border-cream/10 pb-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            {/* The two-tone wordmark (forest + gold) needs a light ground to read on the
                deep-green band, so it sits on a cream plaque like a brand tile. */}
            <span className="inline-flex items-center rounded-2xl bg-cream px-5 py-3.5 shadow-lg">
              <picture>
                <source srcSet="/brand/organikally-wordmark.webp" type="image/webp" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/organikally-wordmark.png"
                  alt="Organikaly"
                  width={805}
                  height={200}
                  className="h-9 w-auto md:h-10"
                />
              </picture>
            </span>
            <div className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-yellow">
              {site.tagline}
            </div>
            <p className="mt-4 max-w-sm leading-relaxed text-cream/70">
              Cold-pressed organic mustard oil, pulses and khand, made from organically grown seed.
              Nothing added, nothing taken out.
            </p>
            <div className="mt-5 flex gap-2.5">
              {[
                { href: site.social.instagram, Icon: Instagram, label: 'Instagram' },
                { href: site.social.facebook, Icon: Facebook, label: 'Facebook' },
                { href: site.social.youtube, Icon: Youtube, label: 'YouTube' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 bg-forest/40 text-cream transition hover:border-yellow hover:bg-yellow hover:text-forest-deep"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Sections">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-yellow">Explore</h2>
            <ul className="mt-4 space-y-2.5 text-cream/75">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition hover:text-yellow">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-yellow">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-cream/75">
              <li>
                <a href={`mailto:${site.email}`} className="transition hover:text-yellow">
                  {site.email}
                </a>
              </li>
              <li>Business address to be added</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-7 text-sm text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>
            {site.fssaiLicence} · © {year} Organikaly. All rights reserved.
          </p>
          <p>Made with care in India.</p>
        </div>
      </div>
    </footer>
  );
}
