import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reveal-up',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 78%',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return ref;
}
