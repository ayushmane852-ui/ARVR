import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Global window mouse & touch listener for smooth 3D motion
const windowMouse = { x: 0, y: 0 };

if (typeof window !== 'undefined') {
  const updatePointer = (clientX, clientY) => {
    windowMouse.x = (clientX / window.innerWidth) * 2 - 1;
    windowMouse.y = -(clientY / window.innerHeight) * 2 + 1;
  };

  window.addEventListener('mousemove', (e) => updatePointer(e.clientX, e.clientY), { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });
}

// 3D Spiral Galaxy Component
function SpiralGalaxy({ scrollProgress }) {
  const galaxyRef = useRef();
  const coreRef = useRef();

  const parameters = {
    count: 8000,
    size: 0.045,
    radius: 13,
    branches: 4,
    spin: 1.3,
    randomness: 0.65,
    power: 2.8,
    insideColor: '#ffd700',
    midColor: '#00f0ff',
    outsideColor: '#8a2be2',
  };

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(parameters.count * 3);
    const col = new Float32Array(parameters.count * 3);

    const colorInside = new THREE.Color(parameters.insideColor);
    const colorMid = new THREE.Color(parameters.midColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);
    const colorMagenta = new THREE.Color('#ff007f');

    for (let i = 0; i < parameters.count; i++) {
      // Logarithmic spiral position calculation
      const radius = Math.pow(Math.random(), parameters.power) * parameters.radius;
      const spinAngle = radius * parameters.spin;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const randomX = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius);
      const randomY = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius);
      const randomZ = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius);

      pos[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i * 3 + 1] = randomY * 0.45; // Cosmic galaxy disk height
      pos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Color gradient from central golden core to blue/violet/magenta spiral arms
      const mixedColor = colorInside.clone();
      const radiusRatio = radius / parameters.radius;

      if (radiusRatio < 0.25) {
        mixedColor.lerp(colorMid, radiusRatio / 0.25);
      } else if (radiusRatio < 0.65) {
        mixedColor.copy(colorMid).lerp(colorOutside, (radiusRatio - 0.25) / 0.4);
      } else {
        mixedColor.copy(colorOutside).lerp(colorMagenta, (radiusRatio - 0.65) / 0.35);
      }

      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (galaxyRef.current) {
      // Continuous slow galactic rotation
      galaxyRef.current.rotation.y += delta * 0.04;
      galaxyRef.current.rotation.z += delta * 0.005;

      // Smooth 3D Cursor tilt
      const mouseX = windowMouse.x * 0.35;
      const mouseY = windowMouse.y * 0.35;
      galaxyRef.current.rotation.x = THREE.MathUtils.lerp(galaxyRef.current.rotation.x, 0.45 - mouseY * 0.35, 0.05);
      galaxyRef.current.rotation.z = THREE.MathUtils.lerp(galaxyRef.current.rotation.z, mouseX * 0.25, 0.05);

      // Scroll effect - journey through galaxy depth
      galaxyRef.current.position.z = THREE.MathUtils.lerp(galaxyRef.current.position.z, -scrollProgress * 5, 0.05);
      galaxyRef.current.position.y = THREE.MathUtils.lerp(galaxyRef.current.position.y, -2.2 + scrollProgress * 1.5, 0.05);
    }

    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group ref={galaxyRef} position={[0, -2.2, 0]} rotation={[0.45, 0, 0]}>
      {/* Central Galactic Core Star Cluster */}
      <points ref={coreRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <pointsMaterial
          size={0.065}
          color="#ffd700"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Main Spiral Galaxy Stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={parameters.size}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          transparent={true}
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// Deep Space Distant Starfield
function DistantStarfield({ count = 3000 }) {
  const starsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cCyan = new THREE.Color("#00f0ff");
    const cViolet = new THREE.Color("#a855f7");
    const cWhite = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const rand = Math.random();
      let starColor = cWhite;
      if (rand < 0.35) starColor = cCyan;
      else if (rand < 0.65) starColor = cViolet;

      col[i * 3] = starColor.r;
      col[i * 3 + 1] = starColor.g;
      col[i * 3 + 2] = starColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.01;
      starsRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Camera Parallax Rig
function CameraRig() {
  const { camera } = useThree();

  useFrame(() => {
    const mouseX = windowMouse.x * 0.4;
    const mouseY = windowMouse.y * 0.4;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2 + mouseY, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// 3D Cosmic Planets with Rings & Atmosphere Glow
function CosmicPlanets({ scrollProgress }) {
  const groupRef = useRef();
  const planet1Ref = useRef(); // Cyan Gas Giant with Ring
  const ring1Ref = useRef();
  const planet2Ref = useRef(); // Purple/Magenta Planet
  const planet3Ref = useRef(); // Golden Orb/Moon
  const planet4Ref = useRef(); // Cyber Mesh Planet

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Continuous slow orbital rotation
      groupRef.current.rotation.y += delta * 0.025;
      
      // Parallax scroll reaction
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, -scrollProgress * 4, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scrollProgress * 1.2, 0.05);
    }

    if (planet1Ref.current) {
      planet1Ref.current.rotation.y += delta * 0.15;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.08;
    }
    if (planet2Ref.current) {
      planet2Ref.current.rotation.y -= delta * 0.12;
      planet2Ref.current.rotation.x += delta * 0.05;
    }
    if (planet3Ref.current) {
      planet3Ref.current.rotation.y += delta * 0.2;
    }
    if (planet4Ref.current) {
      planet4Ref.current.rotation.y += delta * 0.25;
      planet4Ref.current.rotation.z -= delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Planet 1: Large Cyan/Teal Gas Giant with Saturn-style Rings */}
      <group position={[-5.8, 2.8, -4.5]}>
        <mesh ref={planet1Ref}>
          <sphereGeometry args={[1.1, 32, 32]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#005577"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        {/* Planet 1 Outer Atmosphere Glow Shell */}
        <mesh scale={[1.15, 1.15, 1.15]}>
          <sphereGeometry args={[1.1, 32, 32]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>
        {/* Planet 1 Orbital Rings */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0.2, 0]}>
          <ringGeometry args={[1.4, 2.3, 64]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#0088aa"
            side={THREE.DoubleSide}
            transparent
            opacity={0.65}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Planet 2: Vibrant Purple & Magenta Terrestrial Planet */}
      <group position={[6.2, -1.8, -3.8]}>
        <mesh ref={planet2Ref}>
          <sphereGeometry args={[0.85, 32, 32]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#4c1d95"
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
        {/* Wireframe Orbital Mesh Shell */}
        <mesh scale={[1.2, 1.2, 1.2]}>
          <sphereGeometry args={[0.85, 16, 16]} />
          <meshBasicMaterial
            color="#ff007f"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
      </group>

      {/* Planet 3: Golden Star Orb / Cosmic Moon */}
      <group position={[-3.8, -3.5, -5.2]}>
        <mesh ref={planet3Ref}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#ffd700"
            emissive="#b45309"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <pointLight intensity={1.5} color="#ffd700" distance={6} />
      </group>

      {/* Planet 4: Cybernetic Hologram Mesh Planet */}
      <group position={[4.8, 3.8, -6]}>
        <mesh ref={planet4Ref}>
          <sphereGeometry args={[0.7, 24, 24]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#003344"
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh scale={[1.25, 1.25, 1.25]} rotation={[0.5, 0.5, 0]}>
          <ringGeometry args={[0.9, 1.1, 32]} />
          <meshBasicMaterial
            color="#00f0ff"
            side={THREE.DoubleSide}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function Scene3D({ scrollProgress = 0 }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 2, 9], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={['#02040a']} />
        <fog attach="fog" args={['#02040a', 8, 24]} />

        {/* Ambient & Cosmic Point Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#00f0ff" />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#8a2be2" />

        <CameraRig />

        {/* 3D Cosmic Planets */}
        <CosmicPlanets scrollProgress={scrollProgress} />

        {/* 3D Spiral Galaxy Scene (Circles Removed) */}
        <SpiralGalaxy scrollProgress={scrollProgress} />

        {/* Deep Space Background Starfield */}
        <DistantStarfield count={3000} />
      </Canvas>
    </div>
  );
}
