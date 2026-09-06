import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Syne, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneMount from "@/components/three/SceneMount";
import Cursor from "@/components/Cursor";

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
    "CS @ CMU (ML & CompFi), GPA 3.89. QT/QR intern at Wincent — live crypto strategies. Previously AI research engineering at EY and founding-team SWE at Otaru AI.",
  openGraph: {
    title: "Aryan Daga | CMU SCS · Wincent QT/QR",
    description:
      "Quant research, AI systems, and founding-team engineering. Carnegie Mellon SCS.",
    url: "https://aryan-daga.vercel.app",
    siteName: "Aryan Daga",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Daga | CMU SCS · Wincent QT/QR",
    description: "CS @ Carnegie Mellon. Quant, systems, and instruments you can falsify."
  },
  keywords: [
    "Aryan Daga",
    "Carnegie Mellon",
    "Wincent",
    "Quantitative Research",
    "EY",
    "Otaru AI"
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
        <Cursor />
        <SceneMount className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-ink/25 to-ink/80" />
        <Navbar />
        <div className="relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
