"use client";

import dynamic from "next/dynamic";

const ProofScene = dynamic(() => import("@/components/three/ProofScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-ink" aria-hidden />
});

export default function SceneMount({
  className,
  intensity
}: {
  className?: string;
  intensity?: number;
}) {
  return <ProofScene className={className} intensity={intensity} />;
}
