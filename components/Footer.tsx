import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto mt-20 w-full max-w-7xl border-t border-slate-800/80 px-4 py-8 text-sm text-mutedText sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>Built with Next.js, TypeScript, Tailwind, and Framer Motion.</p>
        <div className="flex items-center gap-4">
          <Link
            href="mailto:aryand@andrew.cmu.edu"
            className="transition hover:text-primaryText"
          >
            Email
          </Link>
          <Link
            href="https://github.com/aryand2006"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-primaryText"
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/aryan-daga"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-primaryText"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
