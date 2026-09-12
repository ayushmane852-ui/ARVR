import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundEngine } from './AudioController';

// Animated Sacred Diya Flame with Sequential Bloom Ignition
function DiyaFlame({
  isLit,
  litTimestamp,
  delay = 0,
  step = 0,
  position,
  scale = 1.0,
  alwaysLit = false,
}) {
  const groupRef = useRef();
  const flameRef = useRef();
  const innerFlameRef = useRef();
  const lightRef = useRef();
  const ignitedRef = useRef(alwaysLit);
  const currentGrowth = useRef(alwaysLit ? 1.0 : 0.0);

  useEffect(() => {
    if (!isLit) {
      ignitedRef.current = alwaysLit;
    }
  }, [isLit, alwaysLit]);

  useFrame((state) => {
    const now = state.clock.getElapsedTime();
    const t = now;

    // Calculate target growth state based on sequential ignition delay
    let targetGrowth = alwaysLit ? (isLit ? 1.0 : 0.85) : 0.0;
    if (!alwaysLit && isLit) {
      const elapsed = now - litTimestamp;
      if (elapsed >= delay) {
        if (!ignitedRef.current) {
          ignitedRef.current = true;
          soundEngine.playDiyaSequentialChime(step);
        }
        const growthProgress = Math.min(1.0, (elapsed - delay) / 0.38);
        // Ignition burst / flare pop
        const pop = Math.sin(growthProgress * Math.PI) * 0.35;
        targetGrowth = growthProgress + pop;
      } else {
        targetGrowth = 0.0;
      }
    }

    // Smooth growth interpolation (expands upon ignition, shrinks on extinguish)
    currentGrowth.current = THREE.MathUtils.lerp(
      currentGrowth.current,
      targetGrowth,
      0.12
    );

    if (groupRef.current) {
      const isVisible = currentGrowth.current > 0.01;
      groupRef.current.visible = isVisible;
      if (!isVisible) return;
    }

    const g = currentGrowth.current;
    const flicker = Math.sin(t * 14) * 0.08 + Math.cos(t * 23) * 0.06;
    const flickerY = Math.cos(t * 17) * 0.12;

    if (flameRef.current) {
      flameRef.current.scale.set(
        scale * g * (1 + flicker * 0.5),
        scale * g * (1 + flickerY),
        scale * g * (1 + flicker * 0.5)
      );
      flameRef.current.rotation.z = Math.sin(t * 8) * 0.06;
    }

    if (innerFlameRef.current) {
      innerFlameRef.current.scale.set(
        scale * g * (0.85 + flicker * 0.3),
        scale * g * (0.9 + flickerY * 0.8),
        scale * g * (0.85 + flicker * 0.3)
      );
    }

    if (lightRef.current) {
      lightRef.current.intensity = (3.2 + flicker * 2.0) * scale * g;
    }
  });

  return (
    <group ref={groupRef} position={position}>
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

      {/* Dynamic Flickering Diya Light */}
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

// Sacred Golden Spark that glides smoothly from lamp to lamp to ignite each one
function TravelingIgnitionSpark({ isLit, litTimestamp }) {
  const sparkGroup = useRef();

  useFrame((state) => {
    if (!sparkGroup.current) return;
    const now = state.clock.getElapsedTime();
    const elapsed = now - litTimestamp;

    if (!isLit || elapsed < 0 || elapsed > 2.3) {
      sparkGroup.current.visible = false;
      return;
    }

    sparkGroup.current.visible = true;

    // Waypoints for the traveling ignition spark:
    // 0.0s to 0.35s: From Left Mini Lamp [-1.8, -0.9, 3.2] to Left Grand Samai [-3.4, 0.8, 1.8]
    // 0.35s to 0.85s: From Left Grand Samai to Right Grand Samai [3.4, 0.8, 1.8]
    // 0.85s to 1.35s: From Right Grand Samai to Outer Left Deepam [-5.0, -0.9, 2.6]
    // 1.35s to 1.85s: From Outer Left Deepam to Outer Right Deepam [5.0, -0.9, 2.6]
    // 1.85s to 2.25s: Dissolves into golden celestial mist
    let x = 0, y = 0, z = 0, scale = 1.0;

    if (elapsed < 0.35) {
      const t = elapsed / 0.35;
      x = THREE.MathUtils.lerp(-1.8, -3.4, t);
      y = THREE.MathUtils.lerp(-0.9, 0.8, t) + Math.sin(t * Math.PI) * 0.45;
      z = THREE.MathUtils.lerp(3.2, 1.8, t);
    } else if (elapsed < 0.85) {
      const t = (elapsed - 0.35) / 0.5;
      x = THREE.MathUtils.lerp(-3.4, 3.4, t);
      y = 0.8 + Math.sin(t * Math.PI) * 0.9; // graceful arc above throne steps
      z = THREE.MathUtils.lerp(1.8, 1.8, t) + Math.sin(t * Math.PI) * 0.4;
    } else if (elapsed < 1.35) {
      const t = (elapsed - 0.85) / 0.5;
      x = THREE.MathUtils.lerp(3.4, -5.0, t);
      y = THREE.MathUtils.lerp(0.8, -0.9, t) + Math.sin(t * Math.PI) * 0.6;
      z = THREE.MathUtils.lerp(1.8, 2.6, t);
    } else if (elapsed <= 1.85) {
      const t = (elapsed - 1.35) / 0.5;
      x = THREE.MathUtils.lerp(-5.0, 5.0, t);
      y = -0.9 + Math.sin(t * Math.PI) * 0.5;
      z = 2.6;
    } else {
      const t = (elapsed - 1.85) / 0.45;
      x = 5.0;
      y = -0.9 + t * 0.3;
      z = 2.6;
      scale = 1.0 - t;
    }

    sparkGroup.current.position.set(x, y, z);
    sparkGroup.current.scale.setScalar(Math.max(0.01, scale));
  });

  return (
    <group ref={sparkGroup} visible={false}>
      {/* Golden core */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Outer flare glow */}
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial
          color="#fbbf24"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Light emitted by spark */}
      <pointLight color="#ffa834" intensity={2.8} distance={5.0} decay={1} />
    </group>
  );
}

export default function Diya({ isLit }) {
  const { scene } = useGLTF('/models/diya.glb');
  const [litTimestamp, setLitTimestamp] = useState(0);

  useEffect(() => {
    if (isLit) {
      setLitTimestamp(performance.now() / 1000);
    }
  }, [isLit]);

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
      {/* 0. Traveling Sacred Ignition Spark */}
      <TravelingIgnitionSpark isLit={isLit} litTimestamp={litTimestamp} />

      {/* 1. Grand Brass Samai Standing Lamps (flanking Lord Ganesha's throne steps) */}
      <group position={[-3.4, -2.88, 1.8]}>
        <primitive object={diyaL1} scale={[bigScale, bigScale, bigScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimestamp={litTimestamp}
          delay={0.35}
          step={1}
          position={[0, bigFlameY, 0]}
          scale={1.2}
        />
      </group>

      <group position={[3.4, -2.88, 1.8]}>
        <primitive object={diyaR1} scale={[bigScale, bigScale, bigScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimestamp={litTimestamp}
          delay={0.85}
          step={2}
          position={[0, bigFlameY, 0]}
          scale={1.2}
        />
      </group>

      {/* 2. Step Accent Mini Deepams (Eternal Akhand Deepams framing the front steps - lit initially) */}
      <group position={[-1.8, -2.88, 3.2]}>
        <primitive object={diyaL2} scale={[medScale, medScale, medScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimestamp={litTimestamp}
          alwaysLit={true}
          position={[0, medFlameY, 0]}
          scale={0.9}
        />
      </group>

      <group position={[1.8, -2.88, 3.2]}>
        <primitive object={diyaR2} scale={[medScale, medScale, medScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimestamp={litTimestamp}
          alwaysLit={true}
          position={[0, medFlameY, 0]}
          scale={0.9}
        />
      </group>

      {/* 3. Outer Sanctuary Deepams (flanking the sides) */}
      <group position={[-5.0, -2.88, 2.6]}>
        <primitive object={diyaL3} scale={[sideScale, sideScale, sideScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimestamp={litTimestamp}
          delay={1.35}
          step={3}
          position={[0, sideFlameY, 0]}
          scale={0.9}
        />
      </group>

      <group position={[5.0, -2.88, 2.6]}>
        <primitive object={diyaR3} scale={[sideScale, sideScale, sideScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimestamp={litTimestamp}
          delay={1.85}
          step={4}
          position={[0, sideFlameY, 0]}
          scale={0.9}
        />
      </group>
    </group>
  );
}
