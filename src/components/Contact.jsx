import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, AtSign, Globe, MapPin, Send, Radio, MessageSquare, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const contactDetails = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@arvrclub.edu',
      subText: 'Official spatial channel placeholder'
    },
    {
      icon: AtSign,
      label: 'Instagram',
      value: '@arvr_club',
      subText: 'Visual updates & AR filters'
    },
    {
      icon: Globe,
      label: 'LinkedIn',
      value: 'ARVR Club Innovation Lab',
      subText: 'Professional tech network'
    },
    {
      icon: MapPin,
      label: 'College Location',
      value: 'Spatial Computing Lab, Block 4',
      subText: 'College Innovation Hub'
    }
  ];


  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      
      {/* Radial Background Glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-cyan-500/30 mb-3">
            <Radio size={14} className="text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-cyan-300 tracking-wider uppercase">COMMUNICATION LINK</span>
          </div>

          <h2 className="font-orbitron font-black text-4xl sm:text-5xl tracking-tight text-white text-glow-cyan">
            CONNECT WITH ARVR
          </h2>
          <p className="font-space text-slate-300 text-base sm:text-lg mt-3 max-w-xl font-light">
            Want to explore immersive technology with us? Reach out to collaborate or learn more about the club.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Details Cards & Radar HUD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Holographic Signal Visual */}
            <div className="glass-panel p-6 rounded-3xl border-cyan-500/20 relative overflow-hidden flex items-center justify-between mb-6">
              <div>
                <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest block mb-1">
                  SIGNAL RADAR // ONLINE
                </span>
                <h4 className="font-orbitron font-bold text-lg text-white">
                  Spatial Signal Frequency
                </h4>
              </div>
              
              {/* Radar pulse visual */}
              <div className="relative w-12 h-12 rounded-full border border-cyan-400/40 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping" />
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
              </div>
            </div>

            {/* Placeholder Details */}
            <div className="space-y-3">
              {contactDetails.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className="glass-panel p-4 rounded-2xl border-cyan-500/15 flex items-start gap-4 group hover:border-cyan-400/40 transition-colors"
                  >
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                      <IconComp size={20} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-cyan-400/70 uppercase tracking-wider block">
                        {item.label}
                      </span>
                      <h5 className="font-space font-semibold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
                        {item.value}
                      </h5>
                      <span className="font-space text-xs text-slate-400 font-light block mt-0.5">
                        {item.subText}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Contact Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border-cyan-500/20 relative"
          >
            <div className="flex items-center justify-between border-b border-cyan-500/15 pb-4 mb-6">
              <span className="font-orbitron font-bold text-base text-cyan-300 flex items-center gap-2">
                <MessageSquare size={18} /> INQUIRY TRANSMISSION
              </span>
              <span className="font-mono text-[10px] text-slate-500">
                FORM_ID // SPATIAL_01
              </span>
            </div>

            {formSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 animate-bounce">
                  <CheckCircle size={32} />
                </div>
                <h4 className="font-orbitron font-bold text-2xl text-white">
                  Transmission Received!
                </h4>
                <p className="font-space text-slate-300 text-sm max-w-sm">
                  Thank you for connecting with ARVR Club. Our spatial team will review your message soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-mono text-xs text-cyan-300 uppercase tracking-wider mb-2">
                    Name / Identity
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-cyan-500/20 text-white placeholder-slate-500 font-space text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-cyan-300 uppercase tracking-wider mb-2">
                    Email Signal Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-cyan-500/20 text-white placeholder-slate-500 font-space text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-cyan-300 uppercase tracking-wider mb-2">
                    Transmission Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your query regarding AR/VR, spatial computing, or joining our club..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-cyan-500/20 text-white placeholder-slate-500 font-space text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-orbitron font-bold text-xs tracking-widest uppercase glass-button-primary flex items-center justify-center gap-3"
                >
                  <Send size={16} />
                  <span>TRANSMIT MESSAGE</span>
                </button>
              </form>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
}
