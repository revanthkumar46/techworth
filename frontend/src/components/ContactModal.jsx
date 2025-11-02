import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaFileAlt, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';

export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    subject: '',
    phone: '',
    message: '' 
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (form.phone && (form.phone.length < 7 || form.phone.length > 20)) {
      newErrors.phone = 'Phone must be between 7 and 20 characters';
    }
    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setStatus('loading');
    try {
      const url = (process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/contact';
      await axios.post(url, form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', phone: '', message: '' });
      setTimeout(() => {
        setStatus(null);
        onClose();
      }, 2000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus(null), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            position: 'relative'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: '#6c757d',
              fontSize: '1.5rem',
              zIndex: 10,
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f1f5f9';
              e.target.style.color = '#123964';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#6c757d';
            }}
            aria-label="Close"
          >
            <FaTimes />
          </button>

          {/* Modal Content */}
          <div style={{ padding: '2rem' }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-4"
            >
              <h2 className="fw-bold mb-2" style={{ fontSize: '1.5rem', color: '#123964' }}>
                Get In Touch
              </h2>
              <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                Fill out the form below and we'll get back to you soon.
              </p>
            </motion.div>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Name */}
              <div>
                <label className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.9rem', fontWeight: '600', color: '#123964' }}>
                  <FaUser style={{ fontSize: '0.9rem' }} />
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: errors.name ? '2px solid #dc3545' : '1px solid #e1e5eb',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#123964'}
                  onBlur={(e) => e.target.style.borderColor = errors.name ? '#dc3545' : '#e1e5eb'}
                />
                {errors.name && (
                  <p className="text-danger mb-0 mt-1" style={{ fontSize: '0.8rem' }}>{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.9rem', fontWeight: '600', color: '#123964' }}>
                  <FaEnvelope style={{ fontSize: '0.9rem' }} />
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: errors.email ? '2px solid #dc3545' : '1px solid #e1e5eb',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#123964'}
                  onBlur={(e) => e.target.style.borderColor = errors.email ? '#dc3545' : '#e1e5eb'}
                />
                {errors.email && (
                  <p className="text-danger mb-0 mt-1" style={{ fontSize: '0.8rem' }}>{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.9rem', fontWeight: '600', color: '#123964' }}>
                  <FaPhone style={{ fontSize: '0.9rem' }} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  placeholder="+91 123 456 7890"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: errors.phone ? '2px solid #dc3545' : '1px solid #e1e5eb',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#123964'}
                  onBlur={(e) => e.target.style.borderColor = errors.phone ? '#dc3545' : '#e1e5eb'}
                />
                {errors.phone && (
                  <p className="text-danger mb-0 mt-1" style={{ fontSize: '0.8rem' }}>{errors.phone}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.9rem', fontWeight: '600', color: '#123964' }}>
                  <FaFileAlt style={{ fontSize: '0.9rem' }} />
                  Subject <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleInputChange}
                  placeholder="What is this regarding?"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: errors.subject ? '2px solid #dc3545' : '1px solid #e1e5eb',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#123964'}
                  onBlur={(e) => e.target.style.borderColor = errors.subject ? '#dc3545' : '#e1e5eb'}
                />
                {errors.subject && (
                  <p className="text-danger mb-0 mt-1" style={{ fontSize: '0.8rem' }}>{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.9rem', fontWeight: '600', color: '#123964' }}>
                  <FaPaperPlane style={{ fontSize: '0.9rem' }} />
                  Message <span className="text-danger">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help you..."
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: errors.message ? '2px solid #dc3545' : '1px solid #e1e5eb',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#123964'}
                  onBlur={(e) => e.target.style.borderColor = errors.message ? '#dc3545' : '#e1e5eb'}
                />
                {errors.message && (
                  <p className="text-danger mb-0 mt-1" style={{ fontSize: '0.8rem' }}>{errors.message}</p>
                )}
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="d-flex align-items-center gap-2 p-3"
                  style={{
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}
                >
                  <FaCheckCircle />
                  Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="d-flex align-items-center gap-2 p-3"
                  style={{
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}
                >
                  <FaExclamationCircle />
                  Something went wrong. Please try again.
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                style={{
                  backgroundColor: '#123964',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  marginTop: '0.5rem'
                }}
              >
                {status === 'loading' ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane style={{ fontSize: '0.85rem' }} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

