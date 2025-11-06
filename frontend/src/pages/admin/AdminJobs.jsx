import { useEffect, useState, useCallback } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaSpinner } from 'react-icons/fa';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    job_type: 'full_time',
    salary_range: '',
    category: '',
    status: 'draft',
    application_deadline: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 20,
        ...(statusFilter && { status: statusFilter }),
        ...(search && { search })
      });

      const response = await axios.get(`${API_BASE_URL}/api/admin/jobs?${params}`, {
        withCredentials: true
      });

      if (response.data.success) {
        setJobs(response.data.jobs || []);
        setPagination(response.data.pagination || {});
      }
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, search]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requirements = Array.isArray(formData.requirements)
        ? formData.requirements.join('\n')
        : formData.requirements;

      const payload = { ...formData, requirements };

      if (editingJob) {
        await axios.put(`${API_BASE_URL}/api/admin/jobs/${editingJob.id}`, payload, {
          withCredentials: true
        });
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/jobs`, payload, {
          withCredentials: true
        });
      }

      setShowModal(false);
      setEditingJob(null);
      resetForm();
      fetchJobs();
    } catch (err) {
      alert('Failed to save job');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/admin/jobs/${id}`, {
        withCredentials: true
      });
      fetchJobs();
    } catch (err) {
      alert('Failed to delete job');
      console.error(err);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title || '',
      description: job.description || '',
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : job.requirements || '',
      location: job.location || '',
      job_type: job.job_type || 'full_time',
      salary_range: job.salary_range || '',
      category: job.category || '',
      status: job.status || 'draft',
      application_deadline: job.application_deadline ? job.application_deadline.split('T')[0] : ''
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      requirements: '',
      location: '',
      job_type: 'full_time',
      salary_range: '',
      category: '',
      status: 'draft',
      application_deadline: ''
    });
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Jobs Management</h2>
          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => {
              setEditingJob(null);
              resetForm();
              setShowModal(true);
            }}
          >
            <FaPlus /> Add New Job
          </button>
        </div>

        {/* Filters */}
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text"><FaSearch /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search jobs..."
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
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Jobs Table */}
        {loading ? (
          <div className="text-center py-5">
            <FaSpinner className="spinner-border" style={{ fontSize: '2rem' }} />
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Applications</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.title}</td>
                      <td>{job.location || 'N/A'}</td>
                      <td>{job.job_type?.replace('_', ' ')}</td>
                      <td>
                        <span className={`badge bg-${
                          job.status === 'active' ? 'success' :
                          job.status === 'draft' ? 'warning' : 'secondary'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td>{job.application_count || 0}</td>
                      <td>{new Date(job.created_at).toLocaleDateString()}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleEdit(job)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(job.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
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

        {/* Modal */}
        {showModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editingJob ? 'Edit Job' : 'Create New Job'}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description *</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Location</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Job Type</label>
                        <select
                          className="form-select"
                          value={formData.job_type}
                          onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
                        >
                          <option value="full_time">Full Time</option>
                          <option value="part_time">Part Time</option>
                          <option value="contract">Contract</option>
                          <option value="internship">Internship</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Requirements (one per line)</label>
                      <textarea
                        className="form-control"
                        rows="5"
                        value={formData.requirements}
                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Salary Range</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.salary_range}
                          onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Status</label>
                        <select
                          className="form-select"
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                          <option value="draft">Draft</option>
                          <option value="active">Active</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Application Deadline</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.application_deadline}
                        onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingJob ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}


