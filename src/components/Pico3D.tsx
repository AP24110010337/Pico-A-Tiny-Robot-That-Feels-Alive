"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Float, Environment, ContactShadows, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─── Fresnel edge glow shader (cyan outline matching eyes) ─── */
const GlowEdgeShaderMaterial = shaderMaterial(
  {
    glowColor: new THREE.Color("#00E5FF"),
    glowIntensity: 0.6,
    glowPower: 2.5,
    time: 0,
  },
  // Vertex shader
  `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
      vViewDir = normalize(-mvPos.xyz);
      gl_Position = projectionMatrix * mvPos;
    }
  `,
  // Fragment shader
  `
    uniform vec3 glowColor;
    uniform float glowIntensity;
    uniform float glowPower;
    uniform float time;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      float fresnel = 1.0 - abs(dot(vNormal, vViewDir));
      fresnel = pow(fresnel, glowPower);
      float pulse = 0.9 + 0.1 * sin(time * 1.5);
      float alpha = fresnel * glowIntensity * pulse;
      gl_FragColor = vec4(glowColor, alpha);
    }
  `
);

extend({ GlowEdgeShaderMaterial });

// TypeScript declaration for the custom shader material
declare module "@react-three/fiber" {
  interface ThreeElements {
    glowEdgeShaderMaterial: any;
  }
}

/* ─── Reusable outline shell component ─── */
function GlowOutline({
  geometry,
  scale = 1.04,
  intensity = 0.6,
  power = 2.5,
}: {
  geometry: THREE.BufferGeometry;
  scale?: number;
  intensity?: number;
  power?: number;
}) {
  const matRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.time.value = clock.elapsedTime;
    }
  });

  return (
    <mesh geometry={geometry} scale={scale}>
      <glowEdgeShaderMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        side={THREE.FrontSide}
        glowColor={new THREE.Color("#00E5FF")}
        glowIntensity={intensity}
        glowPower={power}
      />
    </mesh>
  );
}

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
        <sphereGeometry args={[0.05, 24, 24]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <pointLight color="#00E5FF" intensity={1.5} distance={3} decay={2} />
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
          emissive="#00E5FF"
          emissiveIntensity={0.03}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      {/* Cyan edge glow on head */}
      <GlowOutline geometry={headGeo} scale={1.02} intensity={0.7} power={2.8} />

      {/* Face screen recess */}
      <mesh position={[0, -0.02, 0.33]} geometry={screenGeo}>
        <meshStandardMaterial
          color="#050508"
          emissive="#00E5FF"
          emissiveIntensity={0.02}
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Eyes */}
      <Eye position={[-0.08, -0.01, 0.36]} />
      <Eye position={[0.08, -0.01, 0.36]} />
    </group>
  );
}

/* ─── Headphone band over the top ─── */
function HeadphoneBand() {
  const bandGeo = useMemo(() => new THREE.TorusGeometry(0.42, 0.025, 8, 32, Math.PI), []);

  return (
    <group position={[0, 0.95, 0]}>
      <mesh rotation={[0, 0, 0]} geometry={bandGeo}>
        <meshStandardMaterial
          color="#0d0d14"
          emissive="#00E5FF"
          emissiveIntensity={0.04}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>
      <GlowOutline geometry={bandGeo} scale={1.06} intensity={0.4} power={2.0} />
    </group>
  );
}

/* ─── Bulky round headphone cup ─── */
function HeadphoneCup({ side }: { side: "left" | "right" }) {
  const sign = side === "left" ? -1 : 1;
  const outerGeo = useMemo(() => new THREE.CylinderGeometry(0.13, 0.14, 0.1, 24), []);

  return (
    <group position={[sign * 0.42, 0.8, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]} geometry={outerGeo}>
        <meshStandardMaterial
          color="#0a0a0f"
          emissive="#00E5FF"
          emissiveIntensity={0.03}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      {/* Glow outline on cup */}
      <mesh rotation={[0, 0, Math.PI / 2]} scale={1.05}>
        <cylinderGeometry args={[0.13, 0.14, 0.1, 24]} />
        <glowEdgeShaderMaterial
          transparent
          depthWrite={false}
          side={THREE.FrontSide}
          glowColor={new THREE.Color("#00E5FF")}
          glowIntensity={0.4}
          glowPower={2.5}
        />
      </mesh>
      {/* Inner pad */}
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
  const armGeo = useMemo(() => new THREE.CapsuleGeometry(0.06, 0.12, 8, 16), []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = sign * (0.12 + Math.sin(clock.elapsedTime * 1.2 + sign) * 0.06);
      ref.current.position.y = Math.sin(clock.elapsedTime * 1.2 + sign * 0.5) * 0.015;
    }
  });

  return (
    <group ref={ref} position={[sign * 0.36, 0.18, 0]}>
      <mesh geometry={armGeo}>
        <meshStandardMaterial
          color="#0a0a0f"
          emissive="#00E5FF"
          emissiveIntensity={0.03}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      <GlowOutline geometry={armGeo} scale={1.05} intensity={0.5} power={2.5} />
    </group>
  );
}

/* ─── Flat oval feet ─── */
function Foot({ side }: { side: "left" | "right" }) {
  const sign = side === "left" ? -1 : 1;
  const footGeo = useMemo(() => new THREE.CapsuleGeometry(0.06, 0.04, 8, 16), []);

  return (
    <group position={[sign * 0.13, -0.18, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh geometry={footGeo}>
        <meshStandardMaterial
          color="#0a0a0f"
          emissive="#00E5FF"
          emissiveIntensity={0.03}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      <GlowOutline geometry={footGeo} scale={1.06} intensity={0.5} power={2.5} />
    </group>
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
    <group position={[0, 0.2, 0]}>
      <mesh geometry={bodyGeo}>
        <meshStandardMaterial
          color="#0a0a0f"
          emissive="#00E5FF"
          emissiveIntensity={0.03}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      <GlowOutline geometry={bodyGeo} scale={1.03} intensity={0.6} power={2.5} />
    </group>
  );
}

/* ─── Short neck connector ─── */
function Neck() {
  const neckGeo = useMemo(() => new THREE.CylinderGeometry(0.07, 0.09, 0.1, 12), []);

  return (
    <group position={[0, 0.5, 0]}>
      <mesh geometry={neckGeo}>
        <meshStandardMaterial
          color="#070710"
          emissive="#00E5FF"
          emissiveIntensity={0.03}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      <GlowOutline geometry={neckGeo} scale={1.06} intensity={0.4} power={2.5} />
    </group>
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
    <div style={{ width: "100%", height: "100%", minHeight: 0 }}>
      <Canvas
        camera={{ position: [0, 0.45, 3.8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        {/* Lighting — front fill + rim */}
        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 4, 5]} intensity={0.6} color="#ffffff" />
        <directionalLight position={[-2, 2, -3]} intensity={0.3} color="#6366F1" />
        {/* Front fill light so the face/eyes are always visible */}
        <directionalLight position={[0, 0.5, 4]} intensity={0.4} color="#ffffff" />
        {/* Cyan-tinted rim lights for edge visibility */}
        <directionalLight position={[0, 1, -4]} intensity={0.5} color="#00E5FF" />
        <directionalLight position={[-3, 0, 0]} intensity={0.25} color="#00E5FF" />
        <directionalLight position={[3, 0, 0]} intensity={0.25} color="#00E5FF" />
        {/* Underneath subtle cyan fill */}
        <directionalLight position={[0, -2, 0]} intensity={0.15} color="#00E5FF" />

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
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.8}
          minDistance={1.5}
          maxDistance={6}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.5}
          target={[0, 0.45, 0]}
        />
      </Canvas>
    </div>
  );
}
