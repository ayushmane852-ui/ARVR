import React, { useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ARPlacementReticle = forwardRef(function ARPlacementReticle(
  { visible = true, onPlace, isWebXR = false, surfaceDetected = false },
  forwardedRef
) {
  const localRef = useRef();
  const ringRef = useRef();
  const innerRef = useRef();
  const groupRef = forwardedRef || localRef;

  useFrame((state) => {
    if (!ringRef.current || !visible) return;
    const t = state.clock.getElapsedTime();
    const pulse = 1.0 + Math.sin(t * 4.0) * 0.06;
    ringRef.current.scale.set(pulse, pulse, 1);
    if (innerRef.current) {
      innerRef.current.rotation.z = t * 0.5;
    }
  });

  if (!visible) return null;

  return (
    <group
      ref={groupRef}
      matrixAutoUpdate={!isWebXR}
      position={!isWebXR ? [0, -1.2, 4.2] : undefined}
      rotation={!isWebXR ? [-Math.PI / 2, 0, 0] : undefined}
      onClick={(e) => {
        e.stopPropagation();
        if (onPlace) onPlace();
      }}
    >
      {/* Outer Sacred Consecrated Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.72, 0.82, 64]} />
        <meshBasicMaterial
          color="#fbbf24"
          transparent
          opacity={surfaceDetected || !isWebXR ? 0.95 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Rotating 8-Petal Sacred Lotus Chakra */}
      <mesh ref={innerRef}>
        <ringGeometry args={[0.5, 0.65, 8]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={surfaceDetected || !isWebXR ? 0.75 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Translucent Amber Ground Boundary Disc */}
      <mesh>
        <circleGeometry args={[0.71, 48]} />
        <meshBasicMaterial
          color="#d97706"
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Radiant Lotus Center Target Indicator */}
      <mesh position={[0, 0, 0.005]}>
        <circleGeometry args={[0.12, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cardinal Sacred Markers (4 corners) */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
        <mesh
          key={idx}
          position={[Math.cos(angle) * 0.9, Math.sin(angle) * 0.9, 0.005]}
          rotation={[0, 0, angle]}
        >
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
});

export default ARPlacementReticle;
