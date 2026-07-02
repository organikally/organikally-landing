// Storefront image (STORE_CONTRACT §2.5): reuse the house <img> pattern, NOT
// next/image, so the Vercel optimizer stays disengaged and the Cloudflare fallback
// is trivial. Backend media is already AVIF/WebP at origin and served from absolute
// CDN URLs. width/height reserve space to hold CLS at 0.

type StoreImageProps = {
  src?: string | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  /** eager + high priority for the PDP LCP hero image (§2.5) */
  priority?: boolean;
  sizes?: string;
};

export default function StoreImage({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  priority,
  sizes,
}: StoreImageProps) {
  return (
    <span className={`relative block overflow-hidden bg-surface ${className ?? ''}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          sizes={sizes}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName ?? ''}`}
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-surface to-line"
        />
      )}
    </span>
  );
}
