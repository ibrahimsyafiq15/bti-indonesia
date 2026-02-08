import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const animateOnScroll = () => {
      animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // Trigger animation when element is 20% visible
        if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
          element.classList.add('aos-animate');
        }
      });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          animateOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
