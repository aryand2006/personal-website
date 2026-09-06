import Link from "next/link";
import { profile } from "@/components/site-content";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-bone/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">
            aryan<span className="text-signal">daga</span>
          </p>
          <p className="mt-2 max-w-md text-sm text-boneDim">
            {profile.headline}. Always up for a chess match.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-boneDim">
          <Link href={`mailto:${profile.email}`} className="hover:text-signal">
            Email
          </Link>
          <Link
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-signal"
          >
            GitHub
          </Link>
          <Link
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-signal"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
