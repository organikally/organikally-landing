// The thin gold band the reference uses to foot its major sections. Full-bleed, purely
// decorative.
export default function GoldStrip({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`h-2 w-full bg-yellow ${className}`} />;
}
