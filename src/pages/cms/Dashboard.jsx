import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleAPI, teamAPI, subscriptionAPI } from '../../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    articles: 0,
    publishedArticles: 0,
    teamMembers: 0,
    subscribers: 0
  });
  const [recentArticles, setRecentArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load articles
      const articlesData = await articleAPI.getArticles({ limit: 1000 });
      const publishedCount = articlesData.articles.filter(a => a.status === 'published').length;
      
      // Load team
      const teamData = await teamAPI.getTeam();
      
      // Load subscriptions
      const subsData = await subscriptionAPI.getSubscriptions({ limit: 1000 });
      
      setStats({
        articles: articlesData.total,
        publishedArticles: publishedCount,
        teamMembers: teamData.length,
        subscribers: subsData.total
      });
      
      setRecentArticles(articlesData.articles.slice(0, 5));
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      label: 'Total Articles', 
      value: stats.articles, 
      icon: 'fas fa-newspaper', 
      color: '#03D967',
      link: '/cms/articles'
    },
    { 
      label: 'Published', 
      value: stats.publishedArticles, 
      icon: 'fas fa-check-circle', 
      color: '#00d4ff',
      link: '/cms/articles'
    },
    { 
      label: 'Subscribers', 
      value: stats.subscribers, 
      icon: 'fas fa-envelope', 
      color: '#e74c3c',
      link: '/cms/subscriptions'
    },
  ];

  return (
    <div className="cms-dashboard" style={{ fontFamily: "'Inter', sans-serif" }}>
      <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', fontFamily: "'Inter', sans-serif" }}>Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="stats-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {statCards.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: `${stat.color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className={stat.icon} style={{
                fontSize: '1.5rem',
                color: stat.color
              }}></i>
            </div>
            <div>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b6b7b',
                margin: '0 0 4px'
              }}>{stat.label}</p>
              <p style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#1a1a2e',
                margin: 0
              }}>{loading ? '-' : stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions" style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <h3 style={{ marginBottom: '16px', fontSize: '1.1rem', fontFamily: "'Inter', sans-serif" }}>Quick Actions</h3>
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <Link to="/cms/articles/new" className="btn btn-primary">
            <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
            New Article
          </Link>
          <Link to="/cms/categories" className="btn btn-outline">
            <i className="fas fa-folder" style={{ marginRight: '8px' }}></i>
            Manage Categories
          </Link>
          <Link to="/cms/company" className="btn btn-outline">
            <i className="fas fa-building" style={{ marginRight: '8px' }}></i>
            Edit Company Info
          </Link>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="recent-articles" style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{ fontSize: '1.1rem', margin: 0, fontFamily: "'Inter', sans-serif" }}>Recent Articles</h3>
          <Link to="/cms/articles" style={{
            color: '#03D967',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontFamily: "'Inter', sans-serif"
          }}>
            View All <i className="fas fa-arrow-right" style={{ marginLeft: '4px' }}></i>
          </Link>
        </div>

        {loading ? (
          <p style={{ fontFamily: "'Inter', sans-serif" }}>Loading...</p>
        ) : recentArticles.length === 0 ? (
          <p style={{ color: '#6b6b7b', fontFamily: "'Inter', sans-serif" }}>No articles yet.</p>
        ) : (
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e8e8f0' }}>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '0.85rem', color: '#6b6b7b', fontWeight: '600', fontFamily: "'Inter', sans-serif" }}>Title</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '0.85rem', color: '#6b6b7b', fontWeight: '600', fontFamily: "'Inter', sans-serif" }}>Category</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '0.85rem', color: '#6b6b7b', fontWeight: '600', fontFamily: "'Inter', sans-serif" }}>Status</th>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '0.85rem', color: '#6b6b7b', fontWeight: '600', fontFamily: "'Inter', sans-serif" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentArticles.map(article => (
                <tr key={article._id} style={{ borderBottom: '1px solid #f0f0f5' }}>
                  <td style={{ padding: '12px' }}>
                    <Link to={`/cms/articles/edit/${article._id}`} style={{
                      color: '#1a1a2e',
                      textDecoration: 'none',
                      fontWeight: '500',
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      {article.title}
                    </Link>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 10px',
                      background: '#f0f2f5',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontFamily: "'Inter', sans-serif"
                    }}>{article.category}</span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      background: article.status === 'published' ? 'rgba(3, 217, 103, 0.1)' : 
                                 article.status === 'draft' ? 'rgba(243, 156, 18, 0.1)' : 'rgba(231, 76, 60, 0.1)',
                      color: article.status === 'published' ? '#02b555' : 
                             article.status === 'draft' ? '#d68910' : '#c0392b',
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      {article.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '0.9rem', color: '#6b6b7b', fontFamily: "'Inter', sans-serif" }}>
                    {new Date(article.createdAt).toLocaleDateString()}
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

export default Dashboard;
