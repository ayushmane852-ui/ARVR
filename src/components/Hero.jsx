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
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 sm:pt-20 pb-6 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background HUD Decor & Grid overlay */}
      <div className="absolute inset-0 spatial-grid-bg opacity-20 pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-center text-center">

        {/* AR vs VR Split Interactive HUD Indicators */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center mb-3 sm:mb-5">
          
          {/* Left Side: AUGMENTED Reality Tag */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex flex-col items-start text-left glass-panel p-4 rounded-2xl border-cyan-500/20 relative group hover:border-cyan-400/50"
          >
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

            {/* Target Reticle Accent */}
            <div className="absolute top-2 right-2 text-cyan-400/30 group-hover:text-cyan-400/70 transition-colors">
              [+]
            </div>
          </motion.div>

          {/* Center Brand & Main Headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center px-2"
          >
            {/* Stable Fixed ARVR Logo - Shifted Upwards */}
            <div className="mb-1 sm:mb-2 relative -mt-6 sm:-mt-12">
              <Logo3D size="hero" />
            </div>

            <span className="font-orbitron text-[9px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-cyan-400/90 font-semibold mb-1 sm:mb-1.5 uppercase text-glow-cyan">
              AUGMENTED REALITY + VIRTUAL REALITY
            </span>

            {/* Compact Tagline / Headline */}
            <h1 className="font-orbitron font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyan-400 text-glow-cyan mb-2 sm:mb-3">
              STEP BEYOND{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500">
                REALITY
              </span>
            </h1>
          </motion.div>

          {/* Right Side: VIRTUAL Reality Tag */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex flex-col items-start text-left glass-panel p-4 rounded-2xl border-purple-500/20 relative group hover:border-purple-400/50"
          >
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

            {/* Target Reticle Accent */}
            <div className="absolute top-2 right-2 text-purple-400/30 group-hover:text-purple-400/70 transition-colors">
              [•]
            </div>
          </motion.div>
        </div>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-xl mx-auto mb-4 sm:mb-5 px-4 py-2 sm:py-0 rounded-2xl bg-slate-950/40 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none border border-cyan-500/15 sm:border-none"
        >
          <p className="font-space text-slate-300 text-xs sm:text-base font-light leading-relaxed">
            Explore Augmented Reality, Virtual Reality, Spatial Computing and emerging technologies shaping human-computer interaction.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-center w-full max-w-md px-2 mb-3 sm:mb-5"
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

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col items-center gap-1.5 cursor-pointer group"
          onClick={() => navigate('/about')}
        >
          <span className="font-mono text-[9px] text-cyan-400/60 uppercase tracking-[0.2em] group-hover:text-cyan-300">
            SCROLL TO EXPLORE SPATIAL REALM
          </span>
          <div className="w-5 h-8 rounded-full border border-cyan-500/30 flex items-start justify-center p-1 glass-panel">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
