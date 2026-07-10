// Star row for ratings — five stars with fractional gold fill, rendered as a
// single inline-SVG strip so it works identically in server and client trees.
export default function RatingStars({
  value,
  size = 16,
  className = '',
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(5, value)) * 20;
  const star =
    'M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9L12 2.5Z';
  return (
    <span
      className={`relative inline-block align-middle ${className}`}
      role="img"
      aria-label={`Rated ${value.toFixed(1)} out of 5`}
      style={{ width: size * 5, height: size }}
    >
      <svg viewBox="0 0 120 24" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[0, 24, 48, 72, 96].map((x) => (
          <path
            key={x}
            d={star}
            transform={`translate(${x} 0)`}
            fill="none"
            stroke="rgb(146 100 9 / 0.45)"
            strokeWidth="1.5"
          />
        ))}
      </svg>
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pct}%` }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 120 24"
          className="h-full"
          style={{ width: size * 5 }}
        >
          {[0, 24, 48, 72, 96].map((x) => (
            <path key={x} d={star} transform={`translate(${x} 0)`} fill="#F0B61A" />
          ))}
        </svg>
      </span>
    </span>
  );
}
