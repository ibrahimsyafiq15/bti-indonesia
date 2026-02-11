import { useState, useEffect } from 'react';
import { companyAPI } from '../../services/api';
import SuccessModal from '../../components/SuccessModal';

function Company() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    metaDescription: '',
    address: {
      street: '',
      city: 'Jakarta',
      country: 'Indonesia',
      fullAddress: 'Jakarta, Indonesia'
    },
    contact: {
      email: 'contact@bti.co.id',
      phone: '+62 812 3456 7890',
      whatsapp: '6281234567890'
    },
    socialMedia: {
      instagram: '',
      linkedin: '',
      youtube: '',
      tiktok: '',
      twitter: ''
    },
    logo: null,
    footerLogo: null
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [footerLogoPreview, setFooterLogoPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [successModal, setSuccessModal] = useState({ isOpen: false, title: '', message: '' });

  useEffect(() => {
    loadCompany();
  }, []);

  const loadCompany = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('[Company] Loading company data...');
      const data = await companyAPI.getCompany();
      console.log('[Company] Data received:', data);
      
      // Safely set data with fallbacks
      const mappedFormData = {
        name: data?.name || 'Barakah Talenta Inspirasi',
        description: data?.description || '',
        metaDescription: data?.metaDescription || '',
        address: {
          street: data?.address?.street || '',
          city: data?.address?.city || 'Jakarta',
          country: data?.address?.country || 'Indonesia',
          fullAddress: data?.address?.fullAddress || 'Jakarta, Indonesia'
        },
        contact: {
          email: data?.contact?.email || 'contact@bti.co.id',
          phone: data?.contact?.phone || '+62 812 3456 7890',
          whatsapp: data?.contact?.whatsapp || '6281234567890'
        },
        socialMedia: {
          instagram: data?.socialMedia?.instagram || '',
          linkedin: data?.socialMedia?.linkedin || '',
          youtube: data?.socialMedia?.youtube || '',
          tiktok: data?.socialMedia?.tiktok || '',
          twitter: data?.socialMedia?.twitter || ''
        },
        logo: null,
        footerLogo: null
      };
      
      console.log('[Company] Mapped form data:', mappedFormData);
      setFormData(mappedFormData);
      
      if (data?.logo) setLogoPreview(data.logo);
      if (data?.footerLogo) setFooterLogoPreview(data.footerLogo);
    } catch (error) {
      console.error('[Company] Error loading company data:', error);
      console.error('[Company] Error details:', error.message, error.stack);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value
      }
    }));
    setSaved(false);
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === 'logo') {
          setLogoPreview(reader.result);
        } else {
          setFooterLogoPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      await companyAPI.updateCompany(formData);
      setSaved(true);
      setSuccessModal({
        isOpen: true,
        title: 'Success',
        message: 'Company details saved successfully!'
      });
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Save error:', error);
      setError('Failed to save: ' + (error.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', fontFamily: "'Inter', sans-serif" }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#03D967' }}></i>
        <p style={{ fontFamily: "'Inter', sans-serif" }}>Loading company data...</p>
      </div>
    );
  }

  return (
    <div className="cms-company" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', margin: 0, fontFamily: "'Inter', sans-serif" }}>Company Details</h2>
          <p style={{ margin: '4px 0 0', color: '#6b6b7b', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif" }}>
            Manage your company information displayed across the website
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

      <form onSubmit={handleSubmit} style={{ fontFamily: "'Inter', sans-serif" }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px'
        }}>
          <div>
            {/* Basic Info */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>Basic Information</h3>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Inter', sans-serif" }}>Company Name *</label>
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
                    borderRadius: '6px',
                    fontFamily: "'Inter', sans-serif"
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Inter', sans-serif" }}>
                  Description * 
                  <small style={{ color: '#6b6b7b' }}> (Shown in footer)</small>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e8e8f0',
                    borderRadius: '6px',
                    resize: 'vertical',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Inter', sans-serif" }}>
                  Meta Description 
                  <small style={{ color: '#6b6b7b' }}> (For SEO)</small>
                </label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  rows="2"
                  maxLength="160"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e8e8f0',
                    borderRadius: '6px',
                    resize: 'vertical',
                    fontFamily: "'Inter', sans-serif"
                  }}
                />
                <small style={{ color: '#6b6b7b', fontFamily: "'Inter', sans-serif" }}>{(formData.metaDescription || '').length}/160</small>
              </div>
            </div>

            {/* Address */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>Address</h3>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Inter', sans-serif" }}>Full Address *</label>
                <input
                  type="text"
                  value={formData.address?.fullAddress || ''}
                  onChange={(e) => handleNestedChange('address', 'fullAddress', e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e8e8f0',
                    borderRadius: '6px'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Inter', sans-serif" }}>City</label>
                  <input
                    type="text"
                    value={formData.address?.city || ''}
                    onChange={(e) => handleNestedChange('address', 'city', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e8e8f0',
                      borderRadius: '6px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Inter', sans-serif" }}>Country</label>
                  <input
                    type="text"
                    value={formData.address?.country || ''}
                    onChange={(e) => handleNestedChange('address', 'country', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e8e8f0',
                      borderRadius: '6px'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Contact */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>Contact Information</h3>
              
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Inter', sans-serif" }}>Email *</label>
                  <input
                    type="email"
                    value={formData.contact?.email || ''}
                    onChange={(e) => handleNestedChange('contact', 'email', e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e8e8f0',
                      borderRadius: '6px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Inter', sans-serif" }}>Phone</label>
                  <input
                    type="text"
                    value={formData.contact?.phone || ''}
                    onChange={(e) => handleNestedChange('contact', 'phone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e8e8f0',
                      borderRadius: '6px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Inter', sans-serif" }}>WhatsApp Number</label>
                  <input
                    type="text"
                    value={formData.contact?.whatsapp || ''}
                    onChange={(e) => handleNestedChange('contact', 'whatsapp', e.target.value)}
                    placeholder="6281234567890"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e8e8f0',
                      borderRadius: '6px'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Logos */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>Logos</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Inter', sans-serif" }}>Header Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'logo')}
                  style={{ display: 'none' }}
                  id="company-logo"
                />
                <label
                  htmlFor="company-logo"
                  style={{
                    display: 'block',
                    padding: '30px',
                    border: '2px dashed #e8e8f0',
                    borderRadius: '8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: logoPreview ? `url(${logoPreview}) center/contain no-repeat` : '#f8f9fc',
                    minHeight: logoPreview ? '100px' : 'auto'
                  }}
                >
                  {!logoPreview && (
                    <>
                      <i className="fas fa-cloud-upload-alt" style={{ fontSize: '1.5rem', color: '#9a9aaa' }}></i>
                      <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: '#6b6b7b', fontFamily: "'Inter', sans-serif" }}>Upload logo</p>
                    </>
                  )}
                </label>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontFamily: "'Inter', sans-serif" }}>Footer Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'footerLogo')}
                  style={{ display: 'none' }}
                  id="footer-logo"
                />
                <label
                  htmlFor="footer-logo"
                  style={{
                    display: 'block',
                    padding: '30px',
                    border: '2px dashed #e8e8f0',
                    borderRadius: '8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: footerLogoPreview ? `url(${footerLogoPreview}) center/contain no-repeat` : '#f8f9fc',
                    minHeight: footerLogoPreview ? '100px' : 'auto'
                  }}
                >
                  {!footerLogoPreview && (
                    <>
                      <i className="fas fa-cloud-upload-alt" style={{ fontSize: '1.5rem', color: '#9a9aaa' }}></i>
                      <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: '#6b6b7b', fontFamily: "'Inter', sans-serif" }}>Upload footer logo</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Social Media */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>Social Media</h3>
              
              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  { key: 'instagram', icon: 'fab fa-instagram', label: 'Instagram' },
                  { key: 'linkedin', icon: 'fab fa-linkedin', label: 'LinkedIn' },
                  { key: 'youtube', icon: 'fab fa-youtube', label: 'YouTube' },
                  { key: 'tiktok', icon: 'fab fa-tiktok', label: 'TikTok' },
                  { key: 'twitter', icon: 'fab fa-twitter', label: 'X (Twitter)' }
                ].map(({ key, icon, label }) => (
                  <div key={key}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif" }}>
                      <i className={icon}></i> {label}
                    </label>
                    <input
                      type="url"
                      value={formData.socialMedia?.[key] || ''}
                      onChange={(e) => handleNestedChange('socialMedia', key, e.target.value)}
                      placeholder={`https://${key}.com/...`}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #e8e8f0',
                        borderRadius: '6px',
                        fontSize: '0.9rem'
                      }}
                    />
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
          borderTop: '1px solid #e8e8f0',
          fontFamily: "'Inter', sans-serif"
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

export default Company;
