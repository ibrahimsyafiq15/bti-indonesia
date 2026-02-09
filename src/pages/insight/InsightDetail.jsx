import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { articleAPI } from '../../services/api';
import SubscribeSection from './SubscribeSection';

function InsightDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    loadArticle();
  }, [slug]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      const data = await articleAPI.getPublicArticle(slug);
      setArticle(data);
      
      // Load related articles
      const related = await articleAPI.getPublicArticles({ 
        category: data.category, 
        limit: 3 
      });
      setRelatedArticles(related.articles.filter(a => a._id !== data._id).slice(0, 2));
    } catch (error) {
      console.error('Failed to load article:', error);
      navigate('/insight');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading-container" style={{ textAlign: 'center', padding: '100px' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary)' }}></i>
        <p>Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="not-found" style={{ textAlign: 'center', padding: '100px' }}>
        <h2>Article not found</h2>
        <Link to="/insight" className="btn btn-primary">Back to Insights</Link>
      </div>
    );
  }

  return (
    <>
      {/* Article Header */}
      <section className="article-header" style={{
        background: 'var(--bg-light)',
        padding: '160px 0 60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="article-breadcrumbs" style={{
              marginBottom: '24px',
              fontSize: '0.9rem'
            }}>
              <Link to="/" style={{ color: 'var(--text-light)' }}>Home</Link>
              <i className="fas fa-chevron-right" style={{ margin: '0 12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}></i>
              <Link to="/insight" style={{ color: 'var(--text-light)' }}>Insight</Link>
              <i className="fas fa-chevron-right" style={{ margin: '0 12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}></i>
              <span style={{ color: 'var(--text-body)' }}>{article.title}</span>
            </div>
            
            <span className="article-category" style={{
              display: 'inline-block',
              padding: '6px 16px',
              background: 'var(--primary)',
              color: 'var(--secondary)',
              fontSize: '0.8rem',
              fontWeight: '600',
              borderRadius: '20px',
              marginBottom: '20px'
            }}>{article.category}</span>
            
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>{article.title}</h1>
            
            <div className="article-meta" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
              color: 'var(--text-light)'
            }}>
              <span><i className="fas fa-user" style={{ marginRight: '8px' }}></i>{article.author}</span>
              <span><i className="fas fa-calendar" style={{ marginRight: '8px' }}></i>{formatDate(article.publishedAt)}</span>
              <span><i className="fas fa-eye" style={{ marginRight: '8px' }}></i>{article.views} views</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.featuredImage && (
        <section className="article-featured-image" style={{
          marginTop: '-40px',
          position: 'relative',
          zIndex: 2
        }}>
          <div className="container">
            <div style={{
              maxWidth: '1000px',
              margin: '0 auto',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <img 
                src={article.featuredImage} 
                alt={article.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="article-content-section" style={{
        padding: '60px 0'
      }}>
        <div className="container">
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="article-tags" style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: '32px'
              }}>
                {article.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '6px 14px',
                    background: 'var(--bg-light)',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    color: 'var(--text-body)'
                  }}>
                    <i className="fas fa-tag" style={{ marginRight: '6px', fontSize: '0.75rem' }}></i>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div 
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: 'var(--text-body)'
              }}
            />

            {/* Share */}
            <div className="article-share" style={{
              marginTop: '48px',
              paddingTop: '32px',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>Share this article:</span>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="share-btn"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#0077b5',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="share-btn"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#1da1f2',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="share-btn"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#4267B2',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <button 
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="share-btn"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--bg-light)',
                    color: 'var(--text-body)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  title="Copy link"
                >
                  <i className="fas fa-link"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="related-articles" style={{
          padding: '60px 0',
          background: 'var(--bg-light)'
        }}>
          <div className="container">
            <h2 style={{
              textAlign: 'center',
              marginBottom: '40px'
            }}>Related Articles</h2>
            <div className="related-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px'
            }}>
              {relatedArticles.map(related => (
                <article key={related._id} className="related-card" style={{
                  background: 'white',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <Link to={`/insight/${related.slug}`}>
                    <div style={{
                      height: '180px',
                      background: related.featuredImage 
                        ? `url(${related.featuredImage}) center/cover` 
                        : 'linear-gradient(135deg, var(--bg-light) 0%, #e8e8f0 100%)'
                    }}></div>
                  </Link>
                  <div style={{ padding: '20px' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'var(--primary)',
                      fontWeight: '600'
                    }}>{related.category}</span>
                    <h4 style={{ marginTop: '8px', fontSize: '1.1rem' }}>
                      <Link to={`/insight/${related.slug}`} style={{ color: 'inherit' }}>
                        {related.title}
                      </Link>
                    </h4>
                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-light)',
                      marginTop: '8px'
                    }}>
                      {formatDate(related.publishedAt)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Subscribe Section */}
      <SubscribeSection />
    </>
  );
}

export default InsightDetail;
