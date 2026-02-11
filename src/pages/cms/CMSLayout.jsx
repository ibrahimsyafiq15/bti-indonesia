import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function CMSLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const menuItems = [
    { path: '/cms', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { path: '/cms/articles', icon: 'fas fa-newspaper', label: 'Articles' },
    { path: '/cms/team', icon: 'fas fa-users', label: 'Our Team' },
    { path: '/cms/company', icon: 'fas fa-building', label: 'Company' },
    { path: '/cms/subscriptions', icon: 'fas fa-envelope', label: 'Subscriptions' },
  ];

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/cms/login', { replace: true });
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f2f5'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#666'
        }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '16px' }}></i>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/cms/login" replace />;
  }

  return (
    <div className="cms-layout" style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      {/* Sidebar */}
      <aside className="cms-sidebar" style={{
        width: sidebarOpen ? '260px' : '70px',
        background: '#1a1a2e',
        color: 'white',
        transition: 'width 0.3s ease',
        position: 'fixed',
        height: '100vh',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Logo */}
        <div className="cms-logo" style={{
          padding: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarOpen ? 'flex-start' : 'center',
          height: '70px'
        }}>
          <img 
            src={sidebarOpen ? "/logo-footer.png" : "/logo-icon.png"} 
            alt="BTI" 
            style={{ 
              height: sidebarOpen ? '36px' : '40px', 
              width: 'auto',
              objectFit: 'contain',
              maxWidth: sidebarOpen ? 'none' : '40px'
            }}
          />
          {sidebarOpen && (
            <span style={{
              marginLeft: '12px',
              fontWeight: '600',
              fontSize: '1.1rem'
            }}>CMS</span>
          )}
        </div>

        {/* Menu */}
        <nav className="cms-menu" style={{
          flex: 1,
          padding: '16px 0',
          overflowY: 'auto'
        }}>
          {menuItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/cms'}
              className={({ isActive }) => `cms-menu-item ${isActive ? 'active' : ''}`}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                padding: sidebarOpen ? '12px 20px' : '12px',
                margin: '4px 12px',
                borderRadius: '8px',
                color: isActive ? '#03D967' : 'rgba(255,255,255,0.7)',
                background: isActive ? 'rgba(3, 217, 103, 0.1)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.2s',
                justifyContent: sidebarOpen ? 'flex-start' : 'center'
              })}
            >
              <i className={item.icon} style={{
                fontSize: '1.1rem',
                width: '24px',
                textAlign: 'center'
              }}></i>
              {sidebarOpen && (
                <span style={{ marginLeft: '12px', fontSize: '0.95rem' }}>
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="cms-sidebar-bottom" style={{
          padding: '16px',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          {/* Collapse Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              width: '100%',
              padding: '10px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}
          >
            <i className={`fas fa-chevron-${sidebarOpen ? 'left' : 'right'}`}></i>
            {sidebarOpen && <span>Collapse</span>}
          </button>
          
          {/* Logout Button - REMOVED, moved to user dropdown */}
          
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
              padding: '10px',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            <i className="fas fa-external-link-alt" style={{ width: '20px', textAlign: 'center' }}></i>
            {sidebarOpen && <span style={{ marginLeft: '8px' }}>View Website</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="cms-main" style={{
        flex: 1,
        marginLeft: sidebarOpen ? '260px' : '70px',
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh'
      }}>
        {/* Top Header */}
        <header className="cms-header" style={{
          height: '70px',
          background: 'white',
          borderBottom: '1px solid #e8e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 30px',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}>
          <h1 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1a1a2e'
          }}>BTI Content Management</h1>
          
          {/* User Dropdown */}
          <div 
            ref={userMenuRef}
            style={{ position: 'relative' }}
          >
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '6px 16px',
                background: '#f0f2f5',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e8e8f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f0f2f5';
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#03D967',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '0.9rem',
                fontFamily: "'Inter', sans-serif"
              }}>
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}>
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: '#1a1a2e',
                  fontFamily: "'Inter', sans-serif"
                }}>{user?.name || 'Administrator'}</span>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  fontFamily: "'Inter', sans-serif"
                }}>{user?.email || 'admin@bti.co.id'}</span>
              </div>
              <i 
                className={`fas fa-chevron-${userMenuOpen ? 'up' : 'down'}`}
                style={{ 
                  fontSize: '0.75rem', 
                  color: '#6b7280',
                  marginLeft: '8px'
                }}
              ></i>
            </button>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                minWidth: '220px',
                zIndex: 100,
                overflow: 'hidden',
                fontFamily: "'Inter', sans-serif"
              }}>
                {/* API Status */}
                <a 
                  href="http://localhost:5000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px',
                    color: '#1a1a2e',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontFamily: "'Inter', sans-serif",
                    transition: 'background 0.2s',
                    borderBottom: '1px solid #f0f0f5'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f8f9fc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <i className="fas fa-server" style={{ color: '#03D967', width: '20px' }}></i>
                  API Status
                </a>

                {/* Divider */}
                <div style={{ height: '1px', background: '#f0f0f5' }}></div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'transparent',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.9rem',
                    fontFamily: "'Inter', sans-serif",
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fef2f2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <i className="fas fa-sign-out-alt" style={{ width: '20px' }}></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div className="cms-content" style={{
          padding: '30px'
        }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default CMSLayout;
