import React, { useState, useMemo } from 'react';
import { Search, FolderGit2, AlertCircle, X, Sparkles, Filter } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { PORTFOLIO_CONFIG } from '../config/portfolio';

export default function Projects() {
  const { projects, projectCategories } = PORTFOLIO_CONFIG;
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects by both category and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'all' || project.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#050814]/40 dark:bg-[#050814]/40 light:bg-slate-100/40">
      
      {/* Decorative cyber grid lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Archive & Deployments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cyber font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Featured <span className="text-cyan-400 text-glow-cyan">Projects</span>
          </h2>
          <p className="mt-3 text-slate-400 dark:text-slate-400 light:text-slate-600 text-base sm:text-lg">
            Explorations across modern user interfaces, system utilities, and intelligent tools.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 border ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-neon-cyan'
                    : 'bg-slate-900/60 text-slate-300 border-slate-700/60 hover:border-cyan-500/40 hover:text-cyan-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Real-time Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or tech..."
              className="w-full pl-10 pr-9 py-2 rounded-xl text-xs font-mono bg-slate-900/80 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-slate-100 placeholder-slate-500 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="p-12 text-center rounded-2xl glass-panel border border-cyan-500/20 max-w-lg mx-auto">
            <AlertCircle className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-pulse" />
            <h3 className="text-lg font-cyber font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 mb-2">
              NO TARGETS FOUND IN ARCHIVE
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-6">
              Query "{searchQuery}" in category "{activeCategory}" yielded 0 results. Try resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-neon-cyan"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

      </div>

    </section>
  );
}
