import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { seedData, authStore } from './utils/storage';

// Public
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import TentangKami from './pages/TentangKami';
import Event from './pages/Event';
import EventDetail from './pages/EventDetail';
import Akademik from './pages/Akademik';
import Berita from './pages/Berita';
import BeritaDetail from './pages/BeritaDetail';
import Galeri from './pages/Galeri';
import Kontak from './pages/Kontak';

// Admin
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminBerita from './admin/AdminBerita';
import AdminEvent from './admin/AdminEvent';
import AdminGaleri from './admin/AdminGaleri';
import AdminStruktur from './admin/AdminStruktur';
import AdminJurnal from './admin/AdminJurnal';
import AdminPengaturan from './admin/AdminPengaturan';

// Seed data on first load
seedData();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function ProtectedRoute({ children }) {
  if (!authStore.isLoggedIn()) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/tentang" element={<TentangKami />} />
          <Route path="/event" element={<Event />} />
          <Route path="/event/:slug" element={<EventDetail />} />
          <Route path="/akademik" element={<Akademik />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/berita/:slug" element={<BeritaDetail />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/kontak" element={<Kontak />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="berita" element={<AdminBerita />} />
          <Route path="event" element={<AdminEvent />} />
          <Route path="galeri" element={<AdminGaleri />} />
          <Route path="struktur" element={<AdminStruktur />} />
          <Route path="jurnal" element={<AdminJurnal />} />
          <Route path="pengaturan" element={<AdminPengaturan />} />
        </Route>

        {/* Public Routes */}
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </Router>
  );
}
