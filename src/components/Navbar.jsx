import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'hero', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'events', label: 'Events', path: '/events' },
    { id: 'workshops', label: 'Workshops', path: '/workshops' },
    { id: 'team', label: 'Team', path: '/team' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      {/* Floating Capsule Pill Container matching design */}
      <div className="pointer-events-auto flex items-center justify-between gap-5 sm:gap-10 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-[#050a16]/75 border border-cyan-500/25 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(0,240,255,0.06)]">
        
        {/* Left Side: Planet Logo + ARVR CLUB Text */}
        <div 
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          {/* Stylized Saturn Planet Sphere with Inclined Ring */}
          <div className="relative w-7 h-7 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-400 to-purple-500 shadow-[0_0_10px_rgba(0,240,255,0.7)]" />
            <div className="absolute inset-0 border-[1.5px] border-cyan-300/80 rounded-full scale-y-[0.45] rotate-[-28deg] shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="font-orbitron font-extrabold text-sm sm:text-base tracking-widest text-white">
              ARVR
            </span>
            <span className="font-orbitron font-semibold text-[8px] tracking-[0.3em] text-cyan-400/90">
              CLUB
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`relative font-space text-xs tracking-wider transition-all duration-300 cursor-pointer py-1 ${
                  isActive
                    ? 'text-cyan-300 font-semibold text-glow-cyan'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_#00f0ff]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full text-slate-300 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} className="text-cyan-400" /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden absolute top-16 left-4 right-4 rounded-2xl border border-cyan-500/30 p-4 space-y-2 bg-[#050917]/95 backdrop-blur-2xl shadow-2xl">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`w-full text-left px-4 py-2.5 rounded-xl font-space text-sm tracking-wider flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'text-cyan-300 font-semibold bg-cyan-500/15 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
