"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type ProofSceneProps = {
  className?: string;
  intensity?: number;
};

function useScrollState() {
  const scroll = useRef(0);
  const velocity = useRef(0);
  const last = useRef(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const next = max > 0 ? window.scrollY / max : 0;
      velocity.current = next - last.current;
      last.current = next;
      scroll.current = next;
    };
    const tick = () => {
      velocity.current *= 0.92;
      raf = requestAnimationFrame(tick);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return { scroll, velocity };
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
  velocity,
  pointer
}: {
  scroll: React.MutableRefObject<number>;
  velocity: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { camera } = useThree();
  useFrame(() => {
    const t = scroll.current;
    const v = Math.min(Math.abs(velocity.current) * 40, 1.2);
    const targetX = pointer.current.x * (0.7 + v * 0.3);
    const targetY = 0.4 - t * 1.05 + pointer.current.y * -0.35;
    const targetZ = 6.4 - t * 2.8 - v * 0.4;
    camera.position.x += (targetX - camera.position.x) * 0.06;
    camera.position.y += (targetY - camera.position.y) * 0.06;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.lookAt(0, 0.15 - t * 0.95, -2.5 - t * 5);
    camera.rotation.z += (pointer.current.x * 0.04 - camera.rotation.z) * 0.04;
  });
  return null;
}

type BodySpec = {
  kind: "icosa" | "torus" | "octa" | "box" | "ring" | "dodeca";
  position: [number, number, number];
  scale: number;
  speed: number;
  lane: number;
  wire?: boolean;
  signal?: boolean;
};

const BODIES: BodySpec[] = [
  { kind: "icosa", position: [1.8, 0.5, -0.8], scale: 1.25, speed: 0.22, lane: 0, signal: true },
  { kind: "torus", position: [-2.3, -0.3, -2.2], scale: 0.9, speed: 0.18, lane: 1 },
  { kind: "octa", position: [0.3, 1.45, -3.4], scale: 0.75, speed: 0.28, lane: 2, wire: true },
  { kind: "dodeca", position: [-1.4, 1.0, -4.8], scale: 0.7, speed: 0.15, lane: 0, signal: true },
  { kind: "box", position: [2.6, -0.9, -3.9], scale: 0.5, speed: 0.2, lane: 1, wire: true },
  { kind: "ring", position: [-2.8, 0.2, -6.2], scale: 1.15, speed: 0.19, lane: 2 },
  { kind: "icosa", position: [1.2, 1.3, -7.4], scale: 0.85, speed: 0.24, lane: 0, wire: true },
  { kind: "torus", position: [-0.6, -1.1, -8.6], scale: 0.7, speed: 0.17, lane: 1, signal: true },
  { kind: "octa", position: [2.9, 0.7, -10], scale: 0.65, speed: 0.26, lane: 2 },
  { kind: "box", position: [-2.0, 0.4, -11.4], scale: 0.55, speed: 0.16, lane: 0, wire: true },
  { kind: "ring", position: [0.4, -0.5, -12.8], scale: 1.05, speed: 0.21, lane: 1, signal: true },
  { kind: "dodeca", position: [2.1, 1.2, -14.2], scale: 0.6, speed: 0.23, lane: 2 },
  { kind: "icosa", position: [-1.6, -0.8, -15.6], scale: 0.95, speed: 0.2, lane: 0 },
  { kind: "torus", position: [1.5, 0.1, -17], scale: 0.6, speed: 0.18, lane: 1, wire: true }
];

function ProofBody({
  spec,
  scroll,
  velocity
}: {
  spec: BodySpec;
  scroll: React.MutableRefObject<number>;
  velocity: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const base = useMemo(() => new THREE.Vector3(...spec.position), [spec.position]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    const v = Math.min(Math.abs(velocity.current) * 55, 1.5);
    const flow = s * 16 + v * 0.8;
    group.current.position.set(
      base.x + Math.sin(t * spec.speed + spec.lane) * (0.28 + v * 0.15),
      base.y + Math.cos(t * spec.speed * 0.8 + spec.lane) * 0.22,
      base.z + flow
    );
    group.current.rotation.x = t * spec.speed * (0.7 + v) + spec.lane;
    group.current.rotation.y = t * spec.speed + s * 1.4;
    group.current.rotation.z = Math.sin(t * 0.4 + spec.lane) * 0.25;
    const pulse = 1 + Math.sin(t * 2 + spec.lane) * 0.03 + v * 0.08;
    group.current.scale.setScalar(spec.scale * pulse);
  });

  const color = spec.signal ? "#0f9e8f" : "#0b2c38";
  const matProps = {
    color,
    roughness: 0.32,
    metalness: 0.22,
    transparent: true,
    opacity: spec.wire ? 0.5 : 0.94,
    wireframe: !!spec.wire,
    emissive: spec.signal ? "#0f9e8f" : "#1a4a5a",
    emissiveIntensity: spec.signal ? 0.18 : 0
  };

  return (
    <Float speed={1.1 + spec.lane * 0.25} rotationIntensity={0.4} floatIntensity={0.45}>
      <group ref={group}>
        {spec.kind === "icosa" && (
          <mesh>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
        )}
        {spec.kind === "dodeca" && (
          <mesh>
            <dodecahedronGeometry args={[1, 0]} />
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
            <torusKnotGeometry args={[0.55, 0.18, 140, 18]} />
            <meshStandardMaterial {...matProps} metalness={0.45} roughness={0.22} />
          </mesh>
        )}
        {spec.kind === "ring" && (
          <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
            <torusGeometry args={[0.95, 0.07, 18, 72]} />
            <meshStandardMaterial {...matProps} metalness={0.55} roughness={0.18} />
          </mesh>
        )}
      </group>
    </Float>
  );
}

function Ribbon({
  scroll,
  index
}: {
  scroll: React.MutableRefObject<number>;
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 40; i++) {
      const z = -i * 0.55;
      pts.push(
        new THREE.Vector3(
          Math.sin(i * 0.35 + index) * (1.6 + index * 0.4),
          Math.cos(i * 0.28 + index * 1.2) * 0.8,
          z
        )
      );
    }
    return new THREE.CatmullRomCurve3(pts);
  }, [index]);

  const geom = useMemo(() => {
    return new THREE.TubeGeometry(curve, 120, 0.025, 8, false);
  }, [curve]);

  useFrame((state) => {
    if (!ref.current) return;
    const s = scroll.current;
    ref.current.position.z = s * 10;
    ref.current.rotation.z = state.clock.elapsedTime * 0.05 * (index % 2 === 0 ? 1 : -1);
  });

  return (
    <mesh ref={ref} geometry={geom}>
      <meshStandardMaterial
        color={index % 2 === 0 ? "#0f9e8f" : "#0b2c38"}
        transparent
        opacity={0.35}
        roughness={0.4}
        metalness={0.3}
        emissive={index % 2 === 0 ? "#0f9e8f" : "#0b2c38"}
        emissiveIntensity={0.12}
      />
    </mesh>
  );
}

function DustField({ scroll }: { scroll: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 900;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = -Math.random() * 22;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.position.z = scroll.current * 8;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#0f9e8f"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function GlassOrb({
  scroll,
  velocity
}: {
  scroll: React.MutableRefObject<number>;
  velocity: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    const v = Math.min(Math.abs(velocity.current) * 40, 1);
    ref.current.position.set(
      -0.15 + Math.sin(t * 0.25) * 0.2,
      0.2 + Math.cos(t * 0.2) * 0.12,
      -1.2 + s * 4.5
    );
    ref.current.rotation.y = t * 0.18;
    ref.current.rotation.x = t * 0.08;
    const scale = 1.4 + Math.sin(t * 0.7) * 0.05 + v * 0.12;
    ref.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        color="#e8f7fa"
        transmission={0.92}
        thickness={0.85}
        roughness={0.08}
        metalness={0.02}
        ior={1.45}
        transparent
        opacity={1}
        attenuationColor="#0f9e8f"
        attenuationDistance={2.2}
        clearcoat={0.4}
        clearcoatRoughness={0.2}
      />
    </mesh>
  );
}

function SceneContents() {
  const { scroll, velocity } = useScrollState();
  const pointer = usePointer();
  const reduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  const bodies = useMemo(() => {
    if (typeof window === "undefined") return BODIES;
    return window.innerWidth < 768 ? BODIES.slice(0, 8) : BODIES;
  }, []);

  return (
    <>
      <color attach="background" args={["#cfeaf3"]} />
      <fog attach="fog" args={["#cfeaf3", 8, 28]} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 7, 3]} intensity={1.35} color="#ffffff" />
      <directionalLight position={[-6, -2, -5]} intensity={0.85} color="#0f9e8f" />
      <pointLight position={[2, 3, 1]} intensity={0.7} color="#0b2c38" />
      <pointLight position={[-3, -1, -2]} intensity={0.45} color="#0f9e8f" />

      {!reduced && (
        <>
          <GlassOrb scroll={scroll} velocity={velocity} />
          <DustField scroll={scroll} />
          <Ribbon scroll={scroll} index={0} />
          <Ribbon scroll={scroll} index={1} />
          <Ribbon scroll={scroll} index={2} />
          <Sparkles
            count={40}
            scale={[10, 6, 16]}
            size={2.5}
            speed={0.35}
            opacity={0.35}
            color="#0f9e8f"
          />
        </>
      )}
      {bodies.map((spec, i) => (
        <ProofBody key={i} spec={spec} scroll={scroll} velocity={velocity} />
      ))}
      <CameraRig scroll={scroll} velocity={velocity} pointer={pointer} />
    </>
  );
}

export default function ProofScene({ className, intensity = 1 }: ProofSceneProps) {
  return (
    <div className={className} style={{ opacity: intensity }} aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.35, 6.4], fov: 40, near: 0.1, far: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}
