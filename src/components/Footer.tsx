import React from 'react';

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

export default Footer;
