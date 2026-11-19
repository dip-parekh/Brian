import { useEffect, useState } from 'react';

const SECTION_IDS = ['home', 'about', 'work', 'services', 'contact'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

/**
 * Tracks which primary page section is currently in view for navbar highlighting.
 */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (let i = SECTION_IDS.length - 1; i >= 0; i -= 1) {
        const id = SECTION_IDS[i];
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPosition) {
          setActive(id);
          return;
        }
      }
      setActive('home');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return active;
}
