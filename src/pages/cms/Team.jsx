import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { teamAPI } from '../../services/api';

function TeamCMS() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const data = await teamAPI.getTeam();
      setMembers(data);
    } catch (error) {
      console.error('Failed to load team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      await teamAPI.deleteMember(id);
      loadMembers();
    } catch (error) {
      alert('Failed to delete: ' + error.message);
    }
  };

  return (
    <div className="cms-team">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Our Team</h2>
        <Link to="/cms/team/new" className="btn btn-primary">
          <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
          Add Member
        </Link>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#03D967' }}></i>
          </div>
        ) : members.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <i className="fas fa-users" style={{ fontSize: '3rem', color: '#e8e8f0', marginBottom: '16px' }}></i>
            <p>No team members yet.</p>
            <Link to="/cms/team/new" className="btn btn-primary" style={{ marginTop: '16px' }}>
              Add your first member
            </Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fc' }}>
                <th style={{ padding: '16px', textAlign: 'left' }}>Member</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Title</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Expertise</th>
                <th style={{ padding: '16px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member._id} style={{ borderTop: '1px solid #f0f0f5' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: member.photo 
                          ? `url(${member.photo}) center/cover` 
                          : 'linear-gradient(135deg, #f0f2f5 0%, #e8e8f0 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {!member.photo && <i className="fas fa-user" style={{ color: '#9a9aaa' }}></i>}
                      </div>
                      <span style={{ fontWeight: '500' }}>{member.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>{member.title}</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {member.expertise?.slice(0, 3).map(exp => (
                        <span key={exp} style={{
                          padding: '2px 8px',
                          background: '#f0f2f5',
                          borderRadius: '10px',
                          fontSize: '0.75rem'
                        }}>{exp}</span>
                      ))}
                      {member.expertise?.length > 3 && (
                        <span style={{ fontSize: '0.75rem', color: '#6b6b7b' }}>+{member.expertise.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      background: member.isActive ? 'rgba(3, 217, 103, 0.1)' : 'rgba(231, 76, 60, 0.1)',
                      color: member.isActive ? '#02b555' : '#c0392b'
                    }}>
                      {member.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <Link
                        to={`/cms/team/edit/${member._id}`}
                        style={{
                          padding: '8px 12px',
                          background: '#f0f2f5',
                          borderRadius: '6px',
                          color: '#1a1a2e',
                          textDecoration: 'none'
                        }}
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button
                        onClick={() => handleDelete(member._id)}
                        style={{
                          padding: '8px 12px',
                          background: '#ffebee',
                          border: 'none',
                          borderRadius: '6px',
                          color: '#c0392b',
                          cursor: 'pointer'
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TeamCMS;
