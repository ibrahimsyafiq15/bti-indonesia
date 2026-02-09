import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function Home() {
  useScrollAnimation();

  useEffect(() => {
    document.title = 'BTI - Barakah Talenta Inspirasi | Business Consultancy';
  }, []);

  const clients = [
    { 
      name: 'Paragon Corp', 
      logo: 'https://www.nicepng.com/png/full/350-3503846_paragon-technology-and-innovation-pt-logo-pt-paragon.png' 
    },
    { 
      name: 'AIA Group', 
      logo: 'https://iconlogovector.com/uploads/images/2025/03/lg-67e1394c648f0-AIA-Group.webp' 
    },
    { 
      name: 'iWise Education', 
      logo: 'https://iwise.id/wp-content/uploads/2023/07/logoIwise-copy.png' 
    },
    { 
      name: 'BRI', 
      logo: 'https://assets.zonalogo.com/finance/bri.co.id/logo-dark-1769386439379.svg' 
    },
    { 
      name: 'BTN Syariah', 
      logo: 'https://api.eksis.co.id/internal/uploads/1762140744691797993.png' 
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title" data-aos="fade-up">
              Empowering Businesses with
              <span className="text-gradient"> Barakah Talenta Inspirasi</span>
            </h1>
            <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="100">
              A trusted strategic partner enabling organizations to make confident and impactful business decisions through the integrated power of INSIGHT, ADVISORY and TALENT - advancing the Indonesian Muslim consumer ecosystem.
            </p>
            <div className="hero-cta" data-aos="fade-up" data-aos-delay="200">
              <Link to="/services" className="btn btn-primary btn-lg">
                Explore Our Services
                <i className="fas fa-arrow-right"></i>
              </Link>
              <Link to="/team" className="btn btn-outline btn-lg">
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section - Our Value */}
      <section className="values section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Value</span>
            <h2 className="section-title">Evidence-Based Strategy</h2>
            <p className="section-subtitle">We don&apos;t rely on assumptions, we work with evidence. Our approach is collaborative, structured, and practical—connecting strategic thinking into actionable execution.</p>
          </div>
          <div className="values-grid">
            <div className="value-card" data-aos="fade-up">
              <div className="value-icon">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3>What we do and how we create value</h3>
              <p>Enabling better decisions through clarity, alignment, & data-driven insight.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="100">
              <div className="value-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3>How We Different</h3>
              <p>Our approach is collaborative, structured, and practical – connecting the strategic thinking into actionable execution.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="200">
              <div className="value-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>Our Aspirations</h3>
              <p>To provide the right insights, shape the right products, and prepare the right talents for the growth of Indonesia&apos;s Muslim consumer ecosystem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="services-preview section-padding bg-dark">
        <div className="container">
          <div className="section-header light">
            <span className="section-tag">What We Do</span>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">If the decision matters, make it with clarity, alignment, and evidence.</p>
          </div>
          <div className="services-grid">
            <div className="service-card" data-aos="fade-up">
              <div className="service-number">01</div>
              <div className="service-content">
                <i className="fas fa-lightbulb"></i>
                <h3>Meaningful Insight</h3>
                <p>Deep market research and data analytics that reveal opportunities within the Indonesian Muslim consumer ecosystem.</p>
                <Link to="/services" className="service-link">Learn more <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>
            <div className="service-card" data-aos="fade-up" data-aos-delay="100">
              <div className="service-number">02</div>
              <div className="service-content">
                <i className="fas fa-compass"></i>
                <h3>Strategic Advisory</h3>
                <p>Expert guidance to navigate complex business decisions with confidence and ethical alignment.</p>
                <Link to="/services" className="service-link">Learn more <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>
            <div className="service-card" data-aos="fade-up" data-aos-delay="200">
              <div className="service-number">03</div>
              <div className="service-content">
                <i className="fas fa-user-tie"></i>
                <h3>Talent Capability</h3>
                <p>Building high-performing teams and developing leadership capacity for sustainable growth.</p>
                <Link to="/services" className="service-link">Learn more <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <Link to="/services" className="btn btn-outline-light btn-lg">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Team Preview Section */}
      <section className="team-preview section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Team</span>
            <h2 className="section-title">Meet Our Experts</h2>
            <p className="section-subtitle">Visionary leaders committed to transforming businesses with integrity and innovation.</p>
          </div>
          <div className="team-grid-preview">
            <div className="team-card-preview" data-aos="fade-up">
              <div className="team-image">
                <div className="team-placeholder">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="team-info">
                <h3>Founder Name 1</h3>
                <p className="team-role">Chief Executive Officer</p>
                <div className="team-social">
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                </div>
              </div>
            </div>
            <div className="team-card-preview" data-aos="fade-up" data-aos-delay="100">
              <div className="team-image">
                <div className="team-placeholder">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="team-info">
                <h3>Founder Name 2</h3>
                <p className="team-role">Chief Strategy Officer</p>
                <div className="team-social">
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                </div>
              </div>
            </div>
            <div className="team-card-preview" data-aos="fade-up" data-aos-delay="200">
              <div className="team-image">
                <div className="team-placeholder">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="team-info">
                <h3>Founder Name 3</h3>
                <p className="team-role">Chief Operations Officer</p>
                <div className="team-social">
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <Link to="/team" className="btn btn-primary btn-lg">View Full Profiles</Link>
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="clients-section section-padding bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Trusted By</span>
            <h2 className="section-title">Our Clients</h2>
            <p className="section-subtitle">Leading organizations that have partnered with us to achieve their business goals.</p>
          </div>
          <div className="clients-grid" data-aos="fade-up">
            {clients.map((client, index) => (
              <div key={index} className="client-logo-item" data-aos="fade-up" data-aos-delay={index * 100}>
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="client-logo-img"
                  title={client.name}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content" data-aos="zoom-in">
            <h2>Let&apos;s work together.</h2>
            <p>Let&apos;s discuss how BTI can help you achieve sustainable growth and operational excellence.</p>
            <div className="cta-buttons">
              <a href="https://wa.me/6281234567890" className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
                Chat on WhatsApp
              </a>
              <a href="mailto:contact@bti.co.id" className="btn btn-outline-light btn-lg">
                <i className="fas fa-envelope"></i>
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
