import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ARPlacementReticle({ visible = true, onPlace }) {
  const ringRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    if (!ringRef.current || !visible) return;
    const t = state.clock.getElapsedTime();
    const pulse = 1.0 + Math.sin(t * 3.5) * 0.08;
    ringRef.current.scale.set(pulse, pulse, 1);
    if (innerRef.current) {
      innerRef.current.rotation.z = t * 0.4;
    }
  });

  if (!visible) return null;

  return (
    <group
      position={[0, -1.6, 5.0]}
      rotation={[-Math.PI / 2.3, 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        if (onPlace) onPlace();
      }}
    >
      {/* Outer Pulsing Golden Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.75, 0.84, 48]} />
        <meshBasicMaterial
          color="#fbbf24"
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Rotating Sacred Lotus Rays */}
      <mesh ref={innerRef}>
        <ringGeometry args={[0.55, 0.68, 8]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Translucent Surface Disc */}
      <mesh>
        <circleGeometry args={[0.74, 48]} />
        <meshBasicMaterial
          color="#d97706"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Center Target Indicator */}
      <mesh position={[0, 0, 0.01]}>
        <circleGeometry args={[0.1, 24]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
