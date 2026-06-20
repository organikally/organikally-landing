type MediaProps = {
  /** base filename in /public/media (without extension) */
  name: string;
  alt: string;
  /** intrinsic dimensions — reserved up front so the image never shifts layout */
  width: number;
  height: number;
  /** sizing / radius / aspect on the picture box (give it a height or aspect) */
  className?: string;
  /** overrides on the <img>, e.g. object-position */
  imgClassName?: string;
  /** load eagerly (above the fold); defaults to lazy */
  eager?: boolean;
  sizes?: string;
};

/**
 * Serves the AVIF → WebP → JPG triplet built by scripts/build-media.sh. The
 * picture box is `relative` and the image fills it with object-cover, so the
 * caller controls the frame (aspect / height / radius) and the photo crops to
 * fit. width/height are set on the <img> to reserve space and hold CLS at 0.
 */
export default function Media({
  name,
  alt,
  width,
  height,
  className,
  imgClassName,
  eager,
  sizes,
}: MediaProps) {
  const base = `/media/${name}`;
  return (
    <picture className={`relative block overflow-hidden ${className ?? ''}`}>
      <source srcSet={`${base}.avif`} type="image/avif" />
      <source srcSet={`${base}.webp`} type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${base}.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName ?? ''}`}
      />
    </picture>
  );
}
