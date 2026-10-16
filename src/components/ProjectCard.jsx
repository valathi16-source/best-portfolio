import React, { useRef, useState } from 'react';
import { ExternalLink, Github, Sparkles, Tag, CheckCircle2 } from 'lucide-react';

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // 3D Card Tilt on Mouse Move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Constrain tilt to max 12 degrees
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="glass-panel rounded-2xl border border-cyan-500/20 overflow-hidden flex flex-col justify-between group hover:border-cyan-400 hover:shadow-neon-cyan transition-shadow duration-300 bg-[#0a1026]/90 relative"
    >
      {/* Top Banner / Sample Marker */}
      <div className="relative overflow-hidden aspect-video bg-slate-950 flex items-center justify-center">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Scanline gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1026] via-transparent to-transparent opacity-80 pointer-events-none"></div>

        {/* Badge: Sample vs Flagship */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border ${
              project.isSample
                ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                : 'bg-cyan-950/80 border-cyan-400/50 text-cyan-300'
            }`}
          >
            {project.badge}
          </span>
        </div>

        {/* Metrics telemetry tag */}
        {project.metrics && (
          <div className="absolute bottom-2 left-3 right-3 z-10 text-[10px] font-mono text-cyan-400/90 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/20 truncate">
            {project.metrics}
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-cyber font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-cyan-400 transition-colors mb-1">
            {project.title}
          </h3>
          <p className="text-xs font-mono text-purple-400 dark:text-purple-400 light:text-purple-600 mb-3">
            {project.tagline}
          </p>
          <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Highlights */}
          {project.highlights && (
            <div className="space-y-1.5 mb-4">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-1.5 text-xs text-slate-400 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md bg-slate-900/90 text-cyan-300 border border-cyan-500/20 text-[11px] font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 hover:border-cyan-400 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live System</span>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 hover:border-slate-500 transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
