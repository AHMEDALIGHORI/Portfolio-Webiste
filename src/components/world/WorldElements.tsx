import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, Float } from "@react-three/drei";
import * as THREE from "three";

// Hook for mouse-reactive parallax
const useMouseParallax = (intensity: number = 1) => {
  const offset = useRef(new THREE.Vector2());

  useFrame(({ pointer }) => {
    offset.current.x += (pointer.x * intensity * 0.5 - offset.current.x) * 0.05;
    offset.current.y += (pointer.y * intensity * 0.3 - offset.current.y) * 0.05;
  });

  return offset;
};

// Camera that follows scroll
export const ScrollCamera = () => {
  const scroll = useScroll();
  const cameraPositions = useMemo(
    () => [
      new THREE.Vector3(0, 3, 20),
      new THREE.Vector3(5, 5, 2),
      new THREE.Vector3(-8, 7, -20),
      new THREE.Vector3(6, 5, -44),
      new THREE.Vector3(-2, 4, -68),
    ],
    []
  );
  const lookAtTargets = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(6, 2, -10),
      new THREE.Vector3(-4, 5, -28),
      new THREE.Vector3(8, 2, -50),
      new THREE.Vector3(0, 1, -74),
    ],
    []
  );

  useFrame(({ camera }) => {
    const offset = scroll.offset;
    const totalSections = cameraPositions.length - 1;
    const progress = offset * totalSections;
    const index = Math.min(Math.floor(progress), totalSections - 1);
    const t = progress - index;
    const smooth = t * t * (3 - 2 * t);

    const pos = new THREE.Vector3().lerpVectors(
      cameraPositions[index],
      cameraPositions[index + 1],
      smooth
    );
    const look = new THREE.Vector3().lerpVectors(
      lookAtTargets[index],
      lookAtTargets[index + 1],
      smooth
    );

    camera.position.lerp(pos, 0.08);
    const currentLook = new THREE.Vector3();
    camera.getWorldDirection(currentLook);
    const targetDir = look.clone().sub(camera.position).normalize();
    currentLook.lerp(targetDir, 0.06);
    camera.lookAt(camera.position.clone().add(currentLook));
  });

  return null;
};

// Floating platform geometry
export const Platform = ({
  position,
  size = [6, 0.3, 6],
  color = "#d4920a",
}: {
  position: [number, number, number];
  size?: [number, number, number];
  color?: string;
}) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(clock.getElapsedTime() * 0.5 + position[0]) * 0.15;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.08}
        roughness={0.3}
      />
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
        <lineBasicMaterial color={color} transparent opacity={0.25} />
      </lineSegments>
    </mesh>
  );
};

// Floating decorative shapes with mouse parallax
export const FloatingShape = ({
  position,
  type = "icosahedron",
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  type?: "icosahedron" | "octahedron" | "torus" | "torusKnot" | "dodecahedron";
  scale?: number;
  speed?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const mouseOffset = useMouseParallax(scale * 0.8);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.2 * speed;
      ref.current.rotation.y = clock.getElapsedTime() * 0.3 * speed;
      ref.current.position.x = position[0] + mouseOffset.current.x;
      ref.current.position.y =
        position[1] + mouseOffset.current.y + Math.sin(clock.getElapsedTime() * 0.8 + position[0]) * 0.1;
    }
  });

  const geometries: Record<string, JSX.Element> = {
    icosahedron: <icosahedronGeometry args={[0.5 * scale, 0]} />,
    octahedron: <octahedronGeometry args={[0.5 * scale, 0]} />,
    torus: <torusGeometry args={[0.4 * scale, 0.15 * scale, 16, 32]} />,
    torusKnot: <torusKnotGeometry args={[0.35 * scale, 0.1 * scale, 64, 16]} />,
    dodecahedron: <dodecahedronGeometry args={[0.45 * scale, 0]} />,
  };

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={position}>
        {geometries[type]}
        <meshStandardMaterial
          color="#d4920a"
          wireframe
          transparent
          opacity={0.3}
          emissive="#d4920a"
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
};

// Atmosphere particles with mouse parallax
export const WorldParticles = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 2000;
  const mouseOffset = useMouseParallax(0.4);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 120 - 20;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.01 + mouseOffset.current.x * 0.02;
      ref.current.rotation.x = mouseOffset.current.y * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#d4920a"
        size={0.04}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Connection lines between platforms
export const ConnectionBeam = ({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) => {
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2 + (Math.random() - 0.5) * 4,
        (start[1] + end[1]) / 2 + 3,
        (start[2] + end[2]) / 2
      ),
      new THREE.Vector3(...end),
    ]);
    return curve.getPoints(50);
  }, [start, end]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#d4920a" transparent opacity={0.06} />
    </line>
  );
};

// Orbiting ring with mouse parallax
export const OrbitalRing = ({
  position,
  radius = 3,
  speed = 0.3,
}: {
  position: [number, number, number];
  radius?: number;
  speed?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const mouseOffset = useMouseParallax(0.6);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * speed;
      ref.current.rotation.x =
        Math.PI / 3 + Math.sin(clock.getElapsedTime() * 0.5) * 0.2 + mouseOffset.current.y * 0.1;
      ref.current.position.x = position[0] + mouseOffset.current.x * 0.3;
      ref.current.position.y = position[1] + mouseOffset.current.y * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, 0.01, 16, 100]} />
      <meshBasicMaterial color="#d4920a" transparent opacity={0.15} />
    </mesh>
  );
};
