import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import axios from 'axios';
import { FaSearch, FaSpinner, FaTrash, FaDownload, FaToggleOn, FaToggleOff, FaSync } from 'react-icons/fa';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  useEffect(() => {
    fetchSubscribers();
  }, [currentPage, statusFilter, search]);

  // Auto-refresh data every 30 seconds when on this page
  useEffect(() => {
    const interval = setInterval(() => {
      fetchSubscribers();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 20,
        ...(statusFilter !== '' && { is_active: statusFilter }),
        ...(search && { search })
      });

      const response = await axios.get(`${API_BASE_URL}/api/admin/newsletter?${params}`, {
        withCredentials: true
      });

      if (response.data.success) {
        setSubscribers(response.data.subscribers || []);
        setPagination(response.data.pagination || {});
      }
    } catch (err) {
      console.error('Failed to fetch subscribers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/api/admin/newsletter/${id}/toggle`, {}, {
        withCredentials: true
      });
      fetchSubscribers();
    } catch (err) {
      alert('Failed to toggle status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this subscriber?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/newsletter/${id}`, {
        withCredentials: true
      });
      fetchSubscribers();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const handleExport = () => {
    window.open(`${API_BASE_URL}/api/admin/newsletter/export`, '_blank');
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-0">Newsletter Subscribers</h2>
            <small className="text-muted">{pagination.total || 0} Total Subscribers</small>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary" onClick={fetchSubscribers} title="Refresh">
              <FaSync />
            </button>
            <button className="btn btn-primary" onClick={handleExport}>
              <FaDownload /> Export CSV
            </button>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text"><FaSearch /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search email..."
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
              <option value="">All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <FaSpinner className="spinner-border" style={{ fontSize: '2rem' }} />
          </div>
        ) : (
          <>
            {subscribers.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <p>No subscribers found</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Subscribed</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub) => (
                    <tr key={sub.id}>
                      <td>{sub.email}</td>
                      <td>
                        <span className={`badge bg-${sub.is_active ? 'success' : 'secondary'}`}>
                          {sub.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>{new Date(sub.subscribed_at).toLocaleDateString()}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-info"
                            onClick={() => handleToggle(sub.id)}
                            title={sub.is_active ? 'Deactivate' : 'Activate'}
                          >
                            {sub.is_active ? <FaToggleOn /> : <FaToggleOff />}
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(sub.id)}
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
            )}

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
      </div>
    </AdminLayout>
  );
}

