import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';
import './Navbar.css';
import logoUrl from '../assets/logo.png';

const navLinks = [
  { path: '/', label: 'Beranda' },
  { path: '/tentang', label: 'Tentang Kami' },
  { path: '/event', label: 'Event' },
  { path: '/akademik', label: 'Akademik' },
  { path: '/berita', label: 'Berita' },
  { path: '/galeri', label: 'Galeri' },
  { path: '/kontak', label: 'Kontak' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand">
          <div className="navbar__logo" style={{ background: 'transparent', boxShadow: 'none' }}>
            <img src={logoUrl} alt="Logo HMP PGMI" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div className="navbar__brand-text">
            <span className="navbar__brand-name">HMP PGMI UNIRA MALANG</span>
            <span className="navbar__brand-sub">Himpunan Mahasiswa</span>
          </div>
        </Link>

        <div className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
            >
              {link.label}
              {location.pathname === link.path && <span className="navbar__link-indicator" />}
            </Link>
          ))}
        </div>

        <button
          className="navbar__toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          id="nav-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
