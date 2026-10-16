import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail, Heart, Terminal, Sparkles } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolio';

export default function Footer({ onOpenTerminal }) {
  const { developer, socials } = PORTFOLIO_CONFIG;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative bg-[#030611] border-t border-cyan-500/20 pt-16 pb-12 overflow-hidden text-slate-400 font-sans">
      
      {/* Decorative ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-[2px] shadow-neon-cyan">
                <div className="w-full h-full bg-[#050814] rounded-[10px] flex items-center justify-center">
                  <span className="font-cyber font-black text-cyan-400 text-base">V</span>
                </div>
              </div>
              <span className="font-cyber font-bold text-lg tracking-wider text-slate-100">
                {developer.name.toUpperCase()}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Crafting digital experiences across the cyber frontier. Merging modern frontend design, Linux systems, and automated pipelines.
            </p>

            <div className="text-xs font-mono text-cyan-400/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>VALATHI-CYBER-CORE // SYSTEMS ACTIVE</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <h4 className="font-bold text-slate-200 uppercase tracking-widest mb-3">Navigation</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-cyan-400 transition-colors">/ Home</a></li>
                <li><a href="#about" className="hover:text-cyan-400 transition-colors">/ About</a></li>
                <li><a href="#skills" className="hover:text-cyan-400 transition-colors">/ Skills</a></li>
                <li><a href="#projects" className="hover:text-cyan-400 transition-colors">/ Projects</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-200 uppercase tracking-widest mb-3">Interactions</h4>
              <ul className="space-y-2">
                <li><a href="#github" className="hover:text-cyan-400 transition-colors">/ GitHub</a></li>
                <li><a href="#contact" className="hover:text-cyan-400 transition-colors">/ Contact</a></li>
                <li>
                  <button onClick={onOpenTerminal} className="hover:text-emerald-400 transition-colors text-left">
                    / Terminal
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Channels & Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-widest md:text-right">
                Connect Frequencies
              </h4>
              <div className="flex items-center gap-2">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${developer.email}`}
                  aria-label="Email"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 md:mt-0 inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 transition-all"
              title="Return to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <p>
            &copy; {currentYear} {developer.name}. All rights reserved. Built with React &amp; Tailwind.
          </p>
          <p className="flex items-center gap-1.5 text-slate-400">
            <span>Engineered with passion for futuristic software</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </p>
        </div>

      </div>

    </footer>
  );
}
