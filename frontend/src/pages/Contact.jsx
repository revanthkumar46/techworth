import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import axios from 'axios';
import contactHero from '../assets/contact-us-hero.jpg';
import locationGif from '../assets/location.gif';
import phoneGif from '../assets/call-contact.gif';
import emailGif from '../assets/email.gif';
import timeGif from '../assets/time.gif';

export default function Contact() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    subject: '',
    phone: '',
    message: '' 
  });
  const [status, setStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const url = (process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/contact';
      await axios.post(url, form);
      setStatus('ok');
      setForm({ name: '', email: '', subject: '', phone: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <div className="">
      {/* Hero Section */}
      <section
        className="position-relative d-flex align-items-center justify-content-center"
        style={{
          minHeight: '400px',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        {/* Background Image */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${contactHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1
          }}
        ></div>
        
        {/* Overlay Shading */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: 'linear-gradient(135deg, rgba(10, 38, 71, 0.9) 0%, rgba(18, 57, 100, 0.8) 50%, rgba(14, 54, 92, 0.85) 100%)',
            zIndex: 2
          }}
        ></div>
        
        {/* Hero Content */}
        <motion.div
          className="position-relative text-center text-white px-4"
          style={{ zIndex: 3, maxWidth: '800px', marginTop: '-180px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="fw-bold mb-0" style={{ fontSize: '2.5rem', letterSpacing: '1px' }}>
            Get In Touch
          </h1>
        </motion.div>
      </section>

      {/* Contact Information Section */}
      <section className="py-5">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="row g-4 text-center text-md-start"
          >
            {[
              {
                gif: locationGif,
                title: 'Visit Us',
                content: (
                  <p className="text-muted mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                    Techworth Private Limited<br />
                    123 Business Park, Tech Hub<br />
                    City, State 12345, India
                  </p>
                )
              },
              {
                gif: phoneGif,
                title: 'Call Us',
                content: (
                  <div className="d-flex flex-column gap-1">
                    <a href="tel:+911234567890" className="text-decoration-none" style={{ color: '#6c757d', fontSize: '0.95rem' }}>+91 123 456 7890</a>
                    <a href="tel:+911234567891" className="text-decoration-none" style={{ color: '#6c757d', fontSize: '0.95rem' }}>+91 123 456 7891</a>
                  </div>
                )
              },
              {
                gif: emailGif,
                title: 'Email Us',
                content: (
                  <div className="d-flex flex-column gap-1">
                    <a href="mailto:info@techworth.co.in" className="text-decoration-none" style={{ color: '#6c757d', fontSize: '0.95rem' }}>info@techworth.co.in</a>
                    <a href="mailto:support@techworth.co.in" className="text-decoration-none" style={{ color: '#6c757d', fontSize: '0.95rem' }}>support@techworth.co.in</a>
                  </div>
                )
              },
              {
                gif: timeGif,
                title: 'Business Hours',
                content: (
                  <div className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                    <div><strong>Mon - Fri:</strong> 9:00 AM - 6:00 PM</div>
                    <div><strong>Saturday:</strong> 10:00 AM - 4:00 PM</div>
                    <div><strong>Sunday:</strong> Closed</div>
                  </div>
                )
              }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                className="col-12 col-md-6 col-lg-3 d-flex"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
              >
                <div className="flex-fill d-flex flex-column align-items-center align-items-md-start text-center text-md-start" style={{ gap: '0.6rem' }}>
                  <img src={item.gif} alt={item.title} style={{ width: '60px', height: '60px', display: 'block' }} />
                  <h5 className="fw-bold mb-1" style={{ fontSize: '1.05rem', color: '#1f2937' }}>{item.title}</h5>
                  {item.content}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-5 bg-light">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <h6 className="text-tech-primary fw-bold mb-2" style={{ letterSpacing: '1px' }}>GET IN TOUCH</h6>
            <h2 className="text-dark" style={{ fontSize: '1.3rem' }}>Send Us a Message</h2>
          </motion.div>

          <div className="row g-4 d-flex">
            {/* Contact Form */}
            <motion.div
              className="col-lg-6 d-flex"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div style={{
                background: 'rgba(135, 206, 250, 0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(135, 206, 250, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.08)',
                width: '100%'
              }}>
                <form onSubmit={submit} className="d-flex flex-column" style={{ gap: '1rem' }}>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold mb-1" style={{ color: '#2d3748', fontSize: '0.875rem' }}>
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                        style={{ 
                          borderRadius: '8px', 
                          border: '1px solid rgba(135, 206, 250, 0.4)', 
                          fontSize: '0.875rem',
                          padding: '0.5rem 0.75rem',
                          background: 'rgba(255, 255, 255, 0.6)',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                          e.target.style.borderColor = 'rgba(135, 206, 250, 0.7)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 250, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.6)';
                          e.target.style.borderColor = 'rgba(135, 206, 250, 0.4)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold mb-1" style={{ color: '#2d3748', fontSize: '0.875rem' }}>
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                        style={{ 
                          borderRadius: '8px', 
                          border: '1px solid rgba(135, 206, 250, 0.4)', 
                          fontSize: '0.875rem',
                          padding: '0.5rem 0.75rem',
                          background: 'rgba(255, 255, 255, 0.6)',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                          e.target.style.borderColor = 'rgba(135, 206, 250, 0.7)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 250, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.6)';
                          e.target.style.borderColor = 'rgba(135, 206, 250, 0.4)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  <div className="row g-2">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold mb-1" style={{ color: '#2d3748', fontSize: '0.875rem' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        placeholder="+91 123 456 7890"
                        style={{ 
                          borderRadius: '8px', 
                          border: '1px solid rgba(135, 206, 250, 0.4)', 
                          fontSize: '0.875rem',
                          padding: '0.5rem 0.75rem',
                          background: 'rgba(255, 255, 255, 0.6)',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                          e.target.style.borderColor = 'rgba(135, 206, 250, 0.7)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 250, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.6)';
                          e.target.style.borderColor = 'rgba(135, 206, 250, 0.4)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold mb-1" style={{ color: '#2d3748', fontSize: '0.875rem' }}>
                        Subject <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        value={form.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="What is this regarding?"
                        style={{ 
                          borderRadius: '8px', 
                          border: '1px solid rgba(135, 206, 250, 0.4)', 
                          fontSize: '0.875rem',
                          padding: '0.5rem 0.75rem',
                          background: 'rgba(255, 255, 255, 0.6)',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                          e.target.style.borderColor = 'rgba(135, 206, 250, 0.7)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 250, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.6)';
                          e.target.style.borderColor = 'rgba(135, 206, 250, 0.4)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label fw-semibold mb-1" style={{ color: '#2d3748', fontSize: '0.875rem' }}>
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      name="message"
                      value={form.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      placeholder="Tell us how we can help you..."
                      style={{ 
                        borderRadius: '8px', 
                        border: '1px solid rgba(135, 206, 250, 0.4)', 
                        fontSize: '0.875rem', 
                        resize: 'vertical',
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(255, 255, 255, 0.6)',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                        e.target.style.borderColor = 'rgba(135, 206, 250, 0.7)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(135, 206, 250, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.6)';
                        e.target.style.borderColor = 'rgba(135, 206, 250, 0.4)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {status === 'ok' && (
                    <div className="alert alert-success d-flex align-items-center" role="alert" style={{ borderRadius: '10px' }}>
                      <FaCheckCircle className="me-2" /> Message sent successfully! We'll get back to you soon.
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="alert alert-danger" role="alert" style={{ borderRadius: '10px' }}>
                      Something went wrong. Please try again or contact us directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn align-self-start"
                    disabled={status === 'loading'}
                    style={{
                      backgroundColor: '#123964',
                      color: '#fff',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      padding: '0.625rem 1.5rem',
                      transition: 'all 0.3s ease',
                      border: 'none',
                      boxShadow: '0 2px 8px rgba(18, 57, 100, 0.25)'
                    }}
                    onMouseEnter={(e) => {
                      if (status !== 'loading') {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 4px 12px rgba(18, 57, 100, 0.35)';
                        e.target.style.opacity = '0.95';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (status !== 'loading') {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 2px 8px rgba(18, 57, 100, 0.25)';
                        e.target.style.opacity = '1';
                      }
                    }}
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.1234567890123!2d77.209023!3d28.613939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjIiTiA3N8KwMTInMzIuNSJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '10px', minHeight: '400px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Techworth Office Location"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-4">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h6 className="text-tech-primary fw-bold mb-3" style={{ letterSpacing: '1px' }}>FOLLOW US</h6>
            <div className="d-flex justify-content-center gap-3">
              <motion.a
                href="https://linkedin.com/company/techworth"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="text-decoration-none"
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#123964',
                    color: '#fff',
                    fontSize: '1.3rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <FaLinkedin />
                </div>
              </motion.a>
              <motion.a
                href="https://twitter.com/techworth"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="text-decoration-none"
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#123964',
                    color: '#fff',
                    fontSize: '1.3rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <FaTwitter />
                </div>
              </motion.a>
              <motion.a
                href="https://facebook.com/techworth"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="text-decoration-none"
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#123964',
                    color: '#fff',
                    fontSize: '1.3rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <FaFacebook />
                </div>
              </motion.a>
              <motion.a
                href="https://instagram.com/techworth"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="text-decoration-none"
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#123964',
                    color: '#fff',
                    fontSize: '1.3rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <FaInstagram />
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
