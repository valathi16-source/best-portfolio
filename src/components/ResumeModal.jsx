import React from 'react';
import { X, Download, Printer, ExternalLink, FileText, CheckCircle2, GraduationCap, Award, BookOpen } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolio';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { developer, skills, projects, resume, socials } = PORTFOLIO_CONFIG;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resume.downloadPath;
    link.download = resume.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      
      <div className="relative w-full max-w-4xl bg-[#070b19] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Header Controls */}
        <div className="px-6 py-4 bg-[#0c1430] border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h2 className="font-cyber font-bold text-sm sm:text-base text-slate-100">
              VALATHI // RESUME DOCUMENT VIEWER
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 text-xs font-mono flex items-center gap-1.5 transition-all"
              title="Print resume"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 transition-all shadow-neon-cyan"
              title="Download PDF File"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-900 transition-colors"
              aria-label="Close resume preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notice on replacing resume */}
        <div className="bg-cyan-950/40 px-6 py-2 border-b border-cyan-500/20 text-[11px] font-mono text-cyan-300 flex items-center justify-between">
          <span>// To update with your real resume: Replace file at <code>public/resume/Valathi_Resume.pdf</code></span>
          <span className="hidden sm:inline text-slate-400">Format: Standard PDF 1.4</span>
        </div>

        {/* Scrollable Printable Document Content */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-8 font-sans text-slate-200 bg-[#050814]">
          
          {/* Document Header */}
          <div className="border-b border-cyan-500/30 pb-6">
            <h1 className="text-2xl sm:text-3xl font-cyber font-bold text-slate-100 text-glow-cyan">
              {developer.name}
            </h1>
            <p className="text-sm font-mono text-cyan-400 mt-1">
              {developer.role}
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono text-slate-400">
              <span>Email: {developer.email}</span>
              <span>Location: {developer.location}</span>
              <span>GitHub: {socials.github}</span>
              <span>LinkedIn: {socials.linkedin}</span>
            </div>
          </div>

          {/* Professional Profile */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Professional Profile
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Aspiring developer passionate about modern frontend engineering with React, system automation with Python, POSIX Linux workflows, and ethical cybersecurity fundamentals. Committed to writing clean, maintainable code and building high-performance digital tools.
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Core Technical Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-300 font-bold">Frontend:</span> React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Vite
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-purple-300 font-bold">Backend & Scripting:</span> Python, Node.js, Express, REST APIs, Bash Shell
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-emerald-300 font-bold">Systems & Tools:</span> Linux (Ubuntu/Debian), Git, GitHub, VS Code
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-sky-300 font-bold">Security & AI:</span> Ethical Cybersecurity Fundamentals, OWASP, Local AI
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Featured Projects
            </h3>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-slate-100 text-sm">{proj.title}</span>
                    <span className="text-[11px] font-mono text-cyan-400">{proj.techStack.join(' • ')}</span>
                  </div>
                  <p className="text-slate-400 mb-2">{proj.description}</p>
                  {proj.highlights && (
                    <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                      {proj.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                Education
              </h3>
              {resume.sections.education.map((edu, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-slate-100">{edu.degree}</div>
                  <div className="text-slate-400">{edu.institution} ({edu.period})</div>
                  <div className="text-[11px] text-slate-500">{edu.details}</div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                Certifications
              </h3>
              <div className="space-y-2">
                {resume.sections.certifications.map((cert, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-200">{cert.name}</span>
                      <span className="text-slate-400 block text-[11px]">{cert.issuer}</span>
                    </div>
                    <span className="text-xs font-mono text-cyan-400">{cert.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
