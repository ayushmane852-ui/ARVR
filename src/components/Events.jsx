import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Calendar, Sparkles, Radio, Clock, ShieldCheck } from 'lucide-react';

// Floating Empty State Portal Mesh
function EmptyStatePortal() {
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} className="w-full h-full">
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} color="#00f0ff" intensity={2} />
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh rotation={[0.6, 0.2, 0]}>
          <torusKnotGeometry args={[0.9, 0.25, 100, 16]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#0088ff"
            emissiveIntensity={1.2}
            wireframe
          />
        </mesh>
      </Float>
    </Canvas>
  );
}

export default function Events() {
  return (
    <section id="events" className="relative py-28 px-6 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-cyan-500/30 mb-3">
            <Calendar size={14} className="text-cyan-400" />
            <span className="font-mono text-xs text-cyan-300 tracking-wider uppercase">COMMUNITY TIMELINE</span>
          </div>

          <h2 className="font-orbitron font-black text-4xl sm:text-5xl tracking-tight text-white text-glow-cyan">
            EVENTS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4" />
        </div>

        {/* Futuristic Empty-State Holographic Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-3xl p-8 sm:p-12 border-cyan-500/25 relative overflow-hidden text-center flex flex-col items-center group hover:border-cyan-400/40"
        >
          {/* Top HUD Frame Metadata */}
          <div className="w-full flex items-center justify-between font-mono text-[10px] text-slate-500 border-b border-cyan-500/15 pb-4 mb-8">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Radio size={12} className="animate-pulse" /> EVENT_HUB // INACTIVE
            </span>
            <span>QUEUE: 0 REGISTERED</span>
            <span>FEED // STANDBY</span>
          </div>

          {/* Floating 3D Portal Visual Container */}
          <div className="w-48 h-48 sm:w-64 sm:h-64 my-2 relative">
            <EmptyStatePortal />
          </div>

          {/* Coming Soon Glowing Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 font-orbitron font-bold text-xs tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Clock size={14} className="animate-spin-slow" />
            COMING SOON
          </div>

          {/* Main Title & Subtitle */}
          <h3 className="font-orbitron font-bold text-2xl sm:text-4xl text-white tracking-wide mb-3">
            Something immersive is coming.
          </h3>

          <p className="font-space text-slate-300 text-base sm:text-lg max-w-xl font-light leading-relaxed mb-8">
            Our first ARVR experiences, hackathons, spatial competitions, and community showcase events will appear here as our club calendar unlocks.
          </p>

          {/* Sub diagnostic badge */}
          <div className="font-mono text-xs text-slate-400 glass-panel px-6 py-3 rounded-xl border-cyan-500/15 flex items-center gap-3">
            <ShieldCheck size={16} className="text-cyan-400" />
            <span>ARCHITECTURE PREPARED FOR REAL-TIME EVENT STREAMING</span>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
