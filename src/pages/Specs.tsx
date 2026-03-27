import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Keyboard, Monitor, Layers, Music as MusicIcon } from 'lucide-react';
import { getSpecs } from '../services/dataService';

const SpecsPage: React.FC<{ transition: any }> = ({ transition }) => {
  const specs = getSpecs();
  
  const getIcon = (category: string) => {
    switch (category) {
      case 'HARDWARE_WORKSTATION': return <Cpu className="text-primary w-8 h-8 mb-4" />;
      case 'HUMAN_INTERFACE': return <Keyboard className="text-secondary w-8 h-8 mb-4" />;
      case 'SOFTWARE_OS': return <Monitor className="text-primary w-4 h-4" />;
      case 'SOFTWARE_CREATIVE': return <Layers className="text-secondary w-4 h-4" />;
      case 'SOFTWARE_AUDIO': return <MusicIcon className="text-tertiary w-4 h-4" />;
      default: return <Cpu className="text-primary w-8 h-8 mb-4" />;
    }
  };

  const hardwareSpecs = specs.filter(s => s.category.startsWith('HARDWARE') || s.category === 'HUMAN_INTERFACE');
  const softwareSpecs = specs.filter(s => s.category.startsWith('SOFTWARE'));

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={transition}
      className="space-y-12"
    >
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-2 border-primary/20 pl-8">
        <div className="space-y-2">
          <span className="font-headline text-primary uppercase tracking-[0.3em] text-xs">System.Manifest_v4.2</span>
          <h1 className="font-headline text-6xl font-black tracking-tight uppercase">TECHNICAL_SPECS</h1>
        </div>
        <div className="text-right font-headline text-on-surface-variant text-sm space-y-1">
          <p>LAST_SYNC: 2024.05.21</p>
          <p>STATUS: <span className="text-primary">OPTIMAL_READY</span></p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-surface-container-low border border-outline-variant/20 rounded-lg p-6 font-mono text-sm">
          <div className="flex items-center justify-between mb-6 border-b border-outline-variant/10 pb-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <span className="text-xs text-on-surface-variant">terminal — ziji_core — 80x24</span>
          </div>
          <div className="space-y-2">
            <p className="text-on-surface-variant"><span className="text-primary">$</span> systemctl status ziji-os.service</p>
            <p className="text-secondary">● ziji-os.service - ZIJI Operational Core</p>
            <p className="pl-4 text-primary">Active: active (running) since Thu 2024-05-18</p>
            <div className="py-4 space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] uppercase"><span>CPU Core Temp</span><span className="text-primary">42°C</span></div>
                <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[42%]"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] uppercase"><span>GPU Load</span><span className="text-secondary">78%</span></div>
                <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[78%]"></div>
                </div>
              </div>
            </div>
            <p className="text-on-surface-variant animate-pulse"><span className="text-primary">$</span> _</p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {hardwareSpecs.map(spec => (
              <div key={spec.category} className="bg-surface-container-low p-6 border border-outline-variant/10 hover:border-primary/30 transition-all">
                {getIcon(spec.category)}
                <h3 className="font-headline font-bold uppercase">{spec.category.replace('HARDWARE_', '')}</h3>
                <p className="text-sm text-on-surface-variant mt-2">{spec.description}</p>
                <div className="mt-4 text-xs font-headline text-primary space-y-1">
                  {spec.items.map(item => <p key={item}>• {item}</p>)}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-low p-6 border border-outline-variant/10 rounded-xl">
            <h3 className="font-headline text-sm font-bold uppercase tracking-widest mb-6 border-b border-outline-variant/10 pb-2">SOFTWARE_STACK</h3>
            <div className="grid grid-cols-3 gap-4">
              {softwareSpecs.map(spec => (
                <div key={spec.category}>
                  <div className="text-[10px] text-primary uppercase font-bold mb-3 flex items-center gap-2">
                    {getIcon(spec.category)}
                    {spec.category.replace('SOFTWARE_', '')}
                  </div>
                  <ul className="text-xs space-y-2 text-on-surface-variant">
                    {spec.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpecsPage;
