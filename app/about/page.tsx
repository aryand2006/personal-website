import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About"
};

const coreInterests = [
  "Program analysis and structural gates for agent-authored code",
  "Research governance for quantitative strategies",
  "Falsification tooling for backtests",
  "Verification pipelines with human checkpoints",
  "Computational finance methodology"
];

const enjoyList = [
  "Hard methodological problems",
  "Deterministic tooling over vibes",
  "Technical deep dives",
  "Building instruments other people can run"
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 pb-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.22em] text-primaryAccent">About</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Don&apos;t Trust a Result You Can&apos;t Verify
        </h1>
      </header>

      <section className="rounded-2xl border border-slate-700/60 bg-card/65 p-6 leading-8 text-slate-200 sm:p-8 sm:text-lg">
        I&apos;m a Computer Science student at Carnegie Mellon working on
        program analysis and verification — the part of the stack that decides
        whether code or a backtest is actually correct, not just whether it
        runs or plots well.
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <article className="rounded-2xl border border-slate-700/60 bg-card/65 p-6 sm:p-8">
          <h2 className="text-lg font-semibold">I&apos;m especially interested in:</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300 sm:text-base">
            {coreInterests.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-primaryAccent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-700/60 bg-card/65 p-6 sm:p-8">
          <h2 className="text-lg font-semibold">I enjoy:</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300 sm:text-base">
            {enjoyList.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-secondaryAccent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
