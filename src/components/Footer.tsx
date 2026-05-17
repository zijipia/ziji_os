import React from 'react';
import { DiscordIcon, FacebookIcon, GithubIcon, YoutubeIcon } from './CustomIcons';

const Footer = () => (
<footer className="w-full border-t border-secondary/10 py-6 bg-background mt-auto">
  <div className="max-w-7xl mx-auto px-8 flex flex-row flex-nowrap items-center justify-between gap-6 overflow-hidden">
    
    {/* Left */}
    <div className="text-sm font-bold text-secondary font-headline uppercase tracking-widest whitespace-nowrap">
      ZIJI // <span className="opacity-50">SYSTEM_STATUS: OPERATIONAL</span>
    </div>

    {/* Center */}
    <div className="flex items-center gap-6 flex-nowrap overflow-x-auto scrollbar-hide min-w-0">
      {[
        { label: 'FACEBOOK', url: 'https://www.facebook.com/Ziji.Pia', icon: FacebookIcon },
        { label: 'GITHUB', url: 'https://github.com/zijipia', icon: GithubIcon },
        { label: 'DISCORD', url: 'https://discord.com/users/661968947327008768', icon: DiscordIcon },
        { label: 'STUDIO', url: 'https://www.youtube.com/@ZijiStudio', icon: YoutubeIcon },
        { label: 'NIGHTCORE', url: 'https://www.youtube.com/@ZijiNightcore', icon: YoutubeIcon },
      ].map((link) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 whitespace-nowrap font-headline text-[10px] tracking-[0.2em] uppercase text-on-surface-variant hover:text-white transition-all duration-300"
        >
          <link.icon
            size={14}
            className="text-on-surface-variant group-hover:text-white transition-colors"
          />
          <span>{link.label}</span>
        </a>
      ))}
    </div>

    {/* Right */}
    <div className="font-headline text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/50 whitespace-nowrap">
      © 2024 ZIJI_CORE. BY NGUYỄN THANH PHÚ.
    </div>
  </div>
</footer>
);

export default Footer;
