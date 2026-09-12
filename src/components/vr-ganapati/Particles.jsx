import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural soft glowing circular particle sprite (eliminates square quads)
function createPointTexture(colorRgb = '251, 191, 36') {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.35, `rgba(${colorRgb}, 0.85)`);
  gradient.addColorStop(0.7, `rgba(${colorRgb}, 0.3)`);
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function generateEmberData(count) {
  const pos = new Float32Array(count * 3);
  const spd = new Float32Array(count);
  const phs = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 16.0;
    pos[i * 3 + 1] = Math.random() * 11.0 - 2.8;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 14.0 + 3.0;

    spd[i] = 0.2 + Math.random() * 0.4;
    phs[i] = Math.random() * Math.PI * 2;
  }
  return [pos, spd, phs];
}

function generatePetalData(count) {
  const pos = new Float32Array(count * 3);
  const spd = new Float32Array(count);
  const rot = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 14.0;
    pos[i * 3 + 1] = 8.5 + Math.random() * 6.0;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 12.0 + 3.0;

    spd[i] = 0.35 + Math.random() * 0.45;
    rot[i] = Math.random() * Math.PI * 2;
  }
  return [pos, spd, rot];
}

function generateVortexData(count) {
  const pos = new Float32Array(count * 3);
  const ang = new Float32Array(count);
  const rad = new Float32Array(count);
  const spd = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    ang[i] = (i / count) * Math.PI * 4;
    rad[i] = 1.2 + Math.random() * 3.6;
    spd[i] = 0.8 + Math.random() * 1.2;

    pos[i * 3] = Math.cos(ang[i]) * rad[i];
    pos[i * 3 + 1] = (i / count) * 8.5 - 2.5;
    pos[i * 3 + 2] = Math.sin(ang[i]) * rad[i] + 0.3;
  }
  return [pos, ang, rad, spd];
}

// Ambient Golden Embers drifting gently upward throughout the temple
function GoldenEmbers({ count = 160 }) {
  const pointsRef = useRef();
  const [positions, speeds, phases] = useMemo(() => generateEmberData(count), [count]);
  const emberTexture = useMemo(() => createPointTexture('251, 191, 36'), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posArr = pointsRef.current.geometry.attributes.position.array;
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      posArr[idx + 1] += speeds[i] * 0.015;

      posArr[idx] += Math.sin(t * 0.8 + phases[i]) * 0.005;
      posArr[idx + 2] += Math.cos(t * 0.7 + phases[i]) * 0.005;

      if (posArr[idx + 1] > 8.5) {
        posArr[idx + 1] = -2.8;
        posArr[idx] = (Math.random() - 0.5) * 16.0;
        posArr[idx + 2] = (Math.random() - 0.5) * 14.0 + 3.0;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={emberTexture}
        size={0.12}
        color="#fbbf24"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Falling Sacred Flower Petals
function FallingPetals({ count = 100 }) {
  const pointsRef = useRef();
  const [positions, speeds, rotations] = useMemo(() => generatePetalData(count), [count]);
  const petalTexture = useMemo(() => createPointTexture('251, 113, 133'), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posArr = pointsRef.current.geometry.attributes.position.array;
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      posArr[idx + 1] -= speeds[i] * 0.02;

      posArr[idx] += Math.sin(t * 1.5 + rotations[i]) * 0.008;
      posArr[idx + 2] += Math.cos(t * 1.2 + rotations[i]) * 0.006;

      if (posArr[idx + 1] < -2.8) {
        posArr[idx + 1] = 8.5 + Math.random() * 3.0;
        posArr[idx] = (Math.random() - 0.5) * 14.0;
        posArr[idx + 2] = (Math.random() - 0.5) * 12.0 + 3.0;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={petalTexture}
        size={0.18}
        color="#fb7185"
        transparent
        opacity={0.9}
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Blessing Vortex around Lord Ganesha
function BlessingVortex({ active, count = 240 }) {
  const pointsRef = useRef();
  const [positions, angles, radii, speeds] = useMemo(() => generateVortexData(count), [count]);
  const vortexTexture = useMemo(() => createPointTexture('254, 240, 138'), []);

  useFrame((state) => {
    if (!pointsRef.current || !active) return;
    const posArr = pointsRef.current.geometry.attributes.position.array;
    const dt = state.clock.getDelta();

    for (let i = 0; i < count; i++) {
      angles[i] += speeds[i] * dt * 1.6;
      const idx = i * 3;

      posArr[idx] = Math.cos(angles[i]) * radii[i];
      posArr[idx + 1] += speeds[i] * dt * 1.2;
      posArr[idx + 2] = Math.sin(angles[i]) * radii[i] + 0.3;

      if (posArr[idx + 1] > 6.8) {
        posArr[idx + 1] = -2.4;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!active) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={vortexTexture}
        size={0.14}
        color="#fef08a"
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function Particles({ blessingActive }) {
  return (
    <group>
      <GoldenEmbers count={160} />
      <FallingPetals count={100} />
      <BlessingVortex active={blessingActive} count={240} />
    </group>
  );
}
