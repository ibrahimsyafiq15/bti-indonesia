import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function Services() {
  useScrollAnimation();

  useEffect(() => {
    document.title = 'Our Service | BTI - Barakah Talenta Inspirasi';
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
            <h1 className="page-title">Our Service</h1>
            <p className="page-subtitle">Comprehensive consultancy solutions designed to drive growth, efficiency, and sustainable success for your organization.</p>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="services-detail section-padding">
        <div className="container">
          {/* Service 1: Meaningful Insight */}
          <div className="service-detail-item" id="meaningful-insight">
            <div className="service-detail-grid">
              <div className="service-detail-content">
                <div className="service-number-large">01</div>
                <h2>Meaningful Insight</h2>
                <p className="service-lead">Navigate complex business landscapes with decision-ready insights that sharpen priorities and accelerate high-quality business decisions.</p>
                <div className="service-features">
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Trend-watching and Snapshots</h4>
                      <p>In-depth analysis of emerging trends and market snapshots to identify immediate opportunities.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Muslim Market and Consumer Landscape</h4>
                      <p>Comprehensive research into the unique dynamics and behaviors of the Muslim consumer segment.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Market, Category and Consumer Studies</h4>
                      <p>Detailed industry and competitive analysis to understand specific market categories and consumer needs.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="service-detail-visual">
                <div className="service-icon-large">
                  <i className="fas fa-lightbulb"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Service 2: Strategic Advisory */}
          <div className="service-detail-item" id="strategic-advisory">
            <div className="service-detail-grid reverse">
              <div className="service-detail-visual">
                <div className="service-icon-large secondary">
                  <i className="fas fa-compass"></i>
                </div>
              </div>
              <div className="service-detail-content">
                <div className="service-number-large">02</div>
                <h2>Strategic Advisory</h2>
                <p className="service-lead">Design a clear strategy and structured narrative to drive alignment, strengthen decision quality, and ensure execution readiness.</p>
                <div className="service-features">
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Brand Strategy</h4>
                      <p>Strategic guidance for brand innovation, effective communication, and impactful activation.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Commercial and Channel Strategy</h4>
                      <p>Development of robust roadmaps for market expansion and optimized distribution channels.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Business Transformation</h4>
                      <p>Reimagining organizational structures, systems, and people to achieve sustainable competitive advantage.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service 3: Talent Capability */}
          <div className="service-detail-item" id="talent-capability">
            <div className="service-detail-grid">
              <div className="service-detail-content">
                <div className="service-number-large">03</div>
                <h2>Talent Capability</h2>
                <p className="service-lead">Built talent capability and leadership readiness to ensure consistent, sustainable strategy execution and growth.</p>
                <div className="service-features">
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Professional Training Programs</h4>
                      <p>Insight-driven training designed to elevate both individual professionals and the broader organization.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Leadership Development</h4>
                      <p>Comprehensive programs focused on scaling leadership skills for future-ready operations.</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Coaching and Mentoring</h4>
                      <p>Personalized guidance and partnership opportunities to strengthen internal leadership pipelines.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="service-detail-visual">
                <div className="service-icon-large">
                  <i className="fas fa-user-tie"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Our Approach */}
      <section className="process-section section-padding bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">How We Work</span>
            <h2 className="section-title">Our Approach</h2>
            <p className="section-subtitle">A proven methodology that ensures consistent, high-quality delivery on every project.</p>
          </div>
          <div className="process-timeline">
            <div className="process-step" data-aos="fade-up">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Understand The Reality</h3>
                <p>Start by building a strong, objective understanding of the organization through data.</p>
              </div>
            </div>
            <div className="process-step" data-aos="fade-up" data-aos-delay="100">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Shape The Direction</h3>
                <p>Insights are transformed into strategic direction and clear choices.</p>
              </div>
            </div>
            <div className="process-step" data-aos="fade-up" data-aos-delay="200">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Enable Execution</h3>
                <p>Decisions only create value when they are executed through the right and capable talent.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content" data-aos="zoom-in">
            <h2>Let&apos;s Discuss Your Project</h2>
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
