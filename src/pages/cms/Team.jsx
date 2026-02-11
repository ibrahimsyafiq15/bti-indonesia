import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { teamAPI } from '../../services/api';
import SuccessModal from '../../components/SuccessModal';

function TeamCMS() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      console.log('[Team] Loading team members...');
      const data = await teamAPI.getTeam();
      console.log('[Team] Data received:', data);
      setMembers(data);
    } catch (error) {
      console.error('[Team] Error loading team members:', error);
      console.error('[Team] Error details:', error.message, error.stack);
    } finally {
      setLoading(false);
    }
  };

  const renderFounderCard = (member, index) => {
    if (member) {
      // Existing member card - use member.id (from API) or fallback to index
      const key = member.id || member._id || `member-${index}`;
      return (
        <div
          key={key}
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          {/* Photo */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: member.photo
                ? `url(${member.photo}) center/cover`
                : 'linear-gradient(135deg, #f0f2f5 0%, #e8e8f0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}
          >
            {!member.photo && (
              <i className="fas fa-user" style={{ fontSize: '2rem', color: '#9a9aaa' }}></i>
            )}
          </div>

          {/* Name */}
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0 0 8px 0', fontFamily: "'Inter', sans-serif" }}>
            {member.name}
          </h3>

          {/* Title */}
          <p style={{ color: '#6b6b7b', margin: '0 0 16px 0', fontSize: '0.95rem', fontFamily: "'Inter', sans-serif" }}>
            {member.title}
          </p>

          {/* Status Badge */}
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '500',
              background: member.is_active ? 'rgba(3, 217, 103, 0.1)' : 'rgba(231, 76, 60, 0.1)',
              color: member.is_active ? '#02b555' : '#c0392b',
              marginBottom: '20px',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            {member.is_active ? 'Active' : 'Inactive'}
          </span>

          {/* Edit Profile Button */}
          <Link
            to={`/cms/team/edit/${member.id || member._id}`}
            style={{
              padding: '10px 20px',
              background: '#f0f2f5',
              borderRadius: '8px',
              color: '#1a1a2e',
              textDecoration: 'none',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.2s',
              fontFamily: "'Inter', sans-serif"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#e8e8f0';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#f0f2f5';
            }}
          >
            <i className="fas fa-edit"></i>
            Edit Profile
          </Link>
        </div>
      );
    } else {
      // Placeholder card for missing founder
      return (
        <div
          key={`placeholder-${index}`}
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '2px dashed #e8e8f0',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          {/* Placeholder Photo */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: '#f8f9fc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}
          >
            <i className="fas fa-user-plus" style={{ fontSize: '2rem', color: '#9a9aaa' }}></i>
          </div>

          {/* Placeholder Text */}
          <h3 style={{ fontSize: '1.1rem', fontWeight: '500', margin: '0 0 8px 0', color: '#6b6b7b', fontFamily: "'Inter', sans-serif" }}>
            Founder {index + 1}
          </h3>
          <p style={{ color: '#9a9aaa', margin: '0 0 20px 0', fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }}>
            Not yet added
          </p>

          {/* Add Founder Button */}
          <Link
            to="/cms/team/new"
            style={{
              padding: '10px 20px',
              background: '#03D967',
              borderRadius: '8px',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            <i className="fas fa-plus"></i>
            Add Founder
          </Link>
        </div>
      );
    }
  };

  // Create array of 3 slots, filling with members or null
  const founderSlots = [0, 1, 2].map(index => members[index] || null);
  const missingCount = Math.max(0, 3 - members.length);

  return (
    <div className="cms-team" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0, fontFamily: "'Inter', sans-serif" }}>Our Team</h2>
        <p style={{ color: '#6b6b7b', margin: '8px 0 0 0', fontFamily: "'Inter', sans-serif" }}>
          Manage the 3 founders of your company
        </p>
      </div>

      {/* Missing founders message */}
      {!loading && missingCount > 0 && (
        <div
          style={{
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          <i className="fas fa-exclamation-triangle" style={{ color: '#f39c12' }}></i>
          <span style={{ color: '#856404', fontFamily: "'Inter', sans-serif" }}>
            You have {missingCount} missing founder{missingCount > 1 ? 's' : ''}. 
            Add them below to complete your team.
          </span>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', fontFamily: "'Inter', sans-serif" }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#03D967' }}></i>
        </div>
      ) : (
        /* Founder Cards Grid */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '1200px'
          }}
        >
          {founderSlots.map((member, index) => renderFounderCard(member, index))}
        </div>
      )}
    </div>
  );
}

export default TeamCMS;
