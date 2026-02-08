import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/logo.png" alt="BTI Logo" className="footer-logo-image" />
            </Link>
            <p className="footer-tagline">A trusted strategic partner enabling organizations to make confident and impactful business.</p>
            <div className="footer-social">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/team">Our Team</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services#strategic-planning">Strategic Planning</Link></li>
              <li><Link to="/services#operational-excellence">Operational Excellence</Link></li>
              <li><Link to="/services#human-capital">Human Capital</Link></li>
              <li><Link to="/services#digital-transformation">Digital Transformation</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <i className="fas fa-envelope"></i>
                <a href="mailto:contact@bti.co.id">contact@bti.co.id</a>
              </li>
              <li>
                <i className="fab fa-whatsapp"></i>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">+62 812 3456 7890</a>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Barakah Talenta Inspirasi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
