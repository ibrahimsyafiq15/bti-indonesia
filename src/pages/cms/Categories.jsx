import { useState, useEffect } from 'react';
import { categoryAPI } from '../../services/api';
import SuccessModal from '../../components/SuccessModal';
import ConfirmModal from '../../components/ConfirmModal';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [successModal, setSuccessModal] = useState({ isOpen: false, title: '', message: '' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, categoryId: null, categoryName: '' });
  const [formData, setFormData] = useState({ name: '', description: '', sort_order: 0 });
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadCategories(); }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      console.log('[Categories] Loading...');
      const data = await categoryAPI.getCategories();
      console.log('[Categories] Loaded:', data);
      setCategories(data);
    } catch (error) {
      console.error('[Categories] Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, description: category.description || '', sort_order: category.sort_order || 0 });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', description: '', sort_order: categories.length });
    }
    setFormError('');
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', sort_order: 0 });
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSaving(true);
    try {
      if (editingCategory) {
        await categoryAPI.updateCategory(editingCategory.id, formData);
        setSuccessModal({ isOpen: true, title: 'Success', message: `Category updated successfully!` });
      } else {
        await categoryAPI.createCategory(formData);
        setSuccessModal({ isOpen: true, title: 'Success', message: `Category created successfully!` });
      }
      handleCloseForm();
      loadCategories();
    } catch (error) {
      console.error('[Categories] Error saving:', error);
      setFormError(error.message || 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (category) => {
    setConfirmModal({ isOpen: true, categoryId: category.id, categoryName: category.name });
  };

  const confirmDelete = async () => {
    try {
      await categoryAPI.deleteCategory(confirmModal.categoryId);
      setSuccessModal({ isOpen: true, title: 'Success', message: `Category deleted successfully!` });
      setConfirmModal({ isOpen: false, categoryId: null, categoryName: '' });
      loadCategories();
    } catch (error) {
      console.error('[Categories] Error deleting:', error);
      setSuccessModal({ isOpen: true, title: 'Error', message: error.message || 'Failed to delete category' });
      setConfirmModal({ isOpen: false, categoryId: null, categoryName: '' });
    }
  };

  const handleToggleActive = async (category) => {
    try {
      await categoryAPI.updateCategory(category.id, { is_active: !category.is_active });
      loadCategories();
    } catch (error) {
      console.error('[Categories] Error toggling:', error);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Categories</h2>
          <p style={{ margin: '4px 0 0', color: '#6b6b7b', fontSize: '0.9rem' }}>Manage article categories</p>
        </div>
        <button onClick={() => handleOpenForm()} className="btn btn-primary">
          <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>New Category
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#03D967' }}></i>
        </div>
      ) : categories.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '12px', padding: '60px', textAlign: 'center' }}>
          <i className="fas fa-folder" style={{ fontSize: '3rem', color: '#e8e8f0', marginBottom: '16px' }}></i>
          <p>No categories found</p>
          <button onClick={() => handleOpenForm()} className="btn btn-primary">Create your first category</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {categories.map((category) => (
            <div key={category.id} style={{ background: 'white', borderRadius: '12px', padding: '20px', borderLeft: '4px solid #03D967', opacity: category.is_active ? 1 : 0.6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{category.name}</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleToggleActive(category)} title={category.is_active ? 'Deactivate' : 'Activate'} style={{ padding: '6px', background: category.is_active ? '#e8f5e9' : '#ffebee', border: 'none', borderRadius: '6px', cursor: 'pointer', color: category.is_active ? '#02b555' : '#c0392b' }}>
                    <i className={`fas fa-${category.is_active ? 'eye' : 'eye-slash'}`}></i>
                  </button>
                  <button onClick={() => handleOpenForm(category)} title="Edit" style={{ padding: '6px', background: '#f0f2f5', border: 'none', borderRadius: '6px', cursor: 'pointer', color: '#1a1a2e' }}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => handleDelete(category)} title="Delete" disabled={category.articleCount > 0} style={{ padding: '6px', background: category.articleCount > 0 ? '#f0f2f5' : '#ffebee', border: 'none', borderRadius: '6px', cursor: category.articleCount > 0 ? 'not-allowed' : 'pointer', color: category.articleCount > 0 ? '#9a9aaa' : '#c0392b' }}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              {category.description && <p style={{ margin: '0 0 12px', color: '#6b6b7b', fontSize: '0.9rem' }}>{category.description}</p>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ padding: '4px 12px', background: '#f0f2f5', borderRadius: '20px', fontSize: '0.85rem', color: '#6b6b7b' }}>
                  {category.articleCount} article{category.articleCount !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '32px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflow: 'auto' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '1.25rem' }}>{editingCategory ? 'Edit Category' : 'New Category'}</h3>
            {formError && <div style={{ padding: '12px 16px', background: '#ffebee', color: '#c0392b', borderRadius: '8px', marginBottom: '16px' }}><i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i>{formError}</div>}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Category Name *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder="e.g., Technology" style={{ width: '100%', padding: '10px 12px', border: '1px solid #e8e8f0', borderRadius: '6px', fontSize: '16px' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Brief description..." rows={3} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e8e8f0', borderRadius: '6px', fontSize: '16px', resize: 'vertical' }} />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Sort Order</label>
                <input type="number" value={formData.sort_order} onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })} min="0" style={{ width: '100px', padding: '10px 12px', border: '1px solid #e8e8f0', borderRadius: '6px', fontSize: '16px' }} />
                <small style={{ color: '#6b6b7b', marginLeft: '8px' }}>Lower numbers appear first</small>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={handleCloseForm} className="btn btn-outline" disabled={saving}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? <><i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>Saving...</> : (editingCategory ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <SuccessModal isOpen={successModal.isOpen} onClose={() => setSuccessModal({ isOpen: false, title: '', message: '' })} title={successModal.title} message={successModal.message} />
      <ConfirmModal isOpen={confirmModal.isOpen} onClose={() => setConfirmModal({ isOpen: false, categoryId: null, categoryName: '' })} onConfirm={confirmDelete} title="Confirm Delete" message={`Delete category "${confirmModal.categoryName}"?`} />
    </div>
  );
}

export default Categories;
