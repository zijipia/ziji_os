import React from 'react';
import { motion } from 'motion/react';
import { Monitor, Activity } from 'lucide-react';
import { AppSettings } from '../types';

interface SettingsPageProps {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  transition: any;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, setSettings, transition }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={transition}
    className="space-y-12"
  >
    <header className="border-l-4 border-secondary pl-8 py-4">
      <span className="font-headline text-xs tracking-[0.3em] text-secondary uppercase block mb-2">SYSTEM_CONFIG // PREFERENCES</span>
      <h1 className="font-headline text-6xl font-black uppercase tracking-tighter">OS_SETTINGS</h1>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 space-y-8">
        <h2 className="font-headline text-xl font-bold uppercase tracking-widest flex items-center gap-3">
          <Monitor className="text-primary w-6 h-6" /> VISUAL_INTERFACE
        </h2>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-bold uppercase">SCANLINE_EFFECT</div>
              <div className="text-[10px] text-on-surface-variant uppercase">Toggle CRT-style overlay</div>
            </div>
            <div 
              onClick={() => setSettings(s => ({ ...s, scanline: !s.scanline }))}
              className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${settings.scanline ? 'bg-primary' : 'bg-surface-container-highest'}`}
            >
              <motion.div 
                animate={{ x: settings.scanline ? 24 : 4 }}
                className="absolute top-1 w-4 h-4 bg-on-primary rounded-full"
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-bold uppercase">CIRCUIT_GRID</div>
                <div className="text-[10px] text-on-surface-variant uppercase">Background pattern intensity</div>
              </div>
              <span className="text-xs font-mono text-primary">{settings.circuitGrid}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={settings.circuitGrid}
              onChange={(e) => setSettings(s => ({ ...s, circuitGrid: parseInt(e.target.value) }))}
              className="w-full h-1 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 space-y-8">
        <h2 className="font-headline text-xl font-bold uppercase tracking-widest flex items-center gap-3">
          <Activity className="text-secondary w-6 h-6" /> PERFORMANCE_CORE
        </h2>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-bold uppercase">NEURAL_ACCELERATION</div>
              <div className="text-[10px] text-on-surface-variant uppercase">Enable high-speed transitions</div>
            </div>
            <div 
              onClick={() => setSettings(s => ({ ...s, neuralAcceleration: !s.neuralAcceleration }))}
              className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${settings.neuralAcceleration ? 'bg-secondary' : 'bg-surface-container-highest'}`}
            >
              <motion.div 
                animate={{ x: settings.neuralAcceleration ? 24 : 4 }}
                className="absolute top-1 w-4 h-4 bg-on-secondary rounded-full"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-bold uppercase">MEMORY_ALLOCATION</div>
              <div className="text-[10px] text-on-surface-variant uppercase">Current: 128GB DDR5</div>
            </div>
            <span className="text-xs font-mono text-secondary">OPTIMIZED</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default SettingsPage;
