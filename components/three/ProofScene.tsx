"use client";

/**
 * Playful cursor-reactive background. Transparent canvas so page wash shows through.
 */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  AdaptiveDpr,
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

const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
const octaGeo = new THREE.OctahedronGeometry(1, 0);
const tetraGeo = new THREE.TetrahedronGeometry(1, 0);
const icosaGeo = new THREE.IcosahedronGeometry(1, 0);

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
    const targetX = pointer.current.x * 0.6 + Math.sin(t * 0.3) * 0.2;
    const targetY = 0.2 + pointer.current.y * -0.3 - s * 0.5;
    const targetZ = 6.5;
    camera.position.x += (targetX - camera.position.x) * 0.06;
    camera.position.y += (targetY - camera.position.y) * 0.06;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.lookAt(pointer.current.x * 0.25, 0, 0);
  });
  return null;
}

function JellyHero({
  scroll,
  pointer
}: {
  scroll: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const vel = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const targetX = pointer.current.x * 1.4;
    const targetY = pointer.current.y * -0.7 + Math.sin(t * 1.3) * 0.25 - scroll.current * 0.2;
    vel.current.x += (targetX - ref.current.position.x) * 0.05;
    vel.current.y += (targetY - ref.current.position.y) * 0.05;
    vel.current.x *= 0.84;
    vel.current.y *= 0.84;
    ref.current.position.x += vel.current.x;
    ref.current.position.y += vel.current.y;
    ref.current.position.z = Math.sin(t * 0.7) * 0.35;
    ref.current.rotation.x = t * 0.4 + vel.current.y;
    ref.current.rotation.y = t * 0.6 + vel.current.x;
    const sx = 1.45 + Math.sin(t * 2.2) * 0.12 + Math.abs(vel.current.x) * 0.4;
    const sy = 1.45 + Math.cos(t * 2) * 0.1 + Math.abs(vel.current.y) * 0.3;
    ref.current.scale.set(sx, sy, 1.35);
  });

  return (
    <mesh ref={ref} geometry={sphereGeo}>
      <MeshDistortMaterial
        color="#0f9e8f"
        transparent
        opacity={0.85}
        roughness={0.08}
        metalness={0.15}
        distort={0.6}
        speed={5}
        emissive="#0f9e8f"
        emissiveIntensity={0.7}
      />
    </mesh>
  );
}

function BounceFlock({
  scroll,
  pointer
}: {
  scroll: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const agents = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 4.5,
          (Math.random() - 0.5) * 3
        ),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.025
        ),
        scale: 0.22 + (i % 4) * 0.08,
        spin: 0.9 + (i % 5) * 0.35,
        kind: i % 3,
        color: ["#0f9e8f", "#0b2c38", "#148f9a", "#5ec4b8"][i % 4]
      })),
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    const px = pointer.current.x * 3.5;
    const py = pointer.current.y * -2.4;

    agents.forEach((a, i) => {
      const child = group.current!.children[i] as THREE.Mesh;
      if (!child) return;

      const dx = a.pos.x - px;
      const dy = a.pos.y - py;
      const dist = Math.hypot(dx, dy) + 0.001;
      if (dist < 2.4) {
        a.vel.x += (dx / dist) * 0.016;
        a.vel.y += (dy / dist) * 0.016;
      }

      a.vel.x += Math.sin(t * 0.8 + i) * 0.001;
      a.vel.y += Math.cos(t * 1.1 + i) * 0.001;
      a.vel.multiplyScalar(0.982);
      a.pos.add(a.vel);

      const bx = 4.5;
      const by = 3;
      const bz = 2.8;
      if (Math.abs(a.pos.x) > bx) {
        a.vel.x *= -0.92;
        a.pos.x = THREE.MathUtils.clamp(a.pos.x, -bx, bx);
      }
      if (Math.abs(a.pos.y) > by) {
        a.vel.y *= -0.92;
        a.pos.y = THREE.MathUtils.clamp(a.pos.y, -by, by);
      }
      if (Math.abs(a.pos.z) > bz) {
        a.vel.z *= -0.92;
        a.pos.z = THREE.MathUtils.clamp(a.pos.z, -bz, bz);
      }

      child.position.set(a.pos.x, a.pos.y - s * 0.4, a.pos.z);
      child.rotation.x = t * a.spin;
      child.rotation.y = t * a.spin * 0.75;
      child.scale.setScalar(a.scale * (1 + Math.hypot(a.vel.x, a.vel.y) * 10));
    });
  });

  return (
    <group ref={group}>
      {agents.map((a, i) => (
        <mesh
          key={i}
          geometry={a.kind === 0 ? octaGeo : a.kind === 1 ? tetraGeo : icosaGeo}
        >
          <meshStandardMaterial
            color={a.color}
            transparent
            opacity={0.9}
            roughness={0.2}
            metalness={0.4}
            emissive={a.color}
            emissiveIntensity={0.55}
            wireframe={i % 3 === 0}
          />
        </mesh>
      ))}
    </group>
  );
}

function CursorSnake({
  pointer,
  scroll
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const pos = useRef(new THREE.Vector3(2, 1, 0));

  useFrame((state) => {
    if (!ref.current) return;
    const target = new THREE.Vector3(
      pointer.current.x * 3.8,
      pointer.current.y * -2.4 - scroll.current * 0.25,
      1 + Math.sin(state.clock.elapsedTime) * 0.4
    );
    pos.current.lerp(target, 0.1);
    ref.current.position.copy(pos.current);
    ref.current.rotation.x = state.clock.elapsedTime * 2.4;
    ref.current.rotation.z = state.clock.elapsedTime * 1.8;
  });

  return (
    <Trail width={1.1} length={14} color="#0f9e8f" attenuation={(w) => w} decay={1}>
      <mesh ref={ref} scale={0.2} geometry={octaGeo}>
        <meshStandardMaterial
          color="#0b2c38"
          emissive="#0f9e8f"
          emissiveIntensity={2}
          roughness={0.1}
          metalness={0.6}
        />
      </mesh>
    </Trail>
  );
}

function OrbitBuddy({
  radius,
  speed,
  y,
  color,
  scroll,
  geo
}: {
  radius: number;
  speed: number;
  y: number;
  color: string;
  scroll: React.MutableRefObject<number>;
  geo: THREE.BufferGeometry;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    const wobble = 1 + Math.sin(t * 2.2) * 0.18;
    ref.current.position.set(
      Math.cos(t) * radius * wobble,
      y + Math.sin(t * 1.5) * 0.5 - scroll.current * 0.35,
      Math.sin(t) * radius * wobble
    );
    ref.current.rotation.x = t * 1.6;
    ref.current.rotation.y = t * 1.2;
  });

  return (
    <Float speed={2.8} rotationIntensity={1.4} floatIntensity={1.2}>
      <mesh ref={ref} scale={0.42} geometry={geo}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          roughness={0.15}
          metalness={0.35}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

function PlayRing({
  scroll,
  speed,
  radius,
  tilt
}: {
  scroll: React.MutableRefObject<number>;
  speed: number;
  radius: number;
  tilt: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = tilt + Math.sin(t * 0.55) * 0.4;
    ref.current.rotation.y = t * speed * 0.45;
    ref.current.rotation.z = t * speed;
    ref.current.position.y = Math.sin(t * 0.8) * 0.25 - scroll.current * 0.2;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.05, 12, 96]} />
      <meshStandardMaterial
        color="#0f9e8f"
        transparent
        opacity={0.65}
        emissive="#0f9e8f"
        emissiveIntensity={0.85}
        roughness={0.15}
        metalness={0.55}
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
      <ambientLight intensity={1.1} />
      <directionalLight position={[5, 6, 4]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-4, 2, -2]} intensity={0.9} color="#0f9e8f" />
      <pointLight position={[0, 1, 3]} intensity={1.6} color="#7ee0d4" distance={16} />

      <JellyHero scroll={scroll} pointer={pointer} />
      <BounceFlock scroll={scroll} pointer={pointer} />
      <CursorSnake pointer={pointer} scroll={scroll} />

      <OrbitBuddy radius={2.5} speed={0.75} y={0.7} color="#0f9e8f" scroll={scroll} geo={sphereGeo} />
      <OrbitBuddy radius={3.2} speed={-0.5} y={-0.5} color="#0b2c38" scroll={scroll} geo={icosaGeo} />
      <OrbitBuddy radius={2.8} speed={0.6} y={1.2} color="#148f9a" scroll={scroll} geo={octaGeo} />

      <PlayRing scroll={scroll} speed={0.45} radius={2.3} tilt={Math.PI / 2.4} />
      <PlayRing scroll={scroll} speed={-0.3} radius={3.15} tilt={Math.PI / 3} />

      <Sparkles count={100} scale={[12, 8, 10]} size={3} speed={1.2} opacity={0.7} color="#0f9e8f" />
      <Sparkles count={40} scale={[10, 6, 8]} size={5} speed={0.45} opacity={0.35} color="#ffffff" />

      <CameraRig scroll={scroll} pointer={pointer} />
    </>
  );
}

export default function ProofScene({ className, intensity = 1 }: ProofSceneProps) {
  return (
    <div className={className} style={{ opacity: intensity }} aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false
        }}
        camera={{ position: [0, 0.2, 6.5], fov: 45, near: 0.1, far: 50 }}
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
