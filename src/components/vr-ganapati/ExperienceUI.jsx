import React, { useState } from 'react';
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

  const handleVrClick = () => {
    if (onEnterVR) {
      const started = onEnterVR();
      if (!started) {
        setVrNotice("WebXR headset not detected. Enjoy full 3D interactive mode with mouse or touch gestures!");
        setTimeout(() => setVrNotice(null), 5000);
      }
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 sm:px-6 sm:pt-5 sm:pb-2.5 select-none transition-opacity duration-1000 ${
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
            onClick={onToggleMute}
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
            onClick={onCaptureDarshan}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/40 hover:bg-black/70 border border-amber-500/20 hover:border-amber-400/50 text-amber-200/90 hover:text-amber-100 transition-all backdrop-blur-md shadow-lg cursor-pointer group"
            title="Capture & Share Darshan"
            aria-label="Capture Darshan"
          >
            <Camera className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-xs font-space font-medium tracking-wide">
              Capture
            </span>
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
            onClick={onToggleAR}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-xl transition-all cursor-pointer group ${
              arModeActive
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-semibold shadow-[0_0_20px_rgba(245,158,11,0.6)]'
                : 'bg-black/50 hover:bg-amber-950/40 border border-amber-400/40 hover:border-amber-300 text-amber-100 shadow-[0_4px_20px_rgba(0,0,0,0.6)]'
            }`}
            title={arModeActive ? "Exit AR Mode and return to Temple" : "Place Ganapati in your real room via AR"}
          >
            <Sparkles className={`w-4 h-4 ${arModeActive ? 'text-black' : 'text-amber-400 group-hover:scale-110 transition-transform'}`} />
            <span className="text-xs sm:text-sm font-space font-medium tracking-wider">
              {arModeActive ? 'Exit AR' : 'Enter AR'}
            </span>
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

        {/* State 3: Anchored AR Controls Bar (360° Darshan, Angle Presets, Size, Reposition) */}
        {arModeActive && arPlaced && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 bg-[#160f0b]/92 border border-amber-400/40 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl sm:rounded-full shadow-2xl backdrop-blur-xl pointer-events-auto text-xs text-amber-200"
          >
            {/* 360° Devotional Auto-Spin Toggle */}
            <button
              onClick={onToggleAutoRotate360}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                autoRotate360
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.6)] font-semibold'
                  : 'bg-white/10 hover:bg-white/20 border border-amber-500/30 text-amber-200'
              }`}
              title={autoRotate360 ? "Pause 360° Rotation" : "Start Serene 360° Darshan Rotation"}
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRotate360 ? 'animate-spin' : ''}`} />
              <span className="text-[11px] tracking-wide">360° Darshan</span>
            </button>

            {/* Angle Presets */}
            <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-full border border-amber-500/20">
              <button
                onClick={() => onSetPresetAngle && onSetPresetAngle(0)}
                className="px-2 py-1 rounded-full hover:bg-white/15 text-[10px] text-amber-300/90 font-medium cursor-pointer transition-colors"
                title="Front Facing Darshan (0°)"
              >
                Front
              </button>
              <button
                onClick={() => onSetPresetAngle && onSetPresetAngle(Math.PI / 2)}
                className="px-2 py-1 rounded-full hover:bg-white/15 text-[10px] text-amber-300/90 font-medium cursor-pointer transition-colors"
                title="Side Profile View (90°)"
              >
                Side
              </button>
              <button
                onClick={() => onSetPresetAngle && onSetPresetAngle(Math.PI)}
                className="px-2 py-1 rounded-full hover:bg-white/15 text-[10px] text-amber-300/90 font-medium cursor-pointer transition-colors"
                title="Rear Crown View (180°)"
              >
                Rear
              </button>
            </div>

            <div className="hidden sm:block h-4 w-px bg-amber-500/30 mx-0.5" />

            {/* Size Scaling Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={onScaleDown}
                className="px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-amber-500/30 cursor-pointer font-medium text-[11px]"
                title="Smaller Size"
              >
                − Size
              </button>
              <span className="text-[11px] text-amber-300 font-mono px-1">
                {Math.round(arScale * 100)}%
              </span>
              <button
                onClick={onScaleUp}
                className="px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-amber-500/30 cursor-pointer font-medium text-[11px]"
                title="Larger Size"
              >
                + Size
              </button>
            </div>

            <div className="hidden sm:block h-4 w-px bg-amber-500/30 mx-0.5" />

            {/* Reposition / Pick Up Button */}
            <button
              onClick={onReposition}
              className="px-2.5 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 cursor-pointer text-amber-300 font-medium text-[11px]"
              title="Pick up Lord Ganesha to reposition on a new surface"
            >
              Reposition
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

      {/* AR 360° Interaction Hint Toast */}
      {arModeActive && arPlaced && (
        <div className="w-full flex justify-center pointer-events-none mb-1">
          <div className="bg-black/75 backdrop-blur-md border border-amber-500/30 px-3.5 py-1 rounded-full shadow-lg">
            <p className="text-[10px] sm:text-xs text-amber-300/90 tracking-wide font-light flex items-center gap-1.5">
              <RotateCw className="w-3 h-3 text-amber-400" />
              Swipe horizontally to rotate Bappa • Walk around for 360° darshan
            </p>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. BOTTOM BAR: FOOTER LABELS & GLASSMORPHIC INTERACTION DOCK */}
      {/* ============================================================ */}
      <footer className="w-full flex flex-col items-center gap-1.5 sm:gap-2 pointer-events-auto">
        
        {/* Floating Glassmorphic Pill Toolbar (compact height, positioned lower) */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-5 lg:gap-6 px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#120e0b]/80 border border-amber-500/25 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.85),inset_0_0_15px_rgba(245,158,11,0.08)] transition-all max-w-full overflow-x-auto">
          
          {/* Action 1: Light Diya */}
          <button
            onClick={onToggleDiya}
            className={`flex flex-col items-center gap-0.5 sm:gap-1 transition-all group cursor-pointer ${
              isDiyaLit ? 'text-amber-300' : 'text-amber-200/90 hover:text-amber-100'
            }`}
          >
            <div
              className={`w-8 h-8 sm:w-9.5 sm:h-9.5 rounded-full flex items-center justify-center transition-all ${
                isDiyaLit
                  ? 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.7)] scale-105'
                  : 'bg-amber-500/15 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)] animate-pulse'
              }`}
            >
              <Flame className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isDiyaLit ? 'fill-current animate-pulse' : 'text-amber-300'}`} />
            </div>
            <span className="text-[9px] sm:text-[10.5px] font-medium tracking-wide whitespace-nowrap">
              {isDiyaLit ? 'Diyas Lit' : 'Light Diya'}
            </span>
          </button>

          {/* Action 2: Ring Bell */}
          <button
            onClick={onRingBell}
            className="flex flex-col items-center gap-0.5 sm:gap-1 text-neutral-400 hover:text-amber-200 transition-all group cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-9.5 sm:h-9.5 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-amber-500/20 group-hover:border-amber-500/50 group-active:scale-95 transition-all">
              <BellIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:rotate-12 transition-transform text-amber-400/90" />
            </div>
            <span className="text-[9px] sm:text-[10.5px] font-medium tracking-wide whitespace-nowrap">
              Ring Bell
            </span>
          </button>

          {/* Action 3: Offer Flowers */}
          <button
            onClick={onOfferFlowers}
            className="flex flex-col items-center gap-0.5 sm:gap-1 text-neutral-400 hover:text-amber-200 transition-all group cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-9.5 sm:h-9.5 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-amber-500/20 group-hover:border-amber-500/50 group-active:scale-95 transition-all">
              <Flower2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:rotate-45 transition-transform text-rose-400/90" />
            </div>
            <span className="text-[9px] sm:text-[10.5px] font-medium tracking-wide whitespace-nowrap">
              Offer Flowers
            </span>
          </button>

          {/* Action 4: Offer Modak */}
          <button
            onClick={onOfferModak}
            className="flex flex-col items-center gap-0.5 sm:gap-1 text-neutral-400 hover:text-amber-200 transition-all group cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-9.5 sm:h-9.5 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-amber-500/20 group-hover:border-amber-500/50 group-active:scale-95 transition-all">
              <ModakIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:scale-110 transition-transform text-yellow-400/90" />
            </div>
            <span className="text-[9px] sm:text-[10.5px] font-medium tracking-wide whitespace-nowrap">
              Offer Modak
            </span>
          </button>

          {/* Action 5: Take Blessings */}
          <button
            onClick={onTakeBlessings}
            disabled={blessingActive}
            className={`flex flex-col items-center gap-0.5 sm:gap-1 transition-all group cursor-pointer ${
              blessingActive ? 'opacity-60 cursor-not-allowed' : 'text-neutral-400 hover:text-amber-200'
            }`}
          >
            <div className={`w-8 h-8 sm:w-9.5 sm:h-9.5 rounded-full flex items-center justify-center border transition-all ${
              blessingActive
                ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                : 'bg-white/5 hover:bg-white/10 border-amber-500/20 group-hover:border-amber-500/50 group-active:scale-95'
            }`}>
              <NamasteIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-300" />
            </div>
            <span className="text-[9px] sm:text-[10.5px] font-medium tracking-wide whitespace-nowrap">
              Take Blessings
            </span>
          </button>

          {/* Action 6: Perform Aarti */}
          <button
            onClick={onPerformAarti}
            disabled={aartiActive}
            className={`flex flex-col items-center gap-0.5 sm:gap-1 transition-all group cursor-pointer ${
              aartiActive ? 'text-amber-300' : 'text-neutral-400 hover:text-amber-200'
            }`}
          >
            <div
              className={`w-8 h-8 sm:w-9.5 sm:h-9.5 rounded-full flex items-center justify-center transition-all ${
                aartiActive
                  ? 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-black shadow-[0_0_16px_rgba(245,158,11,0.8)] scale-105 animate-pulse'
                  : 'bg-white/5 hover:bg-white/10 border border-amber-500/20 group-hover:border-amber-500/50 group-active:scale-95'
              }`}
            >
              <AartiIcon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${aartiActive ? 'text-black' : 'text-amber-400/90 group-hover:scale-110 transition-transform'}`} />
            </div>
            <span className="text-[9px] sm:text-[10.5px] font-medium tracking-wide whitespace-nowrap">
              {aartiActive ? 'Aarti Live' : 'Perform Aarti'}
            </span>
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
          </div>

          {/* Bottom Right: Swipe helper */}
          <div className="flex items-center gap-1 text-amber-300/50">
            <span>{arModeActive ? "Swipe anywhere to rotate 360°" : "Swipe to explore"}</span>
            <span>›</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
