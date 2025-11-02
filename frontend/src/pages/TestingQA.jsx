import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaBug, FaClipboardCheck, FaStopwatch, FaShieldAlt, FaVials, FaSyncAlt, FaChartLine, FaCheckDouble, FaArrowRight } from 'react-icons/fa';
import { useContactModal } from '../contexts/ContactModalContext';
import heroImage1 from '../assets/service-pages/testing-hero1.jpg';
import heroImage3 from '../assets/service-pages/testing-hero3.jpg';
import introImage from '../assets/service-pages/testing-hero2.jpg';
import TechLogoMarquee from '../components/TechLogoMarquee';
import { getTechnologyLogos } from '../data/technologyLogos';

const SectionDivider = () => (
  <div style={{ padding: '1.5rem 0' }}>
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: '100%', opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ height: '2px', background: 'linear-gradient(90deg, rgba(18,57,100,0) 0%, rgba(18,57,100,0.45) 50%, rgba(18,57,100,0) 100%)' }}
      className="mx-auto"
    />
  </div>
);

const serviceOfferings = [
  {
    title: 'Automation Engineering',
    description: 'UI, API, and end-to-end automation suites integrated into CI/CD pipelines.'
  },
  {
    title: 'Performance & Reliability Testing',
    description: 'Load, stress, and soak tests to ensure stability across peak usage scenarios.'
  },
  {
    title: 'Security & Compliance Testing',
    description: 'Vulnerability assessments, OWASP coverage, and compliance-ready QA processes.'
  },
  {
    title: 'QA Process Enablement',
    description: 'Test strategy, documentation, and QA enablement for in-house engineering teams.'
  }
];

const technologyLogos = getTechnologyLogos([
  'Cypress',
  'Playwright',
  'Selenium',
  'Postman',
  'JUnit',
  'BrowserStack',
  'SonarQube',
  'GitHub Actions'
]);

const timeline = [
  {
    title: 'Quality Baseline',
    description: 'Assess current QA maturity, coverage, and risk areas to build a prioritized roadmap.',
    icon: <FaClipboardCheck />
  },
  {
    title: 'Strategy & Tooling',
    description: 'Define test strategy, select tools, and architect the automation framework.',
    icon: <FaVials />
  },
  {
    title: 'Automation & Execution',
    description: 'Develop reusable suites, integrate with CI, and execute across environments.',
    icon: <FaSyncAlt />
  },
  {
    title: 'Insights & Optimization',
    description: 'Publish quality dashboards, monitor release health, and continuously improve coverage.',
    icon: <FaChartLine />
  }
];

const benefits = [
  {
    title: 'Shift-Left Quality',
    description: 'We embed QA into design and development phases to catch issues before production.'
  },
  {
    title: 'Comprehensive Coverage',
    description: 'Functional, regression, performance, and security testing aligned with release cadence.'
  },
  {
    title: 'Actionable Insights',
    description: 'Automated reporting and dashboards help teams make data-driven release decisions.'
  }
];

const heroImages = [heroImage1, heroImage3];

export default function TestingQA() {
  const [heroIdx, setHeroIdx] = useState(0);
  const { openModal } = useContactModal();

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIdx((idx) => (idx === heroImages.length - 1 ? 0 : idx + 1));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="">
      {/* Hero Carousel */}
      <section
        className="d-flex align-items-center justify-content-start position-relative"
        style={{ minHeight: '400px', width: '100%', overflow: 'hidden', position: 'relative' }}
      >
        {/* Background carousel images */}
        {heroImages.map((img, i) => (
          <motion.div
            key={img}
            initial={{ opacity: i === heroIdx ? 1 : 0, scale: 1 }}
            animate={{ opacity: i === heroIdx ? 1 : 0, scale: i === heroIdx ? 1 : 0.98 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="position-absolute top-0 start-0 w-100 h-100"
            aria-hidden={i !== heroIdx}
            style={{
              zIndex: 1,
              background: `url(${img}) center/cover no-repeat`,
              width: '100%',
              height: '100%',
            }}
          >
            {/* Shading overlay for contrast */}
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'linear-gradient(90deg, rgba(18,32,59,0.85) 60%, rgba(18,32,59,0.45) 100%)', 
              zIndex: 2 
            }}></div>
          </motion.div>
        ))}
        {/* Iconic button at bottom right corner */}
        <motion.button
          onClick={openModal}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="position-absolute d-flex align-items-center justify-content-center hero-icon-button border-0"
          style={{
            bottom: '1.5rem',
            right: '1.5rem',
            width: '56px',
            height: '56px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            zIndex: 4,
            color: '#123964',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
          }}
          aria-label="Contact us"
        >
          <FaArrowRight style={{ fontSize: '1.25rem' }} />
        </motion.button>
      </section>

      {/* Title and Subtext Section */}
      <section className="py-3">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="fw-bold mb-2" style={{ fontSize: '2.2rem', letterSpacing: '1px', color: '#123964' }}>
              Testing & QA Services
            </h1>
            <p className="text-muted mx-auto mb-0" style={{ fontSize: '1rem', lineHeight: '1.6', maxWidth: '700px' }}>
              Automation-first testing that ensures quality and accelerates releases.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-4">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h6 className="text-tech-primary fw-bold" style={{ letterSpacing: '1px' }}>INTRODUCTION</h6>
                <h2 className="text-dark mb-3" style={{ fontSize: '1.35rem' }}>Quality engineering for reliable releases</h2>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                  Our QA engineers partner with product and development teams to design test strategies that are automation-led, measurable, and scalable. We enable faster release cycles without compromising on reliability, security, or user experience.
                </p>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="d-flex justify-content-center justify-content-lg-end"
              >
                <img 
                  src={introImage} 
                  alt="Testing & QA" 
                  style={{ 
                    maxWidth: '100%', 
                    height: 'auto', 
                    objectFit: 'contain',
                    borderRadius: '0',
                    border: 'none',
                    background: 'transparent'
                  }} 
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Service Offerings */}
      <section className="py-4 bg-light">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <div className="row g-4">
            {serviceOfferings.map((item, idx) => (
              <motion.div
                key={item.title}
                className="col-12 col-md-6 d-flex"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className="flex-fill p-4 bg-white d-flex flex-column gap-3" style={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                  <div className="text-tech-primary" style={{ fontSize: '1.6rem' }}>
                    {idx === 0 && <FaBug />} {idx === 1 && <FaStopwatch />} {idx === 2 && <FaShieldAlt />} {idx === 3 && <FaCheckDouble />}
                  </div>
                  <h5 className="fw-semibold mb-0" style={{ fontSize: '1.05rem', color: '#123964' }}>{item.title}</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Technologies */}
      <section className="py-4">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-3">
            <h6 className="text-tech-primary fw-bold" style={{ letterSpacing: '1px' }}>TECHNOLOGIES</h6>
            <h2 className="text-dark" style={{ fontSize: '1.35rem' }}>Automation and testing platforms</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <TechLogoMarquee items={technologyLogos} />
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Timeline */}
      <section className="py-4 bg-light">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-3">
            <h6 className="text-tech-primary fw-bold" style={{ letterSpacing: '1px' }}>HOW WE WORK</h6>
            <h2 className="text-dark" style={{ fontSize: '1.35rem' }}>Quality woven into every release</h2>
          </motion.div>

          <div className="row g-4">
            {timeline.map((step, idx) => (
              <motion.div
                key={step.title}
                className="col-12 col-md-6 d-flex"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <div className="flex-fill d-flex gap-3" style={{ borderLeft: '2px solid #dbe6fb', paddingLeft: '1.5rem', position: 'relative' }}>
                  <div className="position-absolute" style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#123964', top: '6px', left: '-8px' }}></div>
                  <div className="text-tech-primary" style={{ fontSize: '1.6rem' }}>{step.icon}</div>
                  <div>
                    <h5 className="fw-semibold mb-2" style={{ fontSize: '1.05rem', color: '#123964' }}>{step.title}</h5>
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Benefits */}
      <section className="py-4">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <div className="row g-4">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                className="col-12 col-md-4 d-flex"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className="flex-fill p-4 bg-light d-flex flex-column gap-3" style={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                  <div className="text-tech-primary" style={{ fontSize: '1.5rem' }}>
                    {idx === 0 && <FaClipboardCheck />} {idx === 1 && <FaShieldAlt />} {idx === 2 && <FaChartLine />}
                  </div>
                  <h5 className="fw-semibold mb-0" style={{ fontSize: '1.05rem', color: '#123964' }}>{benefit.title}</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* CTA */}
      <section className="py-4" style={{ background: '#123964' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '1000px' }}>
          <div className="row align-items-center g-4">
            <div className="col-lg-8 text-white">
              <h2 className="fw-bold mb-2" style={{ fontSize: '1.6rem' }}>Ship with confidence every sprint</h2>
              <p className="mb-0" style={{ fontSize: '0.95rem', opacity: 0.85 }}>
                Connect with our QA specialists to audit your quality maturity and design a roadmap for automation-led assurance.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end text-start">
              <motion.button
                onClick={openModal}
                whileHover={{ y: -2 }}
                className="btn px-4 py-2 fw-semibold border-0"
                style={{ backgroundColor: '#fff', color: '#123964', borderRadius: '8px' }}
              >
                Request a QA Audit
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

