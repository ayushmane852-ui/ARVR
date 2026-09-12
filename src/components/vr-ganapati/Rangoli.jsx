import React, { useMemo } from 'react';
import * as THREE from 'three';

// Procedural Sacred Indian Temple Floral Rangoli / Mandala Canvas Texture
function createRangoliTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  const cx = 512;
  const cy = 512;

  // Clear background
  ctx.clearRect(0, 0, 1024, 1024);

  // Outer dark red circular border
  ctx.beginPath();
  ctx.arc(cx, cy, 480, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(120, 15, 20, 0.85)';
  ctx.fill();

  // Outer golden marigold ring
  const numOuterPetals = 36;
  for (let i = 0; i < numOuterPetals; i++) {
    const angle = (i / numOuterPetals) * Math.PI * 2;
    const px = cx + Math.cos(angle) * 440;
    const py = cy + Math.sin(angle) * 440;
    ctx.beginPath();
    ctx.arc(px, py, 28, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? '#f59e0b' : '#ef4444'; // Orange & red alternating
    ctx.fill();
  }

  // Second ring: Saffron marigold band
  ctx.beginPath();
  ctx.arc(cx, cy, 390, 0, Math.PI * 2);
  ctx.fillStyle = '#b45309';
  ctx.fill();

  // Decorative lotus petal star ring
  const numLotusPetals = 24;
  for (let i = 0; i < numLotusPetals; i++) {
    const angle = (i / numLotusPetals) * Math.PI * 2;
    const x1 = cx + Math.cos(angle) * 360;
    const y1 = cy + Math.sin(angle) * 360;
    const x2 = cx + Math.cos(angle + 0.12) * 280;
    const y2 = cy + Math.sin(angle + 0.12) * 280;
    const x3 = cx + Math.cos(angle - 0.12) * 280;
    const y3 = cy + Math.sin(angle - 0.12) * 280;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fillStyle = i % 2 === 0 ? '#fbbf24' : '#f43f5e';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Middle ring: Rice powder white & crimson sacred geometry
  ctx.beginPath();
  ctx.arc(cx, cy, 260, 0, Math.PI * 2);
  ctx.fillStyle = '#991b1b';
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Inner 16-petal golden flower
  const numInnerPetals = 16;
  for (let i = 0; i < numInnerPetals; i++) {
    const angle = (i / numInnerPetals) * Math.PI * 2;
    const px = cx + Math.cos(angle) * 190;
    const py = cy + Math.sin(angle) * 190;
    ctx.beginPath();
    ctx.arc(px, py, 45, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#fffbeb';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Center core: Crimson disc with golden Om
  ctx.beginPath();
  ctx.arc(cx, cy, 120, 0, Math.PI * 2);
  ctx.fillStyle = '#7f1d1d';
  ctx.fill();
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 5;
  ctx.stroke();

  // Golden Om in center
  ctx.font = 'bold 110px serif';
  ctx.fillStyle = '#fbbf24';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ॐ', cx, cy + 5);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  return texture;
}

export default function Rangoli({ position = [0, -2.99, 4.2] }) {
  const texture = useMemo(() => createRangoliTexture(), []);

  return (
    <group position={position} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Dark reflective stone underlay for polished floor reflection */}
      <mesh receiveShadow>
        <circleGeometry args={[2.5, 64]} />
        <meshStandardMaterial
          color="#120c08"
          roughness={0.25}
          metalness={0.3}
        />
      </mesh>

      {/* Decorative Floral Rangoli Mandala */}
      <mesh position={[0, 0, 0.01]} receiveShadow>
        <circleGeometry args={[2.2, 64]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={0.92}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}
