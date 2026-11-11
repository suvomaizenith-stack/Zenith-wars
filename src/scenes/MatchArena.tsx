
import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import type { Group } from "three";

import Fighter from "../components/Fighter";
import CombatHUD from "../components/CombatHUD";
import type { Character } from "../data/characters";

interface MatchArenaProps {
  player: Character;
  opponent: Character;
  onExit: () => void;
}

function ArenaScene({
  player,
  opponent,
}: {
  player: Character;
  opponent: Character;
}) {
  // Fighter references
  const playerRoot = useRef<Group>(null);
  const opponentRoot = useRef<Group>(null);

  // Keyboard and jump state
  const keys = useRef(new Set<string>());
  const jumpRequested = useRef(false);

  const velocityY = useRef(0);
  const grounded = useRef(true);

  // Keyboard event listeners
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (
        [" ", "arrowleft", "arrowright", "arrowup"].includes(key)
      ) {
        event.preventDefault();
      }

      if (
        (key === " " || key === "w" || key === "arrowup") &&
        !event.repeat
      ) {
        jumpRequested.current = true;
      }

      keys.current.add(key);
    };

    const onKeyUp = (event: KeyboardEvent) => {
      keys.current.delete(event.key.toLowerCase());
    };

    const onBlur = () => {
      keys.current.clear();
      jumpRequested.current = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  // Game movement loop
  useFrame((_, delta) => {
    const playerGroup = playerRoot.current;
    const opponentGroup = opponentRoot.current;

    if (!playerGroup || !opponentGroup) return;

    const dt = Math.min(delta, 0.05);

    const speed = 4.5;
    const gravity = 18;
    const jumpForce = 7.5;

    // Horizontal movement
    let direction = 0;

    if (
      keys.current.has("a") ||
      keys.current.has("arrowleft")
    ) {
      direction -= 1;
    }

    if (
      keys.current.has("d") ||
      keys.current.has("arrowright")
    ) {
      direction += 1;
    }

    playerGroup.position.x += direction * speed * dt;

    // Arena boundaries
    playerGroup.position.x = Math.max(
      -4.5,
      Math.min(4.5, playerGroup.position.x)
    );

    // Jump initiation
    if (jumpRequested.current && grounded.current) {
      velocityY.current = jumpForce;
      grounded.current = false;
    }

    jumpRequested.current = false;

    // Gravity
    velocityY.current -= gravity * dt;
    playerGroup.position.y += velocityY.current * dt;

    // Ground collision
    if (playerGroup.position.y <= 0) {
      playerGroup.position.y = 0;
      velocityY.current = 0;
      grounded.current = true;
    }
  });

  return (
    <>
      <color attach="background" args={["#080711"]} />
      <fog attach="fog" args={["#080711", 12, 30]} />

      <ambientLight intensity={0.8} />

      <directionalLight
        position={[0, 8, 5]}
        intensity={2.5}
        castShadow
      />

      <spotLight
        position={[-5, 7, 3]}
        intensity={100}
        color={player.accent}
        angle={0.8}
        penumbra={0.8}
      />

      <spotLight
        position={[5, 7, 3]}
        intensity={100}
        color={opponent.accent}
        angle={0.8}
        penumbra={0.8}
      />

      <Stars
        radius={70}
        depth={40}
        count={1200}
        factor={3}
        fade
        speed={0.4}
      />

      {/* Arena floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, 0]}
        receiveShadow
      >
        <planeGeometry args={[30, 12]} />
        <meshStandardMaterial
          color="#171020"
          metalness={0.5}
          roughness={0.65}
        />
      </mesh>

      {/* Fighting platform */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[12, 0.3, 4]} />
        <meshStandardMaterial
          color="#251532"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Platform edge lighting */}
      <mesh position={[0, -0.02, 2.02]}>
        <boxGeometry args={[12, 0.045, 0.04]} />
        <meshBasicMaterial color="#a45aff" />
      </mesh>

      {/* Background grid */}
      <gridHelper
        args={[30, 30, "#7544a8", "#251c36"]}
        position={[0, 0.01, -2]}
      />

      {/* Player fighter */}
      <group ref={playerRoot} position={[-2.4, 0, 0]}>
        <Fighter
          position={[0, 0, 0]}
          color={player.color}
          accent={player.accent}
          idleAnimation={false}
        />
      </group>

      {/* Opponent fighter */}
      <group
        ref={opponentRoot}
        position={[2.4, 0, 0]}
        rotation={[0, Math.PI, 0]}
      >
        <Fighter
          position={[0, 0, 0]}
          color={opponent.color}
          accent={opponent.accent}
          idleAnimation={false}
        />
      </group>
    </>
  );
}

export default function MatchArena({
  player,
  opponent,
  onExit,
}: MatchArenaProps) {
  return (
    <section className="match-screen">
      <Canvas
        camera={{
          position: [0, 3.1, 12],
          fov: 42,
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <ArenaScene
          player={player}
          opponent={opponent}
        />
      </Canvas>

      <CombatHUD
        player={player}
        opponent={opponent}
        onExit={onExit}
      />

      <div className="match-announcement">
        <span>ZENITH WARS PRESENTS</span>
        <h1>FIGHT!</h1>
        <p>THE CAMPUS SHOWDOWN BEGINS</p>
      </div>
    </section>
  );
}
