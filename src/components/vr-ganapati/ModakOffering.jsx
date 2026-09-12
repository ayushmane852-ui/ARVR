import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MODAK_SCALE = 2.2;

function createModakGeometry() {
  const points = [];
  const numSteps = 24;
  for (let i = 0; i <= numSteps; i++) {
    const v = i / numSteps;
    const y = v * 0.22;
    let r = 0;
    if (v < 0.1) {
      r = Math.sin((v / 0.1) * (Math.PI / 2)) * 0.08;
    } else if (v < 0.6) {
      const p = (v - 0.1) / 0.5;
      r = 0.08 + Math.sin(p * Math.PI) * 0.035;
    } else {
      const p = (v - 0.6) / 0.4;
      r = 0.08 * Math.pow(1 - p, 2);
    }
    points.push(new THREE.Vector2(Math.max(0, r), y));
  }
  return new THREE.LatheGeometry(points, 24);
}

function SingleAnimatedModak({ offering, modakGeom }) {
  const modakRef = useRef();

  useFrame((state) => {
    if (!modakRef.current) return;
    const now = state.clock.getElapsedTime();
    const progress = Math.min(1, Math.max(0, (now - offering.startTime) / 1.8));

    if (progress < 1) {
      const ease = 1 - Math.pow(1 - progress, 3);
      const x = THREE.MathUtils.lerp(offering.startPos[0], offering.targetPos[0], ease);
      const z = THREE.MathUtils.lerp(offering.startPos[2], offering.targetPos[2], ease);
      const arc = Math.sin(progress * Math.PI) * 1.5;
      const y = THREE.MathUtils.lerp(offering.startPos[1], offering.targetPos[1], ease) + arc;

      modakRef.current.position.set(x, y, z);
      modakRef.current.rotation.y = offering.rot[1] + progress * Math.PI * 2;
      modakRef.current.rotation.x = Math.sin(progress * Math.PI) * 0.2;
    } else {
      modakRef.current.position.set(...offering.targetPos);
      modakRef.current.rotation.set(...offering.rot);
    }
  });

  return (
    <group ref={modakRef} scale={[MODAK_SCALE, MODAK_SCALE, MODAK_SCALE]}>
      <mesh geometry={modakGeom} castShadow receiveShadow>
        <meshStandardMaterial
          color="#f59e0b" // Rich Golden Kesar
          metalness={0.78}
          roughness={0.26}
          emissive="#b45309"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Silver Vark Foil Tip */}
      <mesh position={[0, 0.21, 0]}>
        <sphereGeometry args={[0.012, 12, 12]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.96}
          roughness={0.08}
        />
      </mesh>
    </group>
  );
}

export default function ModakOffering({ modakOfferings }) {
  const modakGeom = useMemo(() => createModakGeometry(), []);

  return (
    <group>
      {/* Animated offered modaks */}
      {modakOfferings.map((offering) => (
        <SingleAnimatedModak
          key={offering.id}
          offering={offering}
          modakGeom={modakGeom}
        />
      ))}

      {/* Plate of Modaks placed on the brass thali in front of Lord Ganesha */}
      <group position={[0, -2.76, 2.4]} scale={[MODAK_SCALE, MODAK_SCALE, MODAK_SCALE]}>
        {/* Central main Modak */}
        <mesh geometry={modakGeom} position={[0, 0.02, 0]} castShadow>
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.82}
            roughness={0.22}
          />
        </mesh>
        {/* Surrounding smaller modaks */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i / 5) * Math.PI * 2;
          const r = 0.16;
          return (
            <mesh
              key={i}
              geometry={modakGeom}
              position={[Math.cos(angle) * r, 0.02, Math.sin(angle) * r]}
              scale={[0.72, 0.72, 0.72]}
              rotation={[0, angle, 0]}
              castShadow
            >
              <meshStandardMaterial
                color="#f59e0b"
                metalness={0.82}
                roughness={0.22}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
