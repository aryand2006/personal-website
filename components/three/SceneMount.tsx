"use client";

import dynamic from "next/dynamic";

const ProofScene = dynamic(() => import("@/components/three/ProofScene"), {
  ssr: false,
  loading: () => null
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
