'use client';

import { useState } from 'react';
import { Facebook, Link2, Check } from 'lucide-react';
import WhatsappIcon from '@/components/ui/WhatsappIcon';

// Social share for the PDP (STORE_CONTRACT §10): WhatsApp, X, Facebook, copy-link.
export default function SocialShare({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const wa = `https://wa.me/?text=${enc(`${title} ${url}`)}`;
  const x = `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`;
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  };

  const cls =
    'flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted transition hover:border-yellow hover:bg-yellow/10 hover:text-yellow-ink';

  return (
    <div className="flex items-center gap-2.5">
      <span className="text-sm font-medium text-ink-faint">Share</span>
      <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className={cls}>
        <WhatsappIcon className="h-[18px] w-[18px]" />
      </a>
      <a href={x} target="_blank" rel="noopener noreferrer" aria-label="Share on X" className={cls}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a href={fb} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className={cls}>
        <Facebook className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </a>
      <button type="button" onClick={copy} aria-label="Copy link" className={cls}>
        {copied ? <Check className="h-[18px] w-[18px]" /> : <Link2 className="h-[18px] w-[18px]" />}
      </button>
    </div>
  );
}
