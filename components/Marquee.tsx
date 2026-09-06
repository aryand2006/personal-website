"use client";

const TICKER = [
  "concord",
  "scroll",
  "stratum",
  "aperture",
  "grit",
  "affidavit",
  "sediment",
  "parallax",
  "assay",
  "clairvoyant"
];

export default function Marquee() {
  const row = [...TICKER, ...TICKER];
  return (
    <div className="relative z-10 overflow-hidden border-y border-bone/10 py-4">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-2xl font-semibold tracking-tight text-bone/35 sm:text-3xl"
          >
            {item}
            <span className="ml-10 text-signal">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
