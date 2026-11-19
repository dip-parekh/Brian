import { studioConfig } from '../config/studioConfig';

interface BrandMarkProps {
  compact?: boolean;
}

export function BrandMark({ compact = false }: BrandMarkProps) {
  const { studioName, logoImageUrl } = studioConfig.brand;

  return (
    <span className="inline-flex items-center gap-3 select-none">
      {logoImageUrl ? (
        <img
          src={logoImageUrl}
          alt={studioName}
          className="h-8 w-auto object-contain"
        />
      ) : (
        <svg
          width="32"
          height="32"
          viewBox="0 0 36 36"
          fill="none"
          aria-hidden="true"
          className="shrink-0 text-[#C49A6C]"
        >
          <rect
            x="18"
            y="2.5"
            width="21.9"
            height="21.9"
            transform="rotate(45 18 2.5)"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="18"
            y1="7"
            x2="18"
            y2="29"
            stroke="#F5F5F5"
            strokeWidth="1.2"
          />
          <circle cx="18" cy="18" r="2.2" fill="currentColor" />
        </svg>
      )}
      <span
        className={`font-display uppercase tracking-[0.2em] text-[#F5F5F5] ${
          compact ? 'text-sm' : 'text-sm sm:text-base'
        }`}
      >
        {studioName}
      </span>
    </span>
  );
}
