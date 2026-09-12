import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingOverlay({ progress }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#070503] text-amber-100"
    >
      {/* Background Soft Amber Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />

      {/* Central Sacred Ganesha / Om Emblem */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-amber-500/30 flex items-center justify-center bg-gradient-to-b from-amber-500/15 to-transparent backdrop-blur-md shadow-[0_0_30px_rgba(245,158,11,0.2)] mb-6"
        >
          <span className="text-4xl sm:text-5xl text-amber-300 font-serif select-none">
            ॐ
          </span>
        </motion.div>

        <h2 className="text-xl sm:text-2xl font-serif tracking-widest text-amber-200 mb-2">
          VR GANAPATI
        </h2>
        <p className="text-xs sm:text-sm tracking-wider text-amber-400/80 mb-6 font-light">
          Preparing the sacred darshan experience...
        </p>

        {/* Progress Bar */}
        <div className="w-56 sm:w-72 h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-amber-500/20 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-500 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.8)]"
            initial={{ width: '5%' }}
            animate={{ width: `${Math.max(5, progress)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <span className="text-[11px] font-mono tracking-widest text-amber-500/70 mt-3">
          {Math.round(progress)}%
        </span>
      </div>
    </motion.div>
  );
}
