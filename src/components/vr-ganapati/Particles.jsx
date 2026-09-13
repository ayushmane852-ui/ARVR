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

// Create an organically curved 3D petal geometry with cupped edges
function createPetalGeometry() {
  const geom = new THREE.PlaneGeometry(0.18, 0.28, 4, 4);
  const pos = geom.attributes.position;
  
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    // Curl edges inward along Z to create natural petal cup shape
    const curl = (1.0 - (x * x) / (0.09 * 0.09)) * 0.035;
    // Longitudinal curvature from stem to tip
    const arch = -Math.sin((y + 0.14) / 0.28 * Math.PI) * 0.025;
    pos.setZ(i, curl + arch);
  }
  geom.computeVertexNormals();
  return geom;
}

// Sacred flower petal color palette: Crimson rose, soft pink, saffron, marigold orange, and jasmine cream
const PETAL_PALETTE = [
  '#e11d48', // Crimson Rose
  '#fb7185', // Soft Pink
  '#f59e0b', // Saffron Marigold
  '#ea580c', // Deep Orange
  '#fef08a', // Champa Yellow
  '#fff1f2', // Sacred Jasmine
];

function generateInstancedPetals(count) {
  const petals = [];
  for (let i = 0; i < count; i++) {
    petals.push({
      x: (Math.random() - 0.5) * 14.0,
      y: 8.5 + Math.random() * 6.0,
      z: (Math.random() - 0.5) * 12.0 + 3.0,
      speedY: 0.35 + Math.random() * 0.5,
      swayFreq: 0.7 + Math.random() * 0.8,
      swayAmp: 0.25 + Math.random() * 0.35,
      spinSpeed: (Math.random() - 0.5) * 1.8,
      flutterFreq: 1.4 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
      scale: 0.75 + Math.random() * 0.5,
      rotY: Math.random() * Math.PI * 2,
      color: PETAL_PALETTE[Math.floor(Math.random() * PETAL_PALETTE.length)],
    });
  }
  return petals;
}

// High-Performance 3D Instanced Flower Petals with realistic fluttering and tumbling
function FloatingPetals({ count = 80, isDiyaLit = false }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const petalGeom = useMemo(() => createPetalGeometry(), []);
  const petals = useMemo(() => generateInstancedPetals(count), [count]);

  // Initialize petal colors & initial positions
  React.useEffect(() => {
    if (!meshRef.current) return;
    const tempColor = new THREE.Color();
    for (let i = 0; i < count; i++) {
      tempColor.set(petals[i].color);
      meshRef.current.setColorAt(i, tempColor);

      dummy.position.set(petals[i].x, petals[i].y, petals[i].z);
      dummy.rotation.set(0, petals[i].rotY, 0);
      dummy.scale.setScalar(petals[i].scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, petals, dummy]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const dt = Math.min(delta, 0.1);
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const p = petals[i];
      p.y -= p.speedY * dt;

      // Wrap around to top when falling below sanctum floor
      if (p.y < -2.8) {
        p.y = 8.5 + Math.random() * 3.5;
        p.x = (Math.random() - 0.5) * 14.0;
        p.z = (Math.random() - 0.5) * 12.0 + 3.0;
      }

      // Realistic aerodynamics: gentle sine sway + rotational tumble
      const curX = p.x + Math.sin(t * p.swayFreq + p.phase) * p.swayAmp;
      const curZ = p.z + Math.cos(t * (p.swayFreq * 0.75) + p.phase) * (p.swayAmp * 0.8);

      p.rotY += p.spinSpeed * dt;
      const rotX = Math.sin(t * p.flutterFreq + p.phase) * 0.65 + 0.35;
      const rotZ = Math.cos(t * (p.flutterFreq * 0.85) + p.phase) * 0.45;

      dummy.position.set(curX, p.y, curZ);
      dummy.rotation.set(rotX, p.rotY, rotZ);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeom, null, count]}
      frustumCulled={false}
    >
      <meshStandardMaterial
        side={THREE.DoubleSide}
        roughness={0.4}
        metalness={0.08}
        transparent
        opacity={0.92}
        emissive={isDiyaLit ? '#521d0a' : '#000000'}
        emissiveIntensity={isDiyaLit ? 0.35 : 0}
      />
    </instancedMesh>
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

export default function Particles({ blessingActive, isDiyaLit = false, arModeActive = false }) {
  return (
    <group>
      <GoldenEmbers count={arModeActive ? 48 : 160} />
      <FloatingPetals count={arModeActive ? 28 : 80} isDiyaLit={isDiyaLit} />
      <BlessingVortex active={blessingActive} count={arModeActive ? 100 : 240} />
    </group>
  );
}
