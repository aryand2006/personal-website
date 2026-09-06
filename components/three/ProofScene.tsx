"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Grid, Trail } from "@react-three/drei";
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
      velocity.current *= 0.9;
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
    const v = Math.min(Math.abs(velocity.current) * 48, 1.4);
    const targetX = pointer.current.x * (0.85 + v * 0.35);
    const targetY = 0.55 - t * 1.2 + pointer.current.y * -0.4;
    const targetZ = 7.2 - t * 3.2 - v * 0.55;
    camera.position.x += (targetX - camera.position.x) * 0.07;
    camera.position.y += (targetY - camera.position.y) * 0.07;
    camera.position.z += (targetZ - camera.position.z) * 0.055;
    camera.lookAt(0, 0.1 - t * 1.1, -3 - t * 6);
    camera.rotation.z += (pointer.current.x * 0.05 - camera.rotation.z) * 0.05;
  });
  return null;
}

type BodySpec = {
  kind: "icosa" | "torus" | "octa" | "box" | "ring" | "dodeca" | "tetra";
  position: [number, number, number];
  scale: number;
  speed: number;
  lane: number;
  wire?: boolean;
  signal?: boolean;
};

const BODIES: BodySpec[] = [
  { kind: "icosa", position: [2.1, 0.6, -0.5], scale: 1.15, speed: 0.22, lane: 0, signal: true },
  { kind: "torus", position: [-2.5, -0.2, -1.8], scale: 0.95, speed: 0.17, lane: 1 },
  { kind: "octa", position: [0.4, 1.6, -3.1], scale: 0.7, speed: 0.3, lane: 2, wire: true },
  { kind: "dodeca", position: [-1.6, 1.1, -4.5], scale: 0.75, speed: 0.14, lane: 0, signal: true },
  { kind: "tetra", position: [2.9, -0.7, -3.6], scale: 0.65, speed: 0.26, lane: 1, wire: true },
  { kind: "box", position: [-2.9, 0.35, -5.8], scale: 0.5, speed: 0.19, lane: 2 },
  { kind: "ring", position: [1.4, 1.4, -7.0], scale: 1.2, speed: 0.2, lane: 0, signal: true },
  { kind: "icosa", position: [-0.8, -1.15, -8.2], scale: 0.85, speed: 0.24, lane: 1, wire: true },
  { kind: "torus", position: [3.0, 0.55, -9.6], scale: 0.7, speed: 0.16, lane: 2 },
  { kind: "octa", position: [-2.3, 0.9, -11], scale: 0.6, speed: 0.27, lane: 0, signal: true },
  { kind: "dodeca", position: [0.6, -0.4, -12.4], scale: 0.55, speed: 0.18, lane: 1, wire: true },
  { kind: "tetra", position: [2.4, 1.2, -13.8], scale: 0.7, speed: 0.23, lane: 2 },
  { kind: "ring", position: [-1.8, -0.6, -15.2], scale: 1.05, speed: 0.21, lane: 0, signal: true },
  { kind: "icosa", position: [1.7, 0.2, -16.6], scale: 0.9, speed: 0.19, lane: 1 },
  { kind: "box", position: [-2.6, 1.0, -18], scale: 0.45, speed: 0.25, lane: 2, wire: true },
  { kind: "torus", position: [0.2, -1.0, -19.4], scale: 0.65, speed: 0.17, lane: 0, signal: true }
];

function ProofBody({
  spec,
  scroll,
  velocity,
  pointer
}: {
  spec: BodySpec;
  scroll: React.MutableRefObject<number>;
  velocity: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const base = useMemo(() => new THREE.Vector3(...spec.position), [spec.position]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    const v = Math.min(Math.abs(velocity.current) * 60, 1.8);
    const flow = s * 18 + v * 1.1;
    const attractX = pointer.current.x * 0.35;
    const attractY = pointer.current.y * -0.25;
    group.current.position.set(
      base.x + Math.sin(t * spec.speed + spec.lane) * (0.32 + v * 0.2) + attractX,
      base.y + Math.cos(t * spec.speed * 0.85 + spec.lane) * 0.28 + attractY,
      base.z + flow
    );
    group.current.rotation.x = t * spec.speed * (0.8 + v * 0.5) + spec.lane;
    group.current.rotation.y = t * spec.speed * 1.1 + s * 1.6;
    group.current.rotation.z = Math.sin(t * 0.45 + spec.lane) * 0.3;
    const pulse = 1 + Math.sin(t * 2.2 + spec.lane) * 0.04 + v * 0.1;
    group.current.scale.setScalar(spec.scale * pulse);
  });

  const color = spec.signal ? "#0f9e8f" : "#0b2c38";
  const matProps = {
    color,
    roughness: 0.28,
    metalness: 0.28,
    transparent: true,
    opacity: spec.wire ? 0.45 : 0.95,
    wireframe: !!spec.wire,
    emissive: spec.signal ? "#0f9e8f" : "#163a48",
    emissiveIntensity: spec.signal ? 0.22 : 0.04
  };

  return (
    <Float speed={1.3 + spec.lane * 0.2} rotationIntensity={0.5} floatIntensity={0.55}>
      <group ref={group}>
        {spec.kind === "icosa" && (
          <mesh>
            <icosahedronGeometry args={[1, 1]} />
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
        {spec.kind === "tetra" && (
          <mesh>
            <tetrahedronGeometry args={[1.1, 0]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
        )}
        {spec.kind === "box" && (
          <mesh>
            <boxGeometry args={[1.15, 1.15, 1.15]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
        )}
        {spec.kind === "torus" && (
          <mesh>
            <torusKnotGeometry args={[0.55, 0.18, 160, 20]} />
            <meshStandardMaterial {...matProps} metalness={0.5} roughness={0.18} />
          </mesh>
        )}
        {spec.kind === "ring" && (
          <mesh rotation={[Math.PI / 2.5, 0.35, 0]}>
            <torusGeometry args={[1.0, 0.06, 20, 80]} />
            <meshStandardMaterial {...matProps} metalness={0.6} roughness={0.15} />
          </mesh>
        )}
      </group>
    </Float>
  );
}

function HeroCore({
  scroll,
  velocity,
  pointer
}: {
  scroll: React.MutableRefObject<number>;
  velocity: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    const v = Math.min(Math.abs(velocity.current) * 45, 1.2);
    ref.current.position.set(
      pointer.current.x * 0.4,
      0.25 + pointer.current.y * -0.2,
      -0.8 + s * 3.5
    );
    ref.current.rotation.y = t * 0.22;
    ref.current.rotation.x = t * 0.12 + pointer.current.y * 0.2;
    ref.current.scale.setScalar(1.55 + Math.sin(t * 0.8) * 0.08 + v * 0.18);
  });

  return (
    <Trail width={2.2} length={8} color="#0f9e8f" attenuation={(w) => w * w} decay={1.2}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial
          color="#e8f7fa"
          emissive="#0f9e8f"
          emissiveIntensity={0.15}
          roughness={0.12}
          metalness={0.15}
          transparent
          opacity={0.85}
          distort={0.45}
          speed={2.4}
        />
      </mesh>
    </Trail>
  );
}

function OrbitRing({
  scroll,
  radius,
  speed,
  tilt
}: {
  scroll: React.MutableRefObject<number>;
  radius: number;
  speed: number;
  tilt: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
    ref.current.rotation.x = tilt;
    ref.current.position.z = -1.2 + scroll.current * 4;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.012, 12, 120]} />
      <meshStandardMaterial
        color="#0f9e8f"
        transparent
        opacity={0.45}
        emissive="#0f9e8f"
        emissiveIntensity={0.35}
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
}

function DustField({
  scroll,
  pointer
}: {
  scroll: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 1400;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = -Math.random() * 26;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    ref.current.position.z = scroll.current * 10;
    ref.current.position.x = pointer.current.x * 0.5;
    ref.current.position.y = pointer.current.y * -0.3;
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
        size={0.028}
        color="#0f9e8f"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
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
    for (let i = 0; i < 50; i++) {
      const z = -i * 0.5;
      pts.push(
        new THREE.Vector3(
          Math.sin(i * 0.32 + index * 1.4) * (1.8 + index * 0.35),
          Math.cos(i * 0.26 + index) * 0.95,
          z
        )
      );
    }
    return new THREE.CatmullRomCurve3(pts);
  }, [index]);
  const geom = useMemo(() => new THREE.TubeGeometry(curve, 160, 0.02, 8, false), [curve]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.z = scroll.current * 12;
    ref.current.rotation.z =
      state.clock.elapsedTime * 0.08 * (index % 2 === 0 ? 1 : -1);
  });

  return (
    <mesh ref={ref} geometry={geom}>
      <meshStandardMaterial
        color={index % 2 === 0 ? "#0f9e8f" : "#1a5a6a"}
        transparent
        opacity={0.4}
        roughness={0.3}
        metalness={0.4}
        emissive={index % 2 === 0 ? "#0f9e8f" : "#0b2c38"}
        emissiveIntensity={0.18}
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
    return window.innerWidth < 768 ? BODIES.slice(0, 9) : BODIES;
  }, []);

  return (
    <>
      <color attach="background" args={["#cfeaf3"]} />
      <fog attach="fog" args={["#cfeaf3", 7, 30]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 8, 4]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-7, -2, -5]} intensity={1.0} color="#0f9e8f" />
      <pointLight position={[0, 3, 2]} intensity={0.9} color="#7ad4d0" />
      <pointLight position={[-3, -1, -2]} intensity={0.55} color="#0f9e8f" />

      <Grid
        position={[0, -2.4, -6]}
        args={[40, 40]}
        cellSize={0.6}
        cellThickness={0.5}
        cellColor="#8ec8d4"
        sectionSize={3}
        sectionThickness={1.1}
        sectionColor="#0f9e8f"
        fadeDistance={22}
        fadeStrength={1.4}
        infiniteGrid
      />

      {!reduced && (
        <>
          <HeroCore scroll={scroll} velocity={velocity} pointer={pointer} />
          <OrbitRing scroll={scroll} radius={2.2} speed={0.18} tilt={0.6} />
          <OrbitRing scroll={scroll} radius={2.8} speed={-0.12} tilt={1.1} />
          <OrbitRing scroll={scroll} radius={3.4} speed={0.08} tilt={0.35} />
          <DustField scroll={scroll} pointer={pointer} />
          <Ribbon scroll={scroll} index={0} />
          <Ribbon scroll={scroll} index={1} />
          <Ribbon scroll={scroll} index={2} />
          <Ribbon scroll={scroll} index={3} />
          <Sparkles
            count={70}
            scale={[12, 7, 20]}
            size={3}
            speed={0.45}
            opacity={0.45}
            color="#0f9e8f"
          />
        </>
      )}
      {bodies.map((spec, i) => (
        <ProofBody
          key={i}
          spec={spec}
          scroll={scroll}
          velocity={velocity}
          pointer={pointer}
        />
      ))}
      <CameraRig scroll={scroll} velocity={velocity} pointer={pointer} />
    </>
  );
}

export default function ProofScene({ className, intensity = 1 }: ProofSceneProps) {
  return (
    <div className={className} style={{ opacity: intensity }} aria-hidden>
      <Canvas
        dpr={[1, 1.85]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.4, 7.2], fov: 38, near: 0.1, far: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}
