import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import { ContactModalProvider, useContactModal } from './contexts/ContactModalContext';
import { AdminAuthProvider, useAdminAuth } from './contexts/AdminAuthContext';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminJobs from './pages/admin/AdminJobs';
import AdminContacts from './pages/admin/AdminContacts';
import AdminApplications from './pages/admin/AdminApplications';
import AdminNewsletter from './pages/admin/AdminNewsletter';
import AdminSettings from './pages/admin/AdminSettings';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Careers from './pages/Careers';
import WebDevelopment from './pages/WebDevelopment';
import MobileApps from './pages/MobileApps';
import CloudSolutions from './pages/CloudSolutions';
import TestingQA from './pages/TestingQA';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};



function AppContent() {
  const { isOpen, closeModal } = useContactModal();

  return (
    <>
            <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute>
              <AdminJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute>
              <AdminApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <ProtectedRoute>
              <AdminContacts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/newsletter"
          element={
            <ProtectedRoute>
              <AdminNewsletter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <AdminSettings />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Public Website Routes */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/web-development" element={<WebDevelopment />} />
                  <Route path="/services/mobile-apps" element={<MobileApps />} />
                  <Route path="/services/cloud-solutions" element={<CloudSolutions />} />
                  <Route path="/services/testing-qa" element={<TestingQA />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/careers" element={<Careers />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <ContactModalProvider>
          <AppContent />
        </ContactModalProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;
