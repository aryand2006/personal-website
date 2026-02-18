import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import AnimatedCursorGlow from "@/components/AnimatedCursorGlow";

export const metadata: Metadata = {
  metadataBase: new URL("https://aryan-daga.vercel.app"),
  title: {
    default: "Aryan Daga | AI Systems Builder",
    template: "%s | Aryan Daga"
  },
  description:
    "AI Systems Builder at Carnegie Mellon focused on multimodal memory, retrieval architectures, and agentic systems for production use.",
  openGraph: {
    title: "Aryan Daga | AI Systems Builder",
    description:
      "Portfolio of AI systems projects spanning multimodal interaction, retrieval, agents, and quantitative modeling.",
    url: "https://aryan-daga.vercel.app",
    siteName: "Aryan Daga Portfolio",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Daga | AI Systems Builder",
    description:
      "Computer Science @ Carnegie Mellon. Building serious AI systems that reason, retrieve, and act."
  },
  keywords: [
    "Aryan Daga",
    "AI Engineer",
    "Multimodal Systems",
    "RAG",
    "Agent Architectures",
    "Carnegie Mellon"
  ]
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AnimatedCursorGlow />
        <AnimatedBackground />
        <Navbar />
        <div className="px-4 pb-4 pt-8 sm:px-6 lg:px-8">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
