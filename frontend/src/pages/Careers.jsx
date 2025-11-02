import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaBriefcase, FaMapMarkerAlt, FaClock, FaTimes, FaPaperPlane, FaGraduationCap, FaCode, FaUser, FaEnvelope, FaPhone, FaFileUpload } from 'react-icons/fa';
import careersHero from '../assets/careers-hero.jpg';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [jobsError, setJobsError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const initialApplicationState = {
    fullName: '',
    mobile: '',
    email: '',
    collegeName: '',
    location: '',
    graduationYear: '',
    cgpa: '',
    gender: '',
    resume: null,
    coverLetter: '',
    experience: '',
    skills: '',
    technologies: ''
  };
  const [applicationData, setApplicationData] = useState(initialApplicationState);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [applicationError, setApplicationError] = useState(null);
  const [globalMessage, setGlobalMessage] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const url = `${API_BASE_URL}/api/jobs`;
        const { data } = await axios.get(url);
        setJobs(data);
      } catch (error) {
        console.error(error);
        setJobsError('Unable to load job openings right now. Please try again later.');
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchJobs();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(['All']);
    jobs.forEach((job) => set.add(job.category));
    return Array.from(set);
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
      const skillsArray = Array.isArray(job.skills) ? job.skills : [];
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           skillsArray.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [jobs, selectedCategory, searchQuery]);

  const handleApply = (jobId) => {
    const job = jobs.find(job => job.id === jobId);
    if (!job) return;
    setSelectedJob(job);
    setApplicationStatus(null);
    setApplicationError(null);
    setApplicationData(initialApplicationState);
    setGlobalMessage(null);
    setShowApplicationForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setApplicationData(prev => ({ ...prev, resume: files[0] }));
    } else {
      setApplicationData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob) {
      setApplicationError('Please select a job before submitting your application.');
      return;
    }
    if (!applicationData.resume) {
      setApplicationError('Please attach your resume.');
      return;
    }

    try {
      setApplicationStatus('loading');
      setApplicationError(null);

      const url = `${API_BASE_URL}/api/applications`;
      const formData = new FormData();
      formData.append('jobId', selectedJob.id);
      formData.append('fullName', applicationData.fullName);
      formData.append('mobile', applicationData.mobile);
      formData.append('email', applicationData.email);
      formData.append('collegeName', applicationData.collegeName);
      formData.append('location', applicationData.location);
      formData.append('graduationYear', applicationData.graduationYear);
      formData.append('cgpa', applicationData.cgpa);
      formData.append('gender', applicationData.gender);
      formData.append('resume', applicationData.resume);
      formData.append('coverLetter', applicationData.coverLetter);
      formData.append('experience', applicationData.experience);
      formData.append('skills', applicationData.skills);
      formData.append('technologies', applicationData.technologies);

      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setApplicationStatus('success');
      setGlobalMessage('Application submitted successfully!');
      setTimeout(() => setGlobalMessage(null), 5000);
      setShowApplicationForm(false);
      setSelectedJob(null);
      setApplicationData(initialApplicationState);
    } catch (error) {
      console.error(error);
      setApplicationStatus('error');
      setApplicationError(
        error.response?.data?.message || 'Failed to submit application. Please try again.'
      );
    }
  };

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
            backgroundImage: `url(${careersHero})`,
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
            <h1 className="fw-bold mb-3" style={{ letterSpacing: '2px', fontSize: '2.6rem', color: '#fff', textShadow: '0 2px 12px rgba(10,10,40,.21)' }}>CAREERS</h1>
            <p style={{ opacity: 0.9, fontSize: '1.1rem', fontWeight: 400 }}>Join our team and build the future with innovative technology</p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-4 bg-light">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <div className="row g-3 align-items-end">
            <div className="col-md-8">
              <div className="position-relative">
                <FaSearch className="position-absolute" style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d', zIndex: 2 }} />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search jobs by title, skills, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '45px', borderRadius: '8px', border: '1px solid #e9ecef', fontSize: '0.95rem' }}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="position-relative">
                <FaFilter className="position-absolute" style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d', zIndex: 2 }} />
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ paddingLeft: '45px', borderRadius: '8px', border: '1px solid #e9ecef', fontSize: '0.95rem' }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-5">
        <div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <h6 className="text-tech-primary fw-bold mb-2" style={{ letterSpacing: '1px' }}>JOB OPENINGS</h6>
            <h2 className="text-dark" style={{ fontSize: '1.3rem' }}>Find Your Perfect Role</h2>
            <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>We have {filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''} available</p>
          </motion.div>

          {globalMessage && (
            <div className="alert alert-success" role="alert" style={{ borderRadius: '8px' }}>
              {globalMessage}
            </div>
          )}

          {loadingJobs ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : jobsError ? (
            <div className="text-center py-5">
              <p className="text-muted mb-2">{jobsError}</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-5">
              <FaBriefcase style={{ fontSize: '3rem', color: '#6c757d', opacity: 0.5, marginBottom: '1rem' }} />
              <p className="text-muted">No jobs found matching your criteria. Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredJobs.map((job, idx) => (
                <motion.div
                  key={job.id}
                  className="col-md-6 col-lg-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <motion.div
                    className="h-100 p-4"
                    style={{
                      borderRadius: '12px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e9ecef',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    whileHover={{ y: -6, boxShadow: '0 12px 28px rgba(0,0,0,0.12)' }}
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="mb-3">
                      <span className="badge" style={{ backgroundColor: '#2E4374', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem' }}>
                        {job.category}
                      </span>
                    </div>
                    <h5 className="fw-bold mb-2" style={{ fontSize: '1.1rem', color: '#212529' }}>{job.title}</h5>
                    <div className="d-flex flex-column gap-2 mb-3" style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                      <div className="d-flex align-items-center gap-2">
                        <FaMapMarkerAlt /> <span>{job.location}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <FaClock /> <span>{job.type}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <FaBriefcase /> <span>{job.experience}</span>
                      </div>
                    </div>
                    <p className="text-muted mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.6', flexGrow: 1 }}>
                      {job.description.substring(0, 120)}...
                    </p>
                    <div className="d-flex gap-2 mt-auto">
                      <button
                        className="btn flex-grow-1"
                        style={{ backgroundColor: '#2E4374', color: '#fff', borderRadius: '8px', fontSize: '0.9rem', padding: '8px 16px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApply(job.id);
                        }}
                      >
                        Apply Now
                      </button>
                      <button
                        className="btn"
                        style={{ backgroundColor: 'transparent', color: '#2E4374', border: '1px solid #2E4374', borderRadius: '8px', fontSize: '0.9rem', padding: '8px 16px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedJob(job);
                        }}
                      >
                        View More
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJob && !showApplicationForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, padding: '20px' }}
            onClick={() => {
              setSelectedJob(null);
              setApplicationStatus(null);
              setApplicationError(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded p-4"
              style={{ maxWidth: '700px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <span className="badge mb-2" style={{ backgroundColor: '#2E4374', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem' }}>
                    {selectedJob.category}
                  </span>
                  <h4 className="fw-bold mb-2">{selectedJob.title}</h4>
                  <div className="d-flex flex-wrap gap-3 mb-3" style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                    <div className="d-flex align-items-center gap-2">
                      <FaMapMarkerAlt /> <span>{selectedJob.location}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <FaClock /> <span>{selectedJob.type}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <FaBriefcase /> <span>{selectedJob.experience}</span>
                    </div>
                  </div>
                </div>
                <button
                  className="btn p-2"
                  onClick={() => {
                    setSelectedJob(null);
                    setApplicationStatus(null);
                    setApplicationError(null);
                  }}
                  style={{ border: 'none', background: 'transparent', fontSize: '1.5rem', color: '#6c757d' }}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="mb-4">
                <h6 className="fw-bold mb-2">Job Description</h6>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>{selectedJob.description}</p>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold mb-2">Requirements</h6>
                <ul className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
                  {(selectedJob.requirements || []).map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold mb-2">Skills</h6>
                <div className="d-flex flex-wrap gap-2">
                  {(selectedJob.skills || []).map((skill, idx) => (
                    <span key={idx} className="badge" style={{ backgroundColor: '#f8f9fa', color: '#2E4374', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold mb-2">Technologies</h6>
                <div className="d-flex flex-wrap gap-2">
                  {(selectedJob.technologies || []).map((tech, idx) => (
                    <span key={idx} className="badge" style={{ backgroundColor: '#eef4ff', color: '#2E4374', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="btn w-100"
                style={{ backgroundColor: '#2E4374', color: '#fff', borderRadius: '8px', fontSize: '1rem', padding: '12px' }}
                onClick={() => {
                  handleApply(selectedJob.id);
                }}
              >
                Apply Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showApplicationForm && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1001, padding: '20px' }}
            onClick={() => {
              setShowApplicationForm(false);
              setApplicationStatus(null);
              setApplicationError(null);
              setApplicationData(initialApplicationState);
              setSelectedJob(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded p-4"
              style={{ maxWidth: '700px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h4 className="fw-bold mb-1">Apply for {selectedJob.title}</h4>
                  <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Fill out the form below to submit your application</p>
                </div>
                <button
                  className="btn p-2"
                  onClick={() => {
                    setShowApplicationForm(false);
                    setApplicationStatus(null);
                    setApplicationError(null);
                    setApplicationData(initialApplicationState);
                    setSelectedJob(null);
                  }}
                  style={{ border: 'none', background: 'transparent', fontSize: '1.5rem', color: '#6c757d' }}
                >
                  <FaTimes />
                </button>
              </div>

              {applicationError && (
                <div className="alert alert-danger" role="alert" style={{ borderRadius: '8px' }}>
                  {applicationError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <FaUser className="me-2" /> Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      value={applicationData.fullName}
                      onChange={handleInputChange}
                      required
                      style={{ borderRadius: '8px', border: '1px solid #e9ecef' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <FaPhone className="me-2" /> Mobile Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="mobile"
                      value={applicationData.mobile}
                      onChange={handleInputChange}
                      required
                      style={{ borderRadius: '8px', border: '1px solid #e9ecef' }}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <FaEnvelope className="me-2" /> Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={applicationData.email}
                    onChange={handleInputChange}
                    required
                    style={{ borderRadius: '8px', border: '1px solid #e9ecef' }}
                  />
                </div>

                <hr className="my-4" />

                <h6 className="fw-bold mb-3">
                  <FaGraduationCap className="me-2" /> Education Details
                </h6>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">College Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="collegeName"
                      value={applicationData.collegeName}
                      onChange={handleInputChange}
                      required
                      style={{ borderRadius: '8px', border: '1px solid #e9ecef' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Location <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={applicationData.location}
                      onChange={handleInputChange}
                      required
                      style={{ borderRadius: '8px', border: '1px solid #e9ecef' }}
                    />
                  </div>
    </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Year of Graduation <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="graduationYear"
                      value={applicationData.graduationYear}
                      onChange={handleInputChange}
                      placeholder="e.g., 2024"
                      required
                      style={{ borderRadius: '8px', border: '1px solid #e9ecef' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">CGPA or Percentage <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="cgpa"
                      value={applicationData.cgpa}
                      onChange={handleInputChange}
                      placeholder="e.g., 8.5 or 85%"
                      required
                      style={{ borderRadius: '8px', border: '1px solid #e9ecef' }}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Gender <span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    name="gender"
                    value={applicationData.gender}
                    onChange={handleInputChange}
                    required
                    style={{ borderRadius: '8px', border: '1px solid #e9ecef' }}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <hr className="my-4" />

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <FaFileUpload className="me-2" /> Resume <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="resume"
                    onChange={handleInputChange}
                    accept=".pdf,.doc,.docx"
                    required
                    style={{ borderRadius: '8px', border: '1px solid #e9ecef' }}
                  />
                  <small className="text-muted">Accepted formats: PDF, DOC, DOCX (Max 5MB)</small>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Cover Letter (Optional)</label>
                  <textarea
                    className="form-control"
                    name="coverLetter"
                    value={applicationData.coverLetter}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Tell us why you're a great fit for this position..."
                    style={{ borderRadius: '8px', border: '1px solid #e9ecef' }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Experience (Optional for Freshers)</label>
                  <textarea
                    className="form-control"
                    name="experience"
                    value={applicationData.experience}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Briefly describe your relevant work experience..."
                    style={{ borderRadius: '8px', border: '1px solid #e9ecef' }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <FaCode className="me-2" /> Skills <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="skills"
                    value={applicationData.skills}
                    onChange={handleInputChange}
                    placeholder="e.g., JavaScript, React, Node.js"
                    required
                    style={{ borderRadius: '8px', border: '1px solid #e9ecef' }}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Technologies <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    name="technologies"
                    value={applicationData.technologies}
                    onChange={handleInputChange}
                    placeholder="e.g., MongoDB, Express, REST APIs"
                    required
                    style={{ borderRadius: '8px', border: '1px solid #e9ecef' }}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn flex-grow-1"
                    style={{ backgroundColor: '#6c757d', color: '#fff', borderRadius: '8px', padding: '12px' }}
                    onClick={() => {
                      setApplicationStatus(null);
                      setApplicationError(null);
                      setApplicationData(initialApplicationState);
                      setShowApplicationForm(false);
                      setSelectedJob(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn flex-grow-1"
                    disabled={applicationStatus === 'loading'}
                    style={{ backgroundColor: '#2E4374', color: '#fff', borderRadius: '8px', padding: '12px', opacity: applicationStatus === 'loading' ? 0.7 : 1 }}
                  >
                    {applicationStatus === 'loading' ? (
                      'Submitting...'
                    ) : (
                      <>
                        <FaPaperPlane className="me-2" /> Submit Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
