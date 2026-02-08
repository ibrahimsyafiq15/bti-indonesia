import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function Home() {
  useScrollAnimation();

  useEffect(() => {
    document.title = 'BTI - Barakah Talenta Inspirasi | Business Consultancy';
  }, []);

  const clients = [
    { name: 'Paragon Corp', abbr: 'PC' },
    { name: 'AIA Group', abbr: 'AIA' },
    { name: 'iWise Education', abbr: 'iWise' },
    { name: 'BRI', abbr: 'BRI' },
    { name: 'BTN Syariah', abbr: 'BTN' },
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
              <div key={index} className="client-card" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="client-logo">
                  <span className="client-abbr">{client.abbr}</span>
                </div>
                <span className="client-name">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="values section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Approach</span>
            <h2 className="section-title">Why Choose BTI?</h2>
            <p className="section-subtitle">We combine deep industry expertise with ethical business practices to deliver transformative results.</p>
          </div>
          <div className="values-grid">
            <div className="value-card" data-aos="fade-up">
              <div className="value-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Ethical Excellence</h3>
              <p>Barakah-driven approach ensuring every recommendation aligns with integrity and sustainable value creation.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="100">
              <div className="value-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>Dynamic Innovation</h3>
              <p>Cutting-edge strategies tailored for the modern corporate landscape, embracing digital transformation.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="200">
              <div className="value-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Expert Partnership</h3>
              <p>Direct access to seasoned consultants with proven track records in Fortune 500 environments.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="300">
              <div className="value-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Measurable Impact</h3>
              <p>Results-oriented methodology with clear KPIs and continuous performance tracking.</p>
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
            <span className="section-tag">Meet Our Team</span>
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

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content" data-aos="zoom-in">
            <h2>Let's work together.</h2>
            <p>Let's discuss how BTI can help you achieve sustainable growth and operational excellence.</p>
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
