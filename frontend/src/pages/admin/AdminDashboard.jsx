import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import axios from 'axios';
import { FaEnvelope, FaBriefcase, FaFileAlt, FaUsers, FaSpinner, FaClock } from 'react-icons/fa';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsRes, activitiesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/admin/dashboard/stats`, { withCredentials: true }),
        axios.get(`${API_BASE_URL}/api/admin/dashboard/recent-activity`, { withCredentials: true })
      ]);

      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
      } else {
        setError('Failed to load statistics');
      }

      if (activitiesRes.data.success) {
        setActivities(activitiesRes.data.activities);
      } else {
        setError('Failed to load recent activity');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      new: '#123964',
      read: '#17a2b8',
      replied: '#28a745',
      archived: '#6c757d',
      pending: '#ffc107',
      reviewed: '#17a2b8',
      shortlisted: '#28a745',
      rejected: '#dc3545',
      hired: '#123964'
    };
    return colors[status] || '#6c757d';
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="text-center">
            <FaSpinner className="spinner-border text-tech-primary" style={{ fontSize: '2.5rem', width: '3rem', height: '3rem' }} />
            <p className="mt-3 text-muted">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="mb-4">
          <h2 className="mb-2" style={{ color: '#123964', fontSize: '1.75rem', fontWeight: '600' }}>
            Dashboard
          </h2>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>Overview of your admin activities</p>
        </div>

        {error && (
          <div
            className="alert alert-dismissible fade show"
            role="alert"
            style={{
              backgroundColor: '#fff3cd',
              borderColor: '#ffc107',
              color: '#856404',
              borderRadius: '8px'
            }}
          >
            <strong>Error:</strong> {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError(null)}
              aria-label="Close"
            ></button>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-6 col-lg-3">
            <div
              className="card border-0 h-100"
              style={{
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(18, 57, 100, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="text-muted mb-2" style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                      Total Contacts
                    </h6>
                    <h3 className="mb-1" style={{ color: '#123964', fontSize: '2rem', fontWeight: '700' }}>
                      {stats?.contacts?.total || 0}
                    </h3>
                    <small style={{ color: '#28a745', fontSize: '0.8rem', fontWeight: '500' }}>
                      New: {stats?.contacts?.new_count || 0}
                    </small>
                  </div>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(18, 57, 100, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FaEnvelope style={{ fontSize: '1.5rem', color: '#123964' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div
              className="card border-0 h-100"
              style={{
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(18, 57, 100, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="text-muted mb-2" style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                      Applications
                    </h6>
                    <h3 className="mb-1" style={{ color: '#123964', fontSize: '2rem', fontWeight: '700' }}>
                      {stats?.applications?.total || 0}
                    </h3>
                    <small style={{ color: '#ffc107', fontSize: '0.8rem', fontWeight: '500' }}>
                      Pending: {stats?.applications?.pending_count || 0}
                    </small>
                  </div>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(18, 57, 100, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FaFileAlt style={{ fontSize: '1.5rem', color: '#123964' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div
              className="card border-0 h-100"
              style={{
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(18, 57, 100, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="text-muted mb-2" style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                      Active Jobs
                    </h6>
                    <h3 className="mb-1" style={{ color: '#123964', fontSize: '2rem', fontWeight: '700' }}>
                      {stats?.jobs?.active_count || 0}
                    </h3>
                    <small style={{ color: '#17a2b8', fontSize: '0.8rem', fontWeight: '500' }}>
                      Total: {stats?.jobs?.total || 0}
                    </small>
                  </div>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(18, 57, 100, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FaBriefcase style={{ fontSize: '1.5rem', color: '#123964' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div
              className="card border-0 h-100"
              style={{
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(18, 57, 100, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="text-muted mb-2" style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                      Subscribers
                    </h6>
                    <h3 className="mb-1" style={{ color: '#123964', fontSize: '2rem', fontWeight: '700' }}>
                      {stats?.newsletter?.total || 0}
                    </h3>
                    <small style={{ color: '#6c757d', fontSize: '0.8rem', fontWeight: '500' }}>
                      Newsletter
                    </small>
                  </div>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(18, 57, 100, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FaUsers style={{ fontSize: '1.5rem', color: '#123964' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="row g-4">
          <div className="col-md-6">
            <div
              className="card border-0 h-100"
              style={{
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              <div
                className="card-header bg-white border-0 pb-3"
                style={{ borderBottom: '1px solid #e9ecef', borderRadius: '12px 12px 0 0' }}
              >
                <h5 className="mb-0" style={{ color: '#123964', fontSize: '1.1rem', fontWeight: '600' }}>
                  Recent Contacts
                </h5>
              </div>
              <div className="card-body p-0">
                {activities?.contacts && activities.contacts.length > 0 ? (
                  <div className="list-group list-group-flush">
                    {activities.contacts.slice(0, 5).map((contact, index) => (
                      <div
                        key={contact.id}
                        className="px-4 py-3"
                        style={{
                          borderBottom: index < activities.contacts.slice(0, 5).length - 1 ? '1px solid #e9ecef' : 'none',
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f8f9fa';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center gap-2 mb-1">
                              <strong style={{ color: '#212529', fontSize: '0.95rem' }}>
                                {contact.name}
                              </strong>
                            </div>
                            <small className="text-muted d-block mb-1" style={{ fontSize: '0.85rem' }}>
                              {contact.email}
                            </small>
                            <small className="d-block" style={{ color: '#6c757d', fontSize: '0.85rem' }}>
                              {contact.subject}
                            </small>
                          </div>
                          <div className="text-end ms-3">
                            <span
                              className="badge rounded-pill px-3 py-1"
                              style={{
                                backgroundColor: getStatusBadgeColor(contact.status),
                                color: 'white',
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                textTransform: 'capitalize'
                              }}
                            >
                              {contact.status}
                            </span>
                            <br />
                            <small className="text-muted d-block mt-1" style={{ fontSize: '0.75rem' }}>
                              {formatDate(contact.created_at)}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-5 text-center">
                    <FaClock style={{ fontSize: '2rem', color: '#dee2e6', marginBottom: '1rem' }} />
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>No recent contacts</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div
              className="card border-0 h-100"
              style={{
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              <div
                className="card-header bg-white border-0 pb-3"
                style={{ borderBottom: '1px solid #e9ecef', borderRadius: '12px 12px 0 0' }}
              >
                <h5 className="mb-0" style={{ color: '#123964', fontSize: '1.1rem', fontWeight: '600' }}>
                  Recent Applications
                </h5>
              </div>
              <div className="card-body p-0">
                {activities?.applications && activities.applications.length > 0 ? (
                  <div className="list-group list-group-flush">
                    {activities.applications.slice(0, 5).map((app, index) => (
                      <div
                        key={app.id}
                        className="px-4 py-3"
                        style={{
                          borderBottom: index < activities.applications.slice(0, 5).length - 1 ? '1px solid #e9ecef' : 'none',
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f8f9fa';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center gap-2 mb-1">
                              <strong style={{ color: '#212529', fontSize: '0.95rem' }}>
                                {app.full_name}
                              </strong>
                            </div>
                            <small className="text-muted d-block mb-1" style={{ fontSize: '0.85rem' }}>
                              {app.email}
                            </small>
                            <small className="d-block" style={{ color: '#6c757d', fontSize: '0.85rem' }}>
                              {app.job_title || 'N/A'}
                            </small>
                          </div>
                          <div className="text-end ms-3">
                            <span
                              className="badge rounded-pill px-3 py-1"
                              style={{
                                backgroundColor: getStatusBadgeColor(app.status),
                                color: 'white',
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                textTransform: 'capitalize'
                              }}
                            >
                              {app.status}
                            </span>
                            <br />
                            <small className="text-muted d-block mt-1" style={{ fontSize: '0.75rem' }}>
                              {formatDate(app.created_at)}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-5 text-center">
                    <FaClock style={{ fontSize: '2rem', color: '#dee2e6', marginBottom: '1rem' }} />
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>No recent applications</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
