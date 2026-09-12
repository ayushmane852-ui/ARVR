import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FLOWER_SCALE = 0.00068;

function AnimatedFlower({ flowerScene, offering }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const now = state.clock.getElapsedTime();
    const progress = Math.min(1, Math.max(0, (now - offering.startTime) / 1.8));

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

      const scaleProg = Math.min(1, progress * 2.2);
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
  const { scene } = useGLTF('/models/flower.glb');

  const clonedFlowers = useMemo(() => {
    return offerings.map(() => {
      const clone = scene.clone(true);
      clone.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material = child.material.clone();
            if (child.material.name.includes('hibiscus') || child.name.includes('hibiscus')) {
              child.material.color = new THREE.Color('#e11d48');
              child.material.roughness = 0.55;
            }
          }
        }
      });
      return clone;
    });
  }, [offerings.length, scene]);

  return (
    <group>
      {/* Render All Active and Offered Flowers */}
      {offerings.map((offering, idx) => (
        <AnimatedFlower
          key={offering.id}
          flowerScene={clonedFlowers[idx] || scene.clone(true)}
          offering={offering}
        />
      ))}

      {/* Decorative Initial Flowers placed on the brass thali at Lord Ganesha's feet */}
      {[-0.9, -0.4, 0.2, 0.8].map((x, i) => (
        <group
          key={i}
          position={[x, -2.76, 2.4 + (i % 2 === 0 ? 0.2 : -0.15)]}
          rotation={[0.15, i * 1.3, 0.05]}
          scale={[FLOWER_SCALE * 0.9, FLOWER_SCALE * 0.9, FLOWER_SCALE * 0.9]}
        >
          <primitive object={scene.clone(true)} />
        </group>
      ))}
    </group>
  );
}
