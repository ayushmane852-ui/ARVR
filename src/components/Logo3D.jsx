import React, { useState } from 'react';

export default function Logo3D({ size = 'hero', className = '' }) {
  const [imgSrc, setImgSrc] = useState('/Images/arvr logo.png');

  // Balanced dimensions for hero logo to fit perfectly above-the-fold without scroll
  const isNav = size === 'nav';
  const dimensions = isNav
    ? 'w-12 h-12 sm:w-14 sm:h-14'
    : 'w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[360px] lg:h-[360px]';

  return (
    <div className={`relative group flex items-center justify-center select-none ${dimensions} ${className}`}>
      {/* Glow Aura - ONLY visible on hover */}
      <div 
        className={`absolute inset-0 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-90 ${
          isNav 
            ? 'bg-cyan-500/30' 
            : 'bg-gradient-to-tr from-cyan-500/40 via-purple-500/35 to-pink-500/30 scale-110'
        }`} 
      />

      {/* Direct Transparent ARVR Logo */}
      <img
        src={imgSrc}
        onError={() => {
          if (imgSrc === '/Images/arvr logo.png') {
            setImgSrc('/Images/arvr logo.jpg');
          } else if (imgSrc === '/Images/arvr logo.jpg') {
            setImgSrc('/Images/arvr logo.jpg.jpeg');
          }
        }}
        alt="ARVR Club Logo"
        className="w-full h-full object-contain relative z-10 filter drop-shadow-none group-hover:drop-shadow-[0_0_35px_rgba(0,240,255,0.95)] group-hover:scale-105 transition-all duration-300 pointer-events-auto"
      />
    </div>
  );
}
