import React, { useState } from 'react';

export default function Logo3D({ size = 'hero', className = '' }) {
  const [imgSrc, setImgSrc] = useState('/Images/arvr logo.png');

  // Dimensions mapping for direct logo presentation (Increased sizes, no container box)
  const isNav = size === 'nav';
  const dimensions = isNav
    ? 'w-12 h-12 sm:w-14 sm:h-14'
    : 'w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]';

  return (
    <div className={`relative flex items-center justify-center select-none ${dimensions} ${className}`}>
      {/* Ambient Holographic Aura Glow directly behind the logo graphic */}
      <div 
        className={`absolute inset-0 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
          isNav 
            ? 'bg-cyan-500/25 opacity-50' 
            : 'bg-gradient-to-tr from-cyan-500/35 via-purple-500/30 to-pink-500/25 opacity-80 scale-110'
        }`} 
      />

      {/* Direct Transparent ARVR Logo (Fixed & Stable, No cursor tilt/movement effect) */}
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
        className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_0_20px_rgba(0,240,255,0.75)] hover:drop-shadow-[0_0_35px_rgba(0,240,255,0.95)] hover:scale-105 transition-all duration-300 pointer-events-auto"
      />
    </div>
  );
}
