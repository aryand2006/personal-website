import type { Metadata } from "next";
import { writingPosts } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Writing"
};

export default function WritingPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 pb-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.22em] text-primaryAccent">
          Writing
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Notes on Building AI Systems
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-mutedText sm:text-base">
          Working drafts and essays on retrieval, architecture tradeoffs,
          explainability, and practical lessons from building under constraint.
        </p>
      </header>

      <div className="grid gap-4">
        {writingPosts.map((post) => (
          <article
            key={post}
            className="group rounded-xl border border-slate-700/60 bg-card/65 p-5 transition hover:-translate-y-1 hover:border-primaryAccent/50"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-mutedText">
              Coming Soon
            </p>
            <h2 className="mt-2 text-xl font-medium text-slate-100">{post}</h2>
          </article>
        ))}
      </div>
    </div>
  );
}
