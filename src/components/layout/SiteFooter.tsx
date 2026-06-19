import { Instagram, Facebook, Youtube } from 'lucide-react';
import { site, nav } from '@/lib/site';

const year = 2026;

export default function SiteFooter() {
  return (
    <footer className="relative z-10 bg-forest pt-16 text-cream">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <div className="grid gap-10 border-b border-cream/15 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="font-serif text-3xl font-semibold">Organikally</div>
            <div className="eyebrow mt-2 text-gold-bright">{site.tagline}</div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
              Cold-pressed organic mustard oil, pulses and khand — made from organically grown
              seed, nothing refined out.
            </p>
            <div className="mt-5 flex gap-3">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition hover:border-gold hover:text-gold-bright"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Sections">
            <h2 className="eyebrow text-gold-bright">Explore</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition hover:text-cream">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-gold-bright">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              <li>
                <a href={`mailto:${site.email}`} className="transition hover:text-cream">
                  {site.email}
                </a>
              </li>
              <li className="text-cream/50">Business address — to be added</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-7 text-xs text-cream/50 md:flex-row md:items-center md:justify-between">
          <p>
            {site.fssaiLicence} · © {year} Organikally. All rights reserved.
          </p>
          <p>Made with care in India.</p>
        </div>
      </div>
    </footer>
  );
}
