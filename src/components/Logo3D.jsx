import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Logo3D({ size = 'hero', className = '' }) {
  const containerRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState('/Images/arvr logo.png');

  useEffect(() => {
    let animationFrameId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      // Calculate normalized mouse position relative to window center (-1 to 1)
      const windowCenterX = window.innerWidth / 2;
      const windowCenterY = window.innerHeight / 2;

      targetX = (e.clientX - windowCenterX) / windowCenterX;
      targetY = (e.clientY - windowCenterY) / windowCenterY;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const relativeX = ((e.clientX - rect.left) / (rect.width || 1)) * 100;
        const relativeY = ((e.clientY - rect.top) / (rect.height || 1)) * 100;
        setGlarePos({ x: Math.min(100, Math.max(0, relativeX)), y: Math.min(100, Math.max(0, relativeY)) });
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        const windowCenterX = window.innerWidth / 2;
        const windowCenterY = window.innerHeight / 2;
        targetX = (touch.clientX - windowCenterX) / windowCenterX;
        targetY = (touch.clientY - windowCenterY) / windowCenterY;
      }
    };

    const updateTilt = () => {
      // Smooth lerp for subtle, steady 3D motion
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      const maxTilt = size === 'nav' ? 8 : 14; // Gentle tilt angle for high stability
      setRotateY(currentX * maxTilt);
      setRotateX(-currentY * maxTilt);

      animationFrameId = requestAnimationFrame(updateTilt);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    updateTilt();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [size]);

  // Dimensions mapping for different placements
  const isNav = size === 'nav';
  const dimensions = isNav
    ? 'w-11 h-11 sm:w-12 sm:h-12'
    : 'w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80';

  return (
    <div
      ref={containerRef}
      className={`relative group cursor-pointer select-none ${dimensions} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onTouchCancel={() => setIsHovered(false)}
      style={{ perspective: '1200px' }}
    >
      {/* 3D Motion Container */}
      <div
        className="w-full h-full relative transform-gpu transition-transform duration-300 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
            isHovered ? 'scale3d(1.08, 1.08, 1.08) translateZ(10px)' : 'scale3d(1, 1, 1)'
          }`,
        }}
      >
        {/* Layer 1: Dynamic Ambient Holographic Glow Aura */}
        <div
          className={`absolute -inset-4 sm:-inset-6 rounded-3xl transition-all duration-500 ${
            isHovered
              ? 'opacity-100 blur-2xl scale-105'
              : 'opacity-0 blur-sm scale-95'
          } ${
            isNav
              ? 'bg-gradient-to-r from-cyan-500 to-purple-600'
              : 'bg-gradient-to-tr from-cyan-400 via-purple-600 to-pink-500'
          }`}
          style={{ transform: 'translateZ(-25px)' }}
        />

        {/* Layer 2: Orbiting Cyber Rings (Hero Mode Only) */}
        {!isNav && (
          <div
            className={`absolute -inset-6 sm:-inset-8 rounded-full border transition-all duration-500 animate-spin-slow pointer-events-none ${
              isHovered
                ? 'border-cyan-400/70 opacity-100 scale-105 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                : 'border-cyan-500/20 opacity-40 scale-100'
            }`}
            style={{ transform: 'translateZ(-15px)' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_12px_#a855f7]" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-pink-400 shadow-[0_0_12px_#ec4899]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff]" />
          </div>
        )}

        {/* Layer 3: Glass HUD Container */}
        <div
          className={`w-full h-full glass-panel relative overflow-hidden flex items-center justify-center border transition-all duration-500 ${
            isNav ? 'rounded-xl p-0.5' : 'rounded-2xl sm:rounded-3xl p-1 sm:p-1.5 border-2'
          } ${
            isHovered
              ? 'border-cyan-400 shadow-[0_0_40px_rgba(0,240,255,0.6)]'
              : 'border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]'
          }`}
          style={{ transform: 'translateZ(15px)' }}
        >
          {/* Holographic Light Beam Glare */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-30 group-hover:opacity-80"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(0, 240, 255, 0.2) 35%, transparent 75%)`,
            }}
          />

          {/* Shimmer line sweep across logo on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%)',
              backgroundSize: '200% 100%',
              animation: isHovered ? 'shimmer 2s infinite' : 'none',
            }}
          />

          {/* Inner Image Frame with transparent PNG rendering */}
          <div
            className={`w-full h-full overflow-hidden relative bg-slate-950/50 backdrop-blur-md flex items-center justify-center shadow-inner ${
              isNav ? 'rounded-lg p-1' : 'rounded-xl sm:rounded-2xl p-3 sm:p-4'
            }`}
            style={{ transform: 'translateZ(30px)' }}
          >
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
              className={`w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(0,240,255,0.6)] group-hover:drop-shadow-[0_0_22px_rgba(0,240,255,0.9)] transition-all duration-300 ${
                isNav ? 'scale-100 group-hover:scale-110' : 'scale-100 group-hover:scale-105'
              }`}
            />

            {/* Micro scanline texture overlay */}
            <div className="absolute inset-0 scanlines opacity-15 pointer-events-none" />
          </div>

          {/* Corner Target Reticles (Hero Mode - Expand on Hover) */}
          {!isNav && (
            <>
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 group-hover:w-5 group-hover:h-5 transition-all duration-300 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400 group-hover:w-5 group-hover:h-5 transition-all duration-300 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-purple-400 group-hover:w-5 group-hover:h-5 transition-all duration-300 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-purple-400 group-hover:w-5 group-hover:h-5 transition-all duration-300 pointer-events-none" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
