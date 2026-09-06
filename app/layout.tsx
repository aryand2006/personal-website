import type { Metadata } from "next";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Syne, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneMount from "@/components/three/SceneMount";

const Cursor = dynamic(() => import("@/components/Cursor"), { ssr: false });

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap"
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap"
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aryandaga.vercel.app"),
  title: {
    default: "Aryan Daga | CMU SCS · Wincent",
    template: "%s | Aryan Daga"
  },
  description:
    "CS @ CMU (ML & CompFi), GPA 3.89. QT/QR intern at Wincent. Previously AI research engineering at EY and founding-team SWE at Otaru AI.",
  openGraph: {
    title: "Aryan Daga | CMU SCS · Wincent QT/QR",
    description:
      "Quant research, AI systems, and founding-team engineering. Carnegie Mellon SCS.",
    url: "https://aryandaga.vercel.app",
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
        {/* Background layers must stay z >= 0 or they paint under body and disappear */}
        <div className="aurora" aria-hidden>
          <span className="left-[-10%] top-[-10%] h-[28rem] w-[28rem] bg-cyan-300/40" />
          <span
            className="right-[-5%] top-[20%] h-[22rem] w-[22rem] bg-teal-300/30"
            style={{ animationDelay: "2s" }}
          />
          <span
            className="bottom-[-10%] left-[30%] h-[24rem] w-[24rem] bg-sky-300/35"
            style={{ animationDelay: "4s" }}
          />
        </div>
        <SceneMount className="scene-root pointer-events-none fixed inset-0 z-0" />
        <div className="grain" aria-hidden />
        <Cursor />
        <Navbar />
        <div className="relative z-10">{children}</div>
        <div className="relative z-10">
          <Footer />
        </div>
      </body>
    </html>
  );
}
