import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import {
  ScrollCamera,
  Platform,
  FloatingShape,
  WorldParticles,
  ConnectionBeam,
  OrbitalRing,
} from "./WorldElements";
import WorldOverlay from "./WorldOverlay";

const WorldScene = () => {
  return (
    <>
      <ScrollCamera />

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#d4920a" />
      <pointLight position={[-10, 5, -20]} intensity={0.4} color="#f0c040" />
      <pointLight position={[5, 8, -50]} intensity={0.5} color="#d4920a" />
      <pointLight position={[-5, 3, -70]} intensity={0.4} color="#f0c040" />
      <fog attach="fog" args={["#0a0a0a", 20, 80]} />

      {/* Global particles */}
      <WorldParticles />

      {/* ===== HERO AREA (z ~ 0) ===== */}
      <Platform position={[0, -1.5, 0]} size={[12, 0.2, 12]} />
      <OrbitalRing position={[0, 1, 0]} radius={6} speed={0.15} />
      <FloatingShape position={[-6, 2, -4]} type="octahedron" scale={0.7} />
      <FloatingShape position={[7, 3, 3]} type="dodecahedron" scale={0.5} />
      <FloatingShape position={[0, 5, -1]} type="torusKnot" scale={1} speed={0.4} />

      {/* ===== ABOUT AREA (z ~ -12) ===== */}
      <ConnectionBeam start={[3, -1, -5]} end={[5, 0, -9]} />
      <Platform position={[6, 0, -12]} size={[9, 0.2, 9]} />
      <OrbitalRing position={[6, 2, -12]} radius={4.5} speed={0.2} />
      <FloatingShape position={[12, 3, -10]} type="icosahedron" scale={0.6} />
      <FloatingShape position={[2, 4, -14]} type="torus" scale={0.8} />
      <FloatingShape position={[9, 5, -15]} type="octahedron" scale={0.4} speed={0.6} />

      {/* ===== SKILLS AREA (z ~ -28) ===== */}
      <ConnectionBeam start={[3, 0.5, -16]} end={[-2, 3, -24]} />
      <Platform position={[-4, 3, -28]} size={[11, 0.2, 9]} />
      <OrbitalRing position={[-4, 5, -28]} radius={5.5} speed={0.25} />
      <FloatingShape position={[-10, 6, -25]} type="dodecahedron" scale={0.5} />
      <FloatingShape position={[2, 7, -31]} type="torusKnot" scale={0.7} speed={0.35} />
      <FloatingShape position={[-8, 8, -30]} type="icosahedron" scale={0.4} />
      {/* Skill orbs */}
      {[
        [-6, 5.5, -26],
        [-2, 6, -27],
        [-5, 6.5, -29],
        [-1, 5, -30],
        [-8, 5, -28],
      ].map((pos, i) => (
        <FloatingShape
          key={`skill-${i}`}
          position={pos as [number, number, number]}
          type="octahedron"
          scale={0.25}
          speed={0.4 + i * 0.15}
        />
      ))}

      {/* ===== PROJECTS AREA (z ~ -48) ===== */}
      <ConnectionBeam start={[0, 3.5, -33]} end={[5, 1, -43]} />
      <Platform position={[8, 0, -48]} size={[13, 0.2, 11]} />
      <OrbitalRing position={[8, 2, -48]} radius={6.5} speed={0.12} />
      <FloatingShape position={[15, 3, -45]} type="torus" scale={0.9} />
      <FloatingShape position={[3, 4, -52]} type="dodecahedron" scale={0.6} speed={0.5} />
      <FloatingShape position={[12, 5, -51]} type="icosahedron" scale={0.4} />

      {/* ===== CONTACT AREA (z ~ -72) ===== */}
      <ConnectionBeam start={[5, 0.5, -54]} end={[1, 0, -66]} />
      <Platform position={[0, -1, -72]} size={[10, 0.2, 10]} />
      <OrbitalRing position={[0, 1.5, -72]} radius={5} speed={0.3} />
      <FloatingShape position={[-5, 2.5, -70]} type="torusKnot" scale={0.7} speed={0.25} />
      <FloatingShape position={[6, 3, -74]} type="octahedron" scale={0.5} />
    </>
  );
};

const FloatingWorld = () => {
  return (
    <div className="fixed inset-0 bg-background">
      <Canvas
        camera={{ position: [0, 3, 20], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <ScrollControls pages={5} damping={0.25}>
          <WorldScene />
          <Scroll html>
            <WorldOverlay />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default FloatingWorld;
