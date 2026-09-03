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

// LABORATORY ROOM ENCLOSURE WALLS & GIANT BACK SCREEN ("ARVR Team")
function LaboratoryRoomEnclosure3D({ showScreenText }) {
  return (
    <group>
      {/* BACK WALL */}
      <mesh position={[0, 7.5, -15.0]}>
        <boxGeometry args={[44.0, 17.0, 0.5]} />
        <meshStandardMaterial color="#0b1329" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* LEFT WALL */}
      <mesh position={[-22.0, 7.5, -1.0]}>
        <boxGeometry args={[0.5, 17.0, 28.0]} />
        <meshStandardMaterial color="#091126" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* RIGHT WALL */}
      <mesh position={[22.0, 7.5, -1.0]}>
        <boxGeometry args={[0.5, 17.0, 28.0]} />
        <meshStandardMaterial color="#091126" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* CEILING ROOF WITH LED STRIPS */}
      <mesh position={[0, 15.8, -1.0]}>
        <boxGeometry args={[44.0, 0.5, 28.0]} />
        <meshStandardMaterial color="#070d1e" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Futuristic Ceiling LED Glow Bars */}
      {[-12, -4, 4, 12].map((x, idx) => (
        <mesh key={idx} position={[x, 15.5, -1.0]}>
          <boxGeometry args={[0.3, 0.1, 26.0]} />
          <meshBasicMaterial color={idx % 2 === 0 ? "#00f0ff" : "#a855f7"} />
        </mesh>
      ))}

      {/* GIANT CURVED HOLOGRAPHIC SCREEN ON BACK WALL */}
      <group position={[0, 9.8, -14.6]}>
        {/* Screen Frame Border */}
        <mesh>
          <boxGeometry args={[24.0, 8.5, 0.2]} />
          <meshStandardMaterial color="#1e293b" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Outer Glow Border Line */}
        <mesh position={[0, 0, 0.11]}>
          <boxGeometry args={[23.6, 8.1, 0.02]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* Display Screen Surface */}
        <mesh position={[0, 0, 0.12]}>
          <planeGeometry args={[23.2, 7.7]} />
          <meshBasicMaterial color="#030712" />
        </mesh>

        {/* Neon Text Display on Screen ("ARVR Team") - ONLY VISIBLE INSIDE ROOM AFTER DOORS OPEN */}
        {showScreenText && (
          <Html position={[0, 0, 0.15]} transform center distanceFactor={14}>
            <div className="flex flex-col items-center justify-center p-6 text-center select-none w-[900px]">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan-400/50 bg-cyan-950/80 mb-3 shadow-[0_0_20px_rgba(0,240,255,0.6)]">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono text-sm text-cyan-300 tracking-[0.3em] uppercase font-bold">
                  HEADQUARTERS MAIN DISPLAY
                </span>
              </div>

              <h1 className="font-orbitron font-black text-7xl sm:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-300 drop-shadow-[0_0_45px_rgba(0,240,255,0.9)] uppercase">
                ARVR Team
              </h1>

              <p className="mt-2 font-mono text-xs sm:text-sm text-slate-300 tracking-[0.25em] uppercase font-semibold">
                ADVANCED IMMERSIVE TECHNOLOGIES LABORATORY // CORE ROSTER
              </p>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}

// Luxury High-Back Faculty Director Leather Chair
function LuxuryFacultyDirectorChair3D({ position, color = "#581c87", rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <group key={i} rotation={[0, rad, 0]}>
            <mesh position={[0, 0.06, 0.24]}>
              <boxGeometry args={[0.05, 0.04, 0.32]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.03, 0.38]}>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshStandardMaterial color="#020617" />
            </mesh>
          </group>
        );
      })}

      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.38, 16]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
      </mesh>

      <mesh position={[0, 0.44, 0]}>
        <boxGeometry args={[0.62, 0.12, 0.62]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>

      <mesh position={[0, 0.88, 0.24]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.56, 0.88, 0.08]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>

      <mesh position={[0, 1.32, 0.22]}>
        <boxGeometry args={[0.42, 0.22, 0.1]} />
        <meshStandardMaterial color="#3b0764" roughness={0.4} />
      </mesh>

      <group position={[-0.32, 0.62, 0]}>
        <boxGeometry args={[0.05, 0.26, 0.38]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
      </group>
      <group position={[0.32, 0.62, 0]}>
        <boxGeometry args={[0.05, 0.26, 0.38]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
      </group>
    </group>
  );
}

// Standard Ergonomic Office Chair
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
    </group>
  );
}

// REALISTIC MALE FACULTY DIRECTOR AVATAR
function RealisticMaleAvatar3D({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.68, 0]}>
        <boxGeometry args={[0.46, 0.52, 0.26]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.82, -0.13]}>
        <boxGeometry args={[0.12, 0.22, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.76, -0.14]}>
        <boxGeometry args={[0.05, 0.24, 0.02]} />
        <meshStandardMaterial color="#b91c1c" />
      </mesh>
      <mesh position={[0, 0.96, 0]}>
        <cylinderGeometry args={[0.07, 0.08, 0.12, 16]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      <mesh position={[0, 1.08, 0]}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.14, 0.01]}>
        <sphereGeometry args={[0.168, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2.1]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      <mesh position={[-0.12, 0.42, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.07, 0.38, 14]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0.12, 0.42, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.07, 0.38, 14]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[-0.24, 0.6, -0.18]} rotation={[0.6, 0.3, 0]}>
        <cylinderGeometry args={[0.055, 0.045, 0.38, 12]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>
      <mesh position={[0.24, 0.6, -0.18]} rotation={[0.6, -0.3, 0]}>
        <cylinderGeometry args={[0.055, 0.045, 0.38, 12]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>
    </group>
  );
}

// REALISTIC FEMALE FACULTY DIRECTOR AVATAR
function RealisticFemaleAvatar3D({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.66, 0]}>
        <boxGeometry args={[0.4, 0.48, 0.24]} />
        <meshStandardMaterial color="#9f1239" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.78, -0.12]}>
        <boxGeometry args={[0.14, 0.2, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.94, 0]}>
        <cylinderGeometry args={[0.06, 0.07, 0.12, 16]} />
        <meshStandardMaterial color="#f1c27d" />
      </mesh>
      <mesh position={[0, 1.06, 0]}>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial color="#f1c27d" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.08, 0.02]}>
        <sphereGeometry args={[0.165, 20, 20, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
        <meshStandardMaterial color="#291d09" roughness={0.7} />
      </mesh>
      <mesh position={[-0.14, 0.95, -0.02]}>
        <boxGeometry args={[0.06, 0.3, 0.14]} />
        <meshStandardMaterial color="#291d09" roughness={0.7} />
      </mesh>
      <mesh position={[0.14, 0.95, -0.02]}>
        <boxGeometry args={[0.06, 0.3, 0.14]} />
        <meshStandardMaterial color="#291d09" roughness={0.7} />
      </mesh>
      <mesh position={[-0.11, 0.4, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.06, 0.35, 14]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0.11, 0.4, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.06, 0.35, 14]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[-0.22, 0.58, -0.16]} rotation={[0.6, 0.3, 0]}>
        <cylinderGeometry args={[0.05, 0.04, 0.36, 12]} />
        <meshStandardMaterial color="#9f1239" />
      </mesh>
      <mesh position={[0.22, 0.58, -0.16]} rotation={[0.6, -0.3, 0]}>
        <cylinderGeometry args={[0.05, 0.04, 0.36, 12]} />
        <meshStandardMaterial color="#9f1239" />
      </mesh>
    </group>
  );
}

// Standard Seated Avatar
function RealisticSeatedAvatar3D({ position = [0, 0, 0], rotation = [0, Math.PI, 0], shirtColor = "#0284c7", pantsColor = "#0f172a", skinColor = "#ffdbac", hairColor = "#1e293b" }) {
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

// FULL VIEW 3D VAULT DOOR ENTRANCE STRUCTURE
// ONCE OPENED (hasOpened === true), DOORS & FRAMES PERMANENTLY UNMOUNT AND DISAPPEAR COMPLETELY!
function RealARVRVerticalVaultDoors3D({ openRatio, hasOpened }) {
  const leftDoorRef = useRef();
  const rightDoorRef = useRef();
  const emblemRef = useRef();

  useFrame((_, delta) => {
    const targetLeft = -8.2 - openRatio * 18.0;
    const targetRight = 8.2 + openRatio * 18.0;

    if (leftDoorRef.current) {
      leftDoorRef.current.position.x = THREE.MathUtils.lerp(leftDoorRef.current.position.x, targetLeft, delta * 5);
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.position.x = THREE.MathUtils.lerp(rightDoorRef.current.position.x, targetRight, delta * 5);
    }
    if (emblemRef.current) {
      emblemRef.current.rotation.z += delta * 0.8;
    }
  });

  // PERMANENT UNMOUNT ONCE OPENED!
  if (hasOpened || openRatio >= 0.8) {
    return null;
  }

  return (
    <group position={[0, 4.5, 18.5]}>
      {/* Dark Backdrop Curtain obscuring room interior while door is closed */}
      <mesh position={[0, 0, -0.5]}>
        <planeGeometry args={[50, 35]} />
        <meshBasicMaterial color="#020617" transparent opacity={Math.max(0, 1 - openRatio * 2.5)} />
      </mesh>

      {/* Frame Outer Metallic Columns */}
      <mesh position={[-14.8, 0, 0]}>
        <boxGeometry args={[2.5, 22.0, 2.0]} />
        <meshStandardMaterial color="#0b1329" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[14.8, 0, 0]}>
        <boxGeometry args={[2.5, 22.0, 2.0]} />
        <meshStandardMaterial color="#0b1329" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Top Metallic Door Lintel Arch */}
      <mesh position={[0, 10.2, 0]}>
        <boxGeometry args={[32.0, 2.2, 2.0]} />
        <meshStandardMaterial color="#0b1329" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Glowing Neon Laser Edges on Frame */}
      <mesh position={[-13.5, 0, 1.02]}>
        <boxGeometry args={[0.15, 21.8, 0.05]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[13.5, 0, 1.02]}>
        <boxGeometry args={[0.15, 21.8, 0.05]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>

      {/* LEFT VAULT DOOR PANEL */}
      <group ref={leftDoorRef} position={[-6.8, 0, 0]}>
        <mesh>
          <boxGeometry args={[13.6, 21.5, 0.8]} />
          <meshStandardMaterial color="#091126" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0, 0.42]}>
          <boxGeometry args={[12.2, 20.0, 0.05]} />
          <meshStandardMaterial color="#111d38" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.46]}>
          <boxGeometry args={[11.0, 18.5, 0.02]} />
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.6} />
        </mesh>
        <mesh position={[6.2, 0, 0.52]}>
          <cylinderGeometry args={[0.22, 0.22, 8.0, 16]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d97706" metalness={0.95} />
        </mesh>
      </group>

      {/* RIGHT VAULT DOOR PANEL */}
      <group ref={rightDoorRef} position={[6.8, 0, 0]}>
        <mesh>
          <boxGeometry args={[13.6, 21.5, 0.8]} />
          <meshStandardMaterial color="#091126" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0, 0.42]}>
          <boxGeometry args={[12.2, 20.0, 0.05]} />
          <meshStandardMaterial color="#111d38" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.46]}>
          <boxGeometry args={[11.0, 18.5, 0.02]} />
          <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.6} />
        </mesh>
        <mesh position={[-6.2, 0, 0.52]}>
          <cylinderGeometry args={[0.22, 0.22, 8.0, 16]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d97706" metalness={0.95} />
        </mesh>
      </group>

      {/* Central Rotating ARVR Emblem Core */}
      <group position={[0, 0, 0.6]} ref={emblemRef}>
        <mesh>
          <torusGeometry args={[2.2, 0.12, 16, 64]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[2.8, 0.08, 16, 64]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
      </group>
    </group>
  );
}

// Camera Rig Animation - Smooth Zoom & Full Door View
function FrontViewCameraRig({ openRatio, isUserInteracting, isMobile }) {
  useFrame(({ camera }) => {
    if (openRatio < 0.95 && !isUserInteracting) {
      const startZ = isMobile ? 48.0 : 42.0;
      const openZ = isMobile ? 32.0 : 26.0;

      const startY = 4.5;
      const openY = 2.2;

      const targetZ = THREE.MathUtils.lerp(startZ, openZ, openRatio);
      const targetY = THREE.MathUtils.lerp(startY, openY, openRatio);

      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06);
      camera.lookAt(0, THREE.MathUtils.lerp(4.5, 1.2, openRatio), 0);
    }
  });

  return null;
}

// Glass Cabin Office Room for Faculty Directorate
function GlassCabinFacultyOffice3D({ onSelect, hoveredZone, setHoveredZone, showLabels, isMobile }) {
  const isHovered = hoveredZone === 'faculty';

  return (
    <group 
      position={[0, 0, 1.5]}
      onClick={(e) => { e.stopPropagation(); onSelect('faculty'); }}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredZone('faculty'); }}
      onPointerOut={() => setHoveredZone(null)}
    >
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[5.2, 0.2, 4.2]} />
        <meshStandardMaterial color={isHovered ? "#a855f7" : "#7e22ce"} emissive={isHovered ? "#9333ea" : "#581c87"} roughness={0.2} />
      </mesh>

      {[[-2.55, -2.05], [2.55, -2.05], [-2.55, 2.05], [2.55, 2.05]].map(([x, z], idx) => (
        <mesh key={idx} position={[x, 1.7, z]}>
          <boxGeometry args={[0.1, 3.2, 0.1]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      <mesh position={[0, 1.7, -2.05]}>
        <boxGeometry args={[5.0, 3.2, 0.04]} />
        <meshPhysicalMaterial color="#c084fc" transparent opacity={0.35} roughness={0.1} transmission={0.8} thickness={0.2} />
      </mesh>
      <mesh position={[-2.55, 1.7, 0]}>
        <boxGeometry args={[0.04, 3.2, 4.0]} />
        <meshPhysicalMaterial color="#c084fc" transparent opacity={0.35} roughness={0.1} transmission={0.8} thickness={0.2} />
      </mesh>
      <mesh position={[2.55, 1.7, 0]}>
        <boxGeometry args={[0.04, 3.2, 4.0]} />
        <meshPhysicalMaterial color="#c084fc" transparent opacity={0.35} roughness={0.1} transmission={0.8} thickness={0.2} />
      </mesh>
      <mesh position={[0, 3.3, 0]}>
        <boxGeometry args={[5.2, 0.05, 4.2]} />
        <meshPhysicalMaterial color="#a855f7" transparent opacity={0.4} roughness={0.1} />
      </mesh>

      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[1.6, 0.65, 1.1]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.3} />
      </mesh>

      <group position={[0, 0.9, 0]}>
        <mesh position={[-0.2, 0, 0]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.42, 0.02, 0.28]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} />
        </mesh>
        <mesh position={[-0.2, 0.12, -0.1]} rotation={[-0.4, 0.3, 0]}>
          <boxGeometry args={[0.42, 0.24, 0.015]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0.3, 0.01, 0.1]} rotation={[0, -0.2, 0]}>
          <boxGeometry args={[0.3, 0.01, 0.4]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
      </group>

      <group position={[-1.1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <LuxuryFacultyDirectorChair3D position={[0, 0, 0]} color="#4c1d95" />
        <RealisticMaleAvatar3D position={[0, 0, 0]} />
      </group>

      <group position={[1.1, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <LuxuryFacultyDirectorChair3D position={[0, 0, 0]} color="#831843" />
        <RealisticFemaleAvatar3D position={[0, 0, 0]} />
      </group>

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

// Executive Command Desk
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

// Core Operations Board Room
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

// Domain Workstation Desk Component
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

// Department Coordinators Terminal
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
  const [hasOpened, setHasOpened] = useState(false); // Track permanent door unmount

  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      setTargetRatio(1.0);
    } else if (e.deltaY < 0 && !hasOpened) {
      setTargetRatio(0.0);
    }
  };

  useEffect(() => {
    let animationFrame;
    const updateSmoothRatio = () => {
      setSmoothRatio((prev) => {
        const diff = targetRatio - prev;
        if (Math.abs(diff) < 0.001) return targetRatio;
        return prev + diff * 0.05;
      });
      animationFrame = requestAnimationFrame(updateSmoothRatio);
    };
    animationFrame = requestAnimationFrame(updateSmoothRatio);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetRatio]);

  // Set permanent opened state once doors cross opening threshold
  useEffect(() => {
    if (smoothRatio > 0.4 && !hasOpened) {
      setHasOpened(true);
    }
  }, [smoothRatio, hasOpened]);

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
  const showDeskLabels = hasOpened || smoothRatio > 0.55;

  return (
    <div 
      ref={containerRef} 
      onWheel={handleWheel}
      className="relative w-full h-screen bg-[#020617] overflow-hidden select-none"
    >
      {/* OVERLAY TEXT ON CLOSED VAULT DOOR (Disappears permanently once opened) */}
      {!hasOpened && (
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

            <div className="mt-2 px-6 py-2.5 rounded-2xl glass-panel border border-cyan-400/50 bg-slate-950/90 shadow-[0_0_30px_rgba(0,240,255,0.3)] animate-bounce flex items-center gap-2 cursor-pointer hover:border-cyan-300 hover:scale-105 transition-all">
              <span className="font-mono text-[12px] sm:text-sm text-cyan-300 font-bold uppercase tracking-wider">
                Tap to enter room ↓
              </span>
            </div>
          </div>
        </div>
      )}

      <Canvas camera={{ position: [0, 4.5, isMobile ? 48 : 42], fov: isMobile ? 65 : 48 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 15, 65]} />

        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 25, 15]} intensity={2.2} color="#00f0ff" />
        <pointLight position={[-15, 12, -10]} intensity={1.8} color="#a855f7" />
        <pointLight position={[15, 12, -10]} intensity={1.8} color="#00f0ff" />
        <pointLight position={[0, 10, 0]} intensity={2.8} color="#fbbf24" />

        <OrbitControls 
          ref={orbitRef}
          enableDamping 
          dampingFactor={0.05} 
          minDistance={16} 
          maxDistance={50}
          maxPolarAngle={Math.PI / 2 - 0.02}
        />

        <FrontViewCameraRig openRatio={smoothRatio} isUserInteracting={false} isMobile={isMobile} />

        <gridHelper args={[45, 45, '#00f0ff', '#1e293b']} position={[0, 0, 0]} />

        {/* FULL VIEW 3D VAULT DOOR ENTRANCE (PERMANENTLY DISAPPEARS UPON OPENING!) */}
        <RealARVRVerticalVaultDoors3D openRatio={smoothRatio} hasOpened={hasOpened} />

        {/* Sub-Floor Solar System Cosmic Structure */}
        <SubFloorSolarSystem3D position={[0, -5.5, 0]} />

        {/* 3D LABORATORY ROOM ENCLOSURE WALLS & GIANT BACK DISPLAY ("ARVR Team" text ONLY visible inside room) */}
        <LaboratoryRoomEnclosure3D showScreenText={hasOpened || smoothRatio > 0.4} />

        {/* Inside Room Workstations & Avatars */}
        <group visible={hasOpened || smoothRatio > 0.05}>
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
