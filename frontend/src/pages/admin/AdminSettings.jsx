import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import axios from 'axios';
import { FaSpinner, FaSave } from 'react-icons/fa';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function AdminSettings() {
  const [templates, setTemplates] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('templates');
  const [editingTemplate, setEditingTemplate] = useState(null);

  useEffect(() => {
    if (activeTab === 'templates') {
      fetchTemplates();
    } else {
      fetchLogs();
    }
  }, [activeTab]);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/admin/settings/email-templates`, {
        withCredentials: true
      });
      if (response.data.success) {
        setTemplates(response.data.templates || []);
      }
    } catch (err) {
      console.error('Failed to fetch templates:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/admin/settings/activity-logs`, {
        withCredentials: true
      });
      if (response.data.success) {
        setLogs(response.data.logs || []);
      }
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTemplate = async (template) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/admin/settings/email-templates/${template.id}`,
        {
          subject: template.subject,
          body: template.body,
          variables: template.variables || {}
        },
        { withCredentials: true }
      );
      setEditingTemplate(null);
      fetchTemplates();
      alert('Template updated successfully');
    } catch (err) {
      alert('Failed to update template');
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        <h2 className="mb-4">Settings</h2>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'templates' ? 'active' : ''}`}
              onClick={() => setActiveTab('templates')}
            >
              Email Templates
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'logs' ? 'active' : ''}`}
              onClick={() => setActiveTab('logs')}
            >
              Activity Logs
            </button>
          </li>
        </ul>

        {loading ? (
          <div className="text-center py-5">
            <FaSpinner className="spinner-border" style={{ fontSize: '2rem' }} />
          </div>
        ) : activeTab === 'templates' ? (
          <div className="row">
            {templates.map((template) => (
              <div key={template.id} className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{template.name}</h5>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setEditingTemplate(editingTemplate?.id === template.id ? null : template)}
                    >
                      {editingTemplate?.id === template.id ? 'Cancel' : 'Edit'}
                    </button>
                  </div>
                  <div className="card-body">
                    {editingTemplate?.id === template.id ? (
                      <div>
                        <div className="mb-3">
                          <label className="form-label">Subject</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editingTemplate.subject}
                            onChange={(e) =>
                              setEditingTemplate({ ...editingTemplate, subject: e.target.value })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Body</label>
                          <textarea
                            className="form-control"
                            rows="10"
                            value={editingTemplate.body}
                            onChange={(e) =>
                              setEditingTemplate({ ...editingTemplate, body: e.target.value })
                            }
                          />
                        </div>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSaveTemplate(editingTemplate)}
                        >
                          <FaSave /> Save
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p><strong>Subject:</strong> {template.subject}</p>
                        <p><strong>Body:</strong></p>
                        <pre className="bg-light p-3 rounded" style={{ whiteSpace: 'pre-wrap' }}>
                          {template.body}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Admin</th>
                  <th>Action</th>
                  <th>Resource</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.username || 'System'}</td>
                    <td>{log.action}</td>
                    <td>{log.resource_type || 'N/A'}</td>
                    <td>{new Date(log.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}


