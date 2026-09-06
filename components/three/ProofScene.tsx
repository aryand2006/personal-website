"use client";

/**
 * 4D-forward scene: rotating tesseract (hypercube) projected into 3D,
 * plus orbital energy. Tuned for GPU cost without dropping the look.
 */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  AdaptiveDpr,
  ContactShadows,
  Float,
  MeshDistortMaterial,
  Sparkles,
  Trail
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type ProofSceneProps = {
  className?: string;
  intensity?: number;
};

type Vec4 = [number, number, number, number];

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

function rotate4(v: Vec4, t: number, s: number): Vec4 {
  // Dual-plane 4D rotation (XW + YZ) — time + scroll as the fourth axis feel
  const a = t * 0.55 + s * 1.2;
  const b = t * 0.38 - s * 0.7;
  const [x, y, z, w] = v;
  const cosA = Math.cos(a);
  const sinA = Math.sin(a);
  const cosB = Math.cos(b);
  const sinB = Math.sin(b);
  const x1 = x * cosA - w * sinA;
  const w1 = x * sinA + w * cosA;
  const y1 = y * cosB - z * sinB;
  const z1 = y * sinB + z * cosB;
  // Extra XZ / YW twist for richer 4D motion
  const c = t * 0.22;
  const cosC = Math.cos(c);
  const sinC = Math.sin(c);
  const x2 = x1 * cosC - z1 * sinC;
  const z2 = x1 * sinC + z1 * cosC;
  const d = t * 0.17 + s * 0.4;
  const cosD = Math.cos(d);
  const sinD = Math.sin(d);
  const y2 = y1 * cosD - w1 * sinD;
  const w2 = y1 * sinD + w1 * cosD;
  return [x2, y2, z2, w2];
}

function project4(v: Vec4, distance = 3.2): [number, number, number] {
  const scale = distance / (distance - v[3]);
  return [v[0] * scale, v[1] * scale, v[2] * scale];
}

function Tesseract({
  scroll,
  pointer
}: {
  scroll: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);

  const { positions, indices, baseVerts } = useMemo(() => {
    const verts: Vec4[] = [];
    for (let i = 0; i < 16; i++) {
      verts.push([
        i & 1 ? 1 : -1,
        i & 2 ? 1 : -1,
        i & 4 ? 1 : -1,
        i & 8 ? 1 : -1
      ]);
    }
    const edgeIdx: number[] = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        let bits = 0;
        for (let k = 0; k < 4; k++) if (verts[i][k] !== verts[j][k]) bits++;
        if (bits === 1) edgeIdx.push(i, j);
      }
    }
    return {
      baseVerts: verts,
      indices: new Uint16Array(edgeIdx),
      positions: new Float32Array(16 * 3)
    };
  }, []);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setIndex(new THREE.BufferAttribute(indices, 1));
    return geo;
  }, [positions, indices]);

  const pointGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    for (let i = 0; i < 16; i++) {
      const p = project4(rotate4(baseVerts[i], t, s));
      positions[i * 3] = p[0] * 1.05;
      positions[i * 3 + 1] = p[1] * 1.05;
      positions[i * 3 + 2] = p[2] * 1.05;
    }
    lineGeo.attributes.position.needsUpdate = true;
    pointGeo.attributes.position.needsUpdate = true;

    if (group.current) {
      group.current.position.set(
        pointer.current.x * 0.4,
        0.15 + Math.sin(t * 0.7) * 0.12 - s * 0.4,
        Math.sin(t * 0.4) * 0.15
      );
      group.current.rotation.y = t * 0.15 + pointer.current.x * 0.2;
      group.current.scale.setScalar(1.05 + Math.sin(t * 1.1) * 0.04 + s * 0.12);
    }
  });

  return (
    <group ref={group}>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color="#0f9e8f" transparent opacity={0.85} />
      </lineSegments>
      <points ref={pointsRef} geometry={pointGeo}>
        <pointsMaterial
          color="#0b2c38"
          size={0.09}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>
      {/* Inner glass volume — physical transmission is much cheaper than MeshTransmission */}
      <mesh scale={0.85}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color="#e8f8fb"
          transmission={0.92}
          thickness={1.4}
          roughness={0.08}
          metalness={0.05}
          ior={1.45}
          transparent
          opacity={1}
          attenuationColor="#0f9e8f"
          attenuationDistance={2.2}
          clearcoat={1}
          clearcoatRoughness={0.15}
          envMapIntensity={0.8}
        />
      </mesh>
    </group>
  );
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
    const breathe = Math.sin(t * 0.55) * 0.1;
    const targetX = pointer.current.x * 0.75 + Math.sin(t * 0.35) * 0.2;
    const targetY = 0.4 + pointer.current.y * -0.3 - s * 0.85 + breathe;
    const targetZ = 6.2 - s * 2.2 + Math.cos(t * 0.28) * 0.28;
    camera.position.x += (targetX - camera.position.x) * 0.07;
    camera.position.y += (targetY - camera.position.y) * 0.07;
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    camera.lookAt(
      pointer.current.x * 0.3,
      0.08 - s * 0.5 + Math.sin(t * 0.4) * 0.06,
      0
    );
  });
  return null;
}

const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
const octaGeo = new THREE.OctahedronGeometry(1, 0);

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
    <Float speed={2} rotationIntensity={1.1} floatIntensity={0.9}>
      <mesh ref={ref} scale={0.52} geometry={sphereGeo}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.55}
          roughness={0.15}
          metalness={0.35}
          distort={0.4}
          speed={3}
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
    <Trail width={0.5} length={7} color={color} attenuation={(w) => w * w} decay={1.5}>
      <mesh ref={ref} scale={0.11} geometry={octaGeo}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.3}
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
      <torusGeometry args={[radius, 0.016, 12, 96]} />
      <meshStandardMaterial
        color="#0f9e8f"
        transparent
        opacity={0.42}
        roughness={0.2}
        metalness={0.7}
        emissive="#0f9e8f"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function CrystalField({ scroll }: { scroll: React.MutableRefObject<number> }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const crystals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        return {
          x: Math.cos(a) * (2.4 + (i % 3) * 0.35),
          y: ((i % 5) - 2) * 0.45,
          z: Math.sin(a) * (2.1 + (i % 4) * 0.3),
          scale: 0.12 + (i % 4) * 0.04
        };
      }),
    []
  );

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    crystals.forEach((c, i) => {
      dummy.position.set(c.x, c.y - s * 0.8, c.z);
      dummy.rotation.set(t * 0.4 + i, t * 0.55 + i * 0.2, 0);
      dummy.scale.setScalar(c.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.rotation.y = t * 0.18;
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[octaGeo, undefined, crystals.length]}>
      <meshStandardMaterial
        color="#0b2c38"
        transparent
        opacity={0.65}
        roughness={0.25}
        metalness={0.4}
        emissive="#0f9e8f"
        emissiveIntensity={0.2}
      />
    </instancedMesh>
  );
}

function SceneContents() {
  const scroll = useScrollProgress();
  const pointer = usePointer();

  return (
    <>
      <AdaptiveDpr />
      <color attach="background" args={["#cfeaf3"]} />
      <fog attach="fog" args={["#cfeaf3", 7, 20]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 7, 4]} intensity={1.25} color="#ffffff" />
      <directionalLight position={[-4, 2, -3]} intensity={0.75} color="#0f9e8f" />
      <pointLight position={[0, 2, 2]} intensity={1.05} color="#7ee0d4" distance={12} />

      <Tesseract scroll={scroll} pointer={pointer} />
      <OrbitRing radius={2.15} speed={0.35} tilt={Math.PI / 2.5} scroll={scroll} />
      <OrbitRing radius={2.8} speed={-0.22} tilt={Math.PI / 3.2} scroll={scroll} />
      <OrbitRing radius={3.4} speed={0.14} tilt={Math.PI / 2.1} scroll={scroll} />

      <DistortOrb position={[-2.4, 0.8, -1]} color="#0f9e8f" speed={0.7} scroll={scroll} />
      <DistortOrb position={[2.5, -0.4, -1.4]} color="#1a6b78" speed={0.55} scroll={scroll} />
      <DistortOrb position={[0.2, 1.6, -2]} color="#5ec4b8" speed={0.85} scroll={scroll} />

      <TrailRunner radius={2.3} speed={1.1} y={0.4} color="#0f9e8f" scroll={scroll} />
      <TrailRunner radius={2.9} speed={-0.75} y={-0.2} color="#2bb3a3" scroll={scroll} />
      <TrailRunner radius={3.4} speed={0.55} y={0.9} color="#0b2c38" scroll={scroll} />

      <CrystalField scroll={scroll} />

      <Sparkles
        count={70}
        scale={[10, 7, 8]}
        size={2.2}
        speed={0.85}
        opacity={0.5}
        color="#0f9e8f"
      />
      <Sparkles
        count={28}
        scale={[8, 5, 6]}
        size={3.5}
        speed={0.3}
        opacity={0.22}
        color="#ffffff"
      />

      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.3}
        scale={14}
        blur={2.4}
        far={4.5}
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
          stencil: false,
          depth: true
        }}
        camera={{ position: [0, 0.4, 6.2], fov: 42, near: 0.1, far: 50 }}
        style={{ width: "100%", height: "100%" }}
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
