import { fallbackRepos, siteConfig } from '../data/portfolio';
import type { GithubProfile, GithubRepo } from '../types/portfolio';

const CACHE_KEY = 'lavanya-github-cache-v1';
const CACHE_TTL = 1000 * 60 * 60;

type GithubCache = {
  profile: GithubProfile;
  repos: GithubRepo[];
  timestamp: number;
};

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchGithubData() {
  if (typeof window !== 'undefined') {
    const cached = window.sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as GithubCache;
      if (Date.now() - parsed.timestamp < CACHE_TTL) {
        return parsed;
      }
    }
  }

  try {
    const [profile, repos] = await Promise.all([
      fetchJson<GithubProfile>(`https://api.github.com/users/${siteConfig.githubUsername}`),
      fetchJson<GithubRepo[]>(`https://api.github.com/users/${siteConfig.githubUsername}/repos?per_page=100&sort=updated`),
    ]);

    const payload = {
      profile,
      repos,
      timestamp: Date.now(),
    };

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    }

    return payload;
  } catch {
    const fallbackProfile: GithubProfile = {
      avatar_url: '/profile-photo.png',
      bio: 'Full Stack Developer | Java & Spring Boot Developer | AI-Integrated Application Developer',
      blog: '',
      followers: 0,
      following: 0,
      html_url: `https://github.com/${siteConfig.githubUsername}`,
      location: 'India',
      name: siteConfig.name,
      public_repos: fallbackRepos.length,
    };

    return {
      profile: fallbackProfile,
      repos: fallbackRepos,
      timestamp: Date.now(),
    };
  }
}
