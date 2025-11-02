import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FaCode, FaMobileAlt, FaCloud, FaBug, FaSort, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/techworth-logo-only.png';
import logoName from '../assets/techworth-logo-name.png';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [isServicesHover, setIsServicesHover] = useState(false);
  const [hoveredNav, setHoveredNav] = useState('');
  const [hoveredServiceKey, setHoveredServiceKey] = useState('');

  const serviceLinks = [
    { label: 'Web Development', to: '/services/web-development', Icon: FaCode },
    { label: 'Mobile Apps', to: '/services/mobile-apps', Icon: FaMobileAlt },
    { label: 'Cloud Solutions', to: '/services/cloud-solutions', Icon: FaCloud },
    { label: 'Testing & QA', to: '/services/testing-qa', Icon: FaBug }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="d-flex align-items-center justify-content-between py-3">
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <img
              src={logo}
              alt="Techworth Logo"
              style={{ height: '40px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
            <img
              src={logoName}
              alt="Techworth"
              style={{ height: '32px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </Link>

          <div className="d-none d-lg-flex align-items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded ${isActive ? 'text-tech-primary fw-semibold' : 'text-dark'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded ${isActive ? 'text-tech-primary fw-semibold' : 'text-dark'}`
              }
            >
              About
            </NavLink>
            <div
              className="position-relative"
              onMouseEnter={() => {
                setShowServices(true);
                setIsServicesHover(true);
              }}
              onMouseLeave={() => {
                setShowServices(false);
                setIsServicesHover(false);
              }}
            >
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `text-decoration-none px-3 py-2 rounded d-inline-flex align-items-center ${
                    isActive ? 'fw-semibold' : ''
                  }`
                }
                style={{ color: 'inherit' }}
              >
                <span className={isServicesHover ? 'text-tech-primary' : 'text-dark'}>Services</span>
                <FaSort className={`ms-2 ${isServicesHover ? 'text-dark' : 'text-tech-primary'}`} />
              </NavLink>
              {showServices && (
                <div
                  className="position-absolute bg-white shadow-sm py-2"
                  style={{ minWidth: '240px', top: '100%', left: 0, borderRadius: '8px' }}
                >
                  {serviceLinks.map(({ label, to, Icon }) => {
                    const isHovered = hoveredServiceKey === label;
                    return (
                      <Link
                        key={label}
                        to={to}
                        onMouseEnter={() => setHoveredServiceKey(label)}
                        onMouseLeave={() => setHoveredServiceKey('')}
                        className="d-flex align-items-center gap-2 px-3 py-2 text-decoration-none"
                        style={{
                          background: isHovered 
                            ? 'rgba(100, 181, 246, 0.25)' 
                            : 'transparent',
                          backdropFilter: isHovered ? 'blur(10px)' : 'none',
                          WebkitBackdropFilter: isHovered ? 'blur(10px)' : 'none',
                          border: isHovered 
                            ? '1px solid rgba(100, 181, 246, 0.3)' 
                            : '1px solid transparent',
                          boxShadow: isHovered 
                            ? '0 4px 16px 0 rgba(100, 181, 246, 0.15)' 
                            : 'none',
                          color: isHovered ? '#123964' : '#1f2937',
                          transition: 'all 0.2s ease',
                          borderRadius: '8px',
                          margin: '2px 4px'
                        }}
                      >
                        <Icon style={{ color: isHovered ? '#123964' : '#123964', transition: 'color 0.2s ease' }} />
                        <span style={{ color: isHovered ? '#123964' : '#1f2937', transition: 'color 0.2s ease', fontWeight: isHovered ? '500' : '400' }}>{label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            <NavLink
              to="/careers"
              className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded ${isActive ? 'text-tech-primary fw-semibold' : 'text-dark'}`
              }
            >
              Careers
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded ${isActive ? 'text-tech-primary fw-semibold' : 'text-dark'}`
              }
              onMouseEnter={() => setHoveredNav('contact')}
              onMouseLeave={() => setHoveredNav('')}
              style={{ textDecoration: hoveredNav === 'contact' ? 'underline' : 'none' }}
            >
              Contact
            </NavLink>
          </div>

          <button
            className="d-lg-none btn border-0 p-2"
            onClick={() => setShowMenu((prev) => !prev)}
            aria-label="Toggle navigation"
            style={{ background: '#f1f5f9', borderRadius: '8px', color: '#123964' }}
          >
            {showMenu ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {showMenu && (
          <div className="d-lg-none mb-3 bg-white rounded shadow-sm" style={{ border: '1px solid #e2e8f0' }}>
            <NavLink
              to="/"
              end
              className="d-block text-decoration-none px-3 py-2 text-dark"
              onClick={() => setShowMenu(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="d-block text-decoration-none px-3 py-2 text-dark"
              onClick={() => setShowMenu(false)}
            >
              About
            </NavLink>
            <div className="px-3 py-2">
              <div className="text-muted small mb-1">Services</div>
              {serviceLinks.map(({ label, to, Icon }) => (
                <Link
                  key={`mobile-${label}`}
                  to={to}
                  className="d-flex align-items-center gap-2 text-decoration-none py-1"
                  style={{ color: '#1f2937' }}
                  onClick={() => setShowMenu(false)}
                >
                  <Icon style={{ color: '#123964' }} /> <span>{label}</span>
                </Link>
              ))}
              <NavLink
                to="/services"
                className="d-block text-decoration-none text-dark mt-1"
                onClick={() => setShowMenu(false)}
              >
                All Services
              </NavLink>
            </div>
            <NavLink
              to="/careers"
              className="d-block text-decoration-none px-3 py-2 text-dark"
              onClick={() => setShowMenu(false)}
            >
              Careers
            </NavLink>
            <NavLink
              to="/contact"
              className="d-block text-decoration-none px-3 py-2 text-dark"
              onClick={() => setShowMenu(false)}
            >
              Contact
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
}



