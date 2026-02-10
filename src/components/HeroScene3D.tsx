import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const FloatingGeometry = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.1;
      wireRef.current.rotation.y = -t * 0.15;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.8, 1]} />
          <MeshDistortMaterial
            color="#d4920a"
            transparent
            opacity={0.15}
            distort={0.3}
            speed={2}
            roughness={0.4}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
        <mesh ref={wireRef} position={[0, 0, 0]}>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshBasicMaterial
            color="#d4920a"
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>
      </Float>
    </>
  );
};

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 800;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#d4920a"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const RingGeometry = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.1;
      ref.current.rotation.x = Math.PI / 3;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -1]}>
      <torusGeometry args={[3, 0.01, 16, 100]} />
      <meshBasicMaterial color="#d4920a" transparent opacity={0.15} />
    </mesh>
  );
};

const HeroScene3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#d4920a" />
        <pointLight position={[-5, -5, 3]} intensity={0.4} color="#f0c040" />
        <FloatingGeometry />
        <ParticleField />
        <RingGeometry />
      </Canvas>
    </div>
  );
};

export default HeroScene3D;
