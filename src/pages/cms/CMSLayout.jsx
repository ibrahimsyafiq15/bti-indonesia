import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

function CMSLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/cms', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { path: '/cms/articles', icon: 'fas fa-newspaper', label: 'Articles' },
    { path: '/cms/team', icon: 'fas fa-users', label: 'Our Team' },
    { path: '/cms/company', icon: 'fas fa-building', label: 'Company' },
    { path: '/cms/subscriptions', icon: 'fas fa-envelope', label: 'Subscriptions' },
  ];

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
            src="/logo-footer.png" 
            alt="BTI" 
            style={{ height: '36px', width: 'auto' }}
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
              gap: '8px'
            }}
          >
            <i className={`fas fa-chevron-${sidebarOpen ? 'left' : 'right'}`}></i>
            {sidebarOpen && <span>Collapse</span>}
          </button>
          
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
              padding: '10px',
              marginTop: '8px',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            <i className="fas fa-external-link-alt"></i>
            {sidebarOpen && <span style={{ marginLeft: '10px' }}>View Website</span>}
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
          
          <div className="cms-header-actions" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <a 
              href="http://localhost:5000" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                padding: '8px 16px',
                background: '#f0f2f5',
                borderRadius: '6px',
                color: '#1a1a2e',
                textDecoration: 'none',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <i className="fas fa-server"></i>
              API Status
            </a>
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
