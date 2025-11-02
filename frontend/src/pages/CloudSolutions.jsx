import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaCloud, FaServer, FaShieldAlt, FaTools, FaChartLine, FaSyncAlt, FaCube, FaGlobe, FaArrowRight } from 'react-icons/fa';
import { useContactModal } from '../contexts/ContactModalContext';
import heroImage1 from '../assets/service-pages/cloud-hero1.jpg';
import introImage from '../assets/service-pages/cloud-hero2.jpg';
import TechLogoMarquee from '../components/TechLogoMarquee';
import { getTechnologyLogos } from '../data/technologyLogos';

const SectionDivider = () => (
  <div style={{ padding: '1.5rem 0' }}>
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: '100%', opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ height: '2px', background: 'linear-gradient(90deg, rgba(14,54,92,0) 0%, rgba(14,54,92,0.45) 50%, rgba(14,54,92,0) 100%)' }}
      className="mx-auto"
    />
  </div>
);

const serviceOfferings = [
  {
    title: 'Cloud Strategy & Advisory',
    description: 'Assess workloads, define migration roadmaps, and align on cost governance and SLAs.'
  },
  {
    title: 'Migration & Modernization',
    description: 'Rehost, refactor, or replatform applications onto secure, scalable cloud infrastructure.'
  },
  {
    title: 'Cloud Operations & DevOps',
    description: 'Monitoring, incident response, FinOps, and automation for day-two cloud operations.'
  },
  {
    title: 'Data & Analytics Platforms',
    description: 'Data lakes, warehousing, and real-time pipelines leveraging native cloud services.'
  }
];

const technologyLogos = getTechnologyLogos([
  'AWS',
  'Azure',
  'Google Cloud',
  'HashiCorp Terraform',
  'Docker',
  'Kubernetes',
  'Helm',
  'Prometheus',
  'Grafana',
  'GitHub Actions',
  'Cloudflare',
  'Splunk'
]);

const timeline = [
  {
    title: 'Assessment & Business Case',
    description: 'Cloud readiness analysis, TCO modeling, and phased migration planning.',
    icon: <FaGlobe />
  },
  {
    title: 'Landing Zone Setup',
    description: 'Identity, networking, security guardrails, and automation foundations.',
    icon: <FaCube />
  },
  {
    title: 'Migration & Optimization',
    description: 'Move workloads in waves, optimize resource usage, and automate deployments.',
    icon: <FaSyncAlt />
  },
  {
    title: 'Operate & Innovate',
    description: 'Continuous monitoring, cost management, and enablement for data and AI initiatives.',
    icon: <FaChartLine />
  }
];

const benefits = [
  {
    title: 'Resilient Infrastructure',
    description: 'High availability architectures, disaster recovery, and zero-downtime deployments.'
  },
  {
    title: 'Security at Scale',
    description: 'Cloud security assessments, compliance automation, and proactive monitoring.'
  },
  {
    title: 'Operational Excellence',
    description: 'DevOps playbooks, observability, and FinOps best practices to reduce cloud spend.'
  }
];

const heroImages = [heroImage1];

export default function CloudSolutions() {
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
            {/* Lighter shading overlay for contrast */}
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'linear-gradient(90deg, rgba(14,54,92,0.65) 60%, rgba(14,54,92,0.3) 100%)', 
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
            color: '#0e365c',
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
            <h1 className="fw-bold mb-2" style={{ fontSize: '2.2rem', letterSpacing: '1px', color: '#0e365c' }}>
              Cloud Solutions & DevOps Services
            </h1>
            <p className="text-muted mx-auto mb-0" style={{ fontSize: '1rem', lineHeight: '1.6', maxWidth: '700px' }}>
              Secure multi-cloud solutions that accelerate innovation and optimize costs.
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
                <h2 className="text-dark mb-3" style={{ fontSize: '1.35rem' }}>Cloud-native engineering for scale and speed</h2>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                  We help organizations modernize infrastructure, build cloud-native platforms, and run reliable operations. Whether you are migrating from legacy data centers or optimizing an existing cloud footprint, we align technology decisions with business outcomes.
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
                  alt="Cloud Solutions" 
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
                    {idx === 0 && <FaServer />} {idx === 1 && <FaCloud />} {idx === 2 && <FaTools />} {idx === 3 && <FaChartLine />}
                  </div>
                  <h5 className="fw-semibold mb-0" style={{ fontSize: '1.05rem', color: '#0e365c' }}>{item.title}</h5>
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
            <h2 className="text-dark" style={{ fontSize: '1.35rem' }}>Cloud platforms and tools</h2>
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
            <h2 className="text-dark" style={{ fontSize: '1.35rem' }}>Outcome-driven cloud adoption</h2>
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
                  <div className="position-absolute" style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#0e365c', top: '6px', left: '-8px' }}></div>
                  <div className="text-tech-primary" style={{ fontSize: '1.6rem' }}>{step.icon}</div>
                  <div>
                    <h5 className="fw-semibold mb-2" style={{ fontSize: '1.05rem', color: '#0e365c' }}>{step.title}</h5>
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
                    {idx === 0 && <FaCloud />} {idx === 1 && <FaShieldAlt />} {idx === 2 && <FaTools />}
                  </div>
                  <h5 className="fw-semibold mb-0" style={{ fontSize: '1.05rem', color: '#0e365c' }}>{benefit.title}</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* CTA */}
      <section className="py-4" style={{ background: '#0e365c' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '1000px' }}>
          <div className="row align-items-center g-4">
            <div className="col-lg-8 text-white">
              <h2 className="fw-bold mb-2" style={{ fontSize: '1.6rem' }}>Make the cloud your competitive advantage</h2>
              <p className="mb-0" style={{ fontSize: '0.95rem', opacity: 0.85 }}>
                Chat with our cloud architects to assess your environment, identify quick wins, and define your modernization roadmap.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end text-start">
              <motion.button
                onClick={openModal}
                whileHover={{ y: -2 }}
                className="btn px-4 py-2 fw-semibold border-0"
                style={{ backgroundColor: '#fff', color: '#0e365c', borderRadius: '8px' }}
              >
                Schedule a Consultation
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

