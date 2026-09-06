import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProjectStrip from "@/components/ProjectStrip";
import ExperienceRail from "@/components/ExperienceRail";
import Spotlight from "@/components/Spotlight";
import { humanBits, interests, projects } from "@/components/site-content";
import Link from "next/link";

export default function HomePage() {
  const featured = projects.slice(0, 6);

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Hero />
      </div>

      <Marquee />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <ExperienceRail />
      </div>

      <Spotlight />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <section className="py-24 sm:py-32" id="work">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
              Selected work
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-bone sm:text-5xl">
              Built to ship — and to check.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-boneDim sm:text-lg">
              Live trading systems, award-winning hackathon builds, and public
              verification instruments across consensus, logs, storage, and chaos.
            </p>
          </div>

          <div className="mt-14">
            {featured.map((project, index) => (
              <ProjectStrip key={project.title} project={project} index={index} />
            ))}
          </div>

          <div className="mt-10 border-t border-signal/15 pt-8">
            <Link
              href="/work"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-boneDim transition hover:text-signal"
            >
              Full catalog →
            </Link>
          </div>
        </section>

        <section className="pb-28 sm:pb-36">
          <div className="grid gap-16 border-t border-signal/15 pt-16 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
                Working thesis
              </p>
              <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Models produce answers.
                <br />
                <span className="text-boneDim">I build the part that checks.</span>
              </h2>
              <ul className="mt-8 space-y-0">
                {interests.map((item) => (
                  <li
                    key={item}
                    className="border-b border-signal/15 py-4 text-sm leading-relaxed text-boneDim first:border-t first:border-signal/15"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
                Off the clock
              </p>
              <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Chess boards &amp; trailheads.
              </h2>
              <ul className="mt-8 space-y-0">
                {humanBits.map((item) => (
                  <li
                    key={item}
                    className="border-b border-signal/15 py-4 text-sm leading-relaxed text-boneDim first:border-t first:border-signal/15"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
