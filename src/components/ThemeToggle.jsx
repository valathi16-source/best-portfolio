import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('valathi-theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'dark'; // Default to cyberpunk dark
      setTheme(initialTheme);
      document.documentElement.classList.toggle('dark', initialTheme === 'dark');
      document.documentElement.classList.toggle('light', initialTheme === 'light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('valathi-theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.classList.toggle('light', nextTheme === 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`relative p-2 rounded-xl transition-all duration-300 border ${
        theme === 'dark'
          ? 'bg-slate-900/80 border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:shadow-neon-cyan'
          : 'bg-white/90 border-sky-300 text-sky-600 hover:border-sky-500 hover:shadow-md'
      } ${className}`}
      title={`Toggle theme (Current: ${theme})`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 animate-pulse text-cyan-300" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600" />
        )}
      </div>
    </button>
  );
}
