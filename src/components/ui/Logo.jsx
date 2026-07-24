import Link from "next/link";
import { useId } from "react";

function LogoMark({ primary, accent, size = 42 }) {
  const clipId = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      {/* suitcase handle */}
      <rect x="24" y="6" width="16" height="9" rx="3" stroke={primary} strokeWidth="3" fill="none" />
      {/* airplane */}
      <path
        d="M45 15.5 52 10.2c.9-.68 2.2-.02 2.2 1.1 0 .4-.16.78-.46 1.05l-5.4 5"
        stroke={primary}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M43.5 17 53 12" stroke={primary} strokeWidth="1.6" strokeLinecap="round" />
      {/* suitcase body */}
      <rect x="10" y="14" width="44" height="40" rx="9" fill="#fff" stroke={primary} strokeWidth="3" />
      {/* mountains inside */}
      <clipPath id={clipId}>
        <rect x="10" y="14" width="44" height="40" rx="9" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <path d="M2 50 20 30 30 40 40 24 62 50Z" fill={accent} opacity="0.9" />
        <path d="M2 52 15 38 24 46 34 32 62 52Z" fill={primary} />
        <path d="M45 22 48 26 45 26.6 48.4 27.2 45.4 30" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      </g>
      {/* feet */}
      <circle cx="20" cy="57" r="2.6" fill={primary} />
      <circle cx="44" cy="57" r="2.6" fill={primary} />
    </svg>
  );
}

export default function Logo({ variant = "light", showTagline = true, size = 42, className = "" }) {
  const isLight = variant === "light";
  const primary = isLight ? "#0B2E63" : "#F8FBFF";
  const accent = "#4DA8DA";

  return (
    <Link href="/" className={`flex items-center gap-2.5 shrink-0 group ${className}`} aria-label="PKP Holidays home">
      <LogoMark primary={primary} accent={accent} size={size} />
      <span className="leading-tight">
        <span className="flex items-baseline gap-1.5 whitespace-nowrap">
          <span
            className="font-display font-extrabold tracking-tight text-xl sm:text-2xl"
            style={{ color: primary }}
          >
            PKP
          </span>
          <span className="font-script text-xl sm:text-2xl" style={{ color: accent }}>
            Holidays
          </span>
        </span>
        {showTagline && (
          <span
            className="hidden sm:block text-[9px] font-semibold tracking-[0.14em] uppercase opacity-75 -mt-0.5 whitespace-nowrap"
            style={{ color: primary }}
          >
            Pack Your Bags, Let&apos;s Create Memories
          </span>
        )}
      </span>
    </Link>
  );
}
