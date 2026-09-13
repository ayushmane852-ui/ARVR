import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

export default function CameraController({
  isLoaded = false,
  blessingActive,
  onBlessingComplete,
  aartiActive = false,
  vrActive = false,
  arActive = false,
  isWebXRAR = false,
  arPosition = [0, -0.7, 0],
  arScale = 0.35,
  isDiyaLit,
}) {
  const { camera, size } = useThree();
  const controlsRef = useRef();
  const mouseParallaxRef = useRef({ x: 0, y: 0 });
  const hasAnimatedEntrance = useRef(false);

  // Compute aspect-ratio aware camera framing:
  // In mobile portrait (aspect ~0.45 - 0.6), Three.js vertical FOV restricts horizontal FOV.
  // We dynamically push the camera back and slightly elevate it so Lord Ganesha, throne, and diyas fit uncropped.
  const isPortrait = size.width < size.height;
  const aspect = size.width / Math.max(1, size.height);
  const distMultiplier = isPortrait ? Math.min(1.36, Math.max(1.15, 0.72 / Math.max(0.38, aspect))) : 1.0;
  const defaultY = isPortrait ? 1.55 : 1.35;
  const baseZ = isDiyaLit ? 17.0 : 20.0;
  const targetZ = baseZ * distMultiplier;

  // Update OrbitControls target and camera framing when switching to or moving in fallback AR mode
  useEffect(() => {
    if (!controlsRef.current) return;
    if (arActive && !isWebXRAR) {
      // Base dais sits at arPosition[1]. Idol chest is centered at arPosition[1] + 4.45 * arScale
      const targetY = arPosition[1] + 4.45 * arScale;
      const targetZPos = arPosition[2] + 0.3 * arScale;
      controlsRef.current.target.set(arPosition[0], targetY, targetZPos);
      controlsRef.current.update();

      const arCamZ = (isPortrait ? 4.2 : 3.5) * Math.max(0.7, arScale / 0.35);
      gsap.to(camera.position, {
        x: arPosition[0],
        y: targetY + 0.15,
        z: targetZPos + arCamZ,
        duration: 1.0,
        ease: 'power2.out',
        onUpdate: () => {
          if (controlsRef.current) {
            controlsRef.current.update();
          }
        },
      });
    } else if (!arActive && hasAnimatedEntrance.current) {
      controlsRef.current.target.set(0, 1.45, 0.3);
      controlsRef.current.update();

      gsap.to(camera.position, {
        x: 0,
        y: defaultY,
        z: targetZ,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          if (controlsRef.current) {
            controlsRef.current.update();
          }
        },
      });
    }
  }, [arActive, isWebXRAR, arPosition, arScale, isPortrait, defaultY, targetZ, camera]);

  // Keep camera locked at initial distance until scene is completely loaded and warmed up
  useEffect(() => {
    if (!isLoaded) {
      camera.position.set(0, 2.0, 25.0 * distMultiplier);
      camera.lookAt(0, 1.45, 0.3);
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 1.45, 0.3);
        controlsRef.current.update();
      }
    }
  }, [camera, isLoaded, distMultiplier]);

  // Initial cinematic camera dolly push: triggers in one smooth shot ONLY when isLoaded becomes true!
  useEffect(() => {
    if (!isLoaded || hasAnimatedEntrance.current) return;
    hasAnimatedEntrance.current = true;

    camera.position.set(0, 2.0, 25.0 * distMultiplier);
    camera.lookAt(0, 1.45, 0.3);
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 1.45, 0.3);
      controlsRef.current.update();
    }

    const anim = gsap.to(camera.position, {
      x: 0,
      y: defaultY,
      z: targetZ,
      duration: 3.0,
      ease: 'power2.out',
      onUpdate: () => {
        if (controlsRef.current) {
          controlsRef.current.target.set(0, 1.45, 0.3);
          controlsRef.current.update();
        }
      },
    });

    return () => anim.kill();
  }, [isLoaded, camera, defaultY, targetZ, distMultiplier]);

  // Dolly closer when diyas are lit / dolly back when unlit
  useEffect(() => {
    if (!controlsRef.current || !isLoaded || !hasAnimatedEntrance.current || arActive) return;
    const anim = gsap.to(camera.position, {
      y: defaultY,
      z: targetZ,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (controlsRef.current) {
          controlsRef.current.update();
        }
      },
    });
    return () => anim.kill();
  }, [targetZ, defaultY, isLoaded, arActive, camera]);

  // Responsive camera adaptation on window resize / orientation flip (portrait <-> landscape)
  useEffect(() => {
    if (!controlsRef.current || !isLoaded || !hasAnimatedEntrance.current || arActive || vrActive || blessingActive || aartiActive) return;

    gsap.to(camera.position, {
      y: defaultY,
      z: targetZ,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        if (controlsRef.current) {
          controlsRef.current.target.set(0, 1.45, 0.3);
          controlsRef.current.update();
        }
      },
    });
  }, [targetZ, defaultY, isLoaded, arActive, vrActive, blessingActive, aartiActive, camera]);

  // Blessing camera sequence
  useEffect(() => {
    if (!blessingActive || !controlsRef.current || arActive) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (onBlessingComplete) onBlessingComplete();
      },
    });

    const zoomZ = 12.0 * (isPortrait ? 1.2 : 1.0);
    const zoomY = isPortrait ? 1.6 : 1.45;

    // Intimate zoom into divine darshan portrait shot
    tl.to(camera.position, {
      x: 0,
      y: zoomY,
      z: zoomZ,
      duration: 2.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        controlsRef.current.target.set(0, 1.5, 0.3);
        controlsRef.current.update();
      },
    });

    // Hold reverently for 3.8 seconds
    tl.to({}, { duration: 3.8 });

    // Smoothly return to hero frame
    tl.to(camera.position, {
      x: 0,
      y: defaultY,
      z: targetZ,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: () => {
        controlsRef.current.target.set(0, 1.45, 0.3);
        controlsRef.current.update();
      },
    });

    return () => tl.kill();
  }, [blessingActive, arActive, camera, onBlessingComplete, defaultY, targetZ, isPortrait]);

  // Aarti camera sequence
  useEffect(() => {
    if (!aartiActive || !controlsRef.current || arActive) return;

    const tl = gsap.timeline();
    const aartiZ = 14.5 * (isPortrait ? 1.2 : 1.0);
    const aartiY = isPortrait ? 1.55 : 1.45;

    // Cinematic push to intimate Aarti perspective
    tl.to(camera.position, {
      x: 0,
      y: aartiY,
      z: aartiZ,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        controlsRef.current.target.set(0, 1.45, 0.4);
        controlsRef.current.update();
      },
    });

    // Hold steady during the 22s aarti
    tl.to({}, { duration: 17.5 });

    // Smoothly return to hero frame
    tl.to(camera.position, {
      x: 0,
      y: defaultY,
      z: targetZ,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: () => {
        controlsRef.current.target.set(0, 1.45, 0.3);
        controlsRef.current.update();
      },
    });

    return () => tl.kill();
  }, [aartiActive, arActive, camera, defaultY, targetZ, isPortrait]);

  // Mouse Parallax on Desktop (disabled on touch devices to avoid touch jitter)
  useEffect(() => {
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (isTouch) return;

    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseParallaxRef.current = { x: nx * 0.28, y: ny * 0.15 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!isLoaded || blessingActive || aartiActive || vrActive || arActive || !controlsRef.current) return;
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouseParallaxRef.current.x,
      0.03
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      defaultY + mouseParallaxRef.current.y,
      0.03
    );
    controlsRef.current.update();
  });

  // OrbitControls is strictly disabled during native WebXR to prevent fighting XRFrame.getViewerPose
  // In fallback AR passthrough or normal 3D temple mode, OrbitControls is enabled with full 360° azimuth
  const controlsEnabled = isLoaded && !vrActive && (!arActive || !isWebXRAR);

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={controlsEnabled}
      enableDamping
      dampingFactor={0.06}
      enablePan={false}
      minDistance={arActive ? 1.2 : 3.5}
      maxDistance={arActive ? 10.0 : 35.0}
      minPolarAngle={arActive ? 0.05 : Math.PI / 3.2}
      maxPolarAngle={Math.PI / 2 + 0.05}
      minAzimuthAngle={arActive ? -Infinity : -Math.PI / 3.2}
      maxAzimuthAngle={arActive ? Infinity : Math.PI / 3.2}
      rotateSpeed={0.65}
      zoomSpeed={0.6}
    />
  );
}
