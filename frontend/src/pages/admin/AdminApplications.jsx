import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import axios from 'axios';
import { 
  FaSearch, FaSpinner, FaEye, FaTrash, FaDownload, 
  FaFilePdf, FaFileWord, FaCheckCircle, FaTimesCircle,
  FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaMapMarkerAlt,
  FaCalendarAlt, FaStar, FaChartLine, FaFileAlt, FaChevronRight
} from 'react-icons/fa';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [selectedApp, setSelectedApp] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [previewMode, setPreviewMode] = useState(null); // 'resume' or 'cover-letter'
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [currentPage, statusFilter, search]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 20,
        ...(statusFilter && { status: statusFilter }),
        ...(search && { search })
      });

      const response = await axios.get(`${API_BASE_URL}/api/admin/applications?${params}`, {
        withCredentials: true
      });

      if (response.data.success) {
        setApplications(response.data.applications || []);
        setPagination(response.data.pagination || {});
      }
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status, notes = '') => {
    try {
      await axios.put(`${API_BASE_URL}/api/admin/applications/${id}/status`, 
        { status, admin_notes: notes }, 
        { withCredentials: true }
      );
      fetchApplications();
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, status, admin_notes: notes });
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleProceedToNextStep = async (id, currentStatus) => {
    const statusFlow = {
      'pending': 'reviewed',
      'reviewed': 'shortlisted',
      'shortlisted': 'hired'
    };
    
    const nextStatus = statusFlow[currentStatus] || 'reviewed';
    const confirmMessage = nextStatus === 'hired' 
      ? 'Mark this candidate as Hired?'
      : `Proceed to ${nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1)}?`;
    
    if (window.confirm(confirmMessage)) {
      await handleStatusChange(id, nextStatus);
    }
  };

  const handleAccept = async (id) => {
    if (window.confirm('Accept this application and proceed to review?')) {
      await handleStatusChange(id, 'reviewed', 'Application accepted for review');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/applications/${id}`, {
        withCredentials: true
      });
      fetchApplications();
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp(null);
      }
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const handleView = async (id) => {
    try {
      const [appResponse, analysisResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/admin/applications/${id}`, { withCredentials: true }),
        axios.get(`${API_BASE_URL}/api/admin/applications/${id}/analysis`, { withCredentials: true })
      ]);
      
      if (appResponse.data.success) {
        setSelectedApp(appResponse.data.application);
      }
      
      if (analysisResponse.data.success) {
        setAnalysis(analysisResponse.data.analysis);
      }
    } catch (err) {
      console.error('Failed to load application:', err);
      alert('Failed to load application');
    }
  };

  const handleDownloadResume = (id) => {
    window.open(`${API_BASE_URL}/api/admin/applications/${id}/resume`, '_blank');
  };

  const handleDownloadCoverLetter = (id) => {
    window.open(`${API_BASE_URL}/api/admin/applications/${id}/cover-letter`, '_blank');
  };

  const handlePreviewResume = (id) => {
    setPreviewMode('resume');
    // Open preview in new window/modal
    const previewUrl = `${API_BASE_URL}/api/admin/applications/${id}/resume/preview`;
    window.open(previewUrl, '_blank', 'width=800,height=900');
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      'pending': 'bg-warning',
      'reviewed': 'bg-info',
      'shortlisted': 'bg-primary',
      'rejected': 'bg-danger',
      'hired': 'bg-success'
    };
    return classes[status] || 'bg-secondary';
  };

  const getStatusIcon = (status) => {
    if (status === 'hired') return <FaCheckCircle className="me-1" />;
    if (status === 'rejected') return <FaTimesCircle className="me-1" />;
    return null;
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Job Applications</h2>
          <div className="badge bg-primary fs-6">{pagination.total || 0} Total</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text"><FaSearch /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email, or job title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
              <option value="hired">Hired</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <FaSpinner className="spinner-border" style={{ fontSize: '2rem' }} />
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Candidate</th>
                    <th>Job Position</th>
                    <th>Status</th>
                    <th>Files</th>
                    <th>Date Applied</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-5 text-muted">
                        No applications found
                      </td>
                    </tr>
                  ) : (
                    applications.map((app) => (
                      <tr key={app.id}>
                        <td>
                          <div>
                            <strong>{app.full_name}</strong>
                            <br />
                            <small className="text-muted">
                              <FaEnvelope className="me-1" size={10} />
                              {app.email}
                            </small>
                          </div>
                        </td>
                        <td>
                          <div>
                            {app.job_title || 'N/A'}
                            {app.job_location && (
                              <small className="text-muted d-block">
                                <FaMapMarkerAlt size={10} className="me-1" />
                                {app.job_location}
                              </small>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(app.status || 'pending')} text-white`}>
                            {getStatusIcon(app.status || 'pending')}
                            {(app.status || 'pending').charAt(0).toUpperCase() + (app.status || 'pending').slice(1)}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-1">
                            {app.resume_path && (
                              <button
                                className="btn btn-sm btn-outline-primary"
                                title="Resume"
                                onClick={() => handlePreviewResume(app.id)}
                              >
                                <FaFilePdf />
                              </button>
                            )}
                            {(app.cover_letter || app.cover_letter_path) && (
                              <span className="btn btn-sm btn-outline-success" title="Cover Letter">
                                <FaFileAlt />
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <small>
                            <FaCalendarAlt className="me-1" size={10} />
                            {new Date(app.created_at).toLocaleDateString()}
                          </small>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => handleView(app.id)}
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            {app.resume_path && (
                              <button
                                className="btn btn-outline-info"
                                onClick={() => handleDownloadResume(app.id)}
                                title="Download Resume"
                              >
                                <FaDownload />
                              </button>
                            )}
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleDelete(app.id)}
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {pagination.pages > 1 && (
              <nav>
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
                      Previous
                    </button>
                  </li>
                  {[...Array(pagination.pages)].map((_, i) => (
                    <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === pagination.pages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(p => Math.min(pagination.pages, p + 1))}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}

        {/* Application Detail Modal */}
        {selectedApp && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title d-flex align-items-center">
                    <FaUser className="me-2" />
                    Application Details
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => {
                    setSelectedApp(null);
                    setAnalysis(null);
                  }}></button>
                </div>
                <div className="modal-body">
                  {/* Analysis Section */}
                  {analysis && (
                    <div className="card mb-4 border-primary">
                      <div className="card-header bg-primary text-white">
                        <FaChartLine className="me-2" />
                        Application Analysis
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <h6 className="text-muted">Completeness Score</h6>
                            <div className="progress mb-3" style={{ height: '25px' }}>
                              <div 
                                className={`progress-bar ${analysis.completeness.score >= 80 ? 'bg-success' : analysis.completeness.score >= 60 ? 'bg-warning' : 'bg-danger'}`}
                                role="progressbar" 
                                style={{ width: `${analysis.completeness.score}%` }}
                              >
                                {analysis.completeness.score}%
                              </div>
                            </div>
                            <div className="small">
                              <div className="d-flex justify-content-between mb-1">
                                <span>Resume:</span>
                                <span>{analysis.completeness.resume ? '✓' : '✗'}</span>
                              </div>
                              <div className="d-flex justify-content-between mb-1">
                                <span>Cover Letter:</span>
                                <span>{analysis.completeness.coverLetter ? '✓' : '✗'}</span>
                              </div>
                              <div className="d-flex justify-content-between mb-1">
                                <span>Skills:</span>
                                <span>{analysis.completeness.skills ? '✓' : '✗'}</span>
                              </div>
                              <div className="d-flex justify-content-between mb-1">
                                <span>Experience:</span>
                                <span>{analysis.completeness.experience ? '✓' : '✗'}</span>
                              </div>
                              <div className="d-flex justify-content-between">
                                <span>Education:</span>
                                <span>{analysis.completeness.education ? '✓' : '✗'}</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <h6 className="text-muted">File Information</h6>
                            {analysis.fileInfo.resume && (
                              <div className="mb-2 p-2 bg-light rounded">
                                <FaFilePdf className="me-2 text-danger" />
                                <strong>Resume:</strong> {analysis.fileInfo.resume.name}
                                <br />
                                <small className="text-muted">Format: {analysis.fileInfo.resume.ext.toUpperCase()}</small>
                              </div>
                            )}
                            {analysis.fileInfo.coverLetter && (
                              <div className="p-2 bg-light rounded">
                                <FaFileWord className="me-2 text-primary" />
                                <strong>Cover Letter File:</strong> {analysis.fileInfo.coverLetter.name}
                                <br />
                                <small className="text-muted">Format: {analysis.fileInfo.coverLetter.ext.toUpperCase()}</small>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="row">
                    {/* Left Column - Personal Info */}
                    <div className="col-md-6">
                      <h5 className="border-bottom pb-2 mb-3">Personal Information</h5>
                      <div className="mb-3">
                        <strong><FaUser className="me-2" />Full Name:</strong>
                        <p className="mb-0">{selectedApp.full_name}</p>
                      </div>
                      <div className="mb-3">
                        <strong><FaEnvelope className="me-2" />Email:</strong>
                        <p className="mb-0">{selectedApp.email}</p>
                      </div>
                      {selectedApp.mobile && (
                        <div className="mb-3">
                          <strong><FaPhone className="me-2" />Mobile:</strong>
                          <p className="mb-0">{selectedApp.mobile}</p>
                        </div>
                      )}
                      {selectedApp.location && (
                        <div className="mb-3">
                          <strong><FaMapMarkerAlt className="me-2" />Location:</strong>
                          <p className="mb-0">{selectedApp.location}</p>
                        </div>
                      )}
                      {selectedApp.gender && (
                        <div className="mb-3">
                          <strong>Gender:</strong>
                          <p className="mb-0">{selectedApp.gender}</p>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Education & Job */}
                    <div className="col-md-6">
                      <h5 className="border-bottom pb-2 mb-3">Education & Job</h5>
                      {selectedApp.college_name && (
                        <div className="mb-3">
                          <strong><FaGraduationCap className="me-2" />College:</strong>
                          <p className="mb-0">{selectedApp.college_name}</p>
                        </div>
                      )}
                      {selectedApp.graduation_year && (
                        <div className="mb-3">
                          <strong><FaCalendarAlt className="me-2" />Graduation Year:</strong>
                          <p className="mb-0">{selectedApp.graduation_year}</p>
                        </div>
                      )}
                      {selectedApp.cgpa && (
                        <div className="mb-3">
                          <strong><FaStar className="me-2" />CGPA/Percentage:</strong>
                          <p className="mb-0">{selectedApp.cgpa}</p>
                        </div>
                      )}
                      {selectedApp.job_title && (
                        <div className="mb-3">
                          <strong>Applied For:</strong>
                          <p className="mb-0">
                            <span className="badge bg-primary">{selectedApp.job_title}</span>
                            {selectedApp.job_location && (
                              <small className="text-muted ms-2">{selectedApp.job_location}</small>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Skills & Technologies */}
                  {(selectedApp.skills || selectedApp.technologies) && (
                    <div className="mt-4">
                      <h5 className="border-bottom pb-2 mb-3">Skills & Technologies</h5>
                      <div className="row">
                        {selectedApp.skills && (
                          <div className="col-md-6 mb-3">
                            <strong>Skills:</strong>
                            <p className="mb-0">{selectedApp.skills}</p>
                          </div>
                        )}
                        {selectedApp.technologies && (
                          <div className="col-md-6 mb-3">
                            <strong>Technologies:</strong>
                            <p className="mb-0">{selectedApp.technologies}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  {selectedApp.experience_text && (
                    <div className="mt-4">
                      <h5 className="border-bottom pb-2 mb-3">Experience</h5>
                      <p className="border p-3 rounded bg-light">{selectedApp.experience_text}</p>
                    </div>
                  )}

                  {/* Cover Letter */}
                  {selectedApp.cover_letter && (
                    <div className="mt-4">
                      <h5 className="border-bottom pb-2 mb-3">Cover Letter</h5>
                      <div className="border p-3 rounded bg-light" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{selectedApp.cover_letter}</p>
                      </div>
                    </div>
                  )}

                  {/* Admin Notes */}
                  {selectedApp.admin_notes && (
                    <div className="mt-4">
                      <h5 className="border-bottom pb-2 mb-3">Admin Notes</h5>
                      <div className="border p-3 rounded bg-warning bg-opacity-10">
                        <p className="mb-0">{selectedApp.admin_notes}</p>
                      </div>
                    </div>
                  )}

                  {/* Files Section */}
                  <div className="mt-4">
                    <h5 className="border-bottom pb-2 mb-3">Files</h5>
                    <div className="d-flex gap-2 flex-wrap">
                      {selectedApp.resume_path && (
                        <div>
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => handlePreviewResume(selectedApp.id)}
                          >
                            <FaFilePdf className="me-2" />
                            Preview Resume
                          </button>
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleDownloadResume(selectedApp.id)}
                          >
                            <FaDownload className="me-2" />
                            Download Resume
                          </button>
                        </div>
                      )}
                      {selectedApp.cover_letter_path && (
                        <button
                          className="btn btn-outline-success"
                          onClick={() => handleDownloadCoverLetter(selectedApp.id)}
                        >
                          <FaDownload className="me-2" />
                          Download Cover Letter
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <div>
                      <label className="form-label me-2">Status:</label>
                      <select
                        className="form-select form-select-sm d-inline-block"
                        style={{ width: '150px' }}
                        value={selectedApp.status || 'pending'}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          const notes = prompt('Add notes (optional):', selectedApp.admin_notes || '');
                          if (notes !== null) {
                            handleStatusChange(selectedApp.id, newStatus, notes);
                          }
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                        <option value="hired">Hired</option>
                      </select>
                    </div>
                    <div className="d-flex gap-2">
                      {(selectedApp.status === 'pending' || !selectedApp.status) && (
                        <button
                          className="btn btn-success"
                          onClick={() => handleAccept(selectedApp.id)}
                        >
                          <FaCheckCircle className="me-2" />
                          Accept & Review
                        </button>
                      )}
                      {selectedApp.status && selectedApp.status !== 'rejected' && selectedApp.status !== 'hired' && (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleProceedToNextStep(selectedApp.id, selectedApp.status)}
                        >
                          Proceed to Next Step
                          <FaChevronRight className="ms-2" />
                        </button>
                      )}
                      <button type="button" className="btn btn-secondary" onClick={() => {
                        setSelectedApp(null);
                        setAnalysis(null);
                      }}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
