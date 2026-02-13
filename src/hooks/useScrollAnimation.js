import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    const animateOnScroll = () => {
      // Query setiap kali scroll untuk mendapatkan elemen terbaru
      const animatedElements = document.querySelectorAll('[data-aos]:not(.aos-animate)');
      
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
    
    // Initial check dengan delay kecil untuk memastikan DOM sudah siap
    setTimeout(animateOnScroll, 100);
    
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
