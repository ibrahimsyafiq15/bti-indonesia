import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { authAPI } from '../../services/api';
import SuccessModal from '../../components/SuccessModal';

function Profile() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successModal, setSuccessModal] = useState({ isOpen: false, title: '', message: '' });

  useEffect(() => {
    console.log('[Profile] User data:', user);
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || 'Administrator',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    console.log('[Profile] Submitting form:', { name: formData.name, email: formData.email });
    
    // Validate passwords if trying to change
    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        setError('Current password is required to change password');
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError('New password and confirm password do not match');
        return;
      }
      if (formData.newPassword.length < 6) {
        setError('New password must be at least 6 characters');
        return;
      }
    }
    
    setSaving(true);
    
    try {
      const updateData = {
        name: formData.name,
        email: formData.email
      };
      
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }
      
      console.log('[Profile] Calling API with data:', updateData);
      const result = await authAPI.updateProfile(updateData);
      console.log('[Profile] API response:', result);
      
      // Update user in context
      if (result.user) {
        updateUser(result.user);
      }
      
      setSuccessModal({
        isOpen: true,
        title: 'Success',
        message: 'Profile updated successfully!'
      });
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err) {
      console.error('[Profile] Error saving profile:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="cms-profile" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', margin: 0, fontFamily: "'Inter', sans-serif" }}>My Profile</h2>
          <p style={{ margin: '4px 0 0', color: '#6b6b7b', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif" }}>
            Manage your account information and password
          </p>
        </div>
      </div>

      {error && (
        <div style={{
          padding: '12px 16px',
          background: '#ffebee',
          color: '#c0392b',
          borderRadius: '8px',
          marginBottom: '20px',
          fontFamily: "'Inter', sans-serif"
        }}>
          <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px'
        }}>
          {/* Profile Info */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '20px', fontFamily: "'Inter', sans-serif" }}>
              <i className="fas fa-user" style={{ marginRight: '8px', color: '#03D967' }}></i>
              Profile Information
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem' }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e8e8f0',
                  borderRadius: '6px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e8e8f0',
                  borderRadius: '6px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px'
                }}
              />
            </div>
          </div>

          {/* Change Password */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '20px', fontFamily: "'Inter', sans-serif" }}>
              <i className="fas fa-lock" style={{ marginRight: '8px', color: '#03D967' }}></i>
              Change Password
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem' }}>
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e8e8f0',
                  borderRadius: '6px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem' }}>
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e8e8f0',
                  borderRadius: '6px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem' }}>
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e8e8f0',
                  borderRadius: '6px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px'
                }}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid #e8e8f0'
        }}>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary btn-lg"
          >
            {saving ? (
              <><i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Saving...</>
            ) : (
              <><i className="fas fa-save" style={{ marginRight: '8px' }}></i> Save Changes</>
            )}
          </button>
        </div>
      </form>

      {/* Account Info Card */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        marginTop: '24px'
      }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>
          <i className="fas fa-info-circle" style={{ marginRight: '8px', color: '#03D967' }}></i>
          Account Information
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px'
        }}>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: '0.85rem', color: '#6b6b7b' }}>Role</p>
            <p style={{ margin: 0, fontWeight: '500' }}>Administrator</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: '0.85rem', color: '#6b6b7b' }}>Member Since</p>
            <p style={{ margin: 0, fontWeight: '500' }}>January 2024</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: '0.85rem', color: '#6b6b7b' }}>Last Login</p>
            <p style={{ margin: 0, fontWeight: '500' }}>{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ isOpen: false, title: '', message: '' })}
        title={successModal.title}
        message={successModal.message}
      />
    </div>
  );
}

export default Profile;
