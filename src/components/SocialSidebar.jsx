import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail } from 'lucide-react';

const InstagramIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
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
      url: 'https://instagram.com',
      color: 'hover:text-pink-400 hover:border-pink-500/60 hover:shadow-[0_0_20px_rgba(236,72,153,0.6)]',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: LinkedinIcon,
      url: 'https://linkedin.com',
      color: 'hover:text-cyan-400 hover:border-cyan-500/60 hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]',
    },
    {
      id: 'community',
      label: 'Community',
      icon: MessageSquare,
      url: '#contact',
      color: 'hover:text-purple-400 hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]',
    },
    {
      id: 'mail',
      label: 'Email Us',
      icon: Mail,
      url: '#contact',
      color: 'hover:text-amber-400 hover:border-amber-500/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.6)]',
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
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center select-none"
    >
      {/* Vertical Glowing Connecting Accent Line */}
      <div className="absolute top-2 bottom-2 w-[1.5px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent pointer-events-none" />

      {/* Social Media Circular Buttons */}
      <div className="flex flex-col gap-4 py-4 relative">
        {socialLinks.map((social, idx) => {
          const IconComp = social.icon;
          const isHovered = hoveredIdx === idx;

          return (
            <div key={social.id} className="relative flex items-center justify-end">
              
              {/* Sliding Glass Tooltip Label on Left */}
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? -10 : 10,
                  scale: isHovered ? 1 : 0.9,
                }}
                transition={{ duration: 0.2 }}
                className="absolute right-full mr-2 px-3 py-1 rounded-lg glass-panel border-cyan-500/30 text-xs font-space font-semibold text-cyan-200 tracking-wider whitespace-nowrap pointer-events-none shadow-[0_0_15px_rgba(0,240,255,0.25)]"
              >
                {social.label}
              </motion.div>

              {/* Circular Social Icon Button */}
              <motion.a
                href={social.url}
                target={social.url.startsWith('http') ? '_blank' : '_self'}
                rel="noreferrer"
                onClick={(e) => handleClick(e, social.url)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                whileHover={{ scale: 1.25, rotate: 6 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full glass-panel border border-cyan-500/25 flex items-center justify-center text-slate-300 transition-all duration-300 cursor-pointer relative bg-[#050917]/85 backdrop-blur-md ${social.color}`}
              >
                <IconComp className="transition-transform duration-300" />

                {/* Subtle pulse ring on hover */}
                {isHovered && (
                  <span className="absolute inset-0 rounded-full border border-current animate-ping opacity-30" />
                )}
              </motion.a>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
