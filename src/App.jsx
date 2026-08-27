import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Scene3D from './components/Scene3D';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Workshops from './components/Workshops';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track active section and scroll progress for 3D spatial transformations
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = Math.min(1, Math.max(0, currentScroll / (totalHeight || 1)));
      setScrollProgress(progress);

      // Section detection
      const sections = ['hero', 'about', 'events', 'workshops', 'contact'];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 1. Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. Interactive 3D Background Canvas */}
      <Scene3D scrollProgress={scrollProgress} />

      {/* 3. Floating Social Sidebar Dock */}
      <SocialSidebar />

      {/* 4. Main Interface Overlay */}
      <div className="relative z-10">
        <Navbar activeSection={activeSection} />
        
        <main>
          <Hero />
          <About />
          <Events />
          <Workshops />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}
