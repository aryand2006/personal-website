import type { Metadata } from "next";
import Link from "next/link";
import {
  education,
  experience,
  humanBits,
  profile,
  skills
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
          Hi, I&apos;m Aryan.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-boneDim sm:text-xl">
          {profile.blurb}
        </p>
      </header>

      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Based", value: profile.location },
          { label: "School", value: `${education.schoolShort} · ${education.when}` },
          { label: "GPA", value: education.gpa }
        ].map((item) => (
          <div key={item.label} className="glass rounded-2xl p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel">
              {item.label}
            </p>
            <p className="font-display mt-2 text-lg font-bold tracking-tight">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-20 border-t border-signal/15 pt-16">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Education
        </h2>
        <div className="glass mt-6 rounded-2xl p-6 sm:p-8">
          <p className="font-display text-2xl font-bold">{education.school}</p>
          <p className="mt-2 text-boneDim">
            {education.degree}. {education.focus}.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
            GPA {education.gpa} · {education.honors.join(" · ")}
          </p>
          <p className="mt-3 text-sm text-boneDim">{education.notes[0]}</p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
            Coursework
          </p>
          <p className="mt-2 text-sm leading-relaxed text-boneDim">
            {education.coursework.join(" · ")}
          </p>
        </div>
      </section>

      <section className="mt-16 border-t border-signal/15 pt-16">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Experience
        </h2>
        <div className="mt-8">
          {experience.map((job) => (
            <article
              key={`${job.org}-${job.when}`}
              className="border-t border-signal/10 py-8 first:border-t-0"
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
              <ul className="mt-4 space-y-2">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-boneDim">
                    <span className="mt-2 h-px w-3 shrink-0 bg-signal" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-signal/15 pt-16">
        <h2 className="font-display text-3xl font-bold tracking-tight">Skills</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {[
            { title: "Languages", items: skills.languages },
            { title: "Quant & ML", items: skills.quantMl },
            { title: "Infra & Certs", items: skills.infra }
          ].map((col) => (
            <div key={col.title} className="glass rounded-2xl p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                {col.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-boneDim">
                {col.items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-signal/15 pt-16">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Outside the terminal
        </h2>
        <ul className="mt-6 space-y-0">
          {humanBits.map((item) => (
            <li
              key={item}
              className="border-b border-signal/10 py-4 text-sm text-boneDim first:border-t first:border-signal/10 sm:text-base"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-16 text-sm text-boneDim">
        {profile.phone} ·{" "}
        <Link href={`mailto:${profile.email}`} className="text-signal">
          {profile.email}
        </Link>{" "}
        ·{" "}
        <Link href={profile.linkedin} className="text-signal" target="_blank" rel="noreferrer">
          LinkedIn
        </Link>{" "}
        ·{" "}
        <Link href={profile.github} className="text-signal" target="_blank" rel="noreferrer">
          GitHub
        </Link>
      </p>
    </div>
  );
}
