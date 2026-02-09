import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleAPI } from '../../services/api';
import SubscribeSection from './SubscribeSection';

function InsightList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });
  const [filter, setFilter] = useState({
    category: '',
    tag: ''
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadArticles();
    loadCategories();
  }, [pagination.currentPage, filter]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.currentPage,
        limit: 9,
        ...filter
      };
      const data = await articleAPI.getPublicArticles(params);
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

  const loadCategories = async () => {
    try {
      const cats = await articleAPI.getCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilter(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
            <span className="page-tag">Insights</span>
            <h1 className="page-title">Latest Articles</h1>
            <p className="page-subtitle">Explore our latest insights, research, and perspectives on business strategy and industry trends.</p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="section-padding">
        <div className="container">
          {/* Filters */}
          <div className="insight-filters" style={{ marginBottom: '40px' }}>
            <div className="filter-group">
              <label>Category:</label>
              <select 
                value={filter.category} 
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {filter.category && (
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => handleFilterChange('category', '')}
              >
                Clear Filter
              </button>
            )}
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div className="loading-container" style={{ textAlign: 'center', padding: '60px' }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary)' }}></i>
              <p>Loading articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="no-articles" style={{ textAlign: 'center', padding: '60px' }}>
              <i className="fas fa-inbox" style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '20px' }}></i>
              <h3>No articles found</h3>
              <p>Check back later for new content.</p>
            </div>
          ) : (
            <>
              <div className="articles-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '30px',
                marginBottom: '40px'
              }}>
                {articles.map(article => (
                  <article key={article._id} className="article-card" data-aos="fade-up">
                    <Link to={`/insight/${article.slug}`} className="article-image-link">
                      <div className="article-image" style={{
                        height: '220px',
                        background: article.featuredImage 
                          ? `url(${article.featuredImage}) center/cover` 
                          : 'linear-gradient(135deg, var(--bg-light) 0%, #e8e8f0 100%)',
                        borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                        position: 'relative'
                      }}>
                        {!article.featuredImage && (
                          <i className="fas fa-image" style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '3rem',
                            color: 'var(--text-muted)'
                          }}></i>
                        )}
                        <span className="article-category" style={{
                          position: 'absolute',
                          top: '16px',
                          left: '16px',
                          padding: '6px 14px',
                          background: 'var(--primary)',
                          color: 'var(--secondary)',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          borderRadius: '20px'
                        }}>{article.category}</span>
                      </div>
                    </Link>
                    <div className="article-content" style={{
                      padding: '24px',
                      background: 'var(--bg-white)',
                      borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
                      border: '1px solid var(--border-light)',
                      borderTop: 'none'
                    }}>
                      <div className="article-meta" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '12px',
                        fontSize: '0.85rem',
                        color: 'var(--text-light)'
                      }}>
                        <span><i className="fas fa-calendar" style={{ marginRight: '6px' }}></i>{formatDate(article.publishedAt)}</span>
                        <span><i className="fas fa-user" style={{ marginRight: '6px' }}></i>{article.author}</span>
                      </div>
                      <h3 className="article-title" style={{
                        fontSize: '1.25rem',
                        marginBottom: '12px',
                        lineHeight: '1.4'
                      }}>
                        <Link to={`/insight/${article.slug}`} style={{ color: 'inherit' }}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className="article-excerpt" style={{
                        color: 'var(--text-light)',
                        fontSize: '0.95rem',
                        marginBottom: '16px',
                        lineHeight: '1.6'
                      }}>
                        {article.excerpt || article.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                      </p>
                      <div className="article-footer" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <Link to={`/insight/${article.slug}`} className="article-read-more" style={{
                          color: 'var(--primary)',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          Read More <i className="fas fa-arrow-right"></i>
                        </Link>
                        {article.tags && article.tags.length > 0 && (
                          <div className="article-tags" style={{
                            display: 'flex',
                            gap: '8px'
                          }}>
                            {article.tags.slice(0, 2).map(tag => (
                              <span key={tag} style={{
                                padding: '4px 10px',
                                background: 'var(--bg-light)',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                color: 'var(--text-light)'
                              }}>{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="pagination" style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '40px'
                }}>
                  <button 
                    className="btn btn-outline btn-sm"
                    disabled={pagination.currentPage === 1}
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                  >
                    <i className="fas fa-chevron-left"></i> Previous
                  </button>
                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '0 16px',
                    color: 'var(--text-body)'
                  }}>
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <button 
                    className="btn btn-outline btn-sm"
                    disabled={pagination.currentPage === pagination.totalPages}
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                  >
                    Next <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <SubscribeSection />
    </>
  );
}

export default InsightList;
