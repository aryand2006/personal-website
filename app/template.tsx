"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type TemplateProps = {
  children: ReactNode;
};

/** Keep content visible immediately — no opacity:0 flash that hides the page. */
export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();
  return (
    <main key={pathname} className="relative">
      {children}
    </main>
  );
}
