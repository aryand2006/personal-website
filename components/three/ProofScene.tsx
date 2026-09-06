"use client";

/**
 * High-energy scene: orbital swarm, trails, glass core, reactive camera.
 * Dial back later if it feels like too much.
 */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  Sparkles,
  Trail
} from "@react-three/drei";
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
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    const breathe = Math.sin(t * 0.55) * 0.12;
    const targetX = pointer.current.x * 0.85 + Math.sin(t * 0.35) * 0.25;
    const targetY = 0.45 + pointer.current.y * -0.35 - s * 0.9 + breathe;
    const targetZ = 6.4 - s * 2.4 + Math.cos(t * 0.28) * 0.35;
    camera.position.x += (targetX - camera.position.x) * 0.07;
    camera.position.y += (targetY - camera.position.y) * 0.07;
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    camera.lookAt(
      pointer.current.x * 0.35,
      0.1 - s * 0.55 + Math.sin(t * 0.4) * 0.08,
      0
    );
  });
  return null;
}

function GlassCore({
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
      pointer.current.x * 0.35,
      0.2 + Math.sin(t * 0.9) * 0.18 - s * 0.45,
      Math.sin(t * 0.55) * 0.2
    );
    ref.current.rotation.y = t * 0.55 + pointer.current.x * 0.45;
    ref.current.rotation.x = t * 0.28 + pointer.current.y * 0.35;
    ref.current.rotation.z = Math.sin(t * 0.4) * 0.25;
    const pulse = 1.25 + Math.sin(t * 1.4) * 0.08 + s * 0.15;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 2]} />
      <MeshTransmissionMaterial
        backside
        samples={6}
        resolution={384}
        thickness={1.1}
        chromaticAberration={0.12}
        anisotropy={0.35}
        distortion={0.45}
        distortionScale={0.55}
        temporalDistortion={0.22}
        roughness={0.05}
        ior={1.5}
        color="#e8f8fb"
        attenuationColor="#0f9e8f"
        attenuationDistance={1.6}
      />
    </mesh>
  );
}

function DistortOrb({
  position,
  color,
  speed,
  scroll
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  scroll: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const base = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    const s = scroll.current;
    ref.current.position.set(
      base.x + Math.sin(t * 1.3) * 0.55,
      base.y + Math.cos(t * 1.1) * 0.45 - s * 0.7,
      base.z + Math.sin(t * 0.8) * 0.4 + s * 1.2
    );
    ref.current.rotation.x = t * 0.9;
    ref.current.rotation.y = t * 1.2;
  });

  return (
    <Float speed={2.2} rotationIntensity={1.4} floatIntensity={1.1}>
      <mesh ref={ref} scale={0.55}>
        <sphereGeometry args={[1, 48, 48]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.55}
          roughness={0.15}
          metalness={0.35}
          distort={0.45}
          speed={3.5}
          emissive={color}
          emissiveIntensity={0.35}
        />
      </mesh>
    </Float>
  );
}

function TrailRunner({
  radius,
  speed,
  y,
  color,
  scroll
}: {
  radius: number;
  speed: number;
  y: number;
  color: string;
  scroll: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    const s = scroll.current;
    const wobble = 1 + Math.sin(t * 2.2) * 0.12;
    ref.current.position.set(
      Math.cos(t) * radius * wobble,
      y + Math.sin(t * 1.7) * 0.35 - s * 0.55,
      Math.sin(t) * radius * wobble + s * 0.9
    );
  });

  return (
    <Trail
      width={0.55}
      length={8}
      color={color}
      attenuation={(w) => w * w}
      decay={1.4}
    >
      <mesh ref={ref} scale={0.12}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.4}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
    </Trail>
  );
}

function OrbitRing({
  radius,
  speed,
  tilt,
  scroll
}: {
  radius: number;
  speed: number;
  tilt: number;
  scroll: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = tilt + Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
    ref.current.position.y = -0.1 - scroll.current * 0.35;
    ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.06);
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.018, 16, 128]} />
      <meshStandardMaterial
        color="#0f9e8f"
        transparent
        opacity={0.45}
        roughness={0.2}
        metalness={0.7}
        emissive="#0f9e8f"
        emissiveIntensity={0.55}
      />
    </mesh>
  );
}

function CrystalField({ scroll }: { scroll: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const crystals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        return {
          x: Math.cos(a) * (2.4 + (i % 3) * 0.35),
          y: ((i % 5) - 2) * 0.45,
          z: Math.sin(a) * (2.1 + (i % 4) * 0.3),
          scale: 0.12 + (i % 4) * 0.04,
          speed: 0.4 + (i % 5) * 0.15,
          wire: i % 3 === 0
        };
      }),
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.18;
    group.current.position.y = -scroll.current * 0.8;
  });

  return (
    <group ref={group}>
      {crystals.map((c, i) => (
        <mesh key={i} position={[c.x, c.y, c.z]} scale={c.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={c.wire ? "#0f9e8f" : "#0b2c38"}
            wireframe={c.wire}
            transparent
            opacity={c.wire ? 0.55 : 0.7}
            roughness={0.25}
            metalness={0.4}
            emissive="#0f9e8f"
            emissiveIntensity={c.wire ? 0.45 : 0.12}
          />
        </mesh>
      ))}
    </group>
  );
}

function SceneContents() {
  const scroll = useScrollProgress();
  const pointer = usePointer();

  return (
    <>
      <color attach="background" args={["#cfeaf3"]} />
      <fog attach="fog" args={["#cfeaf3", 7, 20]} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 7, 4]} intensity={1.35} color="#ffffff" />
      <directionalLight position={[-4, 2, -3]} intensity={0.85} color="#0f9e8f" />
      <pointLight position={[0, 2, 2]} intensity={1.2} color="#7ee0d4" distance={12} />

      <GlassCore scroll={scroll} pointer={pointer} />
      <OrbitRing radius={2.1} speed={0.35} tilt={Math.PI / 2.5} scroll={scroll} />
      <OrbitRing radius={2.75} speed={-0.22} tilt={Math.PI / 3.2} scroll={scroll} />
      <OrbitRing radius={3.35} speed={0.14} tilt={Math.PI / 2.1} scroll={scroll} />

      <DistortOrb position={[-2.4, 0.8, -1]} color="#0f9e8f" speed={0.7} scroll={scroll} />
      <DistortOrb position={[2.5, -0.4, -1.4]} color="#1a6b78" speed={0.55} scroll={scroll} />
      <DistortOrb position={[0.2, 1.6, -2]} color="#5ec4b8" speed={0.85} scroll={scroll} />

      <TrailRunner radius={2.3} speed={1.1} y={0.4} color="#0f9e8f" scroll={scroll} />
      <TrailRunner radius={2.9} speed={-0.75} y={-0.2} color="#2bb3a3" scroll={scroll} />
      <TrailRunner radius={3.4} speed={0.55} y={0.9} color="#0b2c38" scroll={scroll} />

      <CrystalField scroll={scroll} />

      <Sparkles
        count={90}
        scale={[10, 7, 8]}
        size={2.4}
        speed={0.9}
        opacity={0.55}
        color="#0f9e8f"
      />
      <Sparkles
        count={40}
        scale={[8, 5, 6]}
        size={4}
        speed={0.35}
        opacity={0.25}
        color="#ffffff"
      />

      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.35}
        scale={16}
        blur={2.2}
        far={5}
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
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.45, 6.4], fov: 42, near: 0.1, far: 50 }}
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
