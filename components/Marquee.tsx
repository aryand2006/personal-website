"use client";

const TICKER = [
  "Wincent",
  "EY",
  "Otaru",
  "SKIDOS",
  "concord",
  "scroll",
  "stratum",
  "aperture",
  "grit",
  "Jarvis",
  "HumBox"
];

export default function Marquee() {
  const row = [...TICKER, ...TICKER];
  return (
    <div className="relative z-10 overflow-hidden border-y border-signal/15 py-4">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-2xl font-semibold tracking-tight text-bone/25 sm:text-3xl"
          >
            {item}
            <span className="ml-10 text-signal">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
