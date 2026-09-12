import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SingleHangingBell({ bellScene, position, ringTriggerTime, side = 'left', chainHeight = 4.5 }) {
  const pivotRef = useRef();

  useFrame((state) => {
    if (!pivotRef.current) return;
    const now = state.clock.getElapsedTime();
    const dt = now - ringTriggerTime;

    if (dt > 0 && dt < 4.5) {
      const amplitude = 0.42;
      const decay = Math.exp(-dt * 1.3);
      const frequency = 9.0;
      const swingSign = side === 'left' ? 1 : -1;

      pivotRef.current.rotation.z = Math.sin(dt * frequency) * amplitude * decay * swingSign;
      pivotRef.current.rotation.x = Math.cos(dt * (frequency * 0.85)) * (amplitude * 0.25) * decay;
    } else {
      pivotRef.current.rotation.z = THREE.MathUtils.lerp(pivotRef.current.rotation.z, 0, 0.08);
      pivotRef.current.rotation.x = THREE.MathUtils.lerp(pivotRef.current.rotation.x, 0, 0.08);
    }
  });

  return (
    <group position={position}>
      {/* Hanging Chain from Temple Ceiling */}
      <mesh position={[0, chainHeight / 2, 0]}>
        <cylinderGeometry args={[0.018, 0.018, chainHeight, 12]} />
        <meshStandardMaterial
          color="#c59b27"
          metalness={0.92}
          roughness={0.25}
        />
      </mesh>

      {/* Decorative Chain Rings */}
      {[0.4, 1.2, 2.0, 2.8, 3.6].filter(y => y < chainHeight).map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]} rotation={[0, 0, idx % 2 === 0 ? 0 : Math.PI / 2]}>
          <torusGeometry args={[0.04, 0.012, 8, 16]} />
          <meshStandardMaterial
            color="#eab308"
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Bell Pivot Container */}
      <group ref={pivotRef} position={[0, 0, 0]}>
        <group position={[0, -1.8, 0]}>
          <primitive
            object={bellScene}
            scale={[0.0055, 0.0055, 0.0055]}
            position={[0, 0, 0]}
          />
        </group>
      </group>
    </group>
  );
}

export default function Bell({ ringTriggerTime }) {
  const { scene } = useGLTF('/models/bell.glb');

  const createClonedBell = useMemo(() => {
    return () => {
      const clone = scene.clone(true);
      clone.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material = child.material.clone();
            child.material.metalness = 0.94;
            child.material.roughness = 0.18;
            child.material.color = new THREE.Color('#d4af37'); // Classic sanctum brass
          }
        }
      });
      return clone;
    };
  }, [scene]);

  const leftBell = useMemo(() => createClonedBell(), [createClonedBell]);
  const rightBell = useMemo(() => createClonedBell(), [createClonedBell]);

  return (
    <group>
      {/* Left Hanging Temple Bell (positioned wide in the upper corner) */}
      <SingleHangingBell
        bellScene={leftBell}
        position={[-5.8, 5.6, 2.0]}
        ringTriggerTime={ringTriggerTime}
        side="left"
        chainHeight={4.8}
      />

      {/* Right Hanging Temple Bell */}
      <SingleHangingBell
        bellScene={rightBell}
        position={[5.8, 5.6, 2.0]}
        ringTriggerTime={ringTriggerTime}
        side="right"
        chainHeight={4.8}
      />
    </group>
  );
}

useGLTF.preload('/models/bell.glb');
