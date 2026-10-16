/**
 * GitHub Integration Service
 * Uses GitHub REST API v3 to dynamically retrieve public repositories.
 * Includes caching, rate-limit detection, and graceful fallbacks.
 */

import { PORTFOLIO_CONFIG } from '../config/portfolio.js';

const CACHE_KEY = 'valathi_github_repos_cache';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache

export async function fetchGitHubRepos(forceRefresh = false) {
  const username = PORTFOLIO_CONFIG.github.username?.trim();

  // If no username configured or default empty
  if (!username) {
    return {
      success: false,
      error: 'NO_USERNAME',
      message: 'GitHub username is not configured yet in src/config/portfolio.js.',
      repos: [],
    };
  }

  // Check cache first if not force refreshed
  if (!forceRefresh) {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          return {
            success: true,
            isCached: true,
            repos: parsed.data,
            rateLimitRemaining: parsed.rateLimitRemaining,
          };
        }
      }
    } catch {
      // Ignore cache storage errors
    }
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=12&type=public`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');

    if (response.status === 404) {
      return {
        success: false,
        error: 'USER_NOT_FOUND',
        message: `GitHub user "${username}" was not found. Please verify the username in src/config/portfolio.js.`,
        repos: [],
      };
    }

    if (response.status === 403) {
      return {
        success: false,
        error: 'RATE_LIMITED',
        message: 'GitHub API rate limit exceeded (60 requests/hr for unauthenticated users). Please wait a few minutes or retry later.',
        repos: [],
      };
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Filter out forks if preferred, or take top updated public repos
    const formattedRepos = data
      .filter((repo) => !repo.fork)
      .slice(0, PORTFOLIO_CONFIG.github.maxRepos || 6)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || 'Futuristic repository module. No description provided yet.',
        htmlUrl: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || 'Code',
        updatedAt: repo.updated_at,
        topics: repo.topics || [],
      }));

    // Cache the successful result
    try {
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          data: formattedRepos,
          rateLimitRemaining,
        })
      );
    } catch {
      // Storage full or private mode
    }

    return {
      success: true,
      isCached: false,
      repos: formattedRepos,
      rateLimitRemaining,
    };
  } catch (err) {
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: err.message || 'Unable to establish link with GitHub API server.',
      repos: [],
    };
  }
}
