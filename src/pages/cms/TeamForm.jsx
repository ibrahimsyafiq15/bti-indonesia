import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { teamAPI } from '../../services/api';

function TeamForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    profileDescription: '',
    expertise: [],
    credentials: [],
    linkedinProfile: '',
    photo: null,
    isActive: true
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [expertiseInput, setExpertiseInput] = useState('');
  const [credentialInput, setCredentialInput] = useState({ icon: 'fas fa-check', label: '' });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      loadMember();
    }
  }, [id]);

  const loadMember = async () => {
    try {
      setLoading(true);
      const member = await teamAPI.getMember(id);
      setFormData({
        name: member.name,
        title: member.title,
        profileDescription: member.profileDescription,
        expertise: member.expertise || [],
        credentials: member.credentials || [],
        linkedinProfile: member.linkedinProfile || '',
        photo: null,
        isActive: member.isActive
      });
      if (member.photo) {
        setImagePreview(member.photo);
      }
    } catch (error) {
      alert('Failed to load member');
      navigate('/cms/team');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addExpertise = () => {
    if (expertiseInput.trim() && !formData.expertise.includes(expertiseInput.trim())) {
      setFormData(prev => ({ ...prev, expertise: [...prev.expertise, expertiseInput.trim()] }));
      setExpertiseInput('');
    }
  };

  const removeExpertise = (exp) => {
    setFormData(prev => ({ ...prev, expertise: prev.expertise.filter(e => e !== exp) }));
  };

  const addCredential = () => {
    if (credentialInput.label.trim()) {
      setFormData(prev => ({ ...prev, credentials: [...prev.credentials, { ...credentialInput }] }));
      setCredentialInput({ icon: 'fas fa-check', label: '' });
    }
  };

  const removeCredential = (index) => {
    setFormData(prev => ({ ...prev, credentials: prev.credentials.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      if (isEditing) {
        await teamAPI.updateMember(id, formData);
      } else {
        await teamAPI.createMember(formData);
      }
      navigate('/cms/team');
    } catch (error) {
      alert('Failed to save: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#03D967' }}></i>
      </div>
    );
  }

  return (
    <div className="team-form">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>
          {isEditing ? 'Edit Team Member' : 'Add Team Member'}
        </h2>
        <button onClick={() => navigate('/cms/team')} className="btn btn-outline">
          <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px'
        }}>
          <div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>Basic Information</h3>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e8e8f0',
                    borderRadius: '6px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Chief Executive Officer"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e8e8f0',
                    borderRadius: '6px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>LinkedIn Profile</label>
                <input
                  type="url"
                  name="linkedinProfile"
                  value={formData.linkedinProfile}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e8e8f0',
                    borderRadius: '6px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                  Active Member
                </label>
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>Profile Photo</h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="member-photo"
              />
              <label
                htmlFor="member-photo"
                style={{
                  display: 'block',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: imagePreview ? `url(${imagePreview}) center/cover` : '#f8f9fc',
                  border: '2px dashed #e8e8f0',
                  cursor: 'pointer',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {!imagePreview && <i className="fas fa-camera" style={{ fontSize: '2rem', color: '#9a9aaa' }}></i>}
              </label>
              {imagePreview && (
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData(prev => ({ ...prev, photo: null }));
                  }}
                  style={{
                    display: 'block',
                    margin: '12px auto 0',
                    padding: '8px 16px',
                    background: '#ffebee',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#c0392b',
                    cursor: 'pointer'
                  }}
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>

          <div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>Profile Description</h3>
              <textarea
                name="profileDescription"
                value={formData.profileDescription}
                onChange={handleChange}
                required
                rows="6"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e8e8f0',
                  borderRadius: '6px',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>Areas of Expertise</h3>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                  type="text"
                  value={expertiseInput}
                  onChange={(e) => setExpertiseInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
                  placeholder="Add expertise"
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    border: '1px solid #e8e8f0',
                    borderRadius: '6px'
                  }}
                />
                <button type="button" onClick={addExpertise} className="btn btn-primary">
                  Add
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {formData.expertise.map(exp => (
                  <span
                    key={exp}
                    style={{
                      padding: '6px 12px',
                      background: '#e8f5e9',
                      borderRadius: '16px',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {exp}
                    <button
                      type="button"
                      onClick={() => removeExpertise(exp)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>Credentials</h3>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                  type="text"
                  value={credentialInput.label}
                  onChange={(e) => setCredentialInput(prev => ({ ...prev, label: e.target.value }))}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCredential())}
                  placeholder="e.g. MBA, Harvard Business School"
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    border: '1px solid #e8e8f0',
                    borderRadius: '6px'
                  }}
                />
                <button type="button" onClick={addCredential} className="btn btn-primary">
                  Add
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {formData.credentials.map((cred, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '10px 12px',
                      background: '#f8f9fc',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span><i className={cred.icon} style={{ marginRight: '8px', color: '#03D967' }}></i>{cred.label}</span>
                    <button
                      type="button"
                      onClick={() => removeCredential(index)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0392b' }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end',
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid #e8e8f0'
        }}>
          <button
            type="button"
            onClick={() => navigate('/cms/team')}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
          >
            {saving ? (
              <><i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Saving...</>
            ) : (
              <><i className="fas fa-save" style={{ marginRight: '8px' }}></i> Save</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TeamForm;
