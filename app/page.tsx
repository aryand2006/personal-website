import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ExperienceRail from "@/components/ExperienceRail";
import RepoCard from "@/components/RepoCard";
import { humanBits, profile } from "@/components/site-content";
import { getPublicRepos } from "@/lib/github";
import Link from "next/link";

export const revalidate = 1800;

export default async function HomePage() {
  const repos = await getPublicRepos();
  const featured = repos.slice(0, 6);

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Hero />
      </div>

      <Marquee />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <ExperienceRail />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <section className="py-24 sm:py-32" id="projects">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
                Projects
              </p>
              <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-bone sm:text-5xl">
                Public repos.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-boneDim sm:text-lg">
                Synced from{" "}
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-signal underline-offset-4 hover:underline"
                >
                  github.com/aryand2006
                </a>
                .
              </p>
            </div>
            <Link
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-boneDim transition hover:text-signal"
            >
              Open GitHub ↗
            </Link>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {featured.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
          <div className="mt-10 border-t border-signal/15 pt-8">
            <Link
              href="/projects"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-boneDim transition hover:text-signal"
            >
              Full catalog →
            </Link>
          </div>
        </section>

        <section className="pb-28 sm:pb-36">
          <div className="border-t border-signal/15 pt-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
              Off the clock
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Chess, climbing, and anything competitive.
            </h2>
            <ul className="mt-8 max-w-xl space-y-0">
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
        </section>
      </div>
    </>
  );
}
