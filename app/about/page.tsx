import type { Metadata } from "next";
import Link from "next/link";
import {
  education,
  experience,
  humanBits,
  profile
} from "@/components/site-content";

export const metadata: Metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <header className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
          About
        </p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
          Hi — I&apos;m Aryan.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-boneDim sm:text-xl">
          {profile.blurb}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-bone sm:text-xl">
          {profile.thesis}
        </p>
      </header>

      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {[
          { label: "School", value: education.schoolShort },
          { label: "Focus", value: "ML · CompFi" },
          { label: "Now", value: "QT/QR @ Wincent" }
        ].map((item) => (
          <div key={item.label} className="border border-bone/10 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel">
              {item.label}
            </p>
            <p className="font-display mt-2 text-xl font-bold tracking-tight">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-20 border-t border-bone/10 pt-16">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Experience
        </h2>
        <div className="mt-8">
          {experience.map((job) => (
            <article
              key={`${job.org}-${job.role}`}
              className="border-t border-bone/10 py-8 first:border-t-0"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
                {job.when} · {job.org}
              </p>
              <h3 className="font-display mt-2 text-2xl font-bold tracking-tight">
                {job.role}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-boneDim sm:text-base">
                {job.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-bone/10 pt-16">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Education
        </h2>
        <p className="font-display mt-4 text-2xl font-bold">{education.school}</p>
        <p className="mt-2 text-boneDim">
          {education.degree}. {education.focus}.
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
          {education.when} · {education.where}
        </p>
      </section>

      <section className="mt-12 border-t border-bone/10 pt-16">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Outside the terminal
        </h2>
        <ul className="mt-6 space-y-0">
          {humanBits.map((item) => (
            <li
              key={item}
              className="border-b border-bone/10 py-4 text-sm text-boneDim first:border-t first:border-bone/10 sm:text-base"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-16 text-sm text-boneDim">
        Full timeline on{" "}
        <Link href={profile.linkedin} className="text-signal" target="_blank" rel="noreferrer">
          LinkedIn
        </Link>
        . Code on{" "}
        <Link href={profile.github} className="text-signal" target="_blank" rel="noreferrer">
          GitHub
        </Link>
        .
      </p>
    </div>
  );
}
