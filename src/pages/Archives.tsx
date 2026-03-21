import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const ArchivesPage: React.FC<{ transition: any }> = ({ transition }) => {
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

        const combinedData = [...data1, ...data2];
        const uniqueRepos = Array.from(new Map(combinedData.map(item => [item.node_id, item])).values());

        const combined = uniqueRepos
          .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .map((repo: any, index: number) => ({
            id: repo.node_id,
            displayId: repo.node_id.substring(0, 8),
            title: repo.name,
            status: repo.archived ? 'ARCHIVED' : 'ACTIVE',
            tags: Array.from(new Set([repo.language, ...(repo.topics || [])].filter(Boolean).map(t => t.toUpperCase()))).slice(0, 3),
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
                <div className={`text-[10px] tracking-widest text-${project.color} bg-${project.color}/10 px-2 py-1`}>ID: {project.displayId}</div>
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

export default ArchivesPage;
