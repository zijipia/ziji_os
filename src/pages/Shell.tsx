import React, { useState } from 'react';
import { motion } from 'motion/react';

const ShellPage: React.FC<{ transition: any }> = ({ transition }) => {
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

export default ShellPage;
