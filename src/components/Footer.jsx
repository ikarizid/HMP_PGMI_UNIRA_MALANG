import { Link } from 'react-router-dom';
import { GraduationCap, Instagram, Youtube, Mail, Phone, Heart, ArrowUp } from 'lucide-react';
import './Footer.css';
import logoUrl from '../assets/logo.png';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer__glow" />
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo" style={{ background: 'transparent', boxShadow: 'none' }}>
              <img src={logoUrl} alt="Logo HMP PGMI" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h3>HMP PGMI UNIRA MALANG</h3>
            <p>Bergerak untuk Pendidikan, Berinovasi untuk Masa Depan</p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="footer__social" aria-label="YouTube">
                <Youtube size={18} />
              </a>
              <a href="#" className="footer__social" aria-label="Email">
                <Mail size={18} />
              </a>
              <a href="#" className="footer__social" aria-label="WhatsApp">
                <Phone size={18} />
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h4>Navigasi</h4>
            <Link to="/">Beranda</Link>
            <Link to="/tentang">Tentang Kami</Link>
            <Link to="/event">Event</Link>
            <Link to="/akademik">Pojok Akademik</Link>
          </div>

          <div className="footer__col">
            <h4>Lainnya</h4>
            <Link to="/berita">Berita</Link>
            <Link to="/galeri">Galeri</Link>
            <Link to="/kontak">Kontak</Link>
          </div>

          <div className="footer__col">
            <h4>Kontak</h4>
            <p>📧 hima@pgmi.ac.id</p>
            <p>📱 @hima_pgmi</p>
            <p>📍 Kampus PGMI</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2025 Himpunan Mahasiswa PGMI. Made with <Heart size={14} className="footer__heart" /> All rights reserved.</p>
          <button className="footer__top-btn" onClick={scrollToTop} aria-label="Scroll to top">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
