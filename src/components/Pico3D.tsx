"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/* ─── Rounded glowing LED eye ─── */
function Eye({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2 + Math.sin(clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        {/* Rounded eye — slightly squished sphere */}
        <sphereGeometry args={[0.05, 24, 24]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <pointLight color="#00E5FF" intensity={1} distance={2} decay={2} />
    </group>
  );
}

/* ─── Rounded capsule-like head ─── */
function Head() {
  const headGeo = useMemo(() => {
    const geo = new THREE.BoxGeometry(0.75, 0.58, 0.55, 16, 16, 16);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.set(pos.getX(i), pos.getY(i), pos.getZ(i));
      const box = v.clone();
      const sphere = v.clone().normalize().multiplyScalar(0.38);
      v.lerpVectors(box, sphere, 0.45);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Rounded face screen geometry — smooth corners
  const screenGeo = useMemo(() => {
    const geo = new THREE.BoxGeometry(0.38, 0.22, 0.03, 12, 12, 4);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.set(pos.getX(i), pos.getY(i), pos.getZ(i));
      const box = v.clone();
      const sphere = v.clone().normalize().multiplyScalar(0.14);
      v.lerpVectors(box, sphere, 0.35);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group position={[0, 0.82, 0]}>
      {/* Main head */}
      <mesh geometry={headGeo}>
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Face screen recess — rounded corners */}
      <mesh position={[0, -0.02, 0.33]} geometry={screenGeo}>
        <meshStandardMaterial
          color="#050508"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Eyes — small rectangular LEDs, pushed well forward */}
      <Eye position={[-0.08, -0.01, 0.36]} />
      <Eye position={[0.08, -0.01, 0.36]} />
    </group>
  );
}

/* ─── Headphone band over the top ─── */
function HeadphoneBand() {
  return (
    <group position={[0, 0.95, 0]}>
      {/* Band arc */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[0.42, 0.025, 8, 32, Math.PI]} />
        <meshStandardMaterial
          color="#0d0d14"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

/* ─── Bulky round headphone cup ─── */
function HeadphoneCup({ side }: { side: "left" | "right" }) {
  const sign = side === "left" ? -1 : 1;

  return (
    <group position={[sign * 0.42, 0.8, 0]}>
      {/* Outer cup — rounded cylinder */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.13, 0.14, 0.1, 24]} />
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      {/* Inner pad — darker */}
      <mesh position={[sign * -0.03, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 24]} />
        <meshStandardMaterial
          color="#050508"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}

/* ─── Stubby oval arm (small paddles) ─── */
function Arm({ side }: { side: "left" | "right" }) {
  const ref = useRef<THREE.Group>(null);
  const sign = side === "left" ? -1 : 1;

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = sign * (0.12 + Math.sin(clock.elapsedTime * 1.2 + sign) * 0.06);
      ref.current.position.y = Math.sin(clock.elapsedTime * 1.2 + sign * 0.5) * 0.015;
    }
  });

  return (
    <group ref={ref} position={[sign * 0.36, 0.18, 0]}>
      <mesh>
        <capsuleGeometry args={[0.06, 0.12, 8, 16]} />
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
    </group>
  );
}

/* ─── Flat oval feet ─── */
function Foot({ side }: { side: "left" | "right" }) {
  const sign = side === "left" ? -1 : 1;
  return (
    <mesh position={[sign * 0.13, -0.18, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
      <capsuleGeometry args={[0.06, 0.04, 8, 16]} />
      <meshStandardMaterial
        color="#0a0a0f"
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
  );
}

/* ─── Rounded body (capsule/pill shape) ─── */
function Body() {
  const bodyGeo = useMemo(() => {
    const geo = new THREE.BoxGeometry(0.5, 0.45, 0.4, 12, 12, 12);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.set(pos.getX(i), pos.getY(i), pos.getZ(i));
      const box = v.clone();
      const sphere = v.clone().normalize().multiplyScalar(0.28);
      v.lerpVectors(box, sphere, 0.5);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh position={[0, 0.2, 0]} geometry={bodyGeo}>
      <meshStandardMaterial
        color="#0a0a0f"
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
  );
}

/* ─── Short neck connector ─── */
function Neck() {
  return (
    <mesh position={[0, 0.5, 0]}>
      <cylinderGeometry args={[0.07, 0.09, 0.1, 12]} />
      <meshStandardMaterial
        color="#070710"
        metalness={0.4}
        roughness={0.6}
      />
    </mesh>
  );
}

/* ─── Complete Pico Robot ─── */
function PicoModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.12;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.4} floatingRange={[-0.04, 0.04]}>
      <group ref={groupRef}>
        <Head />
        <HeadphoneBand />
        <HeadphoneCup side="left" />
        <HeadphoneCup side="right" />
        <Neck />
        <Body />
        <Arm side="left" />
        <Arm side="right" />
        <Foot side="left" />
        <Foot side="right" />
      </group>
    </Float>
  );
}

/* ─── Full 3D Scene ─── */
export default function Pico3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 2.5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      {/* Lighting — front fill + rim */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-2, 2, -3]} intensity={0.3} color="#6366F1" />
      {/* Front fill light so the face/eyes are always visible */}
      <directionalLight position={[0, 0.5, 4]} intensity={0.5} color="#ffffff" />
      {/* Back-rim light for silhouette feel */}
      <directionalLight position={[0, 1, -4]} intensity={0.4} color="#4338CA" />

      <Environment preset="night" />

      <PicoModel />

      <ContactShadows
        position={[0, -0.25, 0]}
        opacity={0.4}
        scale={3}
        blur={2.5}
        far={2}
        color="#1e1b4b"
      />

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.8}
        minDistance={1.2}
        maxDistance={5}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.5}
        target={[0, 0.45, 0]}
      />
    </Canvas>
  );
}
