/** A transparent band that lets the scrubbing video show through, with one line over a scrim. */
export default function Interstitial({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative z-10 flex min-h-[78vh] items-center">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/35 to-forest/70" />
      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <p className="font-serif text-3xl font-medium leading-snug text-cream drop-shadow md:text-[2.6rem]">
          {children}
        </p>
      </div>
    </section>
  );
}
