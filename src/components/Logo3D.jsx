import React, { useState } from 'react';

export default function Logo3D({ size = 'hero', className = '' }) {
  const [imgSrc, setImgSrc] = useState('/Images/arvr logo.png');

  // Larger dimensions mapping for direct logo presentation
  const isNav = size === 'nav';
  const dimensions = isNav
    ? 'w-14 h-14 sm:w-16 sm:h-16'
    : 'w-72 h-72 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px]';

  return (
    <div className={`relative group flex items-center justify-center select-none ${dimensions} ${className}`}>
      {/* Glow Aura - ONLY visible on hover (opacity-0 by default) */}
      <div 
        className={`absolute inset-0 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-90 ${
          isNav 
            ? 'bg-cyan-500/30' 
            : 'bg-gradient-to-tr from-cyan-500/40 via-purple-500/35 to-pink-500/30 scale-110'
        }`} 
      />

      {/* Direct Transparent ARVR Logo - Clean by default, glows on hover */}
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
