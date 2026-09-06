"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ProofScene = dynamic(() => import("@/components/three/ProofScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-transparent" aria-hidden />
});

export default function SceneMount({
  className,
  intensity
}: {
  className?: string;
  intensity?: number;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const boot = () => {
      if (!cancelled) setReady(true);
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(boot, { timeout: 400 });
      return () => {
        cancelled = true;
        w.cancelIdleCallback?.(id);
      };
    }

    const t = window.setTimeout(boot, 120);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  if (!ready) {
    return <div className={className} aria-hidden />;
  }

  return <ProofScene className={className} intensity={intensity} />;
}
