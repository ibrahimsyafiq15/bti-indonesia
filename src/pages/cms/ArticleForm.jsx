import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { articleAPI } from '../../services/api';
import SuccessModal from '../../components/SuccessModal';

// Simple WYSIWYG Editor Component
function WysiwygEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  useEffect(() => {
    if (editorRef.current && value && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  return (
    <div className="wysiwyg-editor" style={{ border: '1px solid #e8e8f0', borderRadius: '8px', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        gap: '4px',
        padding: '8px',
        background: '#f8f9fc',
        borderBottom: '1px solid #e8e8f0',
        flexWrap: 'wrap'
      }}>
        <button type="button" onClick={() => execCommand('bold')} style={toolbarBtnStyle} title="Bold">
          <i className="fas fa-bold"></i>
        </button>
        <button type="button" onClick={() => execCommand('italic')} style={toolbarBtnStyle} title="Italic">
          <i className="fas fa-italic"></i>
        </button>
        <button type="button" onClick={() => execCommand('underline')} style={toolbarBtnStyle} title="Underline">
          <i className="fas fa-underline"></i>
        </button>
        <span style={{ width: '1px', background: '#e8e8f0', margin: '0 4px' }}></span>
        <button type="button" onClick={() => execCommand('justifyLeft')} style={toolbarBtnStyle} title="Align Left">
          <i className="fas fa-align-left"></i>
        </button>
        <button type="button" onClick={() => execCommand('justifyCenter')} style={toolbarBtnStyle} title="Align Center">
          <i className="fas fa-align-center"></i>
        </button>
        <button type="button" onClick={() => execCommand('justifyRight')} style={toolbarBtnStyle} title="Align Right">
          <i className="fas fa-align-right"></i>
        </button>
        <span style={{ width: '1px', background: '#e8e8f0', margin: '0 4px' }}></span>
        <button type="button" onClick={() => execCommand('insertUnorderedList')} style={toolbarBtnStyle} title="Bullet List">
          <i className="fas fa-list-ul"></i>
        </button>
        <button type="button" onClick={() => execCommand('insertOrderedList')} style={toolbarBtnStyle} title="Numbered List">
          <i className="fas fa-list-ol"></i>
        </button>
        <span style={{ width: '1px', background: '#e8e8f0', margin: '0 4px' }}></span>
        <button type="button" onClick={() => execCommand('formatBlock', 'H2')} style={toolbarBtnStyle} title="Heading">
          <i className="fas fa-heading"></i>
        </button>
        <button type="button" onClick={() => execCommand('formatBlock', 'P')} style={toolbarBtnStyle} title="Paragraph">
          <i className="fas fa-paragraph"></i>
        </button>
        <button type="button" onClick={() => execCommand('createLink', prompt('Enter URL:'))} style={toolbarBtnStyle} title="Insert Link">
          <i className="fas fa-link"></i>
        </button>
      </div>
      
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        style={{
          minHeight: '300px',
          padding: '16px',
          outline: 'none',
          lineHeight: '1.6',
          fontFamily: "'Inter', sans-serif"
        }}
      />
    </div>
  );
}

const toolbarBtnStyle = {
  padding: '6px 10px',
  background: 'white',
  border: '1px solid #e8e8f0',
  borderRadius: '4px',
  cursor: 'pointer',
  color: '#4a4a5a',
  fontFamily: "'Inter', sans-serif"
};

function ArticleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'Insight',
    author: '',
    status: 'draft',
    tags: [],
    featuredImage: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState(['Insight', 'News', 'Research', 'Opinion', 'Case Study']);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successModal, setSuccessModal] = useState({ isOpen: false, title: '', message: '' });

  useEffect(() => {
    if (isEditing) {
      loadArticle();
    }
    loadCategories();
  }, [id]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      console.log('[ArticleForm] Loading article with id:', id);
      const article = await articleAPI.getArticle(id);
      console.log('[ArticleForm] Loaded article data:', article);
      setFormData({
        title: article.title,
        content: article.content,
        excerpt: article.excerpt || '',
        category: article.category,
        author: article.author,
        status: article.status,
        tags: article.tags || [],
        featuredImage: null
      });
      if (article.featuredImage) {
        setImagePreview(article.featuredImage);
      }
    } catch (error) {
      console.error('[ArticleForm] Error loading article:', error);
      console.error('[ArticleForm] Error details:', error.message, error.stack);
      alert('Failed to load article');
      navigate('/cms/articles');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const cats = await articleAPI.getCategories();
      if (cats.length > 0) {
        setCategories(cats);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, featuredImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim()) && formData.tags.length < 10) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleSubmit = async (e, saveStatus = null) => {
    e.preventDefault();
    
    const statusToSave = saveStatus || formData.status;
    const dataToSubmit = { ...formData, status: statusToSave };

    try {
      setSaving(true);
      if (isEditing) {
        await articleAPI.updateArticle(id, dataToSubmit);
      } else {
        await articleAPI.createArticle(dataToSubmit);
      }
      setSuccessModal({
        isOpen: true,
        title: 'Success',
        message: isEditing ? 'Article updated successfully!' : 'Article created successfully!'
      });
      setTimeout(() => {
        navigate('/cms/articles');
      }, 1500);
    } catch (error) {
      console.error('[ArticleForm] Error saving article:', error);
      console.error('[ArticleForm] Error details:', error.message, error.stack);
      alert('Failed to save article: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', fontFamily: "'Inter', sans-serif" }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#03D967' }}></i>
      </div>
    );
  }

  return (
    <div className="article-form" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0, fontFamily: "'Inter', sans-serif" }}>
          {isEditing ? 'Edit Article' : 'New Article'}
        </h2>
        <button onClick={() => navigate('/cms/articles')} className="btn btn-outline">
          <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>
          Back
        </button>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} style={{ fontFamily: "'Inter', sans-serif" }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px'
        }}>
          {/* Main Content */}
          <div>
            {/* Title */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontFamily: "'Inter', sans-serif" }}>
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter article title"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e8e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: "'Inter', sans-serif"
                }}
              />
            </div>

            {/* Content */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontFamily: "'Inter', sans-serif" }}>
                Content *
              </label>
              <WysiwygEditor
                value={formData.content}
                onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                placeholder="Write your article content..."
              />
            </div>

            {/* Excerpt */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontFamily: "'Inter', sans-serif" }}>
                Excerpt
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Brief summary of the article (optional)"
                rows="3"
                maxLength="500"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e8e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: "'Inter', sans-serif"
                }}
              />
              <small style={{ color: '#6b6b7b', fontFamily: "'Inter', sans-serif" }}>{formData.excerpt.length}/500 characters</small>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Publish Settings */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>Publish Settings</h3>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif" }}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e8e8f0',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="unpublished">Unpublished</option>
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif" }}>Author *</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  placeholder="Article author"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e8e8f0',
                    borderRadius: '6px',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
            </div>

            {/* Category */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>Category</h3>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e8e8f0',
                  borderRadius: '6px',
                  fontSize: '0.95rem'
                }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Featured Image */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>Featured Image</h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="featured-image"
              />
              <label
                htmlFor="featured-image"
                style={{
                  display: 'block',
                  padding: '40px 20px',
                  border: '2px dashed #e8e8f0',
                  borderRadius: '8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: imagePreview ? `url(${imagePreview}) center/cover` : '#f8f9fc'
                }}
              >
                {!imagePreview && (
                  <>
                    <i className="fas fa-cloud-upload-alt" style={{ fontSize: '2rem', color: '#9a9aaa', marginBottom: '8px' }}></i>
                    <p style={{ margin: 0, color: '#6b6b7b', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif" }}>Click to upload image</p>
                  </>
                )}
              </label>
              {imagePreview && (
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData(prev => ({ ...prev, featuredImage: null }));
                  }}
                  style={{
                    marginTop: '8px',
                    padding: '8px 16px',
                    background: '#ffebee',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#c0392b',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  Remove Image
                </button>
              )}
            </div>

            {/* Tags */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>Tags (Max 10)</h3>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag(e)}
                  placeholder="Add tag"
                  disabled={formData.tags.length >= 10}
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    border: '1px solid #e8e8f0',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    fontFamily: "'Inter', sans-serif"
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim() || formData.tags.length >= 10}
                  className="btn btn-primary"
                >
                  Add
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      padding: '6px 12px',
                      background: '#e8f5e9',
                      borderRadius: '16px',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#666',
                        padding: 0,
                        fontFamily: "'Inter', sans-serif"
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{
          position: 'sticky',
          bottom: 0,
          background: '#f0f2f5',
          padding: '16px 0',
          marginTop: '24px',
          borderTop: '1px solid #e8e8f0',
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end',
          fontFamily: "'Inter', sans-serif"
        }}>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'draft')}
            disabled={saving}
            className="btn btn-outline"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
          >
            {saving ? (
              <><i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Saving...</>
            ) : (
              <><i className="fas fa-save" style={{ marginRight: '8px' }}></i> {isEditing ? 'Update' : 'Publish'}</>
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

export default ArticleForm;
