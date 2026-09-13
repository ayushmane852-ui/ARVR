import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Float, useGLTF, Center, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function VisionProModel() {
  const { scene } = useGLTF('/models/apple-vision-pro.glb');
  const { size } = useThree();

  // Enhance front curved glass visor with realistic gloss & reflections
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const name = child.name || '';
        // UXLjllnBycNoaYM_0 and ASkoYyVECEcxkYK_0 are the front curved glass visor
        if (name.includes('UXLjlln') || name.includes('ASkoYy')) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: '#020409',
            roughness: 0.03,
            metalness: 0.94,
            clearcoat: 1.0,
            clearcoatRoughness: 0.02,
            reflectivity: 1.0,
          });
        }
      }
    });
  }, [scene]);

  // Responsive scale based on canvas viewport width and aspect ratio
  const width = size.width;
  const height = size.height;
  const aspect = width / Math.max(1, height);

  let modelScale = 3.6;
  if (width < 390) {
    // Compact mobile phones (e.g. 360-390px wide)
    modelScale = Math.min(1.85, Math.max(1.5, (width / 380) * 1.75));
  } else if (width < 640) {
    // Standard to large mobile phones
    modelScale = 2.15;
  } else if (width < 1024) {
    // Tablet viewports
    modelScale = 2.85;
  } else {
    // Desktop widescreen
    modelScale = 3.6;
  }

  // Guard against horizontal clipping on narrow portrait aspect ratios
  if (aspect < 0.85) {
    modelScale = Math.min(modelScale, Math.max(1.45, aspect * 2.25));
  }

  return (
    /* Tilted 3/4 hero angle matching reference image (visor turned right, left audio strap visible) */
    <group position={[0.04, 0, 0]} rotation={[0.16, -Math.PI / 2 + 0.38, -0.12]} scale={modelScale}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

// Dynamically adjusts camera distance on narrow mobile portrait viewports
function ResponsiveCameraRig() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    if (aspect < 0.9) {
      const targetZ = Math.min(4.8, Math.max(3.8, 3.65 / Math.max(0.45, aspect) * 0.82));
      camera.position.z = targetZ;
    } else {
      camera.position.z = 3.65;
    }
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);
  return null;
}

useGLTF.preload('/models/apple-vision-pro.glb');

export default function VisionProCanvas() {
  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <div 
      onPointerDown={() => setHasInteracted(true)}
      className="relative w-full h-full min-h-[160px] sm:min-h-[260px] md:min-h-[340px] lg:min-h-[420px] flex items-center justify-center select-none overflow-visible"
    >
      {/* 3D WebGL Canvas */}
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3.65], fov: 40 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance" 
        }}
        className="cursor-grab active:cursor-grabbing w-full h-full"
      >
        <ResponsiveCameraRig />
        {/* Cinematic Lighting tailored for Vision Pro's Glossy Glass & Aluminium Enclosure */}
        <ambientLight intensity={1.4} />
        {/* Front Key Light for Glass Specular Sheen on upper-right visor */}
        <directionalLight position={[2.5, 4.5, 5]} intensity={4.2} color="#ffffff" />
        {/* Left Cyan Rim Light matching left cosmic nebula and illuminating audio strap */}
        <directionalLight position={[-6, 2, 2]} intensity={4.5} color="#00f0ff" />
        {/* Right Purple Rim Light matching right cosmic nebula */}
        <directionalLight position={[6, 0, 2]} intensity={4.0} color="#c084fc" />
        {/* Bottom Horizon Up-light matching Earth's glowing blue atmosphere */}
        <pointLight position={[0, -4, 2]} intensity={3.0} color="#38bdf8" />
        {/* Rear separation light */}
        <directionalLight position={[0, 4, -4]} intensity={2.0} color="#ffffff" />

        <Suspense fallback={null}>
          <Float speed={1.1} rotationIntensity={0.05} floatIntensity={0.06}>
            <VisionProModel />
          </Float>
        </Suspense>

        {/* OrbitControls: No auto-rotation initially until cursor interaction */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={hasInteracted}
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 3.4}
          maxPolarAngle={Math.PI / 1.65}
          dampingFactor={0.06}
          onStart={() => setHasInteracted(true)}
        />
      </Canvas>
    </div>
  );
}
