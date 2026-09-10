import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

// Clean SVG Icons for exact visual match to the reference
const InstagramIcon = (props) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const DiscordIcon = (props) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6h0a14.5 14.5 0 0 0-4-1.2 10.3 10.3 0 0 0-.5 1A14.2 14.2 0 0 0 10.5 5.8a10.3 10.3 0 0 0-.5-1A14.5 14.5 0 0 0 6 6c-2.7 4-3.4 8-3.1 12a14.8 14.8 0 0 0 4.5 2.3 11 11 0 0 0 1-1.6 9.6 9.6 0 0 1-1.6-.8l.4-.3a10.3 10.3 0 0 0 9.6 0l.4.3a9.6 9.6 0 0 1-1.6.8 11 11 0 0 0 1 1.6 14.8 14.8 0 0 0 4.5-2.3c.4-4.5-.6-8.5-3.1-12zM8.5 15.5c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/>
  </svg>
);

const YoutubeIcon = (props) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function SocialSidebar() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const socialLinks = [
    {
      id: 'instagram',
      label: 'Instagram',
      icon: InstagramIcon,
      url: 'https://www.instagram.com/arvrkitcoek?igsi=MWI5dm55Z3Rmc25oNA==',
    },
    {
      id: 'discord',
      label: 'Discord',
      icon: DiscordIcon,
      url: '#contact',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      icon: YoutubeIcon,
      url: '#contact',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: LinkedinIcon,
      url: 'https://linkedin.com',
    },
    {
      id: 'mail',
      label: 'Email Us',
      icon: Mail,
      url: '#contact',
    },
  ];

  const handleClick = (e, url) => {
    if (url.startsWith('#')) {
      e.preventDefault();
      const el = document.getElementById(url.substring(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside aria-label="Social links" className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none">
      {/* Floating Vertical Glass Capsule Dock matching screenshot */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex flex-col items-center gap-3.5 px-2.5 py-4 rounded-full bg-[#050a16]/70 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.8),inset_0_0_12px_rgba(0,240,255,0.04)]"
      >
        {socialLinks.map((social, idx) => {
          const IconComp = social.icon;
          const isHovered = hoveredIdx === idx;

          return (
            <div key={social.id} className="relative flex items-center justify-center">
              <a
                href={social.url}
                target={social.url.startsWith('http') ? '_blank' : '_self'}
                rel="noreferrer"
                onClick={(e) => handleClick(e, social.url)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                aria-label={social.label}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/15 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all duration-300 group cursor-pointer"
              >
                <IconComp className="transition-transform group-hover:scale-110" />
              </a>

              {/* Tooltip on hover */}
              {isHovered && (
                <div className="absolute right-11 px-2.5 py-1 rounded-md bg-slate-950/90 border border-cyan-500/30 text-[10px] font-orbitron font-semibold tracking-wider text-cyan-300 whitespace-nowrap backdrop-blur-md shadow-lg pointer-events-none">
                  {social.label}
                </div>
              )}
            </div>
          );
        })}
      </motion.div>
    </aside>
  );
}
