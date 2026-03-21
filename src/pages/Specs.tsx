import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Keyboard } from 'lucide-react';

const SpecsPage: React.FC<{ transition: any }> = ({ transition }) => (
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
          <div className="bg-surface-container-low p-6 border border-outline-variant/10 hover:border-primary/30 transition-all">
            <Cpu className="text-primary w-8 h-8 mb-4" />
            <h3 className="font-headline font-bold uppercase">Custom Workstation</h3>
            <p className="text-sm text-on-surface-variant mt-2">Liquid-cooled monolithic chassis with integrated thermal displays.</p>
            <div className="mt-4 text-xs font-headline text-primary space-y-1">
              <p>• 128GB DDR5 RAM</p>
              <p>• 8TB NVME GEN5</p>
            </div>
          </div>
          <div className="bg-surface-container-low p-6 border border-outline-variant/10 hover:border-secondary/30 transition-all">
            <Keyboard className="text-secondary w-8 h-8 mb-4" />
            <h3 className="font-headline font-bold uppercase">Human Interface</h3>
            <p className="text-sm text-on-surface-variant mt-2">Split mechanical keyboard with linear switches and trackball integration.</p>
            <div className="mt-4 text-xs font-headline text-secondary space-y-1">
              <p>• QMK CONFIG</p>
              <p>• OLED HUD</p>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 border border-outline-variant/10 rounded-xl">
          <h3 className="font-headline text-sm font-bold uppercase tracking-widest mb-6 border-b border-outline-variant/10 pb-2">SOFTWARE_STACK</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-[10px] text-primary uppercase font-bold mb-3">OS_LAYER</div>
              <ul className="text-xs space-y-2 text-on-surface-variant">
                <li>Arch Linux</li>
                <li>Windows 11</li>
                <li>Docker</li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] text-secondary uppercase font-bold mb-3">CREATIVE</div>
              <ul className="text-xs space-y-2 text-on-surface-variant">
                <li>Neovim (LSP)</li>
                <li>Figma</li>
                <li>Blender 4.0</li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] text-tertiary uppercase font-bold mb-3">AUDIO</div>
              <ul className="text-xs space-y-2 text-on-surface-variant">
                <li>Ableton Live 12</li>
                <li>Serum / Vital</li>
                <li>UAD Console</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default SpecsPage;
