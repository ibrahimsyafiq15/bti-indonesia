import { useState, useEffect } from 'react';
import { subscriptionAPI } from '../../services/api';
import SuccessModal from '../../components/SuccessModal';
import ConfirmModal from '../../components/ConfirmModal';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ isActive: 'true' });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });
  const [successModal, setSuccessModal] = useState({ isOpen: false, title: '', message: '' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, subscriptionId: null });

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
      console.log('[Subscriptions] Loading subscriptions with params:', params);
      const data = await subscriptionAPI.getSubscriptions(params);
      console.log('[Subscriptions] Data received:', data);
      
      // Map snake_case to camelCase
      const mappedSubscriptions = data.subscriptions.map(sub => ({
        _id: sub.id,
        email: sub.email,
        name: sub.name,
        source: sub.source,
        isActive: sub.is_active,
        subscribedAt: sub.subscribed_at,
        unsubscribedAt: sub.unsubscribed_at
      }));
      
      console.log('[Subscriptions] Mapped subscriptions:', mappedSubscriptions);
      setSubscriptions(mappedSubscriptions);
      setPagination({
        currentPage: parseInt(data.currentPage),
        totalPages: data.totalPages,
        total: data.total
      });
    } catch (error) {
      console.error('[Subscriptions] Error loading subscriptions:', error);
      console.error('[Subscriptions] Error details:', error.message, error.stack);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setConfirmModal({ isOpen: true, subscriptionId: id });
  };

  const confirmDelete = async () => {
    try {
      await subscriptionAPI.deleteSubscription(confirmModal.subscriptionId);
      setConfirmModal({ isOpen: false, subscriptionId: null });
      setSuccessModal({
        isOpen: true,
        title: 'Success',
        message: 'Subscriber removed successfully!'
      });
      loadSubscriptions();
    } catch (error) {
      alert('Failed to delete: ' + error.message);
    }
  };

  const handleExport = () => {
    window.open(subscriptionAPI.exportCSV(), '_blank');
  };

  return (
    <div className="cms-subscriptions" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', margin: 0, fontFamily: "'Inter', sans-serif" }}>Subscriptions</h2>
          <p style={{ margin: '4px 0 0', color: '#6b6b7b', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif" }}>
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
        alignItems: 'center',
        fontFamily: "'Inter', sans-serif"
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
            fontSize: '0.95rem',
            fontFamily: "'Inter', sans-serif"
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
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        fontFamily: "'Inter', sans-serif"
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', fontFamily: "'Inter', sans-serif" }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#03D967' }}></i>
          </div>
        ) : subscriptions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', fontFamily: "'Inter', sans-serif" }}>
            <i className="fas fa-inbox" style={{ fontSize: '3rem', color: '#e8e8f0', marginBottom: '16px' }}></i>
            <p style={{ fontFamily: "'Inter', sans-serif" }}>No subscriptions found.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fc' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontFamily: "'Inter', sans-serif" }}>Email</th>
                <th style={{ padding: '16px', textAlign: 'left', fontFamily: "'Inter', sans-serif" }}>Name</th>
                <th style={{ padding: '16px', textAlign: 'left', fontFamily: "'Inter', sans-serif" }}>Source</th>
                <th style={{ padding: '16px', textAlign: 'left', fontFamily: "'Inter', sans-serif" }}>Subscribed Date</th>
                <th style={{ padding: '16px', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, index) => (
                <tr key={sub.id || sub._id || `sub-${index}`} style={{ borderTop: '1px solid #f0f0f5' }}>
                  <td style={{ padding: '16px', fontFamily: "'Inter', sans-serif" }}>
                    <a href={`mailto:${sub.email}`} style={{ color: '#1a1a2e', fontFamily: "'Inter', sans-serif" }}>
                      <i className="fas fa-envelope" style={{ marginRight: '8px', color: '#6b6b7b' }}></i>
                      {sub.email}
                    </a>
                  </td>
                  <td style={{ padding: '16px', fontFamily: "'Inter', sans-serif" }}>{sub.name || '-'}</td>
                  <td style={{ padding: '16px', fontFamily: "'Inter', sans-serif" }}>
                    <span style={{
                      padding: '4px 10px',
                      background: '#f0f2f5',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      textTransform: 'capitalize',
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      {sub.source.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif" }}>
                    {new Date(sub.subscribedAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      background: sub.isActive ? 'rgba(3, 217, 103, 0.1)' : 'rgba(231, 76, 60, 0.1)',
                      color: sub.isActive ? '#02b555' : '#c0392b',
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      {sub.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
                    <button
                      onClick={() => handleDelete(sub._id)}
                      style={{
                        padding: '8px 12px',
                        background: '#ffebee',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#c0392b',
                        cursor: 'pointer',
                        fontFamily: "'Inter', sans-serif"
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
            alignItems: 'center',
            fontFamily: "'Inter', sans-serif"
          }}>
            <span style={{ fontSize: '0.9rem', color: '#6b6b7b', fontFamily: "'Inter', sans-serif" }}>
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
        onClose={() => setConfirmModal({ isOpen: false, subscriptionId: null })}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to remove this subscriber?"
      />
    </div>
  );
}

export default Subscriptions;
