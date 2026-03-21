import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Terminal as TerminalIcon, Settings } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { label: 'TERMINAL', path: '/' },
    { label: 'ARCHIVES', path: '/archives' },
    { label: 'SPECS', path: '/specs' },
    { label: 'STUDIO', path: '/studio' },
    { label: 'PORTAL', path: '/portal' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-20 bg-background/80 backdrop-blur-xl border-b border-primary/15">
      <Link to="/" className="flex items-center gap-4">
        <img 
          src="https://raw.githubusercontent.com/zijipia/zijipia/refs/heads/main/Assets/image.png" 
          alt="Logo" 
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
        <div className="text-2xl font-black tracking-tighter text-primary drop-shadow-[0_0_8px_rgba(129,236,255,0.5)] font-headline uppercase">
          ZIJI_OS
        </div>
      </Link>
      <nav className="hidden md:flex gap-8 items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `font-headline tracking-tighter uppercase text-sm transition-all duration-300 cursor-pointer ${
              isActive 
                ? 'text-primary border-b-2 border-primary pb-1 drop-shadow-[0_0_8px_rgba(129,236,255,0.6)]' 
                : 'text-primary/50 hover:text-secondary hover:drop-shadow-[0_0_5px_rgba(129,236,255,0.3)]'
            }`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="flex items-center gap-6">
        <NavLink to="/shell">
          {({ isActive }) => (
            <TerminalIcon 
              className={`w-5 h-5 cursor-pointer hover:scale-110 transition-transform ${isActive ? 'text-primary drop-shadow-[0_0_8px_#81ecff]' : 'text-primary/50'}`} 
            />
          )}
        </NavLink>
        <NavLink to="/settings">
          {({ isActive }) => (
            <Settings 
              className={`w-5 h-5 cursor-pointer hover:scale-110 transition-transform ${isActive ? 'text-primary drop-shadow-[0_0_8px_#81ecff]' : 'text-primary/50'}`} 
            />
          )}
        </NavLink>
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

export default Navbar;
