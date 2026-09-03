import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Shield, Cpu, Layers, Crown, Terminal, Compass, Zap, Code2, X, Maximize2, 
  Users, UserPlus, Headphones, Video, Radio, Tv, Activity, Eye, GraduationCap, Award,
  Flame, Laptop, ChevronRight, Grid, Target
} from 'lucide-react';

export default function Team() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [viewingTeamForDomain, setViewingTeamForDomain] = useState(null);
  const [selectedDeskGroup, setSelectedDeskGroup] = useState(null);
  const [hoveredDesk, setHoveredDesk] = useState(null);

  // Mouse Cursor 3D Parallax Tracking & Spotlight Effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, px: 0, py: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      
      // Normalized coordinates (-1 to 1) for parallax calculation
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      const normalizedY = (relativeY / rect.height) * 2 - 1;

      setMousePos({
        x: relativeX,
        y: relativeY,
        px: normalizedX,
        py: normalizedY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedMember(null);
        setViewingTeamForDomain(null);
        setSelectedDeskGroup(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 1. Faculty Directorate Members
  const facultyMembers = [
    {
      id: 'hod_cse',
      name: 'Dr. Lingaraj Hadimani',
      role: 'HOD CSE',
      category: 'faculty',
      deskName: 'FACULTY DIRECTORATE DESK',
      image: '/Images/Team/faculty/Dr Lingaraj Hadimani.jpeg',
      fallbackImages: ['/Images/Team/faculty/HOD.jpeg', '/Images/Team/faculty/Dr Lingaraj Hadimani.jpg', '/Images/Team/faculty/HOD.jpg'],
      tag: 'CHIEF FACULTY PATRON',
      status: 'ACADEMIC_HEAD',
      color: 'from-amber-400 via-yellow-500 to-amber-600',
      glowColor: 'rgba(251, 191, 36, 0.45)',
      borderColor: 'border-amber-400/60 hover:border-amber-300',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/50',
      rank: 'FACULTY // HOD CSE',
      icon: GraduationCap,
      bio: 'Head of Computer Science & Engineering Department driving spatial computing research and AR/VR academic innovation.'
    },
    {
      id: 'faculty_coord',
      name: 'Anuradha Solanki',
      role: 'Faculty Coordinator',
      category: 'faculty',
      deskName: 'FACULTY DIRECTORATE DESK',
      image: '/Images/Team/faculty/Anuradha Solanki.jpeg',
      fallbackImages: ['/Images/Team/faculty/Faculty Coordinator.jpeg', '/Images/Team/faculty/Anuradha Solanki.jpg', '/Images/Team/faculty/Faculty Coordinator.jpg'],
      tag: 'FACULTY MENTOR',
      status: 'OPERATIONS_MENTOR',
      color: 'from-yellow-400 via-amber-400 to-orange-500',
      glowColor: 'rgba(245, 158, 11, 0.45)',
      borderColor: 'border-yellow-400/60 hover:border-yellow-300',
      badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50',
      rank: 'FACULTY // COORDINATOR',
      icon: Award,
      bio: 'Faculty Mentor coordinating AR/VR spatial engineering initiatives, lab activities, and departmental integration.'
    }
  ];

  // 2. Executive Command (Main Panel)
  const executiveMembers = [
    {
      id: 'president',
      role: 'President',
      category: 'executive',
      deskName: 'MAIN PANEL // EXECUTIVE DESK',
      image: '/Images/Team/main panel/President.jpeg',
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
      deskName: 'MAIN PANEL // EXECUTIVE DESK',
      image: '/Images/Team/main panel/Club Coordinator.jpeg',
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
      deskName: 'MAIN PANEL // EXECUTIVE DESK',
      image: '/Images/Team/main panel/Vice President.jpeg',
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
      deskName: 'MAIN PANEL // EXECUTIVE DESK',
      image: '/Images/Team/main panel/Vice President (2).jpeg',
      tag: 'VICE PRESIDENT',
      status: 'EXEC_INNOVATION',
      color: 'from-indigo-400 via-purple-500 to-pink-500',
      glowColor: 'rgba(129, 140, 248, 0.4)',
      borderColor: 'border-indigo-400/60 hover:border-indigo-300',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/50',
      rank: '04 // VP_TECH',
      icon: Layers,
    },
  ];

  // 3. Core Operations Board
  const boardMembers = [
    {
      id: 'secretary',
      role: 'Secretary',
      category: 'board',
      deskName: 'CORE OPERATIONS CONSOLE DESK',
      image: '/Images/Team/main panel/Secretory.jpeg',
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
      id: 'treasurer',
      role: 'Treasurer',
      category: 'board',
      deskName: 'CORE OPERATIONS CONSOLE DESK',
      image: '/Images/Team/main panel/Treasure.jpeg',
      tag: 'FINANCE & ASSETS',
      status: 'TREASURY_LEAD',
      color: 'from-amber-400 to-yellow-600',
      glowColor: 'rgba(251, 191, 36, 0.35)',
      borderColor: 'border-amber-500/40 hover:border-amber-300',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      rank: '06 // TREASURER',
      icon: Zap,
    },
  ];

  // 4. Domain Leadership
  const domainMembers = [
    {
      id: 'unity_head',
      role: 'Unity Head',
      category: 'domain',
      deskName: 'UNITY SPATIAL ENGINE WORKBENCH',
      image: '/Images/Team/Unity/Unity Head.jpeg',
      tag: 'UNITY LEAD',
      status: 'UNITY_ENGINE',
      color: 'from-cyan-400 via-teal-400 to-emerald-500',
      glowColor: 'rgba(6, 182, 212, 0.35)',
      borderColor: 'border-cyan-500/40 hover:border-cyan-300',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
      rank: '07 // UNITY_HEAD',
      icon: Cpu,
      subTeam: [
        { id: 'unity_team_1', role: 'Team Unity', image: '/Images/Team/Unity/Team Unity.jpeg' },
        { id: 'unity_team_2', role: 'Team Unity', image: '/Images/Team/Unity/Team Unity (2).jpeg' },
        { id: 'unity_team_3', role: 'Team Unity', image: '/Images/Team/Unity/Team Unity (3).jpeg' },
        { id: 'unity_team_4', role: 'Team Unity', image: '/Images/Team/Unity/Team Unity (4).jpeg' },
        { id: 'unity_team_5', role: 'Team Unity', image: '/Images/Team/Unity/Team Unity (5).jpeg' },
        { id: 'unity_team_6', role: 'Team Unity', image: '/Images/Team/Unity/Team Unity (6).jpeg' },
        { id: 'unity_team_7', role: 'Team Unity', image: '/Images/Team/Unity/Team Unity (7).jpeg' },
      ]
    },
    {
      id: 'technical_head',
      role: 'Technical Head',
      category: 'domain',
      deskName: 'SPATIAL ARCHITECTURE WORKBENCH',
      image: '/Images/Team/technical/Technical head.jpeg',
      tag: 'TECHNICAL LEAD',
      status: 'TECH_ARCHITECTURE',
      color: 'from-pink-400 to-rose-600',
      glowColor: 'rgba(244, 63, 94, 0.35)',
      borderColor: 'border-pink-500/40 hover:border-pink-300',
      badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-400/40',
      rank: '08 // TECH_HEAD',
      icon: Code2,
      subTeam: [
        { id: 'technical_co_head_1', role: 'Technical Co-head', image: '/Images/Team/technical/Technical Co-head.jpeg' },
        { id: 'technical_co_head_2', role: 'Technical Co-head', image: '/Images/Team/technical/Technical Co-head (2).jpeg' }
      ]
    },
    {
      id: 'content_creativity_head',
      role: 'Content & Creativity Head',
      category: 'domain',
      deskName: 'CREATIVE DIRECTION WORKBENCH',
      image: '/Images/Team/content & Creativity/Content and Creativity head.jpeg',
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
      role: 'Documentation Head',
      category: 'domain',
      deskName: 'RESEARCH & DOCUMENTATION CONSOLE',
      image: '/Images/Team/Documentation/Documentation Head.jpeg',
      tag: 'DOCUMENTATION HEAD',
      status: 'RESEARCH_DOCS',
      color: 'from-sky-400 to-indigo-600',
      glowColor: 'rgba(56, 189, 248, 0.35)',
      borderColor: 'border-sky-500/40 hover:border-sky-300',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
      rank: '10 // DOC_HEAD',
      icon: Terminal,
      subTeam: [
        { id: 'doc_co_head_1', role: 'Documentation Co-head', image: '/Images/Team/Documentation/Documentation Co-Head.jpeg' },
        { id: 'doc_co_head_2', role: 'Documentation Co-head', image: '/Images/Team/Documentation/Documentation Co-head (2).jpeg' },
        { id: 'doc_co_head_3', role: 'Documentation Co-head', image: '/Images/Team/Documentation/Documentation Co-head (3).jpeg' }
      ]
    },
    {
      id: 'media_head',
      role: 'Media Head',
      category: 'domain',
      deskName: 'MEDIA & PUBLIC RELATIONS WORKBENCH',
      image: '/Images/Team/Media/Media head.jpeg',
      tag: 'MEDIA & PR HEAD',
      status: 'PUBLIC_RELATIONS',
      color: 'from-fuchsia-400 to-pink-600',
      glowColor: 'rgba(232, 121, 249, 0.35)',
      borderColor: 'border-fuchsia-500/40 hover:border-fuchsia-300',
      badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/40',
      rank: '11 // MEDIA_HEAD',
      icon: Sparkles,
      subTeam: [
        { id: 'media_co_head', role: 'Media Co-head', image: '/Images/Team/Media/Media Co-head.jpeg' }
      ]
    },
    {
      id: 'design_head',
      role: 'Design Head',
      category: 'domain',
      deskName: 'UI/UX & SPATIAL DESIGN WORKBENCH',
      image: '/Images/Team/Design/Design head.jpeg',
      tag: 'DESIGN HEAD',
      status: 'CREATIVE_DESIGN',
      color: 'from-violet-400 to-purple-600',
      glowColor: 'rgba(167, 139, 250, 0.35)',
      borderColor: 'border-violet-500/40 hover:border-violet-300',
      badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-400/40',
      rank: '12 // DESIGN_HEAD',
      icon: Compass,
      subTeam: [
        { id: 'design_co_head', role: 'Design Co-head', image: '/Images/Team/Design/Design Co-head.jpeg' }
      ]
    },
    {
      id: 'logistic_head',
      role: 'Logistic Head',
      category: 'domain',
      deskName: 'SPATIAL LOGISTICS WORKBENCH',
      image: '/Images/Team/Logistic/Logistic Head.jpeg',
      tag: 'LOGISTICS HEAD',
      status: 'OPERATIONS_SUPPORT',
      color: 'from-teal-400 to-emerald-600',
      glowColor: 'rgba(45, 212, 191, 0.35)',
      borderColor: 'border-teal-500/40 hover:border-teal-300',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-400/40',
      rank: '13 // LOGISTIC_HEAD',
      icon: Shield,
      subTeam: [
        { id: 'logistic_co_head', role: 'Logistic Co-head', image: '/Images/Team/Logistic/Logistic Co-head.jpeg' }
      ]
    },
    {
      id: 'research_head',
      role: 'Research Head',
      category: 'domain',
      deskName: 'R&D SPATIAL COMPUTING LAB WORKBENCH',
      image: '/Images/Team/Research Head/Research Head.jpeg',
      tag: 'RESEARCH & R&D HEAD',
      status: 'SPATIAL_RESEARCH',
      color: 'from-cyan-400 to-blue-600',
      glowColor: 'rgba(6, 182, 212, 0.35)',
      borderColor: 'border-cyan-500/40 hover:border-cyan-300',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
      rank: '14 // RESEARCH_HEAD',
      icon: Cpu,
      subTeam: [
        { id: 'research_co_head', role: 'Research Co-head', image: '/Images/Team/Research Head/Research Head (2).jpeg' }
      ]
    },
    {
      id: 'event_head',
      role: 'Event Head',
      category: 'domain',
      deskName: 'EVENT MANAGEMENT & STAGING WORKBENCH',
      image: '/Images/Team/Event Heads/Event Head.jpeg',
      tag: 'EVENT HEAD',
      status: 'EVENTS_COMMAND',
      color: 'from-yellow-400 via-amber-500 to-orange-600',
      glowColor: 'rgba(234, 179, 8, 0.35)',
      borderColor: 'border-yellow-500/40 hover:border-yellow-300',
      badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/40',
      rank: '15 // EVENT_HEAD',
      icon: Crown,
      subTeam: [
        { id: 'event_co_head_1', role: 'Event Co-head', image: '/Images/Team/Event Heads/Event Head (2).jpeg' },
        { id: 'event_co_head_2', role: 'Event Co-head', image: '/Images/Team/Event Heads/Event Head (3).jpeg' }
      ]
    },
  ];

  // 5. Department Coordinators
  const coordinatorMembers = [
    {
      id: 'coord_biotech',
      role: 'BioTechnology',
      category: 'coordinator',
      deskName: 'DEPARTMENT COORDINATORS TERMINAL',
      image: '/Images/Team/Department Co-ordinators/BioTechnology.jpeg',
      tag: 'DEPT COORDINATOR',
      status: 'BIOTECH_LEAD',
      color: 'from-emerald-400 via-teal-500 to-green-600',
      glowColor: 'rgba(52, 211, 153, 0.35)',
      borderColor: 'border-emerald-500/40 hover:border-emerald-300',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
      rank: 'DEPT // BIOTECH',
      icon: Compass,
    },
    {
      id: 'coord_civil',
      role: 'Civil Engineering',
      category: 'coordinator',
      deskName: 'DEPARTMENT COORDINATORS TERMINAL',
      image: '/Images/Team/Department Co-ordinators/Civil Engineering.jpeg',
      tag: 'DEPT COORDINATOR',
      status: 'CIVIL_LEAD',
      color: 'from-amber-400 via-orange-500 to-yellow-600',
      glowColor: 'rgba(245, 158, 11, 0.35)',
      borderColor: 'border-amber-500/40 hover:border-amber-300',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      rank: 'DEPT // CIVIL',
      icon: Shield,
    },
    {
      id: 'coord_csbs',
      role: 'Computer Science & Business System',
      category: 'coordinator',
      deskName: 'DEPARTMENT COORDINATORS TERMINAL',
      image: '/Images/Team/Department Co-ordinators/Computer Science & Business System.jpeg',
      tag: 'DEPT COORDINATOR',
      status: 'CSBS_LEAD',
      color: 'from-purple-400 via-indigo-500 to-violet-600',
      glowColor: 'rgba(168, 85, 247, 0.35)',
      borderColor: 'border-purple-500/40 hover:border-purple-300',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
      rank: 'DEPT // CSBS',
      icon: Cpu,
    },
    {
      id: 'coord_cse',
      role: 'Computer Science & Engineering',
      category: 'coordinator',
      deskName: 'DEPARTMENT COORDINATORS TERMINAL',
      image: '/Images/Team/Department Co-ordinators/Computer Science & Engineering.jpeg',
      tag: 'DEPT COORDINATOR',
      status: 'CSE_LEAD',
      color: 'from-cyan-400 via-blue-500 to-indigo-600',
      glowColor: 'rgba(6, 182, 212, 0.35)',
      borderColor: 'border-cyan-500/40 hover:border-cyan-300',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
      rank: 'DEPT // CSE',
      icon: Code2,
    },
    {
      id: 'coord_aiml',
      role: 'CSE (AIML)',
      category: 'coordinator',
      deskName: 'DEPARTMENT COORDINATORS TERMINAL',
      image: '/Images/Team/Department Co-ordinators/CSE (AIML).jpeg',
      tag: 'DEPT COORDINATOR',
      status: 'AIML_LEAD',
      color: 'from-pink-400 via-rose-500 to-red-600',
      glowColor: 'rgba(244, 63, 94, 0.35)',
      borderColor: 'border-pink-500/40 hover:border-pink-300',
      badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-400/40',
      rank: 'DEPT // AIML',
      icon: Zap,
    },
    {
      id: 'coord_entc',
      role: 'Electronics & Telecommunication',
      category: 'coordinator',
      deskName: 'DEPARTMENT COORDINATORS TERMINAL',
      image: '/Images/Team/Department Co-ordinators/Electronics & Telecommunication Engineering.jpeg',
      tag: 'DEPT COORDINATOR',
      status: 'ENTC_LEAD',
      color: 'from-sky-400 via-blue-500 to-cyan-600',
      glowColor: 'rgba(56, 189, 248, 0.35)',
      borderColor: 'border-sky-500/40 hover:border-sky-300',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
      rank: 'DEPT // ENTC',
      icon: Terminal,
    },
  ];

  // 6. AR/VR Laboratory Equipment & Stations
  const arvrInstruments = [
    {
      id: 'inst_headset_bay',
      name: 'SPATIAL HEADSET LAB BAY',
      category: 'EQUIPMENT BAY // 01',
      desc: 'Meta Quest 3 & Apple Vision Pro spatial computing test benches with real-time pass-through calibration.',
      badge: 'SPATIAL HARDWARE',
      icon: Headphones,
      color: 'from-cyan-400 via-teal-400 to-blue-600',
      borderColor: 'border-cyan-400/50 hover:border-cyan-300',
      glowColor: 'rgba(0, 240, 255, 0.35)'
    },
    {
      id: 'inst_vfx_studio',
      name: 'VFX & VOLUMETRIC CAPTURE STUDIO',
      category: 'EQUIPMENT BAY // 02',
      desc: 'Unreal Engine virtual production rig, green screen studio, and real-time 3D spatial particle rendering node.',
      badge: 'VFX & RENDERING',
      icon: Video,
      color: 'from-fuchsia-400 via-purple-500 to-pink-600',
      borderColor: 'border-fuchsia-400/50 hover:border-fuchsia-300',
      glowColor: 'rgba(232, 121, 249, 0.35)'
    },
    {
      id: 'inst_haptics',
      name: 'HAPTIC & TACTILE SENSOR BAY',
      category: 'EQUIPMENT BAY // 03',
      desc: 'Force-feedback glove testing arrays, EMG wristband telemetry, and tactile spatial feedback transducers.',
      badge: 'TACTILE MATRIX',
      icon: Radio,
      color: 'from-emerald-400 via-teal-400 to-green-500',
      borderColor: 'border-emerald-400/50 hover:border-emerald-300',
      glowColor: 'rgba(52, 211, 153, 0.35)'
    },
    {
      id: 'inst_hologram',
      name: '3D HOLOGRAM & SOUNDFIELD POD',
      category: 'EQUIPMENT BAY // 04',
      desc: 'Lightfield holographic display tabletop coupled with 360-degree binaural spatial audio synthesis suite.',
      badge: 'HOLOGRAM & AUDIO',
      icon: Tv,
      color: 'from-amber-400 via-yellow-500 to-orange-500',
      borderColor: 'border-amber-400/50 hover:border-amber-300',
      glowColor: 'rgba(251, 191, 36, 0.35)'
    }
  ];

  // Image loader component with graceful fallbacks
  const SmartImage = ({ src, fallbackSrcs = [], alt, className }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [fallbackIdx, setFallbackIdx] = useState(0);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
      if (fallbackSrcs && fallbackIdx < fallbackSrcs.length) {
        setImgSrc(fallbackSrcs[fallbackIdx]);
        setFallbackIdx(fallbackIdx + 1);
      } else {
        setHasError(true);
      }
    };

    if (hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/90 text-cyan-400 p-4 text-center">
          <GraduationCap size={36} className="mb-2 text-cyan-300 animate-pulse" />
          <span className="font-orbitron font-bold text-xs uppercase text-slate-200">{alt}</span>
          <span className="font-mono text-[10px] text-cyan-400/80 mt-1">PHOTO LOADING...</span>
        </div>
      );
    }

    return (
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        onError={handleError}
      />
    );
  };

  return (
    <section 
      id="team" 
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden min-h-screen select-none"
    >
      
      {/* Interactive Cursor Spotlight Glow */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.08), transparent 70%)`
        }}
      />

      {/* Cyber Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Banner */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-cyan-500/30 mb-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
          >
            <Sparkles size={14} className="text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-cyan-300 tracking-widest uppercase font-semibold">
              ARVR VIRTUAL COMMAND OFFICE // SPATIAL LAB
            </span>
          </motion.div>

          <h2 className="font-orbitron font-black text-4xl sm:text-6xl tracking-tight text-white text-glow-cyan">
            ARVR HEADQUARTERS
          </h2>
          <p className="font-space text-slate-300 text-sm sm:text-base max-w-2xl mt-3 font-light leading-relaxed">
            Welcome to the ARVR Office Layout. Hover over any domain desk or lab station to inspect its operational terminal. Click any desk hub to open full team view on screen!
          </p>
          <div className="w-28 h-1 bg-gradient-to-r from-amber-400 via-cyan-400 to-purple-500 rounded-full mt-4" />
        </div>

        {/* 3D PARALLAX FLOOR CONTAINER */}
        <div 
          className="transition-transform duration-200 ease-out"
          style={{
            transform: `perspective(1200px) rotateX(${mousePos.py * -2.5}deg) rotateY(${mousePos.px * 3}deg)`
          }}
        >

          {/* ========================================================================= */}
          {/* ZONE 1: CENTER COMMAND DESK — FACULTY DIRECTORATE */}
          {/* ========================================================================= */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <GraduationCap size={22} className="text-amber-400 animate-pulse" />
              <h3 className="font-orbitron font-black text-xl sm:text-2xl tracking-wider uppercase text-amber-300">
                FACULTY DIRECTORATE DESK
              </h3>
              <div className="w-16 h-[1px] bg-amber-500/40" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedDeskGroup({
                title: 'FACULTY DIRECTORATE DESK',
                subtitle: 'CHIEF ACADEMIC PATRON & FACULTY COORDINATION',
                members: facultyMembers,
                color: 'from-amber-400 to-yellow-600'
              })}
              onMouseEnter={() => setHoveredDesk({
                code: 'DESK // FACULTY_COMMAND',
                title: 'Faculty Directorate Desk',
                role: 'Dr. Lingaraj Hadimani (HOD CSE) & Anuradha Solanki (Faculty Coordinator)',
                desc: 'Academic leadership steering the spatial engineering lab, research directions, and curriculum integration.'
              })}
              onMouseLeave={() => setHoveredDesk(null)}
              className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-amber-400/60 hover:border-amber-300 transition-all duration-500 relative group cursor-pointer shadow-[0_15px_40px_rgba(251,191,36,0.15)] hover:shadow-[0_20px_50px_rgba(251,191,36,0.3)] flex flex-col items-center"
            >
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: '0 0 50px rgba(251, 191, 36, 0.35)' }}
              />

              <div className="w-full flex items-center justify-between font-mono text-xs text-amber-400/90 mb-6 border-b border-amber-500/20 pb-3">
                <span className="flex items-center gap-2 font-bold">
                  <Award size={14} className="text-amber-400" /> ACADEMIC CENTER DESK
                </span>
                <span className="flex items-center gap-1 text-amber-300 group-hover:scale-105 transition-transform font-bold">
                  <Maximize2 size={13} /> CLICK TO OPEN FACULTY DESK
                </span>
              </div>

              {/* Faculty Photos Side by Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
                {facultyMembers.map((fac) => (
                  <div 
                    key={fac.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMember(fac);
                    }}
                    className="glass-panel p-4 rounded-2xl border border-amber-500/40 hover:border-amber-300 bg-slate-950/70 hover:bg-amber-500/10 transition-all flex flex-col items-center group/card"
                  >
                    <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-xl p-0.5 bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-600 shadow-xl group-hover/card:scale-105 transition-transform">
                      <div className="w-full h-full rounded-[10px] overflow-hidden bg-slate-950 relative">
                        <SmartImage
                          src={fac.image}
                          fallbackSrcs={fac.fallbackImages}
                          alt={fac.name}
                          className="w-full h-full object-cover object-center group-hover/card:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 size={24} className="text-amber-300" />
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-4">
                      <h4 className="font-orbitron font-extrabold text-lg text-white group-hover/card:text-amber-300 transition-colors">
                        {fac.name}
                      </h4>
                      <p className="font-mono text-xs text-amber-400/90 font-semibold mt-1">
                        {fac.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* ZONE 2: EXECUTIVE COMMAND DESK (MAIN PANEL) */}
          {/* ========================================================================= */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Crown size={20} className="text-cyan-400" />
              <h3 className="font-orbitron font-black text-xl tracking-wider uppercase text-cyan-300">
                EXECUTIVE COMMAND DESK (MAIN PANEL)
              </h3>
              <div className="w-12 h-[1px] bg-cyan-500/30" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setSelectedDeskGroup({
                title: 'EXECUTIVE COMMAND DESK',
                subtitle: 'MAIN PANEL STRATEGIC DIRECTORS',
                members: executiveMembers,
                color: 'from-cyan-400 via-blue-500 to-indigo-600'
              })}
              onMouseEnter={() => setHoveredDesk({
                code: 'DESK // MAIN_PANEL_EXEC',
                title: 'Executive Command Desk',
                role: 'President, Club Coordinator & Vice Presidents',
                desc: 'Strategic command bridge managing club operations, external partnerships, and spatial project execution.'
              })}
              onMouseLeave={() => setHoveredDesk(null)}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-400/50 hover:border-cyan-300 transition-all duration-500 cursor-pointer group shadow-[0_10px_30px_rgba(0,240,255,0.15)] hover:shadow-[0_15px_45px_rgba(0,240,255,0.25)]"
            >
              <div className="flex items-center justify-between font-mono text-xs text-cyan-400/90 mb-6 border-b border-cyan-500/20 pb-3">
                <span className="flex items-center gap-2 font-bold">
                  <Crown size={14} /> MAIN PANEL DESK HUB
                </span>
                <span className="flex items-center gap-1 text-cyan-300 font-bold group-hover:scale-105 transition-transform">
                  <Maximize2 size={13} /> CLICK TO SHOW ALL MAIN PANEL PHOTOS
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {executiveMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMember(member);
                    }}
                    className="glass-panel p-3 sm:p-4 rounded-2xl border border-cyan-500/30 hover:border-cyan-300 bg-slate-950/70 hover:bg-cyan-500/10 transition-all flex flex-col items-center group/m"
                  >
                    <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-xl p-0.5 bg-gradient-to-tr ${member.color} shadow-lg group-hover/m:scale-105 transition-transform`}>
                      <div className="w-full h-full rounded-[10px] overflow-hidden bg-slate-950 relative">
                        <img
                          src={member.image}
                          alt={member.role}
                          className="w-full h-full object-cover object-center group-hover/m:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] opacity-0 group-hover/m:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 size={20} className="text-cyan-300" />
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <h4 className="font-orbitron font-bold text-sm sm:text-base text-white group-hover/m:text-cyan-300 transition-colors">
                        {member.role}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* ZONE 3: CORE OPERATIONS BOARD DESK */}
          {/* ========================================================================= */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Cpu size={20} className="text-purple-400" />
              <h3 className="font-orbitron font-black text-xl tracking-wider uppercase text-purple-300">
                CORE OPERATIONS BOARD DESK
              </h3>
              <div className="w-12 h-[1px] bg-purple-500/30" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setSelectedDeskGroup({
                title: 'CORE OPERATIONS BOARD DESK',
                subtitle: 'ADMINISTRATIVE & TREASURY CONSOLE',
                members: boardMembers,
                color: 'from-purple-400 to-indigo-600'
              })}
              onMouseEnter={() => setHoveredDesk({
                code: 'DESK // CORE_OPERATIONS',
                title: 'Core Operations Board Desk',
                role: 'General Secretary & Treasurer',
                desc: 'Administrative control terminal managing operational documentation, asset management, and financial planning.'
              })}
              onMouseLeave={() => setHoveredDesk(null)}
              className="max-w-3xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-purple-400/50 hover:border-purple-300 transition-all duration-500 cursor-pointer group shadow-[0_10px_30px_rgba(168,85,247,0.15)] hover:shadow-[0_15px_45px_rgba(168,85,247,0.25)]"
            >
              <div className="flex items-center justify-between font-mono text-xs text-purple-400/90 mb-6 border-b border-purple-500/20 pb-3">
                <span className="flex items-center gap-2 font-bold">
                  <Terminal size={14} /> OPERATIONS CONSOLE DESK
                </span>
                <span className="flex items-center gap-1 text-purple-300 font-bold group-hover:scale-105 transition-transform">
                  <Maximize2 size={13} /> CLICK TO OPEN BOARD DESK
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {boardMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMember(member);
                    }}
                    className="glass-panel p-4 rounded-2xl border border-purple-500/30 hover:border-purple-300 bg-slate-950/70 hover:bg-purple-500/10 transition-all flex flex-col items-center group/m"
                  >
                    <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-xl p-0.5 bg-gradient-to-tr ${member.color} shadow-lg group-hover/m:scale-105 transition-transform`}>
                      <div className="w-full h-full rounded-[10px] overflow-hidden bg-slate-950 relative">
                        <img
                          src={member.image}
                          alt={member.role}
                          className="w-full h-full object-cover object-center group-hover/m:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] opacity-0 group-hover/m:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 size={20} className="text-purple-300" />
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <h4 className="font-orbitron font-bold text-base text-white group-hover/m:text-purple-300 transition-colors">
                        {member.role}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* ZONE 4: AR/VR EQUIPMENT & LABORATORY STATIONS */}
          {/* ========================================================================= */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Headphones size={20} className="text-cyan-400 animate-bounce" />
              <h3 className="font-orbitron font-black text-xl tracking-wider uppercase text-cyan-300">
                AR/VR EQUIPMENT & LAB BAYS
              </h3>
              <div className="w-12 h-[1px] bg-cyan-500/30" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {arvrInstruments.map((inst, idx) => {
                const IconComp = inst.icon;
                return (
                  <motion.div
                    key={inst.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    onMouseEnter={() => setHoveredDesk({
                      code: inst.category,
                      title: inst.name,
                      role: inst.badge,
                      desc: inst.desc
                    })}
                    onMouseLeave={() => setHoveredDesk(null)}
                    className={`glass-panel rounded-3xl p-5 border ${inst.borderColor} transition-all duration-500 relative group hover:-translate-y-2 flex flex-col justify-between`}
                    style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                  >
                    <div 
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ boxShadow: `0 0 35px ${inst.glowColor}` }}
                    />

                    <div>
                      <div className="flex items-center justify-between font-mono text-[9px] text-slate-400 mb-3 border-b border-cyan-500/15 pb-2">
                        <span>{inst.category}</span>
                        <span className="text-cyan-400 font-semibold">{inst.badge}</span>
                      </div>

                      <div className="flex items-center justify-center my-4">
                        <div className={`p-4 rounded-2xl bg-gradient-to-tr ${inst.color} shadow-lg text-white group-hover:scale-110 transition-transform duration-500`}>
                          <IconComp size={32} />
                        </div>
                      </div>

                      <div className="text-center mt-2">
                        <h4 className="font-orbitron font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                          {inst.name}
                        </h4>
                        <p className="font-space text-slate-400 text-xs mt-2 leading-relaxed font-light">
                          {inst.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ZONE 5: DOMAIN LEADERSHIP DESKS GRID */}
          {/* ========================================================================= */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Layers size={20} className="text-pink-400" />
              <h3 className="font-orbitron font-black text-xl tracking-wider uppercase text-pink-300">
                DOMAIN WORKBENCH DESKS
              </h3>
              <div className="w-12 h-[1px] bg-pink-500/30" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {domainMembers.map((member, idx) => {
                const IconComp = member.icon;

                return (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    onMouseEnter={() => setHoveredDesk({
                      code: member.rank,
                      title: member.deskName,
                      role: `${member.role} (${member.tag})`,
                      desc: `Specialized domain workstation managing spatial development, co-heads, and technical execution for ${member.role}.`
                    })}
                    onMouseLeave={() => setHoveredDesk(null)}
                    className={`glass-panel rounded-3xl p-6 border ${member.borderColor} transition-all duration-500 relative group flex flex-col justify-between hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)]`}
                  >
                    <div>
                      <div className="font-mono text-[9px] text-slate-400 mb-4 border-b border-cyan-500/15 pb-2 flex items-center justify-between">
                        <span className="text-cyan-400/90 font-semibold">{member.rank}</span>
                        <span className="text-pink-400 uppercase font-semibold">DOMAIN HEAD</span>
                      </div>

                      {/* Photo Click -> Lightbox */}
                      <div 
                        onClick={() => setSelectedMember(member)}
                        className="relative mb-5 flex justify-center cursor-pointer"
                      >
                        <div className={`relative w-48 h-48 sm:w-52 sm:h-52 rounded-2xl p-0.5 bg-gradient-to-tr ${member.color} shadow-lg group-hover:scale-105 transition-transform duration-500`}>
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
                      </div>

                      <div className="text-center mb-4 mt-1">
                        <h4 className="font-orbitron font-extrabold text-xl text-white group-hover:text-pink-300 transition-colors">
                          {member.role}
                        </h4>
                      </div>
                    </div>

                    {/* View Team Button */}
                    <div className="pt-3 border-t border-cyan-500/15">
                      <button
                        onClick={() => setViewingTeamForDomain(member)}
                        className="w-full py-2.5 px-4 rounded-xl font-orbitron font-bold text-xs tracking-wider uppercase bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/60 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.1)] group/btn"
                      >
                        <Users size={14} className="text-cyan-400 group-hover/btn:scale-110 transition-transform" />
                        <span>VIEW TEAM ROSTER</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ZONE 6: DEPARTMENT COORDINATORS DESK HUB */}
          {/* ========================================================================= */}
          <div>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Compass size={20} className="text-emerald-400" />
              <h3 className="font-orbitron font-black text-xl tracking-wider uppercase text-emerald-300">
                DEPARTMENT COORDINATORS DESK HUB
              </h3>
              <div className="w-12 h-[1px] bg-emerald-500/30" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setSelectedDeskGroup({
                title: 'DEPARTMENT COORDINATORS DESK HUB',
                subtitle: 'ACADEMIC & DEPARTMENTAL LIAISON TERMINAL',
                members: coordinatorMembers,
                color: 'from-emerald-400 via-teal-500 to-green-600'
              })}
              onMouseEnter={() => setHoveredDesk({
                code: 'DESK // DEPT_COORDINATORS',
                title: 'Department Coordinators Terminal',
                role: 'Biotech, Civil, CSBS, CSE, AIML, ENTC Leads',
                desc: 'Inter-departmental liaison desk organizing cross-discipline workshops, events, and student outreach.'
              })}
              onMouseLeave={() => setHoveredDesk(null)}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-400/50 hover:border-emerald-300 transition-all duration-500 cursor-pointer group shadow-[0_10px_30px_rgba(52,211,153,0.15)] hover:shadow-[0_15px_45px_rgba(52,211,153,0.25)]"
            >
              <div className="flex items-center justify-between font-mono text-xs text-emerald-400/90 mb-6 border-b border-emerald-500/20 pb-3">
                <span className="flex items-center gap-2 font-bold">
                  <Compass size={14} /> DEPT LIAISON TERMINAL
                </span>
                <span className="flex items-center gap-1 text-emerald-300 font-bold group-hover:scale-105 transition-transform">
                  <Maximize2 size={13} /> CLICK TO SHOW ALL DEPT COORDINATOR PHOTOS
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {coordinatorMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMember(member);
                    }}
                    className="glass-panel p-4 rounded-2xl border border-emerald-500/30 hover:border-emerald-300 bg-slate-950/70 hover:bg-emerald-500/10 transition-all flex flex-col items-center group/m"
                  >
                    <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-xl p-0.5 bg-gradient-to-tr ${member.color} shadow-lg group-hover/m:scale-105 transition-transform`}>
                      <div className="w-full h-full rounded-[10px] overflow-hidden bg-slate-950 relative">
                        <img
                          src={member.image}
                          alt={member.role}
                          className="w-full h-full object-cover object-center group-hover/m:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] opacity-0 group-hover/m:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 size={20} className="text-emerald-300" />
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <h4 className="font-orbitron font-bold text-sm sm:text-base text-white group-hover/m:text-emerald-300 transition-colors">
                        {member.role}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Dynamic Hover Tooltip Bar */}
      <AnimatePresence>
        {hoveredDesk && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[90%] glass-panel border border-cyan-400/60 rounded-2xl p-4 shadow-[0_0_30px_rgba(0,240,255,0.3)] backdrop-blur-xl bg-slate-950/90 pointer-events-none"
          >
            <div className="flex items-center justify-between font-mono text-[10px] text-cyan-400 mb-1 border-b border-cyan-500/20 pb-1">
              <span>{hoveredDesk.code}</span>
              <span className="animate-pulse font-bold">TERMINAL ONLINE</span>
            </div>
            <h4 className="font-orbitron font-extrabold text-base text-white text-glow-cyan">
              {hoveredDesk.title}
            </h4>
            <p className="font-mono text-xs text-cyan-300 font-semibold mt-0.5">
              {hoveredDesk.role}
            </p>
            <p className="font-space text-slate-300 text-xs mt-1 font-light">
              {hoveredDesk.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL DESK GROUP MODAL (All Photos on Screen) */}
      <AnimatePresence>
        {selectedDeskGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDeskGroup(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-2xl overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full glass-panel border border-cyan-500/40 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-[0_0_80px_rgba(0,240,255,0.25)] flex flex-col my-auto"
            >
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
                <div>
                  <span className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase block">
                    ARVR OFFICE DESK VIEW
                  </span>
                  <h3 className="font-orbitron font-black text-2xl sm:text-3xl text-white text-glow-cyan mt-1">
                    {selectedDeskGroup.title}
                  </h3>
                  <p className="font-space text-xs text-slate-300 mt-1">
                    {selectedDeskGroup.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedDeskGroup(null)}
                  className="p-2 rounded-full glass-panel border-cyan-500/30 text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer group"
                  aria-label="Close Desk Modal"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform duration-300 text-cyan-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto pr-2">
                {selectedDeskGroup.members.map((member) => (
                  <motion.div
                    key={member.id}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setSelectedMember(member)}
                    className="glass-panel p-4 rounded-2xl border border-cyan-500/30 hover:border-cyan-400 bg-slate-950/70 hover:bg-cyan-500/10 transition-all cursor-pointer flex flex-col items-center group text-center"
                  >
                    <div className={`w-44 h-44 sm:w-48 sm:h-48 rounded-2xl p-0.5 bg-gradient-to-tr ${member.color || selectedDeskGroup.color} shadow-xl mb-3`}>
                      <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-950 relative">
                        <SmartImage
                          src={member.image}
                          fallbackSrcs={member.fallbackImages}
                          alt={member.name || member.role}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 size={24} className="text-white" />
                        </div>
                      </div>
                    </div>

                    <h4 className="font-orbitron font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                      {member.name || member.role}
                    </h4>
                    {member.name && (
                      <p className="font-mono text-xs text-cyan-400 font-semibold mt-1">
                        {member.role}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-2xl cursor-zoom-out overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full glass-panel border border-cyan-500/40 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-[0_0_80px_rgba(0,240,255,0.25)] flex flex-col items-center text-center cursor-default my-auto"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-6 p-2 rounded-full glass-panel border-cyan-500/30 text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer group"
                aria-label="Close Lightbox"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300 text-cyan-400" />
              </button>

              <div className="mt-4 mb-3">
                <h3 className="font-orbitron font-black text-2xl sm:text-3xl text-white text-glow-cyan">
                  {selectedMember.name || selectedMember.role}
                </h3>
                {selectedMember.name && (
                  <p className="font-mono text-sm text-cyan-400 font-semibold mt-1">
                    {selectedMember.role}
                  </p>
                )}
              </div>

              <div className="relative max-h-[60vh] sm:max-h-[65vh] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-slate-950/80 p-2 border border-cyan-500/20 shadow-2xl">
                <SmartImage
                  src={selectedMember.image}
                  fallbackSrcs={selectedMember.fallbackImages}
                  alt={selectedMember.name || selectedMember.role}
                  className="max-h-[55vh] sm:max-h-[60vh] w-auto max-w-full object-contain rounded-xl shadow-lg border border-cyan-500/20"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DOMAIN SUB-TEAM MODAL ("VIEW TEAM") */}
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
                    DEPARTMENT WORKBENCH MEMBERS
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

              {viewingTeamForDomain.subTeam && viewingTeamForDomain.subTeam.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {viewingTeamForDomain.subTeam.map((member) => (
                    <motion.div
                      key={member.id}
                      onClick={() => setSelectedMember(member)}
                      className="glass-panel p-4 rounded-2xl border border-cyan-500/30 hover:border-cyan-400 bg-slate-950/60 hover:bg-cyan-500/10 transition-all cursor-pointer flex items-center gap-4 group"
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-cyan-400/40 flex-shrink-0 relative">
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
                        <h4 className="font-orbitron font-bold text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors">
                          {member.role}
                        </h4>
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
                    Team members for this department will be displayed here soon. Stay tuned as new spatial engineers join the club!
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
