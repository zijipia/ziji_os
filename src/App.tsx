/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal as TerminalIcon, 
  Settings, 
  Cpu, 
  Database, 
  Music, 
  Mail, 
  Github, 
  Facebook, 
  Disc, 
  ChevronRight, 
  Play, 
  SkipForward, 
  Volume2, 
  Download,
  Activity,
  Layers,
  Waves,
  Mic2,
  Monitor,
  Keyboard,
  Box,
  ExternalLink,
  Youtube
} from 'lucide-react';

// --- Types ---

type Module = 'TERMINAL' | 'ARCHIVES' | 'SPECS' | 'STUDIO' | 'PORTAL' | 'SHELL' | 'SETTINGS';

// --- Components ---

const Navbar = ({ activeModule, setActiveModule }: { activeModule: Module, setActiveModule: (m: Module) => void }) => {
  const navItems: Module[] = ['TERMINAL', 'ARCHIVES', 'SPECS', 'STUDIO', 'PORTAL'];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-20 bg-background/80 backdrop-blur-xl border-b border-primary/15">
      <div className="flex items-center gap-4">
        <img 
          src="https://raw.githubusercontent.com/zijipia/zijipia/refs/heads/main/Assets/image.png" 
          alt="Logo" 
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
        <div className="text-2xl font-black tracking-tighter text-primary drop-shadow-[0_0_8px_rgba(129,236,255,0.5)] font-headline uppercase">
          ZIJI_OS
        </div>
      </div>
      <nav className="hidden md:flex gap-8 items-center">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveModule(item)}
            className={`font-headline tracking-tighter uppercase text-sm transition-all duration-300 cursor-pointer ${
              activeModule === item 
                ? 'text-primary border-b-2 border-primary pb-1 shadow-[0_2px_10px_rgba(129,236,255,0.3)]' 
                : 'text-primary/50 hover:text-secondary'
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="flex items-center gap-6">
        <TerminalIcon 
          onClick={() => setActiveModule('SHELL')}
          className={`w-5 h-5 cursor-pointer hover:scale-110 transition-transform ${activeModule === 'SHELL' ? 'text-primary drop-shadow-[0_0_8px_#81ecff]' : 'text-primary/50'}`} 
        />
        <Settings 
          onClick={() => setActiveModule('SETTINGS')}
          className={`w-5 h-5 cursor-pointer hover:scale-110 transition-transform ${activeModule === 'SETTINGS' ? 'text-primary drop-shadow-[0_0_8px_#81ecff]' : 'text-primary/50'}`} 
        />
        <div className="w-10 h-10 rounded-full border border-primary/30 overflow-hidden bg-surface-container-high">
          <img 
            src="https://raw.githubusercontent.com/zijipia/zijipia/refs/heads/main/Assets/me.jpg" 
            alt="User Avatar" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="w-full border-t border-secondary/10 py-8 bg-background mt-auto">
    <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-sm font-bold text-secondary font-headline uppercase tracking-widest">
        ZIJI // <span className="opacity-50">SYSTEM_STATUS: OPERATIONAL</span>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {[
          { label: 'FACEBOOK', url: 'https://www.facebook.com/Ziji.Pia' },
          { label: 'GITHUB', url: 'https://github.com/zijipia' },
          { label: 'DISCORD', url: 'https://discord.gg/zaskhD7PTW' },
          { label: 'STUDIO', url: 'https://www.youtube.com/@ZijiStudio' },
          { label: 'NIGHTCORE', url: 'https://www.youtube.com/@ZijiNightcore' },
        ].map((link) => (
          <a 
            key={link.label}
            href={link.url} 
            target="_blank"
            rel="noopener noreferrer"
            className="font-headline text-[10px] tracking-[0.2em] uppercase text-on-surface-variant hover:text-secondary transition-all duration-300"
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="font-headline text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/50">
        © 2024 ZIJI_CORE. ALL RIGHTS RESERVED.
      </div>
    </div>
  </footer>
);

// --- Modules ---

const TerminalModule: React.FC<{ setActiveModule: (m: Module) => void }> = ({ setActiveModule }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-16"
  >
    <section className="relative pt-12">
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-[120px]"></div>
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-2 border-primary/20 pl-8">
        <div className="space-y-2">
          <span className="font-headline text-primary uppercase tracking-[0.3em] text-xs">STATUS: NEURAL_LINK_ACTIVE</span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none font-vietnam">
            INITIATING <span className="text-primary">NGUYỄN</span><br />
            <span className="text-secondary">THANH PHÚ</span>
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        <div className="space-y-8">
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Developer and Content Creator since 2003. Bridging high-performance code with rhythmic content innovation. Executing digital protocols.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveModule('ARCHIVES')}
              className="px-8 py-3 border border-primary text-primary font-headline uppercase tracking-widest hover:bg-primary/10 transition-all cursor-pointer"
            >
              [EXECUTE_WORK_FETCH]
            </button>
            <button 
              onClick={() => setActiveModule('STUDIO')}
              className="px-8 py-3 border border-secondary text-secondary font-headline uppercase tracking-widest hover:bg-secondary/10 transition-all cursor-pointer"
            >
              [OPEN_STUDIO_MODULE]
            </button>
          </div>
        </div>
        <div className="relative aspect-video bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant/20 group">
          <video 
            src="https://raw.githubusercontent.com/zijipia/zijipia/refs/heads/main/Assets/placeholder-video.mp4" 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
            autoPlay 
            muted 
            loop 
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-[10px] font-headline uppercase tracking-widest text-primary">LIVE_INTRO_FEED</span>
          </div>
        </div>
      </div>
    </section>

    <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-primary"></div>
          <h2 className="font-headline text-2xl font-bold uppercase tracking-widest">CORE_DATA</h2>
        </div>
        <p className="text-on-surface-variant italic text-lg">
          "I'm a passionate developer and content creator. I love building innovative solutions and creating content that inspires others. My work spans across various technologies and platforms, constantly pushing the boundaries of what's possible in the digital space."
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-surface-container-low p-6 border-l-2 border-primary">
            <div className="text-4xl font-headline font-black text-primary">21</div>
            <div className="text-xs uppercase tracking-widest text-on-surface-variant mt-1">CYCLES_OLD</div>
          </div>
          <div className="bg-surface-container-low p-6 border-l-2 border-secondary">
            <div className="text-4xl font-headline font-black text-secondary">50+</div>
            <div className="text-xs uppercase tracking-widest text-on-surface-variant mt-1">DEPLOYMENTS</div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low p-8 border border-outline-variant/10 rounded-xl space-y-8">
        <div className="flex gap-6 items-start">
          <img 
            src="https://raw.githubusercontent.com/zijipia/zijipia/refs/heads/main/Assets/me.jpg" 
            alt="Profile" 
            className="w-32 h-32 object-cover border border-primary/30"
            referrerPolicy="no-referrer"
          />
          <div>
            <h3 className="font-headline text-xl font-bold text-primary uppercase">THE DIGITAL POLYMATH</h3>
            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
              Merging the logic of terminal environments with the soul of nightcore aesthetics. Every line of code is a beat; every project is a performance.
            </p>
            <div className="text-[10px] uppercase tracking-widest text-primary/50 mt-4">CLASS: HYBRID_DEV_ARTIST // RANK: S</div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex gap-4 items-center p-4 bg-surface-container-high/50 border border-outline-variant/5">
            <TerminalIcon className="text-primary w-6 h-6" />
            <div>
              <div className="text-sm font-bold uppercase">DEVELOPMENT_ENGINE</div>
              <div className="text-xs text-on-surface-variant">Full-stack solutions with a focus on high-performance architecture.</div>
            </div>
          </div>
          <div className="flex gap-4 items-center p-4 bg-surface-container-high/50 border border-outline-variant/5">
            <Music className="text-secondary w-6 h-6" />
            <div>
              <div className="text-sm font-bold uppercase">STUDIO_OUTPUT</div>
              <div className="text-xs text-on-surface-variant">Creating immersive auditory experiences for the nightcore collective.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="border-t border-outline-variant/10 pt-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="font-headline text-3xl font-black uppercase tracking-tighter">ESTABLISH_CONTACT_LINK</h2>
          <p className="text-on-surface-variant text-sm uppercase tracking-widest">SECURE_UPLINK_AVAILABLE // STATUS: READY</p>
        </div>
        <div className="flex gap-4">
          {[
            { icon: Mail, url: 'mailto:contact@ziji.world', color: 'primary' },
            { icon: Facebook, url: 'https://www.facebook.com/Ziji.Pia', color: 'primary' },
            { icon: Github, url: 'https://github.com/zijipia', color: 'secondary' },
            { icon: Disc, url: 'https://discord.gg/zaskhD7PTW', color: 'tertiary' },
            { icon: Youtube, url: 'https://www.youtube.com/@ZijiStudio', color: 'secondary' },
            { icon: Youtube, url: 'https://www.youtube.com/@ZijiNightcore', color: 'secondary' },
          ].map((social, i) => (
            <a 
              key={i}
              href={social.url} 
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-${social.color}/30 flex items-center justify-center text-${social.color} hover:bg-${social.color} hover:text-on-surface transition-all shadow-lg hover:shadow-${social.color}/20`}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  </motion.div>
);

const ArchivesModule: React.FC = () => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-12"
  >
    <header className="border-l-4 border-primary pl-8 py-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#81ecff]"></span>
        <span className="font-headline text-xs tracking-[0.3em] text-primary uppercase">System Repository // Active_Projects</span>
      </div>
      <h1 className="font-headline text-6xl font-black uppercase tracking-tighter">PROJECT_ARCHIVES</h1>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { id: 'N_OS_001', title: 'Neural_OS_V1', status: 'Stable', tags: ['REACT', 'TAILWIND', 'RUST'], color: 'primary' },
        { id: 'NC_BE_404', title: 'Nightcore_Beat_Engine', status: 'Syncing', tags: ['JS', 'WEB_AUDIO', 'THREE.JS'], color: 'secondary' },
        { id: 'RCP_X_99', title: 'Rhythmic_Content_Protocol', status: 'Indexing', tags: ['HTML5', 'GO', 'IPFS'], color: 'tertiary' },
        { id: 'OG_UI_72', title: 'Obsidian_Grid_UI', status: 'Active', tags: ['CSS3', 'VUE', 'FIGMA'], color: 'primary' },
      ].map((project) => (
        <div key={project.id} className={`bg-surface-container-low border-b-2 border-${project.color}/20 hover:border-${project.color} transition-all p-6 space-y-6 group`}>
          <div className="flex justify-between items-start">
            <div className={`text-[10px] tracking-widest text-${project.color} bg-${project.color}/10 px-2 py-1`}>ID: {project.id}</div>
            <div className="flex gap-1">
              <div className={`w-1 h-1 bg-${project.color}`}></div>
              <div className={`w-1 h-1 bg-${project.color}/40`}></div>
            </div>
          </div>
          <h3 className="font-headline text-2xl font-bold uppercase tracking-tight">{project.title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase text-on-surface-variant">Status:</span>
            <span className={`text-[10px] uppercase text-${project.color}`}>{project.status}</span>
            <div className="flex-1 h-px bg-outline-variant/20"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] px-2 py-1 border border-outline-variant/30 text-on-surface-variant">{tag}</span>
            ))}
          </div>
          <button className={`flex items-center gap-2 text-${project.color} font-headline text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all pt-4 border-t border-outline-variant/10 w-full`}>
            Execute <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  </motion.div>
);

const SpecsModule: React.FC = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
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

const StudioModule: React.FC = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-12"
  >
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 bg-surface-container-low border border-outline-variant/15 p-8 rounded-xl relative overflow-hidden">
        <div className="absolute top-4 right-4 text-[10px] tracking-widest text-secondary uppercase opacity-40">SIGNAL_FLOW: ACTIVE</div>
        <div className="space-y-8">
          <div>
            <h1 className="font-headline text-5xl font-black tracking-tighter uppercase">STUDIO_MODULE</h1>
            <p className="text-on-surface-variant max-w-md mt-2">Synchronized multi-track environment. Real-time frequency analysis and obsidian-depth synthesis.</p>
          </div>
          
          <div className="h-48 flex items-end justify-between gap-1 px-4">
            {[40, 65, 30, 85, 50, 95, 70, 40, 60, 30, 75, 55, 90, 45, 65, 35, 80, 50, 70].map((h, i) => (
              <div key={i} className={`w-2 rounded-full ${i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-secondary' : 'bg-primary-dim'}`} style={{ height: `${h}%` }}></div>
            ))}
          </div>

          <div className="flex items-center gap-6 bg-surface-container-highest/50 p-4 rounded-full border border-outline-variant/10">
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-on-primary shadow-[0_0_15px_rgba(129,236,255,0.4)]">
              <Play className="fill-current" />
            </button>
            <div className="flex-1">
              <div className="flex justify-between text-[10px] font-headline text-on-surface-variant mb-1">
                <span>01:42 / 04:15</span>
                <span>CURRENT_TRACK: "NEON_DRIFT_V2"</span>
              </div>
              <div className="h-1 w-full bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary w-[40%] shadow-[0_0_8px_rgba(129,236,255,0.8)]"></div>
              </div>
            </div>
            <div className="flex gap-4 text-on-surface-variant">
              <SkipForward className="w-5 h-5 cursor-pointer hover:text-primary" />
              <Volume2 className="w-5 h-5 cursor-pointer hover:text-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 grid grid-rows-2 gap-6">
        <div className="bg-surface-container-high p-6 rounded-xl border-b-2 border-primary/30">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] text-primary uppercase font-bold tracking-widest">CPU_LOAD</span>
            <span className="text-[10px] text-on-surface-variant">42.8%</span>
          </div>
          <div className="text-3xl font-headline font-bold uppercase">OPTIMIZED</div>
          <div className="mt-4 flex gap-1">
            {[1, 1, 0.2, 0.2, 0.2].map((o, i) => <div key={i} className="h-1 flex-1 bg-primary" style={{ opacity: o }}></div>)}
          </div>
        </div>
        <div className="bg-surface-container-high p-6 rounded-xl border-b-2 border-secondary/30">
          <span className="text-[10px] text-secondary uppercase font-bold tracking-widest block mb-4">SESSION_METRICS</span>
          <div className="grid grid-cols-2 gap-4">
            <div><div className="text-[10px] text-on-surface-variant uppercase">Uptime</div><div className="text-xl font-headline font-bold">142H</div></div>
            <div><div className="text-[10px] text-on-surface-variant uppercase">Exports</div><div className="text-xl font-headline font-bold">892</div></div>
            <div><div className="text-[10px] text-on-surface-variant uppercase">BPM_AVG</div><div className="text-xl font-headline font-bold">128</div></div>
            <div><div className="text-[10px] text-on-surface-variant uppercase">Bitrate</div><div className="text-xl font-headline font-bold">32-Bit</div></div>
          </div>
        </div>
      </div>
    </section>

    <section className="space-y-6">
      <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
        <h2 className="font-headline text-2xl font-bold uppercase tracking-tight">STUDIO_OUTPUTS</h2>
        <button className="text-[10px] font-headline uppercase tracking-widest text-primary border border-primary/20 px-4 py-2 hover:bg-primary/10 transition-colors">REFRESH_BUFFER</button>
      </div>
      <div className="space-y-2">
        {[
          { title: 'CYBER_CHASM_EXPANSION', meta: 'WAV | 174 BPM | KEY: G# MIN', date: '04.12.2024', tag: 'FINAL_MIX_V4', color: 'secondary' },
          { title: 'VOID_COMMAND_CENTER', meta: 'MP3 | 120 BPM | KEY: C MAJ', date: '03.28.2024', tag: 'DRAFT_WIP', color: 'primary' },
          { title: 'SYNTHETIC_DREAMS_003', meta: 'WAV | 95 BPM | KEY: F MIN', date: '03.15.2024', tag: 'MASTERED', color: 'secondary' },
        ].map((track, i) => (
          <div key={i} className={`flex items-center gap-6 p-4 bg-surface-container-low hover:bg-surface-container-high border-l-2 border-transparent hover:border-${track.color} transition-all group cursor-pointer`}>
            <div className={`w-12 h-12 bg-surface-variant flex items-center justify-center rounded text-${track.color} opacity-50 group-hover:opacity-100`}>
              <Music className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="font-headline font-bold uppercase">{track.title}</div>
              <div className="text-[10px] text-on-surface-variant tracking-widest uppercase">{track.meta}</div>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-xs text-on-surface-variant">{track.date}</div>
              <div className={`text-[10px] text-${track.color}`}>{track.tag}</div>
            </div>
            <Download className="w-5 h-5 text-on-surface-variant hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

const PortalModule: React.FC = () => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    className="space-y-12"
  >
    <header className="border-l-4 border-primary pl-8 py-4">
      <span className="font-headline text-xs tracking-[0.3em] text-primary uppercase block mb-2">SYSTEM_ACTION // UPLINK</span>
      <h1 className="font-headline text-6xl font-black uppercase tracking-tighter">ESTABLISH_CONTACT_LINK</h1>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8 bg-surface-container-low p-1 rounded-lg border border-outline-variant/30">
        <div className="bg-background p-8 space-y-8">
          <div className="flex items-center gap-4 border-b border-outline-variant/20 pb-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-cyan-500/50"></div>
            </div>
            <span className="text-[10px] text-on-surface-variant tracking-widest uppercase">root@ziji-os:~/uplink/message_composer</span>
          </div>
          <form className="space-y-8">
            <div className="space-y-2 group">
              <label className="text-[10px] text-primary uppercase tracking-widest">01_IDENTITY_STRING</label>
              <div className="flex items-center gap-4 border-b border-outline-variant/20 group-focus-within:border-primary transition-colors">
                <span className="text-primary opacity-50">&gt;</span>
                <input type="text" placeholder="ENTER_NAME..." className="w-full bg-transparent border-none focus:ring-0 text-xl font-headline uppercase placeholder:text-outline-variant/30" />
              </div>
            </div>
            <div className="space-y-2 group">
              <label className="text-[10px] text-primary uppercase tracking-widest">02_COMMS_ENDPOINT</label>
              <div className="flex items-center gap-4 border-b border-outline-variant/20 group-focus-within:border-primary transition-colors">
                <span className="text-primary opacity-50">&gt;</span>
                <input type="email" placeholder="EMAIL_ADDRESS..." className="w-full bg-transparent border-none focus:ring-0 text-xl font-headline uppercase placeholder:text-outline-variant/30" />
              </div>
            </div>
            <div className="space-y-2 group">
              <label className="text-[10px] text-primary uppercase tracking-widest">03_DATA_PAYLOAD</label>
              <div className="flex items-start gap-4 border-b border-outline-variant/20 group-focus-within:border-primary transition-colors">
                <span className="text-primary opacity-50 mt-1">&gt;</span>
                <textarea placeholder="INITIALIZE_MESSAGE_INPUT..." className="w-full bg-transparent border-none focus:ring-0 text-xl font-headline uppercase placeholder:text-outline-variant/30 h-32 resize-none" />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="px-10 py-4 bg-primary text-on-primary font-headline font-bold uppercase tracking-widest rounded-full hover:shadow-[0_0_25px_rgba(129,236,255,0.4)] transition-all">
                EXECUTE_SEND
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-8">
        <div className="bg-surface-container-low p-8 border-r border-secondary/20 space-y-6">
          <h2 className="font-headline text-2xl font-black text-secondary uppercase flex items-center gap-2">
            <Activity className="w-6 h-6" /> SECURE_NODES
          </h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">ESTABLISH MULTI-CHANNEL CONNECTIONS THROUGH ENCRYPTED SOCIAL PROTOCOLS.</p>
          <div className="space-y-4">
            {[
              { icon: Facebook, label: 'FACEBOOK_NODE', url: 'https://www.facebook.com/Ziji.Pia' },
              { icon: Github, label: 'GITHUB_REPO', url: 'https://github.com/zijipia' },
              { icon: Disc, label: 'DISCORD_VOID', url: 'https://discord.gg/zaskhD7PTW' },
              { icon: Youtube, label: 'STUDIO_CHANNEL', url: 'https://www.youtube.com/@ZijiStudio' },
              { icon: Youtube, label: 'NIGHTCORE_CHANNEL', url: 'https://www.youtube.com/@ZijiNightcore' },
            ].map((node, i) => (
              <a 
                key={i} 
                href={node.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-surface-container-high border-l-2 border-secondary/20 hover:border-secondary transition-all hover:translate-x-2 group"
              >
                <div className="flex items-center gap-4">
                  <node.icon className="w-5 h-5 text-secondary" />
                  <span className="text-xs font-headline uppercase tracking-widest">{node.label}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
        <div className="bg-surface-container-low p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-tertiary uppercase tracking-widest">SIGNAL_STRENGTH</span>
            <div className="flex gap-1">
              {[1, 1, 1, 0.2].map((o, i) => <div key={i} className="w-1 h-3 bg-tertiary" style={{ opacity: o }}></div>)}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-on-surface-variant uppercase"><span>UP_LINK_ACTIVE</span><span className="text-tertiary">98.2%</span></div>
            <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-tertiary to-secondary w-[98.2%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const TerminalShellModule: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'ZIJI_OS [Version 4.2.0]',
    '(c) 2024 ZIJI_CORE. All rights reserved.',
    '',
    'Type "help" for a list of available commands.',
    ''
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, `root@ziji-os:~$ ${input}`];
    
    const cmd = input.trim().toLowerCase();
    if (cmd === 'help') {
      newHistory.push('Available commands: help, clear, status, about, contact, version');
    } else if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === 'status') {
      newHistory.push('SYSTEM_STATUS: OPERATIONAL');
      newHistory.push('UPTIME: 142H 12M 04S');
      newHistory.push('NEURAL_LINK: ACTIVE');
    } else if (cmd === 'about') {
      newHistory.push('ZIJI_OS: A high-fidelity cyber-electronic command interface.');
      newHistory.push('Developed by NGUYỄN THANH PHÚ.');
    } else if (cmd === 'contact') {
      newHistory.push('UPLINK: contact@ziji.world');
    } else if (cmd === 'version') {
      newHistory.push('ZIJI_OS v4.2.0-stable');
    } else {
      newHistory.push(`Command not found: ${input}`);
    }

    newHistory.push('');
    setHistory(newHistory);
    setInput('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      className="bg-surface-container-low border border-outline-variant/20 rounded-lg overflow-hidden flex flex-col h-[60vh] shadow-2xl"
    >
      <div className="bg-surface-container-high px-4 py-2 flex items-center justify-between border-b border-outline-variant/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <span className="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant">root@ziji-os:~/terminal</span>
      </div>
      <div className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-primary/20">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('root@') ? 'text-primary' : 'text-on-surface'}>
            {line}
          </div>
        ))}
        <form onSubmit={handleCommand} className="flex gap-2">
          <span className="text-primary">root@ziji-os:~$</span>
          <input 
            autoFocus
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 p-0 text-on-surface"
          />
        </form>
      </div>
    </motion.div>
  );
};

const SettingsModule: React.FC = () => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
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
            <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-on-primary rounded-full"></div>
            </div>
          </div>
          <div className="flex justify-between items-center opacity-50">
            <div>
              <div className="text-sm font-bold uppercase">CIRCUIT_GRID</div>
              <div className="text-[10px] text-on-surface-variant uppercase">Background pattern intensity</div>
            </div>
            <div className="w-32 h-1 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[60%]"></div>
            </div>
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
            <div className="w-12 h-6 bg-secondary rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-on-secondary rounded-full"></div>
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

// --- Main App ---

export default function App() {
  const [activeModule, setActiveModule] = useState<Module>('TERMINAL');

  return (
    <div className="min-h-screen flex flex-col circuit-bg">
      <div className="scanline"></div>
      
      <Navbar activeModule={activeModule} setActiveModule={setActiveModule} />
      
      <main className="flex-1 pt-32 pb-20 px-8 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {activeModule === 'TERMINAL' && <TerminalModule key="terminal" setActiveModule={setActiveModule} />}
          {activeModule === 'ARCHIVES' && <ArchivesModule key="archives" />}
          {activeModule === 'SPECS' && <SpecsModule key="specs" />}
          {activeModule === 'STUDIO' && <StudioModule key="studio" />}
          {activeModule === 'PORTAL' && <PortalModule key="portal" />}
          {activeModule === 'SHELL' && <TerminalShellModule key="shell" />}
          {activeModule === 'SETTINGS' && <SettingsModule key="settings" />}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-dim text-on-primary shadow-[0_0_20px_rgba(129,236,255,0.4)] flex items-center justify-center hover:scale-110 transition-transform z-50">
        <Activity className="w-6 h-6" />
      </button>
    </div>
  );
}
