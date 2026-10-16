import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolio';

export default function HackerTerminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const { developer, skills, projects, socials, resume, terminal } = PORTFOLIO_CONFIG;

  // Initialize terminal welcome message on mount
  useEffect(() => {
    if (isOpen) {
      if (history.length === 0) {
        setHistory([
          { type: 'system', text: terminal.welcomeMessage.join('\n') },
          { type: 'system', text: "Type 'help' to view all system commands, or click the quick action chips below." }
        ]);
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Listen for ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Command Execution Engine
  const executeCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    // Add to command history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newEntries = [{ type: 'command', text: `${terminal.hostname}:~$ ${trimmed}` }];

    switch (cmd) {
      case 'help':
        newEntries.push({
          type: 'output',
          text: 
`AVAILABLE COMMANDS IN VALATHI OS:
  help       - Display this command index
  about      - Telemetry and developer background
  skills     - Technical capabilities & proficiency matrix
  projects   - Featured architecture and code deployments
  contact    - Communication frequencies & direct coordinates
  github     - Display GitHub profile link
  resume     - Download Valathi's PDF developer resume
  theme      - Toggle between Cyber Dark and Clean Light theme
  status     - Report system integrity and telemetry
  whoami     - Display visitor identity status
  date       - Display current mission system timestamp
  matrix     - Toggle green matrix data-stream effect
  clear      - Clear terminal buffer
  exit       - Terminate terminal session (or press ESC)`
        });
        break;

      case 'about':
        newEntries.push({
          type: 'output',
          text:
`IDENTITY: ${developer.name}
ROLE: ${developer.role}
TAGLINE: "${developer.tagline}"
LOCATION: ${developer.location}
STATUS: ${developer.status}

NARRATIVE:
${developer.bio.join('\n\n')}`
        });
        break;

      case 'skills':
        const skillList = skills
          .map((s) => `  [${s.percentage}%] ${s.name.padEnd(28)} [${s.level}]`)
          .join('\n');
        newEntries.push({
          type: 'output',
          text: `TECHNICAL SKILL MATRIX:\n${skillList}\n\n* Note: Editable in src/config/portfolio.js`
        });
        break;

      case 'projects':
        const projectList = projects
          .map((p, idx) => `  [${idx + 1}] ${p.title}\n      Stack: ${p.techStack.join(', ')}\n      Link:  ${p.demoUrl}`)
          .join('\n\n');
        newEntries.push({
          type: 'output',
          text: `DEPLOYED INITIATIVES:\n\n${projectList}`
        });
        break;

      case 'contact':
        newEntries.push({
          type: 'output',
          text:
`DIRECT FREQUENCIES:
  Email:    ${developer.email}
  GitHub:   ${socials.github}
  LinkedIn: ${socials.linkedin}
  Twitter:  ${socials.twitter}
  Response: Within 24 Earth hours`
        });
        break;

      case 'github':
        newEntries.push({
          type: 'output',
          text: `Navigating to GitHub repository: ${socials.github}`
        });
        window.open(socials.github, '_blank', 'noopener,noreferrer');
        break;

      case 'resume':
        newEntries.push({
          type: 'output',
          text: `Initiating download of: ${resume.filename}...`
        });
        const link = document.createElement('a');
        link.href = resume.downloadPath;
        link.download = resume.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;

      case 'theme':
        const currentTheme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('valathi-theme', nextTheme);
        document.documentElement.classList.toggle('dark', nextTheme === 'dark');
        document.documentElement.classList.toggle('light', nextTheme === 'light');
        newEntries.push({
          type: 'output',
          text: `Visual theme switched to: ${nextTheme.toUpperCase()} MODE.`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        return;

      case 'matrix':
        setIsMatrixActive((prev) => !prev);
        newEntries.push({
          type: 'output',
          text: `Matrix cyber data-stream ${!isMatrixActive ? 'ACTIVATED' : 'DEACTIVATED'}.`
        });
        break;

      case 'whoami':
        newEntries.push({
          type: 'output',
          text: `visitor@valathi-cyber-core // Access Level: GUEST (Authorized)`
        });
        break;

      case 'date':
        newEntries.push({
          type: 'output',
          text: `CURRENT SYSTEM TIME: ${new Date().toUTCString()} (Local: ${new Date().toString()})`
        });
        break;

      case 'status':
        newEntries.push({
          type: 'output',
          text: `[SYSTEM STATUS] ALL CORES OPERATIONAL // LATENCY: 22ms // SHIELDS: 100% // NO ANOMALIES`
        });
        break;

      case 'sudo':
        newEntries.push({
          type: 'output',
          text: `[PERMISSION GRANTED] Nice try, root operator! You already possess full portfolio browsing clearance.`
        });
        break;

      default:
        newEntries.push({
          type: 'error',
          text: `zsh: command not found: "${trimmed}". Type 'help' to inspect authorized commands.`
        });
        break;
    }

    setHistory((prev) => [...prev, ...newEntries]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      
      {/* Terminal Window Container */}
      <div
        className={`w-full bg-[#050814] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col scanlines transition-all duration-300 ${
          isMaximized ? 'h-[95vh]' : 'h-[600px] max-w-4xl'
        }`}
      >
        
        {/* Terminal Title Bar */}
        <div className="px-4 py-3 bg-[#0a1026] border-b border-cyan-500/30 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center"
              title="Close terminal (exit)"
            >
              <X className="w-2.5 h-2.5 text-black opacity-0 hover:opacity-100" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
              title="Toggle size"
            />
            <button
              onClick={() => setHistory([])}
              className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 transition-colors"
              title="Clear buffer"
            />
            <span className="ml-3 font-mono text-xs text-slate-300 font-bold flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              {terminal.hostname}:~
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
              SIMULATED SHELL
            </span>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded text-slate-400 hover:text-cyan-400"
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-red-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          onClick={() => inputRef.current?.focus()}
          className={`flex-1 p-4 font-mono text-xs sm:text-sm overflow-y-auto space-y-2 select-text ${
            isMatrixActive ? 'text-emerald-400' : 'text-slate-200'
          }`}
        >
          {history.map((item, idx) => (
            <div key={idx} className="leading-relaxed">
              {item.type === 'command' && (
                <div className="text-cyan-400 font-bold">{item.text}</div>
              )}
              {item.type === 'system' && (
                <div className="text-emerald-400 whitespace-pre-wrap">{item.text}</div>
              )}
              {item.type === 'output' && (
                <div className="text-slate-300 whitespace-pre-wrap">{item.text}</div>
              )}
              {item.type === 'error' && (
                <div className="text-red-400 whitespace-pre-wrap">{item.text}</div>
              )}
            </div>
          ))}

          {/* Prompt & Input Line */}
          <div className="flex items-center gap-2 pt-1 text-cyan-400">
            <span className="font-bold shrink-0">{terminal.hostname}:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-slate-100 outline-none font-mono text-xs sm:text-sm caret-cyan-400"
              autoFocus
              spellCheck="false"
            />
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Mobile Quick Action Chips */}
        <div className="p-2.5 bg-[#0a1026] border-t border-cyan-500/20 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Quick:
          </span>
          {['help', 'about', 'skills', 'projects', 'contact', 'resume', 'matrix', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 text-[11px] font-mono whitespace-nowrap active:scale-95 transition-transform"
            >
              {cmd}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}
