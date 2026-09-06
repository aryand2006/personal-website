"use client";

/**
 * Quiet premium scene: one glass form, one ring, two companions.
 * Motion clarifies depth. Nothing competes with the content.
 */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, ContactShadows, Float } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type ProofSceneProps = {
  className?: string;
  intensity?: number;
};

function useScrollProgress() {
  const scroll = useRef(0);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        scroll.current = window.scrollY / max;
        ticking = false;
      });
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
    let ticking = false;
    let latest = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      latest = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      };
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        pointer.current = latest;
        ticking = false;
      });
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
    const s = scroll.current;
    const targetX = pointer.current.x * 0.22;
    const targetY = 0.3 + pointer.current.y * -0.1 - s * 0.28;
    const targetZ = 5.6 - s * 0.9;
    camera.position.x += (targetX - camera.position.x) * 0.035;
    camera.position.y += (targetY - camera.position.y) * 0.035;
    camera.position.z += (targetZ - camera.position.z) * 0.03;
    camera.lookAt(0, 0.05 - s * 0.2, 0);
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
      pointer.current.x * 0.12,
      0.12 + Math.sin(t * 0.4) * 0.05 - s * 0.18,
      0
    );
    ref.current.rotation.y = t * 0.1 + pointer.current.x * 0.08;
    ref.current.rotation.x = t * 0.05 + pointer.current.y * 0.05;
  });

  return (
    <mesh ref={ref} scale={1.25}>
      <icosahedronGeometry args={[1, 1]} />
      <meshPhysicalMaterial
        color="#f2fafb"
        transmission={0.92}
        thickness={0.7}
        roughness={0.18}
        metalness={0.02}
        ior={1.35}
        transparent
        opacity={1}
        attenuationColor="#7eb8c4"
        attenuationDistance={3.5}
        clearcoat={0.6}
        clearcoatRoughness={0.25}
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
      base.x + Math.sin(t * speed) * 0.08,
      base.y + Math.cos(t * speed * 0.7) * 0.06 - s * 0.25,
      base.z + s * 0.5
    );
    ref.current.rotation.y = t * speed * 0.4;
    ref.current.rotation.x = t * speed * 0.2;
  });

  return (
    <Float speed={0.7} rotationIntensity={0.12} floatIntensity={0.15}>
      <group ref={ref} scale={scale}>
        <mesh>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={wire ? "#0f9e8f" : "#0b2c38"}
            wireframe={!!wire}
            transparent
            opacity={wire ? 0.32 : 0.5}
            roughness={0.45}
            metalness={0.12}
            emissive="#0f9e8f"
            emissiveIntensity={wire ? 0.06 : 0.015}
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
    ref.current.rotation.x = Math.PI / 2.55;
    ref.current.rotation.z = state.clock.elapsedTime * 0.06;
    ref.current.position.y = -0.05 - scroll.current * 0.12;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.05, 0.012, 12, 96]} />
      <meshStandardMaterial
        color="#0f9e8f"
        transparent
        opacity={0.22}
        roughness={0.35}
        metalness={0.3}
        emissive="#0f9e8f"
        emissiveIntensity={0.06}
      />
    </mesh>
  );
}

function SceneContents() {
  const scroll = useScrollProgress();
  const pointer = usePointer();

  return (
    <>
      <AdaptiveDpr />
      <ambientLight intensity={0.95} />
      <directionalLight position={[4, 6, 3]} intensity={1.05} color="#ffffff" />
      <directionalLight position={[-3, 1, -2]} intensity={0.4} color="#0f9e8f" />

      <GlassForm scroll={scroll} pointer={pointer} />
      <SoftRing scroll={scroll} />
      <QuietCompanion
        position={[-2.05, 0.5, -1.1]}
        scale={0.4}
        speed={0.2}
        scroll={scroll}
        wire
      />
      <QuietCompanion
        position={[1.95, -0.3, -1.5]}
        scale={0.34}
        speed={0.16}
        scroll={scroll}
      />
      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.22}
        scale={12}
        blur={2.8}
        far={4}
        resolution={256}
        color="#0b2c38"
      />
      <CameraRig scroll={scroll} pointer={pointer} />
    </>
  );
}

export default function ProofScene({ className, intensity = 1 }: ProofSceneProps) {
  return (
    <div className={className} style={{ opacity: intensity }} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false
        }}
        camera={{ position: [0, 0.3, 5.6], fov: 40, near: 0.1, far: 40 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        frameloop="always"
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}
