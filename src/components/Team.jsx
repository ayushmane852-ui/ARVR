import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Cpu, Code2, Layers, Compass, Terminal, Shield, Globe } from 'lucide-react';

const GithubIcon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Team() {
  const teamMembers = [
    {
      name: "Prof. Spatial Mentor",
      role: "Faculty Advisor",
      domain: "Computer Science & Engineering",
      bio: "Guiding the next generation of spatial computing researchers, 3D graphics engineers, and immersive tech innovators.",
      icon: Shield,
      color: "from-amber-400 to-yellow-600",
      borderColor: "border-amber-500/30 hover:border-amber-400/60",
      socials: { linkedin: "#", github: "#", email: "advisor@kitcoek.in" }
    },
    {
      name: "Lead Spatial Architect",
      role: "Club President",
      domain: "AR/VR & Volumetric Media",
      bio: "Passionate about spatial UI design, WebXR integration, and real-time pass-through computing.",
      icon: Cpu,
      color: "from-cyan-400 to-blue-600",
      borderColor: "border-cyan-500/30 hover:border-cyan-400/60",
      socials: { linkedin: "#", github: "#", email: "president@kitcoek.in" }
    },
    {
      name: "VR Systems Lead",
      role: "Vice President",
      domain: "Unity & Unreal Engine",
      bio: "Specializing in full-immersion 3D environments, spatial audio rendering, and physical haptics.",
      icon: Layers,
      color: "from-purple-400 to-indigo-600",
      borderColor: "border-purple-500/30 hover:border-purple-400/60",
      socials: { linkedin: "#", github: "#", email: "vp@kitcoek.in" }
    },
    {
      name: "WebGL & 3D Dev Lead",
      role: "Technical Lead",
      domain: "Three.js, WebGL & Shaders",
      bio: "Architecting interactive web 3D graphics, custom GLSL shaders, and browser-based spatial engines.",
      icon: Code2,
      color: "from-pink-400 to-rose-600",
      borderColor: "border-pink-500/30 hover:border-pink-400/60",
      socials: { linkedin: "#", github: "#", email: "tech@kitcoek.in" }
    },
    {
      name: "Spatial UX Lead",
      role: "Design Lead",
      domain: "3D Motion & Spatial Reticles",
      bio: "Designing spatial gesture controls, gaze tracking reticles, and futuristic glassmorphic interfaces.",
      icon: Compass,
      color: "from-emerald-400 to-teal-600",
      borderColor: "border-emerald-500/30 hover:border-emerald-400/60",
      socials: { linkedin: "#", github: "#", email: "design@kitcoek.in" }
    },
    {
      name: "Operations & Events Lead",
      role: "Event Coordinator",
      domain: "Community & Hackathons",
      bio: "Organizing immersive AR/VR workshops, spatial computing hackathons, and industry hands-on sessions.",
      icon: Terminal,
      color: "from-cyan-400 to-purple-600",
      borderColor: "border-cyan-500/30 hover:border-cyan-400/60",
      socials: { linkedin: "#", github: "#", email: "events@kitcoek.in" }
    }
  ];

  return (
    <section id="team" className="relative py-24 sm:py-32 px-6 overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-cyan-500/30 mb-3"
          >
            <Sparkles size={14} className="text-cyan-400" />
            <span className="font-mono text-xs text-cyan-300 tracking-wider uppercase font-semibold">
              SPATIAL ENGINEERS & LEADERSHIP
            </span>
          </motion.div>

          <h2 className="font-orbitron font-black text-4xl sm:text-5xl tracking-tight text-white text-glow-cyan">
            OUR TEAM
          </h2>
          <p className="font-space text-slate-400 text-sm sm:text-base max-w-xl mt-3 font-light">
            Meet the passionate engineers, designers, and visionaries driving the AR/VR Spatial Computing Innovation Lab.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 via-white to-purple-500 rounded-full mt-4" />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {teamMembers.map((member, idx) => {
            const IconComp = member.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`glass-panel rounded-3xl p-6 sm:p-7 border ${member.borderColor} transition-all duration-300 relative group flex flex-col justify-between hover:shadow-[0_10px_35px_rgba(0,240,255,0.15)]`}
              >
                {/* Top Member Card Header */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    {/* Avatar Icon Container with Gradient Aura */}
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${member.color} p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                        <div className="w-full h-full bg-slate-950/90 rounded-[14px] flex items-center justify-center text-cyan-300">
                          <IconComp size={26} />
                        </div>
                      </div>
                      <span className="w-3 h-3 rounded-full bg-cyan-400 absolute -top-1 -right-1 animate-ping" />
                    </div>

                    {/* Role Pill */}
                    <span className="font-mono text-[10px] sm:text-xs tracking-wider font-semibold uppercase px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {member.role}
                    </span>
                  </div>

                  {/* Name & Domain */}
                  <h3 className="font-orbitron font-bold text-xl text-white group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h3>
                  <span className="font-rajdhani text-xs tracking-widest text-cyan-400/80 uppercase font-semibold block mt-1 mb-3">
                    {member.domain}
                  </span>

                  {/* Bio */}
                  <p className="font-space text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                {/* Footer Social Links */}
                <div className="border-t border-cyan-500/15 pt-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-500 tracking-wider">
                    SPATIAL COMPUTING
                  </span>

                  <div className="flex items-center gap-3">
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="GitHub Profile"
                      >
                        <GithubIcon />
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                        aria-label="LinkedIn Profile"
                      >
                        <LinkedinIcon />
                      </a>
                    )}
                    {member.socials.email && (
                      <a
                        href={`mailto:${member.socials.email}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors"
                        aria-label="Email"
                      >
                        <Mail size={16} />
                      </a>
                    )}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
