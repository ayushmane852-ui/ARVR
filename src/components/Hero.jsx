import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mouse, ArrowRight, Scan, Cpu } from 'lucide-react';
import VisionProCanvas from './VisionProCanvas';

export default function Hero({ onExploreVR }) {
  const navigate = useNavigate();

  return (
    <section 
      id="hero" 
      className="relative w-full h-full flex-1 flex flex-col items-center justify-between pt-14 sm:pt-20 pb-2 sm:pb-4 px-3 sm:px-6 overflow-hidden select-none"
    >
      {/* 1. Space Horizon Background (Moon, Nebulae, Earth Limb) anchored to bottom */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10"
        style={{ 
          backgroundImage: "url('/Images/hero-space-bg.jpg')",
          backgroundPosition: 'center bottom',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      />
      {/* Subtle vignette gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 pointer-events-none -z-10" />

      {/* 2. Main Full-Height Container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-center justify-between text-center h-full flex-1 min-h-0">

        {/* Top Header Block: Badge, Headline & Subtitles */}
        <div className="w-full flex flex-col items-center justify-center pt-0 sm:pt-1 shrink-0">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center px-2"
          >
            {/* Top Label with Flanking Thin Accent Lines: —— ARVR CLUB • SPATIAL LAB —— */}
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-1.5">
              <div className="w-6 sm:w-12 h-px bg-gradient-to-r from-transparent to-cyan-400/80" />
              <div className="font-orbitron text-[8.5px] sm:text-[11px] font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-cyan-400 uppercase whitespace-nowrap">
                ARVR CLUB <span className="text-white/40 mx-0.5 sm:mx-1">•</span> SPATIAL LAB
              </div>
              <div className="w-6 sm:w-12 h-px bg-gradient-to-l from-transparent to-cyan-400/80" />
            </div>

            {/* Main Headline: STEP BEYOND REALITY */}
            <h1 className="font-orbitron font-extrabold text-xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider sm:tracking-[0.14em] text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-white to-purple-200 uppercase drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] leading-tight">
              STEP BEYOND REALITY
            </h1>

            {/* Subtitle 1: IMMERSIVE TECHNOLOGY • AR • VR • XR */}
            <div className="font-orbitron text-[8.5px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.2em] text-slate-200 font-medium mt-0.5 sm:mt-1 uppercase flex items-center justify-center gap-1 sm:gap-2">
              <span>IMMERSIVE TECHNOLOGY</span>
              <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
              <span>AR</span>
              <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
              <span>VR</span>
              <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
              <span>XR</span>
            </div>

            {/* Subtitle 2: Explore digital worlds where imagination becomes interactive. */}
            <p className="font-space text-[10px] sm:text-xs md:text-sm text-slate-300/85 font-normal tracking-wide mt-0.5 sm:mt-1 max-w-xs sm:max-w-md">
              Explore digital worlds where imagination becomes interactive.
            </p>
          </motion.div>
        </div>

        {/* Centerpiece: Apple Vision Pro 3D Model + Orbital Rings + Holographic Leader Lines */}
        <div className="relative w-full max-w-4xl mx-auto flex-1 flex items-center justify-center my-auto min-h-0 w-full overflow-visible">
          
          {/* Dual Tilted Glowing Orbital Rings encircling the headset */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
            {/* Cyan Orbital Ellipse */}
            <div 
              className="absolute w-[260px] sm:w-[480px] md:w-[580px] lg:w-[650px] h-[90px] sm:h-[160px] md:h-[195px] lg:h-[220px] rounded-[50%] border border-cyan-400/40 shadow-[0_0_18px_rgba(0,240,255,0.25)] pointer-events-none"
              style={{ transform: 'rotate(-11deg) scaleY(0.65)' }}
            />
            {/* Purple Orbital Ellipse */}
            <div 
              className="absolute w-[275px] sm:w-[500px] md:w-[600px] lg:w-[670px] h-[98px] sm:h-[170px] md:h-[205px] lg:h-[230px] rounded-[50%] border border-purple-500/40 shadow-[0_0_18px_rgba(168,85,247,0.25)] pointer-events-none"
              style={{ transform: 'rotate(17deg) scaleY(0.65)' }}
            />
          </div>

          {/* Holographic SVG Leader Lines & Text Callouts (desktop only) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible hidden sm:block"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* 1. Top-Left Callout: SPATIAL COMPUTING */}
            <g className="opacity-95">
              <circle cx="430" cy="240" r="3.5" fill="#00f0ff" />
              <circle cx="430" cy="240" r="7" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
              <path
                d="M 200 215 L 305 215 L 430 240"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="1.2"
                opacity="0.85"
              />
              <rect x="194" y="212" width="5" height="5" fill="#00f0ff" />
              <text
                x="200"
                y="205"
                fill="#ffffff"
                fontSize="11"
                fontFamily="Orbitron, sans-serif"
                fontWeight="700"
                letterSpacing="0.18em"
              >
                SPATIAL COMPUTING
              </text>
            </g>

            {/* 2. Bottom-Left Callout: IMMERSIVE SYSTEM */}
            <g className="opacity-95">
              <circle cx="325" cy="365" r="3.5" fill="#00f0ff" />
              <circle cx="325" cy="365" r="7" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
              <path
                d="M 170 425 L 260 425 L 325 365"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="1.2"
                opacity="0.85"
              />
              <rect x="164" y="422" width="5" height="5" fill="#00f0ff" />
              <text
                x="170"
                y="415"
                fill="#ffffff"
                fontSize="11"
                fontFamily="Orbitron, sans-serif"
                fontWeight="700"
                letterSpacing="0.18em"
              >
                IMMERSIVE SYSTEM
              </text>
            </g>

            {/* 3. Right Callout: REAL-TIME TRACKING */}
            <g className="opacity-95">
              <circle cx="615" cy="305" r="3.5" fill="#00f0ff" />
              <circle cx="615" cy="305" r="7" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
              <path
                d="M 615 305 L 685 270 L 800 270"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="1.2"
                opacity="0.85"
              />
              <rect x="800" y="267" width="5" height="5" fill="#00f0ff" />
              <text
                x="685"
                y="260"
                fill="#ffffff"
                fontSize="11"
                fontFamily="Orbitron, sans-serif"
                fontWeight="700"
                letterSpacing="0.18em"
              >
                REAL-TIME TRACKING
              </text>
            </g>
          </svg>

          {/* Interactive 3D Apple Vision Pro Canvas */}
          <div className="relative w-full h-full flex items-center justify-center z-10 min-h-0">
            <VisionProCanvas />
          </div>
        </div>

        {/* Bottom Pinned Controls: Interaction Hint + Pill Buttons + Horizon Accent Dot */}
        <div className="w-full flex flex-col items-center gap-1.5 sm:gap-2.5 pb-1 sm:pb-2 shrink-0 z-20">
          
          {/* Interaction Hint: 🖱️ INTERACTIVE 3D • DRAG TO ROTATE */}
          <div className="flex items-center justify-center gap-1.5 text-slate-300/80 font-mono text-[8.5px] sm:text-[10px] tracking-[0.16em] uppercase">
            <Mouse size={12} className="text-slate-400" />
            <span>INTERACTIVE 3D <span className="mx-1 text-cyan-400">•</span> DRAG TO ROTATE</span>
          </div>

          {/* Two Glowing Pill Buttons: EXPLORE AR → & EXPLORE VR → */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-2.5 sm:gap-6 w-full max-w-xs sm:max-w-md px-1 z-20"
          >
            {/* Explore AR Button: Cyan Glow Pill */}
            <button
              onClick={() => navigate('/workshops')}
              className="group flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#050f1e]/85 hover:bg-cyan-950/70 border border-cyan-400 text-cyan-200 font-orbitron font-bold text-[10px] sm:text-xs tracking-wider sm:tracking-widest uppercase shadow-[0_0_22px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] flex items-center justify-center gap-1.5 sm:gap-2.5 transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-md whitespace-nowrap"
            >
              <span>EXPLORE AR</span>
              <ArrowRight size={13} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Explore VR Button: Purple Glow Pill (Triggers Full-Screen 3D Galaxy View) */}
            <button
              onClick={() => {
                if (onExploreVR) {
                  onExploreVR();
                } else {
                  navigate('/events');
                }
              }}
              className="group flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#120824]/85 hover:bg-purple-950/70 border border-purple-500 text-purple-200 font-orbitron font-bold text-[10px] sm:text-xs tracking-wider sm:tracking-widest uppercase shadow-[0_0_22px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] flex items-center justify-center gap-1.5 sm:gap-2.5 transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-md whitespace-nowrap"
            >
              <span>EXPLORE VR</span>
              <ArrowRight size={13} className="text-purple-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Bottom Horizon Center Indicator Dot */}
          <div className="w-full flex justify-center pt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff] animate-pulse" />
          </div>

        </div>

      </div>
    </section>
  );
}
