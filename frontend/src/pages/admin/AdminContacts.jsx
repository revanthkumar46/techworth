import { useEffect, useState, useCallback } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import axios from 'axios';
import { FaSearch, FaSpinner, FaEye, FaTrash } from 'react-icons/fa';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [selectedContact, setSelectedContact] = useState(null);

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 20,
        ...(statusFilter && { status: statusFilter }),
        ...(search && { search })
      });

      const response = await axios.get(`${API_BASE_URL}/api/admin/contacts?${params}`, {
        withCredentials: true
      });

      if (response.data.success) {
        setContacts(response.data.contacts || []);
        setPagination(response.data.pagination || {});
      }
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, search]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/api/admin/contacts/${id}/status`, { status }, {
        withCredentials: true
      });
      fetchContacts();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/contacts/${id}`, {
        withCredentials: true
      });
      fetchContacts();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/contacts/${id}`, {
        withCredentials: true
      });
      if (response.data.success) {
        setSelectedContact(response.data.contact);
      }
    } catch (err) {
      alert('Failed to load contact');
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        <h2 className="mb-4">Contact Messages</h2>

        <div className="row mb-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text"><FaSearch /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
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
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
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
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.subject}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={contact.status}
                          onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>
                      <td>{new Date(contact.created_at).toLocaleDateString()}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleView(contact.id)}
                          >
                            <FaEye />
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(contact.id)}
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

        {selectedContact && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Contact Details</h5>
                  <button type="button" className="btn-close" onClick={() => setSelectedContact(null)}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Name:</strong> {selectedContact.name}</p>
                  <p><strong>Email:</strong> {selectedContact.email}</p>
                  <p><strong>Phone:</strong> {selectedContact.phone || 'N/A'}</p>
                  <p><strong>Subject:</strong> {selectedContact.subject}</p>
                  <p><strong>Message:</strong></p>
                  <p>{selectedContact.message}</p>
                  <p><strong>Date:</strong> {new Date(selectedContact.created_at).toLocaleString()}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedContact(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}


