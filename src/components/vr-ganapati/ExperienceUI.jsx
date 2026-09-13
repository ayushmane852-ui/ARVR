import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Bell as BellIcon, 
  Flower2, 
  Volume2, 
  VolumeX, 
  Glasses, 
  ArrowLeft,
  Maximize2,
  Camera,
  Sparkles,
  RotateCw
} from 'lucide-react';

// Custom Modak SVG Icon
function ModakIcon({ className = "w-6 h-6" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 2C12 2 7 9 7 14C7 18 9 21 12 21C15 21 17 18 17 14C17 9 12 2 12 2Z" />
      <path d="M12 2V21" strokeDasharray="1 1" />
      <path d="M9.5 8C9.5 8 8 11 8 14" />
      <path d="M14.5 8C14.5 8 16 11 16 14" />
    </svg>
  );
}

// Custom Namaste / Blessings SVG Icon
function NamasteIcon({ className = "w-6 h-6" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M7 11C7 9.3 8.3 8 10 8C10.7 8 11.4 8.3 11.9 8.7L12 8.8L12.1 8.7C12.6 8.3 13.3 8 14 8C15.7 8 17 9.3 17 11C17 14.5 12 20 12 20C12 20 7 14.5 7 11Z" opacity="0.3" />
      <path d="M10 5L12 2L14 5" />
      <path d="M12 2V18" />
      <path d="M8 9C6.5 11 6.5 14 8 16L12 21L16 16C17.5 14 17.5 11 16 9" />
    </svg>
  );
}

// Custom Ganesha Line-art Header Icon
function GaneshaEmblem({ className = "w-9 h-9" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 48 48" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M24 4V10" />
      <path d="M20 6C20 6 24 4 28 6" />
      {/* Crown / Mukut */}
      <path d="M18 10L24 6L30 10L24 13L18 10Z" />
      {/* Left Ear */}
      <path d="M18 12C14 12 10 15 10 20C10 24 14 26 17 26" />
      {/* Right Ear */}
      <path d="M30 12C34 12 38 15 38 20C38 24 34 26 31 26" />
      {/* Head / Forehead */}
      <circle cx="24" cy="18" r="1.5" fill="currentColor" />
      {/* Tilak */}
      <path d="M21 16H27" />
      <path d="M22 14H26" />
      {/* Curved Elephant Trunk */}
      <path d="M24 20C24 24 21 28 21 32C21 36 24 38 27 38C30 38 32 36 32 34C32 32 30 31 28 32" />
      {/* Modak on trunk tip */}
      <circle cx="27" cy="34" r="1" fill="currentColor" />
    </svg>
  );
}

// Custom Aarti Thali & Flame SVG Icon
function AartiIcon({ className = "w-6 h-6" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="18" rx="9" ry="3.5" />
      <path d="M12 4C10 7 9 10 9 13C9 14.7 10.3 16 12 16C13.7 16 15 14.7 15 13C15 10 14 7 12 4Z" />
      <path d="M6 10L4 9" />
      <path d="M18 10L20 9" />
      <path d="M12 1.5V3" />
    </svg>
  );
}

export default function ExperienceUI({
  isLoaded = false,
  isDiyaLit,
  onToggleDiya,
  onRingBell,
  onOfferFlowers,
  onOfferModak,
  onTakeBlessings,
  blessingActive,
  aartiActive = false,
  onPerformAarti,
  isMuted,
  onToggleMute,
  onEnterVR,
  onCaptureDarshan,
  arModeActive = false,
  isWebXRAR = false,
  arPlaced = false,
  arScale = 0.35,
  surfaceDetected = false,
  trackingState = 'tracking',
  autoRotate360 = false,
  onToggleAutoRotate360,
  onSetPresetAngle,
  onToggleAR,
  onScaleUp,
  onScaleDown,
  onReposition,
}) {
  const navigate = useNavigate();
  const [vrNotice, setVrNotice] = useState(null);

  // Subtle mobile haptic feedback
  const triggerHaptic = (duration = 20) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(duration);
      } catch {}
    }
  };

  // Global Keyboard Shortcuts for Desktop PC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      if (e.code === 'Space' || key === 'r') {
        e.preventDefault();
        triggerHaptic(30);
        onRingBell?.();
      } else if (key === 'd') {
        e.preventDefault();
        triggerHaptic(25);
        onToggleDiya?.();
      } else if (key === 'f') {
        e.preventDefault();
        triggerHaptic(15);
        onOfferFlowers?.();
      } else if (key === 'm') {
        e.preventDefault();
        triggerHaptic(20);
        onOfferModak?.();
      } else if (key === 'b') {
        e.preventDefault();
        if (!blessingActive) {
          triggerHaptic(35);
          onTakeBlessings?.();
        }
      } else if (key === 'a') {
        e.preventDefault();
        if (!aartiActive) {
          triggerHaptic(35);
          onPerformAarti?.();
        }
      } else if (key === 'c') {
        e.preventDefault();
        triggerHaptic(40);
        onCaptureDarshan?.();
      } else if (key === 'escape') {
        if (arModeActive) {
          e.preventDefault();
          triggerHaptic(20);
          onToggleAR?.();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    onRingBell,
    onToggleDiya,
    onOfferFlowers,
    onOfferModak,
    onTakeBlessings,
    blessingActive,
    onPerformAarti,
    aartiActive,
    onCaptureDarshan,
    arModeActive,
    onToggleAR,
  ]);

  const handleVrClick = () => {
    triggerHaptic(25);
    if (onEnterVR) {
      const started = onEnterVR();
      if (!started) {
        setVrNotice("WebXR headset not detected. Enjoy full 3D interactive mode with mouse or touch gestures!");
        setTimeout(() => setVrNotice(null), 5000);
      }
    }
  };

  const handleFullscreen = () => {
    triggerHaptic(20);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 sm:px-6 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.6rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] select-none transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      
      {/* ============================================================ */}
      {/* 1. TOP BAR */}
      {/* ============================================================ */}
      <header className="flex items-center justify-between w-full">
        
        {/* Top-Left Branding & Back Link */}
        <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
          {/* Back to Home Button */}
          <button
            onClick={() => navigate('/')}
            className="p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-amber-500/20 text-amber-200/80 hover:text-amber-100 transition-all backdrop-blur-md shadow-lg cursor-pointer"
            title="Return to ARVR Club Home"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Sacred Ganesha Logo + Title */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">
              <GaneshaEmblem className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-serif font-bold tracking-widest text-amber-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                VR Ganapati
              </h1>
              <p className="text-[10px] sm:text-xs text-amber-300/75 tracking-wider font-light drop-shadow">
                Experience the divine, in your own space
              </p>
            </div>
          </div>
        </div>

        {/* Top-Right Controls: Audio + Fullscreen + ENTER VR */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Audio Mute/Unmute */}
          <button
            onClick={() => {
              triggerHaptic(15);
              onToggleMute();
            }}
            className="p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-amber-500/20 text-amber-200/80 hover:text-amber-100 transition-all backdrop-blur-md shadow-lg cursor-pointer"
            title={isMuted ? "Unmute Temple Audio" : "Mute Temple Audio"}
            aria-label="Toggle Audio"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            )}
          </button>

          {/* Capture Darshan Snapshot Button */}
          <button
            onClick={() => {
              triggerHaptic(40);
              onCaptureDarshan();
            }}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/40 hover:bg-black/70 border border-amber-500/20 hover:border-amber-400/50 text-amber-200/90 hover:text-amber-100 transition-all backdrop-blur-md shadow-lg cursor-pointer group"
            title="Capture & Share Darshan (Key: C)"
            aria-label="Capture Darshan"
          >
            <Camera className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-xs font-space font-medium tracking-wide">
              Capture
            </span>
            <kbd className="hidden lg:inline-flex items-center justify-center min-w-[14px] h-[13px] px-1 text-[8px] font-mono text-amber-300/70 bg-black/60 border border-amber-500/25 rounded">
              C
            </kbd>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={handleFullscreen}
            className="hidden sm:flex p-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-amber-500/20 text-amber-200/80 hover:text-amber-100 transition-all backdrop-blur-md shadow-lg cursor-pointer"
            title="Toggle Fullscreen"
            aria-label="Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Enter AR / Exit AR Toggle Button */}
          <button
            onClick={() => {
              triggerHaptic(20);
              onToggleAR();
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-xl transition-all cursor-pointer group ${
              arModeActive
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-semibold shadow-[0_0_20px_rgba(245,158,11,0.6)]'
                : 'bg-black/50 hover:bg-amber-950/40 border border-amber-400/40 hover:border-amber-300 text-amber-100 shadow-[0_4px_20px_rgba(0,0,0,0.6)]'
            }`}
            title={arModeActive ? "Exit AR Mode (Esc)" : "Place Ganapati in your real room via AR"}
          >
            <Sparkles className={`w-4 h-4 ${arModeActive ? 'text-black' : 'text-amber-400 group-hover:scale-110 transition-transform'}`} />
            <span className="text-xs sm:text-sm font-space font-medium tracking-wider">
              {arModeActive ? 'Exit AR' : 'Enter AR'}
            </span>
            {arModeActive && (
              <kbd className="hidden lg:inline-flex items-center justify-center px-1 text-[8px] font-mono text-black/80 bg-white/40 rounded">
                Esc
              </kbd>
            )}
          </button>

          {/* Enter VR Pill Button matching mockup */}
          <button
            onClick={handleVrClick}
            className="flex items-center gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-black/50 hover:bg-amber-950/40 border border-amber-400/40 hover:border-amber-300 backdrop-blur-xl text-amber-100 shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_0_12px_rgba(245,158,11,0.15)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all cursor-pointer group"
          >
            <Glasses className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-sm font-space font-medium tracking-wider">
              Enter VR
            </span>
          </button>
        </div>
      </header>

      {/* AR Mode Surface Placement & 360° Darshan HUD */}
      <AnimatePresence>
        {/* State 1: Scanning / Surface Detection before placement */}
        {arModeActive && !arPlaced && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 max-w-sm sm:max-w-md w-[92%] sm:w-auto bg-[#160f0b]/94 border border-amber-400/50 px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-xl text-center pointer-events-auto"
          >
            {isWebXRAR ? (
              surfaceDetected ? (
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm text-amber-200 font-semibold flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                    Flat Surface Detected (Floor/Table)!
                  </p>
                  <p className="text-[11px] text-amber-300/80">
                    Tap anywhere on screen to anchor Lord Ganesha firmly in 3D
                  </p>
                </div>
              ) : (
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm text-amber-200 font-medium">
                    🔍 Move phone slowly to scan floor or table...
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-amber-300/60 font-light">
                    Tip: Point towards rugs, edges, or table corners if floor is glossy
                  </p>
                </div>
              )
            ) : (
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm text-amber-200 font-medium">
                  📱 Point camera at flat surface & Tap Reticle to Anchor Bappa
                </p>
                <p className="text-[10px] sm:text-[11px] text-amber-300/60 font-light">
                  Enjoy full 360° touch rotation around Lord Ganesha
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* State 2: Tracking Loss Warning */}
        {arModeActive && arPlaced && isWebXRAR && (trackingState === 'paused' || trackingState === 'lost') && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-40 bg-amber-950/90 border border-amber-500/60 px-4 py-1.5 rounded-full shadow-lg backdrop-blur-lg text-center pointer-events-auto"
          >
            <p className="text-xs text-amber-200">
              ⚠️ Visual tracking paused • Move phone slowly to relocalize
            </p>
          </motion.div>
        )}

        {/* State 3: Anchored AR Controls Bar (Single sleek non-wrapping row on mobile) */}
        {arModeActive && arPlaced && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[4.9rem] sm:top-20 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center gap-1 sm:gap-2 bg-[#160f0b]/94 border border-amber-400/40 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-2xl backdrop-blur-xl pointer-events-auto text-xs text-amber-200 max-w-[96vw] whitespace-nowrap overflow-x-auto"
          >
            {/* 360° Devotional Auto-Spin Toggle */}
            <button
              onClick={() => {
                triggerHaptic(15);
                onToggleAutoRotate360?.();
              }}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all cursor-pointer font-medium focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                autoRotate360
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.6)] font-semibold'
                  : 'bg-white/10 hover:bg-white/20 border border-amber-500/30 text-amber-200'
              }`}
              title={autoRotate360 ? "Pause 360° Rotation" : "Start Serene 360° Darshan Rotation"}
            >
              <RotateCw className={`w-3.5 h-3.5 shrink-0 ${autoRotate360 ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline text-[11px] tracking-wide">360° Darshan</span>
              <span className="sm:hidden text-[10px] tracking-wide font-medium">360°</span>
            </button>

            {/* Angle Presets */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-black/40 p-0.5 rounded-full border border-amber-500/20 shrink-0">
              <button
                onClick={() => {
                  triggerHaptic(15);
                  onSetPresetAngle && onSetPresetAngle(0);
                }}
                className="px-1.5 sm:px-2 py-0.5 rounded-full hover:bg-white/15 text-[9.5px] sm:text-[10px] text-amber-300/90 font-medium cursor-pointer transition-colors focus-visible:ring-1 focus-visible:ring-amber-400"
                title="Front Facing Darshan (0°)"
              >
                Front
              </button>
              <button
                onClick={() => {
                  triggerHaptic(15);
                  onSetPresetAngle && onSetPresetAngle(Math.PI / 2);
                }}
                className="px-1.5 sm:px-2 py-0.5 rounded-full hover:bg-white/15 text-[9.5px] sm:text-[10px] text-amber-300/90 font-medium cursor-pointer transition-colors focus-visible:ring-1 focus-visible:ring-amber-400"
                title="Side Profile View (90°)"
              >
                Side
              </button>
              <button
                onClick={() => {
                  triggerHaptic(15);
                  onSetPresetAngle && onSetPresetAngle(Math.PI);
                }}
                className="px-1.5 sm:px-2 py-0.5 rounded-full hover:bg-white/15 text-[9.5px] sm:text-[10px] text-amber-300/90 font-medium cursor-pointer transition-colors focus-visible:ring-1 focus-visible:ring-amber-400"
                title="Rear Crown View (180°)"
              >
                Rear
              </button>
            </div>

            <div className="h-3.5 w-px bg-amber-500/30 mx-0.5 shrink-0" />

            {/* Size Scaling Controls */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              <button
                onClick={() => {
                  triggerHaptic(15);
                  onScaleDown?.();
                }}
                className="w-5 h-5 sm:w-auto sm:px-2 sm:py-1 rounded-full bg-white/10 hover:bg-white/20 border border-amber-500/30 flex items-center justify-center cursor-pointer font-bold text-[11px] text-amber-200 transition-colors focus-visible:ring-1 focus-visible:ring-amber-400"
                title="Smaller Size"
              >
                <span className="sm:hidden">−</span>
                <span className="hidden sm:inline">− Size</span>
              </button>
              <span className="text-[10px] sm:text-[11px] text-amber-300 font-mono px-0.5 sm:px-1 min-w-[28px] text-center">
                {Math.round(arScale * 100)}%
              </span>
              <button
                onClick={() => {
                  triggerHaptic(15);
                  onScaleUp?.();
                }}
                className="w-5 h-5 sm:w-auto sm:px-2 sm:py-1 rounded-full bg-white/10 hover:bg-white/20 border border-amber-500/30 flex items-center justify-center cursor-pointer font-bold text-[11px] text-amber-200 transition-colors focus-visible:ring-1 focus-visible:ring-amber-400"
                title="Larger Size"
              >
                <span className="sm:hidden">+</span>
                <span className="hidden sm:inline">+ Size</span>
              </button>
            </div>

            <div className="h-3.5 w-px bg-amber-500/30 mx-0.5 shrink-0" />

            {/* Reposition / Pick Up Button */}
            <button
              onClick={() => {
                triggerHaptic(20);
                onReposition?.();
              }}
              className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 cursor-pointer text-amber-300 font-medium text-[10px] sm:text-[11px] shrink-0 transition-colors focus-visible:ring-1 focus-visible:ring-amber-400"
              title="Pick up Lord Ganesha to reposition on a new surface"
            >
              <span className="hidden sm:inline">Reposition</span>
              <span className="sm:hidden">Move</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 2. LEFT SIDE DEVOTIONAL CHANT */}
      {/* ============================================================ */}
      <div className={`hidden md:block max-w-xs space-y-2 pointer-events-none transition-opacity duration-700 ${blessingActive ? 'opacity-30' : 'opacity-85'}`}>
        <h2 className="text-lg lg:text-xl font-serif tracking-widest text-amber-300/95 drop-shadow-[0_2px_12px_rgba(245,158,11,0.5)]">
          ॥ ॐ गं गणपतये नमः ॥
        </h2>
        <p className="text-xs lg:text-sm text-neutral-300 font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          May Lord Ganesha remove all obstacles and bring positivity, peace, and auspicious blessings into your life.
        </p>
      </div>

      {/* ============================================================ */}
      {/* 3. BLESSING SEQUENCE OVERLAY (Signature Experience)           */}
      {/* Positioned just above bottom dock so Ganesha's face is UNBLOCKED */}
      {/* ============================================================ */}
      <AnimatePresence>
        {blessingActive && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-end pb-32 sm:pb-36 pointer-events-none text-center px-4 z-40"
          >
            <div className="bg-[#120e0b]/85 backdrop-blur-2xl border border-amber-400/40 px-6 sm:px-8 py-3.5 sm:py-4 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_30px_rgba(245,158,11,0.25)] max-w-md">
              <span className="text-[11px] sm:text-xs font-serif tracking-[0.3em] text-amber-400/90 uppercase block mb-1">
                ॥ मंगल मूर्ति मोरया ॥
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 tracking-wider drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">
                Ganpati Bappa Morya
              </h2>
              <p className="text-[11px] sm:text-xs text-amber-200/80 font-light tracking-wide mt-1">
                May divine wisdom, boundless courage, and auspicious joy reside in your heart.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 3B. AARTI SEQUENCE SACRED BANNER                             */}
      {/* ============================================================ */}
      <AnimatePresence>
        {aartiActive && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-end pb-32 sm:pb-36 pointer-events-none text-center px-4 z-40"
          >
            <div className="bg-[#120e0b]/85 backdrop-blur-2xl border border-amber-400/40 px-6 sm:px-8 py-3.5 sm:py-4 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_30px_rgba(245,158,11,0.25)] max-w-md">
              <span className="text-[11px] sm:text-xs font-serif tracking-[0.3em] text-amber-400/90 uppercase block mb-1">
                ॥ सुखकर्ता दुःखहर्ता ॥
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 tracking-wider drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">
                जय देव जय मंगलमूर्ति
              </h2>
              <p className="text-[11px] sm:text-xs text-amber-200/80 font-light tracking-wide mt-1">
                Performing sacred Aarti • May divine light illuminate your path
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WebXR Notice Toast */}
      <AnimatePresence>
        {vrNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 pointer-events-auto z-50 bg-[#160f0b]/95 border border-amber-500/40 text-amber-200 text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl max-w-md text-center"
          >
            {vrNotice}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 4. BOTTOM BAR: FOOTER LABELS & GLASSMORPHIC INTERACTION DOCK */}
      {/* ============================================================ */}
      <footer className="w-full flex flex-col items-center gap-1.5 sm:gap-2 pointer-events-auto">
        {/* AR 360° Interaction Hint Toast */}
        {arModeActive && arPlaced && (
          <div className="flex justify-center pointer-events-none mb-0.5">
            <div className="bg-black/80 backdrop-blur-md border border-amber-500/30 px-3.5 py-0.5 rounded-full shadow-lg">
              <p className="text-[10px] sm:text-xs text-amber-300/90 tracking-wide font-light flex items-center gap-1.5">
                <RotateCw className="w-3 h-3 text-amber-400" />
                Swipe horizontally to rotate Bappa • Walk around for 360° darshan
              </p>
            </div>
          </div>
        )}
        
        {/* Floating Glassmorphic Pill Toolbar (compact height, positioned lower, safe-area aware) */}
        <div className="flex items-center justify-between sm:justify-center gap-1 sm:gap-3.5 lg:gap-5 px-2.5 sm:px-5 py-1.5 rounded-full bg-[#120e0b]/85 border border-amber-500/25 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.85),inset_0_0_15px_rgba(245,158,11,0.08)] transition-all max-w-full overflow-x-auto">
          
          {/* Action 1: Light Diya */}
          <button
            onClick={() => {
              triggerHaptic(25);
              onToggleDiya();
            }}
            className={`flex flex-col items-center justify-center min-w-[42px] sm:min-w-[56px] min-h-[44px] px-1 sm:px-2 gap-0.5 transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
              isDiyaLit ? 'text-amber-300' : 'text-amber-200/90 hover:text-amber-100'
            }`}
            title="Light Diyas (Key: D)"
          >
            <div
              className={`w-7.5 h-7.5 sm:w-9.5 sm:h-9.5 rounded-full flex items-center justify-center transition-all ${
                isDiyaLit
                  ? 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.7)] scale-105'
                  : 'bg-amber-500/15 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)] animate-pulse'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 ${isDiyaLit ? 'fill-current animate-pulse' : 'text-amber-300'}`} />
            </div>
            <span className="text-[9px] sm:text-[10.5px] font-medium tracking-wide whitespace-nowrap text-center">
              <span className="hidden sm:inline">{isDiyaLit ? 'Diyas Lit' : 'Light Diya'}</span>
              <span className="sm:hidden">{isDiyaLit ? 'Lit' : 'Diya'}</span>
            </span>
            <kbd className="hidden lg:inline-flex items-center justify-center min-w-[15px] h-[13px] px-1 text-[8px] font-mono text-amber-300/70 bg-black/60 border border-amber-500/30 rounded">
              D
            </kbd>
          </button>

          {/* Action 2: Ring Bell */}
          <button
            onClick={() => {
              triggerHaptic(30);
              onRingBell();
            }}
            className="flex flex-col items-center justify-center min-w-[42px] sm:min-w-[56px] min-h-[44px] px-1 sm:px-2 gap-0.5 text-neutral-400 hover:text-amber-200 transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            title="Ring Sacred Bell (Key: Space or R)"
          >
            <div className="w-7.5 h-7.5 sm:w-9.5 sm:h-9.5 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-amber-500/20 group-hover:border-amber-500/50 group-active:scale-95 transition-all">
              <BellIcon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 group-hover:rotate-12 transition-transform text-amber-400/90" />
            </div>
            <span className="text-[9px] sm:text-[10.5px] font-medium tracking-wide whitespace-nowrap text-center">
              <span className="hidden sm:inline">Ring Bell</span>
              <span className="sm:hidden">Bell</span>
            </span>
            <kbd className="hidden lg:inline-flex items-center justify-center min-w-[15px] h-[13px] px-1 text-[8px] font-mono text-amber-300/70 bg-black/60 border border-amber-500/30 rounded">
              Space
            </kbd>
          </button>

          {/* Action 3: Offer Flowers */}
          <button
            onClick={() => {
              triggerHaptic(15);
              onOfferFlowers();
            }}
            className="flex flex-col items-center justify-center min-w-[42px] sm:min-w-[56px] min-h-[44px] px-1 sm:px-2 gap-0.5 text-neutral-400 hover:text-amber-200 transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            title="Offer Fragrant Flowers (Key: F)"
          >
            <div className="w-7.5 h-7.5 sm:w-9.5 sm:h-9.5 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-amber-500/20 group-hover:border-amber-500/50 group-active:scale-95 transition-all">
              <Flower2 className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 group-hover:rotate-45 transition-transform text-rose-400/90" />
            </div>
            <span className="text-[9px] sm:text-[10.5px] font-medium tracking-wide whitespace-nowrap text-center">
              <span className="hidden sm:inline">Offer Flowers</span>
              <span className="sm:hidden">Flowers</span>
            </span>
            <kbd className="hidden lg:inline-flex items-center justify-center min-w-[15px] h-[13px] px-1 text-[8px] font-mono text-amber-300/70 bg-black/60 border border-amber-500/30 rounded">
              F
            </kbd>
          </button>

          {/* Action 4: Offer Modak */}
          <button
            onClick={() => {
              triggerHaptic(20);
              onOfferModak();
            }}
            className="flex flex-col items-center justify-center min-w-[42px] sm:min-w-[56px] min-h-[44px] px-1 sm:px-2 gap-0.5 text-neutral-400 hover:text-amber-200 transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            title="Offer Sweet Modak (Key: M)"
          >
            <div className="w-7.5 h-7.5 sm:w-9.5 sm:h-9.5 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-amber-500/20 group-hover:border-amber-500/50 group-active:scale-95 transition-all">
              <ModakIcon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 group-hover:scale-110 transition-transform text-yellow-400/90" />
            </div>
            <span className="text-[9px] sm:text-[10.5px] font-medium tracking-wide whitespace-nowrap text-center">
              <span className="hidden sm:inline">Offer Modak</span>
              <span className="sm:hidden">Modak</span>
            </span>
            <kbd className="hidden lg:inline-flex items-center justify-center min-w-[15px] h-[13px] px-1 text-[8px] font-mono text-amber-300/70 bg-black/60 border border-amber-500/30 rounded">
              M
            </kbd>
          </button>

          {/* Action 5: Take Blessings */}
          <button
            onClick={() => {
              if (!blessingActive) {
                triggerHaptic(35);
                onTakeBlessings();
              }
            }}
            disabled={blessingActive}
            className={`flex flex-col items-center justify-center min-w-[42px] sm:min-w-[56px] min-h-[44px] px-1 sm:px-2 gap-0.5 transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
              blessingActive ? 'opacity-60 cursor-not-allowed' : 'text-neutral-400 hover:text-amber-200'
            }`}
            title="Receive Divine Blessings (Key: B)"
          >
            <div className={`w-7.5 h-7.5 sm:w-9.5 sm:h-9.5 rounded-full flex items-center justify-center border transition-all ${
              blessingActive
                ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                : 'bg-white/5 hover:bg-white/10 border-amber-500/20 group-hover:border-amber-500/50 group-active:scale-95'
            }`}>
              <NamasteIcon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-amber-300" />
            </div>
            <span className="text-[9px] sm:text-[10.5px] font-medium tracking-wide whitespace-nowrap text-center">
              <span className="hidden sm:inline">Take Blessings</span>
              <span className="sm:hidden">Blessings</span>
            </span>
            <kbd className="hidden lg:inline-flex items-center justify-center min-w-[15px] h-[13px] px-1 text-[8px] font-mono text-amber-300/70 bg-black/60 border border-amber-500/30 rounded">
              B
            </kbd>
          </button>

          {/* Action 6: Perform Aarti */}
          <button
            onClick={() => {
              if (!aartiActive) {
                triggerHaptic(35);
                onPerformAarti();
              }
            }}
            disabled={aartiActive}
            className={`flex flex-col items-center justify-center min-w-[42px] sm:min-w-[56px] min-h-[44px] px-1 sm:px-2 gap-0.5 transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
              aartiActive ? 'text-amber-300' : 'text-neutral-400 hover:text-amber-200'
            }`}
            title="Perform Sacred Aarti (Key: A)"
          >
            <div
              className={`w-7.5 h-7.5 sm:w-9.5 sm:h-9.5 rounded-full flex items-center justify-center transition-all ${
                aartiActive
                  ? 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-black shadow-[0_0_16px_rgba(245,158,11,0.8)] scale-105 animate-pulse'
                  : 'bg-white/5 hover:bg-white/10 border border-amber-500/20 group-hover:border-amber-500/50 group-active:scale-95'
              }`}
            >
              <AartiIcon className={`w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 ${aartiActive ? 'text-black' : 'text-amber-400/90 group-hover:scale-110 transition-transform'}`} />
            </div>
            <span className="text-[9px] sm:text-[10.5px] font-medium tracking-wide whitespace-nowrap text-center">
              <span className="hidden sm:inline">{aartiActive ? 'Aarti Live' : 'Perform Aarti'}</span>
              <span className="sm:hidden">{aartiActive ? 'Live' : 'Aarti'}</span>
            </span>
            <kbd className="hidden lg:inline-flex items-center justify-center min-w-[15px] h-[13px] px-1 text-[8px] font-mono text-amber-300/70 bg-black/60 border border-amber-500/30 rounded">
              A
            </kbd>
          </button>
        </div>

        {/* Bottom Outer Subtitles: Left peace message + Right swipe helper */}
        <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] text-amber-300/60 font-light px-2 pb-0.5">
          {/* Bottom Left: Lotus Emblem */}
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-amber-500/30 flex items-center justify-center text-[10px] sm:text-xs text-amber-400">
              🪷
            </span>
            <span className="hidden sm:inline">Feel the peace in every moment</span>
            <span className="hidden lg:inline text-amber-300/40">• Shortcuts: Space, D, F, M, B, A, C</span>
          </div>

          {/* Bottom Right: Swipe / Navigation Helper */}
          <div className="flex items-center gap-1 text-amber-300/50">
            <span className="hidden sm:inline">
              {arModeActive ? "Swipe horizontally to rotate 360° • Pinch to scale" : "Drag to orbit view"}
            </span>
            <span className="sm:hidden">
              {arModeActive ? "Swipe 360° • Pinch scale" : "Swipe to explore"}
            </span>
            <span>›</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
