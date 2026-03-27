/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Bot, Search as SearchIcon } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CircuitGrid from './components/CircuitGrid';
import NeuralAssistant from './components/NeuralAssistant';
import SearchModal from './components/SearchModal';

// Pages
import TerminalPage from './pages/Terminal';
import ArchivesPage from './pages/Archives';
import SpecsPage from './pages/Specs';
import StudioPage from './pages/Studio';
import PortalPage from './pages/Portal';
import ShellPage from './pages/Shell';
import SettingsPage from './pages/Settings';

// Types
import { AppSettings } from './types';

export default function App() {
  const location = useLocation();
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('ziji_settings');
    return saved ? JSON.parse(saved) : {
      scanline: true,
      circuitGrid: 50,
      neuralAcceleration: true
    };
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    localStorage.setItem('ziji_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const transition = {
    type: 'spring',
    stiffness: settings.neuralAcceleration ? 500 : 200,
    damping: settings.neuralAcceleration ? 40 : 25,
    mass: 1
  };

  return (
    <div 
      className="min-h-screen flex flex-col circuit-bg transition-all duration-500"
      style={{ 
        '--grid-opacity': settings.circuitGrid / 100,
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`
      } as React.CSSProperties}
    >
      <CircuitGrid opacity={settings.circuitGrid / 100} mousePos={mousePos} />
      <div className="mouse-glow"></div>
      {settings.scanline && <div className="scanline"></div>}
      
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-8 max-w-7xl mx-auto w-full relative z-10">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<TerminalPage transition={transition} />} />
              <Route path="/archives" element={<ArchivesPage transition={transition} />} />
              <Route path="/specs" element={<SpecsPage transition={transition} />} />
              <Route path="/studio" element={<StudioPage transition={transition} />} />
              <Route path="/portal" element={<PortalPage transition={transition} />} />
              <Route path="/shell" element={<ShellPage transition={transition} />} />
              <Route path="/settings" element={<SettingsPage settings={settings} setSettings={setSettings} transition={transition} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      <NeuralAssistant 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)} 
      />

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="w-14 h-14 rounded-full bg-surface-container-high text-primary border border-primary/30 shadow-[0_0_15px_rgba(129,236,255,0.2)] flex items-center justify-center hover:scale-110 hover:bg-primary hover:text-on-primary transition-all"
          title="Search (Cmd+K)"
        >
          <SearchIcon className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className={`w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-dim text-on-primary shadow-[0_0_20px_rgba(129,236,255,0.4)] flex items-center justify-center hover:scale-110 transition-all ${isAssistantOpen ? 'rotate-90 scale-110' : ''}`}
          title="Neural Assistant"
        >
          {isAssistantOpen ? <Activity className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
