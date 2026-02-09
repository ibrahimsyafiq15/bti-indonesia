import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <img src="/logo.png" alt="BTI Logo" className="logo-image" />
        </Link>
        <button 
          className="nav-toggle" 
          id="navToggle" 
          aria-label="Toggle navigation"
          onClick={toggleMobileMenu}
        >
          <span style={{ 
            transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' 
          }}></span>
          <span style={{ 
            opacity: isMobileMenuOpen ? '0' : '1' 
          }}></span>
          <span style={{ 
            transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' 
          }}></span>
        </button>
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`} id="navMenu">
          <li><Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeMobileMenu}>Home</Link></li>
          <li><Link to="/services" className={`nav-link ${isActive('/services')}`} onClick={closeMobileMenu}>Service</Link></li>
          <li><Link to="/team" className={`nav-link ${isActive('/team')}`} onClick={closeMobileMenu}>Our Team</Link></li>
          <li><Link to="/insight" className={`nav-link ${isActive('/insight')}`} onClick={closeMobileMenu}>Insight</Link></li>
          <li><Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={closeMobileMenu}>Contact</Link></li>
        </ul>
        <Link to="/contact" className="btn btn-primary nav-cta">Get in Touch</Link>
      </div>
    </nav>
  );
}

export default Navbar;
