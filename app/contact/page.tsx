import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { profile } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <header className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
          Contact
        </p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
          Say hello.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-boneDim sm:text-lg">
          Open to quant research, systems engineering, and collaborations where
          checking the answer is part of the job. Chess challenges welcome.
        </p>
      </header>

      <div className="mt-16 grid gap-16 lg:grid-cols-2">
        <div className="space-y-6 font-mono text-sm uppercase tracking-[0.14em]">
          <p>
            <span className="block text-[10px] text-steel">Email</span>
            <Link
              href={`mailto:${profile.email}`}
              className="mt-2 inline-block normal-case tracking-normal text-bone transition hover:text-signal"
            >
              {profile.email}
            </Link>
          </p>
          <p>
            <span className="block text-[10px] text-steel">GitHub</span>
            <Link
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block normal-case tracking-normal text-bone transition hover:text-signal"
            >
              github.com/aryand2006
            </Link>
          </p>
          <p>
            <span className="block text-[10px] text-steel">LinkedIn</span>
            <Link
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block normal-case tracking-normal text-bone transition hover:text-signal"
            >
              linkedin.com/in/aryan-daga
            </Link>
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
