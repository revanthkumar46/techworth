import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCogs, FaLightbulb, FaRocket, FaHandsHelping, FaQuoteLeft } from 'react-icons/fa';
import { useContactModal } from '../contexts/ContactModalContext';
import heroImage from '../assets/our=services-hero.jpg';
import createValueGif from '../assets/create-value.gif';
import qualityGif from '../assets/Quality.gif';
import costEffectiveGif from '../assets/cost-effective.gif';
import webdevGif from '../assets/webdev-services.gif';
import cloudGif from '../assets/cloud-services.gif';
import mobileGif from '../assets/mobile-app-services.gif';
import testingGif from '../assets/Testing-services.gif';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const iconMap = {
  'Web Development': webdevGif,
  'Mobile Apps': mobileGif,
  'Cloud Solutions': cloudGif,
  'Testing & QA': testingGif
};

const serviceDetails = {
  'Web Development': {
    bullets: [
      'Frontend excellence with React, Vue, and performant UI design',
      'Backend architecture using Node.js, Nest, or Go',
      'SEO-ready, accessible, and analytics-enabled experiences'
    ],
    link: '/services/web-development'
  },
  'Mobile Apps': {
    bullets: [
      'Native iOS and Android or cross-platform React Native builds',
      'Offline-first, secure mobile experiences',
      'Rigorous QA on real devices and emulators'
    ],
    link: '/services/mobile-apps'
  },
  'Cloud Solutions': {
    bullets: [
      'Cloud architecture design and cost optimization',
      'Infrastructure as code with Terraform and pipelines',
      'Observability, security, and compliance baked in'
    ],
    link: '/services/cloud-solutions'
  },
  'Testing & QA': {
    bullets: [
      'Automation suites for web, mobile, and API layers',
      'Performance, security, and regression coverage',
      'CI/CD integration with reporting dashboards'
    ],
    link: '/services/testing-qa'
  }
};

const approachSteps = [
  {
    title: 'Discover & Strategize',
    description: 'Deep-dive workshops to align on goals, audiences, and success metrics. We define measurable outcomes and roadmap the workstream together.',
    icon: <FaLightbulb />,
    delay: 0
  },
  {
    title: 'Design & Prototype',
    description: 'Translate insights into wireframes, interactive prototypes, and design systems. Feedback loops with your stakeholders keep the vision aligned.',
    icon: <FaHandsHelping />,
    delay: 0.1
  },
  {
    title: 'Build & Integrate',
    description: 'Iterate quickly using modern stacks, automated testing, and CI/CD pipelines. Our engineers collaborate closely with your teams for smooth delivery.',
    icon: <FaCogs />,
    delay: 0.2
  },
  {
    title: 'Launch & Scale',
    description: 'Deploy securely to the cloud, track KPIs, and optimize with ongoing improvements. We stay engaged to ensure adoption, reliability, and growth.',
    icon: <FaRocket />,
    delay: 0.3
  }
];

const testimonials = [
  {
    quote: 'Techworth accelerated our cloud migration with zero downtime, and our new platform scales effortlessly.',
    author: 'Samantha Lee',
    role: 'CTO, FinServe360'
  },
  {
    quote: 'Their QA automation reduced our regression cycles by 70%. The team is proactive and detail-obsessed.',
    author: 'Jeremy Collins',
    role: 'Head of Engineering, RetailHub'
  },
  {
    quote: 'From UX research to launch, Techworth has been a strategic partner who truly understands growth.',
    author: 'Priya Nair',
    role: 'Product Director, HealthSync'
  }
];

const animatedHighlights = [
  {
    gif: createValueGif,
    title: 'Value-Driven',
    description: 'Business outcomes are the north star for every release and iteration.'
  },
  {
    gif: qualityGif,
    title: 'Quality Assured',
    description: 'Automated testing, code reviews, and observability baked into every project.'
  },
  {
    gif: costEffectiveGif,
    title: 'Scalable Delivery',
    description: 'Flexible engagement models and global delivery ensure efficiency.'
  }
];

const SectionDivider = () => (
  <motion.div
    initial={{ width: 0, opacity: 0 }}
    whileInView={{ width: '100%', opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    style={{ height: '2px', background: 'linear-gradient(90deg, rgba(18,57,100,0) 0%, rgba(18,57,100,0.45) 50%, rgba(18,57,100,0) 100%)' }}
    className="mx-auto"
  />
);

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { openModal } = useContactModal();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const url = `${API_BASE_URL}/api/services`;
        const { data } = await axios.get(url);
        setServices(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load services right now. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const normalizedServices = useMemo(() => {
    return services.length
      ? services
      : [
          { id: 1, name: 'Web Development', description: 'Modern, responsive web applications built for speed and conversion.' },
          { id: 2, name: 'Mobile Apps', description: 'Native and cross-platform mobile experiences that delight users.' },
          { id: 3, name: 'Cloud Solutions', description: 'Secure, scalable infrastructure with automated deployments.' },
          { id: 4, name: 'Testing & QA', description: 'Comprehensive manual and automated testing to ship with confidence.' }
        ];
  }, [services]);

  return (
    <div className="">
      {/* Hero Section */}
      <section
        className="d-flex align-items-center justify-content-start position-relative"
        style={{
          minHeight: '400px',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(18,32,59,0.85) 60%, rgba(18,32,59,0.45) 100%)',
            zIndex: 2
          }}></div>
        </div>
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            minHeight: '400px',
            width: '100%',
            maxWidth: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
          className="container px-4 d-flex align-items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
            style={{ maxWidth: 560 }}
          >
            <h1 className="fw-bold mb-3" style={{ letterSpacing: '1px', fontSize: '2.4rem', color: '#fff', textShadow: '0 2px 12px rgba(10,10,40,0.25)' }}>
              Intelligent Services for Ambitious Teams
            </h1>
            <p className="mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.7', opacity: 0.9 }}>
              From strategy to launch, we partner with you to design, engineer, and scale digital products that stand out.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <motion.a
                href="#services"
                whileHover={{ y: -2, boxShadow: '0 8px 20px rgba(18,57,100,0.18)' }}
                className="btn px-4 py-2 fw-semibold"
                style={{ backgroundColor: '#fff', color: '#123964', borderRadius: '8px' }}
              >
                Explore Services
              </motion.a>
              <motion.a
                href="#approach"
                whileHover={{ y: -2 }}
                className="btn px-4 py-2 fw-semibold"
                style={{ border: '1px solid #fff', borderRadius: '8px', color: '#fff', background: 'transparent' }}
              >
                How We Work
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animated Highlights */}
      <section className="py-4 bg-light">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <div className="row g-4">
            {animatedHighlights.map((item, idx) => (
              <motion.div
                key={item.title}
                className="col-12 col-md-4 d-flex"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className="flex-fill d-flex align-items-center gap-3 p-3 bg-white" style={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                  <img src={item.gif} alt={item.title} style={{ width: '56px', height: '56px' }} />
                  <div>
                    <h5 className="fw-semibold mb-1" style={{ fontSize: '1.05rem', color: '#123964' }}>{item.title}</h5>
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <SectionDivider />
      <section id="services" className="py-5">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <h6 className="text-tech-primary fw-bold" style={{ letterSpacing: '1px' }}>SERVICES</h6>
            <h2 className="text-dark" style={{ fontSize: '1.6rem' }}>Solutions tailored for every stage of your product journey</h2>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>
              Modular offerings that combine strategy, engineering, and optimization.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-5">
              <p className="text-muted mb-0">{error}</p>
            </div>
          ) : (
            <div className="row g-4">
              {normalizedServices.map((service, idx) => (
                <motion.div
                  key={service.id || service.name}
                  className="col-12 col-md-6 d-flex"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <div className="flex-fill p-4 bg-white d-flex flex-column" style={{ borderRadius: '12px', border: '1px solid #e5e7eb', gap: '1rem' }}>
                    <div className="d-flex align-items-center gap-3">
                      <img src={iconMap[service.name] || createValueGif} alt={service.name} style={{ width: '60px', height: '60px' }} />
                      <div>
                        <h5 className="fw-semibold mb-1" style={{ fontSize: '1.05rem', color: '#123964' }}>{service.name}</h5>
                        <p className="text-muted mb-0" style={{ fontSize: '0.92rem' }}>{service.description}</p>
                      </div>
                    </div>
                    <ul className="text-muted" style={{ fontSize: '0.88rem', lineHeight: '1.6', paddingLeft: '1rem' }}>
                      {(serviceDetails[service.name]?.bullets || []).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <a
                      href={serviceDetails[service.name]?.link || '/services'}
                      className="text-tech-primary text-decoration-none fw-semibold align-self-start"
                      style={{ fontSize: '0.85rem' }}
                    >
                      Learn more →
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How We Deliver */}
      <SectionDivider />
      <section id="approach" className="py-5 bg-light">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <h6 className="text-tech-primary fw-bold" style={{ letterSpacing: '1px' }}>OUR APPROACH</h6>
            <h2 className="text-dark" style={{ fontSize: '1.6rem' }}>Built on collaboration, transparency, and measurable outcomes</h2>
          </motion.div>

          <div className="d-flex flex-column flex-lg-row align-items-stretch gap-4">
            {approachSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                className="flex-fill d-flex"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: step.delay }}
              >
                <div
                  className="position-relative flex-fill"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #d9e2ef',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    minHeight: '220px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.9rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#123964';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#123964';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = '#123964';
                    e.currentTarget.style.borderColor = '#d9e2ef';
                  }}
                >
                  <div
                    className="position-absolute"
                    style={{
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      border: '6px solid #2E4374'
                    }}
                  ></div>
                  {idx !== approachSteps.length - 1 && (
                    <div
                      className="position-absolute d-none d-lg-block"
                      style={{
                        top: '0',
                        right: '-60px',
                        width: '60px',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ height: '2px', backgroundColor: '#d9e2ef', width: '100%' }}></div>
                    </div>
                  )}
                  <div className="d-flex align-items-center gap-3" style={{ fontSize: '1.6rem' }}>
                    <span>{step.icon}</span>
                    <h5 className="fw-semibold mb-0" style={{ fontSize: '1rem' }}>{step.title}</h5>
                  </div>
                  <p className="mb-0" style={{ fontSize: '0.88rem', lineHeight: '1.55' }}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Clients */}
      <SectionDivider />
      <section className="py-5">
        <div className="container mx-auto px-4" style={{ maxWidth: '1000px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <h6 className="text-tech-primary fw-bold" style={{ letterSpacing: '1px' }}>OUR CLIENTS</h6>
            <h2 className="text-dark" style={{ fontSize: '1.6rem' }}>Partnering with innovators across industries</h2>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>
              From fintech to healthcare, retail to SaaS, we build trusted relationships with teams shaping the future.
            </p>
          </motion.div>

          <div className="row g-4 justify-content-center">
            {[
              { name: 'FinServe360', tagline: 'AI-driven financial services' },
              { name: 'HealthSync', tagline: 'Digital health platforms' },
              { name: 'RetailHub', tagline: 'Omnichannel retail solutions' },
              { name: 'EduPro Labs', tagline: 'Next-gen EdTech experiences' },
              { name: 'AutoCore', tagline: 'Connected automotive services' },
              { name: 'UrbanGrid', tagline: 'Smart city infrastructure' }
            ].map((client, idx) => (
              <motion.div
                key={client.name}
                className="col-6 col-md-4 col-lg-3 d-flex"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <div className="flex-fill text-center p-3 bg-light" style={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                  <div className="fw-bold mb-1" style={{ color: '#123964', fontSize: '1.05rem' }}>{client.name}</div>
                  <small className="text-muted" style={{ fontSize: '0.85rem' }}>{client.tagline}</small>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <SectionDivider />
      <section className="py-5">
        <div className="container mx-auto px-4" style={{ maxWidth: '1000px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <h6 className="text-tech-primary fw-bold" style={{ letterSpacing: '1px' }}>CLIENT STORIES</h6>
            <h2 className="text-dark" style={{ fontSize: '1.6rem' }}>Trusted by product and engineering leaders worldwide</h2>
          </motion.div>

          <div className="row g-4">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.author}
                className="col-12 col-md-4 d-flex"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <div className="flex-fill p-4 bg-light" style={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                  <FaQuoteLeft style={{ fontSize: '1.3rem', color: '#2E4374', opacity: 0.8 }} className="mb-3" />
                  <p className="text-muted" style={{ fontSize: '0.92rem', lineHeight: '1.7' }}>
                    {testimonial.quote}
                  </p>
                  <div className="mt-3">
                    <h6 className="fw-semibold mb-0" style={{ color: '#123964' }}>{testimonial.author}</h6>
                    <small className="text-muted">{testimonial.role}</small>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <SectionDivider />
      <section className="py-5" style={{ background: '#123964' }}>
        <div className="container mx-auto px-4" style={{ maxWidth: '1000px' }}>
          <div className="row align-items-center g-4">
            <div className="col-lg-8 text-white">
              <h2 className="fw-bold mb-2" style={{ fontSize: '1.6rem' }}>Let’s Build Something Remarkable</h2>
              <p className="mb-0" style={{ fontSize: '0.95rem', opacity: 0.85 }}>
                Whether it’s launching a new product or modernizing an existing platform, we’ll help you move faster with confidence.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end text-start">
              <motion.button
                onClick={openModal}
                whileHover={{ y: -2 }}
                className="btn px-4 py-2 fw-semibold border-0"
                style={{ backgroundColor: '#fff', color: '#123964', borderRadius: '8px' }}
              >
                Book a Strategy Call
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}









