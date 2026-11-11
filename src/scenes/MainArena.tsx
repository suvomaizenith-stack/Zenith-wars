import { Canvas } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import Fighter from "../components/Fighter";

function ArenaObjects() {
  return (
    <>
      <color attach="background" args={["#080711"]} />

      <fog attach="fog" args={["#080711", 9, 23]} />

      <ambientLight intensity={0.7} />

      <spotLight
        position={[-4, 7, 4]}
        intensity={90}
        color="#9b55ff"
        angle={0.7}
        penumbra={0.8}
        castShadow
      />

      <spotLight
        position={[4, 7, -2]}
        intensity={100}
        color="#ff7438"
        angle={0.7}
        penumbra={0.8}
      />

      <pointLight
        position={[0, 3, 2]}
        intensity={20}
        color="#ffffff"
      />

      <Stars
        radius={70}
        depth={35}
        count={900}
        factor={3}
        fade
        speed={0.5}
      />

      {/* Arena platform */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[5, 5.5, 0.4, 64]} />
        <meshStandardMaterial
          color="#171323"
          metalness={0.75}
          roughness={0.3}
        />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
      >
        <circleGeometry args={[4.8, 64]} />
        <meshStandardMaterial
          color="#211532"
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>

      <gridHelper
        args={[30, 30, "#7544a8", "#251c36"]}
        position={[0, 0.015, 0]}
      />

      {/* Left fighter */}
      <Float speed={1.2} floatIntensity={0.12}>
        <Fighter
          position={[-1.8, 0, 0]}
          color="#6436a5"
          accent="#d5a4ff"
          phase={0}
        />
      </Float>

      {/* Right fighter */}
      <Float speed={1.2} floatIntensity={0.12}>
        <Fighter
          position={[1.8, 0, 0]}
          color="#a94724"
          accent="#ffb17b"
          phase={2}
        />
      </Float>
    </>
  );
}

export default function MainArena() {
  return (
    <Canvas
      camera={{
        position: [0, 2.8, 9],
        fov: 42,
      }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
    >
      <ArenaObjects />
    </Canvas>
  );
}