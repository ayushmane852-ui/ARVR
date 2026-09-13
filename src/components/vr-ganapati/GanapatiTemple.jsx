import React, { useMemo, useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
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

// Single Vertical Marigold Flower Garland (Gendaphool Mala) - Collapsed into 1 Instanced Draw Call
function MarigoldGarland({ position, height = 7.2, count = 28 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const beads = useMemo(() => {
    const step = height / count;
    return Array.from({ length: count }, (_, i) => ({
      x: Math.sin(i * 0.45) * 0.03,
      y: -i * step,
      z: Math.cos(i * 0.45) * 0.03,
      color: i % 2 === 0 ? '#ea580c' : '#f59e0b',
    }));
  }, [count, height]);

  useEffect(() => {
    if (!meshRef.current) return;
    const c = new THREE.Color();
    beads.forEach((b, i) => {
      dummy.position.set(b.x, b.y, b.z);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      c.set(b.color);
      meshRef.current.setColorAt(i, c);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [beads, dummy]);

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} position={position}>
      <sphereGeometry args={[0.13, 10, 10]} />
      <meshStandardMaterial roughness={0.75} metalness={0.05} />
    </instancedMesh>
  );
}

// Royal Brass Chhatra (Sacred Golden Umbrella suspended above Lord Ganesha's Crown)
function GoldenChhatra({ position = [0, 6.45, 0.3] }) {
  const fringeRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const numBeads = 32;

  useEffect(() => {
    if (!fringeRef.current) return;
    const r = 1.85;
    for (let i = 0; i < numBeads; i++) {
      const angle = (i / numBeads) * Math.PI * 2;
      dummy.position.set(Math.cos(angle) * r, -0.16, Math.sin(angle) * r);
      dummy.updateMatrix();
      fringeRef.current.setMatrixAt(i, dummy.matrix);
    }
    fringeRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);

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

      {/* Hanging Golden Bead Fringe as a Single Instanced Draw Call */}
      <instancedMesh ref={fringeRef} args={[null, null, numBeads]}>
        <sphereGeometry args={[0.038, 8, 8]} />
        <meshStandardMaterial
          color="#fbbf24"
          metalness={0.95}
          roughness={0.15}
        />
      </instancedMesh>
    </group>
  );
}

// Ornate Sacred Temple Prabhavali Arch behind Lord Ganesha
function SacredPrabhavali() {
  const raysRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const numRays = 26;

  useEffect(() => {
    if (!raysRef.current) return;
    for (let i = 0; i <= numRays; i++) {
      const angle = (i / numRays) * Math.PI;
      const x = Math.cos(angle) * 3.75;
      const y = 2.4 + Math.sin(angle) * 3.75 + 0.8;
      dummy.position.set(x, y, 0);
      dummy.rotation.set(0, 0, angle - Math.PI / 2);
      dummy.updateMatrix();
      raysRef.current.setMatrixAt(i, dummy.matrix);
    }
    raysRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);

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

      {/* Radiant Aura Rays along Arch as a Single Instanced Draw Call */}
      <instancedMesh ref={raysRef} args={[null, null, numRays + 1]}>
        <coneGeometry args={[0.08, 0.38, 12]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.92} roughness={0.2} />
      </instancedMesh>

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
  const petalsRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const count = 38;

  const petalData = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      const stepIdx = Math.floor((i / count) * 3);
      const y = -2.78 - stepIdx * 0.07;
      const z = 0.8 + stepIdx * 0.8 + ((i * 13) % 7 - 3) * 0.07;
      const x = (((i * 17) % 19) / 9.5 - 1) * (1.9 + stepIdx * 0.5);
      const rot = [((i * 3) % 5) * 0.04, (i * 1.3) % (Math.PI * 2), ((i * 7) % 5) * 0.04];
      const color = i % 3 === 0 ? '#f59e0b' : '#e11d48';
      list.push({ pos: [x, y, z], rot, color });
    }
    return list;
  }, [count]);

  useEffect(() => {
    if (!petalsRef.current) return;
    const color = new THREE.Color();
    petalData.forEach((p, i) => {
      dummy.position.set(p.pos[0], p.pos[1], p.pos[2]);
      dummy.rotation.set(p.rot[0], p.rot[1], p.rot[2]);
      dummy.updateMatrix();
      petalsRef.current.setMatrixAt(i, dummy.matrix);
      color.set(p.color);
      petalsRef.current.setColorAt(i, color);
    });
    petalsRef.current.instanceMatrix.needsUpdate = true;
    if (petalsRef.current.instanceColor) petalsRef.current.instanceColor.needsUpdate = true;
  }, [petalData, dummy]);

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

      {/* Scattered Sacred Flower Petals on Steps as a Single Instanced Draw Call */}
      <instancedMesh ref={petalsRef} args={[null, null, count]}>
        <circleGeometry args={[0.07, 8]} />
        <meshStandardMaterial roughness={0.6} side={THREE.DoubleSide} />
      </instancedMesh>
    </group>
  );
}

export default function GanapatiTemple({ blessingActive, isDiyaLit = false, arModeActive = false }) {
  const { scene } = useGLTF('/models/temple.glb', '/draco/');
  const haloRef = useRef();
  const haloTexture = useMemo(() => createHaloTexture(), []);

  const keyLightRef = useRef();
  const fillLightRef = useRef();
  const pillarLeftRef = useRef();
  const pillarRightRef = useRef();
  const backLight1Ref = useRef();
  const backLight2Ref = useRef();
  const lightProgress = useRef(isDiyaLit ? 1.0 : 0.0);

  // Smooth lighting swell tracking the sequential ignition of lamps
  useFrame(() => {
    lightProgress.current = THREE.MathUtils.lerp(
      lightProgress.current,
      isDiyaLit ? 1.0 : 0.0,
      0.038
    );
    const p = lightProgress.current;

    if (keyLightRef.current) {
      keyLightRef.current.intensity = THREE.MathUtils.lerp(
        arModeActive ? 1.6 : 0.08,
        blessingActive ? 4.2 : 2.8,
        p
      );
    }
    if (fillLightRef.current) {
      fillLightRef.current.intensity = THREE.MathUtils.lerp(
        arModeActive ? 1.2 : 0.05,
        blessingActive ? 2.6 : 1.8,
        p
      );
    }
    if (pillarLeftRef.current) {
      pillarLeftRef.current.intensity = THREE.MathUtils.lerp(0.0, 1.4, p);
    }
    if (pillarRightRef.current) {
      pillarRightRef.current.intensity = THREE.MathUtils.lerp(0.0, 1.4, p);
    }
    if (backLight1Ref.current) {
      backLight1Ref.current.intensity = THREE.MathUtils.lerp(8.5, blessingActive ? 4.0 : 2.2, p);
    }
    if (backLight2Ref.current) {
      backLight2Ref.current.intensity = THREE.MathUtils.lerp(5.5, blessingActive ? 2.4 : 1.6, p);
    }
    if (haloRef.current && haloRef.current.material) {
      haloRef.current.material.opacity = THREE.MathUtils.lerp(
        0.88,
        blessingActive ? 0.95 : 0.45,
        p
      );
    }
  });

  // Clone scene and apply rich sacred temple stone & idol materials ONCE (keyed only on scene)
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        // Hide raw photogrammetry floor scan with chopped geometry in favor of our custom carved temple steps and floor
        if (child.name === 'Cube003') {
          child.userData.isFloorScan = true;
          child.visible = false;
          return;
        }

        const isIdol = child.name === 'Mesh_0' || child.material?.name === 'Material.006';
        child.userData.isIdol = isIdol;

        // Only Lord Ganesha idol needs to cast shadows into shadow map; temple walls/floor only receive shadows
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

  // Cheap, separate effect just for showing/hiding outer temple walls in AR without re-cloning
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (!child.isMesh) return;
      if (child.userData.isFloorScan) {
        child.visible = false;
        return;
      }
      child.visible = !(arModeActive && !child.userData.isIdol);
    });
  }, [clonedScene, arModeActive]);

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
      <GoldenChhatra position={[0, arModeActive ? 7.5 : 6.45, 0.3]} />

      {/* 5. Vertical Marigold Flower Garlands framing the sanctum pillars */}
      <MarigoldGarland 
        position={[arModeActive ? -4.3 : -3.8, arModeActive ? 6.8 : 6.4, arModeActive ? 1.2 : 1.6]} 
        height={arModeActive ? 6.4 : 7.8} 
        count={30} 
      />
      <MarigoldGarland 
        position={[arModeActive ? 4.3 : 3.8, arModeActive ? 6.8 : 6.4, arModeActive ? 1.2 : 1.6]} 
        height={arModeActive ? 6.4 : 7.8} 
        count={30} 
      />

      {/* Outer pillar garlands (kept in VR, minimal in AR) */}
      {!arModeActive && (
        <>
          <MarigoldGarland position={[-5.4, 6.4, 1.0]} height={7.8} count={30} />
          <MarigoldGarland position={[5.4, 6.4, 1.0]} height={7.8} count={30} />
        </>
      )}

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

      {/* 7. Floor: In VR, full 26x26 reflective granite temple floor; in AR, compact consecrated dais */}
      {arModeActive ? (
        <group position={[0, -2.99, 1.2]}>
          {/* Consecrated Sacred Dais Outer Rim */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[3.6, 4.0, 48]} />
            <meshStandardMaterial color="#d4af37" metalness={0.88} roughness={0.24} />
          </mesh>
          {/* Dark Stone Pedestal Base */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[3.6, 48]} />
            <meshStandardMaterial color="#1a120c" metalness={0.35} roughness={0.35} />
          </mesh>
        </group>
      ) : (
        <mesh position={[0, -3.01, 3.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[26, 26]} />
          <meshStandardMaterial
            color="#160e0a"
            roughness={0.18}
            metalness={0.35}
          />
        </mesh>
      )}

      {/* 
        8. Divine Radiant Halo Aura BEHIND Lord Ganesha's Head
        In AR mode: FrontSide only so viewing the idol from rear is 100% unobstructed.
      */}
      <mesh
        ref={haloRef}
        position={[0, 3.8, -2.6]}
      >
        <planeGeometry args={[arModeActive ? 5.2 : 7.2, arModeActive ? 5.2 : 7.2]} />
        <meshBasicMaterial
          map={haloTexture}
          transparent
          opacity={0.88}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={arModeActive ? THREE.FrontSide : THREE.DoubleSide}
        />
      </mesh>

      {/* 3D Sacred Halo Ring around Crown in AR mode for radiant 360° darshan */}
      {arModeActive && (
        <mesh position={[0, 4.5, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.85, 0.03, 16, 48]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.65} />
        </mesh>
      )}

      {/* ============================================================ */}
      {/* SACRED TEMPLE ILLUMINATION                                   */}
      {/* Lights off initially: Dim atmospheric sanctum with radiant    */}
      {/* golden rim light and halo BEHIND the idol.                   */}
      {/* When Diya is lit: Progressive golden illumination swell.     */}
      {/* ============================================================ */}

      {/* 1. Main Front Key Light */}
      <directionalLight
        ref={keyLightRef}
        position={[0, 4.2, 9.5]}
        intensity={0.08}
        color="#fff4e0"
        castShadow
        shadow-mapSize={[arModeActive ? 512 : 1024, arModeActive ? 512 : 1024]}
        shadow-bias={-0.0002}
      />

      {/* 2. Warm Front Fill Light (Chest level) */}
      <pointLight
        ref={fillLightRef}
        position={[0, 1.8, 4.2]}
        intensity={0.05}
        color="#ffa834"
        distance={14}
        decay={1}
      />

      {/* 3. Left Side Warm Pillar Fill */}
      <pointLight
        ref={pillarLeftRef}
        position={[-3.6, 2.2, 3.2]}
        intensity={0.0}
        color="#ff9922"
        distance={12}
        decay={1}
      />

      {/* 4. Right Side Warm Pillar Fill */}
      <pointLight
        ref={pillarRightRef}
        position={[3.6, 2.2, 3.2]}
        intensity={0.0}
        color="#ff9922"
        distance={12}
        decay={1}
      />

      {/* 5. Golden Rim / Mukut Halo Light BEHIND Ganesha's crown (Active even when lights are off) */}
      <pointLight
        ref={backLight1Ref}
        position={[0, 4.4, -2.2]}
        intensity={8.5}
        color="#fbbf24"
        distance={18}
        decay={1}
      />

      {/* 6. Divine Torso & Throne Backlight BEHIND Ganesha (creates royal silhouette rim in the dark) */}
      <pointLight
        ref={backLight2Ref}
        position={[0, 1.6, -1.8]}
        intensity={5.5}
        color="#f59e0b"
        distance={15}
        decay={1}
      />
    </group>
  );
}
