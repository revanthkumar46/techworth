import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import { ContactModalProvider, useContactModal } from './contexts/ContactModalContext';
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

function AppContent() {
  const { isOpen, closeModal } = useContactModal();

  return (
    <>
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
      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ContactModalProvider>
        <AppContent />
      </ContactModalProvider>
    </BrowserRouter>
  );
}

export default App;
