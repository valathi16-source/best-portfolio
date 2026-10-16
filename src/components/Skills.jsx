import React, { useState } from 'react';
import { 
  FileCode, 
  Palette, 
  Braces, 
  Atom, 
  Binary, 
  TerminalSquare, 
  GitFork, 
  ShieldAlert, 
  AlertTriangle,
  Cpu
} from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolio';

const iconMap = {
  FileCode: FileCode,
  Palette: Palette,
  Braces: Braces,
  Atom: Atom,
  Binary: Binary,
  TerminalSquare: TerminalSquare,
  GitFork: GitFork,
  ShieldAlert: ShieldAlert,
};

export default function Skills() {
  const { skills } = PORTFOLIO_CONFIG;
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend & Scripting', 'Systems & DevOps', 'Security & AI'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden cyber-grid">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cyber font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Skills & <span className="text-purple-400 text-glow-purple">Proficiencies</span>
          </h2>
          <p className="mt-3 text-slate-400 dark:text-slate-400 light:text-slate-600 text-base sm:text-lg">
            A comprehensive matrix of technologies, tools, and paradigms under continuous active refinement.
          </p>
        </div>

        {/* Important Disclaimer Notice as requested */}
        <div className="max-w-2xl mx-auto mb-10 p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-300 flex items-center gap-3 text-xs font-mono shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <span>
            <strong>TRANSPARENCY NOTICE:</strong> The percentages shown below are sample starter estimates. Update <code className="text-cyan-300 font-bold">src/config/portfolio.js</code> with your actual verified proficiency levels!
          </span>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-semibold shadow-neon-cyan scale-105'
                  : 'bg-slate-900/60 text-slate-300 border-slate-700/60 hover:border-cyan-500/40 hover:text-cyan-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid with Animated Progress Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => {
            const Icon = iconMap[skill.icon] || FileCode;

            return (
              <div
                key={skill.name}
                className="glass-panel p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/80 transition-all duration-300 group hover:-translate-y-1 hover:shadow-neon-cyan relative flex flex-col justify-between"
              >
                <div>
                  {/* Top: Icon & Percentage Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800/80 text-cyan-400 border border-cyan-500/30">
                      {skill.percentage}%
                    </span>
                  </div>

                  {/* Title & Level */}
                  <h3 className="font-cyber font-bold text-base text-slate-100 dark:text-slate-100 light:text-slate-900 mb-1 group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </h3>
                  <div className="text-xs font-mono text-purple-400 dark:text-purple-400 light:text-purple-600 mb-3">
                    Level: {skill.level}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mb-5 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Cyber Progress Indicator */}
                <div className="w-full">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-1">
                    <span>PROGRESS</span>
                    <span>{skill.percentage} / 100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900/90 border border-slate-700/60 overflow-hidden relative">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-500 transition-all duration-1000 ease-out shadow-neon-cyan"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
