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
    // Short delay so first paint stays snappy, then WebGL kicks in
    const t = window.setTimeout(boot, 40);
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
