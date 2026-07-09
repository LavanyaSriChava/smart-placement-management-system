export type NavigationItem = {
  id: string;
  label: string;
};

export type LinkItem = {
  label: string;
  url: string;
};

export type SocialLink = LinkItem & {
  value: string;
};

export type StatItem = {
  label: string;
  value: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  subtitle: string;
  description: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ExperienceItem = {
  title: string;
  organization: string;
  summary: string;
  highlights: string[];
};

export type FeaturedMetric = {
  label: string;
  value: string;
};

export type ProjectItem = {
  title: string;
  description: string;
  features: string[];
  links: LinkItem[];
  accent: string;
};

export type AchievementItem = {
  value: number;
  suffix: string;
  label: string;
  description: string;
};

export type ResponsibilityItem = {
  title: string;
  organization: string;
};

export type GithubProfile = {
  avatar_url: string;
  bio: string | null;
  blog: string | null;
  followers: number;
  following: number;
  html_url: string;
  location: string | null;
  name: string | null;
  public_repos: number;
};

export type GithubRepo = {
  name: string;
  description: string | null;
  fork: boolean;
  forks_count: number;
  homepage: string | null;
  html_url: string;
  language: string | null;
  pushed_at: string;
  stargazers_count: number;
  topics: string[];
};

export type AssistantMessage = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
};
