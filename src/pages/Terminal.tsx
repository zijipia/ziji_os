import React from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalIcon, Music, Mail, Facebook, Github, Disc, Youtube } from 'lucide-react';
import { Module } from '../types';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const TerminalPage: React.FC<{ transition: any }> = ({ transition }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
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
            <span className="font-headline text-primary uppercase tracking-[0.3em] text-xs">{t('terminal.status')}</span>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none font-vietnam">
              {t('terminal.initiating')} <span className="text-primary">Ziji</span><br />
              <span className="text-secondary">NG.THANH PHÚ</span>
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          <div className="space-y-8">
            <p className="text-on-surface-variant text-lg leading-relaxed">
              {t('terminal.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/archives')}
                className="px-6 sm:px-8 py-3 border border-primary text-primary font-headline uppercase tracking-widest hover:bg-primary/10 transition-all cursor-pointer text-sm sm:text-base whitespace-nowrap"
              >
                {t('terminal.execute_work')}
              </button>
              <button 
                onClick={() => navigate('/studio')}
                className="px-6 sm:px-8 py-3 border border-secondary text-secondary font-headline uppercase tracking-widest hover:bg-secondary/10 transition-all cursor-pointer text-sm sm:text-base whitespace-nowrap"
              >
                {t('terminal.open_studio')}
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
              <span className="text-[10px] font-headline uppercase tracking-widest text-primary">{t('terminal.live_intro')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-primary"></div>
            <h2 className="font-headline text-2xl font-bold uppercase tracking-widest">{t('terminal.core_data')}</h2>
          </div>
          <p className="text-on-surface-variant italic text-lg">
            "I'm a passionate developer and content creator. I love building innovative solutions and creating content that inspires others. My work spans across various technologies and platforms, constantly pushing the boundaries of what's possible in the digital space."
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-surface-container-low p-6 border-l-2 border-primary">
              <div className="text-4xl font-headline font-black text-primary">21</div>
              <div className="text-xs uppercase tracking-widest text-on-surface-variant mt-1">{t('terminal.cycles_old')}</div>
            </div>
            <div className="bg-surface-container-low p-6 border-l-2 border-secondary">
              <div className="text-4xl font-headline font-black text-secondary">50+</div>
              <div className="text-xs uppercase tracking-widest text-on-surface-variant mt-1">{t('terminal.deployments')}</div>
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
              <h3 className="font-headline text-xl font-bold text-primary uppercase">{t('terminal.polymath')}</h3>
              <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                {t('terminal.polymath_desc')}
              </p>
              <div className="text-[10px] uppercase tracking-widest text-primary/50 mt-4">{t('terminal.class')}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex gap-4 items-center p-4 bg-surface-container-high/50 border border-outline-variant/5">
              <TerminalIcon className="text-primary w-6 h-6" />
              <div>
                <div className="text-sm font-bold uppercase">{t('terminal.dev_engine')}</div>
                <div className="text-xs text-on-surface-variant">{t('terminal.dev_engine_desc')}</div>
              </div>
            </div>
            <div className="flex gap-4 items-center p-4 bg-surface-container-high/50 border border-outline-variant/5">
              <Music className="text-secondary w-6 h-6" />
              <div>
                <div className="text-sm font-bold uppercase">{t('terminal.studio_output')}</div>
                <div className="text-xs text-on-surface-variant">{t('terminal.studio_output_desc')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-outline-variant/10 pt-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="font-headline text-3xl font-black uppercase tracking-tighter">{t('terminal.contact')}</h2>
            <p className="text-on-surface-variant text-sm uppercase tracking-widest">{t('terminal.contact_status')}</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
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
};

export default TerminalPage;
