"use client";

/**
 * Restrained scene: one glass form, two quiet companions, soft scroll + pointer.
 * Motion supports hierarchy (Stripe-style), not decoration.
 */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type ProofSceneProps = {
  className?: string;
  intensity?: number;
};

function useScrollProgress() {
  const scroll = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scroll.current = window.scrollY / max;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scroll;
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
    // Small parallax only: motion clarifies depth, does not perform
    const targetX = pointer.current.x * 0.28;
    const targetY = 0.35 + pointer.current.y * -0.12 - t * 0.35;
    const targetZ = 5.8 - t * 1.1;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.035;
    camera.lookAt(0, 0.05 - t * 0.25, 0);
  });
  return null;
}

function GlassForm({
  scroll,
  pointer
}: {
  scroll: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    ref.current.position.set(
      pointer.current.x * 0.15,
      0.15 + Math.sin(t * 0.35) * 0.06 - s * 0.2,
      0
    );
    ref.current.rotation.y = t * 0.08 + pointer.current.x * 0.1;
    ref.current.rotation.x = t * 0.04 + pointer.current.y * 0.06;
  });

  return (
    <mesh ref={ref} scale={1.35}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        resolution={256}
        thickness={0.55}
        chromaticAberration={0.008}
        anisotropy={0.05}
        distortion={0.03}
        distortionScale={0.12}
        temporalDistortion={0.015}
        roughness={0.22}
        ior={1.32}
        color="#f4fbfd"
        attenuationColor="#7eb8c4"
        attenuationDistance={4}
      />
    </mesh>
  );
}

function QuietCompanion({
  position,
  scale,
  speed,
  scroll,
  wire
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  scroll: React.MutableRefObject<number>;
  wire?: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const base = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    ref.current.position.set(
      base.x + Math.sin(t * speed) * 0.12,
      base.y + Math.cos(t * speed * 0.7) * 0.1 - s * 0.35,
      base.z + s * 0.8
    );
    ref.current.rotation.y = t * speed * 0.5;
    ref.current.rotation.x = t * speed * 0.25;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.2}>
      <group ref={ref} scale={scale}>
        <mesh>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={wire ? "#0f9e8f" : "#0b2c38"}
            wireframe={!!wire}
            transparent
            opacity={wire ? 0.35 : 0.55}
            roughness={0.45}
            metalness={0.15}
            emissive="#0f9e8f"
            emissiveIntensity={wire ? 0.04 : 0.01}
          />
        </mesh>
      </group>
    </Float>
  );
}

function SoftRing({ scroll }: { scroll: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI / 2.6;
    ref.current.rotation.z = state.clock.elapsedTime * 0.05;
    ref.current.position.y = -0.05 - scroll.current * 0.15;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.05, 0.01, 12, 96]} />
      <meshStandardMaterial
        color="#0f9e8f"
        transparent
        opacity={0.18}
        roughness={0.4}
        metalness={0.25}
        emissive="#0f9e8f"
        emissiveIntensity={0.04}
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

  return (
    <>
      <color attach="background" args={["#cfeaf3"]} />
      <fog attach="fog" args={["#cfeaf3", 9, 22]} />
      <ambientLight intensity={0.95} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-3, 1, -2]} intensity={0.45} color="#0f9e8f" />

      {!reduced && (
        <>
          <GlassForm scroll={scroll} pointer={pointer} />
          <SoftRing scroll={scroll} />
          <QuietCompanion
            position={[-2.1, 0.55, -1.2]}
            scale={0.45}
            speed={0.22}
            scroll={scroll}
            wire
          />
          <QuietCompanion
            position={[2.0, -0.35, -1.6]}
            scale={0.38}
            speed={0.18}
            scroll={scroll}
          />
          <ContactShadows
            position={[0, -1.35, 0]}
            opacity={0.25}
            scale={12}
            blur={2.8}
            far={4}
            color="#0b2c38"
          />
        </>
      )}
      <CameraRig scroll={scroll} pointer={pointer} />
    </>
  );
}

export default function ProofScene({ className, intensity = 1 }: ProofSceneProps) {
  return (
    <div className={className} style={{ opacity: intensity }} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.35, 5.8], fov: 40, near: 0.1, far: 40 }}
        style={{ width: "100%", height: "100%" }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}
