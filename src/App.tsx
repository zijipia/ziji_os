/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
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
  Youtube,
  MessageSquare
} from 'lucide-react';

// --- Types ---

type Module = 'TERMINAL' | 'ARCHIVES' | 'SPECS' | 'STUDIO' | 'PORTAL' | 'SHELL' | 'SETTINGS';

interface AppSettings {
  scanline: boolean;
  circuitGrid: number;
  neuralAcceleration: boolean;
}

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
}

interface YouTubeComment {
  id: string;
  author: string;
  authorThumb: string;
  text: string;
  publishedAt: string;
}

interface YouTubeStats {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
}

// --- Components ---

const CircuitGrid: React.FC<{ opacity: number, mousePos: { x: number, y: number } }> = ({ opacity, mousePos }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef(mousePos);

  useEffect(() => {
    mouseRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      
      ctx.clearRect(0, 0, w, h);
      
      const spacing = 24;
      const dotRadius = 1;
      const avoidRadius = 150;
      const avoidStrength = 20;

      ctx.fillStyle = `rgba(129, 236, 255, ${opacity})`;

      const mX = mouseRef.current.x;
      const mY = mouseRef.current.y;

      for (let x = spacing / 2; x < w; x += spacing) {
        for (let y = spacing / 2; y < h; y += spacing) {
          const dx = x - mX;
          const dy = y - mY;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);
          
          let drawX = x;
          let drawY = y;
          let scale = 1;

          if (dist < avoidRadius && dist > 0) {
            const force = (avoidRadius - dist) / avoidRadius;
            drawX += (dx / dist) * force * avoidStrength;
            drawY += (dy / dist) * force * avoidStrength;
            scale = Math.max(0.1, dist / avoidRadius); 
          }

          ctx.beginPath();
          ctx.arc(drawX, drawY, dotRadius * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [opacity]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

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
                ? 'text-primary border-b-2 border-primary pb-1 drop-shadow-[0_0_8px_rgba(129,236,255,0.6)]' 
                : 'text-primary/50 hover:text-secondary hover:drop-shadow-[0_0_5px_rgba(129,236,255,0.3)]'
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
        © 2024 ZIJI_CORE. DESIGNED BY NGUYỄN THANH PHÚ.
      </div>
    </div>
  </footer>
);

// --- Modules ---

const TerminalModule: React.FC<{ setActiveModule: (m: Module) => void, transition: any }> = ({ setActiveModule, transition }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={transition}
    className="space-y-16"
  >
    <section className="relative pt-12">
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-[120px]"></div>
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-2 border-primary/20 pl-8">
        <div className="space-y-2">
          <span className="font-headline text-primary uppercase tracking-[0.3em] text-xs">STATUS: NEURAL_LINK_ACTIVE</span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none font-vietnam">
            INITIATING <span className="text-primary">Ziji</span><br />
            <span className="text-secondary">NG.THANH PHÚ</span>
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

const ArchivesModule: React.FC<{ transition: any }> = ({ transition }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const [res1, res2] = await Promise.all([
          fetch('https://api.github.com/users/zijipia/repos?sort=updated&per_page=10'),
          fetch('https://api.github.com/users/ZiProject/repos?sort=updated&per_page=10')
        ]);

        if (!res1.ok || !res2.ok) throw new Error('Failed to fetch repositories');

        const data1 = await res1.json();
        const data2 = await res2.json();

        const combined = [...data1, ...data2]
          .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .map((repo: any, index: number) => ({
            id: repo.node_id.substring(0, 8),
            title: repo.name,
            status: repo.archived ? 'ARCHIVED' : 'ACTIVE',
            tags: [repo.language, ...(repo.topics || [])].filter(Boolean).map(t => t.toUpperCase()).slice(0, 3),
            color: index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'tertiary',
            url: repo.html_url,
            description: repo.description
          }));

        setProjects(combined);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={transition}
      className="space-y-12"
    >
      <header className="border-l-4 border-primary pl-8 py-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#81ecff]"></span>
          <span className="font-headline text-xs tracking-[0.3em] text-primary uppercase">System Repository // GitHub_Sync</span>
        </div>
        <h1 className="font-headline text-6xl font-black uppercase tracking-tighter">PROJECT_ARCHIVES</h1>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="font-headline text-xs tracking-widest text-primary animate-pulse">SYNCHRONIZING_GITHUB_DATA...</span>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 p-6 text-red-500 font-headline text-sm uppercase tracking-widest">
          ERROR: {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className={`bg-surface-container-low border-b-2 border-${project.color}/20 hover:border-${project.color} transition-all p-6 space-y-6 group flex flex-col`}>
              <div className="flex justify-between items-start">
                <div className={`text-[10px] tracking-widest text-${project.color} bg-${project.color}/10 px-2 py-1`}>ID: {project.id}</div>
                <div className="flex gap-1">
                  <div className={`w-1 h-1 bg-${project.color}`}></div>
                  <div className={`w-1 h-1 bg-${project.color}/40`}></div>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="font-headline text-2xl font-bold uppercase tracking-tight truncate" title={project.title}>{project.title}</h3>
                <p className="text-xs text-on-surface-variant line-clamp-2 h-8">{project.description || 'NO_DESCRIPTION_AVAILABLE'}</p>
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
              </div>
              <a 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-${project.color} font-headline text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all pt-4 border-t border-outline-variant/10 w-full`}
              >
                Execute <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const SpecsModule: React.FC<{ transition: any }> = ({ transition }) => (
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

const StudioModule: React.FC<{ transition: any }> = ({ transition }) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [comments, setComments] = useState<YouTubeComment[]>([]);
  const [stats, setStats] = useState<YouTubeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UC-lHJZR3GqxkQlow71PqfPg';

  useEffect(() => {
    const fetchYouTubeData = async () => {
      if (!YOUTUBE_API_KEY) {
        setError('YOUTUBE_API_KEY_MISSING');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch Videos
        const videosRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=5&type=video`
        );
        const videosData = await videosRes.json();
        
        if (videosData.error) throw new Error(videosData.error.message);

        const formattedVideos = (videosData.items || []).map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`
        }));

        // Fetch Comments
        const commentsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/commentThreads?key=${YOUTUBE_API_KEY}&allThreadsRelatedToChannelId=${CHANNEL_ID}&part=snippet&maxResults=5&order=time`
        );
        const commentsData = await commentsRes.json();

        const formattedComments = (commentsData.items || []).map((item: any) => ({
          id: item.id,
          author: item.snippet.topLevelComment.snippet.authorDisplayName,
          authorThumb: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
          text: item.snippet.topLevelComment.snippet.textDisplay,
          publishedAt: new Date(item.snippet.topLevelComment.snippet.publishedAt).toLocaleDateString()
        }));

        // Fetch Channel Stats
        const statsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&id=${CHANNEL_ID}&part=statistics`
        );
        const statsData = await statsRes.json();
        if (statsData.items && statsData.items[0]) {
          setStats(statsData.items[0].statistics);
        }

        setVideos(formattedVideos);
        setComments(formattedComments);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchYouTubeData();
  }, [YOUTUBE_API_KEY, CHANNEL_ID]);

  const formatNumber = (num: string) => {
    const n = parseInt(num);
    if (isNaN(n)) return '0';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={transition}
      className="space-y-12"
    >
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-surface-container-low border border-outline-variant/15 p-8 rounded-xl relative overflow-hidden">
          <div className="absolute top-4 right-4 text-[10px] tracking-widest text-secondary uppercase opacity-40">SIGNAL_FLOW: ACTIVE</div>
          <div className="space-y-8">
            <div>
              <h1 className="font-headline text-5xl font-black tracking-tighter uppercase">NEW_VIDEO</h1>
              <p className="text-on-surface-variant max-w-md mt-2">Latest production from Ziji Studio. High-fidelity visual synthesis and neural-audio integration.</p>
            </div>
            
            {videos.length > 0 ? (
              <div className="aspect-video relative rounded-lg overflow-hidden border border-outline-variant/20 group">
                <img 
                  src={videos[0].thumbnail} 
                  alt={videos[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <div className="text-[10px] font-headline text-primary uppercase tracking-[0.4em]">PREMIERE_NOW</div>
                  <h2 className="text-2xl font-headline font-bold uppercase tracking-tight line-clamp-2">{videos[0].title}</h2>
                  <a 
                    href={videos[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-on-primary rounded-full font-headline text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(129,236,255,0.5)] transition-all"
                  >
                    <Play className="w-4 h-4 fill-current" /> WATCH_ON_YOUTUBE
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-48 flex items-end justify-between gap-1 px-4">
                {[40, 65, 30, 85, 50, 95, 70, 40, 60, 30, 75, 55, 90, 45, 65, 35, 80, 50, 70].map((h, i) => (
                  <div key={i} className={`w-2 rounded-full ${i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-secondary' : 'bg-primary-dim'}`} style={{ height: `${h}%` }}></div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 grid grid-rows-2 gap-6">
          <div className="bg-surface-container-high p-6 rounded-xl border-b-2 border-primary/30">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] text-primary uppercase font-bold tracking-widest">CHANNEL_STATS</span>
              <span className="text-[10px] text-on-surface-variant">LIVE_SYNC</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="text-[10px] text-on-surface-variant uppercase">Subscribers</div>
                <div className="text-3xl font-headline font-bold text-primary">{stats ? formatNumber(stats.subscriberCount) : '---'}</div>
              </div>
              <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[85%] animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-high p-6 rounded-xl border-b-2 border-secondary/30">
            <span className="text-[10px] text-secondary uppercase font-bold tracking-widest block mb-4">ENGAGEMENT_METRICS</span>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-on-surface-variant uppercase">Total Views</div>
                <div className="text-xl font-headline font-bold">{stats ? formatNumber(stats.viewCount) : '---'}</div>
              </div>
              <div>
                <div className="text-[10px] text-on-surface-variant uppercase">Videos</div>
                <div className="text-xl font-headline font-bold">{stats ? stats.videoCount : '---'}</div>
              </div>
              <div>
                <div className="text-[10px] text-on-surface-variant uppercase">Status</div>
                <div className="text-[10px] font-headline font-bold text-secondary">VERIFIED_PARTNER</div>
              </div>
              <div>
                <div className="text-[10px] text-on-surface-variant uppercase">Region</div>
                <div className="text-[10px] font-headline font-bold">GLOBAL</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
          <h2 className="font-headline text-2xl font-bold uppercase tracking-tight flex items-center gap-3">
            <Youtube className="w-6 h-6 text-red-500" /> STUDIO_SHOWCASE
          </h2>
          <button 
            onClick={() => window.location.reload()}
            className="text-[10px] font-headline uppercase tracking-widest text-primary border border-primary/20 px-4 py-2 hover:bg-primary/10 transition-colors"
          >
            REFRESH_BUFFER
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="font-headline text-[10px] tracking-[0.3em] text-primary animate-pulse uppercase">UPLINKING_YOUTUBE_DATA...</span>
          </div>
        ) : error === 'YOUTUBE_API_KEY_MISSING' ? (
          <div className="bg-surface-container-high border border-outline-variant/20 p-8 rounded-xl text-center space-y-4">
            <div className="text-primary opacity-50 flex justify-center"><Youtube className="w-12 h-12" /></div>
            <h3 className="font-headline text-xl font-bold uppercase">API_KEY_REQUIRED</h3>
            <p className="text-on-surface-variant text-sm max-w-md mx-auto">Please configure VITE_YOUTUBE_API_KEY in your environment to synchronize with the Ziji Studio channel.</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 p-6 text-red-500 font-headline text-sm uppercase tracking-widest">
            ERROR: {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Latest Videos */}
            <div className="lg:col-span-8 space-y-4">
              <div className="text-[10px] font-headline text-on-surface-variant uppercase tracking-widest mb-4">LATEST_TRANSMISSIONS</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.map((video) => (
                  <a 
                    key={video.id} 
                    href={video.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative bg-surface-container-low border border-outline-variant/10 overflow-hidden hover:border-primary/50 transition-all"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg">
                          <Play className="fill-current ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="text-[10px] text-primary font-bold tracking-widest uppercase">{video.publishedAt}</div>
                      <h3 className="font-headline text-sm font-bold uppercase line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-on-surface-variant uppercase tracking-widest">
                        <span>PLAY_NOW</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Recent Comments */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-[10px] font-headline text-on-surface-variant uppercase tracking-widest mb-4">COMMUNITY_FEEDBACK</div>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-surface-container-low p-4 border-l-2 border-secondary/30 hover:bg-surface-container-high transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <img 
                        src={comment.authorThumb} 
                        alt={comment.author} 
                        className="w-6 h-6 rounded-full border border-outline-variant/20"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1">
                        <div className="text-[10px] font-bold text-secondary uppercase tracking-tight">{comment.author}</div>
                        <div className="text-[8px] text-on-surface-variant uppercase">{comment.publishedAt}</div>
                      </div>
                      <MessageSquare className="w-3 h-3 text-on-surface-variant opacity-30" />
                    </div>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed line-clamp-3 italic" dangerouslySetInnerHTML={{ __html: comment.text }}></p>
                  </div>
                ))}
                {comments.length === 0 && (
                  <div className="text-[10px] text-on-surface-variant uppercase tracking-widest text-center py-8 border border-dashed border-outline-variant/20">
                    NO_RECENT_COMMENTS_FOUND
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </motion.div>
  );
};

const PortalModule: React.FC<{ transition: any }> = ({ transition }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={transition}
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

const TerminalShellModule: React.FC<{ transition: any }> = ({ transition }) => {
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
      transition={transition}
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

const SettingsModule: React.FC<{ settings: AppSettings, setSettings: React.Dispatch<React.SetStateAction<AppSettings>>, transition: any }> = ({ settings, setSettings, transition }) => (
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

// --- Main App ---

export default function App() {
  const [activeModule, setActiveModule] = useState<Module>('TERMINAL');
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('ziji_settings');
    return saved ? JSON.parse(saved) : {
      scanline: true,
      circuitGrid: 50,
      neuralAcceleration: true
    };
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
      
      <Navbar activeModule={activeModule} setActiveModule={setActiveModule} />
      
      <main className="flex-1 pt-32 pb-20 px-8 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {activeModule === 'TERMINAL' && <TerminalModule key="terminal" setActiveModule={setActiveModule} transition={transition} />}
          {activeModule === 'ARCHIVES' && <ArchivesModule key="archives" transition={transition} />}
          {activeModule === 'SPECS' && <SpecsModule key="specs" transition={transition} />}
          {activeModule === 'STUDIO' && <StudioModule key="studio" transition={transition} />}
          {activeModule === 'PORTAL' && <PortalModule key="portal" transition={transition} />}
          {activeModule === 'SHELL' && <TerminalShellModule key="shell" transition={transition} />}
          {activeModule === 'SETTINGS' && <SettingsModule key="settings" settings={settings} setSettings={setSettings} transition={transition} />}
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
