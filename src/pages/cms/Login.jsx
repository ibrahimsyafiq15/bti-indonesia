import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/cms" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        navigate('/cms', { replace: true });
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#111E48',
      backgroundImage: 'linear-gradient(90deg, rgba(17, 30, 72, 0.95) 20%, rgba(42, 61, 122, 0.95) 100%), url(/cta-bg.jpg)',
      backgroundPosition: 'center, 100% 0',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundSize: 'cover, 50%',
      padding: '20px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'white',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        fontFamily: "'Inter', sans-serif"
      }}>
        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px',
          fontFamily: "'Inter', sans-serif"
        }}>
          <img 
            src="/logo.png" 
            alt="BTI" 
            style={{ 
              height: '48px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              margin: '0 auto'
            }}
          />
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1a1a2e',
            marginTop: '16px',
            fontFamily: "'Inter', sans-serif"
          }}>
            CMS Login
          </h1>
          <p style={{
            color: '#666',
            fontSize: '0.9rem',
            marginTop: '8px',
            fontFamily: "'Inter', sans-serif"
          }}>
            Sign in to manage your content
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#dc2626',
            fontSize: '0.9rem',
            fontFamily: "'Inter', sans-serif"
          }}>
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.9rem',
              fontWeight: '500',
              color: '#374151',
              fontFamily: "'Inter', sans-serif"
            }}>
              Email Address
            </label>
            <div style={{
              position: 'relative'
            }}>
              <i 
                className="fas fa-envelope"
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  fontSize: '1rem'
                }}
              ></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bti-indonesia.com"
                required
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 44px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Inter', sans-serif"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#03D967';
                  e.target.style.boxShadow = '0 0 0 3px rgba(3, 217, 103, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.9rem',
              fontWeight: '500',
              color: '#374151',
              fontFamily: "'Inter', sans-serif"
            }}>
              Password
            </label>
            <div style={{
              position: 'relative'
            }}>
              <i 
                className="fas fa-lock"
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  fontSize: '1rem'
                }}
              ></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 44px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Inter', sans-serif"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#03D967';
                  e.target.style.boxShadow = '0 0 0 3px rgba(3, 217, 103, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '14px',
              background: isSubmitting ? '#9ca3af' : '#03D967',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Signing in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: '#f3f4f6',
          borderRadius: '8px',
          fontSize: '0.85rem',
          color: '#6b7280',
          fontFamily: "'Inter', sans-serif"
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: '500' }}>
            <i className="fas fa-info-circle" style={{ marginRight: '6px' }}></i>
            Demo Credentials:
          </p>
          <p style={{ margin: '0 0 4px 0' }}>
            <strong>Email:</strong> admin@bti-indonesia.com
          </p>
          <p style={{ margin: 0 }}>
            <strong>Password:</strong> admin123
          </p>
        </div>

        {/* Back to Website */}
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif"
        }}>
          <a 
            href="/"
            style={{
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.2s',
              fontFamily: "'Inter', sans-serif"
            }}
            onMouseEnter={(e) => e.target.style.color = '#03D967'}
            onMouseLeave={(e) => e.target.style.color = '#6b7280'}
          >
            <i className="fas fa-arrow-left"></i>
            Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
