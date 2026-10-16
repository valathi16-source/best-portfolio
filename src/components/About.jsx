import React from 'react';
import { 
  Code2, 
  Terminal, 
  Server, 
  ShieldCheck, 
  Cpu, 
  GitBranch, 
  Sparkles,
  Layers,
  Compass,
  CpuIcon
} from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolio';

// Dynamic icon mapper
const iconMap = {
  Code2: Code2,
  Terminal: Terminal,
  Server: Server,
  ShieldCheck: ShieldCheck,
  Cpu: Cpu,
  GitBranch: GitBranch,
};

export default function About() {
  const { developer, focusAreas } = PORTFOLIO_CONFIG;

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#050814]/50 dark:bg-[#050814]/50 light:bg-slate-100/50">
      
      {/* Decorative cyber grid lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Telemetry & Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cyber font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            About <span className="text-cyan-400 text-glow-cyan">Valathi</span>
          </h2>
          <p className="mt-3 text-slate-400 dark:text-slate-400 light:text-slate-600 text-base sm:text-lg">
            Engineering the convergence of sleek frontend design, system-level automation, and defensive computing.
          </p>
        </div>

        {/* Narrative & Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          <div className="lg:col-span-8 space-y-4 text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed text-base sm:text-lg">
            {developer.bio.map((paragraph, index) => (
              <p key={index} className="glass-card p-5 rounded-2xl border border-cyan-500/10">
                {paragraph}
              </p>
            ))}

            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3 text-xs sm:text-sm text-cyan-300 font-mono">
              <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <span>
                <strong>CURRENT MISSION:</strong> {developer.availability}
              </span>
            </div>
          </div>

          {/* Quick Metrics Panel */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 text-center relative overflow-hidden group hover:border-cyan-400 transition-colors">
              <div className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">Architecture Preference</div>
              <div className="text-xl font-bold font-cyber text-slate-100 dark:text-slate-100 light:text-slate-900">React + Vite + Tailwind</div>
              <p className="text-xs text-slate-400 mt-1">Lightweight, modular, and blazing fast frontend stacks.</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 text-center relative overflow-hidden group hover:border-purple-400 transition-colors">
              <div className="text-purple-400 font-mono text-xs uppercase tracking-widest mb-1">Scripting Philosophy</div>
              <div className="text-xl font-bold font-cyber text-slate-100 dark:text-slate-100 light:text-slate-900">Python & POSIX Bash</div>
              <p className="text-xs text-slate-400 mt-1">If a task repeats more than twice, automate it.</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 text-center relative overflow-hidden group hover:border-emerald-400 transition-colors">
              <div className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-1">Security Standard</div>
              <div className="text-xl font-bold font-cyber text-slate-100 dark:text-slate-100 light:text-slate-900">Defense in Depth</div>
              <p className="text-xs text-slate-400 mt-1">Sanitized inputs, zero credentials in client code, OWASP alignment.</p>
            </div>
          </div>

        </div>

        {/* 6 Core Focus Cards Grid */}
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-cyber font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 flex items-center justify-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Core Focus Areas & Specializations
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
            // Configured centrally via src/config/portfolio.js
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {focusAreas.map((area) => {
            const Icon = iconMap[area.icon] || Code2;
            const borderColors = {
              cyan: 'border-cyan-500/30 hover:border-cyan-400 hover:shadow-neon-cyan',
              purple: 'border-purple-500/30 hover:border-purple-400 hover:shadow-neon-purple',
              lime: 'border-emerald-500/30 hover:border-emerald-400 hover:shadow-neon-lime',
            };
            const iconBg = {
              cyan: 'bg-cyan-950/60 text-cyan-400 border-cyan-500/40',
              purple: 'bg-purple-950/60 text-purple-400 border-purple-500/40',
              lime: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40',
            };

            return (
              <div
                key={area.id}
                className={`glass-panel p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 ${
                  borderColors[area.color] || borderColors.cyan
                }`}
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${
                  iconBg[area.color] || iconBg.cyan
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-cyber font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 mb-2">
                  {area.title}
                </h4>
                <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                  {area.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
