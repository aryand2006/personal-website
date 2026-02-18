import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 pb-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.22em] text-primaryAccent">
          Contact
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Let&apos;s Build Something Real
        </h1>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="space-y-5 rounded-2xl border border-slate-700/70 bg-card/65 p-6 sm:p-8">
          <p className="text-sm leading-7 text-mutedText sm:text-base">
            Open to technical collaborations, internships, and high-impact
            product builds where strong systems thinking creates a real edge.
          </p>
          <div className="space-y-4 text-sm sm:text-base">
            <p>
              <span className="text-mutedText">Email: </span>
              <Link href="mailto:aryand@andrew.cmu.edu" className="hover:text-primaryAccent">
                aryand@andrew.cmu.edu
              </Link>
            </p>
            <p>
              <span className="text-mutedText">GitHub: </span>
              <Link
                href="https://github.com/aryand2006"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primaryAccent"
              >
                github.com/aryand2006
              </Link>
            </p>
            <p>
              <span className="text-mutedText">LinkedIn: </span>
              <Link
                href="https://linkedin.com/in/aryan-daga"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primaryAccent"
              >
                linkedin.com/in/aryan-daga
              </Link>
            </p>
          </div>
        </article>
        <ContactForm />
      </div>
    </div>
  );
}
