import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { galeriStore } from '../utils/storage';
import './Galeri.css';

export default function Galeri() {
  const [active, setActive] = useState('Semua');
  const [lightbox, setLightbox] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await galeriStore.getAll();
      setGalleryItems(data);
    };
    fetch();
  }, []);

  const gallery = galleryItems.map(g => ({ ...g, src: g.foto_url, title: g.judul, category: g.kategori, deskripsi: g.deskripsi }));
  const cats = ['Semua', ...new Set(gallery.map(g => g.category).filter(Boolean))];
  const filtered = active === 'Semua' ? gallery : gallery.filter(g => g.category === active);

  return (
    <div className="page-enter">
      <div className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <span className="hero__badge">📸 Galeri</span>
          <h1 className="page-hero__title">Galeri Dokumentasi</h1>
          <p className="page-hero__desc">Album foto dan video kegiatan HMP PGMI UNIRA MALANG yang tertata rapi per kategori.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="event-tabs" style={{ marginBottom: '2rem' }}>
            {cats.map(c => (
              <button key={c} className={`event-tab ${active === c ? 'event-tab--active' : ''}`} onClick={() => setActive(c)}>{c}</button>
            ))}
          </div>
          <div className="galeri-grid">
            {filtered.map(g => (
              <div className="galeri-item" key={g.id} onClick={() => setLightbox(g)}>
                <img src={g.src} alt={g.title} loading="lazy" />
                <div className="galeri-item__overlay">
                  <span>{g.title}</span>
                  <span className="badge badge-primary">{g.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox__close" onClick={() => setLightbox(null)}><X size={24} /></button>
          <img src={lightbox.src.replace('w=600', 'w=1200')} alt={lightbox.title} />
          <div className="lightbox__info">
            <h3>{lightbox.title}</h3>
            {lightbox.deskripsi && <p className="lightbox__desc">{lightbox.deskripsi}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
