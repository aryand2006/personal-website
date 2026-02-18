import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About"
};

const coreInterests = [
  "Multimodal memory pipelines",
  "Retrieval + reranking systems",
  "Agent orchestration",
  "Infrastructure for AI-native products",
  "Startup building"
];

const enjoyList = [
  "Hackathons",
  "System design",
  "Technical deep dives",
  "Working on hard problems with strong teams"
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 pb-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.22em] text-primaryAccent">About</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Building Systems That Think and Execute
        </h1>
      </header>

      <section className="rounded-2xl border border-slate-700/60 bg-card/65 p-6 leading-8 text-slate-200 sm:p-8 sm:text-lg">
        I&apos;m a Computer Science student at Carnegie Mellon focused on
        building intelligent systems that combine perception, reasoning, and
        action.
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
