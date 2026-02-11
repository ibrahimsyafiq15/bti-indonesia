import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Notification from '../components/Notification';

function Contact() {
  useScrollAnimation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    document.title = 'Contact Us | BTI - Barakah Talenta Inspirasi';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'message'];
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setNotification({
        message: 'Thank you for your message! We will get back to you within 24 hours.',
        type: 'success'
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        service: '',
        message: ''
      });
    } else {
      setNotification({
        message: 'Please fill in all required fields.',
        type: 'error'
      });
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

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
            <span className="page-tag">Get in Touch</span>
            <h1 className="page-title">Contact Us</h1>
            <p className="page-subtitle">Ready to transform your business? Reach out and let's start the conversation.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section section-padding">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <div className="contact-card" data-aos="fade-up">
                <div className="contact-icon">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <h3>WhatsApp</h3>
                <p>Get quick responses for urgent inquiries and initial consultations.</p>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="contact-link">
                  +62 812 3456 7890
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
              <div className="contact-card" data-aos="fade-up" data-aos-delay="100">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <h3>Email</h3>
                <p>Send us detailed project requirements or proposals.</p>
                <a href="mailto:contact@bti-indonesia.com" className="contact-link">
                  contact@bti-indonesia.com
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
              <div className="contact-card" data-aos="fade-up" data-aos-delay="200">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h3>Office</h3>
                <p>Visit us for in-person consultations and meetings.</p>
                <span className="contact-text">
                  Jakarta, Indonesia<br />
                  <small>By appointment only</small>
                </span>
              </div>
              <div className="contact-card" data-aos="fade-up" data-aos-delay="300">
                <div className="contact-icon">
                  <i className="fab fa-linkedin"></i>
                </div>
                <h3>LinkedIn</h3>
                <p>Connect with our founders and follow our updates.</p>
                <a href="https://linkedin.com/company/bti" target="_blank" rel="noopener noreferrer" className="contact-link">
                  BTI Official Page
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper" data-aos="fade-left">
              <div className="form-card">
                <h2>Send Us a Message</h2>
                <p>Fill out the form below and we'll get back to you within 24 hours.</p>
                <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className={errors.firstName ? 'error' : ''}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className={errors.lastName ? 'error' : ''}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className={errors.email ? 'error' : ''}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company" 
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="service">Service Interest</label>
                    <select 
                      id="service" 
                      name="service" 
                      value={formData.service}
                      onChange={handleChange}
                    >
                      <option value="">Select a service</option>
                      <option value="strategic-planning">Strategic Planning</option>
                      <option value="operational-excellence">Operational Excellence</option>
                      <option value="human-capital">Human Capital</option>
                      <option value="digital-transformation">Digital Transformation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="5" 
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or inquiry..."
                      className={errors.message ? 'error' : ''}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg btn-full">
                    Send Message
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
                <div className="form-note">
                  <i className="fas fa-shield-alt"></i>
                  <span>Your information is secure and will never be shared with third parties.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section section-padding bg-light" style={{ paddingBottom: '60px' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">Common Questions</h2>
          </div>
          <div className="faq-grid">
            <div className="faq-item" data-aos="fade-up">
              <h3><i className="fas fa-question-circle"></i> What services does BTI offer?</h3>
              <p>We offer three core services: Meaningful Insight (market research & consumer insights), Strategic Advisory (business transformation & strategic planning), and Talent Capability (leadership development & talent management).</p>
            </div>
            <div className="faq-item" data-aos="fade-up" data-aos-delay="100">
              <h3><i className="fas fa-question-circle"></i> What industries do you specialize in?</h3>
              <p>We have extensive experience in FMCG, financial services, healthcare, technology, and retail. Our team brings 25+ years of experience from multinational corporations like Unilever, Prudential, and SHL Indonesia.</p>
            </div>
            <div className="faq-item" data-aos="fade-up" data-aos-delay="200">
              <h3><i className="fas fa-question-circle"></i> How does BTI approach client engagements?</h3>
              <p>We follow an evidence-based approach—collaborative, structured, and practical. We don't rely on assumptions; we work with data to enable better decisions through clarity, alignment, and insight.</p>
            </div>
            <div className="faq-item" data-aos="fade-up" data-aos-delay="300">
              <h3><i className="fas fa-question-circle"></i> Who are the experts at BTI?</h3>
              <p>Our team consists of seasoned professionals: Banto Twiseno (Insight Expert, 25 years at Unilever), Tutus Widayanti (Corporate Transformation & Change Management, 25+ years experience), and Putri Novelia (Organizational & People Advisor).</p>
            </div>
            <div className="faq-item" data-aos="fade-up" data-aos-delay="400">
              <h3><i className="fas fa-question-circle"></i> What is your typical response time?</h3>
              <p>We respond to inquiries within 24 hours. For project proposals, we typically provide a tailored approach within one week after understanding your specific needs and challenges.</p>
            </div>
            <div className="faq-item" data-aos="fade-up" data-aos-delay="500">
              <h3><i className="fas fa-question-circle"></i> How can I get started with BTI?</h3>
              <p>Simply reach out via WhatsApp, email, or our contact form. We'll schedule an initial consultation to understand your needs and discuss how we can help transform your business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notification */}
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={closeNotification}
        />
      )}
    </>
  );
}

export default Contact;
