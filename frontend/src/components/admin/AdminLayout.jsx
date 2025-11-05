import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaBriefcase,
  FaUsers,
  FaFileAlt,
  FaEnvelope,
  FaCog,
  FaHome
} from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/jobs', label: 'Jobs', icon: FaBriefcase },
    { path: '/admin/applications', label: 'Applications', icon: FaFileAlt },
    { path: '/admin/contacts', label: 'Contacts', icon: FaUsers },
    { path: '/admin/newsletter', label: 'Newsletter', icon: FaEnvelope },
    { path: '/admin/settings', label: 'Settings', icon: FaCog }
  ];

  const sidebarWidth = '260px';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', position: 'relative' }}>
      {/* Sidebar - Fixed Position */}
      <aside
        className={`text-white ${sidebarOpen ? 'd-block' : 'd-none d-md-block'}`}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: sidebarOpen ? sidebarWidth : '0',
          height: '100vh',
          backgroundColor: '#123964',
          transition: 'width 0.3s ease',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}
      >
        {/* Sidebar Header */}
        <div
          className="p-4 d-flex justify-content-between align-items-center"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            minHeight: '70px',
            flexShrink: 0
          }}
        >
          <h5 className="mb-0 fw-bold" style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>
            Admin Panel
          </h5>
          <button
            className="btn btn-sm text-white d-md-none border-0"
            onClick={() => setSidebarOpen(false)}
            style={{ padding: '4px 8px' }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow-1 p-3" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
          <Link
            to="/admin/dashboard"
            className={`d-flex align-items-center gap-3 p-3 mb-2 text-decoration-none rounded`}
            style={{
              transition: 'all 0.2s ease',
              backgroundColor: location.pathname === '/admin/dashboard' ? 'rgba(255,255,255,0.15)' : 'transparent',
              color: 'white',
              borderRadius: '8px'
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== '/admin/dashboard') {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== '/admin/dashboard') {
                e.currentTarget.style.backgroundColor = 'transparent';
              } else {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
              }
            }}
          >
            <FaHome style={{ fontSize: '1rem' }} />
            <span style={{ fontSize: '0.95rem', fontWeight: location.pathname === '/admin/dashboard' ? '600' : '400' }}>
              Dashboard
            </span>
          </Link>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="d-flex align-items-center gap-3 p-3 mb-2 text-decoration-none rounded"
                style={{
                  transition: 'all 0.2s ease',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                  color: 'white',
                  borderRadius: '8px'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  } else {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                  }
                }}
              >
                <Icon style={{ fontSize: '1rem' }} />
                <span style={{ fontSize: '0.95rem', fontWeight: isActive ? '600' : '400' }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button - Fixed at bottom */}
        <div
          className="p-3"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            flexShrink: 0
          }}
        >
          <button
            className="w-100 d-flex align-items-center justify-content-center gap-2 border-0 rounded"
            onClick={handleLogout}
            style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: 'white',
              fontSize: '0.95rem',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              borderRadius: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <FaSignOutAlt style={{ fontSize: '0.9rem' }} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content - Scrollable */}
      <div
        className="d-flex flex-column"
        style={{
          minHeight: '100vh',
          marginLeft: !isMobile && sidebarOpen ? sidebarWidth : '0',
          transition: 'margin-left 0.3s ease'
        }}
      >
        {/* Header - Fixed */}
        <header
          className="bg-white shadow-sm"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            minHeight: '70px',
            borderBottom: '1px solid #e9ecef'
          }}
        >
          <div className="h-100 d-flex align-items-center justify-content-between px-4">
            <button
              className="btn btn-link d-md-none text-dark p-2"
              onClick={() => setSidebarOpen(true)}
              style={{ textDecoration: 'none' }}
            >
              <FaBars style={{ fontSize: '1.2rem' }} />
            </button>
            <div className="ms-auto d-flex align-items-center gap-3">
              <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                Welcome, <strong style={{ color: '#123964' }}>{admin?.username || 'Admin'}</strong>
              </span>
            </div>
          </div>
        </header>

        {/* Page Content - Scrollable */}
        <main style={{ backgroundColor: '#f8f9fa', flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {children}
        </main>
      </div>

      {/* Mobile Overlay - When sidebar is open on mobile */}
      {sidebarOpen && isMobile && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
