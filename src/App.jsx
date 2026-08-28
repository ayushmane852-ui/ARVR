import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Scene3D from './components/Scene3D';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Workshops from './components/Workshops';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Calculate 3D scene transformation progress based on active page route
  const getRouteScrollProgress = (path) => {
    switch (path) {
      case '/':
        return 0;
      case '/about':
        return 0.25;
      case '/events':
        return 0.45;
      case '/workshops':
        return 0.65;
      case '/team':
        return 0.85;
      case '/contact':
        return 1.0;
      default:
        return 0;
    }
  };

  const scrollProgress = getRouteScrollProgress(location.pathname);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Scroll to top automatically on route changes */}
      <ScrollToTop />

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

      {/* 4. Main Multi-Page Interface Overlay */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <Navbar />
        
        <main className="flex-grow pt-16">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route 
                path="/" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Hero />
                  </motion.div>
                } 
              />
              <Route 
                path="/about" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <About />
                  </motion.div>
                } 
              />
              <Route 
                path="/events" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Events />
                  </motion.div>
                } 
              />
              <Route 
                path="/workshops" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Workshops />
                  </motion.div>
                } 
              />
              <Route 
                path="/team" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Team />
                  </motion.div>
                } 
              />
              <Route 
                path="/contact" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Contact />
                  </motion.div>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </div>
  );
}
