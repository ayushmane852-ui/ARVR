import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

// 3D Sub-Floor Solar System & Cosmic Galaxy Component (Logo Color Theme)
function SubFloorSolarSystem3D({ position = [0, -5.5, 0] }) {
  const solarGroupRef = useRef();
  const sunCoreRef = useRef();

  const p1Ref = useRef();
  const p2Ref = useRef();
  const p3Ref = useRef();
  const p4Ref = useRef();
  const p5Ref = useRef();

  const angles = useRef({ p1: 0, p2: 1.2, p3: 2.8, p4: 4.2, p5: 5.5 });

  const [starPositions, starColors] = useMemo(() => {
    const count = 3500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cCyan = new THREE.Color("#00f0ff");
    const cViolet = new THREE.Color("#a855f7");
    const cGold = new THREE.Color("#fbbf24");

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 24;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 0.5;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = phi * 2.5;
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      const rand = Math.random();
      let starColor = cCyan;
      if (rand < 0.4) starColor = cViolet;
      else if (rand < 0.75) starColor = cGold;

      col[i * 3] = starColor.r;
      col[i * 3 + 1] = starColor.g;
      col[i * 3 + 2] = starColor.b;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (solarGroupRef.current) {
      solarGroupRef.current.rotation.y += delta * 0.05;
    }

    if (sunCoreRef.current) {
      sunCoreRef.current.rotation.y -= delta * 0.15;
    }

    angles.current.p1 += delta * 0.5;
    angles.current.p2 += delta * 0.35;
    angles.current.p3 += delta * 0.22;
    angles.current.p4 += delta * 0.15;
    angles.current.p5 += delta * 0.09;

    if (p1Ref.current) {
      const r = 4.0;
      p1Ref.current.position.x = Math.cos(angles.current.p1) * r;
      p1Ref.current.position.z = Math.sin(angles.current.p1) * r;
      p1Ref.current.rotation.y += delta * 0.9;
    }

    if (p2Ref.current) {
      const r = 6.5;
      p2Ref.current.position.x = Math.cos(angles.current.p2) * r;
      p2Ref.current.position.z = Math.sin(angles.current.p2) * r;
      p2Ref.current.rotation.y += delta * 0.6;
    }

    if (p3Ref.current) {
      const r = 9.0;
      p3Ref.current.position.x = Math.cos(angles.current.p3) * r;
      p3Ref.current.position.z = Math.sin(angles.current.p3) * r;
      p3Ref.current.rotation.y += delta * 0.4;
    }

    if (p4Ref.current) {
      const r = 11.5;
      p4Ref.current.position.x = Math.cos(angles.current.p4) * r;
      p4Ref.current.position.z = Math.sin(angles.current.p4) * r;
      p4Ref.current.rotation.y += delta * 0.3;
    }

    if (p5Ref.current) {
      const r = 14.0;
      p5Ref.current.position.x = Math.cos(angles.current.p5) * r;
      p5Ref.current.position.z = Math.sin(angles.current.p5) * r;
      p5Ref.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group position={position} ref={solarGroupRef}>
      <group ref={sunCoreRef}>
        <mesh>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
        <mesh>
          <sphereGeometry args={[2.3, 32, 32]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[2.8, 1]} />
          <meshBasicMaterial color="#d97706" wireframe transparent opacity={0.4} />
        </mesh>
      </group>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[starColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {[4.0, 6.5, 9.0, 11.5, 14.0].map((radius, idx) => (
        <mesh key={idx} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
          <meshBasicMaterial 
            color={idx % 2 === 0 ? "#00f0ff" : "#a855f7"} 
            side={THREE.DoubleSide} 
            transparent 
            opacity={0.4} 
          />
        </mesh>
      ))}

      <group ref={p1Ref}>
        <mesh>
          <sphereGeometry args={[0.45, 24, 24]} />
          <meshStandardMaterial color="#00f0ff" emissive="#0284c7" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>

      <group ref={p2Ref}>
        <mesh>
          <sphereGeometry args={[0.65, 24, 24]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d97706" roughness={0.3} />
        </mesh>
      </group>

      <group ref={p3Ref}>
        <mesh>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" roughness={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0.2, 0]}>
          <ringGeometry args={[1.3, 1.8, 32]} />
          <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.7} />
        </mesh>
      </group>

      <group ref={p4Ref}>
        <mesh>
          <sphereGeometry args={[0.75, 24, 24]} />
          <meshStandardMaterial color="#e879f9" emissive="#c084fc" roughness={0.3} />
        </mesh>
      </group>

      <group ref={p5Ref}>
        <mesh>
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshStandardMaterial color="#a855f7" emissive="#7e22ce" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <ringGeometry args={[1.3, 1.6, 32]} />
          <meshBasicMaterial color="#c084fc" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

// 3D Office Chair
function OfficeChair3D({ position, color = "#1e293b", rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.3, 12]} />
        <meshStandardMaterial color="#475569" metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 5]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.5]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.7, 0.22]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.48, 0.65, 0.06]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh position={[-0.26, 0.5, 0]}>
        <boxGeometry args={[0.05, 0.25, 0.35]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[0.26, 0.5, 0]}>
        <boxGeometry args={[0.05, 0.25, 0.35]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </group>
  );
}

// Reusable 3D Seated Person Avatar Component
function SeatedPersonAvatar3D({ 
  position = [0, 0, 0], 
  rotation = [0, Math.PI, 0], 
  shirtColor = "#0284c7", 
  pantsColor = "#0f172a", 
  skinColor = "#ffdbac",
  hairColor = "#1f2937" 
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.62, 0]}>
        <boxGeometry args={[0.38, 0.46, 0.22]} />
        <meshStandardMaterial color={shirtColor} roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.06, 0.02]}>
        <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
        <meshStandardMaterial color={hairColor} roughness={0.8} />
      </mesh>
      <mesh position={[-0.1, 0.38, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.06, 0.32, 12]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
      <mesh position={[0.1, 0.38, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.06, 0.32, 12]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
      <mesh position={[-0.1, 0.18, -0.28]}>
        <cylinderGeometry args={[0.06, 0.05, 0.32, 12]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
      <mesh position={[0.1, 0.18, -0.28]}>
        <cylinderGeometry args={[0.06, 0.05, 0.32, 12]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
      <mesh position={[-0.22, 0.54, -0.15]} rotation={[0.4, 0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.04, 0.32, 12]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>
      <mesh position={[0.22, 0.54, -0.15]} rotation={[0.4, -0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.04, 0.32, 12]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>
    </group>
  );
}

// 3D Seated Man Avatar Structure (Dr. Lingaraj Hadimani - HOD CSE)
function SeatedManAvatar3D({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.42, 0.5, 0.25]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.7, -0.13]}>
        <boxGeometry args={[0.08, 0.3, 0.02]} />
        <meshStandardMaterial color="#d97706" emissive="#b45309" />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.16, 20, 20]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.15, 0.02]}>
        <sphereGeometry args={[0.165, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
        <meshStandardMaterial color="#1f2937" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.05, -0.16]}>
        <boxGeometry args={[0.24, 0.06, 0.02]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} />
      </mesh>
      <mesh position={[-0.12, 0.38, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.07, 0.35, 12]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0.12, 0.38, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.07, 0.35, 12]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[-0.12, 0.18, -0.3]}>
        <cylinderGeometry args={[0.07, 0.06, 0.35, 12]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0.12, 0.18, -0.3]}>
        <cylinderGeometry args={[0.07, 0.06, 0.35, 12]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[-0.24, 0.55, -0.18]} rotation={[0.4, 0.2, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.35, 12]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>
      <mesh position={[0.24, 0.55, -0.18]} rotation={[0.4, -0.2, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.35, 12]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>
    </group>
  );
}

// 3D Seated Woman Avatar Structure (Anuradha Solanki - Faculty Coordinator)
function SeatedWomanAvatar3D({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.63, 0]}>
        <boxGeometry args={[0.38, 0.48, 0.22]} />
        <meshStandardMaterial color="#be185d" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.06, 0.07, 0.1, 12]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      <mesh position={[0, 1.03, 0]}>
        <sphereGeometry args={[0.15, 20, 20]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.05, 0.04]}>
        <sphereGeometry args={[0.17, 16, 16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.9, 0.12]}>
        <boxGeometry args={[0.28, 0.35, 0.12]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
      <mesh position={[-0.1, 0.38, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.06, 0.35, 12]} />
        <meshStandardMaterial color="#881337" />
      </mesh>
      <mesh position={[0.1, 0.38, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.06, 0.35, 12]} />
        <meshStandardMaterial color="#881337" />
      </mesh>
      <mesh position={[-0.1, 0.18, -0.3]}>
        <cylinderGeometry args={[0.06, 0.05, 0.35, 12]} />
        <meshStandardMaterial color="#881337" />
      </mesh>
      <mesh position={[0.1, 0.18, -0.3]}>
        <cylinderGeometry args={[0.06, 0.05, 0.35, 12]} />
        <meshStandardMaterial color="#881337" />
      </mesh>
      <mesh position={[-0.22, 0.55, -0.18]} rotation={[0.4, 0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.04, 0.35, 12]} />
        <meshStandardMaterial color="#be185d" />
      </mesh>
      <mesh position={[0.22, 0.55, -0.18]} rotation={[0.4, -0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.04, 0.35, 12]} />
        <meshStandardMaterial color="#be185d" />
      </mesh>
    </group>
  );
}

// Full-Screen 3D Cyber Entrance Vault Doors Component
function GrandEntranceDoors3D({ openRatio }) {
  const leftDoorRef = useRef();
  const rightDoorRef = useRef();

  useFrame((_, delta) => {
    // Open doors apart smoothly based on openRatio (0 to 1)
    const targetLeft = -2.5 - openRatio * 11.5;
    const targetRight = 2.5 + openRatio * 11.5;

    if (leftDoorRef.current) {
      leftDoorRef.current.position.x = THREE.MathUtils.lerp(leftDoorRef.current.position.x, targetLeft, delta * 6);
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.position.x = THREE.MathUtils.lerp(rightDoorRef.current.position.x, targetRight, delta * 6);
    }
  });

  return (
    <group position={[0, 0, 18]}>
      {/* Dark Blocking Wall behind doors when closed to obscure room inside */}
      <mesh position={[0, 2.5, -0.4]}>
        <planeGeometry args={[35, 25]} />
        <meshBasicMaterial color="#020617" transparent opacity={Math.max(0, 1 - openRatio * 3)} />
      </mesh>

      {/* Massive Outer Cyber Doorway Arch */}
      <mesh position={[-5.2, 4.0, 0]}>
        <boxGeometry args={[1.4, 9.5, 1.4]} />
        <meshStandardMaterial color="#00f0ff" emissive="#0284c7" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[5.2, 4.0, 0]}>
        <boxGeometry args={[1.4, 9.5, 1.4]} />
        <meshStandardMaterial color="#00f0ff" emissive="#0284c7" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 8.2, 0]}>
        <boxGeometry args={[11.8, 1.4, 1.4]} />
        <meshStandardMaterial color="#00f0ff" emissive="#0284c7" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Left Heavy Sliding Vault Door */}
      <group ref={leftDoorRef} position={[-2.5, 3.8, 0]}>
        <mesh>
          <boxGeometry args={[5.0, 8.2, 0.4]} />
          <meshStandardMaterial color="#070d1f" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Neon Holographic Circuit Grid */}
        <mesh position={[0, 0, 0.22]}>
          <boxGeometry args={[4.5, 7.8, 0.02]} />
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.7} />
        </mesh>
        <mesh position={[2.0, 0, 0.25]}>
          <cylinderGeometry args={[0.14, 0.14, 2.5, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} emissive="#d97706" />
        </mesh>
      </group>

      {/* Right Heavy Sliding Vault Door */}
      <group ref={rightDoorRef} position={[2.5, 3.8, 0]}>
        <mesh>
          <boxGeometry args={[5.0, 8.2, 0.4]} />
          <meshStandardMaterial color="#070d1f" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Neon Holographic Circuit Grid */}
        <mesh position={[0, 0, 0.22]}>
          <boxGeometry args={[4.5, 7.8, 0.02]} />
          <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.7} />
        </mesh>
        <mesh position={[-2.0, 0, 0.25]}>
          <cylinderGeometry args={[0.14, 0.14, 2.5, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} emissive="#d97706" />
        </mesh>
      </group>
    </group>
  );
}

// Entrance Camera Rig: Only animates camera DURING door transition (openRatio < 0.95).
// Once inside (openRatio >= 0.95), stops overriding camera so OrbitControls has full control!
function FrontViewCameraRig({ openRatio, isUserInteracting }) {
  useFrame(({ camera }) => {
    // Only interpolate camera when opening doors and user hasn't started manually orbiting
    if (openRatio < 0.95 && !isUserInteracting) {
      // Smoothly fly from entrance [0, 2.2, 26] to room overview [0, 6.5, 23.5]
      const targetZ = 26.0 - openRatio * 2.5; // z: 26.0 -> 23.5
      const targetY = 2.2 + openRatio * 4.3;   // y: 2.2 -> 6.5

      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.08);
      camera.lookAt(0, 1.2, 0);
    }
  });

  return null;
}

// 1. 3D Faculty Directorate Desk (Center Front)
function FacultyPavilion3D({ onSelect, hoveredZone, setHoveredZone }) {
  const ringRef = useRef();
  const isHovered = hoveredZone === 'faculty';

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group 
      position={[0, 0, 1.5]}
      onClick={(e) => { e.stopPropagation(); onSelect('faculty'); }}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredZone('faculty'); }}
      onPointerOut={() => setHoveredZone(null)}
    >
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[3.2, 3.6, 0.3, 8]} />
        <meshStandardMaterial 
          color={isHovered ? "#ffea00" : "#d97706"} 
          emissive={isHovered ? "#d97706" : "#b45309"}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      <mesh ref={ringRef} position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.7, 3.9, 32]} />
        <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} transparent opacity={isHovered ? 0.9 : 0.6} />
      </mesh>

      {[[-2.2, -2.2], [2.2, -2.2], [-2.2, 2.2], [2.2, 2.2]].map(([x, z], idx) => (
        <mesh key={idx} position={[x, 1.5, z]}>
          <cylinderGeometry args={[0.15, 0.2, 2.4, 16]} />
          <meshStandardMaterial color="#f59e0b" emissive="#78350f" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      <mesh position={[0, 0.6, -0.4]}>
        <boxGeometry args={[3.2, 0.75, 0.9]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[0, 0.4, 0.4]}>
        <cylinderGeometry args={[0.45, 0.5, 0.4, 16]} />
        <meshStandardMaterial color="#d97706" emissive="#78350f" metalness={0.8} />
      </mesh>

      <Float speed={3} floatIntensity={0.5}>
        <mesh position={[0, 0.7, 0.4]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" wireframe />
        </mesh>
      </Float>

      {/* Left Chair + Seated HOD Man Avatar */}
      <OfficeChair3D position={[-0.9, 0, 0.4]} color="#d97706" rotation={[0, Math.PI, 0]} />
      <SeatedManAvatar3D position={[-0.9, 0, 0.4]} />

      {/* Right Chair + Seated Faculty Coordinator Woman Avatar */}
      <OfficeChair3D position={[0.9, 0, 0.4]} color="#be185d" rotation={[0, Math.PI, 0]} />
      <SeatedWomanAvatar3D position={[0.9, 0, 0.4]} />

      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[0, 2.2, -0.4]}>
          <octahedronGeometry args={[0.7]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            emissive="#d97706"
            wireframe={!isHovered}
            roughness={0.1} 
            metalness={0.9} 
          />
        </mesh>
      </Float>

      {/* Floating 3D Golden Crest Label (Positioned clearly in center view) */}
      <Html position={[0, 2.7, 0]} center distanceFactor={16}>
        <div 
          onClick={(e) => { e.stopPropagation(); onSelect('faculty'); }}
          className={`px-4 py-2 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
            isHovered 
              ? 'border-amber-300 bg-amber-500/30 shadow-[0_0_30px_rgba(251,191,36,0.9)] scale-110' 
              : 'border-amber-400/70 bg-slate-950/85 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
          }`}
        >
          <span className="font-orbitron font-black text-sm text-white text-glow-amber">
            FACULTY DIRECTORATE DESK
          </span>
          <button className="mt-1.5 px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-orbitron font-bold text-[9px] uppercase tracking-wider shadow-md hover:bg-amber-400 cursor-pointer">
            VIEW FACULTY TEAM
          </button>
        </div>
      </Html>
    </group>
  );
}

// 2. Executive Command Desk (Left Wing)
function ExecutiveRoom3D({ onSelect, hoveredZone, setHoveredZone }) {
  const isHovered = hoveredZone === 'executive';
  
  return (
    <group 
      position={[-8.5, 0, 1.0]}
      onClick={(e) => { e.stopPropagation(); onSelect('executive'); }}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredZone('executive'); }}
      onPointerOut={() => setHoveredZone(null)}
    >
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[4.5, 0.2, 3.5]} />
        <meshStandardMaterial color={isHovered ? "#00f0ff" : "#0284c7"} emissive="#0369a1" roughness={0.3} />
      </mesh>

      <mesh position={[0, 0.6, -0.5]}>
        <boxGeometry args={[3.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>

      {/* Chairs + Seated Person Avatars */}
      {[-1.2, 0, 1.2].map((x, idx) => (
        <group key={idx}>
          <OfficeChair3D position={[x, 0, 0.3]} color="#0284c7" rotation={[0, Math.PI, 0]} />
          <SeatedPersonAvatar3D position={[x, 0, 0.3]} shirtColor="#0284c7" hairColor="#0f172a" />
        </group>
      ))}

      {[-1.2, 0, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 1.4, -0.6]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[1.0, 0.6]} />
          <meshBasicMaterial color={isHovered ? "#00f0ff" : "#38bdf8"} side={THREE.DoubleSide} />
        </mesh>
      ))}

      <Html position={[0, 2.6, 0]} center distanceFactor={16}>
        <div 
          onClick={(e) => { e.stopPropagation(); onSelect('executive'); }}
          className={`px-3.5 py-1.5 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
            isHovered ? 'border-cyan-300 bg-cyan-500/30 scale-110 shadow-[0_0_25px_rgba(0,240,255,0.9)]' : 'border-cyan-400/50 bg-slate-950/85 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
          }`}
        >
          <span className="font-mono text-[8px] text-cyan-300 tracking-wider uppercase font-bold">MAIN PANEL ROOM</span>
          <span className="font-orbitron font-bold text-xs text-white">EXECUTIVE COMMAND</span>
          <button className="mt-1.5 px-2.5 py-0.5 rounded bg-cyan-500 text-slate-950 font-orbitron font-bold text-[8px] uppercase">
            VIEW TEAM
          </button>
        </div>
      </Html>
    </group>
  );
}

// 3. Core Operations Board Room (Right Wing)
function BoardRoom3D({ onSelect, hoveredZone, setHoveredZone }) {
  const isHovered = hoveredZone === 'board';

  return (
    <group 
      position={[8.5, 0, 1.0]}
      onClick={(e) => { e.stopPropagation(); onSelect('board'); }}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredZone('board'); }}
      onPointerOut={() => setHoveredZone(null)}
    >
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[4.5, 0.2, 3.5]} />
        <meshStandardMaterial color={isHovered ? "#c084fc" : "#7e22ce"} emissive="#581c87" roughness={0.3} />
      </mesh>

      <mesh position={[0, 0.6, -0.5]}>
        <boxGeometry args={[3.5, 0.8, 0.8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>

      {/* Chairs + Seated Person Avatars */}
      {[-1, 1].map((x, idx) => (
        <group key={idx}>
          <OfficeChair3D position={[x, 0, 0.3]} color="#7e22ce" rotation={[0, Math.PI, 0]} />
          <SeatedPersonAvatar3D position={[x, 0, 0.3]} shirtColor="#7e22ce" hairColor="#3b0764" />
        </group>
      ))}

      {[-1, 1].map((x, i) => (
        <mesh key={i} position={[x, 1.4, -0.6]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[1.2, 0.7]} />
          <meshBasicMaterial color={isHovered ? "#a855f7" : "#c084fc"} side={THREE.DoubleSide} />
        </mesh>
      ))}

      <Html position={[0, 2.6, 0]} center distanceFactor={16}>
        <div 
          onClick={(e) => { e.stopPropagation(); onSelect('board'); }}
          className={`px-3.5 py-1.5 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
            isHovered ? 'border-purple-300 bg-purple-500/30 scale-110 shadow-[0_0_25px_rgba(168,85,247,0.9)]' : 'border-purple-400/50 bg-slate-950/85 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
          }`}
        >
          <span className="font-mono text-[8px] text-purple-300 tracking-wider uppercase font-bold">OPERATIONS BOARD</span>
          <span className="font-orbitron font-bold text-xs text-white">SECRETARY & TREASURER</span>
          <button className="mt-1.5 px-2.5 py-0.5 rounded bg-purple-500 text-white font-orbitron font-bold text-[8px] uppercase">
            VIEW TEAM
          </button>
        </div>
      </Html>
    </group>
  );
}

// 4. Domain Workstations Grid
function DomainWorkstation3D({ id, title, color, position, onSelect, hoveredZone, setHoveredZone }) {
  const isHovered = hoveredZone === id;

  return (
    <group 
      position={position}
      onClick={(e) => { e.stopPropagation(); onSelect(id, 'view_team'); }}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredZone(id); }}
      onPointerOut={() => setHoveredZone(null)}
    >
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[2.0, 0.7, 1.2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.6} />
      </mesh>

      <OfficeChair3D position={[0, 0, 0.8]} color={color} rotation={[0, Math.PI, 0]} />
      <SeatedPersonAvatar3D position={[0, 0, 0.8]} shirtColor={color} />

      <mesh position={[0, 1.05, -0.3]}>
        <boxGeometry args={[1.1, 0.65, 0.08]} />
        <meshBasicMaterial color={isHovered ? "#ffffff" : color} />
      </mesh>

      <mesh position={[0, 0.75, -0.3]}>
        <cylinderGeometry args={[0.05, 0.08, 0.2]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>

      <Html position={[0, 1.8, 0]} center distanceFactor={16}>
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onSelect(id, 'view_team');
          }}
          className={`px-2.5 py-1.5 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
            isHovered ? 'scale-110 bg-cyan-500/30 border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.8)]' : 'bg-slate-950/85 border-cyan-500/30'
          }`}
        >
          <span className="font-orbitron font-bold text-[10px] text-white">{title}</span>
          <button className="mt-1 px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-orbitron font-bold text-[8px] uppercase hover:bg-cyan-300 transition-colors cursor-pointer">
            VIEW TEAM
          </button>
        </div>
      </Html>
    </group>
  );
}

// 5. Department Coordinators Terminal (Raised Platform BEHIND Faculty Directorate at position [0, 0.4, -7.5])
function DepartmentCoordinators3D({ position = [0, 0.4, -7.5], onSelect, hoveredZone, setHoveredZone }) {
  const isHovered = hoveredZone === 'coordinator';

  return (
    <group 
      position={position}
      onClick={(e) => { e.stopPropagation(); onSelect('coordinator'); }}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredZone('coordinator'); }}
      onPointerOut={() => setHoveredZone(null)}
    >
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[3.8, 4.2, 0.4, 32]} />
        <meshStandardMaterial color={isHovered ? "#34d399" : "#059669"} emissive="#047857" roughness={0.3} />
      </mesh>

      {/* 6 Chairs + 6 Seated Person Avatars */}
      {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((x, idx) => (
        <group key={idx}>
          <OfficeChair3D position={[x, 0, 0.5]} color="#059669" rotation={[0, Math.PI, 0]} />
          <SeatedPersonAvatar3D position={[x, 0, 0.5]} shirtColor="#059669" />
        </group>
      ))}

      {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((x, idx) => (
        <mesh key={idx} position={[x, 0.7, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.4]} />
          <meshBasicMaterial color={isHovered ? "#34d399" : "#10b981"} />
        </mesh>
      ))}

      {/* Elevated floating label clearly visible above Faculty Directorate desk */}
      <Html position={[0, 3.8, 0]} center distanceFactor={16}>
        <div 
          onClick={(e) => { e.stopPropagation(); onSelect('coordinator'); }}
          className={`px-4 py-2 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
            isHovered ? 'border-emerald-300 bg-emerald-500/30 scale-110 shadow-[0_0_25px_rgba(52,211,153,0.9)]' : 'border-emerald-400/60 bg-slate-950/85 shadow-[0_0_15px_rgba(52,211,153,0.4)]'
          }`}
        >
          <span className="font-orbitron font-bold text-xs text-white">DEPARTMENT COORDINATORS</span>
          <button className="mt-1.5 px-2.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-orbitron font-bold text-[8px] uppercase cursor-pointer">
            VIEW TEAM
          </button>
        </div>
      </Html>
    </group>
  );
}

export default function Office3DScene({ onSelectZone }) {
  const outerStickyRef = useRef(null);
  const orbitRef = useRef(null);
  const [hoveredZone, setHoveredZone] = useState(null);
  const [manualOpen, setManualOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Scroll progress relative to sticky section
  useEffect(() => {
    const handleScroll = () => {
      if (!outerStickyRef.current) return;
      const rect = outerStickyRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalDist = rect.height - windowHeight;
      if (totalDist <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalDist));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Wide semi-circular layout for all domain workstations so nothing is cut off in front view
  const domainDesks = [
    { id: 'unity_head', title: 'TEAM UNITY', color: '#00f0ff', position: [-10.5, 0, 6.5] },
    { id: 'technical_head', title: 'TECHNICAL TEAM', color: '#f43f5e', position: [-6.5, 0, 7.5] },
    { id: 'content_creativity_head', title: 'CONTENT & CREATIVITY TEAM', color: '#f59e0b', position: [0, 0, 8.0] },
    { id: 'doc_head', title: 'DOCUMENTATION TEAM', color: '#38bdf8', position: [6.5, 0, 7.5] },
    { id: 'media_head', title: 'MEDIA TEAM', color: '#e879f9', position: [10.5, 0, 6.5] },
    
    { id: 'design_head', title: 'DESIGN TEAM', color: '#a78bfa', position: [-10.5, 0, -3.5] },
    { id: 'logistic_head', title: 'LOGISTICS TEAM', color: '#2dd4bf', position: [-6.5, 0, -4.5] },
    { id: 'research_head', title: 'RESEARCH TEAM', color: '#06b6d4', position: [6.5, 0, -4.5] },
    { id: 'event_head', title: 'EVENT MANAGEMENT TEAM', color: '#eab308', position: [10.5, 0, -3.5] },
  ];

  // Open ratio (0 = closed door, 1 = open room)
  const openRatio = manualOpen ? 1.0 : Math.max(0, Math.min(1.0, scrollProgress * 1.8));
  const textOpacity = manualOpen ? 0 : Math.max(0, 1.0 - openRatio * 2.2);

  // Preset view buttons (Front View, Top View, Bottom View)
  const handleResetCamera = (viewType) => {
    if (!orbitRef.current) return;
    setIsUserInteracting(true);

    if (viewType === 'front') {
      orbitRef.current.object.position.set(0, 6.5, 23.5);
      orbitRef.current.target.set(0, 1.2, 0);
    } else if (viewType === 'top') {
      orbitRef.current.object.position.set(0, 24.0, 0.1);
      orbitRef.current.target.set(0, 0, 0);
    } else if (viewType === 'bottom') {
      orbitRef.current.object.position.set(0, 1.8, 14.0);
      orbitRef.current.target.set(0, 1.0, -2.0);
    }
    orbitRef.current.update();
  };

  return (
    <div ref={outerStickyRef} className="relative w-full h-[180vh] bg-[#020617]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* OVERLAPPED OVERLAY TEXT: "WELCOME TO ARVR LAB" ON CLOSED VAULT DOORS */}
        <div 
          onClick={() => setManualOpen(true)}
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center transition-all duration-700 select-none ${
            openRatio > 0.6 ? 'pointer-events-none opacity-0 scale-105' : 'cursor-pointer opacity-100 scale-100'
          }`}
          style={{ opacity: textOpacity }}
        >
          <div className="text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-cyan-500/40 bg-slate-950/80 mb-4 shadow-[0_0_25px_rgba(0,240,255,0.4)]">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono text-xs text-cyan-300 tracking-[0.25em] uppercase font-bold">
                SECURE AR/VR HQ VAULT ENTRANCE
              </span>
            </div>

            <h1 className="font-orbitron font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-300 drop-shadow-[0_0_40px_rgba(0,240,255,0.8)] tracking-tight leading-none mb-6">
              WELCOME TO ARVR LAB
            </h1>

            <div className="mt-4 px-6 py-3 rounded-2xl glass-panel border border-cyan-400/50 bg-slate-950/90 shadow-[0_0_30px_rgba(0,240,255,0.3)] animate-bounce flex items-center gap-3">
              <span className="font-mono text-xs sm:text-sm text-cyan-300 font-bold uppercase tracking-widest">
                Scroll down to open vault doors & enter room ↓
              </span>
            </div>
          </div>
        </div>

        {/* Top Control Bar with Preset Views (Front View, Top View, Bottom View) */}
        <div className="absolute top-6 left-6 right-6 z-30 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setManualOpen(!manualOpen)}
              className={`px-4 py-2 rounded-xl font-orbitron font-bold text-xs tracking-wider uppercase transition-all cursor-pointer shadow-lg ${
                openRatio > 0.4
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_25px_rgba(52,211,153,0.7)] hover:bg-emerald-400'
                  : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_25px_rgba(0,240,255,0.7)] animate-pulse'
              }`}
            >
              {openRatio > 0.4 ? '🚪 DOORS OPEN // INSIDE ROOM' : '🔒 CLICK OR SCROLL TO OPEN DOORS'}
            </button>
          </div>

          {/* Preset Camera View Mode Switcher (Visible when inside room) */}
          {openRatio > 0.4 && (
            <div className="flex items-center gap-2 p-1 rounded-xl glass-panel border border-cyan-500/40 bg-slate-950/90 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              <button
                onClick={() => handleResetCamera('front')}
                className="px-3 py-1.5 rounded-lg font-orbitron font-bold text-[10px] uppercase text-cyan-300 hover:text-white hover:bg-cyan-500/20 transition-all cursor-pointer"
              >
                🎥 FRONT VIEW
              </button>
              <button
                onClick={() => handleResetCamera('top')}
                className="px-3 py-1.5 rounded-lg font-orbitron font-bold text-[10px] uppercase text-purple-300 hover:text-white hover:bg-purple-500/20 transition-all cursor-pointer"
              >
                🛸 TOP VIEW
              </button>
              <button
                onClick={() => handleResetCamera('bottom')}
                className="px-3 py-1.5 rounded-lg font-orbitron font-bold text-[10px] uppercase text-amber-300 hover:text-white hover:bg-amber-500/20 transition-all cursor-pointer"
              >
                👁️ LOW VIEW
              </button>
            </div>
          )}
        </div>

        <Canvas camera={{ position: [0, 2.2, 26], fov: 48 }}>
          <color attach="background" args={['#020617']} />
          <fog attach="fog" args={['#020617', 15, 60]} />

          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 25, 15]} intensity={2.2} color="#00f0ff" />
          <pointLight position={[-15, 12, -10]} intensity={1.8} color="#a855f7" />
          <pointLight position={[15, 12, -10]} intensity={1.8} color="#00f0ff" />
          <pointLight position={[0, 10, 0]} intensity={2.8} color="#fbbf24" />

          <OrbitControls 
            ref={orbitRef}
            enableDamping 
            dampingFactor={0.05} 
            minDistance={4} 
            maxDistance={40}
            maxPolarAngle={Math.PI / 2 - 0.02}
            onStart={() => setIsUserInteracting(true)}
          />

          {/* Entrance Camera Rig */}
          <FrontViewCameraRig openRatio={openRatio} isUserInteracting={isUserInteracting} />

          {/* Floor Grid */}
          <gridHelper args={[45, 45, '#00f0ff', '#1e293b']} position={[0, 0, 0]} />

          {/* Massive Cyber Vault Entrance Doors */}
          <GrandEntranceDoors3D openRatio={openRatio} />

          {/* Sub-Floor Solar System Cosmic Structure */}
          <SubFloorSolarSystem3D position={[0, -5.5, 0]} />

          {/* Inside Room Workstations */}
          <group visible={openRatio > 0.05}>
            {/* 1. Center Faculty Directorate Desk */}
            <FacultyPavilion3D 
              onSelect={onSelectZone} 
              hoveredZone={hoveredZone} 
              setHoveredZone={setHoveredZone} 
            />

            {/* 2. Executive Command Room */}
            <ExecutiveRoom3D 
              onSelect={onSelectZone} 
              hoveredZone={hoveredZone} 
              setHoveredZone={setHoveredZone} 
            />

            {/* 3. Core Operations Board Room */}
            <BoardRoom3D 
              onSelect={onSelectZone} 
              hoveredZone={hoveredZone} 
              setHoveredZone={setHoveredZone} 
            />

            {/* 4. Domain Workstation Desks with Seated Avatars */}
            {domainDesks.map((desk) => (
              <DomainWorkstation3D
                key={desk.id}
                id={desk.id}
                title={desk.title}
                color={desk.color}
                position={desk.position}
                onSelect={onSelectZone}
                hoveredZone={hoveredZone}
                setHoveredZone={setHoveredZone}
              />
            ))}

            {/* 5. Department Coordinators Terminal (Raised Platform BEHIND Faculty Directorate Desk at position [0, 0.4, -7.5]) */}
            <DepartmentCoordinators3D 
              position={[0, 0.4, -7.5]}
              onSelect={onSelectZone} 
              hoveredZone={hoveredZone} 
              setHoveredZone={setHoveredZone} 
            />
          </group>
        </Canvas>
      </div>
    </div>
  );
}
