import { Link } from 'react-router-dom';
import { useCompany } from '../contexts/CompanyContext';

function Footer() {
  const { company, loading } = useCompany();

  if (loading || !company) {
    return (
      <footer className="footer" style={{ padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      </footer>
    );
  }

  const { 
    name, 
    description, 
    address, 
    contact, 
    socialMedia, 
    footerLogo 
  } = company;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={footerLogo || '/logo-footer.png'} alt={name} className="footer-logo-image" />
            </Link>
            <p className="footer-tagline">{description}</p>
            <div className="footer-social">
              {socialMedia?.linkedin && (
                <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
              {socialMedia?.instagram && (
                <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {socialMedia?.twitter && (
                <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {socialMedia?.youtube && (
                <a href={socialMedia.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
              )}
              {socialMedia?.tiktok && (
                <a href={socialMedia.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <i className="fab fa-tiktok"></i>
                </a>
              )}
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Service</Link></li>
              <li><Link to="/team">Our Team</Link></li>
              <li><Link to="/insight">Insight</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services#meaningful-insight">Meaningful Insight</Link></li>
              <li><Link to="/services#strategic-advisory">Strategic Advisory</Link></li>
              <li><Link to="/services#talent-capability">Talent Capability</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${contact?.email}`}>{contact?.email}</a>
              </li>
              <li>
                <i className="fab fa-whatsapp"></i>
                <a href={`https://wa.me/${contact?.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  {contact?.phone}
                </a>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>{address?.fullAddress}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
