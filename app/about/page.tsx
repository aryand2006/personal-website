import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About"
};

const coreInterests = [
  "Program analysis and structural gates for agent-authored code",
  "Research governance for quantitative strategies",
  "Falsification tooling for backtests",
  "Deterministic simulation of distributed systems",
  "Crash recovery and chaos-bounded resilience"
];

const enjoyList = [
  "Hard methodological problems",
  "Deterministic tooling over vibes",
  "Technical deep dives",
  "Building instruments other people can run"
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <header className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
          About
        </p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
          Don&apos;t trust a result you can&apos;t verify.
        </h1>
      </header>

      <p className="mt-12 max-w-3xl text-lg leading-relaxed text-boneDim sm:text-xl">
        I&apos;m a Computer Science student at Carnegie Mellon working on
        program analysis and verification — the part of the stack that decides
        whether code or a backtest is actually correct, not just whether it
        runs or plots well.
      </p>

      <div className="mt-20 grid gap-16 border-t border-bone/10 pt-16 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Especially interested in
          </h2>
          <ul className="mt-6 space-y-0">
            {coreInterests.map((item) => (
              <li
                key={item}
                className="border-b border-bone/10 py-4 text-sm leading-relaxed text-boneDim first:border-t first:border-bone/10"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold tracking-tight">
            I enjoy
          </h2>
          <ul className="mt-6 space-y-0">
            {enjoyList.map((item) => (
              <li
                key={item}
                className="border-b border-bone/10 py-4 text-sm leading-relaxed text-boneDim first:border-t first:border-bone/10"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
