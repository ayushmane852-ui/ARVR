import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Global window mouse listener for smooth 3D motion regardless of DOM overlays
const windowMouse = { x: 0, y: 0 };

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    windowMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    windowMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });
}

// Central 3D Spatial Portal
function SpatialPortal({ scrollProgress }) {
  const portalRef = useRef();
  const innerRingRef = useRef();
  const coreSphereRef = useRef();
  const fragmentGroupRef = useRef();

  useFrame((_, delta) => {
    const mouseX = windowMouse.x * 0.8;
    const mouseY = windowMouse.y * 0.8;

    // Continuous smooth rotation + mouse tilt
    if (portalRef.current) {
      portalRef.current.rotation.z += delta * 0.15;
      portalRef.current.rotation.x = THREE.MathUtils.lerp(portalRef.current.rotation.x, -mouseY * 0.6, 0.05);
      portalRef.current.rotation.y = THREE.MathUtils.lerp(portalRef.current.rotation.y, mouseX * 0.6, 0.05);
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * 0.25;
      innerRingRef.current.rotation.y += delta * 0.1;
      innerRingRef.current.rotation.x = THREE.MathUtils.lerp(innerRingRef.current.rotation.x, mouseY * 0.4, 0.05);
    }

    if (fragmentGroupRef.current) {
      fragmentGroupRef.current.rotation.y += delta * 0.2;
      fragmentGroupRef.current.rotation.x = THREE.MathUtils.lerp(fragmentGroupRef.current.rotation.x, mouseY * 0.4, 0.05);
    }

    if (coreSphereRef.current) {
      coreSphereRef.current.rotation.x += delta * 0.3;
      coreSphereRef.current.rotation.y += delta * 0.15;
    }
  });

  // Position morphing based on scroll
  const portalY = -scrollProgress * 4;
  const portalZ = -scrollProgress * 5;

  return (
    <group position={[0, portalY, portalZ]}>
      {/* Outer Holographic Torus Ring */}
      <mesh ref={portalRef}>
        <torusGeometry args={[2.8, 0.08, 32, 100]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={1.5}
          wireframe
          roughness={0.1}
        />
      </mesh>

      {/* Inner Concentric Ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[2.2, 0.04, 16, 80]} />
        <meshStandardMaterial
          color="#8a2be2"
          emissive="#8a2be2"
          emissiveIntensity={2}
          wireframe
        />
      </mesh>

      {/* Central Holographic Core Sphere */}
      <mesh ref={coreSphereRef}>
        <icosahedronGeometry args={[1.1, 2]} />
        <MeshWobbleMaterial
          color="#00d2ff"
          emissive="#0088ff"
          emissiveIntensity={0.8}
          wireframe
          factor={0.4}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbiting Spatial Fragments */}
      <group ref={fragmentGroupRef}>
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 3.6;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <mesh key={i} position={[x, y, (i % 2 === 0 ? 0.4 : -0.4)]}>
              <octahedronGeometry args={[0.22]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#00f0ff" : "#ff007f"}
                emissive={i % 2 === 0 ? "#00f0ff" : "#ff007f"}
                emissiveIntensity={1.2}
                wireframe
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Interactive 3D Particle Field
function ParticleField({ count = 800 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorCyan = new THREE.Color("#00f0ff");
    const colorViolet = new THREE.Color("#8a2be2");
    const colorWhite = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 24;

      const mixFactor = Math.random();
      let particleColor = colorCyan.clone();
      if (mixFactor > 0.6) particleColor = colorViolet.clone();
      if (mixFactor > 0.9) particleColor = colorWhite.clone();

      col[i * 3] = particleColor.r;
      col[i * 3 + 1] = particleColor.g;
      col[i * 3 + 2] = particleColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;

      const mouseX = windowMouse.x * 0.6;
      const mouseY = windowMouse.y * 0.6;
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mouseX, 0.05);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, mouseY, 0.05);
    }
  });

  return (
    <points ref={pointsRef}>
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
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Spatial Environment Lighting & Camera Rig
function CameraRig() {
  const { camera } = useThree();

  useFrame(() => {
    const mouseX = windowMouse.x * 0.6;
    const mouseY = windowMouse.y * 0.6;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouseY, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Scene3D({ scrollProgress = 0 }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={['#030712']} />
        <fog attach="fog" args={['#030712', 6, 18]} />

        {/* Ambient & Directional Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00f0ff" />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#8a2be2" />

        {/* Camera Rig & Mouse parallax */}
        <CameraRig />

        {/* 3D Scene Elements */}
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
          <SpatialPortal scrollProgress={scrollProgress} />
        </Float>

        <ParticleField count={900} />

        {/* Spatial 3D Grid Floor */}
        <gridHelper args={[30, 30, '#00f0ff', '#1e1b4b']} position={[0, -5, 0]} />
      </Canvas>
    </div>
  );
}
