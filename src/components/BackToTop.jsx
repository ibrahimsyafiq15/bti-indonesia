import { useState, useEffect } from 'react';

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      className={`back-to-top ${isVisible ? 'visible' : ''}`} 
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
}

export default BackToTop;
