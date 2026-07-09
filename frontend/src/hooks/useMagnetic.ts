import { useCallback, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export function useMagnetic() {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!ref.current || prefersReducedMotion) {
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      ref.current.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    },
    [prefersReducedMotion]
  );

  const onPointerLeave = useCallback(() => {
    if (!ref.current) {
      return;
    }

    ref.current.style.transform = 'translate(0px, 0px)';
  }, []);

  return {
    ref,
    onPointerMove,
    onPointerLeave,
  };
}
