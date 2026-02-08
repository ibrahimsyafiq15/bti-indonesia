import { useEffect, useRef } from 'react';

export function useCounterAnimation() {
  const statsRef = useRef(null);

  useEffect(() => {
    const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
    
    if (!statNumbers || statNumbers.length === 0) return;

    const animateCounter = (element) => {
      const text = element.textContent;
      const numericValue = parseInt(text.replace(/\D/g, ''));
      const suffix = text.replace(/[0-9]/g, '');
      
      if (isNaN(numericValue)) return;
      
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          element.textContent = text;
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current) + suffix;
        }
      }, duration / steps);
    };

    // Trigger counter animation when stats are visible
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll('.stat-number');
          statNumbers.forEach(stat => animateCounter(stat));
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        statsObserver.disconnect();
      }
    };
  }, []);

  return statsRef;
}
