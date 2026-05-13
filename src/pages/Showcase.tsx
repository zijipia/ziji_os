import React from 'react';
import { motion } from 'motion/react';
import { Calendar, GraduationCap, Trophy, Youtube, MapPin, School, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getMilestones, Milestone } from '../services/dataService';

const ShowcasePage: React.FC<{ transition: any }> = ({ transition }) => {
  const { t } = useLanguage();
  const milestones = getMilestones();

  const getIcon = (type: Milestone['iconType'], color: string) => {
    const className = `w-5 h-5 text-${color}`;
    switch (type) {
      case 'school': return <School className={className} />;
      case 'youtube': return <Youtube className={className} />;
      case 'graduation': return <GraduationCap className={className} />;
      case 'trophy': return <Trophy className={className} />;
      case 'map': return <MapPin className={className} />;
      case 'users': return <Users className={className} />;
      default: return <School className={className} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={transition}
      className="space-y-12"
    >
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-2 border-primary/20 pl-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 shadow-[0_0_20px_rgba(129,236,255,0.3)] bg-surface-container-high"
          >
            <img 
              src="https://github.com/user-attachments/assets/61162ebe-48fb-4be9-b195-4212de8539e4" 
              alt="Avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="space-y-2 text-center md:text-left">
            <span className="font-headline text-primary uppercase tracking-[0.3em] text-xs">{t('showcase.subtitle')}</span>
            <h1 className="font-headline text-6xl font-black tracking-tight uppercase">{t('showcase.title')}</h1>
          </div>
        </div>
        <div className="text-right font-headline text-on-surface-variant text-sm space-y-1 hidden md:block">
          <p>LOG_VERSION: 1.0.4</p>
          <p>STATUS: <span className="text-primary font-bold">DECODED</span></p>
        </div>
      </header>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-outline-variant/30 hidden md:block"></div>
        
        <div className="space-y-12 relative">
          {milestones.map((milestone, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row gap-8 group"
            >
              <div className="flex items-center gap-4 md:w-32 flex-shrink-0">
                <div className={`w-16 h-16 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-center text-${milestone.color} shadow-[0_0_15px_rgba(var(--${milestone.color}-rgb),0.1)] group-hover:scale-110 transition-transform relative z-10`}>
                  {getIcon(milestone.iconType, milestone.color)}
                </div>
                <div className="md:hidden font-headline text-2xl font-black text-on-surface flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-on-surface-variant" />
                  {milestone.year}
                </div>
              </div>

              <div className="hidden md:flex flex-col items-center justify-center w-8">
                <div className={`w-3 h-3 rounded-full bg-${milestone.color} shadow-[0_0_10px_rgba(var(--${milestone.color}-rgb),0.5)] z-10`}></div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-baseline gap-4">
                  <div className="hidden md:block font-headline text-3xl font-black text-on-surface uppercase tracking-tight">
                    {milestone.year}
                  </div>
                  <div className={`h-px flex-1 bg-outline-variant/10 hidden md:block`}></div>
                </div>

                <div className={`p-6 rounded-xl bg-surface-container-low border border-outline-variant/10 group-hover:border-${milestone.color}/30 transition-all shadow-sm`}>
                  {milestone.url ? (
                    <a 
                      href={milestone.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 font-headline text-lg font-bold text-on-surface hover:text-secondary transition-colors"
                    >
                      {t(`showcase.${milestone.text}`)}
                    </a>
                  ) : (
                    <p className="font-headline text-lg font-bold text-on-surface">{t(`showcase.${milestone.text}`)}</p>
                  )}
                  
                  {milestone.image && (
                    <div className="mt-6 rounded-lg overflow-hidden border border-outline-variant/10 bg-surface-container-highest/30">
                      <img 
                        src={milestone.image} 
                        alt={milestone.year} 
                        className="w-full max-h-[500px] object-contain hover:scale-[1.02] transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ShowcasePage;
