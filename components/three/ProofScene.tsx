"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type ProofSceneProps = {
  className?: string;
  intensity?: number;
};

function useScrollProgress() {
  const progress = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

function CameraRig({
  scroll,
  pointer
}: {
  scroll: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { camera } = useThree();
  useFrame(() => {
    const t = scroll.current;
    const targetX = pointer.current.x * 0.55;
    const targetY = 0.35 - t * 0.9 + pointer.current.y * -0.25;
    const targetZ = 6.2 - t * 2.4;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z += (targetZ - camera.position.z) * 0.04;
    camera.lookAt(0, 0.2 - t * 0.8, -2 - t * 4);
  });
  return null;
}

type BodySpec = {
  kind: "icosa" | "torus" | "octa" | "box" | "ring";
  position: [number, number, number];
  scale: number;
  speed: number;
  lane: number;
  wire?: boolean;
  signal?: boolean;
};

const BODIES: BodySpec[] = [
  { kind: "icosa", position: [1.6, 0.4, -1], scale: 1.15, speed: 0.22, lane: 0, signal: true },
  { kind: "torus", position: [-2.1, -0.2, -2.4], scale: 0.85, speed: 0.18, lane: 1 },
  { kind: "octa", position: [0.2, 1.3, -3.6], scale: 0.7, speed: 0.28, lane: 2, wire: true },
  { kind: "box", position: [-1.2, 0.9, -5.2], scale: 0.55, speed: 0.16, lane: 0 },
  { kind: "ring", position: [2.4, -0.8, -4.1], scale: 1.1, speed: 0.2, lane: 1, signal: true },
  { kind: "icosa", position: [-2.6, 1.1, -7], scale: 0.9, speed: 0.24, lane: 2, wire: true },
  { kind: "torus", position: [1.1, -1.2, -8.2], scale: 0.75, speed: 0.19, lane: 0 },
  { kind: "octa", position: [2.8, 0.6, -9.5], scale: 0.6, speed: 0.26, lane: 1, signal: true },
  { kind: "box", position: [-0.4, 0.1, -11], scale: 0.5, speed: 0.17, lane: 2, wire: true },
  { kind: "ring", position: [-2.2, -0.6, -12.5], scale: 1, speed: 0.21, lane: 0 },
  { kind: "icosa", position: [0.8, 1.4, -14], scale: 1, speed: 0.23, lane: 1 },
  { kind: "torus", position: [2.2, 0.2, -15.5], scale: 0.65, speed: 0.18, lane: 2, signal: true }
];

function ProofBody({
  spec,
  scroll
}: {
  spec: BodySpec;
  scroll: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const base = useMemo(() => new THREE.Vector3(...spec.position), [spec.position]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    // Flow toward / through camera as page scrolls
    const flow = s * 14;
    group.current.position.set(
      base.x + Math.sin(t * spec.speed + spec.lane) * 0.25,
      base.y + Math.cos(t * spec.speed * 0.8 + spec.lane) * 0.2,
      base.z + flow
    );
    group.current.rotation.x = t * spec.speed * 0.7 + spec.lane;
    group.current.rotation.y = t * spec.speed + s * 1.2;
    group.current.rotation.z = Math.sin(t * 0.4 + spec.lane) * 0.2;
  });

  const color = spec.signal ? "#e85d04" : "#ebe6dc";
  const matProps = {
    color,
    roughness: 0.35,
    metalness: 0.15,
    transparent: true,
    opacity: spec.wire ? 0.55 : 0.92,
    wireframe: !!spec.wire
  };

  return (
    <Float speed={1.2 + spec.lane * 0.2} rotationIntensity={0.35} floatIntensity={0.4}>
      <group ref={group} scale={spec.scale}>
        {spec.kind === "icosa" && (
          <mesh>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
        )}
        {spec.kind === "octa" && (
          <mesh>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
        )}
        {spec.kind === "box" && (
          <mesh>
            <boxGeometry args={[1.2, 1.2, 1.2]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
        )}
        {spec.kind === "torus" && (
          <mesh>
            <torusKnotGeometry args={[0.55, 0.18, 128, 16]} />
            <meshStandardMaterial {...matProps} metalness={0.4} roughness={0.25} />
          </mesh>
        )}
        {spec.kind === "ring" && (
          <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
            <torusGeometry args={[0.9, 0.08, 16, 64]} />
            <meshStandardMaterial {...matProps} metalness={0.5} roughness={0.2} />
          </mesh>
        )}
      </group>
    </Float>
  );
}

function GlassOrb({ scroll }: { scroll: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    ref.current.position.set(
      -0.2 + Math.sin(t * 0.25) * 0.15,
      0.15 + Math.cos(t * 0.2) * 0.1,
      -1.5 + s * 4
    );
    ref.current.rotation.y = t * 0.15;
  });

  return (
    <mesh ref={ref} scale={1.35}>
      <sphereGeometry args={[1, 48, 48]} />
      <meshPhysicalMaterial
        color="#ebe6dc"
        transmission={0.86}
        thickness={0.7}
        roughness={0.12}
        metalness={0.05}
        ior={1.4}
        transparent
        opacity={1}
        attenuationColor="#e85d04"
        attenuationDistance={3}
      />
    </mesh>
  );
}

function SceneContents() {
  const scroll = useScrollProgress();
  const pointer = usePointer();
  const reduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  const bodies = useMemo(() => {
    if (typeof window === "undefined") return BODIES;
    return window.innerWidth < 768 ? BODIES.slice(0, 7) : BODIES;
  }, []);

  return (
    <>
      <color attach="background" args={["#0c0c0a"]} />
      <fog attach="fog" args={["#0c0c0a", 7, 24]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={1.25} color="#fff4e8" />
      <directionalLight position={[-5, -2, -4]} intensity={0.7} color="#e85d04" />
      <pointLight position={[0, 2, 2]} intensity={0.55} color="#ebe6dc" />

      {!reduced && <GlassOrb scroll={scroll} />}
      {bodies.map((spec, i) => (
        <ProofBody key={i} spec={spec} scroll={scroll} />
      ))}
      <CameraRig scroll={scroll} pointer={pointer} />
    </>
  );
}

export default function ProofScene({ className, intensity = 1 }: ProofSceneProps) {
  return (
    <div
      className={className}
      style={{ opacity: intensity }}
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.3, 6.2], fov: 42, near: 0.1, far: 40 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}
