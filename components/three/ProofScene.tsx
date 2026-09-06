"use client";

/**
 * Playful background playground: jelly blobs, cursor chase, bounce flock.
 * Keeps the aqua palette; optimized enough to stay smooth.
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

const sphereGeo = new THREE.SphereGeometry(1, 28, 28);
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
    const targetX = pointer.current.x * 0.55 + Math.sin(t * 0.25) * 0.15;
    const targetY = 0.35 + pointer.current.y * -0.25 - s * 0.7;
    const targetZ = 7 - s * 1.8;
    camera.position.x += (targetX - camera.position.x) * 0.06;
    camera.position.y += (targetY - camera.position.y) * 0.06;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.lookAt(pointer.current.x * 0.2, -s * 0.35, 0);
  });
  return null;
}

/** Big jelly center that wobbles and leans toward the cursor */
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
    const s = scroll.current;
    const targetX = pointer.current.x * 1.1;
    const targetY = pointer.current.y * -0.55 + Math.sin(t * 1.2) * 0.2 - s * 0.35;
    vel.current.x += (targetX - ref.current.position.x) * 0.04;
    vel.current.y += (targetY - ref.current.position.y) * 0.04;
    vel.current.x *= 0.86;
    vel.current.y *= 0.86;
    ref.current.position.x += vel.current.x;
    ref.current.position.y += vel.current.y;
    ref.current.position.z = Math.sin(t * 0.6) * 0.25;
    ref.current.rotation.x = t * 0.35 + vel.current.y * 0.8;
    ref.current.rotation.y = t * 0.55 + vel.current.x * 0.8;
    const squash = 1 + Math.sin(t * 2.4) * 0.08 + Math.abs(vel.current.x) * 0.35;
    const stretch = 1 + Math.cos(t * 2.1) * 0.06 + Math.abs(vel.current.y) * 0.25;
    ref.current.scale.set(squash, stretch, 1.15 + Math.sin(t * 1.7) * 0.08);
  });

  return (
    <mesh ref={ref} geometry={sphereGeo} scale={1.35}>
      <MeshDistortMaterial
        color="#5ec4b8"
        transparent
        opacity={0.72}
        roughness={0.12}
        metalness={0.2}
        distort={0.55}
        speed={4}
        emissive="#0f9e8f"
        emissiveIntensity={0.45}
      />
    </mesh>
  );
}

/** Little shapes that bounce around and flee the cursor */
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
      Array.from({ length: 12 }, (_, i) => ({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 3 - 1
        ),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.02
        ),
        scale: 0.18 + (i % 4) * 0.06,
        spin: 0.8 + (i % 5) * 0.3,
        kind: i % 3,
        color: ["#0f9e8f", "#0b2c38", "#2bb3a3", "#7ee0d4"][i % 4]
      })),
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    const px = pointer.current.x * 3.2;
    const py = pointer.current.y * -2.2;

    agents.forEach((a, i) => {
      const child = group.current!.children[i] as THREE.Mesh;
      if (!child) return;

      // Flee cursor when close
      const dx = a.pos.x - px;
      const dy = a.pos.y - py;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
      if (dist < 2.2) {
        a.vel.x += (dx / dist) * 0.012;
        a.vel.y += (dy / dist) * 0.012;
      }

      // Soft wander + bounce in a box
      a.vel.x += Math.sin(t * 0.7 + i) * 0.0008;
      a.vel.y += Math.cos(t * 0.9 + i * 1.3) * 0.0008;
      a.vel.multiplyScalar(0.985);
      a.pos.add(a.vel);

      const boundX = 4.2;
      const boundY = 2.8;
      const boundZ = 2.5;
      if (a.pos.x > boundX || a.pos.x < -boundX) {
        a.vel.x *= -0.9;
        a.pos.x = THREE.MathUtils.clamp(a.pos.x, -boundX, boundX);
      }
      if (a.pos.y > boundY || a.pos.y < -boundY) {
        a.vel.y *= -0.9;
        a.pos.y = THREE.MathUtils.clamp(a.pos.y, -boundY, boundY);
      }
      if (a.pos.z > boundZ || a.pos.z < -boundZ) {
        a.vel.z *= -0.9;
        a.pos.z = THREE.MathUtils.clamp(a.pos.z, -boundZ, boundZ);
      }

      child.position.set(a.pos.x, a.pos.y - s * 0.6, a.pos.z);
      child.rotation.x = t * a.spin;
      child.rotation.y = t * a.spin * 0.7;
      const bounce = 1 + Math.abs(a.vel.x + a.vel.y) * 8;
      child.scale.setScalar(a.scale * bounce);
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
            opacity={0.75}
            roughness={0.25}
            metalness={0.35}
            emissive={a.color}
            emissiveIntensity={0.35}
            wireframe={i % 4 === 0}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Ribbon that lazily chases the cursor */
function CursorSnake({
  pointer,
  scroll
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const pos = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    if (!ref.current) return;
    const target = new THREE.Vector3(
      pointer.current.x * 3.5,
      pointer.current.y * -2.2 - scroll.current * 0.4,
      0.8 + Math.sin(state.clock.elapsedTime) * 0.3
    );
    pos.current.lerp(target, 0.08);
    ref.current.position.copy(pos.current);
    ref.current.rotation.x = state.clock.elapsedTime * 2.2;
    ref.current.rotation.z = state.clock.elapsedTime * 1.6;
  });

  return (
    <Trail width={0.85} length={12} color="#0f9e8f" attenuation={(w) => w} decay={1.1}>
      <mesh ref={ref} scale={0.16} geometry={octaGeo}>
        <meshStandardMaterial
          color="#0b2c38"
          emissive="#0f9e8f"
          emissiveIntensity={1.6}
          roughness={0.15}
          metalness={0.55}
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
    const wobble = 1 + Math.sin(t * 2) * 0.15;
    ref.current.position.set(
      Math.cos(t) * radius * wobble,
      y + Math.sin(t * 1.4) * 0.45 - scroll.current * 0.5,
      Math.sin(t) * radius * wobble
    );
    ref.current.rotation.x = t * 1.5;
    ref.current.rotation.y = t * 1.1;
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1}>
      <mesh ref={ref} scale={0.35} geometry={geo}>
        <meshPhysicalMaterial
          color={color}
          transmission={0.7}
          thickness={0.8}
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.25}
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
    ref.current.rotation.x = tilt + Math.sin(t * 0.5) * 0.35;
    ref.current.rotation.y = t * speed * 0.4;
    ref.current.rotation.z = t * speed;
    ref.current.position.y = Math.sin(t * 0.7) * 0.2 - scroll.current * 0.3;
    ref.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.08);
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.04, 12, 80]} />
      <meshStandardMaterial
        color="#0f9e8f"
        transparent
        opacity={0.5}
        emissive="#0f9e8f"
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.5}
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
      <color attach="background" args={["#cfeaf3"]} />
      <fog attach="fog" args={["#cfeaf3", 8, 22]} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 3]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.7} color="#0f9e8f" />
      <pointLight position={[0, 1.5, 2]} intensity={1.3} color="#7ee0d4" distance={14} />

      <JellyHero scroll={scroll} pointer={pointer} />
      <BounceFlock scroll={scroll} pointer={pointer} />
      <CursorSnake pointer={pointer} scroll={scroll} />

      <OrbitBuddy
        radius={2.4}
        speed={0.7}
        y={0.6}
        color="#5ec4b8"
        scroll={scroll}
        geo={sphereGeo}
      />
      <OrbitBuddy
        radius={3.1}
        speed={-0.45}
        y={-0.4}
        color="#0f9e8f"
        scroll={scroll}
        geo={icosaGeo}
      />
      <OrbitBuddy
        radius={2.7}
        speed={0.55}
        y={1.1}
        color="#1a6b78"
        scroll={scroll}
        geo={octaGeo}
      />

      <PlayRing scroll={scroll} speed={0.4} radius={2.2} tilt={Math.PI / 2.4} />
      <PlayRing scroll={scroll} speed={-0.28} radius={3.0} tilt={Math.PI / 3.1} />

      <Sparkles
        count={80}
        scale={[11, 8, 9]}
        size={2.6}
        speed={1.1}
        opacity={0.55}
        color="#0f9e8f"
      />
      <Sparkles
        count={35}
        scale={[9, 6, 7]}
        size={4}
        speed={0.4}
        opacity={0.28}
        color="#ffffff"
      />

      <ContactShadows
        position={[0, -1.7, 0]}
        opacity={0.28}
        scale={16}
        blur={2.6}
        far={5}
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
        camera={{ position: [0, 0.35, 7], fov: 42, near: 0.1, far: 50 }}
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
