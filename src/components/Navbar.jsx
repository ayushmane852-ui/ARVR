import React, { useState, useEffect } from 'react';
import { Menu, X, Radio } from 'lucide-react';

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'events', label: 'Events' },
    { id: 'workshops', label: 'Workshops' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-cyan-500/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Left Side: Brand Typography */}
        <div 
          onClick={() => scrollToSection('hero')}
          className="cursor-pointer group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3"
        >
          <div className="flex items-center gap-2">
            <span className="font-orbitron font-black text-2xl md:text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 group-hover:text-glow-cyan transition-all duration-300">
              ARVR
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping hidden sm:block" />
          </div>

          <span className="font-rajdhani text-[11px] md:text-xs tracking-[0.25em] text-cyan-400/70 font-semibold uppercase group-hover:text-cyan-300 transition-colors">
            AR • VR • IMMERSIVE TECHNOLOGY
          </span>
        </div>

        {/* Right Side: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-6 py-2 rounded-full border-cyan-500/20">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-full font-space text-sm tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'text-white font-medium bg-cyan-500/10 border border-cyan-500/30 text-glow-cyan'
                    : 'text-slate-300 hover:text-cyan-300 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse" />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white glass-panel border-cyan-500/20 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} className="text-cyan-400" /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-b border-cyan-500/30 px-6 py-6 mt-3 space-y-3 bg-[#050917]/95 backdrop-blur-2xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg font-space text-base tracking-wider flex items-center justify-between ${
                  isActive
                    ? 'text-cyan-300 font-semibold bg-cyan-500/15 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <Radio size={16} className="text-cyan-400 animate-pulse" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
