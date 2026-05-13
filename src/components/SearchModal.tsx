import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search as SearchIcon, X, Terminal, Cpu, ChevronRight, Loader2, Calendar } from 'lucide-react';
import { performAISearch, SearchResult } from '../services/searchService';
import { Project, Spec, Milestone } from '../services/dataService';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const searchResults = await performAISearch(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-surface-container-low border border-outline-variant/30 shadow-2xl rounded-xl overflow-hidden"
          >
            <div className="p-4 border-b border-outline-variant/10 bg-surface-container-high/50">
              <form onSubmit={handleSearch} className="flex items-center gap-4">
                <SearchIcon className="w-5 h-5 text-primary" />
                <input 
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('search.placeholder')}
                  className="flex-1 bg-transparent border-none outline-none text-on-surface font-headline placeholder:text-on-surface-variant/50 uppercase tracking-widest text-sm"
                />
                <button 
                  type="button"
                  onClick={onClose}
                  className="p-1 hover:bg-surface-container-highest rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-on-surface-variant" />
                </button>
              </form>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
              {isSearching ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <span className="text-[10px] font-headline uppercase tracking-[0.3em] text-primary animate-pulse">
                    {t('search.analyzing')}
                  </span>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((result) => (
                    <motion.div 
                      key={result.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="group p-4 bg-surface-container-high/30 border border-outline-variant/10 hover:border-primary/30 transition-all rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {result.type === 'PROJECT' ? (
                            <Terminal className="w-4 h-4 text-primary" />
                          ) : result.type === 'SPEC' ? (
                            <Cpu className="w-4 h-4 text-secondary" />
                          ) : (
                            <Calendar className="w-4 h-4 text-tertiary" />
                          )}
                          <span className="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant">
                            {result.type}
                          </span>
                        </div>
                        <div className="text-[10px] font-headline text-primary/50 uppercase">
                          RELEVANCE: HIGH
                        </div>
                      </div>
                      
                      <h3 className="font-headline text-lg font-bold text-on-surface uppercase mb-1">
                        {result.title}
                      </h3>
                      
                      <p className="text-xs text-on-surface-variant mb-3 italic">
                        "{result.relevanceReason}"
                      </p>

                      {result.type === 'PROJECT' ? (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(result.data as Project).tags.map(tag => (
                            <span key={tag} className="text-[9px] px-1.5 py-0.5 border border-outline-variant/20 text-on-surface-variant uppercase">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : result.type === 'SPEC' ? (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(result.data as Spec).items.slice(0, 3).map(item => (
                            <span key={item} className="text-[9px] px-1.5 py-0.5 bg-secondary/10 text-secondary uppercase">
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="text-xs text-on-surface-variant mb-4">
                          {t(`showcase.${(result.data as Milestone).text}`)}
                        </div>
                      )}

                      <div className="flex justify-end">
                        {result.type === 'PROJECT' ? (
                          <a 
                            href={(result.data as Project).url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[10px] font-headline font-bold text-primary uppercase tracking-widest hover:gap-2 transition-all"
                          >
                            OPEN_REPOSITORY <ChevronRight className="w-3 h-3" />
                          </a>
                        ) : result.type === 'SPEC' ? (
                          <button 
                            onClick={() => { navigate('/specs'); onClose(); }}
                            className="flex items-center gap-1 text-[10px] font-headline font-bold text-secondary uppercase tracking-widest"
                          >
                            VIEW_SPEC_MODULE <ChevronRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <button 
                            onClick={() => { navigate('/showcase'); onClose(); }}
                            className="flex items-center gap-1 text-[10px] font-headline font-bold text-tertiary uppercase tracking-widest"
                          >
                            VIEW_EVENT_LOG <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : query && !isSearching ? (
                <div className="text-center py-12">
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                    {t('search.no_results')}
                  </p>
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                    {t('search.initiate')}
                  </p>
                  <div className="flex justify-center gap-4">
                    {['React', 'TypeScript', 'Hardware', 'Music'].map(suggestion => (
                      <button 
                        key={suggestion}
                        onClick={() => {
                          setQuery(suggestion);
                          // Trigger search manually since state update is async
                          performAISearch(suggestion).then(setResults);
                        }}
                        className="text-[10px] px-3 py-1 border border-outline-variant/20 hover:border-primary/50 text-on-surface-variant hover:text-primary transition-all uppercase tracking-widest"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 bg-surface-container-highest/50 border-t border-outline-variant/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                <span className="text-[8px] font-headline uppercase tracking-widest text-on-surface-variant">
                  {t('search.ai_engine')}
                </span>
              </div>
              <span className="text-[8px] font-headline uppercase tracking-widest text-on-surface-variant/50">
                {t('search.esc_to_close')}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
