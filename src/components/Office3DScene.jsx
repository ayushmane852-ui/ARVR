import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

// 3D Sub-Floor Solar System & Cosmic Galaxy Component
function SubFloorSolarSystem3D({ position = [0, -5, 0] }) {
  const solarGroupRef = useRef();
  const sunCoreRef = useRef();

  // Individual planet refs for circular revolving orbits
  const p1Ref = useRef(); // Inner Cyan Planet
  const p2Ref = useRef(); // Golden Core Planet
  const p3Ref = useRef(); // Saturn Gas Giant with 3D Rings
  const p4Ref = useRef(); // Magenta Hologram Planet
  const p5Ref = useRef(); // Outer Deep Violet Planet

  const angles = useRef({ p1: 0, p2: 1.2, p3: 2.8, p4: 4.2, p5: 5.5 });

  // 2,500 Cosmic Particle Starfield points
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
      const phi = (Math.random() - 0.5) * 0.4; // Disk height spread

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

    // Orbital velocities for revolving planets
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
      
      {/* 1. Central Galactic Core Sun */}
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

      {/* 2. Sub-Floor Starfield Particles */}
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

      {/* 3. Glowing Orbital Path Rings */}
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

      {/* 4. Revolving Planets */}
      {/* Planet 1: Inner Cyan Planet */}
      <group ref={p1Ref}>
        <mesh>
          <sphereGeometry args={[0.4, 24, 24]} />
          <meshStandardMaterial color="#00f0ff" emissive="#0284c7" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>

      {/* Planet 2: Golden Core Planet */}
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

      {/* Planet 3: Saturn Gas Giant with 3D Rings */}
      <group ref={p3Ref}>
        <mesh>
          <sphereGeometry args={[0.85, 32, 32]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" roughness={0.4} />
        </mesh>
        {/* Saturn Ring System */}
        <mesh rotation={[Math.PI / 3, 0.2, 0]}>
          <ringGeometry args={[1.2, 1.7, 32]} />
          <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Planet 4: Magenta Hologram Planet */}
      <group ref={p4Ref}>
        <mesh>
          <sphereGeometry args={[0.7, 24, 24]} />
          <meshStandardMaterial color="#e879f9" emissive="#c084fc" roughness={0.3} />
        </mesh>
      </group>

      {/* Planet 5: Outer Deep Violet Planet */}
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
      {/* Chair Base & Wheel Stem */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.3, 12]} />
        <meshStandardMaterial color="#475569" metalness={0.8} />
      </mesh>
      {/* Star Base Legs */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 5]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} />
      </mesh>
      {/* Seat Cushion */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.5]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.7, 0.22]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.48, 0.65, 0.06]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      {/* Left Armrest */}
      <mesh position={[-0.26, 0.5, 0]}>
        <boxGeometry args={[0.05, 0.25, 0.35]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      {/* Right Armrest */}
      <mesh position={[0.26, 0.5, 0]}>
        <boxGeometry args={[0.05, 0.25, 0.35]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </group>
  );
}

// 3D Seated Man Avatar Structure (Dr. Lingaraj Hadimani - HOD CSE)
function SeatedManAvatar3D({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Torso / Executive Suit */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.42, 0.5, 0.25]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.3} />
      </mesh>
      {/* Tie Accent */}
      <mesh position={[0, 0.7, -0.13]}>
        <boxGeometry args={[0.08, 0.3, 0.02]} />
        <meshStandardMaterial color="#d97706" emissive="#b45309" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.16, 20, 20]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.5} />
      </mesh>
      {/* Executive Hair Structure */}
      <mesh position={[0, 1.15, 0.02]}>
        <sphereGeometry args={[0.165, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
        <meshStandardMaterial color="#1f2937" roughness={0.8} />
      </mesh>
      {/* Glasses Frame */}
      <mesh position={[0, 1.05, -0.16]}>
        <boxGeometry args={[0.24, 0.06, 0.02]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} />
      </mesh>
      {/* Seated Legs */}
      <mesh position={[-0.12, 0.38, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.07, 0.35, 12]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0.12, 0.38, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.07, 0.35, 12]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      {/* Lower Legs */}
      <mesh position={[-0.12, 0.18, -0.3]}>
        <cylinderGeometry args={[0.07, 0.06, 0.35, 12]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0.12, 0.18, -0.3]}>
        <cylinderGeometry args={[0.07, 0.06, 0.35, 12]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      {/* Arms Resting on Desk */}
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
      {/* Torso / Elegant Professional Attire */}
      <mesh position={[0, 0.63, 0]}>
        <boxGeometry args={[0.38, 0.48, 0.22]} />
        <meshStandardMaterial color="#be185d" roughness={0.3} />
      </mesh>
      {/* Neck Accent */}
      <mesh position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.06, 0.07, 0.1, 12]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.03, 0]}>
        <sphereGeometry args={[0.15, 20, 20]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.5} />
      </mesh>
      {/* Hair Structure (Longer styled hair) */}
      <mesh position={[0, 1.05, 0.04]}>
        <sphereGeometry args={[0.17, 16, 16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.9, 0.12]}>
        <boxGeometry args={[0.28, 0.35, 0.12]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
      {/* Seated Legs */}
      <mesh position={[-0.1, 0.38, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.06, 0.35, 12]} />
        <meshStandardMaterial color="#881337" />
      </mesh>
      <mesh position={[0.1, 0.38, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.06, 0.35, 12]} />
        <meshStandardMaterial color="#881337" />
      </mesh>
      {/* Lower Legs */}
      <mesh position={[-0.1, 0.18, -0.3]}>
        <cylinderGeometry args={[0.06, 0.05, 0.35, 12]} />
        <meshStandardMaterial color="#881337" />
      </mesh>
      <mesh position={[0.1, 0.18, -0.3]}>
        <cylinderGeometry args={[0.06, 0.05, 0.35, 12]} />
        <meshStandardMaterial color="#881337" />
      </mesh>
      {/* Arms Resting on Desk */}
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
      {/* Octagonal Golden Floor Platform */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[3.2, 3.6, 0.3, 8]} />
        <meshStandardMaterial 
          color={isHovered ? "#ffea00" : "#d97706"} 
          emissive={isHovered ? "#d97706" : "#b45309"}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Golden Glowing Ring */}
      <mesh ref={ringRef} position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.7, 3.9, 32]} />
        <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} transparent opacity={isHovered ? 0.9 : 0.6} />
      </mesh>

      {/* 4 Corner Golden Pillars */}
      {[[-2.2, -2.2], [2.2, -2.2], [-2.2, 2.2], [2.2, 2.2]].map(([x, z], idx) => (
        <mesh key={idx} position={[x, 1.5, z]}>
          <cylinderGeometry args={[0.15, 0.2, 2.4, 16]} />
          <meshStandardMaterial color="#f59e0b" emissive="#78350f" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Main Executive Faculty Desk */}
      <mesh position={[0, 0.6, -0.4]}>
        <boxGeometry args={[3.2, 0.75, 0.9]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Small Center Coffee/Display Table between chairs */}
      <mesh position={[0, 0.4, 0.4]}>
        <cylinderGeometry args={[0.45, 0.5, 0.4, 16]} />
        <meshStandardMaterial color="#d97706" emissive="#78350f" metalness={0.8} />
      </mesh>

      {/* Center Table Hologram Orb */}
      <Float speed={3} floatIntensity={0.5}>
        <mesh position={[0, 0.7, 0.4]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" wireframe />
        </mesh>
      </Float>

      {/* Left Chair + Seated HOD Man Avatar (Dr. Lingaraj Hadimani - HOD CSE) */}
      <OfficeChair3D position={[-0.9, 0, 0.4]} color="#d97706" rotation={[0, Math.PI, 0]} />
      <SeatedManAvatar3D position={[-0.9, 0, 0.4]} />

      {/* Right Chair + Seated Faculty Coordinator Woman Avatar (Anuradha Solanki) */}
      <OfficeChair3D position={[0.9, 0, 0.4]} color="#be185d" rotation={[0, Math.PI, 0]} />
      <SeatedWomanAvatar3D position={[0.9, 0, 0.4]} />

      {/* Floating 3D Golden Crest Core */}
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

      {/* Floating 3D Holographic Label */}
      <Html position={[0, 3.4, 0]} center distanceFactor={15}>
        <div className={`px-4 py-2 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
          isHovered 
            ? 'border-amber-300 bg-amber-500/30 shadow-[0_0_30px_rgba(251,191,36,0.8)] scale-110' 
            : 'border-amber-400/60 bg-slate-950/80 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
        }`}>
          <span className="font-mono text-[9px] text-amber-300 font-bold tracking-widest uppercase block">
            FACULTY DIRECTORATE DESK
          </span>
          <span className="font-orbitron font-black text-sm text-white text-glow-amber">
            HOD & FACULTY DIRECTORATE
          </span>
          <span className="font-mono text-[10px] text-amber-200 mt-0.5 font-semibold">
            Dr. Lingaraj Hadimani (HOD CSE) & Anuradha Solanki
          </span>
          <button className="mt-2 px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-orbitron font-bold text-[9px] uppercase tracking-wider shadow-md hover:bg-amber-400">
            VIEW FACULTY TEAM
          </button>
        </div>
      </Html>
    </group>
  );
}

// 2. 3D Main Panel / Executive Command Room
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

      {/* Chairs behind Executive Console */}
      {[-1.2, 0, 1.2].map((x, idx) => (
        <OfficeChair3D key={idx} position={[x, 0, 0.3]} color="#0284c7" rotation={[0, Math.PI, 0]} />
      ))}

      {[-1.2, 0, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 1.4, -0.6]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[1.0, 0.6]} />
          <meshBasicMaterial color={isHovered ? "#00f0ff" : "#38bdf8"} side={THREE.DoubleSide} />
        </mesh>
      ))}

      <Html position={[0, 2.6, 0]} center distanceFactor={15}>
        <div className={`px-3 py-1.5 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
          isHovered ? 'border-cyan-300 bg-cyan-500/30 scale-110 shadow-[0_0_25px_rgba(0,240,255,0.8)]' : 'border-cyan-400/50 bg-slate-950/80 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
        }`}>
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

// 3. 3D Core Operations Board Console
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

      {/* Chairs behind Operations Console */}
      {[-1, 1].map((x, idx) => (
        <OfficeChair3D key={idx} position={[x, 0, 0.3]} color="#7e22ce" rotation={[0, Math.PI, 0]} />
      ))}

      {[-1, 1].map((x, i) => (
        <mesh key={i} position={[x, 1.4, -0.6]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[1.2, 0.7]} />
          <meshBasicMaterial color={isHovered ? "#a855f7" : "#c084fc"} side={THREE.DoubleSide} />
        </mesh>
      ))}

      <Html position={[0, 2.6, 0]} center distanceFactor={15}>
        <div className={`px-3 py-1.5 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
          isHovered ? 'border-purple-300 bg-purple-500/30 scale-110 shadow-[0_0_25px_rgba(168,85,247,0.8)]' : 'border-purple-400/50 bg-slate-950/80 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
        }`}>
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

// 4. 3D Domain Workstations Grid
function DomainWorkstation3D({ id, title, color, position, onSelect, hoveredZone, setHoveredZone }) {
  const isHovered = hoveredZone === id;

  return (
    <group 
      position={position}
      onClick={(e) => { e.stopPropagation(); onSelect(id); }}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredZone(id); }}
      onPointerOut={() => setHoveredZone(null)}
    >
      {/* Desk Base */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[2.0, 0.7, 1.2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.6} />
      </mesh>

      {/* Office Chair behind Desk */}
      <OfficeChair3D position={[0, 0, 0.8]} color={color} rotation={[0, Math.PI, 0]} />

      {/* Glowing Desktop Monitor */}
      <mesh position={[0, 1.05, -0.3]}>
        <boxGeometry args={[1.1, 0.65, 0.08]} />
        <meshBasicMaterial color={isHovered ? "#ffffff" : color} />
      </mesh>

      {/* Monitor Stand */}
      <mesh position={[0, 0.75, -0.3]}>
        <cylinderGeometry args={[0.05, 0.08, 0.2]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>

      {/* Floating Label with VIEW TEAM button */}
      <Html position={[0, 1.8, 0]} center distanceFactor={15}>
        <div className={`px-2.5 py-1.5 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
          isHovered ? 'scale-110 bg-cyan-500/30 border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.7)]' : 'bg-slate-950/85 border-cyan-500/30'
        }`}>
          <span className="font-orbitron font-bold text-[10px] text-white">{title}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSelect(id, 'view_team');
            }}
            className="mt-1 px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-orbitron font-bold text-[8px] uppercase hover:bg-cyan-300 transition-colors"
          >
            VIEW TEAM
          </button>
        </div>
      </Html>
    </group>
  );
}

// 5. 3D Department Coordinators Terminal
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

      {/* 6 Chairs behind Coordinator Displays */}
      {[-2, -1.2, -0.4, 0.4, 1.2, 2].map((x, idx) => (
        <OfficeChair3D key={idx} position={[x, 0, 0.5]} color="#059669" rotation={[0, Math.PI, 0]} />
      ))}

      {[-2, -1.2, -0.4, 0.4, 1.2, 2].map((x, idx) => (
        <mesh key={idx} position={[x, 0.7, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.4]} />
          <meshBasicMaterial color={isHovered ? "#34d399" : "#10b981"} />
        </mesh>
      ))}

      <Html position={[0, 2.2, 0]} center distanceFactor={15}>
        <div className={`px-3 py-1.5 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
          isHovered ? 'border-emerald-300 bg-emerald-500/30 scale-110 shadow-[0_0_25px_rgba(52,211,153,0.8)]' : 'border-emerald-400/50 bg-slate-950/80 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
        }`}>
          <span className="font-mono text-[8px] text-emerald-300 tracking-wider uppercase font-bold">LIAISON TERMINAL</span>
          <span className="font-orbitron font-bold text-xs text-white">DEPARTMENT COORDINATORS</span>
          <button className="mt-1.5 px-2.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-orbitron font-bold text-[8px] uppercase">
            VIEW TEAM
          </button>
        </div>
      </Html>
    </group>
  );
}

export default function Office3DScene({ onSelectZone }) {
  const [hoveredZone, setHoveredZone] = useState(null);

  // Exact previous domain section titles requested by user
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
      
      {/* 3D Controls Overlay Helper */}
      <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-cyan-300/80 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-cyan-500/30 pointer-events-none">
        <span>3D VIRTUAL OFFICE LAB // LEFT CLICK ROTATE • SCROLL ZOOM • CLICK DESKS TO VIEW TEAMS</span>
      </div>

      <Canvas camera={{ position: [0, 14, 18], fov: 50 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 15, 45]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, 10, -10]} intensity={1.2} color="#a855f7" />
        <pointLight position={[0, 8, 0]} intensity={2.0} color="#fbbf24" />

        <OrbitControls 
          enableDamping 
          dampingFactor={0.05} 
          minDistance={6} 
          maxDistance={28}
          maxPolarAngle={Math.PI / 2 - 0.05}
        />

        {/* Semi-transparent Reflective Cyber Floor Grid */}
        <gridHelper args={[40, 40, '#00f0ff', '#1e293b']} position={[0, 0, 0]} />

        {/* Sub-Floor Solar System Cosmic Structure (Revolving under office floor) */}
        <SubFloorSolarSystem3D position={[0, -4.5, 0]} />

        {/* 1. Center Faculty Directorate Pavilion (2 Chairs, Small Center Table, Seated HOD Man & Faculty Coordinator Woman) */}
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
