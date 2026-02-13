import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { teamAPI } from '../services/api';

function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useScrollAnimation();

  useEffect(() => {
    document.title = 'Our Team | BTI - Barakah Talenta Inspirasi';
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      console.log('[Team] Loading team members...');
      const data = await teamAPI.getPublicTeam();
      console.log('[Team] Team members loaded:', data);
      setMembers(data);
    } catch (err) {
      console.error('[Team] Error loading team members:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#03D967' }}></i>
        <p>Loading team...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', color: '#c0392b' }}>
        <i className="fas fa-exclamation-circle" style={{ fontSize: '2rem', marginBottom: '16px' }}></i>
        <p>Error loading team: {error}</p>
      </div>
    );
  }

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
          {members.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <p>No team members found.</p>
            </div>
          ) : (
            members.map((member, index) => (
              <div key={member.id} className="founder-card" data-aos="fade-up">
                <div className={`founder-grid ${index % 2 === 1 ? 'reverse' : ''}`}>
                  <div className="founder-image">
                    <div className="founder-photo">
                      <img 
                        src={member.photo || '/team-placeholder.jpg'} 
                        alt={member.name}
                        onError={(e) => {
                          e.target.src = '/team-placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="founder-social">
                      {member.linkedin_profile && (
                        <a 
                          href={member.linkedin_profile} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="linkedin-btn" 
                          aria-label="LinkedIn Profile"
                        >
                          <i className="fab fa-linkedin"></i>
                          <span>View LinkedIn Profile</span>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="founder-content">
                    <div className="founder-header">
                      <h2>{member.name}</h2>
                      <span className="founder-role">{member.title}</span>
                    </div>
                    <div className="founder-bio">
                      <p>{member.profile_description}</p>
                    </div>
                    {member.expertise && member.expertise.length > 0 && (
                      <div className="founder-expertise">
                        <h4>Areas of Expertise</h4>
                        <div className="expertise-tags">
                          {member.expertise.map((exp, i) => (
                            <span key={i} className="tag">{exp}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {member.credentials && member.credentials.length > 0 && (
                      <div className="founder-credentials">
                        {member.credentials.map((cred, i) => (
                          <div key={i} className="credential-item">
                            <i className={cred.icon || 'fas fa-check'}></i>
                            <span>{cred.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default Team;
