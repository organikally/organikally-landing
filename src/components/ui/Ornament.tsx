// A slim Indian ornamental flourish that flanks section titles (the "࿎ ... ࿎" motif in
// the reference). Denser at the outer end, fading toward the title. `flip` mirrors it for
// the opposite side. Inherits colour via currentColor.
export default function Ornament({
  className = '',
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 16"
      fill="none"
      aria-hidden="true"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <g stroke="currentColor" strokeLinecap="round">
        <circle cx="5" cy="8" r="2.4" fill="currentColor" stroke="none" />
        <path d="M11 8q8-6 16 0t16 0" strokeWidth="1.4" />
        <rect
          x="46.5"
          y="4.5"
          width="7"
          height="7"
          transform="rotate(45 50 8)"
          fill="currentColor"
          stroke="none"
        />
        <path d="M62 8h56" strokeWidth="1" strokeDasharray="2 4.5" opacity="0.55" />
      </g>
    </svg>
  );
}
