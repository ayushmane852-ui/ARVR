import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shield, Cpu, Layers, Crown, Terminal, Compass, Zap, Scan, Code2, X, Maximize2, Users, ArrowRight, UserPlus } from 'lucide-react';

export default function Team() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [viewingTeamForDomain, setViewingTeamForDomain] = useState(null);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedMember(null);
        setViewingTeamForDomain(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const teamMembers = [
    // 1. Executive Command
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
    },
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
    },
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
    },
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
    },

    // 2. Core Operations Board (2 Treasurers + Secretary)
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
    {
      id: 'treasurer1',
      role: 'Treasurer',
      category: 'board',
      image: '/Images/Team/Treasure.png',
      tag: 'FINANCE & ASSETS',
      status: 'TREASURY_LEAD',
      color: 'from-amber-400 to-yellow-600',
      glowColor: 'rgba(251, 191, 36, 0.35)',
      borderColor: 'border-amber-500/40 hover:border-amber-300',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      rank: '06 // TREASURER I',
      icon: Zap,
    },
    {
      id: 'treasurer2',
      role: 'Treasurer',
      category: 'board',
      image: '/Images/Team/Treasure.jpeg',
      tag: 'FINANCE & ASSETS',
      status: 'TREASURY_LEAD',
      color: 'from-amber-400 to-yellow-500',
      glowColor: 'rgba(251, 191, 36, 0.35)',
      borderColor: 'border-amber-500/40 hover:border-amber-300',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      rank: '07 // TREASURER II',
      icon: Zap,
    },

    // 3. Domain Leadership
    {
      id: 'technical_head',
      role: 'Technical Head',
      category: 'domain',
      image: '/Images/Team/Technical head.jpeg',
      tag: 'TECHNICAL LEAD',
      status: 'TECH_ARCHITECTURE',
      color: 'from-pink-400 to-rose-600',
      glowColor: 'rgba(244, 63, 94, 0.35)',
      borderColor: 'border-pink-500/40 hover:border-pink-300',
      badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-400/40',
      rank: '08 // TECH_HEAD',
      icon: Code2,
      subTeam: [
        {
          id: 'technical_co_head',
          role: 'Technical Co-head',
          image: '/Images/Team/Technical Co-head.jpeg',
          tag: 'TECHNICAL CO-LEAD',
          rank: 'TECH_MEMBER_01',
          status: 'SPATIAL_DEV',
          badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
        }
      ]
    },
    {
      id: 'content_creativity_head',
      role: 'Content & Creativity Head',
      category: 'domain',
      image: '/Images/Team/Content and Creativity head.jpeg',
      tag: 'CREATIVE LEAD',
      status: 'CREATIVE_DIRECTION',
      color: 'from-amber-400 via-orange-500 to-red-500',
      glowColor: 'rgba(245, 158, 11, 0.35)',
      borderColor: 'border-amber-500/40 hover:border-amber-300',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      rank: '09 // CREATIVE_HEAD',
      icon: Sparkles,
      subTeam: []
    },
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
      rank: '10 // DOC_HEAD',
      icon: Terminal,
      subTeam: []
    },
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
      rank: '11 // MEDIA_HEAD',
      icon: Sparkles,
      subTeam: []
    },
    {
      id: 'design_head',
      role: 'Design Head',
      category: 'domain',
      image: '/Images/Team/Design head.jpeg',
      tag: 'DESIGN & UI/UX HEAD',
      status: 'CREATIVE_DESIGN',
      color: 'from-violet-400 to-purple-600',
      glowColor: 'rgba(167, 139, 250, 0.35)',
      borderColor: 'border-violet-500/40 hover:border-violet-300',
      badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-400/40',
      rank: '12 // DESIGN_HEAD',
      icon: Compass,
      subTeam: []
    },
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
      rank: '13 // LOGISTIC_HEAD',
      icon: Shield,
      subTeam: []
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
            The visionary engineers, designers, and strategic leads driving the AR/VR Spatial Computing Lab. Click any photo to enlarge or use "View Team" to see department members.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-white to-purple-500 rounded-full mt-4" />
        </div>

        {/* TIER 1: EXECUTIVE COMMAND */}
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
                  onClick={() => setSelectedMember(member)}
                  className={`glass-panel rounded-3xl p-5 sm:p-6 border ${member.borderColor} transition-all duration-500 relative group flex flex-col justify-between hover:-translate-y-2 cursor-pointer`}
                  style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                >
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: `0 0 40px ${member.glowColor}` }}
                  />

                  <div className="flex items-center justify-between font-mono text-[9px] text-cyan-400/70 mb-4 border-b border-cyan-500/15 pb-2">
                    <span className="tracking-widest uppercase">{member.rank}</span>
                    <span className="flex items-center gap-1 text-cyan-400 opacity-80 group-hover:opacity-100">
                      <Maximize2 size={11} /> CLICK TO VIEW
                    </span>
                  </div>

                  <div className="relative mb-5 flex justify-center">
                    <div className={`relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl p-1 bg-gradient-to-tr ${member.color} shadow-xl group-hover:scale-105 transition-transform duration-500`}>
                      <div className="w-full h-full rounded-xl overflow-hidden bg-slate-950/90 relative">
                        <img
                          src={member.image}
                          alt={member.role}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter contrast-105"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="p-3 rounded-full bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                            <Maximize2 size={22} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -bottom-2 right-4 p-2 rounded-xl bg-slate-950 border border-cyan-500/40 text-cyan-400 shadow-lg group-hover:rotate-12 transition-transform">
                      <IconComp size={18} />
                    </div>
                  </div>

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

        {/* TIER 2: CORE OPERATIONS BOARD (Secretary & 2 Treasurers) */}
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
                  onClick={() => setSelectedMember(member)}
                  className={`glass-panel rounded-3xl p-5 border ${member.borderColor} transition-all duration-500 relative group flex flex-col justify-between hover:-translate-y-2 cursor-pointer`}
                >
                  <div className="flex items-center justify-between font-mono text-[9px] text-slate-400 mb-4 border-b border-cyan-500/15 pb-2">
                    <span className="tracking-widest uppercase">{member.rank}</span>
                    <span className="text-purple-400 opacity-80 group-hover:opacity-100 flex items-center gap-1">
                      <Maximize2 size={10} /> VIEW PHOTO
                    </span>
                  </div>

                  <div className="relative mb-4 flex justify-center">
                    <div className={`relative w-40 h-40 rounded-2xl p-0.5 bg-gradient-to-tr ${member.color} shadow-lg group-hover:scale-105 transition-transform duration-500`}>
                      <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-950 relative">
                        <img
                          src={member.image}
                          alt={member.role}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="p-2.5 rounded-full bg-purple-500/30 border border-purple-400/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                            <Maximize2 size={20} />
                          </div>
                        </div>
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

        {/* TIER 3: DOMAIN LEADERSHIP (Technical Head, Content & Creativity, Doc, Media, Design, Logistic) */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-8">
            <Layers size={18} className="text-pink-400" />
            <h3 className="font-orbitron font-bold text-lg sm:text-xl tracking-wider uppercase text-pink-300">
              DOMAIN LEADERSHIP
            </h3>
            <div className="w-12 h-[1px] bg-pink-500/30" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {domainMembers.map((member, idx) => {
              const IconComp = member.icon;
              const subCount = member.subTeam ? member.subTeam.length : 0;

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`glass-panel rounded-3xl p-6 border ${member.borderColor} transition-all duration-500 relative group flex flex-col justify-between hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)]`}
                >
                  <div>
                    {/* Header bar */}
                    <div className="font-mono text-[9px] text-slate-400 mb-4 border-b border-cyan-500/15 pb-2 flex items-center justify-between">
                      <span>{member.rank}</span>
                      <span className="text-pink-400/90 uppercase font-semibold">DOMAIN HEAD</span>
                    </div>

                    {/* Image frame */}
                    <div 
                      onClick={() => setSelectedMember(member)}
                      className="relative mb-5 flex justify-center cursor-pointer"
                    >
                      <div className={`relative w-44 h-44 rounded-2xl p-0.5 bg-gradient-to-tr ${member.color} shadow-lg group-hover:scale-105 transition-transform duration-500`}>
                        <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-950 relative">
                          <img
                            src={member.image}
                            alt={member.role}
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="p-2.5 rounded-full bg-pink-500/30 border border-pink-400/50 text-pink-300 shadow-[0_0_15px_rgba(244,63,94,0.5)]">
                              <Maximize2 size={20} />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute -bottom-2 right-6 p-2 rounded-xl bg-slate-950 border border-pink-500/40 text-pink-400 shadow-md">
                        <IconComp size={16} />
                      </div>
                    </div>

                    {/* Role & Tag */}
                    <div className="text-center mb-4">
                      <span className={`inline-block font-mono text-[9px] tracking-wider font-semibold uppercase px-3 py-1 rounded-full ${member.badgeColor} border mb-2`}>
                        {member.tag}
                      </span>
                      <h4 className="font-orbitron font-bold text-xl text-white group-hover:text-pink-300 transition-colors">
                        {member.role}
                      </h4>
                    </div>
                  </div>

                  {/* VIEW TEAM BUTTON BELOW PHOTO */}
                  <div className="pt-3 border-t border-cyan-500/15">
                    <button
                      onClick={() => setViewingTeamForDomain(member)}
                      className="w-full py-2.5 px-4 rounded-xl font-orbitron font-bold text-xs tracking-wider uppercase bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/60 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.1)] group/btn"
                    >
                      <Users size={14} className="text-cyan-400 group-hover/btn:scale-110 transition-transform" />
                      <span>VIEW TEAM</span>
                      {subCount > 0 && (
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">
                          {subCount}
                        </span>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

      {/* FULL-SCREEN SPATIAL IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-2xl cursor-zoom-out overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full glass-panel border border-cyan-500/40 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-[0_0_80px_rgba(0,240,255,0.25)] flex flex-col items-center text-center cursor-default my-auto"
            >
              <div className="absolute top-4 left-6 font-mono text-[10px] text-cyan-400/70 tracking-widest uppercase">
                SYSTEM // FULL_IMAGE_VIEW
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-6 p-2 rounded-full glass-panel border-cyan-500/30 text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer group"
                aria-label="Close Lightbox"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300 text-cyan-400" />
              </button>

              <div className="mt-4 mb-5">
                <span className={`inline-block font-mono text-xs tracking-wider font-semibold uppercase px-3 py-1 rounded-full ${selectedMember.badgeColor || 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'} border mb-2`}>
                  {selectedMember.tag}
                </span>
                <h3 className="font-orbitron font-black text-2xl sm:text-3xl text-white text-glow-cyan">
                  {selectedMember.role}
                </h3>
              </div>

              <div className="relative max-h-[55vh] sm:max-h-[60vh] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-slate-950/80 p-2 border border-cyan-500/20 shadow-2xl">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.role}
                  className="max-h-[50vh] sm:max-h-[55vh] w-auto max-w-full object-contain rounded-xl shadow-lg border border-cyan-500/20"
                />
              </div>

              <div className="mt-5 flex items-center justify-between w-full font-mono text-xs text-slate-400 border-t border-cyan-500/15 pt-3">
                <span>RANK: {selectedMember.rank}</span>
                <span className="text-cyan-400 font-semibold uppercase">PRESS ESC OR CLICK OUTSIDE TO CLOSE</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DEPARTMENT TEAM MEMBERS MODAL ("VIEW TEAM") */}
      <AnimatePresence>
        {viewingTeamForDomain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingTeamForDomain(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-2xl overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full glass-panel border border-cyan-500/40 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-[0_0_80px_rgba(0,240,255,0.25)] flex flex-col cursor-default my-auto"
            >
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
                <div>
                  <span className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase block">
                    DEPARTMENT TEAM MEMBERS // {viewingTeamForDomain.rank}
                  </span>
                  <h3 className="font-orbitron font-black text-2xl sm:text-3xl text-white text-glow-cyan mt-1">
                    {viewingTeamForDomain.role.replace(/\s+Head$/i, '')} TEAM
                  </h3>
                </div>

                <button
                  onClick={() => setViewingTeamForDomain(null)}
                  className="p-2 rounded-full glass-panel border-cyan-500/30 text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer group"
                  aria-label="Close Team Modal"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform duration-300 text-cyan-400" />
                </button>
              </div>

              {/* Sub-Team Members List */}
              {viewingTeamForDomain.subTeam && viewingTeamForDomain.subTeam.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {viewingTeamForDomain.subTeam.map((member) => (
                    <motion.div
                      key={member.id}
                      onClick={() => {
                        setSelectedMember(member);
                      }}
                      className="glass-panel p-4 rounded-2xl border border-cyan-500/30 hover:border-cyan-400 bg-slate-950/60 hover:bg-cyan-500/10 transition-all cursor-pointer flex items-center gap-4 group"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-cyan-400/40 flex-shrink-0 relative">
                        <img 
                          src={member.image} 
                          alt={member.role} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 size={16} className="text-white" />
                        </div>
                      </div>

                      <div className="text-left flex-grow">
                        <span className={`inline-block font-mono text-[9px] tracking-wider font-semibold uppercase px-2 py-0.5 rounded-full ${member.badgeColor || 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'} border mb-1`}>
                          {member.tag}
                        </span>
                        <h4 className="font-orbitron font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                          {member.role}
                        </h4>
                        <span className="font-mono text-[10px] text-slate-400 block mt-0.5">
                          {member.rank}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="glass-panel p-8 rounded-2xl border border-cyan-500/20 text-center flex flex-col items-center justify-center space-y-3 bg-slate-950/40">
                  <div className="p-4 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    <UserPlus size={28} />
                  </div>
                  <h4 className="font-orbitron font-bold text-lg text-white">
                    RECRUITMENT ACTIVE FOR {viewingTeamForDomain.role.toUpperCase()}
                  </h4>
                  <p className="font-space text-slate-400 text-xs sm:text-sm max-w-md">
                    Team members for this department will be displayed here soon. Stay tuned as new spatial engineers and domain specialists join the club!
                  </p>
                </div>
              )}

              <div className="mt-6 border-t border-cyan-500/15 pt-4 flex items-center justify-between font-mono text-xs text-slate-400">
                <span>TOTAL MEMBERS: {viewingTeamForDomain.subTeam ? viewingTeamForDomain.subTeam.length : 0}</span>
                <span className="text-cyan-400 uppercase">CLICK ANY MEMBER TO VIEW HIGH-RES PHOTO</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
