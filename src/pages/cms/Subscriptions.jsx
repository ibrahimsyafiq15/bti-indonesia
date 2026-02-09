import { useState, useEffect } from 'react';
import { subscriptionAPI } from '../../services/api';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ isActive: 'true' });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  useEffect(() => {
    loadSubscriptions();
  }, [pagination.currentPage, filter]);

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.currentPage,
        limit: 20,
        ...filter
      };
      const data = await subscriptionAPI.getSubscriptions(params);
      setSubscriptions(data.subscriptions);
      setPagination({
        currentPage: parseInt(data.currentPage),
        totalPages: data.totalPages,
        total: data.total
      });
    } catch (error) {
      console.error('Failed to load subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this subscriber?')) return;
    
    try {
      await subscriptionAPI.deleteSubscription(id);
      loadSubscriptions();
    } catch (error) {
      alert('Failed to delete: ' + error.message);
    }
  };

  const handleExport = () => {
    window.open(subscriptionAPI.exportCSV(), '_blank');
  };

  return (
    <div className="cms-subscriptions">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Subscriptions</h2>
          <p style={{ margin: '4px 0 0', color: '#6b6b7b', fontSize: '0.9rem' }}>
            {pagination.total} total subscribers
          </p>
        </div>
        <button onClick={handleExport} className="btn btn-primary">
          <i className="fas fa-download" style={{ marginRight: '8px' }}></i>
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div style={{
        background: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        marginBottom: '20px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center'
      }}>
        <select
          value={filter.isActive}
          onChange={(e) => {
            setFilter({ isActive: e.target.value });
            setPagination(prev => ({ ...prev, currentPage: 1 }));
          }}
          style={{
            padding: '10px 16px',
            border: '1px solid #e8e8f0',
            borderRadius: '8px',
            fontSize: '0.95rem'
          }}
        >
          <option value="">All</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
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
        ) : subscriptions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <i className="fas fa-inbox" style={{ fontSize: '3rem', color: '#e8e8f0', marginBottom: '16px' }}></i>
            <p>No subscriptions found.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fc' }}>
                <th style={{ padding: '16px', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Source</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Subscribed Date</th>
                <th style={{ padding: '16px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map(sub => (
                <tr key={sub._id} style={{ borderTop: '1px solid #f0f0f5' }}>
                  <td style={{ padding: '16px' }}>
                    <a href={`mailto:${sub.email}`} style={{ color: '#1a1a2e' }}>
                      <i className="fas fa-envelope" style={{ marginRight: '8px', color: '#6b6b7b' }}></i>
                      {sub.email}
                    </a>
                  </td>
                  <td style={{ padding: '16px' }}>{sub.name || '-'}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 10px',
                      background: '#f0f2f5',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      textTransform: 'capitalize'
                    }}>
                      {sub.source.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.9rem' }}>
                    {new Date(sub.subscribedAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      background: sub.isActive ? 'rgba(3, 217, 103, 0.1)' : 'rgba(231, 76, 60, 0.1)',
                      color: sub.isActive ? '#02b555' : '#c0392b'
                    }}>
                      {sub.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(sub._id)}
                      style={{
                        padding: '8px 12px',
                        background: '#ffebee',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#c0392b',
                        cursor: 'pointer'
                      }}
                      title="Remove"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {!loading && subscriptions.length > 0 && (
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid #f0f0f5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '0.9rem', color: '#6b6b7b' }}>
              Showing {subscriptions.length} of {pagination.total} subscribers
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

export default Subscriptions;
