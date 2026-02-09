import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { articleAPI } from '../../services/api';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: '',
    search: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadArticles();
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
      setArticles(data.articles);
      setPagination({
        currentPage: parseInt(data.currentPage),
        totalPages: data.totalPages,
        total: data.total
      });
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    
    try {
      await articleAPI.deleteArticle(id);
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
        textTransform: 'capitalize'
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
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Articles</h2>
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
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center'
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
            fontSize: '0.95rem',
            outline: 'none'
          }}
        />
        <select
          value={filter.status}
          onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
          style={{
            padding: '10px 16px',
            border: '1px solid #e8e8f0',
            borderRadius: '8px',
            fontSize: '0.95rem',
            outline: 'none',
            background: 'white'
          }}
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="unpublished">Unpublished</option>
        </select>
        <button
          onClick={() => {
            setFilter({ status: '', search: '' });
            setPagination(prev => ({ ...prev, currentPage: 1 }));
          }}
          className="btn btn-outline"
        >
          Reset
        </button>
      </div>

      {/* Table */}
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
        ) : articles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <i className="fas fa-inbox" style={{ fontSize: '3rem', color: '#e8e8f0', marginBottom: '16px' }}></i>
            <p>No articles found.</p>
            <Link to="/cms/articles/new" className="btn btn-primary" style={{ marginTop: '16px' }}>
              Create your first article
            </Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fc' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#6b6b7b' }}>Article</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#6b6b7b' }}>Author</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#6b6b7b' }}>Category</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#6b6b7b' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#6b6b7b' }}>Date</th>
                <th style={{ padding: '16px', textAlign: 'center', fontSize: '0.85rem', fontWeight: '600', color: '#6b6b7b' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article._id} style={{ borderTop: '1px solid #f0f0f5' }}>
                  <td style={{ padding: '16px' }}>
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
                        <p style={{ margin: 0, fontWeight: '500', color: '#1a1a2e' }}>{article.title}</p>
                        <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#6b6b7b' }}>/{article.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.9rem' }}>{article.author}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 10px',
                      background: '#f0f2f5',
                      borderRadius: '12px',
                      fontSize: '0.8rem'
                    }}>{article.category}</span>
                  </td>
                  <td style={{ padding: '16px' }}>{getStatusBadge(article.status)}</td>
                  <td style={{ padding: '16px', fontSize: '0.9rem', color: '#6b6b7b' }}>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button
                        onClick={() => navigate(`/cms/articles/edit/${article._id}`)}
                        style={{
                          padding: '8px 12px',
                          background: '#f0f2f5',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          color: '#1a1a2e'
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
                          textDecoration: 'none'
                        }}
                        title="View"
                      >
                        <i className="fas fa-eye"></i>
                      </a>
                      <button
                        onClick={() => handleDelete(article._id)}
                        style={{
                          padding: '8px 12px',
                          background: '#ffebee',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          color: '#c0392b'
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
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '0.9rem', color: '#6b6b7b' }}>
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
                fontSize: '0.9rem'
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
    </div>
  );
}

export default Articles;
