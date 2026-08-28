import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  const navLinks = [
    { id: 'hero', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'events', label: 'Events', path: '/events' },
    { id: 'workshops', label: 'Workshops', path: '/workshops' },
    { id: 'team', label: 'Team', path: '/team' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="relative bg-[#02050e] border-t border-cyan-500/20 py-12 px-6 z-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-6">
        
        {/* Brand Typography */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-orbitron font-black text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 text-glow-cyan">
            ARVR
          </span>
          <span className="font-rajdhani text-xs tracking-[0.3em] text-cyan-400/80 font-semibold uppercase">
            AR • VR • IMMERSIVE TECHNOLOGY
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 font-space text-sm text-slate-400">
          {navLinks.map((link, idx) => (
            <React.Fragment key={link.id}>
              <button
                onClick={() => navigate(link.path)}
                className="hover:text-cyan-300 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
              {idx < navLinks.length - 1 && (
                <span className="text-slate-700">|</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <div className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 font-mono text-xs text-slate-500">
          <span>© 2026 ARVR Club. All rights reserved.</span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 text-cyan-400/70">
            <Sparkles size={12} /> SPATIAL COMPUTING INNOVATION LAB
          </span>
        </div>

      </div>
    </footer>
  );
}
