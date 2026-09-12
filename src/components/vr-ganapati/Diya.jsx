import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function DiyaFlame({ isLit, position, scale = 1.0 }) {
  const flameRef = useRef();
  const innerFlameRef = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    if (!isLit) return;
    const t = state.clock.getElapsedTime();

    const flicker = Math.sin(t * 14) * 0.08 + Math.cos(t * 23) * 0.06;
    const flickerY = Math.cos(t * 17) * 0.12;

    if (flameRef.current) {
      flameRef.current.scale.set(
        scale * (1 + flicker * 0.5),
        scale * (1 + flickerY),
        scale * (1 + flicker * 0.5)
      );
      flameRef.current.rotation.z = Math.sin(t * 8) * 0.06;
    }

    if (innerFlameRef.current) {
      innerFlameRef.current.scale.set(
        scale * (0.85 + flicker * 0.3),
        scale * (0.9 + flickerY * 0.8),
        scale * (0.85 + flicker * 0.3)
      );
    }

    if (lightRef.current) {
      lightRef.current.intensity = (3.2 + flicker * 2.0) * scale;
    }
  });

  if (!isLit) return null;

  return (
    <group position={position}>
      {/* Outer Flame Glow */}
      <mesh ref={flameRef} position={[0, 0.16 * scale, 0]}>
        <coneGeometry args={[0.08 * scale, 0.32 * scale, 16]} />
        <meshBasicMaterial
          color="#ff7700"
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Inner White-Hot Flame Core */}
      <mesh ref={innerFlameRef} position={[0, 0.12 * scale, 0]}>
        <coneGeometry args={[0.045 * scale, 0.19 * scale, 16]} />
        <meshBasicMaterial
          color="#fff6cc"
          transparent
          opacity={0.96}
        />
      </mesh>

      {/* Radiant Flame Halo Sprite */}
      <mesh position={[0, 0.16 * scale, 0]}>
        <sphereGeometry args={[0.22 * scale, 16, 16]} />
        <meshBasicMaterial
          color="#ff9900"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Dynamic Flickering Diya Light (Point lights do not cast expensive cube-map shadows) */}
      <pointLight
        ref={lightRef}
        color="#ffaa33"
        intensity={3.2 * scale}
        distance={10.0}
        decay={1.2}
      />
    </group>
  );
}

export default function Diya({ isLit }) {
  const { scene } = useGLTF('/models/diya.glb');

  const createClonedDiya = useMemo(() => {
    return () => {
      const clone = scene.clone(true);
      clone.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false;
          child.receiveShadow = true;
          if (child.material) {
            child.material = child.material.clone();
            child.material.metalness = 0.92;
            child.material.roughness = 0.22;
            child.material.color = new THREE.Color('#d4af37'); // Classic temple brass
          }
        }
      });
      return clone;
    };
  }, [scene]);

  const diyaL1 = useMemo(() => createClonedDiya(), [createClonedDiya]);
  const diyaR1 = useMemo(() => createClonedDiya(), [createClonedDiya]);
  const diyaL2 = useMemo(() => createClonedDiya(), [createClonedDiya]);
  const diyaR2 = useMemo(() => createClonedDiya(), [createClonedDiya]);
  const diyaL3 = useMemo(() => createClonedDiya(), [createClonedDiya]);
  const diyaR3 = useMemo(() => createClonedDiya(), [createClonedDiya]);

  const bigScale = 0.85;
  const bigFlameY = 4.04 * bigScale * 0.92;

  const medScale = 0.52;
  const medFlameY = 4.04 * medScale * 0.92;

  const sideScale = 0.65;
  const sideFlameY = 4.04 * sideScale * 0.92;

  return (
    <group>
      {/* 1. Grand Brass Samai Standing Lamps (flanking Lord Ganesha's throne steps) */}
      <group position={[-3.4, -2.88, 1.8]}>
        <primitive object={diyaL1} scale={[bigScale, bigScale, bigScale]} />
        <DiyaFlame isLit={isLit} position={[0, bigFlameY, 0]} scale={1.2} />
      </group>

      <group position={[3.4, -2.88, 1.8]}>
        <primitive object={diyaR1} scale={[bigScale, bigScale, bigScale]} />
        <DiyaFlame isLit={isLit} position={[0, bigFlameY, 0]} scale={1.2} />
      </group>

      {/* 2. Step Accent Deepams (framing the front steps) */}
      <group position={[-1.8, -2.88, 3.2]}>
        <primitive object={diyaL2} scale={[medScale, medScale, medScale]} />
        <DiyaFlame isLit={isLit} position={[0, medFlameY, 0]} scale={0.8} />
      </group>

      <group position={[1.8, -2.88, 3.2]}>
        <primitive object={diyaR2} scale={[medScale, medScale, medScale]} />
        <DiyaFlame isLit={isLit} position={[0, medFlameY, 0]} scale={0.8} />
      </group>

      {/* 3. Outer Sanctuary Deepams (flanking the sides) */}
      <group position={[-5.0, -2.88, 2.6]}>
        <primitive object={diyaL3} scale={[sideScale, sideScale, sideScale]} />
        <DiyaFlame isLit={isLit} position={[0, sideFlameY, 0]} scale={0.9} />
      </group>

      <group position={[5.0, -2.88, 2.6]}>
        <primitive object={diyaR3} scale={[sideScale, sideScale, sideScale]} />
        <DiyaFlame isLit={isLit} position={[0, sideFlameY, 0]} scale={0.9} />
      </group>
    </group>
  );
}
