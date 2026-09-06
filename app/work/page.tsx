import type { Metadata } from "next";
import ExperienceRail from "@/components/ExperienceRail";
import { education, profile, skills } from "@/components/site-content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work"
};

export default function WorkPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <header className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
          Work experience
        </p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
          Where I&apos;ve shipped.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-boneDim sm:text-lg">
          Internships: Wincent, EY, Otaru, SKIDOS. For repos, see{" "}
          <Link href="/projects" className="text-signal underline-offset-4 hover:underline">
            Projects
          </Link>
          .
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
          {profile.location} · {education.schoolShort} · GPA {education.gpa}
        </p>
      </header>

      <ExperienceRail compact />

      <section className="mt-8 border-t border-signal/20 pt-16">
        <h2 className="font-display text-3xl font-bold tracking-tight">Toolkit</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
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
    </div>
  );
}
