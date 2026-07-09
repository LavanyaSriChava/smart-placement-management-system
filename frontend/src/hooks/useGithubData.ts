import { useEffect, useMemo, useState } from 'react';
import { fetchGithubData } from '../lib/github';
import type { GithubProfile, GithubRepo } from '../types/portfolio';

type GithubState = {
  loading: boolean;
  profile: GithubProfile | null;
  repos: GithubRepo[];
};

const initialState: GithubState = {
  loading: true,
  profile: null,
  repos: [],
};

export function useGithubData() {
  const [state, setState] = useState<GithubState>(initialState);

  useEffect(() => {
    let mounted = true;

    fetchGithubData().then((data) => {
      if (!mounted) {
        return;
      }

      setState({
        loading: false,
        profile: data.profile,
        repos: data.repos,
      });
    });

    return () => {
      mounted = false;
    };
  }, []);

  const repoSummary = useMemo(() => {
    const repos = state.repos.filter((repo) => !repo.fork);
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

    const languages = repos.reduce<Record<string, number>>((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    return {
      featuredRepos: repos.slice(0, 6),
      totalStars,
      totalForks,
      languages: Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5),
    };
  }, [state.repos]);

  return {
    ...state,
    ...repoSummary,
  };
}
