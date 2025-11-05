import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';
import footerLogo from '../assets/techworth-logo.png';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      setTimeout(() => {
        setStatus(null);
        setMessage('');
      }, 3000);
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/newsletter`, { email });
      
      if (response.data.success) {
        setStatus('success');
        setMessage(response.data.message || 'Successfully subscribed!');
        setEmail('');
        setTimeout(() => {
          setStatus(null);
          setMessage('');
        }, 5000);
      }
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Failed to subscribe. Please try again.');
      setTimeout(() => {
        setStatus(null);
        setMessage('');
      }, 5000);
    }
  };

  return (
    <footer className="bg-light" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container mx-auto px-4 py-3">
        <div className="row g-3">
          {/* Brand Description */}
          <div className="col-lg-3 mb-3 mb-lg-0">
            <div className="mb-2">
              <img 
                src={footerLogo} 
                alt="Techworth" 
                className="logo-crisp"
                style={{ 
                  height: '90px', 
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
            <p className="text-muted small" style={{ textAlign: 'justify' }}>
              Empowering enterprises with next-generation IT services, cloud solutions, and digital transformation strategies for sustainable business growth.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 mb-3 mb-lg-0" style={{ paddingLeft: '30px' }}>
            <h6 className="fw-semibold mb-3 text-dark">Quick Links</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link 
                  to="/" 
                  className="text-decoration-none footer-quick-link"
                  style={{ 
                    color: '#2E4374',
                    display: 'inline-block',
                    textDecoration: 'none',
                    position: 'relative'
                  }}
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/about" 
                  className="text-decoration-none footer-quick-link"
                  style={{ 
                    color: '#2E4374',
                    display: 'inline-block',
                    textDecoration: 'none',
                    position: 'relative'
                  }}
                >
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/services" 
                  className="text-decoration-none footer-quick-link"
                  style={{ 
                    color: '#2E4374',
                    display: 'inline-block',
                    textDecoration: 'none',
                    position: 'relative'
                  }}
                >
                  Services
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/careers" 
                  className="text-decoration-none footer-quick-link"
                  style={{ 
                    color: '#2E4374',
                    display: 'inline-block',
                    textDecoration: 'none',
                    position: 'relative'
                  }}
                >
                  Careers
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/contact" 
                  className="text-decoration-none footer-quick-link"
                  style={{ 
                    color: '#2E4374',
                    display: 'inline-block',
                    textDecoration: 'none',
                    position: 'relative'
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 mb-3 mb-lg-0">
            <h6 className="fw-semibold mb-3 text-dark">Contact Info</h6>
            <ul className="list-unstyled small">
              <li className="mb-2 d-flex align-items-start gap-2">
                <FaEnvelope className="mt-1 text-dark" />
                <a href="mailto:techworh.info" className="text-muted text-decoration-none">techworh.info</a>
              </li>
              <li className="mb-2 d-flex align-items-start gap-2">
                <FaPhone className="mt-1 text-dark" />
                <div className="d-flex flex-column">
                  <a href="tel:+919949981161" className="text-muted text-decoration-none mb-1">+91 9949981161</a>
                  <a href="tel:+447448181817" className="text-muted text-decoration-none">+44 7448181817</a>
                </div>
              </li>
              <li className="mb-2 d-flex align-items-start gap-2">
                <FaMapMarkerAlt className="mt-1 text-dark" />
                <span className="text-muted">Tumu's, Rajani Residency #36, opposite ITC limited, Bachupally, Hyderabad, Telangana 502325</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4">
            <h6 className="fw-semibold mb-3 text-dark">Newsletter</h6>
            <p className="text-muted small mb-3">
              Stay updated with the latest insights from Techworth.
            </p>
            <form onSubmit={handleSubscribe} className="d-flex flex-column gap-2 mb-3">
              <div className="d-flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control form-control-sm rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  style={{ 
                    backgroundColor: 'white', 
                    border: status === 'error' ? '1px solid #dc3545' : status === 'success' ? '1px solid #28a745' : '1px solid #dee2e6', 
                    color: '#212529' 
                  }}
                />
                <button 
                  type="submit" 
                  className="btn btn-sm rounded px-3"
                  disabled={status === 'loading'}
                  style={{ 
                    backgroundColor: '#123964',
                    color: '#ffffff',
                    border: '1px solid #123964',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    minWidth: '100px'
                  }}
                  onMouseEnter={(e) => {
                    if (status !== 'loading') {
                      e.currentTarget.style.backgroundColor = '#0d2b4d';
                      e.currentTarget.style.borderColor = '#0d2b4d';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(18, 57, 100, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (status !== 'loading') {
                      e.currentTarget.style.backgroundColor = '#123964';
                      e.currentTarget.style.borderColor = '#123964';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {status === 'loading' ? '...' : 'Subscribe'}
                </button>
              </div>
              {message && (
                <div 
                  className={`small d-flex align-items-center gap-2 ${status === 'success' ? 'text-success' : 'text-danger'}`}
                  style={{ 
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: status === 'success' ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)'
                  }}
                >
                  {status === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
                  {message}
                </div>
              )}
            </form>
            <div className="d-flex gap-3">
              <a href="https://linkedin.com/company/techworth" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-tech-primary transition">
                <FaLinkedin size={20} />
              </a>
              <a href="https://twitter.com/techworth" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-tech-primary transition">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com/techworth" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-tech-primary transition">
                <FaInstagram size={20} />
              </a>
              <a href="https://facebook.com/techworth" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-tech-primary transition">
                <FaFacebook size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-top py-2" style={{ borderColor: '#dee2e6' }}>
        <div className="container mx-auto px-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-muted">
            <div>© 2025 Techworth Pvt. Ltd. All Rights Reserved.</div>
            <div className="d-flex gap-3">
              <Link 
                to="/privacy" 
                className="text-muted text-decoration-none"
                style={{ 
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#2E4374';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Privacy Policy
              </Link>
              <span className="text-muted">|</span>
              <Link 
                to="/terms" 
                className="text-muted text-decoration-none"
                style={{ 
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#2E4374';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


