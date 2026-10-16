import React from 'react';
import { 
  ArrowRight, 
  Download, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Cpu, 
  Terminal, 
  Atom, 
  ShieldCheck, 
  Sparkles,
  Radio
} from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolio';

export default function Hero({ onOpenResumeModal }) {
  const { developer, socials, resume } = PORTFOLIO_CONFIG;

  const handleDownloadResume = (e) => {
    // If direct download or open modal
    // Here we trigger direct download of the generated PDF file
    const link = document.createElement('a');
    link.href = resume.downloadPath;
    link.download = resume.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden cyber-grid">
      
      {/* Background Ambient Glow Spheres */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Introductions & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* System Status Telemetry Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-6 shadow-neon-cyan backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>{developer.status}</span>
            </div>

            {/* Main Cyber Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cyber font-black tracking-tight leading-tight mb-4 text-slate-100 dark:text-slate-100 light:text-slate-900">
              Building the Future,{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500 bg-clip-text text-transparent text-glow-cyan">
                One Line
              </span>{' '}
              at a Time.
            </h1>

            {/* Developer Subtitle & Role */}
            <div className="flex items-center gap-2 mb-4 font-mono text-sm sm:text-base text-purple-400 dark:text-purple-400 light:text-purple-600">
              <span className="text-cyan-400">&gt;</span>
              <span>{developer.role}</span>
              <span className="animate-pulse">_</span>
            </div>

            {/* Short Introduction */}
            <p className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600 mb-8 max-w-2xl leading-relaxed">
              Hello world! I’m <strong className="text-cyan-400 font-semibold">{developer.name}</strong>, an aspiring software developer architecting responsive React interfaces, intelligent Python automation workflows, robust Linux environments, and exploring ethical cybersecurity.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-neon-cyan hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={handleDownloadResume}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 hover:shadow-neon-cyan hover:scale-[1.02] active:scale-[0.98]"
                title="Download Valathi's PDF Resume"
              >
                <Download className="w-4 h-4 text-cyan-400 animate-bounce" />
                <span>Download Resume</span>
              </button>

              <button
                onClick={onOpenResumeModal}
                className="text-xs text-slate-400 hover:text-cyan-400 underline underline-offset-4 transition-colors"
              >
                (Preview Resume)
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80 w-full">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Connect:</span>
              <div className="flex items-center gap-3">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Valathi GitHub Profile"
                  className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 hover:shadow-neon-cyan transition-all"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Valathi LinkedIn Profile"
                  className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 hover:shadow-neon-cyan transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Valathi Twitter Profile"
                  className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 hover:shadow-neon-cyan transition-all"
                >
                  <Twitter className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${developer.email}`}
                  aria-label="Send direct email to Valathi"
                  className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 hover:shadow-neon-cyan transition-all"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Holographic Cyber Element & Orbital Rings */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
              
              {/* Animated Orbital Ring 1 (Outer Slow Clockwise) */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30 animate-spin-slow pointer-events-none"></div>

              {/* Animated Orbital Ring 2 (Middle Counter-Clockwise) */}
              <div className="absolute inset-4 rounded-full border border-purple-500/40 animate-spin-reverse-slow pointer-events-none">
                {/* Node dot on ring */}
                <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-neon-cyan"></div>
                <div className="absolute -bottom-1.5 left-1/2 w-3 h-3 rounded-full bg-purple-400 shadow-neon-purple"></div>
              </div>

              {/* Animated Orbital Ring 3 (Inner Fast) */}
              <div className="absolute inset-10 rounded-full border border-emerald-400/30 animate-pulse pointer-events-none"></div>

              {/* Central Holographic Avatar Container */}
              <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-cyan-500/30 via-purple-600/20 to-emerald-400/30 backdrop-blur-md border border-cyan-400/40 shadow-neon-cyan flex items-center justify-center group">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#050814] flex items-center justify-center relative">
                  <img
                    src={developer.avatar}
                    alt={`${developer.name} Cybernetic Avatar`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle Scanline Overlay on Avatar */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-60 pointer-events-none"></div>
                </div>
              </div>

              {/* Floating Tech Badges (3D Perspective Float) */}
              
              {/* Badge 1: React (Top Right) */}
              <div className="absolute -top-4 -right-2 sm:right-2 p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-cyan-400 shadow-neon-cyan animate-float backdrop-blur-md flex items-center gap-2 z-20">
                <Atom className="w-5 h-5 text-cyan-400 animate-spin-slow" />
                <span className="text-xs font-mono font-bold">React.js</span>
              </div>

              {/* Badge 2: Python (Bottom Left) */}
              <div className="absolute -bottom-4 -left-2 sm:left-2 p-2.5 rounded-xl bg-slate-900/90 border border-purple-500/40 text-purple-400 shadow-neon-purple animate-float-delayed backdrop-blur-md flex items-center gap-2 z-20">
                <Terminal className="w-5 h-5 text-purple-400" />
                <span className="text-xs font-mono font-bold">Python</span>
              </div>

              {/* Badge 3: Linux (Top Left) */}
              <div className="absolute top-16 -left-6 sm:-left-4 p-2 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-emerald-400 shadow-neon-lime animate-float backdrop-blur-md flex items-center gap-1.5 z-20">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-semibold">Linux</span>
              </div>

              {/* Badge 4: Security (Bottom Right) */}
              <div className="absolute bottom-12 -right-6 sm:-right-4 p-2 rounded-xl bg-slate-900/90 border border-sky-500/40 text-sky-400 shadow-neon-cyan animate-float-delayed backdrop-blur-md flex items-center gap-1.5 z-20">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono font-semibold">Ethical Cyber</span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
