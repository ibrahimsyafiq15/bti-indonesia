import { Link } from 'react-router-dom';
import { useCompany } from '../contexts/CompanyContext';

function Footer() {
  const { company, loading } = useCompany();

  // Fallback data when API is not available
  const fallbackData = {
    name: 'BTI - Barakah Talenta Inspirasi',
    description: 'A trusted strategic partner enabling organizations to make confident and impactful business decisions.',
    address: {
      fullAddress: 'Jakarta, Indonesia'
    },
    contact: {
      email: 'contact@bti-indonesia.com',
      phone: '+62 812 3456 7890',
      whatsapp: '6281234567890'
    },
    socialMedia: {
      linkedin: 'https://linkedin.com/company/bti'
    },
    footerLogo: '/logo-footer.png'
  };

  const data = company || fallbackData;

  const { 
    name, 
    description, 
    address, 
    contact, 
    socialMedia, 
    footerLogo 
  } = data;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={footerLogo || '/logo-footer.png'} alt={name} className="footer-logo-image" />
            </Link>
            <p className="footer-tagline">{description}</p>
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
            <div className="footer-social" style={{ marginTop: '1.5rem' }}>
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
        </div>
        
        <div className="footer-bottom" style={{ position: 'relative' }}>
          <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
          {/* Secret CMS Access */}
          <Link 
            to="/cms/login" 
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              width: '6px',
              height: '6px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '50%',
              cursor: 'default'
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
