import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProjectStrip from "@/components/ProjectStrip";
import { interests, projects } from "@/components/site-content";
import Link from "next/link";

export default function HomePage() {
  const featured = projects.slice(0, 6);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <Hero />

      <Marquee />

      <section className="py-24 sm:py-32" id="work">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
            Selected instruments
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-bone sm:text-5xl">
            Built to falsify.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-boneDim sm:text-lg">
            Systems and gates that answer a question before anyone trusts the
            result — consensus under lies, logs under crash, storage after
            death, detectors under planted faults, breakers under chaos.
          </p>
        </div>

        <div className="mt-14">
          {featured.map((project, index) => (
            <ProjectStrip key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="mt-10 border-t border-bone/10 pt-8">
          <Link
            href="/work"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-boneDim transition hover:text-signal"
          >
            Full catalog →
          </Link>
        </div>
      </section>

      <section className="pb-28 sm:pb-36">
        <div className="grid gap-12 border-t border-bone/10 pt-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
              Working thesis
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Models produce answers.
              <br />
              <span className="text-boneDim">I build the part that checks.</span>
            </h2>
          </div>
          <ul className="space-y-0">
            {interests.map((item) => (
              <li
                key={item}
                className="border-b border-bone/10 py-4 text-sm leading-relaxed text-boneDim first:border-t first:border-bone/10 sm:text-base"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
