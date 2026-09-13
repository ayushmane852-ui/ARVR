import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
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

// Preload heavy 3D assets immediately so the browser downloads and decodes them in parallel
useGLTF.preload('/models/temple.glb');
useGLTF.preload('/models/diya.glb');
useGLTF.preload('/models/bell.glb');
useGLTF.preload('/models/flower.glb');

// WebGL Pre-compilation & Warm-up component:
// Forces the GPU to compile all shader programs, bind textures, and render warmup frames
// BEFORE the temple scene is shown to the user, eliminating initial frame drops and lag completely.
function SceneWarmup({ onReady }) {
  const { gl, scene, camera } = useThree();
  const warmedRef = useRef(false);

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

function SceneLighting({ blessingActive, isDiyaLit }) {
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

function ExperienceCanvas({
  isLoaded,
  onSceneReady,
  blessingActive,
  onBlessingComplete,
  isDiyaLit,
  ringTriggerTime,
  flowerOfferings,
  modakOfferings,
  vrSessionActive,
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.35, 20.0], fov: 55 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.25,
        powerPreference: 'high-performance',
      }}
      className="w-full h-full"
    >
      <SceneLighting blessingActive={blessingActive} isDiyaLit={isDiyaLit} />

      <CameraController
        isLoaded={isLoaded}
        blessingActive={blessingActive}
        onBlessingComplete={onBlessingComplete}
        vrActive={vrSessionActive}
        isDiyaLit={isDiyaLit}
      />

      <Suspense fallback={null}>
        <GanapatiTemple blessingActive={blessingActive} isDiyaLit={isDiyaLit} />
        <Rangoli position={[0, -2.99, 3.8]} />
        <Diya isLit={isDiyaLit} />
        <Bell ringTriggerTime={ringTriggerTime} />
        <FlowerOffering offerings={flowerOfferings} />
        <ModakOffering modakOfferings={modakOfferings} />
        <Particles blessingActive={blessingActive} />
        <SceneWarmup onReady={onSceneReady} />
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
  const [isMuted, setIsMuted] = useState(false);
  const [vrSessionActive, setVrSessionActive] = useState(false);

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

  return (
    <div className="relative w-full h-screen h-[100dvh] overflow-hidden bg-[#070503]">
      {/* 1. Loading Overlay with smooth fade-out exit */}
      <AnimatePresence>
        {!isLoaded && <LoadingOverlay progress={progress} />}
      </AnimatePresence>

      {/* 2. Interactive 3D Temple & Ganapati Canvas (smooth one-shot reveal once loaded & compiled) */}
      <div
        className={`w-full h-full transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ExperienceCanvas
          isLoaded={isLoaded}
          onSceneReady={handleSceneReady}
          blessingActive={blessingActive}
          onBlessingComplete={handleBlessingComplete}
          isDiyaLit={isDiyaLit}
          ringTriggerTime={ringTriggerTime}
          flowerOfferings={flowerOfferings}
          modakOfferings={modakOfferings}
          vrSessionActive={vrSessionActive}
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
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onEnterVR={handleEnterVR}
      />
    </div>
  );
}
