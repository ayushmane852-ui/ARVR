import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
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

function SceneLighting({ blessingActive, isDiyaLit }) {
  return (
    <>
      {/* Deep Temple Atmospheric Fog */}
      <color attach="background" args={['#070503']} />
      <fog attach="fog" args={['#070503', 6.0, 30.0]} />

      {/* Warm Ambient Fill for Deep Sanctum Atmosphere */}
      <ambientLight 
        color="#3a2216" 
        intensity={blessingActive ? 0.7 : 1.2} 
      />

      {/* Main Royal Sanctum Sunbeam / Ambient Key Light */}
      <directionalLight
        position={[2.5, 12.0, 7.5]}
        intensity={blessingActive ? 1.4 : 2.2}
        color="#fff1d6"
      />

      {/* Warm Golden Candle Bounce Light when Diyas are lit */}
      {isDiyaLit && (
        <pointLight
          position={[0, -1.0, 3.0]}
          color="#ff8800"
          intensity={3.2}
          distance={14.0}
          decay={1}
        />
      )}
    </>
  );
}

function ExperienceCanvas({
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
      camera={{ position: [0, 0.95, 8.8], fov: 48 }}
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
        blessingActive={blessingActive}
        onBlessingComplete={onBlessingComplete}
        vrActive={vrSessionActive}
      />

      <Suspense fallback={null}>
        <GanapatiTemple blessingActive={blessingActive} />
        <Rangoli position={[0, -2.86, 4.4]} />
        <Diya isLit={isDiyaLit} />
        <Bell ringTriggerTime={ringTriggerTime} />
        <FlowerOffering offerings={flowerOfferings} />
        <ModakOffering modakOfferings={modakOfferings} />
        <Particles blessingActive={blessingActive} />
      </Suspense>
    </Canvas>
  );
}

export default function GanapatiExperience() {
  const { progress, active } = useProgress();
  const [isLoaded, setIsLoaded] = useState(false);
  // Default to lit diyas for warm divine sanctum atmosphere matching reference mockup
  const [isDiyaLit, setIsDiyaLit] = useState(true);
  const [ringTriggerTime, setRingTriggerTime] = useState(-10);
  const [flowerOfferings, setFlowerOfferings] = useState([]);
  const [modakOfferings, setModakOfferings] = useState([]);
  const [blessingActive, setBlessingActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [vrSessionActive, setVrSessionActive] = useState(false);

  // Smooth loading transition
  useEffect(() => {
    if (!active && progress >= 100) {
      const timer = setTimeout(() => setIsLoaded(true), 600);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      soundEngine.stopAmbience();
    };
  }, []);

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
    setRingTriggerTime(performance.now() / 1000);
  }, []);

  // Action 3: Offer Flowers
  const handleOfferFlowers = useCallback(() => {
    soundEngine.init();
    soundEngine.startAmbience();
    soundEngine.playFlowerSound();

    const newOffering = {
      id: Date.now() + Math.random(),
      startTime: performance.now() / 1000,
      startPos: [(Math.random() - 0.5) * 1.4, -0.6, 7.5],
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
      startPos: [(Math.random() - 0.5) * 1.0, -0.6, 7.0],
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
      {/* 1. Loading Overlay */}
      {!isLoaded && <LoadingOverlay progress={progress} />}

      {/* 2. Interactive 3D Temple & Ganapati Canvas */}
      <ExperienceCanvas
        blessingActive={blessingActive}
        onBlessingComplete={handleBlessingComplete}
        isDiyaLit={isDiyaLit}
        ringTriggerTime={ringTriggerTime}
        flowerOfferings={flowerOfferings}
        modakOfferings={modakOfferings}
        vrSessionActive={vrSessionActive}
      />

      {/* 3. Glassmorphic UI Toolbar & Overlays */}
      <ExperienceUI
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
