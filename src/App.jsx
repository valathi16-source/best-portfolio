import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHubSection from './components/GitHubSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import HackerTerminal from './components/HackerTerminal';
import NovaChatbot from './components/NovaChatbot';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Global keyboard shortcut: '~' or 'Ctrl+K' toggles the Hacker Terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      // If user presses '~' or '`' outside of an active input field, toggle terminal
      const activeTag = document.activeElement?.tagName.toLowerCase();
      const isInput = activeTag === 'input' || activeTag === 'textarea';

      if ((e.key === '`' || e.key === '~') && !isInput) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      } else if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 flex flex-col relative transition-colors duration-300">
      
      {/* Top Cyber Navigation Bar */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenChat={() => setChatOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenResumeModal={() => setResumeModalOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <GitHubSection />
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Hacker Terminal Simulated Overlay Modal */}
      <HackerTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Nova AI Chatbot & Voice Assistant */}
      <NovaChatbot
        isOpen={chatOpen}
        onToggle={() => setChatOpen((prev) => !prev)}
      />

      {/* Resume Document Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

    </div>
  );
}
