import { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// 3D Loading geometry
const LoadingGeometry = ({ progress }: { progress: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.5;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.8;
      torusRef.current.rotation.z = t * 0.3;
      torusRef.current.scale.setScalar(0.8 + progress * 0.004);
    }
    if (icoRef.current) {
      icoRef.current.rotation.x = -t * 0.4;
      icoRef.current.rotation.y = t * 0.6;
      const s = 0.6 + Math.sin(t * 2) * 0.1;
      icoRef.current.scale.setScalar(s);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.6;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 5]} intensity={1} color="#d4920a" />
      <pointLight position={[-3, -2, 3]} intensity={0.5} color="#f0c040" />

      <Float speed={3} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={torusRef}>
          <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
          <meshStandardMaterial
            color="#d4920a"
            transparent
            opacity={0.3}
            wireframe
            emissive="#d4920a"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      <mesh ref={icoRef}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#d4920a"
          emissive="#d4920a"
          emissiveIntensity={0.4}
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh ref={ringRef}>
        <torusGeometry args={[1.5, 0.015, 16, 64]} />
        <meshBasicMaterial color="#d4920a" transparent opacity={0.25} />
      </mesh>
    </group>
  );
};

// Floating particles for loader
const LoaderParticles = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.1;
      ref.current.rotation.x = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#d4920a"
        size={0.02}
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Animate progress
    const counter = { val: 0 };
    gsap.to(counter, {
      val: 100,
      duration: 2.8,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.round(counter.val);
        setProgress(v);
        if (counterRef.current) counterRef.current.textContent = `${v}`;
      },
      onComplete: () => {
        // Exit animation
        const tl = gsap.timeline({
          onComplete: () => onComplete(),
        });

        tl.to(barRef.current, {
          scaleX: 1.2,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        })
          .to(
            textRef.current,
            { y: -30, opacity: 0, duration: 0.4, ease: "power2.in" },
            "-=0.3"
          )
          .to(containerRef.current, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.8,
            ease: "power3.inOut",
          });
      },
    });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      {/* 3D Scene */}
      <div className="w-72 h-72 sm:w-96 sm:h-96 mb-8">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <LoadingGeometry progress={progress} />
          <LoaderParticles />
        </Canvas>
      </div>

      {/* Text & progress */}
      <div ref={textRef} className="text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
          <span className="text-gradient">Ahmed Ali Ghori</span>
        </h2>
        <p className="text-sm text-muted-foreground tracking-widest uppercase mb-8">
          Loading Experience
        </p>

        {/* Progress bar */}
        <div className="w-48 sm:w-64 mx-auto">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Loading</span>
            <span>
              <span ref={counterRef}>0</span>%
            </span>
          </div>
          <div className="h-[2px] bg-secondary rounded-full overflow-hidden">
            <div
              ref={barRef}
              className="h-full bg-gradient-to-r from-primary to-gold-dim rounded-full origin-left"
              style={{
                width: `${progress}%`,
                transition: "width 0.05s linear",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
