'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { ExtractionMetrics, LabSettings } from './extractionModel';

interface ExtractionSceneProps {
  settings: LabSettings;
  metrics: ExtractionMetrics;
}

function CoffeeGrounds({ settings, metrics }: ExtractionSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const particles = useMemo(
    () =>
      Array.from({ length: 90 }, (_, index) => {
        const radius = 0.15 + Math.sqrt((index % 45) / 45) * 0.66;
        const angle = index * 2.399963229728653;
        return {
          x: Math.cos(angle) * radius,
          z: Math.sin(angle) * radius,
          y: 1.47 + ((index % 7) - 3) * 0.006,
          pulse: 0.75 + (index % 9) * 0.035,
        };
      }),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.28) * 0.08;
  });

  const particleSize = 0.024 + settings.grind * 0.006;
  const extractionGlow = metrics.extraction / 27;

  return (
    <group ref={groupRef}>
      <mesh position={[0, 1.43, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.86, 0.58, 0.11, 64]} />
        <meshStandardMaterial color="#3b2014" roughness={0.9} />
      </mesh>
      {particles.map((particle, index) => (
        <mesh
          key={index}
          position={[particle.x, particle.y + extractionGlow * 0.05 * particle.pulse, particle.z]}
          scale={particle.pulse}
        >
          <sphereGeometry args={[particleSize, 10, 10]} />
          <meshStandardMaterial
            color={metrics.cup === 'Over-extracted' ? '#21110c' : '#4b2819'}
            emissive="#8a4a25"
            emissiveIntensity={0.04 + extractionGlow * 0.16}
            roughness={0.95}
          />
        </mesh>
      ))}
    </group>
  );
}

function PourStream({ settings, metrics }: ExtractionSceneProps) {
  const streamRef = useRef<THREE.Mesh>(null);
  const dropletRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (streamRef.current) {
      streamRef.current.scale.y = 0.82 + Math.sin(clock.elapsedTime * 5.5) * 0.05;
    }
    if (dropletRef.current) {
      dropletRef.current.children.forEach((child, index) => {
        child.position.y = 2.65 - ((clock.elapsedTime * (0.9 + settings.pourSpeed / 9) + index * 0.34) % 1.4);
      });
    }
  });

  const radius = 0.018 + settings.pourSpeed * 0.006;
  const opacity = 0.34 + metrics.balance / 250;

  return (
    <group>
      <mesh ref={streamRef} position={[-0.18, 2.15, 0]} rotation={[0.04, 0, -0.12]}>
        <cylinderGeometry args={[radius, radius * 0.72, 1.55, 18]} />
        <meshStandardMaterial color="#8bdff0" transparent opacity={opacity} roughness={0.2} />
      </mesh>
      <group ref={dropletRef}>
        {[0, 1, 2, 3, 4].map((item) => (
          <mesh key={item} position={[-0.18 + item * 0.018, 2.6 - item * 0.24, 0]}>
            <sphereGeometry args={[radius * 1.8, 12, 12]} />
            <meshStandardMaterial color="#bef6ff" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function BrewerRig({ settings, metrics }: ExtractionSceneProps) {
  const liquidHeight = 0.18 + (settings.brewTime / 300) * 0.62;
  const liquidColor =
    metrics.cup === 'Under-extracted' ? '#a05a2c' : metrics.cup === 'Over-extracted' ? '#24100a' : '#6f351c';

  return (
    <group>
      <mesh position={[0, 1.86, 0]}>
        <cylinderGeometry args={[1.08, 0.35, 1.12, 64, 1, true]} />
        <meshPhysicalMaterial color="#f7efe3" roughness={0.38} metalness={0.02} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 2.43, 0]}>
        <torusGeometry args={[1.08, 0.035, 12, 72]} />
        <meshStandardMaterial color="#f6d7a8" roughness={0.32} />
      </mesh>
      <CoffeeGrounds settings={settings} metrics={metrics} />
      <mesh position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.72, 0.9, 0.92, 64, 1, true]} />
        <meshPhysicalMaterial color="#d8f7ff" transparent opacity={0.18} roughness={0.08} transmission={0.55} />
      </mesh>
      <mesh position={[0, 0.17 + liquidHeight / 2, 0]}>
        <cylinderGeometry args={[0.66, 0.78, liquidHeight, 64]} />
        <meshStandardMaterial color={liquidColor} roughness={0.48} metalness={0.02} />
      </mesh>
      <mesh position={[0, 1.08 + liquidHeight * 0.15, 0]}>
        <torusGeometry args={[0.62, 0.012, 8, 64]} />
        <meshStandardMaterial color="#f3c179" transparent opacity={0.5} />
      </mesh>
      <mesh position={[1.02, 0.63, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.34, 0.035, 12, 42, Math.PI * 1.35]} />
        <meshStandardMaterial color="#c6eef7" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function Kettle() {
  const kettleRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!kettleRef.current) return;
    kettleRef.current.rotation.z = -0.2 + Math.sin(clock.elapsedTime * 0.8) * 0.025;
  });

  return (
    <group ref={kettleRef} position={[-1.35, 3.05, 0]} rotation={[0.05, 0, -0.2]}>
      <mesh>
        <sphereGeometry args={[0.42, 32, 20]} />
        <meshStandardMaterial color="#a6b7bd" roughness={0.22} metalness={0.5} />
      </mesh>
      <mesh position={[0.58, -0.12, 0]} rotation={[0, 0, -0.75]}>
        <cylinderGeometry args={[0.035, 0.026, 0.88, 18]} />
        <meshStandardMaterial color="#c6d3d7" roughness={0.18} metalness={0.55} />
      </mesh>
      <mesh position={[-0.15, 0.46, 0]}>
        <torusGeometry args={[0.28, 0.025, 10, 32, Math.PI]} />
        <meshStandardMaterial color="#d7e0e3" roughness={0.2} metalness={0.5} />
      </mesh>
    </group>
  );
}

function FlavorOrbit({ metrics }: { metrics: ExtractionMetrics }) {
  const groupRef = useRef<THREE.Group>(null);
  const notes = [
    { value: metrics.acidity, color: '#ff6b6b', offset: 0 },
    { value: metrics.sweetness, color: '#f6c453', offset: 2.1 },
    { value: metrics.body, color: '#5eead4', offset: 4.2 },
  ];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.2;
  });

  return (
    <group ref={groupRef} position={[0, 1.22, 0]}>
      {notes.map((note, index) => {
        const radius = 1.45 + note.value / 220;
        return (
          <mesh
            key={note.color}
            position={[Math.cos(note.offset) * radius, 0.18 + index * 0.12, Math.sin(note.offset) * radius]}
          >
            <sphereGeometry args={[0.07 + note.value / 1500, 20, 20]} />
            <meshStandardMaterial color={note.color} emissive={note.color} emissiveIntensity={0.28} />
          </mesh>
        );
      })}
    </group>
  );
}

function SceneContents(props: ExtractionSceneProps) {
  return (
    <>
      <color attach="background" args={['#101820']} />
      <fog attach="fog" args={['#101820', 6, 12]} />
      <ambientLight intensity={0.62} />
      <directionalLight position={[3, 5, 4]} intensity={1.7} color="#fff1cf" />
      <pointLight position={[-2.5, 2.4, 2]} intensity={7} color="#3fd0c9" />
      <pointLight position={[2.8, 1.2, 1.8]} intensity={4} color="#ffb55a" />
      <group rotation={[0, -0.25, 0]} position={[0, -0.55, 0]}>
        <Kettle />
        <PourStream {...props} />
        <BrewerRig {...props} />
        <FlavorOrbit metrics={props.metrics} />
        <mesh position={[0, -0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.1, 96]} />
          <meshStandardMaterial color="#1b2b2d" roughness={0.85} />
        </mesh>
      </group>
    </>
  );
}

export default function ExtractionScene(props: ExtractionSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 2.7, 5.4], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      className="h-full w-full"
    >
      <SceneContents {...props} />
    </Canvas>
  );
}
