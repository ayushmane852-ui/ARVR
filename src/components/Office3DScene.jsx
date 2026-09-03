import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

// 3D Sub-Floor Solar System & Cosmic Galaxy Component
function SubFloorSolarSystem3D({ position = [0, -5, 0] }) {
  const solarGroupRef = useRef();
  const sunCoreRef = useRef();

  const p1Ref = useRef();
  const p2Ref = useRef();
  const p3Ref = useRef();
  const p4Ref = useRef();
  const p5Ref = useRef();

  const angles = useRef({ p1: 0, p2: 1.2, p3: 2.8, p4: 4.2, p5: 5.5 });

  const [starPositions, starColors] = useMemo(() => {
    const count = 2500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cCyan = new THREE.Color("#00f0ff");
    const cViolet = new THREE.Color("#a855f7");
    const cGold = new THREE.Color("#fbbf24");

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 0.4;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = phi * 2;
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      const rand = Math.random();
      let starColor = cCyan;
      if (rand < 0.4) starColor = cViolet;
      else if (rand < 0.7) starColor = cGold;

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
          <sphereGeometry args={[1.6, 32, 32]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
        <mesh>
          <sphereGeometry args={[2.0, 32, 32]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[2.4, 1]} />
          <meshBasicMaterial color="#d97706" wireframe transparent opacity={0.4} />
        </mesh>
      </group>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[starColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {[4.0, 6.5, 9.0, 11.5, 14.0].map((radius, idx) => (
        <mesh key={idx} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.04, radius + 0.04, 64]} />
          <meshBasicMaterial 
            color={idx % 2 === 0 ? "#00f0ff" : "#a855f7"} 
            side={THREE.DoubleSide} 
            transparent 
            opacity={0.3} 
          />
        </mesh>
      ))}

      <group ref={p1Ref}>
        <mesh>
          <sphereGeometry args={[0.4, 24, 24]} />
          <meshStandardMaterial color="#00f0ff" emissive="#0284c7" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>

      <group ref={p2Ref}>
        <mesh>
          <sphereGeometry args={[0.6, 24, 24]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d97706" roughness={0.3} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.5} />
        </mesh>
      </group>

      <group ref={p3Ref}>
        <mesh>
          <sphereGeometry args={[0.85, 32, 32]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" roughness={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0.2, 0]}>
          <ringGeometry args={[1.2, 1.7, 32]} />
          <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.7} />
        </mesh>
      </group>

      <group ref={p4Ref}>
        <mesh>
          <sphereGeometry args={[0.7, 24, 24]} />
          <meshStandardMaterial color="#e879f9" emissive="#c084fc" roughness={0.3} />
        </mesh>
      </group>

      <group ref={p5Ref}>
        <mesh>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshStandardMaterial color="#a855f7" emissive="#7e22ce" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <ringGeometry args={[1.2, 1.5, 32]} />
          <meshBasicMaterial color="#c084fc" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

// Helper component for 3D Chair
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

// Reusable 3D Seated Person Avatar Component (Added for EVERY chair in room)
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
      {/* Torso */}
      <mesh position={[0, 0.62, 0]}>
        <boxGeometry args={[0.38, 0.46, 0.22]} />
        <meshStandardMaterial color={shirtColor} roughness={0.4} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.0, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.5} />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 1.06, 0.02]}>
        <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
        <meshStandardMaterial color={hairColor} roughness={0.8} />
      </mesh>
      {/* Seated Thighs */}
      <mesh position={[-0.1, 0.38, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.06, 0.32, 12]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
      <mesh position={[0.1, 0.38, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.06, 0.32, 12]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
      {/* Lower Legs */}
      <mesh position={[-0.1, 0.18, -0.28]}>
        <cylinderGeometry args={[0.06, 0.05, 0.32, 12]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
      <mesh position={[0.1, 0.18, -0.28]}>
        <cylinderGeometry args={[0.06, 0.05, 0.32, 12]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
      {/* Arms resting on desk */}
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

// 3D Cyber Entrance Vault Doors Component (Opens on scroll / enter)
function CyberEntranceDoors3D({ isOpen }) {
  const leftDoorRef = useRef();
  const rightDoorRef = useRef();

  useFrame((_, delta) => {
    // Smooth sliding door animation
    const targetLeft = isOpen ? -3.8 : -1.05;
    const targetRight = isOpen ? 3.8 : 1.05;

    if (leftDoorRef.current) {
      leftDoorRef.current.position.x = THREE.MathUtils.lerp(leftDoorRef.current.position.x, targetLeft, delta * 4);
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.position.x = THREE.MathUtils.lerp(rightDoorRef.current.position.x, targetRight, delta * 4);
    }
  });

  return (
    <group position={[0, 0, 14.5]}>
      {/* Outer Doorway Frame Arch */}
      <mesh position={[-2.2, 1.8, 0]}>
        <boxGeometry args={[0.4, 3.6, 0.4]} />
        <meshStandardMaterial color="#00f0ff" emissive="#0284c7" metalness={0.9} />
      </mesh>
      <mesh position={[2.2, 1.8, 0]}>
        <boxGeometry args={[0.4, 3.6, 0.4]} />
        <meshStandardMaterial color="#00f0ff" emissive="#0284c7" metalness={0.9} />
      </mesh>
      <mesh position={[0, 3.7, 0]}>
        <boxGeometry args={[4.8, 0.4, 0.4]} />
        <meshStandardMaterial color="#00f0ff" emissive="#0284c7" metalness={0.9} />
      </mesh>

      {/* Top Holographic Sign Header */}
      <Html position={[0, 4.4, 0]} center distanceFactor={15}>
        <div className="px-4 py-1 rounded-xl bg-slate-950/90 border border-cyan-400 text-cyan-300 font-orbitron font-black text-[10px] tracking-widest uppercase shadow-[0_0_20px_rgba(0,240,255,0.6)]">
          {isOpen ? '🚪 ARVR OFFICE LAB // ACCESS GRANTED' : '🔒 ARVR OFFICE LAB // ENTERING ROOM'}
        </div>
      </Html>

      {/* Sliding Left Vault Door */}
      <group ref={leftDoorRef} position={[-1.05, 1.8, 0]}>
        <mesh>
          <boxGeometry args={[2.0, 3.4, 0.15]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.09]}>
          <boxGeometry args={[1.6, 2.8, 0.02]} />
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.4} />
        </mesh>
        <mesh position={[0.8, 0, 0.1]}>
          <cylinderGeometry args={[0.04, 0.04, 0.8]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} />
        </mesh>
      </group>

      {/* Sliding Right Vault Door */}
      <group ref={rightDoorRef} position={[1.05, 1.8, 0]}>
        <mesh>
          <boxGeometry args={[2.0, 3.4, 0.15]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.09]}>
          <boxGeometry args={[1.6, 2.8, 0.02]} />
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.4} />
        </mesh>
        <mesh position={[-0.8, 0, 0.1]}>
          <cylinderGeometry args={[0.04, 0.04, 0.8]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// 1. 3D HOD & Faculty Pavilion (Center of Office Floor)
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
      position={[0, 0, 0]}
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

      {/* Floating 3D Golden Crest Label (Faculty name removed as requested) */}
      <Html position={[0, 3.2, 0]} center distanceFactor={15}>
        <div 
          onClick={(e) => { e.stopPropagation(); onSelect('faculty'); }}
          className={`px-4 py-2 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
            isHovered 
              ? 'border-amber-300 bg-amber-500/30 shadow-[0_0_30px_rgba(251,191,36,0.8)] scale-110' 
              : 'border-amber-400/60 bg-slate-950/80 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
          }`}
        >
          <span className="font-orbitron font-black text-sm text-white text-glow-amber">
            FACULTY DIRECTORATE DESK
          </span>
          <button className="mt-2 px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-orbitron font-bold text-[9px] uppercase tracking-wider shadow-md hover:bg-amber-400 cursor-pointer">
            VIEW FACULTY TEAM
          </button>
        </div>
      </Html>
    </group>
  );
}

// 2. 3D Main Panel / Executive Command Room (With seated avatars on chairs)
function ExecutiveRoom3D({ onSelect, hoveredZone, setHoveredZone }) {
  const isHovered = hoveredZone === 'executive';
  
  return (
    <group 
      position={[-8, 0, -4]}
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

      {/* Chairs + Seated Person Avatars behind Executive Console */}
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

      <Html position={[0, 2.6, 0]} center distanceFactor={15}>
        <div 
          onClick={(e) => { e.stopPropagation(); onSelect('executive'); }}
          className={`px-3 py-1.5 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
            isHovered ? 'border-cyan-300 bg-cyan-500/30 scale-110 shadow-[0_0_25px_rgba(0,240,255,0.8)]' : 'border-cyan-400/50 bg-slate-950/80 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
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

// 3. 3D Core Operations Board Console (With seated avatars on chairs)
function BoardRoom3D({ onSelect, hoveredZone, setHoveredZone }) {
  const isHovered = hoveredZone === 'board';

  return (
    <group 
      position={[8, 0, -4]}
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

      {/* Chairs + Seated Person Avatars behind Operations Console */}
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

      <Html position={[0, 2.6, 0]} center distanceFactor={15}>
        <div 
          onClick={(e) => { e.stopPropagation(); onSelect('board'); }}
          className={`px-3 py-1.5 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
            isHovered ? 'border-purple-300 bg-purple-500/30 scale-110 shadow-[0_0_25px_rgba(168,85,247,0.8)]' : 'border-purple-400/50 bg-slate-950/80 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
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

// 4. 3D Domain Workstations Grid (With seated avatars on chairs)
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

      {/* Office Chair + Seated Person Avatar behind Desk */}
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

      <Html position={[0, 1.8, 0]} center distanceFactor={15}>
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onSelect(id, 'view_team');
          }}
          className={`px-2.5 py-1.5 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
            isHovered ? 'scale-110 bg-cyan-500/30 border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.7)]' : 'bg-slate-950/85 border-cyan-500/30'
          }`}
        >
          <span className="font-orbitron font-bold text-[10px] text-white">{title}</span>
          <button 
            className="mt-1 px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-orbitron font-bold text-[8px] uppercase hover:bg-cyan-300 transition-colors cursor-pointer"
          >
            VIEW TEAM
          </button>
        </div>
      </Html>
    </group>
  );
}

// 5. 3D Department Coordinators Terminal (With Liaison Terminal text removed & seated avatars on chairs)
function DepartmentCoordinators3D({ onSelect, hoveredZone, setHoveredZone }) {
  const isHovered = hoveredZone === 'coordinator';

  return (
    <group 
      position={[0, 0, 10]}
      onClick={(e) => { e.stopPropagation(); onSelect('coordinator'); }}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredZone('coordinator'); }}
      onPointerOut={() => setHoveredZone(null)}
    >
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[3.2, 3.6, 0.3, 32]} />
        <meshStandardMaterial color={isHovered ? "#34d399" : "#059669"} emissive="#047857" roughness={0.3} />
      </mesh>

      {/* 6 Chairs + 6 Seated Person Avatars behind Coordinator Displays */}
      {[-2, -1.2, -0.4, 0.4, 1.2, 2].map((x, idx) => (
        <group key={idx}>
          <OfficeChair3D position={[x, 0, 0.5]} color="#059669" rotation={[0, Math.PI, 0]} />
          <SeatedPersonAvatar3D position={[x, 0, 0.5]} shirtColor="#059669" />
        </group>
      ))}

      {[-2, -1.2, -0.4, 0.4, 1.2, 2].map((x, idx) => (
        <mesh key={idx} position={[x, 0.7, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.4]} />
          <meshBasicMaterial color={isHovered ? "#34d399" : "#10b981"} />
        </mesh>
      ))}

      {/* Departmental Coordinators Label (Liaison Terminal text removed) */}
      <Html position={[0, 2.2, 0]} center distanceFactor={15}>
        <div 
          onClick={(e) => { e.stopPropagation(); onSelect('coordinator'); }}
          className={`px-3 py-1.5 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
            isHovered ? 'border-emerald-300 bg-emerald-500/30 scale-110 shadow-[0_0_25px_rgba(52,211,153,0.8)]' : 'border-emerald-400/50 bg-slate-950/80 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
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
  const [hoveredZone, setHoveredZone] = useState(null);
  const [doorsOpen, setDoorsOpen] = useState(false);

  const domainDesks = [
    { id: 'unity_head', title: 'TEAM UNITY', color: '#00f0ff', position: [-9, 0, 2] },
    { id: 'technical_head', title: 'TECHNICAL TEAM', color: '#f43f5e', position: [-5, 0, 4] },
    { id: 'content_creativity_head', title: 'CONTENT & CREATIVITY TEAM', color: '#f59e0b', position: [0, 0, 5] },
    { id: 'doc_head', title: 'DOCUMENTATION TEAM', color: '#38bdf8', position: [5, 0, 4] },
    { id: 'media_head', title: 'MEDIA TEAM', color: '#e879f9', position: [9, 0, 2] },
    { id: 'design_head', title: 'DESIGN TEAM', color: '#a78bfa', position: [-9, 0, 7] },
    { id: 'logistic_head', title: 'LOGISTICS TEAM', color: '#2dd4bf', position: [-5, 0, 8] },
    { id: 'research_head', title: 'RESEARCH TEAM', color: '#06b6d4', position: [5, 0, 8] },
    { id: 'event_head', title: 'EVENT MANAGEMENT TEAM', color: '#eab308', position: [9, 0, 7] },
  ];

  return (
    <div className="w-full h-[580px] sm:h-[680px] relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.2)] bg-[#020617]">
      
      {/* 3D Controls & Door Entrance Toggle Overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setDoorsOpen(!doorsOpen)}
          className={`px-4 py-2 rounded-xl font-orbitron font-bold text-xs tracking-wider uppercase transition-all cursor-pointer shadow-lg ${
            doorsOpen
              ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.6)]'
              : 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.6)] animate-pulse'
          }`}
        >
          {doorsOpen ? '🚪 DOORS OPEN // INSIDE ROOM' : '🔒 CLICK TO OPEN DOORS & ENTER ROOM'}
        </button>

        <div className="font-mono text-[10px] text-cyan-300/80 bg-slate-950/80 px-3 py-2 rounded-xl border border-cyan-500/30 pointer-events-none hidden sm:block">
          <span>LEFT CLICK ROTATE • SCROLL ZOOM • CLICK DESKS TO VIEW ROSTERS</span>
        </div>
      </div>

      <Canvas camera={{ position: [0, 14, 19], fov: 50 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 15, 45]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, 10, -10]} intensity={1.2} color="#a855f7" />
        <pointLight position={[0, 8, 0]} intensity={2.0} color="#fbbf24" />

        <OrbitControls 
          enableDamping 
          dampingFactor={0.05} 
          minDistance={5} 
          maxDistance={28}
          maxPolarAngle={Math.PI / 2 - 0.05}
        />

        {/* Semi-transparent Reflective Cyber Floor Grid */}
        <gridHelper args={[40, 40, '#00f0ff', '#1e293b']} position={[0, 0, 0]} />

        {/* 3D Cyber Entrance Vault Doors (Opens on scroll/click) */}
        <CyberEntranceDoors3D isOpen={doorsOpen} />

        {/* Sub-Floor Solar System Cosmic Structure (Revolving under office floor) */}
        <SubFloorSolarSystem3D position={[0, -4.5, 0]} />

        {/* 1. Center Faculty Directorate Pavilion */}
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

        {/* 4. Domain Workstation Desks with Chairs */}
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

        {/* 5. Department Coordinators Terminal */}
        <DepartmentCoordinators3D 
          onSelect={onSelectZone} 
          hoveredZone={hoveredZone} 
          setHoveredZone={setHoveredZone} 
        />
      </Canvas>
    </div>
  );
}
