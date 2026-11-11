
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

interface FighterProps {
  position: [number, number, number];
  color: string;
  accent: string;
  phase?: number;
  idleAnimation?: boolean;
}

export default function Fighter({
  position,
  color,
  accent,
  phase = 0,
  idleAnimation = true,
}: FighterProps) {
  const fighter = useRef<Group>(null);

  useFrame((state) => {
    if (!fighter.current || !idleAnimation) return;

    const time = state.clock.elapsedTime;

    fighter.current.position.y =
      position[1] + Math.sin(time * 2 + phase) * 0.055;

    fighter.current.rotation.y =
      Math.sin(time * 0.8 + phase) * 0.06;
  });

  return (
    <group ref={fighter} position={position}>
      {/* Head */}
      <mesh position={[0, 2.15, 0]}>
        <sphereGeometry args={[0.36, 32, 32]} />
        <meshStandardMaterial
          color={accent}
          roughness={0.45}
          metalness={0.25}
        />
      </mesh>

      {/* Body */}
      <mesh position={[0, 1.35, 0]}>
        <capsuleGeometry args={[0.35, 0.65, 8, 16]} />
        <meshStandardMaterial
          color={color}
          roughness={0.5}
          metalness={0.35}
        />
      </mesh>

      {/* Belt */}
      <mesh position={[0, 0.92, 0]}>
        <boxGeometry args={[0.65, 0.13, 0.42]} />
        <meshStandardMaterial color={accent} />
      </mesh>

      {/* Arms */}
      {[-1, 1].map((side) => (
        <group
          key={side}
          position={[side * 0.49, 1.45, 0]}
          rotation={[0, 0, side * -0.22]}
        >
          <mesh position={[0, -0.27, 0]}>
            <capsuleGeometry args={[0.13, 0.48, 4, 10]} />
            <meshStandardMaterial color={color} />
          </mesh>

          <mesh position={[0, -0.62, 0.04]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color={accent} />
          </mesh>
        </group>
      ))}

      {/* Legs */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.2, 0.62, 0]}>
          <mesh position={[0, -0.3, 0]}>
            <capsuleGeometry args={[0.15, 0.5, 4, 10]} />
            <meshStandardMaterial color={color} />
          </mesh>

          <mesh position={[0, -0.59, 0.12]}>
            <boxGeometry args={[0.3, 0.16, 0.48]} />
            <meshStandardMaterial color="#17131e" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
