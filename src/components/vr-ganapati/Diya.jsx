import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundEngine } from './AudioController';

// Animated Sacred Diya Flame with Sequential Bloom Ignition
function DiyaFlame({
  isLit,
  litTimeRef,
  delay = 0,
  step = 0,
  position,
  scale = 1.0,
  alwaysLit = false,
}) {
  const groupRef = useRef();
  const flameRef = useRef();
  const innerFlameRef = useRef();
  const haloRef = useRef();
  const lightRef = useRef();
  const ignitedRef = useRef(alwaysLit);
  const currentGrowth = useRef(alwaysLit ? 1.0 : 0.0);

  useFrame((state) => {
    const clock = state.clock.getElapsedTime();

    // Target growth calculation
    let targetGrowth = alwaysLit ? (isLit ? 1.0 : 0.85) : 0.0;

    if (!alwaysLit) {
      if (!isLit) {
        targetGrowth = 0.0;
        ignitedRef.current = false;
      } else {
        const litTime = litTimeRef.current;
        if (litTime >= 0) {
          const elapsed = clock - litTime;
          if (elapsed >= delay) {
            if (!ignitedRef.current) {
              ignitedRef.current = true;
              soundEngine.playDiyaSequentialChime(step);
            }
            const progress = Math.min(1.0, (elapsed - delay) / 0.35);
            // Ignition burst flare pop
            const pop = Math.sin(progress * Math.PI) * 0.4;
            targetGrowth = progress + pop;
          } else {
            targetGrowth = 0.0;
          }
        }
      }
    }

    // Smooth growth interpolation
    currentGrowth.current = THREE.MathUtils.lerp(
      currentGrowth.current,
      targetGrowth,
      0.14
    );

    const g = currentGrowth.current;

    if (groupRef.current) {
      const isVisible = g > 0.01;
      groupRef.current.visible = isVisible;
      if (!isVisible) return;
    }

    const flicker = Math.sin(clock * 14) * 0.08 + Math.cos(clock * 23) * 0.06;
    const flickerY = Math.cos(clock * 17) * 0.12;

    if (flameRef.current) {
      flameRef.current.scale.set(
        scale * g * (1 + flicker * 0.4),
        scale * g * (1 + flickerY * 0.8),
        scale * g * (1 + flicker * 0.4)
      );
      flameRef.current.rotation.z = Math.sin(clock * 8) * 0.05;
    }

    if (innerFlameRef.current) {
      innerFlameRef.current.scale.set(
        scale * g * (0.85 + flicker * 0.25),
        scale * g * (0.9 + flickerY * 0.6),
        scale * g * (0.85 + flicker * 0.25)
      );
    }

    if (haloRef.current) {
      haloRef.current.scale.setScalar(scale * g * (1 + flicker * 0.2));
    }

    if (lightRef.current) {
      lightRef.current.intensity = (4.5 + flicker * 2.5) * scale * g;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Base Teardrop Bulb */}
      <mesh position={[0, 0.1 * scale, 0]}>
        <sphereGeometry args={[0.14 * scale, 16, 16]} />
        <meshBasicMaterial color="#ff7700" />
      </mesh>

      {/* Main Outer Flame Cone (sits on wick, rising upward) */}
      <mesh ref={flameRef} position={[0, 0.34 * scale, 0]}>
        <coneGeometry args={[0.15 * scale, 0.68 * scale, 24]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Inner White-Hot Flame Core */}
      <mesh ref={innerFlameRef} position={[0, 0.22 * scale, 0]}>
        <coneGeometry args={[0.075 * scale, 0.44 * scale, 24]} />
        <meshBasicMaterial
          color="#fffae6"
          transparent
          opacity={0.98}
        />
      </mesh>

      {/* Radiant Flame Halo Sprite (additive glowing aura) */}
      <mesh ref={haloRef} position={[0, 0.3 * scale, 0]}>
        <sphereGeometry args={[0.48 * scale, 24, 24]} />
        <meshBasicMaterial
          color="#ff9900"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Broad Ambient Amber Glow */}
      <mesh position={[0, 0.3 * scale, 0]}>
        <sphereGeometry args={[0.95 * scale, 16, 16]} />
        <meshBasicMaterial
          color="#ff8800"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Dynamic Flickering Diya Point Light */}
      <pointLight
        ref={lightRef}
        color="#ffaa33"
        intensity={4.5 * scale}
        distance={12.0}
        decay={1.2}
      />
    </group>
  );
}

// Sacred Golden Spark that glides smoothly from lamp to lamp to ignite each one
function TravelingIgnitionSpark({ isLit, litTimeRef }) {
  const sparkGroup = useRef();

  useFrame((state) => {
    if (!sparkGroup.current) return;
    const clock = state.clock.getElapsedTime();
    const litTime = litTimeRef.current;

    if (!isLit || litTime < 0) {
      sparkGroup.current.visible = false;
      return;
    }

    const elapsed = clock - litTime;

    if (elapsed < 0 || elapsed > 2.05) {
      sparkGroup.current.visible = false;
      return;
    }

    sparkGroup.current.visible = true;

    // Sequential Path Waypoints:
    // 0.0s to 0.30s: From Left Mini Lamp [-1.8, -0.73, 3.2] to Left Grand Samai [-3.4, 0.6, 1.8]
    // 0.30s to 0.75s: From Left Grand Samai to Right Grand Samai [3.4, 0.6, 1.8]
    // 0.75s to 1.20s: From Right Grand Samai to Outer Left Deepam [-5.0, -0.21, 2.6]
    // 1.20s to 1.65s: From Outer Left Deepam to Outer Right Deepam [5.0, -0.21, 2.6]
    // 1.65s to 2.05s: Spark dissolves into celestial golden particles
    let x = 0, y = 0, z = 0, scale = 1.0;

    if (elapsed < 0.30) {
      const t = elapsed / 0.30;
      x = THREE.MathUtils.lerp(-1.8, -3.4, t);
      y = THREE.MathUtils.lerp(-0.73, 0.6, t) + Math.sin(t * Math.PI) * 0.45;
      z = THREE.MathUtils.lerp(3.2, 1.8, t);
    } else if (elapsed < 0.75) {
      const t = (elapsed - 0.30) / 0.45;
      x = THREE.MathUtils.lerp(-3.4, 3.4, t);
      y = 0.6 + Math.sin(t * Math.PI) * 0.85;
      z = THREE.MathUtils.lerp(1.8, 1.8, t) + Math.sin(t * Math.PI) * 0.4;
    } else if (elapsed < 1.20) {
      const t = (elapsed - 0.75) / 0.45;
      x = THREE.MathUtils.lerp(3.4, -5.0, t);
      y = THREE.MathUtils.lerp(0.6, -0.21, t) + Math.sin(t * Math.PI) * 0.6;
      z = THREE.MathUtils.lerp(1.8, 2.6, t);
    } else if (elapsed <= 1.65) {
      const t = (elapsed - 1.20) / 0.45;
      x = THREE.MathUtils.lerp(-5.0, 5.0, t);
      y = -0.21 + Math.sin(t * Math.PI) * 0.5;
      z = 2.6;
    } else {
      const t = (elapsed - 1.65) / 0.40;
      x = 5.0;
      y = -0.21 + t * 0.3;
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
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Outer flare glow */}
      <mesh>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshBasicMaterial
          color="#fbbf24"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Light emitted by spark */}
      <pointLight color="#ffa834" intensity={3.5} distance={6.0} decay={1} />
    </group>
  );
}

export default function Diya({ isLit }) {
  const { scene } = useGLTF('/models/diya.glb');
  const litTimeRef = useRef(isLit ? 0 : -999);
  const prevIsLit = useRef(isLit);

  // Synchronize ignition timer with Three.js state.clock
  useFrame((state) => {
    const clock = state.clock.getElapsedTime();
    if (isLit && !prevIsLit.current) {
      litTimeRef.current = clock;
    } else if (!isLit && prevIsLit.current) {
      litTimeRef.current = -999;
    }
    prevIsLit.current = isLit;
  });

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

  // Dimensions & flame heights matching the top wick dish of diya.glb (top = 4.035 in local units)
  const bigScale = 0.85;
  const bigFlameY = 4.035 * bigScale + 0.05; // 3.48

  const medScale = 0.52;
  const medFlameY = 4.035 * medScale + 0.05; // 2.15

  const sideScale = 0.65;
  const sideFlameY = 4.035 * sideScale + 0.05; // 2.67

  return (
    <group>
      {/* 0. Traveling Sacred Ignition Spark */}
      <TravelingIgnitionSpark isLit={isLit} litTimeRef={litTimeRef} />

      {/* 1. Grand Brass Samai Standing Lamps (flanking Lord Ganesha's throne steps) */}
      <group position={[-3.4, -2.88, 1.8]}>
        <primitive object={diyaL1} scale={[bigScale, bigScale, bigScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimeRef={litTimeRef}
          delay={0.30}
          step={1}
          position={[0, bigFlameY, 0]}
          scale={1.35}
        />
      </group>

      <group position={[3.4, -2.88, 1.8]}>
        <primitive object={diyaR1} scale={[bigScale, bigScale, bigScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimeRef={litTimeRef}
          delay={0.75}
          step={2}
          position={[0, bigFlameY, 0]}
          scale={1.35}
        />
      </group>

      {/* 2. Step Accent Mini Deepams (Eternal Akhand Deepams framing the front steps - lit initially) */}
      <group position={[-1.8, -2.88, 3.2]}>
        <primitive object={diyaL2} scale={[medScale, medScale, medScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimeRef={litTimeRef}
          alwaysLit={true}
          position={[0, medFlameY, 0]}
          scale={1.15}
        />
      </group>

      <group position={[1.8, -2.88, 3.2]}>
        <primitive object={diyaR2} scale={[medScale, medScale, medScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimeRef={litTimeRef}
          alwaysLit={true}
          position={[0, medFlameY, 0]}
          scale={1.15}
        />
      </group>

      {/* 3. Outer Sanctuary Deepams (flanking the sides) */}
      <group position={[-5.0, -2.88, 2.6]}>
        <primitive object={diyaL3} scale={[sideScale, sideScale, sideScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimeRef={litTimeRef}
          delay={1.20}
          step={3}
          position={[0, sideFlameY, 0]}
          scale={1.25}
        />
      </group>

      <group position={[5.0, -2.88, 2.6]}>
        <primitive object={diyaR3} scale={[sideScale, sideScale, sideScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimeRef={litTimeRef}
          delay={1.65}
          step={4}
          position={[0, sideFlameY, 0]}
          scale={1.25}
        />
      </group>
    </group>
  );
}
