# Chava Lavanya Sri Recruiter Portfolio

Premium recruiter-focused portfolio built with React, TypeScript, Tailwind CSS, Framer Motion, GSAP, and Vite.

## Stack

- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- GSAP
- Vite

## Features

- Dark luxury design language with glassmorphism, aurora backgrounds, animated gradients, custom cursor, magnetic buttons, and scroll progress
- Recruiter-first storytelling across hero, timeline, internship impact, leadership, achievements, and contact sections
- AI Product Finder as the primary featured project with premium project storytelling and architecture placeholder diagram
- Floating AI Recruiter Assistant with OpenRouter or Gemini support and local fallback intelligence
- Live GitHub profile and repository integration with repository cards, contribution chart, and language insights
- SEO metadata, structured data, sitemap, robots, accessibility support, and responsive layouts

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Create `.env` from `.env.example`.

```bash
VITE_SITE_URL=https://your-deployed-domain.com
VITE_OPENROUTER_API_KEY=
VITE_OPENROUTER_MODEL=meta-llama/llama-3.3-70b-instruct
VITE_GEMINI_API_KEY=
VITE_GEMINI_MODEL=gemini-1.5-flash
```

## Production Build

```bash
npm run build
npm run preview
```

## Deployment

### Vercel

1. Import the `frontend` directory as a Vite project.
2. Add the environment variables from `.env.example`.
3. Use `npm run build` as the build command.
4. Set `dist` as the output directory.
5. Update `VITE_SITE_URL`, `public/robots.txt`, and `public/sitemap.xml` to the final production domain before the last deploy.

### Netlify

1. Publish the `frontend` directory.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add the same environment variables before deploying.

## Folder Structure

```text
frontend/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
