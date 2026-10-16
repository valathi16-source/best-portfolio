import React, { useState, useEffect } from 'react';
import { Terminal, Bot, Menu, X, Code2, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { PORTFOLIO_CONFIG } from '../config/portfolio';

export default function Navbar({ onOpenTerminal, onOpenChat }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'GitHub', href: '#github' },
    { label: 'Contact', href: '#contact' },
  ];

  // Detect scroll for dynamic background blur and active link tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'projects', 'github', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#050814]/90 dark:bg-[#050814]/90 light:bg-white/90 backdrop-blur-md border-b border-cyan-500/20 shadow-lg'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with Cyber Badge */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-neon-cyan">
              <div className="w-full h-full bg-[#050814] rounded-[10px] flex items-center justify-center">
                <span className="font-cyber font-black text-cyan-400 text-lg tracking-wider">V</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-cyber font-bold text-lg tracking-widest text-slate-100 group-hover:text-cyan-400 transition-colors">
                {PORTFOLIO_CONFIG.developer.name.toUpperCase()}
              </span>
              <span className="text-[10px] tracking-widest font-mono text-cyan-400/80 -mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                CYBER // DEV
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-cyan-400 dark:text-cyan-400 light:text-sky-600 bg-cyan-500/10 dark:bg-cyan-500/10 light:bg-sky-100/70 border border-cyan-500/30'
                      : 'text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-cyan-300 hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-[2px] bg-cyan-400 shadow-neon-cyan rounded-full"></span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Tools: Terminal, AI Bot, Theme, Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Hacker Terminal Trigger Button */}
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all duration-300 bg-slate-900/90 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 hover:border-emerald-400 hover:shadow-neon-lime focus:outline-none focus:ring-2 focus:ring-emerald-400"
              title="Launch Simulated Hacker Terminal (Press ~ or click)"
            >
              <Terminal className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden sm:inline">&gt;_ Terminal</span>
              <span className="hidden lg:inline text-[10px] px-1 py-0.2 bg-emerald-950/80 rounded border border-emerald-500/30 text-emerald-300">~</span>
            </button>

            {/* Nova AI Trigger Button */}
            <button
              onClick={onOpenChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all duration-300 bg-gradient-to-r from-cyan-950/80 to-purple-950/80 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 hover:shadow-neon-cyan focus:outline-none focus:ring-2 focus:ring-cyan-400"
              title="Activate Nova AI Assistant"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
              <span className="hidden sm:inline">Nova AI</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-300 hover:text-cyan-400 bg-slate-900/80 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050814]/98 dark:bg-[#050814]/98 light:bg-white/98 backdrop-blur-xl border-b border-cyan-500/30 px-6 py-6 transition-all duration-300 shadow-2xl">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-4 rounded-lg font-medium text-base transition-colors ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-cyan-400 bg-cyan-500/10 border-l-4 border-cyan-400'
                    : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/40'
                }`}
              >
                {item.label}
              </a>
            ))}

            <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="flex-1 py-2.5 px-3 rounded-lg text-xs font-mono font-semibold bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center gap-2"
              >
                <Terminal className="w-4 h-4" />
                Launch Terminal
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChat();
                }}
                className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4" />
                Nova Assistant
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
