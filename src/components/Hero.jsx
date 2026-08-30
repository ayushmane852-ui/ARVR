import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight, Scan, Cpu } from 'lucide-react';
import Logo3D from './Logo3D';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col items-center justify-between pt-16 sm:pt-20 pb-4 sm:pb-6 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background HUD Decor & Grid overlay */}
      <div className="absolute inset-0 spatial-grid-bg opacity-20 pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />

      {/* Main Container - Full Viewport Flex */}
      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-center justify-between text-center min-h-[calc(100vh-7rem)]">

        {/* Top Brand: ARVR Logo Shifted High Up */}
        <div className="w-full flex flex-col items-center justify-center pt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center px-2"
          >
            {/* ARVR Logo Shifted High Up */}
            <div className="mb-0 relative -mt-44 sm:-mt-36">
              <Logo3D size="hero" />
            </div>
          </motion.div>
        </div>

        {/* Center Open Spatial Window for 3D Solar System */}
        <div className="flex-1 my-auto min-h-[40px]" />

        {/* Bottom Pinned Elements: Tagline + Action Buttons (Pinned at Bottom of Initial Fold) */}
        <div className="w-full flex flex-col items-center gap-2 sm:gap-2.5 pb-2 sm:pb-3">
          {/* Tagline Badge Placed Just Above Action Buttons (No Space) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-1 sm:mb-1.5 px-4 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-cyan-500/35 shadow-[0_0_20px_rgba(0,240,255,0.25)] inline-flex items-center justify-center relative z-20"
          >
            <span className="font-orbitron font-extrabold text-xs sm:text-sm tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 uppercase whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              STEP BEYOND REALITY
            </span>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-center w-full max-w-md px-2"
          >
            {/* Primary CTA */}
            <button
              onClick={() => navigate('/about')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-orbitron font-bold text-[11px] sm:text-xs tracking-widest uppercase glass-button-primary flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <span>ENTER THE EXPERIENCE</span>
              <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => navigate('/events')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-orbitron font-bold text-[11px] sm:text-xs tracking-widest uppercase glass-button-secondary flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Sparkles size={15} className="text-cyan-400" />
              <span>EXPLORE ARVR</span>
            </button>
          </motion.div>
        </div>

      </div>

      {/* Scroll-Reveal Container: HUD Tech Cards + Subtext (Revealed Upon Scroll) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl mx-auto mt-12 sm:mt-16 px-4 flex flex-col items-center gap-6"
      >
        {/* The 2 HUD Cards (AUGMENTED & VIRTUAL) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {/* Left Side: AUGMENTED Reality Tag */}
          <div className="flex flex-col items-start text-left glass-panel p-4 rounded-2xl border-cyan-500/20 relative group hover:border-cyan-400/50">
            <div className="flex items-center gap-2 mb-1.5 text-cyan-400">
              <Scan size={16} className="animate-pulse" />
              <span className="font-orbitron font-bold text-xs tracking-widest uppercase">
                AUGMENTED
              </span>
            </div>
            <p className="font-space text-[11px] text-slate-400 mb-2">
              Spatial overlay, Passthrough HUDs, Real-time tracking reticles & digital twins.
            </p>
            <div className="font-mono text-[9px] text-cyan-400/80 flex items-center justify-between w-full border-t border-cyan-500/15 pt-1.5">
              <span>FOV // 110°</span>
              <span>PASSTHROUGH: ACTIVE</span>
            </div>
            <div className="absolute top-2 right-2 text-cyan-400/30 group-hover:text-cyan-400/70 transition-colors">
              [+]
            </div>
          </div>

          {/* Right Side: VIRTUAL Reality Tag */}
          <div className="flex flex-col items-start text-left glass-panel p-4 rounded-2xl border-purple-500/20 relative group hover:border-purple-400/50">
            <div className="flex items-center gap-2 mb-1.5 text-purple-400">
              <Cpu size={16} className="animate-pulse" />
              <span className="font-orbitron font-bold text-xs tracking-widest uppercase">
                VIRTUAL
              </span>
            </div>
            <p className="font-space text-[11px] text-slate-400 mb-2">
              Full-immersion 3D environments, spatial audio & volumetric spatial rendering.
            </p>
            <div className="font-mono text-[9px] text-purple-400/80 flex items-center justify-between w-full border-t border-purple-500/15 pt-1.5">
              <span>6DOF // SYNC</span>
              <span>RENDER: 90 FPS</span>
            </div>
            <div className="absolute top-2 right-2 text-purple-400/30 group-hover:text-purple-400/70 transition-colors">
              [•]
            </div>
          </div>
        </div>

        {/* Subtext Container */}
        <div className="w-full max-w-xl px-5 py-3 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-cyan-500/25 shadow-xl text-center">
          <p className="font-space text-slate-200 text-xs sm:text-sm font-light leading-relaxed">
            Explore Augmented Reality, Virtual Reality, Spatial Computing and emerging technologies shaping human-computer interaction.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
