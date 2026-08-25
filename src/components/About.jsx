import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, MeshWobbleMaterial } from '@react-three/drei';
import { Layers, Eye, Cpu, Box, Sparkles, Compass, Monitor } from 'lucide-react';

// Floating 3D Holographic Cube Canvas
function FloatingHoloCube() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} className="w-full h-full">
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} color="#00f0ff" intensity={1.5} />
      <pointLight position={[-5, -5, -5]} color="#8a2be2" intensity={2} />

      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        {/* Outer Wireframe Cube */}
        <mesh rotation={[0.4, 0.4, 0]}>
          <boxGeometry args={[1.6, 1.6, 1.6]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={1.2}
            wireframe
          />
        </mesh>

        {/* Inner Solid Pulsing Core Cube */}
        <mesh rotation={[-0.4, -0.4, 0]}>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <MeshWobbleMaterial
            color="#8a2be2"
            emissive="#8a2be2"
            emissiveIntensity={1}
            factor={0.3}
            speed={2}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>
    </Canvas>
  );
}

export default function About() {
  const domains = [
    { title: "Augmented Reality", desc: "Overlaying spatial digital graphics onto the physical world.", icon: Layers },
    { title: "Virtual Reality", desc: "Full 3D immersion environments & spatial audio.", icon: Eye },
    { title: "Mixed Reality", desc: "Blending physical and digital object interactions seamlessly.", icon: Cpu },
    { title: "3D Development", desc: "Real-time graphics, WebGL, Unity, Unreal Engine & shaders.", icon: Box },
    { title: "Spatial Computing", desc: "Natural spatial gesture tracking & eye-gaze interfaces.", icon: Compass },
    { title: "Immersive Tech", desc: "Emerging haptics, volumetric video & spatial environments.", icon: Monitor },
  ];

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-cyan-500/30 mb-3">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="font-mono text-xs text-cyan-300 tracking-wider uppercase">CORE INITIATIVE</span>
          </div>

          <h2 className="font-orbitron font-black text-4xl sm:text-5xl tracking-tight text-white text-glow-cyan">
            ABOUT ARVR
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4" />
        </div>

        {/* Main Content Grid: 3D Holographic Cube + Text Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive 3D Cube Canvas */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 h-[380px] sm:h-[450px] glass-panel rounded-3xl border-cyan-500/20 relative flex items-center justify-center p-4 overflow-hidden group hover:border-cyan-400/40"
          >
            {/* Corner HUD Markers */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-cyan-400/70">
              OBJECT // WIREFRAME_HYPERCUBE
            </div>
            <div className="absolute top-4 right-4 font-mono text-[10px] text-purple-400/70">
              STATE // REALTIME_ROTATION
            </div>

            {/* 3D Canvas */}
            <FloatingHoloCube />

            <div className="absolute bottom-4 left-4 right-4 text-center font-mono text-[11px] text-slate-400 bg-slate-900/80 backdrop-blur-md py-1.5 px-3 rounded-lg border border-cyan-500/20">
              Interactive 3D Spatial Wireframe Object
            </div>
          </motion.div>

          {/* Right Column: Mission Text & Focus Areas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/20">
              <h3 className="font-orbitron font-bold text-xl sm:text-2xl text-cyan-300 mb-4">
                Pioneering the Next Paradigm of Spatial Interaction
              </h3>
              <p className="font-space text-slate-300 text-base sm:text-lg leading-relaxed font-light mb-6">
                The <strong className="text-white font-medium">ARVR Club</strong> is an innovation-driven college community dedicated to exploring the intersection of digital media, spatial computing, and human experience. We delve into cutting-edge immersive technologies that redefine how we learn, build, and interact with information.
              </p>
              <p className="font-space text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                From real-time WebGL rendering to spatial head-mounted displays and volumetric environments, our club serves as an open sandbox for future spatial engineers, 3D artists, and spatial computing enthusiasts.
              </p>
            </div>

            {/* Tech Focus Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {domains.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div 
                    key={idx}
                    className="glass-panel p-4 rounded-xl border-cyan-500/15 hover:border-cyan-400/40 transition-colors flex items-start gap-3.5 group"
                  >
                    <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                      <IconComp size={20} />
                    </div>
                    <div>
                      <h4 className="font-orbitron font-semibold text-sm text-white group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="font-space text-xs text-slate-400 font-light mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
