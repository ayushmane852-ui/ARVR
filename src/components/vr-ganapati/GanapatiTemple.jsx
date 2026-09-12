import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Procedural soft divine radial halo aura texture
function createHaloTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(256, 256, 30, 256, 256, 240);
  gradient.addColorStop(0, 'rgba(255, 245, 180, 0.9)');
  gradient.addColorStop(0.35, 'rgba(251, 191, 36, 0.6)');
  gradient.addColorStop(0.7, 'rgba(245, 158, 11, 0.2)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  return texture;
}

// Single Vertical Marigold Flower Garland (Gendaphool Mala)
function MarigoldGarland({ position, height = 7.2, count = 28 }) {
  const [positions, colors] = useMemo(() => {
    const pos = [];
    const col = [];
    const step = height / count;
    for (let i = 0; i < count; i++) {
      const y = -i * step;
      const x = Math.sin(i * 0.45) * 0.03;
      const z = Math.cos(i * 0.45) * 0.03;
      pos.push([x, y, z]);
      col.push(i % 2 === 0 ? '#ea580c' : '#f59e0b');
    }
    return [pos, col];
  }, [count, height]);

  return (
    <group position={position}>
      {positions.map((p, idx) => (
        <mesh key={idx} position={p}>
          <sphereGeometry args={[0.13, 10, 10]} />
          <meshStandardMaterial
            color={colors[idx]}
            roughness={0.75}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

// Royal Brass Chhatra (Sacred Golden Umbrella suspended above Lord Ganesha's Crown)
function GoldenChhatra({ position = [0, 6.45, 0.3] }) {
  const fringeBeads = useMemo(() => {
    const beads = [];
    const numBeads = 32;
    const r = 1.85;
    for (let i = 0; i < numBeads; i++) {
      const angle = (i / numBeads) * Math.PI * 2;
      beads.push([Math.cos(angle) * r, -0.16, Math.sin(angle) * r]);
    }
    return beads;
  }, []);

  return (
    <group position={position}>
      {/* Brass Suspension Chain from Ceiling */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 5.0, 12]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.92}
          roughness={0.22}
        />
      </mesh>

      {/* Golden Kalash Finial Top */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.22, 0.42, 24]} />
        <meshStandardMaterial
          color="#fbbf24"
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* Main Fluted Chhatra Dome */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[0.3, 1.85, 0.4, 36, 1, true]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.92}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer Golden Rim Band (rotated flat in XZ plane) */}
      <mesh position={[0, -0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.85, 0.045, 16, 48]} />
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.95}
          roughness={0.16}
        />
      </mesh>

      {/* Hanging Golden Bead Fringe */}
      {fringeBeads.map((p, idx) => (
        <mesh key={idx} position={p}>
          <sphereGeometry args={[0.038, 8, 8]} />
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

// Ornate Sacred Temple Prabhavali Arch behind Lord Ganesha
function SacredPrabhavali() {
  const rays = useMemo(() => {
    const list = [];
    const numRays = 26;
    for (let i = 0; i <= numRays; i++) {
      const angle = (i / numRays) * Math.PI;
      list.push({
        x: Math.cos(angle) * 3.75,
        y: 2.4 + Math.sin(angle) * 3.75,
        rot: [0, 0, angle - Math.PI / 2],
      });
    }
    return list;
  }, []);

  return (
    <group position={[0, 0, -0.6]}>
      {/* Left Pillar of the Arch */}
      <mesh position={[-3.75, 0.2, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 4.8, 24]} />
        <meshStandardMaterial color="#c59b27" metalness={0.88} roughness={0.25} />
      </mesh>
      {/* Right Pillar of the Arch */}
      <mesh position={[3.75, 0.2, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 4.8, 24]} />
        <meshStandardMaterial color="#c59b27" metalness={0.88} roughness={0.25} />
      </mesh>

      {/* Main Semi-circular Golden Arch */}
      <mesh position={[0, 2.4, 0]}>
        <torusGeometry args={[3.75, 0.16, 16, 48, Math.PI]} />
        <meshStandardMaterial color="#d4af37" metalness={0.92} roughness={0.2} />
      </mesh>

      {/* Inner Decorative Arch */}
      <mesh position={[0, 2.4, 0.02]}>
        <torusGeometry args={[3.4, 0.08, 16, 48, Math.PI]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.16} />
      </mesh>

      {/* Radiant Aura Rays along the Arch */}
      {rays.map((r, i) => (
        <mesh key={i} position={[r.x, r.y + 0.8, 0]} rotation={r.rot}>
          <coneGeometry args={[0.08, 0.38, 12]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.92} roughness={0.2} />
        </mesh>
      ))}

      {/* Kirtimukha Crown Apex */}
      <mesh position={[0, 6.25, 0.05]}>
        <cylinderGeometry args={[0.14, 0.34, 0.52, 24]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.96} roughness={0.15} />
      </mesh>
    </group>
  );
}

// Multi-Tiered Carved Stone Temple Throne Steps
function TempleThroneSteps() {
  const petalPositions = useMemo(() => {
    const petals = [];
    const count = 38;
    for (let i = 0; i < count; i++) {
      const stepIdx = Math.floor(Math.random() * 3);
      const y = -2.78 - stepIdx * 0.07;
      const z = 0.8 + stepIdx * 0.8 + (Math.random() - 0.5) * 0.3;
      const x = (Math.random() - 0.5) * (3.8 + stepIdx * 1.0);
      const rot = [Math.random() * 0.2, Math.random() * Math.PI * 2, Math.random() * 0.2];
      const isRed = Math.random() > 0.35;
      petals.push({ pos: [x, y, z], rot, color: isRed ? '#e11d48' : '#f59e0b' });
    }
    return petals;
  }, []);

  return (
    <group>
      {/* Tier 1 (Upper Step) */}
      <mesh position={[0, -2.85, 0.8]} receiveShadow>
        <boxGeometry args={[4.8, 0.12, 1.8]} />
        <meshStandardMaterial color="#2d1d13" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Tier 2 (Middle Step) */}
      <mesh position={[0, -2.91, 1.6]} receiveShadow>
        <boxGeometry args={[5.8, 0.12, 1.6]} />
        <meshStandardMaterial color="#281910" roughness={0.72} metalness={0.2} />
      </mesh>

      {/* Tier 3 (Bottom Step) */}
      <mesh position={[0, -2.96, 2.4]} receiveShadow>
        <boxGeometry args={[6.8, 0.12, 1.4]} />
        <meshStandardMaterial color="#22150d" roughness={0.75} metalness={0.2} />
      </mesh>

      {/* Scattered Sacred Flower Petals on the Steps */}
      {petalPositions.map((p, idx) => (
        <mesh key={idx} position={p.pos} rotation={p.rot}>
          <circleGeometry args={[0.07, 8]} />
          <meshStandardMaterial
            color={p.color}
            roughness={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function GanapatiTemple({ blessingActive }) {
  const { scene } = useGLTF('/models/temple.glb');
  const haloRef = useRef();
  const haloTexture = useMemo(() => createHaloTexture(), []);

  // Clone scene and apply rich sacred temple stone & idol materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        // Hide raw photogrammetry floor scan with chopped geometry in favor of our custom carved temple steps and floor
        if (child.name === 'Cube003') {
          child.visible = false;
          return;
        }

        // Only Lord Ganesha idol needs to cast shadows into shadow map; temple walls/floor only receive shadows
        const isIdol = child.name === 'Mesh_0' || child.material?.name === 'Material.006';
        child.castShadow = isIdol;
        child.receiveShadow = true;

        if (child.material) {
          child.material = child.material.clone();

          // Consecrated Lord Ganesha idol with warm golden luster
          if (isIdol) {
            child.material.color = new THREE.Color('#ffe8c8');
            child.material.roughness = 0.26;
            child.material.metalness = 0.15;
            child.material.envMapIntensity = 2.2;
          } else {
            // Ancient carved Indian temple granite/sandstone
            child.material.color = new THREE.Color('#5c3a22');
            child.material.roughness = 0.68;
            child.material.metalness = 0.18;
          }
        }
      }
    });
    return clone;
  }, [scene]);

  return (
    <group>
      {/* 1. Temple Mandap & Lord Ganesha Idol */}
      <primitive 
        object={clonedScene} 
        position={[-5.0, -4.5, 5.0]} 
        scale={[1, 1, 1]} 
      />

      {/* 2. Sacred Carved Temple Prabhavali Arch behind Lord Ganesha */}
      <SacredPrabhavali />

      {/* 3. Multi-Tiered Carved Stone Throne Steps with Flower Petals */}
      <TempleThroneSteps />

      {/* 4. Royal Brass Chhatra (Canopy) suspended high above Lord Ganesha's Crown */}
      <GoldenChhatra position={[0, 6.45, 0.3]} />

      {/* 5. Vertical Marigold Flower Garlands framing the sanctum pillars */}
      <MarigoldGarland position={[-3.8, 6.4, 1.6]} height={7.8} count={30} />
      <MarigoldGarland position={[3.8, 6.4, 1.6]} height={7.8} count={30} />

      {/* Outer pillar garlands */}
      <MarigoldGarland position={[-5.4, 6.4, 1.0]} height={7.8} count={30} />
      <MarigoldGarland position={[5.4, 6.4, 1.0]} height={7.8} count={30} />

      {/* 6. Ornate Brass Offering Thali Platform in front of Lotus Feet */}
      <group position={[0, -2.86, 2.6]}>
        <mesh position={[0, 0.04, 0]} receiveShadow>
          <cylinderGeometry args={[1.5, 1.3, 0.08, 48]} />
          <meshStandardMaterial 
            color="#d4af37" 
            metalness={0.92} 
            roughness={0.2} 
          />
        </mesh>
        {/* Flat brass thali rim */}
        <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.45, 0.04, 16, 48]} />
          <meshStandardMaterial 
            color="#f59e0b" 
            metalness={0.94} 
            roughness={0.16} 
          />
        </mesh>
      </group>

      {/* 6. Polished Temple Floor (Reflective Dark Granite catching warm diya reflections) */}
      <mesh position={[0, -3.01, 3.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial
          color="#160e0a"
          roughness={0.18}
          metalness={0.35}
        />
      </mesh>

      {/* 
        7. Divine Radiant Halo Aura BEHIND Lord Ganesha's Head (z = -2.6)
        Soft radial glow disc with Additive Blending
      */}
      <mesh
        ref={haloRef}
        position={[0, 3.8, -2.6]}
      >
        <planeGeometry args={[6.8, 6.8]} />
        <meshBasicMaterial
          map={haloTexture}
          transparent
          opacity={blessingActive ? 0.95 : 0.42}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ============================================================ */}
      {/* SACRED TEMPLE ILLUMINATION (Warm, Rich & Divine)             */}
      {/* ============================================================ */}

      {/* 1. Main Front Key Light */}
      <directionalLight
        position={[0, 4.2, 9.5]}
        intensity={blessingActive ? 5.8 : 4.0}
        color="#fff4e0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />

      {/* 2. Warm Front Fill Light (Chest level) */}
      <pointLight
        position={[0, 1.8, 4.2]}
        intensity={blessingActive ? 3.8 : 2.8}
        color="#ffa834"
        distance={14}
        decay={1}
      />

      {/* 3. Left Side Warm Pillar Fill */}
      <pointLight
        position={[-3.6, 2.2, 3.2]}
        intensity={2.6}
        color="#ff9922"
        distance={12}
        decay={1}
      />

      {/* 4. Right Side Warm Pillar Fill */}
      <pointLight
        position={[3.6, 2.2, 3.2]}
        intensity={2.6}
        color="#ff9922"
        distance={12}
        decay={1}
      />

      {/* 5. Golden Rim / Mukut Halo Light (behind Ganesha's crown) */}
      <pointLight
        position={[0, 4.4, -2.4]}
        intensity={blessingActive ? 5.8 : 3.2}
        color="#fbbf24"
        distance={12}
        decay={1}
      />
    </group>
  );
}
