import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { articleAPI, categoryAPI } from '../../services/api';
import SuccessModal from '../../components/SuccessModal';
import ConfirmModal from '../../components/ConfirmModal';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: '',
    search: '',
    category: '',
    author: '',
    sortBy: 'created_at_desc'
  });
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });
  const [successModal, setSuccessModal] = useState({ isOpen: false, title: '', message: '' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, articleId: null });

  const navigate = useNavigate();

  useEffect(() => {
    loadArticles();
    loadFilterOptions();
  }, [pagination.currentPage, filter]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.currentPage,
        limit: 10,
        ...filter
      };
      const data = await articleAPI.getArticles(params);
      // Map snake_case to camelCase
      const mappedArticles = data.articles.map(article => ({
        _id: article.id,
        title: article.title,
        slug: article.slug,
        content: article.content,
        excerpt: article.excerpt,
        category: article.category,
        author: article.author,
        status: article.status,
        featuredImage: article.featured_image,
        createdAt: article.created_at,
        updatedAt: article.updated_at,
        publishedAt: article.published_at,
        views: article.views,
        tags: article.tags || []
      }));
      
      setArticles(mappedArticles);
      setPagination({
        currentPage: parseInt(data.currentPage),
        totalPages: data.totalPages,
        total: data.total
      });
    } catch (error) {
      console.error('[Articles] Error loading articles:', error);
      console.error('[Articles] Error details:', error.message, error.stack);
    } finally {
      setLoading(false);
    }
  };

  const loadFilterOptions = async () => {
    try {
      console.log('[Articles] Loading filter options...');
      const cats = await categoryAPI.getCategories();
      const authorsData = await articleAPI.getAuthors();
      setCategories(Array.isArray(cats) ? cats : []);
      setAuthors(Array.isArray(authorsData) ? authorsData : []);
    } catch (error) {
      console.error('Failed to load filter options:', error);
    }
  };

  const handleResetFilters = () => {
    setFilter({
      status: '',
      search: '',
      category: '',
      author: '',
      sortBy: 'created_at_desc'
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleDelete = (id) => {
    setConfirmModal({ isOpen: true, articleId: id });
  };

  const confirmDelete = async () => {
    try {
      await articleAPI.deleteArticle(confirmModal.articleId);
      setConfirmModal({ isOpen: false, articleId: null });
      setSuccessModal({
        isOpen: true,
        title: 'Success',
        message: 'Article deleted successfully!'
      });
      loadArticles();
    } catch (error) {
      alert('Failed to delete article: ' + error.message);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      published: { bg: 'rgba(3, 217, 103, 0.1)', color: '#02b555' },
      draft: { bg: 'rgba(243, 156, 18, 0.1)', color: '#d68910' },
      unpublished: { bg: 'rgba(231, 76, 60, 0.1)', color: '#c0392b' }
    };
    const style = styles[status] || styles.draft;
    
    return (
      <span style={{
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '500',
        background: style.bg,
        color: style.color,
        textTransform: 'capitalize',
        fontFamily: "'Inter', sans-serif"
      }}>
        {status}
      </span>
    );
  };

  return (
    <div className="cms-articles">
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        fontFamily: "'Inter', sans-serif"
      }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0, fontFamily: "'Inter', sans-serif" }}>Articles</h2>
        <Link to="/cms/articles/new" className="btn btn-primary">
          <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
          New Article
        </Link>
      </div>

      {/* Filters */}
      <div style={{
        background: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        marginBottom: '20px',
        fontFamily: "'Inter', sans-serif"
      }}>
        {/* Row 1: Search, Category, Author */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <input
            type="text"
            placeholder="Search articles..."
            value={filter.search}
            onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '10px 16px',
              border: '1px solid #e8e8f0',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              fontFamily: "'Inter', sans-serif"
            }}
          />
          <select
            value={filter.category}
            onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
            style={{
              padding: '10px 16px',
              border: '1px solid #e8e8f0',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              background: 'white',
              fontFamily: "'Inter', sans-serif",
              minWidth: '150px'
            }}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <select
            value={filter.author}
            onChange={(e) => setFilter(prev => ({ ...prev, author: e.target.value }))}
            style={{
              padding: '10px 16px',
              border: '1px solid #e8e8f0',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              background: 'white',
              fontFamily: "'Inter', sans-serif",
              minWidth: '150px'
            }}
          >
            <option value="">All Authors</option>
            {authors.map(author => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>
        </div>
        
        {/* Row 2: Status, Sort By, Reset */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <select
            value={filter.status}
            onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
            style={{
              padding: '10px 16px',
              border: '1px solid #e8e8f0',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              background: 'white',
              fontFamily: "'Inter', sans-serif",
              minWidth: '130px'
            }}
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="unpublished">Unpublished</option>
          </select>
          <select
            value={filter.sortBy}
            onChange={(e) => setFilter(prev => ({ ...prev, sortBy: e.target.value }))}
            style={{
              padding: '10px 16px',
              border: '1px solid #e8e8f0',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              background: 'white',
              fontFamily: "'Inter', sans-serif",
              minWidth: '160px'
            }}
          >
            <option value="created_at_desc">Newest First</option>
            <option value="created_at_asc">Oldest First</option>
            <option value="title_asc">Title A-Z</option>
            <option value="title_desc">Title Z-A</option>
            <option value="published_at_desc">Published Date</option>
            <option value="views_desc">Most Viewed</option>
          </select>
          <button
            onClick={handleResetFilters}
            className="btn btn-outline"
            style={{ marginLeft: 'auto' }}
          >
            <i className="fas fa-undo" style={{ marginRight: '6px' }}></i>
            Reset Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        fontFamily: "'Inter', sans-serif"
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', fontFamily: "'Inter', sans-serif" }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#03D967' }}></i>
          </div>
        ) : articles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', fontFamily: "'Inter', sans-serif" }}>
            <i className="fas fa-inbox" style={{ fontSize: '3rem', color: '#e8e8f0', marginBottom: '16px' }}></i>
            <p style={{ fontFamily: "'Inter', sans-serif" }}>No articles found.</p>
            <Link to="/cms/articles/new" className="btn btn-primary" style={{ marginTop: '16px' }}>
              Create your first article
            </Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fc' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#6b6b7b', fontFamily: "'Inter', sans-serif" }}>Article</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#6b6b7b', fontFamily: "'Inter', sans-serif" }}>Author</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#6b6b7b', fontFamily: "'Inter', sans-serif" }}>Category</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#6b6b7b', fontFamily: "'Inter', sans-serif" }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#6b6b7b', fontFamily: "'Inter', sans-serif" }}>Date</th>
                <th style={{ padding: '16px', textAlign: 'center', fontSize: '0.85rem', fontWeight: '600', color: '#6b6b7b', fontFamily: "'Inter', sans-serif" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={article.id || article._id || `article-${index}`} style={{ borderTop: '1px solid #f0f0f5' }}>
                  <td style={{ padding: '16px', fontFamily: "'Inter', sans-serif" }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '8px',
                        background: article.featuredImage 
                          ? `url(${article.featuredImage}) center/cover` 
                          : '#f0f2f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {!article.featuredImage && <i className="fas fa-image" style={{ color: '#9a9aaa' }}></i>}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontWeight: '500', color: '#1a1a2e', fontFamily: "'Inter', sans-serif" }}>{article.title}</p>
                        <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#6b6b7b', fontFamily: "'Inter', sans-serif" }}>/{article.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif" }}>{article.author}</td>
                  <td style={{ padding: '16px', fontFamily: "'Inter', sans-serif" }}>
                    <span style={{
                      padding: '4px 10px',
                      background: '#f0f2f5',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontFamily: "'Inter', sans-serif"
                    }}>{article.category}</span>
                  </td>
                  <td style={{ padding: '16px', fontFamily: "'Inter', sans-serif" }}>{getStatusBadge(article.status)}</td>
                  <td style={{ padding: '16px', fontSize: '0.9rem', color: '#6b6b7b', fontFamily: "'Inter', sans-serif" }}>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button
                        onClick={() => navigate(`/cms/articles/edit/${article.id || article._id}`)}
                        style={{
                          padding: '8px 12px',
                          background: '#f0f2f5',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          color: '#1a1a2e',
                          fontFamily: "'Inter', sans-serif"
                        }}
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <a
                        href={`/insight/${article.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '8px 12px',
                          background: '#e8f5e9',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          color: '#02b555',
                          textDecoration: 'none',
                          fontFamily: "'Inter', sans-serif"
                        }}
                        title="View"
                      >
                        <i className="fas fa-eye"></i>
                      </a>
                      <button
                        onClick={() => handleDelete(article.id || article._id)}
                        style={{
                          padding: '8px 12px',
                          background: '#ffebee',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          color: '#c0392b',
                          fontFamily: "'Inter', sans-serif"
                        }}
                        title="Delete"
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

        {/* Pagination */}
        {!loading && articles.length > 0 && (
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid #f0f0f5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: "'Inter', sans-serif"
          }}>
            <span style={{ fontSize: '0.9rem', color: '#6b6b7b', fontFamily: "'Inter', sans-serif" }}>
              Showing {articles.length} of {pagination.total} articles
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                disabled={pagination.currentPage === 1}
                className="btn btn-outline btn-sm"
              >
                Previous
              </button>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '0 12px',
                fontSize: '0.9rem',
                fontFamily: "'Inter', sans-serif"
              }}>
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                disabled={pagination.currentPage === pagination.totalPages}
                className="btn btn-outline btn-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ isOpen: false, title: '', message: '' })}
        title={successModal.title}
        message={successModal.message}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, articleId: null })}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this article?"
      />
    </div>
  );
}

export default Articles;
