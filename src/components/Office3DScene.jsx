import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// Detect mobile viewport
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

// 3D Sub-Floor Solar System & Galaxy Component
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
      const radius = 3 + Math.random() * 25;
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
    if (solarGroupRef.current) solarGroupRef.current.rotation.y += delta * 0.05;
    if (sunCoreRef.current) sunCoreRef.current.rotation.y -= delta * 0.15;

    angles.current.p1 += delta * 0.5;
    angles.current.p2 += delta * 0.35;
    angles.current.p3 += delta * 0.22;
    angles.current.p4 += delta * 0.15;
    angles.current.p5 += delta * 0.09;

    if (p1Ref.current) {
      const r = 4.0;
      p1Ref.current.position.x = Math.cos(angles.current.p1) * r;
      p1Ref.current.position.z = Math.sin(angles.current.p1) * r;
    }
    if (p2Ref.current) {
      const r = 6.5;
      p2Ref.current.position.x = Math.cos(angles.current.p2) * r;
      p2Ref.current.position.z = Math.sin(angles.current.p2) * r;
    }
    if (p3Ref.current) {
      const r = 9.0;
      p3Ref.current.position.x = Math.cos(angles.current.p3) * r;
      p3Ref.current.position.z = Math.sin(angles.current.p3) * r;
    }
    if (p4Ref.current) {
      const r = 11.5;
      p4Ref.current.position.x = Math.cos(angles.current.p4) * r;
      p4Ref.current.position.z = Math.sin(angles.current.p4) * r;
    }
    if (p5Ref.current) {
      const r = 14.0;
      p5Ref.current.position.x = Math.cos(angles.current.p5) * r;
      p5Ref.current.position.z = Math.sin(angles.current.p5) * r;
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
      </group>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[starColors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.09} vertexColors transparent opacity={0.85} blending={THREE.AdditiveBlending} />
      </points>

      {[4.0, 6.5, 9.0, 11.5, 14.0].map((radius, idx) => (
        <mesh key={idx} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
          <meshBasicMaterial color={idx % 2 === 0 ? "#00f0ff" : "#a855f7"} side={THREE.DoubleSide} transparent opacity={0.4} />
        </mesh>
      ))}

      <group ref={p1Ref}>
        <mesh><sphereGeometry args={[0.45, 24, 24]} /><meshStandardMaterial color="#00f0ff" emissive="#0284c7" roughness={0.2} metalness={0.8} /></mesh>
      </group>
      <group ref={p2Ref}>
        <mesh><sphereGeometry args={[0.65, 24, 24]} /><meshStandardMaterial color="#fbbf24" emissive="#d97706" roughness={0.3} /></mesh>
      </group>
      <group ref={p3Ref}>
        <mesh><sphereGeometry args={[0.9, 32, 32]} /><meshStandardMaterial color="#38bdf8" emissive="#0284c7" roughness={0.4} /></mesh>
      </group>
      <group ref={p4Ref}>
        <mesh><sphereGeometry args={[0.75, 24, 24]} /><meshStandardMaterial color="#e879f9" emissive="#c084fc" roughness={0.3} /></mesh>
      </group>
      <group ref={p5Ref}>
        <mesh><sphereGeometry args={[0.95, 32, 32]} /><meshStandardMaterial color="#a855f7" emissive="#7e22ce" roughness={0.2} metalness={0.9} /></mesh>
      </group>
    </group>
  );
}

// Realistic Ergonomic Office Chair
function RealisticOfficeChair3D({ position, color = "#0284c7", rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <group key={i} rotation={[0, rad, 0]}>
            <mesh position={[0, 0.05, 0.22]}>
              <boxGeometry args={[0.04, 0.04, 0.28]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.03, 0.35]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color="#020617" />
            </mesh>
          </group>
        );
      })}

      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.35, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.1} />
      </mesh>

      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.52, 0.08, 0.52]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>

      <mesh position={[0, 0.76, 0.22]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[0.48, 0.68, 0.05]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>

      <mesh position={[0, 0.76, 0.2]}>
        <boxGeometry args={[0.42, 0.6, 0.02]} />
        <meshStandardMaterial color={color} transparent opacity={0.8} />
      </mesh>

      <group position={[-0.27, 0.54, 0]}>
        <boxGeometry args={[0.04, 0.22, 0.32]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </group>
      <group position={[0.27, 0.54, 0]}>
        <boxGeometry args={[0.04, 0.22, 0.32]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </group>
    </group>
  );
}

// Realistic 3D Human Avatar
function RealisticSeatedAvatar3D({ 
  position = [0, 0, 0], 
  rotation = [0, Math.PI, 0], 
  shirtColor = "#0284c7", 
  pantsColor = "#0f172a", 
  skinColor = "#ffdbac",
  hairColor = "#1e293b" 
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.4, 0.48, 0.24]} />
        <meshStandardMaterial color={shirtColor} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.92, 0]}>
        <cylinderGeometry args={[0.06, 0.07, 0.1, 12]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.15, 20, 20]} />
        <meshStandardMaterial color={skinColor} roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.1, 0.02]}>
        <sphereGeometry args={[0.158, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2.1]} />
        <meshStandardMaterial color={hairColor} roughness={0.8} />
      </mesh>
      <mesh position={[-0.11, 0.4, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.06, 0.35, 12]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
      <mesh position={[0.11, 0.4, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.06, 0.35, 12]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
      <mesh position={[-0.11, 0.18, -0.32]}>
        <cylinderGeometry args={[0.06, 0.05, 0.35, 12]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
      <mesh position={[0.11, 0.18, -0.32]}>
        <cylinderGeometry args={[0.06, 0.05, 0.35, 12]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
      <mesh position={[-0.23, 0.58, -0.16]} rotation={[0.5, 0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.04, 0.35, 12]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>
      <mesh position={[0.23, 0.58, -0.16]} rotation={[0.5, -0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.04, 0.35, 12]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>
    </group>
  );
}

// REALISTIC VERTICAL ARVR VAULT DOOR COMPONENT
function RealARVRVerticalVaultDoors3D({ openRatio }) {
  const leftDoorRef = useRef();
  const rightDoorRef = useRef();
  const emblemRef = useRef();

  useFrame((_, delta) => {
    const targetLeft = -3.2 - openRatio * 14.0;
    const targetRight = 3.2 + openRatio * 14.0;

    if (leftDoorRef.current) {
      leftDoorRef.current.position.x = THREE.MathUtils.lerp(leftDoorRef.current.position.x, targetLeft, delta * 6);
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.position.x = THREE.MathUtils.lerp(rightDoorRef.current.position.x, targetRight, delta * 6);
    }
    if (emblemRef.current) {
      emblemRef.current.rotation.z += delta * 0.8;
    }
  });

  if (openRatio >= 0.85) {
    return null;
  }

  return (
    <group position={[0, 0, 18]}>
      <mesh position={[0, 4.0, -0.5]}>
        <planeGeometry args={[45, 30]} />
        <meshBasicMaterial color="#020617" transparent opacity={Math.max(0, 1 - openRatio * 2.5)} />
      </mesh>

      <mesh position={[-6.8, 5.0, 0]}>
        <boxGeometry args={[1.6, 15.0, 1.6]} />
        <meshStandardMaterial color="#0b1329" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[6.8, 5.0, 0]}>
        <boxGeometry args={[1.6, 15.0, 1.6]} />
        <meshStandardMaterial color="#0b1329" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[-5.9, 5.0, 0.82]}>
        <boxGeometry args={[0.1, 14.8, 0.05]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[5.9, 5.0, 0.82]}>
        <boxGeometry args={[0.1, 14.8, 0.05]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      <group ref={leftDoorRef} position={[-3.2, 5.0, 0]}>
        <mesh>
          <boxGeometry args={[6.4, 14.8, 0.6]} />
          <meshStandardMaterial color="#091126" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0, 0.31]}>
          <boxGeometry args={[5.8, 14.2, 0.04]} />
          <meshStandardMaterial color="#111d38" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.34]}>
          <boxGeometry args={[5.2, 13.5, 0.02]} />
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.6} />
        </mesh>
        <mesh position={[2.8, 0, 0.38]}>
          <cylinderGeometry args={[0.16, 0.16, 4.5, 16]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d97706" metalness={0.95} />
        </mesh>
      </group>

      <group ref={rightDoorRef} position={[3.2, 5.0, 0]}>
        <mesh>
          <boxGeometry args={[6.4, 14.8, 0.6]} />
          <meshStandardMaterial color="#091126" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0, 0.31]}>
          <boxGeometry args={[5.8, 14.2, 0.04]} />
          <meshStandardMaterial color="#111d38" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.34]}>
          <boxGeometry args={[5.2, 13.5, 0.02]} />
          <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.6} />
        </mesh>
        <mesh position={[-2.8, 0, 0.38]}>
          <cylinderGeometry args={[0.16, 0.16, 4.5, 16]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d97706" metalness={0.95} />
        </mesh>
      </group>

      <group position={[0, 5.0, 0.45]} ref={emblemRef}>
        <mesh>
          <torusGeometry args={[1.4, 0.08, 16, 64]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[1.8, 0.05, 16, 64]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
      </group>
    </group>
  );
}

// Camera Rig Animation
function FrontViewCameraRig({ openRatio, isUserInteracting, isMobile }) {
  useFrame(({ camera }) => {
    if (openRatio < 0.95 && !isUserInteracting) {
      const targetZ = (isMobile ? 32.0 : 26.0) - openRatio * (isMobile ? 3.0 : 2.5);
      const targetY = 2.2 + openRatio * (isMobile ? 5.5 : 4.3);

      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06);
      camera.lookAt(0, 1.2, 0);
    }
  });

  return null;
}

// 1. FUTURISTIC GLASS CABIN OFFICE ROOM FOR FACULTY DIRECTORATE DESK (MATCHING USER IMAGE)
function GlassCabinFacultyOffice3D({ onSelect, hoveredZone, setHoveredZone, showLabels, isMobile }) {
  const isHovered = hoveredZone === 'faculty';

  return (
    <group 
      position={[0, 0, 1.5]}
      onClick={(e) => { e.stopPropagation(); onSelect('faculty'); }}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredZone('faculty'); }}
      onPointerOut={() => setHoveredZone(null)}
    >
      {/* Illuminated Purple Base Floor */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[5.2, 0.2, 4.2]} />
        <meshStandardMaterial 
          color={isHovered ? "#a855f7" : "#7e22ce"} 
          emissive={isHovered ? "#9333ea" : "#581c87"} 
          roughness={0.2} 
        />
      </mesh>

      {/* Dark Metallic Corner Pillars */}
      {[[-2.55, -2.05], [2.55, -2.05], [-2.55, 2.05], [2.55, 2.05]].map(([x, z], idx) => (
        <mesh key={idx} position={[x, 1.7, z]}>
          <boxGeometry args={[0.1, 3.2, 0.1]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Transparent Glass Walls */}
      {/* Back Glass Wall */}
      <mesh position={[0, 1.7, -2.05]}>
        <boxGeometry args={[5.0, 3.2, 0.04]} />
        <meshPhysicalMaterial 
          color="#c084fc" 
          transparent 
          opacity={0.35} 
          roughness={0.1} 
          transmission={0.8} 
          thickness={0.2} 
        />
      </mesh>
      {/* Left Glass Wall */}
      <mesh position={[-2.55, 1.7, 0]}>
        <boxGeometry args={[0.04, 3.2, 4.0]} />
        <meshPhysicalMaterial color="#c084fc" transparent opacity={0.35} roughness={0.1} transmission={0.8} thickness={0.2} />
      </mesh>
      {/* Right Glass Wall */}
      <mesh position={[2.55, 1.7, 0]}>
        <boxGeometry args={[0.04, 3.2, 4.0]} />
        <meshPhysicalMaterial color="#c084fc" transparent opacity={0.35} roughness={0.1} transmission={0.8} thickness={0.2} />
      </mesh>
      {/* Glass Ceiling Roof */}
      <mesh position={[0, 3.3, 0]}>
        <boxGeometry args={[5.2, 0.05, 4.2]} />
        <meshPhysicalMaterial color="#a855f7" transparent opacity={0.4} roughness={0.1} />
      </mesh>

      {/* Sleek Executive Desk */}
      <mesh position={[0, 0.6, -0.2]}>
        <boxGeometry args={[2.4, 0.7, 0.9]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Desktop Computer Monitor */}
      <group position={[0, 1.15, -0.2]}>
        <mesh>
          <boxGeometry args={[0.75, 0.45, 0.04]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, -0.26, 0]}>
          <cylinderGeometry args={[0.04, 0.08, 0.15]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
      </group>

      {/* Executive HOD Director Chair & Avatar (Behind Desk) */}
      <RealisticOfficeChair3D position={[0, 0, -0.85]} color="#7e22ce" rotation={[0, 0, 0]} />
      <RealisticSeatedAvatar3D position={[0, 0, -0.85]} shirtColor="#1e3a8a" hairColor="#0f172a" rotation={[0, 0, 0]} />

      {/* Visitor / Coordinator Chair & Avatar (Facing Desk) */}
      <RealisticOfficeChair3D position={[-0.8, 0, 0.65]} color="#be185d" rotation={[0, Math.PI, 0]} />
      <RealisticSeatedAvatar3D position={[-0.8, 0, 0.65]} shirtColor="#be185d" hairColor="#0f172a" rotation={[0, Math.PI, 0]} />

      {/* Floating Gold/Amber Label above Glass Cabin */}
      {showLabels && (
        <Html position={[0, 3.9, 0]} center distanceFactor={isMobile ? 24 : 16}>
          <div 
            onClick={(e) => { e.stopPropagation(); onSelect('faculty'); }}
            className={`px-4 py-2 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
              isHovered ? 'border-amber-300 bg-amber-500/30 shadow-[0_0_30px_rgba(251,191,36,0.9)] scale-110' : 'border-amber-400/70 bg-slate-950/85 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
            }`}
          >
            <span className="font-orbitron font-black text-xs sm:text-sm text-white text-glow-amber">
              FACULTY DIRECTORATE DESK
            </span>
            <button className="mt-1.5 px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-orbitron font-bold text-[9px] uppercase tracking-wider shadow-md hover:bg-amber-400 cursor-pointer">
              VIEW FACULTY TEAM
            </button>
          </div>
        </Html>
      )}
    </group>
  );
}

// 2. Executive Command Desk
function ExecutiveRoom3D({ onSelect, hoveredZone, setHoveredZone, showLabels, isMobile }) {
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

      {[-1.2, 0, 1.2].map((x, idx) => (
        <group key={idx}>
          <RealisticOfficeChair3D position={[x, 0, 0.3]} color="#0284c7" rotation={[0, Math.PI, 0]} />
          <RealisticSeatedAvatar3D position={[x, 0, 0.3]} shirtColor="#0284c7" hairColor="#0f172a" />
        </group>
      ))}

      {[-1.2, 0, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 1.4, -0.6]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[1.0, 0.6]} />
          <meshBasicMaterial color={isHovered ? "#00f0ff" : "#38bdf8"} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {showLabels && (
        <Html position={[0, 2.6, 0]} center distanceFactor={isMobile ? 24 : 16}>
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
      )}
    </group>
  );
}

// 3. Core Operations Board Room
function BoardRoom3D({ onSelect, hoveredZone, setHoveredZone, showLabels, isMobile }) {
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

      {[-1, 1].map((x, idx) => (
        <group key={idx}>
          <RealisticOfficeChair3D position={[x, 0, 0.3]} color="#7e22ce" rotation={[0, Math.PI, 0]} />
          <RealisticSeatedAvatar3D position={[x, 0, 0.3]} shirtColor="#7e22ce" hairColor="#3b0764" />
        </group>
      ))}

      {[-1, 1].map((x, i) => (
        <mesh key={i} position={[x, 1.4, -0.6]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[1.2, 0.7]} />
          <meshBasicMaterial color={isHovered ? "#a855f7" : "#c084fc"} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {showLabels && (
        <Html position={[0, 2.6, 0]} center distanceFactor={isMobile ? 24 : 16}>
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
      )}
    </group>
  );
}

// 4. Domain Workstation Desk Component
function DomainWorkstation3D({ id, title, color, position, onSelect, hoveredZone, setHoveredZone, showLabels, isMobile }) {
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

      <RealisticOfficeChair3D position={[0, 0, 0.8]} color={color} rotation={[0, Math.PI, 0]} />
      <RealisticSeatedAvatar3D position={[0, 0, 0.8]} shirtColor={color} />

      <mesh position={[0, 1.05, -0.3]}>
        <boxGeometry args={[1.1, 0.65, 0.08]} />
        <meshBasicMaterial color={isHovered ? "#ffffff" : color} />
      </mesh>

      {showLabels && (
        <Html position={[0, 1.8, 0]} center distanceFactor={isMobile ? 24 : 16}>
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
      )}
    </group>
  );
}

// 5. Department Coordinators Terminal
function DepartmentCoordinators3D({ position = [0, 0.4, -7.5], onSelect, hoveredZone, setHoveredZone, showLabels, isMobile }) {
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

      {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((x, idx) => (
        <group key={idx}>
          <RealisticOfficeChair3D position={[x, 0, 0.5]} color="#059669" rotation={[0, Math.PI, 0]} />
          <RealisticSeatedAvatar3D position={[x, 0, 0.5]} shirtColor="#059669" />
        </group>
      ))}

      {showLabels && (
        <Html position={[0, 4.2, 0]} center distanceFactor={isMobile ? 24 : 16}>
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
      )}
    </group>
  );
}

export default function Office3DScene({ onSelectZone }) {
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const isMobile = useIsMobile();

  const [hoveredZone, setHoveredZone] = useState(null);
  const [targetRatio, setTargetRatio] = useState(0); // 0 = closed door, 1 = open room
  const [smoothRatio, setSmoothRatio] = useState(0);

  // Smooth Wheel / Touch Handler inside 100vh window
  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      setTargetRatio(1.0);
    } else if (e.deltaY < 0) {
      setTargetRatio(0.0);
    }
  };

  // Ultra-Smooth Lerp Animation for Door Opening & Camera Glide
  useEffect(() => {
    let animationFrame;
    const updateSmoothRatio = () => {
      setSmoothRatio((prev) => {
        const diff = targetRatio - prev;
        if (Math.abs(diff) < 0.002) return targetRatio;
        return prev + diff * 0.08; // Smooth exponential easing
      });
      animationFrame = requestAnimationFrame(updateSmoothRatio);
    };
    animationFrame = requestAnimationFrame(updateSmoothRatio);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetRatio]);

  // SWAPPED WORKSTATION LOCATIONS:
  // TEAM UNITY IS NOW AT CENTER FRONT [0, 0, 8.0]
  // CONTENT & CREATIVITY TEAM IS NOW AT LEFT FRONT [-10.5, 0, 6.5]
  const domainDesks = [
    { id: 'unity_head', title: 'TEAM UNITY', color: '#00f0ff', position: [0, 0, 8.0] },
    { id: 'content_creativity_head', title: 'CONTENT & CREATIVITY TEAM', color: '#f59e0b', position: [-10.5, 0, 6.5] },
    { id: 'technical_head', title: 'TECHNICAL TEAM', color: '#f43f5e', position: [-6.5, 0, 7.5] },
    { id: 'doc_head', title: 'DOCUMENTATION TEAM', color: '#38bdf8', position: [6.5, 0, 7.5] },
    { id: 'media_head', title: 'MEDIA TEAM', color: '#e879f9', position: [10.5, 0, 6.5] },
    
    { id: 'design_head', title: 'DESIGN TEAM', color: '#a78bfa', position: [-10.5, 0, -3.5] },
    { id: 'logistic_head', title: 'LOGISTICS TEAM', color: '#2dd4bf', position: [-6.5, 0, -4.5] },
    { id: 'research_head', title: 'RESEARCH TEAM', color: '#06b6d4', position: [6.5, 0, -4.5] },
    { id: 'event_head', title: 'EVENT MANAGEMENT TEAM', color: '#eab308', position: [10.5, 0, -3.5] },
  ];

  const textOpacity = Math.max(0, 1.0 - smoothRatio * 2.2);
  const showDeskLabels = smoothRatio > 0.55;

  return (
    <div 
      ref={containerRef} 
      onWheel={handleWheel}
      className="relative w-full h-screen bg-[#020617] overflow-hidden select-none"
    >
      {/* OVERLAY TEXT ON CLOSED VAULT DOOR */}
      <div 
        onClick={() => setTargetRatio(1.0)}
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center transition-all duration-700 ${
          smoothRatio > 0.6 ? 'pointer-events-none opacity-0 scale-105' : 'cursor-pointer opacity-100 scale-100'
        }`}
        style={{ opacity: textOpacity }}
      >
        <div className="text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-cyan-500/40 bg-slate-950/80 mb-3 shadow-[0_0_25px_rgba(0,240,255,0.4)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-[10px] sm:text-xs text-cyan-300 tracking-[0.2em] uppercase font-bold">
              SECURE AR/VR HQ VAULT ENTRANCE
            </span>
          </div>

          <h1 className="font-orbitron font-black text-3xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-300 drop-shadow-[0_0_40px_rgba(0,240,255,0.8)] tracking-tight leading-none mb-4">
            WELCOME TO ARVR LAB
          </h1>

          <div className="mt-2 px-5 py-2.5 rounded-2xl glass-panel border border-cyan-400/50 bg-slate-950/90 shadow-[0_0_30px_rgba(0,240,255,0.3)] animate-bounce flex items-center gap-2">
            <span className="font-mono text-[11px] sm:text-sm text-cyan-300 font-bold uppercase tracking-wider">
              Scroll down or tap to open vault doors & enter room ↓
            </span>
          </div>
        </div>
      </div>

      <Canvas camera={{ position: [0, 2.2, isMobile ? 32 : 26], fov: isMobile ? 65 : 48 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 15, 60]} />

        <ambientLight intensity={0.85} />
        <directionalLight position={[10, 25, 15]} intensity={2.2} color="#00f0ff" />
        <pointLight position={[-15, 12, -10]} intensity={1.8} color="#a855f7" />
        <pointLight position={[15, 12, -10]} intensity={1.8} color="#00f0ff" />
        <pointLight position={[0, 10, 0]} intensity={2.8} color="#fbbf24" />

        {/* RESTRICTED ZOOM IN LIMIT: minDistance={16} (prevents extreme zoom in) */}
        <OrbitControls 
          ref={orbitRef}
          enableDamping 
          dampingFactor={0.05} 
          minDistance={16} 
          maxDistance={40}
          maxPolarAngle={Math.PI / 2 - 0.02}
        />

        <FrontViewCameraRig openRatio={smoothRatio} isUserInteracting={false} isMobile={isMobile} />

        <gridHelper args={[45, 45, '#00f0ff', '#1e293b']} position={[0, 0, 0]} />

        {/* Real ARVR Vertical Vault Doors (COMPLETELY DISAPPEARS WHEN INSIDE ROOM!) */}
        <RealARVRVerticalVaultDoors3D openRatio={smoothRatio} />

        {/* Sub-Floor Solar System Cosmic Structure */}
        <SubFloorSolarSystem3D position={[0, -5.5, 0]} />

        {/* Inside Room Workstations & Avatars */}
        <group visible={smoothRatio > 0.05}>
          {/* Faculty Directorate Desk: Futuristic Glass Cabin Office Room (Matching User Image) */}
          <GlassCabinFacultyOffice3D 
            onSelect={onSelectZone} 
            hoveredZone={hoveredZone} 
            setHoveredZone={setHoveredZone} 
            showLabels={showDeskLabels}
            isMobile={isMobile}
          />

          <ExecutiveRoom3D 
            onSelect={onSelectZone} 
            hoveredZone={hoveredZone} 
            setHoveredZone={setHoveredZone} 
            showLabels={showDeskLabels}
            isMobile={isMobile}
          />

          <BoardRoom3D 
            onSelect={onSelectZone} 
            hoveredZone={hoveredZone} 
            setHoveredZone={setHoveredZone} 
            showLabels={showDeskLabels}
            isMobile={isMobile}
          />

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
              showLabels={showDeskLabels}
              isMobile={isMobile}
            />
          ))}

          <DepartmentCoordinators3D 
            position={[0, 0.4, -7.5]}
            onSelect={onSelectZone} 
            hoveredZone={hoveredZone} 
            setHoveredZone={setHoveredZone} 
            showLabels={showDeskLabels}
            isMobile={isMobile}
          />
        </group>
      </Canvas>
    </div>
  );
}
