import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FLOWER_SCALE = 0.00068;

function AnimatedFlower({ flowerScene, offering }) {
  const meshRef = useRef();
  const startTimeRef = useRef(-1);

  useFrame((state) => {
    if (!meshRef.current) return;
    const clock = state.clock.getElapsedTime();

    // Synchronize start time on the very first frame of mounting
    if (startTimeRef.current < 0) {
      startTimeRef.current = clock;
    }

    const elapsed = clock - startTimeRef.current;
    const progress = Math.min(1, Math.max(0, elapsed / 1.5));

    if (progress < 1) {
      const ease = 1 - Math.pow(1 - progress, 3);

      const x = THREE.MathUtils.lerp(offering.startPos[0], offering.targetPos[0], ease);
      const z = THREE.MathUtils.lerp(offering.startPos[2], offering.targetPos[2], ease);
      const arcHeight = Math.sin(progress * Math.PI) * 1.8;
      const y = THREE.MathUtils.lerp(offering.startPos[1], offering.targetPos[1], ease) + arcHeight;

      meshRef.current.position.set(x, y, z);

      meshRef.current.rotation.x = offering.rot[0] + progress * Math.PI * 2;
      meshRef.current.rotation.y = offering.rot[1] + progress * Math.PI * 1.5;
      meshRef.current.rotation.z = offering.rot[2] + progress * Math.PI;

      const scaleProg = Math.min(1, progress * 2.5);
      meshRef.current.scale.setScalar(FLOWER_SCALE * scaleProg);
    } else {
      meshRef.current.position.set(...offering.targetPos);
      meshRef.current.rotation.set(...offering.rot);
      meshRef.current.scale.setScalar(FLOWER_SCALE);
    }
  });

  return (
    <group ref={meshRef}>
      <primitive object={flowerScene} />
    </group>
  );
}

export default function FlowerOffering({ offerings }) {
  const { scene } = useGLTF('/models/flower.glb', '/draco/');

  // Prepare master flower template with sacred hibiscus red luster ONCE
  const masterFlower = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material = child.material.clone();
          if (child.material.name?.includes('hibiscus') || child.name?.includes('hibiscus')) {
            child.material.color = new THREE.Color('#e11d48');
            child.material.roughness = 0.55;
          }
        }
      }
    });
    return clone;
  }, [scene]);

  // Pre-instantiate initial decorative base flowers ONCE
  const baseFlowers = useMemo(() => {
    return [-0.9, -0.4, 0.2, 0.8].map((x, i) => {
      const clone = masterFlower.clone(true);
      return {
        obj: clone,
        pos: [x, -2.76, 2.4 + (i % 2 === 0 ? 0.2 : -0.15)],
        rot: [0.15, i * 1.3, 0.05],
      };
    });
  }, [masterFlower]);

  // Cache cloned flower models by offering ID so existing flowers are never re-cloned
  const flowerCache = useRef(new Map());

  // Clean up removed offerings from cache
  const activeIds = useMemo(() => new Set(offerings.map((o) => o.id)), [offerings]);
  flowerCache.current.forEach((_, id) => {
    if (!activeIds.has(id)) {
      flowerCache.current.delete(id);
    }
  });

  return (
    <group>
      {/* Active flying and offered flowers */}
      {offerings.map((offering) => {
        if (!flowerCache.current.has(offering.id)) {
          // Clone lightweight instance sharing the precompiled master material
          flowerCache.current.set(offering.id, masterFlower.clone(true));
        }
        const flowerScene = flowerCache.current.get(offering.id);

        return (
          <AnimatedFlower
            key={offering.id}
            flowerScene={flowerScene}
            offering={offering}
          />
        );
      })}

      {/* Decorative Initial Flowers resting on offering thali (zero per-frame clones) */}
      {baseFlowers.map((flower, idx) => (
        <group
          key={idx}
          position={flower.pos}
          rotation={flower.rot}
          scale={[FLOWER_SCALE * 0.9, FLOWER_SCALE * 0.9, FLOWER_SCALE * 0.9]}
        >
          <primitive object={flower.obj} />
        </group>
      ))}
    </group>
  );
}
