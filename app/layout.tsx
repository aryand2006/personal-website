import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Syne, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneMount from "@/components/three/SceneMount";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"]
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"]
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aryan-daga.vercel.app"),
  title: {
    default: "Aryan Daga | Verification & Program Analysis",
    template: "%s | Aryan Daga"
  },
  description:
    "CS @ Carnegie Mellon. Building falsification gates for machine-authored code and quantitative research — don't trust a result you can't verify.",
  openGraph: {
    title: "Aryan Daga | Verification & Program Analysis",
    description:
      "Instruments for verification: distributed systems, crash recovery, chaos resilience, and research governance.",
    url: "https://aryan-daga.vercel.app",
    siteName: "Aryan Daga",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Daga | Verification & Program Analysis",
    description:
      "Don't trust a result you can't verify. CS @ Carnegie Mellon."
  },
  keywords: [
    "Aryan Daga",
    "Verification",
    "Program Analysis",
    "Distributed Systems",
    "Carnegie Mellon",
    "Falsification"
  ]
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${publicSans.variable} ${plexMono.variable}`}
    >
      <body className="font-body antialiased">
        <div className="grain" aria-hidden />
        <SceneMount className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-ink/35 to-ink/85" />
        <Navbar />
        <div className="relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
