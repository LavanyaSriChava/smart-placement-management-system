import type {
  AchievementItem,
  ExperienceItem,
  FeaturedMetric,
  NavigationItem,
  ProjectItem,
  ResponsibilityItem,
  SkillGroup,
  SocialLink,
  StatItem,
  TimelineItem,
} from '../types/portfolio';

export const siteConfig = {
  name: 'CHAVA LAVANYA SRI',
  title: 'Full Stack Developer | Java & Spring Boot Developer | AI-Integrated Application Developer',
  tagline:
    'Building scalable full-stack applications, intelligent software systems, and impactful digital experiences.',
  email: 'lavanya.chava728@gmail.com',
  githubUsername: 'LavanyaSriChava',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://your-deployed-domain.com',
};

export const navigation: NavigationItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'featured', label: 'Featured' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
];

export const heroStats: StatItem[] = [
  { label: 'CGPA', value: '9.05' },
  { label: 'LeetCode Rating', value: '1635' },
  { label: 'DSA Problems Solved', value: '500+' },
  { label: 'JEE Main AIR', value: '21,125' },
];

export const recruiterHighlights = [
  'AI-integrated product builder with strong backend instincts',
  'Full-stack execution across authentication, analytics, workflows, and cloud integrations',
  'Comfortable owning systems from interface polish to scalable application logic',
];

export const timeline: TimelineItem[] = [
  {
    year: '2023',
    title: 'Started B.Tech in Computer Science and Engineering',
    subtitle: 'NIT Silchar',
    description:
      'Began building a strong academic and engineering foundation while exploring full-stack development, backend systems, and problem solving.',
  },
  {
    year: '2024',
    title: 'Deepened product engineering focus',
    subtitle: 'Full-stack + AI exploration',
    description:
      'Expanded from strong core CS skills into React.js, PostgreSQL-backed systems, scalable APIs, and intelligent product experiences.',
  },
  {
    year: '2025',
    title: 'Built recruiter-facing project portfolio',
    subtitle: 'Applied engineering in production-style builds',
    description:
      'Delivered end-to-end applications spanning resume workflows, role-based access, recommendation systems, analytics dashboards, and microservices patterns.',
  },
  {
    year: '2026',
    title: 'Full Stack Developer Intern',
    subtitle: 'Satyendra Nath Bose Summer Internship',
    description:
      'Built the Smart Placement Management System with secure authentication, cloud resume handling, predictive workflows, and placement-focused automation.',
  },
];

export const education = [
  {
    title: 'NIT Silchar',
    subtitle: 'B.Tech in Computer Science and Engineering',
    meta: 'CGPA 9.05 | 2023 - 2027',
  },
  {
    title: 'Sri Chaitanya Junior College',
    subtitle: 'MPC',
    meta: '97.9%',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    items: ['Java', 'C', 'C++', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    title: 'Frontend',
    items: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    items: ['Spring Boot', 'Spring Security', 'Spring MVC', 'Hibernate/JPA', 'REST APIs', 'Microservices'],
  },
  {
    title: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'Firebase'],
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'Maven', 'Docker', 'Postman', 'IntelliJ IDEA', 'VS Code', 'Railway', 'Vercel'],
  },
];

export const internship: ExperienceItem = {
  title: 'Full Stack Developer Intern',
  organization: 'Satyendra Nath Bose Summer Internship',
  summary:
    'Built the Smart Placement Management System as a full-stack experience centered on secure workflows, resume intelligence, predictive placement features, and recruiter-grade operations.',
  highlights: [
    'Implemented JWT authentication with role-based access for students and administrators.',
    'Integrated Cloudinary resume storage to streamline document handling workflows.',
    'Built placement workflows, notifications, resume analysis, and placement prediction capabilities.',
    'Delivered REST APIs and end-to-end product flows for real operational usage.',
  ],
};

export const featuredProject = {
  title: 'AI Product Finder',
  description:
    'A premium AI-powered product discovery experience that combines natural language search, recommendations, analytics, and secure user journeys into a polished recruiter-worthy showcase.',
  liveDemo: 'https://ai-product-finder-frontend.vercel.app/',
  metrics: [
    { label: 'Primary Experience', value: 'Featured Hero Project' },
    { label: 'AI Layer', value: 'OpenRouter integration' },
    { label: 'Search Mode', value: 'Natural language queries' },
  ] satisfies FeaturedMetric[],
  highlights: [
    'AI Product Recommendations',
    'Natural Language Search',
    'JWT Authentication',
    'Role-Based Access',
    'Wishlist Management',
    'Search History',
    'Analytics Dashboard',
    'OpenRouter AI Integration',
  ],
  links: [
    { label: 'Live Demo', url: 'https://ai-product-finder-frontend.vercel.app/' },
    { label: 'Frontend Repo', url: 'https://github.com/LavanyaSriChava/ai-product-finder-frontend' },
    { label: 'Backend Repo', url: 'https://github.com/LavanyaSriChava/ai-product-finder-Backend' },
  ],
  architecture: [
    'User Intent Capture',
    'Query Understanding',
    'Recommendation Engine',
    'Analytics Dashboard',
    'Secure Role-Based Experience',
  ],
};

export const projects: ProjectItem[] = [
  {
    title: 'Smart Placement Management System',
    description:
      'Placement operations platform designed around student journeys, admin workflows, resume intelligence, and predictive placement support.',
    features: [
      'Student Portal',
      'Admin Portal',
      'Resume Management',
      'Placement Tracking',
      'Cloudinary Integration',
      'Notifications',
      'Resume Analysis',
      'Placement Prediction',
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/LavanyaSriChava/smart-placement-management-system' }],
    accent: 'from-cyan-400/25 via-teal-400/15 to-transparent',
  },
  {
    title: 'Interview Preparation Tracker',
    description:
      'Preparation intelligence system for tracking company-focused interview practice, progress, and performance insights.',
    features: [
      'Authentication',
      'Question Tracking',
      'Company-wise Preparation',
      'Progress Analytics',
      'Difficulty Tracking',
      'Statistics Dashboard',
    ],
    links: [
      { label: 'Frontend Repo', url: 'https://github.com/LavanyaSriChava/interview-prep-tracker' },
      { label: 'Backend Repo', url: 'https://github.com/LavanyaSriChava/interview-prep-tracker-backend' },
    ],
    accent: 'from-emerald-400/25 via-lime-300/10 to-transparent',
  },
  {
    title: 'Student Course Enrollment Microservices Application',
    description:
      'Microservices-driven academic platform with service discovery, gateway routing, and enrollment-focused API design.',
    features: [
      'Microservices Architecture',
      'Eureka Service Discovery',
      'API Gateway',
      'Course Enrollment',
      'REST APIs',
      'Student Management',
    ],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/LavanyaSriChava/-Student-Course-Enrollment-Microservices-Application',
      },
    ],
    accent: 'from-sky-400/20 via-indigo-300/10 to-transparent',
  },
];

export const achievements: AchievementItem[] = [
  {
    value: 500,
    suffix: '+',
    label: 'DSA Problems Solved',
    description: 'Consistent problem-solving discipline reflected across interview preparation and algorithmic depth.',
  },
  {
    value: 1635,
    suffix: '',
    label: 'LeetCode Rating',
    description: 'Strong competitive problem-solving signal with sustained technical rigor.',
  },
  {
    value: 21125,
    suffix: '',
    label: 'JEE Main AIR',
    description: 'A national benchmark demonstrating resilience, discipline, and academic capability.',
  },
  {
    value: 9.05,
    suffix: '',
    label: 'Current CGPA',
    description: 'High academic consistency while building real-world product engineering experience.',
  },
];

export const responsibilities: ResponsibilityItem[] = [
  { title: 'Training and Placement Coordinator', organization: 'NIT Silchar' },
  { title: 'PR Team Member', organization: 'ADVAY Dramatics Club' },
  { title: 'Collaboration and Outreach Member', organization: 'E-Cell NIT Silchar' },
];

export const contactLinks: SocialLink[] = [
  {
    label: 'GitHub',
    value: '@LavanyaSriChava',
    url: 'https://github.com/LavanyaSriChava',
  },
  {
    label: 'LinkedIn',
    value: 'lavanya-sri-chava-6b57a02a9',
    url: 'https://www.linkedin.com/in/lavanya-sri-chava-6b57a02a9',
  },
  {
    label: 'LeetCode',
    value: 'lavanyasrichava',
    url: 'https://leetcode.com/u/lavanyasrichava',
  },
  {
    label: 'Resume',
    value: 'View PDF',
    url: 'https://drive.google.com/file/d/1eagByMVHN_couonh_aTock2LSub90t1l/view',
  },
  {
    label: 'Email',
    value: siteConfig.email,
    url: `mailto:${siteConfig.email}`,
  },
];

export const recruiterPrompts = [
  'Tell me about Lavanya.',
  'Explain AI Product Finder.',
  'Explain internship experience.',
  'Why should we hire her?',
  'Summarize skills.',
];

export const fallbackRepos = [
  {
    name: 'ai-product-finder-frontend',
    description: 'Frontend experience for AI Product Finder.',
    fork: false,
    forks_count: 0,
    homepage: featuredProject.liveDemo,
    html_url: 'https://github.com/LavanyaSriChava/ai-product-finder-frontend',
    language: 'TypeScript',
    pushed_at: new Date().toISOString(),
    stargazers_count: 0,
    topics: ['ai', 'frontend', 'portfolio-featured'],
  },
  {
    name: 'smart-placement-management-system',
    description: 'Placement workflow platform with resume intelligence and predictive features.',
    fork: false,
    forks_count: 0,
    homepage: null,
    html_url: 'https://github.com/LavanyaSriChava/smart-placement-management-system',
    language: 'Java',
    pushed_at: new Date().toISOString(),
    stargazers_count: 0,
    topics: ['spring-boot', 'react', 'placement'],
  },
  {
    name: 'interview-prep-tracker',
    description: 'Interview preparation tracker frontend.',
    fork: false,
    forks_count: 0,
    homepage: null,
    html_url: 'https://github.com/LavanyaSriChava/interview-prep-tracker',
    language: 'JavaScript',
    pushed_at: new Date().toISOString(),
    stargazers_count: 0,
    topics: ['interview', 'tracker'],
  },
];

export const assistantSystemPrompt = `
You are the AI Recruiter Assistant for ${siteConfig.name}.
Answer with concise, confident recruiter-ready language.
Only use the following portfolio facts.

Name: ${siteConfig.name}
Title: ${siteConfig.title}
Hero Tagline: ${siteConfig.tagline}

About:
Computer Science and Engineering undergraduate at NIT Silchar with strong interests in Full Stack Development, Java, Spring Boot, Backend Engineering, AI-powered applications, scalable systems, PostgreSQL, and React.js.

Education:
- NIT Silchar - B.Tech CSE, CGPA 9.05 (2023-2027)
- Sri Chaitanya Junior College - MPC, 97.9%

Skills:
- Languages: Java, C, C++, JavaScript, TypeScript, SQL
- Frontend: React.js, HTML5, CSS3, Tailwind CSS
- Backend: Spring Boot, Spring Security, Spring MVC, Hibernate/JPA, REST APIs, Microservices
- Databases: PostgreSQL, MySQL, Firebase
- Tools: Git, GitHub, Maven, Docker, Postman, IntelliJ IDEA, VS Code, Railway, Vercel

Experience:
- Satyendra Nath Bose Summer Internship - Full Stack Developer Intern.
- Built Smart Placement Management System with JWT Authentication, Role-Based Access, Cloudinary Resume Storage, Placement Workflows, Resume Analysis, Placement Prediction, Notifications, and REST APIs.

Featured Project:
- AI Product Finder
- Live Demo: ${featuredProject.liveDemo}
- Features: ${featuredProject.highlights.join(', ')}

Other Projects:
- Smart Placement Management System
- Interview Preparation Tracker
- Student Course Enrollment Microservices Application

Achievements:
- 500+ DSA Problems Solved
- LeetCode Rating 1635
- AIR 21,125 in JEE Main
- CGPA 9.05

Responsibilities:
- Training and Placement Coordinator - NIT Silchar
- PR Team Member - ADVAY Dramatics Club
- Collaboration and Outreach Member - E-Cell NIT Silchar

If asked why hire her, emphasize scalable full-stack execution, backend strength, AI-integrated thinking, academic excellence, and polished product delivery.
`;
