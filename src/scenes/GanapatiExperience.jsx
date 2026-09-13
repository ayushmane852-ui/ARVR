import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useProgress, useGLTF } from '@react-three/drei';
import { AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

import GanapatiTemple from '../components/vr-ganapati/GanapatiTemple';
import Diya from '../components/vr-ganapati/Diya';
import Bell from '../components/vr-ganapati/Bell';
import FlowerOffering from '../components/vr-ganapati/FlowerOffering';
import ModakOffering from '../components/vr-ganapati/ModakOffering';
import Particles from '../components/vr-ganapati/Particles';
import Rangoli from '../components/vr-ganapati/Rangoli';
import CameraController from '../components/vr-ganapati/CameraController';
import ExperienceUI from '../components/vr-ganapati/ExperienceUI';
import LoadingOverlay from '../components/vr-ganapati/LoadingOverlay';
import { soundEngine } from '../components/vr-ganapati/AudioController';
import CaptureModal, { generateDevotionalFrame } from '../components/vr-ganapati/CaptureModal';
import AartiAnimation from '../components/vr-ganapati/AartiAnimation';
import ARPlacementReticle from '../components/vr-ganapati/ARPlacementReticle';
import WebXRHitTestManager from '../components/vr-ganapati/WebXRHitTestManager';

// Preload heavy 3D assets immediately so the browser downloads and decodes them in parallel
useGLTF.preload('/models/temple.glb');
useGLTF.preload('/models/diya.glb');
useGLTF.preload('/models/bell.glb');
useGLTF.preload('/models/flower.glb');

// WebGL Pre-compilation & Warm-up component:
// Forces the GPU to compile all shader programs, bind textures, and render warmup frames
// BEFORE the temple scene is shown to the user, eliminating initial frame drops and lag completely.
function SceneWarmup({ onReady, onGLReady }) {
  const { gl, scene, camera } = useThree();
  const warmedRef = useRef(false);

  useEffect(() => {
    if (onGLReady) onGLReady(gl);
  }, [gl, onGLReady]);

  useEffect(() => {
    if (warmedRef.current) return;

    try {
      gl.compile(scene, camera);
    } catch (e) {
      // Shaders already compiled or partial compile
    }

    let frames = 0;
    let animId;
    const flushFrames = () => {
      frames++;
      if (frames >= 3) {
        warmedRef.current = true;
        if (onReady) onReady();
      } else {
        animId = requestAnimationFrame(flushFrames);
      }
    };
    animId = requestAnimationFrame(flushFrames);

    return () => cancelAnimationFrame(animId);
  }, [gl, scene, camera, onReady]);

  return null;
}

function SceneLighting({ blessingActive, isDiyaLit, arModeActive = false }) {
  if (arModeActive) {
    return (
      <>
        {/* Bright, balanced natural ambient lighting for real-room camera passthrough */}
        <ambientLight color="#ffffff" intensity={1.8} />
        <directionalLight position={[3, 10, 5]} intensity={2.6} color="#fff6e8" />
        <directionalLight position={[-3, 6, -3]} intensity={1.2} color="#fed7aa" />
        {isDiyaLit && (
          <pointLight
            position={[0, -0.5, 2.0]}
            color="#ff8800"
            intensity={3.8}
            distance={10.0}
          />
        )}
      </>
    );
  }

  return (
    <>
      {/* Deep Temple Atmospheric Fog */}
      <color attach="background" args={['#0e0906']} />
      <fog attach="fog" args={['#0e0906', isDiyaLit ? 7.0 : 4.5, 32.0]} />

      {/* Dim Sanctum Fill: Very dim deep brown when lights off, warm temple stone reflections when diyas lit */}
      <ambientLight 
        color={isDiyaLit ? "#543318" : "#221309"} 
        intensity={isDiyaLit ? (blessingActive ? 1.0 : 1.8) : 0.25} 
      />

      {/* Main Royal Sanctum Sunbeam / Ambient Key Light */}
      <directionalLight
        position={[2.5, 12.0, 7.5]}
        intensity={isDiyaLit ? (blessingActive ? 1.8 : 2.6) : 0.08}
        color="#fff1d6"
      />

      {/* Warm Golden Candle Bounce Light when Diyas are lit */}
      {isDiyaLit && (
        <pointLight
          position={[0, -1.0, 3.0]}
          color="#ff8800"
          intensity={3.8}
          distance={14.0}
          decay={1}
        />
      )}
    </>
  );
}

// Meditative 360° Devotional Auto-Spin in AR Mode
function ARAutoRotator({ active, placed, autoRotate, onRotateDelta }) {
  useFrame((state, delta) => {
    if (!active || !placed || !autoRotate || !onRotateDelta) return;
    onRotateDelta(delta * 0.32); // Smooth calm 360° rotation (1 full turn in ~20s)
  });
  return null;
}

// Optional WebXR Light Estimation to dynamically balance room illumination
function ARLightEstimator({ active }) {
  const { gl } = useThree();
  const probeRef = useRef(null);
  const lightRef = useRef();

  useEffect(() => {
    if (!active) return;
    const session = gl.xr?.getSession?.();
    if (session && typeof session.requestLightProbe === 'function') {
      session.requestLightProbe().then((probe) => {
        probeRef.current = probe;
      }).catch(() => {});
    }
  }, [active, gl.xr]);

  useFrame((state, delta, frame) => {
    if (!active || !frame || !probeRef.current || !lightRef.current) return;
    try {
      const estimate = frame.getLightEstimate?.(probeRef.current);
      if (estimate && estimate.primaryLightIntensity) {
        const { x, y, z } = estimate.primaryLightIntensity;
        const avg = (x + y + z) / 3;
        lightRef.current.intensity = Math.min(3.2, Math.max(0.7, avg * 1.8));
      }
    } catch {}
  });

  if (!active) return null;
  return <directionalLight ref={lightRef} intensity={1.6} color="#fff8e8" position={[0, 6, 4]} />;
}

function ExperienceCanvas({
  isLoaded,
  onSceneReady,
  onGLReady,
  blessingActive,
  onBlessingComplete,
  aartiActive,
  onAartiComplete,
  isDiyaLit,
  ringTriggerTime,
  flowerOfferings,
  modakOfferings,
  vrSessionActive,
  arModeActive = false,
  isWebXRAR = false,
  arPlaced = false,
  arScale = 0.35,
  arPosition = [0, -1.2, 5.0],
  arRotation = [0, 0, 0],
  onPlaceAR,
  onAnchorUpdate,
  surfaceDetected = false,
  onSurfaceStatusChange,
  onTrackingStateChange,
  autoRotate360 = false,
  onRotateDelta,
  reticleRef,
}) {
  return (
    <Canvas
      shadows
      dpr={arModeActive ? [1, 1.1] : (typeof window !== 'undefined' && window.innerWidth < 768 ? [1, 1.2] : [1, 1.5])}
      camera={{ position: [0, 1.35, 20.0], fov: 55 }}
      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.25,
        powerPreference: 'high-performance',
      }}
      className="w-full h-full"
    >
      <SceneLighting blessingActive={blessingActive} isDiyaLit={isDiyaLit} arModeActive={arModeActive} />

      <CameraController
        isLoaded={isLoaded}
        blessingActive={blessingActive}
        onBlessingComplete={onBlessingComplete}
        aartiActive={aartiActive}
        vrActive={vrSessionActive}
        arActive={arModeActive}
        isWebXRAR={isWebXRAR}
        arPosition={arPosition}
        arScale={arScale}
        isDiyaLit={isDiyaLit}
      />

      <Suspense fallback={null}>
        <WebXRHitTestManager
          active={arModeActive && isWebXRAR}
          placed={arPlaced}
          onPlace={onPlaceAR}
          onAnchorUpdate={onAnchorUpdate}
          onSurfaceStatusChange={onSurfaceStatusChange}
          onTrackingStateChange={onTrackingStateChange}
          reticleRef={reticleRef}
        />
        <ARPlacementReticle
          ref={reticleRef}
          visible={arModeActive && !arPlaced}
          isWebXR={isWebXRAR}
          surfaceDetected={surfaceDetected}
          onPlace={() => onPlaceAR()}
        />
        <ARAutoRotator
          active={arModeActive}
          placed={arPlaced}
          autoRotate={autoRotate360}
          onRotateDelta={onRotateDelta}
        />
        <ARLightEstimator active={arModeActive && isWebXRAR} />

        <group
          position={arModeActive ? arPosition : [0, 0, 0]}
          scale={arModeActive ? (arPlaced ? arScale : 0) : 1}
          rotation={arModeActive ? arRotation : [0, 0, 0]}
        >
          {/* Ground Contact Shadow (casts real soft shadows onto physical floor/table) */}
          {arModeActive && (
            <mesh position={[0, 0.002, 0.8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[12, 12]} />
              <shadowMaterial opacity={0.42} />
            </mesh>
          )}

          {/* Calibrate base height: model base at y = -3.0 offset by +3.0 sits flush at y = 0.0 on floor/desk */}
          <group position={arModeActive ? [0, 3.0, 0] : [0, 0, 0]}>
            <GanapatiTemple
              blessingActive={blessingActive}
              isDiyaLit={isDiyaLit}
              arModeActive={arModeActive}
            />
            <Rangoli position={[0, -2.99, 3.8]} />
            <Diya isLit={isDiyaLit} arModeActive={arModeActive} />
            {!arModeActive && <Bell ringTriggerTime={ringTriggerTime} />}
            <FlowerOffering offerings={flowerOfferings} />
            <ModakOffering modakOfferings={modakOfferings} />
            <Particles blessingActive={blessingActive} isDiyaLit={isDiyaLit} arModeActive={arModeActive} />
            <AartiAnimation active={aartiActive} onAartiComplete={onAartiComplete} />
          </group>
        </group>
        <SceneWarmup onReady={onSceneReady} onGLReady={onGLReady} />
      </Suspense>
    </Canvas>
  );
}

export default function GanapatiExperience() {
  const { progress, active } = useProgress();
  const [sceneReady, setSceneReady] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  // Default to lights OFF with dim atmospheric sanctum and radiant backlight behind idol
  const [isDiyaLit, setIsDiyaLit] = useState(false);
  const [ringTriggerTime, setRingTriggerTime] = useState(-10);
  const [flowerOfferings, setFlowerOfferings] = useState([]);
  const [modakOfferings, setModakOfferings] = useState([]);
  const [blessingActive, setBlessingActive] = useState(false);
  const [aartiActive, setAartiActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [vrSessionActive, setVrSessionActive] = useState(false);
  const [captureModalOpen, setCaptureModalOpen] = useState(false);
  const [capturedImageUrl, setCapturedImageUrl] = useState(null);
  const [isFlashActive, setIsFlashActive] = useState(false);

  // AR Mode state
  const glRef = useRef(null);
  const reticleRef = useRef(null);
  const videoRef = useRef(null);
  const pointerStartX = useRef(0);
  const isPointerDragging = useRef(false);

  const [arStream, setArStream] = useState(null);
  const [arModeActive, setArModeActive] = useState(false);
  const [isWebXRAR, setIsWebXRAR] = useState(false);
  const [arPlaced, setArPlaced] = useState(false);
  const [surfaceDetected, setSurfaceDetected] = useState(false);
  const [trackingState, setTrackingState] = useState('tracking');
  const [autoRotate360, setAutoRotate360] = useState(false);
  const [arScale, setArScale] = useState(0.35);
  const [arPosition, setArPosition] = useState([0, -1.2, 5.0]);
  const [arRotation, setArRotation] = useState([0, 0, 0]);

  const handleSceneReady = useCallback(() => {
    setSceneReady(true);
  }, []);

  // Seamless one-shot temple reveal:
  // Triggers ONLY when all 3D models are downloaded AND WebGL shaders are compiled & warmed up
  useEffect(() => {
    if (sceneReady && (!active || progress >= 100)) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 400);
      return () => clearTimeout(timer);
    }

    // Safety fallback: if scene is compiled and progress >= 95%
    const safetyTimer = setTimeout(() => {
      if (sceneReady && progress >= 95) {
        setIsLoaded(true);
      }
    }, 6000);
    return () => clearTimeout(safetyTimer);
  }, [sceneReady, active, progress]);

  // Automatically initiate spiritual background music on user gesture or once loaded
  useEffect(() => {
    const startMusicOnGesture = () => {
      soundEngine.init();
      soundEngine.startSpiritualMusic();
      window.removeEventListener('pointerdown', startMusicOnGesture);
      window.removeEventListener('keydown', startMusicOnGesture);
    };

    window.addEventListener('pointerdown', startMusicOnGesture);
    window.addEventListener('keydown', startMusicOnGesture);

    if (isLoaded) {
      soundEngine.init();
      soundEngine.startSpiritualMusic();
    }

    return () => {
      window.removeEventListener('pointerdown', startMusicOnGesture);
      window.removeEventListener('keydown', startMusicOnGesture);
      soundEngine.stopSpiritualMusic();
    };
  }, [isLoaded]);

  // Action 1: Toggle Diya
  const handleToggleDiya = useCallback(() => {
    soundEngine.init();
    soundEngine.startAmbience();
    setIsDiyaLit((prev) => {
      const next = !prev;
      if (next) {
        soundEngine.playDiyaSound();
      }
      return next;
    });
  }, []);

  // Action 2: Ring Temple Bell
  const handleRingBell = useCallback(() => {
    soundEngine.init();
    soundEngine.startAmbience();
    soundEngine.playBell();
    setRingTriggerTime(Date.now());
  }, []);

  // Action 3: Offer Flowers
  const handleOfferFlowers = useCallback(() => {
    soundEngine.init();
    soundEngine.startAmbience();
    soundEngine.playFlowerSound();

    const newOffering = {
      id: Date.now() + Math.random(),
      startTime: performance.now() / 1000,
      startPos: [(Math.random() - 0.5) * 1.6, -0.2, 9.2],
      targetPos: [
        (Math.random() - 0.5) * 1.5,
        -2.75,
        2.2 + (Math.random() - 0.5) * 0.5,
      ],
      rot: [
        0.15 + Math.random() * 0.1,
        Math.random() * Math.PI * 2,
        (Math.random() - 0.5) * 0.2,
      ],
    };

    setFlowerOfferings((prev) => {
      const updated = [...prev, newOffering];
      return updated.length > 16 ? updated.slice(updated.length - 16) : updated;
    });
  }, []);

  // Action 4: Offer Modak
  const handleOfferModak = useCallback(() => {
    soundEngine.init();
    soundEngine.startAmbience();
    soundEngine.playDiyaSound();

    const newModak = {
      id: Date.now() + Math.random(),
      startTime: performance.now() / 1000,
      startPos: [(Math.random() - 0.5) * 1.2, -0.2, 8.8],
      targetPos: [
        (Math.random() - 0.5) * 0.6,
        -2.75,
        2.2 + (Math.random() - 0.5) * 0.4,
      ],
      rot: [0, Math.random() * Math.PI * 2, 0],
    };

    setModakOfferings((prev) => {
      const updated = [...prev, newModak];
      return updated.length > 10 ? updated.slice(updated.length - 10) : updated;
    });
  }, []);

  // Action 5: Take Blessings
  const handleTakeBlessings = useCallback(() => {
    if (blessingActive) return;
    soundEngine.init();
    soundEngine.startAmbience();
    soundEngine.playBlessingSound();
    setBlessingActive(true);
  }, [blessingActive]);

  const handleBlessingComplete = useCallback(() => {
    setBlessingActive(false);
  }, []);

  // Action 6: Perform Aarti
  const handlePerformAarti = useCallback(() => {
    if (aartiActive) return;
    soundEngine.init();
    soundEngine.startAmbience();
    if (!isDiyaLit) {
      setIsDiyaLit(true);
      soundEngine.playDiyaSound();
    }
    soundEngine.startAartiMusic();
    setAartiActive(true);
  }, [aartiActive, isDiyaLit]);

  const handleAartiComplete = useCallback(() => {
    soundEngine.stopAartiMusic();
    setAartiActive(false);
  }, []);

  // Audio mute/unmute
  const handleToggleMute = useCallback(() => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundEngine.startAmbience();
    }
  }, []);

  // WebXR Launch
  const handleEnterVR = useCallback(() => {
    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
        if (supported) {
          navigator.xr.requestSession('immersive-vr', {
            optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking'],
          }).then((session) => {
            setVrSessionActive(true);
            session.addEventListener('end', () => setVrSessionActive(false));
          }).catch(() => {});
        }
      });
      return true;
    }
    return false;
  }, []);

  // Clean up AR camera stream on unmount
  useEffect(() => {
    return () => {
      if (arStream) {
        arStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [arStream]);

  // AR Mode Handlers: Native ARCore WebXR Hit-Testing with Universal Camera Fallback
  const handleToggleAR = useCallback(async () => {
    if (arModeActive) {
      if (glRef.current?.xr?.isPresenting) {
        const session = glRef.current.xr.getSession();
        if (session) {
          session.end().catch(() => {});
        }
      }
      if (arStream) {
        arStream.getTracks().forEach((t) => t.stop());
        setArStream(null);
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setArModeActive(false);
      setArPlaced(false);
      setIsWebXRAR(false);
      setSurfaceDetected(false);
      setAutoRotate360(false);
      return;
    }

    // 1. Check if device natively supports WebXR AR (ARCore on Android Chrome / Quest)
    let hasNativeXR = false;
    if (navigator.xr) {
      try {
        hasNativeXR = await navigator.xr.isSessionSupported('immersive-ar');
      } catch {
        hasNativeXR = false;
      }
    }

    if (hasNativeXR && glRef.current) {
      try {
        const rootEl = document.getElementById('vr-ganapati-root') || document.body;
        const session = await navigator.xr.requestSession('immersive-ar', {
          requiredFeatures: ['hit-test'],
          optionalFeatures: ['dom-overlay', 'local-floor', 'anchors', 'plane-detection', 'light-estimation'],
          domOverlay: { root: rootEl },
        });

        glRef.current.xr.enabled = true;
        await glRef.current.xr.setSession(session);

        setIsWebXRAR(true);
        setArModeActive(true);
        setArPlaced(false);
        setSurfaceDetected(false);
        setAutoRotate360(false);
        soundEngine.init();
        soundEngine.playBell();

        session.addEventListener('end', () => {
          setArModeActive(false);
          setIsWebXRAR(false);
          setArPlaced(false);
          setSurfaceDetected(false);
          setAutoRotate360(false);
        });
        return;
      } catch (err) {
        console.warn('Native WebXR session launch failed, falling back to camera stream:', err);
      }
    }

    // 2. Universal Camera Passthrough Fallback (iOS Safari, Desktop webcams, etc.)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
      setArStream(stream);
      setIsWebXRAR(false);
      setArModeActive(true);
      setArPlaced(false);
      setSurfaceDetected(false);
      setAutoRotate360(false);
      soundEngine.init();
      soundEngine.playBell();
    } catch (err) {
      console.error('AR camera access error:', err);
      alert('Camera access is required for AR mode. Please grant camera permission.');
    }
  }, [arModeActive, arStream]);

  const handlePlaceAR = useCallback((customPos = null) => {
    if (customPos) {
      setArPosition(customPos);
    }
    setArPlaced(true);
    soundEngine.playFlowerSound();
  }, []);

  const handleAnchorUpdate = useCallback((pos) => {
    if (pos) {
      setArPosition(pos);
    }
  }, []);

  const handleRepositionAR = useCallback(() => {
    setArPlaced(false);
    setAutoRotate360(false);
  }, []);

  const handleScaleUp = useCallback(() => {
    setArScale((s) => Math.min(1.2, +(s + 0.05).toFixed(2)));
  }, []);

  const handleScaleDown = useCallback(() => {
    setArScale((s) => Math.max(0.15, +(s - 0.05).toFixed(2)));
  }, []);

  // 360° Content Rotation Handlers (used in both native WebXR & fallback AR)
  const handleRotateDelta = useCallback((delta) => {
    setArRotation((prev) => [0, prev[1] + delta, 0]);
  }, []);

  const handleToggleAutoRotate360 = useCallback(() => {
    setAutoRotate360((prev) => !prev);
  }, []);

  const handleSetPresetAngle = useCallback((radians) => {
    setAutoRotate360(false);
    setArRotation([0, radians, 0]);
  }, []);

  // Touch & Mouse Drag to Rotate Lord Ganesha 360° on canvas
  const handlePointerDown = useCallback((e) => {
    if (!arModeActive || !arPlaced) return;
    if (e.target.closest && (e.target.closest('button') || e.target.closest('header'))) return;
    pointerStartX.current = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    isPointerDragging.current = true;
  }, [arModeActive, arPlaced]);

  const handlePointerMove = useCallback((e) => {
    if (!isPointerDragging.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const deltaX = clientX - pointerStartX.current;
    pointerStartX.current = clientX;
    if (Math.abs(deltaX) > 0.4) {
      setArRotation((prev) => [0, prev[1] + deltaX * 0.012, 0]);
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    isPointerDragging.current = false;
  }, []);

  // Action: Capture Darshan Snapshot (supports live room video in AR mode)
  const handleCaptureDarshan = useCallback(async () => {
    soundEngine.init();
    soundEngine.playCameraShutter();
    setIsFlashActive(true);
    setTimeout(() => setIsFlashActive(false), 220);

    try {
      const canvas = document.querySelector('canvas');
      if (!canvas) return;
      const framedUrl = await generateDevotionalFrame(
        canvas,
        arModeActive ? videoRef.current : null
      );
      setCapturedImageUrl(framedUrl);
      setCaptureModalOpen(true);
    } catch (err) {
      console.error('Error capturing darshan:', err);
    }
  }, [arModeActive]);

  return (
    <div id="vr-ganapati-root" className="relative w-full h-screen h-[100dvh] overflow-hidden bg-[#070503]">
      {/* 0. Live Camera Video Stream for Fallback AR Passthrough Mode (hidden in native WebXR) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-700 ${
          arModeActive && !isWebXRAR ? 'opacity-100' : 'opacity-0 hidden'
        }`}
      />

      {/* 1. Loading Overlay with smooth fade-out exit */}
      <AnimatePresence>
        {!isLoaded && <LoadingOverlay progress={progress} />}
      </AnimatePresence>

      {/* 2. Interactive 3D Temple & Ganapati Canvas (smooth one-shot reveal once loaded & compiled) */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative z-10 w-full h-full transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ExperienceCanvas
          isLoaded={isLoaded}
          onSceneReady={handleSceneReady}
          onGLReady={(gl) => { glRef.current = gl; }}
          blessingActive={blessingActive}
          onBlessingComplete={handleBlessingComplete}
          aartiActive={aartiActive}
          onAartiComplete={handleAartiComplete}
          isDiyaLit={isDiyaLit}
          ringTriggerTime={ringTriggerTime}
          flowerOfferings={flowerOfferings}
          modakOfferings={modakOfferings}
          vrSessionActive={vrSessionActive}
          arModeActive={arModeActive}
          isWebXRAR={isWebXRAR}
          arPlaced={arPlaced}
          arScale={arScale}
          arPosition={arPosition}
          arRotation={arRotation}
          onPlaceAR={handlePlaceAR}
          onAnchorUpdate={handleAnchorUpdate}
          surfaceDetected={surfaceDetected}
          onSurfaceStatusChange={setSurfaceDetected}
          onTrackingStateChange={setTrackingState}
          autoRotate360={autoRotate360}
          onRotateDelta={handleRotateDelta}
          reticleRef={reticleRef}
        />
      </div>

      {/* 3. Glassmorphic UI Toolbar & Overlays */}
      <ExperienceUI
        isLoaded={isLoaded}
        isDiyaLit={isDiyaLit}
        onToggleDiya={handleToggleDiya}
        onRingBell={handleRingBell}
        onOfferFlowers={handleOfferFlowers}
        onOfferModak={handleOfferModak}
        onTakeBlessings={handleTakeBlessings}
        blessingActive={blessingActive}
        aartiActive={aartiActive}
        onPerformAarti={handlePerformAarti}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onEnterVR={handleEnterVR}
        onCaptureDarshan={handleCaptureDarshan}
        arModeActive={arModeActive}
        isWebXRAR={isWebXRAR}
        arPlaced={arPlaced}
        arScale={arScale}
        surfaceDetected={surfaceDetected}
        trackingState={trackingState}
        autoRotate360={autoRotate360}
        onToggleAutoRotate360={handleToggleAutoRotate360}
        onSetPresetAngle={handleSetPresetAngle}
        onToggleAR={handleToggleAR}
        onScaleUp={handleScaleUp}
        onScaleDown={handleScaleDown}
        onReposition={handleRepositionAR}
      />

      {/* 4. Camera Shutter Flash Effect */}
      <div
        className={`fixed inset-0 z-50 bg-white pointer-events-none transition-opacity duration-200 ${
          isFlashActive ? 'opacity-80' : 'opacity-0'
        }`}
      />

      {/* 5. Sacred Darshan Capture & Share Modal */}
      <CaptureModal
        isOpen={captureModalOpen}
        onClose={() => setCaptureModalOpen(false)}
        imageDataUrl={capturedImageUrl}
      />
    </div>
  );
}
