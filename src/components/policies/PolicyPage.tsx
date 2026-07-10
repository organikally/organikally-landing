import type { ReactNode } from 'react';
import { formatDate } from '@/lib/format';

// Shared shell for legal/policy pages: eyebrow, title, effective date, sections.
export type PolicySection = { heading: string; body: ReactNode };

export default function PolicyPage({
  eyebrow = 'Store policies',
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow?: string;
  title: string;
  updated: string; // ISO date
  intro?: string;
  sections: PolicySection[];
}) {
  return (
    <article>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="t-headline mt-6 font-semibold text-ink">{title}</h1>
      <p className="mt-3 text-sm text-ink-faint">Last updated {formatDate(updated)}</p>
      {intro && <p className="t-lead mt-6">{intro}</p>}
      <div className="mt-10 space-y-9">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-xl text-ink">{s.heading}</h2>
            <div className="mt-3 space-y-3 leading-relaxed text-ink-muted">{s.body}</div>
          </section>
        ))}
      </div>
      <p className="mt-12 border-t border-line pt-6 text-sm text-ink-faint">
        Questions about this policy? Write to{' '}
        <a href="mailto:support@organikaly.com" className="font-medium text-forest hover:text-forest-deep">
          support@organikaly.com
        </a>
        .
      </p>
    </article>
  );
}
