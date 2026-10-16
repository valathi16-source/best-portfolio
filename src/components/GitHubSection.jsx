import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Star, 
  GitFork, 
  RefreshCw, 
  ExternalLink, 
  AlertCircle, 
  Clock, 
  Code2, 
  Sparkles,
  Info
} from 'lucide-react';
import { fetchGitHubRepos } from '../services/github';
import { PORTFOLIO_CONFIG } from '../config/portfolio';

export default function GitHubSection() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rateLimitRemaining, setRateLimitRemaining] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const username = PORTFOLIO_CONFIG.github.username;

  const loadRepos = async (force = false) => {
    setLoading(true);
    setError(null);

    const result = await fetchGitHubRepos(force);

    if (result.success) {
      setRepos(result.repos);
      setRateLimitRemaining(result.rateLimitRemaining);
      setLastRefreshed(new Date().toLocaleTimeString());
    } else {
      setError(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadRepos();
  }, []);

  return (
    <section id="github" className="py-24 relative overflow-hidden cyber-grid">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Github className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real-time GitHub Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-cyber font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
              Open Source <span className="text-emerald-400 text-glow-cyan">Activity</span>
            </h2>
            <p className="mt-2 text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm font-mono">
              Fetching live repositories for user: <span className="text-cyan-400 font-bold">@{username}</span>
            </p>
          </div>

          {/* Refresh & Controls */}
          <div className="flex items-center gap-3">
            {lastRefreshed && (
              <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                Synced: {lastRefreshed}
              </span>
            )}
            <button
              onClick={() => loadRepos(true)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-slate-900/90 text-emerald-400 border border-emerald-500/40 hover:border-emerald-400 hover:shadow-neon-lime transition-all disabled:opacity-50"
              title="Force reload public repositories from GitHub API"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync GitHub</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl border border-slate-800 animate-pulse space-y-4">
                <div className="h-5 bg-slate-800/80 rounded w-2/3"></div>
                <div className="h-4 bg-slate-800/60 rounded w-full"></div>
                <div className="h-4 bg-slate-800/60 rounded w-4/5"></div>
                <div className="flex gap-4 pt-4 border-t border-slate-800/80">
                  <div className="h-4 bg-slate-800/60 rounded w-16"></div>
                  <div className="h-4 bg-slate-800/60 rounded w-12"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-8 rounded-2xl glass-panel border border-amber-500/30 max-w-2xl mx-auto text-center">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <h3 className="font-cyber font-bold text-lg text-slate-100 dark:text-slate-100 light:text-slate-900 mb-2">
              GitHub Feed Status: {error.error}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 mb-6 font-mono">
              {error.message}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => loadRepos(true)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors"
              >
                Retry Connection
              </button>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-mono bg-slate-900 text-cyan-400 border border-cyan-500/40 hover:border-cyan-400"
              >
                Visit GitHub Directly
              </a>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && repos.length === 0 && (
          <div className="p-8 rounded-2xl glass-panel border border-cyan-500/30 max-w-xl mx-auto text-center">
            <Info className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
            <h3 className="font-cyber font-bold text-lg text-slate-100 dark:text-slate-100 light:text-slate-900 mb-2">
              No Public Repositories Found
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 mb-4 font-mono">
              Account @{username} has no public non-forked repositories yet, or is awaiting your first push!
            </p>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-cyan-500 text-slate-950 font-bold"
            >
              <span>Create Repository on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Live Repositories Grid */}
        {!loading && !error && repos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-6 rounded-2xl border border-emerald-500/20 hover:border-emerald-400 hover:shadow-neon-lime transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 relative"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-mono font-bold text-base text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-emerald-400 transition-colors truncate">
                      {repo.name}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0 transition-colors" />
                  </div>

                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                    {repo.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{repo.language}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 hover:text-amber-300">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-slate-400" />
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Rate limit info notice */}
        {rateLimitRemaining && (
          <div className="mt-8 text-center text-[11px] font-mono text-slate-500">
            GitHub REST API Rate Limit Status: {rateLimitRemaining} requests remaining in this hour
          </div>
        )}

      </div>

    </section>
  );
}
