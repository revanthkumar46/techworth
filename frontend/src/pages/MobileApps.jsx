import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaMobileAlt, FaApple, FaAndroid, FaSyncAlt, FaMapMarkedAlt, FaFingerprint, FaChartLine, FaRocket, FaArrowRight } from 'react-icons/fa';
import { useContactModal } from '../contexts/ContactModalContext';
import heroImage1 from '../assets/service-pages/mobile-app-hero1.jpg';
import heroImage3 from '../assets/service-pages/mobile-app-hero3.jpg';
import introImage from '../assets/service-pages/mobile-app-hero2.jpg';
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
    title: 'Native App Development',
    description: 'Swift, Kotlin, and Jetpack Compose for rich, performant iOS and Android experiences.'
  },
  {
    title: 'Cross-Platform Delivery',
    description: 'React Native and Flutter applications with shared codebases and native performance.'
  },
  {
    title: 'Mobile Product Strategy',
    description: 'Mobile roadmaps, growth experiments, and analytics instrumentation for better retention.'
  },
  {
    title: 'Continuous Mobile Ops',
    description: 'CI/CD pipelines, OTA updates, store submission automation, and monitoring.'
  }
];

const technologyLogos = getTechnologyLogos([
  'Swift',
  'Kotlin',
  'Android',
  'Android Studio',
  'React Native',
  'Flutter',
  'Firebase',
  'Realm',
  'GraphQL',
  'AWS'
]);

const timeline = [
  {
    title: 'Product Discovery',
    description: 'Market research, persona mapping, and feature prioritization aligned with KPIs.',
    icon: <FaMapMarkedAlt />
  },
  {
    title: 'Experience Design',
    description: 'Mobile UX flows, interactive prototypes, and usability tests with target users.',
    icon: <FaMobileAlt />
  },
  {
    title: 'Engineering & QA',
    description: 'Agile sprints, device lab testing, and automation suites for stability.',
    icon: <FaSyncAlt />
  },
  {
    title: 'Launch & Optimize',
    description: 'Store submission support, release monitoring, and growth experiments.',
    icon: <FaChartLine />
  }
];

const benefits = [
  {
    title: 'Platform Expertise',
    description: 'Seasoned iOS and Android engineers experienced with device-specific capabilities.'
  },
  {
    title: 'Security & Compliance',
    description: 'Biometric auth, secure storage, and compliance with GDPR, HIPAA, and SOC2.'
  },
  {
    title: 'Lifecycle Partnership',
    description: 'We support you beyond launch with A/B testing, analytics, and iteration roadmap.'
  }
];

const heroImages = [heroImage1, heroImage3];

export default function MobileApps() {
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
              Mobile App Development Services
            </h1>
            <p className="text-muted mx-auto mb-0" style={{ fontSize: '1rem', lineHeight: '1.6', maxWidth: '700px' }}>
              Native mobile apps built for performance and growth.
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
                <h2 className="text-dark mb-3" style={{ fontSize: '1.35rem' }}>Mobile products users love to return to</h2>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                  Our mobile teams collaborate with product, design, and growth stakeholders to deliver apps that feel native, perform reliably, and drive measurable engagement. We handle everything from MVP validation to global rollouts with CI/CD and observability.
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
                  alt="Mobile App Development" 
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
                    {idx === 0 && <FaApple />} {idx === 1 && <FaAndroid />} {idx === 2 && <FaChartLine />} {idx === 3 && <FaSyncAlt />}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-3"
          >
            <h6 className="text-tech-primary fw-bold" style={{ letterSpacing: '1px' }}>TECHNOLOGIES</h6>
            <h2 className="text-dark" style={{ fontSize: '1.35rem' }}>Stacks and tools we trust</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <TechLogoMarquee items={technologyLogos} />
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Timeline */}
      <section className="py-4 bg-light">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-3"
          >
            <h6 className="text-tech-primary fw-bold" style={{ letterSpacing: '1px' }}>HOW WE WORK</h6>
            <h2 className="text-dark" style={{ fontSize: '1.35rem' }}>A mobile-first delivery approach</h2>
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
                    {idx === 0 && <FaMobileAlt />} {idx === 1 && <FaFingerprint />} {idx === 2 && <FaRocket />}
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
              <h2 className="fw-bold mb-2" style={{ fontSize: '1.6rem' }}>Bring your mobile vision to life</h2>
              <p className="mb-0" style={{ fontSize: '0.95rem', opacity: 0.85 }}>
                Schedule a discovery call to see how we transform ideas into world-class mobile applications.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end text-start">
              <motion.button
                onClick={openModal}
                whileHover={{ y: -2 }}
                className="btn px-4 py-2 fw-semibold border-0"
                style={{ backgroundColor: '#fff', color: '#123964', borderRadius: '8px' }}
              >
                Book a Discovery Call
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

