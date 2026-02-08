import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function Services() {
  useScrollAnimation();

  useEffect(() => {
    document.title = 'Our Services | BTI - Barakah Talenta Inspirasi';
  }, []);

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-bg">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
        </div>
        <div className="container">
          <div className="page-header-content">
            <span className="page-tag">What We Offer</span>
            <h1 className="page-title">Our Services</h1>
            <p className="page-subtitle">Comprehensive consultancy solutions designed to drive growth, efficiency, and sustainable success for your organization.</p>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="services-detail section-padding">
        <div className="container">
          {/* Service 1: Strategic Planning */}
          <div className="service-detail-item" id="strategic-planning">
            <div className="service-detail-grid">
              <div className="service-detail-content">
                <div className="service-number-large">01</div>
                <h2>Strategic Planning</h2>
                <p className="service-lead">Navigate complex business landscapes with data-driven strategies that align with your vision and market realities.</p>
                <div className="service-features">
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Market Analysis & Research</h4>
                      <p>In-depth industry research and competitive analysis to identify opportunities and threats.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Business Model Innovation</h4>
                      <p>Reimagine your value proposition and revenue streams for sustainable competitive advantage.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Growth Strategy Development</h4>
                      <p>Comprehensive roadmaps for market expansion, diversification, and scaling operations.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>M&A Advisory</h4>
                      <p>Strategic guidance for mergers, acquisitions, and partnership opportunities.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="service-detail-visual">
                <div className="service-icon-large">
                  <i className="fas fa-chess"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Service 2: Operational Excellence */}
          <div className="service-detail-item" id="operational-excellence">
            <div className="service-detail-grid reverse">
              <div className="service-detail-visual">
                <div className="service-icon-large secondary">
                  <i className="fas fa-cogs"></i>
                </div>
              </div>
              <div className="service-detail-content">
                <div className="service-number-large">02</div>
                <h2>Operational Excellence</h2>
                <p className="service-lead">Streamline your operations to achieve peak efficiency, reduce costs, and deliver superior value to your customers.</p>
                <div className="service-features">
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Process Optimization</h4>
                      <p>Identify bottlenecks and implement lean methodologies to enhance productivity.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Supply Chain Management</h4>
                      <p>End-to-end supply chain optimization for resilience and cost efficiency.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Quality Management Systems</h4>
                      <p>Implement ISO standards and continuous improvement frameworks.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Performance Management</h4>
                      <p>KPI frameworks and dashboards for real-time operational visibility.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service 3: Human Capital */}
          <div className="service-detail-item" id="human-capital">
            <div className="service-detail-grid">
              <div className="service-detail-content">
                <div className="service-number-large">03</div>
                <h2>Human Capital</h2>
                <p className="service-lead">Transform your organization through strategic talent management and organizational development initiatives.</p>
                <div className="service-features">
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Organizational Design</h4>
                      <p>Restructure your organization for agility, efficiency, and strategic alignment.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Talent Development</h4>
                      <p>Comprehensive training programs and leadership development initiatives.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Change Management</h4>
                      <p>Guide your workforce through transformational change with minimal disruption.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Performance & Compensation</h4>
                      <p>Design incentive structures that align employee goals with business objectives.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="service-detail-visual">
                <div className="service-icon-large">
                  <i className="fas fa-users-cog"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Service 4: Digital Transformation */}
          <div className="service-detail-item" id="digital-transformation">
            <div className="service-detail-grid reverse">
              <div className="service-detail-visual">
                <div className="service-icon-large secondary">
                  <i className="fas fa-digital-tachograph"></i>
                </div>
              </div>
              <div className="service-detail-content">
                <div className="service-number-large">04</div>
                <h2>Digital Transformation</h2>
                <p className="service-lead">Embrace the digital age with technology strategies that enhance customer experience and operational capabilities.</p>
                <div className="service-features">
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Digital Strategy</h4>
                      <p>Roadmaps for digital adoption aligned with business goals and market trends.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Technology Implementation</h4>
                      <p>ERP, CRM, and custom software implementation with change management support.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Data Analytics</h4>
                      <p>Transform data into actionable insights for informed decision-making.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Cybersecurity Advisory</h4>
                      <p>Protect your digital assets with comprehensive security frameworks.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section section-padding bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">How We Work</span>
            <h2 className="section-title">Our Engagement Process</h2>
            <p className="section-subtitle">A proven methodology that ensures consistent, high-quality delivery on every project.</p>
          </div>
          <div className="process-timeline">
            <div className="process-step" data-aos="fade-up">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Discovery</h3>
                <p>Deep dive into your business, challenges, and objectives through stakeholder interviews and data analysis.</p>
              </div>
            </div>
            <div className="process-step" data-aos="fade-up" data-aos-delay="100">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Strategy</h3>
                <p>Develop tailored recommendations and implementation roadmaps aligned with your goals.</p>
              </div>
            </div>
            <div className="process-step" data-aos="fade-up" data-aos-delay="200">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Implementation</h3>
                <p>Execute initiatives with hands-on support, training, and change management.</p>
              </div>
            </div>
            <div className="process-step" data-aos="fade-up" data-aos-delay="300">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Optimization</h3>
                <p>Monitor results, refine approaches, and ensure sustainable long-term success.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content" data-aos="zoom-in">
            <h2>Let's Discuss Your Project</h2>
            <p>Every successful transformation starts with a conversation. Reach out to explore how we can help.</p>
            <div className="cta-buttons">
              <a href="https://wa.me/6281234567890" className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
                Start a Conversation
              </a>
              <Link to="/contact" className="btn btn-outline-light btn-lg">
                View Contact Details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
