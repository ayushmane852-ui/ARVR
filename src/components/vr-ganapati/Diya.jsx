import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Snappy, responsive Diya Flame with natural organic flicker
function DiyaFlame({
  isLit,
  position,
  scale = 1.0,
  alwaysLit = false,
}) {
  const groupRef = useRef();
  const flameRef = useRef();
  const innerFlameRef = useRef();
  const haloRef = useRef();
  const lightRef = useRef();
  const currentGrowth = useRef(alwaysLit || isLit ? 1.0 : 0.0);

  useFrame((state) => {
    const clock = state.clock.getElapsedTime();
    const targetGrowth = (alwaysLit || isLit) ? 1.0 : 0.0;

    // Instant, snappy lerp transition (~0.08s) without lag
    currentGrowth.current = THREE.MathUtils.lerp(
      currentGrowth.current,
      targetGrowth,
      0.35
    );

    const g = currentGrowth.current;

    if (groupRef.current) {
      const isVisible = g > 0.01;
      groupRef.current.visible = isVisible;
      if (!isVisible) return;
    }

    // Gentle natural flame flicker
    const flicker = Math.sin(clock * 12) * 0.06 + Math.cos(clock * 19) * 0.04;
    const flickerY = Math.cos(clock * 15) * 0.08;

    if (flameRef.current) {
      flameRef.current.scale.set(
        scale * g * (1 + flicker * 0.3),
        scale * g * (1 + flickerY * 0.5),
        scale * g * (1 + flicker * 0.3)
      );
      flameRef.current.rotation.z = Math.sin(clock * 7) * 0.04;
    }

    if (innerFlameRef.current) {
      innerFlameRef.current.scale.set(
        scale * g * (0.9 + flicker * 0.2),
        scale * g * (0.95 + flickerY * 0.4),
        scale * g * (0.9 + flicker * 0.2)
      );
    }

    if (haloRef.current) {
      haloRef.current.scale.setScalar(scale * g * (1 + flicker * 0.15));
    }

    if (lightRef.current) {
      lightRef.current.intensity = (2.5 + flicker * 1.5) * scale * g;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Small Base Teardrop Bulb */}
      <mesh position={[0, 0.06 * scale, 0]}>
        <sphereGeometry args={[0.07 * scale, 12, 12]} />
        <meshBasicMaterial color="#ff7700" />
      </mesh>

      {/* Main Outer Flame Cone */}
      <mesh ref={flameRef} position={[0, 0.2 * scale, 0]}>
        <coneGeometry args={[0.08 * scale, 0.35 * scale, 16]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Inner White-Hot Core */}
      <mesh ref={innerFlameRef} position={[0, 0.14 * scale, 0]}>
        <coneGeometry args={[0.04 * scale, 0.22 * scale, 16]} />
        <meshBasicMaterial
          color="#fffae6"
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Subtle Flame Halo Glow */}
      <mesh ref={haloRef} position={[0, 0.18 * scale, 0]}>
        <sphereGeometry args={[0.22 * scale, 16, 16]} />
        <meshBasicMaterial
          color="#ff9900"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Ambient Warm Glow */}
      <mesh position={[0, 0.18 * scale, 0]}>
        <sphereGeometry args={[0.45 * scale, 12, 12]} />
        <meshBasicMaterial
          color="#ff8800"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Flickering Diya Point Light */}
      <pointLight
        ref={lightRef}
        color="#ffaa33"
        intensity={2.5 * scale}
        distance={8.0}
        decay={1.4}
      />
    </group>
  );
}

export default function Diya({ isLit, arModeActive = false }) {
  const { scene } = useGLTF('/models/diya.glb', '/draco/');

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
            child.material.color = new THREE.Color('#d4af37');
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

  // Flame heights — sitting right on top of the wick dish (model top = 4.035 local units)
  const bigScale = 0.85;
  const bigFlameY = 4.035 * bigScale + 0.03; // ~3.46

  const medScale = 0.52;
  const medFlameY = 4.035 * medScale + 0.03; // ~2.13

  const sideScale = 0.65;
  const sideFlameY = 4.035 * sideScale + 0.03; // ~2.65

  return (
    <group>
      {/* 1. Grand Brass Samai — Left (instant ignition) */}
      <group position={[-3.4, -2.88, 1.8]}>
        <primitive object={diyaL1} scale={[bigScale, bigScale, bigScale]} />
        <DiyaFlame
          isLit={isLit}
          position={[0, bigFlameY, 0]}
          scale={0.75}
        />
      </group>

      {/* Grand Brass Samai — Right (instant ignition) */}
      <group position={[3.4, -2.88, 1.8]}>
        <primitive object={diyaR1} scale={[bigScale, bigScale, bigScale]} />
        <DiyaFlame
          isLit={isLit}
          position={[0, bigFlameY, 0]}
          scale={0.75}
        />
      </group>

      {/* In AR mode, omit outer 4 background lamps for 60fps mobile rendering */}
      {!arModeActive && (
        <>
          {/* 2. Mini Step Deepams — always lit */}
          <group position={[-1.8, -2.88, 3.2]}>
            <primitive object={diyaL2} scale={[medScale, medScale, medScale]} />
            <DiyaFlame
              isLit={isLit}
              alwaysLit={true}
              position={[0, medFlameY, 0]}
              scale={0.6}
            />
          </group>

          <group position={[1.8, -2.88, 3.2]}>
            <primitive object={diyaR2} scale={[medScale, medScale, medScale]} />
            <DiyaFlame
              isLit={isLit}
              alwaysLit={true}
              position={[0, medFlameY, 0]}
              scale={0.6}
            />
          </group>

          {/* 3. Outer Sanctuary Deepams — Left (instant ignition) */}
          <group position={[-5.0, -2.88, 2.6]}>
            <primitive object={diyaL3} scale={[sideScale, sideScale, sideScale]} />
            <DiyaFlame
              isLit={isLit}
              position={[0, sideFlameY, 0]}
              scale={0.65}
            />
          </group>

          {/* Outer Sanctuary Deepam — Right (instant ignition) */}
          <group position={[5.0, -2.88, 2.6]}>
            <primitive object={diyaR3} scale={[sideScale, sideScale, sideScale]} />
            <DiyaFlame
              isLit={isLit}
              position={[0, sideFlameY, 0]}
              scale={0.65}
            />
          </group>
        </>
      )}
    </group>
  );
}
