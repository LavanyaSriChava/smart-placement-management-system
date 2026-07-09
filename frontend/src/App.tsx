import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { navigation, siteConfig } from './data/portfolio';
import { useActiveSection } from './hooks/useActiveSection';
import { ContactSection } from './components/sections/ContactSection';
import { AboutSection } from './components/sections/AboutSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { FeaturedProjectSection } from './components/sections/FeaturedProjectSection';
import { GithubSection } from './components/sections/GithubSection';
import { HeroSection } from './components/sections/HeroSection';
import { LeadershipSection } from './components/sections/LeadershipSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { RecruiterAssistant } from './components/sections/RecruiterAssistant';
import { SkillsSection } from './components/sections/SkillsSection';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { CustomCursor } from './components/ui/CustomCursor';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { ScrollProgress } from './components/ui/ScrollProgress';

function SeoMetadata() {
  useEffect(() => {
    document.title = `${siteConfig.name} | Recruiter Portfolio`;

    const description =
      'Premium recruiter portfolio for Chava Lavanya Sri featuring AI Product Finder, GitHub intelligence, internship impact, and a live AI recruiter assistant.';
    const siteUrl = siteConfig.siteUrl;

    const setMeta = (selector: string, attribute: 'name' | 'property', content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, selector.includes('property=') ? selector.split('"')[1] : selector.split('"')[1]);
        document.head.appendChild(element);
      }

      element.content = content;
    };

    setMeta('meta[name="description"]', 'name', description);
    setMeta('meta[property="og:title"]', 'property', `${siteConfig.name} | Full Stack Developer`);
    setMeta('meta[property="og:description"]', 'property', description);
    setMeta('meta[property="og:url"]', 'property', siteUrl);
    setMeta('meta[property="twitter:title"]', 'property', `${siteConfig.name} | Full Stack Developer`);
    setMeta('meta[property="twitter:description"]', 'property', description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = siteUrl;

    let script = document.getElementById('lavanya-structured-data');
    if (!script) {
      script = document.createElement('script');
      script.id = 'lavanya-structured-data';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: siteConfig.name,
      jobTitle: siteConfig.title,
      url: siteUrl,
      email: siteConfig.email,
      sameAs: [
        'https://github.com/LavanyaSriChava',
        'https://www.linkedin.com/in/lavanya-sri-chava-6b57a02a9',
        'https://leetcode.com/u/lavanyasrichava',
      ],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'NIT Silchar',
      },
    });
  }, []);

  return null;
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [loading, setLoading] = useState(!prefersReducedMotion);
  const sectionIds = useMemo(() => navigation.map((item) => item.id), []);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    if (prefersReducedMotion) {
      setLoading(false);
      return;
    }

    const timer = window.setTimeout(() => setLoading(false), 1400);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <>
      <SeoMetadata />
      <a
        href="#home"
        className="skip-link"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <CustomCursor />
      <LoadingScreen show={loading} />
      <div className="noise-overlay" aria-hidden="true" />

      <div className="relative min-h-screen overflow-x-clip bg-ink-950 text-slate-100">
        <div className="aurora-layer aurora-top" aria-hidden="true" />
        <div className="aurora-layer aurora-bottom" aria-hidden="true" />

        <Header
          activeSection={activeSection}
          onOpenAssistant={() => setAssistantOpen(true)}
        />

        <AnimatePresence mode="wait">
          {!loading && (
            <motion.main
              key="portfolio"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative z-10"
            >
              <HeroSection onOpenAssistant={() => setAssistantOpen(true)} />
              <AboutSection />
              <ExperienceSection />
              <FeaturedProjectSection />
              <ProjectsSection />
              <SkillsSection />
              <AchievementsSection />
              <LeadershipSection />
              <GithubSection />
              <ContactSection onOpenAssistant={() => setAssistantOpen(true)} />
              <Footer />
            </motion.main>
          )}
        </AnimatePresence>

        <RecruiterAssistant open={assistantOpen} onOpenChange={setAssistantOpen} />
      </div>
    </>
  );
}
