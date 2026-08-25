import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Cpu, Terminal, Sparkles, BookOpen, Layers } from 'lucide-react';

// Floating 3D Spatial Wireframe Node Mesh
function LearningEnvironmentNode() {
  return (
    <Canvas camera={{ position: [0, 0, 3.8], fov: 50 }} className="w-full h-full">
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} color="#8a2be2" intensity={2} />
      <pointLight position={[-5, -5, -5]} color="#00f0ff" intensity={1.5} />

      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.2}>
        <mesh rotation={[0.4, 0.4, 0]}>
          <octahedronGeometry args={[1.1, 1]} />
          <meshStandardMaterial
            color="#8a2be2"
            emissive="#8a2be2"
            emissiveIntensity={1.5}
            wireframe
          />
        </mesh>
      </Float>
    </Canvas>
  );
}

export default function Workshops() {
  const upcomingTopics = [
    "Unity & Unreal Engine 3D Dev",
    "WebXR & Three.js Spatial Web",
    "Pass-through AR & Gesture Control",
    "Volumetric Video & Shader Coding"
  ];

  return (
    <section id="workshops" className="relative py-28 px-6 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-purple-500/30 mb-3">
            <BookOpen size={14} className="text-purple-400" />
            <span className="font-mono text-xs text-purple-300 tracking-wider uppercase">LAB WORKSHOPS</span>
          </div>

          <h2 className="font-orbitron font-black text-4xl sm:text-5xl tracking-tight text-white text-glow-violet">
            WORKSHOPS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mt-4" />
        </div>

        {/* Futuristic Empty-State Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-3xl p-8 sm:p-12 border-purple-500/25 relative overflow-hidden text-center flex flex-col items-center group hover:border-purple-400/40"
        >
          {/* Top HUD Frame Metadata */}
          <div className="w-full flex items-center justify-between font-mono text-[10px] text-slate-500 border-b border-purple-500/15 pb-4 mb-8">
            <span className="flex items-center gap-1.5 text-purple-400">
              <Cpu size={12} className="animate-pulse" /> CURRICULUM // INITIALIZING
            </span>
            <span>SYLLABUS: IN DESIGN</span>
            <span>HANDS-ON: PREPARING</span>
          </div>

          {/* 3D Visual Learning Grid Object */}
          <div className="w-48 h-48 sm:w-64 sm:h-64 my-2 relative">
            <LearningEnvironmentNode />
          </div>

          {/* Coming Soon Glowing Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/40 text-purple-300 font-orbitron font-bold text-xs tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(138,43,226,0.3)]">
            <Sparkles size={14} className="animate-pulse" />
            COMING SOON
          </div>

          {/* Main Title & Subtitle */}
          <h3 className="font-orbitron font-bold text-2xl sm:text-4xl text-white tracking-wide mb-3">
            Learn. Build. Experience.
          </h3>

          <p className="font-space text-slate-300 text-base sm:text-lg max-w-xl font-light leading-relaxed mb-8">
            Hands-on workshops in AR, VR, 3D development, WebXR, and spatial computing technologies will be introduced here.
          </p>

          {/* Upcoming Learning Tracks Preview */}
          <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {upcomingTopics.map((topic, index) => (
              <div
                key={index}
                className="glass-panel p-3 rounded-xl border-purple-500/15 text-slate-300 font-mono text-xs flex items-center gap-2.5 text-left"
              >
                <Terminal size={14} className="text-cyan-400 shrink-0" />
                <span>{topic}</span>
              </div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
