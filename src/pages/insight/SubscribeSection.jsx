import { useState } from 'react';
import { subscriptionAPI } from '../../services/api';

function SubscribeSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setStatus({ type: 'error', message: 'Please enter your email address' });
      return;
    }

    try {
      setLoading(true);
      await subscriptionAPI.subscribe({
        email,
        name,
        source: 'insight_page'
      });
      setStatus({ type: 'success', message: 'Thank you for subscribing!' });
      setEmail('');
      setName('');
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.message || 'Failed to subscribe. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="subscribe-section" style={{
      padding: '80px 0',
      background: '#111E48',
      backgroundImage: 'linear-gradient(90deg, rgba(17, 30, 72, 1) 20%, rgba(42, 61, 122, 1) 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/cta-bg.jpg)',
        backgroundPosition: '100%, 0 0',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '50%',
        opacity: 0.3,
        pointerEvents: 'none'
      }}></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'rgba(3, 217, 103, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <i className="fas fa-envelope-open-text" style={{
              fontSize: '28px',
              color: 'var(--primary)'
            }}></i>
          </div>
          
          <h2 style={{
            color: 'white',
            fontSize: '2rem',
            marginBottom: '12px'
          }}>Subscribe to Our Insights</h2>
          
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1.1rem',
            marginBottom: '32px'
          }}>
            Get the latest articles, research, and perspectives delivered straight to your inbox.
          </p>

          {status.message && (
            <div style={{
              padding: '12px 20px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px',
              background: status.type === 'success' ? 'rgba(3, 217, 103, 0.2)' : 'rgba(231, 76, 60, 0.2)',
              color: status.type === 'success' ? '#4eed91' : '#ff6b6b'
            }}>
              <i className={`fas fa-${status.type === 'success' ? 'check-circle' : 'exclamation-circle'}`} style={{ marginRight: '8px' }}></i>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  flex: '1',
                  minWidth: '200px',
                  padding: '14px 20px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: '2',
                  minWidth: '250px',
                  padding: '14px 20px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{
                width: '100%',
                maxWidth: '300px',
                margin: '0 auto',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? (
                <><i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Subscribing...</>
              ) : (
                <><i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i> Subscribe Now</>
              )}
            </button>
          </form>

          <p style={{
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.5)',
            marginTop: '20px'
          }}>
            <i className="fas fa-lock" style={{ marginRight: '6px' }}></i>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SubscribeSection;
