"use client";

/**
 * Sparse wire lattice — architectural, systems-y.
 * Soft scroll + pointer parallax; nothing organic or bubbly.
 */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Line } from "@react-three/drei";
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
    const targetX = pointer.current.x * 0.35;
    const targetY = 1.1 + pointer.current.y * -0.15 - s * 0.45;
    const targetZ = 9.5 - s * 1.4;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.035;
    camera.lookAt(pointer.current.x * 0.15, 0.1 - s * 0.3, 0);
  });
  return null;
}

function buildLattice(size: number, step: number) {
  const half = (size * step) / 2;
  const lines: [number, number, number][][] = [];

  for (let y = 0; y <= size; y++) {
    for (let z = 0; z <= size; z++) {
      const yy = y * step - half;
      const zz = z * step - half;
      lines.push([
        [-half, yy, zz],
        [half, yy, zz]
      ]);
    }
  }
  for (let x = 0; x <= size; x++) {
    for (let z = 0; z <= size; z++) {
      const xx = x * step - half;
      const zz = z * step - half;
      lines.push([
        [xx, -half, zz],
        [xx, half, zz]
      ]);
    }
  }
  for (let x = 0; x <= size; x++) {
    for (let y = 0; y <= size; y++) {
      const xx = x * step - half;
      const yy = y * step - half;
      lines.push([
        [xx, yy, -half],
        [xx, yy, half]
      ]);
    }
  }
  return lines;
}

function WireLattice({
  scroll,
  pointer
}: {
  scroll: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const lines = useMemo(() => buildLattice(5, 1.15), []);

  // Accent edges — a sparse subset that reads slightly brighter
  const accents = useMemo(() => {
    const picks: [number, number, number][][] = [];
    for (let i = 0; i < lines.length; i += 17) {
      picks.push(lines[i]);
    }
    return picks;
  }, [lines]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    group.current.rotation.y = t * 0.04 + pointer.current.x * 0.08;
    group.current.rotation.x = 0.18 + Math.sin(t * 0.12) * 0.04 + pointer.current.y * 0.05;
    group.current.rotation.z = Math.sin(t * 0.08) * 0.03;
    group.current.position.y = -0.15 - s * 0.55;
    group.current.position.z = s * 0.8;
  });

  return (
    <group ref={group} position={[0.4, 0, -1.2]} scale={1.05}>
      {lines.map((pts, i) => (
        <Line
          key={`g-${i}`}
          points={pts}
          color="#0b2c38"
          transparent
          opacity={0.14}
          lineWidth={1}
        />
      ))}
      {accents.map((pts, i) => (
        <Line
          key={`a-${i}`}
          points={pts}
          color="#0f9e8f"
          transparent
          opacity={0.45}
          lineWidth={1.25}
        />
      ))}
    </group>
  );
}

/** A few floating nodes at lattice intersections — reads like a graph */
function LatticeNodes({
  scroll,
  pointer
}: {
  scroll: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () =>
      [
        [0, 0, 0],
        [2.3, 1.15, -1.15],
        [-2.3, -1.15, 1.15],
        [1.15, -2.3, 0],
        [-1.15, 2.3, 1.15],
        [0, 1.15, 2.3],
        [2.3, 0, 2.3]
      ] as [number, number, number][],
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    group.current.rotation.y = t * 0.04 + pointer.current.x * 0.08;
    group.current.rotation.x = 0.18 + pointer.current.y * 0.05;
    group.current.position.y = -0.15 - s * 0.55;
    group.current.position.z = s * 0.8;
    group.current.children.forEach((child, i) => {
      const pulse = 1 + Math.sin(t * 1.2 + i * 0.9) * 0.12;
      child.scale.setScalar(pulse);
    });
  });

  return (
    <group ref={group} position={[0.4, 0, -1.2]} scale={1.05}>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#0f9e8f" : "#0b2c38"}
            emissive="#0f9e8f"
            emissiveIntensity={i % 2 === 0 ? 0.55 : 0.15}
            roughness={0.35}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function HorizonPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]}>
      <planeGeometry args={[28, 28]} />
      <meshBasicMaterial color="#cfeaf3" transparent opacity={0.35} />
    </mesh>
  );
}

function SceneContents() {
  const scroll = useScrollProgress();
  const pointer = usePointer();

  return (
    <>
      <AdaptiveDpr />
      <fog attach="fog" args={["#d7eef5", 8, 22]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 8, 4]} intensity={0.85} color="#ffffff" />
      <directionalLight position={[-4, 2, -3]} intensity={0.35} color="#0f9e8f" />

      <WireLattice scroll={scroll} pointer={pointer} />
      <LatticeNodes scroll={scroll} pointer={pointer} />
      <HorizonPlane />
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
        camera={{ position: [0, 1.1, 9.5], fov: 38, near: 0.1, far: 50 }}
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
