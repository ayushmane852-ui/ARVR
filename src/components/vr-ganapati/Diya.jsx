import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundEngine } from './AudioController';

// Smooth ease-out curve for natural small-to-big flame growth
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Animated Diya Flame — small realistic size, smooth 1s sequential ignition
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

  // Growth duration per flame (smooth small-to-big over 0.4s)
  const growDuration = 0.4;

  useFrame((state) => {
    const clock = state.clock.getElapsedTime();

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
            // Smooth ease-out growth from 0 to 1 over growDuration
            const rawProgress = Math.min(1.0, (elapsed - delay) / growDuration);
            targetGrowth = easeOutCubic(rawProgress);
          } else {
            targetGrowth = 0.0;
          }
        }
      }
    }

    // Smooth interpolation for fluid 60fps transitions
    currentGrowth.current = THREE.MathUtils.lerp(
      currentGrowth.current,
      targetGrowth,
      0.18
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

      {/* Main Outer Flame Cone — smaller, realistic */}
      <mesh ref={flameRef} position={[0, 0.2 * scale, 0]}>
        <coneGeometry args={[0.08 * scale, 0.35 * scale, 16]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Inner White-Hot Core — small */}
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

      {/* Ambient Warm Glow — reduced radius */}
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

      {/* Flickering Diya Point Light — reduced intensity */}
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

// Golden spark that glides lamp-to-lamp within 1 second
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

    // Spark lives for 1.15s total (1.0s travel + 0.15s dissolve)
    if (elapsed < 0 || elapsed > 1.15) {
      sparkGroup.current.visible = false;
      return;
    }

    sparkGroup.current.visible = true;

    // Compressed path — all 4 lamps in ~1s:
    // 0.00s – 0.15s: Mini left lamp → Left Grand Samai
    // 0.15s – 0.40s: Left Grand Samai → Right Grand Samai
    // 0.40s – 0.65s: Right Grand Samai → Outer Left Deepam
    // 0.65s – 0.90s: Outer Left Deepam → Outer Right Deepam
    // 0.90s – 1.15s: Spark dissolves
    let x = 0, y = 0, z = 0, sparkScale = 1.0;

    if (elapsed < 0.15) {
      const t = elapsed / 0.15;
      x = THREE.MathUtils.lerp(-1.8, -3.4, t);
      y = THREE.MathUtils.lerp(-0.73, 0.6, t) + Math.sin(t * Math.PI) * 0.3;
      z = THREE.MathUtils.lerp(3.2, 1.8, t);
    } else if (elapsed < 0.40) {
      const t = (elapsed - 0.15) / 0.25;
      x = THREE.MathUtils.lerp(-3.4, 3.4, t);
      y = 0.6 + Math.sin(t * Math.PI) * 0.6;
      z = 1.8 + Math.sin(t * Math.PI) * 0.3;
    } else if (elapsed < 0.65) {
      const t = (elapsed - 0.40) / 0.25;
      x = THREE.MathUtils.lerp(3.4, -5.0, t);
      y = THREE.MathUtils.lerp(0.6, -0.21, t) + Math.sin(t * Math.PI) * 0.4;
      z = THREE.MathUtils.lerp(1.8, 2.6, t);
    } else if (elapsed < 0.90) {
      const t = (elapsed - 0.65) / 0.25;
      x = THREE.MathUtils.lerp(-5.0, 5.0, t);
      y = -0.21 + Math.sin(t * Math.PI) * 0.35;
      z = 2.6;
    } else {
      // Dissolve phase
      const t = (elapsed - 0.90) / 0.25;
      x = 5.0;
      y = -0.21 + t * 0.2;
      z = 2.6;
      sparkScale = 1.0 - t;
    }

    sparkGroup.current.position.set(x, y, z);
    sparkGroup.current.scale.setScalar(Math.max(0.01, sparkScale));
  });

  return (
    <group ref={sparkGroup} visible={false}>
      {/* Small golden core */}
      <mesh>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshBasicMaterial
          color="#fbbf24"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Spark point light */}
      <pointLight color="#ffa834" intensity={2.5} distance={5.0} decay={1} />
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
      {/* Traveling Ignition Spark */}
      <TravelingIgnitionSpark isLit={isLit} litTimeRef={litTimeRef} />

      {/* 1. Grand Brass Samai — Left (ignites at 0.10s) */}
      <group position={[-3.4, -2.88, 1.8]}>
        <primitive object={diyaL1} scale={[bigScale, bigScale, bigScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimeRef={litTimeRef}
          delay={0.10}
          step={1}
          position={[0, bigFlameY, 0]}
          scale={0.75}
        />
      </group>

      {/* Grand Brass Samai — Right (ignites at 0.30s) */}
      <group position={[3.4, -2.88, 1.8]}>
        <primitive object={diyaR1} scale={[bigScale, bigScale, bigScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimeRef={litTimeRef}
          delay={0.30}
          step={2}
          position={[0, bigFlameY, 0]}
          scale={0.75}
        />
      </group>

      {/* 2. Mini Step Deepams — always lit */}
      <group position={[-1.8, -2.88, 3.2]}>
        <primitive object={diyaL2} scale={[medScale, medScale, medScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimeRef={litTimeRef}
          alwaysLit={true}
          position={[0, medFlameY, 0]}
          scale={0.6}
        />
      </group>

      <group position={[1.8, -2.88, 3.2]}>
        <primitive object={diyaR2} scale={[medScale, medScale, medScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimeRef={litTimeRef}
          alwaysLit={true}
          position={[0, medFlameY, 0]}
          scale={0.6}
        />
      </group>

      {/* 3. Outer Sanctuary Deepams — Left (ignites at 0.55s) */}
      <group position={[-5.0, -2.88, 2.6]}>
        <primitive object={diyaL3} scale={[sideScale, sideScale, sideScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimeRef={litTimeRef}
          delay={0.55}
          step={3}
          position={[0, sideFlameY, 0]}
          scale={0.65}
        />
      </group>

      {/* Outer Sanctuary Deepam — Right (ignites at 0.75s) */}
      <group position={[5.0, -2.88, 2.6]}>
        <primitive object={diyaR3} scale={[sideScale, sideScale, sideScale]} />
        <DiyaFlame
          isLit={isLit}
          litTimeRef={litTimeRef}
          delay={0.75}
          step={4}
          position={[0, sideFlameY, 0]}
          scale={0.65}
        />
      </group>
    </group>
  );
}
