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

export default function GanapatiTemple({ blessingActive }) {
  const { scene } = useGLTF('/models/temple.glb');
  const haloRef = useRef();
  const haloTexture = useMemo(() => createHaloTexture(), []);

  // Clone scene and apply rich sacred temple stone & idol materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material = child.material.clone();

          // Lord Ganesha idol mesh
          if (child.name === 'Mesh_0' || child.material.name === 'Material.006') {
            child.material.color = new THREE.Color('#ffffff');
            child.material.roughness = 0.38;
            child.material.metalness = 0.15;
            child.material.envMapIntensity = 1.4;
          } else {
            // Temple architecture: Deep carved ancient temple granite/sandstone
            child.material.color = new THREE.Color('#1c140e');
            child.material.roughness = 0.85;
            child.material.metalness = 0.12;
          }
        }
      }
    });
    return clone;
  }, [scene]);

  return (
    <group>
      {/* 
        Temple mandap and Ganesha idol.
        Shifted by x = -5.0, y = -4.5, z = 5.0 to center Lord Ganesha (Mesh_0) 
        at the origin (0, 1.48, 0.31) with height ~8.7 units.
      */}
      <primitive 
        object={clonedScene} 
        position={[-5.0, -4.5, 5.0]} 
        scale={[1, 1, 1]} 
      />

      {/* Ornate Brass Offering Thali Platform in front of Lord Ganesha's Lotus Feet */}
      <group position={[0, -2.85, 2.2]}>
        <mesh position={[0, 0.04, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[1.5, 1.3, 0.08, 48]} />
          <meshStandardMaterial 
            color="#d4af37" 
            metalness={0.92} 
            roughness={0.2} 
          />
        </mesh>
        {/* Flat brass thali lip rim (rotated flat on X axis) */}
        <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.45, 0.04, 16, 48]} />
          <meshStandardMaterial 
            color="#f59e0b" 
            metalness={0.94} 
            roughness={0.16} 
          />
        </mesh>
      </group>

      {/* 
        Divine Radiant Halo Aura BEHIND Lord Ganesha's Head (z = -2.6)
        Soft radial glow disc with Additive Blending
      */}
      <mesh
        ref={haloRef}
        position={[0, 3.8, -2.6]}
        rotation={[0, 0, 0]}
      >
        <planeGeometry args={[6.5, 6.5]} />
        <meshBasicMaterial
          map={haloTexture}
          transparent
          opacity={blessingActive ? 0.95 : 0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ============================================================ */}
      {/* DIRECT ILLUMINATION ON LORD GANESHA (Warm, Rich & Sacred)    */}
      {/* ============================================================ */}

      {/* 1. Main Front Key Light */}
      <directionalLight
        position={[0, 4.0, 9.0]}
        intensity={blessingActive ? 5.5 : 3.8}
        color="#fff1d6"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      {/* 2. Warm Front Fill Light (Chest level) */}
      <pointLight
        position={[0, 1.8, 3.8]}
        intensity={blessingActive ? 3.5 : 2.4}
        color="#ffa834"
        distance={14}
        decay={1}
      />

      {/* 3. Left Side Fill Light */}
      <pointLight
        position={[-3.5, 2.2, 3.0]}
        intensity={2.0}
        color="#ff9922"
        distance={12}
        decay={1}
      />

      {/* 4. Right Side Fill Light */}
      <pointLight
        position={[3.5, 2.2, 3.0]}
        intensity={2.0}
        color="#ff9922"
        distance={12}
        decay={1}
      />

      {/* 5. Golden Rim / Halo Light (behind Ganesha's head) */}
      <pointLight
        position={[0, 4.2, -2.5]}
        intensity={blessingActive ? 5.5 : 2.8}
        color="#fbbf24"
        distance={12}
        decay={1}
      />
    </group>
  );
}

useGLTF.preload('/models/temple.glb');
