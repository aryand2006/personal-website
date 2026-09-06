import type { Metadata } from "next";
import { writingPosts } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Writing"
};

export default function WritingPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <header className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
          Writing
        </p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
          Notes.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-boneDim sm:text-lg">
          Drafts on falsification, implementation risk, and instruments that
          refuse to guess.
        </p>
      </header>

      <div className="mt-16">
        {writingPosts.map((post, index) => (
          <article
            key={post}
            className="border-t border-bone/10 py-8 first:border-t-0"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-steel">
              {String(index + 1).padStart(2, "0")} — Coming soon
            </p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-bone sm:text-3xl">
              {post}
            </h2>
          </article>
        ))}
      </div>
    </div>
  );
}
