import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContactModal } from '../contexts/ContactModalContext';
import { 
  FaCode, FaMobileAlt, FaCloud, FaBug,
  FaRocket, FaUsers, FaShieldAlt, FaSync,
  FaCheckCircle, FaBolt, FaStar,
  FaSearch, FaLightbulb, FaToolbox, FaHandshake,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import heroSvg4 from '../assets/Home-hero-svgs/Home-hero4.svg';
import aboutImage from '../assets/home-about.png';
import ctaImage from '../assets/home-cta.jpg';
import webdevImage from '../assets/webdev-home.jpg';
import appdevImage from '../assets/app-dev-home.jpg';
import cloudImage from '../assets/cloud-home.jpg';
import testingImage from '../assets/testing-home.jpg';
import innovationImage from '../assets/innovation-home.jpg';
import clientCentricImage from '../assets/client-centric-home.jpg';
import methodologyImage from '../assets/methodology-home.jpg';
import flexibleModelsImage from '../assets/flexible-models-home.jpg';
import createValueGif from '../assets/create-value.gif';
import qualityGif from '../assets/Quality.gif';
import costEffectiveGif from '../assets/cost-effective.gif';

const MotionLink = motion.create(Link);

export default function Home() {
  const { openModal } = useContactModal();
  const whyChooseUsScrollRef = useRef(null);

  const scrollLeft = () => {
    if (whyChooseUsScrollRef.current) {
      whyChooseUsScrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (whyChooseUsScrollRef.current) {
      whyChooseUsScrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };
  // Define the consistent button hover/tap variants based on the image
  const ButtonHoverStyle = {
    initial: { 
      backgroundColor: '#123964', // Standardized primary color
      color: '#ffffff',
      border: '2px solid #123964',
      rotate: 0,
    },
    hover: { 
      backgroundColor: '#ffffff',
      color: '#123964',
      borderColor: '#123964',
      rotate: -2, // Slight counter-clockwise rotation as seen in the image
      boxShadow: '0 5px 15px rgba(147, 197, 253, 0.3)', // Light blue shadow on hover
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      rotate: -1,
      transition: { duration: 0.1 }
    }
  };

  // Define the consistent inverted button (View All Services) hover/tap variants
  const InvertedButtonHoverStyle = {
    initial: { 
      backgroundColor: 'transparent',
      color: '#123964',
      border: '2px solid #123964',
      rotate: 0,
    },
    hover: { 
      backgroundColor: '#123964',
      color: '#ffffff',
      borderColor: '#123964',
      rotate: -2, // Consistent slight rotation
      boxShadow: '0 5px 15px rgba(147, 197, 253, 0.3)', // Light blue shadow on hover
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      rotate: -1,
      transition: { duration: 0.1 }
    }
  };

  // Define the consistent CTA button hover/tap variants
  const CTAButtonHoverStyle = {
    initial: { 
      backgroundColor: '#ffffff',
      color: '#002D59',
      border: '2px solid #ffffff',
      rotate: 0,
      boxShadow: 'none',
      transform: 'translateY(0)'
    },
    hover: { 
      backgroundColor: '#ffffff',
      color: '#002D59',
      borderColor: '#002D59',
      rotate: -2,
      boxShadow: '0 6px 20px #B6D3F2',
      transform: 'translateY(-2px)',
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      rotate: -1,
      transform: 'translateY(0px)',
      transition: { duration: 0.1 }
    }
  };


  return (
    <>
      {/* Hero Section */}
      <section className="py-4 hero-section-main" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e3f2fd 50%, #ffffff 100%)', minHeight: '60vh' }}>
        <div className="container mx-auto px-4">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h6 className="mb-2 fw-bold" style={{ fontSize: '1rem', letterSpacing: '1px', color: '#123964' }}>
                  IT SERVICES & DIGITAL SOLUTIONS
                </h6>
                <h1 className="h2 text-dark mb-3" style={{ lineHeight: '1.3', fontSize: '1. releases' }}>
                  Empower Your Business With Cutting-Edge Technology
                </h1>
                <p className="text-muted mb-3" style={{ fontSize: '1rem' }}>
                  Highly Tailored IT Design, Management & Support Services
                </p>
                <div className="mt-3">
                  {/* BUTTON STYLING CHANGE HERE */}
                  <motion.button
                    onClick={openModal}
                    className="btn px-4 py-2 fw-semibold border-0"
                    style={{ 
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                    }}
                    variants={ButtonHoverStyle}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6 position-relative hero-image-container" style={{ paddingBottom: '0', display: 'flex', alignItems: 'flex-end', minHeight: '400px' }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="position-relative w-100 hero-image-wrapper"
                style={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
              >
                {/* Decorative circles with glass morphism and smooth animation */}
                <motion.div 
                  className="position-absolute gpu-accelerated"
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0.25, 0.4, 0.25],
                    scale: [1, 1.04, 1],
                    y: [0, -8, 0]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    type: 'tween'
                  }}
                  style={{
                    width: '280px',
                    height: '280px',
                    background: 'rgba(100, 181, 246, 0.25)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '50%',
                    border: '1px solid rgba(100, 181, 246, 0.35)',
                    boxShadow: '0 8px 32px 0 rgba(100, 181, 246, 0.2)',
                    top: '40px',
                    right: '0px',
                    zIndex: 1,
                    willChange: 'transform, opacity'
                  }}
                />
                <motion.div 
                  className="position-absolute gpu-accelerated"
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.06, 1],
                    y: [0, -12, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.7,
                    type: 'tween'
                  }}
                  style={{
                    width: '180px',
                    height: '180px',
                    background: 'rgba(66, 165, 245, 0.3)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    borderRadius: '50%',
                    border: '1px solid rgba(66, 165, 245, 0.4)',
                    boxShadow: '0 6px 24px 0 rgba(66, 165, 245, 0.25)',
                    top: '90px',
                    right: '70px',
                    zIndex: 2,
                    willChange: 'transform, opacity'
                  }}
                />
                <motion.div 
                  className="position-absolute gpu-accelerated"
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0.2, 0.35, 0.2],
                    scale: [1, 1.08, 1],
                    y: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.2,
                    type: 'tween'
                  }}
                  style={{
                    width: '200px',
                    height: '200px',
                    background: 'rgba(100, 181, 246, 0.22)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    borderRadius: '50%',
                    border: '1px solid rgba(100, 181, 246, 0.3)',
                    boxShadow: '0 4px 20px 0 rgba(100, 181, 246, 0.15)',
                    top: '110px',
                    right: '-30px',
                    zIndex: 1,
                    willChange: 'transform, opacity'
                  }}
                />
                
                {/* Hero SVG Illustration */}
                <div className="position-relative hero-svg-container" style={{ 
                  width: '100%', 
                  height: '55vh', 
                  display: 'flex', 
                  alignItems: 'flex-end', 
                  justifyContent: 'center',
                  zIndex: 3
                }}>
                  <motion.img
                    src={heroSvg4}
                    alt="Techworth Hero Illustration"
                    className="position-relative img-optimized hero-main-image"
                    loading="eager"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      height: '85%',
                      width: 'auto',
                      maxWidth: '90%',
                      maxHeight: '55vh',
                      objectFit: 'contain',
                      alignSelf: 'flex-end',
                      marginBottom: '0',
                      transform: 'translateY(10px)'
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- */}

      {/* About Us Section */}
      <section className="py-5">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-5"
          >
            <h6 className="text-tech-primary mb-2 fw-bold" style={{ fontSize: '1rem', letterSpacing: '1px' }}>ABOUT US</h6>
            <h2 className="text-dark mb-2" style={{ fontSize: '1.3rem' }}>Building the Future of Digital Innovation</h2>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Empowering businesses through transformative technology</p>
          </motion.div>
          <div className="row align-items-center mt-4">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <motion.img 
                src={aboutImage} 
                alt="About Techworth" 
                className="img-fluid w-100 img-optimized"
                loading="lazy"
                style={{ 
                  height: 'auto',
                  minHeight: '400px',
                  objectFit: 'contain',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ scale: 1.02 }}
              />
            </div>
            <div className="col-lg-6">
              <p className="text-muted mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.7', textAlign: 'justify' }}>
                Techworth Private Limited was founded with a mission to empower businesses through transformative digital technology. Our passionate team combines strategic thinking and technical excellence to deliver high-performance IT solutions.
              </p>
              <p className="text-muted mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.7', textAlign: 'justify' }}>
                We believe in partnerships built on trust. By understanding your unique goals, we craft tailored strategies that drive measurable results — ensuring your business stays ahead of the curve.
              </p>
              {/* BUTTON STYLING CHANGE HERE */}
              <MotionLink
                to="/about" 
                className="btn px-4 py-2 fw-semibold"
                style={{ 
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  // Base styles are set in ButtonHoverStyle.initial
                }}
                variants={ButtonHoverStyle}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                Learn More <i className="ms-2 fa fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
              </MotionLink>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="py-3">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <div style={{ height: '2px', backgroundColor: '#e9ecef' }} />
        </div>
      </div>

      {/* Services Section */}
      <section className="py-5 bg-light">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-5"
          >
            <h6 className="text-tech-primary mb-2 fw-bold" style={{ fontSize: '1rem', letterSpacing: '1px' }}>OUR SERVICES</h6>
            <h2 className="text-dark mb-2" style={{ fontSize: '1.3rem' }}>Comprehensive IT Solutions</h2>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Designed to accelerate your business growth</p>
          </motion.div>
          
          {/* Service 1: Web Development (text 8, image 4) */}
          <motion.div
            className="row align-items-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="col-lg-8 order-2 order-lg-1">
              <h3 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2" style={{ fontSize: '1.2rem' }}>
                <FaCode className="text-tech-primary" style={{ fontSize: '1.1rem' }} />
                Web Development
              </h3>
              <p className="text-muted mb-2" style={{ fontSize: '0.85rem', lineHeight: '1.6', textAlign: 'justify' }}>
                Modern, responsive web applications optimized for scalability and user experience.
              </p>
              <p className="text-muted mb-2" style={{ fontSize: '0.85rem', lineHeight: '1.6', textAlign: 'justify' }}>
                We build custom web solutions using cutting-edge technologies like React, Node.js, and cloud platforms to ensure your digital presence is both powerful and future-ready.
              </p>
              <p className="text-muted mb-3" style={{ fontSize: '0.85rem', lineHeight: '1.6', textAlign: 'justify' }}>
                Our development process includes comprehensive testing, performance optimization, and ongoing maintenance to keep your web applications running smoothly.
              </p>
              <Link 
                to="/services/web-development" 
                className="text-tech-primary text-decoration-none d-inline-flex align-items-center fw-semibold"
                style={{ 
                  fontSize: '0.85rem',
                  transition: 'all 0.3s ease',
                  borderBottom: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = '#123964';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = 'transparent';
                }}
              >
                Learn More <i className="ms-2 fa fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
              </Link>
              <div style={{ height: '1px', backgroundColor: '#e9ecef', marginTop: '1rem', width: '100%' }} />
            </div>
            <div className="col-lg-4 order-1 order-lg-2 mb-3 mb-lg-0 d-flex justify-content-center">
              <img
                src={webdevImage}
                alt="Web Development"
                className="img-fluid service-img img-optimized"
                loading="lazy"
                style={{ width: '100%', maxWidth: '300px', height: '230px', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </motion.div>

          {/* Service 2: Mobile Apps (image 4, text 8) */}
          <motion.div
            className="row align-items-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="col-lg-4 order-1 order-lg-1 mb-3 mb-lg-0 d-flex justify-content-center">
              <img
                src={appdevImage}
                alt="Mobile Apps"
                className="img-fluid service-img img-optimized"
                loading="lazy"
                style={{ width: '100%', maxWidth: '300px', height: '230px', objectFit: 'contain', display: 'block' }}
              />
            </div>
            <div className="col-lg-8 order-2 order-lg-2">
              <h3 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2" style={{ fontSize: '1.2rem' }}>
                <FaMobileAlt className="text-tech-primary" style={{ fontSize: '1.1rem' }} />
                Mobile Apps
              </h3>
              <p className="text-muted mb-2" style={{ fontSize: '0.85rem', lineHeight: '1.6', textAlign: 'justify' }}>
                Native and cross-platform mobile apps tailored for business success.
              </p>
              <p className="text-muted mb-2" style={{ fontSize: '0.85rem', lineHeight: '1.6', textAlign: 'justify' }}>
                We develop mobile applications for both iOS and Android platforms using React Native and Flutter, ensuring consistent performance across all devices.
              </p>
              <p className="text-muted mb-3" style={{ fontSize: '0.85rem', lineHeight: '1.6', textAlign: 'justify' }}>
                Our mobile solutions include user-friendly interfaces, secure data handling, and seamless integration with your existing business systems.
              </p>
              <Link 
                to="/services/mobile-apps" 
                className="text-tech-primary text-decoration-none d-inline-flex align-items-center fw-semibold"
                style={{ 
                  fontSize: '0.85rem',
                  transition: 'all 0.3s ease',
                  borderBottom: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = '#123964';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = 'transparent';
                }}
              >
                Learn More <i className="ms-2 fa fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
              </Link>
              <div style={{ height: '1px', backgroundColor: '#e9ecef', marginTop: '1rem', width: '100%' }} />
            </div>
          </motion.div>

          {/* Service 3: Cloud Solutions (text 8, image 4) */}
          <motion.div
            className="row align-items-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="col-lg-8 order-2 order-lg-1">
              <h3 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2" style={{ fontSize: '1.2rem' }}>
                <FaCloud className="text-tech-primary" style={{ fontSize: '1.1rem' }} />
                Cloud Solutions
              </h3>
              <p className="text-muted mb-2" style={{ fontSize: '0.85rem', lineHeight: '1.6', textAlign: 'justify' }}>
                Robust, secure cloud integration to enhance business agility.
              </p>
              <p className="text-muted mb-2" style={{ fontSize: '0.85rem', lineHeight: '1.6', textAlign: 'justify' }}>
                We help you migrate to the cloud and optimize your infrastructure using AWS, Azure, and Google Cloud platforms for maximum scalability and cost efficiency.
              </p>
              <p className="text-muted mb-3" style={{ fontSize: '0.85rem', lineHeight: '1.6', textAlign: 'justify' }}>
                Our cloud solutions include data backup, disaster recovery, and 24/7 monitoring to ensure your business operations remain uninterrupted.
              </p>
              <Link 
                to="/services/cloud-solutions" 
                className="text-tech-primary text-decoration-none d-inline-flex align-items-center fw-semibold"
                style={{ 
                  fontSize: '0.85rem',
                  transition: 'all 0.3s ease',
                  borderBottom: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = '#123964';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = 'transparent';
                }}
              >
                Learn More <i className="ms-2 fa fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
              </Link>
              <div style={{ height: '1px', backgroundColor: '#e9ecef', marginTop: '1rem', width: '100%' }} />
            </div>
            <div className="col-lg-4 order-1 order-lg-2 mb-3 mb-lg-0 d-flex justify-content-center">
              <img
                src={cloudImage}
                alt="Cloud Solutions"
                className="img-fluid service-img img-optimized"
                loading="lazy"
                style={{ width: '100%', maxWidth: '300px', height: '230px', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </motion.div>

          {/* Service 4: Testing & QA (image 4, text 8) */}
          <motion.div
            className="row align-items-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="col-lg-4 order-1 order-lg-1 mb-3 mb-lg-0 d-flex justify-content-center">
              <img
                src={testingImage}
                alt="Testing & QA"
                className="img-fluid service-img img-optimized"
                loading="lazy"
                style={{ width: '100%', maxWidth: '300px', height: '230px', objectFit: 'contain', display: 'block' }}
              />
            </div>
            <div className="col-lg-8 order-2 order-lg-2">
              <h3 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2" style={{ fontSize: '1.2rem' }}>
                <FaBug className="text-tech-primary" style={{ fontSize: '1.1rem' }} />
                Testing & QA
              </h3>
              <p className="text-muted mb-2" style={{ fontSize: '0.85rem', lineHeight: '1.6', textAlign: 'justify' }}>
                End-to-end testing solutions ensuring reliability and performance.
              </p>
              <p className="text-muted mb-2" style={{ fontSize: '0.85rem', lineHeight: '1.6', textAlign: 'justify' }}>
                We provide comprehensive testing services including automated testing, performance testing, and security testing to ensure your applications meet the highest quality standards.
              </p>
              <p className="text-muted mb-3" style={{ fontSize: '0.85rem', lineHeight: '1.6', textAlign: 'justify' }}>
                Our QA team uses industry-leading tools and methodologies to identify and resolve issues before they impact your users, ensuring a seamless experience.
              </p>
              <Link 
                to="/services/testing-qa" 
                className="text-tech-primary text-decoration-none d-inline-flex align-items-center fw-semibold"
                style={{ 
                  fontSize: '0.85rem',
                  transition: 'all 0.3s ease',
                  borderBottom: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = '#123964';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = 'transparent';
                }}
              >
                Learn More <i className="ms-2 fa fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
              </Link>
              <div style={{ height: '1px', backgroundColor: '#e9ecef', marginTop: '1rem', width: '100%' }} />
            </div>
          </motion.div>

          <motion.div 
            className="text-center mt-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <MotionLink
              to="/services" 
              className="btn px-4 py-2 fw-semibold"
              style={{
                borderRadius: '6px',
                fontSize: '0.85rem',
              }}
              variants={InvertedButtonHoverStyle}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              View All Services
            </MotionLink>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="py-3">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <div style={{ height: '2px', backgroundColor: '#e9ecef' }} />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="py-5">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-5"
          >
            <h6 className="text-tech-primary mb-2 fw-bold" style={{ fontSize: '1rem', letterSpacing: '1px' }}>WHY CHOOSE US</h6>
            <h2 className="text-dark mb-2" style={{ fontSize: '1.3rem' }}>What Sets Us Apart</h2>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Excellence in every project we deliver</p>
          </motion.div>
          <div className="mt-4 position-relative">
            <div 
              ref={whyChooseUsScrollRef}
              className="d-flex gap-4 overflow-auto pb-3" 
              style={{ 
                scrollbarWidth: 'thin',
                scrollbarColor: '#e9ecef transparent'
              }}
            >
              {[
                { 
                  image: innovationImage, 
                  icon: <FaRocket size={20} />, 
                  title: 'Innovation-Driven', 
                  desc: 'We leverage cutting-edge technologies and creative approaches to deliver solutions that push the boundaries of what\'s possible. Our team stays ahead of industry trends to ensure your business remains competitive in the digital landscape.',
                  bgColor: '#f8f9fa',
                  textColor: '#212529'
                },
                { 
                  image: clientCentricImage, 
                  icon: <FaUsers size={20} />, 
                  title: 'Client-Centric', 
                  desc: 'Every project begins with a deep understanding of your unique goals and challenges. We prioritize your success by maintaining transparent communication and delivering solutions that truly align with your business objectives.',
                  bgColor: '#f8f9fa',
                  textColor: '#212529'
                },
                { 
                  image: methodologyImage, 
                  icon: <FaShieldAlt size={20} />, 
                  title: 'Proven Methodology', 
                  desc: 'Our reliable, scalable, and efficient software delivery process ensures consistent quality and timely results. We follow industry best practices and proven methodologies to minimize risks and maximize project success.',
                  bgColor: '#f8f9fa',
                  textColor: '#212529'
                },
                { 
                  image: flexibleModelsImage, 
                  icon: <FaSync size={20} />, 
                  title: 'Flexible Models', 
                  desc: 'We adapt to your pace and priorities with flexible engagement models that suit your business needs. Whether you need full-time support or project-based work, we provide solutions that fit your budget and timeline.',
                  bgColor: '#f8f9fa',
                  textColor: '#212529'
                },
              ].map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  className="flex-shrink-0"
                  style={{ width: '320px' }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <motion.div
                    className="h-100"
                    style={{
                      backgroundColor: feature.bgColor,
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid #e9ecef',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    whileHover={{ 
                      y: -6,
                      boxShadow: '0 12px 28px rgba(0,0,0,0.12)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = feature.bgColor;
                      e.currentTarget.style.color = feature.textColor;
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.filter = 'grayscale(100%)';
                      const icon = e.currentTarget.querySelector('.text-tech-primary');
                      if (icon) icon.style.color = '#123964';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = feature.bgColor;
                      e.currentTarget.style.color = feature.textColor;
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.filter = 'grayscale(0%)';
                      const icon = e.currentTarget.querySelector('.text-tech-primary');
                      if (icon) icon.style.color = '#123964';
                    }}
                  >
                    <div style={{ height: '200px', overflow: 'hidden' }}>
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-100 h-100"
                        style={{
                          objectFit: 'cover',
                          filter: 'grayscale(0%)',
                          transition: 'filter 0.3s ease'
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <div className="text-tech-primary">{feature.icon}</div>
                        <h5 className="fw-bold mb-0" style={{ fontSize: '1rem' }}>{feature.title}</h5>
                      </div>
                      <p style={{ 
                        fontSize: '0.85rem', 
                        lineHeight: '1.6', 
                        textAlign: 'justify',
                        margin: 0
                      }}>
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            {/* Navigation Buttons */}
            <button
              className="position-absolute border-0 rounded-circle d-flex align-items-center justify-content-center why-choose-us-nav-btn why-choose-us-nav-btn-left"
              onClick={scrollLeft}
              aria-label="Scroll left"
              style={{
                width: '40px',
                height: '40px',
                bottom: '10px',
                left: '10px',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              <FaChevronLeft 
                style={{ 
                  color: '#123964', 
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }} 
              />
            </button>
            
            <button
              className="position-absolute border-0 rounded-circle d-flex align-items-center justify-content-center why-choose-us-nav-btn why-choose-us-nav-btn-right"
              onClick={scrollRight}
              aria-label="Scroll right"
              style={{
                width: '40px',
                height: '40px',
                bottom: '10px',
                right: '10px',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              <FaChevronRight 
                style={{ 
                  color: '#123964', 
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }} 
              />
            </button>
          </div>
          {/* Replace the three-feature row under Why Choose Us */}
          <div className="row g-3 mt-4">
            {[
              { gif: createValueGif, title: 'We Create Value', desc: 'Helping your business grow with smart digital solutions.' },
              { gif: qualityGif, title: 'We Deliver Quality', desc: 'Combining expertise with precision to ensure excellence.' },
              { gif: costEffectiveGif, title: 'We Are Cost-Effective', desc: 'Providing high value with optimized development costs.' },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                className="col-12 col-md-4 d-flex"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex-fill d-flex flex-column align-items-center text-center" style={{ padding: '0.75rem 0.5rem' }}>
                  <img src={item.gif} alt={item.title} style={{ width: 56, height: 56, marginBottom: '.5rem', background: 'transparent', border: 0, borderRadius: 0, boxShadow: 'none', display: 'block' }} />
                  <h6 className="mb-1 fw-semibold" style={{ fontSize: '0.95rem', color: '#0f172a' }}>{item.title}</h6>
                  <small className="text-muted" style={{ fontSize: '0.85rem' }}>{item.desc}</small>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="py-3">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <div style={{ height: '2px', backgroundColor: '#e9ecef' }} />
        </div>
      </div>

      {/* How We Work Section */}
      <section className="py-5 bg-light">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-5"
          >
            <h6 className="text-tech-primary mb-2 fw-bold" style={{ fontSize: '1rem', letterSpacing: '1px' }}>HOW WE WORK</h6>
            <h2 className="text-dark mb-2" style={{ fontSize: '1.3rem' }}>Our Proven Process</h2>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Delivering exceptional results step by step</p>
          </motion.div>
          
          {/* Timeline Container */}
          <div className="position-relative mt-5">
            {/* Timeline Line */}
            <div 
              className="position-absolute d-none d-lg-block"
              style={{
                left: '50%',
                top: '0',
                bottom: '0',
                width: '2px',
                backgroundColor: '#e9ecef',
                transform: 'translateX(-50%)',
                zIndex: 1
              }}
            />
            
            {/* Timeline Cards */}
            <div className="row g-4">
              {[
                { 
                  step: '1', 
                  icon: <FaSearch size={20} />, 
                  title: 'Discovery & Analysis', 
                  desc: 'We begin with comprehensive consultations to deeply understand your business objectives, current challenges, and long-term vision. Our team conducts thorough market research and technical analysis to identify opportunities for digital transformation.',
                  bgColor: '#f8f9fa',
                  textColor: '#212529'
                },
                { 
                  step: '2', 
                  icon: <FaLightbulb size={20} />, 
                  title: 'Strategy & Design', 
                  desc: 'Based on our analysis, we design innovative solutions tailored to your specific needs. Our experts create detailed roadmaps, wireframes, and technical specifications that align with your business goals and industry best practices.',
                  bgColor: '#f8f9fa',
                  textColor: '#212529'
                },
                { 
                  step: '3', 
                  icon: <FaToolbox size={20} />, 
                  title: 'Development & Implementation', 
                  desc: 'Our skilled development team brings your vision to life using cutting-edge technologies and agile methodologies. We maintain transparent communication throughout the development process, ensuring quality and timely delivery.',
                  bgColor: '#f8f9fa',
                  textColor: '#212529'
                },
                { 
                  step: '4', 
                  icon: <FaHandshake size={20} />, 
                  title: 'Launch & Support', 
                  desc: 'We handle seamless deployment and provide comprehensive training to your team. Our ongoing support and monitoring services ensure optimal performance, security, and continuous improvement of your digital solutions.',
                  bgColor: '#f8f9fa',
                  textColor: '#212529'
                },
              ].map((process, idx) => (
                <motion.div
                  key={process.step}
                  className={`col-lg-6 ${idx % 2 === 0 ? 'text-lg-end' : 'text-lg-start'}`}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                >
                    <motion.div
                      className="position-relative"
                      style={{
                        maxWidth: '500px',
                        marginLeft: idx % 2 === 0 ? 'auto' : '0',
                        marginRight: idx % 2 === 0 ? '0' : 'auto'
                      }}
                    >
                    {/* Timeline Dot */}
                    <div 
                      className="position-absolute d-none d-lg-block"
                      style={{
                        top: '50%',
                        left: idx % 2 === 0 ? 'calc(100% + 20px)' : 'calc(-20px)',
                        width: '16px',
                        height: '16px',
                        backgroundColor: '#123964',
                        borderRadius: '50%',
                        border: '4px solid #f8f9fa',
                        transform: 'translateY(-50%)',
                        zIndex: 2
                      }}
                    />
                    
                    {/* Card */}
                    <motion.div
                      className="p-4 h-100"
                      style={{
                        backgroundColor: process.bgColor,
                        borderRadius: '12px',
                        border: '1px solid #e9ecef',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        minHeight: '200px'
                      }}
                      whileHover={{ 
                        y: -6,
                        boxShadow: '0 12px 28px rgba(0,0,0,0.12)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = process.bgColor;
                        e.currentTarget.style.color = process.textColor;
                        const icon = e.currentTarget.querySelector('.text-tech-primary');
                        if (icon) icon.style.color = '#123964';
                        const stepNumber = e.currentTarget.querySelector('.step-number');
                        if (stepNumber) {
                          stepNumber.style.backgroundColor = '#123964';
                          stepNumber.style.color = 'white';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = process.bgColor;
                        e.currentTarget.style.color = process.textColor;
                        const icon = e.currentTarget.querySelector('.text-tech-primary');
                        if (icon) icon.style.color = '#123964';
                        const stepNumber = e.currentTarget.querySelector('.step-number');
                        if (stepNumber) {
                          stepNumber.style.backgroundColor = '#123964';
                          stepNumber.style.color = 'white';
                        }
                      }}
                    >
                      {/* Step Number */}
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div 
                          className="step-number rounded-circle d-flex align-items-center justify-content-center fw-bold"
                          style={{ 
                            width: '32px', 
                            height: '32px', 
                            fontSize: '0.85rem',
                            backgroundColor: '#123964',
                            color: 'white',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {process.step}
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <div className="text-tech-primary">{process.icon}</div>
                          <h5 className="fw-bold mb-0" style={{ fontSize: '1rem' }}>{process.title}</h5>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p style={{ 
                        fontSize: '0.85rem', 
                        lineHeight: '1.6', 
                        textAlign: 'justify',
                        margin: 0
                      }}>
                        {process.desc}
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="py-3">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <div style={{ height: '2px', backgroundColor: '#e9ecef' }} />
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-3" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e3f2fd 50%, #ffffff 100%)' }}>
        <div className="container-fluid px-0">
          <div className="row align-items-center g-0">
            {/* Left Side - Content */}
            <div className="col-lg-7 mb-3 mb-lg-0" style={{ paddingLeft: '50px', paddingRight: '30px' }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-dark mb-2" style={{ fontSize: '1.3rem', fontWeight: 700 }}>Ready to Transform Your Business?</h2>
                <p className="mb-3 text-dark" style={{ fontSize: '0.85rem', opacity: 0.8, textAlign: 'justify' }}>
                  Let's discuss your goals and discover how Techworth's innovative IT services<br />
                  can accelerate your success.
                </p>
                <div className="d-flex gap-2 flex-wrap mb-3">
                  {/* BUTTON STYLING CHANGE HERE */}
                  <motion.button
                    onClick={openModal}
                    className="btn px-4 py-2 fw-semibold border-0"
                    style={{ 
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                    }}
                    variants={CTAButtonHoverStyle}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Start Your Project
                  </motion.button>

                  <Link 
                    to="/services" 
                    className="btn px-4 py-2 border border-dark fw-semibold"
                    style={{ 
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      transition: 'all 0.3s ease',
                      backgroundColor: 'transparent',
                      color: '#212529'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#212529';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#212529';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Explore Services
                  </Link>
                </div>
                <div className="d-flex gap-3 flex-wrap">
                  <div className="d-flex align-items-center gap-2 text-dark">
                    <FaCheckCircle style={{ fontSize: '0.8rem', color: '#123964' }} /> <span style={{ fontSize: '0.8rem' }}>Free Consultation</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 text-dark">
                    <FaBolt style={{ fontSize: '0.8rem', color: '#123964' }} /> <span style={{ fontSize: '0.8rem' }}>24/7 Support</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 text-dark">
                    <FaStar style={{ fontSize: '0.8rem', color: '#123964' }} /> <span style={{ fontSize: '0.8rem' }}>100% Satisfaction</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Image */}
            <div className="col-lg-5" style={{ paddingRight: '20px' }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ width: '100%' }}
              >
                <img 
                  src={ctaImage} 
                  alt="Transform Your Business" 
                  className="w-100 img-optimized"
                  loading="lazy"
                  style={{
                    objectFit: 'cover',
                    borderRadius: '0',
                    display: 'block',
                    maxHeight: '300px',
                    width: '100%',
                    filter: 'grayscale(100%)',
                    transition: 'filter 0.4s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%)';
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="py-3">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <div style={{ height: '2px', backgroundColor: '#e9ecef' }} />
        </div>
      </div>
    </>
  );
}