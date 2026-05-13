import React from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Swords, User, Clock, ExternalLink, Hash } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const GamingPage: React.FC<{ transition: any }> = ({ transition }) => {
  const { t } = useLanguage();

  const games = [
    {
      id: 'cs2',
      title: t('gaming.cs2_title'),
      stats: [
        { label: 'PLAYTIME', value: t('gaming.cs2_hours'), icon: <Clock className="w-4 h-4" /> }
      ],
      icon: <Swords className="w-8 h-8 text-secondary" />,
      color: 'secondary',
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'genshin',
      title: t('gaming.genshin_title'),
      stats: [
        { label: 'OPERATOR', value: t('gaming.genshin_user'), icon: <User className="w-4 h-4" /> },
        { label: 'IDENTIFIER', value: t('gaming.genshin_uid'), icon: <Hash className="w-4 h-4" /> }
      ],
      icon: <Gamepad2 className="w-8 h-8 text-primary" />,
      color: 'primary',
      imageUrl: 'https://images.unsplash.com/photo-1614027164847-1b2809eb189d?q=80&w=2000&auto=format&fit=crop'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={transition}
      className="space-y-12"
    >
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-2 border-secondary/20 pl-8">
        <div className="space-y-2">
          <span className="font-headline text-secondary uppercase tracking-[0.3em] text-xs">{t('gaming.subtitle')}</span>
          <h1 className="font-headline text-6xl font-black tracking-tight uppercase">{t('gaming.title')}</h1>
        </div>
        <div className="flex gap-4">
          <a 
            href="https://steamcommunity.com/id/ZijiPia/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-3 bg-surface-container-low border border-outline-variant/10 hover:border-secondary/30 rounded-xl transition-all"
          >
            <div className="text-right">
              <div className="text-[10px] font-headline text-on-surface-variant uppercase tracking-widest">{t('gaming.steam_profile')}</div>
              <div className="text-sm font-bold text-secondary">ZijiPia</div>
            </div>
            <ExternalLink className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {games.map((game, i) => (
          <motion.div 
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10 hover:border-outline-variant/30 transition-all shadow-xl"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={game.imageUrl} 
                alt={game.title} 
                className="w-full h-full object-cover opacity-10 blur-[2px] group-hover:opacity-20 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/90 to-transparent"></div>
            </div>

            <div className="relative z-10 p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className={`p-4 rounded-xl bg-surface-container-high border border-outline-variant/10 shadow-[0_0_20px_rgba(var(--${game.color}-rgb),0.1)]`}>
                  {game.icon}
                </div>
                <div className="text-right space-y-1">
                  <div className="text-[10px] font-headline text-on-surface-variant uppercase tracking-widest leading-none">ACTIVE_SESSION</div>
                  <div className={`text-xs font-bold text-${game.color}`}>LINKED</div>
                </div>
              </div>

              <div className="space-y-1">
                <h2 className="text-3xl font-black font-headline tracking-tighter uppercase group-hover:text-secondary transition-colors">
                  {game.title}
                </h2>
                <div className="h-1 w-12 bg-gradient-to-r from-secondary to-transparent"></div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {game.stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-high/50 border border-outline-variant/5">
                    <div className="text-on-surface-variant">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-headline text-on-surface-variant uppercase tracking-widest">{stat.label}</div>
                      <div className="text-sm font-bold uppercase tracking-tight">{stat.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="p-8 bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/30 text-center">
        <p className="text-on-surface-variant italic font-headline text-sm uppercase tracking-widest">
          SYSTEM_MESSAGE: MORE_GAME_DATA_PENDING_SYNCHRONIZATION...
        </p>
      </section>
    </motion.div>
  );
};

export default GamingPage;
