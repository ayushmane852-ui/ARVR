import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

export default function CameraController({ blessingActive, onBlessingComplete, vrActive }) {
  const { camera } = useThree();
  const controlsRef = useRef();
  const mouseParallaxRef = useRef({ x: 0, y: 0 });

  // Initial cinematic camera dolly push on load: smoothly settles into the majestic wide temple hall vantage point
  useEffect(() => {
    camera.position.set(0, 3.0, 21.0);
    camera.lookAt(0, 1.4, 0.3);

    gsap.to(camera.position, {
      x: 0,
      y: 1.6,
      z: 15.8,
      duration: 2.8,
      ease: 'power2.out',
      onUpdate: () => {
        if (controlsRef.current) {
          controlsRef.current.target.set(0, 1.4, 0.3);
          controlsRef.current.update();
        }
      },
    });
  }, [camera]);

  // Blessing camera sequence
  useEffect(() => {
    if (!blessingActive || !controlsRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (onBlessingComplete) onBlessingComplete();
      },
    });

    // Gentle zoom into divine darshan portrait shot
    tl.to(camera.position, {
      x: 0,
      y: 1.5,
      z: 9.2,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        controlsRef.current.target.set(0, 1.5, 0.3);
        controlsRef.current.update();
      },
    });

    // Hold reverently for 3.8 seconds
    tl.to({}, { duration: 3.8 });

    // Smoothly return to wide hero frame
    tl.to(camera.position, {
      x: 0,
      y: 1.6,
      z: 15.8,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: () => {
        controlsRef.current.target.set(0, 1.4, 0.3);
        controlsRef.current.update();
      },
    });

    return () => tl.kill();
  }, [blessingActive, camera, onBlessingComplete]);

  // Mouse Parallax on Desktop
  useEffect(() => {
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseParallaxRef.current = { x: nx * 0.4, y: ny * 0.22 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (blessingActive || vrActive || !controlsRef.current) return;
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouseParallaxRef.current.x,
      0.03
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      1.6 + mouseParallaxRef.current.y,
      0.03
    );
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      enablePan={false}
      minDistance={4.5}
      maxDistance={28.0}
      minPolarAngle={Math.PI / 3.2}
      maxPolarAngle={Math.PI / 2 + 0.05}
      minAzimuthAngle={-Math.PI / 3.2}
      maxAzimuthAngle={Math.PI / 3.2}
      rotateSpeed={0.65}
      zoomSpeed={0.6}
    />
  );
}
