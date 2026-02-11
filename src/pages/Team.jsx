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
          {/* Founder 1 - Banto Twiseno */}
          <div className="founder-card" data-aos="fade-up">
            <div className="founder-grid">
              <div className="founder-image">
                <div className="founder-photo">
                  <img src="/team-banto.jpg" alt="Banto Twiseno" />
                </div>
                <div className="founder-social">
                  <a href="https://www.linkedin.com/in/banto-twiseno-ba5b4041/" target="_blank" rel="noopener noreferrer" className="linkedin-btn" aria-label="LinkedIn Profile">
                    <i className="fab fa-linkedin"></i>
                    <span>View LinkedIn Profile</span>
                  </a>
                </div>
              </div>
              <div className="founder-content">
                <div className="founder-header">
                  <h2>Banto Twiseno</h2>
                  <span className="founder-role">Insight Expert</span>
                </div>
                <div className="founder-bio">
                  <p>A market research and insight expert with 25 years of experience in Unilever. He has proven milestones in transforming insights into actions across multiple countries and categories, from innovation and communication to shopper and Muslim insights. He is a seasoned partner for senior leadership in making business decisions to build brands, products, and services.</p>
                </div>
                <div className="founder-expertise">
                  <h4>Areas of Expertise</h4>
                  <div className="expertise-tags">
                    <span className="tag">Market Research</span>
                    <span className="tag">Consumer Insights</span>
                    <span className="tag">Brand Strategy</span>
                    <span className="tag">Facilitation & Mentoring</span>
                  </div>
                </div>
                <div className="founder-credentials">
                  <div className="credential-item">
                    <i className="fas fa-lightbulb"></i>
                    <span>Insight Specialist</span>
                  </div>
                  <div className="credential-item">
                    <i className="fas fa-briefcase"></i>
                    <span>25+ Years Experience</span>
                  </div>
                  <div className="credential-item">
                    <i className="fas fa-building"></i>
                    <span>Former Unilever Executive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Founder 2 - Tutus Widayanti */}
          <div className="founder-card" data-aos="fade-up">
            <div className="founder-grid">
              <div className="founder-image">
                <div className="founder-photo">
                  <img src="/team-tutus.jpg" alt="Tutus Widayanti" />
                </div>
                <div className="founder-social">
                  <a href="https://www.linkedin.com/in/tutus-widayanti/" target="_blank" rel="noopener noreferrer" className="linkedin-btn" aria-label="LinkedIn Profile">
                    <i className="fab fa-linkedin"></i>
                    <span>View LinkedIn Profile</span>
                  </a>
                </div>
              </div>
              <div className="founder-content">
                <div className="founder-header">
                  <h2>Tutus Widayanti</h2>
                  <span className="founder-role">Corporate Transformation & Change Management</span>
                </div>
                <div className="founder-bio">
                  <p>A cross-functional professional with more than 25 years of experience in multinational corporations and consulting. Her background spans marketing, sales, customer operations, HR, and transformation at organizations such as HM Sampoerna, Unilever, Prudential, and SHL Indonesia. She specializes in bridging strategic direction with shifts in ways of working and culture to ensure practical and sustainable transformation.</p>
                </div>
                <div className="founder-expertise">
                  <h4>Areas of Expertise</h4>
                  <div className="expertise-tags">
                    <span className="tag">Corporate Transformation</span>
                    <span className="tag">Change Management</span>
                    <span className="tag">Culture Innovation</span>
                    <span className="tag">Strategic Leadership</span>
                  </div>
                </div>
                <div className="founder-credentials">
                  <div className="credential-item">
                    <i className="fas fa-sync-alt"></i>
                    <span>Transformation Expert</span>
                  </div>
                  <div className="credential-item">
                    <i className="fas fa-briefcase"></i>
                    <span>25+ Years Experience</span>
                  </div>
                  <div className="credential-item">
                    <i className="fas fa-industry"></i>
                    <span>Multi-Industry Background</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Founder 3 - Putri Novelia */}
          <div className="founder-card" data-aos="fade-up">
            <div className="founder-grid">
              <div className="founder-image">
                <div className="founder-photo">
                  <img src="/team-putri.jpg" alt="Putri Novelia" />
                </div>
                <div className="founder-social">
                  <a href="https://www.linkedin.com/in/putri-novelia/" target="_blank" rel="noopener noreferrer" className="linkedin-btn" aria-label="LinkedIn Profile">
                    <i className="fab fa-linkedin"></i>
                    <span>View LinkedIn Profile</span>
                  </a>
                </div>
              </div>
              <div className="founder-content">
                <div className="founder-header">
                  <h2>Putri Novelia</h2>
                  <span className="founder-role">Organizational & People Advisor</span>
                </div>
                <div className="founder-bio">
                  <p>An organization development and talent advisory professional with over 10 years of experience in people strategy and capability building. She works closely with organizations to translate business strategy into practical talent solutions, combining data-driven insights with structured frameworks. Her expertise includes designing competency frameworks, leadership programs, and advisory interventions to strengthen organizational readiness.</p>
                </div>
                <div className="founder-expertise">
                  <h4>Areas of Expertise</h4>
                  <div className="expertise-tags">
                    <span className="tag">People Strategy</span>
                    <span className="tag">Organization Development</span>
                    <span className="tag">Talent Management</span>
                    <span className="tag">Leadership Development</span>
                  </div>
                </div>
                <div className="founder-credentials">
                  <div className="credential-item">
                    <i className="fas fa-users-cog"></i>
                    <span>People & Org Advisor</span>
                  </div>
                  <div className="credential-item">
                    <i className="fas fa-briefcase"></i>
                    <span>10+ Years Experience</span>
                  </div>
                  <div className="credential-item">
                    <i className="fas fa-user-graduate"></i>
                    <span>Talent Solution Specialist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="team-values section-padding bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Us</span>
            <h2 className="section-title">Why Choose BTI?</h2>
            <p className="section-subtitle">We don&apos;t rely on assumptions, we work with evidence to enable better decisions through clarity, alignment, and data-driven insight.</p>
          </div>
          <div className="why-choose-grid">
            <div className="why-choose-card" data-aos="fade-up">
              <div className="why-choose-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Strategic Partner</h3>
              <p>Strategic partner in shaping and executing business direction</p>
            </div>
            <div className="why-choose-card" data-aos="fade-up" data-aos-delay="100">
              <div className="why-choose-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Actionable Insights</h3>
              <p>Translating insight into clear, decision-ready actions</p>
            </div>
            <div className="why-choose-card" data-aos="fade-up" data-aos-delay="200">
              <div className="why-choose-icon">
                <i className="fas fa-sync-alt"></i>
              </div>
              <h3>Transformation Enablement</h3>
              <p>Enabling transformation through people, culture, and ways of working</p>
            </div>
            <div className="why-choose-card" data-aos="fade-up" data-aos-delay="300">
              <div className="why-choose-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Talent Development</h3>
              <p>Building talent and leadership capability for sustainable execution</p>
            </div>
            <div className="why-choose-card" data-aos="fade-up" data-aos-delay="400">
              <div className="why-choose-icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3>Trusted Facilitator</h3>
              <p>A trusted, neutral facilitator for high-stakes strategic decisions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content" data-aos="zoom-in">
            <h2>Connect with Our Experts</h2>
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
