import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Cpu, Layers, Crown, Terminal, Compass, Zap, Scan, Code2 } from 'lucide-react';

export default function Team() {
  const [activeTab, setActiveTab] = useState('all');

  // Exact sequence of positions requested by user
  const teamMembers = [
    // 1. President
    {
      id: 'president',
      role: 'President',
      category: 'executive',
      image: '/Images/Team/president.png',
      tag: 'CHIEF EXECUTIVE',
      status: 'CORE_COMMAND',
      color: 'from-cyan-400 via-blue-500 to-indigo-600',
      glowColor: 'rgba(0, 240, 255, 0.4)',
      borderColor: 'border-cyan-400/60 hover:border-cyan-300',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50',
      rank: '01 // EXECUTIVE',
      icon: Crown,
      featured: true,
    },
    // 2. Club Coordinator
    {
      id: 'club_coordinator',
      role: 'Club Coordinator',
      category: 'executive',
      image: '/Images/Team/Club coordinator.png',
      tag: 'HEAD COORDINATOR',
      status: 'OPERATIONS_LEAD',
      color: 'from-purple-400 via-pink-500 to-rose-600',
      glowColor: 'rgba(168, 85, 247, 0.4)',
      borderColor: 'border-purple-400/60 hover:border-purple-300',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/50',
      rank: '02 // COORDINATION',
      icon: Shield,
      featured: true,
    },
    // 3. Vice President 1
    {
      id: 'vp1',
      role: 'Vice President',
      category: 'executive',
      image: '/Images/Team/Vice president.png',
      tag: 'VICE PRESIDENT',
      status: 'EXEC_STRATEGY',
      color: 'from-blue-400 via-cyan-500 to-teal-500',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      borderColor: 'border-blue-400/60 hover:border-blue-300',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-400/50',
      rank: '03 // VP_CORE',
      icon: Cpu,
      featured: true,
    },
    // 4. Vice President 2
    {
      id: 'vp2',
      role: 'Vice President',
      category: 'executive',
      image: '/Images/Team/Vice president (2).png',
      tag: 'VICE PRESIDENT',
      status: 'EXEC_INNOVATION',
      color: 'from-indigo-400 via-purple-500 to-pink-500',
      glowColor: 'rgba(129, 140, 248, 0.4)',
      borderColor: 'border-indigo-400/60 hover:border-indigo-300',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/50',
      rank: '04 // VP_TECH',
      icon: Layers,
      featured: true,
    },
    // 5. Secretary
    {
      id: 'secretary',
      role: 'Secretary',
      category: 'board',
      image: '/Images/Team/Secretory.png',
      tag: 'GENERAL SECRETARY',
      status: 'ADMIN_LEAD',
      color: 'from-emerald-400 to-teal-600',
      glowColor: 'rgba(52, 211, 153, 0.35)',
      borderColor: 'border-emerald-500/40 hover:border-emerald-300',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
      rank: '05 // SECRETARY',
      icon: Terminal,
    },
    // 6. Treasurer
    {
      id: 'treasurer',
      role: 'Treasurer',
      category: 'board',
      image: '/Images/Team/Treasure.png',
      tag: 'FINANCE & ASSETS',
      status: 'TREASURY_LEAD',
      color: 'from-amber-400 to-yellow-600',
      glowColor: 'rgba(251, 191, 36, 0.35)',
      borderColor: 'border-amber-500/40 hover:border-amber-300',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      rank: '06 // TREASURER',
      icon: Zap,
    },
    // 7. Technical Head
    {
      id: 'technical_head',
      role: 'Technical Head',
      category: 'board',
      image: '/Images/Team/Technical head.jpeg',
      tag: 'TECHNICAL LEAD',
      status: 'TECH_ARCHITECTURE',
      color: 'from-pink-400 to-rose-600',
      glowColor: 'rgba(244, 63, 94, 0.35)',
      borderColor: 'border-pink-500/40 hover:border-pink-300',
      badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-400/40',
      rank: '07 // TECH_HEAD',
      icon: Code2,
    },
    // 8. Developer
    {
      id: 'developer',
      role: 'Developer',
      category: 'domain',
      image: '/Images/Team/Developer.jpeg',
      tag: 'CORE DEVELOPER',
      status: 'SPATIAL_DEV',
      color: 'from-cyan-400 to-blue-600',
      glowColor: 'rgba(6, 182, 212, 0.35)',
      borderColor: 'border-cyan-500/40 hover:border-cyan-300',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
      rank: '08 // DEVELOPER',
      icon: Scan,
    },
    // 9. Doc Head
    {
      id: 'doc_head',
      role: 'Doc Head',
      category: 'domain',
      image: '/Images/Team/Doc head.jpeg',
      tag: 'DOCUMENTATION HEAD',
      status: 'RESEARCH_DOCS',
      color: 'from-sky-400 to-indigo-600',
      glowColor: 'rgba(56, 189, 248, 0.35)',
      borderColor: 'border-sky-500/40 hover:border-sky-300',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
      rank: '09 // DOC_HEAD',
      icon: Terminal,
    },
    // 10. Media Head
    {
      id: 'media_head',
      role: 'Media Head',
      category: 'domain',
      image: '/Images/Team/Media head.jpeg',
      tag: 'MEDIA & PR HEAD',
      status: 'PUBLIC_RELATIONS',
      color: 'from-fuchsia-400 to-pink-600',
      glowColor: 'rgba(232, 121, 249, 0.35)',
      borderColor: 'border-fuchsia-500/40 hover:border-fuchsia-300',
      badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/40',
      rank: '10 // MEDIA_HEAD',
      icon: Sparkles,
    },
    // 11. Design Head
    {
      id: 'design_head',
      role: 'Design Head',
      category: 'domain',
      image: '/Images/Team/Design head.jpeg',
      tag: 'DESIGN & UI/UX HEAD',
      status: 'CREATIVE_DIRECTION',
      color: 'from-violet-400 to-purple-600',
      glowColor: 'rgba(167, 139, 250, 0.35)',
      borderColor: 'border-violet-500/40 hover:border-violet-300',
      badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-400/40',
      rank: '11 // DESIGN_HEAD',
      icon: Compass,
    },
    // 12. Logistic Head
    {
      id: 'logistic_head',
      role: 'Logistic Head',
      category: 'domain',
      image: '/Images/Team/Logistic head.jpeg',
      tag: 'LOGISTICS HEAD',
      status: 'OPERATIONS_SUPPORT',
      color: 'from-teal-400 to-emerald-600',
      glowColor: 'rgba(45, 212, 191, 0.35)',
      borderColor: 'border-teal-500/40 hover:border-teal-300',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-400/40',
      rank: '12 // LOGISTIC_HEAD',
      icon: Shield,
    },
  ];

  const executiveMembers = teamMembers.filter((m) => m.category === 'executive');
  const boardMembers = teamMembers.filter((m) => m.category === 'board');
  const domainMembers = teamMembers.filter((m) => m.category === 'domain');

  return (
    <section id="team" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Cyber Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-cyan-500/30 mb-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
          >
            <Sparkles size={14} className="text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-cyan-300 tracking-widest uppercase font-semibold">
              SPATIAL LEADERSHIP MATRIX
            </span>
          </motion.div>

          <h2 className="font-orbitron font-black text-4xl sm:text-6xl tracking-tight text-white text-glow-cyan">
            OUR TEAM
          </h2>
          <p className="font-space text-slate-300 text-sm sm:text-base max-w-2xl mt-3 font-light leading-relaxed">
            The visionary engineers, designers, and strategic leads driving the AR/VR Spatial Computing Lab.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-white to-purple-500 rounded-full mt-4" />
        </div>

        {/* TIER 1: EXECUTIVE COMMAND (President, Club Coordinator, Vice Presidents) */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Crown size={18} className="text-cyan-400" />
            <h3 className="font-orbitron font-bold text-lg sm:text-xl tracking-wider uppercase text-cyan-300">
              EXECUTIVE COMMAND
            </h3>
            <div className="w-12 h-[1px] bg-cyan-500/30" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {executiveMembers.map((member, idx) => {
              const IconComp = member.icon;
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`glass-panel rounded-3xl p-5 sm:p-6 border ${member.borderColor} transition-all duration-500 relative group flex flex-col justify-between hover:-translate-y-2`}
                  style={{
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Glowing aura on hover */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: `0 0 40px ${member.glowColor}`,
                    }}
                  />

                  {/* Corner Status Marker */}
                  <div className="flex items-center justify-between font-mono text-[9px] text-cyan-400/70 mb-4 border-b border-cyan-500/15 pb-2">
                    <span className="tracking-widest uppercase">{member.rank}</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      ACTIVE
                    </span>
                  </div>

                  {/* Creative Profile Image Frame */}
                  <div className="relative mb-5 flex justify-center">
                    <div className={`relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl p-1 bg-gradient-to-tr ${member.color} shadow-xl group-hover:scale-105 transition-transform duration-500`}>
                      <div className="w-full h-full rounded-xl overflow-hidden bg-slate-950/90 relative">
                        <img
                          src={member.image}
                          alt={member.role}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter contrast-105"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                      </div>
                    </div>

                    {/* Cyber Badge Icon */}
                    <div className="absolute -bottom-2 right-4 p-2 rounded-xl bg-slate-950 border border-cyan-500/40 text-cyan-400 shadow-lg group-hover:rotate-12 transition-transform">
                      <IconComp size={18} />
                    </div>
                  </div>

                  {/* Title & Tag */}
                  <div className="text-center">
                    <span className={`inline-block font-mono text-[10px] tracking-wider font-semibold uppercase px-3 py-1 rounded-full ${member.badgeColor} border mb-2`}>
                      {member.tag}
                    </span>
                    <h4 className="font-orbitron font-extrabold text-xl text-white group-hover:text-cyan-300 transition-colors">
                      {member.role}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* TIER 2: CORE BOARD (Secretary, Treasurer, Technical Head) */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Cpu size={18} className="text-purple-400" />
            <h3 className="font-orbitron font-bold text-lg sm:text-xl tracking-wider uppercase text-purple-300">
              CORE OPERATIONS BOARD
            </h3>
            <div className="w-12 h-[1px] bg-purple-500/30" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {boardMembers.map((member, idx) => {
              const IconComp = member.icon;
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`glass-panel rounded-3xl p-5 border ${member.borderColor} transition-all duration-500 relative group flex flex-col justify-between hover:-translate-y-2`}
                >
                  <div className="flex items-center justify-between font-mono text-[9px] text-slate-400 mb-4 border-b border-cyan-500/15 pb-2">
                    <span className="tracking-widest uppercase">{member.rank}</span>
                    <span className="text-cyan-400">{member.status}</span>
                  </div>

                  <div className="relative mb-4 flex justify-center">
                    <div className={`relative w-40 h-40 rounded-2xl p-0.5 bg-gradient-to-tr ${member.color} shadow-lg group-hover:scale-105 transition-transform duration-500`}>
                      <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-950 relative">
                        <img
                          src={member.image}
                          alt={member.role}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    </div>

                    <div className="absolute -bottom-2 right-6 p-2 rounded-xl bg-slate-950 border border-purple-500/40 text-purple-400 shadow-md">
                      <IconComp size={16} />
                    </div>
                  </div>

                  <div className="text-center">
                    <span className={`inline-block font-mono text-[9px] tracking-wider font-semibold uppercase px-2.5 py-0.5 rounded-full ${member.badgeColor} border mb-1.5`}>
                      {member.tag}
                    </span>
                    <h4 className="font-orbitron font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                      {member.role}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* TIER 3: DOMAIN HEADS & LEADS (Developer, Doc Head, Media Head, Design Head, Logistic Head) */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-8">
            <Layers size={18} className="text-pink-400" />
            <h3 className="font-orbitron font-bold text-lg sm:text-xl tracking-wider uppercase text-pink-300">
              DOMAIN LEADERSHIP
            </h3>
            <div className="w-12 h-[1px] bg-pink-500/30" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {domainMembers.map((member, idx) => {
              const IconComp = member.icon;
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`glass-panel rounded-2xl p-4 border ${member.borderColor} transition-all duration-500 relative group flex flex-col justify-between hover:-translate-y-1.5`}
                >
                  <div className="font-mono text-[9px] text-slate-500 mb-3 border-b border-cyan-500/10 pb-1.5 flex justify-between">
                    <span>{member.rank}</span>
                    <span className="text-pink-400/80">LEAD</span>
                  </div>

                  <div className="relative mb-3 flex justify-center">
                    <div className={`relative w-36 h-36 rounded-xl p-0.5 bg-gradient-to-tr ${member.color} shadow-md group-hover:scale-105 transition-transform duration-500`}>
                      <div className="w-full h-full rounded-[10px] overflow-hidden bg-slate-950 relative">
                        <img
                          src={member.image}
                          alt={member.role}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    </div>

                    <div className="absolute -bottom-1.5 right-4 p-1.5 rounded-lg bg-slate-950 border border-pink-500/40 text-pink-400">
                      <IconComp size={14} />
                    </div>
                  </div>

                  <div className="text-center">
                    <span className={`inline-block font-mono text-[8px] tracking-wider font-semibold uppercase px-2 py-0.5 rounded-full ${member.badgeColor} border mb-1`}>
                      {member.tag}
                    </span>
                    <h4 className="font-orbitron font-bold text-base text-white group-hover:text-pink-300 transition-colors">
                      {member.role}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
