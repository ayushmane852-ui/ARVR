import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Radio } from 'lucide-react';
import Logo3D from './Logo3D';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-cyan-500/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Left Side: Brand Typography & Logo */}
        <div 
          onClick={() => handleNavClick('/')}
          className="cursor-pointer group flex items-center gap-3 select-none"
        >
          <Logo3D size="nav" />

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
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
        </div>

        {/* Right Side: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-6 py-2 rounded-full border-cyan-500/20">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`relative px-4 py-1.5 rounded-full font-space text-sm tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
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
            className="p-2 rounded-lg text-slate-300 hover:text-white glass-panel border-cyan-500/20 focus:outline-none cursor-pointer"
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
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`w-full text-left px-4 py-3 rounded-lg font-space text-base tracking-wider flex items-center justify-between cursor-pointer ${
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
