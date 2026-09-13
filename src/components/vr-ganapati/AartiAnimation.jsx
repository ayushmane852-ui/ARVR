import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural soft glowing circular particle sprite for flame trail
function createSparkleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(254, 240, 138, 0.9)');
  gradient.addColorStop(0.7, 'rgba(245, 158, 11, 0.4)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

// Single miniature Aarti flame wick with organic flickering
function AartiFlame({ position, scale = 1.0 }) {
  const flameRef = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    if (!flameRef.current) return;
    const t = state.clock.getElapsedTime();
    const flicker = Math.sin(t * 14.0 + position[0] * 5.0) * 0.08 + Math.cos(t * 9.0) * 0.05;
    flameRef.current.scale.set(
      scale * (1.0 + flicker * 0.6),
      scale * (1.0 + flicker * 1.2),
      scale * (1.0 + flicker * 0.6)
    );
    if (lightRef.current) {
      lightRef.current.intensity = 1.2 + flicker * 0.4;
    }
  });

  return (
    <group position={position}>
      {/* Flame Cone */}
      <mesh ref={flameRef} position={[0, 0.06, 0]}>
        <coneGeometry args={[0.04 * scale, 0.14 * scale, 16]} />
        <meshBasicMaterial color="#ffeedd" />
      </mesh>
      {/* Inner Flame Glow */}
      <mesh position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.05 * scale, 12, 12]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.8} />
      </mesh>
      {/* Outer Halo */}
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.09 * scale, 12, 12]} />
        <meshBasicMaterial color="#ea580c" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function AartiAnimation({ active, onAartiComplete }) {
  const groupRef = useRef();
  const startTimeRef = useRef(null);
  const completedRef = useRef(false);
  const trailRef = useRef();

  const sparkleTexture = useMemo(() => createSparkleTexture(), []);
  const DURATION = 22.0; // 22 seconds ceremonial aarti

  // 40 trailing particles following the moving aarti thali
  const trailCount = 40;
  const trailPositions = useMemo(() => new Float32Array(trailCount * 3), [trailCount]);
  const trailHistory = useRef([]);

  useEffect(() => {
    if (active) {
      completedRef.current = false;
      startTimeRef.current = null;
      trailHistory.current = [];
    }
  }, [active]);

  useFrame((state) => {
    if (!active || !groupRef.current) return;

    const clock = state.clock.getElapsedTime();
    if (startTimeRef.current === null) {
      startTimeRef.current = clock;
    }

    const elapsed = clock - startTimeRef.current;
    const progress = Math.min(1.0, elapsed / DURATION);

    // Fade-in during first 1.5s, fade-out during last 1.5s
    let currentScale = 1.0;
    if (elapsed < 1.5) {
      currentScale = elapsed / 1.5;
    } else if (elapsed > DURATION - 1.5) {
      currentScale = Math.max(0, (DURATION - elapsed) / 1.5);
    }

    groupRef.current.scale.setScalar(currentScale);

    // Clockwise elliptical orbit path around Lord Ganesha (3.5 full circles)
    const loops = 3.5;
    const angle = progress * Math.PI * 2 * loops;
    const radiusX = 2.2;
    const radiusZ = 1.4;

    const posX = Math.cos(angle) * radiusX;
    const posZ = 1.0 + Math.sin(angle) * radiusZ;
    // Reverent vertical undulation: dips toward feet, rises toward the idol's crown
    const posY = 0.95 + Math.sin(angle * 2) * 0.38;

    groupRef.current.position.set(posX, posY, posZ);

    // Natural devotional tilt towards Lord Ganesha
    groupRef.current.rotation.x = Math.sin(angle) * 0.16;
    groupRef.current.rotation.z = -Math.cos(angle) * 0.16;
    groupRef.current.rotation.y = -angle + Math.PI / 2;

    // Update flame sparkle trail
    trailHistory.current.unshift({ x: posX, y: posY + 0.1, z: posZ });
    if (trailHistory.current.length > trailCount) {
      trailHistory.current.pop();
    }

    if (trailRef.current) {
      const posArr = trailRef.current.geometry.attributes.position.array;
      for (let i = 0; i < trailCount; i++) {
        const h = trailHistory.current[i];
        if (h) {
          posArr[i * 3] = h.x;
          posArr[i * 3 + 1] = h.y;
          posArr[i * 3 + 2] = h.z;
        } else {
          posArr[i * 3] = posX;
          posArr[i * 3 + 1] = posY;
          posArr[i * 3 + 2] = posZ;
        }
      }
      trailRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Completion callback
    if (progress >= 1.0 && !completedRef.current) {
      completedRef.current = true;
      if (onAartiComplete) onAartiComplete();
    }
  });

  if (!active) return null;

  return (
    <>
      {/* 1. Orbiting Aarti Thali */}
      <group ref={groupRef}>
        {/* Brass Platter Base */}
        <mesh position={[0, -0.02, 0]} castShadow>
          <cylinderGeometry args={[0.55, 0.5, 0.04, 32]} />
          <meshStandardMaterial
            color="#d4af37"
            metalness={0.92}
            roughness={0.22}
          />
        </mesh>

        {/* Raised Ornate Outer Rim */}
        <mesh position={[0, 0.01, 0]}>
          <torusGeometry args={[0.54, 0.03, 16, 32]} />
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.95}
            roughness={0.18}
          />
        </mesh>

        {/* Central Camphor Lamp Bowl */}
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.14, 0.1, 0.06, 24]} />
          <meshStandardMaterial
            color="#b45309"
            metalness={0.88}
            roughness={0.25}
          />
        </mesh>

        {/* Central Burning Camphor Flame */}
        <AartiFlame position={[0, 0.08, 0]} scale={1.8} />

        {/* 5 Outer Pancha-Aarti Flames */}
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2;
          const r = 0.36;
          return (
            <React.Fragment key={i}>
              <mesh position={[Math.cos(a) * r, 0.02, Math.sin(a) * r]}>
                <cylinderGeometry args={[0.05, 0.04, 0.03, 16]} />
                <meshStandardMaterial color="#92400e" metalness={0.9} roughness={0.2} />
              </mesh>
              <AartiFlame
                position={[Math.cos(a) * r, 0.04, Math.sin(a) * r]}
                scale={1.0}
              />
            </React.Fragment>
          );
        })}

        {/* Dynamic Warm Golden Aarti Illuminator */}
        <pointLight
          position={[0, 0.35, 0]}
          color="#ff9900"
          intensity={4.2}
          distance={10.0}
          decay={1}
        />
      </group>

      {/* 2. Golden Sparkle Flame Trail */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[trailPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={sparkleTexture}
          size={0.22}
          color="#fef08a"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
