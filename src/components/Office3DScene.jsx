import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. 3D HOD & Faculty Pavilion (Center of Office Floor)
function FacultyPavilion3D({ onSelect, hoveredZone, setHoveredZone }) {
  const meshRef = useRef();
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
        <cylinderGeometry args={[2.8, 3.2, 0.3, 8]} />
        <meshStandardMaterial 
          color={isHovered ? "#ffea00" : "#d97706"} 
          emissive={isHovered ? "#d97706" : "#b45309"}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Golden Glowing Ring */}
      <mesh ref={ringRef} position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.3, 3.5, 32]} />
        <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} transparent opacity={isHovered ? 0.9 : 0.6} />
      </mesh>

      {/* 4 Corner Golden Pillars */}
      {[[-1.8, -1.8], [1.8, -1.8], [-1.8, 1.8], [1.8, 1.8]].map(([x, z], idx) => (
        <mesh key={idx} position={[x, 1.5, z]}>
          <cylinderGeometry args={[0.15, 0.2, 2.4, 16]} />
          <meshStandardMaterial color="#f59e0b" emissive="#78350f" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Floating 3D Golden Crest Core */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[0, 1.8, 0]}>
          <octahedronGeometry args={[0.8]} />
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
      <Html position={[0, 3.3, 0]} center distanceFactor={15}>
        <div className={`px-4 py-2 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
          isHovered 
            ? 'border-amber-300 bg-amber-500/30 shadow-[0_0_30px_rgba(251,191,36,0.8)] scale-110' 
            : 'border-amber-400/60 bg-slate-950/80 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
        }`}>
          <span className="font-mono text-[9px] text-amber-300 font-bold tracking-widest uppercase block">
            FACULTY COMMAND CABIN
          </span>
          <span className="font-orbitron font-black text-sm text-white text-glow-amber">
            HOD & FACULTY DIRECTORATE
          </span>
          <span className="font-mono text-[10px] text-amber-200 mt-0.5 font-semibold">
            Dr. Lingaraj Hadimani (HOD) & Anuradha Solanki
          </span>
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
      {/* Platform */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[4.5, 0.2, 3.5]} />
        <meshStandardMaterial color={isHovered ? "#00f0ff" : "#0284c7"} emissive="#0369a1" roughness={0.3} />
      </mesh>

      {/* Curved Console Table */}
      <mesh position={[0, 0.6, -0.5]}>
        <boxGeometry args={[3.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>

      {/* 3 Neon Screens */}
      {[-1.2, 0, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 1.4, -0.6]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[1.0, 0.6]} />
          <meshBasicMaterial color={isHovered ? "#00f0ff" : "#38bdf8"} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Floating 3D Label */}
      <Html position={[0, 2.6, 0]} center distanceFactor={15}>
        <div className={`px-3 py-1.5 rounded-xl glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
          isHovered ? 'border-cyan-300 bg-cyan-500/30 scale-110 shadow-[0_0_25px_rgba(0,240,255,0.8)]' : 'border-cyan-400/50 bg-slate-950/80 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
        }`}>
          <span className="font-mono text-[8px] text-cyan-300 tracking-wider uppercase font-bold">MAIN PANEL ROOM</span>
          <span className="font-orbitron font-bold text-xs text-white">EXECUTIVE COMMAND</span>
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

      {/* Floating Label */}
      <Html position={[0, 1.8, 0]} center distanceFactor={15}>
        <div className={`px-2.5 py-1 rounded-lg glass-panel border transition-all duration-300 flex flex-col items-center cursor-pointer whitespace-nowrap ${
          isHovered ? 'scale-110 bg-cyan-500/30 border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.7)]' : 'bg-slate-950/80 border-cyan-500/30'
        }`}>
          <span className="font-orbitron font-bold text-[10px] text-white">{title}</span>
        </div>
      </Html>
    </group>
  );
}

// 5. 3D AR/VR Equipment & Lab Stations
function ARVREquipmentBay3D({ position, title, type, color, onSelect }) {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current && type === 'hologram') {
      meshRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group position={position}>
      {/* Station Platform */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1.5, 1.8, 0.2, 24]} />
        <meshStandardMaterial color="#0f172a" emissive={color} emissiveIntensity={0.2} />
      </mesh>

      {/* Equipment Model Representation */}
      {type === 'headset' && (
        <group position={[0, 0.6, 0]}>
          <mesh>
            <boxGeometry args={[0.8, 0.4, 0.5]} />
            <meshStandardMaterial color="#00f0ff" roughness={0.1} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.26]}>
            <planeGeometry args={[0.7, 0.3]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      )}

      {type === 'vfx' && (
        <group position={[0, 1.0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.4, 0.8, 16]} />
            <meshStandardMaterial color="#e040fb" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshBasicMaterial color="#ff00ff" wireframe />
          </mesh>
        </group>
      )}

      {type === 'hologram' && (
        <group ref={meshRef} position={[0, 0.9, 0]}>
          <mesh>
            <icosahedronGeometry args={[0.6, 1]} />
            <meshBasicMaterial color="#fbbf24" wireframe />
          </mesh>
        </group>
      )}

      {/* Floating 3D Station Label */}
      <Html position={[0, 2.0, 0]} center distanceFactor={15}>
        <div className="px-3 py-1 rounded-xl glass-panel border border-cyan-400/40 bg-slate-950/85 text-center whitespace-nowrap shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <span className="font-mono text-[8px] text-cyan-300 block font-bold">LAB EQUIPMENT BAY</span>
          <span className="font-orbitron font-bold text-xs text-white">{title}</span>
        </div>
      </Html>
    </group>
  );
}

// 6. 3D Department Coordinators Terminal
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

      {/* 6 Terminal Displays */}
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
        </div>
      </Html>
    </group>
  );
}

export default function Office3DScene({ onSelectZone }) {
  const [hoveredZone, setHoveredZone] = useState(null);

  const domainDesks = [
    { id: 'unity_head', title: 'UNITY SPATIAL ENGINE', color: '#00f0ff', position: [-9, 0, 2] },
    { id: 'technical_head', title: 'TECHNICAL SPATIAL DEV', color: '#f43f5e', position: [-5, 0, 4] },
    { id: 'content_creativity_head', title: 'CONTENT & CREATIVITY', color: '#f59e0b', position: [0, 0, 5] },
    { id: 'doc_head', title: 'DOCUMENTATION & RESEARCH', color: '#38bdf8', position: [5, 0, 4] },
    { id: 'media_head', title: 'MEDIA & PR', color: '#e879f9', position: [9, 0, 2] },
    { id: 'design_head', title: 'UI/UX & SPATIAL DESIGN', color: '#a78bfa', position: [-9, 0, 7] },
    { id: 'logistic_head', title: 'SPATIAL LOGISTICS', color: '#2dd4bf', position: [-5, 0, 8] },
    { id: 'research_head', title: 'R&D SPATIAL LAB', color: '#06b6d4', position: [5, 0, 8] },
    { id: 'event_head', title: 'EVENT MANAGEMENT', color: '#eab308', position: [9, 0, 7] },
  ];

  return (
    <div className="w-full h-[550px] sm:h-[650px] relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.2)] bg-[#020617]">
      
      {/* 3D Controls Overlay Helper */}
      <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-cyan-300/80 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-cyan-500/30 pointer-events-none">
        <span>3D VIRTUAL LAB NAVIGATION // LEFT CLICK ROTATE • SCROLL ZOOM • RIGHT CLICK PAN</span>
      </div>

      <Canvas camera={{ position: [0, 14, 18], fov: 50 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 15, 40]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, 10, -10]} intensity={1.2} color="#a855f7" />
        <pointLight position={[0, 8, 0]} intensity={2.0} color="#fbbf24" />

        <OrbitControls 
          enableDamping 
          dampingFactor={0.05} 
          minDistance={6} 
          maxDistance={26}
          maxPolarAngle={Math.PI / 2 - 0.05}
        />

        {/* Reflective Office Floor Grid */}
        <gridHelper args={[40, 40, '#00f0ff', '#1e293b']} position={[0, 0, 0]} />

        {/* 1. Center Faculty Pavilion */}
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

        {/* 4. Domain Workstation Desks */}
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

        {/* 5. AR/VR Equipment Bays */}
        <ARVREquipmentBay3D position={[-4, 0, -8]} title="VR HEADSET LAB" type="headset" color="#00f0ff" />
        <ARVREquipmentBay3D position={[0, 0, -8]} title="VFX CAPTURE STUDIO" type="vfx" color="#e040fb" />
        <ARVREquipmentBay3D position={[4, 0, -8]} title="HOLOGRAPHIC POD" type="hologram" color="#fbbf24" />

        {/* 6. Department Coordinators Terminal */}
        <DepartmentCoordinators3D 
          onSelect={onSelectZone} 
          hoveredZone={hoveredZone} 
          setHoveredZone={setHoveredZone} 
        />

      </Canvas>
    </div>
  );
}
