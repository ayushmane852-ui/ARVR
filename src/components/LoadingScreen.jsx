import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statusMessages = [
    "INITIALIZING SPATIAL CORE...",
    "CALIBRATING AR TRACKING GRID...",
    "SYNCHRONIZING VR VOID MATRIX...",
    "COMPILING SHADERS & PARTICLES...",
    "SYSTEM READY"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return next > 100 ? 100 : next;
      });
    }, 90);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 25) setStatusIndex(0);
    else if (progress < 50) setStatusIndex(1);
    else if (progress < 75) setStatusIndex(2);
    else if (progress < 95) setStatusIndex(3);
    else setStatusIndex(4);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-white overflow-hidden"
    >
      {/* Background Holographic Grid Effect */}
      <div className="absolute inset-0 spatial-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Central Holographic Ring Spinner & Diagnostics */}
      <div className="relative flex flex-col items-center z-10 px-4">
        
        {/* Holographic Ring Visual */}
        <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 border-r-cyan-400 animate-spin-slow" />
          
          {/* Inner Counter-Rotating Ring */}
          <div className="absolute inset-3 rounded-full border-2 border-purple-500/30 border-b-purple-400 border-l-purple-400 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '10s' }} />

          {/* Central Glowing Core */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/30 border border-cyan-400/50 flex items-center justify-center shadow-[0_0_25px_rgba(0,240,255,0.4)]">
            <span className="font-orbitron font-bold text-lg text-cyan-300">
              {progress}%
            </span>
          </div>

          {/* HUD Target Lines */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-3 h-[1px] bg-cyan-400/60" />
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-3 h-[1px] bg-cyan-400/60" />
          <div className="absolute left-1/2 -top-4 -translate-x-1/2 h-3 w-[1px] bg-cyan-400/60" />
          <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 h-3 w-[1px] bg-cyan-400/60" />
        </div>

        {/* Title */}
        <h1 className="font-orbitron font-black text-4xl md:text-6xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 text-glow-cyan mb-2">
          ARVR
        </h1>

        <p className="font-rajdhani text-sm md:text-base tracking-[0.3em] text-cyan-400/80 uppercase font-semibold mb-6">
          AR • VR • IMMERSIVE TECHNOLOGY
        </p>

        {/* Diagnostic Status Message */}
        <div className="h-6 flex items-center justify-center">
          <p className="font-orbitron text-xs text-slate-400 tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
            {statusMessages[statusIndex]}
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 md:w-80 h-1 bg-slate-900 rounded-full mt-6 overflow-hidden border border-cyan-500/20 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_12px_rgba(0,240,255,0.8)]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Spatial HUD Frame Footer */}
        <div className="mt-8 font-mono text-[10px] text-slate-500 tracking-widest flex gap-4">
          <span>SYS.VER // 2.6.0</span>
          <span>•</span>
          <span>LATENCY // 0.4MS</span>
          <span>•</span>
          <span>SPATIAL: READY</span>
        </div>
      </div>
    </motion.div>
  );
}
