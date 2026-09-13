import React, { useMemo, useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundEngine } from './AudioController';

function SingleHangingBell({
  bellScene,
  position,
  ringTriggerTime,
  side = 'left',
  chainHeight = 4.5,
  pitch = 587.33,
}) {
  const pivotRef = useRef();
  const ringStartTimeRef = useRef(-999);
  const prevTriggerRef = useRef(ringTriggerTime);
  const clockRef = useRef(0);

  // Clean up cursor if unmounted while hovering
  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  useFrame((state) => {
    if (!pivotRef.current) return;
    const now = state.clock.getElapsedTime();
    clockRef.current = now;

    // Detect global ringTriggerTime update (from bottom toolbar "Ring Bell" button)
    if (ringTriggerTime > 0 && ringTriggerTime !== prevTriggerRef.current) {
      ringStartTimeRef.current = now;
      prevTriggerRef.current = ringTriggerTime;
    }

    const dt = now - ringStartTimeRef.current;

    if (dt >= 0 && dt < 4.5) {
      const amplitude = 0.48;
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

  // Ring THIS specific bell when hovered or clicked
  const triggerSingleBellRing = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const now = clockRef.current;
    // Debounce to prevent sound spam while moving mouse over the bell
    if (now - ringStartTimeRef.current < 0.75) return;
    ringStartTimeRef.current = now;
    soundEngine.init();
    soundEngine.playBell(pitch);
  };

  const handlePointerOver = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    document.body.style.cursor = 'pointer';
    triggerSingleBellRing(e);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
  };

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
      {[0.4, 1.2, 2.0, 2.8, 3.6].filter((y) => y < chainHeight).map((y, idx) => (
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
        {/* Interactive Bell Body Container: registers hover & click */}
        <group
          position={[0, -1.8, 0]}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={triggerSingleBellRing}
        >
          {/* Responsive invisible hit cylinder for easy hover/touch detection */}
          <mesh visible={false}>
            <cylinderGeometry args={[0.65, 1.15, 2.2, 16]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>

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

  // Prepare master bell template with consecrated brass material ONCE
  const masterBell = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false;
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
  }, [scene]);

  // Clone lightweight instances sharing the precompiled master material
  const bellL1 = useMemo(() => masterBell.clone(true), [masterBell]);
  const bellR1 = useMemo(() => masterBell.clone(true), [masterBell]);
  const bellL2 = useMemo(() => masterBell.clone(true), [masterBell]);
  const bellR2 = useMemo(() => masterBell.clone(true), [masterBell]);

  return (
    <group>
      {/* Front Inner Bells flanking Lord Ganesha with sacred harmonic pitches */}
      <SingleHangingBell
        bellScene={bellL1}
        position={[-3.6, 5.0, 2.0]}
        ringTriggerTime={ringTriggerTime}
        side="left"
        chainHeight={4.2}
        pitch={523.25} // C5 note
      />
      <SingleHangingBell
        bellScene={bellR1}
        position={[3.6, 5.0, 2.0]}
        ringTriggerTime={ringTriggerTime}
        side="right"
        chainHeight={4.2}
        pitch={587.33} // D5 note
      />

      {/* Outer Side Archway Bells */}
      <SingleHangingBell
        bellScene={bellL2}
        position={[-5.2, 5.4, 1.4]}
        ringTriggerTime={ringTriggerTime}
        side="left"
        chainHeight={3.8}
        pitch={440.00} // A4 note
      />
      <SingleHangingBell
        bellScene={bellR2}
        position={[5.2, 5.4, 1.4]}
        ringTriggerTime={ringTriggerTime}
        side="right"
        chainHeight={3.8}
        pitch={659.25} // E5 note
      />
    </group>
  );
}
