import React, { useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ARPlacementReticle = forwardRef(function ARPlacementReticle(
  { visible = true, onPlace, isWebXR = false, surfaceDetected = false, surfaceType = 'none' },
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

  const isValidHorizontal = !isWebXR || (surfaceDetected && surfaceType === 'horizontal');
  const isWall = isWebXR && surfaceType === 'vertical_wall';

  const ringColor = isWall ? '#f97316' : '#fbbf24';
  const ringOpacity = isValidHorizontal ? 0.95 : (isWall ? 0.5 : 0.35);

  const innerColor = isWall ? '#ea580c' : '#f59e0b';
  const innerOpacity = isValidHorizontal ? 0.75 : (isWall ? 0.4 : 0.25);

  return (
    <group
      ref={groupRef}
      matrixAutoUpdate={!isWebXR}
      position={!isWebXR ? [0, -0.7, 0] : undefined}
      rotation={!isWebXR ? [-Math.PI / 2, 0, 0] : undefined}
      onClick={(e) => {
        e.stopPropagation();
        if (isValidHorizontal && onPlace) onPlace();
      }}
    >
      {/* Outer Sacred Consecrated Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.72, 0.82, 64]} />
        <meshBasicMaterial
          color={ringColor}
          transparent
          opacity={ringOpacity}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Rotating 8-Petal Sacred Lotus Chakra */}
      <mesh ref={innerRef}>
        <ringGeometry args={[0.5, 0.65, 8]} />
        <meshBasicMaterial
          color={innerColor}
          transparent
          opacity={innerOpacity}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Translucent Amber Ground Boundary Disc */}
      <mesh>
        <circleGeometry args={[0.71, 48]} />
        <meshBasicMaterial
          color={isWall ? '#c2410c' : '#d97706'}
          transparent
          opacity={isValidHorizontal ? 0.16 : 0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Radiant Lotus Center Target Indicator */}
      <mesh position={[0, 0, 0.005]}>
        <circleGeometry args={[0.12, 32]} />
        <meshBasicMaterial
          color={isWall ? '#ffedd5' : '#ffffff'}
          transparent
          opacity={isValidHorizontal ? 0.92 : 0.5}
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
