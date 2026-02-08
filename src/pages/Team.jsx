import { useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function Team() {
  useScrollAnimation();

  useEffect(() => {
    document.title = 'Our Team | BTI - Barakah Talenta Inspirasi';
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
            <span className="page-tag">Our Team</span>
            <h1 className="page-title">Meet Our Experts</h1>
            <p className="page-subtitle">Visionary founders with decades of combined experience driving business transformation across industries.</p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="team-section section-padding">
        <div className="container">
          {/* Founder 1 */}
          <div className="founder-card" data-aos="fade-up">
            <div className="founder-grid">
              <div className="founder-image">
                <div className="founder-photo">
                  <div className="photo-placeholder">
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <div className="founder-social">
                  <a href="https://linkedin.com/in/founder1" target="_blank" rel="noopener noreferrer" className="linkedin-btn" aria-label="LinkedIn Profile">
                    <i className="fab fa-linkedin"></i>
                    <span>View LinkedIn Profile</span>
                  </a>
                </div>
              </div>
              <div className="founder-content">
                <div className="founder-header">
                  <h2>Founder Name 1</h2>
                  <span className="founder-role">Chief Executive Officer</span>
                </div>
                <div className="founder-bio">
                  <p>A seasoned executive with over 15 years of experience in management consulting and corporate leadership. Previously served as Partner at a top-tier global consulting firm, advising Fortune 500 companies on strategic transformation initiatives.</p>
                  <p>Holds an MBA from a prestigious international business school and is passionate about combining business excellence with ethical practices. Believes in creating sustainable value that benefits all stakeholders.</p>
                </div>
                <div className="founder-expertise">
                  <h4>Areas of Expertise</h4>
                  <div className="expertise-tags">
                    <span className="tag">Corporate Strategy</span>
                    <span className="tag">M&A Advisory</span>
                    <span className="tag">Business Transformation</span>
                    <span className="tag">Leadership Development</span>
                  </div>
                </div>
                <div className="founder-credentials">
                  <div className="credential-item">
                    <i className="fas fa-graduation-cap"></i>
                    <span>MBA, INSEAD</span>
                  </div>
                  <div className="credential-item">
                    <i className="fas fa-briefcase"></i>
                    <span>15+ Years Experience</span>
                  </div>
                  <div className="credential-item">
                    <i className="fas fa-award"></i>
                    <span>Former MBB Partner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Founder 2 */}
          <div className="founder-card" data-aos="fade-up">
            <div className="founder-grid">
              <div className="founder-image">
                <div className="founder-photo">
                  <div className="photo-placeholder">
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <div className="founder-social">
                  <a href="https://linkedin.com/in/founder2" target="_blank" rel="noopener noreferrer" className="linkedin-btn" aria-label="LinkedIn Profile">
                    <i className="fab fa-linkedin"></i>
                    <span>View LinkedIn Profile</span>
                  </a>
                </div>
              </div>
              <div className="founder-content">
                <div className="founder-header">
                  <h2>Founder Name 2</h2>
                  <span className="founder-role">Chief Strategy Officer</span>
                </div>
                <div className="founder-bio">
                  <p>An accomplished strategist with extensive experience in market analysis, competitive positioning, and growth strategy. Has led strategic planning for multiple unicorn startups and established corporations across Southeast Asia.</p>
                  <p>Expert in identifying market opportunities and developing innovative business models that drive sustainable competitive advantage. Known for combining analytical rigor with creative problem-solving.</p>
                </div>
                <div className="founder-expertise">
                  <h4>Areas of Expertise</h4>
                  <div className="expertise-tags">
                    <span className="tag">Growth Strategy</span>
                    <span className="tag">Market Entry</span>
                    <span className="tag">Competitive Analysis</span>
                    <span className="tag">Innovation Management</span>
                  </div>
                </div>
                <div className="founder-credentials">
                  <div className="credential-item">
                    <i className="fas fa-graduation-cap"></i>
                    <span>MBA, Harvard Business School</span>
                  </div>
                  <div className="credential-item">
                    <i className="fas fa-briefcase"></i>
                    <span>12+ Years Experience</span>
                  </div>
                  <div className="credential-item">
                    <i className="fas fa-award"></i>
                    <span>Ex-Bain & Company</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Founder 3 */}
          <div className="founder-card" data-aos="fade-up">
            <div className="founder-grid">
              <div className="founder-image">
                <div className="founder-photo">
                  <div className="photo-placeholder">
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <div className="founder-social">
                  <a href="https://linkedin.com/in/founder3" target="_blank" rel="noopener noreferrer" className="linkedin-btn" aria-label="LinkedIn Profile">
                    <i className="fab fa-linkedin"></i>
                    <span>View LinkedIn Profile</span>
                  </a>
                </div>
              </div>
              <div className="founder-content">
                <div className="founder-header">
                  <h2>Founder Name 3</h2>
                  <span className="founder-role">Chief Operations Officer</span>
                </div>
                <div className="founder-bio">
                  <p>A results-driven operations leader with a proven track record of transforming complex organizations. Has successfully led operational excellence initiatives for multinational corporations, delivering significant cost savings and efficiency gains.</p>
                  <p>Deep expertise in supply chain optimization, process improvement, and organizational restructuring. Committed to building high-performance cultures that drive operational excellence.</p>
                </div>
                <div className="founder-expertise">
                  <h4>Areas of Expertise</h4>
                  <div className="expertise-tags">
                    <span className="tag">Operational Excellence</span>
                    <span className="tag">Supply Chain</span>
                    <span className="tag">Process Optimization</span>
                    <span className="tag">Change Management</span>
                  </div>
                </div>
                <div className="founder-credentials">
                  <div className="credential-item">
                    <i className="fas fa-graduation-cap"></i>
                    <span>MS Engineering, MIT</span>
                  </div>
                  <div className="credential-item">
                    <i className="fas fa-briefcase"></i>
                    <span>14+ Years Experience</span>
                  </div>
                  <div className="credential-item">
                    <i className="fas fa-award"></i>
                    <span>Ex-McKinsey & Co.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="team-values section-padding bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Philosophy</span>
            <h2 className="section-title">Why We Started BTI</h2>
            <p className="section-subtitle">A shared vision to redefine consultancy with purpose-driven excellence.</p>
          </div>
          <div className="values-story">
            <div className="story-content">
              <p className="story-lead">BTI was born from a shared belief that business success and ethical practices are not mutually exclusive—they are fundamentally intertwined.</p>
              <p>Having witnessed the consulting industry from the inside, our founders recognized a gap: too many firms prioritized short-term gains over sustainable value creation. We set out to build a different kind of consultancy—one that embraces the principle of <strong>Barakah</strong> (blessing and prosperity through ethical conduct) in every engagement.</p>
              <p>Today, BTI combines the rigor and expertise of top-tier consulting with a commitment to integrity, transparency, and long-term partnership. We measure our success not just by deliverables, but by the lasting positive impact we create for our clients and their stakeholders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content" data-aos="zoom-in">
            <h2>Connect with Our Founders</h2>
            <p>Have a project in mind? Reach out directly to discuss how we can help transform your business.</p>
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

export default Team;
