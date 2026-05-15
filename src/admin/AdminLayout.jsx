import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Image, Users, Newspaper, BookOpen, Calendar, Settings, LogOut, GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { authStore } from '../utils/storage';
import './AdminLayout.css';
import logoUrl from '../assets/logo.png';

const menuItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/galeri', label: 'Galeri Foto', icon: Image },
  { path: '/admin/struktur', label: 'Struktur Organisasi', icon: Users },
  { path: '/admin/berita', label: 'Berita & Artikel', icon: Newspaper },
  { path: '/admin/jurnal', label: 'Jurnal & Materi', icon: BookOpen },
  { path: '/admin/event', label: 'Event & Kegiatan', icon: Calendar },
  { path: '/admin/pengaturan', label: 'Pengaturan', icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.logout();
    navigate('/admin');
  };

  return (
    <div className="admin">
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__header">
          <div className="admin-sidebar__brand">
            <div className="admin-sidebar__logo" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}><img src={logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
            <div>
              <strong>HMP PGMI UNIRA MALANG</strong>
              <span>Admin Panel</span>
            </div>
          </div>
          <button className="admin-sidebar__close" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="admin-sidebar__nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `admin-sidebar__link ${isActive ? 'admin-sidebar__link--active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <button className="admin-sidebar__link admin-sidebar__logout" onClick={handleLogout}>
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

      <main className="admin-main">
        <header className="admin-topbar">
          <button className="admin-topbar__menu" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <h2 className="admin-topbar__title">Admin Panel</h2>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
